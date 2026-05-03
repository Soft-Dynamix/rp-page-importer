# RP Page Importer - Development Documentation

## Architecture Overview

The plugin is built as a single PHP class (`RP_Page_Importer`) with AJAX handlers for all operations.

### File Structure

```
rp-page-importer-plugin/
├── rp-page-importer.php    # Main plugin file (single class)
├── admin-style.css          # Admin UI styles
├── admin-script.js          # Frontend JavaScript (jQuery)
├── README.md                # User documentation
├── DEVELOPMENT.md           # This file - dev documentation
└── sample-config.json       # Example config file
```

## Class Structure

### Main Class: `RP_Page_Importer`

```php
class RP_Page_Importer {
    private $version = '1.2.0';
    private $plugin_name = 'rp-page-importer';
    
    // Constructor - hooks all actions/filters
    public function __construct() { ... }
    
    // Admin UI
    public function add_admin_menu() { ... }
    public function enqueue_admin_assets() { ... }
    public function render_admin_page() { ... }
    
    // Tab Renderers
    private function render_import_tab() { ... }
    private function render_export_tab() { ... }
    private function render_zai_prompt_tab() { ... }
    private function render_history_tab() { ... }
    
    // AJAX Handlers
    public function ajax_import_page() { ... }
    public function ajax_export_page() { ... }
    public function ajax_get_page_content() { ... }
    public function ajax_preview_export() { ... }
    public function ajax_get_import_history() { ... }
    
    // Core Functions
    private function find_content_directory() { ... }
    private function parse_config() { ... }
    private function import_images() { ... }
    private function replace_image_urls() { ... }
    private function create_page() { ... }
    private function generate_zai_context() { ... }
    private function recursive_delete() { ... }
}
```

## AJAX Endpoints

### Import Page
- **Action**: `rp_import_page`
- **Parameters**:
  - `nonce` - Security nonce
  - `file_data` - Base64 encoded ZIP file
  - `options` - Import options (title, slug, template, etc.)
- **Returns**: JSON with page_id, page_url, edit_url

### Export Page
- **Action**: `rp_export_page`
- **Parameters**:
  - `nonce` - Security nonce
  - `page_id` - WordPress page ID
  - `include_images` - boolean
  - `extract_css` - boolean
  - `include_context` - boolean
  - `notes` - Development notes for Z.ai
- **Returns**: JSON with download_url, filename

### Preview Export
- **Action**: `rp_preview_export`
- **Parameters**:
  - `nonce` - Security nonce
  - `page_id` - WordPress page ID
  - `notes` - Development notes
- **Returns**: JSON with context string

### Get Page Content
- **Action**: `rp_get_page_content`
- **Parameters**:
  - `nonce` - Security nonce
  - `page_id` - WordPress page ID
  - `extract_css` - boolean
- **Returns**: JSON with html, css, title, slug

## Import Process Flow

```
1. User uploads ZIP file
2. JavaScript reads file as base64
3. AJAX sends to WordPress
4. Plugin extracts ZIP to temp directory
5. Find content directory (check common paths)
6. Parse config.json if exists
7. Import images to Media Library
   - Check for existing images
   - Handle duplicate filenames
   - Generate attachment metadata
8. Read HTML file
9. Replace image URLs with Media Library URLs
10. Read CSS file
11. Create/update WordPress page
12. Set page template
13. Add meta data
14. Clean up temp directory
15. Save to history
16. Return result
```

## Export Process Flow

```
1. User selects page to export
2. Plugin gets page content
3. Extract inline CSS (if option selected)
4. Find images in content
5. Download images from Media Library
6. Replace image URLs with relative paths
7. Generate Z.ai context file
8. Create config.json with page settings
9. Write all files to temp directory
10. Create ZIP archive
11. Clean up temp directory
12. Return download URL
```

## Z.ai Context File Format

```markdown
# Page Export for Z.ai Development

## Page Information
- Title, Slug, URL, ID, Template, Status, Last Modified

## WordPress Environment
- Site URL, Theme, WordPress Version

## Page Structure
- Content length, Images used

## Images in Page
- List of image URLs

## Development Notes from User
- User's notes about desired changes

## Request for Z.ai
- Instructions for AI on how to help

## Export Format Expected
- Expected output format for re-import

## Technical Notes for Z.ai
- WordPress-specific considerations
```

## Config.json Schema

```json
{
    "title": "string - Page title",
    "slug": "string - URL slug",
    "template": "string - Page template",
    "description": "string - Optional description",
    "status": "string - publish|draft|private",
    "meta": {
        "_yoast_wpseo_title": "string",
        "_yoast_wpseo_metadesc": "string"
    }
}
```

## Supported Templates

| Template | Value | Description |
|----------|-------|-------------|
| Default | `default` | Theme's default page template |
| Blank | `blank` | Full-width, no header/footer (auto-created) |
| Elementor Canvas | `elementor_canvas` | Full-width canvas for Elementor |
| Elementor Full Width | `elementor_header_footer` | Elementor with header/footer |

## Image Handling

### Import
- Supported formats: jpg, jpeg, png, gif, webp, svg
- Images searched in: `images/`, `img/`, `assets/images/`, `assets/img/`
- Duplicate filenames: auto-increment (image-1.jpg, image-2.jpg)
- URL patterns replaced: `images/name.jpg`, `./images/name.jpg`, etc.

### Export
- Images extracted from `<img src="...">` tags
- Media Library URLs converted to file paths
- Relative paths used in exported HTML

## CSS Handling

### Import Options
1. **Inline**: CSS wrapped in `<style>` tags in page content
2. **Theme**: Added to WordPress Customizer's Additional CSS
3. **Both**: Both inline and theme CSS

### Export
- Extracts CSS from `<style>...</style>` tags
- Replaces with `<link rel="stylesheet" href="style.css">`

## Security

- All AJAX actions use WordPress nonces
- User capability check: `manage_options`
- Input sanitization for all user inputs
- File type validation for images
- Temp directory cleanup on error

## Error Handling

```php
try {
    // Import/Export operations
    if ($error) {
        throw new Exception('Error message');
    }
    wp_send_json_success($data);
} catch (Exception $e) {
    // Clean up temp files
    $this->recursive_delete($temp_dir);
    wp_send_json_error(array('message' => $e->getMessage()));
}
```

## WordPress Hooks Used

```php
add_action('admin_menu', array($this, 'add_admin_menu'));
add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
add_action('wp_ajax_rp_import_page', array($this, 'ajax_import_page'));
add_action('wp_ajax_rp_export_page', array($this, 'ajax_export_page'));
add_action('wp_ajax_rp_get_page_content', array($this, 'ajax_get_page_content'));
add_action('wp_ajax_rp_preview_export', array($this, 'ajax_preview_export'));
add_action('wp_ajax_rp_get_import_history', array($this, 'ajax_get_import_history'));
```

## JavaScript Events

### Import
- File drag & drop
- File selection
- Import button click
- Progress updates

### Export
- Page selection change
- Preview button click
- Export button click
- Context copy button

## Future Enhancements

1. **Batch Export**: Export multiple pages at once
2. **Page Templates**: Save/export page templates
3. **Theme Integration**: Better support for popular themes
4. **Elementor Support**: Direct Elementor template export
5. **Version Control**: Track page versions
6. **Scheduled Exports**: Auto-export on page update
7. **API Endpoint**: REST API for external integrations

## Testing Checklist

- [ ] Import with index.html
- [ ] Import with page.html
- [ ] Import with images
- [ ] Import without images
- [ ] Import with config.json
- [ ] Import with CSS inline
- [ ] Import with CSS to theme
- [ ] Export page with images
- [ ] Export page without images
- [ ] Export with CSS extraction
- [ ] Export with context file
- [ ] Replace existing page
- [ ] Non-admin user access denied
- [ ] Invalid ZIP file handling
- [ ] Large file handling

## Support

For issues or feature requests, please open an issue on the GitHub repository.

## License

GPL v2 or later
