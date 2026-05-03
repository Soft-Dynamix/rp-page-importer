jQuery(document).ready(function($) {
    $('#rp-import-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData();
        formData.append('action', 'rp_import_services');
        formData.append('nonce', rpAjax.nonce);
        formData.append('page_title', $('#page_title').val());
        formData.append('zip_file', $('#zip_file')[0].files[0]);
        
        $('#import-status').show();
        $('#import-result').hide();
        $('#status-text').text('Uploading ZIP file...');
        
        $.ajax({
            url: rpAjax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#import-status').hide();
                
                if (response.success) {
                    var data = response.data;
                    $('#import-result').html(
                        '<div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 5px;">' +
                        '<h3 style="margin-top: 0;">✅ Import Successful!</h3>' +
                        '<p><strong>Page:</strong> ' + data.page_id + '</p>' +
                        '<p><strong>Images uploaded:</strong> ' + data.images_uploaded + '</p>' +
                        '<p>' +
                        '<a href="' + data.edit_url + '" class="button button-primary" style="margin-right: 10px;">Edit in Elementor</a>' +
                        '<a href="' + data.view_url + '" class="button" target="_blank">Preview Page</a>' +
                        '</p>' +
                        '</div>'
                    ).show();
                } else {
                    $('#import-result').html(
                        '<div style="background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 20px; border-radius: 5px;">' +
                        '<h3 style="margin-top: 0;">❌ Import Failed</h3>' +
                        '<p>' + response.data + '</p>' +
                        '</div>'
                    ).show();
                }
            },
            error: function(xhr, status, error) {
                $('#import-status').hide();
                $('#import-result').html(
                    '<div style="background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 20px; border-radius: 5px;">' +
                    '<h3 style="margin-top: 0;">❌ Error</h3>' +
                    '<p>' + error + '</p>' +
                    '</div>'
                ).show();
            }
        });
        
        // Update status text during upload
        setTimeout(function() {
            $('#status-text').text('Extracting files...');
        }, 1000);
        
        setTimeout(function() {
            $('#status-text').text('Uploading images to Media Library...');
        }, 3000);
        
        setTimeout(function() {
            $('#status-text').text('Creating page...');
        }, 5000);
    });
});
