import type { Language } from './index';

// Reviewed protocol names, identifiers, code samples and valid native cognates.
// Exact values keep future English prose from silently becoming an accepted fallback.
export const intentionalEnglish: Readonly<
  Record<Exclude<Language, 'en'>, readonly { key: string; value: string; reason: string }[]>
> = {
  tr: [
    {
      key: 'tool.caseConverter.camelCase',
      value: 'camelCase',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.caseConverter.constantCase',
      value: 'CONSTANT_CASE',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.caseConverter.kebabCase',
      value: 'kebab-case',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.caseConverter.pascalCase',
      value: 'PascalCase',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.caseConverter.snakeCase',
      value: 'snake_case',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.caseConverter.toggleCase',
      value: 'tOGGLE cASE',
      reason:
        'Adlandırma biçiminin yazımını ve harf düzenini gösteren örnek; teknik gösterim aynen korunur.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'tool.curl.url',
      value: 'HTTP(S) URL',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'tool.metaTags.favicon',
      value: 'Favicon',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'tool.metaTags.schemaArticle',
      value: 'Article',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaBlogPosting',
      value: 'BlogPosting',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaLocalBusiness',
      value: 'LocalBusiness',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaOrganization',
      value: 'Organization',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaPerson',
      value: 'Person',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaProduct',
      value: 'Product',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaWebPage',
      value: 'WebPage',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.metaTags.schemaWebSite',
      value: 'WebSite',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason:
        'JWT doğrulamasının makine tarafından kullanılan hata kodu; doğal hata açıklaması ayrı anahtarda Türkçedir.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason: 'İletişim standardı, ağ adı veya kişi kartı biçiminin yerleşik teknik adı.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.07468f1d',
      value: 'Ether (ETH)',
      reason: 'Kripto varlık veya alt birimin özel adı ve sembolü; çevrilmez.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason:
        'Yalnızca biçim/dosya adları ve dönüşüm yönü simgesinden oluşur; çevrilecek doğal dil bulunmaz.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason:
        'JWT doğrulamasının makine tarafından kullanılan hata kodu; doğal hata açıklaması ayrı anahtarda Türkçedir.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.0c00887b',
      value: 'JSON POST',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.11e991fd',
      value: 'Devs',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.128fef66',
      value: 'Top-K:',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.14abc909',
      value: 'Top-P:',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.14ba3f63',
      value: 'KB)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.18eae73f',
      value: 'Swagger / OpenAPI JSON Schema',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.1a169df7',
      value: 'my-cool-blog-post_name',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.1afbc1d8',
      value: 'Ctrl+↵',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.1c039058',
      value: '⌘K / Ctrl+K',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason:
        'JWT doğrulamasının makine tarafından kullanılan hata kodu; doğal hata açıklaması ayrı anahtarda Türkçedir.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.24451742',
      value: 'GeoJSON FeatureCollection',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason:
        'Sayısal HTTP koduyla birlikte verilen standart İngilizce reason phrase; protokol örneği olarak korunur, doğal açıklamalar çevrilmiştir.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.36297bab',
      value: 'UTC Cron:',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.3fc8264b',
      value: 'RFC 6902 JSON Patch',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.4498655e',
      value: '800px (HD)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.45e079f8',
      value: 'John Doe',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason:
        'Sayısal HTTP koduyla birlikte verilen standart İngilizce reason phrase; protokol örneği olarak korunur, doğal açıklamalar çevrilmiştir.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.4c956b5b',
      value: 'Elasticsearch Query DSL',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.54ddc377',
      value: 'CSS border-radius',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.573a72ab',
      value: 'Ether',
      reason: 'Kripto varlık veya alt birimin özel adı ve sembolü; çevrilmez.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.5e152baa',
      value: 'SMS',
      reason: 'İletişim standardı, ağ adı veya kişi kartı biçiminin yerleşik teknik adı.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason:
        'Yalnızca biçim/dosya adları ve dönüşüm yönü simgesinden oluşur; çevrilecek doğal dil bulunmaz.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.61afdcbf',
      value: 'OpenAI SDK',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.657ebd8d',
      value: 'SQL CREATE TABLE DDL',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason: 'Kripto varlık veya alt birimin özel adı ve sembolü; çevrilmez.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason:
        'Yalnızca biçim/dosya adları ve dönüşüm yönü simgesinden oluşur; çevrilecek doğal dil bulunmaz.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.758e86ff',
      value: 'US Letter',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.76210de0',
      value: 'Google SERP',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.8285e8fa',
      value: 'Model',
      reason:
        'Model sözcüğü Türkçede de aynı yazılır; yapay zekâ modeli alanının doğal Türkçe etiketi.',
    },
    {
      key: 'uiText.844a87bf',
      value: 'Kubernetes Deployment YAML',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.8644f384',
      value: 'Ctrl',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.869d97b8',
      value: 'Postman Collection v2.1',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.87a46248',
      value: 'WiFi',
      reason: 'İletişim standardı, ağ adı veya kişi kartı biçiminin yerleşik teknik adı.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.91833986',
      value: 'LinkedIn URL',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.950196fc',
      value: 'Tools',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason:
        'JWT doğrulamasının makine tarafından kullanılan hata kodu; doğal hata açıklaması ayrı anahtarda Türkçedir.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason:
        'Üretilen robots meta yönergesinin gerçek tokenları; çeviri çıktı anlamını değiştirir.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.9dcf6762',
      value: 'Android Vector Drawable XML',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.abceb483',
      value: 'Türkçe Açıklama',
      reason:
        'İngilizce kaynak girdisi zaten doğal Türkçedir; doğru Türkçe metni yeniden değiştirmek gerekmez.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason:
        'Üretilen robots meta yönergesinin gerçek tokenları; çeviri çıktı anlamını değiştirir.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.b61ece53',
      value: 'GitHub Markdown',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.c301a35e',
      value: 'IANA MIME Content-Type',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason:
        'Üretilen robots meta yönergesinin gerçek tokenları; çeviri çıktı anlamını değiştirir.',
    },
    {
      key: 'uiText.c4cf9f2a',
      value: 'Postman Collection v2.1 JSON',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.c60cd0db',
      value: '4x (Ultra HD 4K)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason:
        'Yalnızca biçim/dosya adları ve dönüşüm yönü simgesinden oluşur; çevrilecek doğal dil bulunmaz.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.ce2e7ed7',
      value: 'Anthropic Claude SDK',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason:
        'Ölçü birimi, çözünürlük/oran gösterimi veya uluslararası kâğıt boyutunun adı; sayı ve teknik tanım korunur.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason:
        'JWT doğrulamasının makine tarafından kullanılan hata kodu; doğal hata açıklaması ayrı anahtarda Türkçedir.',
    },
    {
      key: 'uiText.e2c53cc6',
      value: 'Port',
      reason:
        'Ağ bağlantı noktası için Türkçede yerleşik Port terimi kullanılır; yazımı İngilizceyle aynıdır.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason:
        'Marka/ürün veya botun özel adı; Devs ve Tools parçaları uygulamanın DevsTools adını oluşturur.',
    },
    {
      key: 'uiText.e5a522d3',
      value: 'Fetch API',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason:
        'Yalnızca biçim/dosya adları ve dönüşüm yönü simgesinden oluşur; çevrilecek doğal dil bulunmaz.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason:
        'Sayısal HTTP koduyla birlikte verilen standart İngilizce reason phrase; protokol örneği olarak korunur, doğal açıklamalar çevrilmiştir.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason:
        'Üretilen robots meta yönergesinin gerçek tokenları; çeviri çıktı anlamını değiştirir.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason:
        'API/HTTP alanı, dosya, CSS özelliği veya yapılandırma parametresinin teknik adı; adı değiştirmeden kullanılabilir olması gerekir.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason: 'Yalnızca iki yer tutucu ve noktalama içerir; yer tutucular aynen korunmalıdır.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason:
        'Kriptografik algoritma, eğri, imza veya TLS sürümünün standart kimliği; aynen korunur.',
    },
    {
      key: 'uiText.f4d00413',
      value: 'Bitcoin (BTC)',
      reason: 'Kripto varlık veya alt birimin özel adı ve sembolü; çevrilmez.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason:
        'Yerleşik teknik terim veya standardın özel adı; Türkçe açıklamalardaki adlarla tutarlı olarak korunur.',
    },
    {
      key: 'uiText.f9bd04e7',
      value: 'Shift',
      reason:
        'Klavyede görünen tuş adı veya kısayol; kullanıcının basacağı tuşla eşleşmesi için korunur.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason:
        'Çalıştırılabilir/parçalı kod, örnek veri, tanımlayıcı veya test girdisi; örneği ve beklenen çıktıyı değiştirmemek için korunur.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason: 'Kripto varlık veya alt birimin özel adı ve sembolü; çevrilmez.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason:
        'Şema türü veya üretilen yapılandırmanın sabit değeri; çevrilmesi teknik kimliği değiştirir.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason:
        'Ürün, kütüphane, programlama dili, API kaynağı veya resmi veri biçimi adı; özel ad ve sürüm kimliği korunur.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason:
        'Sayısal HTTP koduyla birlikte verilen standart İngilizce reason phrase; protokol örneği olarak korunur, doğal açıklamalar çevrilmiştir.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason:
        'Standart kısaltma, kodlama/renk biçimi veya protokol adı; Türkçede de aynı teknik ad kullanılır.',
    },
  ],
  de: [
    {
      key: 'common.tab',
      value: 'Tab',
      reason:
        'Tab is the established German browser term for a tab; it identifies the browser navigation control.',
    },
    {
      key: 'contact.feedback',
      value: 'Feedback',
      reason:
        'Feedback is an established German noun for Rückmeldung; the preserved contact label is natural German.',
    },
    {
      key: 'contact.name',
      value: 'Name',
      reason:
        'Name is the correct German noun for the contact name field and happens to have the English spelling.',
    },
    {
      key: 'privacy.cookies',
      value: 'Cookies',
      reason: 'Cookies is the established German web term for HTTP cookies in the privacy page.',
    },
    {
      key: 'theme.system',
      value: 'System',
      reason: 'System is the standard German and English name for the OS-controlled theme setting.',
    },
    {
      key: 'tool.caseConverter.camelCase',
      value: 'camelCase',
      reason:
        'camelCase is the literal naming-convention identifier demonstrated by the converter.',
    },
    {
      key: 'tool.caseConverter.constantCase',
      value: 'CONSTANT_CASE',
      reason:
        'CONSTANT_CASE is the literal naming-convention identifier demonstrated by the converter.',
    },
    {
      key: 'tool.caseConverter.kebabCase',
      value: 'kebab-case',
      reason:
        'kebab-case is the literal naming-convention identifier demonstrated by the converter.',
    },
    {
      key: 'tool.caseConverter.pascalCase',
      value: 'PascalCase',
      reason:
        'PascalCase is the literal naming-convention identifier demonstrated by the converter.',
    },
    {
      key: 'tool.caseConverter.snakeCase',
      value: 'snake_case',
      reason:
        'snake_case is the literal naming-convention identifier demonstrated by the converter.',
    },
    {
      key: 'tool.cidr.semantics',
      value: 'Interpretation',
      reason: 'Interpretation is the correct German noun for the address-range interpretation.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason: 'HEX is the hexadecimal color-format abbreviation.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason:
        'HSL is the canonical color-space abbreviation; channel labels remain tied to its CSS syntax.',
    },
    {
      key: 'tool.colorConverter.hue',
      value: 'H (0-360)',
      reason: 'H is the canonical HSL hue-channel symbol and 0–360 is its numeric range.',
    },
    {
      key: 'tool.colorConverter.lightness',
      value: 'L (0-100%)',
      reason: 'L is the canonical HSL lightness-channel symbol and 0–100% is its numeric range.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason: 'RGB is the red/green/blue color-space abbreviation used in German.',
    },
    {
      key: 'tool.colorConverter.saturation',
      value: 'S (0-100%)',
      reason: 'S is the canonical HSL saturation-channel symbol and 0–100% is its numeric range.',
    },
    {
      key: 'tool.cronParser.minute',
      value: 'Minute',
      reason: 'Minute is the correct German singular unit of time.',
    },
    {
      key: 'tool.cronParser.minuteLabel',
      value: 'Minute',
      reason: 'Minute is the correct German singular label for the cron minute field.',
    },
    {
      key: 'tool.csp.severity.info',
      value: 'Info',
      reason: 'Info is a natural German abbreviation of Information for an informational finding.',
    },
    {
      key: 'tool.cssMinifier.original',
      value: 'Original',
      reason: 'Original is the correct German noun for the original CSS input.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason: 'Fetch names the JavaScript Fetch API used by the generated snippet.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason: 'Docker Compose product name and the docker-compose.yml filename must stay literal.',
    },
    {
      key: 'tool.gradient.position',
      value: 'Position',
      reason: 'Position is the correct German noun for a color-stop position.',
    },
    {
      key: 'tool.jsMinifier.original',
      value: 'Original',
      reason: 'Original is the correct German noun for the original JavaScript input.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason: 'JSONPath is the query-language name and cannot be translated.',
    },
    {
      key: 'tool.jsonValidator.arrays',
      value: 'Arrays:',
      reason:
        'Array and its plural Arrays are standard German programming terms for JSON array values.',
    },
    {
      key: 'tool.jwtDecoder.header',
      value: 'Header',
      reason:
        'Header names the JWT header component, using the established term from the token structure.',
    },
    {
      key: 'tool.jwtDecoder.payload',
      value: 'Payload',
      reason:
        'Payload names the JWT payload component and is the standard technical term used in German JWT documentation.',
    },
    {
      key: 'tool.metaTags.appleTouchIcon',
      value: 'Apple Touch Icon',
      reason: 'Apple Touch Icon is the platform-defined icon name.',
    },
    {
      key: 'tool.metaTags.favicon',
      value: 'Favicon',
      reason: 'Favicon is the established German web term for the website icon.',
    },
    {
      key: 'tool.metaTags.robots',
      value: 'Robots',
      reason: 'Robots identifies the robots metadata field consumed by search crawlers.',
    },
    {
      key: 'tool.metaTags.schemaArticle',
      value: 'Article',
      reason: 'Article is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaBlogPosting',
      value: 'BlogPosting',
      reason: 'BlogPosting is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaLocalBusiness',
      value: 'LocalBusiness',
      reason: 'LocalBusiness is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaOrganization',
      value: 'Organization',
      reason: 'Organization is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaPerson',
      value: 'Person',
      reason: 'Person is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaProduct',
      value: 'Product',
      reason: 'Product is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaWebPage',
      value: 'WebPage',
      reason: 'WebPage is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.metaTags.schemaWebSite',
      value: 'WebSite',
      reason: 'WebSite is the exact Schema.org type identifier emitted in structured data.',
    },
    {
      key: 'tool.openapi.format',
      value: 'Format',
      reason: 'Format is the correct German noun for the document format.',
    },
    {
      key: 'tool.openapi.tags',
      value: 'Tags',
      reason: 'Tags is the established German programming term for OpenAPI operation tags.',
    },
    {
      key: 'tool.regexTester.dotall',
      value: 'Dotall',
      reason:
        'Dotall names the ECMAScript dotAll mode (s flag), whose technical identifier is preserved.',
    },
    {
      key: 'tool.regexTester.flags',
      value: 'Flags',
      reason:
        'Flags is the established German programming term for RegExp mode flags; their descriptions are localized.',
    },
    {
      key: 'tool.regexTester.global',
      value: 'Global',
      reason: 'Global is the correct German adjective used as a label for the global g flag.',
    },
    {
      key: 'tool.regexTester.index',
      value: 'Index',
      reason: 'Index is the correct German noun for a match position in a sequence.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason: 'IPv4 is the invariant versioned Internet Protocol identifier.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason: 'URL is the invariant abbreviation for Uniform Resource Locator.',
    },
    {
      key: 'tool.svg.original',
      value: 'Original',
      reason:
        'Original is the correct German label for the unmodified source as well as the English label.',
    },
    {
      key: 'tool.uuidGenerator.version',
      value: 'Version',
      reason: 'Version is the correct German noun for a UUID version.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason: 'Axios is a library name.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason: 'ComponentName is a literal generated React component identifier example.',
    },
    {
      key: 'uiText.005ef20f',
      value: 'Status',
      reason: 'Status is the correct German noun too.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason: 'JSON Schema Draft-07 is the standard name.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason: 'invalid-signature is a literal diagnostic code identifier.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason: 'vCard is the contact-data format name.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason: 'HEX is the numeric-base identifier.',
    },
    {
      key: 'uiText.04923a4f',
      value: 'No Content',
      reason: 'Canonical HTTP 204 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.07468f1d',
      value: 'Ether (ETH)',
      reason: 'Ether (ETH) is a cryptocurrency unit and symbol.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason: 'Literal conversion direction format identifiers.',
    },
    {
      key: 'uiText.09de135b',
      value: 'Created',
      reason: 'Canonical HTTP 201 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason: 'unsupported-algorithm is a literal diagnostic code identifier.',
    },
    {
      key: 'uiText.0ad960ec',
      value: 'Prompt V1',
      reason:
        'Prompt V1 is a versioned prompt identifier; Prompt is established German terminology.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason: 'Google Workspace is a product name; preserve opening fragment punctuation.',
    },
    {
      key: 'uiText.0bbc2f99',
      value: 'Bits',
      reason: 'Bits is the correct German technical plural too.',
    },
    {
      key: 'uiText.0c00887b',
      value: 'JSON POST',
      reason: 'JSON POST is a format plus HTTP method identifier.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason: 'Literal key=value request-body syntax.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason: 'Microsoft 365 is a product name; preserve opening fragment punctuation.',
    },
    {
      key: 'uiText.0dd965a5',
      value: 'Prompt V2',
      reason:
        'Prompt V2 is a versioned prompt identifier; Prompt is established German terminology.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason: 'rgb( is a literal CSS color-function fragment.',
    },
    {
      key: 'uiText.0e52a034',
      value: 'Unsupported Media Type',
      reason: 'Canonical HTTP 415 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.0ec24245',
      value: 'Details',
      reason: 'Details is the correct German plural noun too.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason: 'Literal Twitter card enumeration value.',
    },
    {
      key: 'uiText.10af57dd',
      value: 'PHP Guzzle HTTP Client',
      reason: 'PHP Guzzle HTTP Client is the library/client name.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason: 'Literal CSS background-image syntax.',
    },
    {
      key: 'uiText.11e991fd',
      value: 'Devs',
      reason: 'Devs is the first part of the DevsTools wordmark.',
    },
    {
      key: 'uiText.128fef66',
      value: 'Top-K:',
      reason: 'Top-K is the model sampling parameter name.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason: 'Literal CSV header/data example.',
    },
    {
      key: 'uiText.149cac09',
      value: 'Patch:',
      reason:
        'Patch is the canonical SemVer version-component name, kept to match the version syntax.',
    },
    {
      key: 'uiText.14abc909',
      value: 'Top-P:',
      reason: 'Top-P is the model sampling parameter name.',
    },
    {
      key: 'uiText.14ba3f63',
      value: 'KB)',
      reason: 'KB is the unchanged unit abbreviation with the required closing punctuation.',
    },
    {
      key: 'uiText.1703d29b',
      value: 'Viewport:',
      reason: 'Viewport is the established German technical term for the visible browser area.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason: 'Literal og:type enumeration value.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason: 'Literal JSON Schema type name.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason: 'Literal SQL UPDATE/WHERE template syntax.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason: 'Literal JSON Schema type name.',
    },
    {
      key: 'uiText.1c07301e',
      value: 'npm (Standard)',
      reason:
        'npm is the package-manager name, and Standard is a correctly spelled German cognate for the default preset.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason: 'Mastercard is a card network brand name.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason: 'invalid-token is a literal diagnostic code identifier.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason: 'Bcrypt hash sample must remain unchanged.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason: 'Literal Twitter card enumeration value.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason: 'Modelfile is the Ollama configuration filename.',
    },
    {
      key: 'uiText.21f867fc',
      value: 'Ruby Faraday HTTP Client',
      reason: 'Ruby Faraday HTTP Client is the library/client name.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason: 'Content-Type is a literal HTTP header name.',
    },
    {
      key: 'uiText.24451742',
      value: 'GeoJSON FeatureCollection',
      reason: 'GeoJSON FeatureCollection is a literal format/type name.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason: 'Open Graph is the protocol name.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason: 'Encoded Base64 output example must remain literal.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason: 'HMAC SHA-256 is the algorithm name.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason: 'Literal CSS mask-image syntax.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason: 'HMAC SHA-384 is the algorithm name.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason: 'Go (net/http) is a language/library target identifier.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason: 'HMAC-SHA512 (HS512) is the algorithm name and JWT identifier.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason: 'HTML copyright entity must remain literal.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason: 'HMAC-SHA256 (HS256) is the algorithm name and JWT identifier.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason: 'Literal Twitter card enumeration value.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason: 'LinkedIn is a product name.',
    },
    {
      key: 'uiText.302af18f',
      value: 'Host',
      reason: 'Host is the established German network term.',
    },
    {
      key: 'uiText.30d46e66',
      value: 'Gateway Timeout',
      reason: 'Canonical HTTP 504 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.311dba6c',
      value: 'Suffix',
      reason: 'Suffix is the correct German noun too.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason: 'Literal .env example with executable variable syntax.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason: 'px is the pixel unit; preserve the closing punctuation.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason: 'HMAC-SHA384 (HS384) is the algorithm name and JWT identifier.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason: 'Canonical HTTP status code and reason phrase.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason: 'Python (Pydantic v2) is a language/library target identifier.',
    },
    {
      key: 'uiText.34c199e6',
      value: 'Processing',
      reason: 'Canonical HTTP 102 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason: 'admin is a literal synthetic username sample.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason: 'Literal SQL SELECT query example.',
    },
    {
      key: 'uiText.352e0000',
      value: 'CTR',
      reason: 'CTR is the standard click-through-rate metric identifier.',
    },
    {
      key: 'uiText.37ac52a4',
      value: 'Bytes',
      reason: 'Bytes is the established German technical plural for byte units.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason: 'TLS 1.3 (1-RTT) is the protocol/version/round-trip identifier.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason: 'JavaScript (Axios) is a language/library target identifier.',
    },
    {
      key: 'uiText.3a8111d3',
      value: 'Radius',
      reason: 'Radius is the correct German geometry noun too.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason: 'Literal documentation IPv6 address example.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason: 'Python, FastAPI and Flask are language/framework names.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason: 'CPU is the processor identifier.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason: 'Literal cURL command example must remain executable.',
    },
    {
      key: 'uiText.3dcfa50f',
      value: 'Permanent Redirect',
      reason: 'Canonical HTTP 308 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason: 'Literal OpenAPI YAML document example; identifiers must remain usable.',
    },
    {
      key: 'uiText.3e142d5e',
      value: 'Text',
      reason: 'Text is the correct German noun too.',
    },
    {
      key: 'uiText.3e94ca78',
      value: 'Original:',
      reason: 'Original is the correct German noun too.',
    },
    {
      key: 'uiText.3ea53a3f',
      value: 'November',
      reason: 'November is the correct German month name too.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason: 'TTL is the protocol time-to-live identifier.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason: 'OnCalendar is a literal systemd directive name.',
    },
    {
      key: 'uiText.3fc8264b',
      value: 'RFC 6902 JSON Patch',
      reason: 'RFC 6902 JSON Patch is the standard/format name.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason: 'Literal encoded JWT token sample.',
    },
    {
      key: 'uiText.41d09a60',
      value: 'Accepted',
      reason: 'Canonical HTTP 202 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.423c56a1',
      value: 'Salt',
      reason: 'Salt is the established German cryptography term.',
    },
    {
      key: 'uiText.42ff3e73',
      value: 'Tokens',
      reason: 'Tokens is the established German technical plural for language-model token units.',
    },
    {
      key: 'uiText.4318d56c',
      value: 'Payload Too Large',
      reason: 'Canonical HTTP 413 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason: 'Literal SQL table-name example.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason: 'VW is the literal CSS unit with the reference viewport value.',
    },
    {
      key: 'uiText.45e079f8',
      value: 'John Doe',
      reason: "John Doe is a sample person's proper name.",
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason: 'Literal og:type enumeration value.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason: 'Canonical HTTP status code and reason phrase.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason: 'Visa is a card network brand name.',
    },
    {
      key: 'uiText.488ed1b2',
      value: 'See Other',
      reason: 'Canonical HTTP 303 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason: 'Twitter / X are product names.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason: 'Literal social handle syntax example.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason: 'Base64url is an encoding name.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason: 'BigQuery is a database product name.',
    },
    {
      key: 'uiText.4c5e6965',
      value: 'Method Not Allowed',
      reason: 'Canonical HTTP 405 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.4c956b5b',
      value: 'Elasticsearch Query DSL',
      reason: 'Elasticsearch Query DSL is the named query language.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason: 'DPI is the resolution unit with required fragment punctuation.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason: 'Literal social handle syntax example.',
    },
    {
      key: 'uiText.5083b4ec',
      value: 'Temporary Redirect',
      reason: 'Canonical HTTP 307 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason: 'CSS is the language identifier.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason: 'Microsoft SQL Server is a database product name.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason: 'Guzzle HTTP is a library name.',
    },
    {
      key: 'uiText.54ddc377',
      value: 'CSS border-radius',
      reason: 'CSS border-radius is the literal property identifier.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason: 'JPEG / JPG are file-format identifiers.',
    },
    {
      key: 'uiText.573a72ab',
      value: 'Ether',
      reason: 'Ether is a cryptocurrency unit name.',
    },
    {
      key: 'uiText.579f548e',
      value: 'Radial',
      reason: 'Radial is the correct German gradient-type adjective too.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason: 'SHA3-512 is the algorithm identifier.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason: 'TypeScript (TSX) is the language/format name.',
    },
    {
      key: 'uiText.596eb53a',
      value: 'Too Many Requests',
      reason: 'Canonical HTTP 429 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason: 'SHA-1 is the hash algorithm identifier with required fragment punctuation.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason: 'Meta / Cmd are literal modifier key names.',
    },
    {
      key: 'uiText.5be6d356',
      value: '| Code:',
      reason:
        'Code is the established German technical noun for the keyboard event code; leading pipe retained.',
    },
    {
      key: 'uiText.5ddb609c',
      value: 'August',
      reason: 'August is the correct German month name too.',
    },
    {
      key: 'uiText.5e152baa',
      value: 'SMS',
      reason: 'SMS is the communication protocol abbreviation.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason: 'Literal input/output format direction identifiers.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason: 'Literal docker run command example must stay executable.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason: 'NIST P-521 (secp521r1) is the curve identifier.',
    },
    {
      key: 'uiText.613f34ea',
      value: 'Hex',
      reason: 'Hex is the established German abbreviation for hexadecimal.',
    },
    {
      key: 'uiText.61afdcbf',
      value: 'OpenAI SDK',
      reason: 'OpenAI SDK is a product name.',
    },
    {
      key: 'uiText.63e652d1',
      value: 'Collection:',
      reason:
        'Collection is the established MongoDB technical term for the configured collection, retained with the label punctuation.',
    },
    {
      key: 'uiText.641dea8a',
      value: '25 IDs',
      reason: 'IDs is the German and English plural identifier abbreviation in this count.',
    },
    {
      key: 'uiText.657ebd8d',
      value: 'SQL CREATE TABLE DDL',
      reason: 'SQL CREATE TABLE DDL is the SQL syntax/format identifier.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason: 'Literal JSON Schema type name.',
    },
    {
      key: 'uiText.6680714f',
      value: 'Tools)',
      reason:
        'Tools is an established German plural loanword here; closing count punctuation is preserved.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason: 'Literal CSP source-list example; keep protocol syntax unchanged.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason: 'requests is a Python library identifier.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason: 'Wei is a cryptocurrency unit name.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason: 'Literal conversion direction format identifiers.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason: 'CustomInterfaceName is a literal TypeScript interface-name example.',
    },
    {
      key: 'uiText.690f8193',
      value: 'Unauthorized',
      reason: 'Canonical HTTP 401 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason: 'application/json is a literal MIME type.',
    },
    {
      key: 'uiText.6d2f0ca8',
      value: 'Major:',
      reason:
        'Major is the canonical SemVer version-component name, kept to match the version syntax.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason: 'Stripe is a product name.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason: 'Literal SQL INSERT INTO syntax.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason: 'Literal GraphQL type definition example.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason: 'Trino / Presto are query-engine product names.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason: 'URL is the standard protocol-neutral identifier.',
    },
    {
      key: 'uiText.758e86ff',
      value: 'US Letter',
      reason: 'US Letter is the canonical paper-format name.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason: 'Aspect ratio plus SD/iPad format and product identifiers.',
    },
    {
      key: 'uiText.77d3e0ef',
      value: 'Conflict',
      reason: 'Canonical HTTP 409 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.77dacbe1',
      value: 'Request Timeout',
      reason: 'Canonical HTTP 408 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.795db914',
      value: 'Code',
      reason: 'Code is the established German technical noun for a status code too.',
    },
    {
      key: 'uiText.7a8c729a',
      value: '5 IDs',
      reason: 'IDs is the German and English plural identifier abbreviation in this count.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason: 'MySQL dialect with literal backtick identifier syntax.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason: 'OCT is the numeric-base identifier.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason: 'Alt is a literal keyboard key name.',
    },
    {
      key: 'uiText.8164941e',
      value: 'Text → Morse',
      reason: 'Text and Morse are valid German terms in this conversion direction label.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason: 'Python (Requests) is a language/library target identifier.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason: 'RSA is the algorithm name.',
    },
    {
      key: 'uiText.869d97b8',
      value: 'Postman Collection v2.1',
      reason: 'Postman Collection v2.1 is the export format name.',
    },
    {
      key: 'uiText.8802957e',
      value: 'Service Unavailable',
      reason: 'Canonical HTTP 503 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason: 'CVV is the card verification code identifier.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason: 'Aspect ratio plus HD/4K format identifiers.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason: 'Literal JSON Schema type name.',
    },
    {
      key: 'uiText.8c53d02f',
      value: 'Partial Content',
      reason: 'Canonical HTTP 206 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.8df5852f',
      value: 'Browser',
      reason: 'Browser is the established German product-category noun.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason: 'Literal JSONPath query example.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason: 'Slack is a product name.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason: 'Literal comma-separated source-field example.',
    },
    {
      key: 'uiText.922b89ee',
      value: 'C# (Records)',
      reason: 'C# (Records) is a language/type target identifier.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason: 'Literal Twitter card enumeration value.',
    },
    {
      key: 'uiText.94d68dda',
      value: 'Not Found',
      reason: 'Canonical HTTP 404 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.950196fc',
      value: 'Tools',
      reason:
        'Tools is the second part of the DevsTools wordmark and an established German loanword.',
    },
    {
      key: 'uiText.958ab7b9',
      value: 'Bad Request',
      reason: 'Canonical HTTP 400 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason: 'missing-algorithm is a literal diagnostic code identifier.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason: 'Literal robots meta directive values.',
    },
    {
      key: 'uiText.98dbac97',
      value: 'April',
      reason: 'April is the correct German month name too.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason: 'PHP Apache is a language/server stack name.',
    },
    {
      key: 'uiText.9ac70a05',
      value: 'Pos.',
      reason: 'Pos. abbreviates Position in both German and English.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason: 'TLS 1.2 (2-RTT) is the protocol/version/round-trip identifier.',
    },
    {
      key: 'uiText.9dcf6762',
      value: 'Android Vector Drawable XML',
      reason: 'Android Vector Drawable XML is the native resource-format name.',
    },
    {
      key: 'uiText.9e7ffeee',
      value: 'Not Implemented',
      reason: 'Canonical HTTP 501 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason: 'event.key is a literal JavaScript API property identifier.',
    },
    {
      key: 'uiText.9f8ef6ce',
      value: 'Gone',
      reason: 'Canonical HTTP 410 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason: 'HTML is the language identifier.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason: 'event.code is a literal JavaScript API property identifier.',
    },
    {
      key: 'uiText.a4c76df5',
      value: 'Internal Server Error',
      reason: 'Canonical HTTP 500 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason: 'DEC is the numeric-base identifier.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason: 'Rust (reqwest) is a language/library target identifier.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason: 'font-size is a literal CSS property name.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason:
        'Visa, MasterCard, American Express, Discover and Diners Club are card-network brand names.',
    },
    {
      key: 'uiText.a6fb1028',
      value: 'Developer Tools.',
      reason: 'Developer Tools is the product name.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason: 'Literal SQL CREATE TABLE syntax.',
    },
    {
      key: 'uiText.a9a831b2',
      value: 'Forbidden',
      reason: 'Canonical HTTP 403 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason: 'Terraform HCL is the product/configuration-language name.',
    },
    {
      key: 'uiText.ab43d664',
      value: 'Continue',
      reason: 'Canonical HTTP 100 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.ab74cbeb',
      value: 'Hex → Base64',
      reason: 'Literal format direction identifiers.',
    },
    {
      key: 'uiText.ac368625',
      value: 'Impr.',
      reason: 'Impr. abbreviates German Impressionen and English Impressions.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason: 'Facebook is a product name.',
    },
    {
      key: 'uiText.ac3e1086',
      value: 'Bad Gateway',
      reason: 'Canonical HTTP 502 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason: 'TSV is the file-format abbreviation with required fragment punctuation.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason: 'PNG is a file-format identifier.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason: 'NIST P-256 (secp256r1) is the curve identifier.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason: 'Literal robots meta directive values.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason: 'forwardRef is the literal React API function identifier.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason: 'JSON Schema is the specification name.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason: 'SQL Server (T-SQL) is a database product and dialect name.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason: 'User-agent is a literal robots.txt directive name.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason: 'Rust (Cargo) is a language/tool name.',
    },
    {
      key: 'uiText.b5e06b19',
      value: 'Base64 → Hex',
      reason: 'Literal format direction identifiers.',
    },
    {
      key: 'uiText.b61e45f1',
      value: 'Ellipse',
      reason: 'Ellipse is the correct German geometry noun too.',
    },
    {
      key: 'uiText.b61ece53',
      value: 'GitHub Markdown',
      reason: 'GitHub Markdown is the format name.',
    },
    {
      key: 'uiText.b8066377',
      value: 'Version:',
      reason: 'Version is the correct German noun as well as the English noun.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason: 'HMAC SHA-512 is the algorithm name.',
    },
    {
      key: 'uiText.ba87359c',
      value: 'Minor:',
      reason:
        'Minor is the canonical SemVer version-component name, kept to match the version syntax.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason: 'Oracle PL/SQL is a database product/dialect name.',
    },
    {
      key: 'uiText.bb9c8bee',
      value: 'Spread',
      reason: 'Spread is the established German JavaScript operator term.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason: 'Literal CSV header example; field names must remain usable.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason: 'BIN is the numeric-base identifier.',
    },
    {
      key: 'uiText.bf29ebda',
      value: 'Switching Protocols',
      reason: 'Canonical HTTP 101 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason: 'Literal og:type enumeration value.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason: 'event.which is a literal JavaScript API property identifier.',
    },
    {
      key: 'uiText.c212b600',
      value: 'September',
      reason: 'September is the correct German month name too.',
    },
    {
      key: 'uiText.c301a35e',
      value: 'IANA MIME Content-Type',
      reason: 'IANA MIME Content-Type is the standard registry/header identifier.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason: 'Literal robots meta directive values.',
    },
    {
      key: 'uiText.c4b74105',
      value: 'Not Modified',
      reason: 'Canonical HTTP 304 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.c4cf9f2a',
      value: 'Postman Collection v2.1 JSON',
      reason: 'Postman Collection v2.1 JSON is the named export format.',
    },
    {
      key: 'uiText.c60cd0db',
      value: '4x (Ultra HD 4K)',
      reason:
        '4x is the scale factor and Ultra HD 4K is the resolution standard name; both are invariant technical labels.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason: 'Literal conversion direction format identifiers.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason: 'Amex is a card network brand name.',
    },
    {
      key: 'uiText.c91c1837',
      value: 'Common Name:',
      reason:
        'Common Name is the registered X.509 distinguished-name field (CN), retained as a certificate identifier.',
    },
    {
      key: 'uiText.c98f4557',
      value: 'min',
      reason: 'min is the standard minute unit abbreviation in German and English.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason: 'IconComponent is a literal generated component identifier example.',
    },
    {
      key: 'uiText.ca77496f',
      value: 'Status:',
      reason: 'Status is the correct German noun too.',
    },
    {
      key: 'uiText.ca7e49cc',
      value: '9:16 (Story / Reel)',
      reason:
        'The aspect ratio is a numeric identifier; Story and Reel are the social-platform feature names used in German.',
    },
    {
      key: 'uiText.cba1de58',
      value: 'Format:',
      reason: 'Format is the correct German noun too.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason: 'Drizzle ORM (TypeScript) is the framework/language name.',
    },
    {
      key: 'uiText.ce2e7ed7',
      value: 'Anthropic Claude SDK',
      reason: 'Anthropic Claude SDK is a product name.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason: 'Literal SQL INSERT statement example.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason: 'SendGrid is a product name; preserve opening fragment punctuation.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason: 'Literal percent-encoded URL sample strings.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason: 'Quoted-Printable is the MIME transfer encoding name.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason: 'JavaScript (Fetch) is a language/API target identifier.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason: 'SHA3-256 is the algorithm identifier.',
    },
    {
      key: 'uiText.d65cf33e',
      value: 'Unprocessable Content',
      reason: 'Canonical HTTP 422 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.d6d1250e',
      value: 'Morse → Text',
      reason: 'Text and Morse are valid German terms in this conversion direction label.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason: 'NIST P-384 (secp384r1) is the curve identifier.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason: 'Twitter is the service/product name.',
    },
    {
      key: 'uiText.db61155b',
      value: 'Engine',
      reason: 'Engine is the established German browser-engine technical term.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason: 'VH is the literal CSS unit with the reference viewport value.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason: 'JSON Pointer is the RFC-defined format name.',
    },
    {
      key: 'uiText.df08898a',
      value: '50 IDs',
      reason: 'IDs is the German and English plural identifier abbreviation in this count.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason: 'Snowflake is a database product name.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason: 'missing-secret is a literal diagnostic code identifier.',
    },
    {
      key: 'uiText.e2c53cc6',
      value: 'Port',
      reason: 'Port is the established German network term.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason: 'Googlebot is a crawler product name.',
    },
    {
      key: 'uiText.e5a522d3',
      value: 'Fetch API',
      reason: 'Fetch API is a literal API name.',
    },
    {
      key: 'uiText.e63efb57',
      value: '\\`\\`\\`language',
      reason: 'Literal escaped Markdown fenced-code syntax demonstration.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason: 'UUID v4 is the standard/version identifier.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason: 'Literal conversion direction format identifiers.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason: 'Canonical HTTP status code and reason phrase.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason: 'Literal robots meta directive values.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason: 'SQL Server / T-SQL is a database product/dialect name.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason: 'Go (Golang) is a programming-language name.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason: 'UUID v7 is the standard/version identifier.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason: 'ESC names the literal keyboard key.',
    },
    {
      key: 'uiText.ead5b096',
      value: '10 IDs',
      reason: 'IDs is the German and English plural identifier abbreviation in this count.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason: 'event.location is a literal JavaScript API property identifier.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason: 'Pure interpolation template must preserve variable names and punctuation.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason: 'PostgreSQL dialect with literal quoted identifier syntax.',
    },
    {
      key: 'uiText.f155628f',
      value: 'Satoshis',
      reason: 'Satoshis is a cryptocurrency unit name.',
    },
    {
      key: 'uiText.f2040479',
      value: '1 ID',
      reason: 'ID is the German and English identifier abbreviation in this count.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason: 'ECDSA is the algorithm name.',
    },
    {
      key: 'uiText.f4d00413',
      value: 'Bitcoin (BTC)',
      reason: 'Bitcoin (BTC) is a cryptocurrency name and symbol.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason: 'Node.js, Express and Next are product/framework names.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason: 'Markdown is a markup-language name.',
    },
    {
      key: 'uiText.f86774fd',
      value: 'Moved Permanently',
      reason: 'Canonical HTTP 301 reason phrase; the adjacent explanation is translated.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason: 'RootType is the literal generated root type identifier example.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason: 'Gwei is a cryptocurrency unit name.',
    },
    {
      key: 'uiText.fccc59e0',
      value: 'Linear',
      reason: 'Linear is the correct German gradient-type adjective too.',
    },
    {
      key: 'uiText.fccd00cd',
      value: 'Satoshis (Sats)',
      reason: 'Satoshis (Sats) is a cryptocurrency unit name and abbreviation.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason: 'Literal og:type enumeration value.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason: 'PHP (cURL) is a language/library target identifier.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason: 'Canonical HTTP status code and reason phrase.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason: 'SHA1 algorithm identifier must stay literal.',
    },
  ],
  es: [
    {
      key: 'common.bytes',
      value: 'bytes',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'common.error',
      value: 'Error',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'home.popularBadge',
      value: 'Popular',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'privacy.cookies',
      value: 'Cookies',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'tool.binaryEncoder.bits7',
      value: '7 bits (ASCII)',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'tool.binaryEncoder.bits8',
      value: '8 bits',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'tool.caseConverter.camelCase',
      value: 'camelCase',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'tool.caseConverter.constantCase',
      value: 'CONSTANT_CASE',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'tool.caseConverter.kebabCase',
      value: 'kebab-case',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'tool.caseConverter.pascalCase',
      value: 'PascalCase',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'tool.caseConverter.snakeCase',
      value: 'snake_case',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'tool.certificate.no',
      value: 'No',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.colorConverter.hue',
      value: 'H (0-360)',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.colorConverter.lightness',
      value: 'L (0-100%)',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.colorConverter.saturation',
      value: 'S (0-100%)',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'tool.cssMinifier.original',
      value: 'Original',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.hexEncoder.hexadecimal',
      value: 'Hexadecimal',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.ipv6.prefixBits',
      value: '{count} bits',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'tool.jsMinifier.original',
      value: 'Original',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.metaTags.favicon',
      value: 'Favicon',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'tool.metaTags.robots',
      value: 'Robots',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.numberBaseConverter.decimal',
      value: 'Decimal (10)',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.numberBaseConverter.hexadecimal',
      value: 'Hexadecimal (16)',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.numberBaseConverter.octal',
      value: 'Octal (8)',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.regexTester.dotall',
      value: 'Dotall',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.regexTester.global',
      value: 'Global',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'tool.svg.original',
      value: 'Original',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason:
        'Diagnostic status identifier; the separate natural-language diagnostic explanation is translated.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'uiText.07468f1d',
      value: 'Ether (ETH)',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason:
        'Conversion direction between standard format identifiers; there is no natural-language prose to translate.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason:
        'Diagnostic status identifier; the separate natural-language diagnostic explanation is translated.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.0bbc2f99',
      value: 'Bits',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.0c00887b',
      value: 'JSON POST',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.11e991fd',
      value: 'Devs',
      reason: 'Product/brand name in the site identity or copyright line; preserve branding.',
    },
    {
      key: 'uiText.128fef66',
      value: 'Top-K:',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.14abc909',
      value: 'Top-P:',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.14ba3f63',
      value: 'KB)',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason:
        'Literal JSON Schema/type-system type name rather than prose; preserve the machine-readable token.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.1a169df7',
      value: 'my-cool-blog-post_name',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.1afbc1d8',
      value: 'Ctrl+↵',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason:
        'Literal JSON Schema/type-system type name rather than prose; preserve the machine-readable token.',
    },
    {
      key: 'uiText.1c039058',
      value: '⌘K / Ctrl+K',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason:
        'Diagnostic status identifier; the separate natural-language diagnostic explanation is translated.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.21918751',
      value: 'error',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason: 'Literal HTML character reference for the copyright symbol.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.302af18f',
      value: 'Host',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason: 'Canonical HTTP status code and reason phrase shown as a protocol example.',
    },
    {
      key: 'uiText.32edd391',
      value: 'Error:',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.352e0000',
      value: 'CTR',
      reason: 'Standard analytics acronym for click-through rate, also used in Spanish.',
    },
    {
      key: 'uiText.37ac52a4',
      value: 'Bytes',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason:
        'Literal CSS property or OpenAPI/YAML example input; preserve machine-readable tokens, field names, and example data.',
    },
    {
      key: 'uiText.3e94ca78',
      value: 'Original:',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.41e68bba',
      value: 'NO',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.42ff3e73',
      value: 'Tokens',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.4498655e',
      value: '800px (HD)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.45e079f8',
      value: 'John Doe',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason: 'Canonical HTTP status code and reason phrase shown as a protocol example.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.573a72ab',
      value: 'Ether',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.579f548e',
      value: 'Radial',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.5cbba566',
      value: 'Color:',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.5e152baa',
      value: 'SMS',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason:
        'Conversion direction between standard format identifiers; there is no natural-language prose to translate.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason:
        'Literal JSON Schema/type-system type name rather than prose; preserve the machine-readable token.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason:
        'Conversion direction between standard format identifiers; there is no natural-language prose to translate.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.76210de0',
      value: 'Google SERP',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.7b012f6f',
      value: 'Selector A',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.7c013102',
      value: 'Selector B',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.7d714bfe',
      value: 'bits):',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.8644f384',
      value: 'Ctrl',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.87a46248',
      value: 'WiFi',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason:
        'Literal JSON Schema/type-system type name rather than prose; preserve the machine-readable token.',
    },
    {
      key: 'uiText.8a88b9c4',
      value: 'bits ·',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.938e4b6c',
      value: 'Vector B',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.950196fc',
      value: 'Tools',
      reason: 'Product/brand name in the site identity or copyright line; preserve branding.',
    },
    {
      key: 'uiText.950b9720',
      value: 'Hexadecimal',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason:
        'Diagnostic status identifier; the separate natural-language diagnostic explanation is translated.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.968e5025',
      value: 'Vector A',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.9ac70a05',
      value: 'Pos.',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'uiText.a5aaf4ec',
      value: 'Decimal',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason:
        'Literal CSS property or OpenAPI/YAML example input; preserve machine-readable tokens, field names, and example data.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.a6fb1028',
      value: 'Developer Tools.',
      reason: 'Product/brand name in the site identity or copyright line; preserve branding.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.ac368625',
      value: 'Impr.',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.afde1947',
      value: 'Variables (JSON)',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.ba647e0f',
      value: 'your-slug-here',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason:
        'Standard color channel or number-base acronym and numeric range; preserve the technical channel/base labels.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.c60cd0db',
      value: '4x (Ultra HD 4K)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason:
        'Conversion direction between standard format identifiers; there is no natural-language prose to translate.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.c98f4557',
      value: 'min',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.d03c439c',
      value: 'Octal',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.dbe490b0',
      value: '| Col 1 | Col 2 |...',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.de6e4cf8',
      value: '\\| Col 1 \\| Col 2 \\|',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason:
        'Diagnostic status identifier; the separate natural-language diagnostic explanation is translated.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.e5b43cf8',
      value: 'Color',
      reason:
        'Correct Spanish spelling is identical to English; this is a Spanish word or abbreviation, with the same technical notation.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason:
        'Conversion direction between standard format identifiers; there is no natural-language prose to translate.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason: 'Canonical HTTP status code and reason phrase shown as a protocol example.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason:
        'Programming naming convention or literal API member identifier; preserve exact casing and punctuation.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason:
        'Generic display structure with two named runtime placeholders and a colon; contains no natural-language text.',
    },
    {
      key: 'uiText.f0907af0',
      value: 'bits)',
      reason:
        'Established Spanish computing term or unit symbol; preserve the unit, technical meaning, punctuation, and any interpolation.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.f155628f',
      value: 'Satoshis',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.f2040479',
      value: '1 ID',
      reason:
        'Aspect-ratio, display-resolution, CSS viewport, or identifier notation containing only numbers, unit/acronym symbols, and product names.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
    {
      key: 'uiText.f4d00413',
      value: 'Bitcoin (BTC)',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason:
        'Official format/protocol/API name, filename, directive, flag, or standardized acronym; translating it would obscure the technical identifier.',
    },
    {
      key: 'uiText.f9bd04e7',
      value: 'Shift',
      reason:
        'Keyboard key names or shortcut notation; preserve the physical key/shortcut identifiers.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason:
        'Literal code, query, identifier, encoded payload, or example input/output; preserve syntax, field names, and tested data values.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.fccd00cd',
      value: 'Satoshis (Sats)',
      reason:
        'Cryptocurrency name or denomination; preserve its official unit/currency identifier.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason:
        'Literal robots/Open Graph/Twitter metadata enumeration shown verbatim for developer reference; preserve the protocol token.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason:
        'Language, library, service, payment-network, database, crawler, or product proper name; retain official spelling and acronym.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason: 'Canonical HTTP status code and reason phrase shown as a protocol example.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason:
        'Cryptographic algorithm, curve, or standard identifier; preserve its official spelling and parameters.',
    },
  ],
  fr: [
    {
      key: 'ads.fallback.cta',
      value: 'Contact',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'common.mode',
      value: 'Mode',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'common.options',
      value: 'Options',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'contact.message',
      value: 'Message',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'contact.subjectQuestion',
      value: 'Question',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'footer.contact',
      value: 'Contact',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'privacy.cookies',
      value: 'Cookies',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.binaryEncoder.bits7',
      value: '7 bits (ASCII)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.binaryEncoder.bits8',
      value: '8 bits',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.caseConverter.camelCase',
      value: 'camelCase',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.caseConverter.constantCase',
      value: 'CONSTANT_CASE',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.caseConverter.kebabCase',
      value: 'kebab-case',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.caseConverter.pascalCase',
      value: 'PascalCase',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.caseConverter.snakeCase',
      value: 'snake_case',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.certificate.extensions',
      value: 'Extensions',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.colorConverter.hue',
      value: 'H (0-360)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.colorConverter.lightness',
      value: 'L (0-100%)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.colorConverter.saturation',
      value: 'S (0-100%)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.cronParser.minute',
      value: 'Minute',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.cronParser.minuteLabel',
      value: 'Minute',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.csp.directive',
      value: 'Directive',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.cssMinifier.original',
      value: 'Original',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.gradient.angle',
      value: 'Angle',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.gradient.position',
      value: 'Position',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.imageBase64.dimensions',
      value: 'Dimensions',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.imageBase64.fileType',
      value: 'Type',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.ipv6.prefixBits',
      value: '{count} bits',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.jsMinifier.original',
      value: 'Original',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.jwtDecoder.expiration',
      value: 'Expiration',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.jwtDecoder.expirationLabel',
      value: 'Expiration (exp)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.jwtDecoder.signature',
      value: 'Signature',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.loremIpsum.type',
      value: 'Type',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.metaTags.description',
      value: 'Description',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.metaTags.favicon',
      value: 'Favicon',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.metaTags.robots',
      value: 'Robots',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.metaTags.schemaArticle',
      value: 'Article',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.numberBaseConverter.octal',
      value: 'Octal (8)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.openapi.format',
      value: 'Format',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.regexTester.dotall',
      value: 'Dotall',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.regexTester.global',
      value: 'Global',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.regexTester.index',
      value: 'Index',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.regexTester.patternDate',
      value: 'Date',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'tool.svg.original',
      value: 'Original',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.textDiff.modifications',
      value: 'modifications',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'tool.uuidGenerator.version',
      value: 'Version',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.07468f1d',
      value: 'Ether (ETH)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0a77a91f',
      value: 'Action',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0bbc2f99',
      value: 'Bits',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.11e991fd',
      value: 'Devs',
      reason: 'Product brand text or proper-name example.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1a5ee459',
      value: 'Configuration',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.1afbc1d8',
      value: 'Ctrl+↵',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1c039058',
      value: '⌘K / Ctrl+K',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.24451742',
      value: 'GeoJSON FeatureCollection',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.29092ffa',
      value: 'Portrait',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason: 'Standard HTTP status code and protocol reason phrase.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.352e0000',
      value: 'CTR',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.36d9968e',
      value: 'Minutes',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.38e70f69',
      value: 'minute',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.4498655e',
      value: '800px (HD)',
      reason: 'Format ratio or resolution with established media labels.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.45e079f8',
      value: 'John Doe',
      reason: 'Product brand text or proper-name example.',
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason: 'Standard HTTP status code and protocol reason phrase.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.48b08181',
      value: 'Minutes (min)',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.5343e9d9',
      value: 'Points (PT)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.54ddc377',
      value: 'CSS border-radius',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.573a72ab',
      value: 'Ether',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.579f548e',
      value: 'Radial',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.590ca79a',
      value: 'Image',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.5e152baa',
      value: 'SMS',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason: 'Format ratio or resolution with established media labels.',
    },
    {
      key: 'uiText.795db914',
      value: 'Code',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.815dfa76',
      value: 'page',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.8644f384',
      value: 'Ctrl',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.87a46248',
      value: 'WiFi',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason: 'Literal Markdown syntax demonstration; sample payload is intentionally preserved.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.8a88b9c4',
      value: 'bits ·',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.91ed4af4',
      value: '3xx Redirection',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.922b89ee',
      value: 'C# (Records)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.950196fc',
      value: 'Tools',
      reason: 'Product brand text or proper-name example.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.9ac70a05',
      value: 'Pos.',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.9ae6a966',
      value: 'Collections',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.a6fb1028',
      value: 'Developer Tools.',
      reason: 'Product brand text or proper-name example.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.abf095df',
      value: 'pages',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.ac368625',
      value: 'Impr.',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.adbcc5ee',
      value: 'minutes',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.af21c4ce',
      value: 'Description (og:description)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.afde1947',
      value: 'Variables (JSON)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.b61e45f1',
      value: 'Ellipse',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c589311f',
      value: 'Quartile (25%)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c60cd0db',
      value: '4x (Ultra HD 4K)',
      reason: 'Format ratio or resolution with established media labels.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.c98f4557',
      value: 'min',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ca7e49cc',
      value: '9:16 (Story / Reel)',
      reason: 'Format ratio or resolution with established media labels.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d03c439c',
      value: 'Octal',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d3d96082',
      value: 'Distance',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.dbe490b0',
      value: '| Col 1 | Col 2 |...',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.de6e4cf8',
      value: '\\| Col 1 \\| Col 2 \\|',
      reason: 'Literal Markdown syntax demonstration; sample payload is intentionally preserved.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e2c53cc6',
      value: 'Port',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e5a522d3',
      value: 'Fetch API',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason: 'Standard HTTP status code and protocol reason phrase.',
    },
    {
      key: 'uiText.e83d9196',
      value: 'Page',
      reason: 'Correct French word with the same spelling as English.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason: 'Placeholder-only diagnostic separator; both placeholders are preserved.',
    },
    {
      key: 'uiText.f0907af0',
      value: 'bits)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f155628f',
      value: 'Satoshis',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f2040479',
      value: '1 ID',
      reason: 'Literal Markdown syntax demonstration; sample payload is intentionally preserved.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f4d00413',
      value: 'Bitcoin (BTC)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f7d0965f',
      value: 'Pixels (PX)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.f9bd04e7',
      value: 'Shift',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fccd00cd',
      value: 'Satoshis (Sats)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason: 'Standard HTTP status code and protocol reason phrase.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason:
        'Technical identifier, protocol/schema keyword, product/API name, code/data sample, keyboard shortcut, unit, or conventional abbreviation preserved exactly.',
    },
  ],
  ru: [
    {
      key: 'tool.caseConverter.camelCase',
      value: 'camelCase',
      reason:
        'Exact programming identifier casing convention; its capitalization and separators demonstrate the transformation.',
    },
    {
      key: 'tool.caseConverter.constantCase',
      value: 'CONSTANT_CASE',
      reason:
        'Exact programming identifier casing convention; its capitalization and separators demonstrate the transformation.',
    },
    {
      key: 'tool.caseConverter.kebabCase',
      value: 'kebab-case',
      reason:
        'Exact programming identifier casing convention; its capitalization and separators demonstrate the transformation.',
    },
    {
      key: 'tool.caseConverter.pascalCase',
      value: 'PascalCase',
      reason:
        'Exact programming identifier casing convention; its capitalization and separators demonstrate the transformation.',
    },
    {
      key: 'tool.caseConverter.snakeCase',
      value: 'snake_case',
      reason:
        'Exact programming identifier casing convention; its capitalization and separators demonstrate the transformation.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason: 'Standard color-notation acronym, used unchanged in Russian technical writing.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason: 'Standard color-notation acronym, used unchanged in Russian technical writing.',
    },
    {
      key: 'tool.colorConverter.hue',
      value: 'H (0-360)',
      reason:
        'HSL component symbol and its numeric range; H, S, and L identify the color-model channels.',
    },
    {
      key: 'tool.colorConverter.lightness',
      value: 'L (0-100%)',
      reason:
        'HSL component symbol and its numeric range; H, S, and L identify the color-model channels.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason: 'Standard color-notation acronym, used unchanged in Russian technical writing.',
    },
    {
      key: 'tool.colorConverter.saturation',
      value: 'S (0-100%)',
      reason:
        'HSL component symbol and its numeric range; H, S, and L identify the color-model channels.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason: 'Names the generated JavaScript Fetch API output.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason: 'Docker Compose product name and the emitted docker-compose.yml filename.',
    },
    {
      key: 'tool.imageBase64.dataUri',
      value: 'Data URI',
      reason:
        'Formal URL, IPv4, JSONPath, or data-URI representation name; retains the standard technical spelling.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason:
        'Formal URL, IPv4, JSONPath, or data-URI representation name; retains the standard technical spelling.',
    },
    {
      key: 'tool.metaTags.appleTouchIcon',
      value: 'Apple Touch Icon',
      reason:
        'Apple Touch Icon is the named Apple web-clip icon format; retains the platform term.',
    },
    {
      key: 'tool.metaTags.schemaArticle',
      value: 'Article',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaBlogPosting',
      value: 'BlogPosting',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaLocalBusiness',
      value: 'LocalBusiness',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaOrganization',
      value: 'Organization',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaPerson',
      value: 'Person',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaProduct',
      value: 'Product',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaWebPage',
      value: 'WebPage',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.metaTags.schemaWebSite',
      value: 'WebSite',
      reason:
        'Exact schema.org @type value emitted in JSON-LD; the identifier must retain its spelling and case.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason:
        'Formal URL, IPv4, JSONPath, or data-URI representation name; retains the standard technical spelling.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason:
        'Formal URL, IPv4, JSONPath, or data-URI representation name; retains the standard technical spelling.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason:
        'Exact diagnostic error code returned by the JWT implementation; natural-language explanations are translated separately.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.07468f1d',
      value: 'Ether (ETH)',
      reason:
        'Named cryptocurrency or denomination, with its official currency symbol where provided.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason:
        'Exact diagnostic error code returned by the JWT implementation; natural-language explanations are translated separately.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.0c00887b',
      value: 'JSON POST',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.11e991fd',
      value: 'Devs',
      reason:
        'Site identity: the copyright name Developer Tools and the two Devs / Tools logo fragments retain the brand spelling.',
    },
    {
      key: 'uiText.128fef66',
      value: 'Top-K:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.14abc909',
      value: 'Top-P:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason:
        'Exact JSON Schema primitive type name; the value identifies string, number, boolean, or array in the generated schema.',
    },
    {
      key: 'uiText.18eae73f',
      value: 'Swagger / OpenAPI JSON Schema',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.1a169df7',
      value: 'my-cool-blog-post_name',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.1afbc1d8',
      value: 'Ctrl+↵',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason:
        'Exact JSON Schema primitive type name; the value identifies string, number, boolean, or array in the generated schema.',
    },
    {
      key: 'uiText.1c039058',
      value: '⌘K / Ctrl+K',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason: 'Payment-network brand names, retained exactly.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason:
        'Exact diagnostic error code returned by the JWT implementation; natural-language explanations are translated separately.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.24451742',
      value: 'GeoJSON FeatureCollection',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason: 'Literal HTML copyright entity from the source, preserved exactly.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason: 'HTTP status code and standard English reason phrase in a literal protocol example.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.352e0000',
      value: 'CTR',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.3fc8264b',
      value: 'RFC 6902 JSON Patch',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.4498655e',
      value: '800px (HD)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason: 'HTTP status code and standard English reason phrase in a literal protocol example.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason: 'Payment-network brand names, retained exactly.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.4c956b5b',
      value: 'Elasticsearch Query DSL',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.54ddc377',
      value: 'CSS border-radius',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.573a72ab',
      value: 'Ether',
      reason:
        'Named cryptocurrency or denomination, with its official currency symbol where provided.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.5e152baa',
      value: 'SMS',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.61afdcbf',
      value: 'OpenAI SDK',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.657ebd8d',
      value: 'SQL CREATE TABLE DDL',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason:
        'Exact JSON Schema primitive type name; the value identifies string, number, boolean, or array in the generated schema.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason:
        'Named cryptocurrency or denomination, with its official currency symbol where provided.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason:
        'Database product name plus a quoted SQL column-identifier example, demonstrating the dialect-specific quoting syntax.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.844a87bf',
      value: 'Kubernetes Deployment YAML',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.8644f384',
      value: 'Ctrl',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.869d97b8',
      value: 'Postman Collection v2.1',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.87a46248',
      value: 'WiFi',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason:
        'Exact JSON Schema primitive type name; the value identifies string, number, boolean, or array in the generated schema.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.950196fc',
      value: 'Tools',
      reason:
        'Site identity: the copyright name Developer Tools and the two Devs / Tools logo fragments retain the brand spelling.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason:
        'Exact diagnostic error code returned by the JWT implementation; natural-language explanations are translated separately.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason:
        'Exact robots metadata directive values index/noindex and follow/nofollow, emitted unchanged.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.9dcf6762',
      value: 'Android Vector Drawable XML',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason: 'Payment-network brand names, retained exactly.',
    },
    {
      key: 'uiText.a6fb1028',
      value: 'Developer Tools.',
      reason:
        'Site identity: the copyright name Developer Tools and the two Devs / Tools logo fragments retain the brand spelling.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason:
        'Exact robots metadata directive values index/noindex and follow/nofollow, emitted unchanged.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.b61ece53',
      value: 'GitHub Markdown',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.c301a35e',
      value: 'IANA MIME Content-Type',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason:
        'Exact robots metadata directive values index/noindex and follow/nofollow, emitted unchanged.',
    },
    {
      key: 'uiText.c4cf9f2a',
      value: 'Postman Collection v2.1 JSON',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.c60cd0db',
      value: '4x (Ultra HD 4K)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason: 'Payment-network brand names, retained exactly.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.ce2e7ed7',
      value: 'Anthropic Claude SDK',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason:
        'Numeric aspect-ratio, pixel, viewport, DPI, or video-resolution notation; preserves unit symbols and standard resolution names.',
    },
    {
      key: 'uiText.dbe490b0',
      value: '| Col 1 | Col 2 |...',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason:
        'Exact diagnostic error code returned by the JWT implementation; natural-language explanations are translated separately.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.e5a522d3',
      value: 'Fetch API',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.e63efb57',
      value: '\\`\\`\\`language',
      reason:
        'Markdown code-fence grammar example with an illustrative language identifier; preserves its delimiters and escaping.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason:
        'Standard file/data format, protocol, RFC name, encoding, or conversion between named technical formats.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason: 'HTTP status code and standard English reason phrase in a literal protocol example.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason:
        'Exact robots metadata directive values index/noindex and follow/nofollow, emitted unchanged.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason:
        'Standard TTL, CVV, numeral-system, TLS, CPU, or UUID abbreviation and its version/parameter notation.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason:
        'Exact CSS property/function, HTTP header/media type, SQL keyword, configuration field, API property, or generated filename.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason:
        'Only two named interpolated values separated by punctuation; contains no translatable prose.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason:
        'Database product name plus a quoted SQL column-identifier example, demonstrating the dialect-specific quoting syntax.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
    {
      key: 'uiText.f4d00413',
      value: 'Bitcoin (BTC)',
      reason:
        'Named cryptocurrency or denomination, with its official currency symbol where provided.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.f9bd04e7',
      value: 'Shift',
      reason:
        'Physical keyboard key or shortcut notation; keycap names remain recognizable on the keyboard.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason:
        'Literal input/code example, sample credential, URL, address, hash, or code identifier; preserved exactly rather than changing the sample data.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason:
        'Named cryptocurrency or denomination, with its official currency symbol where provided.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason:
        'Exact Open Graph og:type or Twitter card-type metadata value; labels identify the generated protocol value.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason:
        'Official product, programming language, library, resource kind, or specification/format name; retains the name used in documentation and generated code.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason: 'HTTP status code and standard English reason phrase in a literal protocol example.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason: 'Exact cryptographic mode, algorithm, JOSE identifier, or named elliptic curve.',
    },
  ],
  zh: [
    {
      key: 'contact.emailPlaceholder',
      value: 'your@email.com',
      reason: 'Literal example email address, preserving valid email syntax.',
    },
    {
      key: 'tool.colorConverter.hex',
      value: 'HEX',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.colorConverter.hsl',
      value: 'HSL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.colorConverter.rgb',
      value: 'RGB',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.curl.fetchLabel',
      value: 'Fetch',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.curl.url',
      value: 'HTTP(S) URL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.docker.composeOutput',
      value: 'Docker Compose (docker-compose.yml)',
      reason: 'Docker Compose product name and the expected docker-compose.yml output filename.',
    },
    {
      key: 'tool.jsonpath.pathLabel',
      value: 'JSONPath',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.metaTags.schemaArticle',
      value: 'Article',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaBlogPosting',
      value: 'BlogPosting',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaLocalBusiness',
      value: 'LocalBusiness',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaOrganization',
      value: 'Organization',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaPerson',
      value: 'Person',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaProduct',
      value: 'Product',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaWebPage',
      value: 'WebPage',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.metaTags.schemaWebSite',
      value: 'WebSite',
      reason:
        'Canonical Schema.org @type identifier emitted in structured data; keep the interoperable identifier exactly.',
    },
    {
      key: 'tool.regexTester.patternIpv4',
      value: 'IPv4',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'tool.regexTester.patternUrl',
      value: 'URL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.0039ff09',
      value: 'Axios',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.00495923',
      value: 'ComponentName',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.008a1df5',
      value: 'JSON Schema Draft-07',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.02dcb01b',
      value: 'invalid-signature',
      reason:
        'Stable machine-readable diagnostic identifier; the adjacent natural-language explanation is translated separately.',
    },
    {
      key: 'uiText.0441412b',
      value: 'vCard',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.04447430',
      value: 'HEX:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.0748f62c',
      value: 'JSON → TSV',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.0a00ac84',
      value: 'unsupported-algorithm',
      reason:
        'Stable machine-readable diagnostic identifier; the adjacent natural-language explanation is translated separately.',
    },
    {
      key: 'uiText.0b563c13',
      value: 'Google Workspace (',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.0c00887b',
      value: 'JSON POST',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.0c583080',
      value: 'key=value',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.0c5bec5b',
      value: 'Microsoft 365 (',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.0e06893c',
      value: 'rgb(',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.10a44713',
      value: 'summary',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.118767bd',
      value: 'background-image: url(...)',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.128fef66',
      value: 'Top-K:',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.12c9d335',
      value: 'name,age John,30',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.14abc909',
      value: 'Top-P:',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.14ba3f63',
      value: 'KB)',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.17676759',
      value: 'article',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.17c16538',
      value: 'string',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.18eae73f',
      value: 'Swagger / OpenAPI JSON Schema',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.19140f69',
      value: 'UPDATE ... WHERE id =',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.1a169df7',
      value: 'my-cool-blog-post_name',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.1afbc1d8',
      value: 'Ctrl+↵',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.1bd670a0',
      value: 'number',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.1c039058',
      value: '⌘K / Ctrl+K',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.1cbc10e5',
      value: 'Mastercard',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.1d3549dc',
      value: 'invalid-token',
      reason:
        'Stable machine-readable diagnostic identifier; the adjacent natural-language explanation is translated separately.',
    },
    {
      key: 'uiText.1eccde8a',
      value: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.1f6a832c',
      value: 'app',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.214d33bc',
      value: 'Modelfile',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.220dc0d5',
      value: 'Content-Type',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.24451742',
      value: 'GeoJSON FeatureCollection',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.258facd9',
      value: 'Open Graph',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.28febd61',
      value: 'SGVsbG8= V29ybGQ= TElORVM=',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.29292d24',
      value: 'HMAC SHA-256',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.297dd2a1',
      value: 'mask-image: url(...)',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.2a76b9fc',
      value: 'HMAC SHA-384',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.2a7a036e',
      value: 'Go (net/http)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.2b8b428d',
      value: 'HMAC-SHA512 (HS512)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.2ba51521',
      value: '&copy;',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.2c2c19e3',
      value: 'HMAC-SHA256 (HS256)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.2c99c300',
      value: 'player',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.2f5973bf',
      value: 'LinkedIn',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.32439ad0',
      value: 'APP_NAME="Example API" PORT=3000',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.326b8794',
      value: 'px)',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.32b729e7',
      value: 'HMAC-SHA384 (HS384)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.32c04d5a',
      value: '201 Created',
      reason:
        'HTTP status-line example with the standard English reason phrase; retain the exact protocol example.',
    },
    {
      key: 'uiText.330a98e2',
      value: 'Python (Pydantic v2)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.34c83614',
      value: 'admin',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.34c947a5',
      value: 'SELECT * FROM table...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.383f31e5',
      value: 'TLS 1.3 (1-RTT)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.3849c54b',
      value: 'JavaScript (Axios)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.3aefc9c7',
      value: '2001:db8::1',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.3c1e915a',
      value: 'Python / FastAPI / Flask',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.3c2510a9',
      value: 'CPU',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.3d8b3945',
      value: 'curl -X POST https://...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.3dd8f04a',
      value: 'openapi: 3.1.0 info: title: Example API version: 1.0.0 paths: {}',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.3f67ed7b',
      value: 'TTL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.3fa55ac6',
      value: 'OnCalendar',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.3fc8264b',
      value: 'RFC 6902 JSON Patch',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.404a0270',
      value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.43b48003',
      value: 'table_name',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.457b9009',
      value: 'VW (1920px)',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.45e079f8',
      value: 'John Doe',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.4674caee',
      value: 'profile',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.485f4435',
      value: '400 Bad Request',
      reason:
        'HTTP status-line example with the standard English reason phrase; retain the exact protocol example.',
    },
    {
      key: 'uiText.486facb8',
      value: 'Visa',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.48e914d9',
      value: 'Twitter / X',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.49739e07',
      value: '@username',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.4a0a1ce3',
      value: 'Base64url',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.4c36266f',
      value: 'BigQuery',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.4c956b5b',
      value: 'Elasticsearch Query DSL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.4e73ff28',
      value: 'DPI (',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.4fea9530',
      value: '@author',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.50e5fbae',
      value: 'CSS:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.5372965a',
      value: 'Microsoft SQL Server',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.54d0de82',
      value: 'Guzzle HTTP',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.54ddc377',
      value: 'CSS border-radius',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.557277a1',
      value: 'JPEG / JPG',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.58a7cc63',
      value: 'SHA3-512',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.58e0a2c0',
      value: 'TypeScript (TSX)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.5b951ee3',
      value: 'SHA-1 (',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.5bbbca8d',
      value: 'Meta / Cmd',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.602d4a7a',
      value: 'JSON → .env',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.60a1daad',
      value: 'docker run -d -p 80:80 --name my_app nginx...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.60b98471',
      value: 'NIST P-521 (secp521r1)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.61afdcbf',
      value: 'OpenAI SDK',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.657ebd8d',
      value: 'SQL CREATE TABLE DDL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.65f46ebf',
      value: 'boolean',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.66979c08',
      value: "'self' https://cdn.example.com",
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.66ad5ad3',
      value: 'requests',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.676442e0',
      value: 'Wei',
      reason:
        'Standard Ethereum denomination identifier, retained for interoperability and recognition.',
    },
    {
      key: 'uiText.682810b4',
      value: 'JSON → YAML',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.68f22926',
      value: 'CustomInterfaceName',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.69e8e6a8',
      value: 'application/json',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.6e35c67c',
      value: 'Stripe',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.6e3ef9e2',
      value: 'INSERT INTO',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.72622c84',
      value: 'type User { ... }',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.7392dbcb',
      value: 'Trino / Presto',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.7569633e',
      value: 'URL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.765ea1c5',
      value: '4:3 (SD / iPad)',
      reason:
        'Aspect-ratio preset and standard display/product abbreviations; retain the recognizable preset notation.',
    },
    {
      key: 'uiText.7c182a3c',
      value: 'MySQL (`col`)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.7da88ba9',
      value: 'OCT:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.7dafeffc',
      value: 'Alt',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.816a3b08',
      value: 'Python (Requests)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.844a87bf',
      value: 'Kubernetes Deployment YAML',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.84b694a9',
      value: 'RSA',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.8644f384',
      value: 'Ctrl',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.87a46248',
      value: 'WiFi',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.892a070e',
      value: 'CVV',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.89f5cf5a',
      value: '16:9 (HD / 4K)',
      reason:
        'Aspect-ratio preset and standard display/product abbreviations; retain the recognizable preset notation.',
    },
    {
      key: 'uiText.8a58ad26',
      value: 'array',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.8f498025',
      value: '$.store.book[*].title',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.90582dc7',
      value: 'Slack',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.91833986',
      value: 'LinkedIn URL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.91ac84df',
      value: 'col1, col2, col3...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.92db9731',
      value: 'summary_large_image',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.95bbea8b',
      value: 'missing-algorithm',
      reason:
        'Stable machine-readable diagnostic identifier; the adjacent natural-language explanation is translated separately.',
    },
    {
      key: 'uiText.95c234ff',
      value: 'noindex, follow',
      reason:
        'Canonical robots directive pair emitted into HTML metadata; retain its exact token spelling.',
    },
    {
      key: 'uiText.99df0fbb',
      value: 'PHP Apache',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.9c0fe869',
      value: 'TLS 1.2 (2-RTT)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.9dcf6762',
      value: 'Android Vector Drawable XML',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.9f1b26da',
      value: 'event.key',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.a0a0c45e',
      value: 'HTML:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.a4404c1a',
      value: 'event.code',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.a594ca6b',
      value: 'DEC:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.a60eed8d',
      value: 'Rust (reqwest)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.a644052c',
      value: 'font-size:',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.a68d5e58',
      value: 'Visa, MasterCard, American Express, Discover, Diners Club',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.a7a4c6d9',
      value: 'CREATE TABLE',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.aa4d0e00',
      value: 'Terraform HCL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.ac37c251',
      value: 'Facebook',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.ac3ea53a',
      value: 'TSV (',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.aceadefc',
      value: 'PNG',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.b2287417',
      value: 'NIST P-256 (secp256r1)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.b2a24ee1',
      value: 'index, nofollow',
      reason:
        'Canonical robots directive pair emitted into HTML metadata; retain its exact token spelling.',
    },
    {
      key: 'uiText.b31e49b3',
      value: 'forwardRef',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.b3b1a59a',
      value: 'JSON Schema',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.b3bb312a',
      value: 'SQL Server (T-SQL)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.b3d7ca5c',
      value: 'User-agent:',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.b4536fb4',
      value: 'Rust (Cargo)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.b61ece53',
      value: 'GitHub Markdown',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.b8448569',
      value: 'HMAC SHA-512',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.ba647e0f',
      value: 'your-slug-here',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.bab35efe',
      value: 'Oracle PL/SQL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.bc224e67',
      value: 'id,name,email...',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.bd87eaec',
      value: 'BIN:',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.c1948a38',
      value: 'book',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.c1f60944',
      value: 'event.which',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.c301a35e',
      value: 'IANA MIME Content-Type',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.c4a18e42',
      value: 'index, follow',
      reason:
        'Canonical robots directive pair emitted into HTML metadata; retain its exact token spelling.',
    },
    {
      key: 'uiText.c8809596',
      value: 'TSV → JSON',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.c8b3b42e',
      value: 'Amex',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.ca74a11f',
      value: 'IconComponent',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.cbf1ea85',
      value: 'Drizzle ORM (TypeScript)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.ce2e7ed7',
      value: 'Anthropic Claude SDK',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.cfd7f7d4',
      value: "INSERT INTO table (col1, col2) VALUES (1, 'val');",
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.d0997403',
      value: 'SendGrid (',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.d0b00c43',
      value:
        'https%3A%2F%2Fexample.com%2Fpage1%3Fquery%3Dhello%20world https%3A%2F%2Fexample.com%2Fpage2',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.d1aa1b97',
      value: 'Quoted-Printable',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.d25bc17d',
      value: 'JavaScript (Fetch)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.d4e74a72',
      value: 'SHA3-256',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.d84d4acb',
      value: 'NIST P-384 (secp384r1)',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.da94e4e4',
      value: 'Twitter',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.db7b9961',
      value: 'VH (1080px)',
      reason:
        'Technical unit, format abbreviation, or unit suffix; preserve the displayed technical notation.',
    },
    {
      key: 'uiText.ded38f06',
      value: 'JSON Pointer',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e00a2b87',
      value: 'Snowflake',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e1f75cf6',
      value: 'missing-secret',
      reason:
        'Stable machine-readable diagnostic identifier; the adjacent natural-language explanation is translated separately.',
    },
    {
      key: 'uiText.e2e96ed7',
      value: 'Googlebot',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e5a522d3',
      value: 'Fetch API',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e6fb8e3c',
      value: 'UUID v4',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e718dc4a',
      value: 'YAML → JSON',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e7a545a9',
      value: '200 OK',
      reason:
        'HTTP status-line example with the standard English reason phrase; retain the exact protocol example.',
    },
    {
      key: 'uiText.e99264ac',
      value: 'noindex, nofollow',
      reason:
        'Canonical robots directive pair emitted into HTML metadata; retain its exact token spelling.',
    },
    {
      key: 'uiText.e9de813a',
      value: 'SQL Server / T-SQL',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e9e3d7d0',
      value: 'Go (Golang)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.e9fb92f5',
      value: 'UUID v7',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.ea50bade',
      value: 'ESC',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.ec8e43d4',
      value: 'event.location',
      reason:
        'Literal API member, directive, property, header, media type, or code fragment; preserve exact syntax.',
    },
    {
      key: 'uiText.ecaf981a',
      value: 'The quick brown fox jumps over the lazy dog.',
      reason:
        'Standard English pangram used to evaluate typography; retaining the exact test text preserves its purpose.',
    },
    {
      key: 'uiText.eefb8184',
      value: '{value1}: {value2}',
      reason:
        'Placeholder-only formatting template with no natural-language content; preserve names and punctuation.',
    },
    {
      key: 'uiText.f0d9d68e',
      value: 'PostgreSQL ("col")',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.f43c2c47',
      value: 'ECDSA',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
    {
      key: 'uiText.f545dfc7',
      value: 'Node.js / Express / Next',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.f651116c',
      value: 'Markdown',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.f9bd04e7',
      value: 'Shift',
      reason: 'Keyboard key or shortcut matching physical key labels and platform conventions.',
    },
    {
      key: 'uiText.fa63f5cd',
      value: 'RootType',
      reason:
        'Literal code, address, input, or output sample; preserve exact syntax and the example data.',
    },
    {
      key: 'uiText.fcb78d21',
      value: 'Gwei',
      reason:
        'Standard Ethereum denomination identifier, retained for interoperability and recognition.',
    },
    {
      key: 'uiText.fcefccca',
      value: 'website',
      reason:
        'Canonical enum/token value emitted by generated JSON, XML, metadata, or schema; retain the interoperable value.',
    },
    {
      key: 'uiText.fd7e0c5c',
      value: 'PHP (cURL)',
      reason:
        'Standard product, library, protocol, acronym, or data-format name; retain canonical naming so the selected technology remains recognizable.',
    },
    {
      key: 'uiText.fe41419a',
      value: '404 Not Found',
      reason:
        'HTTP status-line example with the standard English reason phrase; retain the exact protocol example.',
    },
    {
      key: 'uiText.ff7a7e0a',
      value: 'SHA1:',
      reason:
        'Canonical cryptographic algorithm or curve identifier, retaining exact technical naming.',
    },
  ],
};
