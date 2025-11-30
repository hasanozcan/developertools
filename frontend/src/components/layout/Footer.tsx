import Link from 'next/link';
import { Code2, Github, Twitter } from 'lucide-react';

const footerLinks = {
  tools: [
    { name: 'JSON Formatter', href: '/tools/json/json-formatter' },
    { name: 'Base64 Encoder', href: '/tools/encoding/base64' },
    { name: 'UUID Generator', href: '/tools/generators/uuid-generator' },
    { name: 'Regex Tester', href: '/tools/text/regex-tester' },
  ],
  categories: [
    { name: 'Encoders', href: '/tools/encoding' },
    { name: 'Generators', href: '/tools/generators' },
    { name: 'Formatters', href: '/tools/formatters' },
    { name: 'Converters', href: '/tools/converters' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">DevsTools</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Free online tools for developers. Fast, secure, and easy to use.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Developer Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
