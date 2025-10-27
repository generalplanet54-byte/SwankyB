-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    
    -- Subscription status
    status TEXT DEFAULT 'active', -- active, unsubscribed, bounced, complained
    subscription_source TEXT DEFAULT 'website', -- website, import, api, form
    subscription_source_page TEXT, -- Which page/component they signed up from
    
    -- Preferences
    email_frequency TEXT DEFAULT 'weekly', -- daily, weekly, monthly
    product_categories TEXT, -- JSON array of interested categories
    
    -- Marketing consent
    marketing_consent BOOLEAN DEFAULT 1,
    consent_timestamp DATETIME,
    consent_ip_address TEXT,
    
    -- Email service integration
    external_id TEXT, -- ID from ConvertKit/Klaviyo/etc
    external_service TEXT, -- Which email service (konvertkit, klaviyo, sendgrid, etc)
    
    -- Tracking
    signup_ip_address TEXT,
    signup_user_agent TEXT,
    signup_referrer TEXT,
    last_email_sent DATETIME,
    email_open_count INTEGER DEFAULT 0,
    email_click_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_created ON newsletter_subscribers(created_at);
CREATE INDEX idx_newsletter_external ON newsletter_subscribers(external_service, external_id);

-- Email campaign tracking table
CREATE TABLE IF NOT EXISTS email_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    campaign_type TEXT DEFAULT 'newsletter', -- newsletter, welcome, promotion, re_engagement
    email_subject TEXT NOT NULL,
    email_template TEXT, -- Template name or ID
    
    -- Campaign status
    status TEXT DEFAULT 'draft', -- draft, scheduled, sent, paused
    scheduled_for DATETIME,
    sent_at DATETIME,
    
    -- Tracking
    recipient_count INTEGER DEFAULT 0,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    bounce_count INTEGER DEFAULT 0,
    complaint_count INTEGER DEFAULT 0,
    unsubscribe_count INTEGER DEFAULT 0,
    
    -- External service
    external_campaign_id TEXT,
    external_service TEXT,
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_campaigns_type ON email_campaigns(campaign_type);
CREATE INDEX idx_campaigns_sent ON email_campaigns(sent_at);

-- Subscriber campaign interaction tracking
CREATE TABLE IF NOT EXISTS subscriber_campaign_interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscriber_id INTEGER NOT NULL,
    campaign_id INTEGER NOT NULL,
    
    -- Interaction types
    email_sent BOOLEAN DEFAULT 0,
    email_opened BOOLEAN DEFAULT 0,
    link_clicked BOOLEAN DEFAULT 0,
    unsubscribed BOOLEAN DEFAULT 0,
    bounced BOOLEAN DEFAULT 0,
    complained BOOLEAN DEFAULT 0,
    
    -- Timestamps
    sent_at DATETIME,
    opened_at DATETIME,
    clicked_at DATETIME,
    unsubscribed_at DATETIME,
    bounced_at DATETIME,
    complained_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (subscriber_id) REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
    FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id) ON DELETE CASCADE
);

CREATE INDEX idx_interactions_subscriber ON subscriber_campaign_interactions(subscriber_id);
CREATE INDEX idx_interactions_campaign ON subscriber_campaign_interactions(campaign_id);
CREATE INDEX idx_interactions_opened ON subscriber_campaign_interactions(opened_at);
