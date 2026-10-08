// Complete Turkish catalog copy after the shared enhanced-tool fallbacks.
// Keep protocol names, identifiers, and code tokens intact for developer search.
const tools: Record<string, readonly [string, string]> = {
  'bip39-generator': [
    'BIP-39 Kurtarma İfadesi Oluşturucu',
    'Kripto para cüzdanları için 12 veya 24 kelimelik kurtarma ifadeleri oluşturun ve doğrulayın.',
  ],
  'cron-generator': [
    'Görsel Cron İfadesi Oluşturucu',
    'Zamanlama önizlemesiyle standart Cron ifadelerini görsel olarak oluşturun.',
  ],
  'css-box-shadow': [
    'CSS Kutu Gölgesi Oluşturucu',
    'Çok katmanlı kutu gölgelerini ve buzlu cam efektlerini görsel olarak tasarlayın.',
  ],
  'css-clamp': [
    'CSS clamp() Esnek Boyut Hesaplayıcı',
    'Ekran boyutuna uyum sağlayan yazı ve boşluk ölçüleri için CSS clamp() değerlerini hesaplayın.',
  ],
  'dmarc-generator': [
    'DMARC ve SPF Kaydı Oluşturucu',
    'Alan adınızın e-posta güvenliği için SPF, DMARC ve DKIM DNS TXT kayıtları oluşturun.',
  ],
  'docker-run-to-compose': [
    'Docker Run - Compose Dönüştürücü',
    'docker run komutlarını docker-compose.yml hizmet tanımlarına dönüştürün.',
  ],
  'json-string-escape': [
    'JSON Metni Kaçış Karakteri Dönüştürücü',
    'JSON metinlerinde kaçış karakterleri ekleyin veya kaldırın.',
  ],
  'json-to-models': [
    "JSON'dan Çok Dilli Veri Modelleri",
    "JSON'dan Go struct yapıları, Python Pydantic ve Rust Serde modelleri ile C# sınıfları oluşturun.",
  ],
  'json-to-sql': [
    'JSON - SQL Dönüştürücü',
    'JSON verilerinden SQL INSERT sorguları ve CREATE TABLE tanımları oluşturun.',
  ],
  'regex-escape': [
    'Düzenli İfade Kaçış Karakteri Dönüştürücü',
    'Metne, düzenli ifadelerde güvenle kullanılabilmesi için kaçış karakterleri ekleyin.',
  ],
  'svg-minifier': [
    'SVG İyileştirme ve Küçültme Aracı',
    'Canlı görsel önizlemeyle SVG dosyalarını iyileştirin ve boyutlarını küçültün.',
  ],
  'svg-to-jsx': [
    'SVG - JSX / React Dönüştürücü',
    'SVG kodunu özelleştirilebilir seçeneklerle React JSX/TSX bileşenlerine dönüştürün.',
  ],
  'quoted-printable-encoder': [
    'Quoted-Printable MIME Kodlayıcı ve Çözücü',
    'E-posta verilerindeki metinleri MIME Quoted-Printable (RFC 2045) biçiminde kodlayın veya çözün.',
  ],
  'json-patch-generator': [
    'RFC 6902 JSON Patch Oluşturucu',
    'İki nesne arasındaki farklar için standart RFC 6902 JSON Patch işlemleri oluşturun.',
  ],
  'json-flatten-unflatten': [
    'İç İçe JSON Nesnelerini Düzleştirme Aracı',
    'İç içe JSON nesnelerini, nokta gösterimli anahtarlar kullanan tek düzeyli nesnelere dönüştürün.',
  ],
  'morse-code-audio-converter': [
    'Mors Alfabesi Metin Kodlayıcı',
    'Harf ve rakamlardan oluşan metinleri uluslararası Mors alfabesine dönüştürün.',
  ],
  'base64url-encoder': [
    'Base64URL Kodlayıcı ve Çözücü',
    'Dolgu karakterleri olmadan URL uyumlu Base64 verilerini kodlayın veya çözün.',
  ],
  'subtitle-srt-vtt-converter': [
    'SRT - WebVTT Altyazı Dönüştürücü',
    'SubRip (.srt) altyazılarını HTML5 WebVTT (.vtt) biçimine dönüştürün.',
  ],
  'sql-slugifier': [
    'SQL Veritabanı Tanımlayıcısı Oluşturucu',
    'Metinleri geçerli snake_case SQL tablo ve sütun adlarına dönüştürün.',
  ],
  'ai-agent-prompt-optimizer': [
    'Yapay Zekâ Ajanı İstem Düzenleyici',
    'Otonom yapay zekâ ajanları için rol, kısıt ve hedef talimatlarını yapılandırın.',
  ],
  'apache-conf-formatter': [
    'Apache VirtualHost Yapılandırma Biçimlendirici',
    'Apache HTTP Server VirtualHost ve Directory yönergelerini biçimlendirin ve girintileyin.',
  ],
  'docker-compose-formatter': [
    'Docker Compose YAML Biçimlendirici',
    'docker-compose.yml dosyalarını biçimlendirin ve sekme girintilerini düzeltin.',
  ],
  'toml-formatter': [
    'TOML Yapılandırma Dosyası Biçimlendirici',
    'TOML yapılandırma anahtarlarını ve tablo başlıklarını biçimlendirin ve düzenleyin.',
  ],
  'protobuf-formatter': [
    'Protocol Buffers (.proto) Biçimlendirici',
    'Protobuf proto3 hizmet ve mesaj tanımlarını biçimlendirin ve girintileyin.',
  ],
  'totp-authenticator-simulator': [
    'RFC 6238 TOTP Doğrulayıcı Simülatörü',
    'Geri sayım sayacıyla zamana dayalı, altı haneli tek kullanımlık parolalar (TOTP) oluşturun.',
  ],
  'ed25519-key-generator': [
    'Ed25519 Anahtar Çifti Oluşturucu',
    'Ed25519 şifreleme işlemleri için açık ve özel anahtar çiftleri oluşturun.',
  ],
  'x509-csr-decoder': [
    'X.509 Sertifika İmzalama İsteği (CSR) Çözücü',
    'PEM biçiminde kodlanmış sertifika imzalama isteklerini (CSR) çözün ve inceleyin.',
  ],
  'abi-encoder-decoder': [
    'Solidity ABI Parametre Kodlayıcı',
    'Fonksiyon parametrelerini 32 baytlık onaltılık Solidity ABI veri bloklarına kodlayın.',
  ],
  'ethereum-keccak256-hasher': [
    'Ethereum Keccak-256 ve Seçici Özeti Hesaplayıcı',
    'Keccak-256 özetlerini ve dört baytlık akıllı sözleşme fonksiyon seçicilerini hesaplayın.',
  ],
  'solana-address-validator': [
    'Solana Base58 Adres Doğrulayıcı',
    'Solana açık anahtar adreslerini ve Base58 karakter kodlamasını doğrulayın.',
  ],
  'mongodb-aggregate-builder': [
    'MongoDB Toplama İşlem Hattı Oluşturucu',
    'Çok aşamalı MongoDB toplama işlem hatları ($match, $group, $sort) oluşturun.',
  ],
  'clickhouse-ddl-generator': [
    'ClickHouse MergeTree DDL Oluşturucu',
    'MergeTree motorları için iyileştirilmiş ClickHouse CREATE TABLE tanımları oluşturun.',
  ],
  'elasticsearch-query-builder': [
    'Elasticsearch Query DSL Oluşturucu',
    'Filtreler içeren yapılandırılmış JSON Elasticsearch mantıksal arama sorguları oluşturun.',
  ],
  'react-hook-form-generator': [
    'React Hook Form Bileşeni Oluşturucu',
    'Doğrulama kuralları içeren, kullanıma hazır React Hook Form bileşenleri oluşturun.',
  ],
  'gitlab-ci-generator': [
    'GitLab CI/CD İşlem Hattı Oluşturucu',
    'Çok aşamalı .gitlab-ci.yml işlem hattı yapılandırma dosyaları oluşturun.',
  ],
  'kubernetes-ingress-generator': [
    'Kubernetes Ingress ve Cert-Manager Oluşturucu',
    'TLS sonlandırma ve Cert-Manager açıklamaları içeren Kubernetes Ingress bildirimleri oluşturun.',
  ],
  'ollama-modelfile-generator': [
    'Ollama Modelfile Oluşturucu',
    'Ollama için sistem istemleri ve parametreler içeren özel Modelfile yapılandırmaları oluşturun.',
  ],
  'cloudflare-wrangler-builder': [
    'Cloudflare Wrangler Yapılandırma Oluşturucu',
    'Cloudflare Workers, KV ve D1 için wrangler.json yapılandırma dosyaları oluşturun.',
  ],
  'github-actions-matrix-builder': [
    'GitHub Actions Matris CI İş Akışı Oluşturucu',
    'GitHub Actions CI/CD için birden çok işletim sistemi ve sürümü kapsayan matris derleme iş akışları oluşturun.',
  ],
  'tailwind-v4-color-palette': [
    'Tailwind CSS v4 OKLCH Renk Paleti Oluşturucu',
    'Tailwind CSS v4 için 50 ile 950 arasında modern OKLCH renk tonları oluşturun.',
  ],
  'shadcn-theme-generator': [
    'Shadcn UI Tema ve CSS Değişkeni Oluşturucu',
    'Shadcn UI ve Radix bileşenleri için özel renk paletleri ve CSS değişkenleri oluşturun.',
  ],
  'svg-to-webp': [
    'SVG - WebP Veri URI Dönüştürücü',
    'SVG vektör grafiklerini yüksek performanslı Base64 veri URI biçiminde kodlayın.',
  ],
  'docker-to-compose': [
    'Docker Run - Docker Compose Dönüştürücü',
    'Tek bir docker run terminal komutunu standart docker-compose.yml hizmet tanımına dönüştürün.',
  ],
  'har-to-k6': [
    'HAR - k6 Yük Testi Betiği Dönüştürücü',
    'HTTP Archive (HAR) tarayıcı ağ günlüklerini k6 performans testi betiklerine dönüştürün.',
  ],
  'json-to-graphql-query': [
    "JSON'dan GraphQL Sorgusu Oluşturucu",
    'JSON nesnelerinden yapılandırılmış GraphQL sorguları ve seçim alanları oluşturun.',
  ],
  'avro-to-json-schema': [
    'Apache Avro - JSON Schema Dönüştürücü',
    'Apache Avro kayıt şemalarını JSON Schema tanımlarına dönüştürün.',
  ],
  'openapi-to-typescript-fetch': [
    'OpenAPI - TypeScript Fetch İstemcisi',
    'OpenAPI 3.0 ve Swagger tanımlarından tür bilgisi içeren Fetch API istemci fonksiyonları oluşturun.',
  ],
  'postman-to-curl': [
    'Postman Koleksiyonu - cURL Betiği',
    'Dışa aktarılmış Postman koleksiyonlarındaki JSON isteklerini terminalde çalıştırılabilir cURL komutlarına dönüştürün.',
  ],
  'svg-to-react-native': [
    'SVG - React Native (SVGR) Dönüştürücü',
    'Ham SVG vektör grafiklerini react-native-svg JSX bileşenlerine dönüştürün.',
  ],
  'json-schema-to-zod': [
    'JSON Schema - Zod Dönüştürücü',
    'JSON Schema tanımlarını TypeScript Zod doğrulama nesnelerine dönüştürün.',
  ],
  'zod-to-json-schema': [
    'Zod - JSON Schema Dönüştürücü',
    'TypeScript Zod nesne şemalarını standart JSON Schema draft-07 tanımlarına dönüştürün.',
  ],
  'aspect-ratio-resizer': [
    'En Boy Oranı ve Çözünürlük Hesaplayıcı',
    'Standart en boy oranlarını (16:9, 4:3, 21:9) hesaplayın ve çözünürlük boyutlarını ölçekleyin.',
  ],
  'subresource-integrity-generator': [
    'Alt Kaynak Bütünlüğü (SRI) Özeti Oluşturucu',
    'CDN betik ve stil sayfası etiketleri için güvenli SHA384 ve SHA512 bütünlük özetleri oluşturun.',
  ],
  'csp-evaluator': [
    'CSP (İçerik Güvenliği Politikası) Değerlendirici',
    'İçerik Güvenliği Politikası başlıklarını eksik yönergeler ve XSS açıkları açısından inceleyin.',
  ],
  'nginx-rate-limit-calculator': [
    'Nginx İstek Hızı Sınırı Yönergesi Oluşturucu',
    'Nginx ters vekilleri için iyileştirilmiş limit_req_zone istek hızı sınırlama yönergeleri oluşturun.',
  ],
  'cron-next-runs-visualizer': [
    'Cron Sonraki 20 Çalıştırma Hesaplayıcı',
    'Herhangi bir Cron zamanlamasının sonraki 20 çalıştırma zamanını kesin olarak hesaplayın ve önizleyin.',
  ],
  'rag-chunking-visualizer': [
    'RAG Anlamsal Parçalama Görselleştirici',
    'Özel token boyutları ve örtüşen kayan pencerelerle belge metinlerinin parçalara ayrılmasını görselleştirin.',
  ],
  'mcp-inspector': [
    'Model Context Protocol (MCP) İnceleyici',
    'MCP JSON-RPC 2.0 isteklerini, yanıtlarını ve bildirim verilerini doğrulayın ve inceleyin.',
  ],
  'tiktoken-visualizer': [
    'Tiktoken BPE Token Görselleştirici',
    'OpenAI ve Llama BPE modelleri için token ayrımını ve renklendirilmiş metin bölümlerini görüntüleyin.',
  ],
  'claude-token-counter': [
    'Claude Token ve Maliyet Hesaplayıcı',
    'Claude 3.5 Sonnet, Haiku ve Opus modelleri için token sayısını ve maliyetleri hesaplayın.',
  ],
  'deepseek-token-counter': [
    'DeepSeek Token ve Maliyet Hesaplayıcı',
    'DeepSeek V3 ve DeepSeek R1 modelleri için BPE token sayılarını ve API çıkarım maliyetlerini hesaplayın.',
  ],
  'px-to-rem': [
    'PX - REM ve EM Dönüştürücü',
    'Piksel ölçülerini REM, EM, VW, VH ve diğer CSS birimlerine dönüştürün.',
  ],
  'mock-data-generator': [
    'Örnek JSON Veri Oluşturucu',
    'Kullanıcılar, ürünler ve siparişler için gerçekçi örnek JSON veri kümeleri oluşturun.',
  ],
  'csv-to-markdown': [
    'CSV - Markdown Tablo Dönüştürücü',
    'CSV ve TSV tablolarını GitHub uyumlu Markdown tablolarına dönüştürün.',
  ],
  'curl-to-code': [
    'cURL - Çok Dilli Kod Dönüştürücü',
    'cURL komutlarını JavaScript Fetch, Axios, Python, Go, PHP ve Rust koduna dönüştürün.',
  ],
  'rsa-key-pair-generator': [
    'RSA ve ECDSA Anahtar Çifti Oluşturucu',
    'Tarayıcınızda güvenle PEM biçiminde RSA ve ECDSA açık ve özel anahtar çiftleri oluşturun.',
  ],
  'svg-optimizer': [
    'SVG İyileştirme ve Temizleme Aracı',
    'SVG kodunu küçültün, düzenleyici meta verilerini kaldırın, yolları temizleyin ve bayt tasarrufunu inceleyin.',
  ],
  'html-table-to-json': [
    'HTML Tablosu - JSON Dönüştürücü',
    'HTML tablo kodunu çıkarıp yapılandırılmış JSON nesnelerine veya dizilerine ayrıştırın.',
  ],
  'favicon-generator': [
    'Favicon ve Uygulama Simgesi Oluşturucu',
    '16×16 ve 32×32 simgeler, Apple Touch simgeleri, web manifesti ve HTML link etiketleri oluşturun.',
  ],
  'gitignore-generator': [
    '.gitignore Oluşturucu',
    'Node, Python, Java, Go, Rust, macOS ve IDE uygulamaları için özel .gitignore dosyaları oluşturun.',
  ],
  'htpasswd-generator': [
    '.htpasswd Oluşturucu',
    'Apache ve Nginx HTTP Basic Auth için Bcrypt, MD5 ve SHA-1 parola özetleri oluşturun.',
  ],
  'dockerfile-generator': [
    'Dockerfile Oluşturucu',
    'Node, Python, Go, Rust ve Nginx için üretime hazır, çok aşamalı Dockerfile dosyaları oluşturun.',
  ],
  'css-glassmorphism': [
    'CSS Buzlu Cam Efekti Oluşturucu',
    'Gerçek zamanlı bulanıklık ve opaklık ayarlarıyla, Tailwind CSS kullanan modern buzlu cam arayüz kartları tasarlayın.',
  ],
  'css-grid-generator': [
    'CSS Grid Düzeni Oluşturucu',
    'Sütun ve satır kapsamları, boşluklar ve etkileşimli önizlemeyle özel CSS Grid düzenleri oluşturun.',
  ],
  'css-blob-generator': [
    'CSS ve SVG Organik Şekil Oluşturucu',
    'CSS border-radius değerleri ve SVG yollarıyla yumuşak, organik şekiller oluşturun.',
  ],
  'robots-txt-generator': [
    'robots.txt Oluşturucu ve Test Aracı',
    'Özel user-agent değerleri, erişim engelleme kuralları ve site haritaları içeren SEO uyumlu robots.txt dosyaları oluşturun.',
  ],
  'sitemap-generator': [
    'XML Site Haritası Oluşturucu',
    'URL listelerinden lastmod, changefreq ve priority etiketlerini içeren geçerli sitemap.xml dosyaları oluşturun.',
  ],
  'sql-to-json': [
    'SQL - JSON Dönüştürücü',
    'SQL INSERT ifadelerini ve tablo dökümlerini yapılandırılmış JSON dizilerine ve nesnelerine dönüştürün.',
  ],
  'totp-generator': [
    '2FA / TOTP Doğrulama Kodu Oluşturucu',
    'RFC 6238 TOTP güvenlik kodları, Base32 gizli anahtarları ve otpauth:// QR URI değerleri oluşturun.',
  ],
  'markdown-table-generator': [
    'Markdown Tablo Oluşturucu',
    'Etkileşimli tablo düzenleyicisiyle GitHub Markdown tabloları oluşturun, düzenleyin ve biçimlendirin.',
  ],
  'key-code-info': [
    'JavaScript Tuş Kodu Bilgileri',
    'Canlı tuş dinleyicisiyle klavye event.key, code, which ve keyCode değerlerini inceleyin.',
  ],
  'aspect-ratio-calculator': [
    'En Boy Oranı Hesaplayıcı',
    'Orantılı yeniden boyutlandırmayla görüntü ve videoların 16:9, 4:3 ve 21:9 en boy oranlarını hesaplayın.',
  ],
  'base64-to-image': [
    'Base64 - Görsel Çözücü',
    'Base64 metinlerini ve veri URI değerlerini PNG, JPG, WebP ve SVG görsel dosyalarına dönüştürün.',
  ],
  'html-to-markdown': [
    'HTML - Markdown Dönüştürücü',
    'HTML kodunu, başlıkları, bağlantıları, alıntıları ve listeleri temiz Markdown metnine dönüştürün.',
  ],
  'css-triangle-generator': [
    'CSS Üçgen Oluşturucu',
    'Yalnızca CSS kenarlıklarıyla üçgenler ve istediğiniz yönü gösteren araç ipuçları oluşturun.',
  ],
  'svg-placeholder-generator': [
    'SVG Yer Tutucu Oluşturucu',
    'Belirlediğiniz boyutlar ve metinlerle SVG ve veri URI biçiminde yer tutucu görseller oluşturun.',
  ],
  'css-flexbox-generator': [
    'CSS Flexbox Oluşturucu',
    'CSS Flexbox kapsayıcılarını ve öğelerini etkileşimli görsel alanda düzenleyin ve kodlarını dışa aktarın.',
  ],
  'open-graph-previewer': [
    'Open Graph ve Sosyal Paylaşım Önizlemesi',
    'Twitter, Facebook, LinkedIn ve Discord paylaşım kartlarını ve Google arama sonucu görünümünü önizleyin.',
  ],
  'ascii-art-generator': [
    'ASCII Sanatı ve Afiş Oluşturucu',
    'Kod yorumları, README dosyaları ve terminaller için büyük ASCII yazı afişleri oluşturun.',
  ],
  'css-animation-generator': [
    'CSS Animasyon Oluşturucu',
    'Canlı önizlemeyle sıçrama, nabız, sallanma, dönme ve çevirme gibi CSS anahtar kare animasyonları oluşturun.',
  ],
  'markdown-to-html': [
    'Markdown - HTML Dönüştürücü',
    'Markdown sözdizimini biçimlendirilmiş veya küçültülmüş ham HTML koduna dönüştürün.',
  ],
  'css-text-shadow': [
    'CSS Metin Gölgesi Oluşturucu',
    'Çok katmanlı metin gölgeleri, üç boyutlu yazılar ve neon parıltılı CSS efektleri oluşturun.',
  ],
  'time-duration-calculator': [
    'Süre ve Tarih Farkı Hesaplayıcı',
    'İki tarih arasında geçen süreyi kesin olarak hesaplayın ve zaman birimleri arasında dönüştürün.',
  ],
  'xml-to-json': [
    'XML - JSON ve JSON - XML Dönüştürücü',
    'XML verilerini yapılandırılmış JSON verilerine, JSON nesnelerini de geçerli XML koduna dönüştürün.',
  ],
  'list-to-sql-in': [
    'Liste - SQL IN Koşulu Dönüştürücü',
    'Metin listelerini, sütun kimliklerini ve tabloları biçimlendirilmiş SQL IN koşullarına dönüştürün.',
  ],
  'svg-to-png': [
    'SVG - PNG / JPG / WebP Dönüştürücü',
    'SVG vektör grafiklerini yüksek çözünürlüklü piksel tabanlı görsellere (PNG, JPEG, WebP) dönüştürün.',
  ],
  'ip-subnet-calculator': [
    'IPv4 Alt Ağ Hesaplayıcı',
    'Ağ ve yayın adreslerini, kullanılabilir IP aralığını, alt ağ maskesini ve CIDR değerlerini hesaplayın.',
  ],
  'css-filter-generator': [
    'CSS Filtre Oluşturucu',
    'Bulanıklık, parlaklık, kontrast, gri tonlama, renk tonu ve sepya gibi CSS görsel filtreleri oluşturun.',
  ],
  'bcrypt-verifier': [
    'Bcrypt Parola Özeti Doğrulayıcı',
    'Düz metin parolaları Bcrypt özetlerine karşı doğrulayın ve maliyet ile salt tur sayısını inceleyin.',
  ],
  'css-border-radius': [
    'CSS Sekiz Noktalı Köşe Yuvarlama Aracı',
    'Sekiz noktalı asimetrik border-radius değerleri, organik şekiller ve yuvarlatılmış kareler oluşturun.',
  ],
  'jwt-generator': [
    'JWT Belirteci Oluşturucu',
    'HMAC-SHA256 imzası, sona erme zamanı ve veri alanları içeren özel JWT belirteçleri oluşturun ve imzalayın.',
  ],
  'ulid-generator': [
    'ULID ve UUID v7 Oluşturucu',
    'Zaman damgasına göre sıralanabilen 128 bit ULID ve UUID v7 kimlikleri oluşturun.',
  ],
  'curl-builder': [
    'cURL Komut Oluşturucu',
    'Görsel API istek istemcisiyle terminalde çalıştırılabilir cURL komutları hazırlayın ve dışa aktarın.',
  ],
  'base64-to-pdf': [
    'Base64 - PDF Dönüştürücü',
    'Base64 metinlerini tarayıcıdaki PDF görüntüleyicisinde çözün, görüntüleyin ve indirin.',
  ],
  'css-neumorphism': [
    'CSS Neumorfizm Oluşturucu',
    'Yalnızca CSS kullanarak yumuşak arayüz gölgeleri, içe gömülü derinlikler ve dışbükey şekiller oluşturun.',
  ],
  'string-byte-counter': [
    'Metin Bayt ve UTF-8 Sayacı',
    'UTF-8 bayt uzunluğunu, karakter sayısını ve veritabanı VARCHAR sütun sınırlarını hesaplayın.',
  ],
  'css-mesh-gradient': [
    'CSS Ağ Renk Geçişi Oluşturucu',
    'Arayüzlerin ana bölüm arka planları için çok noktalı ağ ve hale biçiminde radyal renk geçişleri oluşturun.',
  ],
  'html-to-jsx': [
    'HTML - JSX / React Dönüştürücü',
    'HTML kodunu camelCase öznitelikleri ve satır içi stiller içeren React JSX bileşenlerine dönüştürün.',
  ],
  'css-clip-path': [
    'CSS Clip-Path ve Çokgen Oluşturucu',
    'Yalnızca CSS kullanarak clip-path çokgenlerini, geometrik şekilleri ve özel maskeleri görsel olarak tasarlayın.',
  ],
  'css-scrollbar-generator': [
    'Özel CSS Kaydırma Çubuğu Oluşturucu',
    'WebKit sözde öğeleri ve standart scrollbar-color özelliğiyle özel kaydırma çubuğu stilleri oluşturun.',
  ],
  'css-pattern-generator': [
    'CSS Arka Plan Deseni Oluşturucu',
    'Noktalı ızgaralar, çizgiler ve teknik çizim desenleri gibi tekrarlanan arka planları yalnızca CSS ile oluşturun.',
  ],
  'svg-path-visualizer': [
    'SVG Yol Görselleştirici ve İnceleyici',
    'SVG yollarının d özniteliğindeki komutları ve koordinatları görselleştirin, inceleyin ve analiz edin.',
  ],
  'color-palette-generator': [
    'Tailwind Renk Paleti Oluşturucu',
    'Herhangi bir onaltılık renkten erişilebilir 50–950 ton ölçekleri ve uyumlu renk paletleri oluşturun.',
  ],
  'csv-to-sql-insert': [
    'CSV - SQL INSERT Oluşturucu',
    'CSV tablolarını PostgreSQL, MySQL ve SQLite için toplu SQL INSERT ifadelerine dönüştürün.',
  ],
  'sql-minifier': [
    'SQL Sorgusu Küçültücü',
    'Yorumları ve boşlukları kaldırarak SQL sorgularını kısa, tek satırlı ifadelere sıkıştırın.',
  ],
  'json-to-graphql': [
    "JSON'dan GraphQL Şeması Oluşturucu",
    'Örnek JSON verilerinden GraphQL türlerini, girdilerini ve şemalarını otomatik olarak çıkarın.',
  ],
  'tsv-to-json': [
    'TSV - JSON Dönüştürücü',
    'Sekmeyle ayrılmış değerleri (TSV) yapılandırılmış JSON dizilerine ve tersine dönüştürün.',
  ],
  'ndjson-to-json': [
    'NDJSON / JSONL - JSON Dönüştürücü',
    'Satır sonlarıyla ayrılmış JSON günlük akışlarını standart JSON dizilerine ve tersine dönüştürün.',
  ],
  'json-size-analyzer': [
    'JSON Boyut ve Bellek Analiz Aracı',
    'JSON bayt boyutunu, iç içe geçme derinliğini, nesne dağılımını ve küçültme tasarrufunu analiz edin.',
  ],
  'hex-to-base64': [
    'Onaltılık - Base64 Dönüştürücü',
    'Ham onaltılık bayt metinlerini Base64 kodlamasına ve tersine dönüştürün.',
  ],
  'punycode-converter': [
    'Punycode ve IDN Alan Adı Dönüştürücü',
    'Uluslararası alan adlarını (IDN) Unicode ve ASCII Punycode (xn--) biçimleri arasında dönüştürün.',
  ],
  'morse-code-converter': [
    'Mors Alfabesi Ses ve Metin Çevirici',
    'Düz metinleri Mors alfabesine çevirip gerçek zamanlı sesle dinleyin veya Mors kodlarını metne çözün.',
  ],
  'base32-encoder': [
    'Base32 Kodlayıcı ve Çözücü',
    'İki faktörlü doğrulama anahtarları ve belirteçler için metinleri RFC 4648 Base32 biçiminde kodlayın veya çözün.',
  ],
  'password-strength-analyzer': [
    'Parola Gücü ve Entropi Analiz Aracı',
    'Parolaların entropisini bit cinsinden, tahmini kaba kuvvet çözme süresini ve karmaşıklık puanlarını hesaplayın.',
  ],
  'semver-calculator': [
    'SemVer Aralık ve Sürüm Hesaplayıcı',
    'Anlamsal sürüm aralıklarını değerlendirin, npm sürüm koşullarını kontrol edin ve sürüm numaralarını artırın.',
  ],
  'ipv6-subnet-calculator': [
    'IPv6 Alt Ağ ve Ön Ek Hesaplayıcı',
    'IPv6 adreslerini genişletin veya kısaltın; ön ek aralıklarını, CIDR alt ağlarını ve adres türlerini hesaplayın.',
  ],
  'mac-address-generator': [
    'MAC Adresi Oluşturucu ve Biçimlendirici',
    'İki nokta, tire veya Cisco gösterimiyle rastgele tek noktaya ya da çok noktaya yayın MAC adresleri oluşturun.',
  ],
  'crontab-descriptor': [
    'Crontab İfadesi Açıklayıcı',
    'Cron zamanlama ifadelerini kolay okunabilen doğal İngilizce açıklamalara dönüştürün.',
  ],
  'htaccess-to-nginx': [
    'Apache .htaccess - Nginx Dönüştürücü',
    'Apache mod_rewrite kurallarını, yönlendirmelerini ve başlıklarını Nginx sunucu bloklarına dönüştürün.',
  ],
  'dns-record-generator': [
    'DNS E-posta Güvenliği Kaydı Oluşturucu',
    'E-posta alan adı doğrulaması için SPF, DKIM ve DMARC TXT kayıtları oluşturun.',
  ],
  'slug-to-title': [
    'Slug - Başlık ve Harf Biçimi Dönüştürücü',
    'URL kısa adlarını başlık biçimi, cümle biçimi, PascalCase ve camelCase biçimlerine dönüştürün.',
  ],
  'text-obfuscator': [
    'Görünmez ve Sıfır Genişlikli Karakter Algılayıcı',
    'Gizli sıfır genişlikli boşlukları, Unicode işaretlerini ve görünmez biçimlendirme karakterlerini algılayın ve kaldırın.',
  ],
  'csv-column-extractor': [
    'CSV Sütun Çıkarma ve Filtreleme Aracı',
    'Büyük CSV veri dosyalarındaki belirli sütunları seçin, çıkarın ve yeniden sıralayın.',
  ],
  'sql-to-typescript': [
    'SQL Tablosu - TypeScript Arayüzü Dönüştürücü',
    'SQL CREATE TABLE şema tanımlarını tür güvenliği sağlayan TypeScript arayüzlerine dönüştürün.',
  ],
  'json-to-env': [
    'JSON - .env Dönüştürücü',
    'İç içe JSON nesnelerini anahtar-değer ortam değişkenlerine ve tersine dönüştürün.',
  ],
  'json-minifier': [
    'JSON Küçültme ve Metne Dönüştürme Aracı',
    'API veri trafiğini azaltmak için boşlukları kaldırarak JSON dosyalarını küçültün.',
  ],
  'markdown-table-to-csv': [
    'Markdown Tablosu - CSV Dönüştürücü',
    'GitHub Markdown tablolarını hesap tablosuna uygun CSV dosyalarına ve indirilebilir Excel dosyalarına dönüştürün.',
  ],
  'llm-token-counter': [
    'LLM Token ve Maliyet Hesaplayıcı',
    'GPT-4o, Claude 3.5, Gemini ve Llama 3 modelleri için token sayılarını ve API çıkarım maliyetlerini tahmin edin.',
  ],
  'openai-function-schema': [
    'OpenAI Fonksiyon Çağrısı Şeması Oluşturucu',
    'JSON nesnelerini yapılandırılmış OpenAI araç ve fonksiyon çağrısı parametre şemalarına dönüştürün.',
  ],
  'prompt-template-formatter': [
    'İstem Şablonu Derleyici ve Değişken Yerleştirici',
    'Jinja2 ve Mustache yapay zekâ istem şablonlarına değişken değerlerini yerleştirin ve yer tutucuları doğrulayın.',
  ],
  'embedding-similarity': [
    'Vektör Gömme Benzerliği Hesaplayıcı',
    'Gömme vektörleri arasındaki kosinüs benzerliğini, Öklid uzaklığını ve nokta çarpımını hesaplayın.',
  ],
  'text-chunk-splitter': [
    'RAG Metin Parçalama ve Token Penceresi Simülatörü',
    'RAG vektör arama işlem hatları için belgeleri örtüşen token veya karakter parçalarına ayırın.',
  ],
  'jsonl-dataset-validator': [
    'OpenAI JSONL İnce Ayar Doğrulayıcı',
    'OpenAI ve Gemini modellerinin ince ayarı için JSONL veri kümesi dosyalarını ve mesaj yapılarını doğrulayın.',
  ],
  'prompt-format-converter': [
    'ChatML, Anthropic ve Llama 3 İstem Dönüştürücü',
    'Sohbet istemlerini ChatML, Anthropic Human/Assistant ve Llama 3 şablon biçimleri arasında dönüştürün.',
  ],
  'sampling-curve-visualizer': [
    'LLM Temperature ve Top-P Örnekleme Eğrisi Görselleştirici',
    'Temperature, Top-P ve Top-K örneklemeleri altındaki token olasılık dağılımlarını simüle edin ve görselleştirin.',
  ],
  'system-prompt-formatter': [
    'Yapay Zekâ Sistem İstemi Oluşturucu ve Markdown Biçimlendirici',
    'Yapay zekâ sistem talimatlarını roller, kurallar, çıktı biçimleri ve örneklerle biçimlendirin ve yapılandırın.',
  ],
  'prompt-diff': [
    'Yapay Zekâ İstem Sürümü ve Anlamsal Fark Karşılaştırıcı',
    'İki istem sürümünü karşılaştırarak satır değişikliklerini, eklenen kelimeleri ve token farklarını vurgulayın.',
  ],
  'css-to-tailwind': [
    'CSS - Tailwind CSS Dönüştürücü',
    'Standart CSS kurallarını ve bildirim bloklarını Tailwind CSS yardımcı sınıflarına dönüştürün.',
  ],
  'tailwind-to-css': [
    'Tailwind - Standart CSS Dönüştürücü',
    'Tailwind CSS sınıflarını yeniden kullanılabilir, standart CSS stil sayfalarına dönüştürün.',
  ],
  'css-specificity-calculator': [
    'CSS Özgüllük Hesaplayıcı ve İnceleyici',
    'Seçici özgüllük değerlerini (kimlikler, sınıflar, öğeler) hesaplayın ve kademeli stil önceliklerini karşılaştırın.',
  ],
  'css-keyframes-generator': [
    'CSS Anahtar Kare Animasyon Zaman Çizelgesi Oluşturucu',
    'Gerçek zamanlı görsel önizlemeyle çok aşamalı CSS @keyframes animasyonları ve zamanlama kuralları oluşturun.',
  ],
  'tailwind-class-sorter': [
    'Tailwind Sınıf Sıralayıcı ve Biçimlendirici',
    'Tailwind CSS sınıflarını resmi Prettier sıralama düzenine göre sıralayın ve yinelenenleri kaldırın.',
  ],
  'fluid-typography': [
    'CSS Esnek Tipografi ve Clamp Hesaplayıcı',
    'Ekran eşiklerine göre esneyen yazı boyutları için duyarlı CSS clamp() formülleri hesaplayın.',
  ],
  'css-media-query-builder': [
    'CSS Medya Sorgusu Aralık Oluşturucu',
    'Koyu mod ve hareket tercihi filtreleriyle modern aralık sözdizimini kullanan CSS @media sorguları oluşturun.',
  ],
  'css-grid-area-builder': [
    'CSS Grid Şablon Alanı Oluşturucu',
    'CSS grid-template-areas düzen bildirimlerini ve duyarlı alan matrislerini görsel olarak oluşturun.',
  ],
  'css-cubic-bezier': [
    'CSS Cubic-Bezier Eğrisi Tasarım Aracı',
    'Yay ve sıçrama hazır ayarlarıyla özel cubic-bezier zamanlama fonksiyonları tasarlayın ve önizleyin.',
  ],
  'color-harmony-generator': [
    'Renk Uyumu ve Palet Oluşturucu',
    'Onaltılık ve HSL kodlarıyla tamamlayıcı, üçlü ve benzer renk uyumları oluşturun.',
  ],
  'json-to-pydantic': [
    'JSON - Python Pydantic V2 Modeli Dönüştürücü',
    'JSON verilerini tür güvenliği sağlayan Python Pydantic V2 BaseModel sınıf tanımlarına dönüştürün.',
  ],
  'json-to-rust-serde': [
    'JSON - Rust Serde Struct Dönüştürücü',
    'JSON nesnelerini serde derive öznitelikleri içeren Rust struct tanımlarına dönüştürün.',
  ],
  'json-to-swift': [
    'JSON - Swift Codable Struct Dönüştürücü',
    'JSON API yanıtlarını Swift Codable ve Identifiable veri yapılarına dönüştürün.',
  ],
  'json-to-kotlin': [
    'JSON - Kotlin Veri Sınıfı Dönüştürücü',
    'JSON verilerini @Serializable ve @SerialName açıklamaları içeren Kotlin veri sınıflarına dönüştürün.',
  ],
  'json-to-csharp': [
    'JSON - C# Sınıfı Dönüştürücü',
    'JSON verilerini System.Text.Json öznitelikleri içeren, güçlü türlendirilmiş C# sınıflarına dönüştürün.',
  ],
  'json-to-java-pojo': [
    'JSON - Java Lombok POJO Dönüştürücü',
    'JSON nesnelerini Lombok @Data ve Jackson açıklamaları içeren Java POJO sınıflarına dönüştürün.',
  ],
  'typescript-to-json-schema': [
    'TypeScript - JSON Schema Dönüştürücü',
    'TypeScript arayüz tanımlarını standart JSON Schema Draft 7/2020-12 biçimine dönüştürün.',
  ],
  'yaml-to-typescript': [
    'YAML - TypeScript Arayüzü Dönüştürücü',
    'YAML yapılandırma belgelerini doğrudan tür bilgisi içeren TypeScript arayüzlerine dönüştürün.',
  ],
  'graphql-to-typescript': [
    'GraphQL SDL - TypeScript Türü Dönüştürücü',
    'GraphQL şema tanımlama dili (SDL) türlerini TypeScript arayüzlerine dönüştürün.',
  ],
  'protobuf-to-json': [
    'Protobuf (proto3) - JSON Schema Dönüştürücü',
    'Protocol Buffers mesaj şemalarını standart JSON Schema tanımlarına dönüştürün.',
  ],
  'sql-to-mongodb': [
    'SQL - MongoDB Sorgu Dönüştürücü',
    'SQL SELECT ve WHERE sorgularını MongoDB db.collection.find() sözdizimine dönüştürün.',
  ],
  'json-to-sql-ddl': [
    "JSON'dan SQL CREATE TABLE DDL Oluşturucu",
    'JSON verilerinden veritabanı sütun türlerini çıkarın ve SQL CREATE TABLE şemaları oluşturun.',
  ],
  'sql-explainer': [
    'Görsel SQL Sorgusu Açıklayıcı',
    'Karmaşık SQL SELECT birleştirme, filtreleme ve toplama işlemlerini sade İngilizce adımlarla açıklayın.',
  ],
  'postgres-connection-builder': [
    'PostgreSQL Bağlantı URI Oluşturucu ve Ayrıştırıcı',
    'PostgreSQL veritabanı bağlantı metinlerini ve parametrelerini oluşturun veya ayrıştırın.',
  ],
  'redis-command-generator': [
    'Redis Komut Oluşturucu ve Anahtar Yardımcısı',
    'Özetler, kümeler, sıralı kümeler, listeler ve TTL sona erme süreleri için Redis CLI komutları oluşturun.',
  ],
  'csv-to-parquet-schema': [
    'CSV - Apache Parquet Şeması Dönüştürücü',
    'CSV başlıklarını inceleyin ve PyArrow Apache Parquet şema bildirimleri oluşturun.',
  ],
  'mongodb-objectid-parser': [
    'MongoDB ObjectId Zaman Damgası ve Meta Veri Ayrıştırıcı',
    'MongoDB ObjectId değerlerinden oluşturulma zamanını, makine kimliklerini ve süreç kimliklerini çıkarın.',
  ],
  'sql-index-advisor': [
    'SQL B-Tree Bileşik Dizin Danışmanı',
    'Uygun B-Tree bileşik veritabanı dizinlerini önermek için SQL WHERE ve JOIN koşullarını analiz edin.',
  ],
  'postgres-to-mysql': [
    'PostgreSQL - MySQL Sözdizimi Dönüştürücü',
    'PostgreSQL SQL sözdizimini ve veri türlerini MySQL uyumlu şema sözdizimine dönüştürün.',
  ],
  'prisma-to-sql': [
    'Prisma Şeması - SQL DDL Oluşturucu',
    'Prisma ORM şema modellerini ham SQL CREATE TABLE ifadelerine dönüştürün.',
  ],
  'docker-compose-to-k8s': [
    'Docker Compose - Kubernetes YAML Dönüştürücü',
    'docker-compose.yml hizmetlerini Kubernetes Deployment ve Service bildirimlerine dönüştürün.',
  ],
  'nginx-formatter': [
    'Nginx Yapılandırma Biçimlendirici ve Doğrulayıcı',
    'Nginx sunucu bloklarını, location yönergelerini ve upstream yapılandırmalarını biçimlendirin ve girintileyin.',
  ],
  'terraform-formatter': [
    'Terraform HCL Biçimlendirici ve Kod Denetleyici',
    'HashiCorp Terraform (.tf) yapılandırma dosyalarını standart iki boşluklu girintiyle biçimlendirin.',
  ],
  'kubeconfig-validator': [
    'Kubernetes Kubeconfig Doğrulayıcı',
    'Kubeconfig YAML dosyalarını, küme bağlamlarını, sunucu uç noktalarını ve kullanıcı kimlik bilgilerini doğrulayın.',
  ],
  'helm-values-evaluator': [
    'Helm Şablonu ve Values.yaml Değerlendirici',
    'Özel values.yaml verileriyle Helm şablonlarındaki değişken yerleştirme işlemlerini simüle edin.',
  ],
  'dockerfile-linter': [
    'Dockerfile Kod ve İyi Uygulama Denetleyici',
    'Dockerfile dosyalarını önbellekleme sorunları, katman şişkinliği ve kapsayıcı güvenliği açısından analiz edin.',
  ],
  'systemd-unit-generator': [
    'Linux Systemd Hizmet Birimi Oluşturucu',
    'Node.js, Python ve Go arka plan süreçleri için systemd .service yapılandırma dosyaları oluşturun.',
  ],
  'caddy-to-nginx': [
    'Caddyfile - Nginx Ters Vekil Dönüştürücü',
    'Caddy ters vekil bloklarını üretime hazır Nginx sunucu yapılandırmalarına dönüştürün.',
  ],
  'aws-iam-policy-builder': [
    'AWS IAM JSON Politikası Oluşturucu ve Doğrulayıcı',
    'Effect, Action ve Resource alanları içeren AWS IAM JSON politika ifadeleri oluşturun ve doğrulayın.',
  ],
  'prometheus-alert-builder': [
    'Prometheus Uyarı Kuralı ve PromQL Oluşturucu',
    'PromQL ifadeleri ve etiketleri içeren Prometheus YAML uyarı kuralı bildirimleri oluşturun.',
  ],
  'websocket-tester': [
    'WebSocket İstemcisi ve Gecikme Test Aracı',
    'wss:// WebSocket uç noktalarına bağlanın, JSON verileri gönderin ve mesaj günlüklerini izleyin.',
  ],
  'curl-to-postman': [
    'cURL - Postman Koleksiyonu Dönüştürücü',
    'cURL komut metinlerini içe aktarılabilir Postman v2.1 koleksiyonu JSON dosyalarına dönüştürün.',
  ],
  'ssl-certificate-inspector': [
    'SSL Sertifikası PEM ve SAN İnceleyici',
    'X.509 PEM SSL/TLS sertifikalarının geçerliliğini, düzenleyicisini, alternatif adlarını ve sona erme zamanını inceleyin.',
  ],
  'csr-generator': [
    'CSR (Sertifika İmzalama İsteği) Oluşturucu',
    'Ortak ad ve SAN alan adları içeren OpenSSL sertifika imzalama isteği komutları oluşturun.',
  ],
  'sse-stream-tester': [
    'Sunucu Kaynaklı Olay (SSE) Akışı Test Aracı',
    'Gerçek zamanlı sunucu kaynaklı olay (SSE) akışlarını test edin ve gelen EventSource parçalarını inceleyin.',
  ],
  'graphql-query-formatter': [
    'GraphQL Sorgu Biçimlendirici ve Küçültücü',
    'GraphQL sorgularını, mutasyonlarını, aboneliklerini ve parçalarını biçimlendirin veya küçültün.',
  ],
  'har-viewer': [
    'HAR (HTTP Archive) Dosyası Görüntüleyici ve Analiz Aracı',
    'İstek zaman çizelgelerini, başlıkları ve durum kodlarını incelemek için HTTP Archive (.har) günlüklerini ayrıştırın.',
  ],
  'dns-lookup-simulator': [
    'DNS Kaydı ve Yayılım Simülatörü',
    'A, AAAA, CNAME, MX, TXT ve NS kayıtları için TTL süreleriyle DNS sorgularını simüle edin.',
  ],
  'http-wire-format': [
    'HTTP İsteği - Ham İletim Biçimi Dönüştürücü',
    'Yapılandırılmış HTTP isteklerini ham HTTP/1.1 iletim metinlerine dönüştürün.',
  ],
  'webhook-signature-verifier': [
    'HMAC Webhook İmzası Doğrulayıcı',
    'Stripe, GitHub ve Shopify webhook verilerinin HMAC SHA-256 imzalarını doğrulayın.',
  ],
  'uuid-v7-generator': [
    'UUID v7 Oluşturucu (Zamana Göre Sıralı)',
    'Unix zamanına göre sıralanan modern UUIDv7 kimlikleri oluşturun ve zaman damgalarını çıkarın.',
  ],
  'nanoid-generator': [
    'NanoID ve Özel Alfabe Oluşturucu',
    'Özel alfabelerle kısa, URL uyumlu ve kriptografik olarak güvenli NanoID değerleri oluşturun.',
  ],
  'base58-encoder': [
    'Base58 Kodlayıcı ve Çözücü (Bitcoin / Solana / IPFS)',
    'Düz metinleri ve ham baytları Base58 ve Base58Check biçimlerinde kodlayın veya çözün.',
  ],
  'ssh-key-inspector': [
    'SSH Açık Anahtar Parmak İzi İnceleyici',
    'OpenSSH açık anahtarlarını ayrıştırarak algoritmalarını, yorumlarını ve SHA-256 parmak izlerini çıkarın.',
  ],
  'pgp-key-inspector': [
    'PGP ve GPG Anahtar Bloğu İnceleyici',
    'ASCII zırhlı PGP açık ve özel anahtarlarını ve şifrelenmiş mesaj bloklarını doğrulayın ve inceleyin.',
  ],
  'api-key-generator': [
    'API Anahtarı ve Belirteç Oluşturucu (Özel Ön Ekli)',
    'Özel ön eklerle kriptografik olarak rastgele API anahtarları ve gizli oturum değerleri oluşturun.',
  ],
  'jwt-signature-validator': [
    'JWT İmza ve Sona Erme Doğrulayıcı',
    'JWT başlıklarını ve veri alanlarını inceleyin; belirteç yapısını ve sona erme zamanlarını doğrulayın.',
  ],
  'aes-crypto-playground': [
    'AES-256 Şifreleme ve Şifre Çözme Deneme Alanı',
    '256 bit AES anahtarları oluşturun ve AES-GCM şifreleme parametrelerini test edin.',
  ],
  'bip39-seed-deriver': [
    'BIP-39 Kurtarma İfadesinden Tohum Türetici',
    '12 veya 24 kelimelik BIP-39 kurtarma ifadelerinden 512 bit ikili tohumların onaltılık gösterimlerini türetin.',
  ],
  'argon2-hash-generator': [
    'Argon2 Parola Özeti Biçimlendirici',
    'Özel bellek maliyeti, yineleme sayısı ve paralellik değerleriyle Argon2id parola özetlerini biçimlendirin.',
  ],
  'android-manifest-builder': [
    'Android Manifest XML ve İzin Oluşturucu',
    'İzinler, etkinlikler ve başlatıcı intent filtreleri içeren AndroidManifest.xml dosyaları oluşturun.',
  ],
  'ios-plist-builder': [
    'iOS Info.plist İzin Anahtarı Oluşturucu',
    'Standart izin kullanım açıklamaları içeren iOS Info.plist XML dosyaları oluşturun.',
  ],
  'app-icon-resizer': [
    'Uygulama Simgesi Boyutları Başvuru Kaynağı',
    'Standart iOS App Store ve Android Play Store simge boyutu gereksinimlerini görüntüleyin.',
  ],
  'universal-links-validator': [
    'Apple Universal Links ve Android App Links Oluşturucu',
    'Derin bağlantılar için apple-app-site-association ve assetlinks.json yapılandırma dosyaları oluşturun.',
  ],
  'flutter-theme-generator': [
    'Flutter Material 3 ColorScheme Oluşturucu',
    'Onaltılık renk paletlerini Flutter Material 3 ThemeData ColorScheme koduna dönüştürün.',
  ],
  'xcode-asset-catalog': [
    'Xcode Varlık Kataloğu Contents.json Oluşturucu',
    'iOS uygulamaları için standart 1x, 2x ve 3x görsel varlık kataloğu Contents.json bildirimleri oluşturun.',
  ],
  'android-keystore-fingerprint': [
    'Android Keystore Parmak İzi (SHA1/SHA256) Biçimlendirici',
    'Firebase ve Google OAuth için Keystore SHA-1 ve SHA-256 sertifika parmak izlerini biçimlendirin.',
  ],
  'electron-config-builder': [
    'Electron main.js ve Uygulama Penceresi Oluşturucu',
    'BrowserWindow ve güvenlik yapılandırmaları içeren başlangıç Electron main.js dosyaları oluşturun.',
  ],
  'react-native-icon-finder': [
    'React Native Vektör Simgesi Bulucu ve Kod Oluşturucu',
    'react-native-vector-icons için simge adlarını ve JSX içe aktarma etiketlerini arayın ve dışa aktarın.',
  ],
  'capacitor-config-builder': [
    'Capacitor capacitor.config.json Oluşturucu',
    'Hibrit iOS ve Android mobil uygulamalar için capacitor.config.json yapılandırma dosyaları oluşturun.',
  ],
  'code-side-by-side-diff': [
    'Yan Yana Kod Farkı Görselleştirici',
    'İki kod parçasını satır satır fark takibiyle yan yana karşılaştırın.',
  ],
  'conventional-commit-builder': [
    'Standart Git Commit Mesajı Oluşturucu',
    'feat, fix, kapsam ve uyumluluğu bozan değişiklik alt bilgileriyle Conventional Commits mesajları oluşturun.',
  ],
  'git-command-builder': [
    'Etkileşimli Git Komut Oluşturucu',
    'Etkileşimli rebase, cherry-pick, hard reset ve stash işlemleri için Git komutları oluşturun.',
  ],
  'env-sanitizer': [
    '.env - .env.example Gizli Bilgi Temizleyici',
    '.env.example şablonları üretmek için .env dosyalarından özel API anahtarlarını ve veritabanı kimlik bilgilerini kaldırın.',
  ],
  'license-generator': [
    'Açık Kaynak Lisansı ve SPDX Oluşturucu',
    'Telif hakkı başlıkları içeren MIT, Apache 2.0 ve GPL açık kaynak yazılım lisansı metinleri oluşturun.',
  ],
  'eslint-prettier-config': [
    'Prettier ve ESLint Yapılandırma Oluşturucu',
    'Tek tırnak ve sekme genişliği gibi ayarlarla özel .prettierrc JSON yapılandırma dosyaları oluşturun.',
  ],
  'markdown-to-slides': [
    'Markdown - HTML Sunum Dönüştürücü',
    'Yatay çizgilerle ayrılmış Markdown dosyalarını duyarlı HTML sunum slaytlarına dönüştürün.',
  ],
  'package-json-formatter': [
    'Package.json Bağımlılık Sıralayıcı ve Biçimlendirici',
    'Bağımlılıkları alfabetik sıraya koyun ve package.json dosyalarını düzenli biçimlendirin.',
  ],
  'changelog-generator': [
    'CHANGELOG.md Oluşturucu (Keep a Changelog)',
    'Keep a Changelog kurallarına uygun, sürümlere ayrılmış Markdown değişiklik günlükleri oluşturun.',
  ],
  'editorconfig-generator': [
    '.editorconfig Dosyası Oluşturucu',
    'Düzenleyiciler arası girinti, karakter kümesi ve satır sonu kuralları içeren .editorconfig dosyaları oluşturun.',
  ],
  'ieee754-visualizer': [
    'IEEE 754 32 Bit Kayan Nokta Görselleştirici',
    '32 bit kayan noktalı sayıları işaret, üs ve mantis bitlerine ayırın.',
  ],
  'bitwise-calculator': [
    'Bit Düzeyinde Mantık Hesaplayıcı (AND, OR, XOR, Kaydırma)',
    '32 bit AND, OR, XOR, NOT ve bit kaydırma işlemlerini ikilik ve onaltılık sonuçlarla gerçekleştirin.',
  ],
  'hex-dump-viewer': [
    'Onaltılık Döküm ve İkili Konum İnceleyici',
    'Metinleri klasik 16 baytlık konum bilgisi ve ASCII yan görünümü içeren onaltılık dökümler olarak biçimlendirin.',
  ],
  'bignumber-calculator': [
    'İsteğe Bağlı Hassasiyetli BigNumber Hesaplayıcı',
    'İsteğe bağlı hassasiyetle tam sayı işlemleri, üs alma ve modüler aritmetik hesaplamaları yapın.',
  ],
  'multi-radix-converter': [
    'Çoklu Sayı Tabanı Dönüştürücü (İkilik, Sekizlik, Ondalık, Onaltılık)',
    'Sayıları ikilik, sekizlik, ondalık ve onaltılık gösterimler arasında aynı anda dönüştürün.',
  ],
  'timezone-meeting-planner': [
    'Saat Dilimi Toplantı Planlayıcı ve Çakışma Matrisi',
    'UTC, EST, PST, CET, TRT ve JST saat dilimlerinde ortak toplantı saatlerini planlayın.',
  ],
  'bandwidth-calculator': [
    'Bant Genişliği ve Dosya İndirme Süresi Hesaplayıcı',
    'Dosya boyutları ile Mbps ve Gbps internet hızlarına göre aktarım sürelerini hesaplayın.',
  ],
  'percentage-growth-calculator': [
    'Yüzde Artış ve Değişim Hesaplayıcı',
    'Panolar için yüzdelik artışları, azalışları ve bileşik ölçümleri hesaplayın.',
  ],
  'cron-timezone-converter': [
    'Cron İfadesi Saat Dilimi Dönüştürücü (Yerel ↔ UTC)',
    'Cron ifadesi saatlerini yerel saat dilimleri ve sunucu UTC zamanlamaları arasında dönüştürün.',
  ],
  'matrix-calculator': [
    'Matris Aritmetiği ve Transpoz Hesaplayıcı',
    'Matris çarpımı, boyut kontrolü ve matris transpozu hesaplamaları yapın.',
  ],
  'curl-to-python': [
    'cURL - Python Dönüştürücü',
    'cURL komutlarını Python requests veya httpx koduna dönüştürün.',
  ],
  'curl-to-javascript': [
    'cURL - JavaScript Fetch Dönüştürücü',
    'cURL komutlarını modern Fetch API veya Axios JavaScript koduna dönüştürün.',
  ],
  'curl-to-go': [
    'cURL - Go Dönüştürücü',
    'cURL komutlarını Go dilinin yerleşik kullanım biçimine uygun net/http koduna dönüştürün.',
  ],
  'curl-to-rust': [
    'cURL - Rust Dönüştürücü',
    'cURL komutlarını Rust reqwest istemci koduna dönüştürün.',
  ],
  'curl-to-php': [
    'cURL - PHP Dönüştürücü',
    'cURL komutlarını PHP Guzzle veya yerleşik curl koduna dönüştürün.',
  ],
  'curl-to-csharp': [
    'cURL - C# Dönüştürücü',
    'cURL komutlarını C# .NET HttpClient koduna dönüştürün.',
  ],
  'curl-to-java': [
    'cURL - Java Dönüştürücü',
    'cURL komutlarını Java 11 ve üzeri HttpClient koduna dönüştürün.',
  ],
  'curl-to-ai-sdk': [
    'cURL - OpenAI ve Claude SDK Dönüştürücü',
    'Ham API cURL çağrılarını resmi OpenAI ve Anthropic SDK koduna dönüştürün.',
  ],
  'openai-structured-outputs': [
    'OpenAI Katı Yapılandırılmış Çıktı Oluşturucu',
    'OpenAI fonksiyon çağrıları için katı JSON Schema şemaları oluşturun.',
  ],
  'vercel-ai-core-message-converter': [
    'Vercel AI SDK Mesaj Dönüştürücü',
    'Sohbet günlüklerini ve OpenAI mesajlarını Vercel AI SDK CoreMessage dizilerine dönüştürün.',
  ],
  'langgraph-state-generator': [
    'LangGraph Durum Şeması Oluşturucu',
    'LangGraph State TypedDict ve iş akışı tanımları oluşturun.',
  ],
  'embedding-cost-calculator': [
    'Vektör Gömme Maliyeti Hesaplayıcı',
    'Gömme modellerinin maliyetlerini, vektör boyutlarını ve bellek kullanımını hesaplayın.',
  ],
  'anthropic-tool-builder': [
    'Anthropic Claude Araç Oluşturucu',
    'Anthropic Claude araçları için input_schema JSON tanımları oluşturun.',
  ],
  'tailwind-v3-to-v4-migrator': [
    'Tailwind CSS v3 - v4 Geçiş Aracı',
    'tailwind.config.js yapılandırmasını Tailwind CSS v4 @theme CSS yönergelerine dönüştürün.',
  ],
  'css-box-shadow-to-tailwind': [
    'CSS Box-Shadow - Tailwind Dönüştürücü',
    'Karmaşık CSS box-shadow değerlerini özel değerli Tailwind sınıflarına dönüştürün.',
  ],
  'nextjs-metadata-generator': [
    'Next.js App Router Meta Veri Oluşturucu',
    'Next.js 16 generateMetadata, OpenGraph ve Twitter kartı yapılandırmaları oluşturun.',
  ],
  'svg-to-css': [
    'SVG - CSS Arka Plan Veri URI Dönüştürücü',
    'SVG kodunu iyileştirip CSS background-image ve mask-image veri URI biçimlerine kodlayın.',
  ],
  'html-table-converter': [
    'HTML Tablosu - Markdown ve CSV Dönüştürücü',
    'HTML tablo kodunu düzenli Markdown tablolarına, CSV verilerine veya JSON dizilerine dönüştürün.',
  ],
  'natural-language-to-cron': [
    'Doğal Dil - Cron Dönüştürücü',
    'Doğal İngilizce açıklamaları standart beş alanlı Cron zamanlamalarına dönüştürün.',
  ],
  'gitignore-tester': [
    '.gitignore Desen Eşleştirici ve Test Aracı',
    '.gitignore ve .dockerignore glob kurallarını dosya ağaçları üzerinde test edin.',
  ],
  'k8s-resource-calculator': [
    'Kubernetes Pod Kaynak ve QoS Hesaplayıcı',
    'Kubernetes podları için CPU/bellek isteklerini, sınırlarını ve QoS sınıflarını hesaplayın.',
  ],
  'terraform-hcl-to-json': [
    'Terraform HCL - JSON Dönüştürücü',
    'Terraform HCL kaynak tanımlarını terraform.tf.json sözdizimine dönüştürün.',
  ],
  'systemd-timer-generator': [
    'Systemd Hizmet ve Zamanlayıcı Oluşturucu',
    'Linux otomasyonu için eşleşen systemd .service ve .timer birimleri oluşturun.',
  ],
  'sql-to-prisma': [
    'SQL DDL - Prisma Şeması Dönüştürücü',
    'SQL CREATE TABLE ifadelerini Prisma şema modellerine dönüştürün.',
  ],
  'sql-to-drizzle': [
    'SQL DDL - Drizzle ORM Şeması Dönüştürücü',
    'SQL CREATE TABLE ifadelerini Drizzle ORM TypeScript şemalarına dönüştürün.',
  ],
  'postgres-explain-visualizer': [
    'PostgreSQL EXPLAIN Planı Analiz Aracı',
    'EXPLAIN JSON çıktısındaki PostgreSQL sorgu planlarını analiz edin ve görselleştirin.',
  ],
  'mongodb-to-sql': [
    'MongoDB Sorgusu - SQL Dönüştürücü',
    'MongoDB find filtrelerini SQL SELECT sorgularına dönüştürün.',
  ],
  'sql-to-django': [
    'SQL DDL - Django Modeli Dönüştürücü',
    'SQL CREATE TABLE ifadelerini Python Django ORM modellerine dönüştürün.',
  ],
  'sql-keyword-uppercaser': [
    'SQL Anahtar Kelimesi Büyük Harfe Dönüştürücü',
    'Sütun ve tablo adlarını koruyarak tüm SQL anahtar kelimelerini büyük harfe dönüştürün.',
  ],
  'subnet-calculator': [
    'IPv4 Alt Ağ Maskesi ve CIDR Hesaplayıcı',
    'CIDR değerinden alt ağ maskesini, yayın adresini ve kullanılabilir cihaz adresi aralığını hesaplayın.',
  ],
  'uuid-v5-generator': [
    'UUID v5 (SHA-1 Ad Alanı) Oluşturucu',
    'Ad alanlarından deterministik RFC 4122 UUID v5 özetleri oluşturun.',
  ],
  'bip39-seed-phrase-generator': [
    'BIP-39 Kurtarma İfadesi Oluşturucu',
    'Kriptografik olarak güvenli, 12 ve 24 kelimelik BIP-39 kurtarma ifadeleri oluşturun.',
  ],
  'eip712-hasher': [
    'Ethereum EIP-712 Tür Bilgili Veri Özeti Hesaplayıcı',
    'EIP-712 tür bilgili veri imzalama işlemleri için alan ayırıcısını ve yapı özetini hesaplayın.',
  ],
  'crypto-unit-converter': [
    'Kripto Para Birim Dönüştürücü',
    'Wei, Gwei, Ether ve Bitcoin Satoshi birimleri arasında dönüştürün.',
  ],
  'json-to-python-dataclass': [
    'JSON - Python Dataclass Dönüştürücü',
    'JSON nesnelerini Python 3.10 ve üzeri @dataclass sınıflarına dönüştürün.',
  ],
  'json-to-go-struct': [
    'JSON - Go Struct Dönüştürücü',
    'JSON nesnelerini json etiketleri içeren Go struct yapılarına dönüştürün.',
  ],
  'proto-to-typescript': [
    'Protobuf - TypeScript Arayüzü Dönüştürücü',
    'Proto3 mesaj tanımlarını TypeScript arayüzlerine dönüştürün.',
  ],
  'http-headers-to-json': [
    'HTTP Başlığı - JSON Dönüştürücü',
    'HTTP başlık metinlerini JSON nesnelerine ve tersine dönüştürün.',
  ],
  'jwt-builder': [
    'JWT Veri Oluşturucu ve Simülatörü',
    'İmza simülasyonuyla özel başlık ve veri bölümleri içeren JWT belirteçleri oluşturun.',
  ],
  'passphrase-wordlist-generator': [
    'Diceware Parola İfadesi Oluşturucu',
    'Özel ayırıcılarla güçlü ve akılda kalıcı Diceware parola ifadeleri oluşturun.',
  ],
  'nanoid-custom-alphabet': [
    'NanoID Özel Alfabe Oluşturucu',
    'Özel alfabeler ve uzunluklarla çakışmaya dayanıklı NanoID değerleri oluşturun.',
  ],
  'mock-credit-card-generator': [
    'Test Kredi Kartı Oluşturucu (Luhn Uyumlu)',
    'Stripe ve deneme ortamları için Luhn kontrolüne uygun test kredi kartı numaraları oluşturun.',
  ],
  'tailwind-spacing-generator': [
    'Tailwind Boşluk Ölçeği Oluşturucu',
    'Tailwind CSS için özel esnek boşluk ve margin/padding ölçekleri oluşturun.',
  ],
  'docker-compose-env-generator': [
    'Docker Compose .env Şablonu Oluşturucu',
    'docker-compose.yml dosyasındaki tüm ortam değişkenlerini düzenli bir .env şablonuna çıkarın.',
  ],
  'dns-propagation-checker': [
    'DNS Kaydı Yayılım Kontrol Aracı',
    'Dünya genelindeki birden çok erişim noktasında simüle edilmiş DNS yayılımını kontrol edin.',
  ],
  'url-utm-builder': [
    'Google Analytics UTM Kampanya URL Oluşturucu',
    'utm_source, utm_medium ve utm_campaign içeren düzenli pazarlama kampanyası URL adresleri oluşturun.',
  ],
  'sha3-hash-generator': [
    'SHA-3 (Keccak) Özeti Oluşturucu',
    'Kriptografik SHA3-256 ve SHA3-512 özetleri oluşturun.',
  ],
  'sql-to-go-gorm': [
    'SQL DDL - Go GORM Modeli Dönüştürücü',
    'SQL CREATE TABLE şema tanımlarını birincil anahtarlar içeren Go GORM model yapılarına dönüştürün.',
  ],
  'sql-to-python-sqlalchemy': [
    'SQL DDL - SQLAlchemy 2.0 Modeli Dönüştürücü',
    'SQL CREATE TABLE ifadelerini Python SQLAlchemy 2.0 Declarative Base model sınıflarına dönüştürün.',
  ],
  'postman-to-openapi': [
    'Postman Koleksiyonu - OpenAPI 3.1 Dönüştürücü',
    'Dışa aktarılmış Postman Collection v2.1 JSON dosyalarını OpenAPI 3.1 YAML/JSON tanımlarına dönüştürün.',
  ],
  'openapi-to-postman': [
    'OpenAPI - Postman Koleksiyonu Oluşturucu',
    'OpenAPI 3.0 ve Swagger API tanımlarını içe aktarılabilir Postman Collection v2.1 JSON biçimine dönüştürün.',
  ],
  'protobuf-to-json-schema': [
    'Protobuf 3 - JSON Schema Dönüştürücü',
    'Protocol Buffers (proto3) mesaj tanımlarını JSON Schema Draft-07 şemalarına dönüştürün.',
  ],
  'json-schema-to-protobuf': [
    'JSON Schema - Protobuf 3 Oluşturucu',
    'JSON Schema tanımlarını düzenli Protocol Buffers proto3 mesaj sözleşmelerine dönüştürün.',
  ],
  'yaml-to-terraform-hcl': [
    'YAML - Terraform HCL Dönüştürücü',
    'YAML yapılandırma eşlemelerini Terraform HCL locals ve variable bloklarına dönüştürün.',
  ],
  'terraform-hcl-to-yaml': [
    'Terraform HCL - YAML Dönüştürücü',
    'Terraform HCL özniteliklerini ve yerel değerlerini düzenli, yapılandırılmış YAML eşlemelerine dönüştürün.',
  ],
  'csv-to-geojson': [
    'CSV - GeoJSON Nokta Dönüştürücü',
    'Enlem ve boylam içeren CSV koordinat veri kümelerini GeoJSON FeatureCollection nesnelerine dönüştürün.',
  ],
  'geojson-to-csv': [
    'GeoJSON - CSV Koordinat Dönüştürücü',
    'GeoJSON nokta geometrilerini ve özelliklerini CSV tablo koordinatlarına dönüştürün.',
  ],
  'json-to-typescript-type-guards': [
    "JSON'dan TypeScript Tür Koruyucu Oluşturucu",
    'JSON yapılarından çalışma zamanında mantıksal değer döndüren TypeScript tür koruyucu fonksiyonlar (isType) oluşturun.',
  ],
  'typescript-interface-to-zod': [
    'TypeScript Arayüzü - Zod Şeması Dönüştürücü',
    'TypeScript arayüzlerini ve türlerini çalışma zamanı Zod doğrulama şemalarına dönüştürün.',
  ],
  'zod-to-typescript-type': [
    'Zod Şeması - TypeScript Tür Çıkarıcı',
    'Çalışma zamanı Zod doğrulama şemalarından statik TypeScript tür bildirimleri çıkarın.',
  ],
  'css-to-scss': [
    'CSS - İç İçe SCSS ve SASS Dönüştürücü',
    'Düz CSS stil sayfası seçicilerini düzenli, iç içe SCSS/SASS bloklarına dönüştürün.',
  ],
  'scss-to-css': [
    'SCSS ve SASS - Standart CSS Dönüştürücü',
    'SCSS değişkenlerini, mixin yapılarını ve iç içe blokları tarayıcılar arası uyumlu standart CSS koduna dönüştürün.',
  ],
  'html-to-jsx-tailwind': [
    'HTML - JSX ve Tailwind CSS Dönüştürücü',
    'class öznitelikleri içeren HTML kodunu className ve kendiliğinden kapanan etiketler kullanan React JSX koduna dönüştürün.',
  ],
  'jsx-to-html': [
    'React JSX - Standart HTML Dönüştürücü',
    'className ve JSX yorumları içeren React JSX parçalarını saf HTML koduna dönüştürün.',
  ],
  'markdown-to-bbcode': [
    'Markdown - Forum BBCode Dönüştürücü',
    'Markdown başlıklarını, kalın metinleri, görselleri ve bağlantıları standart forum BBCode etiketlerine dönüştürün.',
  ],
  'bbcode-to-markdown': [
    'BBCode - GitHub Markdown Dönüştürücü',
    'Forum BBCode etiketlerini standart GitHub uyumlu Markdown metin biçimine dönüştürün.',
  ],
  'curl-to-php-guzzle': [
    'cURL - PHP Guzzle İstemcisi Dönüştürücü',
    'Başlık ve gövde içeren terminal cURL komutlarını çalıştırılabilir PHP Guzzle istemci koduna dönüştürün.',
  ],
  'curl-to-ruby-faraday': [
    'cURL - Ruby Faraday İstemcisi Dönüştürücü',
    'cURL isteklerini başlıklarıyla birlikte Ruby Faraday ve Net::HTTP istemci isteklerine dönüştürün.',
  ],
  'curl-to-rust-reqwest': [
    'cURL - Rust reqwest Asenkron İstemcisi',
    'cURL komutlarını asenkron Rust reqwest istemci isteği kod bloklarına dönüştürün.',
  ],
  'curl-to-go-http': [
    'cURL - Go net/http İstemcisi Dönüştürücü',
    'cURL komutlarını Go standart kitaplığındaki net/http istemci isteklerine dönüştürün.',
  ],
  'svg-to-android-vector': [
    'SVG - Android Vector Drawable XML Dönüştürücü',
    'SVG vektör grafiklerini yerel Android uygulamaları için Android Vector Drawable XML biçimine dönüştürün.',
  ],
  'svg-to-swiftui-shape': [
    'SVG - SwiftUI Shape ve Path Oluşturucu',
    'SVG vektör yol komutlarını iOS/macOS için yerel SwiftUI Path ve Shape yapılarına dönüştürün.',
  ],
  'css-grid-to-tailwind': [
    'CSS Grid - Tailwind CSS Sınıfı Dönüştürücü',
    'CSS grid-template-columns ve gap stillerini Tailwind CSS Grid yardımcı sınıflarına dönüştürün.',
  ],
  'dockerfile-ai-optimized-generator': [
    'Çok Aşamalı Dockerfile Oluşturucu',
    'Node, Python, Go ve Rust için güvenlik ayarları içeren, üretime uygun çok aşamalı Dockerfile dosyaları oluşturun.',
  ],
  'kubernetes-deployment-generator': [
    'Kubernetes Deployment YAML Oluşturucu',
    'Üretim için Kubernetes Deployment, Service ve kaynak sınırı YAML bildirimleri oluşturun.',
  ],
  'kubernetes-configmap-secret-builder': [
    'K8s ConfigMap ve Secret Bildirimi Oluşturucu',
    'Kubernetes ConfigMap ve Base64 kodlu Secret YAML bildirimlerini kolayca oluşturun.',
  ],
  'helm-chart-yaml-generator': [
    'Helm Chart ve Values Başlangıç Şablonu Oluşturucu',
    'Bulut için tasarlanmış Kubernetes uygulamalarına yönelik Helm Chart.yaml ve values.yaml başlangıç şablonları oluşturun.',
  ],
  'gitlab-ci-pipeline-builder': [
    'GitLab CI/CD YAML İşlem Hattı Oluşturucu',
    'Derleme, test ve önbellekleme içeren çok aşamalı .gitlab-ci.yml işlem hattı yapılandırmaları oluşturun.',
  ],
  'github-issue-pr-template-generator': [
    'GitHub Issue ve PR Şablonu Oluşturucu',
    'Standart GitHub Markdown sorun şablonları ve çekme isteği kontrol listesi şablonları oluşturun.',
  ],
  'opa-rego-policy-builder': [
    'Open Policy Agent (OPA) Rego Oluşturucu',
    'RBAC, ABAC ve API güvenliği uygulamaları için OPA Rego yetkilendirme politikaları oluşturun.',
  ],
  'systemd-service-hardened-builder': [
    'Linux systemd Güvenliği Artırılmış Hizmet Oluşturucu',
    'Güvenlik yalıtımı ve NoNewPrivileges ayarları içeren Linux systemd hizmet birimi dosyaları oluşturun.',
  ],
  'nginx-security-conf-generator': [
    'Güvenliği Artırılmış Nginx Sunucu Yapılandırma Oluşturucu',
    'SSL TLS 1.3, HSTS ve istek hızı sınırlaması içeren, güvenliği artırılmış Nginx sunucu blokları oluşturun.',
  ],
  'caddyfile-production-generator': [
    'Üretim İçin Caddyfile Yapılandırma Oluşturucu',
    'Otomatik HTTPS, ters vekil ve sıkıştırma içeren modern Caddyfile yapılandırmaları oluşturun.',
  ],
  'prometheus-recording-rules-generator': [
    'Prometheus Uyarı ve Kayıt Kuralı Oluşturucu',
    'SLO izleme ve gecikme ölçümü için Prometheus uyarı ve kayıt kurallarını YAML biçiminde oluşturun.',
  ],
  'tailwind-v4-mesh-gradient-generator': [
    'Tailwind CSS Radyal Ağ Renk Geçişi Oluşturucu',
    'CSS ve Tailwind CSS için modern, çok renkli radyal ağ arka plan geçişleri oluşturun.',
  ],
  'css-isometric-grid-generator': [
    'CSS İzometrik 3B Izgara ve Dönüşüm Oluşturucu',
    '2,5 boyutlu izometrik CSS dönüşüm ızgaraları ve karo koordinat matrisi stilleri oluşturun.',
  ],
  'css-ribbon-banner-generator': [
    'CSS Köşe Şeridi ve Rozet Oluşturucu',
    'Yalnızca CSS kullanarak duyarlı köşe şeritleri, indirim rozetleri ve tanıtım etiketleri oluşturun.',
  ],
  'svg-wavy-divider-generator': [
    'SVG Dalgalı Sayfa Bölümü Ayırıcısı Oluşturucu',
    'Tanıtım sayfaları için yumuşak SVG dalga ayırıcıları ve bölüm geçişleri oluşturun.',
  ],
  'opengraph-banner-canvas-generator': [
    'OpenGraph ve Twitter Kartı Meta Etiketi Oluşturucu',
    'Dinamik OpenGraph ve Twitter sosyal önizleme kartı meta etiketleri ve afiş kodu oluşturun.',
  ],
  'prisma-seed-generator': [
    'Prisma Başlangıç Verisi Betiği Oluşturucu',
    'Toplu eklemeler içeren TypeScript Prisma veritabanı başlangıç verisi betikleri (prisma/seed.ts) oluşturun.',
  ],
  'faker-js-mock-schema-generator': [
    'Faker.js Yapay Veri Kümesi Oluşturucu',
    'Faker.js kullanarak ad, e-posta, avatar ve tarih alanları için örnek veri kümesi şemaları oluşturun.',
  ],
  'llm-few-shot-prompt-formatter': [
    'LLM Az Örnekli Yapılandırılmış İstem Oluşturucu',
    'Ayırıcılarla ayrılmış örnek çiftleri içeren, yüksek doğruluk hedefleyen az örnekli istem şablonları oluşturun.',
  ],
  'cot-chain-of-thought-prompt-builder': [
    'Düşünce Zinciri (CoT) İstem Oluşturucu',
    'Karmaşık yapay zekâ akıl yürütme görevleri için yapılandırılmış düşünce zinciri şablonları oluşturun.',
  ],
  'sql-stored-procedure-generator': [
    'SQL Saklı Yordam ve Tetikleyici Oluşturucu',
    'PostgreSQL ve MySQL için saklı yordam, fonksiyon ve denetim tetikleyicisi şablonları oluşturun.',
  ],
  'redis-lua-script-generator': [
    'Atomik Redis Lua Betiği Oluşturucu',
    'Token kovası hız sınırlayıcıları, karşılıklı dışlama kilitleri ve kuyruklar için atomik Redis Lua betikleri oluşturun.',
  ],
  'crontab-randomized-generator': [
    'Crontab Rastgele Gecikme Oluşturucu',
    'Toplu eşzamanlı yüklenmeyi önlemek için rastgele bekleme süreleri içeren Cron komutları oluşturun.',
  ],
  'ansible-playbook-scaffolder': [
    'Ansible Otomasyon Başlangıç Şablonu Oluşturucu',
    'Görevler, işleyiciler ve paket yöneticileri içeren, üretime uygun Ansible YAML playbook dosyaları oluşturun.',
  ],
  'terraform-module-scaffolder': [
    'Terraform Modül Başlangıç Şablonu Oluşturucu',
    'Yapılandırılmış Terraform main.tf, variables.tf ve outputs.tf modül yapıları oluşturun.',
  ],
  'http-cache-control-tester': [
    'HTTP Cache-Control Başlığı Test Aracı',
    'HTTP Cache-Control, max-age, must-revalidate ve immutable önbellekleme yönergelerini analiz edin.',
  ],
  'dns-soa-dnssec-inspector': [
    'DNS SOA Seri Numarası ve DNSSEC Kaydı İnceleyici',
    'DNS SOA seri numaralarını, tarih biçimlerini, bölge sürümlerini ve DNSSEC kayıtlarını inceleyin.',
  ],
  'ip-supernetting-calculator': [
    'IP Üst Ağ ve CIDR Birleştirme Aracı',
    'Birleştirilmiş üst ağları hesaplayın ve birden çok IP CIDR ağ ön ekini özetleyin.',
  ],
  'opengraph-tag-inspector': [
    'OpenGraph ve Sosyal Meta Etiketi İnceleyici',
    'OpenGraph, Twitter Card ve LinkedIn önizleme meta etiketlerini çıkarın ve inceleyin.',
  ],
  'jwt-expiry-calculator': [
    'JWT Belirteci Sona Erme ve Ömür Hesaplayıcı',
    'JWT verilerinden kalan saniyeleri, sona erme zamanını ve geçerliliği hesaplayın.',
  ],
  'regex-benchmark-simulator': [
    'Düzenli İfade ReDoS ve Geri İzleme Risk Analiz Aracı',
    'Felaket düzeyinde üstel geri izleme risklerini algılayın ve düzenli ifade karmaşıklığını değerlendirin.',
  ],
  'llm-context-window-shrinker': [
    'LLM İstem Bağlam Penceresi İyileştirme Aracı',
    'Yorumları, docstring açıklamalarını ve fazla boşlukları kaldırarak istem token tüketimini azaltın.',
  ],
  'embedding-token-cost-estimator': [
    'Metin Gömme Token ve API Maliyeti Tahmin Aracı',
    'OpenAI text-embedding-3 ve Voyage AI modellerinin vektör gömme token maliyetlerini hesaplayın.',
  ],
  'webhook-payload-simulator': [
    'Örnek Webhook Olay Verisi Simülatörü',
    'Stripe, GitHub, Slack ve Shopify için yapay webhook JSON olay verileri oluşturun.',
  ],
  'network-port-reference': [
    'TCP/UDP Port Numarası Başvuru Kaynağı',
    'Standart TCP ve UDP port numaralarını, hizmet atamalarını ve güvenlik notlarını arayın.',
  ],
  'ssl-tls-handshake-simulator': [
    'TLS 1.2 ve TLS 1.3 Kriptografik El Sıkışma Simülatörü',
    'TLS 1.2 (2-RTT) ve TLS 1.3 (1-RTT) kriptografik el sıkışma akışlarını simüle edin ve karşılaştırın.',
  ],
  'http2-http3-frame-inspector': [
    'HTTP/2 ve HTTP/3 QUIC Çerçeve İnceleyici',
    'HTTP/2 ve HTTP/3 QUIC akışlarının ikili çerçeve türlerini, bayraklarını ve veri işlevlerini inceleyin.',
  ],
  'dns-spf-record-flattener': [
    'DNS SPF Sorgu Sayacı ve Kayıt Düzleştirici',
    'SPF TXT kayıtlarındaki DNS sorgularını sayın ve RFC uyumluluğunu kontrol edin (< 10 sorgu sınırı).',
  ],
  'mime-type-extension-lookup': [
    'Dosya Uzantısı - MIME Content-Type Başvuru Aracı',
    'Dosya uzantısına göre standart IANA MIME içerik türlerini ve başlıklarını arayın.',
  ],
  'color-blindness-simulator': [
    'Renk Körlüğü Erişilebilirlik Simülatörü',
    'Protanopi, döteranopi ve tritanopi için renk erişilebilirliğini simüle edin.',
  ],
  'contrast-ratio-apca-calculator': [
    'WCAG ve APCA Metin Kontrast Oranı Hesaplayıcı',
    'WCAG 2.1 AAA kurallarına göre metin ve arka plan renklerinin kontrast oranlarını hesaplayın.',
  ],
  'viewport-size-tester': [
    'Duyarlı Görüntü Alanı ve Ekran Eşiği İnceleyici',
    'Tailwind CSS ekran eşiklerini (xs, sm, md, lg, xl, 2xl) ve standart ekran boyutlarını inceleyin.',
  ],
  'unicode-glyph-category-inspector': [
    'Unicode Karakter ve Kod Noktası İnceleyici',
    'Unicode karakter kod noktalarını, onaltılık kodlamalarını ve kategori bloklarını inceleyin.',
  ],
  'seo-robots-noindex-simulator': [
    'Robots.txt ve X-Robots-Tag Dizine Ekleme Simülatörü',
    'Arama motoru dizine ekleme kurallarını, noindex, nofollow ve tarama izinlerini değerlendirin.',
  ],
  'cors-preflight-inspector': [
    'CORS Ön Kontrol OPTIONS İsteği İnceleyici',
    'Kaynaklar Arası Kaynak Paylaşımı ön kontrol başlıklarını, kaynak adreslerini ve kimlik bilgilerini inceleyin.',
  ],
  'css-selector-speed-profiler': [
    'CSS Seçici Özgüllük ve Hız Analiz Aracı',
    'CSS seçicilerinin özgüllük üçlülerini [kimlik, sınıf, etiket] ve görüntüleme verimliliğini hesaplayın.',
  ],
  'git-conflict-marker-cleaner': [
    'Git Birleştirme Çakışması İşareti Temizleyici',
    'Kaynak kod dosyalarındaki birleştirme çakışması işaretlerini (HEAD, ===, >>>) kaldırın ve çözün.',
  ],
  'semver-range-evaluator': [
    'Anlamsal Sürümleme (SemVer) Aralık Değerlendirici',
    'npm SemVer aralıklarını (^, ~, >=) değerlendirin ve sürüm uyumluluğunu belirleyin.',
  ],
  'package-json-license-checker': [
    'package.json Açık Kaynak Lisans Kontrol Aracı',
    'package.json bağımlılıklarını açık kaynak lisanslarının ticari kullanım uyumluluğu açısından tarayın.',
  ],
  'api-rate-limit-cost-calculator': [
    'Token Kovası API İstek Hızı Sınırı Hesaplayıcı',
    'Token Bucket ve Leaky Bucket kapasitesini, dolum hızlarını ve ani istek sınırlarını hesaplayın.',
  ],
  'blake3-hash-generator': [
    'BLAKE3 Kriptografik Özet Oluşturucu',
    'İstemci tarafında çok hızlı 256 bit BLAKE3 kriptografik özetleri ve ağaç özetleri oluşturun.',
  ],
  'pbkdf2-key-derivation': [
    'PBKDF2 Anahtar Türetme Fonksiyonu Hesaplayıcı',
    'HMAC-SHA256 ve ayarlanabilir yineleme sayısıyla PBKDF2 kullanarak güvenli kriptografik anahtarlar türetin.',
  ],
  'hmac-sha384-sha512-calculator': [
    'HMAC-SHA384 ve HMAC-SHA512 İmza Oluşturucu',
    'SHA-384 ve SHA-512 özetleriyle anahtarlı mesaj doğrulama kodlarını (HMAC) hesaplayın.',
  ],
  'ethereum-eip191-signature-verifier': [
    'Ethereum EIP-191 Kişisel İmza Doğrulayıcı',
    'Web3 cüzdanları için Ethereum EIP-191 personal_sign ön ekli mesajları biçimlendirin ve doğrulayın.',
  ],
  'bitcoin-bech32-address-encoder': [
    'Bitcoin Bech32 ve SegWit Adres Doğrulayıcı',
    'Native SegWit (P2WPKH) ve Taproot Bech32/Bech32m Bitcoin adreslerini doğrulayın ve çözün.',
  ],
  'rsa-pkcs1-pkcs8-converter': [
    'RSA PKCS#1 - PKCS#8 Anahtar Biçimi İnceleyici',
    'RSA açık ve özel anahtar biçimlerini algılayın ve PKCS#1 ile PKCS#8 PEM biçimleri arasında dönüştürün.',
  ],
  'x509-san-csr-builder': [
    'Alternatif Adlı (SAN) X.509 CSR Oluşturucu',
    'Birden çok SAN alan adı içeren OpenSSL sertifika imzalama isteği (CSR) yapılandırmaları oluşturun.',
  ],
  'ed25519-sign-verify': [
    'Ed25519 İmza ve Anahtar Çifti İnceleyici',
    '256 bit Ed25519 eliptik eğri açık ve özel anahtarlarını temizleyin ve inceleyin.',
  ],
  'argon2-parameter-tuner': [
    'Argon2id Bellek ve Maliyet Parametresi Ayarlayıcı',
    'RFC-9106 tarafından önerilen Argon2id bellek, yineleme ve paralellik parametrelerini hesaplayın.',
  ],
  'uuid-v7-timestamp-extractor': [
    'UUIDv7 Zaman Damgası ve Tarih Çıkarıcı',
    'UUIDv7 metinlerinden Unix milisaniye zaman damgalarını, UTC tarihlerini ve dizileri çıkarın.',
  ],
  'ethereum-abi-storage-slot-calculator': [
    'Solidity EVM Durum Değişkeni Depolama Yuvası Hesaplayıcı',
    'Solidity durum değişkenleri ve akıllı sözleşmeler için 32 baytlık EVM depolama yuvalarını hesaplayın.',
  ],
  'base64-pem-certificate-parser': [
    'X.509 TLS/SSL Sertifikası SAN ve Bilgi Ayrıştırıcı',
    'X.509 PEM sertifikalarını ayrıştırarak alternatif adları, düzenleyicileri ve geçerlilik bilgilerini çıkarın.',
  ],
  'punycode-idn-converter': [
    'Punycode IDN Alan Adı Dönüştürücü',
    'Uluslararası Unicode alan adlarını ASCII uyumlu Punycode (xn--) biçimine dönüştürün.',
  ],
  'crockford-base32-encoder': [
    'Crockford Base32 Kodlayıcı ve Çözücü',
    'Sayıları karıştırılabilecek harfleri içermeyen, kolay okunabilir Crockford Base32 metinlerine kodlayın.',
  ],
  'bcd-binary-coded-decimal-converter': [
    'İkilik Kodlanmış Ondalık (BCD 8421) Dönüştürücü',
    'Ondalık sayıları dört bitlik ikilik kodlanmış ondalık (BCD 8421) gruplarına ve tersine dönüştürün.',
  ],
  'ieee754-hex-float-converter': [
    'IEEE-754 Kayan Nokta - Onaltılık Dönüştürücü',
    '32 bit tek duyarlıklı kayan noktalı sayıları IEEE-754 onaltılık gösterimlerine dönüştürün.',
  ],
  'rot47-encoder-decoder': [
    'ROT47 Metin Kodlayıcı ve Çözücü',
    'Yazdırılabilir ASCII karakterlerini (33–126) 47 karakter kaydırmalı Sezar şifresiyle döndürün.',
  ],
  'json-key-sorter': [
    'JSON Alfabetik Anahtar Sıralayıcı',
    'Düzenli farklar ve tutarlı sonuçlar için tüm JSON nesne anahtarlarını özyinelemeli olarak alfabetik sıraya koyun.',
  ],
  'json-array-splitter-chunker': [
    'Büyük JSON Dizisi Toplu Bölme Aracı',
    'API sınırlarına uymak için büyük JSON veri kümelerini ve dizilerini daha küçük parçalara ayırın.',
  ],
  'text-prefix-suffix-appender': [
    'Çok Satırlı Metin Ön Ek ve Son Ek Ekleme Aracı',
    'Metnin her satırına özel ön ekler, son ekler, tırnaklar veya satır numaraları ekleyin.',
  ],
  'text-duplicate-line-counter': [
    'Yinelenen Satır Sıklığı Sayacı',
    'Metin listelerindeki yinelenen satırları sayın ve öğeleri görülme sıklığına göre sıralayın.',
  ],
  'text-column-tabular-splitter': [
    'Ayraçlı Metin Sütun Bölücü',
    'CSV/TSV ayraçlı metinleri yapılandırılmış sabit genişlikli sütunlara ve matris satırlarına ayırın.',
  ],
  'file-checksum-comparator': [
    'Dosya Sağlama Toplamı Hesaplayıcı ve Karşılaştırıcı',
    'Metin veya yerel dosya için MD5, CRC32, SHA-1, SHA-256, SHA-384 ve SHA-512 sağlama toplamlarını hesaplayın ve güvenilir bir beklenen özetle karşılaştırın.',
  ],
};

export const trCompletion: Record<string, string> = Object.fromEntries(
  Object.entries(tools).flatMap(([id, [name, description]]) => [
    [`toolName.${id}`, name],
    [`toolDesc.${id}`, description],
  ]),
);
