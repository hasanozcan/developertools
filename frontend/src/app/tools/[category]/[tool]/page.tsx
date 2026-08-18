import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ToolPageWrapper from '@/components/tools/ToolPageWrapper';
import ToolRenderer from '@/components/tools/ToolRenderer';
import { categoryCatalog, findCatalogTool, getToolBySlug, toolCatalog } from '@/lib/api';
import { buildToolPath, getCanonicalToolCategory } from '@/lib/toolRoutes';
import { getToolSources } from '@/lib/toolSources';

// Tool configurations
const tools: Record<
  string,
  Record<
    string,
    {
      name: string;
      metadataTitle?: string;
      description: string;
      longDescription: string;
      keywords: string[];
      faqs: { question: string; answer: string }[];
      answerSections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
      howToUseSteps?: string[];
    }
  >
> = {
  json: {
    'json-formatter': {
      name: 'JSON Formatter',
      metadataTitle: 'JSON Formatter & Validator Online – Beautify, Minify, Sort',
      description:
        'Format, validate, beautify, minify, and recursively sort JSON in your browser. Get immediate syntax errors without uploading data.',
      longDescription:
        'Free online JSON formatter and minifier. Paste valid JSON to create consistently indented, readable output or a compact representation without changing the intended data.',
      keywords: [
        'json formatter',
        'json beautifier',
        'format json online',
        'json pretty print',
        'json minifier',
      ],
      faqs: [
        {
          question: 'What is JSON?',
          answer:
            'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.',
        },
        {
          question: 'How do I format JSON?',
          answer:
            'Paste valid JSON in the input field, choose the indentation and key-sorting options you need, then select Format JSON.',
        },
        {
          question: 'Is my data safe?',
          answer:
            'Yes! All processing happens in your browser. Your data never leaves your computer.',
        },
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
      longDescription:
        'Free online JSON validator. Check if your JSON is valid and get detailed error messages with line numbers. Includes JSON statistics and structure analysis.',
      keywords: [
        'json validator',
        'validate json',
        'json syntax checker',
        'json lint',
        'check json',
      ],
      faqs: [
        {
          question: 'What does this tool check?',
          answer:
            'This tool validates JSON syntax according to the JSON specification. It checks for proper formatting, correct use of quotes, commas, brackets, and braces.',
        },
        {
          question: 'What are common JSON errors?',
          answer:
            'Common errors include missing commas, trailing commas, single quotes instead of double quotes, unquoted property names, and missing closing brackets.',
        },
        {
          question: 'Is my data safe?',
          answer:
            'Yes! All validation happens in your browser. Your data never leaves your computer.',
        },
      ],
    },
    'json-schema-validator': {
      name: 'JSON Schema Validator',
      metadataTitle: 'JSON Schema Validator Online - Ajv Error Details',
      description:
        'Validate a JSON document against a Draft 7-compatible JSON Schema locally in your browser with detailed Ajv error paths.',
      longDescription:
        'Free online JSON Schema validator powered by Ajv. Check required properties, types, formats, ranges, nested structures, and additional-property rules without uploading your document.',
      keywords: [
        'json schema validator',
        'validate json schema',
        'ajv validator',
        'json contract checker',
        'draft 7 json schema',
      ],
      faqs: [
        {
          question: 'How is this different from the JSON Validator?',
          answer:
            'JSON Validator checks whether text is valid JSON syntax. JSON Schema Validator also checks the parsed value against rules such as required properties, types, ranges, and nested structures.',
        },
        {
          question: 'Which JSON Schema version does this tool support?',
          answer:
            'The tool uses Ajv v8 with its default Draft 7-compatible validator. Unknown extension keywords are ignored with a visible warning, while schemas requiring another meta-schema may need draft-specific configuration.',
        },
        {
          question: 'Is my JSON uploaded?',
          answer:
            'No. Parsing, schema compilation, and validation run in your browser. Avoid sensitive data on shared devices because clipboard history and browser extensions can still expose it.',
        },
      ],
      answerSections: [
        {
          heading: 'What JSON Schema validation checks',
          paragraphs: [
            'JSON syntax validation only proves that text can be parsed. JSON Schema validation applies a contract to the parsed value. It can require properties, constrain value types and ranges, reject unexpected fields, and validate nested arrays or objects. The result includes the instance path, schema path, keyword, and message for every detected rule failure.',
          ],
        },
        {
          heading: 'How to use the validator',
          bullets: [
            'Paste the JSON value you want to test into the document editor.',
            'Paste a Draft 7-compatible JSON Schema into the schema editor.',
            'Select Validate to compile the schema and report all matching errors.',
            'Use instance paths to locate bad document values and schema paths to locate the rule that rejected them.',
          ],
        },
        {
          heading: 'Limits and privacy',
          paragraphs: [
            'A valid result means the current document satisfies every rule recognized from the supplied schema; it does not prove the schema expresses every business rule. Unknown extension keywords are ignored with a visible warning. External schemas are not fetched automatically, and schemas targeting unsupported drafts or remote references can require application-specific configuration. Both document and schema are parsed with JavaScript numbers, so integers outside the safe integer range can lose precision.',
          ],
        },
      ],
    },
    'json-csv': {
      name: 'JSON to CSV Converter',
      description: 'Convert JSON to CSV and CSV to JSON. Free online format converter.',
      longDescription:
        'Free online JSON to CSV converter. Convert JSON arrays to CSV format or CSV data to JSON. Supports custom delimiters and nested object flattening.',
      keywords: [
        'json to csv',
        'csv to json',
        'json converter',
        'csv converter',
        'format converter',
      ],
      faqs: [
        {
          question: 'What formats are supported?',
          answer:
            'This tool supports conversion between JSON (array of objects) and CSV (comma-separated values). You can also use semicolons, tabs, or pipes as delimiters.',
        },
        {
          question: 'How are nested objects handled?',
          answer:
            'Nested objects can be automatically flattened using dot notation (e.g., address.city) for proper CSV conversion.',
        },
      ],
    },
    'json-to-typescript': {
      name: 'JSON to TypeScript',
      description:
        'Convert JSON to TypeScript interfaces or types. Free online JSON to TS converter.',
      longDescription:
        'Free online JSON to TypeScript converter. Generate TypeScript interfaces or type definitions from your JSON data. Supports nested objects and arrays.',
      keywords: [
        'json to typescript',
        'json to ts',
        'typescript interface generator',
        'json to interface',
      ],
      faqs: [
        {
          question: 'What is the difference between interface and type?',
          answer:
            'Interfaces are extendable and can be merged, while types are more flexible and can represent unions and intersections. Both work for defining object shapes.',
        },
        {
          question: 'How are arrays handled?',
          answer:
            'Arrays are detected and typed appropriately. If all elements are of the same type, a typed array is generated. Mixed types result in union types.',
        },
      ],
    },
    'yaml-json': {
      name: 'YAML ↔ JSON Converter',
      description: 'Convert between YAML and JSON formats. Free online YAML JSON converter.',
      longDescription:
        'Free online YAML to JSON and JSON to YAML converter. Perfect for Kubernetes configs, CI/CD pipelines, and configuration file conversions.',
      keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'kubernetes yaml'],
      faqs: [
        {
          question: 'What is YAML?',
          answer:
            "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files, especially in DevOps and cloud environments.",
        },
        {
          question: 'When should I use YAML vs JSON?',
          answer:
            'YAML is preferred for configuration files due to better readability. JSON is better for data interchange and API responses due to universal support.',
        },
        {
          question: 'Which YAML compatibility mode is used?',
          answer:
            'Conversion uses the js-yaml YAML 1.1 compatibility schema so anchors, aliases, merge keys, explicit tags, and typed scalars work as shown in the sample. YAML 1.1 can interpret some plain scalars differently from YAML 1.2.',
        },
      ],
    },
    'json-pointer': {
      name: 'JSON Pointer Evaluator',
      metadataTitle: 'JSON Pointer Evaluator Online - RFC 6901',
      description:
        'Evaluate RFC 6901 JSON Pointer paths against a JSON document in your browser, including escaped slash and tilde member names.',
      longDescription:
        'Free online JSON Pointer evaluator. Resolve an empty pointer or slash-separated reference tokens against JSON objects and arrays without uploading the document.',
      keywords: ['json pointer', 'rfc 6901', 'json path evaluator', 'json reference token'],
      faqs: [
        {
          question: 'Is JSON Pointer the same as JSONPath?',
          answer:
            'No. JSON Pointer is the compact RFC 6901 syntax for identifying one value. JSONPath is a separate query language with filters, wildcards, and other selection features.',
        },
        {
          question: 'How do I reference a slash or tilde in a key?',
          answer:
            'Encode a tilde as ~0 and a slash as ~1 inside each reference token. For example, /a~1b selects the object member named a/b.',
        },
        {
          question: 'What does an empty pointer select?',
          answer: 'The empty JSON Pointer selects the complete JSON document.',
        },
      ],
      answerSections: [
        {
          heading: 'What the JSON Pointer evaluator does',
          paragraphs: [
            'JSON Pointer identifies one value by walking slash-separated reference tokens through a JSON document. Object tokens match member names exactly, while array tokens use zero-based indexes. The evaluator reports a missing member, invalid escape, invalid array index, or attempt to traverse through a primitive instead of silently returning the wrong value.',
          ],
        },
        {
          heading: 'Syntax and boundaries',
          bullets: [
            'Use an empty string for the document root and / for an object member whose name is empty.',
            'Encode ~ as ~0 and / as ~1 inside a token; decoding happens in that order as RFC 6901 requires.',
            'Array indexes are canonical non-negative decimal integers. The special - token is useful for JSON Patch append operations but does not identify an existing value.',
            'The tool evaluates JSON Pointer syntax only; it does not implement JSONPath filters, JSON Patch operations, URI fragment decoding, or schema validation.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste or edit a valid JSON document.',
        'Enter an empty pointer or an RFC 6901 pointer beginning with /.',
        'Review the resolved value or the precise path error.',
        'Copy the selected JSON value when needed.',
      ],
    },
    'jsonpath-tester': {
      name: 'JSONPath Tester',
      metadataTitle: 'JSONPath Tester Online - RFC 9535 Query Evaluator',
      description:
        'Test JSONPath queries against JSON in your browser with child selectors, array indexes, wildcards, slices, and recursive descent.',
      longDescription:
        'Free online JSONPath tester for selecting one or more values from a JSON document. Inspect each matched value and its normalized path without uploading the input or evaluating scripts.',
      keywords: [
        'jsonpath tester',
        'jsonpath online',
        'json path evaluator',
        'rfc 9535',
        'query json online',
      ],
      faqs: [
        {
          question: 'How is JSONPath different from JSON Pointer?',
          answer:
            'JSON Pointer identifies one exact value with slash-separated tokens. JSONPath is a query language that can select multiple values with wildcards, slices, and recursive descent.',
        },
        {
          question: 'Does this tester support filter expressions?',
          answer:
            'No. It intentionally supports a safe RFC 9535 core subset and rejects filters or script expressions instead of evaluating code. Use child names, indexes, wildcards, slices, or recursive descent.',
        },
        {
          question: 'Is the JSON document uploaded?',
          answer:
            'No. JSON parsing and path evaluation run in your browser. Clipboard history, extensions, page scripts, and shared devices can still expose sensitive input.',
        },
      ],
      answerSections: [
        {
          heading: 'What the JSONPath tester selects',
          paragraphs: [
            'A JSONPath query starts at $ and walks object members or array elements. A singular path such as $.store.book[0].title selects one value, while wildcards, slices, and recursive descent can produce an ordered list of matches. Each result includes the selected value and a normalized path back to its location in the input document.',
          ],
        },
        {
          heading: 'Supported syntax and safety boundary',
          bullets: [
            "Use .name or ['name'] for object members and [0] or [-1] for array indexes.",
            'Use .* or [*] for child wildcards, [start:end:step] for array slices, and ..name or ..* for recursive descent.',
            'Filter selectors, embedded JavaScript, functions, and shell-like expressions are rejected; the tool never evaluates query text as code.',
            'The tester validates JSON syntax before querying. It does not apply JSON Schema or prove that selected values satisfy an API contract.',
          ],
        },
        {
          heading: 'JSONPath result interpretation',
          paragraphs: [
            'Zero matches means the valid query did not select a value in the current document; it is different from selecting a JSON null. Wildcards and recursive descent can return many values, and duplicate values at different locations remain separate matches because their normalized paths differ.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste or edit a valid JSON document.',
        'Enter an RFC 9535-style path beginning with $.',
        'Review every matched path and value, or correct the reported syntax error.',
        'Copy the result list when you need it for debugging or tests.',
      ],
    },
    'json-to-zod': {
      name: 'JSON to Zod Schema',
      metadataTitle: 'JSON to Zod Schema Generator Online - TypeScript',
      description:
        'Convert JSON samples to Zod object, array, union, and format-aware schemas with an optional inferred TypeScript type, entirely in your browser.',
      longDescription:
        'Free online JSON to Zod generator. Paste a representative JSON value and produce a readable Zod schema plus an optional z.infer TypeScript type without uploading the sample.',
      keywords: [
        'json to zod',
        'zod schema generator',
        'json to zod schema',
        'generate zod from json',
        'typescript validation schema',
      ],
      faqs: [
        {
          question: 'Can one JSON sample describe every valid payload?',
          answer:
            'No. The generator can infer only the values and shapes present in the sample. Review required versus optional fields, business constraints, enums, defaults, refinements, and transformations against the real API contract.',
        },
        {
          question: 'How are arrays and missing object properties handled?',
          answer:
            'Array element types are merged. Objects found in the same array share a combined shape, and a property missing from any sample object becomes optional. Mixed primitive arrays become Zod unions, while empty arrays use z.unknown() elements.',
        },
        {
          question: 'Is my JSON uploaded?',
          answer:
            'No. JSON parsing and schema generation run in your browser. Sensitive data can still be exposed through clipboard history, browser extensions, screen sharing, or a shared device, so use sanitized examples when possible.',
        },
      ],
      answerSections: [
        {
          heading: 'What the JSON to Zod generator produces',
          paragraphs: [
            'The generator parses one JSON value and maps strings, numbers, integers, booleans, nulls, arrays, and objects to Zod expressions. The root name is normalized into a TypeScript-safe schema identifier. When inferred types are enabled, the output also includes a z.infer alias so the runtime validator and compile-time type come from the same schema.',
          ],
        },
        {
          heading: 'Inference rules worth reviewing',
          bullets: [
            'Integers become z.number().int(), while values containing a fractional part become z.number().',
            'Mixed array samples become unions. Arrays of objects merge observed keys and mark keys missing from any sample as optional.',
            'Optional format inference recognizes representative UUID, ISO date-time, email, and HTTP(S) URL strings with Zod string checks.',
            'Strict object mode appends .strict() so unknown keys are rejected instead of silently stripped by the generated object schemas.',
            'Empty arrays cannot reveal an element type and therefore become z.array(z.unknown()).',
          ],
        },
        {
          heading: 'Sample inference is a starting point, not a contract',
          paragraphs: [
            'A sample cannot prove minimum lengths, numeric ranges, permitted enum values, cross-field rules, defaults, coercion behavior, or whether a field that happened to be present is always required. Compare the result with API documentation and real edge cases, then add Zod refinements and tests before accepting untrusted input. The tool generates source text only; it does not execute the schema or install Zod in your project.',
          ],
        },
        {
          heading: 'Privacy and input limits',
          paragraphs: [
            'Generation is local and deterministic for the same options and input. Deeply nested input is capped to keep the browser responsive. Avoid pasting production tokens or personal data even into local tools when a sanitized payload can describe the same structure.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste a representative valid JSON object, array, or primitive value.',
        'Choose the schema name and whether to infer common string formats, use strict objects, and include a TypeScript alias.',
        'Generate the Zod source and review unions, optional fields, unknown arrays, and inferred formats.',
        'Copy the result, install the appropriate Zod version in your project, and add contract-specific constraints and tests.',
      ],
    },
    'json-diff-patch': {
      name: 'JSON Diff & Patch Generator',
      metadataTitle: 'JSON Diff & RFC 6902 Patch Generator Online',
      description:
        'Compare two JSON values, generate deterministic RFC 6902 add, remove, and replace operations, then edit and apply any JSON Patch locally.',
      longDescription:
        'Free local JSON Diff and Patch tool. Generate an RFC 6902 patch from source and target JSON, inspect escaped JSON Pointer paths, and apply add, remove, replace, move, copy, or test operations.',
      keywords: [
        'json diff',
        'json patch generator',
        'rfc 6902',
        'apply json patch',
        'json compare online',
      ],
      faqs: [
        {
          question: 'Which JSON Patch operations are supported?',
          answer:
            'The applicator supports add, remove, replace, move, copy, and test. Generated patches use deterministic add, remove, and replace operations; changed arrays are replaced as one value instead of attempting an unstable element-by-element diff.',
        },
        {
          question: 'How are slash and tilde characters represented in paths?',
          answer:
            'JSON Patch paths use RFC 6901 JSON Pointer. A slash inside an object key becomes ~1 and a tilde becomes ~0, so a key named a/b is addressed as /a~1b.',
        },
        {
          question: 'Does applying a patch change the source editor?',
          answer:
            'No. The source JSON is cloned before operations run, and the result is shown separately. Removing the complete document root is rejected because the tool always returns a valid JSON value.',
        },
      ],
      answerSections: [
        {
          heading: 'How the JSON diff becomes a patch',
          paragraphs: [
            'Object keys are compared in sorted order so the same input produces the same operation sequence. Missing keys become remove operations, new keys become add operations, and changed primitive or array values become replace operations. Nested objects are traversed recursively, while every emitted path is escaped as an RFC 6901 JSON Pointer.',
          ],
        },
        {
          heading: 'Patch application and failure behavior',
          bullets: [
            'Array indexes are validated strictly, and the special - token appends only during add operations.',
            'Replace, remove, move, copy, and test require their source paths to exist; failures identify the operation number.',
            'Move rejects placing a value inside one of its own descendants and applies array index changes in operation order.',
            'Test uses structural JSON equality rather than object identity or serialized key order.',
            'Special object names such as __proto__ are created as own data properties without changing object prototypes.',
          ],
        },
        {
          heading: 'Determinism, privacy, and review',
          paragraphs: [
            'Generation and application run entirely in this browser. The generated diff is intentionally predictable rather than guaranteed minimal, especially for arrays. Review operation order, array replacement cost, concurrent document versions, and application authorization before using a patch against persistent data or an API.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste valid source and target JSON values, or load the sample.',
        'Generate the deterministic patch and inspect each JSON Pointer path.',
        'Edit or paste any supported RFC 6902 operation sequence if needed.',
        'Apply the patch to the source and compare the separate result with the intended target.',
      ],
    },
    'json-to-models': {
      name: 'JSON to Multi-Language Models',
      metadataTitle: 'JSON to Go Structs, Python Pydantic, Rust Serde & C# Online',
      description:
        'Convert JSON data into idiomatic Go structs, Python Pydantic v2 models, Rust Serde structs, C# records, and Kotlin data classes locally.',
      longDescription:
        'Free online JSON to Multi-Language Struct and Model Generator. Generate typed models for Go, Python, Rust, C#, and Kotlin with JSON tags, optional fields, and nested structures without uploading data.',
      keywords: [
        'json to go',
        'json to pydantic',
        'json to rust serde',
        'json to csharp',
        'json to model generator',
      ],
      faqs: [
        {
          question: 'Which programming languages are supported?',
          answer:
            'The generator currently supports Go (Golang structs with JSON tags), Python (Pydantic v2 BaseModels), Rust (Serde structs), C# (Records with JsonPropertyName), and Kotlin (Data classes).',
        },
        {
          question: 'How are nested objects and arrays handled?',
          answer:
            'Nested JSON objects are extracted into separate, typed structs or classes with camel/pascal casing, and array item types are automatically inferred.',
        },
        {
          question: 'Is my JSON data uploaded to any server?',
          answer:
            'No. The code generation runs 100% locally inside your browser using client-side JavaScript.',
        },
      ],
      howToUseSteps: [
        'Paste a representative JSON payload or array of objects into the editor.',
        'Select your target language (Go, Python, Rust, C#, or Kotlin).',
        'Customize the Root Model Name if needed.',
        'Copy the generated typed model definitions into your codebase.',
      ],
    },
  },
  encoding: {
    base64: {
      name: 'Base64 Encoder/Decoder',
      description: 'Encode or decode Base64 strings online. Free Base64 encoder and decoder tool.',
      longDescription:
        'Free online Base64 encoder and decoder. Convert text to Base64 encoding or decode Base64 strings back to plain text instantly.',
      keywords: ['base64 encoder', 'base64 decoder', 'base64 online', 'encode base64'],
      faqs: [
        {
          question: 'What is Base64 encoding?',
          answer:
            'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.',
        },
        {
          question: 'When should I use Base64?',
          answer:
            'Base64 is commonly used for encoding data in emails, embedding images in HTML/CSS, and transmitting binary data over text-based protocols.',
        },
      ],
    },
    'url-encoder': {
      name: 'URL Encoder/Decoder',
      metadataTitle: 'URL Encoder & Decoder Online - URI Component or Full URL',
      description:
        'Encode or decode URI components, complete URLs, or multiple lines locally in your browser with clear malformed-input errors.',
      longDescription:
        'Free online URL encoder and decoder. Percent-encode a query value or preserve URL separators in full-URL mode, then decode valid percent-encoded text without uploading it.',
      keywords: ['url encoder', 'url decoder', 'urlencode online', 'percent encoding'],
      faqs: [
        {
          question: 'What is URL encoding?',
          answer:
            'Percent-encoding represents a UTF-8 byte as % followed by two hexadecimal digits. It is used when a character cannot safely appear in a particular part of a URI.',
        },
        {
          question: 'Should I encode a component or a full URL?',
          answer:
            'Use component mode for one query value, path segment, or fragment value because it also escapes separators such as &, =, /, and ?. Use full URL mode when the input already contains a complete URL and its structural separators must remain readable.',
        },
        {
          question: 'Why does decoding sometimes fail?',
          answer:
            'A percent sign must be followed by two hexadecimal digits and the resulting byte sequence must be decodable. Incomplete sequences such as %2 or malformed UTF-8 are rejected instead of being silently changed.',
        },
      ],
      answerSections: [
        {
          heading: 'What the URL encoder changes',
          paragraphs: [
            'Component mode uses the browser encodeURIComponent and decodeURIComponent behavior. It is appropriate for an individual query value or path segment because reserved URL separators are encoded as data. Full URL mode uses encodeURI and decodeURI, which preserve structural characters such as :, /, ?, #, &, and = so an already assembled URL keeps its shape.',
          ],
        },
        {
          heading: 'Worked percent-encoding example',
          paragraphs: [
            'Encoding the component "hello world&role=admin" produces hello%20world%26role%3Dadmin. If the same text were inserted into a query string without component encoding, the ampersand and equals sign could be interpreted as new query parameters rather than part of the value. Batch mode applies the selected operation independently to every non-empty input line.',
          ],
        },
        {
          heading: 'Boundaries and privacy',
          bullets: [
            'This is URI percent-encoding, not application/x-www-form-urlencoded serialization; form encoders commonly represent spaces with + and apply field-level rules.',
            'Decoding does not validate whether the result is a safe, reachable, or trusted URL. Validate schemes, hosts, and redirect destinations separately.',
            'Do not repeatedly encode an already encoded value unless double encoding is intentional; % can become %25.',
            'Conversion runs in the browser. Clipboard history, extensions, shared devices, and any destination where you paste the result remain separate exposure paths.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose Encode or Decode.',
        'Select Component for one URL value or Full URL for an already assembled URL.',
        'Paste one value, or enable Batch Mode for one value per line.',
        'Convert, review any malformed-input error, and copy the result you need.',
      ],
    },
    'jwt-decoder': {
      name: 'JWT Decoder, Signer & HMAC Verifier',
      metadataTitle: 'JWT Decoder, HS256 Signer & Verifier Online',
      description:
        'Decode compact JWTs, create HS256, HS384, or HS512 signatures, and verify HMAC signatures plus time, issuer, and audience claims locally.',
      longDescription:
        'Free browser-based JWT decoder, HMAC signer, and verifier for development. Inspect claims, verify supported shared-secret signatures, or create a synthetic test token without uploading its fields.',
      keywords: [
        'jwt decoder',
        'jwt verifier',
        'jwt signature validator',
        'hs256 jwt generator',
        'jwt parser',
      ],
      faqs: [
        {
          question: 'Does decoding prove that a JWT is authentic?',
          answer:
            'No. Anyone can Base64URL-encode a header and payload. Authenticity is established only after an allowed algorithm verifies with the correct key and every required claim policy passes.',
        },
        {
          question: 'Which JWT algorithms can this page sign and verify?',
          answer:
            'It supports HMAC algorithms HS256, HS384, and HS512 with a text secret. It deliberately rejects alg:none and does not accept RSA, ECDSA, EdDSA, JWK, JWKS, or certificate keys.',
        },
        {
          question: 'Are tokens and secrets uploaded?',
          answer:
            'No. Decoding, Web Crypto HMAC signing, and signature verification run in the browser. Bearer tokens and secrets remain sensitive to clipboard history, extensions, screen sharing, and shared devices, so use synthetic data.',
        },
      ],
      answerSections: [
        {
          heading: 'Decode, verify, and sign are separate operations',
          paragraphs: [
            'Decode splits a three-part compact token and reads its JSON header and claims without trusting them. Verify selects HS256, HS384, or HS512 from the protected header, checks the exact signing input with Web Crypto, then evaluates exp, nbf, iat and optional issuer or audience expectations. Sign serializes the supplied JSON objects, overwrites header.alg with the selected HMAC algorithm, and creates a compact JWS for testing.',
          ],
        },
        {
          heading: 'Verification rules and debugging signals',
          bullets: [
            'A valid HMAC signature proves that the signer held the same secret; it does not prove the secret was stored or distributed safely.',
            'The token is rejected when its header omits alg, selects none, or requests an unsupported asymmetric algorithm.',
            'Expiration, not-before, and issued-at values must be finite NumericDate seconds; clock skew can be set from zero through 300 seconds.',
            'Optional issuer matching is exact. Audience matching accepts the expected value as either the aud string or one item in an aud array.',
            'Authorization claims such as roles and scopes are displayed but remain application-specific and are not evaluated by this page.',
          ],
        },
        {
          heading: 'Security and interoperability boundary',
          paragraphs: [
            'A production verifier should configure its allowed algorithm independently, select keys from a trusted issuer configuration, enforce all application claims, rotate secrets, and handle replay or revocation policy. This page does not decrypt JWE, resolve JWK or JWKS documents, validate certificates, or reproduce library-specific JSON serialization. Generate production tokens only in the trusted identity system that owns the key.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste a compact three-part JWT or load the synthetic HS256 sample.',
        'Inspect decoded fields, remembering they are untrusted until verification succeeds.',
        'For HMAC verification, enter the matching test secret and any expected issuer or audience, then verify.',
        'To create a test token, open the signing section, edit header and payload JSON, select HS256, HS384, or HS512, and sign.',
      ],
    },
    'html-entity': {
      name: 'HTML Entity Encoder/Decoder',
      metadataTitle: 'HTML Entity Decoder & Encoder Online',
      description:
        'Decode named, decimal, and hexadecimal HTML entities, or encode reserved HTML characters and non-ASCII text locally in your browser.',
      longDescription:
        'Free online HTML entity decoder and encoder. Decode named or numeric references and encode reserved HTML characters without sending the text to a conversion API.',
      keywords: [
        'html entity encoder',
        'html entity decoder',
        'html encode',
        'special characters html',
      ],
      faqs: [
        {
          question: 'What are HTML entities?',
          answer:
            'HTML entities are special codes used to display reserved characters in HTML. For example, &lt; represents < and &amp; represents &.',
        },
        {
          question: 'Why encode HTML entities?',
          answer:
            'Encoding reserved characters can keep text from being interpreted as markup in an HTML text context. It is not a complete XSS defense: attributes, URLs, CSS, JavaScript, and untrusted HTML require context-specific escaping or sanitization.',
        },
        {
          question: 'Which entity formats can this tool decode?',
          answer:
            'It decodes browser-recognized named references such as &amp;, decimal numeric references such as &#169;, and hexadecimal references such as &#xA9;.',
        },
      ],
      answerSections: [
        {
          heading: 'What the HTML entity decoder and encoder does',
          paragraphs: [
            'HTML character references represent characters that would otherwise be ambiguous in markup. The encoder replaces reserved characters such as ampersand, less-than, greater-than, quotation mark, and apostrophe. Its extended option also emits decimal references for non-ASCII characters. The decoder resolves named, decimal, and hexadecimal references using the browser HTML parser.',
          ],
        },
        {
          heading: 'HTML entity examples',
          bullets: [
            '&lt; becomes the less-than character, while &gt; becomes greater-than.',
            '&amp; becomes an ampersand and &quot; becomes a quotation mark.',
            '&#169; and &#xA9; are decimal and hexadecimal references for the copyright symbol.',
            'Encoding <p>Research & Development</p> produces text that can be displayed as markup characters instead of being parsed as the same element.',
          ],
        },
        {
          heading: 'Security and rendering boundaries',
          paragraphs: [
            'Entity encoding is context-sensitive. Escaping text for an HTML text node does not make the same value safe inside an event handler, URL, CSS declaration, JavaScript string, or arbitrary HTML fragment. Use framework escaping by default and a maintained sanitizer when trusted formatting must be preserved. Decoding untrusted entities should produce text for inspection, not a reason to inject the result with innerHTML.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose Encode to escape text or Decode to resolve character references.',
        'Paste the source text and optionally enable the extended encoding option.',
        'Select Encode or Decode, then review the converted output.',
        'Apply context-specific escaping or sanitization before using untrusted output in an application.',
      ],
    },
    'hex-encoder': {
      name: 'HEX Encoder/Decoder',
      description:
        'Encode or decode text to/from hexadecimal. Free online HEX encoder and decoder.',
      longDescription:
        'Free online HEX encoder and decoder. Convert text to hexadecimal encoding or decode hexadecimal strings back to plain text instantly.',
      keywords: ['hex encoder', 'hex decoder', 'hexadecimal encoder', 'hex to text', 'text to hex'],
      faqs: [
        {
          question: 'What is hexadecimal encoding?',
          answer: 'Hexadecimal encoding represents UTF-8 bytes in base-16 notation (0-9, A-F).',
        },
        {
          question: 'How do I use this tool?',
          answer:
            'Enter text in the input field and it will automatically be converted to hexadecimal. You can also paste hexadecimal to decode it back to text.',
        },
      ],
    },
    'binary-encoder': {
      name: 'Binary Encoder/Decoder',
      description: 'Encode or decode text to/from binary. Free online binary encoder and decoder.',
      longDescription:
        'Free online binary encoder and decoder. Convert text to binary encoding (0s and 1s) or decode binary strings back to plain text instantly.',
      keywords: [
        'binary encoder',
        'binary decoder',
        'binary converter',
        'text to binary',
        'binary to text',
      ],
      faqs: [
        {
          question: 'What is binary encoding?',
          answer: 'Binary encoding represents UTF-8 bytes in base-2 notation using only 0s and 1s.',
        },
        {
          question: 'How many bits per character?',
          answer: 'Each character is represented by 8 bits (1 byte) in this tool.',
        },
      ],
    },
    'image-to-base64': {
      name: 'Image to Base64',
      description: 'Convert images to Base64 data URIs. Free online image to Base64 encoder.',
      longDescription:
        'Free online image to Base64 converter. Convert images (PNG, JPG, GIF, WebP, SVG) to Base64 data URIs for embedding directly in HTML or CSS.',
      keywords: ['image to base64', 'base64 image encoder', 'data uri generator', 'embed image'],
      faqs: [
        {
          question: 'What is a Base64 data URI?',
          answer:
            'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.',
        },
        {
          question: 'When should I use Base64 images?',
          answer:
            'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.',
        },
      ],
    },
    'unicode-escape': {
      name: 'Unicode Escape Encoder/Decoder',
      description: 'Encode plain text into Unicode escape sequences and decode escaped text back.',
      longDescription:
        'Free online Unicode escape converter. Encode text to \\uXXXX format or decode escaped values back to readable text. Supports \\uXXXX and \\u{XXXXX} forms.',
      keywords: [
        'unicode escape',
        'unicode encoder',
        'unicode decoder',
        'escape sequence',
        '\\uXXXX',
      ],
      faqs: [
        {
          question: 'What is Unicode escaping?',
          answer:
            'Unicode escaping represents characters using hexadecimal code points, such as \\u0041 for "A".',
        },
        {
          question: 'When should I use this tool?',
          answer:
            'Use it when working with JSON, logs, source code, or APIs that contain escaped Unicode text.',
        },
      ],
    },
    'json-string-escape': {
      name: 'JSON String Escape',
      description: 'Escape and unescape JSON string content online.',
      longDescription:
        'Free online JSON string escape tool. Convert raw text into escaped JSON string format or decode escaped JSON string fragments back to readable text.',
      keywords: ['json string escape', 'json escape', 'json unescape', 'string escaping'],
      faqs: [
        {
          question: 'What does JSON string escaping do?',
          answer:
            'It converts special characters like newlines, tabs, and quotes into escaped forms such as \\n, \\t, and \\\".',
        },
        {
          question: 'When is this useful?',
          answer:
            'It is useful when you need to embed strings safely in JSON payloads, configuration files, or API requests.',
        },
      ],
    },
  },
  generators: {
    'uuid-generator': {
      name: 'UUID Generator',
      metadataTitle: 'UUID v4 & v7 Generator Online – Bulk GUIDs',
      description:
        'Generate up to 1,000 cryptographically random UUID v4 or RFC 9562 UUID v7 identifiers locally, then format, copy, or download the batch.',
      longDescription:
        'Free online UUID v4 and v7 generator. Create random v4 or Unix-millisecond-based v7 identifiers, format them as UUIDs or GUIDs, and export a batch without an API upload.',
      keywords: [
        'uuid generator',
        'guid generator',
        'random uuid',
        'uuid v4',
        'uuid v7',
        'time ordered uuid',
      ],
      faqs: [
        {
          question: 'What is a UUID?',
          answer:
            'UUID (Universally Unique Identifier) is a 128-bit identifier designed to be globally unique without a central issuing authority.',
        },
        {
          question: 'What is UUID v4?',
          answer:
            'UUID version 4 is randomly generated. It has 122 random bits and 6 bits for version and variant information.',
        },
        {
          question: 'What is UUID v7?',
          answer:
            'UUID version 7 starts with a 48-bit Unix timestamp in milliseconds and uses 74 additional bits for random data. Values with increasing encoded timestamps sort chronologically, but same-millisecond values are randomized and a backward system-clock adjustment can reverse generation order.',
        },
        {
          question: 'Should I choose UUID v4 or v7?',
          answer:
            'Choose v4 when you want an opaque random identifier. Choose v7 when timestamp locality and chronological database indexing are useful. Neither version should be treated as a secret.',
        },
        {
          question: 'Are the generated UUIDs cryptographically random?',
          answer:
            'The browser cryptography API supplies the 122 random bits in UUID v4 and the 74 random payload bits in UUID v7. UUID v7 also exposes its creation millisecond, so UUIDs are identifiers rather than passwords or tokens.',
        },
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
      metadataTitle: 'Secure Password & Passphrase Generator - Local CSPRNG',
      description:
        'Generate random passwords or EFF-word-list passphrases locally with browser cryptographic randomness and an explicit entropy estimate.',
      longDescription:
        'Free online password and passphrase generator. Choose character sets, length, similar-character filtering, or a six-to-twelve-word EFF passphrase while generation stays in your browser.',
      keywords: [
        'password generator',
        'random password',
        'secure password generator',
        'strong password',
      ],
      faqs: [
        {
          question: 'How strong should my password be?',
          answer:
            'Prefer a unique password generated and stored by a password manager. Sixteen or more random characters from a broad pool, or a six-or-more-word random passphrase, is a practical baseline when the destination accepts it; account-specific requirements can differ.',
        },
        {
          question: 'How is randomness generated?',
          answer:
            'The generator uses crypto.getRandomValues with rejection sampling, not Math.random. Random-character mode includes at least one character from every selected set when the requested length permits it, then securely shuffles the result.',
        },
        {
          question: 'Are generated passwords uploaded or saved?',
          answer:
            'No. Generation and entropy estimation run locally and the app does not save the generated value. Copying can still place it in operating-system clipboard history, extensions can observe page content, and shared devices require extra care.',
        },
      ],
      answerSections: [
        {
          heading: 'How secure password generation works',
          paragraphs: [
            'Random-character mode draws from the enabled lowercase, uppercase, number, and symbol sets with the browser cryptographic random-number generator. Rejection sampling avoids modulo bias. Passphrase mode selects each word independently from the EFF long word list and supports six to twelve words with a chosen separator.',
          ],
        },
        {
          heading: 'Choosing a password or passphrase',
          bullets: [
            'Use a unique value for every account; password reuse turns one breach into access to multiple services.',
            'Prefer the longest value the destination reliably supports. Length usually contributes more than predictable substitutions such as replacing a with @.',
            'Use passphrase mode when a value must be typed or read aloud, and random-character mode when a password manager will store and fill it.',
            'Enable multi-factor authentication where available, especially for email, finance, cloud, and administrator accounts.',
          ],
        },
        {
          heading: 'Entropy estimate and privacy limits',
          paragraphs: [
            'The displayed entropy is a theoretical estimate based on independent uniform choices from the selected pool or word list. It is not a cracking-time promise and does not account for a compromised browser, device, clipboard, password manager, destination service, or recovery process. The generator does not test passwords against breach databases because doing so would require a separate privacy-preserving lookup design.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose Random Characters or Passphrase mode.',
        'Set the length and character sets, or choose the word count and separator.',
        'Generate a new value and review the estimated entropy and any destination-specific rules.',
        'Store the value directly in a trusted password manager and clear clipboard history when appropriate.',
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription:
        'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: [
        'lorem ipsum generator',
        'placeholder text',
        'dummy text generator',
        'filler text',
      ],
      faqs: [
        {
          question: 'What is Lorem Ipsum?',
          answer:
            'Lorem Ipsum is placeholder text commonly used in graphic design, web design, and publishing to fill spaces before actual content is available.',
        },
        {
          question: 'Why use Lorem Ipsum?',
          answer:
            'Lorem Ipsum provides a natural distribution of letters and words, making it ideal for demonstrating layouts without distracting readers with meaningful content.',
        },
      ],
    },
    'qr-code': {
      name: 'QR Code Generator',
      description: 'Generate QR codes from text, URLs, and more. Free online QR code generator.',
      longDescription:
        'Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, WiFi credentials, and more. Customize colors and download in PNG or SVG format.',
      keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code'],
      faqs: [
        {
          question: 'What is a QR code?',
          answer:
            'QR (Quick Response) codes are two-dimensional barcodes that can store various types of data like URLs, text, or contact information and can be scanned by smartphones.',
        },
        {
          question: 'What data can I encode?',
          answer:
            'You can encode URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, vCards, and more.',
        },
      ],
    },
    'slug-generator': {
      name: 'Slug Generator',
      description: 'Generate SEO-friendly URL slugs from text. Free online slug generator.',
      longDescription:
        'Free online slug generator. Convert titles and text into clean, SEO-friendly URL slugs. Supports transliteration for special characters.',
      keywords: ['slug generator', 'url slug', 'seo friendly url', 'permalink generator'],
      faqs: [
        {
          question: 'What is a URL slug?',
          answer:
            'A URL slug is the part of a URL that identifies a particular page in a human-readable form. For example, in /blog/my-first-post, "my-first-post" is the slug.',
        },
        {
          question: 'Why are slugs important for SEO?',
          answer:
            'SEO-friendly slugs help search engines understand your content and improve click-through rates by showing users what the page is about.',
        },
      ],
    },
    'css-gradient': {
      name: 'CSS Gradient Generator',
      description: 'Create beautiful CSS gradients with a visual editor. Free gradient generator.',
      longDescription:
        'Free online CSS gradient generator. Create stunning linear and radial gradients with multiple color stops, presets, and export options. Get production-ready CSS code instantly.',
      keywords: [
        'css gradient generator',
        'gradient maker',
        'linear gradient',
        'radial gradient',
        'css background',
      ],
      faqs: [
        {
          question: 'What types of gradients are supported?',
          answer:
            'This tool supports both linear gradients (with customizable angles) and radial gradients (with circle or ellipse shapes).',
        },
        {
          question: 'Can I export the gradient as an image?',
          answer:
            'Yes! You can download the gradient as a PNG image in addition to copying the CSS code.',
        },
      ],
    },
    'meta-tags': {
      name: 'Meta Tags Generator',
      description: 'Generate SEO meta tags for your website. Free meta tags generator.',
      longDescription:
        'Free online meta tags generator. Create essential HTML meta tags for SEO, Open Graph for social sharing, and Twitter Cards. Improve your website visibility.',
      keywords: [
        'meta tags generator',
        'seo meta tags',
        'open graph tags',
        'twitter card generator',
      ],
      faqs: [
        {
          question: 'What are meta tags?',
          answer:
            'Meta tags are HTML elements that provide metadata about a web page. They help search engines understand your content and control how your page appears in search results.',
        },
        {
          question: 'What are Open Graph tags?',
          answer:
            'Open Graph tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and others.',
        },
      ],
    },
    'css-box-shadow': {
      name: 'CSS Box Shadow Generator',
      metadataTitle: 'CSS Box Shadow & Glassmorphism Generator Online',
      description:
        'Create layered CSS box-shadows and glassmorphism styling visually with live preview and multi-layer support.',
      longDescription:
        'Free visual CSS Box Shadow and Glassmorphism generator. Configure multi-layer shadows, inset shadows, blur, spread, colors, opacity, and backdrop blur with 1-click CSS export.',
      keywords: [
        'css box shadow generator',
        'box shadow tool',
        'glassmorphism generator',
        'css shadow presets',
        'layered box shadow',
      ],
      faqs: [
        {
          question: 'How do multiple box-shadow layers work?',
          answer:
            'CSS box-shadow accepts comma-separated shadow definitions. Layers declared earlier in the list are rendered on top of layers declared later.',
        },
        {
          question: 'What is glassmorphism in CSS?',
          answer:
            'Glassmorphism combines semi-transparent background colors with backdrop-filter: blur() and subtle light borders to mimic frosted glass.',
        },
      ],
      howToUseSteps: [
        'Pick a starter preset (Soft SaaS, Floating, Neon, Glassmorphism) or start from scratch.',
        'Adjust X/Y offsets, blur radius, spread, color, and opacity for each shadow layer.',
        'Add or remove shadow layers to achieve realistic depth.',
        'Copy the generated CSS or Tailwind arbitrary class.',
      ],
    },
    'cron-generator': {
      name: 'Visual Cron Expression Builder',
      metadataTitle: 'Cron Expression Generator & Schedule Builder Online',
      description:
        'Build and visualize standard 5-part cron expressions with minutes, hours, days, weeks, and months options.',
      longDescription:
        'Free online Cron Expression Generator. Build crontab schedules visually with user-friendly selectors and clear English explanations without memorizing syntax.',
      keywords: [
        'cron generator',
        'cron expression builder',
        'crontab generator online',
        'cron schedule maker',
      ],
      faqs: [
        {
          question: 'What are the 5 parts of a standard cron expression?',
          answer:
            'Standard cron expressions consist of 5 fields: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, where 0 is Sunday).',
        },
        {
          question: 'What does */15 mean in cron?',
          answer:
            'The step value */15 in the minute position means "every 15 minutes" (e.g. at :00, :15, :30, and :45).',
        },
      ],
      howToUseSteps: [
        'Select your frequency tab (Minutes, Hourly, Daily, Weekly, or Monthly).',
        'Pick the specific intervals, days of the week, or times of the day.',
        'Review the generated 5-part cron expression and human-readable explanation.',
        'Copy the cron expression to your crontab, GitHub Action, or cloud scheduler.',
      ],
    },
  },
  crypto: {
    'md5-hash': {
      name: 'MD5 Hash Generator',
      metadataTitle: 'MD5 Hash Generator Online – Text & File Checksums',
      description:
        'Generate a 32-character MD5 digest from UTF-8 text or exact file bytes in your browser. Use MD5 only for legacy, non-security checksums.',
      longDescription:
        'Free online MD5 hash generator. Create MD5 hash values from any text input instantly. Useful for checksums and data verification.',
      keywords: ['md5 generator', 'md5 hash', 'md5 online', 'generate md5'],
      faqs: [
        {
          question: 'What is MD5?',
          answer:
            'MD5 (Message Digest 5) is a cryptographic hash function that produces a 128-bit (16-byte) hash value.',
        },
        {
          question: 'Is MD5 secure?',
          answer:
            'MD5 is no longer considered secure for cryptographic purposes but is still useful for checksums and non-security-critical applications.',
        },
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
      metadataTitle: 'SHA-256 Hash Generator & File Checksum Online',
      description:
        'Generate a 64-character SHA-256 digest from UTF-8 text or exact file bytes, then compare it with an expected checksum in your browser.',
      longDescription:
        'Free online SHA-256 hash generator for UTF-8 text and local file bytes. Check the hexadecimal digest against an expected checksum from a trusted source.',
      keywords: ['sha256 generator', 'sha256 hash', 'sha256 online', 'generate sha256'],
      faqs: [
        {
          question: 'What is SHA256?',
          answer:
            'SHA256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that produces a 256-bit (32-byte) hash value.',
        },
        {
          question: 'Is SHA256 secure?',
          answer:
            'SHA-256 remains suitable for many integrity applications, but an unkeyed digest does not authenticate its source and is not a password-hashing function. Use a trusted expected checksum for file verification and a purpose-built password hash for passwords.',
        },
        {
          question: 'How do I verify a file checksum?',
          answer:
            'Select the file and enter a 64-character SHA-256 value from a trusted independent source in the expected-checksum field. The tool reports whether the generated and expected digests match.',
        },
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
            'To check a file, generate its SHA-256 value and enter the expected 64-character digest obtained from a trusted source. The comparison reports a match or mismatch. A mismatch proves the bytes differ from those used for the expected digest. A match verifies the comparison, but the source of the expected value still matters.',
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
      howToUseSteps: [
        'Enter text or select a local file to generate its SHA-256 digest.',
        'Choose lowercase or uppercase display; the underlying digest is unchanged.',
        'For verification, enter a 64-character expected SHA-256 checksum from a trusted source.',
        'Review the match or mismatch result and investigate any unexpected difference.',
      ],
    },
    'sha512-hash': {
      name: 'SHA512 Hash Generator',
      description: 'Generate SHA512 hash from text online. Free SHA512 hash generator.',
      longDescription:
        'Free online SHA512 hash generator. Create SHA512 hash values from any text input. SHA512 produces a 512-bit hash value and is part of the SHA-2 family.',
      keywords: ['sha512 generator', 'sha512 hash', 'sha512 online', 'generate sha512', 'sha-512'],
      faqs: [
        {
          question: 'What is SHA512?',
          answer:
            'SHA512 (Secure Hash Algorithm 512-bit) is a cryptographic hash function that produces a 512-bit (64-byte) hash value, typically rendered as a 128-digit hexadecimal number.',
        },
        {
          question: 'Is SHA512 secure?',
          answer:
            'Yes, SHA512 is currently considered very secure for cryptographic purposes and is recommended for most applications.',
        },
      ],
    },
    'hmac-generator': {
      name: 'HMAC Generator & Verifier',
      metadataTitle: 'HMAC Generator & Verifier - SHA-256, SHA-384, SHA-512',
      description:
        'Generate or verify HMAC-SHA-256, HMAC-SHA-384, and HMAC-SHA-512 signatures in hexadecimal or Base64, locally in your browser.',
      longDescription:
        'Free online HMAC generator and verifier using the browser Web Crypto API. Authenticate a message with a shared secret and compare supplied signatures without uploading the message or key.',
      keywords: [
        'hmac generator',
        'hmac verifier',
        'hmac sha256',
        'hmac sha512',
        'webhook signature verifier',
        'message authentication code',
      ],
      faqs: [
        {
          question: 'What is HMAC?',
          answer:
            'HMAC is a keyed message authentication code that combines a cryptographic hash function with a shared secret to check message integrity and authenticity.',
        },
        {
          question: 'Is HMAC encryption?',
          answer:
            'No. HMAC does not hide the message. It lets parties that share a secret detect changes and authenticate the message source.',
        },
        {
          question: 'Which algorithms and output formats are supported?',
          answer:
            'The tool supports HMAC with SHA-256, SHA-384, or SHA-512 and displays or verifies signatures in hexadecimal or standard Base64.',
        },
      ],
      answerSections: [
        {
          heading: 'Generate and verify HMAC signatures',
          paragraphs: [
            'Enter the exact message bytes represented by your text, a shared secret, the expected SHA-2 variant, and the signature encoding. Generate produces a signature; Verify recalculates it with the same inputs and compares the decoded bytes. A different newline, character encoding, secret, algorithm, or output encoding changes the result.',
          ],
        },
        {
          heading: 'Common webhook and API uses',
          bullets: [
            'Reproduce a webhook signature while debugging an integration.',
            'Compare a locally calculated HMAC with a signature from a trusted sender.',
            'Convert the same HMAC bytes between hexadecimal and Base64 representations.',
            'Confirm that message changes cause signature verification to fail.',
          ],
        },
        {
          heading: 'Security boundary',
          paragraphs: [
            'HMAC requires a strong shared secret delivered and stored securely. This browser tool is useful for test data, but production secrets should remain in controlled application environments. HMAC authenticates data; it does not encrypt it and it is not a password-storage scheme. Signature checking is delegated to the browser Web Crypto API instead of comparing signature bytes in application JavaScript.',
          ],
        },
      ],
    },
    'pkce-generator': {
      name: 'PKCE Generator & Verifier',
      metadataTitle: 'PKCE Generator & Verifier - OAuth S256 Challenge',
      description:
        'Generate cryptographically random OAuth PKCE code verifiers, derive S256 code challenges, and verify existing pairs locally in your browser.',
      longDescription:
        'Free OAuth PKCE generator and verifier using secure browser randomness and the Web Crypto SHA-256 implementation. Create standards-compatible verifier and S256 challenge pairs without sending them to a server.',
      keywords: [
        'pkce generator',
        'pkce verifier',
        'oauth pkce',
        'code challenge generator',
        's256 challenge',
        'oauth security',
      ],
      faqs: [
        {
          question: 'What is PKCE?',
          answer:
            'PKCE is an OAuth extension that binds an authorization request to a secret code verifier held by the client, reducing authorization-code interception risk.',
        },
        {
          question: 'Which challenge method does this tool use?',
          answer:
            'It uses S256: SHA-256 of the code verifier encoded as unpadded Base64url. The plain method is intentionally not generated.',
        },
        {
          question: 'Can I use the generated value in production?',
          answer:
            'The values use secure browser randomness and valid PKCE characters, but you should generate and retain production verifiers inside the OAuth client that will complete the token exchange.',
        },
      ],
      answerSections: [
        {
          heading: 'How the PKCE S256 pair is created',
          paragraphs: [
            'A PKCE client creates a high-entropy code verifier, hashes its exact ASCII value with SHA-256, and sends the unpadded Base64url result as the code challenge. The authorization request includes code_challenge and code_challenge_method=S256. The later token request sends the original code_verifier so the authorization server can derive and compare the same challenge.',
          ],
        },
        {
          heading: 'Verifier rules and verification',
          bullets: [
            'Generate creates 43 to 128 characters from the RFC 7636 unreserved character set using rejection-sampled secure random bytes.',
            'Derive accepts an existing verifier only when its full value satisfies the length and character rules.',
            'Verify derives S256 again and compares it with an exact 43-character Base64url challenge.',
            'Whitespace is significant. Copy the verifier exactly and retain it only for the matching authorization flow.',
          ],
        },
        {
          heading: 'Security boundary',
          paragraphs: [
            'PKCE protects an authorization code from being redeemed without the matching verifier; it does not replace redirect URI validation, OAuth state or OIDC nonce checks, TLS, secure token storage, or authorization-server validation. Generation and hashing happen locally in this browser, but clipboard history, extensions, logs, or a shared device can still expose copied values.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose a verifier length from 43 to 128 characters and generate a secure pair.',
        'Send the challenge with code_challenge_method=S256 in the authorization request.',
        'Keep the verifier in the OAuth client and send it only during the matching token exchange.',
        'To debug an existing pair, paste the verifier and expected challenge, then verify them.',
      ],
    },
    'bcrypt-generator': {
      name: 'Bcrypt Generator & Verifier',
      metadataTitle: 'Bcrypt Hash Generator & Verifier Online - Local',
      description:
        'Generate salted bcrypt hashes with an adjustable cost or verify a test password against an existing $2a$, $2b$, or $2y$ hash locally.',
      longDescription:
        'Free browser-based bcrypt generator and verifier for development and QA. Create a new salted hash or test a password/hash pair without sending field values to a server.',
      keywords: [
        'bcrypt generator',
        'bcrypt hash generator',
        'bcrypt verifier',
        'bcrypt compare online',
        'bcrypt password hash',
      ],
      faqs: [
        {
          question: 'Why does the same password produce a different hash each time?',
          answer:
            'Bcrypt generates a fresh random salt for every hash and stores the salt and cost inside the encoded result. Different hashes can therefore verify the same password without requiring a separate salt column.',
        },
        {
          question: 'What does the bcrypt cost control?',
          answer:
            'The cost is a base-two work factor. Increasing it by one approximately doubles the hashing work. Choose a production cost by benchmarking your own authentication infrastructure rather than copying a browser timing.',
        },
        {
          question: 'Why are passwords longer than 72 UTF-8 bytes rejected?',
          answer:
            'Bcrypt processes only the first 72 bytes. Rejecting longer input prevents two visibly different passwords from being silently treated as the same truncated byte sequence.',
        },
      ],
      answerSections: [
        {
          heading: 'What the bcrypt generator and verifier do',
          paragraphs: [
            'Generate creates a random salt, applies bcrypt with the selected cost, and returns the standard modular hash string containing the version, cost, salt, and checksum. Verify reads those parameters from an existing hash and performs bcrypt again before reporting whether the supplied test password matches. Bcrypt is deliberately slow, unlike fast checksum hashes such as MD5 or SHA-256.',
          ],
        },
        {
          heading: 'Cost, salt, and the 72-byte boundary',
          bullets: [
            'The interface offers browser-safe costs from 8 through 14; higher values can take noticeably longer on slower devices.',
            'Every generated hash uses a new cryptographically random salt, so repeated generation should not return identical strings.',
            'The complete encoded hash should be stored. Its salt and cost are already embedded and are used automatically during verification.',
            'The tool counts UTF-8 bytes rather than JavaScript characters and rejects values over bcrypt’s 72-byte processing limit.',
          ],
        },
        {
          heading: 'Safe usage boundary',
          paragraphs: [
            'Use this page with synthetic development or QA data. Production password hashing belongs in a trusted server-side authentication flow with rate limiting, secure transport, breach monitoring, and a documented upgrade strategy. A successful comparison proves only that one password matches one encoded hash; it does not assess password strength, account security, or whether the selected cost is suitable for your servers.',
          ],
        },
        {
          heading: 'Local processing and compatibility',
          paragraphs: [
            'The bcrypt implementation is loaded only after an operation starts, and hashing or comparison runs in this browser. The verifier accepts standard $2a$, $2b$, and $2y$ forms within the cost limit. Clipboard managers, extensions, screen sharing, or an already-compromised device can still expose values, so do not paste real user credentials.',
          ],
        },
      ],
      howToUseSteps: [
        'Enter a synthetic test password and choose a cost appropriate for an interactive browser check.',
        'Generate the hash, then copy the complete encoded value if it is needed in a test fixture.',
        'To verify, enter the candidate password and paste a supported bcrypt hash.',
        'Review the match result and benchmark the final cost in the actual server environment before production use.',
      ],
    },
    'certificate-decoder': {
      name: 'PEM / X.509 Certificate Decoder',
      metadataTitle: 'X.509 Certificate Decoder Online – PEM Inspector',
      description:
        'Decode one X.509 certificate or a PEM chain locally and inspect subject, issuer, dates, SANs, algorithms, extensions, and SHA-256 fingerprints.',
      longDescription:
        'Free browser-based PEM and X.509 certificate decoder. Inspect up to ten certificates from a PEM chain or Base64 DER without uploading certificate data.',
      keywords: [
        'certificate decoder',
        'x509 certificate viewer',
        'pem decoder',
        'ssl certificate checker',
        'certificate fingerprint',
      ],
      faqs: [
        {
          question: 'Does decoding prove that a certificate is trusted?',
          answer:
            'No. Parsing shows encoded fields and can test whether a certificate verifies with its own public key. Trust also requires a valid chain to an accepted root, purpose and name checks, policy, time, and often revocation or transparency evidence.',
        },
        {
          question: 'Can I paste a complete PEM certificate chain?',
          answer:
            'Yes. The tool extracts and decodes up to ten CERTIFICATE blocks in input order. It does not reorder them or prove that each certificate signed the next one.',
        },
        {
          question: 'Are private keys accepted?',
          answer:
            'No. The input accepts PEM CERTIFICATE blocks or Base64-encoded DER certificates. Private-key and certificate-request text is rejected; do not paste private keys into browser tools.',
        },
      ],
      answerSections: [
        {
          heading: 'Fields extracted from an X.509 certificate',
          paragraphs: [
            'The decoder reads ASN.1 DER carried directly as Base64 or inside RFC 7468 PEM boundaries. It reports distinguished subject and issuer names, serial number, not-before and not-after dates, signature and public-key algorithms, supported subject alternative names, extension OIDs, byte size, and a SHA-256 digest of the exact certificate bytes.',
          ],
        },
        {
          heading: 'Validity and self-signature are narrow checks',
          bullets: [
            'Currently valid means the browser clock is between notBefore and notAfter; it does not establish trust or intended usage.',
            'Self-issued means subject and issuer names match, while cryptographically self-signed additionally requires the signature to verify with the certificate public key.',
            'Unsupported browser cryptography can leave the self-signature result unknown even when the certificate structure decodes.',
            'A SHA-256 fingerprint identifies exact DER bytes for comparison; it becomes a trust signal only when obtained from an independent trusted channel.',
          ],
        },
        {
          heading: 'Checks that still belong to a TLS or PKI validator',
          paragraphs: [
            'This page does not build a chain against operating-system or browser roots, retrieve intermediates, check key usage or policy for a specific purpose, match a hostname, query OCSP or CRLs, inspect Certificate Transparency logs, or connect to a server. Those decisions require the trust store, connection context, and validation policy of the real client.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste one PEM certificate, a PEM chain, or Base64-encoded DER.',
        'Decode and review the validity badge, identity fields, algorithms, and SHA-256 fingerprint.',
        'Inspect SAN entries and extension OIDs for the names and capabilities you expect.',
        'Use a real TLS or PKI validator with the correct trust store before making a security decision.',
      ],
    },
    'bip39-generator': {
      name: 'BIP-39 Mnemonic Generator',
      metadataTitle: 'BIP-39 Mnemonic Seed Phrase Generator & Validator Online',
      description:
        'Generate cryptographically secure 12, 15, 18, 21, and 24-word BIP-39 mnemonic seed phrases locally in your browser.',
      longDescription:
        'Free client-side BIP-39 Mnemonic Generator and Seed Phrase Validator. Generate crypto seed phrases with secure Web Crypto entropy, calculate checksums, and verify wordlists with zero network transmission.',
      keywords: [
        'bip39 generator',
        'mnemonic phrase generator',
        'crypto seed generator',
        'bip39 validator',
        '24 word seed phrase',
      ],
      faqs: [
        {
          question: 'What is BIP-39?',
          answer:
            'BIP-39 (Bitcoin Improvement Proposal 39) describes the implementation of a mnemonic sentence—a group of easy-to-remember words—for the generation of deterministic crypto wallets.',
        },
        {
          question: 'Is it safe to generate seed phrases here?',
          answer:
            'All generation and entropy calculation uses window.crypto.getRandomValues() and runs 100% locally inside your browser. No seed phrases are ever transmitted over the network.',
        },
      ],
      howToUseSteps: [
        'Choose the desired seed phrase length (12 words for 128-bit entropy or 24 words for 256-bit entropy).',
        'Click Generate New to create a cryptographically secure mnemonic phrase.',
        'Copy and securely write down the seed phrase on a physical medium.',
        'Optionally paste existing seed phrases into the validator to check word validity.',
      ],
    },
  },
  text: {
    'regex-tester': {
      name: 'Regex Tester',
      metadataTitle: 'JavaScript Regex Tester Online – Matches, Groups & Flags',
      description:
        'Test JavaScript regular expressions online with live match highlighting, indices, capture groups, and browser-supported flags.',
      longDescription:
        'Free online regex tester. Test your regular expressions in real-time with match highlighting. Supports JavaScript regex syntax.',
      keywords: ['regex tester', 'regex online', 'test regex', 'regular expression tester'],
      faqs: [
        {
          question: 'What is regex?',
          answer:
            'Regular expressions (regex) are patterns used to match character combinations in strings. They are used for searching, replacing, and validating text.',
        },
        {
          question: 'Which regex flavor is supported?',
          answer:
            'This tester uses the JavaScript RegExp engine and supports ECMAScript syntax and flags available in your browser. Invalid patterns are reported as syntax errors.',
        },
        {
          question: 'Which regex flags can I test?',
          answer:
            'You can test the standard JavaScript flags supported by your browser, including global, case-insensitive, multiline, dotAll, Unicode, and sticky matching.',
        },
      ],
      answerSections: [
        {
          heading: 'What this JavaScript regex tester does',
          paragraphs: [
            "This tester compiles the pattern and flags with the browser's JavaScript RegExp engine, applies it to the supplied text, highlights each match, and reports its starting index and capture groups. Enter the pattern source without surrounding slash delimiters. Add g to collect every match; without it, JavaScript returns only the first match. Use the match count and indices to confirm repeated matches occur where expected.",
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
      metadataTitle: 'Regex Escape Online - Literal Text for JavaScript RegExp',
      description:
        'Escape JavaScript regular-expression metacharacters and literal slashes, or reverse only those supported escapes, entirely in your browser.',
      longDescription:
        'Free online regex escape tool. Convert literal text into a JavaScript-compatible pattern fragment without turning punctuation into unintended regex operators.',
      keywords: ['regex escape', 'escape regex', 'unescape regex', 'regular expression escape'],
      faqs: [
        {
          question: 'Why escape regex characters?',
          answer:
            'Characters such as ., *, +, ?, (, ), [, ], {, }, ^, $, |, and backslash have structural meaning in a regular expression. Prefixing them with a backslash makes the generated pattern fragment match those characters literally.',
        },
        {
          question: 'When should I use this tool?',
          answer:
            'Use it before inserting trusted or untrusted literal text into a larger JavaScript regular expression. Escaping prevents the inserted text from changing the pattern structure, but the surrounding expression can still be inefficient or incorrect.',
        },
        {
          question: 'Does unescape interpret sequences such as \\n or \\d?',
          answer:
            'No. Unescape reverses only the metacharacter and slash escapes produced by this tool. It deliberately preserves regex tokens and string escapes that could carry a different meaning.',
        },
      ],
      answerSections: [
        {
          heading: 'What Regex Escape produces',
          paragraphs: [
            'The escape operation prefixes JavaScript regular-expression metacharacters with a backslash and also escapes / for convenient use inside a /pattern/ literal. For example, price (USD) + tax? becomes price \\(USD\\) \\+ tax\\?. The result is a pattern fragment; flags, anchors, capture groups, and the surrounding expression remain your responsibility.',
          ],
        },
        {
          heading: 'Dynamic-pattern safety boundary',
          bullets: [
            'Escape only the literal portion. Do not escape the operators you intentionally add around it, such as ^, $, or a capture group.',
            'Escaping prevents regex syntax injection from that fragment, but it does not prevent catastrophic backtracking created elsewhere in the final pattern.',
            'JavaScript RegExp syntax differs from PCRE, Python, .NET, Java, and other engines; test the final pattern in the same runtime that will execute it.',
            'If the pattern is placed inside a JavaScript string, source-code string escaping is an additional layer separate from regex escaping.',
          ],
        },
        {
          heading: 'Unescape and privacy limits',
          paragraphs: [
            'Unescape is intentionally conservative: it removes a backslash only before punctuation handled by the escape operation. It does not parse a complete regular expression or convert tokens such as \\d, \\b, \\n, or Unicode escapes into text. Processing remains in the browser, while clipboard and destination-code handling remain outside the tool.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose Escape for literal text or Unescape for a fragment previously produced by this tool.',
        'Paste the text and select Convert.',
        'Insert the escaped fragment into the intended JavaScript regular expression.',
        'Test the complete expression with representative and adversarial input before production use.',
      ],
    },
    'lorem-ipsum': {
      name: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for designs and mockups. Free Lorem Ipsum generator.',
      longDescription:
        'Free online Lorem Ipsum generator. Create placeholder text in paragraphs, sentences, or words for your designs, mockups, and layouts.',
      keywords: [
        'lorem ipsum generator',
        'placeholder text',
        'dummy text generator',
        'filler text',
      ],
      faqs: [
        {
          question: 'What is Lorem Ipsum?',
          answer:
            'Lorem Ipsum is placeholder text commonly used in graphic design, web design, and publishing to fill spaces before actual content is available.',
        },
        {
          question: 'Why use Lorem Ipsum?',
          answer:
            'Lorem Ipsum provides a natural distribution of letters and words, making it ideal for demonstrating layouts without distracting readers with meaningful content.',
        },
      ],
    },
    'text-diff': {
      name: 'Text Diff Tool',
      description: 'Compare two texts and find differences. Free online text comparison tool.',
      longDescription:
        'Free online text diff tool. Compare two texts side-by-side and visualize additions, deletions, and changes. Perfect for code review and document comparison.',
      keywords: ['text diff', 'compare text', 'diff checker', 'text comparison tool'],
      faqs: [
        {
          question: 'How does text diff work?',
          answer:
            'The tool compares two texts line by line and highlights additions (green), deletions (red), and unchanged lines to show the differences.',
        },
        {
          question: 'Can I compare code with this tool?',
          answer:
            'Yes! This tool is perfect for comparing code snippets, configuration files, or any text content.',
        },
      ],
    },
    'markdown-preview': {
      name: 'Markdown Preview',
      metadataTitle: 'Markdown Preview Online - Sanitized GFM to HTML',
      description:
        'Preview GitHub Flavored Markdown, inspect sanitized HTML, and export a standalone HTML file locally in your browser.',
      longDescription:
        'Free online Markdown preview tool. Render GitHub Flavored Markdown with line breaks, tables, tasks, and code blocks, then copy sanitized HTML or download a styled document.',
      keywords: ['markdown preview', 'markdown editor', 'markdown to html', 'md preview'],
      faqs: [
        {
          question: 'What is Markdown?',
          answer:
            'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for documentation, readme files, and content writing.',
        },
        {
          question: 'Can I export the HTML?',
          answer:
            'Yes. You can copy the sanitized fragment or download a standalone HTML document with basic responsive styles. Review the exported markup and links before publishing it in another security context.',
        },
        {
          question: 'Is raw HTML in Markdown safe to preview?',
          answer:
            'Rendered output is sanitized with DOMPurify. Scripts, forms, iframes, style attributes, and other high-risk elements are removed. Linked images are blocked by default; enabling them can contact their hosts, while following a link still contacts its destination.',
        },
      ],
      answerSections: [
        {
          heading: 'What the Markdown preview supports',
          paragraphs: [
            'The renderer uses GitHub Flavored Markdown with hard line-break support. Headings, emphasis, links, images, ordered and unordered lists, task lists, tables, blockquotes, inline code, fenced code blocks, strikethrough, and horizontal rules can be previewed as you type. The HTML view exposes the generated sanitized fragment rather than executing Markdown as code.',
          ],
        },
        {
          heading: 'Sanitization and publishing boundary',
          bullets: [
            'DOMPurify removes scripts, forms, frames, embedded objects, style elements, style attributes, and other disallowed markup before preview or export.',
            'Sanitization is context-specific. Re-sanitise or safely render the output again if another application modifies it, combines it with templates, or places it in a non-HTML context.',
            'Syntax highlighting is not applied; fenced code language labels are preserved as markup hints only.',
            'Linked images are replaced with a visible placeholder unless you explicitly allow them. Relative links and other assets still resolve according to the page where exported HTML is opened.',
          ],
        },
        {
          heading: 'Privacy and external-resource note',
          paragraphs: [
            'Markdown parsing and sanitization run locally and the text is not uploaded by this tool. Linked images are blocked by default. If you enable them, the browser can contact image hosts and disclose connection metadata such as your IP address; the preview applies no-referrer and lazy-loading hints. Following a link, clipboard history, downloaded files, browser extensions, and the location where you publish exported HTML are separate data paths.',
          ],
        },
      ],
      howToUseSteps: [
        'Type Markdown or load the example document.',
        'Switch between Preview and HTML to inspect the rendered result.',
        'Keep linked images disabled for a network-isolated preview, or enable them only when you trust their hosts.',
        'Copy the sanitized HTML fragment or export the standalone HTML document.',
      ],
    },
    'slug-generator': {
      name: 'Slug Generator',
      description: 'Generate SEO-friendly URL slugs from text. Free online slug generator.',
      longDescription:
        'Free online slug generator. Convert titles and text into clean, SEO-friendly URL slugs. Supports transliteration for special characters.',
      keywords: ['slug generator', 'url slug', 'seo friendly url', 'permalink generator'],
      faqs: [
        {
          question: 'What is a URL slug?',
          answer:
            'A URL slug is the part of a URL that identifies a particular page in a human-readable form. For example, in /blog/my-first-post, "my-first-post" is the slug.',
        },
        {
          question: 'Why are slugs important for SEO?',
          answer:
            'SEO-friendly slugs help search engines understand your content and improve click-through rates by showing users what the page is about.',
        },
      ],
    },
    'case-converter': {
      name: 'Case Converter',
      description: 'Convert text between different cases. Free online case converter.',
      longDescription:
        'Free online case converter. Convert text between camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, space case, and dot.case instantly.',
      keywords: [
        'case converter',
        'camel case',
        'pascal case',
        'snake case',
        'kebab case',
        'text case converter',
      ],
      faqs: [
        {
          question: 'What case types are supported?',
          answer:
            'This tool supports camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, space case, and dot.case.',
        },
        {
          question: 'What is camelCase?',
          answer:
            'camelCase starts with a lowercase letter and each subsequent word starts with an uppercase letter. Common in programming.',
        },
      ],
    },
    'word-counter': {
      name: 'Word Counter',
      description:
        'Count words, characters, lines, sentences, and paragraphs online. Free word counter.',
      longDescription:
        'Free online word counter. Count words, characters, characters without spaces, lines, sentences, paragraphs, and calculate reading time for your text.',
      keywords: [
        'word counter',
        'character counter',
        'word count tool',
        'count words online',
        'reading time calculator',
      ],
      faqs: [
        {
          question: 'What is counted?',
          answer:
            'This tool counts words, characters (with and without spaces), lines, sentences, paragraphs, and estimates reading time.',
        },
        {
          question: 'How is reading time calculated?',
          answer:
            'Reading time is calculated based on an average reading speed of 200 words per minute.',
        },
      ],
    },
    'remove-duplicates': {
      name: 'Remove Duplicate Lines',
      description: 'Remove duplicate lines from text. Free online duplicate line remover.',
      longDescription:
        'Free online duplicate line remover. Remove duplicate lines from lists, code, or any text content with options for case sensitivity and whitespace trimming.',
      keywords: [
        'remove duplicates',
        'duplicate line remover',
        'remove duplicate lines',
        'unique lines',
        'deduplicate',
      ],
      faqs: [
        {
          question: 'How does duplicate detection work?',
          answer:
            'The tool compares each line and keeps only the first occurrence. You can toggle case-sensitive matching and whitespace trimming.',
        },
        {
          question: 'What happens to empty lines?',
          answer: 'Empty lines are preserved in their original positions.',
        },
      ],
    },
    'sort-lines': {
      name: 'Sort Lines',
      description: 'Sort lines alphabetically. Free online line sorter.',
      longDescription:
        'Free online line sorter. Sort lines of text alphabetically in ascending or descending order with options for case-sensitive sorting.',
      keywords: ['sort lines', 'line sorter', 'alphabetical sort', 'sort text lines', 'sort list'],
      faqs: [
        {
          question: 'How does sorting work?',
          answer:
            'Lines are sorted alphabetically using Unicode character comparison. You can choose ascending or descending order.',
        },
        {
          question: 'Is sorting case-sensitive?',
          answer:
            'By default, sorting is case-insensitive. You can enable case-sensitive sorting in the options.',
        },
      ],
    },
  },
  converters: {
    'timestamp-converter': {
      name: 'Timestamp Converter',
      metadataTitle: 'Unix Timestamp Converter - Seconds, Milliseconds, UTC & Local',
      description:
        'Convert signed Unix timestamps in seconds or milliseconds to ISO UTC and local time, or convert a parseable date back to epoch time.',
      longDescription:
        'Free online Unix timestamp converter. Switch explicitly between seconds and milliseconds, inspect ISO UTC and browser-local output, or convert a valid date string back to epoch time.',
      keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'date converter'],
      faqs: [
        {
          question: 'What is a Unix timestamp?',
          answer:
            'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), also known as the Unix epoch.',
        },
        {
          question: 'Should I use seconds or milliseconds?',
          answer:
            'Unix tools and many server APIs commonly use seconds, while JavaScript Date.now() returns milliseconds. A current value therefore has about 10 digits in seconds and 13 digits in milliseconds; select the unit explicitly instead of relying on digit guessing.',
        },
        {
          question: 'How are time zones handled?',
          answer:
            'Timestamp output is shown as an ISO 8601 UTC value and as a local value using the browser time zone. When converting text to a timestamp, include Z or an explicit offset when the intended instant must be unambiguous.',
        },
      ],
      answerSections: [
        {
          heading: 'How Unix timestamp conversion works',
          paragraphs: [
            'A Unix timestamp identifies an instant relative to 1970-01-01T00:00:00Z. The converter accepts an integer in the selected seconds or milliseconds unit, turns it into an ISO 8601 UTC string, and also formats the same instant in the browser local time zone. Reverse conversion parses a date string and returns the selected epoch unit.',
          ],
        },
        {
          heading: 'Worked seconds and milliseconds example',
          paragraphs: [
            'The timestamp 1704110400 seconds and 1704110400000 milliseconds represent the same instant: 2024-01-01T12:00:00.000Z. Choosing the wrong unit moves the value far outside the intended date or makes it invalid. Negative timestamps can represent supported dates before the Unix epoch.',
          ],
        },
        {
          heading: 'Parsing limits and precision',
          bullets: [
            'Timestamp input must be a signed safe JavaScript integer. Fractions, exponent notation, and integers outside the safe range are rejected.',
            'Date strings without Z or an explicit numeric offset can be interpreted in the browser local time zone; include an offset for reproducible conversion.',
            'JavaScript Date follows its supported calendar range and does not model leap seconds.',
            'Conversion runs locally. The displayed local time depends on the device time-zone configuration and historical rules available to the browser.',
          ],
        },
      ],
      howToUseSteps: [
        'Select Seconds or Milliseconds to match the source system.',
        'Enter an integer timestamp, or enter an ISO date with an explicit offset.',
        'Compare the UTC and browser-local representations.',
        'Copy the required unit and verify it against the destination API contract.',
      ],
    },
    'color-converter': {
      name: 'Color Converter',
      description: 'Convert colors between HEX, RGB, and HSL formats. Free online color converter.',
      longDescription:
        'Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly. Includes color picker and color variations.',
      keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker'],
      faqs: [
        {
          question: 'What is HEX color?',
          answer:
            'HEX color is a 6-digit hexadecimal representation of a color, commonly used in web design (e.g., #FF5733).',
        },
        {
          question: 'What is the difference between RGB and HSL?',
          answer:
            'RGB (Red, Green, Blue) defines colors by mixing primary colors, while HSL (Hue, Saturation, Lightness) describes colors in terms of their hue, saturation, and brightness.',
        },
      ],
    },
    'json-csv': {
      name: 'JSON to CSV Converter',
      description: 'Convert JSON to CSV and CSV to JSON. Free online format converter.',
      longDescription:
        'Free online JSON to CSV converter. Convert JSON arrays to CSV format or CSV data to JSON. Supports custom delimiters and nested object flattening.',
      keywords: [
        'json to csv',
        'csv to json',
        'json converter',
        'csv converter',
        'format converter',
      ],
      faqs: [
        {
          question: 'What formats are supported?',
          answer:
            'This tool supports conversion between JSON (array of objects) and CSV (comma-separated values). You can also use semicolons, tabs, or pipes as delimiters.',
        },
        {
          question: 'How are nested objects handled?',
          answer:
            'Nested objects can be automatically flattened using dot notation (e.g., address.city) for proper CSV conversion.',
        },
      ],
    },
    'yaml-json': {
      name: 'YAML ↔ JSON Converter',
      description: 'Convert between YAML and JSON formats. Free online YAML JSON converter.',
      longDescription:
        'Free online YAML to JSON and JSON to YAML converter. Perfect for Kubernetes configs, CI/CD pipelines, and configuration file conversions.',
      keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'kubernetes yaml'],
      faqs: [
        {
          question: 'What is YAML?',
          answer:
            "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files, especially in DevOps and cloud environments.",
        },
        {
          question: 'When should I use YAML vs JSON?',
          answer:
            'YAML is preferred for configuration files due to better readability. JSON is better for data interchange and API responses due to universal support.',
        },
      ],
    },
    'image-to-base64': {
      name: 'Image to Base64',
      description: 'Convert images to Base64 data URIs. Free online image to Base64 encoder.',
      longDescription:
        'Free online image to Base64 converter. Convert images (PNG, JPG, GIF, WebP, SVG) to Base64 data URIs for embedding directly in HTML or CSS.',
      keywords: ['image to base64', 'base64 image encoder', 'data uri generator', 'embed image'],
      faqs: [
        {
          question: 'What is a Base64 data URI?',
          answer:
            'A data URI is a way to embed file contents directly in HTML or CSS. The image is converted to Base64 text that browsers can display without separate HTTP requests.',
        },
        {
          question: 'When should I use Base64 images?',
          answer:
            'Base64 images are useful for small icons, logos, or when you want to reduce HTTP requests. Large images should use regular URLs as Base64 increases file size by ~33%.',
        },
      ],
    },
    'roman-numeral-converter': {
      name: 'Roman Numeral Converter',
      description:
        'Convert numbers to Roman numerals and vice versa. Free online Roman numeral converter.',
      longDescription:
        'Free online Roman numeral converter. Convert any number from 1 to 3999 to Roman numerals, or decode Roman numerals back to regular numbers.',
      keywords: ['roman numeral converter', 'number to roman', 'roman to number', 'roman numerals'],
      faqs: [
        {
          question: 'What is the range?',
          answer:
            'Roman numerals can represent numbers from 1 to 3999. Beyond that, special notation is required.',
        },
        {
          question: 'How are numbers formed?',
          answer:
            'Roman numerals use additive notation (VI = 6) and subtractive notation (IV = 4) using letters I, V, X, L, C, D, M.',
        },
      ],
    },
    'number-base-converter': {
      name: 'Number Base Converter',
      description:
        'Convert whole integers between decimal, hexadecimal, octal, and binary without JavaScript number precision loss.',
      longDescription:
        'Free online integer base converter backed by BigInt arithmetic. Convert complete base-10, base-16, base-8, and base-2 values without silently rounding large integers, with a practical input bound that protects the browser UI.',
      keywords: [
        'number base converter',
        'decimal to hex',
        'binary converter',
        'hex converter',
        'base converter',
      ],
      faqs: [
        {
          question: 'What number bases are supported?',
          answer:
            'This tool supports decimal (base-10), hexadecimal (base-16), octal (base-8), and binary (base-2).',
        },
        {
          question: 'How do I use prefixes?',
          answer:
            'You can use prefixes like 0x for hex, 0o for octal, and 0b for binary. They are automatically handled.',
        },
        {
          question: 'Can it convert integers larger than Number.MAX_SAFE_INTEGER?',
          answer:
            'Yes. Conversion uses BigInt and validates the entire input, so large whole integers are preserved instead of rounded. Inputs are limited to 10,000 digits to keep the browser responsive, and fractions are intentionally not supported.',
        },
      ],
    },
    'url-parser': {
      name: 'URL Parser',
      description: 'Parse URLs and inspect protocol, host, path, and query parameters.',
      longDescription:
        'Free online URL parser. Break down any URL into protocol, domain, port, path, query parameters, and hash. Useful for debugging redirects, APIs, and tracking links.',
      keywords: ['url parser', 'parse url', 'url analyzer', 'query parameters', 'url components'],
      faqs: [
        {
          question: 'Can this parse URLs without protocol?',
          answer:
            'Yes. If no protocol is provided, the tool tries to parse the input by assuming HTTPS.',
        },
        {
          question: 'Does it support repeated query params?',
          answer: 'Yes. Repeated query parameters are preserved and returned as arrays.',
        },
      ],
    },
    'query-string-parser': {
      name: 'Query String Parser',
      description: 'Parse query strings to JSON and build query strings from JSON.',
      longDescription:
        'Free online query string parser and builder. Decode URL query parameters into structured JSON or generate query strings from JSON objects.',
      keywords: ['query string parser', 'url parameters', 'parse query string', 'query builder'],
      faqs: [
        {
          question: 'Can I parse a full URL?',
          answer:
            'Yes. You can paste a full URL and the tool will extract and parse the query string portion.',
        },
        {
          question: 'Does it support repeated keys?',
          answer: 'Yes. Repeated keys are preserved as arrays when parsing.',
        },
      ],
    },
    'env-to-json': {
      name: '.env to JSON Converter',
      metadataTitle: '.env to JSON Converter Online - Private Dotenv Parser',
      description:
        'Convert dotenv KEY=VALUE files to JSON or JSON objects back to portable .env text locally, with quoted values, duplicate warnings, and optional primitive inference.',
      longDescription:
        'Free private .env to JSON converter and JSON to dotenv builder. Parse common dotenv syntax or serialize a JSON object without uploading configuration values.',
      keywords: [
        'env to json',
        'dotenv to json',
        'json to env',
        'env file parser',
        'convert env online',
      ],
      faqs: [
        {
          question: 'Are values in a .env file always strings?',
          answer:
            'Environment variables are strings at the process boundary. Optional inference is a convenience for JSON output and converts only clear booleans, JSON-style numbers, and null; leave it disabled when exact string preservation matters.',
        },
        {
          question: 'What happens when a key is defined more than once?',
          answer:
            'The last definition wins, matching common dotenv behavior, and the converter displays a warning with both line numbers so the duplicate is not hidden.',
        },
        {
          question: 'Does this tool expand variables such as ${HOST}?',
          answer:
            'No. It parses values but intentionally does not interpolate variables, execute shell expressions, read files, or contact a server. Expansion behavior differs between dotenv loaders and should be tested in the target runtime.',
        },
      ],
      answerSections: [
        {
          heading: 'What the .env and JSON converter supports',
          paragraphs: [
            'In .env to JSON mode, the parser accepts blank lines, comments, optional export prefixes, common environment variable names, unquoted values, and single-, double-, or backtick-quoted values. Double-quoted newline, carriage return, tab, quote, and backslash escapes are decoded. Quoted values can span lines, while inline comments outside quotes are removed.',
          ],
        },
        {
          heading: 'Type inference and duplicate handling',
          bullets: [
            'By default every parsed environment value remains a string, which reflects how operating systems expose process variables.',
            'Optional inference converts true, false, null, and unambiguous JSON-style numbers; values such as 0012 remain strings to preserve leading zeros.',
            'If a key appears multiple times, the final value is emitted and a warning identifies the duplicate definitions.',
            'JSON output uses a prototype-safe dictionary so special names such as __proto__ remain ordinary data keys.',
          ],
        },
        {
          heading: 'How JSON is written as dotenv text',
          paragraphs: [
            'JSON to .env mode requires a top-level object whose keys are valid environment variable names. Strings are double-quoted and escaped, numbers and booleans are written as literals, null becomes an empty string with a warning, and arrays or nested objects become quoted JSON strings. Review structured values because the receiving application decides whether and how to parse them again.',
          ],
        },
        {
          heading: 'Privacy and dialect differences',
          paragraphs: [
            'Conversion runs in the browser and this tool does not upload field values. Dotenv syntax is a convention with implementation differences: interpolation, command substitution, export handling, and escape rules may vary between Node.js, Docker, shells, and framework-specific loaders. Validate the generated file with the exact runtime that will consume it, and prefer sanitized examples over production credentials.',
          ],
        },
      ],
      howToUseSteps: [
        'Choose .env to JSON or JSON to .env and paste a sanitized configuration sample.',
        'For .env input, decide whether JSON primitives should be inferred or all values should remain strings.',
        'Convert and review duplicate-key or structured-value warnings.',
        'Copy the result and validate it with the exact application or dotenv loader that will consume it.',
      ],
    },
    'svg-to-jsx': {
      name: 'SVG to JSX / React Converter',
      metadataTitle: 'SVG to React / JSX Converter Online – TSX & Component Generator',
      description:
        'Convert SVG markup into clean React JSX or TypeScript TSX components with style conversion and forwardRef support.',
      longDescription:
        'Free online SVG to JSX and React Component generator. Transform SVG elements into production-ready React components with camelCase attributes, inline style objects, and custom props spread.',
      keywords: [
        'svg to jsx',
        'svg to react',
        'svg to tsx',
        'convert svg to react component',
        'svgr online',
      ],
      faqs: [
        {
          question: 'How does this handle SVG attributes in React?',
          answer:
            'All hyphenated HTML/SVG attributes (like stroke-width, fill-rule, clip-path) are converted to valid React camelCase (strokeWidth, fillRule, clipPath), and class becomes className.',
        },
        {
          question: 'Does it support TypeScript and forwardRef?',
          answer:
            'Yes! You can toggle TypeScript interfaces, forwardRef wrappers, and standard prop spreads with one click.',
        },
      ],
      howToUseSteps: [
        'Paste your raw SVG code or load the sample.',
        'Choose your desired component name and options (TypeScript, forwardRef, named export).',
        'Copy the generated React component code directly into your project.',
      ],
    },
    'css-clamp': {
      name: 'CSS clamp() Fluid Calculator',
      metadataTitle: 'CSS clamp() Fluid Typography & Spacing Calculator Online',
      description:
        'Calculate responsive CSS clamp() formulas for fluid typography and spacing across any viewport range.',
      longDescription:
        'Free online CSS clamp() generator. Calculate mathematically perfect responsive typography and spacing curves with SCSS mixins and Tailwind class outputs.',
      keywords: [
        'css clamp calculator',
        'fluid typography generator',
        'css fluid font size',
        'clamp generator',
        'responsive text calculator',
      ],
      faqs: [
        {
          question: 'How does CSS clamp() work?',
          answer:
            'The clamp(min, preferred, max) function sets a preferred value based on viewport width (vw) that is constrained between minimum and maximum bounds.',
        },
        {
          question: 'Why use fluid typography?',
          answer:
            'Fluid typography smoothly scales text across screen sizes without jumping abruptly between fixed media query breakpoints.',
        },
      ],
      howToUseSteps: [
        'Set your minimum and maximum viewport widths (e.g. 375px to 1440px).',
        'Set your minimum and maximum target font sizes or spacing values.',
        'Use the interactive viewport slider to simulate and preview resizing in real-time.',
        'Copy the generated clamp() value or Tailwind arbitrary class.',
      ],
    },
    'docker-run-to-compose': {
      name: 'Docker Run to Compose Converter',
      metadataTitle: 'Docker Run to Docker Compose Converter Online',
      description:
        'Convert complex docker run CLI commands into clean, modern docker-compose.yml services instantly.',
      longDescription:
        'Free online Docker Run to Docker Compose converter. Parse ports, volumes, environment variables, restart policies, and network configs into valid compose.yaml files.',
      keywords: [
        'docker run to compose',
        'docker run to docker-compose',
        'composerize online',
        'convert docker run command',
      ],
      faqs: [
        {
          question: 'Which docker run flags are supported?',
          answer:
            'The converter parses flags including -p/--publish, -v/--volume, -e/--env, --name, --restart, --network, -w/--workdir, -u/--user, --privileged, and container command arguments.',
        },
        {
          question: 'Is the output valid for modern Docker Compose?',
          answer:
            'Yes, the generated YAML follows the modern Docker Compose specification format.',
        },
      ],
      howToUseSteps: [
        'Paste one or more docker run commands into the input box.',
        'The tool parses the command and immediately generates formatted docker-compose.yml YAML.',
        'Copy the YAML and save it as compose.yaml in your project directory.',
      ],
    },
    'json-to-sql': {
      name: 'JSON to SQL Converter',
      metadataTitle: 'JSON to SQL Converter Online – INSERT Statements & DDL Generator',
      description:
        'Convert JSON data into standard SQL INSERT statements and CREATE TABLE DDL queries for PostgreSQL, MySQL, and SQLite.',
      longDescription:
        'Free online JSON to SQL converter. Infer SQL column types, create tables, and generate single or batch INSERT queries from JSON objects or arrays.',
      keywords: [
        'json to sql',
        'convert json to sql insert',
        'json to create table',
        'json to postgresql',
        'json to mysql',
      ],
      faqs: [
        {
          question: 'Which SQL dialects are supported?',
          answer:
            'The converter supports PostgreSQL, MySQL, SQLite, and Microsoft SQL Server dialect flavors.',
        },
        {
          question: 'How are data types inferred?',
          answer:
            'Numbers, booleans, ISO date strings, objects, and text lengths are analyzed across all rows to determine appropriate column data types.',
        },
      ],
      howToUseSteps: [
        'Paste your JSON object or array of objects into the editor.',
        'Select your target SQL dialect and choose options (CREATE TABLE, batch inserts, quoted identifiers).',
        'Copy the generated SQL script and run it in your database client.',
      ],
    },
  },
  formatters: {
    'sql-formatter': {
      name: 'SQL Formatter',
      description: 'Format and beautify SQL queries online. Free SQL formatter and minifier.',
      longDescription:
        'Free online SQL formatter. Beautify messy SQL queries with proper indentation and formatting. Also supports SQL minification for production use.',
      keywords: [
        'sql formatter',
        'format sql',
        'sql beautifier',
        'sql pretty print',
        'sql minifier',
      ],
      faqs: [
        {
          question: 'What SQL dialects are supported?',
          answer:
            'The formatter works with standard SQL syntax and is compatible with most SQL dialects including MySQL, PostgreSQL, SQLite, and SQL Server.',
        },
        {
          question: 'Can I minify SQL?',
          answer:
            'Yes! Use the minify option to compress your SQL queries by removing unnecessary whitespace and comments.',
        },
      ],
    },
    'css-minifier': {
      name: 'CSS Minifier',
      description: 'Minify CSS code for production. Free online CSS minifier and beautifier.',
      longDescription:
        'Free online CSS minifier. Reduce CSS file size by removing comments, whitespace, and optimizing values. Also includes beautify option for development.',
      keywords: ['css minifier', 'minify css', 'css compressor', 'css optimizer', 'css beautifier'],
      faqs: [
        {
          question: 'How much can CSS be reduced?',
          answer:
            'Minification typically reduces CSS file size by 20-40% depending on the original formatting and comment density.',
        },
        {
          question: 'Is the minified CSS valid?',
          answer:
            'Yes! The minifier only removes unnecessary characters while preserving the functionality of your CSS.',
        },
      ],
    },
    'js-minifier': {
      name: 'JavaScript Minifier',
      description: 'Minify JavaScript code for production. Free online JS minifier and beautifier.',
      longDescription:
        'Free online JavaScript minifier. Reduce JS file size by removing comments, whitespace, and optionally console.log statements. Also includes beautify option.',
      keywords: [
        'js minifier',
        'javascript minifier',
        'minify js',
        'javascript compressor',
        'js beautifier',
      ],
      faqs: [
        {
          question: 'What optimizations are applied?',
          answer:
            'The minifier removes comments, whitespace, optional semicolons, and can also remove console.log statements and debugger keywords.',
        },
        {
          question: 'Should I use this for production?',
          answer:
            'This tool uses Terser for parser-backed JavaScript minification. Production builds should still integrate minification into a bundler such as Webpack, Rollup, or esbuild.',
        },
      ],
    },
    'html-formatter': {
      name: 'HTML Formatter',
      metadataTitle: 'HTML Formatter Online - Indent & Beautify Markup Locally',
      description:
        'Indent HTML with selectable spacing and inspect output statistics locally, without executing or uploading the pasted markup.',
      longDescription:
        'Free online HTML formatter. Apply consistent two, four, or eight-space indentation to ordinary HTML markup while preserving comments and inline text for easier review.',
      keywords: [
        'html formatter',
        'html beautifier',
        'format html',
        'html pretty print',
        'beautify html',
      ],
      faqs: [
        {
          question: 'What does the formatter do?',
          answer:
            'The formatter tokenizes tags, comments, and text, then adds indentation and line breaks around recognized block-level structure. It is a readability helper, not an HTML parser, validator, sanitizer, or browser rendering engine.',
        },
        {
          question: 'Can I choose indent size?',
          answer: 'Yes! You can choose between 2, 4, or 8 spaces for indentation.',
        },
        {
          question: 'Does formatting fix invalid or unsafe HTML?',
          answer:
            'No. It does not repair mismatched tags, validate attributes, remove scripts, or prove that markup is safe. Use an HTML validator and a context-appropriate sanitizer when correctness or untrusted content matters.',
        },
      ],
      answerSections: [
        {
          heading: 'What the HTML formatter changes',
          paragraphs: [
            'The formatter separates ordinary block tags onto readable lines, keeps a known set of inline elements with surrounding text, preserves comments, and indents nested structure with the selected number of spaces. The output panel also reports character and line counts so the result can be compared with the input.',
          ],
        },
        {
          heading: 'Formatter versus parser or validator',
          bullets: [
            'Formatting changes whitespace and layout; it does not construct a browser DOM or apply the HTML parsing algorithm.',
            'Mismatched, omitted, or malformed tags are not repaired and may produce misleading indentation.',
            'Scripts, event-handler attributes, unsafe URLs, and other active content are preserved as text. Formatting is not sanitization.',
            'Embedded script, style, template, SVG, or attribute content containing angle brackets can exceed the simple tokenizer boundary and should be handled by a parser-aware development tool.',
          ],
        },
        {
          heading: 'Whitespace and privacy limits',
          paragraphs: [
            'Whitespace can be meaningful in preformatted text, inline flows, templates, emails, and framework directives. Compare behavior in the target browser or template engine before replacing production source. Formatting runs in the browser and the editor does not execute the pasted HTML, but clipboard history, extensions, and any later destination remain separate exposure paths.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste the HTML source or load the sample.',
        'Choose two, four, or eight spaces for indentation.',
        'Review the formatted structure and check complex embedded content manually.',
        'Validate and test the result in the target browser or template engine before production use.',
      ],
    },
    'html-minifier': {
      name: 'HTML Minifier',
      description: 'Minify HTML code for production. Free online HTML minifier.',
      longDescription:
        'Free online HTML minifier. Reduce HTML file size by removing comments and whitespace. Optimize your HTML for faster loading times.',
      keywords: [
        'html minifier',
        'minify html',
        'html compressor',
        'html optimizer',
        'compress html',
      ],
      faqs: [
        {
          question: 'What optimizations are applied?',
          answer:
            'The minifier removes HTML comments and collapses whitespace. You can choose which options to apply.',
        },
        {
          question: 'How much can HTML be reduced?',
          answer:
            'Minification typically reduces HTML file size by 10-30% depending on the original formatting and comment density.',
        },
      ],
    },
    'xml-formatter': {
      name: 'XML Formatter',
      metadataTitle: 'XML Formatter Online - Indent XML, CDATA & Comments',
      description:
        'Indent ordinary XML markup with selectable spacing while preserving comments, CDATA, processing instructions, and simple DOCTYPE declarations.',
      longDescription:
        'Free online XML formatter. Apply consistent indentation to XML tags and inspect comments, CDATA, processing instructions, and text locally in your browser.',
      keywords: [
        'xml formatter',
        'xml beautifier',
        'format xml',
        'xml pretty print',
        'beautify xml',
      ],
      faqs: [
        {
          question: 'What XML features are supported?',
          answer:
            'The tokenizer recognizes ordinary tags, self-closing tags, comments, CDATA sections, processing instructions, and simple DOCTYPE declarations. It does not resolve schemas, namespaces, entities, or external DTD resources.',
        },
        {
          question: 'Can I choose indent size?',
          answer: 'Yes! You can choose between 2, 4, or 8 spaces for indentation.',
        },
        {
          question: 'Does this tool validate well-formed XML?',
          answer:
            'No. It formats token-like markup but does not perform a standards-compliant XML parse. Use an XML parser or validator to detect mismatched tags, invalid names, entity errors, schema violations, and namespace problems.',
        },
      ],
      answerSections: [
        {
          heading: 'What the XML formatter changes',
          paragraphs: [
            'The formatter walks recognizable XML tags and content, decreases indentation before a closing tag, increases it after an opening tag, and preserves self-closing tags, comments, CDATA, processing instructions, and simple DOCTYPE tokens. Two, four, or eight spaces can be selected without sending the document to a server.',
          ],
        },
        {
          heading: 'Formatting is not XML validation',
          bullets: [
            'The tool does not verify one root element, matching tag names, legal attributes, namespace bindings, entity declarations, XSD, DTD, or business rules.',
            'A formatted result can still be malformed XML; validate it with the parser and schema used by the destination system.',
            'Complex internal DTD subsets and unusual markup containing > inside declarations can exceed the simple tokenizer boundary.',
            'External entities are not resolved, which avoids fetching them but also means entity-dependent correctness is not checked.',
          ],
        },
        {
          heading: 'Mixed content, signatures, and privacy',
          paragraphs: [
            'The formatter trims text tokens and inserts whitespace, so mixed-content documents where spaces are semantically significant require careful review. Do not format canonicalized or digitally signed XML because any byte change can invalidate a signature. Processing is local, while clipboard history, extensions, shared devices, and the destination where output is pasted remain separate risks.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste XML or load the sample document.',
        'Choose the indentation width.',
        'Review comments, CDATA, mixed content, and declarations in the formatted output.',
        'Run the result through the destination XML parser and schema validator before use.',
      ],
    },
    'svg-minifier': {
      name: 'SVG Optimizer & Minifier',
      metadataTitle: 'SVG Optimizer & Minifier Online – Compress SVG Files Free',
      description:
        'Minify, optimize, and strip metadata from SVG graphics locally to reduce file size with real-time rendered preview.',
      longDescription:
        'Free online SVG Minifier and Optimizer. Remove editor namespaces, metadata, unneeded decimal precision, and whitespace from SVG files to speed up web page load times.',
      keywords: [
        'svg minifier',
        'svg optimizer',
        'compress svg',
        'shrink svg online',
        'clean svg markup',
      ],
      faqs: [
        {
          question: 'How much does SVG minification reduce file size?',
          answer:
            'Depending on how much editor metadata (Adobe Illustrator, Inkscape) and comment bloat exists, SVG file sizes are often reduced by 30% to 70%.',
        },
        {
          question: 'Does minification affect visual quality?',
          answer:
            'No. The minifier preserves essential visual vectors and curves while rounding redundant multi-digit decimals to maintain pixel-perfect rendering.',
        },
      ],
      howToUseSteps: [
        'Paste bloated or raw SVG markup into the original input area.',
        'Inspect the file size savings percentage and live rendered preview.',
        'Copy the minified SVG markup or click Download to save the optimized SVG file.',
      ],
    },
  },
  utilities: {
    'cron-parser': {
      name: 'Cron Expression Parser',
      description: 'Parse and explain cron expressions. See next execution times.',
      longDescription:
        'Free online cron expression parser. Understand what your cron job schedule means in plain English and see the next scheduled execution times.',
      keywords: [
        'cron parser',
        'cron expression',
        'cron schedule',
        'crontab helper',
        'cron generator',
      ],
      faqs: [
        {
          question: 'What is a cron expression?',
          answer:
            'A cron expression is a string of five fields (minute, hour, day, month, weekday) that defines a schedule for running automated tasks.',
        },
        {
          question: 'What format does this tool use?',
          answer:
            'This tool uses the numeric 5-field Cronie format: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where 0 and 7 are Sunday). Month/day names and tilde randomization are not supported.',
        },
      ],
    },
    'qr-code': {
      name: 'QR Code Generator',
      description: 'Generate QR codes from text, URLs, and more. Free online QR code generator.',
      longDescription:
        'Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, WiFi credentials, and more. Customize colors and download in PNG or SVG format.',
      keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code'],
      faqs: [
        {
          question: 'What is a QR code?',
          answer:
            'QR (Quick Response) codes are two-dimensional barcodes that can store various types of data like URLs, text, or contact information and can be scanned by smartphones.',
        },
        {
          question: 'What data can I encode?',
          answer:
            'You can encode URLs, plain text, email addresses, phone numbers, SMS messages, WiFi credentials, vCards, and more.',
        },
      ],
    },
    'markdown-preview': {
      name: 'Markdown Preview',
      description: 'Preview Markdown in real-time and export to HTML. Free online Markdown editor.',
      longDescription:
        'Free online Markdown preview tool. Write Markdown and see the rendered output in real-time. Export to HTML with proper styling.',
      keywords: ['markdown preview', 'markdown editor', 'markdown to html', 'md preview'],
      faqs: [
        {
          question: 'What is Markdown?',
          answer:
            'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for documentation, readme files, and content writing.',
        },
        {
          question: 'Can I export the HTML?',
          answer: 'Yes! You can copy the generated HTML output to use in your projects.',
        },
      ],
    },
    'http-headers-parser': {
      name: 'HTTP Headers Parser',
      description: 'Parse raw HTTP headers to JSON and build raw headers from JSON.',
      longDescription:
        'Free online HTTP headers parser. Convert header blocks into JSON format and generate header blocks back from JSON for quick debugging and API testing.',
      keywords: ['http headers parser', 'parse headers', 'request headers', 'response headers'],
      faqs: [
        {
          question: 'Can it parse duplicate headers?',
          answer: 'Yes. Duplicate header keys are grouped into arrays in the parsed JSON output.',
        },
        {
          question: 'What input format is expected?',
          answer: 'Use one header per line in the format "Header-Name: value".',
        },
      ],
    },
    'http-status-codes': {
      name: 'HTTP Status Codes',
      description: 'Search, filter, and reference common HTTP response status codes.',
      longDescription:
        'Free online HTTP status code reference. Quickly find informational, success, redirect, client error, and server error codes with clear descriptions.',
      keywords: ['http status codes', 'status code reference', '404', '500', 'http errors'],
      faqs: [
        {
          question: 'What are HTTP status codes?',
          answer:
            'HTTP status codes are standardized server responses that indicate whether a request succeeded, failed, or was redirected.',
        },
        {
          question: 'Which status code classes exist?',
          answer:
            '1xx informational, 2xx success, 3xx redirection, 4xx client errors, and 5xx server errors.',
        },
      ],
    },
    'user-agent-parser': {
      name: 'User Agent Parser Online',
      metadataTitle: 'User Agent Parser – Browser, OS & Device Online',
      description:
        'Parse single or batch User-Agent strings into browser, version, OS, engine, device, CPU, and known bot signals locally in your browser.',
      longDescription:
        'Online user-agent parser powered by the bundled UAParser.js 1.0.41 ruleset. Inspect one string or batch lines and extract browser/version, operating system, rendering engine, device vendor/model/type, CPU architecture, and known bot signals without a parsing API upload.',
      keywords: [
        'user agent parser online',
        'online user agent parser',
        'ua parser online',
        'browser detection',
        'device detection',
        'bot detection',
      ],
      faqs: [
        {
          question: 'How accurate is UA parsing?',
          answer:
            'The tool uses the bundled UAParser.js 1.0.41 ruleset, but results remain heuristic because User-Agent strings are self-reported, reduced, and can be spoofed.',
        },
        {
          question: 'Can it detect bots?',
          answer:
            'It identifies common named search and AI crawler tokens and applies a fallback bot/crawler/spider heuristic. An unlisted or disguised crawler can still be missed.',
        },
        {
          question: 'Can I parse multiple User-Agent strings?',
          answer:
            'Yes. Enable batch mode and paste one User-Agent string per line to receive a JSON array of parsed results.',
        },
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
    'cidr-calculator': {
      name: 'IPv4 CIDR Calculator',
      metadataTitle: 'IPv4 CIDR Calculator - Subnet, Mask & Host Range',
      description:
        'Calculate an IPv4 network address, applicable broadcast address, netmask, wildcard mask, address count, and usable host range from CIDR or dotted mask input.',
      longDescription:
        'Free IPv4 CIDR and subnet calculator. Enter an address with a prefix length or contiguous dotted-decimal mask to inspect the canonical network and host range without uploading data.',
      keywords: [
        'cidr calculator',
        'subnet calculator',
        'ipv4 calculator',
        'network address calculator',
        'netmask calculator',
        'wildcard mask',
      ],
      faqs: [
        {
          question: 'What input formats are supported?',
          answer:
            'Enter a canonical dotted-decimal IPv4 address and either a prefix such as /24 or a contiguous subnet mask such as 255.255.255.0.',
        },
        {
          question: 'How are /31 and /32 networks handled?',
          answer:
            'A /31 is shown with the RFC 3021 point-to-point interpretation, where both endpoints are usable and no broadcast address exists; confirm that the target link supports it. A /32 represents one host route and also has no broadcast address.',
        },
        {
          question: 'Does this calculator support IPv6?',
          answer:
            'No. This version deliberately validates IPv4 only so its address and host-range semantics remain explicit.',
        },
      ],
      answerSections: [
        {
          heading: 'What the IPv4 CIDR calculator returns',
          paragraphs: [
            'CIDR combines an IPv4 address with a prefix length that states how many leading bits identify the network. The calculator normalizes the entered address to its canonical network, then displays the broadcast boundary, dotted netmask, inverse wildcard mask, total address count, and usable host range.',
          ],
        },
        {
          heading: 'Strict input and edge cases',
          bullets: [
            'IPv4 input must contain four decimal octets from 0 through 255; ambiguous leading-zero and shorthand forms are rejected.',
            'Prefix lengths from /0 through /32 are supported, as are contiguous dotted-decimal masks.',
            'For /0 through /30, the network and broadcast boundaries are excluded from the usable host range.',
            'For /31, both point-to-point endpoints are usable under RFC 3021; /32 represents one host route.',
          ],
        },
        {
          heading: 'Operational boundary',
          paragraphs: [
            'The result describes address arithmetic, not routing reachability, firewall policy, DHCP allocation, cloud-provider reservations, VLAN membership, or whether an address is publicly routable. Apply the rules of the target network platform before allocating hosts.',
          ],
        },
      ],
      howToUseSteps: [
        'Enter an IPv4 address such as 192.168.1.130.',
        'Enter a CIDR prefix such as /26 or a contiguous mask such as 255.255.255.192.',
        'Calculate the subnet and review the canonical network, boundaries, masks, and host range.',
        'Copy the result only after confirming the target platform uses the same host semantics.',
      ],
    },
    'chmod-calculator': {
      name: 'Chmod Calculator',
      metadataTitle: 'Chmod Calculator - Octal & Symbolic Permissions',
      description:
        'Convert Unix file permissions between octal digits, rwx symbolic mode, and a ready-to-copy chmod command, including setuid, setgid, and sticky bits.',
      longDescription:
        'Free Unix chmod calculator. Enter a three- or four-digit octal mode or toggle permission bits to inspect the matching symbolic mode and command locally.',
      keywords: [
        'chmod calculator',
        'linux permissions calculator',
        'octal permissions',
        'rwx converter',
      ],
      faqs: [
        {
          question: 'What do 755 and 644 mean?',
          answer:
            'Each octal digit combines read (4), write (2), and execute (1). Mode 755 is rwxr-xr-x, while 644 is rw-r--r--.',
        },
        {
          question: 'What are setuid, setgid, and sticky bits?',
          answer:
            'They are special mode bits represented by a leading octal digit. Their exact security effect depends on the object type, operating system, filesystem, mount options, and execution context.',
        },
        {
          question: 'Does this tool change a file?',
          answer:
            'No. It only calculates and copies permission notation; it cannot access or modify your filesystem.',
        },
      ],
      answerSections: [
        {
          heading: 'How the chmod calculator works',
          paragraphs: [
            'Unix permission modes group read, write, and execute bits for the owner, group, and others. Adding the bit values produces each octal digit: read is 4, write is 2, and execute is 1. The calculator keeps the octal, rwx, and checkbox representations synchronized.',
          ],
        },
        {
          heading: 'Security boundary',
          bullets: [
            'Avoid broad write permissions such as 777 unless the exact threat model and environment require them.',
            'A mode does not show file ownership, ACLs, capabilities, SELinux or AppArmor rules, mount flags, container mappings, or inherited policy.',
            'Uppercase S or T means the special bit is set while the corresponding execute bit is not set.',
            'Review the target path and ownership before running any copied chmod command, especially recursively.',
          ],
        },
      ],
      howToUseSteps: [
        'Enter a three- or four-digit octal mode such as 755 or 4755.',
        'Alternatively, toggle read, write, execute, and special bits.',
        'Review the synchronized octal and symbolic representations.',
        'Copy the command only after checking the target path and ownership.',
      ],
    },
    'cache-control': {
      name: 'Cache-Control Parser & Builder',
      metadataTitle: 'Cache-Control Header Parser & Builder Online',
      description:
        'Parse and normalize HTTP Cache-Control directives, inspect values, load common response-header presets, and flag frequent directive conflicts.',
      longDescription:
        'Free Cache-Control header parser and builder. Inspect caching directives and common semantic conflicts locally before applying a header to an origin, CDN, or framework.',
      keywords: [
        'cache control header',
        'cache-control parser',
        'http caching',
        'cache header builder',
      ],
      faqs: [
        {
          question: 'What is the difference between no-cache and no-store?',
          answer:
            'no-cache allows a stored response but requires validation before reuse. no-store tells caches not to store the response. They are not interchangeable.',
        },
        {
          question: 'What does s-maxage control?',
          answer:
            's-maxage sets freshness for shared caches and takes precedence over max-age there. Browser and private-cache behavior can still differ.',
        },
        {
          question: 'Can this tool guarantee CDN behavior?',
          answer:
            'No. It validates syntax and flags common conflicts, but actual behavior depends on the complete response, request directives, cache implementation, CDN policy, framework defaults, and invalidation state.',
        },
      ],
      answerSections: [
        {
          heading: 'What the Cache-Control tool checks',
          paragraphs: [
            'The parser separates comma-delimited directives without splitting commas inside quoted values, normalizes directive names, removes duplicate names in the formatted output, and warns about common conflicts such as public with private or non-numeric freshness values.',
          ],
        },
        {
          heading: 'Operational limits',
          bullets: [
            'Cache-Control semantics differ between requests and responses; the presets are response-oriented examples.',
            'A valid header does not override every CDN rule, surrogate header, framework cache, service worker, browser heuristic, or explicit purge.',
            'immutable is most appropriate for versioned resources whose URL changes whenever content changes.',
            'Do not cache personalized or sensitive responses publicly without a complete review of authentication, Vary, cookies, and intermediary behavior.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste a Cache-Control header value or choose a response-oriented preset.',
        'Review the parsed directives, normalized header, and any conflict warnings.',
        'Adjust directive values for the origin and cache architecture you actually use.',
        'Verify the deployed response headers and cache behavior after publishing.',
      ],
    },
    'csp-builder': {
      name: 'CSP Header Builder & Analyzer',
      metadataTitle: 'CSP Generator & Content Security Policy Analyzer',
      description:
        'Generate, normalize, and statically analyze a Content-Security-Policy header. Flag duplicate directives, unsafe script sources, and missing baseline restrictions.',
      longDescription:
        'Free CSP header builder and static analyzer. Start from a strict preset, add or replace directives, and review common security findings locally before testing a policy in Report-Only mode.',
      keywords: [
        'content security policy builder',
        'csp generator',
        'csp analyzer',
        'csp header checker',
        'content-security-policy online',
      ],
      faqs: [
        {
          question: 'Can the analyzer prove that a CSP is secure?',
          answer:
            'No. It flags common static problems, but it cannot understand every application flow, browser behavior, nonce lifecycle, third-party integration, reporting endpoint, or bypass in the protected application.',
        },
        {
          question: 'Why should I start with Report-Only mode?',
          answer:
            'Content-Security-Policy-Report-Only records violations without enforcing the policy. It helps identify required resources before enforcement, although reports still need careful review and can contain sensitive URLs.',
        },
        {
          question: 'What happens to duplicate directives?',
          answer:
            'Browsers use the first occurrence and ignore later duplicate directives. The analyzer reports duplicates, and the normalized builder output keeps one explicit directive.',
        },
      ],
      answerSections: [
        {
          heading: 'What the CSP builder checks',
          paragraphs: [
            "Content Security Policy restricts where a document can load or execute resources. This tool parses semicolon-delimited directives, normalizes their values, detects duplicates, and highlights common risks such as broad script sources, data: scripts, 'unsafe-eval', or 'unsafe-inline' without a nonce or hash.",
          ],
        },
        {
          heading: 'Baseline directives and findings',
          bullets: [
            'default-src provides a fallback for fetch directives that are not declared explicitly.',
            "object-src 'none' blocks legacy plugin content when the application does not need it.",
            'base-uri limits changes to the document base URL, while frame-ancestors controls which parents may embed the page.',
            'A syntactically valid policy can still break production or permit an unsafe flow. Validate required origins, nonces, hashes, workers, frames, forms, and reporting separately.',
          ],
        },
        {
          heading: 'Safe deployment workflow',
          paragraphs: [
            'Begin with a least-privilege draft, deploy it as Content-Security-Policy-Report-Only, exercise real application paths, and inspect violations. Remove accidental dependencies or add the narrowest required sources, then enforce the tested policy. Keep the header under version control and re-test it when frameworks, CDNs, analytics, ads, or authentication flows change.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste an existing policy or load a strict starting preset.',
        'Add or replace directives with the builder and copy the normalized policy.',
        'Resolve high and medium findings in the context of the real application.',
        'Deploy in Report-Only mode, test real flows, then enforce the verified policy.',
      ],
    },
    'curl-to-fetch': {
      name: 'cURL Builder & Fetch Converter',
      metadataTitle: 'cURL to Fetch Converter & Request Builder Online',
      description:
        'Convert supported cURL commands to JavaScript Fetch, or build quoted cURL and Fetch requests from method, URL, headers, query, and body input. Nothing is executed.',
      longDescription:
        'Free browser-based cURL command builder and cURL-to-fetch converter. Configure a method, URL, query parameters, headers, and body or parse a supported cURL command with sensitive-header redaction.',
      keywords: [
        'curl to fetch',
        'curl converter',
        'curl command builder',
        'generate curl command',
        'curl to javascript',
      ],
      faqs: [
        {
          question: 'Does this tool run the cURL command?',
          answer:
            'No. It only tokenizes supported input and generates text. It never starts a shell, contacts the target URL, or sends the headers and body.',
        },
        {
          question: 'Which cURL options can be converted?',
          answer:
            'The converter handles common request options including method, URL, headers, and data, plus harmless location or compression flags. Unsupported or ambiguous shell features are rejected instead of guessed.',
        },
        {
          question: 'Are cURL and fetch always equivalent?',
          answer:
            'No. Redirects, cookies, TLS, proxies, compression, streaming, CORS, browser-forbidden headers, credentials, and multipart uploads can behave differently. Review and test the generated code in its real runtime.',
        },
      ],
      answerSections: [
        {
          heading: 'What the cURL and fetch converter does',
          paragraphs: [
            'The request builder turns structured method, URL, query, header, and body input into a POSIX-shell-quoted cURL command and a JavaScript fetch example. The converter tokenizes a supported pasted cURL command without executing it, then maps the request data to fetch syntax.',
          ],
        },
        {
          heading: 'Parsing and security boundaries',
          bullets: [
            'Shell substitutions, backticks, NUL bytes, malformed quoting, CRLF header injection, and unsupported options are rejected.',
            'Sensitive Authorization, Cookie, proxy authorization, and API-key values can be redacted in generated output and are redacted by default in the interface.',
            'POSIX shell quoting is not PowerShell or Windows cmd quoting. Review the target shell before running copied text.',
            'Repeated request headers may be combined by the Fetch Headers API; the generated snippet calls out duplicate names for manual review.',
            'The tool does not send a request, validate a remote server, store credentials, or prove that copied secrets are safe from extensions, page scripts, clipboard history, or screen sharing.',
          ],
        },
        {
          heading: 'Why generated fetch may need changes',
          paragraphs: [
            'Browser fetch applies CORS and forbidden-header rules that the curl command-line client does not. Server-side JavaScript has another cookie, proxy, and TLS environment. Multipart form uploads, streaming request bodies, client certificates, custom DNS resolution, or curl-specific retry behavior require runtime-specific code beyond a direct conversion.',
          ],
        },
      ],
      howToUseSteps: [
        'Build a request from fields or paste a supported cURL command.',
        'Keep sensitive-header redaction enabled when sharing or reviewing output.',
        'Copy the POSIX cURL command or JavaScript fetch snippet.',
        'Review shell, CORS, credential, redirect, and body semantics before running it.',
      ],
    },
    'color-contrast-checker': {
      name: 'Color Contrast Checker',
      metadataTitle: 'WCAG Color Contrast Checker Online – AA & AAA',
      description:
        'Calculate WCAG 2.x contrast ratios for opaque sRGB hex colors, check normal text, large text, and UI thresholds, and preview the pair live.',
      longDescription:
        'Free local color contrast checker for accessibility reviews. Test foreground and background colors against WCAG AA and AAA thresholds and apply a higher-contrast black or white suggestion.',
      keywords: [
        'color contrast checker',
        'wcag contrast checker',
        'accessibility color checker',
        'contrast ratio',
        'wcag aa aaa',
      ],
      faqs: [
        {
          question: 'What contrast ratios does WCAG require for text?',
          answer:
            'For most text, AA requires at least 4.5:1 and AAA requires 7:1. Large text uses 3:1 for AA and 4.5:1 for AAA. Large text is at least 18 point regular or 14 point bold, commonly approximated as 24 CSS pixels or about 18.66 CSS pixels bold.',
        },
        {
          question: 'What does the UI components result represent?',
          answer:
            'It applies the 3:1 threshold commonly used for visual information needed to identify user-interface components and graphical objects. Applicability depends on state, boundaries, adjacent colors, and whether the visual is required to understand or operate the interface.',
        },
        {
          question: 'Does a passing ratio make the whole design accessible?',
          answer:
            'No. Contrast is one requirement. Font weight, size, spacing, hover and focus states, gradients, images, color-vision differences, zoom, forced colors, and conveying information without color all need separate testing.',
        },
      ],
      answerSections: [
        {
          heading: 'How the contrast ratio is calculated',
          paragraphs: [
            'Each opaque sRGB channel is converted from its encoded value to linear light, combined with the WCAG relative-luminance coefficients, and compared as (lighter + 0.05) / (darker + 0.05). The ratio ranges from 1:1 for identical luminance to 21:1 for black and white. Swapping foreground and background does not change the numeric ratio.',
          ],
        },
        {
          heading: 'AA, AAA, and live preview',
          bullets: [
            'Normal-text AA passes at 4.5:1 and AAA at 7:1.',
            'Large-text AA passes at 3:1 and AAA at 4.5:1.',
            'The UI sample reports the 3:1 non-text threshold without assuming that every visible border must meet it.',
            'The suggestion chooses whichever of opaque black or white has the higher ratio against the current background; it does not preserve brand intent.',
            'The live preview helps spot obvious readability problems but is not a substitute for testing the rendered product at its real sizes and states.',
          ],
        },
        {
          heading: 'Color and rendering boundaries',
          paragraphs: [
            'The calculator accepts three- or six-digit opaque hexadecimal sRGB colors. Alpha transparency, gradients, images, blend modes, display calibration, anti-aliasing, wide-gamut colors, and text drawn over changing content require evaluating the final composited pixels. Processing is local and does not sample another webpage automatically.',
          ],
        },
      ],
      howToUseSteps: [
        'Enter or pick an opaque foreground and background hex color.',
        'Review the exact ratio and each normal-text, large-text, and UI threshold.',
        'Use the live preview and optionally apply the higher-contrast black or white suggestion.',
        'Test the complete interface at real font sizes, weights, component states, zoom levels, and color modes.',
      ],
    },
    'openapi-validator': {
      name: 'OpenAPI Validator & Endpoint Explorer',
      metadataTitle: 'OpenAPI Validator & Endpoint Explorer Online',
      description:
        'Parse OpenAPI 3.0, 3.1, or 3.2 JSON and YAML locally, check core structure and references, and search an endpoint inventory by path, method, tag, or operation ID.',
      longDescription:
        'Free local OpenAPI validator and endpoint explorer. Inspect operations, responses, security inheritance, path parameters, duplicate operation IDs, and local references without fetching remote files.',
      keywords: [
        'openapi validator',
        'swagger validator',
        'openapi endpoint explorer',
        'validate openapi yaml',
        'openapi parser online',
      ],
      faqs: [
        {
          question: 'Which OpenAPI versions are supported?',
          answer:
            'The structural analyzer accepts version strings for OpenAPI 3.0, 3.1, and 3.2. Swagger 2.0 is reported as unsupported rather than being silently converted.',
        },
        {
          question: 'Are external $ref documents downloaded?',
          answer:
            'No. Local fragment references beginning with # are resolved inside the pasted document. File and network references are listed as warnings but are never fetched, which keeps analysis local and avoids hidden network access.',
        },
        {
          question: 'Does a valid result guarantee full OpenAPI conformance?',
          answer:
            'No. This is a focused structural analyzer, not the official schema plus every semantic rule. Use a version-specific validator and the target generator or gateway in CI before publishing an API contract.',
        },
      ],
      answerSections: [
        {
          heading: 'What the structural validator checks',
          paragraphs: [
            'The parser accepts JSON or bounded YAML input, requires an OpenAPI 3 version, info title and version, and a paths object, then inventories standard HTTP operations. It reports missing responses, duplicate operation IDs, unmatched or optional path-template parameters, unusual response keys, unresolved local references, unsupported root versions, and unknown Path Item fields.',
          ],
        },
        {
          heading: 'How the endpoint explorer summarizes the contract',
          bullets: [
            'Each row shows method, path, summary, operationId, response keys, deprecation, and effective security status.',
            'Operation-level security overrides root security; an empty security array is shown as explicitly public.',
            'Search covers path, summary, operationId, and tags, while the method selector narrows the visible operation list.',
            'The normalized JSON view makes YAML parsing results and merged aliases visible for review.',
            'External references are counted and reported without any browser request.',
          ],
        },
        {
          heading: 'Validation and security boundaries',
          paragraphs: [
            'A structurally valid document can still contain incompatible schemas, invalid examples, broken callbacks, incorrect media types, generator-specific extensions, unusable authentication flows, or business behavior that does not match the implementation. Local $ref resolution checks existence but does not fully dereference every semantic context. YAML depth, aliases, merge expansion, and total input size are bounded to protect browser responsiveness.',
          ],
        },
      ],
      howToUseSteps: [
        'Paste an OpenAPI 3 JSON or YAML document, or load the synthetic sample.',
        'Validate and review errors before warnings; correct unresolved local references and operation contract gaps.',
        'Search or filter the endpoint table to inspect methods, responses, IDs, and inherited security.',
        'Copy the normalized JSON when useful, then run the target ecosystem validator and generator in CI.',
      ],
    },
    'dmarc-generator': {
      name: 'DMARC & SPF Record Generator',
      metadataTitle: 'SPF, DMARC & DKIM Record Generator Online – DNS Security Wizard',
      description:
        'Create valid SPF and DMARC DNS TXT records to prevent email spoofing, phishing, and improve inbox deliverability.',
      longDescription:
        'Free online SPF and DMARC DNS TXT record generator. Configure authorized IP ranges, Google Workspace, Microsoft 365, SendGrid, and DMARC enforcement policies with 1-click copy.',
      keywords: [
        'dmarc generator',
        'spf record generator',
        'email security dns',
        'dkim generator',
        'txt record generator',
      ],
      faqs: [
        {
          question: 'What is SPF and why is it needed?',
          answer:
            'SPF (Sender Policy Framework) is a DNS TXT record that lists authorized mail servers allowed to send emails on behalf of your domain name.',
        },
        {
          question: 'What is DMARC?',
          answer:
            'DMARC (Domain-based Message Authentication, Reporting, and Conformance) uses SPF and DKIM to instruct receiving servers how to handle emails that fail authentication.',
        },
      ],
      howToUseSteps: [
        'Enter your domain name (e.g. example.com).',
        'Configure your SPF authorized servers (MX, Google Workspace, Microsoft 365, custom IPs).',
        'Switch to the DMARC tab and select your enforcement policy (none, quarantine, or reject).',
        'Copy the generated DNS TXT records and paste them into your domain registrar / DNS provider.',
      ],
    },
  },
};

function assertToolPageCatalogIntegrity(): void {
  const configuredRoutes = new Set<string>();
  const invalidRoutes: string[] = [];

  for (const [category, categoryTools] of Object.entries(tools)) {
    for (const toolSlug of Object.keys(categoryTools)) {
      configuredRoutes.add(`${category}/${toolSlug}`);
      const catalogTool = findCatalogTool(toolSlug);
      const canonicalCategory = getCanonicalToolCategory(toolSlug, category);

      if (!catalogTool || catalogTool.categorySlug !== canonicalCategory) {
        invalidRoutes.push(`${category}/${toolSlug}`);
      }
    }
  }

  const canonicalRoutes = new Set(toolCatalog.map((tool) => `${tool.categorySlug}/${tool.slug}`));
  const missingRoutes = [...canonicalRoutes].filter((route) => !configuredRoutes.has(route));

  if (missingRoutes.length || invalidRoutes.length) {
    throw new Error(
      `Tool page catalog mismatch. Missing: ${missingRoutes.join(', ') || 'none'}. Invalid: ${invalidRoutes.join(', ') || 'none'}.`,
    );
  }
}

assertToolPageCatalogIntegrity();

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
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;

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
          url: ogImageUrl,
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
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return toolCatalog.map((tool) => ({
    category: tool.categorySlug,
    tool: tool.slug,
  }));
}

const categoryNames = Object.fromEntries(
  categoryCatalog.map((category) => [category.slug, category.name]),
) as Record<string, string>;

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
    <div className="page-shell">
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
        howToUseSteps={tool.howToUseSteps}
      >
        <ToolRenderer toolSlug={toolSlug} />
      </ToolPageWrapper>
    </div>
  );
}
