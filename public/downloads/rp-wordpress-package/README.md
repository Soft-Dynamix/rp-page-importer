# RP Motorcycles Services Page - WordPress Package

## What's Included

### `/images` folder - All 16 service images:
1. `core-mechanical.jpg` - Core Mechanical Services
2. `diagnostics.jpg` - Diagnostics & Troubleshooting
3. `engine-services.jpg` - Engine Services
4. `electrical-services.jpeg` - Electrical Services
5. `fuel-system.png` - Fuel System Services
6. `brakes-safety.png` - Brakes & Safety
7. `suspension.png` - Suspension & Handling
8. `wheels-tyres.png` - Wheels & Tyres
9. `transmission.png` - Transmission & Drivetrain
10. `exhaust-performance.png` - Exhaust & Performance
11. `custom-builds.png` - Custom Builds & Modifications
12. `performance-upgrades.png` - Performance Upgrades
13. `restoration-services.png` - Restoration Services
14. `workshop-services.png` - General Workshop Services
15. `accessories-addons.png` - Accessories & Add-Ons
16. `business-services.png` - Business Services

### `rp-services-with-images.html` - The complete page HTML

---

## How to Install in WordPress

### Step 1: Upload Images to WordPress
1. Go to **WordPress Dashboard → Media → Add New**
2. Upload ALL 16 images from the `/images` folder
3. After each upload, click on the image and **copy the URL**
4. Keep a list of all 16 URLs (you'll need them in Step 3)

### Step 2: Add CSS to WordPress
1. Go to **Appearance → Customize → Additional CSS**
2. Paste this CSS and click **Publish**:

```css
body, .site-content, .elementor { background-color: #080c14 !important; }
.elementor-section, .elementor-column, .elementor-widget { background-color: transparent !important; }
.ast-plain-container { padding: 0 !important; max-width: 100% !important; }
.entry-content { margin: 0 !important; }
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
h1, h2, h3 { font-family: 'Outfit', sans-serif !important; }
@media (max-width: 768px) {
  div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
  div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
}
```

### Step 3: Create the Page
1. Go to **Pages → Add New**
2. Title: "Services"
3. Click **Edit with Elementor**
4. Set page template to **Elementor Full Width**

### Step 4: Add Content
1. Drag a **Text Editor** widget to the page
2. Click the **"Text" tab** (NOT Visual)
3. Open `rp-services-with-images.html`
4. **Find and Replace** all the placeholder URLs:

| Replace This | With Your Uploaded Image URL |
|--------------|------------------------------|
| REPLACE_WITH_CORE_MECHANICAL_IMAGE_URL | [your URL] |
| REPLACE_WITH_DIAGNOSTICS_IMAGE_URL | [your URL] |
| REPLACE_WITH_ENGINE_SERVICES_IMAGE_URL | [your URL] |
| REPLACE_WITH_ELECTRICAL_SERVICES_IMAGE_URL | [your URL] |
| REPLACE_WITH_FUEL_SYSTEM_IMAGE_URL | [your URL] |
| REPLACE_WITH_BRAKES_SAFETY_IMAGE_URL | [your URL] |
| REPLACE_WITH_SUSPENSION_IMAGE_URL | [your URL] |
| REPLACE_WITH_WHEELS_TYRES_IMAGE_URL | [your URL] |
| REPLACE_WITH_TRANSMISSION_IMAGE_URL | [your URL] |
| REPLACE_WITH_EXHAUST_PERFORMANCE_IMAGE_URL | [your URL] |
| REPLACE_WITH_CUSTOM_BUILDS_IMAGE_URL | [your URL] |
| REPLACE_WITH_PERFORMANCE_UPGRADES_IMAGE_URL | [your URL] |
| REPLACE_WITH_RESTORATION_IMAGE_URL | [your URL] |
| REPLACE_WITH_WORKSHOP_IMAGE_URL | [your URL] |
| REPLACE_WITH_ACCESSORIES_IMAGE_URL | [your URL] |
| REPLACE_WITH_BUSINESS_SERVICES_IMAGE_URL | [your URL] |

5. **Copy the entire HTML** and **paste** into the Text Editor
6. Click **Update**

---

## Done! 🎉

Your Services page is now ready with all your custom images!
