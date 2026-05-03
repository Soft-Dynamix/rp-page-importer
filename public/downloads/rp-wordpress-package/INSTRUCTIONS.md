# RP Motorcycles Services Page - WordPress Import Package

## 📦 What's Included

```
rp-wordpress-package/
├── images/                    # All 16 service images
│   ├── 01-core-mechanical.jpg
│   ├── 02-diagnostics.jpg
│   ├── 03-engine-services.jpg
│   ├── 04-electrical-services.jpeg
│   ├── 05-fuel-system.png
│   ├── 06-brakes-safety.png
│   ├── 07-suspension.png
│   ├── 08-wheels-tyres.png
│   ├── 09-transmission.png
│   ├── 10-exhaust-performance.png
│   ├── 11-custom-builds.png
│   ├── 12-performance-upgrades.png
│   ├── 13-restoration-services.png
│   ├── 14-workshop-services.png
│   ├── 15-accessories-addons.png
│   └── 16-business-services.png
├── rp-services.html           # Main HTML file (with {{IMAGE_X}} placeholders)
├── rp-css.css                 # CSS for WordPress Customizer
└── INSTRUCTIONS.md            # This file
```

---

## 🚀 Step-by-Step Installation

### STEP 1: Upload Images to WordPress

1. Go to **WordPress Dashboard → Media → Add New**
2. Upload ALL 16 images from the `images/` folder
3. After uploading each image, click on it and **copy the URL**
4. Write down the URLs in this format:

```
Image 1 (Core Mechanical): https://yoursite.com/wp-content/uploads/.../01-core-mechanical.jpg
Image 2 (Diagnostics): https://yoursite.com/wp-content/uploads/.../02-diagnostics.jpg
... etc
```

---

### STEP 2: Add CSS to WordPress

1. Go to **Appearance → Customize → Additional CSS**
2. Open `rp-css.css` file
3. Copy ALL content and paste into Additional CSS
4. Click **Publish**

---

### STEP 3: Replace Image Placeholders in HTML

1. Open `rp-services.html` in a text editor (Notepad, VS Code, etc.)
2. Use **Find and Replace** (Ctrl+H or Cmd+H):
   - Find: `{{IMAGE_1}}`
   - Replace with: [Your uploaded URL for Core Mechanical]
   - Click Replace
3. Repeat for all 16 images:

| Find | Replace With |
|------|--------------|
| `{{IMAGE_1}}` | Core Mechanical image URL |
| `{{IMAGE_2}}` | Diagnostics image URL |
| `{{IMAGE_3}}` | Engine Services image URL |
| `{{IMAGE_4}}` | Electrical Services image URL |
| `{{IMAGE_5}}` | Fuel System image URL |
| `{{IMAGE_6}}` | Brakes & Safety image URL |
| `{{IMAGE_7}}` | Suspension image URL |
| `{{IMAGE_8}}` | Wheels & Tyres image URL |
| `{{IMAGE_9}}` | Transmission image URL |
| `{{IMAGE_10}}` | Exhaust & Performance image URL |
| `{{IMAGE_11}}` | Custom Builds image URL |
| `{{IMAGE_12}}` | Performance Upgrades image URL |
| `{{IMAGE_13}}` | Restoration Services image URL |
| `{{IMAGE_14}}` | Workshop Services image URL |
| `{{IMAGE_15}}` | Accessories image URL |
| `{{IMAGE_16}}` | Business Services image URL |

4. **Save** the file after all replacements

---

### STEP 4: Create the Page in WordPress

1. Go to **Pages → Add New**
2. Title: **Services**
3. Click **Edit with Elementor**
4. In the left sidebar, find **Page Settings** (gear icon)
5. Set **Page Layout** to **Elementor Full Width**
6. Close the settings panel

---

### STEP 5: Add the Content

1. Drag a **Text Editor** widget to the page
2. Click the **"Text" tab** (NOT Visual)
3. Open your edited `rp-services.html` file
4. **Select All** (Ctrl+A) and **Copy** (Ctrl+C)
5. **Paste** into the Text Editor widget
6. Click **Publish**

---

## ✅ Done!

Your Services page is now live with all your custom images!

---

## 🔧 Troubleshooting

### Images not showing?
- Make sure you replaced ALL `{{IMAGE_X}}` placeholders with actual URLs
- Check that image URLs start with `https://` or `http://`

### Page has white background?
- Make sure you added the CSS in Step 2
- Try adding `!important` to the background CSS rules

### Layout looks broken on mobile?
- The CSS includes responsive rules - clear your browser cache
- Check that your theme isn't overriding the grid styles

### Want to edit the content?
- In Elementor, click on the Text Editor widget
- Switch to **Visual** tab to edit text normally
- Or stay in **Text** tab to edit HTML directly

---

## 📞 Need Help?

If you have issues:
1. Check your browser console for errors (F12)
2. Make sure Elementor is updated
3. Try a different theme template if Astra causes issues
