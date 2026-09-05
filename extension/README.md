# DevsTools Browser Extension (Manifest V3)

Official browser extension for **DevsTools** ([devstools.app](https://devstools.app)) — 500 free, privacy-first developer tools running 100% client-side in your browser.

Includes Chromium and Firefox packages. Chrome, Edge, Brave and Opera use the Chromium package; Firefox 142+ uses its own background-script manifest.

---

## 🌟 Key Features

1. 🔍 **Omnibox Direct Search (`dt <query>`)**:
   - Type `dt` followed by space in your browser address bar to search 500 tools instantly.
   - Press `Enter` to launch directly into the desired tool.

2. ⚡ **Offline Quick Tools (Zero-Latency in Popup)**:
   - **JSON Formatter & Minifier**: Prettify or compact JSON payloads in 1 click.
   - **Base64 Encoder & Decoder**: Safe UTF-8 encoding and decoding.
   - **UUID v4 Generator**: Single or batch generation with clipboard copy.
   - **Instant Hash Calculator**: SHA-256 and MD5 computed in real-time as you type.
   - **Unix Timestamp / Epoch Converter**: Current seconds, ms, and ISO 8601 UTC string.

3. 📋 **Right-Click Context Menu Integration**:
   - Highlight any text on any website, right-click, and select:
     - *Format JSON in DevsTools*
     - *Decode / Inspect Base64*
     - *Inspect JWT Token*
     - *Generate Hashes*
     - *Search in DevsTools*

4. 🎁 **Developer Deals & Sponsorships**:
   - Curated developer discounts, cloud credits (DigitalOcean $200 credit, Supabase, Vercel).
   - Dedicated sponsor slot for developer tools and services.

5. 🔒 **Privacy-First (Manifest V3)**:
   - Offline tools process data inside the extension. Selected text is passed to web tools in the URL fragment, which is not sent in HTTP requests. The extension adds no telemetry; the website's privacy policy applies when opening web tools.

---

## 🛠️ How to Install in Developer Mode

### Google Chrome / Brave / Edge / Opera:
1. Open your browser and navigate to `chrome://extensions` (or `edge://extensions` for Edge).
2. Enable **Developer mode** toggle in the top-right corner.
3. Click **Load unpacked**.
4. Select the `extension/` directory from this repository.
5. Pin DevsTools to your browser toolbar!

### Mozilla Firefox:
1. Run `npm run build:extension` from `frontend/` first.
2. Navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**.
4. Select `extension/dist/firefox/manifest.json`.

---

## 📦 How to Package for Chrome Web Store & Firefox AMO

To generate the store-ready zip distribution:

```bash
cd frontend
npm run build:extension
```

This regenerates the catalogue and tool counts, then produces two upload packages:

- `extension/dist/devstools-extension-v1.0.0-chromium.zip` for Chrome and Edge.
- `extension/dist/devstools-extension-v1.0.0-firefox.zip` for Firefox AMO.

Packaging uses Windows' built-in `tar.exe`, or `zip` on macOS/Linux. Store publication requires the developer account, listing details, screenshots, and store review. This build does not submit a listing.

Developer dashboards:
- **Chrome Web Store Developer Dashboard**: [https://chrome.google.com/webstore/devcenter](https://chrome.google.com/webstore/devcenter)
- **Firefox Add-on Developer Hub**: [https://addons.mozilla.org/developers/](https://addons.mozilla.org/developers/)
- **Microsoft Edge Add-ons Partner Center**: [https://partner.microsoft.com/dashboard/microsoftedge](https://partner.microsoft.com/dashboard/microsoftedge)

---

## 📄 License
MIT License © 2026 DevsTools. Built for developers worldwide.
