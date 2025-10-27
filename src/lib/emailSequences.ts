/**
 * Welcome Email Sequence Configuration
 * 3-email automated sequence for new newsletter subscribers
 * 
 * Email 1: Welcome (Day 0)
 * Email 2: Buying Guide (Day 2)
 * Email 3: Exclusive Discount (Day 7)
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  sendDelay: number; // Days after subscription
  content: {
    heading: string;
    subheading?: string;
    body: string[];
    ctaText: string;
    ctaUrl: string;
    ctaColor?: 'champagne' | 'charcoal';
  };
  externalIds?: {
    konvertkit?: string;
    klaviyo?: string;
    sendgrid?: string;
  };
}

export const WELCOME_EMAIL_1: EmailTemplate = {
  id: 'welcome-1-thanks-recommendations',
  name: 'Welcome Email 1: Thanks + Top Recommendations',
  subject: 'Welcome to SwankyBoyz! 👋 Here\'s what to read first',
  previewText: 'Your personalized grooming recommendations inside →',
  sendDelay: 0, // Send immediately
  content: {
    heading: 'Welcome to SwankyBoyz!',
    subheading: 'The Ultimate Resource for Modern Men\'s Grooming',
    body: [
      'Thanks for joining our community of 50,000+ men who are serious about looking sharp.',
      'Whether you\'re looking to upgrade your grooming routine, find the perfect electric shaver, or master a luxe skincare regimen, we\'ve tested everything and documented what actually works.',
      'To get you started, here are our **top product recommendations** based on what other SwankyBoyz subscribers are reading:',
      '**Most Popular This Month:**',
      '✓ Ultimate Men\'s Grooming Guide (5,200 words) - Complete step-by-step routine',
      '✓ Best Electric Shavers 2025 - Tested 50+ premium options',
      '✓ Premium Skincare for Men - Science-backed recommendations',
      'You\'ll get updates on new guides, product reviews, and exclusive subscriber-only content every week.',
      'Questions? Reply to this email - we read and respond to every message personally.',
      '**Start exploring →**',
    ],
    ctaText: 'Read the Ultimate Grooming Guide',
    ctaUrl: 'https://swankyboyz.com/guides/ultimate-mens-grooming?utm_source=email&utm_campaign=welcome-1',
    ctaColor: 'champagne',
  },
  externalIds: {
    // Will be populated after creating sequences in each service
  },
};

export const WELCOME_EMAIL_2: EmailTemplate = {
  id: 'welcome-2-buying-guide-pdf',
  name: 'Welcome Email 2: Buying Guide PDF + Upsell',
  subject: 'Your Free Buying Guide: How to Choose Premium Grooming Gear (PDF inside)',
  previewText: 'The 15-page guide that shows exactly what to buy →',
  sendDelay: 2, // Send 2 days after subscription
  content: {
    heading: 'Your Free Buying Guide Is Ready',
    subheading: '15-page PDF: "The Smart Buyer\'s Guide to Premium Grooming Gear"',
    body: [
      'Every week we get asked the same question: "What\'s the BEST option for my budget?"',
      'So we created a comprehensive buying guide that covers:',
      '📋 **How to Choose by Budget:**',
      '  • Budget Option ($50-100): Best value shavers, skincare, grooming kits',
      '  • Mid-Range ($100-300): The sweet spot for quality + features',
      '  • Premium ($300+): The absolute best money can buy',
      '🎯 **The 5 Questions to Ask Before Buying:**',
      '  • What\'s your skin type? (sensitive, oily, combination, dry)',
      '  • How much time do you have? (routine complexity matters)',
      '  • What\'s your main pain point? (razor burn, ingrown hairs, time)',
      '  • Do you prefer electric or manual? (pros/cons of each)',
      '  • Will you commit to maintenance? (cleaning, blade replacement)',
      '💡 **Inside You\'ll Find:**',
      '  • 20 recommended products across all categories',
      '  • Cost-per-shave breakdown (often surprising!)',
      '  • Maintenance timeline and costs',
      '  • Warranty and return policy guide',
      '✉️ **Exclusive Offer:** Download the guide + get 15% off one recommended product (code inside)',
      'This guide alone has saved subscribers $1000s by helping them avoid buyer\'s remorse.',
    ],
    ctaText: 'Download Free PDF Guide',
    ctaUrl: 'https://swankyboyz.com/resources/buying-guide-pdf?utm_source=email&utm_campaign=welcome-2',
    ctaColor: 'champagne',
  },
};

export const WELCOME_EMAIL_3: EmailTemplate = {
  id: 'welcome-3-exclusive-discount',
  name: 'Welcome Email 3: Exclusive Discount Code (20% off)',
  subject: 'Exclusive 20% discount for SwankyBoyz subscribers (Today only ⏰)',
  previewText: 'SWANKY20 - Valid until midnight →',
  sendDelay: 7, // Send 7 days after subscription
  content: {
    heading: '⏰ Today Only: 20% Off Everything',
    subheading: 'Exclusive discount for new SwankyBoyz subscribers',
    body: [
      'You\'ve been reading through our guides and reviews. Now it\'s time to take action.',
      'We\'ve negotiated a **20% exclusive discount** with our top affiliate partners for SwankyBoyz subscribers.',
      '**Your discount code: SWANKY20**',
      'Valid on:',
      '✓ All Braun electric shavers (Series 7, 8, 9 PRO+)',
      '✓ Philips Norelco grooming kits',
      '✓ Premium skincare (Clinique, CeraVe)',
      '✓ Wireless earbuds (AirPods Pro, Sony, Bose)',
      '✓ Select beard care & grooming tools',
      '**This offer expires at midnight today.**',
      '**Top sellers this week:**',
      '🥇 Braun Series 9 PRO+ (normally $299) → ~$240 with SWANKY20',
      '🥈 Sony WF-1000XM4 Earbuds (normally $278) → ~$222 with SWANKY20',
      '🥉 Braun Grooming Kit 9-in-1 (normally $199) → ~$160 with SWANKY20',
      'Click below to shop with your discount (code auto-applied):',
    ],
    ctaText: 'Shop With Exclusive Discount',
    ctaUrl: 'https://swankyboyz.com/shop?utm_source=email&utm_campaign=welcome-3&promo=SWANKY20',
    ctaColor: 'champagne',
  },
};

export const WELCOME_SEQUENCE: EmailTemplate[] = [
  WELCOME_EMAIL_1,
  WELCOME_EMAIL_2,
  WELCOME_EMAIL_3,
];

/**
 * Setup Instructions by Email Service
 */

export const SETUP_INSTRUCTIONS = {
  konvertkit: `
# ConvertKit Setup Instructions

## Step 1: Create Forms
1. Go to ConvertKit Dashboard → Forms
2. Create 3 new forms (one per email)
3. Form names:
   - "Welcome 1: Thanks + Recommendations"
   - "Welcome 2: Buying Guide PDF"
   - "Welcome 3: Exclusive Discount"

## Step 2: Create Automation Rules
1. Dashboard → Automations
2. Create new automation rule
3. Trigger: "New subscriber"
4. Actions:
   - Send Email 1 immediately
   - Wait 2 days → Send Email 2
   - Wait 5 more days → Send Email 3

## Step 3: Email Templates
Copy-paste content from templates above into ConvertKit email builder
Use the subject lines exactly as provided

## Step 4: Get Form IDs
1. Forms → Click form → Settings
2. Copy form ID (looks like: 12345678)
3. Update externalIds.konvertkit in this file

## Testing
1. Subscribe with test email
2. Verify email 1 arrives immediately
3. Check that emails 2,3 arrive on schedule
  `,

  klaviyo: `
# Klaviyo Setup Instructions

## Step 1: Create Lists
1. Lists & Segments → Create new list
2. List name: "SwankyBoyz Newsletter"
3. Note signup source in segment builder

## Step 2: Create Flow
1. Flows → Create new flow
2. Trigger: "Someone joins SwankyBoyz Newsletter list"
3. Add 3 email blocks:
   - Email 1 (immediately)
   - Delay 2 days
   - Email 2
   - Delay 5 days
   - Email 3

## Step 3: Set Up Emails
Use Klaviyo email builder for each template

## Step 4: Get Flow IDs
1. Flows → Click your flow
2. Get ID from URL (shows in dashboard)
3. Update externalIds.klaviyo in this file

## Testing
Similar to ConvertKit
  `,

  sendgrid: `
# SendGrid Setup Instructions

## Step 1: Create Contacts List
1. Contacts → Add List
2. List name: "SwankyBoyz Newsletter"

## Step 2: Create Automation
1. Automations → Create new automation
2. Event trigger: "Contact added to list"
3. List: "SwankyBoyz Newsletter"

## Step 3: Add Email Blocks
Same structure as Klaviyo:
- Email 1 (immediately)
- Delay 2 days → Email 2
- Delay 5 days → Email 3

## Step 4: Get Automation ID
1. Automations → Your automation
2. ID shown in dashboard
3. Update externalIds.sendgrid

## Testing
Same as other services
  `,
};

export default {
  WELCOME_EMAIL_1,
  WELCOME_EMAIL_2,
  WELCOME_EMAIL_3,
  WELCOME_SEQUENCE,
  SETUP_INSTRUCTIONS,
};
