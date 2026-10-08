// Spanish catalog copy applied after enhanced metadata so translated text wins.
const tools: readonly (readonly [string, string, string])[] = [
  [
    'html-entity',
    'Codificador y decodificador de entidades HTML',
    'Codifica caracteres especiales como entidades HTML o decodifícalos de vuelta.',
  ],
  [
    'js-minifier',
    'Minificador JavaScript',
    'Minifica JavaScript eliminando espacios, comentarios y contenido innecesario.',
  ],
  [
    'md5-hash',
    'Generador de hashes MD5',
    'Genera hashes MD5 a partir de texto para obtener sumas de comprobación rápidas.',
  ],
  [
    'meta-tags',
    'Generador de metaetiquetas',
    'Genera metaetiquetas de SEO, Open Graph y Twitter Card.',
  ],
  [
    'query-string-parser',
    'Analizador de cadenas de consulta',
    'Analiza cadenas de consulta para convertirlas en JSON y crea cadenas de consulta a partir de JSON.',
  ],
  [
    'regex-escape',
    'Escape de expresiones regulares',
    'Escapa o desescapa texto para usarlo de forma segura en expresiones regulares.',
  ],
  [
    'unicode-escape',
    'Codificador y decodificador de escapes Unicode',
    'Codifica texto plano en secuencias de escape Unicode o decodifica texto escapado.',
  ],
  [
    'sha256-hash',
    'Generador de hashes SHA-256 y comprobador de archivos',
    'Calcula el hash SHA-256 de texto UTF-8 o un archivo local y compara el resumen del archivo con una suma de comprobación esperada de 64 caracteres de una fuente de confianza.',
  ],
  [
    'curl-to-fetch',
    'Conversor de cURL a Fetch y generador de solicitudes',
    'Convierte comandos cURL compatibles en código JavaScript fetch sin enviar solicitudes o crea fragmentos cURL y Fetch a partir de los campos de una solicitud.',
  ],
  [
    'file-checksum-comparator',
    'Calculadora y comparador de sumas de comprobación de archivos',
    'Calcula sumas de comprobación MD5, CRC32, SHA-1, SHA-256, SHA-384 y SHA-512 de texto o un archivo local y compáralas con un hash esperado de confianza.',
  ],
  [
    'openapi-validator',
    'Validador OpenAPI y explorador de operaciones',
    'Valida documentos OpenAPI 3 y explora operaciones de API localmente.',
  ],
  [
    'code-playground',
    'Editor y entorno de pruebas HTML/CSS/JS en tiempo real',
    'Editor de código interactivo con vista previa en tiempo real, compatibilidad con Tailwind y consola.',
  ],
  [
    'llm-pricing-calculator',
    'Calculadora de precios y tokens de modelos de lenguaje',
    'Compara costes de tokens y presupuestos mensuales de OpenAI, Claude, Gemini, DeepSeek y Llama.',
  ],
  [
    'css-glassmorphism-claymorphism',
    'Generador de efectos de vidrio y arcilla 3D CSS',
    'Diseña tarjetas de interfaz modernas con efectos de vidrio y arcilla 3D, desenfoque de fondo y sombras CSS.',
  ],
  [
    'css-clamp-calculator',
    'Calculadora de CSS clamp() fluido y tipografía adaptable',
    'Calcula fórmulas CSS clamp() para tamaños de fuente y márgenes fluidos según el ancho de pantalla.',
  ],
  [
    'llm-function-calling-builder',
    'Generador de esquemas de herramientas y llamadas a funciones para modelos de lenguaje',
    'Crea visualmente esquemas de llamadas a funciones y definiciones de herramientas para OpenAI, Claude y Gemini.',
  ],
  [
    'css-triangle-bubble-generator',
    'Generador de triángulos y bocadillos de diálogo CSS',
    'Genera flechas triangulares, mensajes emergentes y bocadillos de diálogo con colas indicadoras en CSS puro.',
  ],
  [
    'svg-to-css-data-uri',
    'Conversor de SVG a URI de datos y máscaras de fondo CSS',
    'Convierte código SVG en reglas CSS background-image y mask-image codificadas como URL o Base64.',
  ],
  [
    'system-prompt-xml-builder',
    'Generador de instrucciones de sistema XML para Claude y OpenAI',
    'Crea instrucciones de sistema estructuradas para Claude y OpenAI con jerarquías de etiquetas XML y restricciones.',
  ],
  [
    'nginx-to-caddy-converter',
    'Conversor de Nginx a Caddyfile y proxy inverso Apache',
    'Convierte bloques server y proxy_pass de Nginx en configuraciones modernas de Caddyfile y Apache VirtualHost.',
  ],
  [
    'bip39-generator',
    'Generador de frases mnemotécnicas BIP-39',
    'Genera y valida frases semilla mnemotécnicas de 12 o 24 palabras para criptomonedas.',
  ],
  [
    'cron-generator',
    'Generador visual de expresiones cron',
    'Crea expresiones cron estándar visualmente y consulta una vista previa de su programación.',
  ],
  [
    'css-box-shadow',
    'Generador de sombras de caja CSS',
    'Crea visualmente sombras de caja de varias capas y estilos con efecto de vidrio.',
  ],
  [
    'css-clamp',
    'Calculadora de valores fluidos CSS clamp()',
    'Calcula valores CSS clamp() para tipografía y espaciado fluidos que se adaptan al tamaño de pantalla.',
  ],
  [
    'dmarc-generator',
    'Generador de registros DMARC y SPF',
    'Genera registros DNS TXT de SPF, DMARC y DKIM para proteger el correo electrónico de tu dominio.',
  ],
  [
    'docker-run-to-compose',
    'Conversor de docker run a Compose',
    'Convierte comandos docker run en servicios de docker-compose.yml.',
  ],
  [
    'json-to-models',
    'JSON a modelos de varios lenguajes',
    'Genera estructuras de Go, modelos Pydantic de Python, estructuras Serde de Rust y modelos de C# a partir de JSON.',
  ],
  [
    'json-to-sql',
    'Conversor de JSON a SQL',
    'Genera consultas SQL INSERT y definiciones DDL CREATE TABLE a partir de datos JSON.',
  ],
  [
    'svg-minifier',
    'Optimizador y minificador de SVG',
    'Optimiza y reduce el tamaño de los archivos SVG con una vista previa en tiempo real.',
  ],
  [
    'svg-to-jsx',
    'Conversor de SVG a JSX / React',
    'Convierte marcado SVG en componentes React JSX/TSX con opciones personalizables.',
  ],
  [
    'quoted-printable-encoder',
    'Codificador y decodificador MIME Quoted-Printable',
    'Codifica y decodifica cadenas de texto MIME Quoted-Printable (RFC 2045) para datos de correo electrónico.',
  ],
  [
    'json-patch-generator',
    'Generador de parches JSON RFC 6902',
    'Genera operaciones de parche JSON estándar RFC 6902 a partir de las diferencias entre dos objetos.',
  ],
  [
    'json-flatten-unflatten',
    'Aplanador de objetos JSON anidados',
    'Aplana objetos JSON profundamente anidados en claves de un solo nivel con notación de puntos.',
  ],
  [
    'morse-code-audio-converter',
    'Codificador de texto a código morse',
    'Convierte texto alfanumérico en código morse internacional.',
  ],
  [
    'base64url-encoder',
    'Codificador y decodificador Base64URL',
    'Codifica y decodifica Base64 apto para URL sin caracteres de relleno.',
  ],
  [
    'subtitle-srt-vtt-converter',
    'Conversor de subtítulos SRT a WebVTT',
    'Convierte subtítulos SubRip (.srt) al formato HTML5 WebVTT (.vtt).',
  ],
  [
    'sql-slugifier',
    'Generador de identificadores SQL normalizados',
    'Convierte texto en identificadores snake_case válidos para tablas y columnas SQL.',
  ],
  [
    'ai-agent-prompt-optimizer',
    'Optimizador de instrucciones para agentes de IA',
    'Estructura la personalidad, las restricciones y las instrucciones de objetivos de un agente autónomo de IA.',
  ],
  [
    'apache-conf-formatter',
    'Formateador de configuración VirtualHost de Apache',
    'Formatea y aplica sangría a las directivas VirtualHost y Directory de Apache HTTP Server.',
  ],
  [
    'docker-compose-formatter',
    'Formateador YAML de Docker Compose',
    'Formatea y corrige la sangría con tabulaciones en archivos docker-compose.yml.',
  ],
  [
    'toml-formatter',
    'Formateador de archivos de configuración TOML',
    'Formatea y organiza claves de configuración y encabezados de tablas TOML.',
  ],
  [
    'protobuf-formatter',
    'Formateador de Protocol Buffers (.proto)',
    'Formatea y aplica sangría a las definiciones de servicios y mensajes Protobuf proto3.',
  ],
  [
    'totp-authenticator-simulator',
    'Simulador de autenticador TOTP RFC 6238',
    'Genera contraseñas de un solo uso basadas en el tiempo (TOTP) de 6 dígitos con un temporizador de cuenta atrás.',
  ],
  [
    'ed25519-key-generator',
    'Generador de pares de claves Ed25519',
    'Genera pares de claves criptográficas públicas y privadas Ed25519.',
  ],
  [
    'x509-csr-decoder',
    'Decodificador de solicitudes de firma de certificados X.509 (CSR)',
    'Decodifica e inspecciona solicitudes de firma de certificados (CSR) codificadas en PEM.',
  ],
  [
    'abi-encoder-decoder',
    'Codificador de parámetros ABI de Solidity',
    'Codifica parámetros de funciones en cargas hexadecimales de 32 bytes para la ABI de Solidity.',
  ],
  [
    'ethereum-keccak256-hasher',
    'Calculadora de hashes Keccak-256 y selectores de Ethereum',
    'Calcula hashes Keccak-256 y selectores de funciones de contratos inteligentes de 4 bytes.',
  ],
  [
    'solana-address-validator',
    'Validador de direcciones Base58 de Solana',
    'Valida direcciones de claves públicas de Solana y su codificación de caracteres Base58.',
  ],
  [
    'mongodb-aggregate-builder',
    'Generador de canalizaciones de agregación MongoDB',
    'Crea canalizaciones de agregación MongoDB de varias etapas ($match, $group, $sort).',
  ],
  [
    'clickhouse-ddl-generator',
    'Generador de DDL MergeTree de ClickHouse',
    'Genera definiciones DDL CREATE TABLE optimizadas para ClickHouse con motores MergeTree.',
  ],
  [
    'elasticsearch-query-builder',
    'Generador de consultas DSL de Elasticsearch',
    'Genera consultas de búsqueda booleanas de Elasticsearch en JSON estructurado con filtros.',
  ],
  [
    'react-hook-form-generator',
    'Generador de componentes React Hook Form',
    'Genera componentes React Hook Form listos para usar con reglas de validación.',
  ],
  [
    'gitlab-ci-generator',
    'Generador de canalizaciones CI/CD de GitLab',
    'Crea archivos de configuración de canalizaciones .gitlab-ci.yml de varias etapas.',
  ],
  [
    'kubernetes-ingress-generator',
    'Generador de Ingress de Kubernetes y Cert-Manager',
    'Genera manifiestos Ingress de Kubernetes con terminación TLS y anotaciones de Cert-Manager.',
  ],
  [
    'ollama-modelfile-generator',
    'Generador de Modelfile de Ollama',
    'Crea configuraciones Modelfile personalizadas con instrucciones del sistema y parámetros para Ollama.',
  ],
  [
    'cloudflare-wrangler-builder',
    'Generador de configuración de Cloudflare Wrangler',
    'Genera archivos de configuración wrangler.json para Cloudflare Workers, KV y D1.',
  ],
  [
    'github-actions-matrix-builder',
    'Generador de flujos CI con matrices de GitHub Actions',
    'Crea flujos de compilación con matrices de varios sistemas operativos y versiones para CI/CD en GitHub Actions.',
  ],
  [
    'tailwind-v4-color-palette',
    'Generador de paletas de colores OKLCH para Tailwind CSS v4',
    'Genera escalas de colores OKLCH modernas de 50 a 950 para Tailwind CSS v4.',
  ],
  [
    'shadcn-theme-generator',
    'Generador de temas y variables CSS de Shadcn UI',
    'Crea paletas de colores y variables CSS personalizadas para componentes de Shadcn UI y Radix.',
  ],
  [
    'svg-to-webp',
    'Conversor de SVG a URI de datos WebP',
    'Codifica gráficos vectoriales SVG en URI de datos Base64 de alto rendimiento.',
  ],
  [
    'docker-to-compose',
    'Conversor de docker run a Docker Compose',
    'Convierte comandos individuales docker run del terminal en servicios estándar de docker-compose.yml.',
  ],
  [
    'har-to-k6',
    'Conversor de HAR a scripts de pruebas de carga k6',
    'Convierte registros de red del navegador en formato HTTP Archive (HAR) en scripts de pruebas de rendimiento k6.',
  ],
  [
    'json-to-graphql-query',
    'Generador de consultas GraphQL a partir de JSON',
    'Genera consultas GraphQL estructuradas y campos de selección a partir de objetos JSON.',
  ],
  [
    'avro-to-json-schema',
    'Conversor de Apache Avro a JSON Schema',
    'Convierte definiciones de esquemas de registros Apache Avro en especificaciones JSON Schema.',
  ],
  [
    'openapi-to-typescript-fetch',
    'OpenAPI a cliente Fetch de TypeScript',
    'Genera funciones de cliente de API fetch con tipos a partir de especificaciones OpenAPI 3.0 y Swagger.',
  ],
  [
    'postman-to-curl',
    'Colección Postman a script cURL',
    'Convierte solicitudes JSON exportadas de colecciones Postman en comandos cURL ejecutables en un terminal.',
  ],
  [
    'svg-to-react-native',
    'Conversor de SVG a React Native (SVGR)',
    'Transforma gráficos vectoriales SVG en componentes JSX de react-native-svg.',
  ],
  [
    'json-schema-to-zod',
    'Conversor de JSON Schema a Zod',
    'Convierte definiciones JSON Schema en objetos de validación Zod de TypeScript.',
  ],
  [
    'zod-to-json-schema',
    'Conversor de Zod a JSON Schema',
    'Convierte esquemas de objetos Zod de TypeScript en definiciones estándar JSON Schema draft-07.',
  ],
  [
    'aspect-ratio-resizer',
    'Calculadora de relación de aspecto y resolución',
    'Calcula relaciones de aspecto estándar (16:9, 4:3, 21:9) y ajusta las dimensiones de resolución.',
  ],
  [
    'subresource-integrity-generator',
    'Generador de hashes de integridad de subrecursos (SRI)',
    'Genera hashes de integridad seguros sha384 y sha512 para etiquetas de scripts y hojas de estilo de CDN.',
  ],
  [
    'csp-evaluator',
    'Evaluador de políticas de seguridad de contenido (CSP)',
    'Analiza cabeceras Content Security Policy en busca de directivas ausentes y vulnerabilidades XSS.',
  ],
  [
    'nginx-rate-limit-calculator',
    'Generador de directivas de límites de solicitudes de Nginx',
    'Genera directivas limit_req_zone optimizadas para limitar solicitudes en proxies inversos de Nginx.',
  ],
  [
    'cron-next-runs-visualizer',
    'Calculadora de las próximas 20 ejecuciones cron',
    'Calcula y previsualiza las marcas de tiempo exactas de las próximas 20 ejecuciones de cualquier programación cron.',
  ],
  [
    'rag-chunking-visualizer',
    'Visualizador de segmentación semántica RAG',
    'Visualiza la división del texto de documentos en fragmentos con tamaños de tokens personalizados y ventanas deslizantes superpuestas.',
  ],
  [
    'mcp-inspector',
    'Inspector de Model Context Protocol (MCP)',
    'Valida e inspecciona solicitudes, respuestas y cargas de notificaciones MCP JSON-RPC 2.0.',
  ],
  [
    'tiktoken-visualizer',
    'Visualizador del tokenizador BPE Tiktoken',
    'Visualiza el desglose de tokens y su segmentación por colores para los modelos BPE de OpenAI y Llama.',
  ],
  [
    'claude-token-counter',
    'Calculadora de tokens y costes de Claude',
    'Calcula el número de tokens y los precios de los modelos Claude 3.5 Sonnet, Haiku y Opus.',
  ],
  [
    'deepseek-token-counter',
    'Calculadora de tokens y costes de DeepSeek',
    'Calcula el número exacto de tokens BPE y los costes de inferencia de API de los modelos DeepSeek V3 y DeepSeek R1.',
  ],
  [
    'px-to-rem',
    'Conversor de PX a REM y EM',
    'Convierte dimensiones en píxeles a REM, EM, VW, VH y otras unidades CSS.',
  ],
  [
    'mock-data-generator',
    'Generador de datos ficticios JSON',
    'Genera conjuntos de datos JSON ficticios y realistas de usuarios, productos y pedidos.',
  ],
  [
    'csv-to-markdown',
    'Conversor de CSV a tablas Markdown',
    'Convierte hojas de cálculo CSV y TSV en tablas de Markdown con la sintaxis de GitHub.',
  ],
  [
    'curl-to-code',
    'cURL a código en varios lenguajes',
    'Convierte comandos cURL a JavaScript Fetch, Axios, Python, Go, PHP y Rust.',
  ],
  [
    'rsa-key-pair-generator',
    'Generador de pares de claves RSA y ECDSA',
    'Genera pares de claves públicas y privadas RSA y ECDSA en formato PEM de forma segura en el navegador.',
  ],
  [
    'svg-optimizer',
    'Optimizador y limpiador de SVG',
    'Minifica código SVG, elimina metadatos del editor, limpia trazados y revisa el ahorro de bytes.',
  ],
  [
    'html-table-to-json',
    'Conversor de tablas HTML a JSON',
    'Extrae y analiza el marcado de tablas HTML para convertirlo en objetos o arrays JSON estructurados.',
  ],
  [
    'favicon-generator',
    'Generador de favicons e iconos de aplicaciones',
    'Genera iconos de 16x16, 32x32 y Apple Touch, un manifiesto web y etiquetas link de HTML.',
  ],
  [
    'gitignore-generator',
    'Generador de .gitignore',
    'Genera archivos .gitignore personalizados para Node, Python, Java, Go, Rust, macOS y entornos de desarrollo.',
  ],
  [
    'htpasswd-generator',
    'Generador de .htpasswd',
    'Genera hashes de contraseñas Bcrypt, MD5 y SHA-1 para la autenticación HTTP básica de Apache y Nginx.',
  ],
  [
    'dockerfile-generator',
    'Generador de Dockerfile',
    'Genera Dockerfiles de varias etapas listos para producción para Node, Python, Go, Rust y Nginx.',
  ],
  [
    'css-glassmorphism',
    'Generador de efectos de vidrio CSS',
    'Diseña tarjetas de interfaz con efecto de vidrio esmerilado, desenfoque y opacidad en tiempo real, y Tailwind CSS.',
  ],
  [
    'css-grid-generator',
    'Generador de diseños CSS Grid',
    'Crea diseños CSS Grid personalizados con elementos que abarcan filas o columnas, espacios y una vista previa interactiva.',
  ],
  [
    'css-blob-generator',
    'Generador de formas orgánicas CSS y SVG',
    'Genera formas orgánicas suaves mediante valores CSS border-radius y trazados SVG.',
  ],
  [
    'robots-txt-generator',
    'Generador y comprobador de robots.txt',
    'Crea archivos robots.txt optimizados para SEO con agentes de usuario, reglas disallow y mapas del sitio personalizados.',
  ],
  [
    'sitemap-generator',
    'Generador de mapas del sitio XML',
    'Genera archivos sitemap.xml válidos con etiquetas lastmod, changefreq y priority a partir de listas de URL.',
  ],
  [
    'sql-to-json',
    'Conversor de SQL a JSON',
    'Convierte sentencias SQL INSERT y volcados de tablas en arrays y objetos JSON estructurados.',
  ],
  [
    'totp-generator',
    'Generador de autenticación 2FA / TOTP',
    'Genera códigos de seguridad TOTP RFC 6238, secretos Base32 y URI QR otpauth://.',
  ],
  [
    'markdown-table-generator',
    'Generador de tablas Markdown',
    'Crea, edita y formatea tablas Markdown de GitHub con un editor de hojas de cálculo interactivo.',
  ],
  [
    'key-code-info',
    'Información de códigos de teclas JavaScript',
    'Inspecciona los valores de teclado event.key, code, which y keyCode al pulsar teclas en tiempo real.',
  ],
  [
    'aspect-ratio-calculator',
    'Calculadora de relación de aspecto',
    'Calcula relaciones de aspecto de imágenes y vídeos de 16:9, 4:3 y 21:9 con ajustes de tamaño proporcionales.',
  ],
  [
    'base64-to-image',
    'Decodificador de Base64 a imagen',
    'Decodifica cadenas Base64 y URI de datos para obtener archivos de imagen PNG, JPG, WebP y SVG.',
  ],
  [
    'html-to-markdown',
    'Conversor de HTML a Markdown',
    'Convierte marcado HTML, encabezados, enlaces, citas en bloque y listas en Markdown limpio.',
  ],
  [
    'css-triangle-generator',
    'Generador de triángulos CSS',
    'Genera triángulos con bordes de CSS puro y mensajes emergentes que apuntan en cualquier dirección.',
  ],
  [
    'svg-placeholder-generator',
    'Generador de imágenes de ejemplo SVG',
    'Genera imágenes de ejemplo SVG y URI de datos con dimensiones y texto personalizados.',
  ],
  [
    'css-flexbox-generator',
    'Generador de CSS Flexbox',
    'Experimenta visualmente con contenedores y elementos CSS Flexbox de forma interactiva y exporta el código.',
  ],
  [
    'open-graph-previewer',
    'Vista previa de Open Graph y redes sociales',
    'Previsualiza tarjetas para compartir en Twitter, Facebook, LinkedIn y Discord, y resultados de búsqueda de Google.',
  ],
  [
    'ascii-art-generator',
    'Generador de arte y rótulos ASCII',
    'Genera rótulos grandes con tipografía ASCII para comentarios de código, archivos README y terminales.',
  ],
  [
    'css-animation-generator',
    'Generador de animaciones CSS',
    'Genera animaciones CSS con fotogramas clave (rebote, pulso, sacudida, giro y volteo) y vista previa en tiempo real.',
  ],
  [
    'markdown-to-html',
    'Conversor de Markdown a HTML',
    'Convierte sintaxis Markdown en marcado HTML formateado o minificado.',
  ],
  [
    'css-text-shadow',
    'Generador de sombras de texto CSS',
    'Genera sombras de texto de varias capas, tipografía 3D y efectos CSS de brillo neón.',
  ],
  [
    'time-duration-calculator',
    'Calculadora de duración y diferencia entre fechas',
    'Calcula el tiempo exacto transcurrido entre dos fechas y convierte entre unidades de tiempo.',
  ],
  [
    'xml-to-json',
    'XML a JSON y JSON a XML',
    'Convierte datos XML en JSON estructurado y objetos JSON en marcado XML válido.',
  ],
  [
    'list-to-sql-in',
    'Lista a cláusula SQL IN',
    'Convierte listas de texto, columnas de identificadores y hojas de cálculo en cláusulas SQL IN formateadas.',
  ],
  [
    'svg-to-png',
    'Conversor de SVG a PNG / JPG / WebP',
    'Convierte gráficos vectoriales SVG en imágenes de mapa de bits de alta resolución (PNG, JPEG, WebP).',
  ],
  [
    'ip-subnet-calculator',
    'Calculadora de subredes IPv4',
    'Calcula la dirección de red, la de difusión, el rango de IP de hosts utilizables, la máscara de subred y el CIDR.',
  ],
  [
    'css-filter-generator',
    'Generador de filtros CSS',
    'Genera filtros CSS de imágenes: desenfoque, brillo, contraste, escala de grises, tono y sepia.',
  ],
  [
    'bcrypt-verifier',
    'Verificador de hashes Bcrypt',
    'Verifica contraseñas en texto plano frente a hashes Bcrypt e inspecciona su coste y rondas de procesamiento.',
  ],
  [
    'css-border-radius',
    'Radio de borde CSS de 8 puntos',
    'Genera valores border-radius asimétricos de 8 puntos, formas orgánicas y cuadrados redondeados.',
  ],
  [
    'jwt-generator',
    'Generador de tokens JWT',
    'Crea y firma tokens JWT personalizados con HMAC-SHA256, fecha de caducidad y declaraciones en la carga útil.',
  ],
  [
    'ulid-generator',
    'Generador de ULID y UUID v7',
    'Genera ULID de 128 bits e identificadores UUID v7 que se pueden ordenar por marca de tiempo.',
  ],
  [
    'curl-builder',
    'Generador de comandos cURL',
    'Crea solicitudes de API visualmente y exporta comandos cURL ejecutables en un terminal.',
  ],
  [
    'base64-to-pdf',
    'Conversor de Base64 a PDF',
    'Decodifica cadenas Base64 directamente en un visor de documentos PDF en el navegador con opción de descarga.',
  ],
  [
    'css-neumorphism',
    'Generador de neumorfismo CSS',
    'Genera sombras suaves de interfaz, profundidad interior y formas convexas mediante CSS puro.',
  ],
  [
    'string-byte-counter',
    'Contador de bytes de cadenas y UTF-8',
    'Calcula la longitud en bytes UTF-8, el número de caracteres y los límites de columnas VARCHAR de bases de datos.',
  ],
  [
    'css-mesh-gradient',
    'Generador de degradados de malla CSS',
    'Genera degradados de malla con varios puntos y degradados radiales de aura para fondos de secciones destacadas.',
  ],
  [
    'html-to-jsx',
    'Conversor de HTML a JSX / React',
    'Convierte marcado HTML en componentes React JSX con atributos camelCase y estilos en línea.',
  ],
  [
    'css-clip-path',
    'Generador de polígonos y clip-path CSS',
    'Diseña visualmente polígonos clip-path, formas geométricas y máscaras personalizadas con CSS puro.',
  ],
  [
    'css-scrollbar-generator',
    'Generador de barras de desplazamiento CSS personalizadas',
    'Genera estilos de barras de desplazamiento con pseudoelementos WebKit y la propiedad estándar scrollbar-color.',
  ],
  [
    'css-pattern-generator',
    'Generador de patrones de fondo CSS',
    'Crea patrones de fondo repetidos con CSS puro, como cuadrículas de puntos, rayas y planos.',
  ],
  [
    'svg-path-visualizer',
    'Visualizador e inspector de trazados SVG',
    'Visualiza, inspecciona y analiza comandos y coordenadas del atributo d de trazados SVG.',
  ],
  [
    'color-palette-generator',
    'Generador de paletas de colores de Tailwind',
    'Genera escalas accesibles de tonos de 50 a 950 y paletas armónicas a partir de cualquier color hexadecimal.',
  ],
  [
    'csv-to-sql-insert',
    'Generador de SQL INSERT a partir de CSV',
    'Convierte hojas de cálculo CSV en sentencias SQL INSERT por lotes para PostgreSQL, MySQL y SQLite.',
  ],
  [
    'sql-minifier',
    'Minificador de consultas SQL',
    'Elimina comentarios y espacios para comprimir consultas SQL en sentencias compactas de una sola línea.',
  ],
  [
    'json-to-graphql',
    'Generador de esquemas GraphQL a partir de JSON',
    'Infiere automáticamente tipos, entradas y esquemas GraphQL a partir de ejemplos de cargas JSON.',
  ],
  [
    'tsv-to-json',
    'Conversor de TSV a JSON',
    'Convierte valores separados por tabulaciones (TSV) en arrays JSON estructurados y viceversa.',
  ],
  [
    'ndjson-to-json',
    'Conversor de NDJSON / JSONL a JSON',
    'Convierte flujos de registros JSON separados por saltos de línea en arrays JSON estándar y viceversa.',
  ],
  [
    'json-size-analyzer',
    'Analizador de tamaño y memoria de JSON',
    'Analiza el tamaño de JSON en bytes, la profundidad de anidación, la distribución de objetos y el ahorro por minificación.',
  ],
  [
    'hex-to-base64',
    'Conversor de hexadecimal a Base64',
    'Convierte cadenas de bytes hexadecimales en codificación Base64 y viceversa.',
  ],
  [
    'punycode-converter',
    'Conversor de dominios Punycode e IDN',
    'Convierte nombres de dominio internacionalizados (IDN) entre Unicode y Punycode ASCII (xn--).',
  ],
  [
    'morse-code-converter',
    'Traductor de texto y audio de código morse',
    'Traduce texto plano a código morse con reproducción de audio en tiempo real y decodifícalo de vuelta.',
  ],
  [
    'base32-encoder',
    'Codificador y decodificador Base32',
    'Codifica y decodifica cadenas en formato Base32 RFC 4648 para semillas de 2FA y tokens.',
  ],
  [
    'password-strength-analyzer',
    'Analizador de seguridad y entropía de contraseñas',
    'Calcula los bits de entropía de contraseñas, estimaciones del tiempo de descifrado por fuerza bruta y puntuaciones de complejidad.',
  ],
  [
    'semver-calculator',
    'Calculadora de versiones y rangos SemVer',
    'Evalúa rangos de versiones semánticas, comprueba restricciones satisfies de npm y aumenta números de versión.',
  ],
  [
    'ipv6-subnet-calculator',
    'Calculadora de subredes y prefijos IPv6',
    'Expande, comprime y calcula rangos de prefijos IPv6, subredes CIDR y tipos de direcciones.',
  ],
  [
    'mac-address-generator',
    'Generador y formateador de direcciones MAC',
    'Genera direcciones MAC aleatorias unicast y multicast con dos puntos, guiones o notación Cisco.',
  ],
  [
    'crontab-descriptor',
    'Explicador de expresiones crontab',
    'Traduce expresiones de programación cron en descripciones en inglés fáciles de leer.',
  ],
  [
    'htaccess-to-nginx',
    'Conversor de .htaccess de Apache a Nginx',
    'Convierte reglas mod_rewrite, redirecciones y cabeceras de Apache en bloques server de Nginx.',
  ],
  [
    'dns-record-generator',
    'Generador de registros DNS de seguridad del correo',
    'Genera registros TXT de SPF, DKIM y DMARC para autenticar dominios de correo electrónico.',
  ],
  [
    'slug-to-title',
    'Conversor de slug a título y formatos de mayúsculas',
    'Convierte slugs de URL en títulos con iniciales mayúsculas, formato de oración, PascalCase y camelCase.',
  ],
  [
    'text-obfuscator',
    'Detector de caracteres invisibles y de ancho cero',
    'Detecta y elimina espacios ocultos de ancho cero, marcas Unicode y formatos invisibles.',
  ],
  [
    'csv-column-extractor',
    'Extractor y filtro de columnas CSV',
    'Selecciona, extrae y reordena columnas específicas de archivos de datos CSV grandes.',
  ],
  [
    'sql-to-typescript',
    'Tabla SQL a interfaz TypeScript',
    'Convierte definiciones de esquemas SQL CREATE TABLE en interfaces TypeScript con seguridad de tipos.',
  ],
  [
    'json-to-env',
    'Conversor de JSON a .env',
    'Aplana objetos JSON anidados en variables de entorno de clave y valor, y viceversa.',
  ],
  [
    'json-minifier',
    'Minificador y serializador de JSON',
    'Minifica archivos JSON eliminando espacios para reducir el ancho de banda de las cargas de API.',
  ],
  [
    'markdown-table-to-csv',
    'Conversor de tablas Markdown a CSV',
    'Convierte tablas Markdown de GitHub en archivos CSV para hojas de cálculo y descargas de Excel.',
  ],
  [
    'llm-token-counter',
    'Calculadora de tokens y costes de modelos de lenguaje',
    'Estima el número de tokens y los costes de inferencia de API para GPT-4o, Claude 3.5, Gemini y Llama 3.',
  ],
  [
    'openai-function-schema',
    'Generador de esquemas de llamadas a funciones de OpenAI',
    'Convierte objetos JSON en esquemas estructurados de parámetros de herramientas y llamadas a funciones de OpenAI.',
  ],
  [
    'prompt-template-formatter',
    'Compilador e interpolador de plantillas de instrucciones',
    'Interpola variables y valida marcadores de posición en plantillas Jinja2 y Mustache de instrucciones para IA.',
  ],
  [
    'embedding-similarity',
    'Calculadora de similitud de vectores de embeddings',
    'Calcula la similitud coseno, la distancia euclídea y el producto escalar entre vectores de embeddings.',
  ],
  [
    'text-chunk-splitter',
    'Segmentador de texto RAG y simulador de ventanas de tokens',
    'Divide documentos en fragmentos superpuestos de tokens o caracteres para canalizaciones RAG de búsqueda vectorial.',
  ],
  [
    'jsonl-dataset-validator',
    'Validador de JSONL para ajuste fino de OpenAI',
    'Valida archivos de conjuntos de datos JSONL y estructuras de mensajes para el ajuste fino de modelos de OpenAI y Gemini.',
  ],
  [
    'prompt-format-converter',
    'Conversor de instrucciones ChatML, Anthropic y Llama 3',
    'Convierte instrucciones de chat entre los formatos ChatML, Human/Assistant de Anthropic y plantillas de Llama 3.',
  ],
  [
    'sampling-curve-visualizer',
    'Visualizador de curvas de muestreo de temperatura y Top-P de modelos de lenguaje',
    'Simula y visualiza distribuciones de probabilidad de tokens con muestreo de temperatura, Top-P y Top-K.',
  ],
  [
    'system-prompt-formatter',
    'Generador y formateador Markdown de instrucciones de sistema de IA',
    'Formatea y estructura instrucciones de sistema de IA con roles, directrices, formatos de salida y ejemplos.',
  ],
  [
    'prompt-diff',
    'Comparador de versiones y diferencias semánticas de instrucciones de IA',
    'Compara dos versiones de instrucciones para resaltar cambios de líneas, palabras añadidas y diferencias de tokens.',
  ],
  [
    'css-to-tailwind',
    'Conversor de CSS a Tailwind CSS',
    'Convierte reglas CSS estándar y bloques de declaraciones en clases de utilidad de Tailwind CSS.',
  ],
  [
    'tailwind-to-css',
    'Conversor de Tailwind a CSS estándar',
    'Convierte clases de Tailwind CSS en hojas de estilo CSS estándar reutilizables.',
  ],
  [
    'css-specificity-calculator',
    'Calculadora e inspector de especificidad CSS',
    'Calcula tuplas de especificidad de selectores (ID, clases y elementos) y compara qué reglas prevalecen en la cascada.',
  ],
  [
    'css-keyframes-generator',
    'Generador de cronologías de animación CSS con fotogramas clave',
    'Genera animaciones CSS @keyframes de varios pasos y reglas de tiempo con vista previa en tiempo real.',
  ],
  [
    'tailwind-class-sorter',
    'Ordenador y formateador de clases Tailwind',
    'Ordena y elimina clases duplicadas de Tailwind CSS siguiendo la jerarquía oficial de orden de Prettier.',
  ],
  [
    'fluid-typography',
    'Calculadora de tipografía fluida CSS y clamp()',
    'Calcula fórmulas adaptables CSS clamp() para tamaños de fuente fluidos entre puntos de ruptura de la ventana.',
  ],
  [
    'css-media-query-builder',
    'Generador de rangos de consultas de medios CSS',
    'Crea consultas CSS @media con sintaxis moderna de rangos y filtros de modo oscuro y preferencias de movimiento.',
  ],
  [
    'css-grid-area-builder',
    'Generador de áreas de plantillas CSS Grid',
    'Genera visualmente declaraciones de diseño CSS grid-template-areas y matrices de áreas adaptables.',
  ],
  [
    'css-cubic-bezier',
    'Diseñador de curvas CSS cubic-bezier',
    'Diseña y previsualiza funciones de tiempo cubic-bezier personalizadas con ajustes de resorte y rebote.',
  ],
  [
    'color-harmony-generator',
    'Generador de armonías y paletas de colores',
    'Genera armonías de colores complementarias, triádicas y análogas con códigos hexadecimales y HSL.',
  ],
  [
    'json-to-pydantic',
    'JSON a modelos Python Pydantic V2',
    'Convierte cargas JSON en definiciones de clases BaseModel de Python Pydantic V2 con seguridad de tipos.',
  ],
  [
    'json-to-rust-serde',
    'Conversor de JSON a estructuras Rust Serde',
    'Convierte objetos JSON en definiciones struct de Rust con atributos derive de serde.',
  ],
  [
    'json-to-swift',
    'Conversor de JSON a estructuras Swift Codable',
    'Convierte respuestas JSON de API en estructuras de datos Swift Codable e Identifiable.',
  ],
  [
    'json-to-kotlin',
    'Conversor de JSON a clases de datos Kotlin',
    'Convierte JSON en clases de datos Kotlin con anotaciones @Serializable y @SerialName.',
  ],
  [
    'json-to-csharp',
    'Conversor de JSON a clases C#',
    'Convierte JSON en clases C# fuertemente tipadas con atributos de System.Text.Json.',
  ],
  [
    'json-to-java-pojo',
    'Conversor de JSON a POJO de Java con Lombok',
    'Convierte objetos JSON en clases POJO de Java con Lombok @Data y anotaciones de Jackson.',
  ],
  [
    'typescript-to-json-schema',
    'Conversor de TypeScript a JSON Schema',
    'Convierte definiciones de interfaces TypeScript en JSON Schema estándar Draft 7/2020-12.',
  ],
  [
    'yaml-to-typescript',
    'Conversor de YAML a interfaces TypeScript',
    'Convierte documentos de configuración YAML directamente en interfaces TypeScript con tipos.',
  ],
  [
    'graphql-to-typescript',
    'Conversor de GraphQL SDL a tipos TypeScript',
    'Convierte tipos del lenguaje de definición de esquemas GraphQL (SDL) en interfaces TypeScript.',
  ],
  [
    'protobuf-to-json',
    'Conversor de Protobuf (proto3) a JSON Schema',
    'Convierte esquemas de mensajes Protocol Buffers en definiciones JSON Schema estándar.',
  ],
  [
    'sql-to-mongodb',
    'Conversor de SQL a consultas MongoDB',
    'Convierte consultas SQL SELECT y WHERE en sintaxis db.collection.find() de MongoDB.',
  ],
  [
    'json-to-sql-ddl',
    'Generador de DDL SQL CREATE TABLE a partir de JSON',
    'Infiere tipos de columnas de bases de datos a partir de JSON y genera esquemas DDL SQL CREATE TABLE.',
  ],
  [
    'sql-explainer',
    'Explicador visual de consultas SQL',
    'Desglosa uniones, filtros y agregaciones complejos de SQL SELECT en pasos sencillos en inglés.',
  ],
  [
    'postgres-connection-builder',
    'Generador y analizador de URI de conexión PostgreSQL',
    'Crea y analiza cadenas y parámetros de conexión a bases de datos PostgreSQL.',
  ],
  [
    'redis-command-generator',
    'Generador de comandos Redis y asistente de claves',
    'Crea comandos de Redis CLI para hashes, conjuntos, conjuntos ordenados, listas y tiempos de caducidad TTL.',
  ],
  [
    'csv-to-parquet-schema',
    'Conversor de CSV a esquemas Apache Parquet',
    'Inspecciona cabeceras CSV y genera declaraciones de esquemas Apache Parquet para PyArrow.',
  ],
  [
    'mongodb-objectid-parser',
    'Analizador de marcas de tiempo y metadatos de MongoDB ObjectId',
    'Extrae marcas de tiempo de creación, identificadores de máquina e ID de proceso de MongoDB ObjectId.',
  ],
  [
    'sql-index-advisor',
    'Asesor de índices compuestos B-tree de SQL',
    'Analiza cláusulas SQL WHERE y JOIN para recomendar índices compuestos B-tree óptimos para bases de datos.',
  ],
  [
    'postgres-to-mysql',
    'Conversor del dialecto PostgreSQL a MySQL',
    'Convierte el dialecto SQL y los tipos de datos PostgreSQL en sintaxis de esquemas compatible con MySQL.',
  ],
  [
    'prisma-to-sql',
    'Generador de DDL SQL a partir de esquemas Prisma',
    'Convierte modelos de esquemas Prisma ORM en sentencias SQL CREATE TABLE.',
  ],
  [
    'docker-compose-to-k8s',
    'Conversor de Docker Compose a YAML de Kubernetes',
    'Convierte servicios de docker-compose.yml en manifiestos Deployment y Service de Kubernetes.',
  ],
  [
    'nginx-formatter',
    'Formateador y validador de configuración Nginx',
    'Formatea y aplica sangría a bloques server, directivas location y configuraciones upstream de Nginx.',
  ],
  [
    'terraform-formatter',
    'Formateador y analizador HCL de Terraform',
    'Formatea archivos de configuración HashiCorp Terraform (.tf) con sangría estándar de 2 espacios.',
  ],
  [
    'kubeconfig-validator',
    'Validador de Kubeconfig de Kubernetes',
    'Valida archivos YAML Kubeconfig, contextos de clúster, direcciones de servidores y credenciales de usuarios.',
  ],
  [
    'helm-values-evaluator',
    'Evaluador de plantillas Helm y values.yaml',
    'Simula la interpolación de variables en plantillas Helm con datos values.yaml personalizados.',
  ],
  [
    'dockerfile-linter',
    'Analizador de Dockerfile y buenas prácticas',
    'Analiza Dockerfiles para detectar problemas de caché, capas innecesarias y buenas prácticas de seguridad de contenedores.',
  ],
  [
    'systemd-unit-generator',
    'Generador de unidades de servicio systemd de Linux',
    'Genera archivos de configuración de unidades systemd .service para procesos de servicio de Node.js, Python y Go.',
  ],
  [
    'caddy-to-nginx',
    'Conversor de Caddyfile a proxy inverso Nginx',
    'Convierte bloques de proxy inverso Caddy en configuraciones de servidor Nginx listas para producción.',
  ],
  [
    'aws-iam-policy-builder',
    'Generador y validador de políticas JSON de AWS IAM',
    'Crea y valida declaraciones de políticas JSON de AWS IAM con los campos Effect, Action y Resource.',
  ],
  [
    'prometheus-alert-builder',
    'Generador de reglas de alerta Prometheus y PromQL',
    'Genera manifiestos YAML de reglas de alerta de Prometheus con expresiones PromQL y etiquetas.',
  ],
  [
    'websocket-tester',
    'Cliente WebSocket y comprobador de latencia',
    'Conecta a servidores WebSocket wss://, envía cargas JSON y supervisa registros de mensajes.',
  ],
  [
    'curl-to-postman',
    'Conversor de cURL a colecciones Postman',
    'Convierte cadenas de comandos cURL en archivos JSON de colecciones Postman v2.1 que se pueden importar.',
  ],
  [
    'ssl-certificate-inspector',
    'Inspector de certificados SSL PEM y SAN',
    'Inspecciona certificados SSL/TLS X.509 PEM para consultar su validez, emisor, nombres alternativos del sujeto y caducidad.',
  ],
  [
    'csr-generator',
    'Generador de solicitudes de firma de certificados (CSR)',
    'Genera comandos de solicitudes de firma de certificados OpenSSL con nombre común y dominios SAN.',
  ],
  [
    'sse-stream-tester',
    'Comprobador de flujos de eventos enviados por el servidor (SSE)',
    'Prueba flujos de eventos enviados por el servidor (SSE) en tiempo real e inspecciona fragmentos EventSource entrantes.',
  ],
  [
    'graphql-query-formatter',
    'Formateador y minificador de consultas GraphQL',
    'Formatea o minifica consultas, mutaciones, suscripciones y fragmentos GraphQL.',
  ],
  [
    'har-viewer',
    'Visor y analizador de archivos HAR (HTTP Archive)',
    'Analiza registros HTTP Archive (.har) para inspeccionar cronologías de solicitudes, cabeceras y códigos de estado.',
  ],
  [
    'dns-lookup-simulator',
    'Simulador de registros y propagación DNS',
    'Simula consultas DNS de registros A, AAAA, CNAME, MX, TXT y NS con duraciones TTL.',
  ],
  [
    'http-wire-format',
    'Conversor de solicitudes HTTP al formato de transmisión',
    'Convierte solicitudes HTTP estructuradas en cargas de texto sin procesar para la transmisión HTTP/1.1.',
  ],
  [
    'webhook-signature-verifier',
    'Verificador de firmas HMAC de webhooks',
    'Verifica firmas HMAC SHA-256 de cargas de webhooks de Stripe, GitHub y Shopify.',
  ],
  [
    'uuid-v7-generator',
    'Generador de UUID v7 ordenados por tiempo',
    'Genera identificadores UUIDv7 ordenados por tiempo Unix y extrae sus marcas de tiempo.',
  ],
  [
    'nanoid-generator',
    'Generador de NanoID y alfabetos personalizados',
    'Genera NanoID compactos, aptos para URL y criptográficamente seguros con alfabetos personalizados.',
  ],
  [
    'base58-encoder',
    'Codificador y decodificador Base58 (Bitcoin / Solana / IPFS)',
    'Codifica y decodifica texto plano y bytes sin procesar en formatos Base58 y Base58Check.',
  ],
  [
    'ssh-key-inspector',
    'Inspector de huellas digitales de claves públicas SSH',
    'Analiza claves públicas OpenSSH para extraer algoritmos de claves, comentarios y huellas digitales SHA-256.',
  ],
  [
    'pgp-key-inspector',
    'Inspector de bloques de claves PGP y GPG',
    'Valida e inspecciona claves PGP públicas y privadas con armadura ASCII y bloques de mensajes cifrados.',
  ],
  [
    'api-key-generator',
    'Generador de claves de API y tokens con prefijos',
    'Genera claves de API y secretos de sesión criptográficamente aleatorios con prefijos personalizados.',
  ],
  [
    'jwt-signature-validator',
    'Validador de firmas y caducidad de JWT',
    'Inspecciona cabeceras y declaraciones JWT y verifica la estructura del token y sus marcas de tiempo de caducidad.',
  ],
  [
    'aes-crypto-playground',
    'Entorno de pruebas de cifrado y descifrado AES-256',
    'Genera claves criptográficas AES de 256 bits y prueba parámetros de cifrado AES-GCM.',
  ],
  [
    'bip39-seed-deriver',
    'Derivador de semillas a partir de frases mnemotécnicas BIP-39',
    'Deriva semillas binarias de 512 bits en formato hexadecimal a partir de frases mnemotécnicas BIP-39 de 12 y 24 palabras.',
  ],
  [
    'argon2-hash-generator',
    'Formateador de hashes de contraseñas Argon2',
    'Formatea hashes de contraseñas Argon2id con coste de memoria, iteraciones de tiempo y paralelismo personalizados.',
  ],
  [
    'android-manifest-builder',
    'Generador de manifiestos XML y permisos Android',
    'Genera archivos AndroidManifest.xml con permisos, actividades y filtros de intención del lanzador.',
  ],
  [
    'ios-plist-builder',
    'Generador de claves de permisos Info.plist de iOS',
    'Crea archivos XML Info.plist de iOS con descripciones estándar de uso de permisos.',
  ],
  [
    'app-icon-resizer',
    'Referencia de tamaños de iconos de aplicaciones',
    'Consulta las especificaciones estándar de tamaños de iconos de iOS App Store y Android Play Store.',
  ],
  [
    'universal-links-validator',
    'Generador de Universal Links de Apple y App Links de Android',
    'Genera archivos de configuración de enlaces profundos apple-app-site-association y assetlinks.json.',
  ],
  [
    'flutter-theme-generator',
    'Generador de ColorScheme de Flutter Material 3',
    'Convierte paletas de colores hexadecimales en código ColorScheme de ThemeData de Flutter Material 3.',
  ],
  [
    'xcode-asset-catalog',
    'Generador de Contents.json de catálogos de recursos Xcode',
    'Genera manifiestos Contents.json estándar de catálogos de imágenes 1x, 2x y 3x para aplicaciones iOS.',
  ],
  [
    'android-keystore-fingerprint',
    'Formateador de huellas digitales de Keystore Android (SHA1/SHA256)',
    'Formatea huellas digitales SHA-1 y SHA-256 de certificados Keystore para Firebase y Google OAuth.',
  ],
  [
    'electron-config-builder',
    'Generador de main.js y ventanas de aplicaciones Electron',
    'Genera archivos iniciales main.js de Electron con BrowserWindow y configuraciones de seguridad.',
  ],
  [
    'react-native-icon-finder',
    'Buscador de iconos vectoriales React Native y generador de código',
    'Busca y exporta nombres de iconos y etiquetas de importación JSX de react-native-vector-icons.',
  ],
  [
    'capacitor-config-builder',
    'Generador de capacitor.config.json de Capacitor',
    'Crea archivos de configuración capacitor.config.json para aplicaciones móviles híbridas de iOS y Android.',
  ],
  [
    'code-side-by-side-diff',
    'Visualizador de diferencias de código en paralelo',
    'Compara dos fragmentos de código en paralelo y sigue sus diferencias línea por línea.',
  ],
  [
    'conventional-commit-builder',
    'Generador de mensajes Git Conventional Commits',
    'Crea mensajes estándar Conventional Commits con feat, fix, ámbito y notas finales de cambios incompatibles.',
  ],
  [
    'git-command-builder',
    'Generador interactivo de comandos Git',
    'Genera comandos Git para rebase interactivo, cherry-pick, restablecimiento completo y almacenamiento temporal de cambios.',
  ],
  [
    'env-sanitizer',
    'Limpiador de secretos de .env a .env.example',
    'Elimina claves de API privadas y credenciales de bases de datos de archivos .env para crear plantillas .env.example.',
  ],
  [
    'license-generator',
    'Generador de licencias de código abierto y SPDX',
    'Genera textos de licencias de software de código abierto MIT, Apache 2.0 y GPL con encabezados de derechos de autor.',
  ],
  [
    'eslint-prettier-config',
    'Generador de configuración de Prettier y ESLint',
    'Genera archivos de configuración JSON .prettierrc personalizados con comillas simples y ancho de tabulación.',
  ],
  [
    'markdown-to-slides',
    'Conversor de Markdown a presentaciones HTML',
    'Convierte archivos Markdown separados por líneas horizontales en diapositivas de presentación HTML adaptables.',
  ],
  [
    'package-json-formatter',
    'Ordenador de dependencias y formateador de package.json',
    'Ordena dependencias alfabéticamente y formatea archivos package.json.',
  ],
  [
    'changelog-generator',
    'Generador de CHANGELOG.md (Keep a Changelog)',
    'Genera registros de cambios Markdown con versiones siguiendo las directrices de Keep a Changelog.',
  ],
  [
    'editorconfig-generator',
    'Generador de archivos .editorconfig',
    'Genera archivos .editorconfig con reglas de sangría, juego de caracteres y saltos de línea comunes a distintos editores.',
  ],
  [
    'ieee754-visualizer',
    'Visualizador de coma flotante IEEE 754 de 32 bits',
    'Desglosa números de coma flotante de 32 bits en los bits binarios de signo, exponente y mantisa.',
  ],
  [
    'bitwise-calculator',
    'Calculadora de lógica bit a bit (AND, OR, XOR y desplazamiento)',
    'Realiza operaciones AND, OR, XOR y NOT de 32 bits y desplazamientos de bits con resultados binarios y hexadecimales.',
  ],
  [
    'hex-dump-viewer',
    'Visor de volcados hexadecimales e inspector de posiciones binarias',
    'Formatea cadenas de texto en vistas clásicas de volcado hexadecimal de 16 bytes por fila y una columna ASCII lateral.',
  ],
  [
    'bignumber-calculator',
    'Calculadora BigNumber de precisión arbitraria',
    'Realiza operaciones exactas de enteros de precisión arbitraria, potencias y aritmética modular.',
  ],
  [
    'multi-radix-converter',
    'Conversor de varias bases (binaria, octal, decimal y hexadecimal)',
    'Convierte números simultáneamente entre representaciones binarias, octales, decimales y hexadecimales.',
  ],
  [
    'timezone-meeting-planner',
    'Planificador de reuniones por zonas horarias y matriz de coincidencias',
    'Coordina horas de reuniones globales entre las zonas horarias UTC, EST, PST, CET, TRT y JST.',
  ],
  [
    'bandwidth-calculator',
    'Calculadora de ancho de banda y tiempo de descarga',
    'Calcula la duración de transferencias de archivos según su tamaño y velocidades de Internet en Mbps y Gbps.',
  ],
  [
    'percentage-growth-calculator',
    'Calculadora de crecimiento y variación porcentual',
    'Calcula aumentos, disminuciones y métricas compuestas de porcentajes para paneles.',
  ],
  [
    'cron-timezone-converter',
    'Conversor de zonas horarias de expresiones cron (local ↔ UTC)',
    'Ajusta las horas de expresiones cron entre zonas horarias locales y programaciones UTC del servidor.',
  ],
  [
    'matrix-calculator',
    'Calculadora de operaciones y transposición de matrices',
    'Multiplica matrices, comprueba sus dimensiones y calcula su transposición.',
  ],
  [
    'curl-to-python',
    'Conversor de cURL a Python',
    'Convierte comandos cURL en código Python de requests o httpx.',
  ],
  [
    'curl-to-javascript',
    'Conversor de cURL a JavaScript Fetch',
    'Convierte comandos cURL en código JavaScript moderno de Fetch API o Axios.',
  ],
  [
    'curl-to-go',
    'Conversor de cURL a Go',
    'Convierte comandos cURL en código idiomático de Go con net/http.',
  ],
  [
    'curl-to-rust',
    'Conversor de cURL a Rust',
    'Convierte comandos cURL en código del cliente reqwest de Rust.',
  ],
  [
    'curl-to-php',
    'Conversor de cURL a PHP',
    'Convierte comandos cURL en código PHP de Guzzle o curl nativo.',
  ],
  [
    'curl-to-csharp',
    'Conversor de cURL a C#',
    'Convierte comandos cURL en código HttpClient de C# .NET.',
  ],
  [
    'curl-to-java',
    'Conversor de cURL a Java',
    'Convierte comandos cURL en código HttpClient de Java 11 o posterior.',
  ],
  [
    'curl-to-ai-sdk',
    'Conversor de cURL a SDK de OpenAI y Claude',
    'Convierte llamadas cURL de API en código de los SDK oficiales de OpenAI y Anthropic.',
  ],
  [
    'openai-structured-outputs',
    'Generador de salidas estructuradas estrictas de OpenAI',
    'Genera esquemas JSON Schema estrictos para llamadas a funciones de OpenAI.',
  ],
  [
    'vercel-ai-core-message-converter',
    'Conversor de mensajes de Vercel AI SDK',
    'Convierte registros de chat y mensajes de OpenAI en un array CoreMessage de Vercel AI SDK.',
  ],
  [
    'langgraph-state-generator',
    'Generador de esquemas de estado LangGraph',
    'Genera TypedDict de estado y definiciones de flujos de trabajo de LangGraph.',
  ],
  [
    'embedding-cost-calculator',
    'Calculadora de costes de embeddings vectoriales',
    'Calcula costes, dimensiones de vectores y uso de memoria de modelos de embeddings.',
  ],
  [
    'anthropic-tool-builder',
    'Generador de herramientas de Anthropic Claude',
    'Crea definiciones JSON input_schema para herramientas de Anthropic Claude.',
  ],
  [
    'tailwind-v3-to-v4-migrator',
    'Migrador de Tailwind CSS v3 a v4',
    'Migra tailwind.config.js a directivas CSS @theme de Tailwind CSS v4.',
  ],
  [
    'css-box-shadow-to-tailwind',
    'Conversor de box-shadow CSS a Tailwind',
    'Convierte valores CSS box-shadow complejos en clases arbitrarias de Tailwind.',
  ],
  [
    'nextjs-metadata-generator',
    'Generador de metadatos de Next.js App Router',
    'Genera configuraciones generateMetadata, OpenGraph y tarjetas de Twitter para Next.js 16.',
  ],
  [
    'svg-to-css',
    'SVG a URI de datos de fondo CSS',
    'Codifica y optimiza SVG en URI de datos CSS para background-image y mask-image.',
  ],
  [
    'html-table-converter',
    'Conversor de tablas HTML a Markdown y CSV',
    'Convierte marcado de tablas HTML en tablas Markdown, CSV o arrays JSON.',
  ],
  [
    'natural-language-to-cron',
    'Conversor de lenguaje natural a cron',
    'Convierte descripciones en inglés natural en programaciones cron estándar de 5 campos.',
  ],
  [
    'gitignore-tester',
    'Comprobador de coincidencias de patrones .gitignore',
    'Prueba reglas glob de .gitignore y .dockerignore frente a árboles de archivos.',
  ],
  [
    'k8s-resource-calculator',
    'Calculadora de recursos y QoS de pods Kubernetes',
    'Calcula solicitudes y límites de CPU y memoria, y clases QoS de pods de Kubernetes.',
  ],
  [
    'terraform-hcl-to-json',
    'Conversor de Terraform HCL a JSON',
    'Convierte definiciones de recursos Terraform HCL en sintaxis terraform.tf.json.',
  ],
  [
    'systemd-timer-generator',
    'Generador de servicios y temporizadores systemd',
    'Genera pares de unidades systemd .service y .timer para automatización en Linux.',
  ],
  [
    'sql-to-prisma',
    'Conversor de DDL SQL a esquemas Prisma',
    'Convierte sentencias SQL CREATE TABLE en modelos de esquemas Prisma.',
  ],
  [
    'sql-to-drizzle',
    'Conversor de DDL SQL a esquemas Drizzle ORM',
    'Convierte sentencias SQL CREATE TABLE en esquemas TypeScript de Drizzle ORM.',
  ],
  [
    'postgres-explain-visualizer',
    'Analizador de planes EXPLAIN de PostgreSQL',
    'Analiza y visualiza planes de consultas PostgreSQL a partir de la salida JSON de EXPLAIN.',
  ],
  [
    'mongodb-to-sql',
    'Conversor de consultas MongoDB a SQL',
    'Convierte filtros find de MongoDB en consultas SQL SELECT.',
  ],
  [
    'sql-to-django',
    'Conversor de DDL SQL a modelos Django',
    'Convierte sentencias SQL CREATE TABLE en modelos Python de Django ORM.',
  ],
  [
    'sql-keyword-uppercaser',
    'Formateador de palabras clave SQL en mayúsculas',
    'Convierte todas las palabras clave SQL a mayúsculas conservando los nombres de columnas y tablas.',
  ],
  [
    'subnet-calculator',
    'Calculadora de máscaras de subred IPv4 y CIDR',
    'Calcula la máscara de subred, la dirección de difusión y el rango de hosts utilizables a partir de un CIDR.',
  ],
  [
    'uuid-v5-generator',
    'Generador de UUID v5 (espacio de nombres SHA-1)',
    'Genera hashes UUID v5 deterministas RFC 4122 a partir de espacios de nombres.',
  ],
  [
    'bip39-seed-phrase-generator',
    'Generador de frases semilla mnemotécnicas BIP-39',
    'Genera frases semilla BIP-39 de 12 y 24 palabras criptográficamente seguras.',
  ],
  [
    'eip712-hasher',
    'Calculadora de hashes de datos tipados EIP-712 de Ethereum',
    'Calcula el separador de dominio y el hash de estructura para la firma de datos tipados EIP-712.',
  ],
  [
    'crypto-unit-converter',
    'Conversor de unidades de criptomonedas',
    'Convierte entre Wei, Gwei, Ether y satoshis de Bitcoin.',
  ],
  [
    'json-to-python-dataclass',
    'Conversor de JSON a dataclass de Python',
    'Convierte objetos JSON en clases @dataclass de Python 3.10 o posterior.',
  ],
  [
    'json-to-go-struct',
    'Conversor de JSON a estructuras Go',
    'Convierte objetos JSON en estructuras Go con etiquetas json.',
  ],
  [
    'proto-to-typescript',
    'Conversor de Protobuf a interfaces TypeScript',
    'Convierte definiciones de mensajes Proto3 en interfaces TypeScript.',
  ],
  [
    'http-headers-to-json',
    'Conversor de cabeceras HTTP a JSON',
    'Convierte texto de cabeceras HTTP en un objeto JSON y viceversa.',
  ],
  [
    'jwt-builder',
    'Generador y simulador de cargas JWT',
    'Crea tokens JWT con cabeceras y cargas personalizadas y simulación de firma.',
  ],
  [
    'passphrase-wordlist-generator',
    'Generador de frases de contraseña Diceware',
    'Genera frases de contraseña Diceware seguras y fáciles de recordar con separadores personalizados.',
  ],
  [
    'nanoid-custom-alphabet',
    'Generador de NanoID con alfabetos personalizados',
    'Genera NanoID resistentes a colisiones con alfabetos y longitudes personalizados.',
  ],
  [
    'mock-credit-card-generator',
    'Generador de tarjetas de prueba válidas según Luhn',
    'Genera números de tarjetas de crédito de prueba que cumplen Luhn para pruebas de Stripe y entornos aislados.',
  ],
  [
    'tailwind-spacing-generator',
    'Generador de escalas de espaciado de Tailwind',
    'Genera escalas personalizadas de espaciado fluido, márgenes y relleno para Tailwind CSS.',
  ],
  [
    'docker-compose-env-generator',
    'Generador de plantillas .env de Docker Compose',
    'Extrae todas las variables de entorno de docker-compose.yml en una plantilla .env limpia.',
  ],
  [
    'dns-propagation-checker',
    'Comprobador de propagación de registros DNS',
    'Comprueba la propagación DNS global simulada entre varios puntos de presencia de todo el mundo.',
  ],
  [
    'url-utm-builder',
    'Generador de URL de campañas UTM de Google Analytics',
    'Crea URL de campañas de marketing con utm_source, utm_medium y utm_campaign.',
  ],
  [
    'sha3-hash-generator',
    'Generador de hashes SHA-3 (Keccak)',
    'Genera hashes criptográficos SHA3-256 y SHA3-512.',
  ],
  [
    'sql-to-go-gorm',
    'DDL SQL a modelos Go GORM',
    'Convierte definiciones de esquemas SQL CREATE TABLE en estructuras de modelos Go GORM con claves primarias.',
  ],
  [
    'sql-to-python-sqlalchemy',
    'DDL SQL a modelos SQLAlchemy 2.0',
    'Convierte sentencias SQL CREATE TABLE en clases de modelos Declarative Base de Python SQLAlchemy 2.0.',
  ],
  [
    'postman-to-openapi',
    'Conversor de colecciones Postman a OpenAPI 3.1',
    'Convierte archivos JSON exportados de colecciones Postman v2.1 en especificaciones YAML/JSON de OpenAPI 3.1.',
  ],
  [
    'openapi-to-postman',
    'Generador de colecciones Postman a partir de OpenAPI',
    'Convierte especificaciones de API OpenAPI 3.0 y Swagger en JSON de colecciones Postman v2.1 que se pueden importar.',
  ],
  [
    'protobuf-to-json-schema',
    'Conversor de Protobuf 3 a JSON Schema',
    'Convierte definiciones de mensajes Protocol Buffers (proto3) en esquemas JSON Schema Draft-07.',
  ],
  [
    'json-schema-to-protobuf',
    'Generador de Protobuf 3 a partir de JSON Schema',
    'Convierte definiciones JSON Schema en contratos de mensajes Protocol Buffers proto3.',
  ],
  [
    'yaml-to-terraform-hcl',
    'Conversor de YAML a Terraform HCL',
    'Convierte mapas de configuración YAML en bloques locals y variable de Terraform HCL.',
  ],
  [
    'terraform-hcl-to-yaml',
    'Conversor de Terraform HCL a YAML',
    'Convierte atributos y variables locales de Terraform HCL en mapas YAML estructurados.',
  ],
  [
    'csv-to-geojson',
    'Conversor de CSV a puntos GeoJSON',
    'Convierte conjuntos CSV de coordenadas con latitud y longitud en FeatureCollections de GeoJSON.',
  ],
  [
    'geojson-to-csv',
    'Conversor de GeoJSON a coordenadas CSV',
    'Convierte geometrías de puntos y propiedades de GeoJSON en coordenadas tabulares CSV.',
  ],
  [
    'json-to-typescript-type-guards',
    'Generador de guardas de tipo TypeScript a partir de JSON',
    'Genera funciones booleanas de guarda de tipo TypeScript (isType) para comprobaciones en ejecución a partir de estructuras JSON.',
  ],
  [
    'typescript-interface-to-zod',
    'Interfaz TypeScript a esquema Zod',
    'Convierte interfaces y tipos TypeScript en esquemas de validación Zod en ejecución.',
  ],
  [
    'zod-to-typescript-type',
    'Inferencia de tipos TypeScript a partir de esquemas Zod',
    'Extrae e infiere declaraciones de tipos TypeScript estáticos a partir de esquemas de validación Zod en ejecución.',
  ],
  [
    'css-to-scss',
    'Conversor de CSS a SCSS y SASS anidados',
    'Convierte selectores planos de hojas de estilo CSS en bloques jerárquicos SCSS/SASS anidados.',
  ],
  [
    'scss-to-css',
    'Conversor de SCSS y SASS a CSS estándar',
    'Convierte variables, mixins y bloques anidados SCSS en CSS estándar compatible con distintos navegadores.',
  ],
  [
    'html-to-jsx-tailwind',
    'Conversor de HTML a JSX y Tailwind CSS',
    'Convierte marcado HTML con atributos class en React JSX con className y etiquetas de cierre automático.',
  ],
  [
    'jsx-to-html',
    'Conversor de React JSX a HTML estándar',
    'Convierte fragmentos React JSX con className y comentarios JSX en marcado HTML puro.',
  ],
  [
    'markdown-to-bbcode',
    'Conversor de Markdown a BBCode de foros',
    'Convierte encabezados, negrita, imágenes y enlaces Markdown en etiquetas BBCode estándar de foros.',
  ],
  [
    'bbcode-to-markdown',
    'Conversor de BBCode a Markdown de GitHub',
    'Convierte etiquetas BBCode de foros en formato de texto Markdown con la sintaxis de GitHub.',
  ],
  [
    'curl-to-php-guzzle',
    'Conversor de cURL a cliente PHP Guzzle',
    'Convierte comandos cURL del terminal con cabeceras y cuerpo en código ejecutable de cliente PHP Guzzle.',
  ],
  [
    'curl-to-ruby-faraday',
    'Conversor de cURL a cliente Ruby Faraday',
    'Convierte solicitudes cURL en solicitudes de clientes Ruby Faraday y Net::HTTP con cabeceras.',
  ],
  [
    'curl-to-rust-reqwest',
    'cURL a cliente asíncrono Rust reqwest',
    'Convierte comandos cURL en bloques de código de solicitudes del cliente asíncrono Rust reqwest.',
  ],
  [
    'curl-to-go-http',
    'Conversor de cURL a cliente Go net/http',
    'Convierte comandos cURL en solicitudes del cliente net/http de la biblioteca estándar de Go.',
  ],
  [
    'svg-to-android-vector',
    'SVG a XML Vector Drawable de Android',
    'Convierte gráficos vectoriales SVG al formato XML Vector Drawable de Android para aplicaciones Android nativas.',
  ],
  [
    'svg-to-swiftui-shape',
    'Generador de SwiftUI Shape y Path a partir de SVG',
    'Convierte comandos de trazados vectoriales SVG en estructuras nativas SwiftUI Path y Shape para iOS/macOS.',
  ],
  [
    'css-grid-to-tailwind',
    'CSS Grid a clases Tailwind CSS',
    'Convierte estilos CSS grid-template-columns y gap en clases de utilidad de cuadrícula de Tailwind CSS.',
  ],
  [
    'dockerfile-ai-optimized-generator',
    'Generador de Dockerfile de varias etapas',
    'Genera Dockerfiles de producción de varias etapas para Node, Python, Go y Rust con opciones de seguridad.',
  ],
  [
    'kubernetes-deployment-generator',
    'Generador de YAML Deployment de Kubernetes',
    'Genera manifiestos YAML de producción con Deployment, Service y límites de recursos de Kubernetes.',
  ],
  [
    'kubernetes-configmap-secret-builder',
    'Generador de manifiestos ConfigMap y Secret de Kubernetes',
    'Genera fácilmente manifiestos YAML ConfigMap y Secret codificados en Base64 para Kubernetes.',
  ],
  [
    'helm-chart-yaml-generator',
    'Generador de plantillas iniciales Helm Chart y Values',
    'Genera plantillas iniciales Helm Chart.yaml y values.yaml para aplicaciones Kubernetes nativas de la nube.',
  ],
  [
    'gitlab-ci-pipeline-builder',
    'Generador de YAML de canalizaciones CI/CD de GitLab',
    'Genera configuraciones .gitlab-ci.yml de varias etapas con compilación, pruebas y caché.',
  ],
  [
    'github-issue-pr-template-generator',
    'Generador de plantillas de incidencias y PR de GitHub',
    'Genera plantillas Markdown estándar de incidencias de GitHub y listas de comprobación de solicitudes de extracción.',
  ],
  [
    'opa-rego-policy-builder',
    'Generador de Rego para Open Policy Agent (OPA)',
    'Genera políticas de autorización OPA Rego para RBAC, ABAC y aplicación de seguridad de API.',
  ],
  [
    'systemd-service-hardened-builder',
    'Generador de servicios systemd de Linux con seguridad reforzada',
    'Genera archivos de unidades de servicio systemd de Linux con aislamiento de seguridad y NoNewPrivileges.',
  ],
  [
    'nginx-security-conf-generator',
    'Generador de configuración de servidor Nginx con seguridad reforzada',
    'Genera bloques de servidor Nginx con seguridad reforzada, SSL TLS 1.3, HSTS y límites de solicitudes.',
  ],
  [
    'caddyfile-production-generator',
    'Generador de configuración Caddyfile para producción',
    'Genera configuraciones Caddyfile modernas con HTTPS automático, proxy inverso y compresión.',
  ],
  [
    'prometheus-recording-rules-generator',
    'Generador de reglas de alerta y registro de Prometheus',
    'Genera YAML de reglas de alerta y registro de Prometheus para supervisar SLO y latencia.',
  ],
  [
    'tailwind-v4-mesh-gradient-generator',
    'Generador de degradados radiales de malla de Tailwind CSS',
    'Crea fondos modernos con degradados radiales de malla de colores para CSS y Tailwind CSS.',
  ],
  [
    'css-isometric-grid-generator',
    'Generador de cuadrículas isométricas 3D y transformaciones CSS',
    'Genera cuadrículas isométricas 2.5D con transformaciones CSS 3D y estilos de matrices de coordenadas de mosaicos.',
  ],
  [
    'css-ribbon-banner-generator',
    'Generador de cintas e insignias de esquina CSS',
    'Crea cintas de esquina adaptables, insignias de ofertas y etiquetas promocionales con CSS puro.',
  ],
  [
    'svg-wavy-divider-generator',
    'Generador de separadores de secciones con ondas SVG',
    'Genera separadores SVG con curvas de ondas suaves y transiciones de secciones para páginas de destino.',
  ],
  [
    'opengraph-banner-canvas-generator',
    'Generador de metaetiquetas OpenGraph y Twitter Card',
    'Genera metaetiquetas dinámicas de tarjetas de vista previa social OpenGraph y Twitter, y marcado de rótulos.',
  ],
  [
    'prisma-seed-generator',
    'Generador de scripts de datos iniciales de Prisma Client',
    'Genera scripts TypeScript de datos iniciales de bases de datos Prisma (prisma/seed.ts) con inserciones por lotes.',
  ],
  [
    'faker-js-mock-schema-generator',
    'Generador de conjuntos de datos sintéticos Faker.js',
    'Genera esquemas de datos ficticios con Faker.js para nombres, correos, avatares y fechas.',
  ],
  [
    'llm-few-shot-prompt-formatter',
    'Generador de instrucciones estructuradas con pocos ejemplos para modelos de lenguaje',
    'Crea plantillas de instrucciones de alta precisión con pocos ejemplos y pares de demostración separados por delimitadores.',
  ],
  [
    'cot-chain-of-thought-prompt-builder',
    'Generador de instrucciones de cadena de pensamiento (CoT)',
    'Genera estructuras de razonamiento de cadena de pensamiento para tareas complejas de razonamiento de IA.',
  ],
  [
    'sql-stored-procedure-generator',
    'Generador de procedimientos almacenados y disparadores SQL',
    'Genera plantillas de procedimientos almacenados, funciones y disparadores de auditoría para PostgreSQL y MySQL.',
  ],
  [
    'redis-lua-script-generator',
    'Generador de scripts Lua atómicos de Redis',
    'Genera scripts Lua atómicos de Redis para límites de solicitudes con Token Bucket, bloqueos mutex y colas.',
  ],
  [
    'crontab-randomized-generator',
    'Generador de desfases aleatorios de crontab',
    'Genera comandos de programación cron con retrasos aleatorios de ejecución para evitar ráfagas de solicitudes simultáneas.',
  ],
  [
    'ansible-playbook-scaffolder',
    'Generador de plantillas de automatización Ansible',
    'Genera playbooks YAML de Ansible para producción con tareas, manejadores y gestores de paquetes.',
  ],
  [
    'terraform-module-scaffolder',
    'Generador de estructuras de módulos Terraform',
    'Genera arquitecturas estructuradas de módulos Terraform con main.tf, variables.tf y outputs.tf.',
  ],
  [
    'http-cache-control-tester',
    'Comprobador de cabeceras HTTP Cache-Control',
    'Analiza directivas de caché HTTP Cache-Control, max-age, must-revalidate e immutable.',
  ],
  [
    'dns-soa-dnssec-inspector',
    'Inspector de números de serie SOA y registros DNSSEC',
    'Inspecciona números de serie DNS SOA, formatos de fechas, revisiones de zonas y registros DNSSEC.',
  ],
  [
    'ip-supernetting-calculator',
    'Calculadora de superredes IP y agregador CIDR',
    'Calcula superredes agregadas y resume varios prefijos de redes IP CIDR.',
  ],
  [
    'opengraph-tag-inspector',
    'Inspector de OpenGraph y metaetiquetas sociales',
    'Extrae e inspecciona etiquetas de metadatos de vistas previas OpenGraph, Twitter Card y LinkedIn.',
  ],
  [
    'jwt-expiry-calculator',
    'Calculadora de caducidad y duración de tokens JWT',
    'Calcula los segundos restantes, la marca de tiempo de caducidad y la validez a partir de cargas JWT.',
  ],
  [
    'regex-benchmark-simulator',
    'Analizador de riesgo ReDoS y retroceso de expresiones regulares',
    'Detecta riesgos de retroceso exponencial catastrófico y evalúa la complejidad de expresiones regulares.',
  ],
  [
    'llm-context-window-shrinker',
    'Optimizador de ventanas de contexto de instrucciones para modelos de lenguaje',
    'Reduce el consumo de tokens de instrucciones eliminando comentarios, cadenas de documentación y espacios adicionales.',
  ],
  [
    'embedding-token-cost-estimator',
    'Estimador de tokens y costes de API de embeddings de texto',
    'Calcula costes de tokens de embeddings vectoriales para modelos OpenAI text-embedding-3 y Voyage AI.',
  ],
  [
    'webhook-payload-simulator',
    'Simulador de cargas de eventos ficticios de webhooks',
    'Genera cargas JSON sintéticas de eventos de webhooks de Stripe, GitHub, Slack y Shopify.',
  ],
  [
    'network-port-reference',
    'Referencia y directorio de números de puertos TCP/UDP',
    'Consulta números de puertos TCP y UDP estándar, servicios asignados y notas de seguridad.',
  ],
  [
    'ssl-tls-handshake-simulator',
    'Simulador de negociación criptográfica TLS 1.2 y TLS 1.3',
    'Simula y compara flujos de negociación criptográfica TLS 1.2 (2-RTT) y TLS 1.3 (1-RTT).',
  ],
  [
    'http2-http3-frame-inspector',
    'Inspector de tramas HTTP/2 y HTTP/3 QUIC',
    'Inspecciona tipos de tramas binarias, indicadores y funciones de cargas de flujos HTTP/2 y HTTP/3 QUIC.',
  ],
  [
    'dns-spf-record-flattener',
    'Contador de consultas DNS y aplanador de registros SPF',
    'Cuenta consultas DNS en registros TXT SPF y comprueba el cumplimiento del RFC (límite de < 10 consultas).',
  ],
  [
    'mime-type-extension-lookup',
    'Consulta de MIME Content-Type por extensión de archivo',
    'Consulta tipos de contenido MIME estándar de IANA y cabeceras por extensión de archivo.',
  ],
  [
    'color-blindness-simulator',
    'Simulador de accesibilidad para daltonismo',
    'Simula la accesibilidad de colores para personas con protanopia, deuteranopia y tritanopia.',
  ],
  [
    'contrast-ratio-apca-calculator',
    'Calculadora de relación de contraste de texto WCAG y APCA',
    'Calcula relaciones de contraste entre colores de texto y fondo según las directrices WCAG 2.1 AAA.',
  ],
  [
    'viewport-size-tester',
    'Inspector de ventanas adaptables y puntos de ruptura',
    'Inspecciona puntos de ruptura Tailwind CSS (xs, sm, md, lg, xl, 2xl) y tamaños de pantalla estándar.',
  ],
  [
    'unicode-glyph-category-inspector',
    'Inspector de glifos y puntos de código Unicode',
    'Inspecciona puntos de código de caracteres Unicode, codificaciones hexadecimales y bloques de categorías Unicode.',
  ],
  [
    'seo-robots-noindex-simulator',
    'Simulador de indexación de robots.txt y X-Robots-Tag',
    'Evalúa reglas de indexación de buscadores, noindex, nofollow y permisos de rastreo.',
  ],
  [
    'cors-preflight-inspector',
    'Inspector de solicitudes preliminares OPTIONS de CORS',
    'Inspecciona cabeceras, orígenes y credenciales de solicitudes preliminares de intercambio de recursos entre orígenes.',
  ],
  [
    'css-selector-speed-profiler',
    'Analizador de especificidad y velocidad de selectores CSS',
    'Calcula tripletas de especificidad de selectores CSS [ID, clase, etiqueta] y la eficiencia de renderizado.',
  ],
  [
    'git-conflict-marker-cleaner',
    'Limpiador de marcadores de conflictos de fusión Git',
    'Elimina y resuelve marcadores de conflictos de fusión (HEAD, ===, >>>) de archivos de código fuente.',
  ],
  [
    'semver-range-evaluator',
    'Evaluador de rangos de versiones semánticas (SemVer)',
    'Evalúa rangos semver de npm (^, ~, >=) y determina la compatibilidad de versiones.',
  ],
  [
    'package-json-license-checker',
    'Comprobador de licencias de código abierto de package.json',
    'Analiza dependencias de package.json para comprobar la compatibilidad de licencias de código abierto con usos comerciales.',
  ],
  [
    'api-rate-limit-cost-calculator',
    'Calculadora de límites de solicitudes de API Token Bucket',
    'Calcula capacidad, tasas de recarga y límites de ráfagas de Token Bucket y Leaky Bucket.',
  ],
  [
    'blake3-hash-generator',
    'Generador de hashes criptográficos BLAKE3',
    'Genera hashes criptográficos BLAKE3 de 256 bits ultrarrápidos y resúmenes en árbol en el navegador.',
  ],
  [
    'pbkdf2-key-derivation',
    'Calculadora de la función de derivación de claves PBKDF2',
    'Deriva claves criptográficas seguras mediante PBKDF2 con HMAC-SHA256 e iteraciones configurables.',
  ],
  [
    'hmac-sha384-sha512-calculator',
    'Generador de firmas HMAC-SHA384 y HMAC-SHA512',
    'Calcula códigos de autenticación de mensajes basados en hash con clave (HMAC) mediante SHA-384 y SHA-512.',
  ],
  [
    'ethereum-eip191-signature-verifier',
    'Validador de firmas personales EIP-191 de Ethereum',
    'Formatea y valida mensajes Ethereum EIP-191 con prefijo personal_sign para monederos Web3.',
  ],
  [
    'bitcoin-bech32-address-encoder',
    'Validador de direcciones Bitcoin Bech32 y SegWit',
    'Valida y decodifica direcciones Bitcoin Native SegWit (P2WPKH) y Taproot Bech32/Bech32m.',
  ],
  [
    'rsa-pkcs1-pkcs8-converter',
    'Inspector de formatos de claves RSA PKCS#1 y PKCS#8',
    'Detecta y convierte claves RSA privadas y públicas entre formatos PEM PKCS#1 y PKCS#8.',
  ],
  [
    'x509-san-csr-builder',
    'Generador de CSR X.509 con nombres alternativos del sujeto (SAN)',
    'Genera configuraciones de solicitudes de firma de certificados OpenSSL (CSR) con varios dominios SAN.',
  ],
  [
    'ed25519-sign-verify',
    'Inspector de firmas y pares de claves Ed25519',
    'Limpia e inspecciona claves criptográficas públicas y privadas de curva elíptica Ed25519 de 256 bits.',
  ],
  [
    'argon2-parameter-tuner',
    'Ajustador de parámetros de memoria y coste Argon2id',
    'Calcula parámetros de memoria, iteraciones y paralelismo Argon2id recomendados por RFC 9106.',
  ],
  [
    'uuid-v7-timestamp-extractor',
    'Extractor de marcas de tiempo y fechas UUIDv7',
    'Extrae marcas de tiempo Unix en milisegundos, fechas UTC y secuencias de cadenas UUIDv7.',
  ],
  [
    'ethereum-abi-storage-slot-calculator',
    'Calculadora de posiciones de almacenamiento de variables de estado Solidity EVM',
    'Calcula posiciones de almacenamiento EVM de 32 bytes para variables de estado Solidity y contratos inteligentes.',
  ],
  [
    'base64-pem-certificate-parser',
    'Analizador de SAN e información de certificados X.509 TLS/SSL',
    'Analiza certificados X.509 PEM para extraer nombres alternativos del sujeto, emisores y validez.',
  ],
  [
    'punycode-idn-converter',
    'Conversor de dominios IDN Punycode',
    'Convierte nombres de dominio Unicode internacionalizados en Punycode compatible con ASCII (xn--).',
  ],
  [
    'crockford-base32-encoder',
    'Codificador y decodificador Crockford Base32',
    'Codifica números en cadenas Crockford Base32 fáciles de leer que excluyen letras que pueden confundirse.',
  ],
  [
    'bcd-binary-coded-decimal-converter',
    'Conversor de decimal codificado en binario (BCD 8421)',
    'Convierte números decimales en grupos de 4 bits de decimal codificado en binario (BCD 8421) y viceversa.',
  ],
  [
    'ieee754-hex-float-converter',
    'Conversor de coma flotante IEEE-754 a hexadecimal',
    'Convierte números de coma flotante de precisión simple de 32 bits en representaciones hexadecimales IEEE-754.',
  ],
  [
    'rot47-encoder-decoder',
    'Codificador y decodificador de texto cifrado ROT47',
    'Rota todos los caracteres ASCII imprimibles (33-126) con el cifrado César de 47 caracteres.',
  ],
  [
    'json-key-sorter',
    'Ordenador alfabético de claves JSON',
    'Ordena recursivamente todas las claves de objetos JSON alfabéticamente para obtener diferencias claras y resultados deterministas.',
  ],
  [
    'json-array-splitter-chunker',
    'Divisor de arrays JSON grandes en lotes',
    'Divide conjuntos de datos y arrays JSON grandes en lotes menores para respetar los límites de API.',
  ],
  [
    'text-prefix-suffix-appender',
    'Añadidor de prefijos y sufijos a varias líneas de texto',
    'Añade prefijos, sufijos, comillas o números de línea personalizados a cada línea de texto.',
  ],
  [
    'text-duplicate-line-counter',
    'Contador de frecuencia de líneas duplicadas',
    'Cuenta líneas duplicadas en listas de texto y ordena los elementos por frecuencia de aparición.',
  ],
  [
    'text-column-tabular-splitter',
    'Divisor de texto delimitado en columnas',
    'Divide texto delimitado CSV/TSV en columnas de ancho fijo y filas de matriz estructuradas.',
  ],
];

export const esCompletion: Record<string, string> = Object.fromEntries(
  tools.flatMap(([slug, name, description]) => [
    [`toolName.${slug}`, name],
    [`toolDesc.${slug}`, description],
  ]),
);
