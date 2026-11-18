import type { Language } from '@/lib/i18nRouting';
import type { ToolSeoSection } from './toolSeoContent';
import {
  bcryptArgon2Examples,
  jsonSchemaExamples,
  jwtExamples,
  sha256Examples,
  unicodeExamples,
  uuidExamples,
} from './guideExamples';

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

export interface LocalizedGuideCopy {
  title: string;
  description: string;
  toolName: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
}

export interface GuidesUiCopy {
  indexMetaTitle: string;
  indexMetaDescription: string;
  indexEyebrow: string;
  indexHeading: string;
  indexLead: string;
  cardsEyebrow: string;
  cardsHeading: string;
  allGuidesLabel: string;
  readGuideLabel: string;
  homeBreadcrumb: string;
  guidesBreadcrumb: string;
  detailEyebrow: string;
  byLabel: string;
  examplesNote: string;
  openToolPrefix: string;
  sourcesHeading: string;
  onThisPage: string;
  exploreRelatedTools: string;
}

export const guidesUiCopy: Record<Language, GuidesUiCopy> = {
  en: {
    indexMetaTitle: 'Developer Guides with JavaScript and Python',
    indexMetaDescription:
      'Learn to verify SHA-256 checksums, decode Unicode escapes, choose UUID v4 or v7, verify JWT signatures, compare Bcrypt vs Argon2id, and validate JSON Schema.',
    indexEyebrow: 'Developer guides',
    indexHeading: 'Developer guides with working code examples',
    indexLead:
      'Follow a worked example, check the common failure cases, and continue in the matching browser tool. These guides cover checksums, escaped text, identifiers, JWT verification, password hashing, and JSON Schema validation.',
    cardsEyebrow: 'Learn by doing',
    cardsHeading: 'Practical developer guides',
    allGuidesLabel: 'All guides →',
    readGuideLabel: 'Read guide →',
    homeBreadcrumb: 'Home',
    guidesBreadcrumb: 'Developer guides',
    detailEyebrow: 'Practical guide',
    byLabel: 'By',
    examplesNote: 'Examples and primary references below',
    openToolPrefix: 'Open',
    sourcesHeading: 'Sources and references',
    onThisPage: 'On this page',
    exploreRelatedTools: 'Explore related tools →',
  },
  tr: {
    indexMetaTitle: 'JavaScript ve Python ile Geliştirici Rehberleri',
    indexMetaDescription:
      'SHA-256 dosya doğrulama, Unicode çözme, UUID v4/v7 seçimi, JWT imza doğrulama, Bcrypt ve Argon2id karşılaştırması ile JSON Schema doğrulama rehberleri.',
    indexEyebrow: 'Geliştirici rehberleri',
    indexHeading: 'Çalışan kod örnekleriyle geliştirici rehberleri',
    indexLead:
      'Adım adım örnekleri izleyin, sık yapılan hata senaryolarını inceleyin ve ilgili tarayıcı aracında hemen uygulayın. Rehberler sağlama toplamları, Unicode kaçışları, UUID, JWT doğrulama, parola özetleme ve JSON Schema konularını kapsar.',
    cardsEyebrow: 'Uygulayarak öğrenin',
    cardsHeading: 'Pratik geliştirici rehberleri',
    allGuidesLabel: 'Tüm rehberler →',
    readGuideLabel: 'Rehberi oku →',
    homeBreadcrumb: 'Ana Sayfa',
    guidesBreadcrumb: 'Geliştirici rehberleri',
    detailEyebrow: 'Pratik rehber',
    byLabel: 'Yazar:',
    examplesNote: 'Kod örnekleri ve birincil kaynaklar aşağıdadır',
    openToolPrefix: 'Aç:',
    sourcesHeading: 'Kaynaklar ve referanslar',
    onThisPage: 'Bu sayfada',
    exploreRelatedTools: 'İlgili araçları keşfet →',
  },
  de: {
    indexMetaTitle: 'Entwickler-Leitfäden mit JavaScript und Python',
    indexMetaDescription:
      'SHA-256-Prüfsummen verifizieren, Unicode-Escapes dekodieren, UUID v4 vs. v7 wählen, JWT-Signaturen prüfen, Bcrypt vs. Argon2id vergleichen und JSON Schema validieren.',
    indexEyebrow: 'Entwickler-Leitfäden',
    indexHeading: 'Entwickler-Leitfäden mit lauffähigen Codebeispielen',
    indexLead:
      'Folgen Sie praxisnahen Beispielen, prüfen Sie typische Fehlerquellen und testen Sie direkt im passenden Browser-Tool. Themen: Prüfsummen, Unicode, UUIDs, JWT-Signaturprüfung, Passwort-Hashing und JSON Schema.',
    cardsEyebrow: 'Praxisnah lernen',
    cardsHeading: 'Praktische Entwickler-Leitfäden',
    allGuidesLabel: 'Alle Leitfäden →',
    readGuideLabel: 'Leitfaden lesen →',
    homeBreadcrumb: 'Startseite',
    guidesBreadcrumb: 'Entwickler-Leitfäden',
    detailEyebrow: 'Praxisleitfaden',
    byLabel: 'Von',
    examplesNote: 'Beispiele und Primärquellen weiter unten',
    openToolPrefix: 'Öffnen:',
    sourcesHeading: 'Quellen und Referenzen',
    onThisPage: 'Auf dieser Seite',
    exploreRelatedTools: 'Verwandte Tools entdecken →',
  },
  es: {
    indexMetaTitle: 'Guías para desarrolladores con JavaScript y Python',
    indexMetaDescription:
      'Aprende a verificar sumas SHA-256, decodificar escapes Unicode, elegir UUID v4 o v7, verificar firmas JWT, comparar Bcrypt frente a Argon2id y validar JSON Schema.',
    indexEyebrow: 'Guías para desarrolladores',
    indexHeading: 'Guías prácticas con ejemplos de código reales',
    indexLead:
      'Sigue un ejemplo paso a paso, revisa los fallos más frecuentes y continúa en la herramienta del navegador correspondiente. Cubre checksums, texto escapado, UUID, JWT, hashing de contraseñas y JSON Schema.',
    cardsEyebrow: 'Aprende practicando',
    cardsHeading: 'Guías prácticas para desarrolladores',
    allGuidesLabel: 'Todas las guías →',
    readGuideLabel: 'Leer guía →',
    homeBreadcrumb: 'Inicio',
    guidesBreadcrumb: 'Guías para desarrolladores',
    detailEyebrow: 'Guía práctica',
    byLabel: 'Por',
    examplesNote: 'Ejemplos y referencias principales abajo',
    openToolPrefix: 'Abrir',
    sourcesHeading: 'Fuentes y referencias',
    onThisPage: 'En esta página',
    exploreRelatedTools: 'Explorar herramientas relacionadas →',
  },
  fr: {
    indexMetaTitle: 'Guides développeur avec JavaScript et Python',
    indexMetaDescription:
      'Apprenez à vérifier des sommes SHA-256, décoder des séquences Unicode, choisir UUID v4 ou v7, vérifier des signatures JWT, comparer Bcrypt et Argon2id et valider JSON Schema.',
    indexEyebrow: 'Guides développeur',
    indexHeading: 'Guides développeur avec exemples de code fonctionnels',
    indexLead:
      'Suivez des exemples concrets, anticipez les erreurs courantes et poursuivez dans l’outil navigateur associé : sommes de contrôle, échappements Unicode, UUID, JWT, hachage de mots de passe et JSON Schema.',
    cardsEyebrow: 'Apprendre par la pratique',
    cardsHeading: 'Guides pratiques pour développeurs',
    allGuidesLabel: 'Tous les guides →',
    readGuideLabel: 'Lire le guide →',
    homeBreadcrumb: 'Accueil',
    guidesBreadcrumb: 'Guides développeur',
    detailEyebrow: 'Guide pratique',
    byLabel: 'Par',
    examplesNote: 'Exemples et références principales ci-dessous',
    openToolPrefix: 'Ouvrir',
    sourcesHeading: 'Sources et références',
    onThisPage: 'Sur cette page',
    exploreRelatedTools: 'Découvrir les outils associés →',
  },
  ru: {
    indexMetaTitle: 'Руководства разработчика на JavaScript и Python',
    indexMetaDescription:
      'Проверка SHA-256, декодирование Unicode, выбор UUID v4 или v7, проверка подписей JWT, сравнение Bcrypt и Argon2id и валидация JSON Schema с примерами кода.',
    indexEyebrow: 'Руководства разработчика',
    indexHeading: 'Практические руководства с рабочими примерами кода',
    indexLead:
      'Изучите готовые примеры, разберите типичные ошибки и перейдите к нужному браузерному инструменту: контрольные суммы, Unicode, UUID, подписи JWT, хеширование паролей и JSON Schema.',
    cardsEyebrow: 'Обучение на практике',
    cardsHeading: 'Практические руководства',
    allGuidesLabel: 'Все руководства →',
    readGuideLabel: 'Читать руководство →',
    homeBreadcrumb: 'Главная',
    guidesBreadcrumb: 'Руководства разработчика',
    detailEyebrow: 'Практическое руководство',
    byLabel: 'Автор:',
    examplesNote: 'Примеры кода и первоисточники ниже',
    openToolPrefix: 'Открыть',
    sourcesHeading: 'Источники и справочники',
    onThisPage: 'На этой странице',
    exploreRelatedTools: 'Связанные инструменты →',
  },
  zh: {
    indexMetaTitle: 'JavaScript 与 Python 开发者实战指南',
    indexMetaDescription:
      '学习校验 SHA-256 文件摘要、解码 Unicode 转义、选择 UUID v4 或 v7、验证 JWT 签名、对比 Bcrypt 与 Argon2id 以及校验 JSON Schema。',
    indexEyebrow: '开发者指南',
    indexHeading: '附带可运行代码示例的开发者指南',
    indexLead:
      '结合完整代码示例与常见排错要点，并直接在匹配的浏览器工具中动手验证。涵盖文件校验和、Unicode 转义、UUID、JWT 签名验证、密码哈希与 JSON Schema 校验。',
    cardsEyebrow: '边做边学',
    cardsHeading: '实用开发者指南',
    allGuidesLabel: '全部指南 →',
    readGuideLabel: '阅读指南 →',
    homeBreadcrumb: '首页',
    guidesBreadcrumb: '开发者指南',
    detailEyebrow: '实战指南',
    byLabel: '作者：',
    examplesNote: '代码示例与权威参考如下',
    openToolPrefix: '打开',
    sourcesHeading: '参考资料与标准',
    onThisPage: '本页目录',
    exploreRelatedTools: '浏览相关工具 →',
  },
};

export function getGuidesUiCopy(locale: Language = 'en'): GuidesUiCopy {
  return guidesUiCopy[locale] || guidesUiCopy.en;
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
  {
    slug: 'jwt-signature-verification-guide',
    title: 'How to Verify a JWT Signature and Claims Safely',
    description:
      'Understand the difference between decoding a JWT and verifying its cryptographic signature, avoid alg=none pitfalls, and verify HS256 tokens in JavaScript and Python.',
    toolSlug: 'jwt-decoder',
    toolHref: '/tools/encoding/jwt-decoder',
    toolName: 'JWT Decoder, Signer & Verifier',
    collectionHref: '/collections/jwt-authentication',
    sections: [
      {
        heading: 'Decoding a JWT does not prove authenticity',
        paragraphs: [
          'A JSON Web Token consists of three Base64url-encoded segments separated by dots: header, payload, and signature. Because Base64url is reversible encoding rather than encryption, anyone holding a token can decode its claims.',
          'Never trust claims such as sub, role, or exp until your backend verifies the signature against a pinned expected algorithm (such as HS256, RS256, or ES256) and a trusted verification key.',
        ],
      },
      {
        heading: 'Inspect and test signatures in the browser',
        bullets: [
          'Open the JWT Decoder, Signer & Verifier and paste a test token.',
          'Review the header alg/kid and payload timestamps (iat, nbf, exp).',
          'Provide your test HMAC secret or public key to check signature validity locally.',
          'Never paste production bearer tokens or private signing keys on shared devices.',
        ],
        paragraphs: [
          'All token parsing and Web Crypto verification happens locally in browser memory with zero network calls.',
        ],
      },
      {
        heading: 'Verify HS256 signatures in JavaScript and Python',
        paragraphs: [
          'Always enforce an explicit algorithm allowlist before checking the signature so an attacker cannot downgrade RS256 to HS256 or pass alg: "none". Compare signatures in constant time and validate exp, iss, and aud.',
        ],
        codeExamples: jwtExamples,
      },
    ],
    sources: [
      { name: 'RFC 7519: JSON Web Token (JWT)', url: 'https://www.rfc-editor.org/rfc/rfc7519' },
      { name: 'RFC 8725: JWT Best Current Practices', url: 'https://www.rfc-editor.org/rfc/rfc8725' },
      {
        name: 'MDN SubtleCrypto.verify()',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify',
      },
    ],
  },
  {
    slug: 'bcrypt-vs-argon2-hashing',
    title: 'Bcrypt vs Argon2id Password Hashing',
    description:
      'Compare Bcrypt cost factors against Argon2id memory-hard parameters, read PHC hash strings, and configure password verification in JavaScript and Python.',
    toolSlug: 'bcrypt-generator',
    toolHref: '/tools/crypto/bcrypt-generator',
    toolName: 'Bcrypt Generator & Verifier',
    collectionHref: '/collections/passwords-secrets',
    sections: [
      {
        heading: 'Why memory-hard KDFs outperform fast hashes for passwords',
        paragraphs: [
          'General-purpose digests like SHA-256 are built for speed, allowing attackers with GPUs or ASICs to test billions of passwords per second. Password hashing requires a deliberately slow, salted key derivation function.',
          'Argon2id (RFC 9106) is recommended by OWASP for new applications because it resists both GPU cracking (via configurable memory cost) and side-channel attacks. Bcrypt remains widely deployed and acceptable when configured with a cost factor of 10–12+ and inputs under 72 bytes.',
        ],
      },
      {
        heading: 'Generate and inspect salted hashes locally',
        bullets: [
          'Open the Bcrypt Generator & Verifier to test cost factors ($2a$/$2b$) or the Argon2 Password Hash Formatter to tune m, t, and p.',
          'Verify how two hashes of the same password differ because each embeds a unique random salt.',
          'Benchmark target verification latency (typically 100–300 ms) on your production server hardware before raising cost parameters.',
        ],
        paragraphs: [
          'Remember Bcrypt truncates passwords after 72 UTF-8 bytes; pre-hashing or choosing Argon2id avoids silent truncation.',
        ],
      },
      {
        heading: 'Inspect PHC strings and verify passwords in code',
        paragraphs: [
          'Standard PHC strings encode the algorithm, version, cost parameters, salt, and digest in one portable string so you can upgrade parameters on login via check_needs_rehash.',
        ],
        codeExamples: bcryptArgon2Examples,
      },
    ],
    sources: [
      {
        name: 'RFC 9106: Argon2 Memory-Hard Function',
        url: 'https://www.rfc-editor.org/rfc/rfc9106',
      },
      {
        name: 'OWASP Password Storage Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
      },
      {
        name: 'NIST SP 800-63B: Memorized Secret Verifiers',
        url: 'https://pages.nist.gov/800-63-4/sp800-63b.html',
      },
    ],
  },
  {
    slug: 'json-schema-validation-guide',
    title: 'JSON Schema Validation (Draft 2020-12)',
    description:
      'Validate JSON payloads against JSON Schema rules, catch missing required keys or unexpected properties, and enforce strict API contracts in JavaScript and Python.',
    toolSlug: 'json-schema-validator',
    toolHref: '/tools/json/json-schema-validator',
    toolName: 'JSON Schema Validator',
    collectionHref: '/collections/json-development',
    sections: [
      {
        heading: 'Define explicit object contracts with JSON Schema',
        paragraphs: [
          'Syntax validation confirms only that JSON parses without errors. JSON Schema goes further by enforcing data types, required fields, numeric bounds, string formats, and enum allowlists at API boundaries.',
          'Always pair required with additionalProperties: false (or unevaluatedProperties: false) on strict endpoints so typos in optional client fields fail fast instead of being silently ignored.',
        ],
      },
      {
        heading: 'Validate payloads and format schemas in your browser',
        bullets: [
          'Open the JSON Schema Validator and paste both your schema and sample JSON payload.',
          'Inspect exact JSON Pointer error paths for every failing constraint.',
          'Use the JSON Formatter alongside validation to normalize indentation before committing schemas.',
        ],
        paragraphs: [
          'Browser-side validation keeps internal request payloads and proprietary schemas local without sending data to external APIs.',
        ],
      },
      {
        heading: 'Run schema checks in JavaScript and Python',
        paragraphs: [
          'Validate untrusted input at ingress and collect all validation errors so API consumers receive actionable diagnostics in a single response.',
        ],
        codeExamples: jsonSchemaExamples,
      },
    ],
    sources: [
      {
        name: 'JSON Schema Specification (Draft 2020-12)',
        url: 'https://json-schema.org/draft/2020-12/json-schema-core',
      },
      {
        name: 'RFC 8259: The JSON Data Interchange Format',
        url: 'https://www.rfc-editor.org/rfc/rfc8259',
      },
      {
        name: 'Python jsonschema Documentation',
        url: 'https://python-jsonschema.readthedocs.io/',
      },
    ],
  },
];

export const localizedGuideContent: Record<
  string,
  Record<Exclude<Language, 'en'>, LocalizedGuideCopy>
> = {
  'verify-sha256-file-checksum': {
    tr: {
      title: 'SHA-256 Dosya Sağlama Toplamı Nasıl Doğrulanır?',
      description:
        'İndirilen bir dosyayı tarayıcıda, Windows, macOS, Linux veya Python ile SHA-256 üzerinden doğrulayın; eşleşmenin neyi kanıtladığını ve uyuşmazlık nedenlerini öğrenin.',
      toolName: 'SHA-256 Özet Oluşturucu',
      sections: [
        {
          heading: 'Güvenilir bir sağlama toplamıyla başlayın',
          paragraphs: [
            'Sağlama toplamı karşılaştırması şu soruyu yanıtlar: Bu dosya baytları beklenen özeti üretiyor mu? İndirdiğiniz dosyayı kontrol etmeden önce beklenen SHA-256 değerini doğrudan yazılım yayıncısından veya güvenilir bir kanaldan edinin.',
            'SHA-256 çıktısı genellikle 64 onaltılık karakter olarak yazılan 32 bayttır. Değerin tamamını karşılaştırın; yalnızca dosya adı veya dosya boyutu doğrulama sayılmaz.',
          ],
        },
        {
          heading: 'Dosyayı tarayıcınızda doğrulayın',
          bullets: [
            'SHA-256 Özet Oluşturucu aracını açın ve indirilen dosyayı seçin.',
            'Güvenilir 64 karakterlik beklenen özeti karşılaştırma alanına yapıştırın.',
            'Eşleşme sonucunu inceleyin. Büyük ve küçük onaltılık harfler aynı özeti temsil eder.',
            'Değerler farklıysa o kopyayı kullanmayın ve indirme kaynağını kontrol edin.',
          ],
          paragraphs: [
            'Araç seçilen dosya baytlarını yerel olarak özetler ve sunucuya dosya yüklemez. Çok büyük dosyalar için yerel terminal veya parçalı Python örneğini kullanın.',
          ],
        },
        {
          heading: 'Aynı dosyayı terminalden kontrol edin',
          paragraphs: [
            'İşletim sisteminize uygun komutu download.zip yerine gerçek dosya yolunu yazarak çalıştırın ve çıktıyı yayıncının beklenen değeriyle karşılaştırın.',
          ],
        },
        {
          heading: 'Hesaplamayı JavaScript veya Python ile yineleyin',
          paragraphs: [
            'JavaScript örneği bellekte tam olarak abc içeren bir dosya oluşturur ve Web Crypto ile özetler. Python örneği ise download.zip dosyasını 1 MB parçalar halinde ikili kipte okuyarak bellek taşmasını önler.',
          ],
        },
        {
          heading: 'Yeniden denemeden önce uyuşmazlığı açıklayın',
          paragraphs: [
            'Beklenen özetin tam olarak bu sürüm ve platforma ait olduğundan emin olun. Yayıncı arşiv özeti verdiyse içindeki dosyayı değil arşivin kendisini özetleyin.',
          ],
        },
      ],
    },
    de: {
      title: 'SHA-256-Dateiprüfsumme richtig überprüfen',
      description:
        'Überprüfen Sie heruntergeladene Dateien mit SHA-256 im Browser, unter Windows, macOS, Linux oder Python und verstehen Sie Ursachen von Prüfsummen-Abweichungen.',
      toolName: 'SHA-256-Hash-Generator',
      sections: [
        {
          heading: 'Mit einer vertrauenswürdigen Prüfsumme starten',
          paragraphs: [
            'Ein Prüfsummenvergleich beantwortet, ob die Dateibytes exakt den erwarteten Hash ergeben. Besorgen Sie den erwarteten SHA-256-Wert direkt beim Herausgeber über einen unabhängigen Kanal.',
            'SHA-256 erzeugt 32 Bytes (64 Hex-Zeichen). Vergleichen Sie stets den vollständigen Hash, nicht nur Präfixe oder Dateigrößen.',
          ],
        },
        {
          heading: 'Datei lokal im Browser prüfen',
          bullets: [
            'Öffnen Sie den SHA-256-Hash-Generator und wählen Sie die heruntergeladene Datei aus.',
            'Fügen Sie den erwarteten 64-stelligen Hash in das Vergleichsfeld ein.',
            'Prüfen Sie das Ergebnis (Groß-/Kleinschreibung spielt bei Hex keine Rolle).',
            'Verwenden Sie bei Abweichungen die Datei nicht und prüfen Sie Download sowie Quelle.',
          ],
          paragraphs: [
            'Die Berechnung erfolgt vollständig lokal im Browser ohne Upload. Für sehr große Dateien empfiehlt sich ein Terminal oder das Python-Beispiel.',
          ],
        },
        {
          heading: 'Prüfsumme im Terminal berechnen',
          paragraphs: [
            'Führen Sie den passenden Befehl für Ihr Betriebssystem aus und vergleichen Sie die Ausgabe mit dem erwarteten Wert.',
          ],
        },
        {
          heading: 'Berechnung in JavaScript oder Python nachvollziehen',
          paragraphs: [
            'Das JavaScript-Beispiel nutzt Web Crypto auf HTTPS/localhost; das Python-Skript liest download.zip binär in 1-MB-Blöcken.',
          ],
        },
        {
          heading: 'Abweichungen vor dem erneuten Download klären',
          paragraphs: [
            'Stellen Sie sicher, dass der Vergleichswert exakt zu Archiv, Plattform und Release passt.',
          ],
        },
      ],
    },
    es: {
      title: 'Cómo verificar una suma de comprobación SHA-256',
      description:
        'Verifica archivos descargados con SHA-256 en tu navegador, Windows, macOS, Linux o Python y comprende qué demuestra una coincidencia.',
      toolName: 'Generador de hash SHA-256',
      sections: [
        {
          heading: 'Comienza con una suma de comprobación confiable',
          paragraphs: [
            'Comparar una suma verifica si los bytes del archivo producen el resumen esperado. Obtén el valor SHA-256 esperado directamente del editor del software antes de comprobar la descarga.',
            'SHA-256 genera 32 bytes representados en 64 caracteres hexadecimales. Compara siempre el valor completo.',
          ],
        },
        {
          heading: 'Verifica el archivo en el navegador',
          bullets: [
            'Abre el Generador de hash SHA-256 y selecciona tu archivo.',
            'Pega el resumen esperado de 64 caracteres en el campo de verificación.',
            'Revisa si coincide; mayúsculas y minúsculas hexadecimales son equivalentes.',
            'Si no coincide, detén su uso y revisa la descarga.',
          ],
          paragraphs: [
            'El cálculo se ejecuta localmente sin subir el archivo. Para archivos muy grandes usa la terminal o Python por bloques.',
          ],
        },
        {
          heading: 'Comprueba el mismo archivo desde la terminal',
          paragraphs: [
            'Ejecuta el comando correspondiente a tu sistema operativo sustituyendo download.zip por tu ruta real.',
          ],
        },
        {
          heading: 'Reproduce el cálculo en JavaScript o Python',
          paragraphs: [
            'El ejemplo JavaScript usa Web Crypto y el ejemplo Python lee el archivo en bloques binarios de 1 MB.',
          ],
        },
        {
          heading: 'Explica cualquier discrepancia antes de reintentar',
          paragraphs: [
            'Confirma que la suma pertenezca exactamente al archivo comprimido, versión y plataforma descargados.',
          ],
        },
      ],
    },
    fr: {
      title: 'Comment vérifier une somme de contrôle SHA-256',
      description:
        'Vérifiez un fichier téléchargé avec SHA-256 dans votre navigateur, sous Windows, macOS, Linux ou Python et comprenez les causes d’écart.',
      toolName: 'Générateur de hash SHA-256',
      sections: [
        {
          heading: 'Partir d’une empreinte de confiance',
          paragraphs: [
            'Comparer une somme vérifie si les octets du fichier produisent bien l’empreinte attendue. Récupérez la valeur SHA-256 officielle auprès de l’éditeur.',
            'SHA-256 produit 32 octets, soit 64 caractères hexadécimaux à comparer intégralement.',
          ],
        },
        {
          heading: 'Vérifier le fichier dans votre navigateur',
          bullets: [
            'Ouvrez le Générateur de hash SHA-256 et sélectionnez votre fichier.',
            'Collez l’empreinte attendue sur 64 caractères dans le champ de comparaison.',
            'Contrôlez le résultat (majuscules et minuscules sont équivalentes).',
            'En cas d’écart, n’exécutez pas le fichier et vérifiez la source.',
          ],
          paragraphs: [
            'Le hachage s’exécute localement sans téléverser le fichier. Pour les fichiers volumineux, utilisez le terminal ou Python par blocs.',
          ],
        },
        {
          heading: 'Contrôler le fichier en ligne de commande',
          paragraphs: [
            'Exécutez la commande adaptée à votre système en remplaçant download.zip par votre chemin.',
          ],
        },
        {
          heading: 'Reproduire le calcul en JavaScript ou Python',
          paragraphs: [
            'L’exemple JavaScript utilise Web Crypto ; l’exemple Python lit le fichier binaire par tranches de 1 Mo.',
          ],
        },
        {
          heading: 'Analyser une discordance avant de réessayer',
          paragraphs: [
            'Vérifiez que l’empreinte correspond exactement à cette archive, cette version et cette plateforme.',
          ],
        },
      ],
    },
    ru: {
      title: 'Как проверить контрольную сумму файла SHA-256',
      description:
        'Проверьте скачанный файл по SHA-256 в браузере, Windows, macOS, Linux или Python и узнайте причины несовпадения хешей.',
      toolName: 'Генератор хеша SHA-256',
      sections: [
        {
          heading: 'Начните с доверенной контрольной суммы',
          paragraphs: [
            'Сравнение контрольной суммы показывает, дают ли байты файла ожидаемый дайджест. Получите эталонное значение SHA-256 от издателя программы до начала проверки.',
            'SHA-256 формирует 32 байта (64 шестнадцатеричных символа). Сравнивайте строку полностью.',
          ],
        },
        {
          heading: 'Проверьте файл в браузере',
          bullets: [
            'Откройте генератор SHA-256 и выберите скачанный файл.',
            'Вставьте эталонный 64-символьный хеш в поле сравнения.',
            'Убедитесь в совпадении (регистр букв в hex значения не имеет).',
            'При расхождении не запускайте файл и проверьте источник загрузки.',
          ],
          paragraphs: [
            'Хеширование выполняется локально без отправки файла на сервер. Для больших образов используйте терминал или потоковый Python.',
          ],
        },
        {
          heading: 'Проверка файла из терминала',
          paragraphs: [
            'Выполните команду для вашей ОС, подставив путь к файлу вместо download.zip.',
          ],
        },
        {
          heading: 'Повторите расчёт на JavaScript или Python',
          paragraphs: [
            'Пример JavaScript использует Web Crypto API, а скрипт Python читает файл блоками по 1 МБ в бинарном режиме.',
          ],
        },
        {
          heading: 'Разберите причину несовпадения перед повтором',
          paragraphs: [
            'Убедитесь, что эталонный хеш относится именно к этому архиву, версии и платформе.',
          ],
        },
      ],
    },
    zh: {
      title: '如何校验文件的 SHA-256 校验和',
      description:
        '在浏览器、Windows、macOS、Linux 或 Python 中使用 SHA-256 校验下载文件，了解校验匹配的意义与常见失配原因。',
      toolName: 'SHA-256 哈希生成器',
      sections: [
        {
          heading: '先获取可信的期望校验和',
          paragraphs: [
            '校验和比对用于确认文件字节是否生成预期摘要。校验前请先从软件发布方或可信渠道获取完整的 64 位十六进制 SHA-256 值。',
          ],
        },
        {
          heading: '在浏览器中本地校验文件',
          bullets: [
            '打开 SHA-256 哈希生成器并选择已下载的本地文件。',
            '将可信的 64 位期望摘要粘贴到比对输入框。',
            '查看匹配结果（十六进制大小写等价）。',
            '若结果不一致，请立即停止使用该副本并核对下载来源。',
          ],
          paragraphs: [
            '工具会在本地计算文件字节摘要而不会上传文件；超大文件建议使用终端命令或分块读取的 Python 脚本。',
          ],
        },
        {
          heading: '在终端中校验同一文件',
          paragraphs: ['根据您的操作系统运行对应命令，并将 download.zip 替换为实际文件路径。'],
        },
        {
          heading: '用 JavaScript 或 Python 复现计算',
          paragraphs: [
            'JavaScript 示例在浏览器 Web Crypto 中计算摘要；Python 示例以二进制模式每次读取 1 MB，避免行尾转换或内存溢出。',
          ],
        },
        {
          heading: '重试前先排查失配原因',
          paragraphs: ['确认期望摘要与当前发行版、平台架构及压缩包层级完全对应。'],
        },
      ],
    },
  },
  'decode-unicode-escapes': {
    tr: {
      title: 'Metin ve JSON İçindeki Unicode Kaçışları Nasıl Çözülür?',
      description:
        'Unicode kaçış dizilerini okunabilir metne dönüştürün, emoji vekil çiftlerini işleyin ve çalışan örneklerle JSON dizelerini JavaScript kaçışlarından ayırt edin.',
      toolName: 'Unicode Kaçış Çözücü',
      sections: [
        {
          heading: 'Önce kaçış biçimini belirleyin',
          paragraphs: [
            '\\u0041 dizisi altı görünür karakter içerir ve Unicode kaçış gösteriminde A harfini temsil eder. Tarayıcı çözücüsü \\uXXXX, JavaScript tarzı \\u{XXXXX} ve \\xXX biçimlerini tanır; ancak JSON yalnızca dört haneli \\uXXXX kaçışlarına izin verir.',
          ],
        },
        {
          heading: 'Araçta küçük bir örneği çözün',
          bullets: [
            'Unicode Kaçış Çözücüyü açın ve Çöz (Decode) kipini seçin.',
            '\\u0041\\u00E9\\uD83D\\uDE00 değerini yapıştırıp dönüştürün; sonuç Aé😀 olur.',
            '\\u{1F600} veya \\x41 örneklerini deneyin; bunların geçerli JSON kaçışı olmadığını unutmayın.',
            'Tam JSON belgeleri için mutlaka bir JSON ayrıştırıcısı kullanın.',
          ],
          paragraphs: [
            'Emojiler UTF-16 vekil çifti (surrogate pair) olarak görünebilir: \\uD83D\\uDE00 ile \\u{1F600} aynı karakteri ifade eder.',
          ],
        },
        {
          heading: 'JSON girdileri için JSON ayrıştırma kullanın',
          paragraphs: [
            'Örnekler tırnaklı tam JSON dizesini standart ayrıştırıcıya verir; Zürich gibi halihazırda okunabilir karakterleri bozmaz.',
          ],
        },
        {
          heading: 'Geçersiz veya çift kaçışlı girdileri giderme',
          paragraphs: [
            'Ayrıştırma başarısız olursa tırnak işaretlerini, eksik dört haneli kaçışları ve çift ters eğik çizgi katmanlarını kontrol edin. Kaçış çözme şifreleme değildir; çözülen metni HTML içine yerleştirirken uygun biçim kurallarını uygulayın.',
          ],
        },
      ],
    },
    de: {
      title: 'Unicode-Escapes in Text und JSON dekodieren',
      description:
        'Dekodieren Sie Unicode-Escapes in lesbaren Text, behandeln Sie Emoji-Surrogate-Paare und unterscheiden Sie JSON-Strings von JavaScript-Escape-Notation.',
      toolName: 'Unicode-Escape-Decoder',
      sections: [
        {
          heading: 'Escape-Darstellung zuerst identifizieren',
          paragraphs: [
            'Die Sequenz \\u0041 steht für das Zeichen A. Der Browser-Decoder erkennt \\uXXXX, \\u{XXXXX} und \\xXX; JSON selbst erlaubt jedoch nur vierstellige \\uXXXX-Escapes.',
          ],
        },
        {
          heading: 'Beispiel im Werkzeug dekodieren',
          bullets: [
            'Öffnen Sie den Unicode-Escape-Decoder und wählen Sie Dekodieren.',
            'Fügen Sie \\u0041\\u00E9\\uD83D\\uDE00 ein; das Ergebnis lautet Aé😀.',
            'Testen Sie \\u{1F600} oder \\x41 separat (keine gültigen JSON-Escapes).',
            'Verwenden Sie für komplette JSON-Dokumente einen echten JSON-Parser.',
          ],
          paragraphs: [
            'Ein Emoji kann als UTF-16-Surrogate-Paar (\\uD83D\\uDE00) auftreten, was demselben Codepunkt wie \\u{1F600} entspricht.',
          ],
        },
        {
          heading: 'JSON-Eingaben mit JSON.parse verarbeiten',
          paragraphs: [
            'Die Codebeispiele übergeben einen vollständigen JSON-String an den Standard-Parser und lassen bestehende UTF-8-Zeichen wie Zürich unverändert.',
          ],
        },
        {
          heading: 'Ungültige oder doppelt maskierte Eingaben beheben',
          paragraphs: [
            'Prüfen Sie bei Fehlern Anführungszeichen, unvollständige Hex-Sequenzen und doppelte Backslashes.',
          ],
        },
      ],
    },
    es: {
      title: 'Cómo decodificar escapes Unicode en texto y JSON',
      description:
        'Convierte escapes Unicode en texto legible, gestiona pares sustitutos de emojis y distingue cadenas JSON de la notación de JavaScript.',
      toolName: 'Decodificador de escapes Unicode',
      sections: [
        {
          heading: 'Identifica primero la representación escapada',
          paragraphs: [
            'La secuencia literal \\u0041 representa A. El decodificador reconoce \\uXXXX, \\u{XXXXX} y \\xXX, mientras que JSON solo admite \\uXXXX de cuatro dígitos.',
          ],
        },
        {
          heading: 'Decodifica una muestra en la herramienta',
          bullets: [
            'Abre el Decodificador de escapes Unicode en modo Decodificar.',
            'Pega \\u0041\\u00E9\\uD83D\\uDE00 y convierte; obtendrás Aé😀.',
            'Prueba \\u{1F600} o \\x41 aparte y recuerda que no son escapes JSON válidos.',
            'Usa un analizador JSON para documentos JSON completos.',
          ],
          paragraphs: [
            'Un emoji puede expresarse como par sustituto UTF-16 (\\uD83D\\uDE00), equivalente al punto de código \\u{1F600}.',
          ],
        },
        {
          heading: 'Usa un parser JSON para entradas JSON',
          paragraphs: [
            'Los ejemplos pasan una cadena JSON entrecomillada al analizador estándar sin alterar caracteres legibles como Zürich.',
          ],
        },
        {
          heading: 'Soluciona entradas inválidas o con doble escape',
          paragraphs: [
            'Si falla el análisis, revisa comillas, dígitos hexadecimales incompletos y barras invertidas duplicadas.',
          ],
        },
      ],
    },
    fr: {
      title: 'Comment décoder les séquences Unicode dans le texte et le JSON',
      description:
        'Décodez les séquences Unicode en texte lisible, gérez les paires de substitution d’emojis et distinguez les chaînes JSON de la syntaxe JavaScript.',
      toolName: 'Décodeur d’échappement Unicode',
      sections: [
        {
          heading: 'Identifier d’abord le format d’échappement',
          paragraphs: [
            'La séquence \\u0041 représente A. L’outil reconnaît \\uXXXX, \\u{XXXXX} et \\xXX, mais JSON n’autorise que les séquences \\uXXXX à quatre chiffres.',
          ],
        },
        {
          heading: 'Décoder un exemple dans l’outil',
          bullets: [
            'Ouvrez le Décodeur d’échappement Unicode en mode Décoder.',
            'Collez \\u0041\\u00E9\\uD83D\\uDE00 pour obtenir Aé😀.',
            'Testez \\u{1F600} ou \\x41 séparément (non valides en JSON).',
            'Utilisez un parseur JSON pour les documents JSON complets.',
          ],
          paragraphs: [
            'Un emoji peut apparaître sous forme de paire de substitution UTF-16 (\\uD83D\\uDE00), équivalente à \\u{1F600}.',
          ],
        },
        {
          heading: 'Utiliser JSON.parse pour les données JSON',
          paragraphs: [
            'Les exemples transmettent une chaîne JSON complète au parseur standard tout en préservant les caractères comme Zürich.',
          ],
        },
        {
          heading: 'Corriger les entrées invalides ou doublement échappées',
          paragraphs: [
            'Vérifiez les guillemets, séquences hexadécimales incomplètes et antislashs doublés.',
          ],
        },
      ],
    },
    ru: {
      title: 'Как декодировать Unicode-последовательности в тексте и JSON',
      description:
        'Преобразуйте escape-последовательности Unicode в читаемый текст, разберите суррогатные пары эмодзи и отличите синтаксис JSON от JavaScript.',
      toolName: 'Декодер Unicode-последовательностей',
      sections: [
        {
          heading: 'Сначала определите формат экранирования',
          paragraphs: [
            'Последовательность \\u0041 означает символ A. Декодер поддерживает \\uXXXX, \\u{XXXXX} и \\xXX, но стандарт JSON разрешает только четырёхзначные \\uXXXX.',
          ],
        },
        {
          heading: 'Декодируйте пример в инструменте',
          bullets: [
            'Откройте декодер Unicode в режиме декодирования.',
            'Вставьте \\u0041\\u00E9\\uD83D\\uDE00 и нажмите конвертацию — получите Aé😀.',
            'Проверьте \\u{1F600} или \\x41 отдельно (они не поддерживаются в JSON).',
            'Для целых JSON-документов используйте полноценный JSON-парсер.',
          ],
          paragraphs: [
            'Эмодзи в UTF-16 могут записываться суррогатной парой \\uD83D\\uDE00, эквивалентной кодовой точке \\u{1F600}.',
          ],
        },
        {
          heading: 'Разбор JSON стандартным парсером',
          paragraphs: [
            'Примеры передают корректную строку в кавычках в JSON.parse и json.loads, сохраняя символы вроде Zürich.',
          ],
        },
        {
          heading: 'Исправление ошибок и двойного экранирования',
          paragraphs: [
            'Проверьте кавычки, неполные hex-коды и удвоенные обратные слеши перед повторным декодированием.',
          ],
        },
      ],
    },
    zh: {
      title: '如何在文本与 JSON 中解码 Unicode 转义字符',
      description:
        '将 Unicode 转义序列还原为可读文本，正确处理 Emoji 代理对，并结合代码区分 JSON 字符串与 JavaScript 转义语法。',
      toolName: 'Unicode 转义解码器',
      sections: [
        {
          heading: '先识别转义表示形式',
          paragraphs: [
            '字面序列 \\u0041 表示字符 A。浏览器解码器支持 \\uXXXX、JavaScript 的 \\u{XXXXX} 以及 \\xXX，但标准 JSON 仅允许四位十六进制 \\uXXXX。',
          ],
        },
        {
          heading: '在工具中解码示例',
          bullets: [
            '打开 Unicode 转义解码器并选择解码模式。',
            '粘贴 \\u0041\\u00E9\\uD83D\\uDE00 并转换，输出 Aé😀。',
            '单独测试 \\u{1F600} 或 \\x41，它们不属于合法 JSON 转义。',
            '完整 JSON 文档请使用专用 JSON 解析器。',
          ],
          paragraphs: [
            'Emoji 常以 UTF-16 代理对 \\uD83D\\uDE00 出现，与码点 \\u{1F600} 表示同一字符。',
          ],
        },
        {
          heading: '对 JSON 输入使用标准 JSON 解析',
          paragraphs: [
            '代码示例将带引号的完整 JSON 字符串交给标准解析器，同时保留 Zürich 等既有字符不被破坏。',
          ],
        },
        {
          heading: '排查无效或双重转义输入',
          paragraphs: [
            '若解析失败，请检查引号、残缺的四位十六进制数或双重反斜杠。',
          ],
        },
      ],
    },
  },
  'uuid-v4-vs-v7': {
    tr: {
      title: 'UUID v4 ve v7 Karşılaştırması ve Nasıl Oluşturulur',
      description:
        'Rastgele UUID v4 ile zaman damgalı UUID v7 arasında seçim yapın; JavaScript veya Python ile kimlik üretin ve veritabanı sıralama sınırlarını öğrenin.',
      toolName: 'UUID v4 ve v7 Oluşturucu',
      sections: [
        {
          heading: 'Gerçek gereksinime göre sürüm seçin',
          paragraphs: [
            'UUID v4 rastgele bitler kullanır ve oluşturulma zamanı içermez. UUID v7 (RFC 9562) ise başında Unix milisaniye zaman damgası taşır ve veritabanı kayıtlarının oluşturulma zamanına göre kümelenmesini sağlar.',
          ],
        },
        {
          heading: 'Tarayıcıda kimlik üretin ve dışa aktarın',
          bullets: [
            'UUID Oluşturucuyu açın ve v4 veya v7 seçin.',
            '1 ile 1.000 arasında adet ve hedef biçimi belirleyin.',
            'Listeyi kopyalayın veya metin dosyası olarak indirin.',
            'Hedef sistem özel biçim istemiyorsa standart tireli biçimi koruyun.',
          ],
          paragraphs: [
            'Araç tarayıcının kriptografik rastgelelik kaynağını kullanır; aynı milisaniyede üretilen v7 kimliklerin alt bitleri rastgeledir.',
          ],
        },
        {
          heading: 'Yerel JavaScript ve Python API’lerini kullanın',
          paragraphs: [
            'Güvenli bağlamda crypto.randomUUID() UUID v4 üretir. Python 3.14 standart kütüphanesinde ise uuid.uuid7() bulunur.',
          ],
        },
        {
          heading: 'Veritabanı sıralaması ve güvenliği ayrı değerlendirin',
          paragraphs: [
            'UUID v7 zaman damgasını açık eder ve hiçbir zaman yetkilendirme belirteci yerine kullanılmamalıdır. Veritabanında benzersizlik kısıtını mutlaka koruyun.',
          ],
        },
      ],
    },
    de: {
      title: 'UUID v4 vs. v7 und wie man sie generiert',
      description:
        'Wählen Sie zwischen zufälliger UUID v4 und zeitbasierter UUID v7, erzeugen Sie IDs mit JavaScript oder Python und beachten Sie Datenbank-Limits.',
      toolName: 'UUID v4 & v7 Generator',
      sections: [
        {
          heading: 'Passende Version für die Anforderung wählen',
          paragraphs: [
            'UUID v4 besteht aus Zufallsbits ohne Zeitstempel. UUID v7 (RFC 9562) beginnt mit einem Unix-Millisekunden-Zeitstempel und verbessert oft die Index-Lokalität in Datenbanken.',
          ],
        },
        {
          heading: 'IDs im Browser generieren und exportieren',
          bullets: [
            'Öffnen Sie den UUID-Generator und wählen Sie v4 oder v7.',
            'Wählen Sie Stückzahl (1–1.000) und das gewünschte Format.',
            'Kopieren Sie die Liste oder laden Sie sie als Textdatei herunter.',
            'Behalten Sie die kanonische Bindestrich-Form bei, sofern nichts anderes gefordert ist.',
          ],
          paragraphs: [
            'Der Generator nutzt die kryptografische Zufallsquelle des Browsers.',
          ],
        },
        {
          heading: 'Native JavaScript- und Python-APIs nutzen',
          paragraphs: [
            'crypto.randomUUID() erzeugt UUID v4 im Browser; Python 3.14 ergänzt uuid.uuid7() in der Standardbibliothek.',
          ],
        },
        {
          heading: 'Datenbank-Sortierung und Sicherheit getrennt bewerten',
          paragraphs: [
            'UUID v7 legt den Erstellungszeitpunkt offen und ersetzt niemals ein geheimes Zugriffstoken.',
          ],
        },
      ],
    },
    es: {
      title: 'UUID v4 vs v7 y cómo generarlos',
      description:
        'Elige entre UUID v4 aleatorio y UUID v7 basado en marca de tiempo. Genera identificadores en JavaScript o Python y conoce sus límites en bases de datos.',
      toolName: 'Generador de UUID v4 y v7',
      sections: [
        {
          heading: 'Elige la versión según el requisito real',
          paragraphs: [
            'UUID v4 usa bits aleatorios sin marca temporal. UUID v7 (RFC 9562) comienza con milisegundos Unix y agrupa registros por tiempo de creación.',
          ],
        },
        {
          heading: 'Genera y exporta IDs en el navegador',
          bullets: [
            'Abre el Generador UUID y selecciona v4 o v7.',
            'Elige la cantidad (1 a 1.000) y el formato requerido.',
            'Copia los resultados o descárgalos como archivo de texto.',
            'Conserva el formato canónico con guiones salvo requisito explícito.',
          ],
          paragraphs: [
            'La herramienta emplea el generador criptográfico del navegador.',
          ],
        },
        {
          heading: 'Usa APIs nativas de JavaScript y Python',
          paragraphs: [
            'crypto.randomUUID() genera v4 en contextos seguros; Python 3.14 añade uuid.uuid7() en la biblioteca estándar.',
          ],
        },
        {
          heading: 'Evalúa ordenación y seguridad por separado',
          paragraphs: [
            'UUID v7 expone su marca temporal y nunca sustituye a un token secreto de autorización.',
          ],
        },
      ],
    },
    fr: {
      title: 'UUID v4 vs v7 et comment les générer',
      description:
        'Choisissez entre UUID v4 aléatoire et UUID v7 horodaté. Générez des identifiants en JavaScript ou Python et maîtrisez l’indexation en base.',
      toolName: 'Générateur UUID v4 & v7',
      sections: [
        {
          heading: 'Choisir la version selon le besoin réel',
          paragraphs: [
            'UUID v4 repose sur des bits aléatoires sans horodatage. UUID v7 (RFC 9562) débute par un horodatage Unix en millisecondes, favorisant la localité des index.',
          ],
        },
        {
          heading: 'Générer et exporter des IDs dans le navigateur',
          bullets: [
            'Ouvrez le Générateur UUID et choisissez v4 ou v7.',
            'Sélectionnez la quantité (1 à 1 000) et le formatage souhaité.',
            'Copiez ou téléchargez le lot généré.',
            'Conservez la forme canonique avec tirets sauf contrainte particulière.',
          ],
          paragraphs: [
            'L’outil s’appuie sur l’aléa cryptographique du navigateur.',
          ],
        },
        {
          heading: 'Utiliser les API natives JavaScript et Python',
          paragraphs: [
            'crypto.randomUUID() crée des UUID v4 ; Python 3.14 introduit uuid.uuid7() dans la bibliothèque standard.',
          ],
        },
        {
          heading: 'Évaluer ordre en base et sécurité séparément',
          paragraphs: [
            'Un UUID v7 révèle sa date de création et ne constitue jamais un jeton d’autorisation.',
          ],
        },
      ],
    },
    ru: {
      title: 'UUID v4 и v7: отличия и способы генерации',
      description:
        'Сравните случайный UUID v4 и временной UUID v7, генерируйте ID на JavaScript и Python и учитывайте ограничения баз данных.',
      toolName: 'Генератор UUID v4 и v7',
      sections: [
        {
          heading: 'Выбирайте версию под реальную задачу',
          paragraphs: [
            'UUID v4 состоит из случайных битов без времени создания. UUID v7 (RFC 9562) начинается с метки времени Unix в миллисекундах и группирует записи по времени.',
          ],
        },
        {
          heading: 'Генерация и экспорт в браузере',
          bullets: [
            'Откройте генератор UUID и выберите v4 или v7.',
            'Укажите количество (от 1 до 1 000) и нужное форматирование.',
            'Скопируйте список или скачайте текстовый файл.',
            'Используйте канонический вид с дефисами, если не требуется иной формат.',
          ],
          paragraphs: [
            'Инструмент использует криптографический ГПСЧ браузера.',
          ],
        },
        {
          heading: 'Встроенные API JavaScript и Python',
          paragraphs: [
            'crypto.randomUUID() создаёт UUID v4 в браузере, а в Python 3.14 добавлена функция uuid.uuid7().',
          ],
        },
        {
          heading: 'Отдельно оценивайте порядок в БД и безопасность',
          paragraphs: [
            'UUID v7 раскрывает время создания и никогда не должен служить токеном доступа.',
          ],
        },
      ],
    },
    zh: {
      title: 'UUID v4 与 v7 对比及生成指南',
      description:
        '对比随机 UUID v4 与带时间戳的 UUID v7，使用 JavaScript 与 Python 生成 ID，并了解数据库索引排序与安全边界。',
      toolName: 'UUID v4 & v7 生成器',
      sections: [
        {
          heading: '根据实际需求选择 UUID 版本',
          paragraphs: [
            'UUID v4 完全依赖随机位且不包含创建时间；UUID v7（RFC 9562）以 Unix 毫秒时间戳开头，适合需要按时间局部性聚集的数据库主键。',
          ],
        },
        {
          heading: '在浏览器中批量生成与导出',
          bullets: [
            '打开 UUID 生成器并选择 v4 或 v7。',
            '设置数量（1 至 1,000）及目标格式。',
            '一键复制或下载纯文本列表。',
            '除非目标系统要求，否则建议保持标准连字符格式。',
          ],
          paragraphs: ['工具使用浏览器密码学随机数生成器在本地生成全部 ID。'],
        },
        {
          heading: '使用原生 JavaScript 与 Python API',
          paragraphs: [
            'crypto.randomUUID() 可在安全上下文中生成 UUID v4；Python 3.14 标准库新增了 uuid.uuid7()。',
          ],
        },
        {
          heading: '分别评估数据库排序与安全权限',
          paragraphs: ['UUID v7 会暴露编码时间戳，且任何 UUID 都不能替代授权令牌。'],
        },
      ],
    },
  },
  'jwt-signature-verification-guide': {
    tr: {
      title: 'JWT İmza Doğrulama ve Claim Kontrolleri Güvenle Nasıl Yapılır?',
      description:
        'JWT çözme ile kriptografik imza doğrulama arasındaki farkı öğrenin, alg=none hatalarından kaçının ve JavaScript/Python ile HS256 belirteçlerini doğrulayın.',
      toolName: 'JWT Çözücü, İmzalayıcı ve Doğrulayıcı',
      sections: [
        {
          heading: 'JWT’yi çözmek özgünlüğünü kanıtlamaz',
          paragraphs: [
            'Bir JSON Web Token nokta ile ayrılmış üç Base64url bölümünden oluşur: başlık, yük ve imza. Base64url şifreleme değil kodlama olduğu için belirtece sahip herkes içeriğini okuyabilir.',
            'Arka uçta beklenen algoritmayı (ör. HS256, RS256, ES256) ve güvenilir anahtarı kullanarak imzayı doğrulamadan sub, role veya exp gibi alanlara asla güvenmeyin.',
          ],
        },
        {
          heading: 'Tarayıcıda imza ve alanları inceleyin',
          bullets: [
            'JWT Çözücü, İmzalayıcı ve Doğrulayıcı aracını açıp test belirtecini yapıştırın.',
            'Başlıktaki alg/kid değerlerini ve yükteki iat, nbf, exp zaman damgalarını kontrol edin.',
            'Test HMAC gizli anahtarınızı veya açık anahtarınızı girerek imzayı yerel olarak doğrulayın.',
            'Paylaşılan cihazlara gerçek üretim belirteçlerini yapıştırmayın.',
          ],
          paragraphs: ['Tüm çözümleme ve Web Crypto doğrulaması ağ çağrısı olmadan tarayıcıda gerçekleşir.'],
        },
        {
          heading: 'JavaScript ve Python’da HS256 imzalarını doğrulayın',
          paragraphs: [
            'Saldırganların alg=none geçirmesini veya algoritmayı değiştirmesini önlemek için doğrulamadan önce açık bir algoritma izin listesi uygulayın ve imzaları sabit sürede karşılaştırın.',
          ],
        },
      ],
    },
    de: {
      title: 'JWT-Signaturen und Claims sicher verifizieren',
      description:
        'Unterschied zwischen JWT-Dekodierung und Signaturprüfung verstehen, alg=none-Fallen vermeiden und HS256-Token in JavaScript und Python prüfen.',
      toolName: 'JWT-Decoder, Signer & Verifier',
      sections: [
        {
          heading: 'Dekodieren beweist keine Echtheit',
          paragraphs: [
            'Ein JWT besteht aus drei Base64url-Segmenten: Header, Payload und Signatur. Da Base64url keine Verschlüsselung ist, kann jeder den Inhalt lesen.',
            'Vertrauen Sie Claims wie sub, role oder exp erst nach Signaturprüfung gegen einen fest vorgegebenen Algorithmus und vertrauenswürdigen Schlüssel.',
          ],
        },
        {
          heading: 'Signaturen lokal im Browser prüfen',
          bullets: [
            'Öffnen Sie den JWT-Decoder und fügen Sie ein Test-Token ein.',
            'Prüfen Sie alg/kid im Header sowie iat, nbf und exp in den Claims.',
            'Geben Sie Test-Secret oder Public Key zur lokalen Signaturprüfung ein.',
            'Fügen Sie niemals produktive Bearer-Token auf fremden Geräten ein.',
          ],
          paragraphs: ['Die gesamte Web-Crypto-Prüfung läuft lokal ohne Netzwerkverkehr.'],
        },
        {
          heading: 'HS256-Signaturen in JavaScript und Python verifizieren',
          paragraphs: [
            'Erzwingen Sie stets eine explizite Algorithmus-Allowlist und vergleichen Sie Signaturen zeitkonstant.',
          ],
        },
      ],
    },
    es: {
      title: 'Cómo verificar de forma segura una firma JWT y sus claims',
      description:
        'Distingue entre decodificar un JWT y verificar su firma criptográfica, evita el fallo alg=none y valida tokens HS256 en JavaScript y Python.',
      toolName: 'Decodificador, firmador y verificador JWT',
      sections: [
        {
          heading: 'Decodificar un JWT no demuestra autenticidad',
          paragraphs: [
            'Un JWT tiene tres segmentos Base64url: cabecera, payload y firma. Como Base64url es reversible, cualquiera puede leer los claims.',
            'Nunca confíes en sub, role o exp hasta validar la firma con un algoritmo permitido y una clave confiable.',
          ],
        },
        {
          heading: 'Inspecciona y valida firmas en el navegador',
          bullets: [
            'Abre la herramienta JWT y pega un token de prueba.',
            'Revisa alg/kid en la cabecera y las marcas iat, nbf, exp.',
            'Introduce tu clave de prueba para validar la firma localmente.',
            'No pegues tokens reales de producción en equipos compartidos.',
          ],
          paragraphs: ['Toda la verificación Web Crypto ocurre localmente sin llamadas de red.'],
        },
        {
          heading: 'Verifica firmas HS256 en JavaScript y Python',
          paragraphs: [
            'Aplica siempre una lista blanca estricta de algoritmos y compara firmas en tiempo constante.',
          ],
        },
      ],
    },
    fr: {
      title: 'Comment vérifier en toute sécurité une signature JWT et ses claims',
      description:
        'Comprenez la différence entre décoder un JWT et vérifier sa signature, évitez le piège alg=none et validez HS256 en JavaScript et Python.',
      toolName: 'Décodeur, signataire et vérificateur JWT',
      sections: [
        {
          heading: 'Décoder un JWT ne prouve pas son authenticité',
          paragraphs: [
            'Un JWT comporte trois segments Base64url : en-tête, payload et signature. Chacun peut décoder les claims sans clé.',
            'Ne faites jamais confiance aux claims (sub, role, exp) avant d’avoir vérifié la signature avec un algorithme imposé et une clé de confiance.',
          ],
        },
        {
          heading: 'Inspecter et tester les signatures dans le navigateur',
          bullets: [
            'Ouvrez l’outil JWT et collez un jeton de test.',
            'Contrôlez alg/kid ainsi que les horodatages iat, nbf et exp.',
            'Renseignez votre secret de test ou clé publique pour vérifier localement.',
            'Ne collez jamais de jetons de production sur un poste partagé.',
          ],
          paragraphs: ['Toute vérification Web Crypto s’exécute localement sans appel réseau.'],
        },
        {
          heading: 'Vérifier des signatures HS256 en JavaScript et Python',
          paragraphs: [
            'Imposez une liste blanche d’algorithmes et comparez les signatures en temps constant.',
          ],
        },
      ],
    },
    ru: {
      title: 'Как безопасно проверить подпись JWT и утверждения (claims)',
      description:
        'Разберитесь в разнице между декодированием JWT и проверкой подписи, избегайте ошибки alg=none и проверяйте HS256 на JavaScript и Python.',
      toolName: 'Декодер, генератор и валидатор JWT',
      sections: [
        {
          heading: 'Декодирование JWT не подтверждает подлинность',
          paragraphs: [
            'JWT состоит из трёх частей Base64url: заголовка, полезной нагрузки и подписи. Любой может прочитать claims без ключа.',
            'Доверяйте полям sub, role или exp только после криптографической проверки подписи с жёстко заданным алгоритмом.',
          ],
        },
        {
          heading: 'Проверка подписей локально в браузере',
          bullets: [
            'Откройте инструмент JWT и вставьте тестовый токен.',
            'Проверьте alg/kid и временные метки iat, nbf, exp.',
            'Укажите тестовый секрет или публичный ключ для локальной проверки.',
            'Никогда не вставляйте боевые токены на чужих устройствах.',
          ],
          paragraphs: ['Вся проверка через Web Crypto идёт локально без сетевых запросов.'],
        },
        {
          heading: 'Проверка подписи HS256 в JavaScript и Python',
          paragraphs: [
            'Всегда ограничивайте допустимые алгоритмы белым списком и используйте сравнение за постоянное время.',
          ],
        },
      ],
    },
    zh: {
      title: '如何安全验证 JWT 签名与声明（Claims）',
      description:
        '分清解码 JWT 与校验密码学签名的区别，规避 alg=none 漏洞，并在 JavaScript 和 Python 中安全验证 HS256 令牌。',
      toolName: 'JWT 解码、签名与验证器',
      sections: [
        {
          heading: '解码 JWT 并不能证明其真实性',
          paragraphs: [
            'JWT 由三段 Base64url 字符串组成：头部、载荷和签名。由于 Base64url 只是编码而非加密，任何拿到令牌的人都能直接解码读取内容。',
            '在后端使用固定允许列表中的算法和可信密钥完成验签之前，绝不能信任 sub、role 或 exp 等声明。',
          ],
        },
        {
          heading: '在浏览器中本地检查与验签',
          bullets: [
            '打开 JWT 工具并粘贴测试令牌。',
            '检查头部的 alg/kid 与载荷中的 iat、nbf、exp 时间戳。',
            '输入测试密钥或公钥在本地验证签名有效性。',
            '请勿在共享设备上粘贴生产环境令牌或私钥。',
          ],
          paragraphs: ['所有解析与 Web Crypto 验签均在浏览器内存中完成，不产生网络请求。'],
        },
        {
          heading: '在 JavaScript 和 Python 中验证 HS256 签名',
          paragraphs: ['验签前务必强制校验算法白名单，并使用恒定时间比对函数比较签名并验证过期时间。'],
        },
      ],
    },
  },
  'bcrypt-vs-argon2-hashing': {
    tr: {
      title: 'Bcrypt ve Argon2id Karşılaştırması: Doğru Parola Özetleme Seçimi',
      description:
        'Bcrypt maliyet faktörlerini Argon2id bellek-sert parametreleriyle karşılaştırın, PHC dizelerini okuyun ve JavaScript/Python’da doğrulamayı yapılandırın.',
      toolName: 'Bcrypt Oluşturucu ve Doğrulayıcı',
      sections: [
        {
          heading: 'Bellek-sert KDF’ler neden hızlı özetlerden üstündür?',
          paragraphs: [
            'SHA-256 gibi genel özetler hız için tasarlandığından GPU saldırılarına karşı parolaları koruyamaz. Parola saklama için kasıtlı olarak yavaş ve tuzlu bir türetme fonksiyonu gerekir.',
            'Argon2id (RFC 9106) ayarlanabilir bellek maliyeti sayesinde OWASP tarafından yeni projeler için önerilir; Bcrypt ise 10–12+ maliyet ve 72 bayt sınırı gözetilerek hâlâ yaygın biçimde kullanılır.',
          ],
        },
        {
          heading: 'Tuzlanmış özetleri yerel olarak üretin ve inceleyin',
          bullets: [
            'Bcrypt Oluşturucu veya Argon2 Parametre Ayarlayıcı ile maliyet değerlerini test edin.',
            'Her özette benzersiz rastgele tuz bulunduğundan aynı parolanın farklı çıktılar ürettiğini gözlemleyin.',
            'Maliyet değerini artırmadan önce üretim sunucunuzda hedef doğrulama süresini (100–300 ms) ölçün.',
          ],
          paragraphs: ['Bcrypt 72 UTF-8 baytından sonrasını keser; bu sınırı aşan parolalarda Argon2id tercih edilmelidir.'],
        },
        {
          heading: 'PHC dizelerini ayrıştırma ve kod içinde doğrulama',
          paragraphs: [
            'Standart PHC dizeleri algoritma, sürüm, maliyet parametreleri, tuz ve özeti tek metinde saklayarak giriş sırasında sorunsuz yeniden özetleme (rehash) sağlar.',
          ],
        },
      ],
    },
    de: {
      title: 'Bcrypt vs. Argon2id: Passwort-Hashing-Algorithmus richtig wählen',
      description:
        'Vergleichen Sie Bcrypt-Kostenfaktoren mit speicherharten Argon2id-Parametern, lesen Sie PHC-Strings und konfigurieren Sie Passwortprüfungen sicher.',
      toolName: 'Bcrypt-Generator & Verifier',
      sections: [
        {
          heading: 'Warum speicherharte KDFs schnellen Hashes überlegen sind',
          paragraphs: [
            'SHA-256 ist für hohe Geschwindigkeit optimiert und schützt Passwörter nicht gegen GPU-Cracking. Für Passwörter sind langsame, gesalzene KDFs erforderlich.',
            'Argon2id (RFC 9106) ist die OWASP-Empfehlung für neue Systeme; Bcrypt bleibt bei Kostenfaktor 10–12+ (unter 72 Bytes) eine solide Option.',
          ],
        },
        {
          heading: 'Gesalzene Hashes lokal erzeugen und prüfen',
          bullets: [
            'Testen Sie Bcrypt-Kostenfaktoren ($2a$/$2b$) oder Argon2id-Parameter (m, t, p) im Browser.',
            'Beobachten Sie, wie einzigartige Salts identische Passwörter unterschiedlich hashen.',
            'Messen Sie die Ziel-Latenz (ca. 100–300 ms) auf Ihrer Zielhardware.',
          ],
          paragraphs: ['Beachten Sie das 72-Byte-Limit von Bcrypt bei langen Passphrasen.'],
        },
        {
          heading: 'PHC-Strings auslesen und Passwörter im Code prüfen',
          paragraphs: [
            'PHC-Strings bündeln Algorithmus, Version, Parameter, Salt und Hash für einfache Parameter-Upgrades.',
          ],
        },
      ],
    },
    es: {
      title: 'Bcrypt vs Argon2id: cómo elegir un algoritmo de hash de contraseñas',
      description:
        'Compara los factores de coste de Bcrypt frente a Argon2id, interpreta cadenas PHC y configura la verificación de contraseñas en JavaScript y Python.',
      toolName: 'Generador y verificador Bcrypt',
      sections: [
        {
          heading: 'Por qué los KDF exigentes en memoria superan a los hashes rápidos',
          paragraphs: [
            'Resúmenes como SHA-256 están pensados para velocidad y no resisten fuerza bruta con GPU. Argon2id (RFC 9106) es la opción recomendada por OWASP, mientras Bcrypt sigue siendo válido con coste 10–12+ y contraseñas menores a 72 bytes.',
          ],
        },
        {
          heading: 'Genera e inspecciona hashes con sal localmente',
          bullets: [
            'Prueba costes Bcrypt ($2a$/$2b$) o parámetros Argon2id (m, t, p) en tu navegador.',
            'Comprueba cómo la sal aleatoria produce hashes distintos para la misma contraseña.',
            'Mide una latencia objetivo de 100–300 ms en tu servidor antes de subir el coste.',
          ],
          paragraphs: ['Recuerda que Bcrypt trunca las entradas a 72 bytes UTF-8.'],
        },
        {
          heading: 'Analiza cadenas PHC y verifica contraseñas en código',
          paragraphs: [
            'El formato PHC guarda algoritmo, versión, parámetros, sal y hash en una sola cadena portable.',
          ],
        },
      ],
    },
    fr: {
      title: 'Bcrypt vs Argon2id : choisir un algorithme de hachage de mots de passe',
      description:
        'Comparez les facteurs de coût Bcrypt et les paramètres mémoire d’Argon2id, lisez les chaînes PHC et implémentez la vérification en JavaScript et Python.',
      toolName: 'Générateur et vérificateur Bcrypt',
      sections: [
        {
          heading: 'Pourquoi les KDF à coût mémoire surpassent les hachages rapides',
          paragraphs: [
            'SHA-256 est trop rapide face aux GPU. Argon2id (RFC 9106) est recommandé par l’OWASP pour les nouveaux projets, tandis que Bcrypt reste acceptable avec un coût de 10–12+ sous la limite de 72 octets.',
          ],
        },
        {
          heading: 'Générer et inspecter des empreintes salées localement',
          bullets: [
            'Testez les facteurs de coût Bcrypt ou les paramètres Argon2id (m, t, p) dans le navigateur.',
            'Vérifiez que chaque hachage inclut un sel aléatoire unique.',
            'Mesurez un temps cible de 100 à 300 ms sur votre matériel de production.',
          ],
          paragraphs: ['Rappel : Bcrypt tronque les mots de passe au-delà de 72 octets UTF-8.'],
        },
        {
          heading: 'Analyser les chaînes PHC et vérifier en code',
          paragraphs: [
            'Le format PHC rassemble algorithme, version, coût, sel et empreinte pour faciliter les migrations.',
          ],
        },
      ],
    },
    ru: {
      title: 'Bcrypt против Argon2id: выбор алгоритма хеширования паролей',
      description:
        'Сравните стоимость Bcrypt и память-зависимые параметры Argon2id, разберите формат PHC и настройте проверку паролей на JavaScript и Python.',
      toolName: 'Генератор и проверщик Bcrypt',
      sections: [
        {
          heading: 'Почему KDF с требованием к памяти лучше быстрых хешей',
          paragraphs: [
            'SHA-256 оптимизирован для скорости и не защищает пароли от перебора на GPU. Argon2id (RFC 9106) рекомендован OWASP для новых систем, а Bcrypt остаётся допустимым при факторе стоимости 10–12+ и длине до 72 байт.',
          ],
        },
        {
          heading: 'Генерация и проверка солёных хешей в браузере',
          bullets: [
            'Протестируйте параметры стоимости Bcrypt ($2a$/$2b$) и Argon2id (m, t, p) локально.',
            'Убедитесь, что уникальная соль делает два хеша одного пароля разными.',
            'Замерьте целевое время (100–300 мс) на целевом сервере перед повышением стоимости.',
          ],
          paragraphs: ['Помните, что Bcrypt обрезает входные строки длиннее 72 байт UTF-8.'],
        },
        {
          heading: 'Разбор строк PHC и проверка паролей в коде',
          paragraphs: [
            'Формат PHC хранит алгоритм, версию, параметры, соль и дайджест в одной строке и упрощает перехеширование при входе.',
          ],
        },
      ],
    },
    zh: {
      title: 'Bcrypt 与 Argon2id 对比：如何选择密码哈希算法',
      description:
        '对比 Bcrypt 成本因子与 Argon2id 内存困难参数，解析 PHC 格式字符串，并在 JavaScript 与 Python 中正确配置密码验证。',
      toolName: 'Bcrypt 哈希生成与验证器',
      sections: [
        {
          heading: '为什么内存困难型 KDF 优于快速哈希',
          paragraphs: [
            'SHA-256 追求高速计算，无法抵御 GPU 暴力枚举。OWASP 建议新系统优先选用 Argon2id（RFC 9106）；若继续使用 Bcrypt，需保证成本因子不低于 10–12 且注意 72 字节截断限制。',
          ],
        },
        {
          heading: '在本地生成并检查加盐哈希',
          bullets: [
            '使用 Bcrypt 或 Argon2id 工具测试不同成本参数（m、t、p）。',
            '观察随机盐值如何让相同明文生成完全不同的哈希字符串。',
            '调整成本参数前请在生产硬件上实测 100–300 毫秒的目标耗时。',
          ],
          paragraphs: ['长密码短语请注意 Bcrypt 只读取前 72 个 UTF-8 字节。'],
        },
        {
          heading: '解析 PHC 字符串并在代码中验证密码',
          paragraphs: ['标准 PHC 字符串把算法、版本、参数、盐值和摘要封装在一起，便于登录时平滑升级参数。'],
        },
      ],
    },
  },
  'json-schema-validation-guide': {
    tr: {
      title: 'JSON Schema Doğrulama Rehberi: Draft 2020-12 ve API Sözleşmeleri',
      description:
        'JSON yüklerini JSON Schema kurallarıyla doğrulayın, eksik zorunlu alanları veya beklenmeyen özellikleri yakalayın ve API sözleşmelerini uygulayın.',
      toolName: 'JSON Schema Doğrulayıcı',
      sections: [
        {
          heading: 'JSON Schema ile açık nesne sözleşmeleri tanımlayın',
          paragraphs: [
            'Sözdizimi kontrolü yalnızca JSON’ın ayrıştırılabilir olduğunu gösterir. JSON Schema ise veri tiplerini, zorunlu alanları, sayı aralıklarını ve enum değerlerini API sınırında denetler.',
            'İstemci yazım hatalarının sessizce göz ardı edilmemesi için required ile birlikte additionalProperties: false kullanın.',
          ],
        },
        {
          heading: 'Şemaları ve yükleri tarayıcıda doğrulayın',
          bullets: [
            'JSON Schema Doğrulayıcıyı açıp şemanızı ve örnek JSON yükünüzü yapıştırın.',
            'Her kural ihlali için tam JSON Pointer hata yolunu inceleyin.',
            'Şemaları depoya eklemeden önce JSON Biçimlendirici ile girintileri düzenleyin.',
          ],
          paragraphs: ['Tarayıcı tarafı doğrulama iç API şemalarınızı dış sunuculara göndermeden test etmenizi sağlar.'],
        },
        {
          heading: 'JavaScript ve Python içinde şema kontrolleri çalıştırın',
          paragraphs: [
            'Güvenilmeyen girdiyi giriş noktasında doğrulayın ve tüm hataları toplayarak istemciye net geri bildirim döndürün.',
          ],
        },
      ],
    },
    de: {
      title: 'JSON-Schema-Validierung: Draft 2020-12 & API-Verträge',
      description:
        'Validieren Sie JSON-Payloads gegen JSON-Schema-Regeln, erkennen Sie fehlende Pflichtfelder oder unerwartete Properties und sichern Sie API-Schnittstellen.',
      toolName: 'JSON-Schema-Validator',
      sections: [
        {
          heading: 'Klare Datenverträge mit JSON Schema definieren',
          paragraphs: [
            'Reine Syntaxprüfung stellt nur sicher, dass JSON parsbar ist. JSON Schema prüft zusätzlich Datentypen, Pflichtfelder, Wertebereiche und Enums.',
            'Kombinieren Sie required mit additionalProperties: false, damit Tippfehler in Feldnamen sofort auffallen.',
          ],
        },
        {
          heading: 'Payloads und Schemas lokal im Browser prüfen',
          bullets: [
            'Öffnen Sie den JSON-Schema-Validator und fügen Sie Schema sowie Beispiel-JSON ein.',
            'Prüfen Sie die genauen JSON-Pointer-Fehlerpfade.',
            'Formatieren Sie Schemas vor dem Commit mit dem JSON-Formatierer.',
          ],
          paragraphs: ['Alle Prüfungen laufen lokal im Browser ohne Server-Upload.'],
        },
        {
          heading: 'Schema-Checks in JavaScript und Python ausführen',
          paragraphs: [
            'Validieren Sie Eingaben direkt am API-Eingang und sammeln Sie alle Fehler für verständliche Diagnosen.',
          ],
        },
      ],
    },
    es: {
      title: 'Guía de validación JSON Schema: Draft 2020-12 y contratos API',
      description:
        'Valida cargas JSON con reglas JSON Schema, detecta campos obligatorios ausentes o propiedades inesperadas y aplica contratos estrictos en JavaScript y Python.',
      toolName: 'Validador de JSON Schema',
      sections: [
        {
          heading: 'Define contratos explícitos con JSON Schema',
          paragraphs: [
            'Validar la sintaxis solo confirma que el JSON se puede leer. JSON Schema verifica tipos, campos requeridos, rangos numéricos y listas enum.',
            'Combina required con additionalProperties: false para rechazar errores tipográficos en campos opcionales.',
          ],
        },
        {
          heading: 'Valida esquemas y payloads en tu navegador',
          bullets: [
            'Abre el Validador de JSON Schema y pega el esquema junto al JSON.',
            'Revisa la ruta JSON Pointer exacta de cada incumplimiento.',
            'Formatea tus esquemas con el Formateador JSON antes de guardarlos.',
          ],
          paragraphs: ['La validación local evita enviar contratos internos a servicios externos.'],
        },
        {
          heading: 'Ejecuta validaciones en JavaScript y Python',
          paragraphs: [
            'Valida las entradas al recibirlas y devuelve todos los errores recopilados en una sola respuesta.',
          ],
        },
      ],
    },
    fr: {
      title: 'Guide de validation JSON Schema : Draft 2020-12 et contrats API',
      description:
        'Validez des charges JSON selon JSON Schema, repérez les champs requis manquants ou propriétés inattendues et appliquez des contrats stricts en code.',
      toolName: 'Validateur JSON Schema',
      sections: [
        {
          heading: 'Définir des contrats explicites avec JSON Schema',
          paragraphs: [
            'La validation syntaxique vérifie seulement l’analyse du JSON. JSON Schema contrôle types, champs obligatoires, bornes numériques et énumérations.',
            'Associez required à additionalProperties: false pour détecter immédiatement les fautes de frappe.',
          ],
        },
        {
          heading: 'Valider schémas et données dans le navigateur',
          bullets: [
            'Ouvrez le Validateur JSON Schema et collez votre schéma et votre JSON.',
            'Consultez le chemin JSON Pointer exact de chaque erreur.',
            'Mettez en forme vos schémas avec le Formateur JSON.',
          ],
          paragraphs: ['La validation reste entièrement locale dans votre navigateur.'],
        },
        {
          heading: 'Exécuter la validation en JavaScript et Python',
          paragraphs: [
            'Validez les données dès l’entrée de l’API et collectez toutes les erreurs en un seul retour.',
          ],
        },
      ],
    },
    ru: {
      title: 'Руководство по валидации JSON Schema (Draft 2020-12)',
      description:
        'Проверяйте JSON по правилам JSON Schema, находите отсутствующие обязательные поля и лишние свойства и стройте строгие контракты API.',
      toolName: 'Валидатор JSON Schema',
      sections: [
        {
          heading: 'Задавайте строгие контракты с помощью JSON Schema',
          paragraphs: [
            'Проверка синтаксиса подтверждает лишь корректность записи JSON. JSON Schema контролирует типы данных, обязательные ключи, диапазоны и перечисления.',
            'Сочетайте required и additionalProperties: false, чтобы опечатки в полях не игнорировались молча.',
          ],
        },
        {
          heading: 'Проверяйте схемы и данные в браузере',
          bullets: [
            'Откройте валидатор JSON Schema и вставьте схему вместе с тестовым JSON.',
            'Изучите точные пути ошибок JSON Pointer.',
            'Отформатируйте схему перед сохранением через JSON Formatter.',
          ],
          paragraphs: ['Локальная проверка не отправляет внутренние схемы на сторонние серверы.'],
        },
        {
          heading: 'Валидация схем в JavaScript и Python',
          paragraphs: [
            'Проверяйте входящие запросы на границе API и собирайте все ошибки валидации за один проход.',
          ],
        },
      ],
    },
    zh: {
      title: 'JSON Schema 校验指南：Draft 2020-12 与接口契约实践',
      description:
        '依据 JSON Schema 规则校验 JSON 数据，捕获缺失必填项或多余字段，并在 JavaScript 与 Python 中严格约束 API 输入。',
      toolName: 'JSON Schema 校验器',
      sections: [
        {
          heading: '使用 JSON Schema 定义清晰的接口契约',
          paragraphs: [
            '语法校验只能说明 JSON 可以被解析，而 JSON Schema 可以在接口边界强制校验字段类型、必填属性、数值范围与枚举值。',
            '建议将 required 与 additionalProperties: false 配合使用，避免客户端字段拼写错误被静默忽略。',
          ],
        },
        {
          heading: '在浏览器中本地校验 Schema 与数据',
          bullets: [
            '打开 JSON Schema 校验器，分别粘贴 Schema 与待检 JSON。',
            '查看每条报错对应的精确 JSON Pointer 路径。',
            '提交 Schema 前可配合 JSON 格式化工具统一缩进。',
          ],
          paragraphs: ['浏览器本地校验不会向外部服务器发送内部业务数据结构。'],
        },
        {
          heading: '在 JavaScript 和 Python 中执行校验',
          paragraphs: ['在入口层对不可信输入执行完整校验，并一次收集全部错误以便调用方快速定位问题。'],
        },
      ],
    },
  },
};

export function getLocalizedGuide(guide: DeveloperGuide, locale: Language = 'en'): DeveloperGuide {
  if (locale === 'en') {
    return guide;
  }
  const localized = localizedGuideContent[guide.slug]?.[locale];
  if (!localized) {
    return guide;
  }
  return {
    ...guide,
    title: localized.title,
    description: localized.description,
    toolName: localized.toolName,
    sections: guide.sections.map((section, index) => {
      const translatedSection = localized.sections[index];
      if (!translatedSection) {
        return section;
      }
      return {
        ...section,
        heading: translatedSection.heading,
        paragraphs: translatedSection.paragraphs ?? section.paragraphs,
        bullets: translatedSection.bullets ?? section.bullets,
      };
    }),
  };
}

const TOOL_GUIDE_ALIAS_MAP: Record<string, string> = {
  'uuid-v7-generator': 'uuid-generator',
  'file-checksum-comparator': 'sha256-hash',
  'jwt-generator': 'jwt-decoder',
  'argon2-hash-generator': 'bcrypt-generator',
  'json-formatter': 'json-schema-validator',
};

export function getDeveloperGuidesForTool(toolSlug: string): DeveloperGuide[] {
  const guideToolSlug = TOOL_GUIDE_ALIAS_MAP[toolSlug] ?? toolSlug;
  return developerGuides.filter((guide) => guide.toolSlug === guideToolSlug);
}
