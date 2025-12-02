# Developer Tools - SEO-Odaklı Geliştirici Araçları Sitesi

Yazılımcılar için ücretsiz online araçlar sunan, organik Google trafiği ve reklam geliri odaklı web sitesi.

## Teknoloji Stack

- **Backend**: .NET Core 9 + Entity Framework Core
- **Frontend**: Next.js 14 (React) + Tailwind CSS
- **Database**: PostgreSQL
- **SEO**: Server-Side Rendering, Structured Data, Sitemap

## Proje Yapısı

```
DeveloperTools/
├── backend/                    # .NET Core 9 API
│   ├── src/
│   │   ├── DeveloperTools.Api/
│   │   ├── DeveloperTools.Core/
│   │   ├── DeveloperTools.Application/
│   │   └── DeveloperTools.Infrastructure/
│   └── DeveloperTools.sln
│
└── frontend/                   # Next.js 14 Frontend
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    └── package.json
```

## Araçlar (27 adet)

| Araç | Kategori | İşlem Tipi |
|------|----------|------------|
| JSON Formatter | JSON Tools | Client-side |
| JSON Validator | JSON Tools | Client-side |
| JSON to CSV Converter | JSON Tools | Client-side |
| JSON to TypeScript | JSON Tools | Client-side |
| YAML ↔ JSON Converter | JSON Tools | Client-side |
| Base64 Encoder/Decoder | Encoding | Client-side |
| URL Encoder/Decoder | Encoding | Client-side |
| JWT Decoder | Encoding | Client-side |
| HTML Entity Encoder/Decoder | Encoding | Client-side |
| Image to Base64 | Encoding | Client-side |
| UUID Generator | Generators | Client-side |
| Password Generator | Generators | Client-side |
| Lorem Ipsum Generator | Generators | Client-side |
| QR Code Generator | Generators | Client-side |
| Slug Generator | Generators | Client-side |
| CSS Gradient Generator | Generators | Client-side |
| Meta Tags Generator | Generators | Client-side |
| MD5 Hash Generator | Crypto | Client-side |
| SHA256 Hash Generator | Crypto | Client-side |
| Regex Tester | Text Tools | Client-side |
| Text Diff Tool | Text Tools | Client-side |
| Markdown Preview | Text Tools | Client-side |
| Timestamp Converter | Converters | Client-side |
| Color Converter | Converters | Client-side |
| SQL Formatter | Formatters | Client-side |
| CSS Minifier | Formatters | Client-side |
| JavaScript Minifier | Formatters | Client-side |
| Cron Expression Parser | Utilities | Client-side |

## Hızlı Başlangıç

### Backend

```bash
cd backend

# PostgreSQL veritabanını oluşturun
# Connection string: appsettings.Development.json

# NuGet paketlerini yükle
dotnet restore

# Migration uygula
dotnet ef database update --project src/DeveloperTools.Infrastructure --startup-project src/DeveloperTools.Api

# API'yi başlat
cd src/DeveloperTools.Api
dotnet run
```

API: `http://localhost:5000`
Swagger: `http://localhost:5000/swagger`

### Frontend

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Site: `http://localhost:3000`

## SEO Özellikleri

- ✅ Server-Side Rendering (Next.js)
- ✅ Dinamik Sitemap.xml
- ✅ Robots.txt
- ✅ JSON-LD Structured Data
- ✅ Open Graph Meta Tags
- ✅ Semantic HTML
- ✅ Breadcrumb Navigation
- ✅ FAQ Schema (Rich Snippets)

## Reklam Entegrasyonu

Google AdSense için hazır reklam alanları:

- Header Leaderboard (728x90)
- Sidebar Rectangle (300x250)
- Below Tool Area (728x90)
- In-Content Ads

## Ortam Değişkenleri

### Frontend (.env.local)

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### Backend (appsettings.json)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=developertools;Username=postgres;Password=xxx"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:3000", "https://yoursite.com"]
  }
}
```

## Production Deployment

### Backend
- Azure App Service
- Docker + Kubernetes
- DigitalOcean App Platform

### Frontend
- Vercel (önerilen)
- Netlify
- Self-hosted Node.js

### Database
- Azure Database for PostgreSQL
- Supabase
- Railway

## Lisans

MIT License
