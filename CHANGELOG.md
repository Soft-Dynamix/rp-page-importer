# Changelog

All notable changes to the Soft Dynamix Page Importer plugin will be documented in this file.

## [2.2.0] - 2025-05-04

### Major Enhancement - Mobile & Desktop Responsive Design

#### Added
- **Comprehensive Responsive CSS**: Added `get_responsive_css()` method with full mobile/desktop support
- **Three Breakpoints**: 
  - Tablet (max-width: 1024px) - Moderate scaling
  - Mobile (max-width: 768px) - Single column grids, reduced sizes
  - Small Mobile (max-width: 480px) - Further optimizations
- **Smart Attribute Selectors**: CSS targets inline styles for maximum compatibility

#### Responsive Features
- **Grid Layouts**: 2-column and 3-column grids automatically collapse to single column on mobile
- **Font Sizes**: All font sizes scale down appropriately (72px → 36px → 28px, etc.)
- **Padding**: All padding values reduce on smaller screens (80px 40px → 40px 20px, etc.)
- **Image Heights**: Hero images scale down (320px → 220px → 180px)
- **Flexbox Wrapping**: Flex containers wrap on mobile
- **Buttons**: Touch-friendly button sizes on mobile

#### Technical Details
- Uses CSS attribute selectors to match inline styles: `div[style*="grid-template-columns: repeat(2"]`
- Scoped to `.sd-fullwidth` wrapper to avoid affecting other page content
- All CSS is minified for inline inclusion

## [2.1.0] - 2025-05-04

### Critical Fix
- **wpautop Corruption Fix**: WordPress was corrupting inline CSS with `<p>` paragraph tags
  - The `wpautop` filter converts newlines in content to `<p>` tags
  - This completely broke the CSS styles inside `<style>` tags
  - Fixed by adding filter to disable `wpautop` for imported pages
  - Also added CSS minification to remove newlines (immune to wpautop)

### Added
- `disable_wpautop_for_imported_pages()` - Filter to prevent CSS corruption
- `minify_css()` - Method to minify CSS and remove newlines
- Wrapper styles are now minified inline

### Changed
- All inline CSS is now minified before insertion
- Wrapper style block is now a single-line minified string
- Filter priority set to 1 to run before wpautop

## [2.0.9] - 2025-05-04

### Fixed
- **Critical Bug**: Fixed double URL replacement causing broken images
  - Images 5-16 had duplicated URLs like: `uploads/2026/05/uploads/2026/05/filename.png`
  - The second replacement loop was matching filenames in already-replaced URLs
  - Now skips filename-based replacement when `{{IMAGE_N}}` placeholders are used

### Changed
- `replace_image_urls()` now tracks if placeholders were used
- Only falls back to filename-based replacement for legacy HTML without placeholders

## [2.0.8] - 2025-05-04

### Fixed
- **CSS Theme Compatibility**: Improved wrapper now sets dark background (`#080c14`) universally
- **Theme CSS Handling**: CSS with `body`/`html` selectors now prefixed with `.sd-fullwidth` for wrapper compatibility
- **Image Replacement Debug**: Added debug logging to track image placeholder replacements

### Improved
- **Wrapper Styles**: Comprehensive wrapper now includes min-height and transparent backgrounds for nested elements
- **Debug Info**: Import response now includes `images_replaced` count and `image_debug` array for troubleshooting
- **CSS Isolation**: Theme-specific CSS selectors are now wrapped instead of passed through unmodified

### Added
- Error logging for unreplaced image placeholders
- Image replacement count in success response

## [2.0.6] - 2025-05-04

### Fixed
- **CSS File Detection**: Now finds CSS files like `rp-css.css` and any `.css` file
- **Theme CSS Support**: CSS with theme-specific selectors (body, elementor, astra, etc.) is passed through unmodified
- **Selector Prefix**: Updated from `.sd-imported-page` to `.sd-fullwidth` to match wrapper

### Improved
- `read_css()` now searches for any `.css` file if standard names not found
- Added `rp-css.css`, `theme.css`, `app.css` to priority CSS file list
- Theme compatibility CSS is no longer prefixed, preserving theme fixes

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
