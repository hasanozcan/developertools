import { deUi } from './ui/de';
import { enhancedToolFallbacks, enhancedToolTranslations } from './enhancedTools';

export const de = {
  // English placeholders first so hand-written keys below take precedence.
  ...enhancedToolFallbacks.de,
  ...deUi,
  // Tool Names
  'toolName.json-formatter': 'JSON-Formatierer',
  'toolName.json-validator': 'JSON-Validator',
  'toolName.json-schema-validator': 'JSON-Schema-Validator',
  'toolName.hmac-generator': 'HMAC-Generator und -Prüfer',
  'toolName.pkce-generator': 'PKCE-Generator und -Prüfer',
  'toolName.cidr-calculator': 'IPv4-CIDR-Rechner',
  'toolName.json-csv': 'JSON zu CSV Konverter',
  'toolName.base64': 'Base64 Encoder/Decoder',
  'toolName.url-encoder': 'URL Encoder/Decoder',
  'toolName.jwt-decoder': 'JWT Decoder',
  'toolName.html-entity': 'HTML Entity Encoder/Decoder',
  'toolName.uuid-generator': 'UUID Generator',
  'toolName.password-generator': 'Passwort-Generator',
  'toolName.lorem-ipsum': 'Lorem Ipsum Generator',
  'toolName.qr-code': 'QR-Code Generator',
  'toolName.slug-generator': 'Slug Generator',
  'toolName.md5-hash': 'MD5 Hash Generator',
  'toolName.sha256-hash': 'SHA256 Hash Generator',
  'toolName.regex-tester': 'Regex Tester',
  'toolName.text-diff': 'Text-Vergleichstool',
  'toolName.markdown-preview': 'Markdown Vorschau',
  'toolName.timestamp-converter': 'Zeitstempel Konverter',
  'toolName.color-converter': 'Farbkonverter',
  'toolName.sql-formatter': 'SQL-Formatierer',
  'toolName.css-minifier': 'CSS Minifier',
  'toolName.js-minifier': 'JavaScript Minifier',
  'toolName.cron-parser': 'Cron Ausdruck Parser',
  'toolName.json-to-typescript': 'JSON zu TypeScript',
  'toolName.yaml-json': 'YAML ↔ JSON Konverter',
  'toolName.image-to-base64': 'Bild zu Base64',
  'toolName.css-gradient': 'CSS-Gradient-Generator',
  'toolName.meta-tags': 'Meta-Tags-Generator',
  'toolName.case-converter': 'Groß-/Kleinschreibung Konverter',
  'toolName.word-counter': 'Wort-Zähler',
  'toolName.remove-duplicates': 'Duplikate entfernen',
  'toolName.sort-lines': 'Zeilen sortieren',
  'toolName.hex-encoder': 'HEX-Encoder/Decoder',
  'toolName.binary-encoder': 'Binär-Encoder/Decoder',
  'toolName.html-formatter': 'HTML-Formatierer',
  'toolName.html-minifier': 'HTML-Minimierer',
  'toolName.xml-formatter': 'XML-Formatierer',
  'toolName.sha512-hash': 'SHA512-Hash-Generator',
  'toolName.roman-numeral-converter': 'Römische Zahlen Konverter',
  'toolName.number-base-converter': 'Zahlenbasis-Konverter',
  'toolName.unicode-escape': 'Unicode-Escape-Encoder/Decoder',
  'toolName.json-string-escape': 'JSON-String-Escape',
  'toolName.url-parser': 'URL-Parser',
  'toolName.query-string-parser': 'Query-String-Parser',
  'toolName.regex-escape': 'Regex-Escape',
  'toolName.http-headers-parser': 'HTTP-Header-Parser',
  'toolName.http-status-codes': 'HTTP-Statuscodes',
  'toolName.user-agent-parser': 'User-Agent-Parser',
  'toolName.json-pointer': 'JSON-Pointer-Auswerter',
  'toolName.chmod-calculator': 'Chmod-Rechner',
  'toolName.cache-control': 'Cache-Control-Parser und -Generator',
  'toolName.jsonpath-tester': 'JSONPath-Tester',
  'toolName.csp-builder': 'CSP-Header-Generator und -Analyse',
  'toolName.curl-to-fetch': 'cURL-Generator und Fetch-Konverter',
  // Tool Descriptions
  'toolDesc.json-formatter': 'JSON mit Syntax-Highlighting formatieren, validieren und bereinigen.',
  'toolDesc.json-validator': 'JSON-Syntaxfehler prüfen und genaue Fehlstellen sofort sehen.',
  'toolDesc.json-schema-validator':
    'JSON-Dokumente mit detaillierten Fehlerpfaden gegen JSON-Schema-Regeln prüfen.',
  'toolDesc.hmac-generator':
    'HMAC-SHA-Signaturen als Hexadezimalwert oder Base64 erzeugen und prüfen.',
  'toolDesc.pkce-generator': 'OAuth-PKCE-S256-Verifier- und Challenge-Paare erzeugen und prüfen.',
  'toolDesc.cidr-calculator':
    'IPv4-Netze, Masken, Broadcast-Adressen und nutzbare Hostbereiche berechnen.',
  'toolDesc.json-pointer':
    'RFC-6901-Pointer in JSON-Dokumenten auflösen und genaue Pfadfehler anzeigen.',
  'toolDesc.chmod-calculator':
    'Unix-Berechtigungen zwischen oktaler, symbolischer und Checkbox-Darstellung umrechnen.',
  'toolDesc.cache-control': 'HTTP-Cache-Control-Direktiven parsen, normalisieren und prüfen.',
  'toolDesc.jsonpath-tester':
    'JSON mit Pfaden, Platzhaltern, Slices und rekursiver Suche abfragen, ohne Skripte auszuführen.',
  'toolDesc.csp-builder':
    'Content-Security-Policy-Header erstellen, normalisieren und auf häufige Sicherheitslücken prüfen.',
  'toolDesc.curl-to-fetch':
    'cURL-Anfragen erstellen oder unterstützte cURL-Eingaben ohne Befehlsausführung in JavaScript Fetch umwandeln.',
  'toolDesc.json-csv': 'JSON-Arrays in CSV und CSV-Dateien zurück in JSON konvertieren.',
  'toolDesc.base64': 'Text zu Base64 encodieren oder Base64-Strings zurück zu Text decodieren.',
  'toolDesc.url-encoder': 'URL-Strings und Query-Parameter sicher encodieren oder decodieren.',
  'toolDesc.jwt-decoder': 'JWT-Tokens decodieren und Header sowie Payload clientseitig prüfen.',
  'toolDesc.html-entity': 'Sonderzeichen in HTML-Entities encodieren oder wieder zurückwandeln.',
  'toolDesc.uuid-generator':
    'UUID-v4- oder zeitstempelbasierte v7-Kennungen erzeugen, stapelweise formatieren und lokal exportieren.',
  'toolDesc.password-generator': 'Starke, zufällige Passwörter mit anpassbaren Optionen erstellen.',
  'toolDesc.lorem-ipsum':
    'Lorem-Ipsum-Platzhaltertext nach Wörtern, Sätzen oder Absätzen erzeugen.',
  'toolDesc.qr-code': 'QR-Codes aus Text oder URLs für schnelles Teilen erstellen.',
  'toolDesc.slug-generator':
    'Titel in saubere, SEO-freundliche Slugs mit Transliteration umwandeln.',
  'toolDesc.md5-hash': 'MD5-Hashes aus Text für schnelle Checksummen generieren.',
  'toolDesc.sha256-hash': 'SHA256-Hashes aus Text für Integritätsprüfungen generieren.',
  'toolDesc.regex-tester': 'Reguläre Ausdrücke mit Live-Matching und Hervorhebungen testen.',
  'toolDesc.text-diff': 'Zwei Texte nebeneinander vergleichen und Unterschiede hervorheben.',
  'toolDesc.markdown-preview': 'Markdown schreiben und das gerenderte HTML sofort ansehen.',
  'toolDesc.timestamp-converter': 'Unix-Timestamps in lesbare Daten und zurück umwandeln.',
  'toolDesc.color-converter': 'Farben zwischen HEX, RGB und HSL konvertieren.',
  'toolDesc.sql-formatter':
    'SQL-Queries mit korrekter Einrückung und Groß-/Kleinschreibung formatieren.',
  'toolDesc.css-minifier':
    'CSS durch Entfernen von Leerzeichen, Kommentaren und Ballast minifizieren.',
  'toolDesc.js-minifier':
    'JavaScript durch Entfernen von Leerzeichen, Kommentaren und Ballast minifizieren.',
  'toolDesc.cron-parser': 'Cron-Ausdrücke parsen und ihre Zeitpläne erklären.',
  'toolDesc.json-to-typescript':
    'TypeScript-Interfaces oder -Typen aus JSON-Beispielen generieren.',
  'toolDesc.yaml-json': 'YAML in JSON und JSON zurück in YAML konvertieren.',
  'toolDesc.image-to-base64': 'Bilder in Base64-Data-URIs zum Einbetten umwandeln.',
  'toolDesc.css-gradient': 'CSS-Verläufe gestalten und den erzeugten Code kopieren.',
  'toolDesc.meta-tags': 'SEO-, Open-Graph- und Twitter-Card-Meta-Tags generieren.',
  'toolDesc.case-converter':
    'Text zwischen Großbuchstaben, Kleinbuchstaben, Titel Case, camelCase und mehr konvertieren.',
  'toolDesc.word-counter': 'Wörter, Zeichen, Sätze, Absätze zählen und Lesezeit schätzen.',
  'toolDesc.remove-duplicates': 'Doppelte und leere Zeilen aus Textlisten entfernen.',
  'toolDesc.sort-lines': 'Textzeilen alphabetisch, numerisch oder zufällig sortieren.',
  'toolDesc.hex-encoder': 'Text in Hexadezimal kodieren oder HEX zurück in Text dekodieren.',
  'toolDesc.binary-encoder': 'Text in Binär kodieren oder Binär zurück in Text dekodieren.',
  'toolDesc.html-formatter': 'HTML-Code mit korrekter Einrückung formatieren und verschönern.',
  'toolDesc.html-minifier':
    'HTML durch Entfernen von Leerzeichen, Kommentaren und Extras minimieren.',
  'toolDesc.xml-formatter': 'XML-Code mit korrekter Einrückung formatieren und verschönern.',
  'toolDesc.sha512-hash': 'SHA512-Hashes aus Text für Integritätsprüfungen generieren.',
  'toolDesc.roman-numeral-converter': 'Zahlen in römische Zahlen und umgekehrt konvertieren.',
  'toolDesc.number-base-converter': 'Zahlen zwischen Dezimal, Binär, Hex und Oktal konvertieren.',
  'toolDesc.unicode-escape':
    'Klartext in Unicode-Escape-Sequenzen kodieren oder escaped Text dekodieren.',
  'toolDesc.json-string-escape': 'JSON-String-Inhalte escapen oder unescapen.',
  'toolDesc.url-parser': 'URLs in Protokoll, Host, Pfad, Hash und Query-Parameter aufteilen.',
  'toolDesc.query-string-parser':
    'Query-Strings zu JSON parsen und Query-Strings aus JSON erstellen.',
  'toolDesc.regex-escape': 'Text für sichere Regex-Verwendung escapen oder unescapen.',
  'toolDesc.http-headers-parser': 'Roh-HTTP-Header in JSON parsen und Header aus JSON erstellen.',
  'toolDesc.http-status-codes': 'Häufige HTTP-Antwort-Statuscodes suchen und nachschlagen.',
  'toolDesc.user-agent-parser':
    'User-Agent-Strings analysieren, um Browser, OS und Gerät zu erkennen.',
  // .env-, Zod- und Bcrypt-Werkzeuge
  'toolName.env-to-json': '.env-zu-JSON-Konverter',
  'toolDesc.env-to-json':
    'Dotenv-Variablen lokal in JSON und zurück umwandeln, ohne Konfigurationswerte hochzuladen.',
  'toolName.json-to-zod': 'JSON-zu-Zod-Schema',
  'toolDesc.json-to-zod':
    'Zod-Schemas und abgeleitete TypeScript-Typen aus repräsentativem JSON erzeugen.',
  'toolName.bcrypt-generator': 'Bcrypt-Generator und -Prüfer',
  'toolDesc.bcrypt-generator': 'Gesalzene Bcrypt-Hashes erzeugen und Testpasswörter lokal prüfen.',
  ...enhancedToolTranslations.de,
};
