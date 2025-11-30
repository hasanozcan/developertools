import { Metadata } from 'next';
import { Code2, Shield, Zap, Heart } from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'About - DevsTools',
  description: 'Learn about DevsTools - Free online developer tools for everyday coding tasks.',
};

export default function AboutPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'About' },
        ]}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Code2 className="w-16 h-16 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About DevsTools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Free online tools for developers. Fast, secure, and easy to use.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            DevsTools was created with a simple mission: to provide developers with free, fast, and secure 
            online tools that make everyday coding tasks easier. We believe that essential developer utilities 
            should be accessible to everyone, without registration, subscriptions, or data tracking.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Shield className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All tools process data client-side. Your data never leaves your browser, ensuring maximum privacy and security.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Zap className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built with performance in mind. All tools load instantly and process data in real-time without server round-trips.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Heart className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Free Forever</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All tools are completely free to use. No registration required, no premium features hidden behind paywalls.
            </p>
          </div>
        </div>

        {/* Tools Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            DevsTools provides a comprehensive suite of developer utilities including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>JSON formatting, validation, and conversion tools</li>
            <li>Encoding and decoding tools (Base64, URL, JWT, HTML entities)</li>
            <li>Hash generators (MD5, SHA256)</li>
            <li>Random generators (UUID, passwords, Lorem Ipsum)</li>
            <li>Code formatters and minifiers (SQL, CSS, JavaScript)</li>
            <li>Text utilities (Regex tester, Markdown preview, Text diff)</li>
            <li>Converters (Timestamp, Color, JSON to CSV)</li>
            <li>And many more...</li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Have Feedback?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We&apos;re always looking to improve. If you have suggestions for new tools or improvements, 
            we&apos;d love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
