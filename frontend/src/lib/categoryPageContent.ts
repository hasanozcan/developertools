import type { Language } from '@/lib/i18nRouting';

export type CategorySlug =
  | 'converters'
  | 'encoding'
  | 'formatters'
  | 'generators'
  | 'json'
  | 'text'
  | 'utilities'
  | 'crypto';

export interface CategoryAnswerSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategorySource {
  name: string;
  url: string;
}

export interface CategoryLocaleContent {
  answerSections: CategoryAnswerSection[];
  faqs: CategoryFaq[];
}

export interface CategoryUiLabels {
  faqHeading: string;
  sourcesHeading: string;
  primaryReferences: string;
  lastReviewed: string;
}

export const categoryUiLabels: Record<Language, CategoryUiLabels> = {
  en: {
    faqHeading: 'Frequently asked questions',
    sourcesHeading: 'Sources & references',
    primaryReferences: 'Primary references:',
    lastReviewed: 'Last reviewed:',
  },
  tr: {
    faqHeading: 'Sık sorulan sorular',
    sourcesHeading: 'Kaynaklar ve referanslar',
    primaryReferences: 'Birincil kaynaklar:',
    lastReviewed: 'Son inceleme:',
  },
  de: {
    faqHeading: 'Häufig gestellte Fragen',
    sourcesHeading: 'Quellen & Referenzen',
    primaryReferences: 'Primärquellen:',
    lastReviewed: 'Zuletzt geprüft:',
  },
  es: {
    faqHeading: 'Preguntas frecuentes',
    sourcesHeading: 'Fuentes y referencias',
    primaryReferences: 'Referencias principales:',
    lastReviewed: 'Última revisión:',
  },
  fr: {
    faqHeading: 'Questions fréquentes',
    sourcesHeading: 'Sources et références',
    primaryReferences: 'Références principales :',
    lastReviewed: 'Dernière vérification :',
  },
  ru: {
    faqHeading: 'Часто задаваемые вопросы',
    sourcesHeading: 'Источники и справочники',
    primaryReferences: 'Первичные источники:',
    lastReviewed: 'Последняя проверка:',
  },
  zh: {
    faqHeading: '常见问题',
    sourcesHeading: '参考资料与标准',
    primaryReferences: '主要参考资料：',
    lastReviewed: '最后审阅：',
  },
};

export const categorySources: Record<CategorySlug, CategorySource[]> = {
  converters: [
    {
      name: 'RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format',
      url: 'https://www.rfc-editor.org/rfc/rfc8259',
    },
    {
      name: 'RFC 4180: Common Format and MIME Type for Comma-Separated Values (CSV) Files',
      url: 'https://www.rfc-editor.org/rfc/rfc4180',
    },
    {
      name: 'W3C CSS Color Module Level 4',
      url: 'https://www.w3.org/TR/css-color-4/',
    },
  ],
  encoding: [
    { name: 'RFC 4648: Base-N Encodings', url: 'https://www.rfc-editor.org/rfc/rfc4648' },
    {
      name: 'WHATWG URL Standard: Percent-encoded bytes',
      url: 'https://url.spec.whatwg.org/#percent-encoded-bytes',
    },
    {
      name: 'NIST SP 800-63B: Authentication and Authenticator Management',
      url: 'https://pages.nist.gov/800-63-4/sp800-63b.html',
    },
  ],
  formatters: [
    { name: 'WHATWG HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
    {
      name: 'W3C Extensible Markup Language (XML) 1.0',
      url: 'https://www.w3.org/TR/xml/',
    },
    {
      name: 'MDN CSS Syntax',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax',
    },
  ],
  generators: [
    {
      name: 'RFC 9562: Universally Unique IDentifiers (UUIDs)',
      url: 'https://www.rfc-editor.org/rfc/rfc9562',
    },
    {
      name: 'MDN Crypto.getRandomValues()',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues',
    },
    {
      name: 'WHATWG HTML Standard: Standard Metadata Names',
      url: 'https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names',
    },
  ],
  json: [
    {
      name: 'RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format',
      url: 'https://www.rfc-editor.org/rfc/rfc8259',
    },
    {
      name: 'RFC 6901: JavaScript Object Notation (JSON) Pointer',
      url: 'https://www.rfc-editor.org/rfc/rfc6901',
    },
    {
      name: 'RFC 9535: JSONPath: Query Expressions for JSON',
      url: 'https://www.rfc-editor.org/rfc/rfc9535',
    },
  ],
  text: [
    {
      name: 'ECMA-262: RegExp (Regular Expression) Objects',
      url: 'https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-regular-expression-objects',
    },
    {
      name: 'MDN Regular Expressions Guide',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions',
    },
    {
      name: 'Unicode Standard Annex #29: Unicode Text Segmentation',
      url: 'https://unicode.org/reports/tr29/',
    },
  ],
  utilities: [
    { name: 'RFC 9110: HTTP Semantics', url: 'https://www.rfc-editor.org/rfc/rfc9110' },
    { name: 'RFC 9111: HTTP Caching', url: 'https://www.rfc-editor.org/rfc/rfc9111' },
    {
      name: 'W3C Content Security Policy Level 3',
      url: 'https://www.w3.org/TR/CSP3/',
    },
  ],
  crypto: [
    {
      name: 'NIST FIPS 180-4: Secure Hash Standard (SHS)',
      url: 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final',
    },
    {
      name: 'RFC 7636: Proof Key for Code Exchange (PKCE)',
      url: 'https://www.rfc-editor.org/rfc/rfc7636',
    },
    {
      name: 'MDN SubtleCrypto API',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto',
    },
  ],
};

export const categoryPageContent: Record<CategorySlug, Record<Language, CategoryLocaleContent>> = {
  converters: {
    en: {
      answerSections: [
        {
          heading: 'Choosing the right data or format converter',
          paragraphs: [
            'Format conversion preserves information only when the target representation can express the source structure. Pick a converter designed for your exact pair—such as JSON to CSV for flat tables, YAML to JSON for configuration schemas, or Timestamp Converter for Unix epoch values—and verify edge cases like null fields, time zones, and numeric precision.',
          ],
          bullets: [
            'Structured interchange: convert between JSON, YAML, XML, CSV, and TypeScript or Pydantic models without sending payloads to external servers.',
            'API & infrastructure migration: translate cURL commands, Postman collections, HAR recordings, Nginx/Apache rules, and Docker Compose manifests.',
            'Scalar & design units: convert Unix timestamps, HEX/RGB/HSL colors, px/rem typography, Roman numerals, and binary/octal/hex bases.',
          ],
        },
        {
          heading: 'Preserving fidelity across conversions',
          paragraphs: [
            'Every format has different type rules. CSV has no native nested objects or booleans, YAML supports anchors and unquoted strings that JSON rejects, and IEEE-754 numbers in browser JavaScript lose precision past 2^53 - 1. Always review generated output before committing config files or importing datasets.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Can nested JSON always be converted cleanly to CSV?',
          answer:
            'CSV is a flat two-dimensional table, so nested objects and arrays must be flattened into dotted column names or serialized as strings. Review column headers when exporting nested API payloads.',
        },
        {
          question: 'Are Unix timestamps converted in UTC or local time?',
          answer:
            'Unix epoch seconds and milliseconds represent an instant in UTC. Converters display both UTC ISO-8601 strings and your browser local time zone so you can catch off-by-offset bugs.',
        },
        {
          question: 'Do format converters upload files or API payloads?',
          answer:
            'No. All text, schema, color, and image conversions run locally in your browser using JavaScript and Web APIs without transmitting payloads to a backend server.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Doğru veri veya biçim dönüştürücüyü seçme',
          paragraphs: [
            'Biçim dönüşümü yalnızca hedef gösterim kaynak yapıyı ifade edebildiğinde bilgiyi eksiksiz korur. Düz tablolar için JSON–CSV, yapılandırma şemaları için YAML–JSON veya Unix zaman damgaları için Zaman Damgası Dönüştürücü gibi ihtiyacınıza uygun aracı seçin; null alanları, saat dilimlerini ve sayısal duyarlılığı kontrol edin.',
          ],
          bullets: [
            'Yapısal veri alışverişi: JSON, YAML, XML, CSV ve TypeScript ya da Pydantic modellerini verilerinizi dış sunuculara göndermeden dönüştürün.',
            'API ve altyapı geçişi: cURL komutlarını, Postman koleksiyonlarını, HAR kayıtlarını, Nginx/Apache kurallarını ve Docker Compose dosyalarını çevirin.',
            'Ölçü ve tasarım birimleri: Unix zaman damgaları, HEX/RGB/HSL renkleri, px/rem ölçüleri, Roma rakamları ve sayı tabanları arasında dönüşüm yapın.',
          ],
        },
        {
          heading: 'Dönüşümlerde veri bütünlüğünü koruma',
          paragraphs: [
            'Her biçimin tür kuralları farklıdır. CSV iç içe nesneleri veya boolean türünü doğrudan taşımaz; YAML ise JSON’ın kabul etmediği tırnaksız metinleri destekler. Üretilen çıktıyı yapılandırma dosyalarına eklemeden veya veritabanına aktarmadan önce mutlaka doğrulayın.',
          ],
        },
      ],
      faqs: [
        {
          question: 'İç içe JSON verisi her zaman CSV’ye kayıpsız dönüşür mü?',
          answer:
            'CSV düz iki boyutlu bir tablo biçimidir; bu nedenle iç içe nesneler ve diziler noktalı sütun adlarına düzleştirilir veya metin olarak serileştirilir. Karmaşık API yanıtlarını dışa aktarırken sütun başlıklarını kontrol edin.',
        },
        {
          question: 'Unix zaman damgaları UTC’ye göre mi yerel saate göre mi çevrilir?',
          answer:
            'Unix epoch saniye ve milisaniyeleri UTC anını temsil eder. Dönüştürücü araçlar hem UTC ISO-8601 çıktısını hem de tarayıcınızın yerel saat dilimini birlikte göstererek saat farkı hatalarını yakalamanızı sağlar.',
        },
        {
          question: 'Dönüştürücü araçlar dosya veya API verilerini sunucuya yükler mi?',
          answer:
            'Hayır. Tüm metin, şema, renk ve görsel dönüşümleri tarayıcınızda yerel JavaScript ve Web API’leri ile çalışır; verileriniz sunucuya gönderilmez.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'Den passenden Daten- oder Formatkonverter wählen',
          paragraphs: [
            'Eine Formatkonvertierung bewahrt Informationen nur dann vollständig, wenn das Zielformat die Ausgangsstruktur abbilden kann. Wählen Sie das passende Werkzeug für Ihr Paar – etwa JSON zu CSV für flache Tabellen, YAML zu JSON für Konfigurationen oder den Zeitstempel-Konverter für Unix-Epochenwerte.',
          ],
          bullets: [
            'Strukturierter Datenaustausch: Konvertieren Sie JSON, YAML, XML, CSV sowie TypeScript- oder Pydantic-Modelle vollständig lokal im Browser.',
            'API- und Infrastruktur-Migration: Überführen Sie cURL-Befehle, Postman-Collections, HAR-Mitschnitte, Nginx/Apache-Regeln und Docker-Compose-Dateien.',
            'Skalar- und Designeinheiten: Wandeln Sie Unix-Zeitstempel, HEX/RGB/HSL-Farben, px/rem-Werte, römische Zahlen und Zahlensysteme um.',
          ],
        },
        {
          heading: 'Datentreue bei Konvertierungen sicherstellen',
          paragraphs: [
            'Jedes Format besitzt eigene Typenregeln. CSV kennt keine verschachtelten Objekte, YAML erlaubt Anker und unquotierte Strings, und JavaScript-Zahlen verlieren oberhalb von 2^53 - 1 an Präzision. Prüfen Sie das Ergebnis stets vor dem Produktiveinsatz.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Lässt sich verschachteltes JSON immer verlustfrei in CSV umwandeln?',
          answer:
            'CSV ist eine flache Tabelle. Verschachtelte Objekte und Arrays müssen daher in punktgetrennte Spalten aufgelöst oder als Zeichenkette serialisiert werden.',
        },
        {
          question: 'Werden Unix-Zeitstempel in UTC oder Lokalzeit konvertiert?',
          answer:
            'Unix-Zeitstempel beziehen sich auf UTC. Der Konverter zeigt sowohl den UTC-ISO-8601-Wert als auch Ihre lokale Zeitzone an, um Zeitzonenfehler zu vermeiden.',
        },
        {
          question: 'Laden die Konverter-Tools meine Dateien oder Payloads hoch?',
          answer:
            'Nein. Alle Konvertierungen laufen clientseitig in Ihrem Browser, ohne Daten an externe Server zu übertragen.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Cómo elegir el convertidor de datos o formatos adecuado',
          paragraphs: [
            'Una conversión conserva la información solo cuando el formato de destino puede representar la estructura original. Elige la herramienta específica para tu par de formatos —como JSON a CSV para tablas planas, YAML a JSON para configuración o el conversor de marcas de tiempo Unix— y revisa nulos, zonas horarias y precisión numérica.',
          ],
          bullets: [
            'Intercambio estructurado: convierte entre JSON, YAML, XML, CSV y modelos TypeScript o Pydantic sin enviar datos a servidores externos.',
            'Migración de API e infraestructura: transforma comandos cURL, colecciones Postman, archivos HAR, reglas Nginx/Apache y manifiestos Docker Compose.',
            'Unidades de diseño y escalares: convierte marcas Unix, colores HEX/RGB/HSL, unidades px/rem, números romanos y bases numéricas.',
          ],
        },
        {
          heading: 'Conservar la fidelidad de los tipos en cada conversión',
          paragraphs: [
            'Cada formato impone sus propias reglas de tipos. CSV no soporta objetos anidados ni booleanos nativos, YAML admite referencias que JSON rechaza y JavaScript pierde precisión entera por encima de 2^53 - 1. Revisa siempre la salida generada antes de importarla.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Se puede convertir siempre un JSON anidado a CSV sin pérdidas?',
          answer:
            'CSV es una tabla plana de dos dimensiones, por lo que los objetos y arreglos anidados deben aplanarse en columnas con puntos o serializarse como texto.',
        },
        {
          question: '¿Las marcas de tiempo Unix se convierten en UTC o en hora local?',
          answer:
            'Los segundos y milisegundos Unix representan un instante en UTC. La herramienta muestra tanto la cadena ISO-8601 en UTC como tu zona horaria local.',
        },
        {
          question: '¿Los convertidores suben mis archivos o cargas útiles a un servidor?',
          answer:
            'No. Todas las conversiones se ejecutan localmente en tu navegador mediante JavaScript y APIs web.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Choisir le bon convertisseur de données ou de formats',
          paragraphs: [
            'Une conversion préserve les informations uniquement si le format cible sait représenter la structure source. Choisissez l’outil adapté à votre paire — JSON vers CSV pour des tableaux plats, YAML vers JSON pour les configurations ou le convertisseur d’horodatage Unix — et vérifiez les valeurs nulles, fuseaux horaires et la précision numérique.',
          ],
          bullets: [
            'Échange structuré : convertissez JSON, YAML, XML, CSV et des modèles TypeScript ou Pydantic sans transmettre vos données.',
            'Migration d’API et d’infrastructure : traduisez des commandes cURL, collections Postman, captures HAR, règles Nginx/Apache et fichiers Docker Compose.',
            'Unités scalaires et CSS : convertissez timestamps Unix, couleurs HEX/RGB/HSL, unités px/rem, chiffres romains et bases numériques.',
          ],
        },
        {
          heading: 'Préserver la fidélité des types lors des conversions',
          paragraphs: [
            'Chaque format possède ses propres règles de typage. CSV ne gère pas les objets imbriqués, YAML autorise des ancres refusées par JSON et JavaScript perd la précision entière au-delà de 2^53 - 1. Contrôlez toujours le résultat généré avant mise en production.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Un JSON imbriqué peut-il toujours être converti proprement en CSV ?',
          answer:
            'Le format CSV est un tableau plat en deux dimensions : les objets et tableaux imbriqués doivent être aplatis en colonnes pointées ou sérialisés en texte.',
        },
        {
          question: 'Les horodatages Unix sont-ils convertis en UTC ou en heure locale ?',
          answer:
            'Les horodatages Unix désignent un instant en UTC. L’outil affiche à la fois l’horodatage ISO-8601 UTC et votre fuseau horaire local.',
        },
        {
          question: 'Ces convertisseurs envoient-ils mes fichiers vers un serveur ?',
          answer:
            'Non. Toutes les conversions s’exécutent localement dans votre navigateur via JavaScript et les API Web.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Выбор подходящего конвертера форматов и данных',
          paragraphs: [
            'Преобразование сохраняет данные без искажений только тогда, когда целевой формат способен выразить исходную структуру. Выбирайте инструмент под конкретную пару — например, JSON в CSV для плоских таблиц, YAML в JSON для конфигураций или конвертер меток времени Unix — и проверяйте null-значения, часовые пояса и точность чисел.',
          ],
          bullets: [
            'Структурированный обмен: конвертируйте JSON, YAML, XML, CSV, а также модели TypeScript и Pydantic локально без отправки на сервер.',
            'Миграция API и инфраструктуры: преобразуйте команды cURL, коллекции Postman, записи HAR, правила Nginx/Apache и манифесты Docker Compose.',
            'Числа и единицы дизайна: переводите метки Unix, цвета HEX/RGB/HSL, px/rem, римские числа и системы счисления.',
          ],
        },
        {
          heading: 'Сохранение точности типов при конвертации',
          paragraphs: [
            'У каждого формата свои ограничения типов. CSV не поддерживает вложенные объекты, YAML допускает якоря и строки без кавычек, а числа JavaScript теряют целочисленную точность свыше 2^53 - 1. Всегда проверяйте результат перед импортом в продакшен.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Можно ли всегда без потерь преобразовать вложенный JSON в CSV?',
          answer:
            'CSV — это плоская двумерная таблица, поэтому вложенные объекты и массивы приходится разворачивать в столбцы с точками или сериализовать в строку.',
        },
        {
          question: 'Временные метки Unix переводятся в UTC или в местное время?',
          answer:
            'Метка Unix фиксирует момент времени в UTC. Конвертер показывает как строку ISO-8601 в UTC, так и локальный часовой пояс браузера.',
        },
        {
          question: 'Отправляют ли конвертеры мои файлы на внешний сервер?',
          answer:
            'Нет. Все преобразования выполняются локально в вашем браузере с помощью JavaScript и встроенных Web API.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '如何选择合适的数据与格式转换工具',
          paragraphs: [
            '只有当目标格式能够准确表达源数据结构时，格式转换才能保留完整信息。请根据具体需求选择对应的转换器，例如用 JSON 转 CSV 处理扁平表格、用 YAML 转 JSON 处理配置文件、用时间戳转换器处理 Unix 时间戳，并注意空值、时区和数值精度。',
          ],
          bullets: [
            '结构化数据交换：在浏览器本地完成 JSON、YAML、XML、CSV 与 TypeScript/Pydantic 模型之间的互转。',
            'API 与运维配置迁移：转换 cURL 命令、Postman 集合、HAR 抓包、Nginx/Apache 规则和 Docker Compose 配置。',
            '数值与前端单位：在 Unix 时间戳、HEX/RGB/HSL 颜色、px/rem、罗马数字和不同进制之间快速换算。',
          ],
        },
        {
          heading: '在转换过程中保持数据保真度',
          paragraphs: [
            '不同格式的类型规则各不相同。CSV 原生不支持嵌套对象和布尔类型，YAML 支持 JSON 不允许的锚点与无引号字符串，而浏览器 JavaScript 数值在超过 2^53 - 1 后会丢失整数精度。提交或导入前请务必核对生成结果。',
          ],
        },
      ],
      faqs: [
        {
          question: '嵌套结构的 JSON 总是能无损转换成 CSV 吗？',
          answer:
            'CSV 是二维平面表格，嵌套对象和数组必须展开为带点号的列名或序列化为字符串。导出复杂 API 数据时请检查列结构。',
        },
        {
          question: 'Unix 时间戳是按 UTC 还是本地时间转换？',
          answer:
            'Unix 秒和毫秒时间戳均表示 UTC 时刻。工具会同时展示 UTC ISO-8601 时间与浏览器本地时区时间，方便排查时区偏差。',
        },
        {
          question: '这些格式转换工具会把文件或数据上传到服务器吗？',
          answer:
            '不会。所有文本、Schema、颜色和图片转换均在浏览器本地执行，不会将数据发送至后台服务器。',
        },
      ],
    },
  },
  encoding: {
    en: {
      answerSections: [
        {
          heading: 'Which online encoder should I use?',
          paragraphs: [
            'Use the workbench on this page for quick Base64, URL-component, hexadecimal, binary, or JSON-string conversion. Choose the representation required by the system that will consume the result, or open a dedicated tool when you need format-specific options.',
          ],
          bullets: [
            'Base64 converts text to and from Base64; Image to Base64 creates a data URI for an image.',
            'URL Encoder percent-encodes a full URL or one URL component.',
            'HTML Entity handles characters used in HTML source.',
            'Unicode Escape represents code points with escape sequences, while JSON String Escape prepares or reads string content used inside JSON.',
            'HEX Encoder and Binary Encoder expose character data as hexadecimal or bit values.',
            "JWT Decoder displays a token's Base64url-encoded header and payload for debugging, but decoding does not verify its signature or prove its claims are trustworthy.",
          ],
        },
        {
          heading: 'Encoding is not encryption or hashing',
          paragraphs: [
            "Encoding changes a value's representation so compatible software can reverse it; it is not a security control. Encryption uses a key to protect confidentiality, while hashing produces a digest intended to be one-way. Base64, percent encoding, HTML entities, hexadecimal, binary, Unicode escapes, and JSON escaping do not hide secrets. Use encryption when confidentiality is required, a keyed message-authentication code or digital signature when authenticity and integrity are required, and a dedicated salted, deliberately slow password-hashing scheme for stored passwords.",
          ],
        },
        {
          heading: 'Client-side processing and privacy',
          paragraphs: [
            'These encoding and decoding tools run in the current browser. Text transformations use browser JavaScript, and image conversion uses FileReader instead of uploading the selected file to a conversion service. That client-side boundary reduces routine data transfer, but it does not make sensitive material safe on every device. Clipboard history, browser extensions, third-party page scripts, screen sharing, or a shared computer can expose input. Do not paste production credentials, private keys, session tokens, or confidential JWT claims.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Which online encoder should I use?',
          answer:
            'Use this page for Base64, URL-component, hexadecimal, binary, or JSON-string conversion. Use HTML entities for HTML source, Unicode escaping for code points, JWT Decoder for token inspection, and Image to Base64 for image data URIs.',
        },
        {
          question: 'Is encoding the same as encryption or hashing?',
          answer:
            'No. Encoding is reversible representation and provides no confidentiality. Encryption protects data with a key, while hashing produces a digest that is generally intended to be one-way.',
        },
        {
          question: 'Do these encoding tools upload my input?',
          answer:
            'The current tools perform their transformations in your browser and do not submit entered values or selected images to a conversion API. Clipboard history, extensions, page scripts, and shared devices can still expose sensitive input.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Hangi çevrimiçi kodlayıcıyı kullanmalıyım?',
          paragraphs: [
            'Hızlı Base64, URL bileşeni, onaltılık (hex), ikili (binary) veya JSON dize dönüşümleri için bu sayfadaki çalışma tezgahını kullanın. Çıktıyı tüketecek sistemin beklediği gösterimi seçin veya biçime özel seçenekler gerektiğinde ilgili araca geçin.',
          ],
          bullets: [
            'Base64 metinleri Base64 biçimine çevirir veya çözer; Görselden Base64 aracı ise görseller için data URI üretir.',
            'URL Kodlayıcı tam bir URL’yi veya tek bir sorgu bileşenini yüzde kodlamasıyla (percent-encoding) dönüştürür.',
            'HTML Varlık Kodlayıcı, HTML kaynak kodunda özel anlam taşıyan karakterleri güvenli varlıklara çevirir.',
            'Unicode Kaçış aracı kod noktalarını kaçış dizileriyle temsil eder; JSON Dize Kaçış ise JSON içinde kullanılacak metinleri hazırlar.',
            'HEX ve İkili kodlayıcılar karakter verilerini bayt veya bit düzeyinde incelemenizi sağlar.',
            'JWT Çözücü hata ayıklama için belirtecin Base64url başlık ve yük kısımlarını gösterir; ancak yalnızca çözme işlemi imzayı doğrulamaz.',
          ],
        },
        {
          heading: 'Kodlama, şifreleme veya özetleme değildir',
          paragraphs: [
            'Kodlama bir verinin biçimini uyumlu yazılımların geri çevirebileceği şekilde değiştirir ve bir güvenlik önlemi değildir. Gizlilik için anahtarlı şifreleme, tek yönlü özet için kriptografik özetleme, kimlik doğrulama için ise HMAC veya dijital imza kullanılmalıdır.',
          ],
        },
        {
          heading: 'İstemci tarafında işleme ve gizlilik',
          paragraphs: [
            'Bu sayfadaki kodlama ve çözme araçları doğrudan tarayıcınızda çalışır ve seçilen görselleri veya metinleri bir dönüşüm sunucusuna yüklemez. Yine de pano geçmişi, tarayıcı eklentileri veya paylaşılan cihazlar risk oluşturabileceğinden üretim gizli anahtarlarını ve gerçek oturum belirteçlerini yapıştırmayın.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Hangi çevrimiçi kodlayıcıyı kullanmalıyım?',
          answer:
            'Base64, URL bileşeni, onaltılık, ikili ve JSON dize dönüşümleri için bu sayfadaki aracı; HTML kaynakları için HTML Varlık aracını; belirteç incelemek için ise JWT Çözücüyü kullanabilirsiniz.',
        },
        {
          question: 'Kodlama ile şifreleme veya özetleme aynı şey midir?',
          answer:
            'Hayır. Kodlama geri döndürülebilir bir gösterim biçimidir ve gizlilik sağlamaz. Şifreleme veriyi bir anahtarla korur, özetleme ise tek yönlü sabit uzunluklu bir özet üretir.',
        },
        {
          question: 'Kodlama araçları girdiğim verileri sunucuya yükler mi?',
          answer:
            'Hayır. Dönüşümler tarayıcınızda yerel JavaScript ile gerçekleştirilir ve verileriniz bir API’ye gönderilmez.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'Welchen Online-Encoder sollte ich verwenden?',
          paragraphs: [
            'Nutzen Sie die Workbench auf dieser Seite für schnelle Base64-, URL-Komponenten-, Hexadezimal-, Binär- oder JSON-String-Konvertierungen. Wählen Sie das Format, das Ihr Zielsystem erwartet, oder öffnen Sie für spezielle Optionen das jeweilige Einzelwerkzeug.',
          ],
          bullets: [
            'Base64 wandelt Text bidirektional um; Bild zu Base64 erzeugt Data-URIs für Grafiken.',
            'URL-Encoder führt Percent-Encoding gemäß WHATWG-URL-Standard für ganze URLs oder einzelne Parameter aus.',
            'HTML-Entity-Encoder maskiert reservierte Zeichen für sicheren HTML-Quelltext.',
            'Unicode-Escape kodiert Codepoints als \\uXXXX, während JSON-String-Escape Steuerzeichen für JSON-Strings schützt.',
            'JWT-Decoder zeigt Header und Payload von Token zum Debuggen an, ersetzt jedoch keine Signaturprüfung.',
          ],
        },
        {
          heading: 'Kodierung ist weder Verschlüsselung noch Hashing',
          paragraphs: [
            'Kodierung verändert lediglich die Darstellung, damit Software Daten verlustfrei wiederherstellen kann – sie bietet keinerlei Vertraulichkeit. Nutzen Sie für Geheimnisse echte Verschlüsselung, für Integrität HMAC oder Signaturen und für Passwörter gesalzene KDFs.',
          ],
        },
        {
          heading: 'Clientseitige Verarbeitung im Browser',
          paragraphs: [
            'Alle Werkzeuge arbeiten lokal im Browser über JavaScript und die FileReader-API. Fügen Sie dennoch keine produktiven Geheimnisse oder vertraulichen Zugangsdaten auf gemeinsam genutzten Geräten ein.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Welchen Online-Encoder sollte ich wählen?',
          answer:
            'Verwenden Sie die Workbench für Base64, URL-Teile, Hex, Binär oder JSON-Strings; für Token empfiehlt sich der JWT-Decoder und für Markup-Sonderzeichen der HTML-Entity-Encoder.',
        },
        {
          question: 'Ist Kodierung dasselbe wie Verschlüsselung oder Hashing?',
          answer:
            'Nein. Kodierung ist umkehrbar und schützt keine Geheimnisse. Verschlüsselung nutzt Schlüssel für Vertraulichkeit, Hashing erzeugt einen Einweg-Prüfwert.',
        },
        {
          question: 'Werden meine Eingaben an einen Server hochgeladen?',
          answer:
            'Nein. Alle Umwandlungen erfolgen lokal in Ihrem Browser ohne Übertragung an einen Server.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: '¿Qué codificador en línea debo utilizar?',
          paragraphs: [
            'Utiliza el banco de trabajo de esta página para conversiones rápidas de Base64, componentes URL, hexadecimal, binario o cadenas JSON. Elige la representación que espera el sistema receptor o abre una herramienta dedicada si necesitas opciones avanzadas.',
          ],
          bullets: [
            'Base64 codifica y decodifica texto; Imagen a Base64 genera Data URI para imágenes.',
            'Codificador URL aplica codificación porcentual a URLs completas o parámetros individuales.',
            'Entidades HTML protege caracteres especiales en código HTML.',
            'Escapes Unicode y Escape JSON preparan secuencias válidas para código y cargas JSON.',
            'Decodificador JWT muestra cabecera y payload Base64url para depuración, pero decodificar no verifica la firma.',
          ],
        },
        {
          heading: 'Codificar no es cifrar ni calcular un hash',
          paragraphs: [
            'La codificación transforma la representación de un valor de forma reversible y no protege secretos. Para confidencialidad usa cifrado con clave, para autenticidad usa firmas o HMAC y para contraseñas emplea funciones lentas con sal.',
          ],
        },
        {
          heading: 'Procesamiento local en el navegador y privacidad',
          paragraphs: [
            'Estas utilidades se ejecutan en tu navegador actual con JavaScript y FileReader sin subir archivos a servidores externos. Evita pegar credenciales de producción en equipos compartidos.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Qué codificador en línea conviene usar según el caso?',
          answer:
            'Usa el banco principal para Base64, URL, hex, binario o JSON; usa Entidades HTML para HTML, Escapes Unicode para puntos de código y Decodificador JWT para inspeccionar tokens.',
        },
        {
          question: '¿La codificación equivale al cifrado o al hashing?',
          answer:
            'No. Codificar es reversible y no oculta información. El cifrado protege datos con clave y el hashing genera un resumen unidireccional.',
        },
        {
          question: '¿Estas herramientas envían mis datos a algún servidor?',
          answer:
            'No. Todas las transformaciones ocurren en el navegador del cliente sin enviar textos ni imágenes a una API.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Quel encodeur en ligne choisir ?',
          paragraphs: [
            'Utilisez l’atelier de cette page pour convertir rapidement en Base64, composant URL, hexadécimal, binaire ou chaîne JSON. Sélectionnez le format attendu par le système cible ou ouvrez un outil dédié pour des options spécifiques.',
          ],
          bullets: [
            'Base64 encode et décode du texte ; Image vers Base64 produit une Data URI.',
            'Encodeur URL applique l’encodage pourcent sur une URL complète ou un paramètre.',
            'Entités HTML protège les caractères spéciaux dans les documents HTML.',
            'Échappement Unicode et JSON préparent des chaînes valides pour le code et les API.',
            'Décodeur JWT inspecte l’en-tête et le payload Base64url, sans vérifier la signature cryptographique.',
          ],
        },
        {
          heading: 'L’encodage n’est ni du chiffrement ni du hachage',
          paragraphs: [
            'L’encodage est une représentation réversible et ne constitue pas un contrôle de sécurité. Utilisez le chiffrement pour la confidentialité, un HMAC ou une signature pour l’intégrité et un hachage lent salé pour les mots de passe.',
          ],
        },
        {
          heading: 'Traitement côté client et confidentialité',
          paragraphs: [
            'Ces outils fonctionnent localement dans votre navigateur via JavaScript et FileReader sans envoyer vos fichiers vers un serveur. Évitez toutefois de coller des secrets de production sur un poste partagé.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Quel encodeur en ligne dois-je utiliser ?',
          answer:
            'Utilisez cette page pour Base64, URL, hexadécimal, binaire et JSON ; ouvrez les outils dédiés pour les entités HTML, les séquences Unicode, les JWT ou les images.',
        },
        {
          question: 'L’encodage est-il identique au chiffrement ou au hachage ?',
          answer:
            'Non. L’encodage est réversible et n’assure aucune confidentialité, contrairement au chiffrement à clé ou au hachage à sens unique.',
        },
        {
          question: 'Mes données sont-elles envoyées sur un serveur ?',
          answer:
            'Non. Toutes les transformations sont exécutées localement dans votre navigateur.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Какой онлайн-кодировщик выбрать?',
          paragraphs: [
            'Используйте панель на этой странице для быстрого преобразования в Base64, URL-компоненты, шестнадцатеричный (HEX), двоичный формат или экранированные строки JSON. Выбирайте представление, которое ожидает целевая система, или откройте специализированный инструмент.',
          ],
          bullets: [
            'Base64 кодирует и декодирует текст; Image to Base64 формирует Data URI для изображений.',
            'URL Encoder выполняет процентное кодирование (RFC 3986 / WHATWG URL) для адресов и параметров.',
            'HTML Entity экранирует символы разметки для безопасного HTML.',
            'Unicode Escape и JSON String Escape работают с кодовыми точками и строками JSON.',
            'JWT Decoder отображает Base64url-заголовок и полезную нагрузку токена для отладки, но не проверяет подпись.',
          ],
        },
        {
          heading: 'Кодирование — это не шифрование и не хеширование',
          paragraphs: [
            'Кодирование обратимо и лишь меняет форму представления данных. Оно не скрывает секреты. Для конфиденциальности используйте шифрование с ключом, для проверки подлинности — HMAC или цифровую подпись, а для паролей — специализированные медленные KDF с солью.',
          ],
        },
        {
          heading: 'Локальная обработка в браузере',
          paragraphs: [
            'Все инструменты работают на стороне клиента через JavaScript и FileReader и не отправляют файлы на сервер. Не вставляйте боевые ключи и конфиденциальные токены на чужих устройствах.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Какой онлайн-кодировщик выбрать для моей задачи?',
          answer:
            'Панель на странице подходит для Base64, URL, HEX, двоичного кода и JSON-строк; для HTML-сущностей, Unicode и JWT используйте профильные инструменты категории.',
        },
        {
          question: 'Является ли кодирование шифрованием или хешированием?',
          answer:
            'Нет. Кодирование полностью обратимо и не защищает данные. Шифрование использует ключ для секретности, а хеширование формирует односторонний дайджест.',
        },
        {
          question: 'Отправляют ли эти инструменты данные на сервер?',
          answer:
            'Нет. Все преобразования выполняются в вашем браузере без передачи текста или изображений в API.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '应该使用哪种在线编码工具？',
          paragraphs: [
            '使用本页工作台可快速完成 Base64、URL 组件、十六进制（HEX）、二进制和 JSON 字符串转换。请根据接收系统的协议要求选择编码形式，需要特定选项时可打开对应的专用工具。',
          ],
          bullets: [
            'Base64 用于文本与 Base64 互转；图片转 Base64 可生成 Data URI。',
            'URL 编码器对完整 URL 或单个查询参数进行百分号编码。',
            'HTML 实体编码处理 HTML 源码中的保留字符。',
            'Unicode 转义和 JSON 字符串转义用于处理码点序列与 JSON 字符串内容。',
            'JWT 解码器用于调试查看 Base64url 头部和载荷，但解码本身不验证签名真伪。',
          ],
        },
        {
          heading: '编码不是加密，也不是哈希',
          paragraphs: [
            '编码只是改变数据的表示形式以便兼容软件还原，不具备任何保密性。需要保密请使用对称或非对称加密，需要完整性校验请使用 HMAC 或数字签名，存储密码则应使用加盐的慢速密钥派生函数。',
          ],
        },
        {
          heading: '浏览器本地处理与隐私边界',
          paragraphs: [
            '所有编码与解码均在当前浏览器中通过 JavaScript 和 FileReader 完成，不会上传输入文本或图片。请勿在公共设备上粘贴生产环境的密钥或敏感令牌。',
          ],
        },
      ],
      faqs: [
        {
          question: '不同场景该选哪个在线编码工具？',
          answer:
            'Base64、URL、十六进制、二进制和 JSON 字符串可直接使用本页工作台；HTML 实体、Unicode 码点、JWT 解析和图片 Data URI 可使用对应的专用工具。',
        },
        {
          question: '编码和加密或哈希是一样的吗？',
          answer:
            '不一样。编码是可逆的格式表示，不提供保密性；加密依赖密钥保护机密性，哈希则生成单向摘要。',
        },
        {
          question: '这些编码工具会上传我的输入吗？',
          answer:
            '不会。所有文本和图片转换都在浏览器本地完成，不会提交到后端服务器。',
        },
      ],
    },
  },
  formatters: {
    en: {
      answerSections: [
        {
          heading: 'Format for readability, minify for delivery',
          paragraphs: [
            'Code formatters restore consistent indentation, line breaks, and keyword casing for SQL, HTML, XML, CSS, and JavaScript so code reviews and debugging are faster. Minifiers strip insignificant whitespace and comments to shrink production asset payloads.',
          ],
          bullets: [
            'Beautify & inspect: pretty-print SQL queries, HTML markup, XML documents, JSON, Nginx/Apache configs, and GraphQL queries.',
            'Production minification: compress CSS, HTML, JavaScript, SQL, and SVG safely without altering runtime semantics.',
            'Client-side safety: formatting runs locally in the browser so proprietary queries and templates stay off third-party formatters.',
          ],
        },
        {
          heading: 'Watch out for parser dialects and whitespace rules',
          paragraphs: [
            'Formatting relies on grammar assumptions. SQL dialects vary in identifier quoting and window-function syntax, while HTML <pre> and <textarea> elements preserve whitespace that minifiers must leave intact. Always run your project test suite after minifying scripts or stylesheets.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does minifying CSS or JavaScript change how it executes?',
          answer:
            'Valid minification removes whitespace, newlines, and comments while preserving behavior. Always verify edge cases such as CSS calc() spacing or automatic semicolon insertion in JavaScript.',
        },
        {
          question: 'Which SQL dialects are supported by the SQL Formatter?',
          answer:
            'Standard ANSI SQL, PostgreSQL, MySQL, SQLite, and T-SQL keyword formatting and indentation are supported locally in your browser.',
        },
        {
          question: 'Are proprietary SQL queries or source files sent to a server?',
          answer:
            'No. Formatting and minification run entirely client-side inside your browser tab.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Okunabilirlik için biçimlendirin, yayın için küçültün',
          paragraphs: [
            'Kod biçimlendiriciler SQL, HTML, XML, CSS ve JavaScript dosyalarında tutarlı girinti, satır sonu ve anahtar sözcük düzeni sağlayarak hata ayıklamayı hızlandırır. Küçültücüler (minifier) ise gereksiz boşluk ve yorumları temizleyerek üretim paket boyutunu düşürür.',
          ],
          bullets: [
            'Düzenleme ve inceleme: SQL sorgularını, HTML/XML belgelerini, Nginx/Apache yapılandırmalarını ve GraphQL sorgularını okunaklı hale getirin.',
            'Üretim küçültme: CSS, HTML, JavaScript, SQL ve SVG kodlarını çalışma mantığını bozmadan sıkıştırın.',
            'Yerel gizlilik: Tüm biçimlendirme tarayıcınızda çalışır; kurumsal sorgularınız dış sunuculara gitmez.',
          ],
        },
        {
          heading: 'Sözdizimi lehçelerine ve boşluk kurallarına dikkat edin',
          paragraphs: [
            'Her dilin ayrıştırma kuralları farklıdır. SQL lehçeleri tırnaklama biçiminde ayrışır; HTML <pre> etiketleri ise boşlukları korur. Küçültme sonrası kodunuzu test ortamında mutlaka doğrulayın.',
          ],
        },
      ],
      faqs: [
        {
          question: 'CSS veya JavaScript küçültmek çalışma davranışını değiştirir mi?',
          answer:
            'Doğru küçültme yalnızca gereksiz boşlukları ve yorumları kaldırır; çalışma davranışını değiştirmez. Yine de CSS calc() boşlukları ve noktalı virgül kuralları için çıktıyı kontrol edin.',
        },
        {
          question: 'SQL Biçimlendirici hangi lehçeleri destekler?',
          answer:
            'Standart ANSI SQL, PostgreSQL, MySQL, SQLite ve T-SQL anahtar sözcükleri ile girintileme kuralları desteklenir.',
        },
        {
          question: 'Kurumsal SQL sorgularım sunucuya gönderilir mi?',
          answer:
            'Hayır. Tüm biçimlendirme ve küçültme işlemleri tarayıcınızda yerel olarak yapılır.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'Lesbar formatieren, schlank ausliefern',
          paragraphs: [
            'Code-Formatierer stellen einheitliche Einrückungen, Zeilenumbrüche und Schlüsselwörter für SQL, HTML, XML, CSS und JavaScript her. Minifier entfernen überflüssige Leerzeichen und Kommentare, um Produktions-Payloads zu verkleinern.',
          ],
          bullets: [
            'Formatieren & prüfen: SQL-Abfragen, HTML/XML-Dokumente, Nginx/Apache-Konfigurationen und GraphQL sauber einrücken.',
            'Produktions-Minifizierung: CSS, HTML, JavaScript, SQL und SVG ohne Funktionsänderung komprimieren.',
            'Lokale Verarbeitung: Interne Abfragen und Templates verlassen Ihren Browser nicht.',
          ],
        },
        {
          heading: 'Dialekte und Whitespace-Regeln beachten',
          paragraphs: [
            'Formatierer arbeiten grammatikbasiert. SQL-Dialekte unterscheiden sich bei Bezeichnern, und HTML-<pre>-Blöcke erfordern unveränderte Leerzeichen. Prüfen Sie minifizierte Assets stets mit Ihren Tests.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Ändert Minifizierung das Laufzeitverhalten von CSS oder JS?',
          answer:
            'Eine korrekte Minifizierung entfernt nur überflüssige Zeichen und Kommentare, während die Semantik erhalten bleibt.',
        },
        {
          question: 'Welche SQL-Dialekte unterstützt der SQL-Formatierer?',
          answer:
            'Unterstützt werden Standard-SQL, PostgreSQL, MySQL, SQLite und T-SQL direkt im Browser.',
        },
        {
          question: 'Werden vertrauliche SQL-Abfragen an einen Server gesendet?',
          answer:
            'Nein. Formatierung und Minifizierung erfolgen vollständig lokal im Browser.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Formatea para leer mejor, minifica para producción',
          paragraphs: [
            'Los formateadores unifican sangrías, saltos de línea y mayúsculas en SQL, HTML, XML, CSS y JavaScript para agilizar la depuración. Los minificadores eliminan espacios y comentarios prescindibles para reducir el tamaño en producción.',
          ],
          bullets: [
            'Embellecer e inspeccionar: ordena consultas SQL, HTML, XML, configuraciones Nginx/Apache y consultas GraphQL.',
            'Minificación segura: comprime CSS, HTML, JavaScript, SQL y SVG conservando la semántica.',
            'Privacidad local: tus consultas y plantillas se procesan sin salir del navegador.',
          ],
        },
        {
          heading: 'Ten en cuenta dialectos y reglas de espacios',
          paragraphs: [
            'Cada lenguaje tiene reglas específicas: los dialectos SQL varían al citar identificadores y los bloques HTML <pre> conservan los espacios. Ejecuta tus pruebas después de minificar.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Minificar CSS o JavaScript cambia su funcionamiento?',
          answer:
            'La minificación válida solo elimina espacios y comentarios sin alterar la ejecución. Conviene revisar casos como calc() en CSS.',
        },
        {
          question: '¿Qué dialectos SQL admite el formateador?',
          answer:
            'Admite ANSI SQL, PostgreSQL, MySQL, SQLite y T-SQL directamente en el navegador.',
        },
        {
          question: '¿Se envían mis consultas SQL o archivos a un servidor?',
          answer:
            'No. Todo el formateo y minificación ocurre localmente en tu navegador.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Formater pour la lisibilité, minifier pour la production',
          paragraphs: [
            'Les formateurs rétablissent une indentation cohérente et des retours à la ligne propres pour SQL, HTML, XML, CSS et JavaScript. Les minifieurs suppriment les espaces et commentaires superflus afin de réduire la taille des fichiers servis.',
          ],
          bullets: [
            'Embellir et relire : mettez en forme requêtes SQL, HTML, XML, configurations Nginx/Apache et requêtes GraphQL.',
            'Minification de production : compressez CSS, HTML, JavaScript, SQL et SVG sans modifier le comportement.',
            'Traitement local : vos requêtes internes restent strictement dans votre navigateur.',
          ],
        },
        {
          heading: 'Attention aux dialectes et aux espaces significatifs',
          paragraphs: [
            'Les formateurs s’appuient sur la grammaire du langage. Les dialectes SQL diffèrent sur les identifiants et les balises HTML <pre> préservent les espaces. Testez toujours vos fichiers après minification.',
          ],
        },
      ],
      faqs: [
        {
          question: 'La minification CSS ou JavaScript modifie-t-elle l’exécution ?',
          answer:
            'Une minification correcte supprime uniquement les espaces et commentaires inutiles tout en préservant le comportement.',
        },
        {
          question: 'Quels dialectes SQL sont pris en charge ?',
          answer:
            'ANSI SQL, PostgreSQL, MySQL, SQLite et T-SQL sont pris en charge localement dans le navigateur.',
        },
        {
          question: 'Mes requêtes SQL sont-elles envoyées sur un serveur ?',
          answer:
            'Non. Le formatage et la minification s’exécutent entièrement côté client.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Форматируйте для чтения, минифицируйте для продакшена',
          paragraphs: [
            'Форматировщики приводят отступы, переносы строк и регистр ключевых слов к единому стилю для SQL, HTML, XML, CSS и JavaScript. Минификаторы удаляют лишние пробелы и комментарии, уменьшая размер файлов для доставки пользователям.',
          ],
          bullets: [
            'Читаемость и отладка: приводите в порядок SQL-запросы, HTML/XML, конфигурации Nginx/Apache и GraphQL.',
            'Сжатие для продакшена: безопасно минифицируйте CSS, HTML, JavaScript, SQL и SVG.',
            'Конфиденциальность: код и внутренние запросы обрабатываются локально в браузере.',
          ],
        },
        {
          heading: 'Учитывайте диалекты и правила пробелов',
          paragraphs: [
            'Диалекты SQL различаются правилами экранирования имён, а в HTML теги <pre> сохраняют пробелы. После минификации всегда прогоняйте тесты приложения.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Меняет ли минификация CSS или JavaScript поведение кода?',
          answer:
            'Корректная минификация убирает только пробелы, переносы и комментарии, не затрагивая логику выполнения.',
        },
        {
          question: 'Какие диалекты SQL поддерживаются?',
          answer:
            'Поддерживаются ANSI SQL, PostgreSQL, MySQL, SQLite и T-SQL локально в браузере.',
        },
        {
          question: 'Отправляются ли мои SQL-запросы на сервер?',
          answer:
            'Нет. Форматирование и минификация выполняются полностью на стороне клиента.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '开发阶段美化排版，发布阶段压缩体积',
          paragraphs: [
            '代码格式化工具可为 SQL、HTML、XML、CSS 和 JavaScript 统一缩进、换行和关键字格式，提升代码审查与排错效率；压缩工具则去除多余空白与注释，减小生产环境资源体积。',
          ],
          bullets: [
            '代码美化：整理 SQL 查询、HTML/XML 文档、Nginx/Apache 配置和 GraphQL 语句。',
            '生产压缩：在不改变语义的前提下压缩 CSS、HTML、JavaScript、SQL 与 SVG。',
            '本地运行：所有处理都在浏览器端完成，业务 SQL 与源码不会上传至外部服务器。',
          ],
        },
        {
          heading: '留意方言差异与空白保留规则',
          paragraphs: [
            '不同 SQL 方言在标识符引号上存在差异，而 HTML 的 <pre> 标签需要保留原始空白字符。生产压缩后请运行测试验证效果。',
          ],
        },
      ],
      faqs: [
        {
          question: '压缩 CSS 或 JavaScript 会改变执行行为吗？',
          answer:
            '标准的压缩工具只移除空白和注释，不会改变运行结果；建议留意 CSS calc() 中的空格等边界情况。',
        },
        {
          question: 'SQL 格式化工具支持哪些数据库方言？',
          answer:
            '支持标准 ANSI SQL、PostgreSQL、MySQL、SQLite 和 T-SQL 的本地格式化。',
        },
        {
          question: '输入的 SQL 或源码会被发送到服务器吗？',
          answer:
            '不会。所有格式化和压缩操作均在您的浏览器本地执行。',
        },
      ],
    },
  },
  generators: {
    en: {
      answerSections: [
        {
          heading: 'Generate identifiers, passwords, assets, and scaffolding locally',
          paragraphs: [
            'Browser-based generators produce RFC-compliant UUID v4 and v7 identifiers, cryptographically random passwords, QR codes, SEO meta tags, CSS gradients, and container or CI templates using Web Crypto APIs instead of remote APIs.',
          ],
          bullets: [
            'Unique IDs & secrets: create UUID v4/v7, NanoID, ULID, and high-entropy passwords via crypto.getRandomValues().',
            'UI & SEO assets: build QR codes, CSS gradients, mesh backgrounds, Open Graph meta tags, and SVG placeholders.',
            'Project scaffolding: generate .gitignore files, Dockerfiles, Kubernetes manifests, Conventional Commits, and mock JSON datasets.',
          ],
        },
        {
          heading: 'Cryptographic randomness vs. deterministic output',
          paragraphs: [
            'Identifiers and passwords rely on the browser CSPRNG (crypto.getRandomValues / crypto.randomUUID) in secure contexts. Remember that UUID v7 encodes a millisecond timestamp in its leading 48 bits, so it exposes creation time and is never a substitute for an authorization token.',
          ],
        },
      ],
      faqs: [
        {
          question: 'When should I choose UUID v7 over UUID v4?',
          answer:
            'Choose UUID v4 for opaque random IDs. Choose UUID v7 (RFC 9562) when database primary keys benefit from chronological timestamp locality for B-tree index inserts.',
        },
        {
          question: 'Are generated passwords truly random?',
          answer:
            'Yes. Password and token generators use window.crypto.getRandomValues() with rejection sampling so character selection has no modulo bias and never leaves your browser.',
        },
        {
          question: 'Can I generate batches of IDs or mock records offline?',
          answer:
            'Yes. All generator logic runs locally in browser memory, supporting batch generation and file export without network requests.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Kimlik, parola, görsel ve şablonları tarayıcıda üretin',
          paragraphs: [
            'Tarayıcı tabanlı üreteçler; uzak bir API’ye bağlanmadan Web Crypto API kullanarak RFC uyumlu UUID v4/v7 kimlikleri, yüksek entropili parolalar, QR kodları, SEO meta etiketleri, CSS gradyanları ve proje şablonları oluşturur.',
          ],
          bullets: [
            'Benzersiz kimlikler ve parolalar: crypto.getRandomValues() ile UUID v4/v7, NanoID, ULID ve güçlü parolalar üretin.',
            'Arayüz ve SEO varlıkları: QR kod, CSS gradyan, Open Graph meta etiketi ve SVG yer tutucular hazırlayın.',
            'Proje başlangıç şablonları: .gitignore, Dockerfile, Kubernetes bildirimleri, Conventional Commits ve sahte test verileri oluşturun.',
          ],
        },
        {
          heading: 'Kriptografik rastgelelik ve belirlenebilir çıktılar',
          paragraphs: [
            'Kimlik ve parola üreteçleri tarayıcının CSPRNG kaynağını (crypto.getRandomValues) kullanır. UUID v7 ilk 48 bitinde milisaniye zaman damgası taşır; oluşturma zamanını açık ettiği için yetkilendirme belirteci olarak kullanılmamalıdır.',
          ],
        },
      ],
      faqs: [
        {
          question: 'UUID v4 yerine ne zaman UUID v7 seçmeliyim?',
          answer:
            'Rastgele ve zamansız kimlikler için UUID v4 kullanın. Veritabanı B-tree dizinlerinde sıralı yazma yerelliği gerektiğinde RFC 9562 UUID v7 tercih edin.',
        },
        {
          question: 'Üretilen parolalar gerçekten rastgele mi?',
          answer:
            'Evet. Parola üreteçleri modulo yanlılığı olmadan window.crypto.getRandomValues() kullanır ve parolalar tarayıcınızdan dışarı çıkmaz.',
        },
        {
          question: 'Toplu kimlik veya sahte test verisi çevrimdışı üretilebilir mi?',
          answer:
            'Evet. Tüm üretim mantığı tarayıcı belleğinde yerel olarak çalışır ve metin ya da JSON dosyası olarak indirilebilir.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'IDs, Passwörter, Assets und Templates lokal erzeugen',
          paragraphs: [
            'Browserbasierte Generatoren erstellen RFC-konforme UUID v4/v7, kryptografisch zufällige Passwörter, QR-Codes, SEO-Meta-Tags, CSS-Verläufe sowie Container- und CI-Vorlagen lokal über Web Crypto APIs.',
          ],
          bullets: [
            'Eindeutige IDs & Passwörter: UUID v4/v7, NanoID, ULID und sichere Passwörter mit crypto.getRandomValues().',
            'UI- & SEO-Assets: QR-Codes, CSS-Gradienten, Open-Graph-Tags und SVG-Platzhalter.',
            'Projekt-Scaffolding: .gitignore-Dateien, Dockerfiles, Kubernetes-Manifeste und Testdatensätze.',
          ],
        },
        {
          heading: 'Kryptografische Zufälligkeit vs. Zeitstempel-Struktur',
          paragraphs: [
            'Passwort- und ID-Generatoren nutzen den CSPRNG des Browsers. Beachten Sie, dass UUID v7 einen Millisekunden-Zeitstempel enthält und daher keine geheimen Zugriffstokens ersetzt.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Wann sollte ich UUID v7 statt UUID v4 verwenden?',
          answer:
            'UUID v4 eignet sich für zufällige IDs ohne Zeitbezug. UUID v7 (RFC 9562) verbessert durch den Zeitstempel-Präfix häufig die Index-Lokalität in Datenbanken.',
        },
        {
          question: 'Sind erzeugte Passwörter kryptografisch sicher?',
          answer:
            'Ja. Die Zeichenauswahl nutzt window.crypto.getRandomValues() ohne Modulo-Bias und verlässt den Browser nicht.',
        },
        {
          question: 'Kann ich ID-Batches oder Mock-Daten offline erzeugen?',
          answer:
            'Ja. Die gesamte Generierung läuft lokal im Arbeitsspeicher Ihres Browsers.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Genera identificadores, contraseñas y recursos localmente',
          paragraphs: [
            'Los generadores en el navegador producen UUID v4 y v7 conformes a RFC 9562, contraseñas aleatorias criptográficas, códigos QR, etiquetas meta SEO, degradados CSS y plantillas de infraestructura usando las APIs Web Crypto sin depender de servidores.',
          ],
          bullets: [
            'IDs y secretos: genera UUID v4/v7, NanoID, ULID y contraseñas seguras mediante crypto.getRandomValues().',
            'Recursos web y UI: crea códigos QR, degradados CSS, etiquetas Open Graph y marcadores SVG.',
            'Plantillas de proyecto: genera archivos .gitignore, Dockerfiles, manifiestos Kubernetes y datos JSON de prueba.',
          ],
        },
        {
          heading: 'Aleatoriedad criptográfica frente a marca temporal',
          paragraphs: [
            'Las contraseñas e identificadores se apoyan en el CSPRNG del navegador. Recuerda que UUID v7 codifica la marca de tiempo en sus primeros 48 bits, por lo que nunca debe utilizarse como token de autorización.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Cuándo conviene elegir UUID v7 frente a UUID v4?',
          answer:
            'Usa UUID v4 para identificadores opacos aleatorios y UUID v7 (RFC 9562) cuando necesites orden cronológico aproximado para índices de base de datos.',
        },
        {
          question: '¿Son realmente aleatorias las contraseñas generadas?',
          answer:
            'Sí. Utilizan window.crypto.getRandomValues() con muestreo sin sesgo y nunca salen de tu navegador.',
        },
        {
          question: '¿Se pueden generar lotes de IDs o datos de prueba sin conexión?',
          answer:
            'Sí. Toda la generación se ejecuta localmente en la memoria del navegador.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Générer identifiants, mots de passe et ressources localement',
          paragraphs: [
            'Les générateurs du navigateur produisent des UUID v4/v7 conformes à la RFC 9562, des mots de passe aléatoires cryptographiques, des QR codes, des balises meta SEO, des dégradés CSS et des modèles de configuration via les API Web Crypto.',
          ],
          bullets: [
            'Identifiants et secrets : générez UUID v4/v7, NanoID, ULID et mots de passe forts via crypto.getRandomValues().',
            'Ressources UI & SEO : créez des QR codes, dégradés CSS, balises Open Graph et SVG.',
            'Gabarits de projet : produisez fichiers .gitignore, Dockerfiles, manifestes Kubernetes et jeux de test.',
          ],
        },
        {
          heading: 'Aléa cryptographique et structure temporelle',
          paragraphs: [
            'Les générateurs s’appuient sur le CSPRNG du navigateur. Notez qu’un UUID v7 expose un horodatage en millisecondes dans ses 48 premiers bits et ne doit jamais servir de jeton secret.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Quand choisir UUID v7 plutôt que UUID v4 ?',
          answer:
            'Choisissez UUID v4 pour des identifiants purement aléatoires et UUID v7 (RFC 9562) lorsque la localité temporelle améliore l’indexation en base de données.',
        },
        {
          question: 'Les mots de passe générés sont-ils vraiment aléatoires ?',
          answer:
            'Oui. Ils reposent sur window.crypto.getRandomValues() sans biais modulo et restent dans votre navigateur.',
        },
        {
          question: 'Puis-je générer des lots d’IDs hors ligne ?',
          answer:
            'Oui. Tous les générateurs fonctionnent localement dans la mémoire du navigateur.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Локальная генерация идентификаторов, паролей и шаблонов',
          paragraphs: [
            'Браузерные генераторы создают UUID v4 и v7 по RFC 9562, криптостойкие пароли, QR-коды, SEO-метатеги, CSS-градиенты и шаблоны инфраструктуры с помощью Web Crypto API без обращения к внешним серверам.',
          ],
          bullets: [
            'Идентификаторы и пароли: UUID v4/v7, NanoID, ULID и сложные пароли через crypto.getRandomValues().',
            'UI и SEO: QR-коды, CSS-градиенты, теги Open Graph и SVG-заглушки.',
            'Шаблоны проектов: .gitignore, Dockerfile, манифесты Kubernetes и тестовые JSON-данные.',
          ],
        },
        {
          heading: 'Криптографическая случайность и временные метки',
          paragraphs: [
            'Для генерации паролей и ID используется криптографический ГПСЧ браузера. Помните, что UUID v7 содержит метку времени в первых 48 битах и не должен заменять секретные токены доступа.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Когда лучше выбрать UUID v7 вместо UUID v4?',
          answer:
            'UUID v4 подходит для случайных непрозрачных ID, а UUID v7 (RFC 9562) полезен для первичных ключей БД, где важна хронологическая локальность вставки.',
        },
        {
          question: 'Являются ли сгенерированные пароли по-настоящему случайными?',
          answer:
            'Да. Используется window.crypto.getRandomValues() без смещения по модулю, а сами пароли не покидают браузер.',
        },
        {
          question: 'Можно ли генерировать пакеты ID без доступа к сети?',
          answer:
            'Да. Вся логика работает локально в памяти вашего браузера.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '在本地安全生成标识符、密码与工程模板',
          paragraphs: [
            '浏览器端生成器调用 Web Crypto API，在本地生成符合 RFC 9562 的 UUID v4/v7、高熵随机密码、二维码、SEO Meta 标签、CSS 渐变以及容器与 CI 配置模板，全程无需远程接口。',
          ],
          bullets: [
            '唯一 ID 与密钥：基于 crypto.getRandomValues() 生成 UUID v4/v7、NanoID、ULID 和强密码。',
            'UI 与 SEO 资源：生成二维码、CSS 渐变、Open Graph 元标签和 SVG 占位图。',
            '工程脚手架：快速生成 .gitignore、Dockerfile、Kubernetes 清单与模拟 JSON 测试数据。',
          ],
        },
        {
          heading: '密码学随机性与时间戳结构',
          paragraphs: [
            '密码和唯一标识均使用浏览器的密码学安全随机数生成器。需要注意 UUID v7 前 48 位包含毫秒级时间戳，因此不能替代鉴权密钥或安全令牌。',
          ],
        },
      ],
      faqs: [
        {
          question: '什么时候应该选择 UUID v7 而不是 UUID v4？',
          answer:
            '需要纯随机无序标识时使用 UUID v4；当数据库主键需要按创建时间顺序聚集以优化 B-tree 索引写入性能时，适合使用 UUID v7（RFC 9562）。',
        },
        {
          question: '生成的密码是真正随机的吗？',
          answer:
            '是的。密码生成器使用 window.crypto.getRandomValues() 并消除取模偏差，结果完全保留在浏览器本地。',
        },
        {
          question: '可以离线批量生成 ID 或测试数据吗？',
          answer:
            '可以。所有生成逻辑均在浏览器内存中运行，无需网络请求。',
        },
      ],
    },
  },
  json: {
    en: {
      answerSections: [
        {
          heading: 'Format, validate, query, and transform JSON safely',
          paragraphs: [
            'Work with RFC 8259 JSON documents entirely in your browser: pretty-print or minify payloads, pinpoint syntax errors, validate structures against JSON Schema, evaluate JSONPath and RFC 6901 JSON Pointers, diff documents, and generate typed models.',
          ],
          bullets: [
            'Formatting & validation: inspect indentation, trailing-comma mistakes, and schema compliance before shipping API contracts.',
            'Querying & diffing: extract nested fields with JSONPath (RFC 9535) or JSON Pointer (RFC 6901), flatten objects, and compare payloads.',
            'Interchange & codegen: convert JSON to CSV, YAML, TypeScript interfaces, Zod schemas, or SQL tables locally.',
          ],
        },
        {
          heading: 'Common JSON pitfalls in production APIs',
          paragraphs: [
            'JSON requires double-quoted property names, rejects trailing commas and comments, and represents numbers without an integer/float distinction—meaning 64-bit IDs above 9,007,199,254,740,991 lose precision in standard JavaScript JSON.parse unless serialized as strings.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Why does valid JavaScript object syntax sometimes fail JSON validation?',
          answer:
            'RFC 8259 JSON is stricter than JavaScript object literals: keys must use double quotes, trailing commas and comments are forbidden, and single-quoted strings are invalid.',
        },
        {
          question: 'What is the difference between JSONPath and JSON Pointer?',
          answer:
            'JSON Pointer (RFC 6901, e.g. /users/0/name) targets one exact location in a document, whereas JSONPath (RFC 9535, e.g. $.users[*].name) queries and filters multiple matching nodes.',
        },
        {
          question: 'Does validating or formatting JSON send my payload to a server?',
          answer:
            'No. Parsing, schema validation, diffing, and code generation execute locally in your browser tab.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'JSON verilerini tarayıcıda biçimlendirin, doğrulayın ve sorgulayın',
          paragraphs: [
            'RFC 8259 uyumlu JSON belgelerini tamamen tarayıcınızda işleyin: yükleri girintileyin veya küçültün, sözdizimi hatalarını bulun, JSON Schema kurallarıyla doğrulayın, JSONPath ve RFC 6901 JSON Pointer ifadelerini test edin ve tip tanımları üretin.',
          ],
          bullets: [
            'Biçimlendirme ve doğrulama: girinti düzenini, sondaki virgül hatalarını ve JSON Schema uyumluluğunu hızlıca denetleyin.',
            'Sorgulama ve karşılaştırma: JSONPath (RFC 9535) veya JSON Pointer (RFC 6901) ile iç içe alanları çekin ve iki yükü karşılaştırın.',
            'Dönüşüm ve kod üretimi: JSON verisini yerel olarak CSV, YAML, TypeScript arayüzü veya Zod şemasına çevirin.',
          ],
        },
        {
          heading: 'API’lerde sık karşılaşılan JSON tuzakları',
          paragraphs: [
            'JSON çift tırnaklı anahtar gerektirir; yorum satırlarını ve sondaki virgülleri kabul etmez. Ayrıca standart JavaScript JSON.parse işlemi 2^53 - 1 üzerindeki 64-bit tamsayı kimliklerde duyarlılık kaybına yol açar; bu nedenle büyük ID’ler metin olarak taşınmalıdır.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Geçerli bir JavaScript nesnesi neden JSON doğrulamasından geçemeyebilir?',
          answer:
            'RFC 8259 JSON sözdizimi JavaScript nesnelerinden daha katıdır: anahtarlar çift tırnak içinde olmalı, sondaki virgüller ve yorumlar bulunmamalıdır.',
        },
        {
          question: 'JSONPath ile JSON Pointer arasındaki fark nedir?',
          answer:
            'JSON Pointer (RFC 6901, ör. /users/0/name) belgede tek bir kesin konumu hedefler; JSONPath (RFC 9535, ör. $.users[*].name) ise birden fazla eşleşen düğümü sorgular ve filtreler.',
        },
        {
          question: 'JSON doğrulama veya biçimlendirme verilerimi sunucuya yükler mi?',
          answer:
            'Hayır. Ayrıştırma, şema doğrulama, karşılaştırma ve kod üretimi tamamen tarayıcınızda yerel olarak çalışır.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'JSON sicher formatieren, validieren und abfragen',
          paragraphs: [
            'Bearbeiten Sie RFC-8259-JSON-Dokumente lokal im Browser: Payloads einrücken oder minifizieren, Syntaxfehler lokalisieren, gegen JSON Schema prüfen, JSONPath sowie JSON Pointer auswerten und Typdefinitionen ableiten.',
          ],
          bullets: [
            'Formatierung & Prüfung: Einrückung, fehlende Anführungszeichen, nachgestellte Kommas und Schema-Regeln sofort prüfen.',
            'Abfrage & Vergleich: Werte mit JSONPath (RFC 9535) oder JSON Pointer (RFC 6901) extrahieren und Payloads vergleichen.',
            'Konvertierung & Codegen: JSON lokal in CSV, YAML, TypeScript-Interfaces oder Zod-Schemas überführen.',
          ],
        },
        {
          heading: 'Typische JSON-Fallstricke in APIs',
          paragraphs: [
            'JSON verlangt doppelte Anführungszeichen und verbietet Kommentare sowie abschließende Kommas. Zudem verlieren 64-Bit-Ganzzahlen oberhalb von 2^53 - 1 in JavaScript JSON.parse an Genauigkeit, wenn sie nicht als Strings übertragen werden.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Warum scheitert gültige JS-Objektsyntax bei der JSON-Validierung?',
          answer:
            'RFC 8259 erlaubt weder einfache Anführungszeichen noch Kommentare oder nachgestellte Kommas und schreibt doppelte Anführungszeichen für Schlüssel vor.',
        },
        {
          question: 'Worin unterscheiden sich JSONPath und JSON Pointer?',
          answer:
            'JSON Pointer (RFC 6901) adressiert genau einen Pfad wie /users/0/name, während JSONPath (RFC 9535) mehrere Knoten mit Platzhaltern und Filtern abfragt.',
        },
        {
          question: 'Werden meine JSON-Payloads an einen Server übertragen?',
          answer:
            'Nein. Alle JSON-Werkzeuge arbeiten vollständig lokal in Ihrem Browser.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Formatea, valida, consulta y transforma JSON de forma segura',
          paragraphs: [
            'Trabaja con documentos JSON RFC 8259 íntegramente en tu navegador: indenta o minifica cargas útiles, localiza errores de sintaxis, valida contra JSON Schema, evalúa JSONPath y JSON Pointer y genera interfaces tipadas.',
          ],
          bullets: [
            'Formato y validación: detecta comas finales, comillas simples y fallos frente a JSON Schema.',
            'Consulta y comparación: extrae nodos con JSONPath (RFC 9535) o JSON Pointer (RFC 6901) y compara documentos.',
            'Conversión local: transforma JSON a CSV, YAML, TypeScript o Zod sin salir del navegador.',
          ],
        },
        {
          heading: 'Errores habituales con JSON en APIs',
          paragraphs: [
            'JSON exige comillas dobles y prohíbe comentarios o comas finales. Además, los enteros de 64 bits superiores a 2^53 - 1 pierden precisión en JSON.parse estándar de JavaScript si no se serializan como cadenas.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Por qué un objeto JavaScript válido puede fallar al validarlo como JSON?',
          answer:
            'RFC 8259 exige claves con comillas dobles y prohíbe comas finales, comentarios y comillas simples.',
        },
        {
          question: '¿Qué diferencia hay entre JSONPath y JSON Pointer?',
          answer:
            'JSON Pointer (RFC 6901) apunta a una única ubicación exacta (/users/0/name), mientras que JSONPath (RFC 9535) consulta y filtra múltiples nodos.',
        },
        {
          question: '¿Se envían mis documentos JSON a algún servidor?',
          answer:
            'No. El análisis, la validación y la generación de código se ejecutan en tu navegador.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Formater, valider, interroger et transformer du JSON localement',
          paragraphs: [
            'Manipulez des documents JSON conformes à la RFC 8259 dans votre navigateur : indentez ou minifiez les charges utiles, repérez les erreurs de syntaxe, validez avec JSON Schema, évaluez JSONPath ou JSON Pointer et générez des types.',
          ],
          bullets: [
            'Formatage et validation : détectez virgules finales, guillemets simples et écarts par rapport au schéma.',
            'Requêtage et diff : extrayez des valeurs avec JSONPath (RFC 9535) ou JSON Pointer (RFC 6901).',
            'Conversion locale : exportez vers CSV, YAML, TypeScript ou Zod sans transfert serveur.',
          ],
        },
        {
          heading: 'Pièges courants du JSON en production',
          paragraphs: [
            'Le format JSON impose des guillemets doubles et interdit commentaires et virgules finales. En JavaScript, les entiers 64 bits au-delà de 2^53 - 1 perdent en précision dans JSON.parse s’ils ne sont pas transmis comme chaînes.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Pourquoi un objet JavaScript valide échoue-t-il parfois en JSON ?',
          answer:
            'La RFC 8259 impose des guillemets doubles pour les clés et interdit commentaires, guillemets simples et virgules finales.',
        },
        {
          question: 'Quelle est la différence entre JSONPath et JSON Pointer ?',
          answer:
            'JSON Pointer (RFC 6901) désigne un emplacement unique (/users/0/name), tandis que JSONPath (RFC 9535) interroge plusieurs nœuds avec filtres et jokers.',
        },
        {
          question: 'Mes données JSON sont-elles envoyées sur un serveur ?',
          answer:
            'Non. L’analyse, la validation de schéma et la génération de code s’effectuent localement.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Форматирование, валидация и запросы JSON в браузере',
          paragraphs: [
            'Работайте с документами JSON (RFC 8259) полностью локально: форматируйте и сжимайте данные, находите синтаксические ошибки, проверяйте по JSON Schema, выполняйте запросы JSONPath и JSON Pointer и генерируйте типы.',
          ],
          bullets: [
            'Форматирование и проверка: поиск лишних запятых, неверных кавычек и нарушений JSON Schema.',
            'Выборка и сравнение: извлечение узлов через JSONPath (RFC 9535) или JSON Pointer (RFC 6901) и сравнение версий.',
            'Конвертация и кодогенерация: перевод в CSV, YAML, TypeScript и Zod локально.',
          ],
        },
        {
          heading: 'Частые ошибки при работе с JSON в API',
          paragraphs: [
            'Стандарт JSON требует двойных кавычек и запрещает комментарии с висячими запятыми. В JavaScript 64-битные целые числа больше 2^53 - 1 теряют точность при JSON.parse, если не передаются как строки.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Почему корректный объект JavaScript может не пройти проверку JSON?',
          answer:
            'RFC 8259 строже литералов JS: ключи обязаны быть в двойных кавычках, а комментарии и запятые в конце списка запрещены.',
        },
        {
          question: 'Чем отличается JSONPath от JSON Pointer?',
          answer:
            'JSON Pointer (RFC 6901) указывает на один точный путь (/users/0/name), а JSONPath (RFC 9535) позволяет искать и фильтровать множество узлов.',
        },
        {
          question: 'Отправляются ли JSON-данные на внешний сервер?',
          answer:
            'Нет. Парсинг, валидация схем и генерация кода выполняются исключительно в браузере.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '在浏览器中安全地格式化、校验与查询 JSON',
          paragraphs: [
            '在本地完整处理符合 RFC 8259 标准的 JSON 文档：支持美化缩进或压缩、精确定位语法错误、依据 JSON Schema 校验数据结构、运行 JSONPath 与 JSON Pointer 查询，以及生成类型定义。',
          ],
          bullets: [
            '格式化与校验：快速发现尾随逗号、单引号和 Schema 约束错误。',
            '查询与对比：使用 JSONPath（RFC 9535）或 JSON Pointer（RFC 6901）提取嵌套字段并比对差异。',
            '本地转换与代码生成：将 JSON 转为 CSV、YAML、TypeScript 接口或 Zod Schema。',
          ],
        },
        {
          heading: '生产环境 API 中常见的 JSON 陷阱',
          paragraphs: [
            'JSON 要求属性名必须使用双引号，不允许注释或尾随逗号；同时在浏览器 JavaScript 的 JSON.parse 中，超过 2^53 - 1 的 64 位整数会产生精度丢失，大整数 ID 通常应序列化为字符串。',
          ],
        },
      ],
      faqs: [
        {
          question: '为什么合法的 JavaScript 对象字面量有时无法通过 JSON 校验？',
          answer:
            'RFC 8259 对 JSON 语法更严格：键名必须使用双引号，且禁止出现单引号字符串、注释或尾随逗号。',
        },
        {
          question: 'JSONPath 和 JSON Pointer 有什么区别？',
          answer:
            'JSON Pointer（RFC 6901，如 /users/0/name）精准定位单个节点，而 JSONPath（RFC 9535，如 $.users[*].name）支持通配符和条件过滤以查询多个节点。',
        },
        {
          question: '校验或格式化 JSON 会上传我的数据吗？',
          answer:
            '不会。解析、Schema 校验、差异对比和代码生成全部在浏览器本地完成。',
        },
      ],
    },
  },
  text: {
    en: {
      answerSections: [
        {
          heading: 'Test regular expressions, diff text, and clean strings locally',
          paragraphs: [
            'Analyze and transform text without installing CLI scripts or uploading logs. Debug JavaScript regular expressions with live capture groups, compare two revisions line-by-line, convert identifier casing, count words and characters, deduplicate lists, and preview Markdown.',
          ],
          bullets: [
            'Pattern matching & escaping: test ECMAScript RegExp flags and capture groups, or escape literal strings for new RegExp().',
            'Comparison & cleanup: diff config files, remove duplicate lines, sort entries, and normalize whitespace or line endings.',
            'Authoring & identifiers: convert camelCase, snake_case, and kebab-case, build URL slugs, and preview rendered Markdown.',
          ],
        },
        {
          heading: 'Avoid catastrophic backtracking and Unicode surprises',
          paragraphs: [
            'Nested quantifiers such as (a+)+ can cause catastrophic backtracking in backtracking RegExp engines—test untrusted patterns carefully and prefer bounded quantifiers. When counting characters or slicing text, note that JavaScript string length counts UTF-16 code units rather than user-perceived grapheme clusters.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Which regex flavor does the Regex Tester use?',
          answer:
            'It uses the browser’s native ECMAScript RegExp engine, supporting standard flags such as g, i, m, s, u, and d with real-time match and capture-group highlighting.',
        },
        {
          question: 'Why does word or character count sometimes differ from JavaScript string length?',
          answer:
            'JavaScript string.length counts UTF-16 code units, where emoji and some characters take two units. Grapheme-aware counting treats each visible character as one unit.',
        },
        {
          question: 'Is text pasted into the diff or regex tools stored anywhere?',
          answer:
            'No. All text comparisons, regex evaluations, and line operations run locally in browser memory.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Düzenli ifadeleri test edin, metinleri karşılaştırın ve temizleyin',
          paragraphs: [
            'Kayıtları veya kod parçalarını sunucuya göndermeden tarayıcıda işleyin: yakalama gruplarıyla düzenli ifadeleri (regex) deneyin, iki metni satır satır karşılaştırın, büyük/küçük harf ve adlandırma biçimlerini dönüştürün, tekrarlayan satırları temizleyin ve Markdown önizleyin.',
          ],
          bullets: [
            'Desen eşleme ve kaçış: ECMAScript RegExp bayraklarını test edin veya düz metni new RegExp() için güvenli hale getirin.',
            'Karşılaştırma ve temizleme: metin farklarını (diff) görün, yinelenen satırları silin ve satırları sıralayın.',
            'Biçim ve yazım araçları: camelCase, snake_case, URL slug üretimi ve kelime/karakter sayımı yapın.',
          ],
        },
        {
          heading: 'Geri izleme (backtracking) ve Unicode farklarına dikkat edin',
          paragraphs: [
            '(a+)+ gibi iç içe niceleyiciler büyük girdilerde aşırı geri izlemeye yol açabilir. Ayrıca JavaScript metin uzunluğu Unicode grafem kümeleri yerine UTF-16 kod birimlerini sayar; emojiler 2 birim görünebilir.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Regex Test Aracı hangi düzenli ifade motorunu kullanır?',
          answer:
            'Tarayıcının yerel ECMAScript RegExp motorunu kullanır ve g, i, m, s, u gibi standart bayrakları gerçek zamanlı destekler.',
        },
        {
          question: 'Karakter sayısı neden bazen JavaScript string.length değerinden farklı çıkar?',
          answer:
            'JavaScript string.length UTF-16 kod birimlerini sayar; emojiler iki birim kaplayabilir. Grafem odaklı sayım ise görünür her karakteri tek bir birim olarak sayar.',
        },
        {
          question: 'Metin karşılaştırma veya regex araçlarına yapıştırdığım veriler kaydedilir mi?',
          answer:
            'Hayır. Tüm metin işlemleri tarayıcınızda yerel bellek üzerinde çalışır ve kaydedilmez.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'Reguläre Ausdrücke testen, Texte vergleichen und bereinigen',
          paragraphs: [
            'Analysieren und transformieren Sie Text direkt im Browser: Testen Sie JavaScript-RegExp mit Capture-Gruppen, vergleichen Sie zwei Textstände zeilenweise, wandeln Sie Schreibweisen um, entfernen Sie Duplikate und prüfen Sie Markdown.',
          ],
          bullets: [
            'Musterprüfung & Escaping: ECMAScript-RegExp-Flags testen oder Literale sicher für new RegExp() maskieren.',
            'Diff & Bereinigung: Konfigurationsdateien abgleichen, doppelte Zeilen entfernen und Listen sortieren.',
            'Schreibweisen & Zählung: camelCase, snake_case, URL-Slugs sowie Wort- und Zeichenzahlen berechnen.',
          ],
        },
        {
          heading: 'Backtracking und Unicode-Längen beachten',
          paragraphs: [
            'Verschachtelte Quantoren wie (a+)+ können katastrophales Backtracking auslösen. Zudem misst JavaScript String.length UTF-16-Codeeinheiten statt sichtbarer Graphem-Cluster.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Welche Regex-Engine verwendet der Regex-Tester?',
          answer:
            'Das Werkzeug nutzt die native ECMAScript-RegExp-Engine des Browsers inklusive Flags wie g, i, m, s und u.',
        },
        {
          question: 'Warum unterscheidet sich die Zeichenzahl manchmal von string.length?',
          answer:
            'string.length zählt UTF-16-Einheiten (Emojis belegen meist zwei Einheiten), während Graphem-Zählung jedes sichtbare Zeichen einzeln erfasst.',
        },
        {
          question: 'Werden Texte aus Diff- oder Regex-Tools gespeichert?',
          answer:
            'Nein. Alle Textoperationen laufen ausschließlich lokal im Arbeitsspeicher Ihres Browsers.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Prueba expresiones regulares, compara textos y limpia cadenas',
          paragraphs: [
            'Analiza y transforma texto sin subir registros a servidores externos: depura expresiones regulares de JavaScript con grupos de captura, compara revisiones línea por línea, convierte mayúsculas o estilos de nomenclatura y previsualiza Markdown.',
          ],
          bullets: [
            'Patrones y escape: prueba banderas ECMAScript RegExp o escapa texto literal para new RegExp().',
            'Comparación y limpieza: revisa diferencias, elimina líneas duplicadas y ordena listas.',
            'Estilos y conteo: convierte entre camelCase, snake_case, slugs URL y cuenta palabras o caracteres.',
          ],
        },
        {
          heading: 'Evita retrocesos excesivos y sorpresas con Unicode',
          paragraphs: [
            'Cuantificadores anidados como (a+)+ pueden provocar retrocesos costosos en motores RegExp. Además, string.length en JavaScript cuenta unidades UTF-16 en lugar de grafemas visibles.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Qué motor utiliza el probador de expresiones regulares?',
          answer:
            'Utiliza el motor nativo ECMAScript RegExp del navegador con soporte para banderas g, i, m, s y u.',
        },
        {
          question: '¿Por qué el conteo de caracteres difiere a veces de string.length?',
          answer:
            'string.length mide unidades de código UTF-16 (donde un emoji suele contar como dos), mientras que el conteo por grafemas cuenta caracteres visibles.',
        },
        {
          question: '¿Se almacena el texto introducido en estas herramientas?',
          answer:
            'No. Todas las operaciones de texto se ejecutan localmente en el navegador.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Tester des regex, comparer et nettoyer du texte localement',
          paragraphs: [
            'Analysez et transformez du texte dans votre navigateur : déboguez des expressions régulières JavaScript avec groupes de capture, comparez deux versions ligne par ligne, convertissez la casse, dédupliquez des listes et prévisualisez le Markdown.',
          ],
          bullets: [
            'Motifs et échappement : testez les drapeaux ECMAScript RegExp ou échappez une chaîne pour new RegExp().',
            'Diff et nettoyage : comparez des fichiers, supprimez les doublons et triez des lignes.',
            'Casse et comptage : passez de camelCase à snake_case, générez des slugs et comptez mots ou caractères.',
          ],
        },
        {
          heading: 'Attention au backtracking et aux unités Unicode',
          paragraphs: [
            'Les quantificateurs imbriqués tels que (a+)+ peuvent provoquer un backtracking catastrophique. De plus, string.length en JavaScript compte les unités UTF-16 plutôt que les graphèmes visibles.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Quel moteur utilise le testeur de regex ?',
          answer:
            'Il s’appuie sur le moteur natif ECMAScript RegExp du navigateur avec prise en charge des drapeaux g, i, m, s et u.',
        },
        {
          question: 'Pourquoi le nombre de caractères diffère-t-il parfois de string.length ?',
          answer:
            'string.length compte les unités UTF-16 (un emoji en prend souvent deux), alors que le comptage par graphèmes reflète les caractères visibles.',
        },
        {
          question: 'Le texte collé dans les outils de diff ou regex est-il conservé ?',
          answer:
            'Non. Tout le traitement de texte s’effectue localement dans la mémoire du navigateur.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Тестирование регулярных выражений, сравнение и обработка текста',
          paragraphs: [
            'Обрабатывайте тексты локально в браузере: проверяйте регулярные выражения JavaScript с группами захвата, сравнивайте два текста построчно (diff), меняйте регистр и стиль имён, удаляйте дубликаты строк и просматривайте Markdown.',
          ],
          bullets: [
            'Шаблоны и экранирование: отладка флагов ECMAScript RegExp и экранирование строк для new RegExp().',
            'Сравнение и очистка: поиск различий, удаление дубликатов и сортировка списков.',
            'Регистр и подсчёт: преобразование camelCase/snake_case, генерация URL-slug и точный подсчёт слов и символов.',
          ],
        },
        {
          heading: 'Остерегайтесь катастрофического отката и особенностей Unicode',
          paragraphs: [
            'Вложенные квантификаторы вида (a+)+ могут вызывать резкое замедление при сопоставлении. Также помните, что свойство string.length в JavaScript считает единицы UTF-16, а не видимые графемы.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Какой движок регулярных выражений используется в тестере?',
          answer:
            'Используется встроенный движок ECMAScript RegExp браузера с поддержкой флагов g, i, m, s, u и выделением групп.',
        },
        {
          question: 'Почему количество символов иногда отличается от string.length?',
          answer:
            'В JavaScript string.length считает 16-битные кодовые единицы UTF-16 (эмодзи занимают две), тогда как подсчёт по графемам отражает видимые символы.',
        },
        {
          question: 'Сохраняются ли тексты из инструментов сравнения на сервере?',
          answer:
            'Нет. Все операции со строками выполняются локально в памяти браузера.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '在本地调试正则表达式、对比文本差异与清洗字符串',
          paragraphs: [
            '无需上传日志或编写临时脚本即可在浏览器中处理文本：实时测试带捕获组的 JavaScript 正则表达式、逐行比对两段文本差异、转换命名风格、统计字数与行数、去重排序并预览 Markdown。',
          ],
          bullets: [
            '模式匹配与转义：测试 ECMAScript RegExp 标志位，或将字面量文本安全转义供 new RegExp() 使用。',
            '差异对比与清洗：逐行 diff 配置文件、去除重复行、排序并规范化空白符。',
            '命名与排版：转换 camelCase、snake_case 与 kebab-case，生成 URL Slug 并实时预览 Markdown。',
          ],
        },
        {
          heading: '注意正则回溯与 Unicode 字符长度差异',
          paragraphs: [
            '类似 (a+)+ 的嵌套量词容易引发灾难性回溯；另外 JavaScript 的 string.length 统计的是 UTF-16 码元而非视觉上的字素簇（例如表情符号占 2 个码元）。',
          ],
        },
      ],
      faqs: [
        {
          question: '正则测试工具使用的是哪种正则引擎？',
          answer:
            '使用浏览器原生的 ECMAScript RegExp 引擎，支持 g、i、m、s、u 等标准标志位及捕获组高亮。',
        },
        {
          question: '为什么统计的字符数有时与 JavaScript string.length 不一致？',
          answer:
            'JavaScript 的 string.length 按 UTF-16 码元计数，表情符号等辅助平面字符会占两个码元，而按字素统计时每个可见字符计为 1。',
        },
        {
          question: '粘贴到文本对比或正则工具中的内容会被保存吗？',
          answer:
            '不会。所有文本对比、正则匹配与格式化都在浏览器内存中本地完成。',
        },
      ],
    },
  },
  utilities: {
    en: {
      answerSections: [
        {
          heading: 'Inspect HTTP, network, scheduling, and browser utilities locally',
          paragraphs: [
            'Developer Utilities bundle everyday protocol, networking, and ops calculators in one place: parse cron schedules, analyze HTTP headers and Cache-Control directives, compose Content-Security-Policy headers, calculate IPv4/IPv6 CIDR subnets, convert Unix chmod permissions, and inspect cURL requests.',
          ],
          bullets: [
            'HTTP & security headers: parse raw headers, check status codes, build CSP policies, and validate Cache-Control directives.',
            'Requests & client diagnostics: convert cURL to Fetch without executing network calls and parse User-Agent strings.',
            'Infrastructure & networking: calculate IPv4/IPv6 CIDR ranges, explain cron expressions, and compute octal/symbolic chmod modes.',
          ],
        },
        {
          heading: 'Static inspection without live network side effects',
          paragraphs: [
            'Tools such as cURL to Fetch, HTTP Headers Parser, Cache-Control Builder, and CSP Analyzer parse syntax locally without issuing outbound HTTP requests to target endpoints. Always redact Authorization headers and session cookies before sharing generated snippets.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Does the cURL converter execute the command against the target URL?',
          answer:
            'No. It parses the cURL command string locally into JavaScript Fetch or structured request fields without sending any network traffic.',
        },
        {
          question: 'How does the IPv4 CIDR Calculator determine usable host counts?',
          answer:
            'For standard prefixes (/0–/30), usable hosts equal 2^(32 - prefix) - 2 (excluding network and broadcast addresses), while /31 follows RFC 3021 point-to-point rules and /32 represents a single host.',
        },
        {
          question: 'What is the difference between max-age and s-maxage in Cache-Control?',
          answer:
            'max-age applies to both browser and shared caches, whereas s-maxage overrides max-age specifically for shared CDN or reverse-proxy caches.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'HTTP, ağ, zamanlama ve sistem araçlarını tarayıcıda kullanın',
          paragraphs: [
            'Geliştirici Araçları; cron ifadelerini çözümleme, HTTP başlıklarını ve Cache-Control yönergelerini inceleme, Content-Security-Policy (CSP) oluşturma, IPv4/IPv6 CIDR alt ağlarını hesaplama, chmod izinlerini çevirme ve cURL komutlarını ayrıştırma gibi günlük işlemleri tek yerde toplar.',
          ],
          bullets: [
            'HTTP ve güvenlik başlıkları: ham başlıkları JSON’a çevirin, durum kodlarını arayın, CSP ve Cache-Control kuralları oluşturun.',
            'İstek ve istemci analizi: cURL komutlarını ağ isteği göndermeden Fetch koduna dönüştürün ve User-Agent dizelerini ayrıştırın.',
            'Altyapı ve ağ hesapları: CIDR alt ağ aralıklarını, cron zamanlamalarını ve Unix chmod izin modlarını hesaplayın.',
          ],
        },
        {
          heading: 'Canlı ağ isteği olmadan statik analiz',
          paragraphs: [
            'cURL dönüştürücü, HTTP başlık ayrıştırıcı ve CSP analizörü yalnızca sözdizimini yerel olarak işler; hedef sunuculara istek atmaz. Oluşturulan örnekleri paylaşmadan önce Authorization belirteçlerini mutlaka temizleyin.',
          ],
        },
      ],
      faqs: [
        {
          question: 'cURL dönüştürücü hedef adrese gerçekten istek gönderir mi?',
          answer:
            'Hayır. Komut metnini tarayıcınızda yerel olarak ayrıştırır ve hiçbir dış ağ isteği yapmadan Fetch koduna çevirir.',
        },
        {
          question: 'IPv4 CIDR Hesaplayıcı kullanılabilir host sayısını nasıl belirler?',
          answer:
            'Standart öneklerde (/0–/30) ağ ve yayın adresleri hariç 2^(32 - önek) - 2 formülü kullanılır; /31 RFC 3021 noktadan noktaya kuralını, /32 ise tek ana bilgisayarı gösterir.',
        },
        {
          question: 'Cache-Control içinde max-age ile s-maxage arasındaki fark nedir?',
          answer:
            'max-age hem tarayıcı hem paylaşımlı önbellekler için geçerlidir; s-maxage ise yalnızca CDN veya ters vekil gibi paylaşımlı önbelleklerde max-age değerinin yerine geçer.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'HTTP-, Netzwerk-, Cron- und System-Utilities lokal nutzen',
          paragraphs: [
            'Entwickler-Werkzeuge bündeln tägliche Protokoll- und Ops-Helfer: Cron-Ausdrücke erklären, HTTP-Header und Cache-Control-Direktiven prüfen, CSP-Richtlinien bauen, IPv4/IPv6-CIDR-Subnetze berechnen, chmod-Rechte umrechnen und cURL-Befehle konvertieren.',
          ],
          bullets: [
            'HTTP & Sicherheit: Roh-Header parsen, Statuscodes nachschlagen, CSP und Cache-Control erstellen.',
            'Requests & Diagnose: cURL ohne Netzwerkaufruf in Fetch umwandeln und User-Agent-Strings auswerten.',
            'Netzwerk & Betrieb: CIDR-Bereiche, Cron-Zeitpläne und Unix-chmod-Modi berechnen.',
          ],
        },
        {
          heading: 'Statische Analyse ohne ausgehende Netzwerkaufrufe',
          paragraphs: [
            'Werkzeuge wie cURL-to-Fetch, HTTP-Header-Parser und CSP-Analyzer prüfen nur die Syntax im Browser, ohne Zielserver zu kontaktieren. Entfernen Sie Authorization-Header vor dem Teilen.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Führt der cURL-Konverter den Request tatsächlich aus?',
          answer:
            'Nein. Der Befehl wird ausschließlich lokal geparst und in Fetch-Code umgewandelt, ohne Netzwerkanfragen zu senden.',
        },
        {
          question: 'Wie berechnet der IPv4-CIDR-Rechner nutzbare Hosts?',
          answer:
            'Für Präfixe /0–/30 gilt 2^(32 - Präfix) - 2 (ohne Netz- und Broadcast-Adresse), /31 folgt RFC 3021 und /32 steht für einen einzelnen Host.',
        },
        {
          question: 'Worin unterscheiden sich max-age und s-maxage bei Cache-Control?',
          answer:
            'max-age gilt für Browser- und Shared-Caches, während s-maxage max-age gezielt für Shared-Caches wie CDNs oder Proxies überschreibt.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Inspecciona utilidades HTTP, de red y sistema en el navegador',
          paragraphs: [
            'Las utilidades para desarrolladores reúnen calculadoras de protocolos y operaciones: analiza expresiones cron, cabeceras HTTP y directivas Cache-Control, diseña políticas CSP, calcula subredes CIDR IPv4/IPv6, convierte permisos chmod y transforma comandos cURL.',
          ],
          bullets: [
            'HTTP y seguridad: analiza cabeceras sin procesar, códigos de estado, CSP y Cache-Control.',
            'Peticiones y diagnóstico: convierte cURL a Fetch sin ejecutar llamadas y analiza cadenas User-Agent.',
            'Red e infraestructura: calcula rangos CIDR, horarios cron y modos octales/simbólicos chmod.',
          ],
        },
        {
          heading: 'Análisis estático sin tráfico de red saliente',
          paragraphs: [
            'Herramientas como cURL a Fetch, el analizador de cabeceras y el constructor CSP procesan la sintaxis localmente sin enviar solicitudes a los destinos. Oculta siempre tokens Authorization antes de compartir.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿El convertidor de cURL ejecuta la petición contra la URL destino?',
          answer:
            'No. Analiza la sintaxis del comando cURL localmente para generar código Fetch sin enviar tráfico de red.',
        },
        {
          question: '¿Cómo calcula la calculadora CIDR IPv4 los hosts utilizables?',
          answer:
            'Para prefijos /0–/30 calcula 2^(32 - prefijo) - 2 (excluyendo red y difusión); /31 sigue RFC 3021 punto a punto y /32 representa un único host.',
        },
        {
          question: '¿Qué diferencia hay entre max-age y s-maxage en Cache-Control?',
          answer:
            'max-age aplica a navegadores y cachés compartidas, mientras que s-maxage sobrescribe ese valor únicamente para cachés compartidas como CDN o proxies inversos.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Analyser protocoles HTTP, réseaux, cron et permissions localement',
          paragraphs: [
            'Les utilitaires développeur regroupent les outils du quotidien : décrypter des expressions cron, analyser des en-têtes HTTP et directives Cache-Control, bâtir des politiques CSP, calculer des sous-réseaux CIDR IPv4/IPv6, convertir des droits chmod et transformer des commandes cURL.',
          ],
          bullets: [
            'HTTP et sécurité : analysez les en-têtes bruts, codes de statut, CSP et Cache-Control.',
            'Requêtes et diagnostic : convertissez cURL vers Fetch sans appel réseau et inspectez les User-Agent.',
            'Réseau et système : calculez des plages CIDR, planifications cron et modes chmod.',
          ],
        },
        {
          heading: 'Analyse statique sans effet de bord réseau',
          paragraphs: [
            'Des outils comme cURL vers Fetch, l’analyseur d’en-têtes ou CSP Builder traitent la syntaxe localement sans contacter les serveurs cibles. Pensez à masquer les jetons Authorization avant partage.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Le convertisseur cURL exécute-t-il réellement la requête ?',
          answer:
            'Non. Il analyse la commande localement et produit le code Fetch sans émettre aucune requête réseau.',
        },
        {
          question: 'Comment la calculatrice CIDR IPv4 compte-t-elle les hôtes utilisables ?',
          answer:
            'Pour les préfixes /0–/30, le total vaut 2^(32 - préfixe) - 2 (hors adresses réseau et broadcast) ; /31 suit la RFC 3021 et /32 désigne un hôte unique.',
        },
        {
          question: 'Quelle est la différence entre max-age et s-maxage dans Cache-Control ?',
          answer:
            'max-age s’applique aux navigateurs et caches partagés, tandis que s-maxage remplace max-age uniquement pour les caches partagés (CDN, proxy).',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Утилиты HTTP, сетей, cron и прав доступа в браузере',
          paragraphs: [
            'В этом разделе собраны инструменты для повседневной отладки протоколов и инфраструктуры: разбор выражений cron, анализ HTTP-заголовков и директив Cache-Control, конструктор CSP, расчёт подсетей CIDR IPv4/IPv6, перевод прав chmod и разбор команд cURL.',
          ],
          bullets: [
            'HTTP и безопасность: парсинг сырых заголовков, справочник кодов состояния, CSP и Cache-Control.',
            'Запросы и диагностика: преобразование cURL в Fetch без сетевых вызовов и разбор User-Agent.',
            'Сети и администрирование: калькулятор подсетей CIDR, расписания cron и права Unix chmod.',
          ],
        },
        {
          heading: 'Статический разбор без исходящих запросов',
          paragraphs: [
            'Конвертер cURL в Fetch, парсер заголовков и анализатор CSP обрабатывают текст локально и не отправляют запросы на указанные домены. Перед публикацией примеров удаляйте заголовки Authorization.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Выполняет ли конвертер cURL реальный запрос к серверу?',
          answer:
            'Нет. Инструмент лишь разбирает строку команды локально в браузере и формирует код Fetch без отправки сетевого трафика.',
        },
        {
          question: 'Как калькулятор IPv4 CIDR вычисляет доступные хосты?',
          answer:
            'Для префиксов /0–/30 используется формула 2^(32 - префикс) - 2 (без адреса сети и broadcast); /31 следует RFC 3021, а /32 обозначает один хост.',
        },
        {
          question: 'В чём разница между max-age и s-maxage в Cache-Control?',
          answer:
            'max-age действует и для браузера, и для общих кешей, а s-maxage переопределяет срок только для общих кешей вроде CDN или обратных прокси.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '在本地使用 HTTP、网络子网、Cron 与系统开发实用工具',
          paragraphs: [
            '开发者实用工具汇集了日常协议与运维计算器：解析 Cron 定时表达式、分析 HTTP 请求头与 Cache-Control 指令、构建内容安全策略（CSP）、计算 IPv4/IPv6 CIDR 子网、换算 Unix chmod 权限以及转换 cURL 命令。',
          ],
          bullets: [
            'HTTP 与安全策略：解析原始 HTTP 头、查询状态码、编写 CSP 策略与 Cache-Control 缓存指令。',
            '请求与客户端诊断：将 cURL 转换为 Fetch 代码（不发起真实请求）并解析 User-Agent 字符串。',
            '网络与基础设施：计算 IPv4/IPv6 CIDR 地址范围、解释 Cron 表达式及八进制/符号 chmod 权限。',
          ],
        },
        {
          heading: '纯静态解析，不产生外部网络副作用',
          paragraphs: [
            'cURL 转 Fetch、HTTP 请求头解析器与 CSP 分析器均在浏览器本地解析语法，不会向目标地址发起 HTTP 请求。分享生成的请求代码前请先脱敏 Authorization 令牌。',
          ],
        },
      ],
      faqs: [
        {
          question: 'cURL 转换工具会向目标地址发起真实请求吗？',
          answer:
            '不会。它只在浏览器本地解析 cURL 命令文本并生成 Fetch 代码，不会发送任何网络流量。',
        },
        {
          question: 'IPv4 CIDR 计算器如何计算可用主机数？',
          answer:
            '对于 /0–/30 前缀，可用主机数为 2^(32 - 前缀) - 2（扣除网络地址与广播地址）；/31 按 RFC 3021 点对点规则计算，/32 表示单个主机。',
        },
        {
          question: 'Cache-Control 中的 max-age 和 s-maxage 有什么区别？',
          answer:
            'max-age 同时适用于浏览器和共享缓存，而 s-maxage 专门用于覆盖 CDN 或反向代理等共享缓存的有效期。',
        },
      ],
    },
  },
  crypto: {
    en: {
      answerSections: [
        {
          heading: 'Hashing, message authentication, password KDFs, and PKCE',
          paragraphs: [
            'Generate cryptographic digests (SHA-256, SHA-512, BLAKE3, MD5 for legacy checksums), compute and verify HMAC signatures, inspect Bcrypt and Argon2id password hashes, and create OAuth 2.0 PKCE code challenges using browser Web Crypto and WebAssembly.',
          ],
          bullets: [
            'Integrity digests: compare file checksums locally with SHA-256/SHA-512 or multi-algorithm comparators without uploading files.',
            'Authentication & OAuth: verify HMAC-SHA-256 webhook signatures, generate PKCE S256 verifier/challenge pairs, and inspect JWTs.',
            'Password hashing: tune Argon2id memory/time cost or generate and verify salted Bcrypt ($2a$/$2b$) test hashes.',
          ],
        },
        {
          heading: 'Choose the right primitive for the threat model',
          paragraphs: [
            'Fast unkeyed hashes such as SHA-256 or MD5 verify byte integrity against a trusted checksum—they are not suitable for storing passwords because attackers can evaluate billions of guesses per second on GPUs. Use salted slow memory-hard functions (Argon2id or Bcrypt) for passwords, and keyed HMAC or digital signatures when verifying authenticity.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Can a SHA-256 or Bcrypt hash be reversed back to the original input?',
          answer:
            'No. Cryptographic hashes and password KDFs are one-way functions that compress arbitrary input into a digest; verification works by hashing a candidate and comparing digests.',
        },
        {
          question: 'Why should passwords use Argon2id or Bcrypt instead of SHA-256?',
          answer:
            'SHA-256 is designed to be fast, making brute-force guessing cheap. Argon2id (RFC 9106) and Bcrypt enforce configurable work factors and unique per-password salts to resist offline cracking.',
        },
        {
          question: 'Should I paste real production private keys or user passwords here?',
          answer:
            'Although calculations run client-side via Web Crypto and local WASM/JS without uploading data, never paste real production secrets, private keys, or live user passwords into any browser page.',
        },
      ],
    },
    tr: {
      answerSections: [
        {
          heading: 'Özetleme, mesaj doğrulama, parola KDF ve PKCE araçları',
          paragraphs: [
            'Tarayıcı Web Crypto ve WebAssembly kullanarak SHA-256, SHA-512, BLAKE3 ve eski sağlama toplamları için MD5 özetleri üretin; HMAC imzalarını doğrulayın, Bcrypt ve Argon2id parola özetlerini test edin ve OAuth 2.0 PKCE S256 çiftleri oluşturun.',
          ],
          bullets: [
            'Bütünlük özetleri: dosyaları sunucuya yüklemeden SHA-256/SHA-512 ile yerel sağlama toplamı doğrulaması yapın.',
            'Kimlik doğrulama ve OAuth: HMAC-SHA-256 webhook imzalarını, PKCE doğrulayıcı/meydan okuma çiftlerini ve JWT’leri inceleyin.',
            'Parola özetleme: Argon2id bellek/yineleme parametrelerini ayarlayın veya tuzlanmış Bcrypt test özetleri oluşturun.',
          ],
        },
        {
          heading: 'Tehdit modeline göre doğru kriptografik aracı seçin',
          paragraphs: [
            'SHA-256 veya MD5 gibi hızlı anahtarsız özetler dosya bütünlüğünü kontrol etmek içindir; GPU üzerinde saniyede milyarlarca tahmin yapılabildiği için parola saklamada kullanılmamalıdır. Parolalar için tuzlanmış ve yavaş Argon2id ya da Bcrypt, özgünlük doğrulaması için ise anahtarlı HMAC veya dijital imza kullanın.',
          ],
        },
      ],
      faqs: [
        {
          question: 'SHA-256 veya Bcrypt özeti geri çözülüp orijinal metne dönüştürülebilir mi?',
          answer:
            'Hayır. Kriptografik özetler tek yönlüdür; doğrulama ancak aday girdiyi yeniden özetleyip özetleri karşılaştırarak yapılır.',
        },
        {
          question: 'Parolalar için neden SHA-256 yerine Argon2id veya Bcrypt kullanılmalıdır?',
          answer:
            'SHA-256 çok hızlı çalışacak şekilde tasarlanmıştır. Argon2id (RFC 9106) ve Bcrypt ise her parola için benzersiz tuz ve ayarlanabilir maliyet faktörü ekleyerek çevrimdışı kaba kuvvet saldırılarını zorlaştırır.',
        },
        {
          question: 'Gerçek üretim gizli anahtarlarını veya kullanıcı parolalarını yapıştırmalı mıyım?',
          answer:
            'Tüm hesaplamalar tarayıcıda yerel çalışsa da güvenlik gereği hiçbir web sayfasına gerçek üretim gizli anahtarlarını veya canlı kullanıcı parolalarını girmeyin.',
        },
      ],
    },
    de: {
      answerSections: [
        {
          heading: 'Hashing, Nachrichtenauthentifizierung, Passwort-KDFs und PKCE',
          paragraphs: [
            'Erzeugen Sie kryptografische Prüfsummen (SHA-256, SHA-512, BLAKE3, MD5), prüfen Sie HMAC-Signaturen, testen Sie Bcrypt- und Argon2id-Passwort-Hashes und generieren Sie OAuth-2.0-PKCE-Challenges lokal über Web Crypto.',
          ],
          bullets: [
            'Integritätsprüfung: Dateiprüfsummen lokal mit SHA-256/SHA-512 abgleichen, ohne Dateien hochzuladen.',
            'Authentifizierung & OAuth: HMAC-SHA-256-Webhooks prüfen und PKCE-S256-Paare erstellen.',
            'Passwort-Hashing: Argon2id-Speicher- und Zeitkosten abstimmen sowie gesalzene Bcrypt-Hashes testen.',
          ],
        },
        {
          heading: 'Das passende Verfahren für das Schutzbedarf-Modell wählen',
          paragraphs: [
            'Schnelle Hashes wie SHA-256 prüfen Datenintegrität, eignen sich aber nicht für Passwörter. Nutzen Sie dafür speicherharte, gesalzene KDFs (Argon2id oder Bcrypt) und für Authentizität HMAC oder digitale Signaturen.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Lässt sich ein SHA-256- oder Bcrypt-Hash wieder entschlüsseln?',
          answer:
            'Nein. Kryptografische Hashfunktionen arbeiten in eine Richtung; zur Prüfung wird ein Kandidat erneut gehasht und verglichen.',
        },
        {
          question: 'Warum sind Argon2id oder Bcrypt für Passwörter besser als SHA-256?',
          answer:
            'SHA-256 ist auf Geschwindigkeit optimiert. Argon2id (RFC 9106) und Bcrypt erzwingen konfigurierbare Rechen- und Speicherkosten plus Salt gegen Brute-Force-Angriffe.',
        },
        {
          question: 'Sollte ich echte Produktivschlüssel oder Benutzerpasswörter einfügen?',
          answer:
            'Obwohl alles clientseitig im Browser berechnet wird, sollten echte Produktiv-Secrets und Live-Passwörter grundsätzlich nie in Webseiten eingefügt werden.',
        },
      ],
    },
    es: {
      answerSections: [
        {
          heading: 'Hashing, autenticación de mensajes, KDF de contraseñas y PKCE',
          paragraphs: [
            'Genera resúmenes criptográficos (SHA-256, SHA-512, BLAKE3, MD5), verifica firmas HMAC, inspecciona hashes Bcrypt y Argon2id y crea desafíos PKCE para OAuth 2.0 en tu navegador mediante Web Crypto.',
          ],
          bullets: [
            'Integridad de archivos: compara sumas SHA-256/SHA-512 localmente sin subir archivos.',
            'Autenticación y OAuth: valida firmas HMAC-SHA-256 de webhooks y genera pares PKCE S256.',
            'Hashing de contraseñas: ajusta parámetros Argon2id y verifica hashes Bcrypt con sal.',
          ],
        },
        {
          heading: 'Elige la primitiva adecuada para cada amenaza',
          paragraphs: [
            'Los hashes rápidos como SHA-256 verifican integridad frente a una suma confiable, pero no sirven para guardar contraseñas. Usa funciones lentas con sal (Argon2id o Bcrypt) para contraseñas y HMAC o firmas digitales para autenticidad.',
          ],
        },
      ],
      faqs: [
        {
          question: '¿Se puede revertir un hash SHA-256 o Bcrypt al texto original?',
          answer:
            'No. Son funciones unidireccionales; la verificación consiste en volver a aplicar el hash a un candidato y comparar el resultado.',
        },
        {
          question: '¿Por qué usar Argon2id o Bcrypt en contraseñas en lugar de SHA-256?',
          answer:
            'SHA-256 es rápido y vulnerable a fuerza bruta en GPU. Argon2id (RFC 9106) y Bcrypt añaden sal única y coste configurable en memoria y CPU.',
        },
        {
          question: '¿Debo pegar claves privadas reales o contraseñas de producción?',
          answer:
            'Aunque los cálculos se realizan en el navegador sin subidas, nunca pegues secretos reales ni contraseñas en producción en una página web.',
        },
      ],
    },
    fr: {
      answerSections: [
        {
          heading: 'Hachage, authentification de messages, KDF et PKCE',
          paragraphs: [
            'Calculez des empreintes cryptographiques (SHA-256, SHA-512, BLAKE3, MD5), vérifiez des signatures HMAC, testez des empreintes Bcrypt ou Argon2id et générez des paires PKCE OAuth 2.0 dans votre navigateur via Web Crypto.',
          ],
          bullets: [
            'Intégrité des fichiers : comparez localement des sommes SHA-256/SHA-512 sans envoi serveur.',
            'Authentification et OAuth : vérifiez des webhooks HMAC-SHA-256 et créez des défis PKCE S256.',
            'Mots de passe : réglez les coûts mémoire/temps Argon2id et testez des empreintes Bcrypt salées.',
          ],
        },
        {
          heading: 'Choisir la primitive adaptée au modèle de menace',
          paragraphs: [
            'Les fonctions rapides comme SHA-256 vérifient l’intégrité mais ne conviennent pas au stockage de mots de passe. Utilisez Argon2id ou Bcrypt avec sel pour les mots de passe, et HMAC ou une signature pour l’authenticité.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Peut-on déchiffrer un hash SHA-256 ou Bcrypt ?',
          answer:
            'Non. Le hachage cryptographique est à sens unique ; on vérifie une entrée en recalculant son empreinte et en la comparant.',
        },
        {
          question: 'Pourquoi préférer Argon2id ou Bcrypt à SHA-256 pour les mots de passe ?',
          answer:
            'SHA-256 est trop rapide face aux GPU. Argon2id (RFC 9106) et Bcrypt imposent un sel unique et un facteur de coût mémoire/CPU.',
        },
        {
          question: 'Puis-je coller de vraies clés privées ou des mots de passe réels ?',
          answer:
            'Bien que les calculs restent locaux côté navigateur, ne collez jamais de secrets de production ni de vrais mots de passe utilisateurs.',
        },
      ],
    },
    ru: {
      answerSections: [
        {
          heading: 'Хеширование, проверка сообщений, KDF для паролей и PKCE',
          paragraphs: [
            'Вычисляйте криптографические дайджесты (SHA-256, SHA-512, BLAKE3, MD5), проверяйте подписи HMAC, тестируйте хеши паролей Bcrypt и Argon2id и создавайте пары PKCE S256 для OAuth 2.0 локально через Web Crypto.',
          ],
          bullets: [
            'Контроль целостности: проверяйте контрольные суммы файлов по SHA-256/SHA-512 без загрузки на сервер.',
            'Аутентификация и OAuth: проверка вебхуков HMAC-SHA-256 и генерация PKCE S256.',
            'Хранение паролей: подбор параметров памяти и итераций Argon2id, проверка солёных хешей Bcrypt.',
          ],
        },
        {
          heading: 'Выбирайте примитив под задачу безопасности',
          paragraphs: [
            'Быстрые хеши вроде SHA-256 проверяют целостность данных, но не подходят для хранения паролей из-за перебора на GPU. Для паролей используйте медленные функции с солью (Argon2id или Bcrypt), а для подлинности — HMAC или цифровую подпись.',
          ],
        },
      ],
      faqs: [
        {
          question: 'Можно ли расшифровать хеш SHA-256 или Bcrypt обратно в исходный текст?',
          answer:
            'Нет. Криптографические хеш-функции необратимы; проверка выполняется повторным хешированием кандидата и сравнением дайджестов.',
        },
        {
          question: 'Почему для паролей нужны Argon2id или Bcrypt, а не SHA-256?',
          answer:
            'SHA-256 слишком быстрый для перебора на видеокартах. Argon2id (RFC 9106) и Bcrypt добавляют уникальную соль и настраиваемую стоимость по памяти и времени.',
        },
        {
          question: 'Стоит ли вставлять сюда боевые приватные ключи и реальные пароли?',
          answer:
            'Несмотря на локальное выполнение в браузере, никогда не вводите реальные производственные секреты и пароли пользователей на веб-страницах.',
        },
      ],
    },
    zh: {
      answerSections: [
        {
          heading: '浏览器本地哈希校验、消息认证、密码 KDF 与 PKCE 工具',
          paragraphs: [
            '借助浏览器 Web Crypto 与 WebAssembly 在本地生成 SHA-256、SHA-512、BLAKE3 和 MD5 摘要，验证 HMAC 签名，调试 Bcrypt 与 Argon2id 密码哈希，并生成 OAuth 2.0 PKCE S256 挑战对。',
          ],
          bullets: [
            '完整性校验：无需上传文件即可在本地核对 SHA-256 / SHA-512 校验和。',
            '认证与 OAuth：验证 HMAC-SHA-256 Webhook 签名并生成 PKCE 校验器与挑战码。',
            '密码哈希：调优 Argon2id 内存与迭代参数，或生成与验证加盐 Bcrypt 测试哈希。',
          ],
        },
        {
          heading: '根据安全场景选择正确的密码学原语',
          paragraphs: [
            'SHA-256 或 MD5 等快速无密钥哈希适用于校验文件完整性，但不能用于存储用户密码（GPU 每秒可尝试数十亿次）。存储密码应使用加盐慢速函数（Argon2id 或 Bcrypt），验证消息来源则应使用 HMAC 或数字签名。',
          ],
        },
      ],
      faqs: [
        {
          question: 'SHA-256 或 Bcrypt 哈希能反向解密还原出原文吗？',
          answer:
            '不能。密码学哈希和口令派生函数均为单向计算，验证只能通过重新哈希候选输入并比对摘要完成。',
        },
        {
          question: '为什么存储密码应该选用 Argon2id 或 Bcrypt 而不是 SHA-256？',
          answer:
            'SHA-256 计算速度极快，容易遭到 GPU 暴力破解；Argon2id（RFC 9106）和 Bcrypt 通过独立盐值与可调内存/时间成本大幅提高离线破解代价。',
        },
        {
          question: '可以把生产环境的私钥或真实密码粘贴到这里吗？',
          answer:
            '尽管所有计算都在浏览器本地进行且不会上传数据，仍请勿在任何网页中输入真实的生产密钥或用户密码。',
        },
      ],
    },
  },
};

export function isKnownCategorySlug(slug: string): slug is CategorySlug {
  return slug in categoryPageContent;
}

export function getCategoryPageContent(slug: string, locale: Language) {
  if (!isKnownCategorySlug(slug)) {
    return null;
  }
  const localized = categoryPageContent[slug][locale] || categoryPageContent[slug].en;
  return {
    ...localized,
    sources: categorySources[slug],
    ui: categoryUiLabels[locale] || categoryUiLabels.en,
  };
}
