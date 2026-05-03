# Changelog

All notable changes to the RP Page Importer plugin will be documented in this file.

## [1.4.0] - 2025-05-04

### Added
- **Three Upload Methods** for handling any file size:
  1. **Browser Upload** - Standard upload with size limit display
  2. **URL Import** - Import from any public URL (no size limit!)
  3. **FTP/Server Import** - Upload via FTP first, then import (no size limit!)

### New Features
- Method tabs with clear size limit indicators
- FTP import directory auto-created at `wp-content/uploads/rp-imports/`
- File management for FTP imports (list, select, delete, clear all)
- Shows server's max upload size to help users choose the right method
- Auto-populate title from filename when selecting FTP files

### Improved
- Better error messages with method-specific suggestions
- Unified import processing for all methods
- Files auto-deleted from FTP directory after successful import

## [1.3.0] - 2025-05-04

### Fixed
- **Large File Upload Support**: Changed from base64 encoding to FormData for direct file uploads
  - No more 33% size increase from base64 encoding
  - Better handling of large ZIP files with progress tracking
  - Clearer error messages for upload size limits

### Improved
- Upload progress now shows actual bytes transferred
- Added upload size warning for files over 10MB
- Better error handling with specific solutions for size-related errors
- File type validation with WordPress functions

### Technical Changes
- AJAX handler now supports both FormData (preferred) and base64 (legacy)
- Uses `$_FILES` for direct upload handling
- Proper MIME type validation
- Server upload size detection with `wp_max_upload_size()`

## [1.2.0] - 2025-05-03

### Added
- **Export Tab**: Complete export functionality for WordPress pages
- Export any WordPress page to ZIP file for Z.ai development
- Preview export before downloading
- Auto-generated Z.ai context file with page information
- Development notes field for describing desired changes
- Extract inline CSS to separate file option
- Download images from Media Library option
- Copy context to clipboard button
- Export history tracking

### Export ZIP Contents
- `index.html` - Page HTML content
- `style.css` - Extracted CSS (optional)
- `config.json` - Page settings and metadata
- `zai-context.md` - Context file for Z.ai
- `images/` - Downloaded images (optional)

### Z.ai Context File
- Page information (title, slug, URL, template, status)
- WordPress environment (site URL, theme, version)
- List of images used in the page
- User development notes
- Instructions for Z.ai on expected format

## [1.1.0] - 2025-05-03

### Added
- **Z.ai Prompt Tab**: Copy/paste prompts for creating new pages
- Full prompt with complete instructions
- Short prompt for quick reference
- Copy to clipboard functionality
- Tabbed interface (Import, Z.ai Prompt, History)

### Improved
- Better tab navigation styling
- Dedicated History tab with improved UI
- More comprehensive documentation

## [1.0.0] - 2025-05-03

### Added
- **Initial Release**
- ZIP file upload with drag & drop support
- Automatic image import to WordPress Media Library
- CSS integration options (inline, theme, or both)
- Config.json support for page settings
- Page template selection (Default, Blank, Elementor Canvas, etc.)
- Import options (title, slug, status, parent page)
- Replace existing page option
- Import progress tracking with logs
- Import history tracking
- Auto-creation of blank template
- Support for multiple HTML filenames (index.html, page.html)
- Support for multiple CSS filenames (style.css, styles.css, etc.)
- Support for multiple image folder names (images/, img/, assets/images/)
- Duplicate filename handling for images
- Recursive ZIP directory handling
- Security with WordPress nonces and capability checks

### Supported File Types
- HTML: index.html, page.html, content.html
- CSS: style.css, styles.css, custom.css, main.css
- Images: jpg, jpeg, png, gif, webp, svg

### Templates
- Default Template
- Blank Template (auto-created)
- Elementor Canvas
- Elementor Full Width
- Theme-specific templates

---

## Roadmap

### Planned Features
- [ ] Batch export (multiple pages)
- [ ] Page template export/import
- [ ] Elementor template support
- [ ] Version control for pages
- [ ] Scheduled auto-export
- [ ] REST API endpoints
- [ ] Gutenberg block support
- [ ] WooCommerce page support
- [ ] Multi-language support
- [ ] Cloud storage integration

---

## Contributing

Contributions are welcome! Please read the development documentation before submitting pull requests.

## Support

For bug reports and feature requests, please open an issue on GitHub.
