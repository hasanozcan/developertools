import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy - DevsTools',
  description: 'Privacy Policy for DevsTools - Learn how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Privacy Policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: November 30, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At DevsTools, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, and protect your information when you use our website and tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Processing</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              <strong>All data processing happens in your browser.</strong> When you use our tools:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Your data is processed locally on your device</li>
              <li>We do not send your data to our servers</li>
              <li>We do not store any of the content you process</li>
              <li>Your data never leaves your browser</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Local Storage</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use browser local storage to save your preferences such as theme settings, favorite tools, 
              and tool usage history. This data is stored only on your device and is never transmitted to 
              our servers. You can clear this data at any time through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may use privacy-friendly analytics to understand how our tools are used. This helps us 
              improve our services. Analytics data is anonymized and does not include any personal information 
              or the content you process with our tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advertising</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our website may display advertisements through third-party advertising networks such as 
              Google AdSense. These networks may use cookies to serve personalized ads based on your 
              browsing history. You can opt out of personalized advertising through your browser settings 
              or through the advertising network&apos;s opt-out mechanisms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use minimal cookies necessary for the operation of our website:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>Essential cookies:</strong> Required for basic website functionality</li>
              <li><strong>Preference cookies:</strong> Remember your settings like theme preference</li>
              <li><strong>Analytics cookies:</strong> Help us understand website usage</li>
              <li><strong>Advertising cookies:</strong> Used by our advertising partners</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our website may contain links to third-party websites or services. We are not responsible 
              for the privacy practices of these external sites. We encourage you to read the privacy 
              policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a 
              child under 13, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please{' '}
              <a href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                contact us
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
