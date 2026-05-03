# RP Page Importer - WordPress Plugin

A generic WordPress plugin for importing feature pages from ZIP files. Perfect for importing custom-designed pages with images, HTML, and CSS.

## Features

- **Drag & Drop Upload**: Simply drag and drop your ZIP file to import
- **Automatic Image Import**: All images are imported to the WordPress Media Library
- **CSS Integration**: Choose to add CSS inline, to theme's Additional CSS, or both
- **Template Support**: Works with Elementor Canvas, Blank templates, and theme templates
- **Import History**: Track all your imported pages
- **Config File Support**: Include a config.json for automatic page settings

## Installation

1. Download the `rp-page-importer.zip` file
2. Go to **WordPress Admin > Plugins > Add New**
3. Click **Upload Plugin** and select the ZIP file
4. Click **Install Now** and then **Activate**

## Usage

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

## ZIP File Structure

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
| `template` | string | Page template (e.g., `elementor_canvas`, `elementor_header_footer`, `blank`) |
| `description` | string | Page description (for reference) |
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

## Image Handling

- Images are automatically imported to your Media Library
- Duplicate filenames are handled automatically (e.g., `image-1.jpg`, `image-2.jpg`)
- Image URLs in HTML are automatically updated to point to Media Library
- Supports: JPG, JPEG, PNG, GIF, WEBP, SVG

## Troubleshooting

### Page doesn't look right
- Try using **Elementor Canvas** or **Blank Template** for full-width pages
- Make sure CSS is included (inline or theme CSS)
- Check that images were imported correctly

### Images not showing
- Verify images are in the `images/` folder
- Check supported image formats
- Look at the import log for errors

### CSS not applying
- Try selecting **Both** for CSS Location
- For Elementor, use Canvas template
- Check browser console for CSS conflicts

## Tips for Best Results

1. **Use Blank Templates**: For custom designs, use Elementor Canvas or Blank template
2. **Inline CSS**: For imported pages, inline CSS often works best
3. **Absolute Image Paths**: Use relative paths like `images/photo.jpg` in your HTML
4. **Test First**: Import as Draft to preview before publishing
5. **Keep Backups**: The plugin tracks history but always backup before major imports

## Support

For issues or feature requests, contact the developer.

## Changelog

### 1.0.0
- Initial release
- ZIP file upload and extraction
- Automatic image import to Media Library
- CSS integration options
- Config file support
- Import history tracking
- Blank template auto-creation
