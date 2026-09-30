import type { CodeExampleContent } from './toolSeoContent';

export const sha256Examples: CodeExampleContent[] = [
  {
    title: 'Hash text and file bytes in the browser',
    language: 'JavaScript',
    code: [
      'async function sha256(bytes) {',
      '  const digest = await crypto.subtle.digest("SHA-256", bytes);',
      '  return Array.from(new Uint8Array(digest),',
      '    byte => byte.toString(16).padStart(2, "0")).join("");',
      '}',
      '',
      'const textBytes = new TextEncoder().encode("abc");',
      'console.log(await sha256(textBytes));',
      '',
      'const file = new File([textBytes], "example.txt");',
      'console.log(await sha256(await file.arrayBuffer()));',
      '// Both: ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    ].join('\n'),
  },
  {
    title: 'Calculate a file checksum without loading the whole file',
    language: 'Python 3',
    code: [
      'import hashlib',
      '',
      'digest = hashlib.sha256()',
      'with open("download.zip", "rb") as file:',
      '    for chunk in iter(lambda: file.read(1024 * 1024), b""):',
      '        digest.update(chunk)',
      'print(digest.hexdigest())',
    ].join('\n'),
  },
];

export const unicodeExamples: CodeExampleContent[] = [
  {
    title: 'Decode a complete JSON string value',
    language: 'JavaScript',
    code: [
      'const jsonText = String.raw`"\\u0041\\u00E9\\uD83D\\uDE00"`;',
      'console.log(JSON.parse(jsonText)); // Aé😀',
      '',
      '// JSON does not accept JavaScript-style braced escapes.',
      'console.log(String.fromCodePoint(0x1F600)); // 😀',
    ].join('\n'),
  },
  {
    title: 'Decode JSON without corrupting existing Unicode text',
    language: 'Python 3',
    code: [
      'import json',
      '',
      'json_text = r\'"\\u0041\\u00E9\\uD83D\\uDE00"\'',
      'print(json.loads(json_text))  # Aé😀',
      '',
      'payload = r\'{"city":"Zürich","label":"\\u0041"}\'',
      'print(json.loads(payload)["city"])  # Zürich',
    ].join('\n'),
  },
];

export const uuidExamples: CodeExampleContent[] = [
  {
    title: 'Generate one UUID v4 or a small batch',
    language: 'JavaScript',
    code: [
      'const id = crypto.randomUUID();',
      'const batch = Array.from({ length: 5 }, () => crypto.randomUUID());',
      'console.log(id);',
      'console.log(batch.join("\\n"));',
      '// randomUUID() creates v4, not v7. Use HTTPS or localhost.',
    ].join('\n'),
  },
  {
    title: 'Generate UUID v4 and check UUID v7 runtime support',
    language: 'Python 3',
    code: [
      'import uuid',
      '',
      'print(uuid.uuid4())',
      'if hasattr(uuid, "uuid7"):  # Standard library: Python 3.14+',
      '    print(uuid.uuid7())',
      'else:',
      '    print("UUID v7 requires Python 3.14+ in the standard library")',
    ].join('\n'),
  },
];
