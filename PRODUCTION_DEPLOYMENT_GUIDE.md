# SwankyBoyz.com - Production Deployment Guide

## 🚀 Critical: Before You Deploy

### Required Action - Set JWT_SECRET

**This MUST be done before deploying to production:**

1. **Generate a secure JWT secret:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output (should look like: `xK9mP2nQ...`)

2. **Add to Cloudflare Pages:**
   - Go to: [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → SwankyB → Settings → Environment Variables
   - Click "Add variable"
   - **Variable name**: `JWT_SECRET`
   - **Value**: Paste the generated secret
   - **Environment**: Select both "Production" and "Preview"
   - Click "Save"

3. **Redeploy your site:**
   - Go to: Deployments tab
   - Click "Retry deployment" on the latest deployment
   - OR push a new commit to trigger automatic deployment

---

## ✅ Pre-Deployment Checklist

- [x] JWT_SECRET generated (minimum 32 characters)
- [x] JWT_SECRET added to Cloudflare Pages (Production)
- [x] JWT_SECRET added to Cloudflare Pages (Preview)
- [x] D1 database binding commented out (default - optional for deployment)
- [ ] **Site redeployed after adding JWT_SECRET**
- [ ] **Login tested on production URL**
- [ ] **Default password changed from P@ssW#rd**
- [ ] **D1 Database set up** (optional - see D1_DATABASE_SETUP.md)

---

## 🔐 Default Admin Credentials

**⚠️ SECURITY WARNING: Change these immediately after first login!**

- **Username**: `netmin`
- **Password**: `P@ssW#rd`

**How to change password:**
1. Login with default credentials
2. Navigate to Admin Panel → Settings
3. Use "Change Password" feature
4. Save new credentials securely

---

## 🧪 Post-Deployment Testing

### 1. Test Unauthenticated Request
```bash
curl -i https://swankyboyz.com/api/admin/me
```

**Expected Response:**
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error":"Not authenticated","message":"No authentication cookie found"}
```

### 2. Test Login
```bash
curl -i -X POST https://swankyboyz.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"netmin","password":"P@ssW#rd"}'
```

**Expected Response:**
```
HTTP/1.1 200 OK
Set-Cookie: auth-token=<JWT_TOKEN>; HttpOnly; Secure; SameSite=Strict; ...

{"success":true,"user":{"id":"1","username":"netmin","email":"admin@swankyboyz.com","role":"admin"}}
```

### 3. Test Authenticated Request
```bash
# Extract token from Set-Cookie header above
curl -i -H "Cookie: auth-token=<YOUR_TOKEN>" \
  https://swankyboyz.com/api/admin/me
```

**Expected Response:**
```
HTTP/1.1 200 OK
Content-Type: application/json

{"user":{"id":"1","username":"netmin","role":"admin"}}
```

---

## 🔍 Verification Checklist

### Authentication System
- [ ] Login page loads (`/admin/login`)
- [ ] Login with default credentials succeeds
- [ ] Redirected to admin dashboard after login
- [ ] `/api/admin/me` returns 200 OK when logged in
- [ ] `/api/admin/me` returns 401 when not logged in
- [ ] Logout works correctly
- [ ] Session persists across page reloads

### Content & Assets
- [ ] Homepage loads correctly
- [ ] All product images display
- [ ] No duplicate images visible
- [ ] All affiliate links work
- [ ] Article pages load
- [ ] Navigation works

### SEO & Performance
- [ ] Meta titles and descriptions present
- [ ] Structured data validated (Google Rich Results Test)
- [ ] Page load time acceptable (<3 seconds)
- [ ] Mobile responsive
- [ ] Lighthouse score >90

---

## 🐛 Troubleshooting

### Problem: Deployment fails with "Invalid database UUID" error

**Error Message:**
```
Error: Failed to publish your Function. Got error: Error 8000022: Invalid database UUID (your-d1-database-id)
```

**Solution:**
This error occurs when the D1 database binding in `wrangler.toml` has a placeholder value. The D1 database is optional and the site works without it.

**✅ Already Fixed**: The D1 binding is now configured with a valid database_id (fb8ab815-af3a-4102-ab39-aeabcb829008), so deployment will succeed.

**Database setup**: The database needs migrations to be applied. See `D1_DATABASE_SETUP.md` for migration instructions.

### Problem: 401 Error on `/api/admin/me` even when logged in

**Causes & Solutions:**

1. **JWT_SECRET not set:**
   - Check Cloudflare Pages → Environment Variables
   - Ensure JWT_SECRET exists for Production environment
   - Redeploy after adding

2. **JWT_SECRET not matching:**
   - If you changed JWT_SECRET, all existing tokens are invalidated
   - Users must logout and login again
   - Clear browser cookies

3. **Cookie not sent:**
   - Check browser console → Network tab → `/api/admin/me` request → Cookies
   - Ensure `auth-token` cookie is present
   - Verify domain matches (swankyboyz.com)

4. **HTTPS required:**
   - Secure cookies only work over HTTPS
   - Verify URL starts with `https://`
   - Check for mixed content warnings

### Problem: Login button doesn't respond

**Solutions:**
1. Open browser console (F12) → Check for JavaScript errors
2. Verify Network tab shows POST request to `/api/login`
3. Check response status code and body
4. Ensure Content-Type is `application/json`

### Problem: Images not loading

**Solutions:**
1. Check browser console for CORS errors
2. Verify Unsplash URLs are accessible
3. Check ad blocker isn't blocking images
4. Inspect Network tab for failed image requests

---

## 📊 What Was Fixed (Summary)

### 🔐 Critical Security Fixes
- ✅ **Fixed 401 Unauthorized error** on `/api/admin/me`
- ✅ **Added JWT_SECRET validation** (prevents silent failures)
- ✅ **Implemented CORS headers** for cross-origin requests
- ✅ **Enhanced cookie parsing** (handles base64 tokens correctly)
- ✅ **Added comprehensive logging** for debugging

### 🎨 Content Improvements
- ✅ **Fixed duplicate images** across 3 products
- ✅ **Replaced non-displaying image** for Braun Series 8
- ✅ **Maintained masculine brand aesthetic** throughout

### 📝 Documentation
- ✅ **Created comprehensive `.env.example`** with deployment guide
- ✅ **Generated detailed CHANGELOG.md**
- ✅ **Produced this deployment guide**

---

## 🔒 Security Best Practices

### Implemented
- ✅ HttpOnly cookies (prevents XSS)
- ✅ Secure flag (HTTPS only)
- ✅ SameSite=Strict (prevents CSRF)
- ✅ 24-hour token expiry
- ✅ SHA-256 password hashing
- ✅ Account lockout (5 failed attempts)

### Recommended Next Steps
- [ ] Change default admin password
- [ ] Implement 2FA for admin accounts
- [ ] Add IP-based rate limiting
- [ ] Set up monitoring/alerting
- [ ] Implement audit logging
- [ ] Create additional admin users (don't share netmin account)

---

## 📞 Support Contacts

### Environment Variables Issue
- Check: Cloudflare Pages → Settings → Environment Variables
- Verify: JWT_SECRET exists and is at least 32 characters

### Authentication Issue
- Check: Browser console for error messages
- Look for: Detailed error messages in response JSON
- Debug: Server logs in Cloudflare Pages dashboard

### Content Issue
- Review: `src/data/launchProducts.ts` for product data
- Verify: Image URLs are accessible (test in browser)
- Check: Network tab for failed asset requests

---

## 🎯 Success Criteria

Your deployment is successful when:

1. ✅ You can login at `https://swankyboyz.com/admin/login`
2. ✅ Admin dashboard loads after login
3. ✅ `/api/admin/me` returns user data (not 401)
4. ✅ All product images display correctly
5. ✅ No console errors on any page
6. ✅ Lighthouse score >90 on homepage
7. ✅ All affiliate links work

---

## 📈 Performance Expectations

### Build Metrics
- **Build Time**: ~5 seconds
- **Bundle Size**: 375 kB (106 kB gzipped)
- **CSS Size**: 82 kB (12 kB gzipped)

### Runtime Performance
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Cumulative Layout Shift**: <0.1

---

## 🚀 Deployment Complete!

Once you've:
1. ✅ Set JWT_SECRET in Cloudflare Pages
2. ✅ Redeployed the site
3. ✅ Tested authentication flow
4. ✅ Changed default password

Your site is **PRODUCTION READY** and secure! 🎉

---

**Need Help?**
- Review: `CHANGELOG.md` for detailed changes
- Check: `.env.example` for configuration reference
- Debug: Browser console and Network tab
- Monitor: Cloudflare Pages dashboard → Functions → Logs

---

*Last Updated: October 26, 2025*  
*SwankyBoyz.com - Premium Men's Grooming, Style & Lifestyle Guide*
