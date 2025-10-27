#!/usr/bin/env node
/**
 * Automated Lighthouse audit script
 * Usage: node scripts/lighthouse-audit.js
 * 
 * Requires lighthouseCI or lighthouse CLI installed
 * Install: npm install --save-dev lighthouse
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LIGHTHOUSE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    maxWaitForLoad: 35000,
    emulatedFormFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1638.4,
      uploadThroughputKbps: 819.2,
      cpuSlowdownMultiplier: 4,
    },
  },
};

const AUDIT_PAGES = [
  'http://localhost:5173/',
  'http://localhost:5173/articles',
  'http://localhost:5173/category/grooming',
];

const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  'best-practices': 90,
  seo: 95,
};

function saveAuditConfig() {
  const configPath = path.join(__dirname, '..', 'lighthouserc.js');
  const configContent = `module.exports = ${JSON.stringify(LIGHTHOUSE_CONFIG, null, 2)};`;
  fs.writeFileSync(configPath, configContent);
  console.log(`✓ Lighthouse config saved to ${configPath}`);
}

function runAudit(url) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(__dirname, '..', 'lighthouse-reports', `report-${timestamp}.json`);
  
  // Ensure reports directory exists
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  try {
    console.log(`\n🔍 Auditing: ${url}`);
    
    // Run lighthouse with required output
    const command = `lighthouse "${url}" --output=json --output-path="${reportPath}" --chrome-flags="--headless" 2>/dev/null`;
    execSync(command, { stdio: 'pipe' });

    // Read and parse results
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const categories = report.categories;

    // Display results
    console.log('\n📊 Audit Results:');
    let allPassed = true;

    Object.entries(categories).forEach(([category, data]) => {
      if (THRESHOLDS[category]) {
        const score = Math.round(data.score * 100);
        const threshold = THRESHOLDS[category];
        const status = score >= threshold ? '✓' : '✗';
        const color = score >= threshold ? '\x1b[32m' : '\x1b[31m';
        console.log(`  ${color}${status}\x1b[0m ${category.padEnd(20)} ${score}/100 (target: ${threshold})`);
        if (score < threshold) allPassed = false;
      }
    });

    console.log(`\n📄 Full report: ${reportPath}`);
    return { url, report, passed: allPassed };
  } catch (error) {
    console.error(`✗ Audit failed for ${url}:`, error.message);
    return { url, report: null, passed: false };
  }
}

function generateSummary(results) {
  const summaryPath = path.join(__dirname, '..', 'LIGHTHOUSE_SUMMARY.md');
  
  let markdown = '# Lighthouse Audit Summary\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  markdown += '## Results\n\n';
  markdown += '| Page | Performance | Accessibility | Best Practices | SEO | Status |\n';
  markdown += '|------|-------------|----------------|----------------|-----|--------|\n';

  results.forEach(({ url, report, passed }) => {
    if (report) {
      const perf = Math.round(report.categories.performance.score * 100);
      const a11y = Math.round(report.categories.accessibility.score * 100);
      const bp = Math.round(report.categories['best-practices'].score * 100);
      const seo = Math.round(report.categories.seo.score * 100);
      const status = passed ? '✓ Pass' : '✗ Needs Work';
      markdown += `| ${url} | ${perf} | ${a11y} | ${bp} | ${seo} | ${status} |\n`;
    }
  });

  markdown += '\n## Thresholds\n\n';
  Object.entries(THRESHOLDS).forEach(([category, threshold]) => {
    markdown += `- **${category}**: ${threshold}\n`;
  });

  fs.writeFileSync(summaryPath, markdown);
  console.log(`\n✓ Summary saved to ${summaryPath}`);
}

// Main execution
async function main() {
  console.log('🚀 Starting Lighthouse audits...\n');

  // Check if lighthouse is installed
  try {
    execSync('lighthouse --version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Lighthouse is not installed.');
    console.error('Install it with: npm install --save-dev lighthouse');
    process.exit(1);
  }

  // Save config
  saveAuditConfig();

  // Run audits
  const results = [];
  for (const pageUrl of AUDIT_PAGES) {
    const result = runAudit(pageUrl);
    results.push(result);
  }

  // Generate summary
  generateSummary(results);

  // Exit with appropriate code
  const allPassed = results.every(r => r.passed);
  console.log(`\n${allPassed ? '✓ All audits passed!' : '⚠️  Some audits need improvement.'}`);
  process.exit(allPassed ? 0 : 1);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
