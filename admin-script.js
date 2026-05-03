/**
 * RP Page Importer - Admin JavaScript
 * Version: 1.3.0
 */
(function($) {
    'use strict';
    
    var RPImporter = {
        init: function() {
            this.bindEvents();
            this.loadHistory();
            this.checkUploadLimits();
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
        
        checkUploadLimits: function() {
            // Display upload size info
            var maxUpload = this.getMaxUploadSize();
            if (maxUpload) {
                var infoHtml = '<div class="rp-upload-limit-info">';
                infoHtml += '<span class="dashicons dashicons-info"></span> ';
                infoHtml += 'Max upload size: <strong>' + this.formatFileSize(maxUpload) + '</strong>';
                infoHtml += '</div>';
                $('#rp-upload-area').after(infoHtml);
            }
        },
        
        getMaxUploadSize: function() {
            // Try to get from PHP settings (approximate)
            // Common limits: 2M, 8M, 16M, 32M, 64M, 128M
            return 32 * 1024 * 1024; // Default assumption
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
                sizeWarning = '<br><span style="color: #d63638;">⚠ Large file - upload may take a while</span>';
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
        
        startImport: function() {
            var self = this;
            var fileInput = $('#rp-zip-file')[0];
            
            if (!fileInput.files || fileInput.files.length === 0) {
                alert(rpImporter.strings.select_file);
                return;
            }
            
            var file = fileInput.files[0];
            var fileSizeMB = file.size / (1024 * 1024);
            
            // Show progress section
            $('#rp-progress-section').show();
            $('#rp-result-section').hide();
            this.updateProgress(0, 'Starting import...', 'info');
            
            // Disable button
            var $btn = $('#rp-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#rp-import-spinner').addClass('is-active');
            
            // Use FormData for direct file upload (better for large files)
            var formData = new FormData();
            formData.append('action', 'rp_import_page');
            formData.append('nonce', rpImporter.nonce);
            formData.append('zip_file', file);
            
            // Add options
            formData.append('options[title]', $('#rp-page-title').val());
            formData.append('options[slug]', $('#rp-page-slug').val());
            formData.append('options[template]', $('#rp-page-template').val());
            formData.append('options[css_location]', $('#rp-css-location').val());
            formData.append('options[status]', $('#rp-page-status').val());
            formData.append('options[parent]', $('#rp-parent-page').val());
            formData.append('options[replace]', $('#rp-replace-existing').is(':checked') ? '1' : '0');
            
            this.updateProgress(10, 'File read successfully', 'success');
            this.updateProgress(20, 'Uploading to server...', 'info');
            
            // Send AJAX request with FormData
            $.ajax({
                url: rpImporter.ajax_url,
                type: 'POST',
                data: formData,
                processData: false,  // Important: don't process the data
                contentType: false,  // Important: don't set contentType
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
                        var errorMsg = response.data.message || 'Unknown error';
                        
                        // Check for size-related errors
                        if (errorMsg.indexOf('Request Entity Too Large') !== -1 || 
                            errorMsg.indexOf('too large') !== -1 ||
                            errorMsg.indexOf('exceeds') !== -1) {
                            errorMsg += '\n\nSolutions:\n';
                            errorMsg += '1. Ask your host to increase upload_max_filesize and post_max_size in php.ini\n';
                            errorMsg += '2. Use the FTP method instead\n';
                            errorMsg += '3. Try a smaller ZIP file';
                        }
                        
                        self.updateProgress(100, 'Error: ' + errorMsg, 'error');
                        self.showResult({ message: errorMsg }, false);
                    }
                },
                error: function(xhr, status, error) {
                    var errorMsg = error;
                    
                    // Check for common size errors
                    if (xhr.status === 413) {
                        errorMsg = 'Request Entity Too Large - The file exceeds the server\'s maximum upload size.\n\n';
                        errorMsg += 'Solutions:\n';
                        errorMsg += '1. Ask your hosting provider to increase the upload limit\n';
                        errorMsg += '2. Add to .htaccess:\n';
                        errorMsg += '   php_value upload_max_filesize 64M\n';
                        errorMsg += '   php_value post_max_size 64M\n';
                        errorMsg += '3. Or use the FTP method below';
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
