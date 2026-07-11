import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { getToolBySlug } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getToolSources } from '@/lib/toolSources';

const LAST_REVIEWED = '2026-07-11';

// Tool configurations
const tools: Record<string, Record<string, {
  name: string;
  metadataTitle?: string;
  description: string;
  longDescription: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  answerSections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
  howToUseSteps?: string[];
}>> = {
  json: {
    'json-formatter': {
      name: 'JSON Formatter',
      metadataTitle: 'JSON Formatter & Validator Online – Beautify, Minify, Sort',
      description: 'Format, validate, beautify, minify, and recursively sort JSON in your browser. Get immediate syntax errors without uploading data.',
      longDescription: 'Free online JSON formatter and minifier. Paste valid JSON to create consistently indented, readable output or a compact representation without changing the intended data.',
      keywords: ['json formatter', 'json beautifier', 'format json online', 'json pretty print', 'json minifier'],
      faqs: [
        { question: 'What is JSON?', answer: 'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.' },
        { question: 'How do I format JSON?', answer: 'Paste valid JSON in the input field, choose the indentation and key-sorting options you need, then select Format JSON.' },
        { question: 'Is my data safe?', answer: 'Yes! All processing happens in your browser. Your data never leaves your computer.' },
      ],
      answerSections: [
        {
          heading: 'What the JSON Formatter does',
          paragraphs: [
            'A JSON formatter parses JSON text and serializes the resulting value with consistent whitespace. This tool can pretty-print with the selected indentation, minify the result, and optionally sort object keys recursively. RFC 8259 requires double-quoted object names and strings; comments, trailing commas, NaN, and Infinity are outside the JSON grammar. Formatting changes presentation, not the intended data meaning.',
          ],
        },
        {
          heading: 'Common uses and validation boundary',
          paragraphs: [
            'Use the formatter when you need to inspect or normalize JSON during development:',
          ],
          bullets: [
            'Make a compact API response, webhook body, configuration, or log entry easier to read.',
            'Minify valid JSON before copying it into a request, test fixture, or environment variable.',
            'Sort keys for a more predictable manual comparison between two objects.',
            'Expose parse errors caused by missing commas, mismatched brackets, or invalid quotation marks.',
            'Treat a successful parse as a syntax check only. It does not apply JSON Schema, API contracts, required fields, domain types, or business rules.',
          ],
        },
        {
          heading: 'Worked formatting example',
          paragraphs: [
            'Input {"active":true,"user":{"id":42,"roles":["admin","editor"]}} becomes an indented object whose nested user value and roles array are visible at a glance. Minifying produces the compact form again. If the input contained a trailing comma, the browser parser would reject it instead of silently repairing the document.',
          ],
        },
        {
          heading: 'Limitations and privacy',
          bullets: [
            'Parsing uses JavaScript numbers, so integers beyond the reliably representable range can lose precision.',
            'Duplicate object names may collapse during parsing; avoid parse-and-reserialize workflows when duplicate preservation matters.',
            'Sorted output is convenient, but it is not a cryptographic JSON canonicalization format and should not be used to prepare signed data.',
            'Processing runs in the browser. Sensitive JSON can still be exposed through clipboard history, browser extensions, screen sharing, or a shared device.',
          ],
        },
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
      metadataTitle: 'JWT Decoder Online – Inspect Claims Privately',
      description: 'Decode JWT headers, payloads, timestamps, and claims privately in your browser. Decoding does not verify the token signature.',
      longDescription: 'Free online JWT decoder. Decode JSON Web Tokens and inspect their header, payload, and signature. Useful for debugging authentication issues.',
      keywords: ['jwt decoder', 'decode jwt', 'jwt parser', 'json web token decoder'],
      faqs: [
        { question: 'What is a JWT?', answer: 'JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties.' },
        { question: 'Does decoding verify the JWT signature?', answer: 'No. Decoding only reads the Base64URL-encoded header and payload. A trusted server and the correct key are required to verify the signature.' },
        { question: 'Is it safe to paste my JWT here?', answer: 'Decoding happens in your browser and the token is not uploaded. Still avoid using production tokens on shared devices because JWT payloads can contain sensitive claims.' },
      ],
      answerSections: [
        {
          heading: 'What the JWT Decoder does',
          paragraphs: [
            'The decoder splits a three-part compact token into header, payload, and signature segments. It Base64URL-decodes the first two segments, parses their JSON, and displays the signature segment without checking it. RFC 7519 defines JWT as a compact claims representation; common registered claims include iss, sub, aud, exp, nbf, iat, and jti. Decoded claims are readable, but not automatically trustworthy.',
          ],
        },
        {
          heading: 'Common JWT debugging uses',
          paragraphs: [
            'Decoding is useful for examining what an application received before investigating verification failures:',
          ],
          bullets: [
            'Inspect alg, kid, and typ header parameters used during key and algorithm selection.',
            'Review subject, issuer, audience, roles, scopes, and application-specific claims.',
            'Convert NumericDate claims such as exp, nbf, and iat from epoch seconds into readable dates.',
            'Compare token claims with the issuer, audience, and authorization rules expected by an API.',
            'Remember that every displayed header and claim remains untrusted until the token is verified.',
          ],
        },
        {
          heading: 'Worked decoding example',
          paragraphs: [
            'A token might decode to header {"alg":"HS256","typ":"JWT"} and payload {"sub":"123","iss":"https://issuer.example","aud":"api","exp":1916239022}. The tool can show the expiration time and compare timestamp claims with the current clock. An authentication service must still allow the expected algorithm, verify the signature with the correct key, and enforce issuer, audience, time, and application policy.',
          ],
        },
        {
          heading: 'Verification limits and privacy',
          bullets: [
            'The displayed signature is not verified. A favorable timestamp badge does not mean the token is authentic or acceptable.',
            'This decoder expects three segments; it does not decrypt a five-part encrypted JWE.',
            'It does not check key trust, issuer, audience, nonce, revocation, permissions, or server-specific clock leeway.',
            'Decoding runs in the browser, but bearer tokens are credentials. Avoid live production tokens, shared devices, clipboard history, browser extensions, and screen sharing.',
          ],
        },
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
      metadataTitle: 'UUID v4 & v7 Generator Online – Bulk GUIDs',
      description: 'Generate up to 1,000 cryptographically random UUID v4 or RFC 9562 UUID v7 identifiers locally, then format, copy, or download the batch.',
      longDescription: 'Free online UUID v4 and v7 generator. Create random v4 or Unix-millisecond-based v7 identifiers, format them as UUIDs or GUIDs, and export a batch without an API upload.',
      keywords: ['uuid generator', 'guid generator', 'random uuid', 'uuid v4', 'uuid v7', 'time ordered uuid'],
      faqs: [
        { question: 'What is a UUID?', answer: 'UUID (Universally Unique Identifier) is a 128-bit identifier designed to be globally unique without a central issuing authority.' },
        { question: 'What is UUID v4?', answer: 'UUID version 4 is randomly generated. It has 122 random bits and 6 bits for version and variant information.' },
        { question: 'What is UUID v7?', answer: 'UUID version 7 starts with a 48-bit Unix timestamp in milliseconds and uses 74 additional bits for random data. Values with increasing encoded timestamps sort chronologically, but same-millisecond values are randomized and a backward system-clock adjustment can reverse generation order.' },
        { question: 'Should I choose UUID v4 or v7?', answer: 'Choose v4 when you want an opaque random identifier. Choose v7 when timestamp locality and chronological database indexing are useful. Neither version should be treated as a secret.' },
        { question: 'Are the generated UUIDs cryptographically random?', answer: 'The browser cryptography API supplies the 122 random bits in UUID v4 and the 74 random payload bits in UUID v7. UUID v7 also exposes its creation millisecond, so UUIDs are identifiers rather than passwords or tokens.' },
      ],
      howToUseSteps: [
        'Choose UUID v4 for random identifiers or UUID v7 for timestamp-based identifiers.',
        'Set a quantity from 1 through 1,000 and choose uppercase, braces, or hyphen formatting.',
        'Select Generate to create the batch locally in your browser.',
        'Copy the newline-separated values or download them as a UTF-8 text file.',
      ],
      answerSections: [
        {
          heading: 'What this UUID v4 and v7 generator does',
          paragraphs: [
            'This generator creates RFC 9562 UUID version 4 or version 7 values entirely in the browser. Version 4 uses 122 cryptographically random bits. Version 7 stores the current Unix millisecond in its first 48 bits and fills its remaining 74 payload bits from crypto.getRandomValues(). Both set the RFC version and variant fields and use the canonical 8-4-4-4-12 hexadecimal layout.',
          ],
        },
        {
          heading: 'Choose v4 or v7',
          paragraphs: [
            'Use UUID v4 for an opaque random identifier with no timestamp. Use UUID v7 when records should group chronologically by creation millisecond, which can improve index locality compared with random v4 values. Ordering follows the encoded clock value: same-millisecond random tails are not strictly ordered, and a backward system-clock adjustment can reverse generation order.',
          ],
        },
        {
          heading: 'Bulk formatting and export',
          paragraphs: [
            'Generate from 1 through 1,000 values, switch hexadecimal letters to uppercase, remove hyphens, or wrap each value in braces for GUID-oriented workflows. Copy the newline-separated result or download the same batch as a UTF-8 text file.',
          ],
          bullets: [
            'Create database or application identifiers without coordinating a central counter.',
            'Populate test fixtures, mock API responses, and sample records.',
            'Attach correlation IDs to requests, jobs, logs, or messages.',
            'Prepare small batches for imports, prototypes, and local development.',
          ],
        },
        {
          heading: 'Format examples',
          paragraphs: [
            'A v4 result can look like 3f2504e0-4f89-41d3-9a0c-0305e82c3301, while a v7 result has 7 as its version nibble, such as 0190b0cc-4f71-7a8e-9c9a-6a74fbb21a92. Uppercase, hyphenless, and brace options change only presentation; downstream parsers may require the canonical lowercase hyphenated form.',
          ],
        },
        {
          heading: 'Limitations and privacy',
          paragraphs: [
            'UUID uniqueness is probabilistic, and this generator does not check a registry or guarantee uniqueness. UUID v7 exposes its creation millisecond, assumes a non-regressing system clock for generation-order sorting, and random values created within one millisecond are not strictly monotonic. A UUID is an identifier, not automatically a password, API key, or session token. Generation happens locally in the browser; anything you copy, paste, download, transmit, or store is handled by the destination you choose.',
          ],
        },
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
      metadataTitle: 'MD5 Hash Generator Online – Text & File Checksums',
      description: 'Generate a 32-character MD5 digest from UTF-8 text or exact file bytes in your browser. Use MD5 only for legacy, non-security checksums.',
      longDescription: 'Free online MD5 hash generator. Create MD5 hash values from any text input instantly. Useful for checksums and data verification.',
      keywords: ['md5 generator', 'md5 hash', 'md5 online', 'generate md5'],
      faqs: [
        { question: 'What is MD5?', answer: 'MD5 (Message Digest 5) is a cryptographic hash function that produces a 128-bit (16-byte) hash value.' },
        { question: 'Is MD5 secure?', answer: 'MD5 is no longer considered secure for cryptographic purposes but is still useful for checksums and non-security-critical applications.' },
      ],
      answerSections: [
        {
          heading: 'What does this MD5 hash generator do?',
          paragraphs: [
            'This MD5 hash generator turns text or a selected file into the 128-bit message digest defined by RFC 1321 and renders it as 32 hexadecimal characters. Text is converted to UTF-8 bytes; file mode hashes the file bytes. Lowercase and uppercase are display choices for the same digest. The calculation runs in browser code, so the hashing flow requires no server upload.',
          ],
        },
        {
          heading: 'MD5 worked example and file checksum',
          paragraphs: [
            'For the exact three-character input abc—without quotation marks, spaces, or a trailing line break—the result is 900150983cd24fb0d6963f7d28e17f72. RFC 1321 publishes this test vector. Uppercase display changes only the representation, not the digest bits.',
            'For a file checksum, select a file and compare all 32 hexadecimal characters with an expected value. A mismatch proves the file bytes differ from those used for the expected digest. A match can support accidental-error detection, but the source of the expected value matters and an MD5 match is not proof against deliberate substitution.',
          ],
        },
        {
          heading: 'Can MD5 be decrypted, and when should it be used?',
          paragraphs: [
            'This is an MD5 generator, not an MD5 decrypt or reverse-hash service. Hashing is not encryption, and a fixed-size digest does not contain a reversible copy of the input. Attempts to reverse a digest normally guess candidate inputs and hash each candidate for comparison.',
            'RFC 6151 states that MD5 is no longer acceptable when collision resistance is required, including digital signatures. Do not rely on MD5 to detect deliberate tampering. The RFC allows an MD5 checksum used solely to protect against errors, but applications must state what security service, if any, they expect from it.',
            'Browser-side calculation reduces the need to transmit text or files for hashing, but it does not make MD5 cryptographically safe. Avoid entering passwords or other secrets into an online hash page.',
          ],
        },
      ],
    },
    'sha256-hash': {
      name: 'SHA256 Hash Generator',
      metadataTitle: 'SHA-256 Generator Online – Text & File Hashes',
      description: 'Generate a 64-character SHA-256 digest from UTF-8 text or exact file bytes locally in your browser, with no calculation upload.',
      longDescription: 'Free online SHA256 hash generator. Create SHA256 hash values from any text input. SHA256 is part of the SHA-2 family of cryptographic hash functions.',
      keywords: ['sha256 generator', 'sha256 hash', 'sha256 online', 'generate sha256'],
      faqs: [
        { question: 'What is SHA256?', answer: 'SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value.' },
        { question: 'Is SHA256 secure?', answer: 'Yes, SHA256 is currently considered secure for cryptographic purposes.' },
      ],
      answerSections: [
        {
          heading: 'What does this SHA-256 generator do?',
          paragraphs: [
            'This SHA-256 generator computes the 256-bit message digest specified by NIST FIPS 180-4 for text or a selected file and renders it as 64 hexadecimal characters. In text mode, the browser converts characters to UTF-8 bytes. File mode digests the selected bytes. Lowercase and uppercase are display choices for the same value.',
          ],
        },
        {
          heading: 'SHA-256 worked example and file verification',
          paragraphs: [
            'For the exact three-character input abc—without quotation marks, spaces, or a trailing line break—the result is ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. A newline, different capitalization, or a different encoding changes the input bytes and produces a different calculation.',
            'To check a file, generate its SHA-256 value and compare all 64 hexadecimal characters with a value obtained from a trusted source. A mismatch proves the file bytes differ from those used for the expected digest. A match verifies the comparison, but the source of the expected value still matters.',
          ],
        },
        {
          heading: 'Can SHA-256 be decrypted, and what does it prove?',
          paragraphs: [
            'This is a SHA-256 generator, not a decrypt or reverse-hash service. A digest compresses input into a fixed 256-bit result; it is not an encrypted or lossless copy that can be decoded to the original. Finding a likely original means guessing candidates and hashing them for comparison.',
            'FIPS 180-4 specifies SHA-256 as a secure hash algorithm and describes hashes as components used with applications such as digital signatures and keyed message authentication. This unkeyed generator does not sign data, authenticate a sender, or encrypt content. Do not treat a digest supplied beside an untrusted file as independent proof of origin.',
            'The text and file hashing paths run in browser code and require no server upload for the calculation. That privacy property does not make a hash encryption; avoid entering secrets into any online utility unless its execution environment is appropriate for your data.',
          ],
        },
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
      metadataTitle: 'JavaScript Regex Tester Online – Matches, Groups & Flags',
      description: 'Test JavaScript regular expressions online with live match highlighting, indices, capture groups, and browser-supported flags.',
      longDescription: 'Free online regex tester. Test your regular expressions in real-time with match highlighting. Supports JavaScript regex syntax.',
      keywords: ['regex tester', 'regex online', 'test regex', 'regular expression tester'],
      faqs: [
        { question: 'What is regex?', answer: 'Regular expressions (regex) are patterns used to match character combinations in strings. They are used for searching, replacing, and validating text.' },
        { question: 'Which regex flavor is supported?', answer: 'This tester uses the JavaScript RegExp engine and supports ECMAScript syntax and flags available in your browser. Invalid patterns are reported as syntax errors.' },
        { question: 'Which regex flags can I test?', answer: 'You can test the standard JavaScript flags supported by your browser, including global, case-insensitive, multiline, dotAll, Unicode, and sticky matching.' },
      ],
      answerSections: [
        {
          heading: 'What this JavaScript regex tester does',
          paragraphs: [
            'This tester compiles the pattern and flags with the browser\'s JavaScript RegExp engine, applies it to the supplied text, highlights each match, and reports its starting index and capture groups. Enter the pattern source without surrounding slash delimiters. Add g to collect every match; without it, JavaScript returns only the first match. Use the match count and indices to confirm repeated matches occur where expected.',
          ],
        },
        {
          heading: 'Common use cases',
          bullets: [
            'Prototype validation rules for identifiers, dates, log lines, or other constrained text.',
            'Extract repeated values such as email-like strings, ticket numbers, or named fields.',
            'Compare case-sensitive and case-insensitive behavior with i, or line anchors with m.',
            'Inspect capturing groups before moving a pattern into JavaScript or TypeScript code.',
          ],
        },
        {
          heading: 'Worked example',
          paragraphs: [
            'Pattern: \\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})\\b. Flags: gi. Test text: "Contact Ada at ada@example.com or SUPPORT@EXAMPLE.ORG." The result is two highlighted matches. Capture group 1 contains each local part, while group 2 contains each domain. The g flag continues after the first match, and i makes letter case irrelevant.',
          ],
        },
        {
          heading: 'Limitations and privacy',
          paragraphs: [
            'This tool follows ECMAScript regular-expression syntax available in the current browser; PCRE, Python, .NET, and Java-specific constructs may fail or behave differently. A successful match proves only that the pattern matched, not that an email, URL, date, or other value is semantically valid. Ambiguous nested quantifiers can cause expensive backtracking on long input. Pattern evaluation and test text stay in the browser; still avoid sensitive production data on shared devices.',
          ],
        },
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
      name: 'User Agent Parser Online',
      metadataTitle: 'User Agent Parser Online – Browser, OS, Device & Bots',
      description: 'Parse one or many User-Agent strings online into browser/version, OS, engine, device vendor/model/type, CPU, and bot fields in your browser.',
      longDescription: 'Online user-agent parser powered by the bundled UAParser.js 1.0.41 ruleset. Inspect one string or batch lines and extract browser/version, operating system, rendering engine, device vendor/model/type, CPU architecture, and known bot signals without a parsing API upload.',
      keywords: ['user agent parser online', 'online user agent parser', 'ua parser online', 'browser detection', 'device detection', 'bot detection'],
      faqs: [
        { question: 'How accurate is UA parsing?', answer: 'The tool uses the bundled UAParser.js 1.0.41 ruleset, but results remain heuristic because User-Agent strings are self-reported, reduced, and can be spoofed.' },
        { question: 'Can it detect bots?', answer: 'It identifies common named search and AI crawler tokens and applies a fallback bot/crawler/spider heuristic. An unlisted or disguised crawler can still be missed.' },
        { question: 'Can I parse multiple User-Agent strings?', answer: 'Yes. Enable batch mode and paste one User-Agent string per line to receive a JSON array of parsed results.' },
      ],
      answerSections: [
        {
          heading: 'What this online user-agent parser returns',
          paragraphs: [
            'Paste one user-agent string—or enable batch mode for one string per line—to parse browser name/version, operating system, rendering engine, device vendor/model/type, CPU architecture, and known bot signals. RFC 9110 defines User-Agent as a request field containing product identifiers and optional comments about the software originating a request. This tool reads those self-reported tokens; it does not contact the device or inspect the browser that submitted them.',
          ],
        },
        {
          heading: 'How detection works',
          bullets: [
            'The bundled UAParser.js 1.0.41 ruleset applies its browser, engine, OS, device, and CPU regular-expression data in the browser.',
            'The result exposes versions plus device vendor and model when the pasted string actually contains enough information.',
            'A separate bot layer recognizes named tokens such as Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, and Applebot, then applies a generic crawler keyword fallback.',
            'Use my User-Agent reads navigator.userAgent from this browser; batch mode parses one pasted string per line.',
          ],
        },
        {
          heading: 'Accuracy and limitations',
          paragraphs: [
            'Treat every result as a clue, not verified identity. User-agent strings can be changed or spoofed, compatibility tokens can name several browsers, and reduced strings may omit versions or device detail. Unknown values remain Unknown, while an unrecognized non-mobile string falls back to Desktop. Bot detection is also heuristic: an unlisted or disguised crawler can be missed, and an ordinary product name containing a crawler keyword can be flagged. Client Hints and capability detection can provide different or more useful signals when you control the application.',
          ],
        },
        {
          heading: 'Privacy and safe use',
          paragraphs: [
            'Parsing happens in your browser as you type. The input is not sent to a parsing API, but user-agent values can contribute to fingerprinting when combined with other data. Avoid treating this output as authentication, authorization, fraud proof, or a substitute for capability detection.',
          ],
        },
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
  const metaTitle = tool.metadataTitle || `${tool.name} - Free Online Tool`;

  return {
    title: metaTitle,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
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

  if (category !== canonicalCategory) {
    permanentRedirect(`/tools/${canonicalCategory}/${toolSlug}`);
  }

  const canonicalUrl = `${siteUrl}/tools/${canonicalCategory}/${toolSlug}`;
  const sources = getToolSources(toolSlug);
  const toolDetail = await getToolBySlug(toolSlug);
  const relatedTools = (toolDetail?.relatedTools || []).map((relatedTool) => ({
    name: relatedTool.name,
    description: relatedTool.shortDescription || `Open the ${relatedTool.name} tool.`,
    href: buildToolPath(relatedTool.categorySlug, relatedTool.slug),
  }));

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
    '@id': `${canonicalUrl}#application`,
    url: canonicalUrl,
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    dateModified: LAST_REVIEWED,
    citation: sources.map((source) => source.url),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const relatedToolsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tools related to ${tool.name}`,
    itemListElement: relatedTools.map((relatedTool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: relatedTool.name,
      url: `${siteUrl}${relatedTool.href}`,
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedToolsStructuredData) }}
      />

      <ToolPageWrapper
        toolSlug={toolSlug}
        category={category}
        categoryName={categoryNames[category] || category}
        defaultName={tool.name}
        defaultDescription={tool.longDescription}
        faqs={tool.faqs}
        sources={sources}
        answerSections={tool.answerSections || []}
        relatedTools={relatedTools}
        lastReviewed={LAST_REVIEWED}
        howToUseSteps={tool.howToUseSteps}
      >
        <ToolRenderer toolSlug={toolSlug} />
      </ToolPageWrapper>
    </div>
  );
}

