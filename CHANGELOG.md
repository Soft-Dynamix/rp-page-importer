# Changelog

All notable changes to the Soft Dynamix Page Importer plugin will be documented in this file.

## [2.0.5] - 2025-05-04

### Fixed
- **Wrapper Breaking Styles**: Removed aggressive wrapper that broke inline styles
- **Full-Width Display**: New minimal wrapper preserves inline styles while ensuring full-width display
- **Style Isolation**: Simplified approach - inline styles now work exactly as in Z.ai preview

### Changed
- `.sd-imported-page` wrapper replaced with `.sd-fullwidth` for minimal interference
- Removed CSS reset that was breaking inline styles
- Content with inline styles now passes through directly

## [2.0.4] - 2025-05-04

### Fixed
- **Image Placeholders**: Now correctly replaces `{{IMAGE_1}}`, `{{IMAGE_2}}`, etc. placeholders with WordPress Media Library URLs
- **CSS Reset**: Less aggressive CSS reset that preserves inline styles from Z.ai preview
- **Image Import Order**: Images are now sorted by filename for consistent placeholder mapping

### Improved
- `import_images()` now creates both filename and numbered index mappings
- `replace_image_urls()` handles Z.ai `{{IMAGE_N}}` placeholder format
- CSS isolation no longer breaks inline styles with `all: initial`

## [2.0.3] - 2025-05-04

### Fixed
- **HTML File Detection**: Now finds ANY `.html` file in ZIP, not just `index.html` or `page.html`
- **Nested Directories**: Improved handling of ZIP files with nested folder structures
- **Better Error Message**: More helpful error when HTML file not found

### Improved
- `read_html()` now searches for any `.html` file with priority ordering
- `find_content_directory()` now searches recursively for HTML files
- Supports ZIP files with any folder structure

## [2.0.2] - 2025-05-04

### Fixed
- **Critical Bug Fix**: Fixed nonce verification mismatch
  - Nonce was created with `sd_page_importer_nonce` but checked with `rp_page_importer_nonce`
  - This caused "Forbidden" error on all AJAX requests
  - All nonce checks now correctly use `sd_page_importer_nonce`

## [2.0.1] - 2025-05-04

### Fixed
- **Critical Bug Fix**: Fixed AJAX action name mismatch between JavaScript and PHP
  - JavaScript was using `rp_` prefix while PHP expected `sd_` prefix
  - All AJAX calls now correctly use `sd_` prefix
  - This fixes the "Bad Request" error on import

## [2.0.0] - 2025-05-04

### Major Rebrand
- **Renamed to "Soft Dynamix Page Importer"**
- New branding throughout the plugin
- Updated author and URL references

### Improved Styling Preservation
- **CSS Isolation**: Added automatic CSS isolation to prevent theme conflicts
- **Style Wrapper**: All imported content wrapped in `.sd-imported-page` container
- **CSS Reset**: Added reset for wrapper to ensure consistent rendering
- **Selector Prefixing**: All CSS selectors automatically prefixed for isolation
- **Default Template**: Changed default to "Blank" for exact Z.ai preview match

### How It Ensures Exact Z.ai Preview Match
1. CSS is automatically isolated from theme styles
2. Content wrapped in a container with CSS reset
3. All selectors prefixed with `.sd-imported-page` 
4. Blank template used by default (no header/footer interference)
5. Inline CSS ensures styles are always loaded with the page

### Technical Changes
- New `isolate_css()` method for CSS isolation
- Changed all `rp-` prefixes to `sd-`
- Changed class name from `RP_Page_Importer` to `SD_Page_Importer`
- Updated all AJAX action hooks

## [1.5.0] - 2025-05-04

### Added
- **Chunked Upload Method** - The ultimate solution for large files!
  - Splits files into 2MB chunks automatically
  - Uploads chunks sequentially to bypass server limits
  - Shows real-time progress with speed indicator
  - Works with files of ANY size!
  - No server configuration changes needed

## [1.4.0] - 2025-05-04

### Added
- **Three Upload Methods** for handling any file size:
  1. **Browser Upload** - Standard upload with size limit display
  2. **URL Import** - Import from any public URL (no size limit!)
  3. **FTP/Server Import** - Upload via FTP first, then import (no size limit!)

## [1.3.0] - 2025-05-04

### Fixed
- **Large File Upload Support**: Changed from base64 encoding to FormData for direct file uploads

## [1.2.0] - 2025-05-03

### Added
- **Export Tab**: Complete export functionality for WordPress pages

## [1.1.0] - 2025-05-03

### Added
- **Z.ai Prompt Tab**: Copy/paste prompts for creating new pages

## [1.0.0] - 2025-05-03

### Added
- **Initial Release**
- ZIP file upload with drag & drop support
- Automatic image import to WordPress Media Library
- CSS integration options
