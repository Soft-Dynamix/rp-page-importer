/**
 * RP Page Importer - Admin JavaScript
 * Version: 1.4.0
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
            
            // Check file size and warn if large
            var sizeMB = file.size / (1024 * 1024);
            var sizeWarning = '';
            if (sizeMB > 10) {
                sizeWarning = '<br><span style="color: #d63638;">⚠ Large file - consider using URL or FTP method for files over 10MB</span>';
            }
            
            $uploadInfo.find('p').html(
                '<strong>' + file.name + '</strong><br>' +
                this.formatFileSize(file.size) + sizeWarning
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
        
        getOptions: function() {
            return {
                title: $('#rp-page-title').val(),
                slug: $('#rp-page-slug').val(),
                template: $('#rp-page-template').val(),
                css_location: $('#rp-css-location').val(),
                status: $('#rp-page-status').val(),
                parent: $('#rp-parent-page').val(),
                replace: $('#rp-replace-existing').is(':checked')
            };
        },
        
        startImport: function() {
            var self = this;
            var method = $('#rp-selected-method').val();
            
            // Validate based on method
            if (method === 'browser') {
                var fileInput = $('#rp-zip-file')[0];
                if (!fileInput.files || fileInput.files.length === 0) {
                    alert(rpImporter.strings.select_file);
                    return;
                }
                this.importFromBrowser();
            } else if (method === 'url') {
                var url = $('#rp-import-url').val();
                if (!url) {
                    alert('Please enter a URL to import from.');
                    return;
                }
                this.importFromUrl(url);
            } else if (method === 'ftp') {
                var selectedFile = $('input[name="rp-ftp-select"]:checked').val();
                if (!selectedFile) {
                    alert('Please select a file to import.');
                    return;
                }
                this.importFromFtp(selectedFile);
            }
        },
        
        importFromBrowser: function() {
            var self = this;
            var fileInput = $('#rp-zip-file')[0];
            var file = fileInput.files[0];
            
            // Show progress section
            $('#rp-progress-section').show();
            $('#rp-result-section').hide();
            this.updateProgress(0, 'Starting import...', 'info');
            
            // Disable button
            var $btn = $('#rp-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#rp-import-spinner').addClass('is-active');
            
            // Use FormData for direct file upload
            var formData = new FormData();
            formData.append('action', 'rp_import_page');
            formData.append('nonce', rpImporter.nonce);
            formData.append('zip_file', file);
            
            // Add options
            var options = this.getOptions();
            Object.keys(options).forEach(function(key) {
                formData.append('options[' + key + ']', options[key]);
            });
            
            this.updateProgress(10, 'File read successfully', 'success');
            this.updateProgress(20, 'Uploading to server...', 'info');
            
            $.ajax({
                url: rpImporter.ajax_url,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            var percent = 20 + (e.loaded / e.total) * 50;
                            self.updateProgress(percent, 'Uploading: ' + self.formatFileSize(e.loaded) + ' / ' + self.formatFileSize(e.total), 'info');
                        }
                    }, false);
                    return xhr;
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
                    var errorMsg = error;
                    if (xhr.status === 413) {
                        errorMsg = 'File too large. Please use the URL or FTP method instead.';
                    }
                    self.updateProgress(100, 'Server error: ' + errorMsg, 'error');
                    self.showResult({ message: errorMsg }, false);
                },
                complete: function() {
                    $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                    $('#rp-import-spinner').removeClass('is-active');
                    self.loadHistory();
                }
            });
        },
        
        importFromUrl: function(url) {
            var self = this;
            
            // Show progress section
            $('#rp-progress-section').show();
            $('#rp-result-section').hide();
            this.updateProgress(0, 'Starting import from URL...', 'info');
            
            // Disable button
            var $btn = $('#rp-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#rp-import-spinner').addClass('is-active');
            
            this.updateProgress(10, 'Validating URL...', 'info');
            this.updateProgress(20, 'Downloading file from URL...', 'info');
            
            $.ajax({
                url: rpImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'rp_import_from_url',
                    nonce: rpImporter.nonce,
                    url: url,
                    options: this.getOptions()
                },
                success: function(response) {
                    if (response.success) {
                        self.updateProgress(100, 'Import completed!', 'success');
                        self.showResult(response.data, true);
                        // Clear URL field
                        $('#rp-import-url').val('');
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
        },
        
        importFromFtp: function(filename) {
            var self = this;
            
            // Show progress section
            $('#rp-progress-section').show();
            $('#rp-result-section').hide();
            this.updateProgress(0, 'Starting import from server...', 'info');
            
            // Disable button
            var $btn = $('#rp-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#rp-import-spinner').addClass('is-active');
            
            this.updateProgress(20, 'Reading file: ' + filename, 'info');
            
            $.ajax({
                url: rpImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'rp_import_from_ftp',
                    nonce: rpImporter.nonce,
                    filename: filename,
                    options: this.getOptions()
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
