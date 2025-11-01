# SwankyBoyz Setup Guide

Complete guide for setting up and working with the SwankyBoyz repository.

## Quick Start

### Prerequisites

- **Node.js**: Version 22.0.0 or higher
- **npm**: Latest version
- **Git**: For version control
- **Cloudflare Account**: For deployment (free tier available)
- **Google Account**: For Sheets API access

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/SwankyB.git
cd SwankyB

# Install dependencies
npm ci

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your site.

## Google Sheets Integration

### Step 1: Create Your Content Hub

1. **Create a new Google Sheet** titled: `SwankyBoyz Content Hub`
2. **Create Sheet 1: Products**
   - Add columns: `id`, `name`, `brand`, `description`, `image`, `affiliate_url`
3. **Create Sheet 2: Articles**
   - Add columns: `id`, `title`, `slug`, `excerpt`, `content`, `cover_image`, `visuals`, `date`

### Step 2: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis)
2. Create a new project (e.g., "SwankyBoyz CMS")
3. Enable the **Google Sheets API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### Step 3: Create Service Account Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in the details:
   - Name: `swankyboyz-sync-service`
   - Description: `Service account for syncing Google Sheets to D1`
4. Click "Create and Continue"
5. Skip optional steps and click "Done"
6. Click on the newly created service account
7. Go to the "Keys" tab
8. Click "Add Key" → "Create New Key"
9. Choose "JSON" format
10. Download the credentials file
11. Rename it to `credentials.json`
12. Move it to `/scripts/credentials.json`

**IMPORTANT**: Never commit `credentials.json` to Git! It's already in `.gitignore`.

### Step 4: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button
3. Copy the service account email from `credentials.json` (looks like: `service-account-name@project-id.iam.gserviceaccount.com`)
4. Paste it in the share dialog
5. Give it "Editor" permissions
6. Click "Send"

### Step 5: Update Sheet ID

1. Open your Google Sheet
2. Copy the ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Open `/scripts/sync-sheets.ts`
4. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID

### Step 6: Test Sync

```bash
npm run sync
```

If successful, you'll see:
```
🧾 Syncing Products...
📰 Syncing Articles...
✅ Google Sheets → D1 Sync Complete
```

## Database Management

### Local Database

The project uses Cloudflare D1 (SQLite-based) stored at `/swankyboyz.db`.

### Database Schema

**Products Table:**
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  image TEXT,
  affiliate_url TEXT
);
```

**Articles Table:**
```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  visuals TEXT,
  date TEXT
);
```

### Seeding the Database

```bash
npm run build  # Automatically runs postbuild script to seed D1
```

## Content Management Workflow

### Adding New Content

1. **Edit Google Sheet** with new products or articles
2. **Run sync locally**:
   ```bash
   npm run sync
   ```
3. **Verify changes**:
   ```bash
   npm run dev
   ```
4. **Commit and deploy**:
   ```bash
   git add .
   git commit -m "Content update: [brief description]"
   git push origin main
   ```

### Image Management

1. **Add images** to `/public/assets/`
2. **Use descriptive filenames**: 
   - Products: `product-brand-name.jpg`
   - Articles: `article-slug-hero.jpg`, `article-slug-visual-1.jpg`
3. **Reference in Google Sheets**: Use filename only (no path)
4. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.mp4`

### Visual Requirements

- **Minimum 3 visuals per article** (images or videos)
- **Every visual needs alt text**
- **Format in Google Sheets** (visuals column):
  ```
  image-1.jpg,video-demo.mp4,image-3.png
  ```

### Image Validation

Automatically validate images before deployment:

```bash
npm run validate-images
```

This will:
- Check if all referenced images exist
- Generate placeholders for missing images
- Report any issues

## Development Commands

```bash
# Start development server
npm run dev

# Start full development environment (Vite + Wrangler)
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview

# Sync content from Google Sheets
npm run sync

# Validate images
npm run validate-images

# Generate sitemap
npm run generate-sitemap

# Lint code
npm run lint
```

## GitHub Actions Automation

### Automated Weekly Sync

The repository includes a GitHub Action that automatically syncs content every Monday at 2 AM UTC.

**File**: `.github/workflows/sync.yml`

### Setup Secrets

Add these secrets in GitHub repository settings:

1. **GOOGLE_SHEETS_CREDENTIALS**
   - Copy entire contents of `scripts/credentials.json`
   - Paste as a secret

2. **GOOGLE_SHEET_ID**
   - Your Google Sheet ID from the URL

### Manual Trigger

You can manually trigger the sync from GitHub:
1. Go to "Actions" tab
2. Select "Sync Content from Google Sheets"
3. Click "Run workflow"

## Deployment to Cloudflare Pages

### Initial Setup

1. **Push to GitHub** (if not already done)
2. **Go to Cloudflare Dashboard**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Pages"
   - Click "Create a project"

3. **Connect to Git**
   - Select "Connect to Git"
   - Choose GitHub and authorize
   - Select your repository

4. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
   - Node.js version: `22`

5. **Environment Variables**
   - Add `NODE_VERSION`: `22.x`

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for deployment to complete

### Automatic Deployments

After initial setup, Cloudflare Pages automatically deploys:
- Every push to `main` branch
- Every pull request (preview deployment)

### Custom Domain

1. Go to your Pages project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Follow the DNS configuration instructions

## Project Structure

```
/workspaces/SwankyB/
├── .github/
│   ├── copilot-instructions.md    # Copilot agent instructions
│   ├── SETUP_GUIDE.md             # This file
│   └── workflows/
│       └── sync.yml               # Automated content sync
├── public/
│   └── assets/                    # All images and videos
├── scripts/
│   ├── sync-sheets.ts             # Google Sheets sync script
│   ├── seed-d1.ts                 # Database seeding
│   ├── validate-images.ts         # Image validation
│   └── credentials.json           # Google API credentials (gitignored)
├── src/
│   ├── components/                # Reusable UI components
│   ├── pages/                     # Page components
│   └── layouts/                   # Page layouts
├── swankyboyz.db                  # Local D1 database (gitignored)
├── package.json                   # Dependencies and scripts
└── README.md                      # Project overview
```

## Troubleshooting

### Sync Issues

**Error: "Unable to read credentials"**
- Verify `scripts/credentials.json` exists and is valid JSON
- Check file permissions

**Error: "Google Sheets API has not been used"**
- Enable Google Sheets API in Google Cloud Console
- Wait a few minutes and try again

**Error: "The caller does not have permission"**
- Share your Google Sheet with the service account email
- Give "Editor" permissions

### Image Issues

**Images not loading**
- Check files exist in `/public/assets/`
- Verify filenames match exactly (case-sensitive)
- Run `npm run validate-images`

**Missing alt text warnings**
- Update visuals format in Google Sheets
- Include descriptive alt text for accessibility

### Build Issues

**Build fails with type errors**
- Delete `node_modules` and reinstall: `npm ci`
- Check TypeScript version: `npx tsc --version`
- Clear cache: `rm -rf node_modules/.vite`

**Database errors**
- Delete `swankyboyz.db` and rebuild: `npm run build`
- Check database schema matches expected structure

### Deployment Issues

**Cloudflare Pages build fails**
- Check build logs in Cloudflare dashboard
- Verify Node.js version is set to 22
- Ensure all dependencies are in `package.json`

**Site loads but content missing**
- Check if database was seeded correctly
- Verify `postbuild` script ran successfully
- Check browser console for errors

## Performance Optimization

### Image Optimization

1. **Use WebP format** when possible (smaller file size)
2. **Compress images** before uploading:
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: <200KB per image
3. **Lazy load images** below the fold
4. **Use appropriate dimensions**:
   - Hero images: 1200x630px
   - Product images: 800x800px
   - Thumbnails: 400x400px

### Code Optimization

- **Code splitting**: Automatically handled by Vite
- **Tree shaking**: Remove unused code
- **Minification**: Enabled in production builds
- **Caching**: Leverage Cloudflare CDN

## SEO Best Practices

### Content SEO

- **Unique titles**: 50-60 characters
- **Meta descriptions**: 150-160 characters
- **Heading hierarchy**: Use h1, h2, h3 properly
- **Alt text**: Descriptive text for all images
- **Internal linking**: Link related articles

### Technical SEO

- **Sitemap**: Auto-generated at build time
- **robots.txt**: Configure crawling rules
- **Schema markup**: Product and Article structured data
- **Canonical URLs**: Set correctly on all pages
- **Mobile-friendly**: Responsive design

### Performance SEO

- **Lighthouse score**: Aim for 90+ on all metrics
- **Core Web Vitals**: Monitor and optimize
- **Page speed**: Target <3s load time
- **Mobile performance**: Prioritize mobile optimization

## Support Resources

### Documentation

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Project Documentation

- `README.md`: Project overview
- `.github/copilot-instructions.md`: Copilot agent guidelines
- `GOOGLE_SHEETS_INTEGRATION_GUIDE.md`: Detailed Sheets setup
- `IMAGE_SYSTEM_QUICK_REFERENCE.md`: Image management
- `PERFORMANCE_OPTIMIZATION_GUIDE.md`: Speed optimization
- `PRODUCTION_DEPLOYMENT_GUIDE.md`: Deployment procedures

### Getting Help

1. Check documentation files in the repository
2. Review GitHub Issues for similar problems
3. Check Cloudflare documentation
4. Review build logs for specific errors

## Maintenance Schedule

### Daily
- Monitor site uptime
- Check for content updates

### Weekly
- Review analytics
- Update content via Google Sheets
- Check for broken links

### Monthly
- Review performance metrics
- Update dependencies: `npm outdated`
- Audit images and optimize
- Review and update documentation

### Quarterly
- Security audit
- Performance optimization review
- Content strategy review
- Backup database

## Next Steps

After completing setup:

1. ✅ **Test local development**: Verify everything works
2. ✅ **Add initial content**: Populate Google Sheets with products/articles
3. ✅ **Sync content**: Run `npm run sync`
4. ✅ **Deploy to Cloudflare**: Set up Pages deployment
5. ✅ **Configure custom domain**: Add your domain
6. ✅ **Set up GitHub Actions**: Configure automated sync
7. ✅ **Monitor performance**: Use Lighthouse and Analytics
8. ✅ **Create content calendar**: Plan regular updates

## Best Practices

### Development

- **Test locally first**: Always verify changes before committing
- **Commit frequently**: Small, focused commits with clear messages
- **Use branches**: Create feature branches for major changes
- **Review changes**: Check git diff before committing
- **Write comments**: Document complex logic

### Content

- **Consistent quality**: Maintain high standards for all content
- **Regular updates**: Keep content fresh and relevant
- **SEO optimization**: Follow SEO best practices
- **Visual quality**: Use professional, high-quality images
- **Accessibility**: Include alt text and follow WCAG guidelines

### Deployment

- **Test before deploy**: Verify build succeeds locally
- **Monitor deployments**: Check logs for errors
- **Rollback plan**: Know how to revert if needed
- **Performance check**: Run Lighthouse after deploy
- **Verify functionality**: Test key features post-deploy

---

**Need help?** Check the documentation files or review the `.github/copilot-instructions.md` for detailed guidance on working with this repository.
