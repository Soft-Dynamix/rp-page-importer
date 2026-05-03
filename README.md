# RP Page Importer - WordPress Plugin

A WordPress plugin for importing and exporting feature pages from ZIP files. Perfect for working with Z.ai to create and modify custom page designs.

## Features

- **Import Pages**: Upload ZIP files with HTML, CSS, and images
- **Export Pages**: Export any WordPress page to a ZIP file for Z.ai development
- **Drag & Drop Upload**: Simply drag and drop your ZIP file to import
- **Automatic Image Import**: All images are imported to the WordPress Media Library
- **CSS Integration**: Choose to add CSS inline, to theme's Additional CSS, or both
- **Template Support**: Works with Elementor Canvas, Blank templates, and theme templates
- **Z.ai Context**: Export includes context file for seamless AI development
- **Import/Export History**: Track all your imported and exported pages
- **Config File Support**: Include a config.json for automatic page settings

## Installation

1. Download the `rp-page-importer.zip` file
2. Go to **WordPress Admin > Plugins > Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** and then **Activate**

## Usage - Import

1. Go to **WordPress Admin > Page Importer**
2. Drag and drop or click to select your ZIP file
3. Configure import options:
   - **Page Title**: The title for your new page
   - **Page Slug**: The URL slug (e.g., `services` for `/services/`)
   - **Page Template**: Choose from available templates
   - **CSS Location**: Where to add your CSS styles
   - **Status**: Publish, Draft, or Private
   - **Parent Page**: Set a parent page if needed
   - **Replace Existing**: Update existing page with same slug

4. Click **Import Page**

## Usage - Export

1. Go to **WordPress Admin > Page Importer > Export** tab
2. Select a page to export from the dropdown
3. Configure export options:
   - **Include images**: Download images from Media Library
   - **Extract CSS**: Separate inline CSS to style.css
   - **Include Z.ai context**: Add context file for AI development
4. Add development notes (what changes you want Z.ai to make)
5. Click **Preview Export** to see the content, or **Export ZIP** to download

## Export ZIP Contents

The exported ZIP includes:
- `index.html` - Page HTML content
- `style.css` - Extracted CSS styles (if option selected)
- `config.json` - Page settings and metadata
- `zai-context.md` - Context file for Z.ai development
- `images/` - Images from the page (if option selected)

## Z.ai Context File

The context file (`zai-context.md`) includes:
- Page information (title, slug, URL, template)
- WordPress environment details
- List of images used
- Your development notes
- Instructions for Z.ai on how to modify the page

## ZIP File Structure for Import

Your ZIP file can have one of the following structures:

### Simple Structure
```
your-page.zip
├── index.html       (or page.html) - Required
├── style.css        (or styles.css) - Optional
├── config.json      - Optional
└── images/          - Optional
    ├── image1.jpg
    ├── image2.png
    └── ...
```

### Package Structure
```
your-page.zip
└── package-folder/
    ├── index.html
    ├── style.css
    ├── config.json
    └── images/
        └── ...
```

## Config File (config.json)

Include a `config.json` file to pre-configure page settings:

```json
{
    "title": "Our Services",
    "slug": "services",
    "template": "elementor_canvas",
    "description": "Page description",
    "meta": {
        "_yoast_wpseo_title": "SEO Title",
        "_yoast_wpseo_metadesc": "Meta description"
    }
}
```

### Available Config Options

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Page title |
| `slug` | string | URL slug |
| `template` | string | Page template (e.g., `elementor_canvas`, `blank`) |
| `description` | string | Page description (for reference) |
| `status` | string | `publish`, `draft`, or `private` |
| `meta` | object | Custom meta fields |

## CSS Location Options

1. **Inline**: CSS is added directly in the page content wrapped in `<style>` tags
2. **Theme**: CSS is added to WordPress Customizer's Additional CSS section
3. **Both**: CSS is added both inline and to theme

## Page Templates

The plugin supports these template options:

- **Default Template**: Uses your theme's default page template
- **Blank Template**: A clean template with no header/footer (auto-created)
- **Elementor Canvas**: Full-width canvas for Elementor
- **Elementor Full Width**: Elementor with header/footer

## Workflow with Z.ai

### Creating a New Page

1. Go to **Page Importer > Z.ai Prompt** tab
2. Copy the prompt to your clipboard
3. Paste the prompt into a Z.ai conversation
4. Describe the page you want
5. Z.ai will create the ZIP file
6. Import the ZIP using the Import tab

### Modifying an Existing Page

1. Go to **Page Importer > Export** tab
2. Select the page to modify
3. Add development notes about what changes you want
4. Export the ZIP file
5. Upload the ZIP to Z.ai
6. Z.ai will modify the page and provide a new ZIP
7. Import the modified ZIP (enable "Replace Existing")

## Troubleshooting

### Upload fails with "Request Entity Too Large"
This means the ZIP file exceeds your server's maximum upload size. Solutions:

1. **Increase PHP Limits** (contact your host or add to php.ini):
   ```ini
   upload_max_filesize = 64M
   post_max_size = 64M
   max_execution_time = 300
   ```

2. **Add to .htaccess** (if allowed by your host):
   ```apache
   php_value upload_max_filesize 64M
   php_value post_max_size 64M
   php_value max_execution_time 300
   ```

3. **FTP Method**: Extract the ZIP locally and upload files manually:
   - Upload images to Media Library
   - Copy HTML content to a new page
   - Add CSS to Additional CSS in Customizer

### Page doesn't look right
- Try using **Elementor Canvas** or **Blank Template** for full-width pages
- Make sure CSS is included (inline or theme CSS)
- Check that images were imported correctly

### Images not showing
- Verify images are in the `images/` folder
- Check supported image formats (JPG, PNG, GIF, WEBP, SVG)
- Look at the import log for errors

### CSS not applying
- Try selecting **Both** for CSS Location
- For Elementor, use Canvas template
- Check browser console for CSS conflicts

### Export not working
- Make sure the page has content
- Check file permissions in wp-content/uploads
- Try disabling other plugins temporarily

## Tips for Best Results

1. **Use Blank Templates**: For custom designs, use Elementor Canvas or Blank template
2. **Inline CSS**: For imported pages, inline CSS often works best
3. **Absolute Image Paths**: Use relative paths like `images/photo.jpg` in your HTML
4. **Test First**: Import as Draft to preview before publishing
5. **Keep Backups**: The plugin tracks history but always backup before major imports
6. **Use Development Notes**: When exporting, add detailed notes for Z.ai about your requirements

## Support

For issues or feature requests, contact the developer.

## Changelog

### 1.3.0
- Fixed large file upload support (FormData instead of base64)
- Better upload progress tracking with byte count
- Clearer error messages for upload size limits
- File type validation improvements

### 1.2.0
- Added Export functionality
- Export any WordPress page to ZIP for Z.ai development
- Auto-generate Z.ai context file with page info
- Preview export before downloading
- Add development notes for Z.ai
- Extract inline CSS to separate file option
- Download images from Media Library option

### 1.1.0
- Added Z.ai Prompt tab
- Copy/paste prompts for creating new pages
- Tabbed interface (Import, Z.ai Prompt, History)
- Better history tracking

### 1.0.0
- Initial release
- ZIP file upload and extraction
- Automatic image import to Media Library
- CSS integration options
- Config file support
- Import history tracking
- Blank template auto-creation
