# Developer Tools - Backend

.NET Core 9 Web API ile oluşturulmuş RESTful API.

## Gereksinimler

- .NET 9 SDK
- PostgreSQL 15+

## Kurulum

```bash
cd backend

# NuGet paketlerini yükle
dotnet restore

# Veritabanını oluştur ve migrate et
dotnet ef database update --project src/DeveloperTools.Infrastructure --startup-project src/DeveloperTools.Api
```

## Geliştirme

```bash
cd src/DeveloperTools.Api
dotnet run
```

API `http://localhost:5000` adresinde çalışacaktır.
Swagger UI: `http://localhost:5000/swagger`

## Yapı (Clean Architecture)

```
backend/
├── src/
│   ├── DeveloperTools.Api/           # Web API katmanı
│   │   ├── Controllers/              # API Controller'ları
│   │   ├── Program.cs                # Uygulama başlangıç
│   │   └── appsettings.json          # Ayarlar
│   │
│   ├── DeveloperTools.Core/          # Domain katmanı
│   │   ├── Entities/                 # Entity sınıfları
│   │   └── Interfaces/               # Repository arayüzleri
│   │
│   ├── DeveloperTools.Application/   # Uygulama katmanı
│   │   ├── DTOs/                     # Data Transfer Objects
│   │   └── Mappings/                 # Entity-DTO dönüşümleri
│   │
│   └── DeveloperTools.Infrastructure/# Altyapı katmanı
│       ├── Data/                     # DbContext ve Migrations
│       └── Repositories/             # Repository implementasyonları
│
└── DeveloperTools.sln
```

## API Endpoints

### Categories
- `GET /api/categories` - Tüm kategorileri getir
- `GET /api/categories/{slug}` - Slug'a göre kategori getir

### Tools
- `GET /api/tools` - Tüm araçları getir
- `GET /api/tools/{slug}` - Slug'a göre araç detayı
- `GET /api/tools/category/{categorySlug}` - Kategoriye göre araçlar
- `GET /api/tools/featured` - Öne çıkan araçlar
- `GET /api/tools/popular` - Popüler araçlar
- `GET /api/tools/{slug}/related` - İlgili araçlar

### Analytics
- `POST /api/analytics/track` - Araç kullanımı takibi
- `GET /api/analytics/sitemap` - Sitemap verileri

## Veritabanı Şeması

### Tablolar
- `categories` - Araç kategorileri
- `tools` - Araçlar
- `seo_metadata` - SEO meta verileri
- `tool_usage` - Kullanım istatistikleri
- `tool_faqs` - Sık sorulan sorular
- `related_tools` - İlgili araçlar

## Migration Oluşturma

```bash
dotnet ef migrations add MigrationName --project src/DeveloperTools.Infrastructure --startup-project src/DeveloperTools.Api
```

## Veritabanı Bağlantısı

`appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=developertools_dev;Username=postgres;Password=postgres"
  }
}
```
