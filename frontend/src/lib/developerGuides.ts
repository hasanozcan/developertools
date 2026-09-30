import type { ToolSeoSection } from './toolSeoContent';
import { sha256Examples, unicodeExamples, uuidExamples } from './guideExamples';

export interface DeveloperGuide {
  slug: string;
  title: string;
  description: string;
  toolSlug: string;
  toolHref: string;
  toolName: string;
  collectionHref: string;
  sections: ToolSeoSection[];
  sources: { name: string; url: string }[];
}

export const developerGuides: DeveloperGuide[] = [
  {
    slug: 'verify-sha256-file-checksum',
    title: 'How to Verify a SHA-256 File Checksum',
    description:
      'Verify a downloaded file with SHA-256 in your browser, Windows, macOS, Linux, or Python. Learn what a checksum match proves and why mismatches happen.',
    toolSlug: 'sha256-hash',
    toolHref: '/tools/crypto/sha256-hash',
    toolName: 'SHA-256 Hash Generator',
    collectionHref: '/collections/hashing-checksums',
    sections: [
      {
        heading: 'Start with a checksum you can trust',
        paragraphs: [
          'A checksum comparison answers a specific question: do these file bytes produce the expected digest? Obtain the expected SHA-256 value from the software publisher or another trusted channel before checking your download. A digest copied from the same untrusted source as the file is not independent evidence of its origin.',
          'SHA-256 produces 32 bytes, usually written as 64 hexadecimal characters. Compare the complete value. A filename, a matching prefix, or a matching file size is not a checksum verification.',
        ],
      },
      {
        heading: 'Verify the file in your browser',
        bullets: [
          'Open the SHA-256 Hash Generator and select your downloaded file.',
          'Paste the trusted 64-character expected digest into the checksum field.',
          'Review the match or mismatch result. Uppercase and lowercase hexadecimal letters represent the same digest.',
          'If the values differ, stop using that copy and investigate the download, expected checksum, and selected file.',
        ],
        paragraphs: [
          'The tool hashes selected file bytes locally. It does not need to upload the file for this calculation. Browser hashing reads the file into memory; for large files, use a local terminal or the chunked Python example below.',
        ],
      },
      {
        heading: 'Check the same file from a terminal',
        paragraphs: [
          'Run the command for your operating system, replacing download.zip with the actual path. Compare the hash in the output with the publisher’s expected value; each command calculates a digest rather than authenticating the publisher.',
        ],
        codeExamples: [
          {
            title: 'Windows PowerShell',
            language: 'PowerShell',
            code: 'Get-FileHash -LiteralPath ".\\download.zip" -Algorithm SHA256',
          },
          { title: 'macOS', language: 'Shell', code: 'shasum -a 256 "download.zip"' },
          {
            title: 'Linux with GNU coreutils',
            language: 'Shell',
            code: 'sha256sum "download.zip"',
          },
        ],
      },
      {
        heading: 'Reproduce the calculation in JavaScript or Python',
        paragraphs: [
          'The JavaScript example creates an in-memory file containing exactly abc and hashes both its bytes and UTF-8 text bytes. Both logs should contain the same 64-character digest shown in the comment. Run browser Web Crypto examples on HTTPS or localhost.',
          'The Python example reads an existing download.zip in binary mode, one megabyte at a time. Change the filename before running it. Binary mode avoids changing line endings while reading the file.',
        ],
        codeExamples: sha256Examples,
      },
      {
        heading: 'Explain a mismatch before retrying',
        paragraphs: [
          'Check that the expected digest belongs to this exact release, platform, and file. Hash the archive itself if the publisher supplied an archive checksum, not an extracted member. A partial download, edited file, or different release changes the bytes.',
          'For text examples, abc and abc followed by a newline are different inputs. File hashing is not the same as hashing its filename or a text representation of its contents. A matching checksum supports integrity against the trusted expected value; it does not certify that software is harmless.',
        ],
      },
    ],
    sources: [
      {
        name: 'MDN Web Crypto digest',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest',
      },
      { name: 'Python hashlib', url: 'https://docs.python.org/3/library/hashlib.html' },
      {
        name: 'Microsoft Get-FileHash',
        url: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash',
      },
      {
        name: 'GNU sha2 utilities',
        url: 'https://www.gnu.org/software/coreutils/manual/html_node/sha2-utilities.html',
      },
    ],
  },
  {
    slug: 'decode-unicode-escapes',
    title: 'How to Decode Unicode Escapes in Text and JSON',
    description:
      'Decode Unicode escapes into readable text, handle emoji surrogate pairs, and distinguish JSON strings from JavaScript escape notation with working examples.',
    toolSlug: 'unicode-escape',
    toolHref: '/tools/encoding/unicode-escape',
    toolName: 'Unicode Escape Decoder',
    collectionHref: '/collections/encoding-conversion',
    sections: [
      {
        heading: 'Identify the escaped representation first',
        paragraphs: [
          'The literal sequence \\u0041 contains six visible characters and represents A in Unicode escape notation. A rendered A is already decoded. When investigating an API response or log, identify whether you have plain text containing escape notation, a JSON string value, or a full JSON document.',
          'The browser decoder recognizes \\uXXXX, JavaScript-style \\u{XXXXX}, and byte-style \\xXX sequences. JSON permits four-digit \\uXXXX escapes but does not permit \\u{1F600} or \\x41. Choose a parser that matches the source format.',
        ],
      },
      {
        heading: 'Decode a small sample in the tool',
        bullets: [
          'Open the Unicode Escape Decoder and choose Decode.',
          'Paste \\u0041\\u00E9\\uD83D\\uDE00 and select Convert. The result is Aé😀.',
          'Try \\u{1F600} or \\x41 separately. The tool produces 😀 or A; these forms are not valid JSON escapes.',
          'Inspect the output before copying it. Use a JSON parser for a complete JSON document and its other escape rules.',
        ],
        paragraphs: [
          'An emoji can appear as a UTF-16 surrogate pair: \\uD83D\\uDE00 represents the same character as the JavaScript code point \\u{1F600}. A lone surrogate is not a complete Unicode scalar value, so do not treat half of a pair as a valid emoji.',
        ],
      },
      {
        heading: 'Use JSON parsing for JSON input',
        paragraphs: [
          'These examples pass a complete quoted JSON string to the standard parser. The JavaScript String.raw tag and Python raw-string prefix keep the backslashes in the sample until JSON parsing runs. Neither example evaluates the input as program code.',
          'Parse a JSON response once, then read the resulting fields. Keep already readable characters such as Zürich intact. Blindly reinterpreting arbitrary UTF-8 text with a different codec can corrupt it.',
        ],
        codeExamples: unicodeExamples,
      },
      {
        heading: 'Troubleshoot invalid or double-escaped input',
        paragraphs: [
          'If JSON parsing fails, check quotation marks, invalid hexadecimal digits, incomplete four-digit escapes, and JavaScript-only notation. A text fragment without surrounding quotes is not a complete JSON string value.',
          'If backslash-u remains after parsing, it may be intentional text or another encoded layer. For example, a JSON value containing a doubled backslash preserves the literal escape notation. Inspect the producer’s format before decoding again; repeated decoding can change intended data.',
          'Escaping changes a representation. It does not encrypt the text or sanitize HTML. Display decoded text as text, and use the appropriate escaping rules if placing it into another format.',
        ],
      },
    ],
    sources: [
      {
        name: 'MDN JSON.parse',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
      },
      { name: 'Python JSON decoding', url: 'https://docs.python.org/3/library/json.html' },
      {
        name: 'RFC 8259 JSON strings',
        url: 'https://www.rfc-editor.org/rfc/rfc8259.html#section-7',
      },
    ],
  },
  {
    slug: 'uuid-v4-vs-v7',
    title: 'UUID v4 vs v7 and How to Generate Them',
    description:
      'Choose between random UUID v4 and timestamp-based UUID v7. Generate IDs with JavaScript or Python, and understand ordering, GUID formatting, and database limits.',
    toolSlug: 'uuid-generator',
    toolHref: '/tools/generators/uuid-generator',
    toolName: 'UUID v4 & v7 Generator',
    collectionHref: '/collections/unique-ids',
    sections: [
      {
        heading: 'Choose a version for the actual requirement',
        paragraphs: [
          'UUID v4 uses random payload bits and has no encoded creation time. It suits ordinary application identifiers when you do not need timestamp locality. UUID v7 begins with a Unix-millisecond timestamp and adds implementation-dependent payload bits. It can be useful when database keys should group around creation time.',
          'Both use the familiar 8-4-4-4-12 hexadecimal representation. In canonical text, the version digit is the first character of the third group: 4 for v4 and 7 for v7. GUID is a common name for this identifier family, not another version you must generate.',
        ],
      },
      {
        heading: 'Generate and export IDs in the browser',
        bullets: [
          'Open the UUID Generator and select v4 or v7.',
          'Choose a quantity from 1 to 1,000 and the formatting required by your destination.',
          'Generate the batch, then copy the newline-separated IDs or download the text file.',
          'Keep the canonical hyphenated form unless your destination explicitly expects uppercase, braces, or no hyphens.',
        ],
        paragraphs: [
          'The tool uses browser cryptographic randomness. Its v7 implementation fills the non-timestamp payload with random bits. IDs produced in the same millisecond are therefore not guaranteed to sort in generation order.',
        ],
      },
      {
        heading: 'Use native JavaScript and Python APIs',
        paragraphs: [
          'In a secure browser context, crypto.randomUUID() produces a UUID v4. It does not provide a v7 option. The JavaScript batch example generates five values without adding a dependency.',
          'Python provides uuid.uuid4(). The standard library adds uuid.uuid7() in Python 3.14, so the example checks availability before using it. Python’s v7 implementation has its own within-millisecond counter; do not assume it has identical ordering behavior to every browser or library implementation.',
        ],
        codeExamples: uuidExamples,
      },
      {
        heading: 'Evaluate database ordering and security separately',
        paragraphs: [
          'Timestamp locality can help some database index workloads, but changing UUID versions is not a guaranteed speed improvement. Measure inserts, storage, and query behavior with your actual database type and UUID representation. Preserve a uniqueness constraint and handle an insertion conflict.',
          'UUID v7 reveals its encoded timestamp. Clock adjustments and differences between generators matter when interpreting order. Use a dedicated timestamp or sequence when an application needs an authoritative event order.',
          'An identifier is not an authorization check. Do not grant access just because someone knows a UUID, and use a purpose-built secret token for password resets or other credentials.',
        ],
      },
    ],
    sources: [
      {
        name: 'RFC 9562 UUID versions 4 and 7',
        url: 'https://www.rfc-editor.org/rfc/rfc9562.html',
      },
      {
        name: 'MDN crypto.randomUUID',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID',
      },
      { name: 'Python uuid', url: 'https://docs.python.org/3/library/uuid.html' },
    ],
  },
];
