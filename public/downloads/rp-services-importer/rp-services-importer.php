<?php
/**
 * Plugin Name: RP Motorcycles Services Importer
 * Description: Import RP Motorcycles Services page with all images in one click
 * Version: 1.0
 * Author: RP Motorcycles
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class RP_Services_Importer {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_rp_import_services', array($this, 'process_import'));
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'RP Services Import',
            'RP Services Import',
            'manage_options',
            'rp-services-importer',
            array($this, 'admin_page'),
            'dashicons-upload',
            30
        );
    }
    
    public function enqueue_scripts($hook) {
        if ($hook !== 'toplevel_page_rp-services-importer') {
            return;
        }
        wp_enqueue_script('rp-import-js', plugin_dir_url(__FILE__) . 'import.js', array('jquery'), '1.0', true);
        wp_localize_script('rp-import-js', 'rpAjax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('rp_import_nonce')
        ));
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>🚀 RP Motorcycles Services Page Importer</h1>
            <p>Upload the ZIP file and the services page will be created automatically with all images.</p>
            
            <div style="background: #fff; padding: 30px; border-radius: 10px; max-width: 600px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2>Instructions</h2>
                <ol>
                    <li>Download the ZIP file from the developer</li>
                    <li>Click "Choose File" below and select the ZIP</li>
                    <li>Click "Import Services Page"</li>
                    <li>Wait for the import to complete</li>
                    <li>Click the link to edit your new page in Elementor</li>
                </ol>
                
                <form id="rp-import-form" style="margin-top: 20px;" enctype="multipart/form-data">
                    <table class="form-table">
                        <tr>
                            <th scope="row"><label for="zip_file">ZIP File</label></th>
                            <td><input type="file" name="zip_file" id="zip_file" accept=".zip" required style="padding: 10px;"></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="page_title">Page Title</label></th>
                            <td><input type="text" name="page_title" id="page_title" value="Services" style="width: 100%; padding: 10px;"></td>
                        </tr>
                    </table>
                    <p class="submit">
                        <button type="submit" id="import-btn" class="button button-primary button-large" style="padding: 10px 30px; height: auto; font-size: 16px;">
                            🚀 Import Services Page
                        </button>
                    </p>
                </form>
                
                <div id="import-status" style="margin-top: 20px; display: none;">
                    <div style="background: #f0f0f1; padding: 15px; border-radius: 5px;">
                        <span class="spinner is-active" style="float: left; margin-right: 10px;"></span>
                        <span id="status-text">Processing... Please wait...</span>
                    </div>
                </div>
                
                <div id="import-result" style="margin-top: 20px; display: none;"></div>
            </div>
        </div>
        <?php
    }
    
    public function process_import() {
        check_ajax_referer('rp_import_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied');
        }
        
        $page_title = isset($_POST['page_title']) ? sanitize_text_field($_POST['page_title']) : 'Services';
        
        // Check for uploaded file
        if (empty($_FILES['zip_file']) || $_FILES['zip_file']['error'] !== UPLOAD_ERR_OK) {
            wp_send_json_error('Please upload a valid ZIP file');
        }
        
        $zip_file = $_FILES['zip_file']['tmp_name'];
        
        // Create temp directory
        $upload_dir = wp_upload_dir();
        $temp_dir = $upload_dir['basedir'] . '/rp-temp-' . time();
        wp_mkdir_p($temp_dir);
        
        // Extract ZIP
        $zip = new ZipArchive;
        if ($zip->open($zip_file) !== TRUE) {
            wp_send_json_error('Cannot open ZIP file');
        }
        $zip->extractTo($temp_dir);
        $zip->close();
        
        // Find the package directory
        $package_dir = $this->find_package_dir($temp_dir);
        if (!$package_dir) {
            wp_send_json_error('Invalid ZIP structure. Please use the official RP Services ZIP.');
        }
        
        $images_dir = $package_dir . '/images';
        $html_file = $package_dir . '/rp-services.html';
        $css_file = $package_dir . '/rp-css.css';
        
        // Upload images and collect URLs
        $image_urls = array();
        if (is_dir($images_dir)) {
            $image_urls = $this->upload_images($images_dir);
        }
        
        // Read and process HTML
        if (!file_exists($html_file)) {
            wp_send_json_error('HTML file not found in ZIP');
        }
        $html_content = file_get_contents($html_file);
        
        // Replace image placeholders
        for ($i = 1; $i <= 16; $i++) {
            $placeholder = '{{IMAGE_' . $i . '}}';
            $image_key = sprintf('%02d', $i);
            if (isset($image_urls[$image_key])) {
                $html_content = str_replace($placeholder, $image_urls[$image_key], $html_content);
            }
        }
        
        // Add CSS
        if (file_exists($css_file)) {
            $css_content = file_get_contents($css_file);
            $this->add_custom_css($css_content);
        }
        
        // Create page
        $page_id = wp_insert_post(array(
            'post_title' => $page_title,
            'post_content' => '',
            'post_status' => 'draft',
            'post_type' => 'page',
            'post_name' => sanitize_title($page_title),
        ));
        
        if (is_wp_error($page_id)) {
            wp_send_json_error('Failed to create page: ' . $page_id->get_error_message());
        }
        
        // Set page template to Elementor Canvas (full width)
        update_post_meta($page_id, '_wp_page_template', 'elementor_canvas');
        
        // Add Elementor meta
        update_post_meta($page_id, '_elementor_edit_mode', 'builder');
        update_post_meta($page_id, '_elementor_template_type', 'wp-page');
        update_post_meta($page_id, '_elementor_version', '3.0.0');
        
        // Create Elementor content
        $elementor_data = $this->create_elementor_data($html_content);
        update_post_meta($page_id, '_elementor_data', $elementor_data);
        
        // Clean up temp files
        $this->delete_directory($temp_dir);
        
        $edit_url = admin_url('post.php?post=' . $page_id . '&action=elementor');
        $view_url = get_permalink($page_id);
        
        wp_send_json_success(array(
            'message' => 'Page created successfully!',
            'page_id' => $page_id,
            'edit_url' => $edit_url,
            'view_url' => $view_url,
            'images_uploaded' => count($image_urls)
        ));
    }
    
    private function find_package_dir($temp_dir) {
        $dirs = glob($temp_dir . '/*', GLOB_ONLYDIR);
        foreach ($dirs as $dir) {
            if (file_exists($dir . '/rp-services.html')) {
                return $dir;
            }
            if (is_dir($dir . '/rp-wordpress-package')) {
                return $dir . '/rp-wordpress-package';
            }
        }
        if (file_exists($temp_dir . '/rp-services.html')) {
            return $temp_dir;
        }
        return null;
    }
    
    private function upload_images($images_dir) {
        $urls = array();
        $files = glob($images_dir . '/*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
        
        foreach ($files as $file) {
            $filename = basename($file);
            // Extract number prefix (e.g., "01-core-mechanical.jpg" -> "01")
            preg_match('/^(\d+)/', $filename, $matches);
            $key = isset($matches[1]) ? $matches[1] : null;
            
            if ($key) {
                $upload = wp_upload_bits($filename, null, file_get_contents($file));
                if (!$upload['error']) {
                    $urls[$key] = $upload['url'];
                }
            }
        }
        
        return $urls;
    }
    
    private function add_custom_css($css) {
        // Append to Additional CSS in Customizer
        $custom_css_post = get_posts(array(
            'post_type' => 'custom_css',
            'post_status' => 'publish',
            'posts_per_page' => 1
        ));
        
        if (empty($custom_css_post)) {
            // Create new custom_css post
            wp_insert_post(array(
                'post_title' => 'RP Services Custom CSS',
                'post_content' => $css,
                'post_status' => 'publish',
                'post_type' => 'custom_css',
            ));
        } else {
            // Append to existing
            $existing_content = $custom_css_post[0]->post_content;
            if (strpos($existing_content, 'RP MOTORCYCLES') === false) {
                wp_update_post(array(
                    'ID' => $custom_css_post[0]->ID,
                    'post_content' => $existing_content . "\n\n/* RP MOTORCYCLES SERVICES CSS */\n" . $css
                ));
            }
        }
    }
    
    private function create_elementor_data($html_content) {
        // Create Elementor-compatible structure
        $data = array(
            array(
                'id' => substr(md5(uniqid()), 0, 8),
                'elType' => 'section',
                'settings' => array(
                    'layout' => 'full_width',
                    'content_width' => array('size' => '100', 'unit' => '%'),
                    'background_background' => 'classic',
                    'background_color' => '#080c14',
                    'padding' => array(
                        'unit' => 'px',
                        'top' => '0',
                        'right' => '0',
                        'bottom' => '0',
                        'left' => '0',
                    ),
                ),
                'elements' => array(
                    array(
                        'id' => substr(md5(uniqid()), 0, 8),
                        'elType' => 'column',
                        'settings' => array(),
                        'elements' => array(
                            array(
                                'id' => substr(md5(uniqid()), 0, 8),
                                'elType' => 'widget',
                                'widgetType' => 'text-editor',
                                'settings' => array(
                                    'editor' => $html_content,
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        );
        
        return wp_slash(wp_json_encode($data));
    }
    
    private function delete_directory($dir) {
        if (!is_dir($dir)) {
            return;
        }
        $files = array_diff(scandir($dir), array('.', '..'));
        foreach ($files as $file) {
            $path = $dir . '/' . $file;
            is_dir($path) ? $this->delete_directory($path) : unlink($path);
        }
        rmdir($dir);
    }
}

new RP_Services_Importer();
