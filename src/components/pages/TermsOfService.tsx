import React from 'react';
import { useMetaTags } from '../../hooks/useMetaTags';

const TermsOfService: React.FC = () => {
  useMetaTags({
    title: 'Terms of Service | SwankyBoyz',
    description: 'Read the terms and conditions for using SwankyBoyz website and services. Understand your rights and responsibilities when using our platform.',
    robots: 'index, follow'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using SwankyBoyz ("we," "our," or "us"), you accept and agree to be bound by 
            the terms and provision of this agreement. If you do not agree to abide by the above, please 
            do not use this service.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on SwankyBoyz's website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
            transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The materials on SwankyBoyz's website are provided on an 'as is' basis. SwankyBoyz makes no 
            warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
            without limitation, implied warranties or conditions of merchantability, fitness for a particular 
            purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Product Reviews and Recommendations</h2>
          <p>
            All product reviews and recommendations on SwankyBoyz are based on our research and testing. 
            However, individual results may vary. We are not responsible for:
          </p>
          <ul>
            <li>Product performance or quality issues</li>
            <li>Shipping or delivery problems from third-party sellers</li>
            <li>Changes in product pricing or availability</li>
            <li>Compatibility issues with your specific needs or devices</li>
          </ul>

          <h2>Affiliate Links and Commissions</h2>
          <p>
            SwankyBoyz participates in affiliate marketing programs. This means we earn commissions from 
            qualifying purchases made through our links. Key points:
          </p>
          <ul>
            <li>Affiliate relationships do not influence our editorial content</li>
            <li>We only recommend products we believe offer value</li>
            <li>Commission rates do not determine our recommendations</li>
            <li>You pay the same price whether you use our links or not</li>
          </ul>

          <h2>User Content</h2>
          <p>
            If you submit content to SwankyBoyz (comments, reviews, emails), you grant us a non-exclusive, 
            royalty-free, perpetual license to use, modify, and display that content. You represent that:
          </p>
          <ul>
            <li>You own or have permission to use the content</li>
            <li>Your content does not violate any third-party rights</li>
            <li>Your content is accurate and not misleading</li>
          </ul>

          <h2>Prohibited Uses</h2>
          <p>
            You may not use our website:
          </p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
          </ul>

          <h2>Limitations</h2>
          <p>
            In no event shall SwankyBoyz or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out 
            of the use or inability to use the materials on SwankyBoyz's website, even if SwankyBoyz or 
            a SwankyBoyz authorized representative has been notified orally or in writing of the possibility 
            of such damage.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on SwankyBoyz's website could include technical, typographical, or 
            photographic errors. SwankyBoyz does not warrant that any of the materials on its website 
            are accurate, complete, or current. SwankyBoyz may make changes to the materials contained 
            on its website at any time without notice.
          </p>

          <h2>Links</h2>
          <p>
            SwankyBoyz has not reviewed all of the sites linked to our website and is not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply endorsement 
            by SwankyBoyz of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>Modifications</h2>
          <p>
            SwankyBoyz may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version of these 
            terms of service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the 
            jurisdiction where SwankyBoyz operates, and you irrevocably submit to the exclusive jurisdiction 
            of the courts in that state or location.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: legal@swankyboyz.com</li>
            <li>Website: Contact form on our website</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;