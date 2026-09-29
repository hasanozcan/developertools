import { esUi } from './ui/es';
import { enhancedToolFallbacks, enhancedToolTranslations } from './enhancedTools';

export const es = {
  // English placeholders first so hand-written keys below take precedence.
  ...enhancedToolFallbacks.es,
  ...esUi,
  // Tool Names
  'toolName.json-formatter': 'Formateador JSON',
  'toolName.json-validator': 'Validador JSON',
  'toolName.json-schema-validator': 'Validador JSON Schema',
  'toolName.hmac-generator': 'Generador y Verificador HMAC',
  'toolName.pkce-generator': 'Generador y Verificador PKCE',
  'toolName.cidr-calculator': 'Calculadora CIDR IPv4',
  'toolName.json-csv': 'Conversor JSON a CSV',
  'toolName.base64': 'Codificador/Decodificador Base64',
  'toolName.url-encoder': 'Codificador/Decodificador URL',
  'toolName.jwt-decoder': 'Decodificador JWT',
  'toolName.html-entity': 'Codificador/Decodificador HTML Entity',
  'toolName.uuid-generator': 'Generador UUID',
  'toolName.password-generator': 'Generador de Contraseñas',
  'toolName.lorem-ipsum': 'Generador Lorem Ipsum',
  'toolName.qr-code': 'Generador de Código QR',
  'toolName.slug-generator': 'Generador de Slug',
  'toolName.md5-hash': 'Generador de Hash MD5',
  'toolName.sha256-hash': 'Generador de Hash SHA256',
  'toolName.regex-tester': 'Probador de Regex',
  'toolName.text-diff': 'Herramienta de Comparación de Texto',
  'toolName.markdown-preview': 'Vista Previa de Markdown',
  'toolName.timestamp-converter': 'Conversor de Marca de Tiempo',
  'toolName.color-converter': 'Conversor de Colores',
  'toolName.sql-formatter': 'Formateador SQL',
  'toolName.css-minifier': 'Minificador CSS',
  'toolName.js-minifier': 'Minificador JavaScript',
  'toolName.cron-parser': 'Analizador de Expresiones Cron',
  'toolName.json-to-typescript': 'JSON a TypeScript',
  'toolName.yaml-json': 'Conversor YAML ↔ JSON',
  'toolName.image-to-base64': 'Imagen a Base64',
  'toolName.css-gradient': 'Generador de Gradientes CSS',
  'toolName.meta-tags': 'Generador de Meta Tags',
  'toolName.case-converter': 'Conversor de Mayúsculas/Minúsculas',
  'toolName.word-counter': 'Contador de Palabras',
  'toolName.remove-duplicates': 'Eliminar Duplicados',
  'toolName.sort-lines': 'Ordenar Líneas',
  'toolName.hex-encoder': 'Codificador/Decodificador HEX',
  'toolName.binary-encoder': 'Codificador/Decodificador Binario',
  'toolName.html-formatter': 'Formateador HTML',
  'toolName.html-minifier': 'Minificador HTML',
  'toolName.xml-formatter': 'Formateador XML',
  'toolName.sha512-hash': 'Generador de Hash SHA512',
  'toolName.roman-numeral-converter': 'Conversor de Números Romanos',
  'toolName.number-base-converter': 'Conversor de Base Numérica',
  'toolName.unicode-escape': 'Codificador/Decodificador Unicode Escape',
  'toolName.json-string-escape': 'Escape de Cadenas JSON',
  'toolName.url-parser': 'Analizador de URL',
  'toolName.query-string-parser': 'Analizador de Query String',
  'toolName.regex-escape': 'Escape de Regex',
  'toolName.http-headers-parser': 'Analizador de Cabeceras HTTP',
  'toolName.http-status-codes': 'Códigos de Estado HTTP',
  'toolName.user-agent-parser': 'Analizador de User-Agent',
  'toolName.json-pointer': 'Evaluador de JSON Pointer',
  'toolName.chmod-calculator': 'Calculadora chmod',
  'toolName.cache-control': 'Analizador y generador de Cache-Control',
  'toolName.jsonpath-tester': 'Probador de JSONPath',
  'toolName.csp-builder': 'Generador y analizador de cabeceras CSP',
  'toolName.curl-to-fetch': 'Generador cURL y conversor a Fetch',
  // Tool Descriptions
  'toolDesc.json-formatter': 'Formatea, valida y limpia JSON con resaltado de sintaxis.',
  'toolDesc.json-validator':
    'Revisa errores de sintaxis JSON y ve la ubicación exacta al instante.',
  'toolDesc.json-schema-validator':
    'Valida documentos JSON con reglas JSON Schema y rutas de error detalladas.',
  'toolDesc.hmac-generator': 'Genera y verifica firmas HMAC-SHA en hexadecimal o Base64.',
  'toolDesc.pkce-generator': 'Genera y verifica pares de verificador y desafío OAuth PKCE S256.',
  'toolDesc.cidr-calculator':
    'Calcula redes IPv4, máscaras, direcciones de difusión y rangos de hosts utilizables.',
  'toolDesc.json-pointer':
    'Resuelve punteros RFC 6901 en documentos JSON con errores de ruta precisos.',
  'toolDesc.chmod-calculator':
    'Convierte permisos Unix entre formatos octal, simbólico y de casillas.',
  'toolDesc.cache-control': 'Analiza, normaliza y comprueba directivas HTTP Cache-Control.',
  'toolDesc.jsonpath-tester':
    'Consulta JSON con rutas, comodines, segmentos y descenso recursivo sin ejecutar scripts.',
  'toolDesc.csp-builder':
    'Crea, normaliza y revisa cabeceras Content Security Policy en busca de problemas de seguridad habituales.',
  'toolDesc.curl-to-fetch':
    'Crea solicitudes cURL o convierte entradas cURL compatibles a JavaScript Fetch sin ejecutar comandos.',
  'toolDesc.json-csv': 'Convierte arreglos JSON a CSV y archivos CSV de vuelta a JSON.',
  'toolDesc.base64': 'Codifica texto a Base64 o decodifica cadenas Base64 a texto.',
  'toolDesc.url-encoder': 'Codifica o decodifica cadenas y parámetros de URL de forma segura.',
  'toolDesc.jwt-decoder':
    'Decodifica tokens JWT e inspecciona encabezados y payload en el cliente.',
  'toolDesc.html-entity': 'Codifica caracteres especiales a entidades HTML o decodifícalos.',
  'toolDesc.uuid-generator':
    'Genera identificadores UUID v4 o v7 basados en tiempo, formatea lotes y expórtalos localmente.',
  'toolDesc.password-generator':
    'Crea contraseñas fuertes y aleatorias con opciones personalizables.',
  'toolDesc.lorem-ipsum': 'Genera texto de Lorem Ipsum por palabras, frases o párrafos.',
  'toolDesc.qr-code': 'Crea códigos QR desde texto o URLs para compartir rápido.',
  'toolDesc.slug-generator':
    'Convierte títulos en slugs limpios y amigables con SEO con transliteración.',
  'toolDesc.md5-hash': 'Genera hashes MD5 desde texto para checksums rápidos.',
  'toolDesc.sha256-hash': 'Genera hashes SHA256 desde texto para verificaciones de integridad.',
  'toolDesc.regex-tester': 'Prueba expresiones regulares con coincidencia en vivo y resaltados.',
  'toolDesc.text-diff': 'Compara dos textos lado a lado y resalta diferencias.',
  'toolDesc.markdown-preview': 'Escribe Markdown y previsualiza el HTML renderizado al instante.',
  'toolDesc.timestamp-converter': 'Convierte marcas de tiempo Unix a fechas legibles y viceversa.',
  'toolDesc.color-converter': 'Convierte colores entre formatos HEX, RGB y HSL.',
  'toolDesc.sql-formatter': 'Formatea consultas SQL con la indentación y capitalización correctas.',
  'toolDesc.css-minifier': 'Minimiza CSS eliminando espacios, comentarios y extras.',
  'toolDesc.js-minifier': 'Minimiza JavaScript quitando espacios, comentarios y bloat.',
  'toolDesc.cron-parser': 'Analiza expresiones cron y explica sus horarios.',
  'toolDesc.json-to-typescript': 'Genera interfaces o tipos TypeScript a partir de ejemplos JSON.',
  'toolDesc.yaml-json': 'Convierte YAML a JSON y JSON de vuelta a YAML.',
  'toolDesc.image-to-base64': 'Convierte imágenes a URIs de datos Base64 para incrustar.',
  'toolDesc.css-gradient': 'Diseña gradientes CSS y copia el código generado.',
  'toolDesc.meta-tags': 'Genera meta etiquetas SEO, Open Graph y Twitter Card.',
  'toolDesc.case-converter':
    'Convierte texto entre mayúsculas, minúsculas, título, camelCase y más.',
  'toolDesc.word-counter':
    'Cuenta palabras, caracteres, oraciones, párrafos y estima el tiempo de lectura.',
  'toolDesc.remove-duplicates': 'Elimina líneas duplicadas y vacías de tus listas de texto.',
  'toolDesc.sort-lines': 'Ordena líneas de texto alfabéticamente, numéricamente o aleatoriamente.',
  'toolDesc.hex-encoder': 'Codifica texto a hexadecimal o decodifica HEX a texto.',
  'toolDesc.binary-encoder': 'Codifica texto a binario o decodifica binario a texto.',
  'toolDesc.html-formatter': 'Formatea y embellece código HTML con sangría adecuada.',
  'toolDesc.html-minifier': 'Minifica HTML eliminando espacios, comentarios y extras.',
  'toolDesc.xml-formatter': 'Formatea y embellece código XML con sangría adecuada.',
  'toolDesc.sha512-hash': 'Genera hashes SHA512 desde texto para verificaciones de integridad.',
  'toolDesc.roman-numeral-converter': 'Convierte números a números romanos y viceversa.',
  'toolDesc.number-base-converter': 'Convierte números entre decimal, binario, hex y octal.',
  'toolDesc.unicode-escape':
    'Codifica texto plano a secuencias Unicode escape o decodifica texto escapado.',
  'toolDesc.json-string-escape': 'Escapa y desescapa contenido de cadenas JSON.',
  'toolDesc.url-parser': 'Analiza URL en protocolo, host, ruta, hash y parámetros de consulta.',
  'toolDesc.query-string-parser':
    'Analiza query strings a JSON y construye query strings desde JSON.',
  'toolDesc.regex-escape':
    'Escapa o desescapa texto para usarlo con seguridad en expresiones regulares.',
  'toolDesc.http-headers-parser':
    'Analiza cabeceras HTTP en bruto a JSON y construye cabeceras desde JSON.',
  'toolDesc.http-status-codes': 'Busca y consulta códigos de estado de respuesta HTTP comunes.',
  'toolDesc.user-agent-parser':
    'Analiza cadenas user-agent para detectar navegador, SO y dispositivo.',
  // Herramientas .env, Zod y Bcrypt
  'toolName.env-to-json': 'Conversor de .env a JSON',
  'toolDesc.env-to-json':
    'Convierte variables dotenv a JSON y viceversa sin subir valores de configuración.',
  'toolName.json-to-zod': 'JSON a esquema Zod',
  'toolDesc.json-to-zod':
    'Genera esquemas Zod y tipos TypeScript inferidos desde JSON representativo.',
  'toolName.bcrypt-generator': 'Generador y verificador Bcrypt',
  'toolDesc.bcrypt-generator':
    'Genera hashes bcrypt con sal y verifica contraseñas de prueba localmente.',
  ...enhancedToolTranslations.es,
};
