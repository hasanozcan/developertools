import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service - DevsTools',
  description: 'Terms of Service for DevsTools - Read our terms and conditions.',
};

export default function TermsPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Terms of Service' },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Last updated: November 30, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing and using DevsTools (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              DevsTools provides free online developer tools including but not limited to JSON formatters, 
              encoders/decoders, generators, converters, and other utilities. All tools are provided 
              &quot;as is&quot; and process data client-side in your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use of Service</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Using the Service for any illegal or unauthorized purpose</li>
              <li>Attempting to interfere with or disrupt the Service</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using automated systems to access the Service in a manner that exceeds reasonable use</li>
              <li>Copying, modifying, or distributing our content without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The Service and its original content, features, and functionality are owned by DevsTools 
              and are protected by international copyright, trademark, and other intellectual property laws. 
              You may use the tools for personal and commercial purposes, but you may not copy, reproduce, 
              or redistribute the Service itself.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Data</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              All data you process using our tools remains yours. We do not claim any ownership or rights 
              over your data. As our tools process data client-side, we do not have access to or store 
              your data on our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, 
              either express or implied, including but not limited to implied warranties of merchantability, 
              fitness for a particular purpose, and non-infringement. We do not warrant that the Service 
              will be uninterrupted, error-free, or completely secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In no event shall DevsTools, its operators, or affiliates be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your 
              access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accuracy of Results</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              While we strive to provide accurate and reliable tools, we make no guarantees about the 
              accuracy, completeness, or reliability of any results generated by our tools. You are 
              responsible for verifying the output of our tools before using it in production or 
              critical applications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Links</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our Service may contain links to third-party websites or services that are not owned or 
              controlled by DevsTools. We have no control over, and assume no responsibility for, the 
              content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modifications to Service</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) 
              at any time without notice. We shall not be liable to you or any third party for any 
              modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right to update or change these Terms of Service at any time. We will notify 
              you of any changes by posting the new Terms of Service on this page and updating the 
              &quot;Last updated&quot; date. Your continued use of the Service after any such changes constitutes 
              your acceptance of the new Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please{' '}
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
