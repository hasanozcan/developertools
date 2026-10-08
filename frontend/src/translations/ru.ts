import { ruUi } from './ui/ru';
import { enhancedToolTranslations } from './enhancedTools';
import { ruToolCompletion } from './completion/ru';

export const ru = {
  ...ruUi,
  // Tool Names
  'toolName.json-formatter': 'Форматировщик JSON',
  'toolName.json-validator': 'Валидатор JSON',
  'toolName.json-schema-validator': 'Валидатор JSON Schema',
  'toolName.hmac-generator': 'Генератор и проверка HMAC',
  'toolName.pkce-generator': 'Генератор и проверка PKCE',
  'toolName.cidr-calculator': 'Калькулятор IPv4 CIDR',
  'toolName.json-csv': 'Конвертер JSON в CSV',
  'toolName.base64': 'Кодировщик/Декодер Base64',
  'toolName.url-encoder': 'Кодировщик/Декодер URL',
  'toolName.jwt-decoder': 'Декодер JWT',
  'toolName.html-entity': 'Кодировщик/Декодер HTML Entity',
  'toolName.uuid-generator': 'Генератор UUID',
  'toolName.password-generator': 'Генератор паролей',
  'toolName.lorem-ipsum': 'Генератор Lorem Ipsum',
  'toolName.qr-code': 'Генератор QR-кодов',
  'toolName.slug-generator': 'Генератор слагов',
  'toolName.md5-hash': 'Генератор хеша MD5',
  'toolName.sha256-hash': 'Генератор хеша SHA256',
  'toolName.regex-tester': 'Тестер регулярных выражений',
  'toolName.text-diff': 'Инструмент сравнения текста',
  'toolName.markdown-preview': 'Предпросмотр Markdown',
  'toolName.timestamp-converter': 'Конвертер временных меток',
  'toolName.color-converter': 'Конвертер цветов',
  'toolName.sql-formatter': 'Форматировщик SQL',
  'toolName.css-minifier': 'Минификатор CSS',
  'toolName.js-minifier': 'Минификатор JavaScript',
  'toolName.cron-parser': 'Парсер Cron-выражений',
  'toolName.json-to-typescript': 'JSON в TypeScript',
  'toolName.yaml-json': 'Конвертер YAML ↔ JSON',
  'toolName.image-to-base64': 'Изображение в Base64',
  'toolName.css-gradient': 'Генератор CSS градиентов',
  'toolName.meta-tags': 'Генератор мета-тегов',
  'toolName.case-converter': 'Конвертер регистра',
  'toolName.word-counter': 'Счётчик слов',
  'toolName.remove-duplicates': 'Удалить дубликаты',
  'toolName.sort-lines': 'Сортировка строк',
  'toolName.hex-encoder': 'HEX кодировщик',
  'toolName.binary-encoder': 'Двоичный кодировщик',
  'toolName.html-formatter': 'Форматировщик HTML',
  'toolName.html-minifier': 'Минификатор HTML',
  'toolName.xml-formatter': 'Форматировщик XML',
  'toolName.sha512-hash': 'Генератор хеша SHA512',
  'toolName.roman-numeral-converter': 'Конвертер римских цифр',
  'toolName.number-base-converter': 'Конвертер систем счисления',
  'toolName.unicode-escape': 'Unicode Escape кодировщик/декодировщик',
  'toolName.json-string-escape': 'Экранирование JSON-строки',
  'toolName.url-parser': 'Парсер URL',
  'toolName.query-string-parser': 'Парсер Query String',
  'toolName.regex-escape': 'Экранирование Regex',
  'toolName.http-headers-parser': 'Парсер HTTP-заголовков',
  'toolName.http-status-codes': 'Коды состояния HTTP',
  'toolName.user-agent-parser': 'Парсер User-Agent',
  'toolName.json-pointer': 'Вычислитель JSON Pointer',
  'toolName.chmod-calculator': 'Калькулятор chmod',
  'toolName.cache-control': 'Парсер и конструктор Cache-Control',
  'toolName.jsonpath-tester': 'Тестер JSONPath',
  'toolName.csp-builder': 'Конструктор и анализатор заголовка CSP',
  'toolName.curl-to-fetch': 'Конструктор cURL и конвертер Fetch',
  // Tool Descriptions
  'toolDesc.json-formatter': 'Форматируйте, проверяйте и очищайте JSON с подсветкой синтаксиса.',
  'toolDesc.json-validator': 'Проверяйте ошибки синтаксиса JSON и сразу видьте точное место.',
  'toolDesc.json-schema-validator':
    'Проверяйте JSON-документы по правилам JSON Schema с подробными путями ошибок.',
  'toolDesc.hmac-generator':
    'Создавайте и проверяйте подписи HMAC-SHA в шестнадцатеричном формате или Base64.',
  'toolDesc.pkce-generator': 'Создавайте и проверяйте пары verifier и challenge OAuth PKCE S256.',
  'toolDesc.cidr-calculator':
    'Рассчитывайте сети IPv4, маски, широковещательные адреса и диапазоны доступных хостов.',
  'toolDesc.json-pointer':
    'Разрешайте указатели RFC 6901 в документах JSON с точными сообщениями об ошибках пути.',
  'toolDesc.chmod-calculator':
    'Преобразуйте права Unix между восьмеричным, символьным представлением и флажками.',
  'toolDesc.cache-control': 'Разбирайте, нормализуйте и проверяйте директивы HTTP Cache-Control.',
  'toolDesc.jsonpath-tester':
    'Запрашивайте JSON по путям, шаблонам, срезам и рекурсивному спуску без выполнения скриптов.',
  'toolDesc.csp-builder':
    'Создавайте, нормализуйте и проверяйте заголовки Content Security Policy на распространённые проблемы безопасности.',
  'toolDesc.curl-to-fetch':
    'Создавайте запросы cURL или преобразуйте поддерживаемый ввод cURL в JavaScript Fetch без выполнения команд.',
  'toolDesc.json-csv': 'Преобразуйте массивы JSON в CSV и файлы CSV обратно в JSON.',
  'toolDesc.base64': 'Кодируйте текст в Base64 или декодируйте строки Base64 в текст.',
  'toolDesc.url-encoder': 'Безопасно кодируйте или декодируйте URL-строки и query-параметры.',
  'toolDesc.jwt-decoder': 'Декодируйте JWT и изучайте заголовки и payload на клиенте.',
  'toolDesc.html-entity': 'Кодируйте спецсимволы в HTML-сущности или декодируйте их обратно.',
  'toolDesc.uuid-generator':
    'Создавайте UUID v4 или v7 на основе времени, форматируйте пакеты и экспортируйте их локально.',
  'toolDesc.password-generator': 'Создавайте надежные случайные пароли с настраиваемыми опциями.',
  'toolDesc.lorem-ipsum': 'Генерируйте текст Lorem Ipsum по словам, предложениям или абзацам.',
  'toolDesc.qr-code': 'Создавайте QR-коды из текста или URL для быстрого шаринга.',
  'toolDesc.slug-generator':
    'Преобразуйте заголовки в чистые SEO-дружелюбные слаги с транслитерацией.',
  'toolDesc.md5-hash': 'Генерируйте MD5-хэши из текста для быстрых контрольных сумм.',
  'toolDesc.sha256-hash': 'Генерируйте SHA256-хэши из текста для проверки целостности.',
  'toolDesc.regex-tester': 'Тестируйте регулярные выражения с живым совпадением и подсветкой.',
  'toolDesc.text-diff': 'Сравнивайте два текста рядом и подсвечивайте различия.',
  'toolDesc.markdown-preview': 'Пишите Markdown и сразу смотрите отрендеренный HTML.',
  'toolDesc.timestamp-converter': 'Конвертируйте Unix-временные метки в читаемые даты и обратно.',
  'toolDesc.color-converter': 'Конвертируйте цвета между HEX, RGB и HSL.',
  'toolDesc.sql-formatter': 'Форматируйте SQL-запросы с правильными отступами и регистром.',
  'toolDesc.css-minifier': 'Минифицируйте CSS, убирая пробелы, комментарии и лишнее.',
  'toolDesc.js-minifier': 'Минифицируйте JavaScript, убирая пробелы, комментарии и мусор.',
  'toolDesc.cron-parser': 'Парсите cron-выражения и объясняйте их расписания.',
  'toolDesc.json-to-typescript': 'Генерируйте интерфейсы или типы TypeScript из примеров JSON.',
  'toolDesc.yaml-json': 'Конвертируйте YAML в JSON и JSON обратно в YAML.',
  'toolDesc.image-to-base64': 'Конвертируйте изображения в Base64 data URI для встраивания.',
  'toolDesc.css-gradient': 'Проектируйте CSS-градиенты и копируйте сгенерированный код.',
  'toolDesc.meta-tags': 'Генерируйте мета-теги SEO, Open Graph и Twitter Card.',
  'toolDesc.case-converter':
    'Конвертируйте текст между верхним, нижним, заголовочным регистром, camelCase и др.',
  'toolDesc.word-counter':
    'Подсчитывайте слова, символы, предложения, абзацы и оцените время чтения.',
  'toolDesc.remove-duplicates':
    'Удаляйте дублирующиеся и пустые строки из ваших текстовых списков.',
  'toolDesc.sort-lines': 'Сортируйте строки текста по алфавиту, численно или в случайном порядке.',
  'toolDesc.hex-encoder': 'Кодируйте текст в шестнадцатеричный формат или декодируйте HEX в текст.',
  'toolDesc.binary-encoder':
    'Кодируйте текст в двоичный формат или декодируйте двоичный код в текст.',
  'toolDesc.html-formatter': 'Форматируйте и украшайте HTML код с правильными отступами.',
  'toolDesc.html-minifier': 'Минифицируйте HTML, удаляя пробелы, комментарии и лишнее.',
  'toolDesc.xml-formatter': 'Форматируйте и украшайте XML код с правильными отступами.',
  'toolDesc.sha512-hash': 'Генерируйте SHA512-хэши из текста для проверки целостности.',
  'toolDesc.roman-numeral-converter': 'Конвертируйте числа в римские цифры и наоборот.',
  'toolDesc.number-base-converter':
    'Конвертируйте числа между десятичной, двоичной, hex и восьмеричной системами.',
  'toolDesc.unicode-escape':
    'Кодируйте обычный текст в Unicode escape-последовательности или декодируйте экранированный текст.',
  'toolDesc.json-string-escape': 'Экранируйте и раскодируйте содержимое JSON-строк.',
  'toolDesc.url-parser': 'Разберите URL на протокол, хост, путь, хэш и параметры запроса.',
  'toolDesc.query-string-parser':
    'Разбирайте query string в JSON и собирайте query string из JSON.',
  'toolDesc.regex-escape':
    'Экранируйте или раскодируйте текст для безопасного использования в regex.',
  'toolDesc.http-headers-parser':
    'Преобразуйте сырые HTTP-заголовки в JSON и собирайте заголовки из JSON.',
  'toolDesc.http-status-codes':
    'Ищите и справочно используйте распространенные коды состояния HTTP.',
  'toolDesc.user-agent-parser':
    'Анализируйте user-agent строки для определения браузера, ОС и устройства.',
  // Инструменты .env, Zod и Bcrypt
  'toolName.env-to-json': 'Конвертер .env в JSON',
  'toolDesc.env-to-json':
    'Преобразуйте переменные dotenv в JSON и обратно без отправки значений конфигурации.',
  'toolName.json-to-zod': 'JSON в схему Zod',
  'toolDesc.json-to-zod':
    'Создавайте схемы Zod и выведенные типы TypeScript из репрезентативного JSON.',
  'toolName.bcrypt-generator': 'Генератор и проверка Bcrypt',
  'toolDesc.bcrypt-generator':
    'Создавайте bcrypt-хеши с солью и локально проверяйте тестовые пароли.',
  ...enhancedToolTranslations.ru,
  ...ruToolCompletion,
};
