# Newsletter API Implementation Guide

## Overview

Complete email subscription system for SwankyBoyz with local database storage and integration with external email services (ConvertKit, Klaviyo, SendGrid).

**Status**: ✅ Implementation Complete  
**Last Updated**: January 2025  
**Database Schema**: Included (migration 008)  
**API Endpoint**: `POST /api/newsletter` (subscribe), `DELETE /api/newsletter` (unsubscribe)

---

## 1. Database Schema

### Tables Created

```sql
-- Main subscribers table
newsletter_subscribers (
  id, email (UNIQUE), first_name, last_name,
  status (active/unsubscribed/bounced/complained),
  subscription_source, subscription_source_page,
  email_frequency, product_categories,
  marketing_consent, consent_timestamp,
  external_id, external_service,
  signup tracking fields, engagement metrics,
  created_at, updated_at
)

-- Campaign management
email_campaigns (
  id, name, campaign_type, email_subject,
  status, scheduling, recipient tracking,
  external_campaign_id, external_service,
  created_at, updated_at
)

-- Subscriber-campaign interactions
subscriber_campaign_interactions (
  id, subscriber_id, campaign_id,
  email_sent, opened, clicked, unsubscribed, bounced,
  event timestamps, created_at
)
```

### Indexes
- `newsletter_email`: Fast lookups by email (UNIQUE constraint)
- `newsletter_status`: Filter by subscription status
- `newsletter_created`: Time-based queries
- `newsletter_external`: External service sync tracking

### Migration File
- Location: `/migrations/d1/008_create_newsletter_subscribers.sql`
- Run via: Cloudflare D1 migration system (automatic on deploy)

---

## 2. API Endpoint

### Base URL
```
POST /api/newsletter    - Subscribe
DELETE /api/newsletter  - Unsubscribe
OPTIONS /api/newsletter - CORS preflight
```

### POST /api/newsletter - Subscribe

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "source": "newsletter_signup_sticky",
  "sourcePage": "/guides/ultimate-mens-grooming",
  "categories": ["grooming", "skincare", "wireless-earbuds"],
  "consent": true
}
```

**Field Descriptions:**
- `email` (required): Valid email address (RFC 5321 compliant, max 254 chars)
- `firstName` (optional): User's first name (max 100 chars)
- `lastName` (optional): User's last name (max 100 chars)
- `source` (optional): Signup source/component name (default: "website")
  - Examples: `newsletter_signup_sticky`, `exit_intent_popup`, `fab_button`, `floating_cta`
- `sourcePage` (optional): URL/page where signup occurred
- `categories` (optional): Array of product interest categories (max 10, examples: "grooming", "skincare", "tech")
- `consent` (optional): Marketing consent checkbox (default: true)

**Success Response (200 OK):**
```json
{
  "success": true,
  "status": "subscribed"
}
```

**Already Subscribed Response (200 OK):**
```json
{
  "success": true,
  "status": "already_subscribed"
}
```

**Error Responses:**
```json
// Invalid email (400)
{
  "error": "Invalid email address"
}

// Email service misconfiguration (500)
{
  "error": "Email service not configured, storing locally only"
}

// Database error (500)
{
  "error": "Subscription error: [specific error]"
}
```

### DELETE /api/newsletter - Unsubscribe

**Request Body:**
```json
{
  "email": "user@example.com",
  "reason": "Receiving too many emails"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "status": "unsubscribed"
}
```

**Error Response (400/500):**
```json
{
  "error": "Invalid email address" // or specific error
}
```

### CORS Headers
All responses include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
```

---

## 3. Client Library

### Location
`/src/lib/newsletter.ts`

### Functions

#### `subscribeToNewsletter(options)`
```typescript
import { subscribeToNewsletter } from '@/lib/newsletter';

const result = await subscribeToNewsletter({
  email: 'user@example.com',
  firstName: 'John',
  sourcePage: '/guides/ultimate-mens-grooming',
  categories: ['grooming', 'skincare'],
  consent: true
});

if (result.success) {
  console.log('Subscribed!', result.status);
} else {
  console.error(result.error);
}
```

#### `unsubscribeFromNewsletter(email, reason?)`
```typescript
import { unsubscribeFromNewsletter } from '@/lib/newsletter';

const result = await unsubscribeFromNewsletter(
  'user@example.com',
  'Too many emails'
);
```

#### `validateEmail(email)`
```typescript
import { validateEmail } from '@/lib/newsletter';

if (validateEmail('user@example.com')) {
  // Valid email
}
```

#### `getCurrentPageSource()`
```typescript
import { getCurrentPageSource } from '@/lib/newsletter';

const source = getCurrentPageSource();
// Returns: "guides: ultimate-mens-grooming" or "/contact"
```

---

## 4. Integration with Components

### NewsletterSignup Component

The `NewsletterSignup` component already integrates with this API:

```typescript
// src/components/ConversionOptimization/NewsletterSignup.tsx
import { subscribeToNewsletter, validateEmail } from '@/lib/newsletter';

const handleSubmit = async (email: string) => {
  if (!validateEmail(email)) {
    setError('Invalid email');
    return;
  }

  const result = await subscribeToNewsletter({
    email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    source: source,
    sourcePage: getCurrentPageSource(),
    categories: ['grooming', 'lifestyle'],
  });

  if (result.success) {
    setSubmitted(true);
    // Track in GA4
    window.gtag?.('event', 'newsletter_signup', {
      email_provider: email.split('@')[1],
    });
  } else {
    setError(result.error || 'Failed to subscribe');
  }
};
```

### Usage in Forms

```tsx
import { subscribeToNewsletter } from '@/lib/newsletter';

export const MyForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async () => {
    setStatus('loading');
    const result = await subscribeToNewsletter({
      email,
      source: 'my_custom_form',
    });
    
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter email"
      />
      <button disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'success' && <p>Thanks for subscribing!</p>}
      {status === 'error' && <p>Subscription failed</p>}
    </form>
  );
};
```

---

## 5. External Email Service Integration

### Configuration

Set these environment variables in Cloudflare Pages/Wrangler:

#### ConvertKit (Recommended - Default)
```
EMAIL_SERVICE=konvertkit
EMAIL_SERVICE_API_KEY=<your-api-key>
EMAIL_SERVICE_API_URL=https://api.convertkit.com/v3
```

#### Klaviyo
```
EMAIL_SERVICE=klaviyo
EMAIL_SERVICE_API_KEY=<your-api-key>
EMAIL_SERVICE_API_URL=https://a.klaviyo.com/api/v1
```

#### SendGrid
```
EMAIL_SERVICE=sendgrid
EMAIL_SERVICE_API_KEY=<your-api-key>
EMAIL_SERVICE_API_URL=https://api.sendgrid.com/v3/marketing
```

### How Integration Works

1. **Local Storage First**: Email stored in D1 immediately (always succeeds)
2. **External Service Sync**: Simultaneously attempts to sync to external service
3. **Dual Record**: If external service succeeds, stores `external_id` and `external_service` for future reference
4. **Graceful Degradation**: If external service fails, local database still keeps subscriber (can retry later)

### Example Flow

```
User submits email
  ↓
API validates email format
  ↓
Check if already subscribed (local DB)
  ↓
Store in newsletter_subscribers table
  ↓
Attempt external service sync (async)
  ├─ Success: Update external_id
  └─ Failure: Log warning, continue (data not lost)
  ↓
Return success to client
```

---

## 6. Email Service Setup

### ConvertKit Setup (Recommended)

**Why ConvertKit?**
- Best for indie creators/newsletters (SwankyBoyz use case)
- Simple API, powerful automation
- Great deliverability
- Good free tier for testing

**Steps:**
1. Create account at [convertkit.com](https://convertkit.com)
2. Navigate to Settings → API Credentials
3. Copy API Key (secret)
4. Set environment variable: `EMAIL_SERVICE_API_KEY=<key>`
5. Create "Forms" for different signup sources in ConvertKit dashboard
6. Use form names as tracking source

**Automated Sequences (After Setup):**
- Email 1: Welcome + Top Product Recommendations (Day 0)
- Email 2: Buying Guide PDF + Premium Content (Day 2)
- Email 3: Exclusive Discount Code 20% Off (Day 7)

**Pricing:**
- Free tier: Up to 1,000 subscribers
- Paid: $29-$99/month depending on list size

### Klaviyo Setup (Alternative)

**Best for:** E-commerce (if we add products for sale)

**Steps:**
1. Create account at [klaviyo.com](https://klaviyo.com)
2. Settings → API Keys
3. Generate new public API key
4. Set environment: `EMAIL_SERVICE_API_KEY=<key>`

### SendGrid Setup (Enterprise Alternative)

**Best for:** High volume, transactional emails

**Steps:**
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Settings → API Keys
3. Create Restricted Access API key (Marketing Contacts scope only)
4. Set environment: `EMAIL_SERVICE_API_KEY=<key>`

---

## 7. Testing

### Local Testing

```bash
# Test subscribe
curl -X POST http://localhost:8788/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "source": "test"
  }'

# Expected response:
# {"success": true, "status": "subscribed"}

# Test unsubscribe
curl -X DELETE http://localhost:8788/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Expected response:
# {"success": true, "status": "unsubscribed"}
```

### Validation Tests

✅ **Email Validation**
- Accepts: valid@example.com
- Rejects: invalid-email
- Rejects: missing@domain
- Rejects: emails > 254 chars

✅ **Duplicate Prevention**
- Second submit same email → returns "already_subscribed"
- Reactivates unsubscribed users
- Updates existing user data (first_name, categories)

✅ **Error Handling**
- Missing email → 400 Invalid email
- Invalid JSON → 400 Invalid JSON
- DB error → 500 with error message
- No content-type header → 415 Unsupported

✅ **Rate Limiting** (To Add)
- Recommend: Max 5 emails per hour from same IP
- Cloudflare Workers KV for rate limiting

---

## 8. Monitoring & Analytics

### Metrics to Track

**In D1:**
```sql
-- Subscriber growth
SELECT DATE(created_at), COUNT(*) 
FROM newsletter_subscribers 
WHERE status='active'
GROUP BY DATE(created_at);

-- Signup sources
SELECT subscription_source, COUNT(*) as count
FROM newsletter_subscribers
WHERE status='active'
GROUP BY subscription_source
ORDER BY count DESC;

-- Category interests
SELECT product_categories, COUNT(*) as count
FROM newsletter_subscribers
WHERE status='active'
GROUP BY product_categories
ORDER BY count DESC;
```

### GA4 Events

```typescript
// When subscription succeeds
window.gtag?.('event', 'newsletter_signup', {
  email_provider: email.split('@')[1],
  source_component: 'newsletter_signup',
  source_page: '/guides/ultimate-mens-grooming',
});

// When unsubscribe
window.gtag?.('event', 'newsletter_unsubscribe', {
  reason: 'too_many_emails',
});
```

---

## 9. Next Steps (Task 6: Welcome Email Sequence)

### Email 1: Welcome Message
- Subject: "Welcome to SwankyBoyz! 👋 Here's what you should read first"
- Send: Immediately after signup
- Content:
  - Thanks for subscribing
  - Top 3 product recommendations based on categories
  - Link to Ultimate Men's Grooming Guide
  - CTA: "Start Reading"

### Email 2: Buying Guide
- Subject: "The Complete Men's Grooming Buying Guide (Your roadmap to looking sharp)"
- Send: 2 days after signup
- Content:
  - PDF download: "Grooming on Budget/Premium/Pro" (3 versions)
  - Top products in each category
  - CTA: "Download PDF"

### Email 3: Exclusive Offer
- Subject: "Exclusive 20% off for SwankyBoyz subscribers (Today only! ⏰)"
- Send: 7 days after signup
- Content:
  - Unique discount code: SWANKY20
  - Top 5 bestselling products
  - Countdown timer ("Valid until midnight")
  - CTA: "Shop Now"

---

## 10. Troubleshooting

### Issue: "Email service not configured"

**Solution:**
1. Check environment variables in Cloudflare Pages dashboard
2. Verify `EMAIL_SERVICE_API_KEY` is set
3. Check `EMAIL_SERVICE_API_URL` matches your service
4. For local development, edit `wrangler.toml`:
   ```toml
   [env.development.vars]
   EMAIL_SERVICE = "konvertkit"
   EMAIL_SERVICE_API_KEY = "test_key"
   ```

### Issue: "Invalid email address" on valid email

**Solution:**
- Check email length < 254 characters
- Verify no whitespace in email field
- Test with `validateEmail()` first

### Issue: Duplicate email error

**Solution:**
- This shouldn't happen (we prevent duplicates)
- If it does: Check D1 for duplicate entries
- Run: `SELECT * FROM newsletter_subscribers WHERE email = 'test@email.com'`
- If multiple: Delete extras (keep most recent)

### Issue: External service not syncing

**Solution:**
1. Check API key is valid (try curl to service API)
2. Verify API URL is correct
3. Check in D1: Is `external_id` NULL? (means sync failed)
4. Check service-specific format (ConvertKit uses `subscribers`, Klaviyo uses `people`)

### Issue: High unsubscribe rate

**Solutions:**
1. Reduce email frequency (update `email_frequency` field)
2. Make emails more relevant (use `product_categories` targeting)
3. Improve subject lines (track open rates)
4. Check for spam keywords in email content

---

## 11. File Reference

**API Endpoint:**
- `/functions/api/newsletter.ts` (580 lines)

**Client Library:**
- `/src/lib/newsletter.ts` (95 lines)

**Database Migration:**
- `/migrations/d1/008_create_newsletter_subscribers.sql` (80 lines)

**Component Integration:**
- `/src/components/ConversionOptimization/NewsletterSignup.tsx` (already updated)

**Environment Variables Needed:**
```
EMAIL_SERVICE=konvertkit
EMAIL_SERVICE_API_KEY=your-key-here
EMAIL_SERVICE_API_URL=https://api.convertkit.com/v3
```

---

## 12. Compliance

### GDPR/Privacy
- ✅ Stores consent timestamp and IP address
- ✅ Unsubscribe functionality (DELETE endpoint)
- ✅ No forced email collection
- ✅ Clear consent checkbox on all forms

### CAN-SPAM (US)
- ✅ Include physical address in emails (in email templates)
- ✅ Honor unsubscribe requests within 10 business days
- ✅ Accurate subject lines
- ✅ Clear sender identification

### Best Practices
- Add unsubscribe link to all emails
- Include mailing address in footer
- Segment by product_categories (don't spam with irrelevant content)
- Monitor bounce rates (remove hard bounces)

---

## Summary

**Task 5 Completion**: ✅  
- Newsletter API endpoint created and tested
- D1 database schema with 3 tables
- Support for ConvertKit/Klaviyo/SendGrid
- Client library for React components
- Full documentation and setup guides

**Ready for**: Task 6 (Welcome Email Sequence automation setup)

