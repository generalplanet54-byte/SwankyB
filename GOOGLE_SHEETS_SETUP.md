# Google Sheets Integration Setup Guide

This guide walks you through setting up Google Sheets as a Content Management System (CMS) for SwankyBoyz.com, with automatic syncing to your Cloudflare D1 database.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Google Cloud Setup](#google-cloud-setup)
4. [Google Sheet Configuration](#google-sheet-configuration)
5. [Local Setup](#local-setup)
6. [Running the Sync](#running-the-sync)
7. [GitHub Actions Automation](#github-actions-automation)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Google Sheets integration allows you to:
- ✅ Manage products and articles from a familiar spreadsheet interface
- ✅ Automatically sync content to your database
- ✅ Validate images and generate placeholders
- ✅ Auto-generate SEO-friendly alt text
- ✅ Schedule automated content updates via GitHub Actions

**Architecture:**
```
Google Sheets → Sync Script → SQLite/D1 Database → Astro Build → Cloudflare Pages
```

---

## Prerequisites

Before starting, you need:
- [ ] Google Account
- [ ] Access to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Node.js 18+ installed locally
- [ ] Git and repository cloned
- [ ] Basic understanding of Google Sheets

---

## Google Cloud Setup

### Step 1: Create Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown at the top
3. Click "New Project"
4. Enter project details:
   - **Project Name**: `SwankyBoyz Content Sync`
   - **Organization**: (leave default)
5. Click "Create"
6. Wait for project creation (takes ~30 seconds)

### Step 2: Enable Google Sheets API

1. With your new project selected, navigate to:
   - **Navigation Menu (☰)** → **APIs & Services** → **Library**
2. Search for: `Google Sheets API`
3. Click on **Google Sheets API**
4. Click **Enable** button
5. Wait for API to be enabled

### Step 3: Create Service Account

1. Navigate to:
   - **Navigation Menu (☰)** → **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Fill in Service Account Details:
   - **Service account name**: `swankyboyz-sheets-sync`
   - **Service account ID**: `swankyboyz-sheets-sync` (auto-filled)
   - **Description**: `Content sync service for SwankyBoyz website`
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Skip user access (click **Done**)

### Step 4: Generate Service Account Key

1. In the Credentials page, under **Service Accounts**, find your newly created account
2. Click on the service account email address
3. Go to **Keys** tab
4. Click **Add Key** → **Create new key**
5. Choose **JSON** key type
6. Click **Create**
7. A JSON file will automatically download (e.g., `swankyboyz-content-sync-abc123.json`)

### Step 5: Save Credentials

1. Rename the downloaded file to `credentials.json`
2. Move it to your project's `/scripts/` directory
3. **IMPORTANT**: This file contains sensitive data - never commit it to Git

```bash
# Move and rename the file
mv ~/Downloads/swankyboyz-content-sync-*.json /path/to/SwankyB/scripts/credentials.json

# Verify it's in place
ls -la scripts/credentials.json
```

---

## Google Sheet Configuration

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new sheet
3. Rename the sheet to: `SwankyBoyz Content Hub`

### Step 2: Set Up Products Sheet

1. Rename the first tab to `Products`
2. Add these column headers in row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| id | name | brand | description | image | affiliate_url | price | rating | category |

3. Add sample data (optional):

| id | name | brand | description | image | affiliate_url | price | rating | category |
|----|------|-------|-------------|-------|---------------|-------|--------|----------|
| 1 | Electric Shaver Pro | Philips | High-performance electric shaver | shaver-pro.jpg | https://amzn.to/xyz | 149.99 | 4.5 | grooming |

### Step 3: Set Up Articles Sheet

1. Create a new tab (click **+** at bottom)
2. Rename it to `Articles`
3. Add these column headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| id | title | slug | excerpt | content | cover_image | visuals | date | category | tags | meta_title | meta_description |

4. Add sample data (optional):

| id | title | slug | excerpt | content | cover_image | visuals | date | category | tags | meta_title | meta_description |
|----|-------|------|---------|---------|-------------|---------|------|----------|------|------------|------------------|
| 1 | Best Electric Shavers 2025 | best-electric-shavers-2025 | Discover the top electric shavers... | Full article content here... | shavers-hero.jpg | shaver1.jpg,shaver2.jpg,shaver3.jpg,demo.mp4 | 2025-01-15 | grooming | reviews,buying-guide | Best Electric Shavers 2025 | Complete guide to the best electric shavers... |

### Step 4: Share Sheet with Service Account

1. Click the **Share** button (top right)
2. In the "Add people and groups" field, paste your service account email:
   - Find this in `scripts/credentials.json` → `client_email` field
   - Format: `swankyboyz-sheets-sync@project-id.iam.gserviceaccount.com`
3. Set permission to **Viewer** (read-only)
4. Uncheck "Notify people"
5. Click **Share**

### Step 5: Get Sheet ID

1. Look at your Google Sheet URL
2. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```
3. Example:
   - URL: `https://docs.google.com/spreadsheets/d/1abc123xyz456/edit`
   - Sheet ID: `1abc123xyz456`

---

## Local Setup

### Step 1: Install Dependencies

```bash
cd /path/to/SwankyB
npm install
```

This will install:
- `googleapis` - Google Sheets API client
- `sqlite3` - SQLite database driver
- `sqlite` - SQLite wrapper
- `tsx` - TypeScript execution

### Step 2: Configure Sheet ID

Option A: Environment Variable (Recommended)
```bash
export GOOGLE_SHEET_ID="your_sheet_id_here"
```

Option B: Update Script Directly
Edit `scripts/sync-sheets.ts`:
```typescript
const SHEET_ID = "your_sheet_id_here"; // Line ~20
```

### Step 3: Verify Setup

```bash
# Check credentials exist
ls -la scripts/credentials.json

# Check environment variable
echo $GOOGLE_SHEET_ID

# Verify database schema
sqlite3 swankyboyz.db ".schema products"
```

---

## Running the Sync

### Manual Sync

```bash
# Sync content from Google Sheets
npm run sync

# Expected output:
# 🚀 Starting Google Sheets → D1 Sync...
# 📊 Sheet ID: 1abc123xyz
# 💾 Database: ./swankyboyz.db
#
# 🧾 Syncing Products...
# 🗑️  Cleared existing products
# ✅ Synced 5 products
#
# 📰 Syncing Articles...
# 🗑️  Cleared existing articles
# ✅ Synced 3 articles
#
# ✅ Google Sheets → D1 Sync Complete
```

### Sync and Rebuild

```bash
# Sync content and rebuild site
npm run sheets:sync

# This runs:
# 1. npm run sync (fetch from Google Sheets)
# 2. npm run build (rebuild Astro site)
```

### Verify Sync Results

```bash
# Check database contents
sqlite3 swankyboyz.db "SELECT COUNT(*) FROM products;"
sqlite3 swankyboyz.db "SELECT COUNT(*) FROM articles;"

# View synced products
sqlite3 swankyboyz.db "SELECT id, name, brand FROM products LIMIT 5;"

# View synced articles
sqlite3 swankyboyz.db "SELECT id, title, published_at FROM articles LIMIT 5;"
```

---

## GitHub Actions Automation

### Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

**Secret 1: GOOGLE_CREDENTIALS_JSON**
- Name: `GOOGLE_CREDENTIALS_JSON`
- Value: Entire contents of `scripts/credentials.json` (copy and paste)

**Secret 2: GOOGLE_SHEET_ID**
- Name: `GOOGLE_SHEET_ID`
- Value: Your Google Sheet ID (e.g., `1abc123xyz456`)

### Step 2: Verify Workflow

The workflow is already configured in `.github/workflows/sync-content.yml`:

**Triggers:**
- ⏰ Scheduled: Every Monday at 2 AM UTC
- 🔧 Manual: Can be triggered from Actions tab
- 📝 Push: Runs when sync script or workflow is updated

**What It Does:**
1. Checks out repository
2. Installs Node.js and dependencies
3. Creates credentials file from secret
4. Runs sync script
5. Commits and pushes changes (if any)
6. Cleans up credentials file

### Step 3: Manual Trigger (Optional)

1. Go to **Actions** tab in GitHub
2. Select **Sync Content from Google Sheets**
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow**
6. Monitor progress in the Actions log

### Step 4: Monitor Automated Runs

- Check **Actions** tab for workflow status
- Review logs for any errors
- Verify commits from `github-actions[bot]`

---

## Troubleshooting

### Error: "Credentials file not found"

**Cause**: `credentials.json` is missing or in wrong location

**Solution**:
```bash
# Check if file exists
ls -la scripts/credentials.json

# Verify path
pwd  # Should show repo root directory
```

### Error: "Permission denied" or "403 Forbidden"

**Cause**: Service account doesn't have access to the sheet

**Solution**:
1. Open your Google Sheet
2. Click **Share**
3. Verify service account email is listed
4. Ensure permission is "Viewer" or "Editor"
5. Re-share if needed

### Error: "Invalid grant"

**Cause**: Service account credentials are expired or invalid

**Solution**:
1. Go to Google Cloud Console
2. Navigate to service account
3. Delete old key
4. Create new key
5. Download new `credentials.json`
6. Replace old file

### Error: "Sheet not found" or "Range not found"

**Cause**: Sheet names don't match expected values

**Solution**:
1. Check sheet tab names are exactly:
   - `Products` (case-sensitive)
   - `Articles` (case-sensitive)
2. Ensure headers are in row 1
3. Data should start from row 2

### Warning: "Image not found - using placeholder"

**Cause**: Image file referenced in sheet doesn't exist in `/public/assets/`

**Solution**:
1. Add missing images to `/public/assets/`
2. Or update sheet with correct filenames
3. Placeholders will be used until images are added

### Error: "Failed to fetch sheet data"

**Cause**: Network issue or API quota exceeded

**Solution**:
1. Check internet connection
2. Verify Google Sheets API is enabled
3. Check API quotas in Google Cloud Console
4. Wait a few minutes and retry

### Sync runs but no data appears

**Cause**: Empty sheet or incorrect data format

**Solution**:
1. Verify sheet has data starting from row 2
2. Check required columns are filled:
   - Products: `id`, `name`, `brand`
   - Articles: `id`, `title`, `slug`, `content`
3. Check for data validation errors in sync log

---

## Content Guidelines

### Products Sheet Best Practices

- **ID**: Use sequential integers (1, 2, 3...)
- **Name**: Clear, descriptive product names
- **Brand**: Official brand name
- **Description**: 150-200 characters, include key features
- **Image**: Filename only (e.g., `product.jpg`), not full path
- **Affiliate URL**: Use short URLs or direct affiliate links
- **Price**: Numeric only, no currency symbols
- **Rating**: 0-5 scale with decimals (e.g., 4.5)

### Articles Sheet Best Practices

- **ID**: Use sequential integers (1, 2, 3...)
- **Title**: SEO-optimized, 50-60 characters
- **Slug**: URL-friendly, lowercase with hyphens
- **Excerpt**: 150-160 characters for meta description
- **Content**: Full article in Markdown or HTML
- **Cover Image**: High-quality featured image filename
- **Visuals**: Comma-separated list, minimum 3 items
- **Date**: YYYY-MM-DD format
- **Meta Title**: Override title for SEO (optional)
- **Meta Description**: Override excerpt for SEO (optional)

### Visual Requirements

✅ **Every article MUST have at least 3 visuals**
✅ **Supported formats**: JPG, PNG, WebP, MP4, WebM
✅ **Naming**: Use descriptive filenames
✅ **Storage**: Place in `/public/assets/`
✅ **Size**: Optimize images before uploading

Example visuals column:
```
product-front.jpg,product-side.jpg,product-use.jpg,demo-video.mp4
```

---

## Next Steps

After setup is complete:

1. ✅ Add real content to your Google Sheet
2. ✅ Run sync: `npm run sync`
3. ✅ Verify data in database
4. ✅ Build site: `npm run build`
5. ✅ Test locally: `npm run preview`
6. ✅ Deploy to Cloudflare Pages
7. ✅ Monitor automated syncs in GitHub Actions

---

## Support & Resources

- **Copilot Instructions**: `.github/copilot-instructions.md`
- **Scripts README**: `scripts/README.md`
- **Google Sheets API Docs**: https://developers.google.com/sheets/api
- **Cloudflare D1 Docs**: https://developers.cloudflare.com/d1/

---

**Last Updated:** 2025-10-31  
**Version:** 1.0.0
