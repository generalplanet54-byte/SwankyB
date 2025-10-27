import React from 'react';
import { useMetaTags } from '../../hooks/useMetaTags';

const PrivacyPolicy: React.FC = () => {
  useMetaTags({
    title: 'Privacy Policy | SwankyBoyz',
    description: 'Learn how SwankyBoyz collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our data practices.',
    robots: 'index, follow'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Information We Collect</h2>
          <p>
            At SwankyBoyz, we collect information you provide directly to us, such as when you:
          </p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our website</li>
            <li>Participate in surveys or promotions</li>
            <li>Create an account or make a purchase through our affiliate links</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Send you newsletters and promotional content (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li><strong>With your consent:</strong> We may share your information when you give us explicit permission</li>
            <li><strong>For legal reasons:</strong> We may disclose your information if required by law or legal process</li>
            <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or sale</li>
          </ul>

          <h2>Affiliate Links and Commissions</h2>
          <p>
            SwankyBoyz participates in various affiliate marketing programs. This means we may earn a commission 
            when you click on or make purchases via our links. This does not affect your purchase price or our 
            editorial independence. We only recommend products we believe in.
          </p>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to collect and use personal information about you. 
            This includes information about your browsing behavior and preferences to provide personalized 
            content and advertisements.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
            is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul>
            <li>Access and portability of your personal data</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Objection to processing</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            Our website may contain links to third-party websites and services. We are not responsible 
            for the privacy practices of these external sites. We encourage you to read their privacy policies.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any material changes 
            by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data practices, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@swankyboyz.com</li>
            <li>Website: Contact form on our website</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;