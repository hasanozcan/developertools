# Developer Tools - Frontend

Next.js 16 ve React 19 ile oluşturulmuş SEO-odaklı developer tools sitesi.

## Kurulum

```bash
cd frontend
npm ci
```

## Geliştirme

```bash
npm run dev
```

Site `http://localhost:3000` adresinde çalışacaktır.

## Yapı

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Ana layout
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── sitemap.ts            # Dinamik sitemap
│   │   ├── robots.ts             # Robots.txt
│   │   └── tools/
│   │       ├── [category]/       # Kategori sayfaları
│   │       │   └── [tool]/       # Araç sayfaları
│   │
│   ├── components/
│   │   ├── layout/               # Header, Footer, AdBanner
│   │   ├── common/               # CodeEditor, CopyButton, Breadcrumb
│   │   └── tools/                # Araç bileşenleri
│   │
│   └── lib/
│       └── api.ts                # API istemcisi
│
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Araçlar

1. **JSON Formatter** - JSON formatla ve güzelleştir
2. **Base64 Encoder/Decoder** - Base64 kodlama/çözme
3. **URL Encoder/Decoder** - URL kodlama/çözme
4. **JWT Decoder** - JWT token çözümleme
5. **UUID Generator** - UUID v4 üretici
6. **Password Generator** - Güvenli şifre üretici
7. **MD5 Hash Generator** - MD5 hash üretici
8. **SHA256 Hash Generator** - SHA256 hash üretici
9. **Regex Tester** - Regex test aracı
10. **Timestamp Converter** - Unix timestamp dönüştürücü

## Ortam Değişkenleri

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_COLLECTION_INDEX_SLOT=6442607030
NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT=6416143146
NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT=2103906771
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxxxxxxxxxxxxx
```

Collection sayfalarının gelirini AdSense panelinde ayrı ölçmek için AdSense'te üç ayrı display ad unit oluşturun ve her unit'in yalnızca sayısal slot kimliğini şu değişkenlere yazın:

- `NEXT_PUBLIC_ADSENSE_COLLECTION_INDEX_SLOT`: `/collections` sayfasındaki üst reklam.
- `NEXT_PUBLIC_ADSENSE_COLLECTION_TOP_SLOT`: collection detay sayfalarının üst reklamı.
- `NEXT_PUBLIC_ADSENSE_COLLECTION_BOTTOM_SLOT`: collection detay sayfalarının alt reklamı.

Collection reklamları için üç gerçek AdSense unit tanımlıdır ve birbirinden farklı slot kimlikleri kullanır. Ortam değişkenleri bu varsayılanları gerektiğinde override edebilir; boş veya geçersiz değerlerde uygulama Collection için tanımlı gerçek varsayılan slotu kullanmaya devam eder.

### İletişim formu

`/api/contact` için sunucuda `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER` ve `SMTP_PASS` tanımlanmalıdır. `CONTACT_TO_EMAIL` isteğe bağlıdır; tanımlanmazsa `devstoolsapp@gmail.com` kullanılır. Üretimdeki alıcı, `/contact` sayfasında gösterilen adresle aynı olmalı veya yönlendirmesi doğrulanmalıdır. Vercel ortam değişkeni değişiklikleri yeni bir dağıtımdan sonra etkili olur. Gönderim başarısızsa form kullanıcıya hata ve doğrudan e-posta bağlantısı gösterir.

## SEO Özellikleri

- 48 konu koleksiyonu: `/collections` ve 6 ek dilde localized karşılıkları
- 10 geliştirici rolü landing page'i: `/for/[audience]` ve localized karşılıkları
- Tool sayfalarında FAQ, HowTo, WebApplication, Breadcrumb ve related-tool structured data
- Tool sayfalarında otomatik örnek kullanım içeriği, workflow bağlantıları ve topic collection iç linkleri
- Dinamik sitemap.xml + canonical/hreflang ağı
- Search Console CSV fırsat analizi: `/seo-opportunities` (`noindex`, tarayıcı içi analiz)
- Robots.txt
- Open Graph meta tags
- Breadcrumb navigation

### AdSense delivery and tool bottom slots

AdSense scripts (including Auto Ads), Funding Choices consent scripts and their presence signal, manual placements and content-blocker probes run only on the actual browser origin `https://devstools.app`. Localhost, preview deployments, alternate subdomains and custom ports are disabled even when a publisher ID is configured. `www.devstools.app` permanently redirects to the canonical host. `NEXT_PUBLIC_SITE_URL` does not grant permission to serve ads.

The optional bottom placements require two genuine, distinct AdSense display-unit IDs:

- `NEXT_PUBLIC_ADSENSE_TOOL_BOTTOM_SLOT`: the normal `tool-bottom` placement.
- `NEXT_PUBLIC_ADSENSE_TOOL_ZEN_BOTTOM_SLOT`: the mobile/tablet fullscreen `tool-zen-bottom` placement.

Missing, malformed or colliding bottom IDs leave that placement hidden; no other unit is used as a fallback. Keep them empty until their actual IDs are known. These `NEXT_PUBLIC_` values are embedded at build time, so changing them requires a new build. This code does not create ad units or change AdSense experiments.

#### More placements and formats

Two further placements are hidden until they have their own unit id, so nothing changes in production until you create the units in the AdSense console and set the variables:

- `NEXT_PUBLIC_ADSENSE_TOOL_INCONTENT_SLOT`: `tool-in-content`, one unit after the first answer section below the tool. It is hidden from the `lg` breakpoint up, where the sticky sidebar unit already sits next to the content; on phones and tablets that sidebar unit comes after all the content.
- `NEXT_PUBLIC_ADSENSE_CATEGORY_INFEED_SLOT`: `category-<slug>-infeed`, an in-feed card after every 12th tool card on category pages (never after the last one). It must differ from the category top banner id.

Both reject ids already used by another placement on the page, like the bottom slots.

`NEXT_PUBLIC_ADSENSE_SIDEBAR_FORMAT` and `NEXT_PUBLIC_ADSENSE_POST_TOOL_FORMAT` choose the `data-ad-format` of the tool sidebar (default `vertical`) and post-tool banner (default `horizontal`). `auto` lets Google fill the unit with rectangles and half-page sizes as well; compare fill and revenue per placement before keeping it. Unknown values are ignored. Whether a format other than the unit's own is served depends on the unit type in the console.

`NEXT_PUBLIC_ADSENSE_HOME_INFEED_SLOT`, `NEXT_PUBLIC_ADSENSE_HOME_AFTER_TOOLS_SLOT`, `NEXT_PUBLIC_ADSENSE_HOME_BEFORE_SEO_SLOT` and `NEXT_PUBLIC_ADSENSE_CATEGORY_TOP_SLOT` override the unit ids of the home and category placements. They default to the ids those placements already used (`1733348098` is shared by the home in-feed, home after-tools and category top banners; `7781534087` by the home bottom banner and the tool post-result banner), so separate units are needed to tell the placements apart in AdSense reports.

## Build

```bash
npm run build
npm start
```

## Quality & Analysis

```bash
# Lint
npm run lint

# Type checks
npm run type-check

# Unit tests (Vitest)
npm run test

# Full quality pipeline
npm run check

# Dependency advisories and registry signatures
npm run audit:security
npm audit signatures

# Bundle analyzer reports
npm run analyze
```

Bundle analyzer raporlarÄ±:

- `.next/analyze/client.html`
- `.next/analyze/nodejs.html`
- `.next/analyze/edge.html`
