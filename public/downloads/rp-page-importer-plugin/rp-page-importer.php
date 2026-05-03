<?php
/**
 * Plugin Name: RP Page Importer
 * Plugin URI: https://rpmotorcycles.co.za
 * Description: Import feature pages from ZIP files with images, HTML, and CSS. A generic solution for importing any custom page design.
 * Version: 1.1.0
 * Author: RP Motorcycles
 * Author URI: https://rpmotorcycles.co.za
 * License: GPL v2 or later
 * Text Domain: rp-page-importer
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class RP_Page_Importer {
    
    private $version = '1.1.0';
    private $plugin_name = 'rp-page-importer';
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('wp_ajax_rp_import_page', array($this, 'ajax_import_page'));
        add_action('wp_ajax_rp_get_import_history', array($this, 'ajax_get_import_history'));
    }
    
    /**
     * Add admin menu item
     */
    public function add_admin_menu() {
        add_menu_page(
            'Page Importer',
            'Page Importer',
            'manage_options',
            'rp-page-importer',
            array($this, 'render_admin_page'),
            'dashicons-migrate',
            30
        );
    }
    
    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        if ($hook !== 'toplevel_page_rp-page-importer') {
            return;
        }
        
        wp_enqueue_style(
            'rp-page-importer-admin',
            plugin_dir_url(__FILE__) . 'admin-style.css',
            array(),
            $this->version
        );
        
        wp_enqueue_script(
            'rp-page-importer-admin',
            plugin_dir_url(__FILE__) . 'admin-script.js',
            array('jquery'),
            $this->version,
            true
        );
        
        wp_localize_script('rp-page-importer-admin', 'rpImporter', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('rp_page_importer_nonce'),
            'strings' => array(
                'select_file' => __('Please select a ZIP file to import.', 'rp-page-importer'),
                'importing' => __('Importing... Please wait.', 'rp-page-importer'),
                'success' => __('Import completed successfully!', 'rp-page-importer'),
                'error' => __('An error occurred during import.', 'rp-page-importer'),
            )
        ));
    }
    
    /**
     * Render admin page
     */
    public function render_admin_page() {
        $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'import';
        ?>
        <div class="wrap rp-importer-wrap">
            <h1><span class="dashicons dashicons-migrate"></span> RP Page Importer</h1>
            
            <!-- Tabs -->
            <nav class="rp-nav-tabs">
                <a href="?page=rp-page-importer&tab=import" class="rp-nav-tab <?php echo $current_tab === 'import' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-upload"></span> Import Page
                </a>
                <a href="?page=rp-page-importer&tab=zai-prompt" class="rp-nav-tab <?php echo $current_tab === 'zai-prompt' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-admin-customizer"></span> Z.ai Prompt
                </a>
                <a href="?page=rp-page-importer&tab=history" class="rp-nav-tab <?php echo $current_tab === 'history' ? 'active' : ''; ?>">
                    <span class="dashicons dashicons-backup"></span> History
                </a>
            </nav>
            
            <div class="rp-importer-container">
                <?php if ($current_tab === 'import'): ?>
                    <?php $this->render_import_tab(); ?>
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
        ?>
        <div class="rp-import-section">
            <h2>Import Feature Page</h2>
            <p class="description">Upload a ZIP file containing your feature page. The ZIP should include:</p>
            <ul class="rp-requirements">
                <li><code>index.html</code> or <code>page.html</code> - Main page content (required)</li>
                <li><code>style.css</code> or <code>styles.css</code> - Custom styles (optional)</li>
                <li><code>images/</code> folder - Images to import to Media Library (optional)</li>
                <li><code>config.json</code> - Page settings (optional)</li>
            </ul>
            
            <div class="rp-upload-area" id="rp-upload-area">
                <input type="file" id="rp-zip-file" accept=".zip" />
                <div class="rp-upload-info">
                    <span class="dashicons dashicons-upload"></span>
                    <p>Drag & drop a ZIP file here or click to browse</p>
                </div>
            </div>
            
            <div class="rp-import-options">
                <h3>Import Options</h3>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">Page Title</th>
                        <td>
                            <input type="text" id="rp-page-title" class="regular-text" placeholder="e.g., Our Services" />
                            <p class="description">Leave empty to use title from config.json or filename</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Page Slug</th>
                        <td>
                            <input type="text" id="rp-page-slug" class="regular-text" placeholder="e.g., services" />
                            <p class="description">Leave empty to auto-generate from title</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Page Template</th>
                        <td>
                            <select id="rp-page-template">
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
                            <select id="rp-css-location">
                                <option value="inline">Inline (in page content)</option>
                                <option value="theme">Theme Additional CSS</option>
                                <option value="both">Both</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Status</th>
                        <td>
                            <select id="rp-page-status">
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
                            echo '<select id="rp-parent-page">';
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
                                <input type="checkbox" id="rp-replace-existing" />
                                Replace page if one with same slug exists
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div class="rp-import-actions">
                <button type="button" id="rp-import-btn" class="button button-primary button-large">
                    <span class="dashicons dashicons-upload"></span> Import Page
                </button>
                <span class="spinner" id="rp-import-spinner"></span>
            </div>
        </div>
        
        <!-- Progress Section -->
        <div class="rp-progress-section" id="rp-progress-section" style="display: none;">
            <h3>Import Progress</h3>
            <div class="rp-progress-bar">
                <div class="rp-progress-fill" id="rp-progress-fill"></div>
            </div>
            <div class="rp-progress-log" id="rp-progress-log"></div>
        </div>
        
        <!-- Result Section -->
        <div class="rp-result-section" id="rp-result-section" style="display: none;">
            <h3>Import Result</h3>
            <div class="rp-result-content" id="rp-result-content"></div>
        </div>
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
            
            <div class="rp-template-options">
                <h3>Available Template Options</h3>
                <table class="widefat">
                    <thead>
                        <tr>
                            <th>Template</th>
                            <th>Value for config.json</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Default Template</td>
                            <td><code>default</code></td>
                            <td>Uses theme's default page template</td>
                        </tr>
                        <tr>
                            <td>Blank Template</td>
                            <td><code>blank</code></td>
                            <td>Full-width, no header/footer (auto-created)</td>
                        </tr>
                        <tr>
                            <td>Elementor Canvas</td>
                            <td><code>elementor_canvas</code></td>
                            <td>Full-width canvas for Elementor</td>
                        </tr>
                        <tr>
                            <td>Elementor Full Width</td>
                            <td><code>elementor_header_footer</code></td>
                            <td>Elementor with theme header/footer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="rp-copied-notice" id="rp-copied-notice" style="display: none;">
                <span class="dashicons dashicons-yes-alt"></span> Copied to clipboard!
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
            
            .rp-template-options {
                margin-top: 20px;
            }
            
            .rp-template-options h3 {
                margin-bottom: 10px;
            }
            
            .rp-copied-notice {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #00a32a;
                color: #fff;
                padding: 12px 20px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 163, 42, 0.3);
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
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
                    var $notice = $('#rp-copied-notice');
                    $notice.fadeIn(200);
                    setTimeout(function() {
                        $notice.fadeOut(200);
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
            <h2>Import History</h2>
            
            <?php if (empty($history)): ?>
                <div class="rp-no-history">
                    <span class="dashicons dashicons-archive"></span>
                    <p>No pages imported yet.</p>
                    <a href="?page=rp-page-importer&tab=import" class="button">Import Your First Page</a>
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
     * Get Z.ai prompt templates
     */
    private function get_zai_prompt($site_url, $theme_name) {
        $full_prompt = <<<PROMPT
I have a WordPress website with the "RP Page Importer" plugin installed. Please create a feature page that I can import using this plugin.

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
Create a WordPress feature page ZIP for the RP Page Importer plugin.

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
     * AJAX handler for importing pages
     */
    public function ajax_import_page() {
        check_ajax_referer('rp_page_importer_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(array('message' => 'Permission denied.'));
        }
        
        // Get parameters
        $file_data = isset($_POST['file_data']) ? $_POST['file_data'] : '';
        $options = isset($_POST['options']) ? $_POST['options'] : array();
        
        if (empty($file_data)) {
            wp_send_json_error(array('message' => 'No file data received.'));
        }
        
        // Create temp directory
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/rp-importer-temp-' . time();
        
        if (!wp_mkdir_p($temp_dir)) {
            wp_send_json_error(array('message' => 'Could not create temporary directory.'));
        }
        
        try {
            // Decode and save the ZIP file
            $file_parts = explode(';base64,', $file_data);
            if (count($file_parts) !== 2) {
                throw new Exception('Invalid file data format.');
            }
            
            $zip_data = base64_decode($file_parts[1]);
            $zip_path = $temp_dir . '/import.zip';
            
            if (file_put_contents($zip_path, $zip_data) === false) {
                throw new Exception('Could not save ZIP file.');
            }
            
            // Extract ZIP
            $zip = new ZipArchive();
            if ($zip->open($zip_path) !== true) {
                throw new Exception('Could not open ZIP file.');
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
                throw new Exception('Could not find HTML file (index.html or page.html required).');
            }
            
            // Replace image URLs
            $html_content = $this->replace_image_urls($html_content, $image_map);
            
            // Read CSS
            $css_content = $this->read_css($content_dir);
            
            // Determine template
            $template = !empty($options['template']) ? $options['template'] : 
                       (!empty($config['template']) ? $config['template'] : 'default');
            
            // Handle CSS location
            $final_html = $html_content;
            if (!empty($css_content)) {
                if ($options['css_location'] === 'inline' || $options['css_location'] === 'both') {
                    $final_html = '<style>' . $css_content . '</style>' . $html_content;
                }
                
                if ($options['css_location'] === 'theme' || $options['css_location'] === 'both') {
                    $this->add_to_theme_css($css_content, $page_slug);
                }
            }
            
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
        
        foreach ($possible_paths as $path) {
            if (file_exists($path . '/index.html') || file_exists($path . '/page.html')) {
                return $path;
            }
        }
        
        // Search recursively for HTML file
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($extracted_dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile() && in_array($file->getFilename(), ['index.html', 'page.html'])) {
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
        
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($images_dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile() && $this->is_image_file($file->getPathname())) {
                $filename = $file->getFilename();
                $filepath = $file->getPathname();
                
                $existing = $this->find_existing_image($filename);
                if ($existing) {
                    $image_map[$filename] = $existing;
                    continue;
                }
                
                $attachment_id = $this->import_single_image($filepath, $filename);
                if ($attachment_id) {
                    $image_map[$filename] = array(
                        'id' => $attachment_id,
                        'url' => wp_get_attachment_url($attachment_id),
                    );
                }
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
        $html_files = ['index.html', 'page.html', 'content.html'];
        
        foreach ($html_files as $file) {
            $filepath = $dir . '/' . $file;
            if (file_exists($filepath)) {
                return file_get_contents($filepath);
            }
        }
        
        return false;
    }
    
    private function read_css($dir) {
        $css_files = ['style.css', 'styles.css', 'custom.css', 'main.css'];
        
        foreach ($css_files as $file) {
            $filepath = $dir . '/' . $file;
            if (file_exists($filepath)) {
                return file_get_contents($filepath);
            }
        }
        
        return false;
    }
    
    private function replace_image_urls($html, $image_map) {
        foreach ($image_map as $original_name => $image_data) {
            $patterns = array(
                'images/' . $original_name,
                './images/' . $original_name,
                'img/' . $original_name,
                './img/' . $original_name,
                'assets/images/' . $original_name,
                'assets/img/' . $original_name,
            );
            
            foreach ($patterns as $pattern) {
                $html = str_replace($pattern, $image_data['url'], $html);
            }
        }
        
        return $html;
    }
    
    private function add_to_theme_css($css, $slug) {
        $current_css = get_option('theme_mods_' . get_option('stylesheet'), array());
        
        $css_key = 'custom_css_post_id';
        $css_post_id = isset($current_css[$css_key]) ? $current_css[$css_key] : false;
        
        if ($css_post_id) {
            $post = get_post($css_post_id);
            if ($post) {
                $new_css = "/* RP Page Importer - {$slug} */\n{$css}\n/* End {$slug} */\n\n" . $post->post_content;
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
            'post_content' => "/* RP Page Importer - {$slug} */\n{$css}\n/* End {$slug} */",
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
        check_ajax_referer('rp_page_importer_nonce', 'nonce');
        
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
}

// Initialize the plugin
new RP_Page_Importer();
