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
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxxxxxxxxxxxxx
```

## SEO Özellikleri

- Server-Side Rendering (SSR) ile tam SEO desteği
- Dinamik sitemap.xml
- Robots.txt
- Structured Data (JSON-LD)
- Open Graph meta tags
- Breadcrumb navigation

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
