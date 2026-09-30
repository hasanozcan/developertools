# Decode Unicode using the source format

When an API response displays `\u0041`, first determine what you are looking at. It may be literal text containing an escape sequence, a complete JSON string value, or a JSON document that your application has already parsed.

That distinction determines how to decode it. A readable `A` needs no further decoding.

## Parse a JSON string once

Keep the escape notation intact until the JSON parser handles it:

```javascript
const jsonText = String.raw`"\u0041\u00E9\uD83D\uDE00"`;
console.log(JSON.parse(jsonText)); // Aé😀
```

The surrounding double quotes are part of the JSON string value. `String.raw` keeps the backslashes in this example. The two four-digit escapes at the end form a UTF-16 surrogate pair for the emoji.

Python can use the same input format:

```python
import json

json_text = r'"\u0041\u00E9\uD83D\uDE00"'
print(json.loads(json_text))  # Aé😀

payload = r'{"city":"Zürich","label":"\u0041"}'
print(json.loads(payload)["city"])  # Zürich
```

The existing readable characters stay intact. Avoid applying a different text codec blindly to arbitrary UTF-8 text.

## Distinguish JSON from JavaScript notation

JavaScript supports braced Unicode notation such as `\u{1F600}`. JSON does not. JSON also does not accept byte-style `\x41` escapes. For a numeric code point in JavaScript, `String.fromCodePoint(0x1F600)` produces 😀.

Do not use `eval()` to decode externally supplied data. Use a parser for the known document format, or a text converter whose supported escape patterns match your sample.

## Preserve intentional backslashes

A doubled backslash in a JSON value can preserve literal escape notation after parsing. If you still see backslash-u, inspect the producer’s format before decoding again. Another decoding pass might alter text that was intentionally stored literally.

Escaping changes a representation. It does not encrypt a string or make decoded HTML safe to render as markup.

I maintain DevsTools. The [Unicode decoding guide](https://devstools.app/guides/decode-unicode-escapes) covers these cases. The [Unicode Escape Decoder](https://devstools.app/tools/encoding/unicode-escape) supports `\uXXXX`, `\u{XXXXX}`, and `\xXX` text patterns; it is not a complete JSON document parser.

References: [MDN JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), [Python JSON decoding](https://docs.python.org/3/library/json.html), [RFC 8259 JSON strings](https://www.rfc-editor.org/rfc/rfc8259.html#section-7).
