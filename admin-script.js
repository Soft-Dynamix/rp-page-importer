/**
 * Soft Dynamix Page Importer - Admin JavaScript
 * Version: 2.0.2
 */
(function($) {
    'use strict';
    
    var SDImporter = {
        chunkSize: 2 * 1024 * 1024, // 2MB chunks
        
        init: function() {
            this.bindEvents();
            this.loadHistory();
        },
        
        bindEvents: function() {
            var self = this;
            
            // File input change (browser upload)
            $('#sd-zip-file').on('change', function(e) {
                self.handleFileSelect(e.target.files[0]);
            });
            
            // Chunked file input change
            $('#sd-chunked-file').on('change', function(e) {
                self.handleChunkedFileSelect(e.target.files[0]);
            });
            
            // Drag and drop for browser upload
            var $uploadArea = $('#sd-upload-area');
            
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
                        $('#sd-zip-file')[0].files = files;
                        self.handleFileSelect(files[0]);
                    } else {
                        alert('Please upload a ZIP file.');
                    }
                }
            });
            
            // Drag and drop for chunked upload
            var $chunkedUploadArea = $('#sd-chunked-upload-area');
            
            $chunkedUploadArea.on('dragover', function(e) {
                e.preventDefault();
                $(this).addClass('dragover');
            });
            
            $chunkedUploadArea.on('dragleave', function(e) {
                e.preventDefault();
                $(this).removeClass('dragover');
            });
            
            $chunkedUploadArea.on('drop', function(e) {
                e.preventDefault();
                $(this).removeClass('dragover');
                
                var files = e.originalEvent.dataTransfer.files;
                if (files.length > 0) {
                    if (files[0].name.endsWith('.zip')) {
                        $('#sd-chunked-file')[0].files = files;
                        self.handleChunkedFileSelect(files[0]);
                    } else {
                        alert('Please upload a ZIP file.');
                    }
                }
            });
            
            // Import button
            $('#sd-import-btn').on('click', function(e) {
                e.preventDefault();
                self.startImport();
            });
        },
        
        handleFileSelect: function(file) {
            if (!file) return;
            
            var $uploadArea = $('#sd-upload-area');
            var $uploadInfo = $uploadArea.find('.sd-upload-info');
            
            $uploadArea.addClass('has-file');
            
            // Check file size and warn if large
            var sizeMB = file.size / (1024 * 1024);
            var sizeWarning = '';
            if (sizeMB > 10) {
                sizeWarning = '<br><span style="color: #d63638;">⚠ Large file - consider using Chunked Upload method</span>';
            }
            
            $uploadInfo.find('p').html(
                '<strong>' + file.name + '</strong><br>' +
                this.formatFileSize(file.size) + sizeWarning
            );
            
            // Auto-populate title from filename
            var title = file.name.replace('.zip', '').replace(/[-_]/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            if (!$('#sd-page-title').val()) {
                $('#sd-page-title').val(title);
            }
        },
        
        handleChunkedFileSelect: function(file) {
            if (!file) return;
            
            var self = this;
            var $uploadArea = $('#sd-chunked-upload-area');
            var $uploadInfo = $uploadArea.find('.sd-upload-info');
            
            $uploadArea.addClass('has-file');
            
            var totalChunks = Math.ceil(file.size / this.chunkSize);
            
            $uploadInfo.find('p').html(
                '<strong>' + file.name + '</strong><br>' +
                this.formatFileSize(file.size) + ' - ' + totalChunks + ' chunks'
            );
            
            // Show file info
            $('#sd-chunked-filename').text(file.name);
            $('#sd-chunked-filesize').text(this.formatFileSize(file.size));
            $('#sd-chunked-count').text(totalChunks);
            $('#sd-chunked-info').show();
            
            // Auto-populate title from filename
            var title = file.name.replace('.zip', '').replace(/[-_]/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            if (!$('#sd-page-title').val()) {
                $('#sd-page-title').val(title);
            }
        },
        
        formatFileSize: function(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        },
        
        getOptions: function() {
            return {
                title: $('#sd-page-title').val(),
                slug: $('#sd-page-slug').val(),
                template: $('#sd-page-template').val(),
                css_location: $('#sd-css-location').val(),
                status: $('#sd-page-status').val(),
                parent: $('#sd-parent-page').val(),
                replace: $('#sd-replace-existing').is(':checked')
            };
        },
        
        startImport: function() {
            var self = this;
            var method = $('#sd-selected-method').val();
            
            // Validate based on method
            if (method === 'browser') {
                var fileInput = $('#sd-zip-file')[0];
                if (!fileInput.files || fileInput.files.length === 0) {
                    alert(sdImporter.strings.select_file);
                    return;
                }
                this.importFromBrowser();
            } else if (method === 'chunked') {
                var chunkedFileInput = $('#sd-chunked-file')[0];
                if (!chunkedFileInput.files || chunkedFileInput.files.length === 0) {
                    alert('Please select a file for chunked upload.');
                    return;
                }
                this.importChunked(chunkedFileInput.files[0]);
            } else if (method === 'url') {
                var url = $('#sd-import-url').val();
                if (!url) {
                    alert('Please enter a URL to import from.');
                    return;
                }
                this.importFromUrl(url);
            } else if (method === 'ftp') {
                var selectedFile = $('input[name="sd-ftp-select"]:checked').val();
                if (!selectedFile) {
                    alert('Please select a file to import.');
                    return;
                }
                this.importFromFtp(selectedFile);
            }
        },
        
        importFromBrowser: function() {
            var self = this;
            var fileInput = $('#sd-zip-file')[0];
            var file = fileInput.files[0];
            
            // Show progress section
            $('#sd-progress-section').show();
            $('#sd-result-section').hide();
            this.updateProgress(0, 'Starting import...', 'info');
            
            // Disable button
            var $btn = $('#sd-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#sd-import-spinner').addClass('is-active');
            
            // Use FormData for direct file upload
            var formData = new FormData();
            formData.append('action', 'sd_import_page');
            formData.append('nonce', sdImporter.nonce);
            formData.append('zip_file', file);
            
            // Add options
            var options = this.getOptions();
            Object.keys(options).forEach(function(key) {
                formData.append('options[' + key + ']', options[key]);
            });
            
            this.updateProgress(10, 'File read successfully', 'success');
            this.updateProgress(20, 'Uploading to server...', 'info');
            
            $.ajax({
                url: sdImporter.ajax_url,
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
                        errorMsg = 'File too large. Please use the Chunked Upload method instead.';
                    }
                    self.updateProgress(100, 'Server error: ' + errorMsg, 'error');
                    self.showResult({ message: errorMsg }, false);
                },
                complete: function() {
                    $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                    $('#sd-import-spinner').removeClass('is-active');
                    self.loadHistory();
                }
            });
        },
        
        importChunked: function(file) {
            var self = this;
            var chunkSize = this.chunkSize;
            var totalChunks = Math.ceil(file.size / chunkSize);
            var fileId = 'upload_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            var currentChunk = 0;
            var startTime = Date.now();
            
            // Disable button
            var $btn = $('#sd-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#sd-import-spinner').addClass('is-active');
            
            // Show chunked progress
            $('#rp-chunk-progress-container').show();
            $('#sd-progress-section').hide();
            $('#sd-result-section').hide();
            
            // Update UI
            $('#rp-chunk-total').text(totalChunks);
            $('#rp-chunk-status').text('Uploading...');
            
            var options = this.getOptions();
            
            // Upload chunks sequentially
            var uploadNextChunk = function() {
                if (currentChunk >= totalChunks) {
                    return;
                }
                
                var start = currentChunk * chunkSize;
                var end = Math.min(start + chunkSize, file.size);
                var chunk = file.slice(start, end);
                
                var formData = new FormData();
                formData.append('action', 'sd_upload_chunk');
                formData.append('nonce', sdImporter.nonce);
                formData.append('chunk', chunk);
                formData.append('chunk_index', currentChunk);
                formData.append('total_chunks', totalChunks);
                formData.append('file_id', fileId);
                formData.append('filename', file.name);
                formData.append('is_last', currentChunk === totalChunks - 1 ? 'true' : 'false');
                
                // Add options for last chunk
                if (currentChunk === totalChunks - 1) {
                    Object.keys(options).forEach(function(key) {
                        formData.append('options[' + key + ']', options[key]);
                    });
                }
                
                $.ajax({
                    url: sdImporter.ajax_url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        if (response.success) {
                            currentChunk++;
                            
                            // Update progress
                            var progress = (currentChunk / totalChunks) * 100;
                            $('#rp-chunk-progress-fill').css('width', progress + '%');
                            $('#rp-chunk-percent').text(progress.toFixed(1) + '%');
                            $('#rp-chunk-current').text(currentChunk);
                            
                            // Calculate speed
                            var elapsed = (Date.now() - startTime) / 1000;
                            var bytesPerSec = (currentChunk * chunkSize) / elapsed;
                            $('#rp-chunk-speed').text(self.formatFileSize(bytesPerSec) + '/s');
                            
                            if (response.data.page_id) {
                                // Import complete!
                                $('#rp-chunk-status').text('Complete!');
                                self.showResult(response.data, true);
                                self.loadHistory();
                                
                                // Re-enable button
                                $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                                $('#sd-import-spinner').removeClass('is-active');
                                
                                // Clear file input
                                $('#sd-chunked-file').val('');
                                $('#sd-chunked-info').hide();
                                $('#rp-chunk-progress-container').hide();
                            } else {
                                // Upload next chunk
                                uploadNextChunk();
                            }
                        } else {
                            $('#rp-chunk-status').text('Error: ' + response.data.message);
                            self.showResult(response.data, false);
                            
                            $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                            $('#sd-import-spinner').removeClass('is-active');
                        }
                    },
                    error: function(xhr, status, error) {
                        $('#rp-chunk-status').text('Error: ' + error);
                        self.showResult({ message: 'Upload failed: ' + error }, false);
                        
                        $btn.prop('disabled', false).find('.dashicons').removeClass('dashicons-update dashicons-spin').addClass('dashicons-upload');
                        $('#sd-import-spinner').removeClass('is-active');
                    }
                });
            };
            
            // Start uploading
            uploadNextChunk();
        },
        
        importFromUrl: function(url) {
            var self = this;
            
            // Show progress section
            $('#sd-progress-section').show();
            $('#sd-result-section').hide();
            this.updateProgress(0, 'Starting import from URL...', 'info');
            
            // Disable button
            var $btn = $('#sd-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#sd-import-spinner').addClass('is-active');
            
            this.updateProgress(10, 'Validating URL...', 'info');
            this.updateProgress(20, 'Downloading file from URL...', 'info');
            
            $.ajax({
                url: sdImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'sd_import_from_url',
                    nonce: sdImporter.nonce,
                    url: url,
                    options: this.getOptions()
                },
                success: function(response) {
                    if (response.success) {
                        self.updateProgress(100, 'Import completed!', 'success');
                        self.showResult(response.data, true);
                        // Clear URL field
                        $('#sd-import-url').val('');
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
                    $('#sd-import-spinner').removeClass('is-active');
                    self.loadHistory();
                }
            });
        },
        
        importFromFtp: function(filename) {
            var self = this;
            
            // Show progress section
            $('#sd-progress-section').show();
            $('#sd-result-section').hide();
            this.updateProgress(0, 'Starting import from server...', 'info');
            
            // Disable button
            var $btn = $('#sd-import-btn');
            $btn.prop('disabled', true).find('.dashicons').removeClass('dashicons-upload').addClass('dashicons-update dashicons-spin');
            $('#sd-import-spinner').addClass('is-active');
            
            this.updateProgress(20, 'Reading file: ' + filename, 'info');
            
            $.ajax({
                url: sdImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'sd_import_from_ftp',
                    nonce: sdImporter.nonce,
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
                    $('#sd-import-spinner').removeClass('is-active');
                    self.loadHistory();
                }
            });
        },
        
        updateProgress: function(percent, message, type) {
            $('#sd-progress-fill').css('width', percent + '%');
            
            var $log = $('#sd-progress-log');
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
            var $resultSection = $('#sd-result-section');
            var $resultContent = $('#sd-result-content');
            
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
                url: sdImporter.ajax_url,
                type: 'POST',
                data: {
                    action: 'sd_get_import_history',
                    nonce: sdImporter.nonce
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
        SDImporter.init();
    });
    
})(jQuery);
