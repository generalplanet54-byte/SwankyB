# 🚀 Google Sheets Content Management System

## Overview

SwankyBoyz.com uses a Google Sheets → Cloudflare D1 sync system for seamless content management. This allows non-technical team members to update products and articles directly in Google Sheets, which automatically sync to the live website.

## 📋 Google Sheets Setup

### 1. Create the Content Hub Sheet

Create a Google Sheet titled: **`SwankyBoyz Content Hub`**

### 2. Sheet Structure

#### **Sheet 1: `Products`**

| Column | Header | Description | Example |
|--------|---------|-------------|---------|
| A | id | Unique product identifier | `premium-wallet-001` |
| B | name | Product name | `Premium Leather Wallet` |
| C | brand | Brand name | `SwankyBoyz` |
| D | description | Product description | `Handcrafted genuine leather wallet...` |
| E | image | Image filename (stored in `/public/assets/`) | `wallet-premium-brown.jpg` |
| F | affiliate_url | Affiliate/purchase link | `https://example.com/buy` |

#### **Sheet 2: `Articles`**

| Column | Header | Description | Example |
|--------|---------|-------------|---------|
| A | id | Unique article identifier | `style-guide-001` |
| B | title | Article title | `The Modern Gentleman's Style Guide` |
| C | slug | URL slug | `modern-gentleman-style-guide` |
| D | excerpt | Brief description | `Discover the essentials of contemporary...` |
| E | content | Full article content | `A comprehensive guide to building...` |
| F | cover_image | Cover image filename | `style-guide-hero.jpg` |
| G | visuals | Comma-separated list of images/videos | `style-1.jpg, style-2.mp4, style-3.jpg` |
| H | date | Publication date (YYYY-MM-DD) | `2024-01-15` |

### 3. Google API Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/apis
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in service account details
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

4. **Generate Key File**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose "JSON" format
   - Download the file

5. **Share Sheet with Service Account**
   - Copy the `client_email` from your JSON file
   - Share your Google Sheet with this email address
   - Give "Editor" permissions

## 🔧 Local Development Setup

### 1. Install Dependencies

```bash
npm install googleapis sqlite sqlite3
```

### 2. Setup Credentials

1. Copy the downloaded JSON file to `/scripts/credentials.json`
2. Copy your Google Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
3. Set environment variable:
   ```bash
   export GOOGLE_SHEET_ID="your_sheet_id_here"
   ```

### 3. Test Sync

```bash
npm run sync
```

## 🤖 Automated Sync (Production)

### GitHub Actions Setup

1. **Add Repository Secrets**
   - Go to your GitHub repo → Settings → Secrets and Variables → Actions
   - Add these secrets:
     - `GOOGLE_SHEETS_CREDENTIALS`: Content of your credentials.json file
     - `GOOGLE_SHEET_ID`: Your Google Sheet ID

2. **Automatic Sync Schedule**
   - Runs every Monday at 2 AM UTC
   - Can be manually triggered via GitHub Actions tab
   - Automatically runs on pushes to main branch

## 📁 Image Management

### Local Image Storage

- All images are stored in `/public/assets/`
- Reference images in sheets by filename only (e.g., `product-1.jpg`)
- The system automatically validates image existence

### Image Validation

```bash
npm run validate-images
```

This command:
- ✅ Checks all referenced images exist
- 🖼️ Creates SVG placeholders for missing images
- 📊 Reports validation results

### Missing Image Handling

When an image is missing, the system automatically creates an SVG placeholder with:
- Gray background (#f3f4f6)
- Filename as text
- "Placeholder Image" label
- 400x300 pixel dimensions

## 🔄 Sync Workflow

### Manual Sync

```bash
# Sync content from Google Sheets
npm run sync

# Validate all images
npm run validate-images

# Build site with new content
npm run build
```

### Automated Process

1. **Content Update**: Edit Google Sheets
2. **Weekly Sync**: GitHub Actions runs every Monday
3. **Validation**: Images are validated and placeholders created
4. **Database Update**: D1 database is updated with new content
5. **Deployment**: Changes are automatically deployed via Cloudflare Pages

## 📝 Content Guidelines

### Products

- **ID**: Use lowercase, hyphenated format (`premium-wallet-001`)
- **Images**: High-quality product photos, 800x600 minimum
- **Descriptions**: 2-3 sentences, highlight key benefits
- **Affiliate URLs**: Ensure links are working and properly formatted

### Articles

- **Title**: Clear, SEO-friendly titles (5-10 words)
- **Slug**: URL-friendly, hyphenated format
- **Excerpt**: Compelling 1-2 sentence summary
- **Content**: Well-formatted markdown supported
- **Visuals**: Minimum 3 images per article
- **Date**: Use YYYY-MM-DD format

### Visual Requirements

✅ **Required for every article**: At least 3 visuals (images/videos)
✅ **Alt text**: Auto-generated descriptive alt text
✅ **Validation**: All visuals validated during sync
✅ **Formats**: Supports JPG, PNG, GIF, MP4

## 🚨 Troubleshooting

### Common Issues

**"No credentials found"**
- Ensure `credentials.json` exists in `/scripts/` folder
- Verify the file contains valid JSON

**"Sheet not found"**
- Check your `GOOGLE_SHEET_ID` environment variable
- Verify sheet is shared with service account email

**"Missing images"**
- Run `npm run validate-images` to see missing files
- Add images to `/public/assets/` folder
- Or let the system create placeholders automatically

**"Sync fails with permissions"**
- Ensure service account has "Editor" access to the sheet
- Check that the sheet tabs are named exactly "Products" and "Articles"

### Debug Mode

Enable detailed logging:
```bash
DEBUG=true npm run sync
```

## 🎯 Quick Reference Commands

```bash
# Development
npm run dev                 # Start development server
npm run sync               # Sync from Google Sheets
npm run validate-images    # Validate all images
npm run build             # Build for production

# Content Management
npm run sync              # Manual content sync
npm run validate-images   # Check image integrity
npm run postbuild        # Seed database with samples

# Deployment
git add .
git commit -m "Content update"
git push origin main      # Triggers automatic deployment
```

## 🔗 Integration Points

- **Google Sheets**: Source of truth for content
- **Cloudflare D1**: Production database
- **GitHub Actions**: Automated sync workflow
- **Cloudflare Pages**: Automatic deployment
- **Local SQLite**: Development database

---

*This system enables seamless content management while maintaining technical excellence and automated workflows.*