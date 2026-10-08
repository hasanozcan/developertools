import { trUi } from './ui/tr';
import { enhancedToolTranslations } from './enhancedTools';
import { trCompletion } from './completion/tr';

export const tr = {
  ...trUi,
  // Tool Names
  'toolName.json-formatter': 'JSON Biçimlendirici',
  'toolName.json-validator': 'JSON Doğrulayıcı',
  'toolName.json-schema-validator': 'JSON Schema Doğrulayıcı',
  'toolName.hmac-generator': 'HMAC Oluşturucu ve Doğrulayıcı',
  'toolName.pkce-generator': 'PKCE Oluşturucu ve Doğrulayıcı',
  'toolName.cidr-calculator': 'IPv4 CIDR Hesaplayıcı',
  'toolName.json-csv': 'JSON - CSV Dönüştürücü',
  'toolName.base64': 'Base64 Kodlayıcı/Çözücü',
  'toolName.url-encoder': 'URL Kodlayıcı/Çözücü',
  'toolName.jwt-decoder': 'JWT Çözücü',
  'toolName.html-entity': 'HTML Varlık Kodlayıcı/Çözücü',
  'toolName.uuid-generator': 'UUID Oluşturucu',
  'toolName.password-generator': 'Parola Oluşturucu',
  'toolName.lorem-ipsum': 'Lorem Ipsum Oluşturucu',
  'toolName.qr-code': 'QR Kod Oluşturucu',
  'toolName.slug-generator': 'URL Kısa Adı Oluşturucu',
  'toolName.md5-hash': 'MD5 Özet Oluşturucu',
  'toolName.sha256-hash': 'SHA-256 Özet Oluşturucu',
  'toolName.regex-tester': 'Regex Test Aracı',
  'toolName.text-diff': 'Metin Karşılaştırma Aracı',
  'toolName.markdown-preview': 'Markdown Önizleme',
  'toolName.timestamp-converter': 'Zaman Damgası Dönüştürücü',
  'toolName.color-converter': 'Renk Dönüştürücü',
  'toolName.sql-formatter': 'SQL Biçimlendirici',
  'toolName.css-minifier': 'CSS Küçültücü',
  'toolName.js-minifier': 'JavaScript Küçültücü',
  'toolName.cron-parser': 'Cron İfade Ayrıştırıcı',
  'toolName.json-to-typescript': "JSON'dan TypeScript'e",
  'toolName.yaml-json': 'YAML ↔ JSON Dönüştürücü',
  'toolName.image-to-base64': "Görselden Base64'e Dönüştürücü",
  'toolName.css-gradient': 'CSS Renk Geçişi Oluşturucu',
  'toolName.meta-tags': 'Meta Etiket Oluşturucu',
  'toolName.case-converter': 'Harf Biçimi Dönüştürücü',
  'toolName.word-counter': 'Kelime Sayacı',
  'toolName.remove-duplicates': 'Yinelenen Satırları Kaldır',
  'toolName.sort-lines': 'Satır Sıralayıcı',
  'toolName.hex-encoder': 'HEX Kodlayıcı/Çözücü',
  'toolName.binary-encoder': 'İkilik Kodlayıcı/Çözücü',
  'toolName.html-formatter': 'HTML Biçimlendirici',
  'toolName.html-minifier': 'HTML Küçültücü',
  'toolName.xml-formatter': 'XML Biçimlendirici',
  'toolName.sha512-hash': 'SHA-512 Özet Oluşturucu',
  'toolName.roman-numeral-converter': 'Roma Rakamı Dönüştürücü',
  'toolName.number-base-converter': 'Sayı Tabanı Dönüştürücü',
  'toolName.unicode-escape': 'Unicode Kaçış Kodlayıcı/Çözücü',
  'toolName.json-string-escape': 'JSON Metni Kaçış Kodlayıcı/Çözücü',
  'toolName.url-parser': 'URL Ayrıştırıcı',
  'toolName.query-string-parser': 'Sorgu Metni Ayrıştırıcı',
  'toolName.regex-escape': 'Düzenli İfade Kaçış Aracı',
  'toolName.http-headers-parser': 'HTTP Başlık Ayrıştırıcı',
  'toolName.http-status-codes': 'HTTP Durum Kodları',
  'toolName.user-agent-parser': 'User-Agent Ayrıştırıcı',
  'toolName.json-pointer': 'JSON Pointer Değerlendirici',
  'toolName.chmod-calculator': 'Chmod İzin Hesaplayıcı',
  'toolName.cache-control': 'Cache-Control Ayrıştırıcı ve Oluşturucu',
  'toolName.jsonpath-tester': 'JSONPath Test Aracı',
  'toolName.csp-builder': 'CSP Başlığı Oluşturucu ve Analiz Aracı',
  'toolName.curl-to-fetch': 'cURL İstek Oluşturucu ve Fetch Dönüştürücü',
  // Tool Descriptions
  'toolDesc.json-formatter': 'JSON verilerini biçimlendirin ve okunabilir hale getirin.',
  'toolDesc.json-validator': 'JSON sözdizimini ve yapısını doğrulayın.',
  'toolDesc.json-schema-validator':
    'JSON belgelerini ayrıntılı hata yollarıyla JSON Schema kurallarına göre doğrulayın.',
  'toolDesc.hmac-generator':
    'HMAC-SHA imzalarını onaltılık veya Base64 biçiminde oluşturun ve doğrulayın.',
  'toolDesc.pkce-generator':
    'OAuth PKCE S256 doğrulayıcı ve kod sınaması (challenge) çiftleri oluşturun ve doğrulayın.',
  'toolDesc.cidr-calculator':
    'IPv4 ağ aralıklarını, maskeleri, yayın adreslerini ve kullanılabilir ana makineleri hesaplayın.',
  'toolDesc.json-pointer':
    'RFC 6901 JSON Pointer yollarını JSON belgelerinde çözümleyin ve kesin yol hatalarını görün.',
  'toolDesc.chmod-calculator':
    'Unix izinlerini sekizlik, sembolik ve onay kutulu gösterimler arasında dönüştürün.',
  'toolDesc.cache-control':
    'HTTP Cache-Control yönergelerini ayrıştırın, normalleştirin ve denetleyin.',
  'toolDesc.jsonpath-tester':
    'RFC 9535 biçimindeki yollar, joker karakterler, dilimler ve özyinelemeli inişle JSON verilerini sorgulayın.',
  'toolDesc.csp-builder':
    'Content Security Policy başlıklarını oluşturun, normalleştirin ve yaygın güvenlik açıkları açısından inceleyin.',
  'toolDesc.curl-to-fetch':
    'İstek göndermeden desteklenen cURL komutlarını JavaScript fetch koduna dönüştürün veya istek alanlarından cURL ve Fetch kod parçaları oluşturun.',
  'toolDesc.json-csv': "JSON dizilerini CSV'ye, CSV'leri JSON'a dönüştürün.",
  'toolDesc.base64': "Metni Base64'e kodlayın veya Base64 metinlerinin kodunu çözün.",
  'toolDesc.url-encoder': 'URL metinlerini kodlayın veya kodunu çözün.',
  'toolDesc.jwt-decoder':
    "JWT'lerin kodunu çözün; HS256, HS384 ve HS512 belirteçlerini yerel olarak imzalayın veya doğrulayın.",
  'toolDesc.html-entity': 'HTML varlıklarını kodlayın veya kodunu çözün.',
  'toolDesc.uuid-generator':
    'Rastgele UUID v4 veya zaman damgası tabanlı UUID v7 tanımlayıcıları oluşturun.',
  'toolDesc.password-generator': 'Güçlü, rastgele parolalar oluşturun.',
  'toolDesc.lorem-ipsum':
    'Sözcük, cümle veya paragraf olarak Lorem Ipsum yer tutucu metni oluşturun.',
  'toolDesc.qr-code': "Metin veya URL'den QR kodları oluşturun.",
  'toolDesc.slug-generator': 'Temiz URL kısa adları oluşturun.',
  'toolDesc.md5-hash': 'MD5 özetleri oluşturun.',
  'toolDesc.sha256-hash':
    'UTF-8 metnin veya yerel dosyanın SHA-256 özetini hesaplayın; dosya özetini güvenilir, 64 karakterlik beklenen sağlama toplamıyla karşılaştırın.',
  'toolDesc.regex-tester': 'Düzenli ifade kalıplarını test edin ve hatalarını ayıklayın.',
  'toolDesc.text-diff': 'Metinleri karşılaştırın ve farkları vurgulayın.',
  'toolDesc.markdown-preview': "Markdown'ı önizleyin ve HTML'e dönüştürün.",
  'toolDesc.timestamp-converter': 'Zaman damgalarını okunabilir tarihlere dönüştürün.',
  'toolDesc.color-converter': 'HEX, RGB ve HSL renk biçimleri arasında dönüştürün.',
  'toolDesc.sql-formatter': 'SQL sorgularını biçimlendirin.',
  'toolDesc.css-minifier': "CSS'i üretim için küçültün.",
  'toolDesc.js-minifier': "JavaScript'i üretim için küçültün.",
  'toolDesc.cron-parser': 'Cron ifadelerini ayrıştırın ve açıklayın.',
  'toolDesc.json-to-typescript': 'JSON verilerinden TypeScript arayüzleri oluşturun.',
  'toolDesc.yaml-json': "YAML'ı JSON'a, JSON'u YAML'a dönüştürün.",
  'toolDesc.image-to-base64': "Görselleri Base64'e dönüştürün.",
  'toolDesc.css-gradient': 'CSS renk geçişleri tasarlayın ve dışa aktarın.',
  'toolDesc.meta-tags': 'SEO meta etiketleri oluşturun.',
  'toolDesc.case-converter':
    'Metni büyük/küçük harf, başlık harfi, camelCase ve daha fazlası arasında dönüştürün.',
  'toolDesc.word-counter': 'Sözcükleri, karakterleri, satırları ve cümleleri sayın.',
  'toolDesc.remove-duplicates': 'Metinden yinelenen satırları kaldırın.',
  'toolDesc.sort-lines': 'Satırları alfabetik sıralayın.',
  'toolDesc.hex-encoder': 'Metni onaltılık biçime kodlayın veya onaltılık metnin kodunu çözün.',
  'toolDesc.binary-encoder': 'Metni ikilik biçime kodlayın veya ikilik metnin kodunu çözün.',
  'toolDesc.html-formatter': 'HTML kodunu uygun girinti ile biçimlendirin ve güzelleştirin.',
  'toolDesc.html-minifier': "Boşlukları, yorumları ve fazlalıkları kaldırarak HTML'i küçültün.",
  'toolDesc.xml-formatter': 'XML kodunu uygun girinti ile biçimlendirin ve güzelleştirin.',
  'toolDesc.sha512-hash': 'Metinden SHA512 özetleri oluşturun.',
  'toolDesc.roman-numeral-converter': 'Sayıları Roma rakamlarına ve tam tersini dönüştürün.',
  'toolDesc.number-base-converter':
    'Onluk, onaltılık, sekizlik ve ikilik sayı tabanları arasında dönüştürün.',
  'toolDesc.unicode-escape':
    'Metni Unicode kaçış dizilerine veya kaçış dizilerini metne dönüştürün.',
  'toolDesc.json-string-escape':
    'JSON metin içeriğine kaçış karakterleri ekleyin veya kaçışları çözün.',
  'toolDesc.url-parser': "URL'leri protokol, ana makine, yol ve sorgu parametrelerine ayırın.",
  'toolDesc.query-string-parser': 'URL sorgu metinlerini ayrıştırın ve oluşturun.',
  'toolDesc.regex-escape':
    'Metne, düzenli ifadelerde güvenle kullanılabilmesi için kaçış karakterleri ekleyin.',
  'toolDesc.http-headers-parser': "Ham HTTP başlıklarını JSON'a, JSON'u ham başlıklara dönüştürün.",
  'toolDesc.http-status-codes':
    'Yaygın HTTP durum kodlarını arayın ve başvuru bilgilerini inceleyin.',
  'toolDesc.user-agent-parser':
    'Bir veya birden fazla User-Agent metninden tarayıcı, işletim sistemi, motor, cihaz, CPU ve bot alanlarını ayrıştırın.',
  // .env / Zod / Bcrypt araçları
  'toolName.env-to-json': '.env - JSON Dönüştürücü',
  'toolDesc.env-to-json':
    'Yapılandırma değerlerini yüklemeden dotenv değişkenlerini JSON’a ve tekrar .env biçimine dönüştürün.',
  'toolName.json-to-zod': 'JSON’dan Zod Şeması',
  'toolDesc.json-to-zod':
    'Temsili JSON’dan Zod şemaları ve çıkarılmış TypeScript türleri oluşturun.',
  'toolName.bcrypt-generator': 'Bcrypt Oluşturucu ve Doğrulayıcı',
  'toolDesc.bcrypt-generator':
    'Tuz eklenmiş bcrypt özetleri oluşturun ve test parolalarını yerel olarak doğrulayın.',
  ...enhancedToolTranslations.tr,
  ...trCompletion,
};
