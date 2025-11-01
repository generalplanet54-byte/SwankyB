# .github Directory Documentation

This directory contains configuration files for GitHub-specific features, including Copilot coding agent instructions, workflows, and contribution guidelines.

## Files Overview

### `copilot-instructions.md`
**Purpose**: Comprehensive instructions for GitHub Copilot coding agent when working with this repository.

**Contains**:
- Project architecture and technology stack
- Code style guidelines and conventions
- Development workflows and best practices
- Database schema and content management
- SEO and performance requirements
- Troubleshooting guides

**When to reference**: 
- Before starting any development work
- When implementing new features
- When debugging issues
- For understanding project conventions

### `SETUP_GUIDE.md`
**Purpose**: Complete setup instructions for new developers joining the project.

**Contains**:
- Prerequisites and initial setup
- Google Sheets API configuration
- Database management
- Content workflow
- Deployment instructions
- Troubleshooting common issues

**When to reference**:
- First time setting up the project
- Configuring Google Sheets integration
- Setting up CI/CD pipelines
- Deploying to Cloudflare Pages

### `CONTRIBUTING.md`
**Purpose**: Guidelines for contributing to the project.

**Contains**:
- Code of conduct
- How to report bugs and suggest features
- Pull request process
- Code style guidelines
- Testing requirements
- Review process

**When to reference**:
- Before submitting a pull request
- When reporting bugs
- For code style questions
- Understanding the contribution workflow

## Workflows Directory

### `workflows/sync.yml`
**Purpose**: Automated content synchronization from Google Sheets.

**Schedule**: Every Monday at 2 AM UTC

**Triggers**:
- Scheduled (cron)
- Manual (workflow_dispatch)

**What it does**:
1. Checks out the repository
2. Sets up Node.js environment
3. Installs dependencies
4. Configures Google Sheets credentials
5. Runs content sync
6. Validates images
7. Commits changes (if any)
8. Pushes to main branch

**Required Secrets**:
- `GOOGLE_SHEETS_CREDENTIALS`: JSON credentials file content
- `GOOGLE_SHEET_ID`: ID of the Google Sheet to sync from

### `workflows/ci.yml`
**Purpose**: Continuous integration checks.

**Triggers**: Push to main, pull requests

**What it does**:
1. Lints code
2. Runs type checking
3. Builds the project
4. Runs tests

### `workflows/deploy-pages.yml`
**Purpose**: Deployment to Cloudflare Pages.

**Triggers**: Push to main branch

**What it does**:
1. Builds the project
2. Deploys to Cloudflare Pages
3. Updates deployment status

## Best Practices

### For Copilot Coding Agent

When GitHub Copilot is working on this repository:

1. **Always read** `copilot-instructions.md` first
2. **Follow conventions** documented in the instructions
3. **Test changes** locally before committing
4. **Validate images** using provided scripts
5. **Update documentation** when making changes

### For Human Developers

When working on this repository:

1. **Start with** `SETUP_GUIDE.md` for initial setup
2. **Review** `CONTRIBUTING.md` before submitting PRs
3. **Reference** `copilot-instructions.md` for best practices
4. **Check workflows** for CI/CD configuration
5. **Keep documentation updated** as project evolves

## Maintenance

### Updating Instructions

When project architecture changes:

1. Update `copilot-instructions.md` with new conventions
2. Update `SETUP_GUIDE.md` with new setup steps
3. Update `CONTRIBUTING.md` if workflow changes
4. Test instructions with a fresh clone
5. Commit updates with clear description

### Updating Workflows

When modifying GitHub Actions:

1. Test locally with `act` (GitHub Actions CLI) if possible
2. Use workflow_dispatch for manual testing
3. Monitor workflow runs after changes
4. Update documentation if behavior changes
5. Keep secrets management secure

## Security Considerations

### Credentials Management

- **Never commit** `credentials.json` to repository
- **Use GitHub Secrets** for sensitive data
- **Rotate credentials** regularly
- **Limit permissions** to minimum required
- **Review access logs** periodically

### Workflow Security

- **Pin action versions** to specific commits or tags
- **Review action permissions** regularly
- **Use GITHUB_TOKEN** with minimum permissions
- **Validate inputs** in workflow scripts
- **Monitor for security advisories**

## Quick Reference

### Common Tasks

**Setup Google Sheets sync:**
```bash
# See SETUP_GUIDE.md sections:
# - Google Sheets Integration
# - Step 1-6
```

**Run content sync locally:**
```bash
npm run sync
```

**Trigger GitHub Actions manually:**
1. Go to Actions tab in GitHub
2. Select workflow
3. Click "Run workflow"

**Update Copilot instructions:**
1. Edit `.github/copilot-instructions.md`
2. Test with Copilot
3. Commit changes

### Key Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run sync             # Sync from Google Sheets

# Testing
npm run lint             # Run linter
npm run validate-images  # Validate image references

# Deployment
git push origin main     # Triggers auto-deploy
```

### Important Files

```
.github/
├── copilot-instructions.md  # Copilot AI instructions
├── SETUP_GUIDE.md          # Setup documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── README.md               # This file
└── workflows/
    ├── sync.yml            # Content sync automation
    ├── ci.yml              # Continuous integration
    └── deploy-pages.yml    # Deployment workflow
```

## Support

### Getting Help

1. **Check documentation** in this directory first
2. **Search existing issues** on GitHub
3. **Review workflow runs** for error logs
4. **Create new issue** if problem persists
5. **Tag with appropriate labels**

### Reporting Issues

When reporting issues related to:

- **Setup**: Reference SETUP_GUIDE.md section
- **Contribution**: Reference CONTRIBUTING.md section
- **Workflows**: Include workflow run URL
- **Documentation**: Suggest specific improvements

### Suggesting Improvements

Documentation improvements are welcome! To suggest changes:

1. Create an issue describing the improvement
2. Reference specific file and section
3. Explain why the change is needed
4. Submit a PR with proposed changes

## Changelog

### 2025-11-01
- ✅ Created comprehensive `copilot-instructions.md`
- ✅ Added detailed `SETUP_GUIDE.md`
- ✅ Created `CONTRIBUTING.md` guidelines
- ✅ Added this README for .github directory
- ✅ Updated `.gitignore` for credentials
- ✅ Verified existing workflows

---

**Last Updated**: November 1, 2025  
**Maintainer**: SwankyBoyz Team  
**Version**: 1.0.0
