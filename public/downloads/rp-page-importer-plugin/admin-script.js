/**
 * RP Page Importer - Admin JavaScript
 */
(function($) {
    'use strict';
    
    var RPImporter = {
        init: function() {
            this.bindEvents();
            this.loadHistory();
        },
        
        bindEvents: function() {
            var self = this;
            
            // File input change
            $('#rp-zip-file').on('change', function(e) {
                self.handleFileSelect(e.target.files[0]);
            });
            
            // Drag and drop
            var $uploadArea = $('#rp-upload-area');
            
            $uploadArea.on('dragover', function(e) {
                e.preventDefault();
                $(this).addClass('dragover');
            });
            
            $uploadArea.on('dragleave', function(e) {
                e.preventDefault();
                $(this).removeClass('dragover');
            });
            
            $uploadArea.on('drop', function(e) {
                e.preventDefault();
                $(this).removeClass('dragover');
                
                var files = e.originalEvent.dataTransfer.files;
                if (files.length > 0) {
                    if (files[0].name.endsWith('.zip')) {
                        $('#rp-zip-file')[0].files = files;
                        self.handleFileSelect(files[0]);
                    } else {
                        alert('Please upload a ZIP file.');
                    }
                }
            });
            
            // Import button
            $('#rp-import-btn').on('click', function(e) {
                e.preventDefault();
                self.startImport();
            });
        },
        
        handleFileSelect: function(file) {
            if (!file) return;
            
            var $uploadArea = $('#rp-upload-area');
            var $uploadInfo = $uploadArea.find('.rp-upload-info');
            
            $uploadArea.addClass('has-file');
            $uploadInfo.find('p').html(
                '<strong>' + file.name + '</strong><br>' +
                this.formatFileSize(file.size)
            );
            
            // Auto-populate title from filename
            var title = file.name.replace('.zip', '').replace(/[-_]/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            if (!$('#rp-page-title').val()) {
                $('#rp-page-title').val(title);
            }
        },
        
        formatFileSize: function(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        },
        
        startImport: function() {
            var self = this;
            var fileInput = $('#rp-zip-file')[0];
            
            if (!fileInput.files || fileInput.files.length === 0) {
                alert(rpImporter.strings.select_file);
                return;
            }
            
            var file = fileInput.files[0];
            
            // Show progress section
            $('#rp-progress-section').show();
            $('#rp-result-section').hide();
            this.updateProgress(0, 'Starting import...', 'info');
            
            // Disable button
            var $btn = $('#rp-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#rp-import-spinner').addClass('is-active');
            
            // Read file as base64
            var reader = new FileReader();
            reader.onload = function(e) {
                self.updateProgress(10, 'File read successfully', 'success');
                self.updateProgress(20, 'Uploading to server...', 'info');
                
                // Get options
                var options = {
                    title: $('#rp-page-title').val(),
                    slug: $('#rp-page-slug').val(),
                    template: $('#rp-page-template').val(),
                    css_location: $('#rp-css-location').val(),
                    status: $('#rp-page-status').val(),
                    parent: $('#rp-parent-page').val(),
                    replace: $('#rp-replace-existing').is(':checked')
                };
                
                // Send AJAX request
                $.ajax({
                    url: rpImporter.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'rp_import_page',
                        nonce: rpImporter.nonce,
                        file_data: e.target.result,
                        options: options
                    },
                    success: function(response) {
                        if (response.success) {
                            self.updateProgress(100, 'Import completed!', 'success');
                            self.showResult(response.data, true);
                        } else {
                            self.updateProgress(100, 'Error: ' + response.data.message, 'error');
                            self.showResult(response.data, false);
                        }
                    },
                    error: function(xhr, status, error) {
                        self.updateProgress(100, 'Server error: ' + error, 'error');
                        self.showResult({ message: 'Server error: ' + error }, false);
                    },
                    complete: function() {
                        $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                        $('#rp-import-spinner').removeClass('is-active');
                        self.loadHistory();
                    }
                });
            };
            
            reader.readAsDataURL(file);
        },
        
        updateProgress: function(percent, message, type) {
            $('#rp-progress-fill').css('width', percent + '%');
            
            var $log = $('#rp-progress-log');
            var icon = '';
            switch(type) {
                case 'success': icon = '✓ '; break;
                case 'error': icon = '✗ '; break;
                case 'info': icon = '→ '; break;
            }
            
            $log.append('<div class="log-item log-' + type + '">' + icon + message + '</div>');
            $log.scrollTop($log[0].scrollHeight);
        },
        
        showResult: function(data, success) {
            var $resultSection = $('#rp-result-section');
            var $resultContent = $('#rp-result-content');
            
            $resultContent.removeClass('success error').addClass(success ? 'success' : 'error');
            
            if (success) {
                var html = '<div class="result-message">✓ ' + data.message + '</div>';
                html += '<ul class="result-details">';
                html += '<li><span class="dashicons dashicons-admin-page"></span> Page ID: ' + data.page_id + '</li>';
                if (data.images_imported > 0) {
                    html += '<li><span class="dashicons dashicons-images-alt2"></span> Images imported: ' + data.images_imported + '</li>';
                }
                if (data.css_added) {
                    html += '<li><span class="dashicons dashicons-admin-customizer"></span> CSS styles added</li>';
                }
                html += '</ul>';
                html += '<div class="result-actions">';
                html += '<a href="' + data.page_url + '" class="button button-primary" target="_blank">View Page</a>';
                html += '<a href="' + data.edit_url + '" class="button">Edit Page</a>';
                html += '</div>';
                
                $resultContent.html(html);
            } else {
                $resultContent.html('<div class="result-message">✗ ' + data.message + '</div>');
            }
            
            $resultSection.show();
        },
        
        loadHistory: function() {
            $.ajax({
                url: rpImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'rp_get_import_history',
                    nonce: rpImporter.nonce
                },
                success: function(response) {
                    if (response.success) {
                        $('#rp-history-container').html(response.data.html);
                    }
                }
            });
        }
    };
    
    $(document).ready(function() {
        RPImporter.init();
    });
    
})(jQuery);
