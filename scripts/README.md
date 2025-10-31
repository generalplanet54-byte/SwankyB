# Scripts Directory

This directory contains scripts for managing content and syncing with external sources.

## Google Sheets Sync Setup

### Prerequisites

1. **Google Cloud Project**: Create a project at [Google Cloud Console](https://console.cloud.google.com)
2. **Google Sheets API**: Enable the Google Sheets API for your project
3. **Service Account**: Create a service account with appropriate permissions

### Step-by-Step Setup

#### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "SwankyBoyz Content Sync")
4. Click "Create"

#### 2. Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

#### 3. Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in details:
   - Service account name: `swankyboyz-sync`
   - Service account ID: `swankyboyz-sync`
   - Description: "Content sync from Google Sheets"
4. Click "Create and Continue"
5. Skip the optional steps (no role assignment needed)
6. Click "Done"

#### 4. Create Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to "Keys" tab
4. Click "Add Key" → "Create new key"
5. Choose "JSON" format
6. Click "Create"
7. The JSON file will download automatically

#### 5. Set Up Credentials

1. Rename the downloaded file to `credentials.json`
2. Move it to this directory (`/scripts/`)
3. **IMPORTANT**: Never commit this file to Git (it's already in .gitignore)

#### 6. Set Up Google Sheet

1. Create a new Google Sheet or use an existing one
2. Title it: `SwankyBoyz Content Hub`
3. Create two sheets:
   - **Products**: With columns `id`, `name`, `brand`, `description`, `image`, `affiliate_url`, `price`, `rating`, `category`
   - **Articles**: With columns `id`, `title`, `slug`, `excerpt`, `content`, `cover_image`, `visuals`, `date`, `category`, `tags`, `meta_title`, `meta_description`

#### 7. Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from credentials.json: `client_email` field)
4. Give "Viewer" permissions
5. Uncheck "Notify people"
6. Click "Share"

#### 8. Configure Sheet ID

1. Open your Google Sheet
2. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1abc123xyz/edit`, the ID is `1abc123xyz`
3. Set the environment variable:
   ```bash
   export GOOGLE_SHEET_ID="your_sheet_id_here"
   ```
   Or update the `SHEET_ID` constant in `sync-sheets.ts`

### Running the Sync

#### Local Sync

```bash
# Install dependencies (first time only)
npm install

# Run sync
npm run sync

# Sync and rebuild site
npm run sheets:sync
```

#### Automated Sync (GitHub Actions)

The sync can run automatically via GitHub Actions. See `.github/workflows/sync-content.yml`.

**Required GitHub Secrets:**

1. Go to repository Settings → Secrets and variables → Actions
2. Add these secrets:
   - `GOOGLE_CREDENTIALS_JSON`: Full content of `credentials.json`
   - `GOOGLE_SHEET_ID`: Your Google Sheet ID

**Schedule:**
- Runs every Monday at 2 AM UTC
- Can be manually triggered from Actions tab
- Runs on push to sync script or workflow file

### Troubleshooting

#### "Credentials file not found"
- Make sure `credentials.json` is in the `/scripts/` directory
- Check the file name is exactly `credentials.json`

#### "Permission denied" or "403 Forbidden"
- Verify the Google Sheet is shared with the service account email
- Check the service account has at least "Viewer" permissions
- Ensure Google Sheets API is enabled in your project

#### "Invalid grant"
- The credentials may be expired or invalid
- Generate a new service account key
- Make sure the JSON file is properly formatted

#### "Sheet not found"
- Check the SHEET_ID is correct
- Verify the sheet names are exactly "Products" and "Articles"
- Ensure the service account has access to the sheet

#### "No products/articles found"
- Check that data starts from row 2 (row 1 should be headers)
- Verify column order matches the expected format
- Check for empty rows at the beginning of data

### File Structure

```
scripts/
├── README.md                      # This file
├── sync-sheets.ts                 # Main sync script
├── credentials.json               # Google service account (gitignored)
├── credentials.json.template      # Template for credentials
└── [other scripts...]
```

### Security Notes

- ⚠️ Never commit `credentials.json` to version control
- ⚠️ Rotate service account keys quarterly for security
- ⚠️ Only grant minimum necessary permissions
- ⚠️ Monitor Google Cloud Console for unusual activity
- ✅ Use environment variables for sensitive data
- ✅ Keep .gitignore updated

### Support

For issues or questions:
1. Check this README
2. Review error messages from the sync script
3. Verify Google Cloud Console configuration
4. Check GitHub Actions logs (for automated sync)

---

**Last Updated:** 2025-10-31
