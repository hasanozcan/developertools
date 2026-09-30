# Choose UUID v4 or v7 for an application identifier

UUID v4 and v7 use the familiar hyphenated identifier layout, but they encode different information. Choose the version from your application’s requirements, then check the behavior of the generator you use.

Use v4 when you need a random identifier without an encoded creation time. Consider v7 when keys should group around a creation timestamp. Measure any database benefit with your own schema, indexes, and workload.

## Use a native API for UUID v4

In a browser on HTTPS or localhost:

```javascript
const id = crypto.randomUUID();
const batch = Array.from({ length: 5 }, () => crypto.randomUUID());
console.log(id);
console.log(batch.join("\n"));
```

This creates v4 IDs. `crypto.randomUUID()` does not have a v7 option. The example does not need an additional package.

Python provides `uuid.uuid4()` and adds `uuid.uuid7()` to the standard library in Python 3.14:

```python
import uuid

print(uuid.uuid4())
if hasattr(uuid, "uuid7"):
    print(uuid.uuid7())
else:
    print("UUID v7 requires Python 3.14+ in the standard library")
```

The availability check lets the example explain the requirement on an older runtime instead of failing with a missing attribute.

## Understand the ordering limit

UUID v7 begins with an encoded Unix-millisecond timestamp. What happens within that millisecond depends on the implementation. A random tail does not guarantee generation order among IDs sharing the same timestamp. Python’s implementation uses a counter for within-millisecond monotonicity.

Clock changes and differences between generators also matter. If a workflow needs an authoritative event sequence, store one explicitly instead of inferring it solely from identifiers.

## Keep identity and authorization separate

Retain a database uniqueness constraint and handle an insertion conflict. Choose the representation required by the destination; changing letter case or adding braces is formatting, not a new UUID version.

Knowing an object’s UUID should not grant access to it. UUIDs identify records; use authorization checks and purpose-built secret tokens for credentials such as password reset links.

I maintain DevsTools. The [UUID v4 versus v7 guide](https://devstools.app/guides/uuid-v4-vs-v7) explains the differences and links to the [browser UUID Generator](https://devstools.app/tools/generators/uuid-generator). The tool can generate up to 1,000 IDs, format them, and export a text batch.

References: [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html), [MDN crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID), [Python uuid](https://docs.python.org/3/library/uuid.html).
