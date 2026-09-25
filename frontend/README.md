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

- 20 konu koleksiyonu: `/collections` ve 6 ek dilde localized karşılıkları
- 10 geliştirici rolü landing page'i: `/for/[audience]` ve localized karşılıkları
- Tool sayfalarında FAQ, HowTo, WebApplication, Breadcrumb ve related-tool structured data
- Tool sayfalarında otomatik örnek kullanım içeriği, workflow bağlantıları ve topic collection iç linkleri
- Dinamik sitemap.xml + canonical/hreflang ağı
- Search Console CSV fırsat analizi: `/seo-opportunities` (`noindex`, tarayıcı içi analiz)
- Robots.txt
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
