SwankyB

## ☁️ Deployment to Cloudflare Pages

### Option A: GitHub Integration (Recommended)

This is the easiest method with automatic deployments on every push.

#### Step 1: Push to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial: Production-ready affiliate blog"
git branch -M main

# Create GitHub repository and push
git remote add origin git@github.com:<USERNAME>/<REPO>.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. **Login to Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** in the sidebar

2. **Create New Project**
   - Click **"Create a project"**
   - Select **"Connect to Git"**
   - Choose **GitHub** and authorize Cloudflare
   - Select your repository

3. **Configure Build Settings**
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```

4. **Set Environment Variables**
   In the Cloudflare Pages dashboard, go to **Settings** → **Environment variables**:
   
   ```
   NODE_ENV=production
   AFFILIATE_TAG=swankyboyz-20
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   ADMIN_EMAIL=admin@yourdomain.com
   SENDGRID_API_KEY=your-sendgrid-api-key
   SITE_URL=https://yourdomain.com
   ```

5. **Deploy**
   - Click **"Save and Deploy"**
   - Cloudflare will automatically build and deploy your site
   - Future pushes to `main` branch will trigger automatic deployments

#### Step 3: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Pages dashboard, go to **Custom domains**
   - Click **"Set up a custom domain"**
   - Enter your domain (e.g., `swankyboyz.com`)

2. **Configure DNS**
   - Add a CNAME record pointing to your Pages URL
   - Or use Cloudflare as your DNS provider for automatic configuration

3. **SSL Certificate**
   - Cloudflare automatically provisions SSL certificates
   - Your site will be available over HTTPS

### Option B: CLI Deployment with Wrangler

For manual deployments or CI/CD pipelines.

#### Step 1: Install Wrangler

```bash
npm install -g wrangler@latest
wrangler login
```

#### Step 2: Create Pages Project

```bash
# Create a new Pages project
wrangler pages project create your-project-name
```

#### Step 3: Build and Deploy

```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy ./dist --project-name=your-project-name
```

#### Step 4: Set Environment Variables via CLI

```bash
# Set production environment variables
wrangler pages secret put JWT_SECRET --project-name=your-project-name
wrangler pages secret put AFFILIATE_TAG --project-name=your-project-name
wrangler pages secret put SENDGRID_API_KEY --project-name=your-project-name
```

### Option C: GitHub Actions CI/CD

For automated testing and deployment pipeline.

#### Step 1: Set GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**:

```
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_PAGES_PROJECT=your-project-name
AFFILIATE_TAG=swankyboyz-20
JWT_SECRET=your-jwt-secret
SENDGRID_API_KEY=your-sendgrid-key
```

#### Step 2: GitHub Actions Workflow

The included `.github/workflows/ci.yml` will automatically:
- Run tests on every push
- Check for broken links
- Run accessibility tests
- Deploy to Cloudflare Pages on successful builds

### Post-Deployment Checklist

After successful deployment:

- [ ] **Verify site loads**: Check your domain loads correctly
- [ ] **Test admin login**: Access `/admin` with credentials
- [ ] **Check affiliate links**: Ensure all Amazon links work
- [ ] **Validate SEO**: Run Lighthouse audit
- [ ] **Test forms**: Newsletter signup, contact forms
- [ ] **Mobile responsiveness**: Test on various devices
- [ ] **SSL certificate**: Ensure HTTPS is working

### Monitoring and Maintenance

1. **Analytics Setup**
   - Add Google Analytics 4 tracking ID
   - Set up Google Search Console
   - Monitor Core Web Vitals

2. **Performance Monitoring**
   - Use Cloudflare Analytics
   - Set up uptime monitoring
   - Monitor affiliate link performance

3. **Security Updates**
   - Regularly update dependencies
   - Monitor security advisories
   - Review access logs

### Troubleshooting Common Issues

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs in Cloudflare dashboard

**Environment Variables:**
- Ensure all required variables are set
- Check variable names match exactly
- Verify secrets are properly encoded

**Domain Issues:**
- Verify DNS records are correct
- Check SSL certificate status
- Ensure domain is properly configured
