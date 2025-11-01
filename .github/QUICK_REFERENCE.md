# GitHub Copilot Configuration Quick Reference

## 📚 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `.github/copilot-instructions.md` | Primary AI instructions | Always (read by Copilot automatically) |
| `.github/SETUP_GUIDE.md` | Complete setup guide | First time setup, troubleshooting |
| `.github/CONTRIBUTING.md` | Contribution standards | Before submitting PRs |
| `.github/README.md` | .github directory docs | Understanding .github structure |
| `COPILOT_AGENT_CONFIGURATION.md` | Configuration summary | Understanding what was configured |

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run sync             # Sync from Google Sheets

# Testing & Validation
npm run lint             # Lint code
npm run validate-images  # Validate image references
./verify-copilot-config.sh # Verify configuration

# Deployment (automatic on push to main)
git push origin main
```

## 🤖 Using Copilot Coding Agent

### Basic Usage
```
@github Create a new component following project conventions
#github-pull-request_copilot-coding-agent
```

### What Copilot Knows
- ✅ Complete project architecture
- ✅ Code style conventions
- ✅ Database schema
- ✅ Content management workflow
- ✅ SEO and performance requirements
- ✅ Testing standards

## 📋 Setup Checklist

### First Time Setup
- [ ] Clone repository
- [ ] Run `npm ci`
- [ ] Configure Google Sheets API credentials
- [ ] Update `SHEET_ID` in `scripts/sync-sheets.ts`
- [ ] Run `npm run sync`
- [ ] Test with `npm run dev`

### GitHub Secrets (for CI/CD)
- [ ] `GOOGLE_SHEETS_CREDENTIALS` - JSON credentials content
- [ ] `GOOGLE_SHEET_ID` - Your Google Sheet ID

## 🔒 Security Reminders

- ❌ Never commit `scripts/credentials.json`
- ❌ Never commit `*.db` files
- ✅ Use GitHub Secrets for sensitive data
- ✅ Review `.gitignore` before committing

## 📁 Key Directories

```
.github/                 # GitHub-specific configs
├── workflows/          # GitHub Actions
└── *.md               # Documentation

scripts/                # Build and sync scripts
src/                    # Application source
public/assets/         # Images and media
```

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Sync fails | Check credentials.json, verify Sheet ID |
| Images missing | Run `npm run validate-images` |
| Build errors | Delete node_modules, run `npm ci` |
| Deployment fails | Check Cloudflare Pages logs |

## 📖 Further Reading

- **Setup**: `.github/SETUP_GUIDE.md`
- **Contributing**: `.github/CONTRIBUTING.md`
- **Copilot Instructions**: `.github/copilot-instructions.md`
- **Project README**: `README.md`

## ✅ Verification

Run the verification script anytime:
```bash
./verify-copilot-config.sh
```

## 🎯 Best Practices

1. **Read instructions first** - Check `.github/copilot-instructions.md`
2. **Follow conventions** - Match existing code patterns
3. **Test locally** - Always test before committing
4. **Update docs** - Keep documentation in sync with code
5. **Security first** - Never commit credentials

---

**Last Updated**: November 1, 2025  
**Status**: ✅ Fully Configured
