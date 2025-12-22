import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';
import JsonValidatorTool from '@/components/tools/JsonValidatorTool';
import Base64Tool from '@/components/tools/Base64Tool';
import UrlEncoderTool from '@/components/tools/UrlEncoderTool';
import UuidGeneratorTool from '@/components/tools/UuidGeneratorTool';
import Md5HashTool from '@/components/tools/Md5HashTool';
import Sha256HashTool from '@/components/tools/Sha256HashTool';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';
import RegexTesterTool from '@/components/tools/RegexTesterTool';
import PasswordGeneratorTool from '@/components/tools/PasswordGeneratorTool';
import TimestampConverterTool from '@/components/tools/TimestampConverterTool';
import ColorConverterTool from '@/components/tools/ColorConverterTool';
import LoremIpsumTool from '@/components/tools/LoremIpsumTool';
import HtmlEntityTool from '@/components/tools/HtmlEntityTool';
import JsonCsvConverterTool from '@/components/tools/JsonCsvConverterTool';
import TextDiffTool from '@/components/tools/TextDiffTool';
import CronParserTool from '@/components/tools/CronParserTool';
import MarkdownPreviewTool from '@/components/tools/MarkdownPreviewTool';
import SqlFormatterTool from '@/components/tools/SqlFormatterTool';
import QrCodeGeneratorTool from '@/components/tools/QrCodeGeneratorTool';
import SlugGeneratorTool from '@/components/tools/SlugGeneratorTool';
import CssMinifierTool from '@/components/tools/CssMinifierTool';
import JsMinifierTool from '@/components/tools/JsMinifierTool';
import JsonToTypescriptTool from '@/components/tools/JsonToTypescriptTool';
import ImageToBase64Tool from '@/components/tools/ImageToBase64Tool';
import YamlJsonConverterTool from '@/components/tools/YamlJsonConverterTool';
import CssGradientGeneratorTool from '@/components/tools/CssGradientGeneratorTool';
import MetaTagsGeneratorTool from '@/components/tools/MetaTagsGeneratorTool';
import { getCanonicalToolCategory } from '@/lib/toolRoutes';

// Tool configurations
const tools: Record<string, Record<string, {
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  component: React.ComponentType;
  faqs: { question: string; answer: string }[];
}>> = {
  json: {
    'json-formatter': {
      name: 'JSON Formatter',
      description: 'Format and beautify JSON data online. Free JSON formatter and validator.',
      longDescription: 'Our free online JSON formatter helps you format, beautify, and validate JSON data instantly. Simply paste your JSON and get perfectly indented, readable output.',
      keywords: ['json formatter', 'json beautifier', 'format json online', 'json pretty print'],
      component: JsonFormatterTool,
      faqs: [
        { question: 'What is JSON?', answer: 'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.' },
        { question: 'How do I format JSON?', answer: 'Simply paste your JSON data in the input field. The tool will automatically format and beautify your JSON with proper indentation.' },
        { question: 'Is my data safe?', answer: 'Yes! All processing happens in your browser. Your data never leaves your computer.' },
      ],
    },
    'json-validator': {
      name: 'JSON Validator',
      description: 'Validate JSON syntax online. Free JSON syntax validator and checker.',
      longDescription: 'Free online JSON validator. Check if your JSON is valid and get detailed error messages with line numbers. Includes JSON statistics and structure analysis.',
      keywords: ['json validator', 'validate json', 'json syntax checker', 'json lint', 'check json'],
      component: JsonValidatorTool,
      faqs: [
        { question: 'What does this tool check?', answer: 'This tool validates JSON syntax according to the JSON specification. It checks for proper formatting, correct use of quotes, commas, brackets, and braces.' },
        { question: 'What are common JSON errors?', answer: 'Common errors include missing commas, trailing commas, single quotes instead of double quotes, unquoted property names, and missing closing brackets.' },
        { question: 'Is my data safe?', answer: 'Yes! All validation happens in your browser. Your data never leaves your computer.' },
      ],
    },
    'json-csv': {
      name: 'JSON to CSV Converter',
      description: 'Convert JSON to CSV and CSV to JSON. Free online format converter.',
      longDescription: 'Free online JSON to CSV converter. Convert JSON arrays to CSV format or CSV data to JSON. Supports custom delimiters and nested object flattening.',
      keywords: ['json to csv', 'csv to json', 'json converter', 'csv converter', 'format converter'],
      component: JsonCsvConverterTool,
      faqs: [
        { question: 'What formats are supported?', answer: 'This tool supports conversion between JSON (array of objects) and CSV (comma-separated values). You can also use semicolons, tabs, or pipes as delimiters.' },
        { question: 'How are nested objects handled?', answer: 'Nested objects can be automatically flattened using dot notation (e.g., address.city) for proper CSV conversion.' },
      ],
    },
    'json-to-typescript': {
      name: 'JSON to TypeScript',
      description: 'Convert JSON to TypeScript interfaces or types. Free online JSON to TS converter.',
      longDescription: 'Free online JSON to TypeScript converter. Generate TypeScript interfaces or type definitions from your JSON data. Supports nested objects and arrays.',
      keywords: ['json to typescript', 'json to ts', 'typescript interface generator', 'json to interface'],
      component: JsonToTypescriptTool,
      faqs: [
        { question: 'What is the difference between interface and type?', answer: 'Interfaces are extendable and can be merged, while types are more flexible and can represent unions and intersections. Both work for defining object shapes.' },
        { question: 'How are arrays handled?', answer: 'Arrays are detected and typed appropriately. If all elements are of the same type, a typed array is generated. Mixed types result in union types.' },
      ],
    },
    'yaml-json': {
      name: 'YAML ↔ JSON Converter',
      description: 'Convert between YAML and JSON formats. Free online YAML JSON converter.',
      longDescription: 'Free online YAML to JSON and JSON to YAML converter. Perfect for Kubernetes configs, CI/CD pipelines, and configuration file conversions.',
      keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'kubernetes yaml'],
      component: YamlJsonConverterTool,
      faqs: [
        { question: 'What is YAML?', answer: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format commonly used for configuration files, especially in DevOps and cloud environments.' },
        { question: 'When should I use YAML vs JSON?', answer: 'YAML is preferred for configuration files due to better readability. JSON is better for data interchange and API responses due to universal support.' },
      ],
    },
  },
  encoding: {
    'base64': {
      name: 'Base64 Encoder/Decoder',
      description: 'Encode or decode Base64 strings online. Free Base64 encoder and decoder tool.',
      longDescription: 'Free online Base64 encoder and decoder. Convert text to Base64 encoding or decode Base64 strings back to plain text instantly.',
      keywords: ['base64 encoder', 'base64 decoder', 'base64 online', 'encode base64'],
      component: Base64Tool,
      faqs: [
        { question: 'What is Base64 encoding?', answer: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.' },
        { question: 'When should I use Base64?', answer: 'Base64 is commonly used for encoding data in emails, embedding images in HTML/CSS, and transmitting binary data over text-based protocols.' },
      ],
    },
    'url-encoder': {
      name: 'URL Encoder/Decoder',
      description: 'Encode or decode URL strings online. Free URL encoder and decoder.',
      longDescription: 'Free online URL encoder and decoder. Percent-encode special characters for URLs or decode percent-encoded strings.',
      keywords: ['url encoder', 'url decoder', 'urlencode online', 'percent encoding'],
      component: UrlEncoderTool,
      faqs: [
        { question: 'What is URL encoding?', answer: 'URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with % followed by hex digits.' },
      ],
    },
    'jwt-decoder': {
      name: 'JWT Decoder',
      description: 'Decode and inspect JWT tokens online. View header, payload, and signature.',
      longDescription: 'Free online JWT decoder. Decode JSON Web Tokens and inspect their header, payload, and signature. Useful for debugging authentication issues.',
      keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token decoder'],
      component: JwtDecoderTool,
      faqs: [
        { question: 'What is a JWT?', answer: 'JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties.' },
        { question: 'Is it safe to paste my JWT here?', answer: 'Yes! All decoding happens in your browser. Your token never leaves your computer.' },
      ],
    },
    'html-entity': {
      name: 'HTML Entity Encoder/Decoder',
      description: 'Encode or decode HTML entities online. Convert special characters to HTML entities.',
      longDescription: 'Free online HTML entity encoder and decoder. Convert special characters like <, >, & to their HTML entity equivalents or decode HTML entities back to characters.',
      keywords: ['html entity encoder', 'html entity decoder', 'html encode', 'special characters html'],
      component: HtmlEntityTool,
      faqs: [
        { question: 'What are HTML entities?', answer: 'HTML entities are special codes used to display reserved characters in HTML. For example, &lt; represents < and &amp; represents &.' },
        { question: 'Why encode HTML entities?', answer: 'Encoding HTML entities prevents XSS attacks and ensures special characters display correctly in web pages instead of being interpreted as HTML code.' },
      ],
    },
    'image-to-base64': {
      name: 'Image to Base64',
      description: 'Convert images to Base64 data URIs. Free online image to Base64 encoder.',
      longDescription: 'Free online image to Base64 converter. Convert images (PNG, JPG, GIF, WebP, SVG) to Base64 data URIs for embedding directly in HTML or CSS.',
      keywords: ['image to base64', 'base64 image encoder', 'data uri generator', 'embed image'],
      component: ImageToBase64Tool,
      faqs: [
        { question: 'What is a Base64 data URI?', answer: 'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.' },
        { question: 'When should I use Base64 images?', answer: 'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.' },
      ],
    },
  },
  generators: {
    'uuid-generator': {
      name: 'UUID Generator',
      description: 'Generate random UUIDs/GUIDs online. Create single or bulk UUIDs instantly.',
      longDescription: 'Free online UUID v4 generator. Generate random universally unique identifiers (UUIDs/GUIDs) instantly. Create single or multiple UUIDs at once.',
      keywords: ['uuid generator', 'guid generator', 'random uuid', 'uuid v4'],
      component: UuidGeneratorTool,
      faqs: [
        { question: 'What is a UUID?', answer: 'UUID (Universally Unique Identifier) is a 128-bit identifier that is unique across both space and time.' },
        { question: 'What is UUID v4?', answer: 'UUID version 4 is randomly generated. It has 122 random bits and 6 bits for version and variant information.' },
      ],
    },
    'password-generator': {
      name: 'Password Generator',
      description: 'Generate secure random passwords with customizable length and character sets.',
      longDescription: 'Free online password generator. Create strong, secure random passwords with customizable options including length, uppercase, lowercase, numbers, and special characters.',
      keywords: ['password generator', 'random password', 'secure password generator', 'strong password'],
      component: PasswordGeneratorTool,
      faqs: [
        { question: 'How strong should my password be?', answer: 'A strong password should be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and special characters.' },
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription: 'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'filler text'],
      component: LoremIpsumTool,
      faqs: [
        { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is placeholder text commonly used in graphic design, web design, and publishing to fill spaces before actual content is available.' },
        { question: 'Why use Lorem Ipsum?', answer: 'Lorem Ipsum provides a natural distribution of letters and words, making it ideal for demonstrating layouts without distracting readers with meaningful content.' },
      ],
    },
    'qr-code': {
      name: 'QR Code Generator',
      description: 'Generate QR codes from text, URLs, and more. Free online QR code generator.',
      longDescription: 'Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, WiFi credentials, and more. Customize colors and download in PNG or SVG format.',
      keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code'],
      component: QrCodeGeneratorTool,
      faqs: [
        { question: 'What is a QR code?', answer: 'QR (Quick Response) codes are two-dimensional barcodes that can store various types of data like URLs, text, or contact information and can be scanned by smartphones.' },
        { question: 'What data can I encode?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, vCards, and more.' },
      ],
    },
    'slug-generator': {
      name: 'Slug Generator',
      description: 'Generate SEO-friendly URL slugs from text. Free online slug generator.',
      longDescription: 'Free online slug generator. Convert titles and text into clean, SEO-friendly URL slugs. Supports transliteration for special characters.',
      keywords: ['slug generator', 'url slug', 'seo friendly url', 'permalink generator'],
      component: SlugGeneratorTool,
      faqs: [
        { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL that identifies a particular page in a human-readable form. For example, in /blog/my-first-post, "my-first-post" is the slug.' },
        { question: 'Why are slugs important for SEO?', answer: 'SEO-friendly slugs help search engines understand your content and improve click-through rates by showing users what the page is about.' },
      ],
    },
    'css-gradient': {
      name: 'CSS Gradient Generator',
      description: 'Create beautiful CSS gradients with a visual editor. Free gradient generator.',
      longDescription: 'Free online CSS gradient generator. Create stunning linear and radial gradients with multiple color stops, presets, and export options. Get production-ready CSS code instantly.',
      keywords: ['css gradient generator', 'gradient maker', 'linear gradient', 'radial gradient', 'css background'],
      component: CssGradientGeneratorTool,
      faqs: [
        { question: 'What types of gradients are supported?', answer: 'This tool supports both linear gradients (with customizable angles) and radial gradients (with circle or ellipse shapes).' },
        { question: 'Can I export the gradient as an image?', answer: 'Yes! You can download the gradient as a PNG image in addition to copying the CSS code.' },
      ],
    },
    'meta-tags': {
      name: 'Meta Tags Generator',
      description: 'Generate SEO meta tags for your website. Free meta tags generator.',
      longDescription: 'Free online meta tags generator. Create essential HTML meta tags for SEO, Open Graph for social sharing, and Twitter Cards. Improve your website visibility.',
      keywords: ['meta tags generator', 'seo meta tags', 'open graph tags', 'twitter card generator'],
      component: MetaTagsGeneratorTool,
      faqs: [
        { question: 'What are meta tags?', answer: 'Meta tags are HTML elements that provide metadata about a web page. They help search engines understand your content and control how your page appears in search results.' },
        { question: 'What are Open Graph tags?', answer: 'Open Graph tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and others.' },
      ],
    },
  },
  crypto: {
    'md5-hash': {
      name: 'MD5 Hash Generator',
      description: 'Generate MD5 hash from text online. Free MD5 hash generator.',
      longDescription: 'Free online MD5 hash generator. Create MD5 hash values from any text input instantly. Useful for checksums and data verification.',
      keywords: ['md5 generator', 'md5 hash', 'md5 online', 'generate md5'],
      component: Md5HashTool,
      faqs: [
        { question: 'What is MD5?', answer: 'MD5 (Message Digest 5) is a cryptographic hash function that produces a 128-bit (16-byte) hash value.' },
        { question: 'Is MD5 secure?', answer: 'MD5 is no longer considered secure for cryptographic purposes but is still useful for checksums and non-security-critical applications.' },
      ],
    },
    'sha256-hash': {
      name: 'SHA256 Hash Generator',
      description: 'Generate SHA256 hash from text online. Free SHA256 hash generator.',
      longDescription: 'Free online SHA256 hash generator. Create SHA256 hash values from any text input. SHA256 is part of the SHA-2 family of cryptographic hash functions.',
      keywords: ['sha256 generator', 'sha256 hash', 'sha256 online', 'generate sha256'],
      component: Sha256HashTool,
      faqs: [
        { question: 'What is SHA256?', answer: 'SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value.' },
        { question: 'Is SHA256 secure?', answer: 'Yes, SHA256 is currently considered secure for cryptographic purposes.' },
      ],
    },
  },
  text: {
    'regex-tester': {
      name: 'Regex Tester',
      description: 'Test and debug regular expressions online. Real-time regex matching.',
      longDescription: 'Free online regex tester. Test your regular expressions in real-time with match highlighting. Supports JavaScript regex syntax.',
      keywords: ['regex tester', 'regex online', 'test regex', 'regular expression tester'],
      component: RegexTesterTool,
      faqs: [
        { question: 'What is regex?', answer: 'Regular expressions (regex) are patterns used to match character combinations in strings. They are used for searching, replacing, and validating text.' },
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription: 'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'filler text'],
      component: LoremIpsumTool,
      faqs: [
        { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is placeholder text commonly used in graphic design, web design, and publishing to fill spaces before actual content is available.' },
        { question: 'Why use Lorem Ipsum?', answer: 'Lorem Ipsum provides a natural distribution of letters and words, making it ideal for demonstrating layouts without distracting readers with meaningful content.' },
      ],
    },
    'text-diff': {
      name: 'Text Diff Tool',
      description: 'Compare two texts and find differences. Free online text comparison tool.',
      longDescription: 'Free online text diff tool. Compare two texts side-by-side and visualize additions, deletions, and changes. Perfect for code review and document comparison.',
      keywords: ['text diff', 'compare text', 'diff checker', 'text comparison tool'],
      component: TextDiffTool,
      faqs: [
        { question: 'How does text diff work?', answer: 'The tool compares two texts line by line and highlights additions (green), deletions (red), and unchanged lines to show the differences.' },
        { question: 'Can I compare code with this tool?', answer: 'Yes! This tool is perfect for comparing code snippets, configuration files, or any text content.' },
      ],
    },
    'markdown-preview': {
      name: 'Markdown Preview',
      description: 'Preview Markdown in real-time and export to HTML. Free online Markdown editor.',
      longDescription: 'Free online Markdown preview tool. Write Markdown and see the rendered output in real-time. Export to HTML with proper styling.',
      keywords: ['markdown preview', 'markdown editor', 'markdown to html', 'md preview'],
      component: MarkdownPreviewTool,
      faqs: [
        { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for documentation, readme files, and content writing.' },
        { question: 'Can I export the HTML?', answer: 'Yes! You can copy the generated HTML output to use in your projects.' },
      ],
    },
    'slug-generator': {
      name: 'Slug Generator',
      description: 'Generate SEO-friendly URL slugs from text. Free online slug generator.',
      longDescription: 'Free online slug generator. Convert titles and text into clean, SEO-friendly URL slugs. Supports transliteration for special characters.',
      keywords: ['slug generator', 'url slug', 'seo friendly url', 'permalink generator'],
      component: SlugGeneratorTool,
      faqs: [
        { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL that identifies a particular page in a human-readable form. For example, in /blog/my-first-post, "my-first-post" is the slug.' },
        { question: 'Why are slugs important for SEO?', answer: 'SEO-friendly slugs help search engines understand your content and improve click-through rates by showing users what the page is about.' },
      ],
    },
  },
  converters: {
    'timestamp-converter': {
      name: 'Timestamp Converter',
      description: 'Convert Unix timestamps to human-readable dates and vice versa.',
      longDescription: 'Free online timestamp converter. Convert Unix timestamps (epoch time) to human-readable dates and vice versa. Supports multiple formats.',
      keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'date converter'],
      component: TimestampConverterTool,
      faqs: [
        { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), also known as the Unix epoch.' },
      ],
    },
    'color-converter': {
      name: 'Color Converter',
      description: 'Convert colors between HEX, RGB, and HSL formats. Free online color converter.',
      longDescription: 'Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly. Includes color picker and color variations.',
      keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker'],
      component: ColorConverterTool,
      faqs: [
        { question: 'What is HEX color?', answer: 'HEX color is a 6-digit hexadecimal representation of a color, commonly used in web design (e.g., #FF5733).' },
        { question: 'What is the difference between RGB and HSL?', answer: 'RGB (Red, Green, Blue) defines colors by mixing primary colors, while HSL (Hue, Saturation, Lightness) describes colors in terms of their hue, saturation, and brightness.' },
      ],
    },
    'json-csv': {
      name: 'JSON to CSV Converter',
      description: 'Convert JSON to CSV and CSV to JSON. Free online format converter.',
      longDescription: 'Free online JSON to CSV converter. Convert JSON arrays to CSV format or CSV data to JSON. Supports custom delimiters and nested object flattening.',
      keywords: ['json to csv', 'csv to json', 'json converter', 'csv converter', 'format converter'],
      component: JsonCsvConverterTool,
      faqs: [
        { question: 'What formats are supported?', answer: 'This tool supports conversion between JSON (array of objects) and CSV (comma-separated values). You can also use semicolons, tabs, or pipes as delimiters.' },
        { question: 'How are nested objects handled?', answer: 'Nested objects can be automatically flattened using dot notation (e.g., address.city) for proper CSV conversion.' },
      ],
    },
    'yaml-json': {
      name: 'YAML ↔ JSON Converter',
      description: 'Convert between YAML and JSON formats. Free online YAML JSON converter.',
      longDescription: 'Free online YAML to JSON and JSON to YAML converter. Perfect for Kubernetes configs, CI/CD pipelines, and configuration file conversions.',
      keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'kubernetes yaml'],
      component: YamlJsonConverterTool,
      faqs: [
        { question: 'What is YAML?', answer: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format commonly used for configuration files, especially in DevOps and cloud environments.' },
        { question: 'When should I use YAML vs JSON?', answer: 'YAML is preferred for configuration files due to better readability. JSON is better for data interchange and API responses due to universal support.' },
      ],
    },
    'image-to-base64': {
      name: 'Image to Base64',
      description: 'Convert images to Base64 data URIs. Free online image to Base64 encoder.',
      longDescription: 'Free online image to Base64 converter. Convert images (PNG, JPG, GIF, WebP, SVG) to Base64 data URIs for embedding directly in HTML or CSS.',
      keywords: ['image to base64', 'base64 image encoder', 'data uri generator', 'embed image'],
      component: ImageToBase64Tool,
      faqs: [
        { question: 'What is a Base64 data URI?', answer: 'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.' },
        { question: 'When should I use Base64 images?', answer: 'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.' },
      ],
    },
  },
  formatters: {
    'sql-formatter': {
      name: 'SQL Formatter',
      description: 'Format and beautify SQL queries online. Free SQL formatter and minifier.',
      longDescription: 'Free online SQL formatter. Beautify messy SQL queries with proper indentation and formatting. Also supports SQL minification for production use.',
      keywords: ['sql formatter', 'format sql', 'sql beautifier', 'sql pretty print', 'sql minifier'],
      component: SqlFormatterTool,
      faqs: [
        { question: 'What SQL dialects are supported?', answer: 'The formatter works with standard SQL syntax and is compatible with most SQL dialects including MySQL, PostgreSQL, SQLite, and SQL Server.' },
        { question: 'Can I minify SQL?', answer: 'Yes! Use the minify option to compress your SQL queries by removing unnecessary whitespace and comments.' },
      ],
    },
    'css-minifier': {
      name: 'CSS Minifier',
      description: 'Minify CSS code for production. Free online CSS minifier and beautifier.',
      longDescription: 'Free online CSS minifier. Reduce CSS file size by removing comments, whitespace, and optimizing values. Also includes beautify option for development.',
      keywords: ['css minifier', 'minify css', 'css compressor', 'css optimizer', 'css beautifier'],
      component: CssMinifierTool,
      faqs: [
        { question: 'How much can CSS be reduced?', answer: 'Minification typically reduces CSS file size by 20-40% depending on the original formatting and comment density.' },
        { question: 'Is the minified CSS valid?', answer: 'Yes! The minifier only removes unnecessary characters while preserving the functionality of your CSS.' },
      ],
    },
    'js-minifier': {
      name: 'JavaScript Minifier',
      description: 'Minify JavaScript code for production. Free online JS minifier and beautifier.',
      longDescription: 'Free online JavaScript minifier. Reduce JS file size by removing comments, whitespace, and optionally console.log statements. Also includes beautify option.',
      keywords: ['js minifier', 'javascript minifier', 'minify js', 'javascript compressor', 'js beautifier'],
      component: JsMinifierTool,
      faqs: [
        { question: 'What optimizations are applied?', answer: 'The minifier removes comments, whitespace, optional semicolons, and can also remove console.log statements and debugger keywords.' },
        { question: 'Should I use this for production?', answer: 'This is a basic minifier. For production builds, consider using build tools like Webpack, Rollup, or esbuild with Terser for advanced optimizations.' },
      ],
    },
  },
  utilities: {
    'cron-parser': {
      name: 'Cron Expression Parser',
      description: 'Parse and explain cron expressions. See next execution times.',
      longDescription: 'Free online cron expression parser. Understand what your cron job schedule means in plain English and see the next scheduled execution times.',
      keywords: ['cron parser', 'cron expression', 'cron schedule', 'crontab helper', 'cron generator'],
      component: CronParserTool,
      faqs: [
        { question: 'What is a cron expression?', answer: 'A cron expression is a string of five fields (minute, hour, day, month, weekday) that defines a schedule for running automated tasks.' },
        { question: 'What format does this tool use?', answer: 'This tool uses the standard 5-field cron format: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-6).' },
      ],
    },
    'qr-code': {
      name: 'QR Code Generator',
      description: 'Generate QR codes from text, URLs, and more. Free online QR code generator.',
      longDescription: 'Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, WiFi credentials, and more. Customize colors and download in PNG or SVG format.',
      keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code'],
      component: QrCodeGeneratorTool,
      faqs: [
        { question: 'What is a QR code?', answer: 'QR (Quick Response) codes are two-dimensional barcodes that can store various types of data like URLs, text, or contact information and can be scanned by smartphones.' },
        { question: 'What data can I encode?', answer: 'You can encode URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, vCards, and more.' },
      ],
    },
    'markdown-preview': {
      name: 'Markdown Preview',
      description: 'Preview Markdown in real-time and export to HTML. Free online Markdown editor.',
      longDescription: 'Free online Markdown preview tool. Write Markdown and see the rendered output in real-time. Export to HTML with proper styling.',
      keywords: ['markdown preview', 'markdown editor', 'markdown to html', 'md preview'],
      component: MarkdownPreviewTool,
      faqs: [
        { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for documentation, readme files, and content writing.' },
        { question: 'Can I export the HTML?', answer: 'Yes! You can copy the generated HTML output to use in your projects.' },
      ],
    },
  },
};

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const categoryTools = tools[category];
  const tool = categoryTools?.[toolSlug];

  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalCategory = getCanonicalToolCategory(toolSlug, category);
  const canonicalUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}`;
  const metaTitle = `${tool.name} - Free Online Tool`;

  return {
    title: metaTitle,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        'tr': `${canonicalUrl}?lang=tr`,
        'de': `${canonicalUrl}?lang=de`,
        'es': `${canonicalUrl}?lang=es`,
        'fr': `${canonicalUrl}?lang=fr`,
        'ru': `${canonicalUrl}?lang=ru`,
        'zh': `${canonicalUrl}?lang=zh`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: tool.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'DevsTools',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: tool.description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export async function generateStaticParams() {
  const params: { category: string; tool: string }[] = [];

  for (const [category, categoryTools] of Object.entries(tools)) {
    for (const toolSlug of Object.keys(categoryTools)) {
      params.push({ category, tool: toolSlug });
    }
  }

  return params;
}

const categoryNames: Record<string, string> = {
  json: 'JSON Tools',
  encoding: 'Encoding & Decoding',
  generators: 'Generators',
  crypto: 'Cryptography',
  text: 'Text Tools',
  converters: 'Converters',
};

export default async function ToolPage({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const categoryTools = tools[category];
  const tool = categoryTools?.[toolSlug];

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  // FAQ structured data for SEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // WebApplication structured data
  const appStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appStructuredData) }}
      />

      <ToolPageWrapper
        toolSlug={toolSlug}
        category={category}
        categoryName={categoryNames[category] || category}
        defaultName={tool.name}
        defaultDescription={tool.longDescription}
      >
        <ToolComponent />
      </ToolPageWrapper>
    </div>
  );
}
