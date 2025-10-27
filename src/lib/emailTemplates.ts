/**
 * HTML Email Templates
 * Production-ready email templates for welcome sequence
 * Copy-paste into ConvertKit, Klaviyo, or SendGrid
 */

export const EMAIL_TEMPLATE_1_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SwankyBoyz</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-collapse: collapse;
    }
    .header {
      background: linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #1A1A1A;
      font-size: 20px;
      margin: 20px 0 15px 0;
    }
    .content p {
      margin: 0 0 15px 0;
      font-size: 15px;
      color: #555;
    }
    .recommendation-box {
      background: #fafaf8;
      border-left: 4px solid #D4AF37;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .recommendation-box strong {
      color: #1A1A1A;
      display: block;
      margin-bottom: 10px;
    }
    .recommendation-box ul {
      margin: 0;
      padding-left: 20px;
    }
    .recommendation-box li {
      margin: 5px 0;
      color: #666;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background-color: #D4AF37;
      color: #1A1A1A;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
      font-size: 16px;
    }
    .cta-button:hover {
      background-color: #c9a32d;
    }
    .footer {
      background: #1A1A1A;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      border-top: 1px solid #333;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table class="container">
    <tr>
      <td class="header">
        <h1>Welcome to SwankyBoyz! 👋</h1>
        <p>The Ultimate Resource for Modern Men's Grooming</p>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Thanks for joining our community of 50,000+ men who are serious about looking sharp.</p>
        
        <p>Whether you're looking to upgrade your grooming routine, find the perfect electric shaver, or master a luxe skincare regimen, we've tested everything and documented what actually works.</p>
        
        <p><strong>To get you started, here are our top product recommendations based on what other SwankyBoyz subscribers are reading:</strong></p>
        
        <div class="recommendation-box">
          <strong>✓ Most Popular This Month:</strong>
          <ul>
            <li><strong>Ultimate Men's Grooming Guide</strong> (5,200 words) - Complete step-by-step routine</li>
            <li><strong>Best Electric Shavers 2025</strong> - Tested 50+ premium options</li>
            <li><strong>Premium Skincare for Men</strong> - Science-backed recommendations</li>
          </ul>
        </div>
        
        <p>You'll get updates on new guides, product reviews, and exclusive subscriber-only content every week.</p>
        
        <p><strong>Questions?</strong> Reply to this email - we read and respond to every message personally.</p>
        
        <center>
          <a href="https://swankyboyz.com/guides/ultimate-mens-grooming?utm_source=email&utm_campaign=welcome-1" class="cta-button">
            Read the Ultimate Grooming Guide
          </a>
        </center>
        
        <p style="margin-top: 30px; font-size: 13px; color: #888;">
          <strong>SwankyBoyz</strong><br>
          Premium Men's Grooming & Lifestyle
        </p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p style="margin: 0 0 10px 0;">
          You're receiving this email because you subscribed to SwankyBoyz Newsletter.
        </p>
        <p style="margin: 0;">
          <a href="{{ unsubscribe_link }}">Unsubscribe</a> | 
          <a href="{{ preferences_link }}">Update Preferences</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const EMAIL_TEMPLATE_2_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Buying Guide - SwankyBoyz</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-collapse: collapse;
    }
    .header {
      background: linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin: 25px 0;
      padding: 20px;
      background: #fafaf8;
      border-left: 4px solid #D4AF37;
      border-radius: 4px;
    }
    .section h3 {
      color: #1A1A1A;
      margin: 0 0 12px 0;
      font-size: 16px;
    }
    .section ul {
      margin: 0;
      padding-left: 20px;
    }
    .section li {
      margin: 6px 0;
      font-size: 14px;
      color: #555;
    }
    .cta-button {
      display: inline-block;
      background-color: #D4AF37;
      color: #1A1A1A;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    .cta-button:hover {
      background-color: #c9a32d;
    }
    .content p {
      margin: 0 0 15px 0;
      font-size: 15px;
      color: #555;
    }
    .footer {
      background: #1A1A1A;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      border-top: 1px solid #333;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table class="container">
    <tr>
      <td class="header">
        <h1>Your Free Buying Guide Is Ready 📋</h1>
        <p>15-page PDF: "The Smart Buyer's Guide to Premium Grooming Gear"</p>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Every week we get asked the same question: <strong>"What's the BEST option for my budget?"</strong></p>
        
        <p>So we created a comprehensive buying guide that covers everything you need to know.</p>
        
        <div class="section">
          <h3>📋 How to Choose by Budget:</h3>
          <ul>
            <li><strong>Budget Option ($50-100)</strong> - Best value shavers, skincare, grooming kits</li>
            <li><strong>Mid-Range ($100-300)</strong> - The sweet spot for quality + features</li>
            <li><strong>Premium ($300+)</strong> - The absolute best money can buy</li>
          </ul>
        </div>
        
        <div class="section">
          <h3>🎯 The 5 Questions to Ask Before Buying:</h3>
          <ul>
            <li>What's your skin type? (sensitive, oily, combination, dry)</li>
            <li>How much time do you have? (routine complexity matters)</li>
            <li>What's your main pain point? (razor burn, ingrown hairs, time)</li>
            <li>Do you prefer electric or manual? (pros/cons of each)</li>
            <li>Will you commit to maintenance? (cleaning, blade replacement)</li>
          </ul>
        </div>
        
        <div class="section">
          <h3>💡 Inside You'll Find:</h3>
          <ul>
            <li>20 recommended products across all categories</li>
            <li>Cost-per-shave breakdown (often surprising!)</li>
            <li>Maintenance timeline and costs</li>
            <li>Warranty and return policy guide</li>
            <li><strong>Exclusive 15% discount code</strong> (for one recommended product)</li>
          </ul>
        </div>
        
        <p>This guide alone has saved subscribers thousands of dollars by helping them avoid buyer's remorse.</p>
        
        <center>
          <a href="https://swankyboyz.com/resources/buying-guide-pdf?utm_source=email&utm_campaign=welcome-2" class="cta-button">
            Download Free PDF Guide
          </a>
        </center>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p style="margin: 0 0 10px 0;">
          You're receiving this email because you subscribed to SwankyBoyz Newsletter.
        </p>
        <p style="margin: 0;">
          <a href="{{ unsubscribe_link }}">Unsubscribe</a> | 
          <a href="{{ preferences_link }}">Update Preferences</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const EMAIL_TEMPLATE_3_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exclusive Discount - SwankyBoyz</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-collapse: collapse;
    }
    .header {
      background: linear-gradient(135deg, #1A1A1A 0%, #2d2d2d 100%);
      padding: 40px 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .discount-code {
      background: #D4AF37;
      color: #1A1A1A;
      padding: 20px;
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .content {
      padding: 40px 30px;
    }
    .product-box {
      background: #fafaf8;
      border-left: 4px solid #D4AF37;
      padding: 15px;
      margin: 12px 0;
      border-radius: 4px;
      font-size: 14px;
    }
    .product-box strong {
      color: #1A1A1A;
      display: block;
      margin-bottom: 5px;
    }
    .cta-button {
      display: inline-block;
      background-color: #D4AF37;
      color: #1A1A1A;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
    }
    .cta-button:hover {
      background-color: #c9a32d;
    }
    .content p {
      margin: 0 0 15px 0;
      font-size: 15px;
      color: #555;
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffc107;
      color: #856404;
      padding: 12px 15px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: 600;
      text-align: center;
    }
    .footer {
      background: #1A1A1A;
      color: white;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      border-top: 1px solid #333;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <table class="container">
    <tr>
      <td class="header">
        <h1>⏰ Today Only: 20% Off</h1>
        <p>Exclusive discount for new SwankyBoyz subscribers</p>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>You've been reading through our guides and reviews. Now it's time to take action.</p>
        
        <p>We've negotiated a <strong>20% exclusive discount</strong> with our top affiliate partners for SwankyBoyz subscribers.</p>
        
        <div class="discount-code">SWANKY20</div>
        
        <div class="warning">
          ⏰ This offer expires at midnight today.
        </div>
        
        <p><strong>Valid on:</strong></p>
        <p style="margin-bottom: 20px;">
          ✓ All Braun electric shavers (Series 7, 8, 9 PRO+)<br>
          ✓ Philips Norelco grooming kits<br>
          ✓ Premium skincare (Clinique, CeraVe)<br>
          ✓ Wireless earbuds (AirPods Pro, Sony, Bose)<br>
          ✓ Select beard care & grooming tools
        </p>
        
        <p><strong>🏆 Top sellers this week:</strong></p>
        
        <div class="product-box">
          <strong>🥇 Braun Series 9 PRO+</strong>
          Normally $299 → <strong>~$240 with SWANKY20</strong>
        </div>
        
        <div class="product-box">
          <strong>🥈 Sony WF-1000XM4 Earbuds</strong>
          Normally $278 → <strong>~$222 with SWANKY20</strong>
        </div>
        
        <div class="product-box">
          <strong>🥉 Braun Grooming Kit 9-in-1</strong>
          Normally $199 → <strong>~$160 with SWANKY20</strong>
        </div>
        
        <p style="margin-top: 25px; color: #666; font-size: 13px;">
          Click below to shop with your discount (code auto-applied):
        </p>
        
        <center>
          <a href="https://swankyboyz.com/shop?utm_source=email&utm_campaign=welcome-3&promo=SWANKY20" class="cta-button">
            Shop With Exclusive Discount
          </a>
        </center>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p style="margin: 0 0 10px 0;">
          You're receiving this email because you subscribed to SwankyBoyz Newsletter.
        </p>
        <p style="margin: 0;">
          <a href="{{ unsubscribe_link }}">Unsubscribe</a> | 
          <a href="{{ preferences_link }}">Update Preferences</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default {
  EMAIL_TEMPLATE_1_HTML,
  EMAIL_TEMPLATE_2_HTML,
  EMAIL_TEMPLATE_3_HTML,
};
