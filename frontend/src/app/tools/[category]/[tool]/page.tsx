import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { getCanonicalToolCategory } from '@/lib/toolRoutes';

// Tool configurations
const tools: Record<string, Record<string, {
  name: string;
  description: string;
  longDescription: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}>> = {
  json: {
    'json-formatter': {
      name: 'JSON Formatter',
      description: 'Format and beautify JSON data online. Free JSON formatter and validator.',
      longDescription: 'Our free online JSON formatter helps you format, beautify, and validate JSON data instantly. Simply paste your JSON and get perfectly indented, readable output.',
      keywords: ['json formatter', 'json beautifier', 'format json online', 'json pretty print'],
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
      faqs: [
        { question: 'What is URL encoding?', answer: 'URL encoding converts characters into a format that can be transmitted over the Internet. Special characters are replaced with % followed by hex digits.' },
      ],
    },
    'jwt-decoder': {
      name: 'JWT Decoder',
      description: 'Decode and inspect JWT tokens online. View header, payload, and signature.',
      longDescription: 'Free online JWT decoder. Decode JSON Web Tokens and inspect their header, payload, and signature. Useful for debugging authentication issues.',
      keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token decoder'],
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
      faqs: [
        { question: 'What are HTML entities?', answer: 'HTML entities are special codes used to display reserved characters in HTML. For example, &lt; represents < and &amp; represents &.' },
        { question: 'Why encode HTML entities?', answer: 'Encoding HTML entities prevents XSS attacks and ensures special characters display correctly in web pages instead of being interpreted as HTML code.' },
      ],
    },
    'hex-encoder': {
      name: 'HEX Encoder/Decoder',
      description: 'Encode or decode text to/from hexadecimal. Free online HEX encoder and decoder.',
      longDescription: 'Free online HEX encoder and decoder. Convert text to hexadecimal encoding or decode hexadecimal strings back to plain text instantly.',
      keywords: ['hex encoder', 'hex decoder', 'hexadecimal encoder', 'hex to text', 'text to hex'],
      faqs: [
        { question: 'What is hexadecimal encoding?', answer: 'Hexadecimal encoding represents each character as its ASCII value in base-16 notation (0-9, A-F).' },
        { question: 'How do I use this tool?', answer: 'Enter text in the input field and it will automatically be converted to hexadecimal. You can also paste hexadecimal to decode it back to text.' },
      ],
    },
    'binary-encoder': {
      name: 'Binary Encoder/Decoder',
      description: 'Encode or decode text to/from binary. Free online binary encoder and decoder.',
      longDescription: 'Free online binary encoder and decoder. Convert text to binary encoding (0s and 1s) or decode binary strings back to plain text instantly.',
      keywords: ['binary encoder', 'binary decoder', 'binary converter', 'text to binary', 'binary to text'],
      faqs: [
        { question: 'What is binary encoding?', answer: 'Binary encoding represents each character as its ASCII value in base-2 notation using only 0s and 1s.' },
        { question: 'How many bits per character?', answer: 'Each character is represented by 8 bits (1 byte) in this tool.' },
      ],
    },
    'image-to-base64': {
      name: 'Image to Base64',
      description: 'Convert images to Base64 data URIs. Free online image to Base64 encoder.',
      longDescription: 'Free online image to Base64 converter. Convert images (PNG, JPG, GIF, WebP, SVG) to Base64 data URIs for embedding directly in HTML or CSS.',
      keywords: ['image to base64', 'base64 image encoder', 'data uri generator', 'embed image'],
      faqs: [
        { question: 'What is a Base64 data URI?', answer: 'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.' },
        { question: 'When should I use Base64 images?', answer: 'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.' },
      ],
    },
    'unicode-escape': {
      name: 'Unicode Escape Encoder/Decoder',
      description: 'Encode plain text into Unicode escape sequences and decode escaped text back.',
      longDescription: 'Free online Unicode escape converter. Encode text to \\uXXXX format or decode escaped values back to readable text. Supports \\uXXXX and \\u{XXXXX} forms.',
      keywords: ['unicode escape', 'unicode encoder', 'unicode decoder', 'escape sequence', '\\uXXXX'],
      faqs: [
        { question: 'What is Unicode escaping?', answer: 'Unicode escaping represents characters using hexadecimal code points, such as \\u0041 for "A".' },
        { question: 'When should I use this tool?', answer: 'Use it when working with JSON, logs, source code, or APIs that contain escaped Unicode text.' },
      ],
    },
    'json-string-escape': {
      name: 'JSON String Escape',
      description: 'Escape and unescape JSON string content online.',
      longDescription: 'Free online JSON string escape tool. Convert raw text into escaped JSON string format or decode escaped JSON string fragments back to readable text.',
      keywords: ['json string escape', 'json escape', 'json unescape', 'string escaping'],
      faqs: [
        { question: 'What does JSON string escaping do?', answer: 'It converts special characters like newlines, tabs, and quotes into escaped forms such as \\n, \\t, and \\\".' },
        { question: 'When is this useful?', answer: 'It is useful when you need to embed strings safely in JSON payloads, configuration files, or API requests.' },
      ],
    },
  },
  generators: {
    'uuid-generator': {
      name: 'UUID Generator',
      description: 'Generate random UUIDs/GUIDs online. Create single or bulk UUIDs instantly.',
      longDescription: 'Free online UUID v4 generator. Generate random universally unique identifiers (UUIDs/GUIDs) instantly. Create single or multiple UUIDs at once.',
      keywords: ['uuid generator', 'guid generator', 'random uuid', 'uuid v4'],
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
      faqs: [
        { question: 'How strong should my password be?', answer: 'A strong password should be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and special characters.' },
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription: 'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'filler text'],
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
      faqs: [
        { question: 'What is SHA256?', answer: 'SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value.' },
        { question: 'Is SHA256 secure?', answer: 'Yes, SHA256 is currently considered secure for cryptographic purposes.' },
      ],
    },
    'sha512-hash': {
      name: 'SHA512 Hash Generator',
      description: 'Generate SHA512 hash from text online. Free SHA512 hash generator.',
      longDescription: 'Free online SHA512 hash generator. Create SHA512 hash values from any text input. SHA512 produces a 512-bit hash value and is part of the SHA-2 family.',
      keywords: ['sha512 generator', 'sha512 hash', 'sha512 online', 'generate sha512', 'sha-512'],
      faqs: [
        { question: 'What is SHA512?', answer: 'SHA512 (Secure Hash Algorithm 512-bit) is a cryptographic hash function that produces a 512-bit (64-byte) hash value, typically rendered as a 128-digit hexadecimal number.' },
        { question: 'Is SHA512 secure?', answer: 'Yes, SHA512 is currently considered very secure for cryptographic purposes and is recommended for most applications.' },
      ],
    },
  },
  text: {
    'regex-tester': {
      name: 'Regex Tester',
      description: 'Test and debug regular expressions online. Real-time regex matching.',
      longDescription: 'Free online regex tester. Test your regular expressions in real-time with match highlighting. Supports JavaScript regex syntax.',
      keywords: ['regex tester', 'regex online', 'test regex', 'regular expression tester'],
      faqs: [
        { question: 'What is regex?', answer: 'Regular expressions (regex) are patterns used to match character combinations in strings. They are used for searching, replacing, and validating text.' },
      ],
    },
    'regex-escape': {
      name: 'Regex Escape',
      description: 'Escape or unescape text for safe regular expression usage.',
      longDescription: 'Free online regex escape tool. Escape special characters before building regex patterns, or unescape escaped regex text back to normal form.',
      keywords: ['regex escape', 'escape regex', 'unescape regex', 'regular expression escape'],
      faqs: [
        { question: 'Why escape regex characters?', answer: 'Escaping treats special regex symbols as literal characters, preventing unintended matching behavior.' },
        { question: 'When should I use this tool?', answer: 'Use it when creating dynamic regex patterns from user input or raw text.' },
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription: 'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'filler text'],
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
      faqs: [
        { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL that identifies a particular page in a human-readable form. For example, in /blog/my-first-post, "my-first-post" is the slug.' },
        { question: 'Why are slugs important for SEO?', answer: 'SEO-friendly slugs help search engines understand your content and improve click-through rates by showing users what the page is about.' },
      ],
    },
    'case-converter': {
      name: 'Case Converter',
      description: 'Convert text between different cases. Free online case converter.',
      longDescription: 'Free online case converter. Convert text between camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, space case, and dot.case instantly.',
      keywords: ['case converter', 'camel case', 'pascal case', 'snake case', 'kebab case', 'text case converter'],
      faqs: [
        { question: 'What case types are supported?', answer: 'This tool supports camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, space case, and dot.case.' },
        { question: 'What is camelCase?', answer: 'camelCase starts with a lowercase letter and each subsequent word starts with an uppercase letter. Common in programming.' },
      ],
    },
    'word-counter': {
      name: 'Word Counter',
      description: 'Count words, characters, lines, sentences, and paragraphs online. Free word counter.',
      longDescription: 'Free online word counter. Count words, characters, characters without spaces, lines, sentences, paragraphs, and calculate reading time for your text.',
      keywords: ['word counter', 'character counter', 'word count tool', 'count words online', 'reading time calculator'],
      faqs: [
        { question: 'What is counted?', answer: 'This tool counts words, characters (with and without spaces), lines, sentences, paragraphs, and estimates reading time.' },
        { question: 'How is reading time calculated?', answer: 'Reading time is calculated based on an average reading speed of 200 words per minute.' },
      ],
    },
    'remove-duplicates': {
      name: 'Remove Duplicate Lines',
      description: 'Remove duplicate lines from text. Free online duplicate line remover.',
      longDescription: 'Free online duplicate line remover. Remove duplicate lines from lists, code, or any text content with options for case sensitivity and whitespace trimming.',
      keywords: ['remove duplicates', 'duplicate line remover', 'remove duplicate lines', 'unique lines', 'deduplicate'],
      faqs: [
        { question: 'How does duplicate detection work?', answer: 'The tool compares each line and keeps only the first occurrence. You can toggle case-sensitive matching and whitespace trimming.' },
        { question: 'What happens to empty lines?', answer: 'Empty lines are preserved in their original positions.' },
      ],
    },
    'sort-lines': {
      name: 'Sort Lines',
      description: 'Sort lines alphabetically. Free online line sorter.',
      longDescription: 'Free online line sorter. Sort lines of text alphabetically in ascending or descending order with options for case-sensitive sorting.',
      keywords: ['sort lines', 'line sorter', 'alphabetical sort', 'sort text lines', 'sort list'],
      faqs: [
        { question: 'How does sorting work?', answer: 'Lines are sorted alphabetically using Unicode character comparison. You can choose ascending or descending order.' },
        { question: 'Is sorting case-sensitive?', answer: 'By default, sorting is case-insensitive. You can enable case-sensitive sorting in the options.' },
      ],
    },
  },
  converters: {
    'timestamp-converter': {
      name: 'Timestamp Converter',
      description: 'Convert Unix timestamps to human-readable dates and vice versa.',
      longDescription: 'Free online timestamp converter. Convert Unix timestamps (epoch time) to human-readable dates and vice versa. Supports multiple formats.',
      keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'date converter'],
      faqs: [
        { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), also known as the Unix epoch.' },
      ],
    },
    'color-converter': {
      name: 'Color Converter',
      description: 'Convert colors between HEX, RGB, and HSL formats. Free online color converter.',
      longDescription: 'Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly. Includes color picker and color variations.',
      keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker'],
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
      faqs: [
        { question: 'What is a Base64 data URI?', answer: 'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.' },
        { question: 'When should I use Base64 images?', answer: 'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.' },
      ],
    },
    'roman-numeral-converter': {
      name: 'Roman Numeral Converter',
      description: 'Convert numbers to Roman numerals and vice versa. Free online Roman numeral converter.',
      longDescription: 'Free online Roman numeral converter. Convert any number from 1 to 3999 to Roman numerals, or decode Roman numerals back to regular numbers.',
      keywords: ['roman numeral converter', 'number to roman', 'roman to number', 'roman numerals'],
      faqs: [
        { question: 'What is the range?', answer: 'Roman numerals can represent numbers from 1 to 3999. Beyond that, special notation is required.' },
        { question: 'How are numbers formed?', answer: 'Roman numerals use additive notation (VI = 6) and subtractive notation (IV = 4) using letters I, V, X, L, C, D, M.' },
      ],
    },
    'number-base-converter': {
      name: 'Number Base Converter',
      description: 'Convert numbers between decimal, hexadecimal, octal, and binary. Free online number base converter.',
      longDescription: 'Free online number base converter. Convert numbers between decimal (base-10), hexadecimal (base-16), octal (base-8), and binary (base-2) instantly.',
      keywords: ['number base converter', 'decimal to hex', 'binary converter', 'hex converter', 'base converter'],
      faqs: [
        { question: 'What number bases are supported?', answer: 'This tool supports decimal (base-10), hexadecimal (base-16), octal (base-8), and binary (base-2).' },
        { question: 'How do I use prefixes?', answer: 'You can use prefixes like 0x for hex, 0o for octal, and 0b for binary. They are automatically handled.' },
      ],
    },
    'url-parser': {
      name: 'URL Parser',
      description: 'Parse URLs and inspect protocol, host, path, and query parameters.',
      longDescription: 'Free online URL parser. Break down any URL into protocol, domain, port, path, query parameters, and hash. Useful for debugging redirects, APIs, and tracking links.',
      keywords: ['url parser', 'parse url', 'url analyzer', 'query parameters', 'url components'],
      faqs: [
        { question: 'Can this parse URLs without protocol?', answer: 'Yes. If no protocol is provided, the tool tries to parse the input by assuming HTTPS.' },
        { question: 'Does it support repeated query params?', answer: 'Yes. Repeated query parameters are preserved and returned as arrays.' },
      ],
    },
    'query-string-parser': {
      name: 'Query String Parser',
      description: 'Parse query strings to JSON and build query strings from JSON.',
      longDescription: 'Free online query string parser and builder. Decode URL query parameters into structured JSON or generate query strings from JSON objects.',
      keywords: ['query string parser', 'url parameters', 'parse query string', 'query builder'],
      faqs: [
        { question: 'Can I parse a full URL?', answer: 'Yes. You can paste a full URL and the tool will extract and parse the query string portion.' },
        { question: 'Does it support repeated keys?', answer: 'Yes. Repeated keys are preserved as arrays when parsing.' },
      ],
    },
  },
  formatters: {
    'sql-formatter': {
      name: 'SQL Formatter',
      description: 'Format and beautify SQL queries online. Free SQL formatter and minifier.',
      longDescription: 'Free online SQL formatter. Beautify messy SQL queries with proper indentation and formatting. Also supports SQL minification for production use.',
      keywords: ['sql formatter', 'format sql', 'sql beautifier', 'sql pretty print', 'sql minifier'],
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
      faqs: [
        { question: 'What optimizations are applied?', answer: 'The minifier removes comments, whitespace, optional semicolons, and can also remove console.log statements and debugger keywords.' },
        { question: 'Should I use this for production?', answer: 'This is a basic minifier. For production builds, consider using build tools like Webpack, Rollup, or esbuild with Terser for advanced optimizations.' },
      ],
    },
    'html-formatter': {
      name: 'HTML Formatter',
      description: 'Format and beautify HTML code online. Free HTML formatter.',
      longDescription: 'Free online HTML formatter. Beautify and format HTML code with proper indentation. Makes messy HTML readable and well-structured.',
      keywords: ['html formatter', 'html beautifier', 'format html', 'html pretty print', 'beautify html'],
      faqs: [
        { question: 'What does the formatter do?', answer: 'The formatter adds proper indentation, spacing, and line breaks to make HTML code more readable.' },
        { question: 'Can I choose indent size?', answer: 'Yes! You can choose between 2, 4, or 8 spaces for indentation.' },
      ],
    },
    'html-minifier': {
      name: 'HTML Minifier',
      description: 'Minify HTML code for production. Free online HTML minifier.',
      longDescription: 'Free online HTML minifier. Reduce HTML file size by removing comments and whitespace. Optimize your HTML for faster loading times.',
      keywords: ['html minifier', 'minify html', 'html compressor', 'html optimizer', 'compress html'],
      faqs: [
        { question: 'What optimizations are applied?', answer: 'The minifier removes HTML comments and collapses whitespace. You can choose which options to apply.' },
        { question: 'How much can HTML be reduced?', answer: 'Minification typically reduces HTML file size by 10-30% depending on the original formatting and comment density.' },
      ],
    },
    'xml-formatter': {
      name: 'XML Formatter',
      description: 'Format and beautify XML code online. Free XML formatter.',
      longDescription: 'Free online XML formatter. Beautify and format XML code with proper indentation. Makes messy XML readable and well-structured. Supports CDATA and comments.',
      keywords: ['xml formatter', 'xml beautifier', 'format xml', 'xml pretty print', 'beautify xml'],
      faqs: [
        { question: 'What XML features are supported?', answer: 'The formatter handles standard XML tags, CDATA sections, comments, processing instructions, and DOCTYPE declarations.' },
        { question: 'Can I choose indent size?', answer: 'Yes! You can choose between 2, 4, or 8 spaces for indentation.' },
      ],
    },
  },
  utilities: {
    'cron-parser': {
      name: 'Cron Expression Parser',
      description: 'Parse and explain cron expressions. See next execution times.',
      longDescription: 'Free online cron expression parser. Understand what your cron job schedule means in plain English and see the next scheduled execution times.',
      keywords: ['cron parser', 'cron expression', 'cron schedule', 'crontab helper', 'cron generator'],
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
      faqs: [
        { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for documentation, readme files, and content writing.' },
        { question: 'Can I export the HTML?', answer: 'Yes! You can copy the generated HTML output to use in your projects.' },
      ],
    },
    'http-headers-parser': {
      name: 'HTTP Headers Parser',
      description: 'Parse raw HTTP headers to JSON and build raw headers from JSON.',
      longDescription: 'Free online HTTP headers parser. Convert header blocks into JSON format and generate header blocks back from JSON for quick debugging and API testing.',
      keywords: ['http headers parser', 'parse headers', 'request headers', 'response headers'],
      faqs: [
        { question: 'Can it parse duplicate headers?', answer: 'Yes. Duplicate header keys are grouped into arrays in the parsed JSON output.' },
        { question: 'What input format is expected?', answer: 'Use one header per line in the format "Header-Name: value".' },
      ],
    },
    'http-status-codes': {
      name: 'HTTP Status Codes',
      description: 'Search, filter, and reference common HTTP response status codes.',
      longDescription: 'Free online HTTP status code reference. Quickly find informational, success, redirect, client error, and server error codes with clear descriptions.',
      keywords: ['http status codes', 'status code reference', '404', '500', 'http errors'],
      faqs: [
        { question: 'What are HTTP status codes?', answer: 'HTTP status codes are standardized server responses that indicate whether a request succeeded, failed, or was redirected.' },
        { question: 'Which status code classes exist?', answer: '1xx informational, 2xx success, 3xx redirection, 4xx client errors, and 5xx server errors.' },
      ],
    },
    'user-agent-parser': {
      name: 'User-Agent Parser',
      description: 'Analyze user-agent strings to detect browser, OS, and device type.',
      longDescription: 'Free online user-agent parser. Inspect UA strings and extract browser name/version, operating system, rendering engine, device type, and bot signals.',
      keywords: ['user-agent parser', 'ua parser', 'browser detection', 'device detection'],
      faqs: [
        { question: 'How accurate is UA parsing?', answer: 'It provides practical detection for common browsers and devices, but user-agent strings can be spoofed.' },
        { question: 'Can it detect bots?', answer: 'Yes. It flags common bot signatures based on known keywords in the user-agent string.' },
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
  formatters: 'Code Formatters',
  utilities: 'Developer Utilities',
};

export default async function ToolPage({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const categoryTools = tools[category];
  const tool = categoryTools?.[toolSlug];

  if (!tool) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devstools.app';
  const canonicalCategory = getCanonicalToolCategory(toolSlug, category);

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

  // BreadcrumbList structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryNames[category] || category,
        item: `${siteUrl}/tools/${canonicalCategory}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
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
        <ToolRenderer toolSlug={toolSlug} />
      </ToolPageWrapper>
    </div>
  );
}

