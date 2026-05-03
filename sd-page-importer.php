<?php
/**
 * Plugin Name: Soft Dynamix Page Importer
 * Plugin URI: https://github.com/Soft-Dynamix/soft-dynamix-page-importer
 * Description: Import and export feature pages from ZIP files with images, HTML, and CSS. Imports pages exactly as designed in Z.ai with full styling preservation.
 * Version: 2.0.6
 * Author: Soft Dynamix
 * Author URI: https://softdynamix.co.za
 * License: GPL v2 or later
 * Text Domain: sd-page-importer
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SD_Page_Importer {
    
    private $version = '2.0.6';
    private $plugin_name = 'sd-page-importer';
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_ajax_sd_import_page', array($this, 'ajax_import_page'));
        add_action('wp_ajax_sd_import_from_url', array($this, 'ajax_import_from_url'));
        add_action('wp_ajax_sd_import_from_ftp', array($this, 'ajax_import_from_ftp'));
        add_action('wp_ajax_sd_upload_chunk', array($this, 'ajax_upload_chunk'));
        add_action('wp_ajax_sd_delete_ftp_file', array($this, 'ajax_delete_ftp_file'));
        add_action('wp_ajax_sd_clear_ftp_files', array($this, 'ajax_clear_ftp_files'));
        add_action('wp_ajax_sd_get_import_history', array($this, 'ajax_get_import_history'));
        add_action('wp_ajax_sd_export_page', array($this, 'ajax_export_page'));
        add_action('wp_ajax_sd_get_page_content', array($this, 'ajax_get_page_content'));
        add_action('wp_ajax_sd_preview_export', array($this, 'ajax_preview_export'));
    }
    
    /**
     * Add admin menu item
     */
    public function add_admin_menu() {
        add_menu_page(
            'Page Importer',
            'Page Importer',
            'manage_options',
            'sd-page-importer',
            array($this, 'render_admin_page'),
            'dashicons-migrate',
            30
        );
    }
    
    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        if ($hook !== 'toplevel_page_sd-page-importer') {
            return;
        }
        
        wp_enqueue_style(
            'sd-page-importer-admin',
            plugin_dir_url(__FILE__) . 'admin-style.css',
            array(),
            $this->version
        );
        
        wp_enqueue_script(
            'sd-page-importer-admin',
            plugin_dir_url(__FILE__) . 'admin-script.js',
            array('jquery'),
            $this->version,
            true
        );
        
        wp_localize_script('sd-page-importer-admin', 'sdImporter', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sd_page_importer_nonce'),
            'strings' => array(
                'select_file' => __('Please select a ZIP file to import.', 'sd-page-importer'),
                'importing' => __('Importing... Please wait.', 'sd-page-importer'),
                'success' => __('Import completed successfully!', 'sd-page-importer'),
                'error' => __('An error occurred during import.', 'sd-page-importer'),
            )
        ));
    }
    
    /**
     * Render admin page
     */
    public function render_admin_page() {
        $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'import';
        ?>
        <div class="wrap sd-importer-wrap">
            <h1><span class="dashicons dashicons-migrate"></span> Soft Dynamix Page Importer</h1>
            
            <!-- Tabs -->
            <nav class="sd-nav-tabs">
                <a href="?page=sd-page-importer&tab=import" class="sd-nav-tab <?php echo $current_tab === 'import' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-upload"></span> Import
                </a>
                <a href="?page=sd-page-importer&tab=export" class="sd-nav-tab <?php echo $current_tab === 'export' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-download"></span> Export
                </a>
                <a href="?page=sd-page-importer&tab=zai-prompt" class="sd-nav-tab <?php echo $current_tab === 'zai-prompt' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-admin-customizer"></span> Z.ai Prompt
                </a>
                <a href="?page=sd-page-importer&tab=history" class="sd-nav-tab <?php echo $current_tab === 'history' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-backup"></span> History
                </a>
            </nav>
            
            <div class="sd-importer-container">
                <?php if ($current_tab === 'import'): ?>
                    <?php $this->render_import_tab(); ?>
                <?php elseif ($current_tab === 'export'): ?>
                    <?php $this->render_export_tab(); ?>
                <?php elseif ($current_tab === 'zai-prompt'): ?>
                    <?php $this->render_zai_prompt_tab(); ?>
                <?php elseif ($current_tab === 'history'): ?>
                    <?php $this->render_history_tab(); ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Render Import Tab
     */
    private function render_import_tab() {
        // Get server upload limit
        $max_upload = wp_max_upload_size();
        $max_upload_mb = size_format($max_upload);
        
        // Get upload directory info
        $upload_dir = wp_upload_dir();
        $import_dir = $upload_dir['basedir'] . '/sd-imports/';
        $import_url = $upload_dir['baseurl'] . '/sd-imports/';
        
        // Create import directory if not exists
        wp_mkdir_p($import_dir);
        
        // Check for existing ZIP files in import directory
        $existing_zips = array();
        if (is_dir($import_dir)) {
            $files = glob($import_dir . '*.zip');
            foreach ($files as $file) {
                $existing_zips[] = array(
                    'path' => $file,
                    'name' => basename($file),
                    'size' => size_format(filesize($file)),
                    'date' => date('Y-m-d H:i', filemtime($file))
                );
            }
        }
        ?>
        <div class="sd-import-section">
            <h2>Import Feature Page</h2>
            <p class="description">Import a ZIP file containing your feature page. The ZIP should include:</p>
            <ul class="rp-requirements">
                <li><code>index.html</code> or <code>page.html</code> - Main page content (required)</li>
                <li><code>style.css</code> or <code>styles.css</code> - Custom styles (optional)</li>
                <li><code>images/</code> folder - Images to import to Media Library (optional)</li>
                <li><code>config.json</code> - Page settings (optional)</li>
            </ul>
            
            <!-- Upload Method Tabs -->
            <div class="sd-method-tabs">
                <button type="button" class="sd-method-tab active" data-method="browser">
                    <span class="dashicons dashicons-upload"></span> Browser Upload
                    <small>(Max: <?php echo esc_html($max_upload_mb); ?>)</small>
                </button>
                <button type="button" class="sd-method-tab" data-method="chunked">
                    <span class="dashicons dashicons-networking"></span> Chunked Upload
                    <small>(No size limit!)</small>
                </button>
                <button type="button" class="sd-method-tab" data-method="url">
                    <span class="dashicons dashicons-admin-links"></span> From URL
                    <small>(No size limit)</small>
                </button>
                <button type="button" class="sd-method-tab" data-method="ftp">
                    <span class="dashicons dashicons-category"></span> FTP/Server
                    <small>(No size limit)</small>
                </button>
            </div>
            
            <!-- Method: Browser Upload -->
            <div class="sd-upload-method sd-method-browser active">
                <div class="sd-upload-area" id="sd-upload-area">
                    <input type="file" id="sd-zip-file" accept=".zip" />
                    <div class="sd-upload-info">
                        <span class="dashicons dashicons-upload"></span>
                        <p>Drag & drop a ZIP file here or click to browse</p>
                    </div>
                </div>
            </div>
            
            <!-- Method: Chunked Upload -->
            <div class="sd-upload-method sd-method-chunked" style="display: none;">
                <div class="sd-chunked-import-box">
                    <h4><span class="dashicons dashicons-networking"></span> Chunked Upload (No Size Limit)</h4>
                    <p class="description">Upload large files by splitting them into smaller chunks. Works with any file size!</p>
                    
                    <div class="sd-upload-area" id="sd-chunked-upload-area">
                        <input type="file" id="sd-chunked-file" accept=".zip" />
                        <div class="sd-upload-info">
                            <span class="dashicons dashicons-networking"></span>
                            <p>Select any size ZIP file - it will be uploaded in chunks</p>
                        </div>
                    </div>
                    
                    <div class="sd-chunked-info" id="sd-chunked-info" style="display: none; margin-top: 15px;">
                        <div class="sd-chunked-file-info">
                            <strong>File:</strong> <span id="sd-chunked-filename"></span><br>
                            <strong>Size:</strong> <span id="sd-chunked-filesize"></span><br>
                            <strong>Chunks:</strong> <span id="sd-chunked-count"></span> x 2MB
                        </div>
                    </div>
                    
                    <!-- Chunked Progress -->
                    <div class="rp-chunk-progress-container" id="rp-chunk-progress-container" style="display: none;">
                        <h4>Upload Progress</h4>
                        <div class="rp-chunk-progress-bar">
                            <div class="rp-chunk-progress-fill" id="rp-chunk-progress-fill"></div>
                        </div>
                        <div class="rp-chunk-stats">
                            <span id="rp-chunk-status">Preparing...</span>
                            <span id="rp-chunk-percent">0%</span>
                        </div>
                        <div class="rp-chunk-details" id="rp-chunk-details">
                            <small>Chunk <span id="rp-chunk-current">0</span> of <span id="rp-chunk-total">0</span></small>
                            <small>Speed: <span id="rp-chunk-speed">--</span></small>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Method: URL Import -->
            <div class="sd-upload-method sd-method-url" style="display: none;">
                <div class="rp-url-import-box">
                    <h4><span class="dashicons dashicons-admin-links"></span> Import from URL</h4>
                    <p class="description">Enter a direct download URL to a ZIP file. This bypasses server upload limits.</p>
                    <input type="url" id="sd-import-url" class="large-text" placeholder="https://example.com/your-page.zip" />
                    <p class="description">Works with any publicly accessible ZIP file URL.</p>
                </div>
            </div>
            
            <!-- Method: FTP/Server -->
            <div class="sd-upload-method sd-method-ftp" style="display: none;">
                <div class="sd-ftp-import-box">
                    <h4><span class="dashicons dashicons-category"></span> Import from Server</h4>
                    <p class="description">Upload your ZIP via FTP/SFTP first, then import it here.</p>
                    
                    <div class="sd-ftp-instructions">
                        <strong>Instructions:</strong>
                        <ol>
                            <li>Upload your ZIP file via FTP/SFTP to this directory:</li>
                            <li><code class="sd-path-code"><?php echo esc_html($import_dir); ?></code></li>
                            <li>Click "Refresh List" below to see your file</li>
                            <li>Select the file and import</li>
                        </ol>
                        
                        <div class="sd-ftp-actions" style="margin-top: 15px;">
                            <button type="button" id="rp-refresh-ftp" class="button">
                                <span class="dashicons dashicons-update"></span> Refresh List
                            </button>
                            <button type="button" id="rp-clear-ftp" class="button" style="margin-left: 10px;">
                                <span class="dashicons dashicons-trash"></span> Clear All Files
                            </button>
                        </div>
                    </div>
                    
                    <div class="sd-ftp-files" id="sd-ftp-files" style="margin-top: 20px;">
                        <?php if (!empty($existing_zips)): ?>
                            <table class="widefat striped">
                                <thead>
                                    <tr>
                                        <th style="width: 30px;"></th>
                                        <th>Filename</th>
                                        <th>Size</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($existing_zips as $zip): ?>
                                        <tr>
                                            <td><input type="radio" name="sd-ftp-select" value="<?php echo esc_attr($zip['name']); ?>" /></td>
                                            <td><strong><?php echo esc_html($zip['name']); ?></strong></td>
                                            <td><?php echo esc_html($zip['size']); ?></td>
                                            <td><?php echo esc_html($zip['date']); ?></td>
                                            <td>
                                                <button type="button" class="button button-small rp-delete-ftp-file" data-file="<?php echo esc_attr($zip['name']); ?>">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        <?php else: ?>
                            <div class="sd-no-files">
                                <span class="dashicons dashicons-media-archive" style="font-size: 48px; width: 48px; height: 48px; opacity: 0.3;"></span>
                                <p>No ZIP files found in the import directory.</p>
                                <p class="description">Upload a file via FTP to: <code><?php echo esc_html($import_dir); ?></code></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            
            <div class="sd-import-options">
                <h3>Import Options</h3>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Page Title</th>
                        <td>
                            <input type="text" id="sd-page-title" class="regular-text" placeholder="e.g., Our Services" />
                            <p class="description">Leave empty to use title from config.json or filename</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Page Slug</th>
                        <td>
                            <input type="text" id="sd-page-slug" class="regular-text" placeholder="e.g., services" />
                            <p class="description">Leave empty to auto-generate from title</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Page Template</th>
                        <td>
                            <select id="sd-page-template">
                                <option value="default">Default Template</option>
                                <?php
                                $templates = get_page_templates();
                                foreach ($templates as $name => $file) {
                                    echo '<option value="' . esc_attr($file) . '">' . esc_html($name) . '</option>';
                                }
                                ?>
                                <option value="blank">Blank Template (Full Width)</option>
                                <option value="elementor_canvas">Elementor Canvas</option>
                                <option value="elementor_header_footer">Elementor Full Width</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">CSS Location</th>
                        <td>
                            <select id="sd-css-location">
                                <option value="inline">Inline (in page content)</option>
                                <option value="theme">Theme Additional CSS</option>
                                <option value="both">Both</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Status</th>
                        <td>
                            <select id="sd-page-status">
                                <option value="publish">Published</option>
                                <option value="draft">Draft</option>
                                <option value="private">Private</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Parent Page</th>
                        <td>
                            <?php
                            $pages = get_pages();
                            echo '<select id="sd-parent-page">';
                            echo '<option value="0">No Parent</option>';
                            foreach ($pages as $page) {
                                echo '<option value="' . $page->ID . '">' . esc_html($page->post_title) . '</option>';
                            }
                            echo '</select>';
                            ?>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Replace Existing</th>
                        <td>
                            <label class="rp-checkbox-label">
                                <input type="checkbox" id="sd-replace-existing" />
                                Replace page if one with same slug exists
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div class="sd-import-actions">
                <button type="button" id="sd-import-btn" class="button button-primary button-large">
                    <span class="dashicons dashicons-upload"></span> Import Page
                </button>
                <span class="spinner" id="sd-import-spinner"></span>
            </div>
        </div>
        
        <!-- Progress Section -->
        <div class="sd-progress-section" id="sd-progress-section" style="display: none;">
            <h3>Import Progress</h3>
            <div class="sd-progress-bar">
                <div class="sd-progress-fill" id="sd-progress-fill"></div>
            </div>
            <div class="sd-progress-log" id="sd-progress-log"></div>
        </div>
        
        <!-- Result Section -->
        <div class="sd-result-section" id="sd-result-section" style="display: none;">
            <h3>Import Result</h3>
            <div class="sd-result-content" id="sd-result-content"></div>
        </div>
        
        <style>
            .sd-method-tabs {
                display: flex;
                gap: 10px;
                margin: 20px 0;
                padding: 10px;
                background: #f6f7f7;
                border-radius: 8px;
            }
            
            .sd-method-tab {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 15px 20px;
                background: #fff;
                border: 2px solid #dcdcde;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .sd-method-tab:hover {
                border-color: #2271b1;
                background: #f0f6fc;
            }
            
            .sd-method-tab.active {
                border-color: #2271b1;
                background: #2271b1;
                color: #fff;
            }
            
            .sd-method-tab .dashicons {
                font-size: 24px;
                width: 24px;
                height: 24px;
                margin-bottom: 8px;
            }
            
            .sd-method-tab small {
                font-size: 11px;
                opacity: 0.7;
                margin-top: 5px;
            }
            
            .sd-method-tab.active small {
                color: #fff;
            }
            
            .rp-url-import-box, .sd-ftp-import-box, .sd-chunked-import-box {
                background: #fff;
                padding: 20px;
                border: 1px solid #dcdcde;
                border-radius: 8px;
                margin-top: 15px;
            }
            
            .rp-url-import-box h4, .sd-ftp-import-box h4, .sd-chunked-import-box h4 {
                margin-top: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            /* Chunked Upload Styles */
            .sd-chunked-file-info {
                background: #f6f7f7;
                padding: 15px;
                border-radius: 6px;
                line-height: 1.8;
            }
            
            .rp-chunk-progress-container {
                background: #f6f7f7;
                padding: 20px;
                border-radius: 8px;
                margin-top: 15px;
            }
            
            .rp-chunk-progress-container h4 {
                margin: 0 0 15px 0;
            }
            
            .rp-chunk-progress-bar {
                height: 20px;
                background: #dcdcde;
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .rp-chunk-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #2271b1, #00a32a);
                border-radius: 10px;
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .rp-chunk-stats {
                display: flex;
                justify-content: space-between;
                font-weight: 600;
                margin-bottom: 10px;
            }
            
            .rp-chunk-details {
                display: flex;
                justify-content: space-between;
                color: #646970;
            }
            
            .sd-ftp-instructions {
                background: #f6f7f7;
                padding: 15px;
                border-radius: 6px;
                margin-top: 15px;
            }
            
            .sd-ftp-instructions ol {
                margin: 10px 0 0 20px;
            }
            
            .sd-ftp-instructions li {
                margin-bottom: 8px;
            }
            
            .sd-path-code {
                display: block;
                background: #1e1e1e;
                color: #9cdcfe;
                padding: 10px 15px;
                border-radius: 4px;
                margin: 10px 0;
                font-size: 12px;
                word-break: break-all;
            }
            
            .sd-no-files {
                text-align: center;
                padding: 40px 20px;
                color: #646970;
            }
            
            .sd-no-files .dashicons {
                display: block;
                margin: 0 auto 15px;
            }
            
            @media screen and (max-width: 782px) {
                .sd-method-tabs {
                    flex-direction: column;
                }
            }
        </style>
        
        <script>
            jQuery(document).ready(function($) {
                // Method tab switching
                $('.sd-method-tab').on('click', function() {
                    var method = $(this).data('method');
                    
                    $('.sd-method-tab').removeClass('active');
                    $(this).addClass('active');
                    
                    $('.sd-upload-method').hide();
                    $('.sd-method-' + method).show();
                    
                    // Store selected method
                    $('#sd-selected-method').val(method);
                });
                
                // Refresh FTP files list
                $('#rp-refresh-ftp').on('click', function() {
                    location.reload();
                });
                
                // Delete FTP file
                $('.rp-delete-ftp-file').on('click', function() {
                    var file = $(this).data('file');
                    if (confirm('Delete ' + file + '?')) {
                        $.ajax({
                            url: sdImporter.ajax_url,
                            type: 'POST',
                            data: {
                                action: 'sd_delete_ftp_file',
                                nonce: sdImporter.nonce,
                                filename: file
                            },
                            success: function(response) {
                                if (response.success) {
                                    location.reload();
                                } else {
                                    alert(response.data.message);
                                }
                            }
                        });
                    }
                });
                
                // Clear all FTP files
                $('#rp-clear-ftp').on('click', function() {
                    if (confirm('Delete all ZIP files from the import directory?')) {
                        $.ajax({
                            url: sdImporter.ajax_url,
                            type: 'POST',
                            data: {
                                action: 'sd_clear_ftp_files',
                                nonce: sdImporter.nonce
                            },
                            success: function(response) {
                                if (response.success) {
                                    location.reload();
                                } else {
                                    alert(response.data.message);
                                }
                            }
                        });
                    }
                });
            });
        </script>
        
        <!-- Hidden input for selected method -->
        <input type="hidden" id="sd-selected-method" value="browser" />
        <?php
    }
    
    /**
     * Render Export Tab
     */
    private function render_export_tab() {
        $pages = get_pages(array('post_status' => array('publish', 'draft', 'private')));
        ?>
        <div class="sd-export-section">
            <h2>Export Page for Z.ai</h2>
            <p class="description">Export any WordPress page to a ZIP file that Z.ai can use for further development. The export includes HTML, CSS, images, and a context file for Z.ai.</p>
            
            <div class="sd-export-form">
                <table class="form-table">
                    <tr>
                        <th scope="row">Select Page</th>
                        <td>
                            <select id="sd-export-page" class="regular-text">
                                <option value="">-- Select a page to export --</option>
                                <?php foreach ($pages as $page): ?>
                                    <option value="<?php echo $page->ID; ?>">
                                        <?php echo esc_html($page->post_title); ?> 
                                        (/<?php echo esc_html($page->post_name); ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Export Options</th>
                        <td>
                            <label class="rp-checkbox-label">
                                <input type="checkbox" id="sd-export-images" checked />
                                Include images from Media Library
                            </label>
                            <br><br>
                            <label class="rp-checkbox-label">
                                <input type="checkbox" id="sd-export-css" checked />
                                Extract inline CSS to separate file
                            </label>
                            <br><br>
                            <label class="rp-checkbox-label">
                                <input type="checkbox" id="sd-export-context" checked />
                                Include Z.ai context file (for future development)
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Development Notes</th>
                        <td>
                            <textarea id="sd-export-notes" class="large-text" rows="4" placeholder="Add notes for Z.ai about what changes you want made to this page..."></textarea>
                            <p class="description">Describe what modifications or improvements you want Z.ai to make</p>
                        </td>
                    </tr>
                </table>
                
                <div class="sd-export-actions">
                    <button type="button" id="rp-preview-export-btn" class="button">
                        <span class="dashicons dashicons-visibility"></span> Preview Export
                    </button>
                    <button type="button" id="sd-export-btn" class="button button-primary button-large">
                        <span class="dashicons dashicons-download"></span> Export ZIP
                    </button>
                    <span class="spinner" id="sd-export-spinner"></span>
                </div>
            </div>
            
            <!-- Preview Section -->
            <div class="sd-export-preview" id="sd-export-preview" style="display: none;">
                <h3>Export Preview</h3>
                <div class="rp-preview-content" id="rp-preview-content"></div>
            </div>
            
            <!-- Z.ai Context Generator -->
            <div class="rp-zai-context-section">
                <h3>Generated Z.ai Context</h3>
                <p class="description">This context file will be included in the export to help Z.ai understand the page:</p>
                <div class="rp-context-preview">
                    <textarea id="rp-zai-context-preview" class="rp-prompt-textarea" readonly style="min-height: 200px;"></textarea>
                    <button type="button" id="rp-copy-context" class="button" style="margin-top: 10px;">
                        <span class="dashicons dashicons-clipboard"></span> Copy Context for Z.ai
                    </button>
                </div>
            </div>
        </div>
        
        <style>
            .sd-export-section {
                background: #fff;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .sd-export-section h2 {
                margin-top: 0;
            }
            
            .sd-export-form {
                margin-bottom: 30px;
            }
            
            .sd-export-actions {
                display: flex;
                gap: 10px;
                align-items: center;
                margin-top: 20px;
            }
            
            .sd-export-actions .dashicons {
                margin-right: 5px;
            }
            
            .sd-export-preview {
                margin-top: 30px;
                padding: 20px;
                background: #f6f7f7;
                border-radius: 8px;
            }
            
            .rp-preview-content {
                background: #1e1e1e;
                color: #9cdcfe;
                padding: 15px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                max-height: 400px;
                overflow-y: auto;
                white-space: pre-wrap;
            }
            
            .rp-zai-context-section {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dcdcde;
            }
            
            .rp-context-preview {
                margin-top: 15px;
            }
            
            .sd-export-summary {
                background: #e7f7ff;
                border: 1px solid #0085FF;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
            }
            
            .sd-export-summary h4 {
                margin: 0 0 10px 0;
                color: #0073aa;
            }
            
            .sd-export-summary ul {
                margin: 0;
                padding-left: 20px;
            }
            
            .sd-export-summary li {
                margin-bottom: 5px;
            }
        </style>
        
        <script>
            jQuery(document).ready(function($) {
                // Page selection change - update context preview
                $('#sd-export-page').on('change', function() {
                    var pageId = $(this).val();
                    if (pageId) {
                        updateContextPreview(pageId);
                    } else {
                        $('#rp-zai-context-preview').val('');
                    }
                });
                
                // Notes change - update context
                $('#sd-export-notes').on('input', function() {
                    var pageId = $('#sd-export-page').val();
                    if (pageId) {
                        updateContextPreview(pageId);
                    }
                });
                
                function updateContextPreview(pageId) {
                    var notes = $('#sd-export-notes').val();
                    
                    $.ajax({
                        url: sdImporter.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'sd_preview_export',
                            nonce: sdImporter.nonce,
                            page_id: pageId,
                            notes: notes
                        },
                        success: function(response) {
                            if (response.success) {
                                $('#rp-zai-context-preview').val(response.data.context);
                            }
                        }
                    });
                }
                
                // Preview export
                $('#rp-preview-export-btn').on('click', function() {
                    var pageId = $('#sd-export-page').val();
                    if (!pageId) {
                        alert('Please select a page to preview.');
                        return;
                    }
                    
                    var $btn = $(this);
                    $btn.prop('disabled', true);
                    
                    $.ajax({
                        url: sdImporter.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'sd_get_page_content',
                            nonce: sdImporter.nonce,
                            page_id: pageId,
                            extract_css: $('#sd-export-css').is(':checked')
                        },
                        success: function(response) {
                            if (response.success) {
                                $('#rp-preview-content').text(response.data.html);
                                $('#sd-export-preview').show();
                            } else {
                                alert(response.data.message || 'Error loading page content.');
                            }
                        },
                        complete: function() {
                            $btn.prop('disabled', false);
                        }
                    });
                });
                
                // Export ZIP
                $('#sd-export-btn').on('click', function() {
                    var pageId = $('#sd-export-page').val();
                    if (!pageId) {
                        alert('Please select a page to export.');
                        return;
                    }
                    
                    var $btn = $(this);
                    var $spinner = $('#sd-export-spinner');
                    
                    $btn.prop('disabled', true);
                    $spinner.addClass('is-active');
                    
                    $.ajax({
                        url: sdImporter.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'sd_export_page',
                            nonce: sdImporter.nonce,
                            page_id: pageId,
                            include_images: $('#sd-export-images').is(':checked'),
                            extract_css: $('#sd-export-css').is(':checked'),
                            include_context: $('#sd-export-context').is(':checked'),
                            notes: $('#sd-export-notes').val()
                        },
                        success: function(response) {
                            if (response.success) {
                                // Trigger download
                                var link = document.createElement('a');
                                link.href = response.data.download_url;
                                link.download = response.data.filename;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                
                                // Show success message
                                showExportResult(response.data, true);
                            } else {
                                alert(response.data.message || 'Error exporting page.');
                            }
                        },
                        complete: function() {
                            $btn.prop('disabled', false);
                            $spinner.removeClass('is-active');
                        }
                    });
                });
                
                function showExportResult(data, success) {
                    var $result = $('<div class="sd-export-result" style="margin-top: 20px; padding: 15px; background: ' + (success ? '#d4edda' : '#f8d7da') + '; border-radius: 8px;">' +
                        '<strong>' + (success ? '✓ Export Successful!' : '✗ Export Failed') + '</strong><br>' +
                        'Filename: ' + data.filename + '<br>' +
                        'Images exported: ' + data.images_count + '<br>' +
                        '<a href="' + data.download_url + '" download>Download again</a>' +
                        '</div>');
                    
                    $('.sd-export-form').after($result);
                    setTimeout(function() {
                        $result.fadeOut(function() { $(this).remove(); });
                    }, 10000);
                }
                
                // Copy context
                $('#rp-copy-context').on('click', function() {
                    var text = $('#rp-zai-context-preview').val();
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(function() {
                            showCopiedNotice();
                        });
                    } else {
                        var textarea = document.createElement('textarea');
                        textarea.value = text;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        showCopiedNotice();
                    }
                });
                
                function showCopiedNotice() {
                    var $notice = $('<div class="rp-copied-notice" style="position: fixed; bottom: 30px; right: 30px; background: #00a32a; color: #fff; padding: 12px 20px; border-radius: 6px; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 4px 12px rgba(0, 163, 42, 0.3);"><span class="dashicons dashicons-yes-alt"></span> Copied to clipboard!</div>');
                    $('body').append($notice);
                    setTimeout(function() {
                        $notice.fadeOut(function() { $(this).remove(); });
                    }, 2000);
                }
            });
        </script>
        <?php
    }
    
    /**
     * Render Z.ai Prompt Tab
     */
    private function render_zai_prompt_tab() {
        $site_url = get_site_url();
        $theme_name = wp_get_theme()->get('Name');
        
        $zai_prompt = $this->get_zai_prompt($site_url, $theme_name);
        ?>
        <div class="rp-zai-prompt-section">
            <div class="rp-prompt-header">
                <h2>Copy Prompt for Z.ai</h2>
                <p class="description">Copy and paste this prompt to Z.ai when asking for a feature page. Z.ai will create the page in the correct format for this plugin.</p>
            </div>
            
            <div class="rp-prompt-actions">
                <button type="button" id="rp-copy-prompt" class="button button-primary">
                    <span class="dashicons dashicons-clipboard"></span> Copy to Clipboard
                </button>
                <button type="button" id="rp-copy-short-prompt" class="button">
                    <span class="dashicons dashicons-editor-contract"></span> Copy Short Version
                </button>
            </div>
            
            <div class="rp-prompt-container">
                <div class="rp-prompt-label">Full Prompt (Recommended):</div>
                <textarea id="rp-zai-full-prompt" class="rp-prompt-textarea" readonly><?php echo esc_textarea($zai_prompt['full']); ?></textarea>
            </div>
            
            <div class="rp-prompt-container">
                <div class="rp-prompt-label">Short Prompt (For Quick Reference):</div>
                <textarea id="rp-zai-short-prompt" class="rp-prompt-textarea short" readonly><?php echo esc_textarea($zai_prompt['short']); ?></textarea>
            </div>
            
            <div class="rp-structure-reference">
                <h3>ZIP File Structure Reference</h3>
                <div class="rp-structure-grid">
                    <div class="rp-structure-box">
                        <h4>Required Files</h4>
                        <pre class="rp-code-block">your-page.zip
├── index.html      (or page.html)
├── style.css       (optional)
├── config.json     (optional)
└── images/         (optional)
    ├── image1.jpg
    └── image2.png</pre>
                    </div>
                    
                    <div class="rp-structure-box">
                        <h4>config.json Example</h4>
                        <pre class="rp-code-block">{
    "title": "Page Title",
    "slug": "page-slug",
    "template": "elementor_canvas",
    "meta": {
        "_yoast_wpseo_title": "SEO Title",
        "_yoast_wpseo_metadesc": "Meta description"
    }
}</pre>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .rp-zai-prompt-section {
                background: #fff;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .rp-prompt-header h2 {
                margin-top: 0;
            }
            
            .rp-prompt-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .rp-prompt-actions .dashicons {
                margin-right: 5px;
            }
            
            .rp-prompt-container {
                margin-bottom: 20px;
            }
            
            .rp-prompt-label {
                font-weight: 600;
                margin-bottom: 8px;
                color: #1d2327;
            }
            
            .rp-prompt-textarea {
                width: 100%;
                min-height: 300px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
                line-height: 1.6;
                padding: 15px;
                border: 1px solid #dcdcde;
                border-radius: 4px;
                background: #f9f9f9;
                resize: vertical;
            }
            
            .rp-prompt-textarea.short {
                min-height: 150px;
            }
            
            .rp-structure-reference {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dcdcde;
            }
            
            .rp-structure-reference h3 {
                margin-top: 0;
            }
            
            .rp-structure-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .rp-structure-box {
                background: #f6f7f7;
                padding: 15px;
                border-radius: 4px;
            }
            
            .rp-structure-box h4 {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 14px;
            }
            
            .rp-code-block {
                background: #1e1e1e;
                color: #9cdcfe;
                padding: 15px;
                border-radius: 4px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                line-height: 1.6;
                overflow-x: auto;
                margin: 0;
            }
            
            @media screen and (max-width: 782px) {
                .rp-structure-grid {
                    grid-template-columns: 1fr;
                }
                
                .rp-prompt-actions {
                    flex-direction: column;
                }
            }
        </style>
        
        <script>
            jQuery(document).ready(function($) {
                $('#rp-copy-prompt').on('click', function() {
                    var text = $('#rp-zai-full-prompt').val();
                    copyToClipboard(text);
                });
                
                $('#rp-copy-short-prompt').on('click', function() {
                    var text = $('#rp-zai-short-prompt').val();
                    copyToClipboard(text);
                });
                
                function copyToClipboard(text) {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(text).then(function() {
                            showCopiedNotice();
                        });
                    } else {
                        var textarea = document.createElement('textarea');
                        textarea.value = text;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                        showCopiedNotice();
                    }
                }
                
                function showCopiedNotice() {
                    var $notice = $('<div class="rp-copied-notice" style="position: fixed; bottom: 30px; right: 30px; background: #00a32a; color: #fff; padding: 12px 20px; border-radius: 6px; display: flex; align-items: center; gap: 8px; font-weight: 500; box-shadow: 0 4px 12px rgba(0, 163, 42, 0.3);"><span class="dashicons dashicons-yes-alt"></span> Copied to clipboard!</div>');
                    $('body').append($notice);
                    setTimeout(function() {
                        $notice.fadeOut(function() { $(this).remove(); });
                    }, 2000);
                }
            });
        </script>
        <?php
    }
    
    /**
     * Render History Tab
     */
    private function render_history_tab() {
        $history = get_option('rp_page_importer_history', array());
        ?>
        <div class="rp-history-section-full">
            <h2>Import/Export History</h2>
            
            <?php if (empty($history)): ?>
                <div class="rp-no-history">
                    <span class="dashicons dashicons-archive"></span>
                    <p>No pages imported yet.</p>
                    <a href="?page=sd-page-importer&tab=import" class="button">Import Your First Page</a>
                </div>
            <?php else: ?>
                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th style="width: 40%;">Page</th>
                            <th>Images</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($history as $item): 
                            $page_exists = get_post($item['page_id']);
                        ?>
                        <tr>
                            <td>
                                <?php if ($page_exists): ?>
                                    <strong>
                                        <a href="<?php echo esc_url(get_permalink($item['page_id'])); ?>" target="_blank">
                                            <?php echo esc_html($item['title']); ?>
                                        </a>
                                    </strong>
                                    <br><small>Slug: <?php echo esc_html($item['slug']); ?></small>
                                <?php else: ?>
                                    <span class="rp-deleted">[Deleted] <?php echo esc_html($item['title']); ?></span>
                                <?php endif; ?>
                            </td>
                            <td><?php echo intval($item['images_count']); ?></td>
                            <td><?php echo esc_html($item['timestamp']); ?></td>
                            <td>
                                <?php if ($page_exists): ?>
                                    <a href="<?php echo esc_url(get_edit_post_link($item['page_id'])); ?>" class="button button-small">Edit</a>
                                    <a href="<?php echo esc_url(get_permalink($item['page_id'])); ?>" target="_blank" class="button button-small">View</a>
                                    <a href="?page=sd-page-importer&tab=export" class="button button-small" onclick="localStorage.setItem('rp_export_page', '<?php echo $item['page_id']; ?>')">Export</a>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        
        <style>
            .rp-history-section-full {
                background: #fff;
                padding: 25px;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .rp-history-section-full h2 {
                margin-top: 0;
            }
            
            .rp-no-history {
                text-align: center;
                padding: 60px 20px;
                color: #646970;
            }
            
            .rp-no-history .dashicons {
                font-size: 48px;
                width: 48px;
                height: 48px;
                margin-bottom: 15px;
                opacity: 0.5;
            }
            
            .rp-no-history p {
                font-size: 16px;
                margin-bottom: 20px;
            }
            
            .rp-deleted {
                color: #d63638;
            }
        </style>
        <?php
    }
    
    /**
     * AJAX: Get page content for preview
     */
    public function ajax_get_page_content() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $page_id = isset($_POST['page_id']) ? intval($_POST['page_id']) : 0;
        $extract_css = isset($_POST['extract_css']) && $_POST['extract_css'] === 'true';
        
        $page = get_post($page_id);
        if (!$page) {
            wp_send_json_error(array('message' => 'Page not found.'));
        }
        
        $content = $page->post_content;
        
        if ($extract_css) {
            // Extract inline CSS
            preg_match_all('/<style[^>]*>(.*?)<\/style>/is', $content, $matches);
            $css = implode("\n\n", $matches[1]);
            $html = preg_replace('/<style[^>]*>.*?<\/style>/is', '<link rel="stylesheet" href="style.css">', $content);
            
            wp_send_json_success(array(
                'html' => $html,
                'css' => $css,
                'title' => $page->post_title,
                'slug' => $page->post_name
            ));
        } else {
            wp_send_json_success(array(
                'html' => $content,
                'title' => $page->post_title,
                'slug' => $page->post_name
            ));
        }
    }
    
    /**
     * AJAX: Preview export (generate context for Z.ai)
     */
    public function ajax_preview_export() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $page_id = isset($_POST['page_id']) ? intval($_POST['page_id']) : 0;
        $notes = isset($_POST['notes']) ? sanitize_textarea_field($_POST['notes']) : '';
        
        $page = get_post($page_id);
        if (!$page) {
            wp_send_json_error(array('message' => 'Page not found.'));
        }
        
        $context = $this->generate_zai_context($page, $notes);
        
        wp_send_json_success(array(
            'context' => $context
        ));
    }
    
    /**
     * Generate Z.ai context for a page
     */
    private function generate_zai_context($page, $notes = '') {
        $template = get_post_meta($page->ID, '_wp_page_template', true);
        $permalink = get_permalink($page->ID);
        $edit_url = get_edit_post_link($page->ID);
        
        // Get images used in the page
        $content = $page->post_content;
        preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $content, $img_matches);
        $images = array_unique($img_matches[1] ?? array());
        
        // Get theme info
        $theme = wp_get_theme();
        
        $context = <<<CONTEXT
# Page Export for Z.ai Development

## Page Information
- **Title:** {$page->post_title}
- **Slug:** {$page->post_name}
- **URL:** {$permalink}
- **Page ID:** {$page->ID}
- **Template:** {$template}
- **Status:** {$page->post_status}
- **Last Modified:** {$page->post_modified}

## WordPress Environment
- **Site URL:** {$this->get_site_url_safe()}
- **Theme:** {$theme->get('Name')} v{$theme->get('Version')}
- **WordPress Version:** {$this->get_wp_version_safe()}

## Page Structure
- **Content Length:** " . strlen($content) . " characters
- **Images Used:** " . count($images) . "

## Images in Page
CONTEXT;

        if (!empty($images)) {
            foreach ($images as $img_url) {
                $context .= "\n- {$img_url}";
            }
        } else {
            $context .= "\n- No images detected in content";
        }
        
        if (!empty($notes)) {
            $context .= <<<CONTEXT


## Development Notes from User
{$notes}
CONTEXT;
        }
        
        $context .= <<<CONTEXT


## Request for Z.ai
Please review this exported page and help with the following:
1. Analyze the current page structure and design
2. Review any development notes above
3. Suggest improvements or implement requested changes
4. Export the modified page in the same format for re-import

## Export Format Expected
When making changes, please provide:
- index.html (or page.html) with the modified HTML
- style.css with all CSS (extracted from inline styles if needed)
- Updated images in the images/ folder if new images are needed
- config.json with page settings
- This context file updated with your changes

## Technical Notes for Z.ai
- This page was exported from WordPress
- Images are in the WordPress Media Library
- CSS may be inline in the HTML (extract to style.css)
- Use relative paths for images (images/filename.jpg)
- Make responsive and mobile-friendly changes
- Test dark/light mode if applicable

---
*Generated by Soft Dynamix Page Importer v{$this->version} on " . current_time('mysql') . "*
CONTEXT;

        return $context;
    }
    
    /**
     * AJAX: Export page to ZIP
     */
    public function ajax_export_page() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $page_id = isset($_POST['page_id']) ? intval($_POST['page_id']) : 0;
        $include_images = isset($_POST['include_images']) && $_POST['include_images'] === 'true';
        $extract_css = isset($_POST['extract_css']) && $_POST['extract_css'] === 'true';
        $include_context = isset($_POST['include_context']) && $_POST['include_context'] === 'true';
        $notes = isset($_POST['notes']) ? sanitize_textarea_field($_POST['notes']) : '';
        
        $page = get_post($page_id);
        if (!$page) {
            wp_send_json_error(array('message' => 'Page not found.'));
        }
        
        // Create export directory
        $upload_dir = wp_upload_dir();
        $export_dir = $upload_dir['basedir'] . '/sd-exports/' . $page->post_name . '-' . time();
        
        if (!wp_mkdir_p($export_dir)) {
            wp_send_json_error(array('message' => 'Could not create export directory.'));
        }
        
        $images_dir = $export_dir . '/images';
        $images_count = 0;
        
        // Process content
        $content = $page->post_content;
        $css_content = '';
        
        if ($extract_css) {
            // Extract inline CSS
            preg_match_all('/<style[^>]*>(.*?)<\/style>/is', $content, $matches);
            $css_content = implode("\n\n", $matches[1]);
            $content = preg_replace('/<style[^>]*>.*?<\/style>/is', '<link rel="stylesheet" href="style.css">', $content);
        }
        
        if ($include_images) {
            wp_mkdir_p($images_dir);
            
            // Find and download images
            preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $page->post_content, $img_matches);
            $images = array_unique($img_matches[1] ?? array());
            
            foreach ($images as $img_url) {
                // Handle both absolute and relative URLs
                $img_path = $this->url_to_path($img_url);
                
                if ($img_path && file_exists($img_path)) {
                    $filename = basename(parse_url($img_url, PHP_URL_PATH));
                    $dest_path = $images_dir . '/' . $filename;
                    
                    if (copy($img_path, $dest_path)) {
                        // Replace URL in content
                        $content = str_replace($img_url, 'images/' . $filename, $content);
                        $images_count++;
                    }
                }
            }
        }
        
        // Write files
        file_put_contents($export_dir . '/index.html', $content);
        
        if (!empty($css_content)) {
            file_put_contents($export_dir . '/style.css', $css_content);
        }
        
        if ($include_context) {
            $context = $this->generate_zai_context($page, $notes);
            file_put_contents($export_dir . '/zai-context.md', $context);
        }
        
        // Create config.json
        $template = get_post_meta($page->ID, '_wp_page_template', true);
        $config = array(
            'title' => $page->post_title,
            'slug' => $page->post_name,
            'template' => $template ?: 'default',
            'status' => $page->post_status,
            'export_date' => current_time('mysql'),
            'source_site' => get_site_url(),
            'page_id' => $page->ID
        );
        file_put_contents($export_dir . '/config.json', json_encode($config, JSON_PRETTY_PRINT));
        
        // Create ZIP file
        $zip_filename = $page->post_name . '-export.zip';
        $zip_path = $upload_dir['basedir'] . '/sd-exports/' . $zip_filename;
        
        $zip = new ZipArchive();
        if ($zip->open($zip_path, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            wp_send_json_error(array('message' => 'Could not create ZIP file.'));
        }
        
        $this->add_directory_to_zip($zip, $export_dir, '');
        $zip->close();
        
        // Clean up export directory
        $this->recursive_delete($export_dir);
        
        $download_url = $upload_dir['baseurl'] . '/sd-exports/' . $zip_filename;
        
        wp_send_json_success(array(
            'message' => 'Export completed successfully!',
            'download_url' => $download_url,
            'filename' => $zip_filename,
            'images_count' => $images_count
        ));
    }
    
    /**
     * Convert URL to file path
     */
    private function url_to_path($url) {
        $upload_dir = wp_upload_dir();
        
        // Check if it's an upload URL
        if (strpos($url, $upload_dir['baseurl']) !== false) {
            return str_replace($upload_dir['baseurl'], $upload_dir['basedir'], $url);
        }
        
        // Check if it's a local URL
        $site_url = get_site_url();
        if (strpos($url, $site_url) !== false) {
            return str_replace($site_url, ABSPATH, $url);
        }
        
        return false;
    }
    
    /**
     * Add directory to ZIP archive recursively
     */
    private function add_directory_to_zip($zip, $dir, $prefix) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isDir()) {
                $zip->addEmptyDir($prefix . substr($file->getPathname(), strlen($dir) + 1));
            } else {
                $zip->addFile(
                    $file->getPathname(),
                    $prefix . substr($file->getPathname(), strlen($dir) + 1)
                );
            }
        }
    }
    
    /**
     * Get Z.ai prompt templates
     */
    private function get_zai_prompt($site_url, $theme_name) {
        $full_prompt = <<<PROMPT
I have a WordPress website with the "Soft Dynamix Page Importer" plugin installed. Please create a feature page that I can import using this plugin.

## ZIP File Structure Required
Create a ZIP package with this structure:
- index.html (or page.html) - Main HTML content
- style.css - All CSS styles
- config.json - Page configuration (see below)
- images/ folder - All images used in the page

## HTML Requirements
- Use relative paths for images: images/filename.jpg
- Use semantic HTML5 structure
- Include all content inline (no external JS files, use CDN or inline scripts)
- Make it responsive and mobile-friendly
- For dark backgrounds, set background-color on the main container

## CSS Requirements
- Put ALL styles in style.css
- Use CSS variables for colors for easy customization
- Include responsive breakpoints (mobile-first preferred)
- No @import statements (they may not work in all environments)

## config.json Format
Create a config.json file with this structure:
{
    "title": "Your Page Title",
    "slug": "your-page-slug",
    "template": "elementor_canvas",
    "description": "Brief description of the page",
    "meta": {
        "_yoast_wpseo_title": "SEO Title | Site Name",
        "_yoast_wpseo_metadesc": "Meta description for SEO (150-160 characters)"
    }
}

## Template Options
- "default" - Uses theme's default template
- "blank" - Full-width, no header/footer (recommended for custom pages)
- "elementor_canvas" - Elementor canvas mode
- "elementor_header_footer" - Elementor with theme header/footer

## Image Guidelines
- Use descriptive filenames: hero-image.jpg, service-1.jpg
- Optimize images for web (use WebP if possible)
- Include alt text in the HTML for accessibility
- Images will be automatically imported to WordPress Media Library

## WordPress Theme Info
- Site URL: {$site_url}
- Theme: {$theme_name}
- The plugin will automatically replace image paths with Media Library URLs

## Output Format
Please provide:
1. A download link to the complete ZIP file
2. A preview of the page (if possible)
3. The individual file contents for manual review

---

NOW, tell me what kind of page you want to create and I will build it in this format.
PROMPT;

        $short_prompt = <<<PROMPT
Create a WordPress feature page ZIP for the Soft Dynamix Page Importer plugin.

Required structure:
- index.html (main content)
- style.css (all styles)
- config.json (page settings: title, slug, template)
- images/ folder

Image paths: Use relative paths like images/photo.jpg
Templates: default, blank, elementor_canvas, elementor_header_footer

config.json format:
{
    "title": "Page Title",
    "slug": "page-slug", 
    "template": "blank",
    "meta": {"_yoast_wpseo_title": "SEO Title"}
}

What page would you like me to create?
PROMPT;

        return [
            'full' => $full_prompt,
            'short' => $short_prompt
        ];
    }
    
    /**
     * Safe get site URL
     */
    private function get_site_url_safe() {
        return get_site_url();
    }
    
    /**
     * Safe get WP version
     */
    private function get_wp_version_safe() {
        global $wp_version;
        return $wp_version;
    }
    
    /**
     * AJAX handler for importing pages
     * Supports both FormData (direct file upload) and base64 encoded data
     */
    public function ajax_import_page() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        // Create temp directory
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/sd-importer-temp-' . time();
        
        if (!wp_mkdir_p($temp_dir)) {
            wp_send_json_error(array('message' => 'Could not create temporary directory.'));
        }
        
        try {
            $zip_path = $temp_dir . '/import.zip';
            
            // Check if file was uploaded via FormData
            if (!empty($_FILES['zip_file']) && $_FILES['zip_file']['error'] === UPLOAD_ERR_OK) {
                // Handle FormData upload (preferred method)
                $uploaded_file = $_FILES['zip_file'];
                
                // Check file size against limits
                $max_size = wp_max_upload_size();
                if ($uploaded_file['size'] > $max_size) {
                    throw new Exception(sprintf(
                        'File size (%s) exceeds maximum upload size (%s). Please increase upload_max_filesize and post_max_size in php.ini or use the FTP method.',
                        size_format($uploaded_file['size']),
                        size_format($max_size)
                    ));
                }
                
                // Validate file type
                $file_type = wp_check_filetype_and_ext($uploaded_file['tmp_name'], $uploaded_file['name']);
                if ($file_type['ext'] !== 'zip') {
                    throw new Exception('Please upload a ZIP file.');
                }
                
                // Move uploaded file
                if (!move_uploaded_file($uploaded_file['tmp_name'], $zip_path)) {
                    throw new Exception('Could not save uploaded file.');
                }
                
                // Get options from POST
                $options = isset($_POST['options']) ? $_POST['options'] : array();
                
            } elseif (!empty($_POST['file_data'])) {
                // Handle base64 encoded data (legacy method)
                $file_data = $_POST['file_data'];
                $options = isset($_POST['options']) ? $_POST['options'] : array();
                
                // Decode and save the ZIP file
                $file_parts = explode(';base64,', $file_data);
                if (count($file_parts) !== 2) {
                    throw new Exception('Invalid file data format.');
                }
                
                $zip_data = base64_decode($file_parts[1]);
                
                if (file_put_contents($zip_path, $zip_data) === false) {
                    throw new Exception('Could not save ZIP file.');
                }
            } else {
                throw new Exception('No file received. Please select a ZIP file to import.');
            }
            
            // Extract ZIP
            $zip = new ZipArchive();
            if ($zip->open($zip_path) !== true) {
                throw new Exception('Could not open ZIP file. The file may be corrupted.');
            }
            
            $zip->extractTo($temp_dir);
            $zip->close();
            
            // Find the content directory
            $content_dir = $this->find_content_directory($temp_dir);
            
            // Parse config if exists
            $config = $this->parse_config($content_dir);
            
            // Merge options with config
            $page_title = !empty($options['title']) ? $options['title'] : 
                         (!empty($config['title']) ? $config['title'] : 'Imported Page');
            $page_slug = !empty($options['slug']) ? $options['slug'] : 
                        (!empty($config['slug']) ? $config['slug'] : sanitize_title($page_title));
            
            // Import images to media library
            $image_map = $this->import_images($content_dir);
            
            // Read and process HTML
            $html_content = $this->read_html($content_dir);
            if ($html_content === false) {
                throw new Exception('Could not find HTML file. Please include an .html file in your ZIP.');
            }
            
            // Replace image URLs
            $html_content = $this->replace_image_urls($html_content, $image_map);
            
            // Read CSS
            $css_content = $this->read_css($content_dir);
            
            // Determine template - default to blank for exact styling match
            $template = !empty($options['template']) ? $options['template'] : 
                       (!empty($config['template']) ? $config['template'] : 'blank');
            
            // Handle CSS location - for inline-styled HTML (Z.ai), just pass through
            $final_html = $html_content;
            
            // Add external CSS if present
            if (!empty($css_content)) {
                $css_location = isset($options['css_location']) ? $options['css_location'] : 'inline';
                $isolated_css = $this->isolate_css($css_content, $page_slug);
                
                if ($css_location === 'inline' || $css_location === 'both') {
                    $final_html = '<style id="sd-imported-styles">' . $isolated_css . '</style>' . $html_content;
                }
                
                if ($css_location === 'theme' || $css_location === 'both') {
                    $this->add_to_theme_css($css_content, $page_slug);
                }
            }
            
            // Minimal wrapper for full-width display - preserves inline styles
            $full_width_style = '<style>.sd-fullwidth{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;overflow-x:hidden}.sd-fullwidth img{max-width:100%;height:auto}</style>';
            $final_html = $full_width_style . '<div class="sd-fullwidth">' . $final_html . '</div>';
            
            // Create or update page
            $page_id = $this->create_page(array(
                'title' => $page_title,
                'slug' => $page_slug,
                'content' => $final_html,
                'template' => $template,
                'status' => !empty($options['status']) ? $options['status'] : 'publish',
                'parent' => !empty($options['parent']) ? intval($options['parent']) : 0,
                'replace' => !empty($options['replace']),
                'meta' => !empty($config['meta']) ? $config['meta'] : array(),
            ));
            
            if (is_wp_error($page_id)) {
                throw new Exception($page_id->get_error_message());
            }
            
            // Clean up temp directory
            $this->recursive_delete($temp_dir);
            
            // Get page URL
            $page_url = get_permalink($page_id);
            $edit_url = get_edit_post_link($page_id);
            
            // Save import history
            $this->save_import_history(array(
                'page_id' => $page_id,
                'title' => $page_title,
                'slug' => $page_slug,
                'images_count' => count($image_map),
                'timestamp' => current_time('mysql'),
            ));
            
            wp_send_json_success(array(
                'message' => 'Page imported successfully!',
                'page_id' => $page_id,
                'page_url' => $page_url,
                'edit_url' => $edit_url,
                'images_imported' => count($image_map),
                'css_added' => !empty($css_content),
            ));
            
        } catch (Exception $e) {
            // Clean up on error
            if (file_exists($temp_dir)) {
                $this->recursive_delete($temp_dir);
            }
            wp_send_json_error(array('message' => $e->getMessage()));
        }
    }
    
    /**
     * Find the main content directory
     */
    private function find_content_directory($extracted_dir) {
        $possible_paths = array(
            $extracted_dir,
            $extracted_dir . '/rp-wordpress-package',
            $extracted_dir . '/content',
            $extracted_dir . '/page',
        );
        
        // Check common paths first
        foreach ($possible_paths as $path) {
            if (file_exists($path . '/index.html') || file_exists($path . '/page.html') || 
                file_exists($path . '/content.html') || glob($path . '/*.html')) {
                return $path;
            }
        }
        
        // Search recursively for ANY HTML file
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($extracted_dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'html') {
                return $file->getPath();
            }
        }
        
        return $extracted_dir;
    }
    
    /**
     * Parse config.json if it exists
     */
    private function parse_config($dir) {
        $config_file = $dir . '/config.json';
        if (file_exists($config_file)) {
            $config_content = file_get_contents($config_file);
            return json_decode($config_content, true) ?: array();
        }
        return array();
    }
    
    /**
     * Import images to media library
     */
    private function import_images($dir) {
        $image_map = array();
        $images_dir = $dir . '/images';
        
        if (!is_dir($images_dir)) {
            $possible_dirs = ['img', 'assets/images', 'assets/img'];
            foreach ($possible_dirs as $img_dir) {
                if (is_dir($dir . '/' . $img_dir)) {
                    $images_dir = $dir . '/' . $img_dir;
                    break;
                }
            }
        }
        
        if (!is_dir($images_dir)) {
            return $image_map;
        }
        
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        
        // Get all image files and sort them by name for consistent ordering
        $image_files = array();
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($images_dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile() && $this->is_image_file($file->getPathname())) {
                $image_files[] = array(
                    'filename' => $file->getFilename(),
                    'filepath' => $file->getPathname(),
                );
            }
        }
        
        // Sort by filename for consistent ordering
        usort($image_files, function($a, $b) {
            return strnatcmp($a['filename'], $b['filename']);
        });
        
        // Track image index for {{IMAGE_N}} placeholders
        $image_index = 1;
        
        foreach ($image_files as $img_file) {
            $filename = $img_file['filename'];
            $filepath = $img_file['filepath'];
            
            $existing = $this->find_existing_image($filename);
            if ($existing) {
                $image_map[$filename] = $existing;
                // Also add numbered index for {{IMAGE_N}} placeholders
                $image_map['IMAGE_' . $image_index] = $existing;
                $image_index++;
                continue;
            }
            
            $attachment_id = $this->import_single_image($filepath, $filename);
            if ($attachment_id) {
                $image_data = array(
                    'id' => $attachment_id,
                    'url' => wp_get_attachment_url($attachment_id),
                );
                $image_map[$filename] = $image_data;
                // Also add numbered index for {{IMAGE_N}} placeholders
                $image_map['IMAGE_' . $image_index] = $image_data;
                $image_index++;
            }
        }
        
        return $image_map;
    }
    
    private function is_image_file($filepath) {
        $allowed_types = array('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg');
        $ext = strtolower(pathinfo($filepath, PATHINFO_EXTENSION));
        return in_array($ext, $allowed_types);
    }
    
    private function find_existing_image($filename) {
        $args = array(
            'post_type' => 'attachment',
            'post_status' => 'inherit',
            'posts_per_page' => 1,
            'meta_query' => array(
                array(
                    'key' => '_wp_attached_file',
                    'value' => $filename,
                    'compare' => 'LIKE',
                ),
            ),
        );
        
        $query = new WP_Query($args);
        if ($query->have_posts()) {
            $attachment_id = $query->posts[0]->ID;
            return array(
                'id' => $attachment_id,
                'url' => wp_get_attachment_url($attachment_id),
            );
        }
        
        return false;
    }
    
    private function import_single_image($filepath, $filename) {
        $upload_dir = wp_upload_dir();
        $dest_path = $upload_dir['path'] . '/' . $filename;
        
        $counter = 1;
        $original_name = pathinfo($filename, PATHINFO_FILENAME);
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        
        while (file_exists($dest_path)) {
            $filename = $original_name . '-' . $counter . '.' . $extension;
            $dest_path = $upload_dir['path'] . '/' . $filename;
            $counter++;
        }
        
        if (!copy($filepath, $dest_path)) {
            return false;
        }
        
        $filetype = wp_check_filetype($filename);
        $attachment = array(
            'guid' => $upload_dir['url'] . '/' . $filename,
            'post_mime_type' => $filetype['type'],
            'post_title' => sanitize_file_name($original_name),
            'post_content' => '',
            'post_status' => 'inherit',
        );
        
        $attachment_id = wp_insert_attachment($attachment, $dest_path);
        
        if (!is_wp_error($attachment_id)) {
            $attach_data = wp_generate_attachment_metadata($attachment_id, $dest_path);
            wp_update_attachment_metadata($attachment_id, $attach_data);
        }
        
        return $attachment_id;
    }
    
    private function read_html($dir) {
        // Priority list of HTML files to look for
        $html_files = ['index.html', 'page.html', 'content.html', 'main.html', 'home.html', 'template.html'];
        
        // First, check priority files
        foreach ($html_files as $file) {
            $filepath = $dir . '/' . $file;
            if (file_exists($filepath)) {
                return file_get_contents($filepath);
            }
        }
        
        // If not found, search for ANY .html file in the directory
        $files = glob($dir . '/*.html');
        if (!empty($files)) {
            // Sort by name, prefer files with common names
            usort($files, function($a, $b) {
                $priority = ['index', 'page', 'content', 'main', 'home', 'template'];
                $aName = basename($a, '.html');
                $bName = basename($b, '.html');
                $aPriority = array_search($aName, $priority);
                $bPriority = array_search($bName, $priority);
                if ($aPriority === false) $aPriority = 999;
                if ($bPriority === false) $bPriority = 999;
                return $aPriority - $bPriority;
            });
            return file_get_contents($files[0]);
        }
        
        // Also check subdirectories (one level deep)
        $subdirs = glob($dir . '/*', GLOB_ONLYDIR);
        foreach ($subdirs as $subdir) {
            $files = glob($subdir . '/*.html');
            if (!empty($files)) {
                return file_get_contents($files[0]);
            }
        }
        
        return false;
    }
    
    private function read_css($dir) {
        // Priority list of CSS files to look for
        $css_files = ['style.css', 'styles.css', 'custom.css', 'main.css', 'rp-css.css', 'theme.css', 'app.css'];
        
        foreach ($css_files as $file) {
            $filepath = $dir . '/' . $file;
            if (file_exists($filepath)) {
                return file_get_contents($filepath);
            }
        }
        
        // If not found, search for ANY .css file in the directory
        $files = glob($dir . '/*.css');
        if (!empty($files)) {
            // Sort and return the first CSS file found
            sort($files);
            return file_get_contents($files[0]);
        }
        
        return false;
    }
    
    private function replace_image_urls($html, $image_map) {
        // First, replace {{IMAGE_N}} style placeholders (Z.ai format)
        for ($i = 1; $i <= 100; $i++) {
            $placeholder = '{{IMAGE_' . $i . '}}';
            if (isset($image_map['IMAGE_' . $i])) {
                $html = str_replace($placeholder, $image_map['IMAGE_' . $i]['url'], $html);
            }
        }
        
        // Also replace standard image path patterns
        foreach ($image_map as $key => $image_data) {
            // Skip numbered indexes (already handled above)
            if (strpos($key, 'IMAGE_') === 0) {
                continue;
            }
            
            $original_name = $key;
            $patterns = array(
                'images/' . $original_name,
                './images/' . $original_name,
                'img/' . $original_name,
                './img/' . $original_name,
                'assets/images/' . $original_name,
                'assets/img/' . $original_name,
                $original_name, // Just the filename
            );
            
            foreach ($patterns as $pattern) {
                $html = str_replace($pattern, $image_data['url'], $html);
            }
        }
        
        return $html;
    }
    
    /**
     * Isolate CSS to prevent theme conflicts
     * Adds specificity and ensures styles work within wrapper
     */
    private function isolate_css($css, $slug) {
        // Check if CSS contains theme-specific selectors that should NOT be prefixed
        $theme_selectors = ['body', 'html', '.elementor', '.ast-', '#page', '.site', '.entry-content', '.site-content'];
        $is_theme_css = false;
        foreach ($theme_selectors as $selector) {
            if (strpos($css, $selector) !== false) {
                $is_theme_css = true;
                break;
            }
        }
        
        // For theme-specific CSS, don't modify it - pass through as-is
        if ($is_theme_css) {
            return "/* SD Page Importer - Theme Compatibility CSS */\n" . $css;
        }
        
        // For custom CSS, add minimal reset and prefix selectors
        $reset_css = <<<CSS
/* SD Page Importer - Minimal reset for Z.ai preview match */
.sd-fullwidth {
    display: block;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
}
.sd-fullwidth *,
.sd-fullwidth *::before,
.sd-fullwidth *::after {
    box-sizing: border-box;
}
.sd-fullwidth img {
    max-width: 100%;
    height: auto;
}

CSS;

        // Prefix all selectors with the wrapper class for isolation
        $prefixed_css = preg_replace_callback(
            '/([^{]+)\{([^}]*)\}/s',
            function($matches) {
                $selectors = $matches[1];
                $rules = $matches[2];
                
                // Skip @media, @keyframes, @import, etc.
                if (preg_match('/^\s*@/', $selectors)) {
                    return $selectors . '{' . $rules . '}';
                }
                
                // Prefix each selector
                $prefixed_selectors = array_map(function($selector) {
                    $selector = trim($selector);
                    if (empty($selector)) return $selector;
                    
                    // Don't prefix if already prefixed
                    if (strpos($selector, '.sd-fullwidth') === 0) {
                        return $selector;
                    }
                    
                    // Prefix with the wrapper class
                    return '.sd-fullwidth ' . $selector;
                }, explode(',', $selectors));
                
                return implode(', ', $prefixed_selectors) . '{' . $rules . '}';
            },
            $css
        );
        
        return $reset_css . $prefixed_css;
    }
    
    private function add_to_theme_css($css, $slug) {
        $current_css = get_option('theme_mods_' . get_option('stylesheet'), array());
        
        $css_key = 'custom_css_post_id';
        $css_post_id = isset($current_css[$css_key]) ? $current_css[$css_key] : false;
        
        if ($css_post_id) {
            $post = get_post($css_post_id);
            if ($post) {
                $new_css = "/* Soft Dynamix Page Importer - {$slug} */\n{$css}\n/* End {$slug} */\n\n" . $post->post_content;
                wp_update_post(array(
                    'ID' => $css_post_id,
                    'post_content' => $new_css,
                ));
                return;
            }
        }
        
        $post_id = wp_insert_post(array(
            'post_title' => 'Custom CSS',
            'post_name' => 'custom-css',
            'post_content' => "/* Soft Dynamix Page Importer - {$slug} */\n{$css}\n/* End {$slug} */",
            'post_status' => 'publish',
            'post_type' => 'custom_css',
        ));
        
        if ($post_id) {
            $current_css[$css_key] = $post_id;
            update_option('theme_mods_' . get_option('stylesheet'), $current_css);
        }
    }
    
    private function create_page($args) {
        $existing_page = get_page_by_path($args['slug']);
        
        if ($existing_page && $args['replace']) {
            wp_update_post(array(
                'ID' => $existing_page->ID,
                'post_title' => $args['title'],
                'post_content' => $args['content'],
                'post_status' => $args['status'],
                'post_parent' => $args['parent'],
            ));
            
            $page_id = $existing_page->ID;
        } elseif ($existing_page && !$args['replace']) {
            return new WP_Error('page_exists', 'A page with this slug already exists. Enable "Replace Existing" to update it.');
        } else {
            $page_id = wp_insert_post(array(
                'post_title' => $args['title'],
                'post_name' => $args['slug'],
                'post_content' => $args['content'],
                'post_status' => $args['status'],
                'post_type' => 'page',
                'post_parent' => $args['parent'],
            ));
        }
        
        if (is_wp_error($page_id)) {
            return $page_id;
        }
        
        if ($args['template'] && $args['template'] !== 'default') {
            if ($args['template'] === 'blank') {
                $this->maybe_create_blank_template();
                update_post_meta($page_id, '_wp_page_template', 'page-blank.php');
            } else {
                update_post_meta($page_id, '_wp_page_template', $args['template']);
            }
        }
        
        if (!empty($args['meta'])) {
            foreach ($args['meta'] as $key => $value) {
                update_post_meta($page_id, $key, $value);
            }
        }
        
        return $page_id;
    }
    
    private function maybe_create_blank_template() {
        $theme = get_stylesheet_directory();
        $template_path = $theme . '/page-blank.php';
        
        if (!file_exists($template_path)) {
            $template_content = <<<'PHP'
<?php
/**
 * Template Name: Blank Template
 * Description: A blank template for imported pages with full-width content
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
    <?php wp_footer(); ?>
</body>
</html>
PHP;
            file_put_contents($template_path, $template_content);
        }
    }
    
    private function recursive_delete($dir) {
        if (!is_dir($dir)) {
            return;
        }
        
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isDir()) {
                rmdir($file->getPathname());
            } else {
                unlink($file->getPathname());
            }
        }
        
        rmdir($dir);
    }
    
    private function save_import_history($data) {
        $history = get_option('rp_page_importer_history', array());
        array_unshift($history, $data);
        
        $history = array_slice($history, 0, 20);
        update_option('rp_page_importer_history', $history);
    }
    
    public function ajax_get_import_history() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        $history = get_option('rp_page_importer_history', array());
        
        if (empty($history)) {
            wp_send_json_success(array('html' => '<p class="description">No imports yet.</p>'));
        }
        
        ob_start();
        ?>
        <table class="widefat striped">
            <thead>
                <tr>
                    <th>Page</th>
                    <th>Images</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($history as $item): ?>
                <tr>
                    <td>
                        <a href="<?php echo esc_url(get_permalink($item['page_id'])); ?>" target="_blank">
                            <?php echo esc_html($item['title']); ?>
                        </a>
                    </td>
                    <td><?php echo intval($item['images_count']); ?></td>
                    <td><?php echo esc_html($item['timestamp']); ?></td>
                    <td>
                        <a href="<?php echo esc_url(get_edit_post_link($item['page_id'])); ?>">Edit</a> |
                        <a href="<?php echo esc_url(get_permalink($item['page_id'])); ?>" target="_blank">View</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php
        wp_send_json_success(array('html' => ob_get_clean()));
    }
    
    /**
     * AJAX: Import from URL
     */
    public function ajax_import_from_url() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $url = isset($_POST['url']) ? esc_url_raw($_POST['url']) : '';
        $options = isset($_POST['options']) ? $_POST['options'] : array();
        
        if (empty($url)) {
            wp_send_json_error(array('message' => 'Please enter a valid URL.'));
        }
        
        // Validate URL
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            wp_send_json_error(array('message' => 'Invalid URL format.'));
        }
        
        // Check if URL is accessible
        $response = wp_remote_head($url);
        if (is_wp_error($response)) {
            wp_send_json_error(array('message' => 'Could not access URL: ' . $response->get_error_message()));
        }
        
        $code = wp_remote_retrieve_response_code($response);
        if ($code !== 200) {
            wp_send_json_error(array('message' => "URL returned HTTP {$code}. Please check the URL is publicly accessible."));
        }
        
        // Download the file
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/sd-importer-temp-' . time();
        
        if (!wp_mkdir_p($temp_dir)) {
            wp_send_json_error(array('message' => 'Could not create temporary directory.'));
        }
        
        $zip_path = $temp_dir . '/import.zip';
        
        // Download file
        $download_response = wp_remote_get($url, array(
            'timeout' => 300,
            'stream' => true,
            'filename' => $zip_path
        ));
        
        if (is_wp_error($download_response)) {
            $this->recursive_delete($temp_dir);
            wp_send_json_error(array('message' => 'Download failed: ' . $download_response->get_error_message()));
        }
        
        // Process the import
        $result = $this->process_import($zip_path, $temp_dir, $options);
        
        if (is_wp_error($result)) {
            wp_send_json_error(array('message' => $result->get_error_message()));
        }
        
        wp_send_json_success($result);
    }
    
    /**
     * AJAX: Import from FTP/Server
     */
    public function ajax_import_from_ftp() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $filename = isset($_POST['filename']) ? sanitize_file_name($_POST['filename']) : '';
        $options = isset($_POST['options']) ? $_POST['options'] : array();
        
        if (empty($filename)) {
            wp_send_json_error(array('message' => 'Please select a file to import.'));
        }
        
        $upload_dir = wp_upload_dir();
        $import_dir = $upload_dir['basedir'] . '/sd-imports/';
        $file_path = $import_dir . $filename;
        
        if (!file_exists($file_path)) {
            wp_send_json_error(array('message' => 'File not found. It may have been deleted.'));
        }
        
        // Create temp directory for processing
        $temp_dir = $upload_dir['basedir'] . '/sd-importer-temp-' . time();
        
        if (!wp_mkdir_p($temp_dir)) {
            wp_send_json_error(array('message' => 'Could not create temporary directory.'));
        }
        
        // Copy file to temp
        $zip_path = $temp_dir . '/import.zip';
        if (!copy($file_path, $zip_path)) {
            $this->recursive_delete($temp_dir);
            wp_send_json_error(array('message' => 'Could not copy file for processing.'));
        }
        
        // Process the import
        $result = $this->process_import($zip_path, $temp_dir, $options);
        
        if (is_wp_error($result)) {
            wp_send_json_error(array('message' => $result->get_error_message()));
        }
        
        // Delete the original file after successful import
        @unlink($file_path);
        
        wp_send_json_success($result);
    }
    
    /**
     * Process import from ZIP file
     */
    private function process_import($zip_path, $temp_dir, $options = array()) {
        try {
            // Extract ZIP
            $zip = new ZipArchive();
            if ($zip->open($zip_path) !== true) {
                return new WP_Error('zip_error', 'Could not open ZIP file. The file may be corrupted.');
            }
            
            $zip->extractTo($temp_dir);
            $zip->close();
            
            // Find the content directory
            $content_dir = $this->find_content_directory($temp_dir);
            
            // Parse config if exists
            $config = $this->parse_config($content_dir);
            
            // Merge options with config
            $page_title = !empty($options['title']) ? $options['title'] : 
                         (!empty($config['title']) ? $config['title'] : 'Imported Page');
            $page_slug = !empty($options['slug']) ? $options['slug'] : 
                        (!empty($config['slug']) ? $config['slug'] : sanitize_title($page_title));
            
            // Import images to media library
            $image_map = $this->import_images($content_dir);
            
            // Read and process HTML
            $html_content = $this->read_html($content_dir);
            if ($html_content === false) {
                return new WP_Error('html_error', 'Could not find HTML file. Please include an .html file in your ZIP.');
            }
            
            // Replace image URLs
            $html_content = $this->replace_image_urls($html_content, $image_map);
            
            // Read CSS
            $css_content = $this->read_css($content_dir);
            
            // Determine template - default to blank for exact styling match
            $template = !empty($options['template']) ? $options['template'] : 
                       (!empty($config['template']) ? $config['template'] : 'blank');
            
            // Handle CSS location - for inline-styled HTML (Z.ai), just pass through
            $final_html = $html_content;
            
            // Add external CSS if present
            if (!empty($css_content)) {
                $css_location = isset($options['css_location']) ? $options['css_location'] : 'inline';
                $isolated_css = $this->isolate_css($css_content, $page_slug);
                
                if ($css_location === 'inline' || $css_location === 'both') {
                    $final_html = '<style id="sd-imported-styles">' . $isolated_css . '</style>' . $html_content;
                }
                
                if ($css_location === 'theme' || $css_location === 'both') {
                    $this->add_to_theme_css($css_content, $page_slug);
                }
            }
            
            // Minimal wrapper for full-width display - preserves inline styles
            $full_width_style = '<style>.sd-fullwidth{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;overflow-x:hidden}.sd-fullwidth img{max-width:100%;height:auto}</style>';
            $final_html = $full_width_style . '<div class="sd-fullwidth">' . $final_html . '</div>';
            
            // Create or update page
            $page_id = $this->create_page(array(
                'title' => $page_title,
                'slug' => $page_slug,
                'content' => $final_html,
                'template' => $template,
                'status' => !empty($options['status']) ? $options['status'] : 'publish',
                'parent' => !empty($options['parent']) ? intval($options['parent']) : 0,
                'replace' => !empty($options['replace']),
                'meta' => !empty($config['meta']) ? $config['meta'] : array(),
            ));
            
            if (is_wp_error($page_id)) {
                return $page_id;
            }
            
            // Clean up temp directory
            $this->recursive_delete($temp_dir);
            
            // Get page URL
            $page_url = get_permalink($page_id);
            $edit_url = get_edit_post_link($page_id);
            
            // Save import history
            $this->save_import_history(array(
                'page_id' => $page_id,
                'title' => $page_title,
                'slug' => $page_slug,
                'images_count' => count($image_map),
                'timestamp' => current_time('mysql'),
            ));
            
            return array(
                'message' => 'Page imported successfully!',
                'page_id' => $page_id,
                'page_url' => $page_url,
                'edit_url' => $edit_url,
                'images_imported' => count($image_map),
                'css_added' => !empty($css_content),
            );
            
        } catch (Exception $e) {
            // Clean up on error
            if (file_exists($temp_dir)) {
                $this->recursive_delete($temp_dir);
            }
            return new WP_Error('exception', $e->getMessage());
        }
    }
    
    /**
     * AJAX: Delete FTP file
     */
    public function ajax_delete_ftp_file() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $filename = isset($_POST['filename']) ? sanitize_file_name($_POST['filename']) : '';
        
        if (empty($filename)) {
            wp_send_json_error(array('message' => 'No filename provided.'));
        }
        
        $upload_dir = wp_upload_dir();
        $file_path = $upload_dir['basedir'] . '/sd-imports/' . $filename;
        
        if (file_exists($file_path)) {
            if (unlink($file_path)) {
                wp_send_json_success(array('message' => 'File deleted.'));
            } else {
                wp_send_json_error(array('message' => 'Could not delete file.'));
            }
        } else {
            wp_send_json_error(array('message' => 'File not found.'));
        }
    }
    
    /**
     * AJAX: Clear all FTP files
     */
    public function ajax_clear_ftp_files() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $upload_dir = wp_upload_dir();
        $import_dir = $upload_dir['basedir'] . '/sd-imports/';
        
        $files = glob($import_dir . '*.zip');
        $deleted = 0;
        
        foreach ($files as $file) {
            if (unlink($file)) {
                $deleted++;
            }
        }
        
        wp_send_json_success(array('message' => "Deleted {$deleted} file(s)."));
    }
    
    /**
     * AJAX: Handle chunked file upload
     */
    public function ajax_upload_chunk() {
        check_ajax_referer('sd_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        $upload_dir = wp_upload_dir();
        $chunks_dir = $upload_dir['basedir'] . '/rp-chunks/';
        
        // Create chunks directory
        if (!wp_mkdir_p($chunks_dir)) {
            wp_send_json_error(array('message' => 'Could not create chunks directory.'));
        }
        
        // Get chunk parameters
        $chunk_index = isset($_POST['chunk_index']) ? intval($_POST['chunk_index']) : 0;
        $total_chunks = isset($_POST['total_chunks']) ? intval($_POST['total_chunks']) : 0;
        $file_id = isset($_POST['file_id']) ? sanitize_key($_POST['file_id']) : '';
        $filename = isset($_POST['filename']) ? sanitize_file_name($_POST['filename']) : 'import.zip';
        $is_last = isset($_POST['is_last']) && $_POST['is_last'] === 'true';
        
        if (empty($file_id) || $total_chunks === 0) {
            wp_send_json_error(array('message' => 'Invalid chunk parameters.'));
        }
        
        // Create directory for this file's chunks
        $file_chunks_dir = $chunks_dir . $file_id . '/';
        wp_mkdir_p($file_chunks_dir);
        
        // Save the chunk
        if (!empty($_FILES['chunk']) && $_FILES['chunk']['error'] === UPLOAD_ERR_OK) {
            $chunk_path = $file_chunks_dir . sprintf('%08d.chunk', $chunk_index);
            
            if (!move_uploaded_file($_FILES['chunk']['tmp_name'], $chunk_path)) {
                wp_send_json_error(array('message' => 'Could not save chunk.'));
            }
            
            // If this is the last chunk, reassemble and process
            if ($is_last) {
                $result = $this->reassemble_and_import($file_chunks_dir, $total_chunks, $filename);
                
                if (is_wp_error($result)) {
                    wp_send_json_error(array('message' => $result->get_error_message()));
                }
                
                wp_send_json_success($result);
            } else {
                // Return progress info
                wp_send_json_success(array(
                    'message' => 'Chunk uploaded',
                    'chunk_index' => $chunk_index,
                    'total_chunks' => $total_chunks,
                    'progress' => round((($chunk_index + 1) / $total_chunks) * 100, 1)
                ));
            }
        } else {
            $error = isset($_FILES['chunk']['error']) ? $_FILES['chunk']['error'] : 'No chunk data';
            wp_send_json_error(array('message' => 'Chunk upload failed: ' . $error));
        }
    }
    
    /**
     * Reassemble chunks and process import
     */
    private function reassemble_and_import($chunks_dir, $total_chunks, $filename) {
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/sd-importer-temp-' . time();
        
        if (!wp_mkdir_p($temp_dir)) {
            return new WP_Error('temp_error', 'Could not create temporary directory.');
        }
        
        $zip_path = $temp_dir . '/import.zip';
        $zip_handle = fopen($zip_path, 'wb');
        
        if (!$zip_handle) {
            return new WP_Error('zip_error', 'Could not create ZIP file.');
        }
        
        // Reassemble chunks in order
        for ($i = 0; $i < $total_chunks; $i++) {
            $chunk_path = $chunks_dir . sprintf('%08d.chunk', $i);
            
            if (!file_exists($chunk_path)) {
                fclose($zip_handle);
                $this->recursive_delete($temp_dir);
                return new WP_Error('chunk_missing', "Chunk {$i} is missing.");
            }
            
            $chunk_data = file_get_contents($chunk_path);
            fwrite($zip_handle, $chunk_data);
            unlink($chunk_path); // Delete chunk after writing
        }
        
        fclose($zip_handle);
        
        // Clean up chunks directory
        $this->recursive_delete($chunks_dir);
        
        // Process the import
        return $this->process_import($zip_path, $temp_dir, array());
    }
}

// Initialize the plugin
new SD_Page_Importer();
