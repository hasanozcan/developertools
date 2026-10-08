// Templates for project-authored diagnostics; third-party parser messages stay verbatim.
export const diagnosticTemplates: ReadonlyArray<{ key: string; parts: readonly string[] }> = [
  {
    key: 'uiText.13474907',
    parts: ['Tool page catalog mismatch. Missing: ', '. Invalid: ', '.'],
  },
  {
    key: 'uiText.679366f3',
    parts: ['Invalid header line: ', ''],
  },
  {
    key: 'uiText.e99669b9',
    parts: ['Invalid Base58 character "', '"'],
  },
  {
    key: 'uiText.97b146d0',
    parts: [
      'Password is ',
      ' UTF-8 bytes. Bcrypt only processes the first ',
      ' bytes, so shorten it before hashing.',
    ],
  },
  {
    key: 'uiText.ae234493',
    parts: ['Cost must be an integer from ', ' to ', '.'],
  },
  {
    key: 'uiText.f13ed92a',
    parts: [
      'This browser tool accepts bcrypt costs from ',
      ' to ',
      ' to avoid excessively long operations.',
    ],
  },
  {
    key: 'uiText.0de086f8',
    parts: ['Invalid directive name: ', '.'],
  },
  {
    key: 'uiText.db3baed6',
    parts: ['Unclosed quoted value for ', '.'],
  },
  {
    key: 'uiText.da71d0e6',
    parts: ['Directive ', ' requires a value.'],
  },
  {
    key: 'uiText.b8b837c0',
    parts: ['At most ', ' certificates can be decoded at once.'],
  },
  {
    key: 'uiText.2e9cba1e',
    parts: ['Certificate ', ' could not be decoded: ', ''],
  },
  {
    key: 'uiText.20f2b2e1',
    parts: ['Malformed quoted value for ', ': ', '.'],
  },
  {
    key: 'uiText.d80b1907',
    parts: ['Invalid quoted source expression for ', ': ', '.'],
  },
  {
    key: 'uiText.9fa75862',
    parts: ['Invalid CSP directive name: ', '.'],
  },
  {
    key: 'uiText.209b927f',
    parts: ['Invalid semicolon in a value for ', '.'],
  },
  {
    key: 'uiText.1996f585',
    parts: ['Result count must be between 1 and ', ''],
  },
  {
    key: 'uiText.2363e131',
    parts: ['Search horizon must be between 1 and ', ' days'],
  },
  {
    key: 'uiText.2d4eaf1f',
    parts: ['No cron occurrence found within the ', '-day search horizon'],
  },
  {
    key: 'uiText.1a61ce00',
    parts: ['Invalid HTTP header name: ', '.'],
  },
  {
    key: 'uiText.e1483cd1',
    parts: ['Header must use "Name: value" syntax: ', '.'],
  },
  {
    key: 'uiText.8c68ccdb',
    parts: ['cURL command exceeds ', ' characters.'],
  },
  {
    key: 'uiText.123464b1',
    parts: ['cURL command exceeds ', ' arguments.'],
  },
  {
    key: 'uiText.5b4e7c0b',
    parts: ['Unsupported shell control operator: ', '.'],
  },
  {
    key: 'uiText.df7c1256',
    parts: ['cURL command has an unclosed ', '-quoted string.'],
  },
  {
    key: 'uiText.b771a501',
    parts: ['Unsupported cURL option: ', '.'],
  },
  {
    key: 'uiText.a670d0c9',
    parts: ['Line ', ': unexpected text after the closing quote'],
  },
  {
    key: 'uiText.267e5212',
    parts: ['Line ', ': unterminated quoted value'],
  },
  {
    key: 'uiText.cd29d604',
    parts: ['Line ', ': expected KEY=VALUE'],
  },
  {
    key: 'uiText.2e4ec9ea',
    parts: [
      'Invalid environment variable name "',
      '". Use letters, digits, underscores, dots, or hyphens, and do not start with a digit.',
    ],
  },
  {
    key: 'uiText.9abfc1d4',
    parts: ['Unsupported HMAC algorithm: ', ''],
  },
  {
    key: 'uiText.2cc9b38b',
    parts: ['Unsupported HMAC output encoding: ', ''],
  },
  {
    key: 'uiText.fd5e4ef2',
    parts: ['Invalid JSON Pointer escape in path ', '.'],
  },
  {
    key: 'uiText.c1b49227',
    parts: ['Invalid array index: ', '.'],
  },
  {
    key: 'uiText.99783792',
    parts: ['Array index ', ' is out of bounds.'],
  },
  {
    key: 'uiText.1ef6642b',
    parts: ['Path does not exist: ', '.'],
  },
  {
    key: 'uiText.66fdea9e',
    parts: ['Cannot traverse through a primitive at ', '.'],
  },
  {
    key: 'uiText.a0532db0',
    parts: ['The parent of ', ' is not an array or object.'],
  },
  {
    key: 'uiText.ecf98b2c',
    parts: ['Test operation failed at ', '.'],
  },
  {
    key: 'uiText.c626bdcd',
    parts: ['Operation ', ' (', ') failed: ', ''],
  },
  {
    key: 'uiText.d1463a4b',
    parts: ['Non-JSON value found at ', '.'],
  },
  {
    key: 'uiText.a4c649dc',
    parts: ['Operation ', ' must contain string op and path fields.'],
  },
  {
    key: 'uiText.c9c1393c',
    parts: ['Operation ', ' (', ') requires a value.'],
  },
  {
    key: 'uiText.8ba041c2',
    parts: ['Operation ', ' (', ') requires a from path.'],
  },
  {
    key: 'uiText.f545b11f',
    parts: ['Operation ', ' uses unsupported op ', '.'],
  },
  {
    key: 'uiText.0974bcfa',
    parts: ['Invalid string escape at position ', '.'],
  },
  {
    key: 'uiText.d7023c57',
    parts: ['Unescaped control character at position ', '.'],
  },
  {
    key: 'uiText.d042252a',
    parts: ['Unterminated quoted member name at position ', '.'],
  },
  {
    key: 'uiText.11dc84d8',
    parts: ['Unterminated bracket segment at position ', '.'],
  },
  {
    key: 'uiText.4efa8f4c',
    parts: ['Expected ] at position ', '.'],
  },
  {
    key: 'uiText.9735fc99',
    parts: ['Empty selector at position ', '.'],
  },
  {
    key: 'uiText.13a86203',
    parts: ['Expected . or [ at position ', '.'],
  },
  {
    key: 'uiText.856f195a',
    parts: ['The ', ' segment at position ', ' must be followed by a member name or *.'],
  },
  {
    key: 'uiText.da90ad90',
    parts: ['Invalid escape sequence in token "', '". Use ~0 for ~ and ~1 for /.'],
  },
  {
    key: 'uiText.2dee0597',
    parts: ['Token "', '" is not a valid array index.'],
  },
  {
    key: 'uiText.5dc55389',
    parts: ['Array index ', ' does not exist.'],
  },
  {
    key: 'uiText.43a7334b',
    parts: ['Object member "', '" does not exist.'],
  },
  {
    key: 'uiText.647236cb',
    parts: ['Cannot resolve token "', '" through a primitive value.'],
  },
  {
    key: 'uiText.8274f1b8',
    parts: ['Invalid JSON: ', ''],
  },
  {
    key: 'uiText.ff006c2f',
    parts: ['JSON nesting exceeds the supported depth of ', '.'],
  },
  {
    key: 'uiText.eee90d1e',
    parts: ['Enter a ', ' integer.'],
  },
  {
    key: 'uiText.2a750341',
    parts: ['Enter digits after the sign for the ', ' integer.'],
  },
  {
    key: 'uiText.98f68441',
    parts: ['The ', ' prefix does not match the ', ' input field.'],
  },
  {
    key: 'uiText.c480235e',
    parts: ['Enter digits after the ', ' prefix.'],
  },
  {
    key: 'uiText.9901879e',
    parts: ['Invalid ', ' integer. Use only ', '; trailing characters are not allowed.'],
  },
  {
    key: 'uiText.b84ac762',
    parts: ['The document is neither valid JSON nor valid YAML: ', ''],
  },
  {
    key: 'uiText.e9d1b96e',
    parts: ['wordCount must be between ', ' and ', ''],
  },
  {
    key: 'uiText.f48f4d27',
    parts: ['PKCE code verifier length must be between ', ' and ', ' characters'],
  },
  {
    key: 'uiText.1adbcc79',
    parts: ['Random source must return exactly ', ' bytes'],
  },
  {
    key: 'uiText.cb402c70',
    parts: ['tool index ', ': ', ''],
  },
];
