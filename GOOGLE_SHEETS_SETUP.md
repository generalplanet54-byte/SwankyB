# 🚀 Google Sheets Content Management Setup

This guide will help you configure Google Sheets integration for SwankyBoyz content management.

## 📊 Step 1: Create Your Google Sheet

1. **Create a new Google Sheet** titled: `🟢 SwankyBoyz Content Hub`

2. **Create two sheets with the following structures:**

### Sheet 1: "Products"
| Column | Field | Description |
|--------|-------|-------------|
| A | id | Unique product identifier |
| B | name | Product name |
| C | brand | Brand/manufacturer |
| D | description | Product description |
| E | image | Image filename (stored in `/public/assets/`) |
| F | affiliate_url | Affiliate link URL |

**Example row:**
```
sample-wallet | Premium Leather Wallet | SwankyBoyz | Handcrafted genuine leather | wallet-hero.jpg | https://affiliate-link.com
```

### Sheet 2: "Articles"
| Column | Field | Description |
|--------|-------|-------------|
| A | id | Unique article identifier |
| B | title | Article title |
| C | slug | URL slug (kebab-case) |
| D | excerpt | Brief description |
| E | content | Full article content |
| F | cover_image | Hero image filename |
| G | visuals | Comma-separated list of images/videos |
| H | date | Publication date (YYYY-MM-DD) |

**Example row:**
```
style-guide-2024 | The Modern Gentleman's Style Guide | modern-gentleman-style-guide | Discover the essentials... | Full article content here... | style-hero.jpg | style-1.jpg,style-2.jpg,style-video.mp4 | 2024-01-15
```

## 🔑 Step 2: Setup Google API Credentials

1. **Go to [Google Cloud Console](https://console.cloud.google.com/apis)**

2. **Create a new project** or select an existing one

3. **Enable the Google Sheets API:**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. **Create Service Account Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create
   - Click on the created service account
   - Go to "Keys" tab > "Add Key" > "Create new key"
   - Choose "JSON" format and download

5. **Share your Google Sheet:**
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (from the JSON file) with "Viewer" permissions

6. **Save credentials:**
   ```bash
   # Place the downloaded JSON file at:
   /workspaces/SwankyB/scripts/credentials.json
   ```

## 🔧 Step 3: Configure Environment

1. **Get your Sheet ID:**
   - From your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the SHEET_ID_HERE part

2. **Set environment variables:**
   ```bash
   # For local development, create .env file:
   echo "GOOGLE_SHEET_ID=your_sheet_id_here" > .env
   ```

3. **For GitHub Actions (Production):**
   - Go to your GitHub repository
   - Settings > Secrets and variables > Actions
   - Add these secrets:
     - `GOOGLE_SHEET_ID`: Your Google Sheet ID
     - `GOOGLE_SHEETS_CREDENTIALS`: Contents of your credentials.json file

## 🚀 Step 4: Usage

### Manual Content Sync
```bash
# Install dependencies (first time)
npm install

# Sync content from Google Sheets
npm run sync

# Validate all images exist (creates placeholders if missing)
npm run validate-images

# Build the site
npm run build
```

### Automatic Sync (GitHub Actions)
The repository is configured to automatically sync content every Monday at 2 AM UTC. You can also trigger it manually:

1. Go to GitHub repository > Actions tab
2. Click "Sync Content from Google Sheets"
3. Click "Run workflow"

## 📁 Image Management

### Image Storage
- All images should be placed in `/public/assets/`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
- Videos: `.mp4`, `.webm`

### Image Validation
- The sync script automatically validates all referenced images
- Missing images get placeholder SVGs created automatically
- Placeholders are named after the missing file for easy identification

### Image Naming Convention
```
# Products
product-[id]-[variant].jpg
# Example: product-wallet-hero.jpg, product-wallet-detail.jpg

# Articles  
article-[slug]-[type].jpg
# Example: article-style-guide-hero.jpg, article-style-guide-gallery-1.jpg
```

## 🔄 Content Workflow

1. **Edit content in Google Sheets**
   - Add new products/articles
   - Update existing content
   - Upload corresponding images to `/public/assets/`

2. **Sync changes**
   ```bash
   npm run sync
   ```

3. **Review and commit**
   ```bash
   git add .
   git commit -m "Content update from Google Sheets"
   git push
   ```

4. **Deploy automatically** via Cloudflare Pages

## 🛠️ Troubleshooting

### Common Issues

**"Credentials not found"**
- Ensure `scripts/credentials.json` exists
- Check file permissions are readable

**"Sheet not found"**
- Verify GOOGLE_SHEET_ID is correct
- Ensure service account has access to the sheet

**"Missing images"**
- Check image filenames match exactly (case-sensitive)
- Ensure images are in `/public/assets/` directory
- Run `npm run validate-images` to create placeholders

### Debug Mode
```bash
# Run sync with more detailed logging
DEBUG=* npm run sync
```

## 📞 Support

For issues with this setup:
1. Check the troubleshooting section above
2. Review GitHub Actions logs for automated sync issues
3. Ensure all dependencies are installed: `npm install`

---

**Last updated:** November 2024  
**Version:** 1.0