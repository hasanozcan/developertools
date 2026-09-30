# Verify file bytes with SHA-256

When a download page publishes a SHA-256 checksum, the useful comparison is between that expected digest and the exact file you downloaded. Hashing the filename, an extracted file, or text copied from the archive answers a different question.

Get the expected value from the publisher or another trusted channel. A digest beside an untrusted download does not independently authenticate that download.

## Calculate a checksum locally

On Windows, PowerShell provides the file hashing command:

```powershell
Get-FileHash -LiteralPath ".\download.zip" -Algorithm SHA256
```

On macOS, use `shasum -a 256 "download.zip"`. On Linux with GNU coreutils, use `sha256sum "download.zip"`. Replace the filename and compare all 64 hexadecimal characters with the expected checksum.

For a repeatable test in JavaScript, hash exactly three UTF-8 bytes:

```javascript
const bytes = new TextEncoder().encode("abc");
const digest = await crypto.subtle.digest("SHA-256", bytes);
const hex = Array.from(new Uint8Array(digest), (byte) =>
  byte.toString(16).padStart(2, "0"),
).join("");
console.log(hex);
// ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
```

Run this in a browser on HTTPS or localhost. Adding a newline changes the bytes and the resulting digest. For a selected browser `File`, pass its `arrayBuffer()` to the digest call instead of encoding its name.

Python can process an existing file in chunks:

```python
import hashlib

digest = hashlib.sha256()
with open("download.zip", "rb") as file:
    for chunk in iter(lambda: file.read(1024 * 1024), b""):
        digest.update(chunk)
print(digest.hexdigest())
```

## Investigate mismatches

Check the release version, operating system, and selected filename. Verify the archive if its checksum was published, rather than one extracted member. Retry a partial download and investigate any unexplained difference.

A checksum match supports the comparison against a trusted expected value. It does not establish that the software is harmless or turn a hash into a digital signature.

I maintain DevsTools. The [file checksum guide](https://devstools.app/guides/verify-sha256-file-checksum) includes browser, terminal, and Python examples. Its [SHA-256 tool](https://devstools.app/tools/crypto/sha256-hash) hashes selected file bytes locally and compares an expected checksum.

References: [MDN Web Crypto digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest), [Python hashlib](https://docs.python.org/3/library/hashlib.html), [Microsoft Get-FileHash](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash).
