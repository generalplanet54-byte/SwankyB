# Google Sheets Migration - Quick Start

## ✅ What's Already Done

- ✅ Sheet ID configured: `1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk`
- ✅ Sync script updated
- ✅ Repository configured for Copilot agent

## 🔐 What You Need to Do

### Create Google Cloud Credentials (5 minutes)

**Quick Link:** https://console.cloud.google.com/apis/dashboard

1. **Create Project** → Name it "SwankyBoyz CMS"
2. **Enable API** → Search "Google Sheets API" → Enable
3. **Create Service Account** → Name: "swankyboyz-sync-service"
4. **Download Key** → Keys tab → Add Key → Create New Key → JSON
5. **Save File** → Rename to `credentials.json` → Place in `/workspaces/SwankyB/scripts/`

### Share Your Google Sheet

1. Open `credentials.json` → Copy the `client_email` (looks like `name@project.iam.gserviceaccount.com`)
2. Open your [Google Sheet](https://docs.google.com/spreadsheets/d/1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk/edit)
3. Click **Share** → Paste the email → Give **Editor** access → Send

## 🚀 After Credentials Setup

```bash
# Test the sync
npm run sync

# If successful, start dev server
npm run dev

# Visit http://localhost:5173
```

## 📊 What Will Happen

When you run `npm run sync`:

1. ✅ Connects to your Google Sheet
2. ✅ Reads Products sheet (Sheet 1)
3. ✅ Reads Articles sheet (Sheet 2)
4. ✅ Deletes sample data from database
5. ✅ Inserts your real content
6. ✅ Shows summary of what was synced

**Current Database:**
- 3 sample products → Will be replaced with your products
- 2 sample articles → Will be replaced with your articles

## 📋 Google Sheet Structure

Make sure your Google Sheet has these tabs:

### Sheet 1: Products
Columns: `id` | `name` | `brand` | `description` | `image` | `affiliate_url`

### Sheet 2: Articles
Columns: `id` | `title` | `slug` | `excerpt` | `content` | `cover_image` | `visuals` | `date`

## 🆘 Troubleshooting

### "Unable to read credentials"
- Check file exists at `/workspaces/SwankyB/scripts/credentials.json`
- Verify it's valid JSON

### "The caller does not have permission"
- Share your Google Sheet with the service account email
- Give it "Editor" permissions

### "API has not been used"
- Enable Google Sheets API in Google Cloud Console
- Wait a few minutes and try again

## 🎯 Need Help?

Run the setup helper:
```bash
./setup-google-sheets.sh
```

Or check detailed guide:
```bash
cat .github/SETUP_GUIDE.md
```

---

**What to do right now:**
1. Go to https://console.cloud.google.com/apis/dashboard
2. Follow the 5 steps above to create credentials
3. Save credentials.json to scripts folder
4. Run `npm run sync`
5. You're done! 🎉
