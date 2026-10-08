// Reviewed French catalog overrides. This map is applied after the shared metadata.
export const frCompletion: Record<string, string> = {
  'toolName.bip39-generator': 'Générateur de phrases mnémoniques BIP-39',
  'toolDesc.bip39-generator':
    'Générez et validez des phrases mnémoniques de récupération de cryptomonnaies de 12 ou 24 mots.',
  'toolName.cron-generator': "Générateur visuel d'expressions cron",
  'toolDesc.cron-generator':
    'Créez visuellement des expressions cron standard avec un aperçu du calendrier.',
  'toolName.css-box-shadow': "Générateur d'ombres de boîte CSS",
  'toolDesc.css-box-shadow':
    'Créez visuellement des ombres à plusieurs couches et des effets de verre dépoli.',
  'toolName.css-clamp': 'Calculateur de valeurs fluides CSS clamp()',
  'toolDesc.css-clamp':
    'Calculez les valeurs CSS clamp() pour une typographie et des espacements adaptatifs fluides.',
  'toolName.dmarc-generator': "Générateur d'enregistrements DMARC et SPF",
  'toolDesc.dmarc-generator':
    'Générez des enregistrements DNS TXT SPF, DMARC et DKIM pour sécuriser les courriels de votre domaine.',
  'toolName.docker-run-to-compose': 'Convertisseur de docker run vers Compose',
  'toolDesc.docker-run-to-compose':
    'Convertissez des commandes docker run en services docker-compose.yml.',
  'toolName.json-to-models': 'JSON vers modèles multilangages',
  'toolDesc.json-to-models':
    'Générez des structures Go, des modèles Python Pydantic, Rust Serde et C# à partir de JSON.',
  'toolName.json-to-sql': 'Convertisseur JSON vers SQL',
  'toolDesc.json-to-sql':
    'Générez des requêtes SQL INSERT et des définitions CREATE TABLE à partir de données JSON.',
  'toolName.svg-minifier': 'Optimiseur et minificateur SVG',
  'toolDesc.svg-minifier':
    'Optimisez et réduisez la taille des fichiers SVG avec un aperçu du rendu en direct.',
  'toolName.svg-to-jsx': 'Convertisseur SVG vers JSX / React',
  'toolDesc.svg-to-jsx':
    'Convertissez du balisage SVG en composants React JSX/TSX avec des options personnalisées.',
  'toolName.quoted-printable-encoder': 'Encodeur et décodeur MIME Quoted-Printable',
  'toolDesc.quoted-printable-encoder':
    'Encodez et décodez des chaînes MIME Quoted-Printable (RFC 2045) pour les données de courriels.',
  'toolName.json-patch-generator': 'Générateur JSON Patch RFC 6902',
  'toolDesc.json-patch-generator':
    "Générez les opérations différentielles d'un patch JSON standard RFC 6902 entre deux objets.",
  'toolName.json-flatten-unflatten': "Aplatisseur d'objets JSON imbriqués",
  'toolDesc.json-flatten-unflatten':
    'Aplatissez les objets JSON profondément imbriqués en clés à un seul niveau, séparées par des points.',
  'toolName.morse-code-audio-converter': 'Encodeur de texte en morse',
  'toolDesc.morse-code-audio-converter':
    'Convertissez du texte alphanumérique en code morse international.',
  'toolName.base64url-encoder': 'Encodeur et décodeur Base64URL',
  'toolDesc.base64url-encoder':
    'Encodez et décodez du Base64 adapté aux URL, sans caractères de remplissage.',
  'toolName.subtitle-srt-vtt-converter': 'Convertisseur de sous-titres SRT vers WebVTT',
  'toolDesc.subtitle-srt-vtt-converter':
    'Convertissez des sous-titres SubRip (.srt) au format HTML5 WebVTT (.vtt).',
  'toolName.sql-slugifier': "Générateur d'identifiants de base de données SQL",
  'toolDesc.sql-slugifier':
    'Transformez du texte en identifiants SQL valides de tables et de colonnes en snake_case.',
  'toolName.ai-agent-prompt-optimizer': 'Optimiseur de consignes pour agents IA',
  'toolDesc.ai-agent-prompt-optimizer':
    "Structurez le rôle, les contraintes et les objectifs d'un agent IA autonome.",
  'toolName.apache-conf-formatter': 'Formateur de configuration Apache VirtualHost',
  'toolDesc.apache-conf-formatter':
    'Formatez et indentez les directives VirtualHost et Directory du serveur HTTP Apache.',
  'toolName.docker-compose-formatter': 'Formateur YAML Docker Compose',
  'toolDesc.docker-compose-formatter':
    "Formatez les fichiers docker-compose.yml et corrigez l'indentation par tabulations.",
  'toolName.toml-formatter': 'Formateur de fichiers de configuration TOML',
  'toolDesc.toml-formatter':
    'Formatez et organisez les clés de configuration et les en-têtes de tables TOML.',
  'toolName.protobuf-formatter': 'Formateur Protocol Buffers (.proto)',
  'toolDesc.protobuf-formatter':
    'Formatez et indentez les définitions de services et de messages Protobuf proto3.',
  'toolName.totp-authenticator-simulator': "Simulateur d'authentificateur TOTP RFC 6238",
  'toolDesc.totp-authenticator-simulator':
    'Générez des mots de passe à usage unique temporels (TOTP) à 6 chiffres avec un compte à rebours.',
  'toolName.ed25519-key-generator': 'Générateur de paires de clés Ed25519',
  'toolDesc.ed25519-key-generator':
    'Générez des paires de clés cryptographiques publiques et privées Ed25519.',
  'toolName.x509-csr-decoder': 'Décodeur de demandes de signature de certificat X.509 (CSR)',
  'toolDesc.x509-csr-decoder':
    'Décodez et inspectez des demandes de signature de certificat (CSR) encodées en PEM.',
  'toolName.abi-encoder-decoder': 'Encodeur de paramètres ABI Solidity',
  'toolDesc.abi-encoder-decoder':
    'Encodez des paramètres de fonctions en données hexadécimales ABI Solidity par blocs de 32 octets.',
  'toolName.ethereum-keccak256-hasher': 'Hachage Ethereum Keccak-256 et sélecteurs',
  'toolDesc.ethereum-keccak256-hasher':
    'Calculez des empreintes Keccak-256 et des sélecteurs de fonctions de contrats intelligents sur 4 octets.',
  'toolName.solana-address-validator': "Validateur d'adresses Solana Base58",
  'toolDesc.solana-address-validator':
    'Validez les adresses de clés publiques Solana et leur encodage de caractères Base58.',
  'toolName.mongodb-aggregate-builder': "Générateur de pipelines d'agrégation MongoDB",
  'toolDesc.mongodb-aggregate-builder':
    "Créez des pipelines d'agrégation MongoDB à plusieurs étapes ($match, $group, $sort).",
  'toolName.clickhouse-ddl-generator': 'Générateur DDL ClickHouse MergeTree',
  'toolDesc.clickhouse-ddl-generator':
    'Générez des définitions ClickHouse CREATE TABLE optimisées avec des moteurs MergeTree.',
  'toolName.elasticsearch-query-builder': 'Générateur de requêtes DSL Elasticsearch',
  'toolDesc.elasticsearch-query-builder':
    'Générez des requêtes de recherche booléennes Elasticsearch en JSON structuré avec des filtres.',
  'toolName.react-hook-form-generator': 'Générateur de composants React Hook Form',
  'toolDesc.react-hook-form-generator':
    "Générez des composants React Hook Form prêts à l'emploi avec des règles de validation.",
  'toolName.gitlab-ci-generator': 'Générateur de pipelines GitLab CI/CD',
  'toolDesc.gitlab-ci-generator':
    'Créez des fichiers de configuration de pipelines .gitlab-ci.yml à plusieurs étapes.',
  'toolName.kubernetes-ingress-generator': 'Générateur Kubernetes Ingress et Cert-Manager',
  'toolDesc.kubernetes-ingress-generator':
    'Générez des manifestes Kubernetes Ingress avec terminaison TLS et annotations Cert-Manager.',
  'toolName.ollama-modelfile-generator': 'Générateur de fichiers Modelfile Ollama',
  'toolDesc.ollama-modelfile-generator':
    'Créez des configurations Modelfile personnalisées avec consignes système et paramètres pour Ollama.',
  'toolName.cloudflare-wrangler-builder': 'Générateur de configuration Cloudflare Wrangler',
  'toolDesc.cloudflare-wrangler-builder':
    'Générez des fichiers wrangler.json pour Cloudflare Workers, KV et D1.',
  'toolName.github-actions-matrix-builder': 'Générateur de workflows CI matriciels GitHub Actions',
  'toolDesc.github-actions-matrix-builder':
    'Créez des workflows de compilation matriciels pour plusieurs systèmes et versions avec GitHub Actions CI/CD.',
  'toolName.tailwind-v4-color-palette': 'Générateur de palettes OKLCH Tailwind CSS v4',
  'toolDesc.tailwind-v4-color-palette':
    'Générez des gammes de couleurs OKLCH modernes de 50 à 950 pour Tailwind CSS v4.',
  'toolName.shadcn-theme-generator': 'Générateur de thèmes Shadcn UI et variables CSS',
  'toolDesc.shadcn-theme-generator':
    'Créez des palettes personnalisées et des variables CSS pour Shadcn UI et les composants Radix.',
  'toolName.svg-to-webp': 'Convertisseur SVG vers URI de données WebP',
  'toolDesc.svg-to-webp':
    'Encodez des graphiques vectoriels SVG en URI de données Base64 performantes.',
  'toolName.docker-to-compose': 'Convertisseur de docker run vers Docker Compose',
  'toolDesc.docker-to-compose':
    'Convertissez des commandes individuelles docker run en services docker-compose.yml standard.',
  'toolName.har-to-k6': 'Convertisseur HAR vers scripts de test de charge k6',
  'toolDesc.har-to-k6':
    'Convertissez les journaux réseau du navigateur HTTP Archive (HAR) en scripts de test de performance k6.',
  'toolName.json-to-graphql-query': 'Générateur de requêtes GraphQL à partir de JSON',
  'toolDesc.json-to-graphql-query':
    "Générez des requêtes GraphQL structurées et des champs de sélection à partir d'objets JSON.",
  'toolName.avro-to-json-schema': 'Convertisseur Apache Avro vers JSON Schema',
  'toolDesc.avro-to-json-schema':
    "Convertissez des définitions de schémas d'enregistrements Apache Avro en spécifications JSON Schema.",
  'toolName.openapi-to-typescript-fetch': "Client Fetch TypeScript à partir d'OpenAPI",
  'toolDesc.openapi-to-typescript-fetch':
    'Générez des fonctions de client API fetch typées à partir de spécifications OpenAPI 3.0 et Swagger.',
  'toolName.postman-to-curl': 'Collection Postman vers script cURL',
  'toolDesc.postman-to-curl':
    'Convertissez les requêtes JSON de collections Postman exportées en commandes cURL exécutables dans un terminal.',
  'toolName.svg-to-react-native': 'Convertisseur SVG vers React Native (SVGR)',
  'toolDesc.svg-to-react-native':
    'Transformez des graphiques vectoriels SVG bruts en composants JSX react-native-svg.',
  'toolName.json-schema-to-zod': 'Convertisseur JSON Schema vers Zod',
  'toolDesc.json-schema-to-zod':
    'Convertissez des définitions JSON Schema en objets de validation TypeScript Zod.',
  'toolName.zod-to-json-schema': 'Convertisseur Zod vers JSON Schema',
  'toolDesc.zod-to-json-schema':
    "Convertissez des schémas d'objets TypeScript Zod en définitions JSON Schema draft-07 standard.",
  'toolName.aspect-ratio-resizer': "Calculateur de rapport d'aspect et de résolution",
  'toolDesc.aspect-ratio-resizer':
    "Calculez des rapports d'aspect standard (16:9, 4:3, 21:9) et redimensionnez les dimensions de résolution.",
  'toolName.subresource-integrity-generator': "Générateur d'empreintes d'intégrité SRI",
  'toolDesc.subresource-integrity-generator':
    "Générez des empreintes d'intégrité sha384 et sha512 pour les balises de scripts et de feuilles de style CDN.",
  'toolName.csp-evaluator': 'Évaluateur CSP (Content Security Policy)',
  'toolDesc.csp-evaluator':
    'Analysez les en-têtes Content Security Policy pour détecter les directives manquantes et les vulnérabilités XSS.',
  'toolName.nginx-rate-limit-calculator': 'Générateur de directives de limitation Nginx',
  'toolDesc.nginx-rate-limit-calculator':
    'Générez des directives limit_req_zone optimisées pour limiter le débit des proxys inverses Nginx.',
  'toolName.cron-next-runs-visualizer': 'Calculateur des 20 prochaines exécutions cron',
  'toolDesc.cron-next-runs-visualizer':
    "Calculez et prévisualisez les 20 prochains horodatages d'exécution exacts d'un calendrier cron.",
  'toolName.rag-chunking-visualizer': 'Visualiseur de découpage sémantique RAG',
  'toolDesc.rag-chunking-visualizer':
    'Visualisez le découpage du texte avec des tailles de jetons personnalisées et des fenêtres glissantes qui se chevauchent.',
  'toolName.mcp-inspector': 'Inspecteur Model Context Protocol (MCP)',
  'toolDesc.mcp-inspector':
    'Validez et inspectez les requêtes, réponses et notifications MCP JSON-RPC 2.0.',
  'toolName.tiktoken-visualizer': 'Visualiseur de tokenisation BPE Tiktoken',
  'toolDesc.tiktoken-visualizer':
    'Visualisez les jetons et leur segmentation colorée pour les modèles BPE OpenAI et Llama.',
  'toolName.claude-token-counter': 'Calculateur de jetons et de coûts Claude',
  'toolDesc.claude-token-counter':
    'Calculez le nombre de jetons et les tarifs des modèles Claude 3.5 Sonnet, Haiku et Opus.',
  'toolName.deepseek-token-counter': 'Calculateur de jetons et de coûts DeepSeek',
  'toolDesc.deepseek-token-counter':
    "Calculez le nombre exact de jetons BPE et les coûts d'inférence API des modèles DeepSeek V3 et R1.",
  'toolName.px-to-rem': 'Convertisseur PX vers REM et EM',
  'toolDesc.px-to-rem':
    'Convertissez des dimensions en pixels en REM, EM, VW, VH et autres unités CSS.',
  'toolName.mock-data-generator': 'Générateur de données fictives JSON',
  'toolDesc.mock-data-generator':
    "Générez des jeux de données JSON fictifs réalistes d'utilisateurs, de produits et de commandes.",
  'toolName.csv-to-markdown': 'Convertisseur CSV vers tableaux Markdown',
  'toolDesc.csv-to-markdown':
    'Convertissez des tableaux CSV et TSV en tableaux Markdown compatibles GitHub.',
  'toolName.curl-to-code': 'cURL vers code multilangage',
  'toolDesc.curl-to-code':
    'Convertissez des commandes cURL en JavaScript Fetch, Axios, Python, Go, PHP et Rust.',
  'toolName.rsa-key-pair-generator': 'Générateur de paires de clés RSA et ECDSA',
  'toolDesc.rsa-key-pair-generator':
    'Générez des clés publiques et privées RSA et ECDSA au format PEM dans le navigateur.',
  'toolName.svg-optimizer': 'Optimiseur et nettoyeur SVG',
  'toolDesc.svg-optimizer':
    'Minifiez le SVG, retirez les métadonnées des éditeurs, nettoyez les chemins et mesurez les octets économisés.',
  'toolName.html-table-to-json': 'Convertisseur de tableaux HTML vers JSON',
  'toolDesc.html-table-to-json':
    'Extrayez et analysez des tableaux HTML en objets ou tableaux JSON structurés.',
  'toolName.favicon-generator': "Générateur de favicons et d'icônes d'application",
  'toolDesc.favicon-generator':
    'Générez des icônes 16x16, 32x32 et Apple Touch, un manifeste web et des balises HTML link.',
  'toolName.gitignore-generator': 'Générateur de fichiers .gitignore',
  'toolDesc.gitignore-generator':
    'Générez des fichiers .gitignore personnalisés pour Node, Python, Java, Go, Rust, macOS et les IDE.',
  'toolName.htpasswd-generator': 'Générateur de fichiers .htpasswd',
  'toolDesc.htpasswd-generator':
    "Générez des empreintes de mots de passe Bcrypt, MD5 et SHA-1 pour l'authentification HTTP Basic d'Apache et Nginx.",
  'toolName.dockerfile-generator': 'Générateur de Dockerfiles',
  'toolDesc.dockerfile-generator':
    'Générez des Dockerfiles de production à plusieurs étapes pour Node, Python, Go, Rust et Nginx.',
  'toolName.css-glassmorphism': "Générateur CSS d'effet verre dépoli",
  'toolDesc.css-glassmorphism':
    "Concevez des cartes d'interface en verre dépoli avec flou, opacité et Tailwind CSS en temps réel.",
  'toolName.css-grid-generator': 'Générateur de mises en page CSS Grid',
  'toolDesc.css-grid-generator':
    'Créez des grilles CSS personnalisées avec fusion de lignes et colonnes, espacements et aperçu interactif.',
  'toolName.css-blob-generator': 'Générateur de formes organiques CSS et SVG',
  'toolDesc.css-blob-generator':
    'Générez des formes organiques fluides avec border-radius CSS et des chemins SVG.',
  'toolName.robots-txt-generator': 'Générateur et testeur de robots.txt',
  'toolDesc.robots-txt-generator':
    "Créez des fichiers robots.txt optimisés pour le référencement avec agents personnalisés, règles d'interdiction et plans de site.",
  'toolName.sitemap-generator': 'Générateur de plans de site XML',
  'toolDesc.sitemap-generator':
    "Générez des fichiers sitemap.xml valides avec balises lastmod, changefreq et priority à partir de listes d'URL.",
  'toolName.sql-to-json': 'Convertisseur SQL vers JSON',
  'toolDesc.sql-to-json':
    'Convertissez des instructions SQL INSERT et des exports de tables en tableaux et objets JSON structurés.',
  'toolName.totp-generator': "Générateur d'authentificateurs 2FA / TOTP",
  'toolDesc.totp-generator':
    'Générez des codes de sécurité TOTP RFC 6238, des secrets Base32 et des URI QR otpauth://.',
  'toolName.markdown-table-generator': 'Générateur de tableaux Markdown',
  'toolDesc.markdown-table-generator':
    'Créez, modifiez et formatez des tableaux Markdown GitHub avec un éditeur de grille interactif.',
  'toolName.key-code-info': 'Informations sur les codes de touches JavaScript',
  'toolDesc.key-code-info':
    'Inspectez les valeurs event.key, code, which et keyCode avec un écouteur de frappes en direct.',
  'toolName.aspect-ratio-calculator': "Calculateur de rapport d'aspect",
  'toolDesc.aspect-ratio-calculator':
    "Calculez les rapports d'aspect 16:9, 4:3 et 21:9 des images et vidéos avec redimensionnement proportionnel.",
  'toolName.base64-to-image': 'Décodeur Base64 vers image',
  'toolDesc.base64-to-image':
    'Décodez des chaînes Base64 et des URI de données en fichiers image PNG, JPG, WebP et SVG.',
  'toolName.html-to-markdown': 'Convertisseur HTML vers Markdown',
  'toolDesc.html-to-markdown':
    'Convertissez du HTML, des titres, liens, citations et listes en Markdown épuré.',
  'toolName.css-triangle-generator': 'Générateur de triangles CSS',
  'toolDesc.css-triangle-generator':
    'Générez des triangles et des infobulles orientés dans toutes les directions avec les seules bordures CSS.',
  'toolName.svg-placeholder-generator': "Générateur d'images de substitution SVG",
  'toolDesc.svg-placeholder-generator':
    'Générez des images de substitution SVG et des URI de données avec dimensions et texte personnalisés.',
  'toolName.css-flexbox-generator': 'Générateur CSS Flexbox',
  'toolDesc.css-flexbox-generator':
    'Explorez visuellement les conteneurs et éléments CSS Flexbox avec un aperçu interactif et export du code.',
  'toolName.open-graph-previewer': 'Aperçu Open Graph et réseaux sociaux',
  'toolDesc.open-graph-previewer':
    'Prévisualisez les cartes de partage Twitter, Facebook, LinkedIn et Discord ainsi que les résultats Google.',
  'toolName.ascii-art-generator': "Générateur d'art ASCII et de bannières",
  'toolDesc.ascii-art-generator':
    'Générez de grandes bannières ASCII pour les commentaires de code, README et terminaux.',
  'toolName.css-animation-generator': "Générateur d'animations CSS",
  'toolDesc.css-animation-generator':
    'Générez des animations CSS par images clés (rebond, pulsation, secousse, rotation, retournement) avec aperçu en direct.',
  'toolName.markdown-to-html': 'Convertisseur Markdown vers HTML',
  'toolDesc.markdown-to-html':
    'Convertissez la syntaxe Markdown en balisage HTML brut formaté ou minifié.',
  'toolName.css-text-shadow': "Générateur d'ombres de texte CSS",
  'toolDesc.css-text-shadow':
    'Générez des ombres de texte à plusieurs couches, de la typographie 3D et des effets de lueur néon CSS.',
  'toolName.time-duration-calculator': "Calculateur de durée et d'écart entre dates",
  'toolDesc.time-duration-calculator':
    'Calculez le temps exact écoulé entre deux dates et convertissez les unités de temps.',
  'toolName.xml-to-json': 'XML vers JSON et JSON vers XML',
  'toolDesc.xml-to-json':
    'Convertissez des données XML en JSON structuré et des objets JSON en balisage XML valide.',
  'toolName.list-to-sql-in': 'Liste vers clause SQL IN',
  'toolDesc.list-to-sql-in':
    'Convertissez des listes de texte, des identifiants et des feuilles de calcul en clauses SQL IN formatées.',
  'toolName.svg-to-png': 'Convertisseur SVG vers PNG / JPG / WebP',
  'toolDesc.svg-to-png':
    'Convertissez des graphiques vectoriels SVG en images matricielles haute résolution (PNG, JPEG, WebP).',
  'toolName.ip-subnet-calculator': 'Calculateur de sous-réseaux IPv4',
  'toolDesc.ip-subnet-calculator':
    "Calculez l'adresse réseau, la diffusion, la plage d'hôtes utilisables, le masque et le CIDR.",
  'toolName.css-filter-generator': 'Générateur de filtres CSS',
  'toolDesc.css-filter-generator':
    "Générez des filtres d'image CSS : flou, luminosité, contraste, niveaux de gris, teinte et sépia.",
  'toolName.bcrypt-verifier': "Vérificateur d'empreintes Bcrypt",
  'toolDesc.bcrypt-verifier':
    'Vérifiez des mots de passe en clair face à des empreintes Bcrypt et inspectez le coût et les paramètres du sel.',
  'toolName.css-border-radius': 'Rayon de bordure CSS à 8 points',
  'toolDesc.css-border-radius':
    'Générez des rayons de bordure asymétriques à 8 points, des formes organiques et des carrés arrondis.',
  'toolName.jwt-generator': 'Générateur de jetons JWT',
  'toolDesc.jwt-generator':
    'Créez et signez des jetons JWT personnalisés avec HMAC-SHA256, expiration et déclarations de contenu.',
  'toolName.ulid-generator': 'Générateur ULID et UUID v7',
  'toolDesc.ulid-generator':
    'Générez des identifiants ULID de 128 bits et UUID v7 triables selon leur horodatage.',
  'toolName.curl-builder': 'Générateur de commandes cURL',
  'toolDesc.curl-builder':
    'Construisez visuellement des requêtes API et exportez des commandes cURL exécutables dans un terminal.',
  'toolName.base64-to-pdf': 'Convertisseur Base64 vers PDF',
  'toolDesc.base64-to-pdf':
    'Décodez directement des chaînes Base64 dans un lecteur PDF du navigateur avec téléchargement.',
  'toolName.css-neumorphism': 'Générateur de néomorphisme CSS',
  'toolDesc.css-neumorphism':
    'Générez des ombres douces, des profondeurs en creux et des formes convexes en CSS pur.',
  'toolName.string-byte-counter': "Compteur d'octets et de caractères UTF-8",
  'toolDesc.string-byte-counter':
    'Calculez la longueur en octets UTF-8, le nombre de caractères et les limites des colonnes VARCHAR.',
  'toolName.css-mesh-gradient': 'Générateur de dégradés maillés CSS',
  'toolDesc.css-mesh-gradient':
    'Générez des dégradés maillés multipoints et des halos radiaux pour les arrière-plans de vos interfaces.',
  'toolName.html-to-jsx': 'Convertisseur HTML vers JSX / React',
  'toolDesc.html-to-jsx':
    'Convertissez du HTML en composants React JSX avec attributs camelCase et styles en ligne.',
  'toolName.css-clip-path': 'Générateur CSS clip-path et polygones',
  'toolDesc.css-clip-path':
    'Concevez visuellement des polygones clip-path, des formes géométriques et des masques personnalisés en CSS pur.',
  'toolName.css-scrollbar-generator': 'Générateur de barres de défilement CSS',
  'toolDesc.css-scrollbar-generator':
    'Générez des styles personnalisés avec les pseudo-éléments WebKit et la propriété standard scrollbar-color.',
  'toolName.css-pattern-generator': "Générateur de motifs d'arrière-plan CSS",
  'toolDesc.css-pattern-generator':
    'Créez des motifs répétitifs en CSS pur : grilles de points, rayures et quadrillages.',
  'toolName.svg-path-visualizer': 'Visualiseur et inspecteur de chemins SVG',
  'toolDesc.svg-path-visualizer':
    "Visualisez, inspectez et analysez les commandes et coordonnées de l'attribut d des chemins SVG.",
  'toolName.color-palette-generator': 'Générateur de palettes Tailwind',
  'toolDesc.color-palette-generator':
    "Générez des gammes accessibles de nuances 50 à 950 et des palettes harmonieuses à partir d'une couleur hexadécimale.",
  'toolName.csv-to-sql-insert': 'Générateur SQL INSERT à partir de CSV',
  'toolDesc.csv-to-sql-insert':
    'Convertissez des tableaux CSV en instructions SQL INSERT par lots pour PostgreSQL, MySQL et SQLite.',
  'toolName.sql-minifier': 'Minificateur de requêtes SQL',
  'toolDesc.sql-minifier':
    'Supprimez les commentaires et espaces pour compacter les requêtes SQL sur une seule ligne.',
  'toolName.json-to-graphql': 'Générateur de schémas GraphQL à partir de JSON',
  'toolDesc.json-to-graphql':
    "Déduisez automatiquement des types, entrées et schémas GraphQL à partir d'exemples JSON.",
  'toolName.tsv-to-json': 'Convertisseur TSV vers JSON',
  'toolDesc.tsv-to-json':
    'Convertissez des valeurs séparées par des tabulations (TSV) en tableaux JSON structurés et inversement.',
  'toolName.ndjson-to-json': 'Convertisseur NDJSON / JSONL vers JSON',
  'toolDesc.ndjson-to-json':
    'Convertissez des flux JSON délimités par des retours à la ligne en tableaux JSON standard et inversement.',
  'toolName.json-size-analyzer': 'Analyseur de taille et de mémoire JSON',
  'toolDesc.json-size-analyzer':
    "Analysez la taille en octets, la profondeur d'imbrication, la répartition des objets et le gain de minification du JSON.",
  'toolName.hex-to-base64': 'Convertisseur hexadécimal vers Base64',
  'toolDesc.hex-to-base64':
    "Convertissez des chaînes d'octets hexadécimales brutes en Base64 et inversement.",
  'toolName.punycode-converter': 'Convertisseur de domaines Punycode et IDN',
  'toolDesc.punycode-converter':
    'Convertissez les noms de domaine internationalisés entre Unicode et Punycode ASCII (xn--).',
  'toolName.morse-code-converter': 'Traducteur de morse audio et texte',
  'toolDesc.morse-code-converter':
    'Traduisez du texte en morse avec lecture audio en temps réel et décodez-le en texte.',
  'toolName.base32-encoder': 'Encodeur et décodeur Base32',
  'toolDesc.base32-encoder':
    'Encodez et décodez des chaînes au format Base32 RFC 4648 pour les secrets 2FA et les jetons.',
  'toolName.password-strength-analyzer': "Analyseur de robustesse et d'entropie des mots de passe",
  'toolDesc.password-strength-analyzer':
    "Calculez l'entropie en bits, le délai estimé d'attaque par force brute et le score de complexité.",
  'toolName.semver-calculator': 'Calculateur de plages et de versions Semver',
  'toolDesc.semver-calculator':
    'Évaluez les plages de versions sémantiques, vérifiez les contraintes npm satisfies et incrémentez les versions.',
  'toolName.ipv6-subnet-calculator': 'Calculateur de sous-réseaux et de préfixes IPv6',
  'toolDesc.ipv6-subnet-calculator':
    "Développez, compressez et calculez les plages de préfixes IPv6, les sous-réseaux CIDR et les types d'adresses.",
  'toolName.mac-address-generator': "Générateur et formateur d'adresses MAC",
  'toolDesc.mac-address-generator':
    'Générez des adresses MAC aléatoires unicast ou multicast avec séparateurs deux-points, tirets ou notation Cisco.',
  'toolName.crontab-descriptor': "Explication d'expressions crontab",
  'toolDesc.crontab-descriptor':
    'Traduisez les expressions de planification cron en descriptions anglaises lisibles.',
  'toolName.htaccess-to-nginx': 'Convertisseur Apache .htaccess vers Nginx',
  'toolDesc.htaccess-to-nginx':
    'Convertissez les règles Apache mod_rewrite, les redirections et les en-têtes en blocs de serveur Nginx.',
  'toolName.dns-record-generator': "Générateur d'enregistrements DNS de sécurité des courriels",
  'toolDesc.dns-record-generator':
    'Générez des enregistrements TXT SPF, DKIM et DMARC pour authentifier le domaine des courriels.',
  'toolName.slug-to-title': 'Convertisseur de slug vers titre et casse',
  'toolDesc.slug-to-title':
    "Convertissez les slugs d'URL en titres, en phrases, en PascalCase et en camelCase.",
  'toolName.text-obfuscator': 'Détecteur de caractères invisibles et de largeur nulle',
  'toolDesc.text-obfuscator':
    'Détectez et retirez les espaces de largeur nulle, marques Unicode et caractères de formatage invisibles.',
  'toolName.csv-column-extractor': 'Extracteur et filtre de colonnes CSV',
  'toolDesc.csv-column-extractor':
    'Sélectionnez, extrayez et réordonnez des colonnes de fichiers CSV volumineux.',
  'toolName.sql-to-typescript': 'Table SQL vers interface TypeScript',
  'toolDesc.sql-to-typescript':
    'Convertissez des définitions SQL CREATE TABLE en interfaces TypeScript à typage sûr.',
  'toolName.json-to-env': 'Convertisseur JSON vers .env',
  'toolDesc.json-to-env':
    "Aplatissez les objets JSON imbriqués en variables d'environnement clé-valeur et inversement.",
  'toolName.json-minifier': 'Minificateur et sérialiseur JSON',
  'toolDesc.json-minifier':
    'Minifiez les fichiers JSON en supprimant les espaces pour réduire la bande passante des données API.',
  'toolName.markdown-table-to-csv': 'Convertisseur de tableaux Markdown vers CSV',
  'toolDesc.markdown-table-to-csv':
    'Convertissez des tableaux Markdown GitHub en fichiers CSV pour tableurs et en téléchargements Excel.',
  'toolName.llm-token-counter': 'Calculateur de jetons et de coûts LLM',
  'toolDesc.llm-token-counter':
    "Estimez le nombre de jetons et les coûts d'inférence API des modèles GPT-4o, Claude 3.5, Gemini et Llama 3.",
  'toolName.openai-function-schema': "Générateur de schémas d'appels de fonctions OpenAI",
  'toolDesc.openai-function-schema':
    "Convertissez des objets JSON en schémas structurés de paramètres d'outils et d'appels de fonctions OpenAI.",
  'toolName.prompt-template-formatter': 'Compilateur et interpolateur de modèles de consignes',
  'toolDesc.prompt-template-formatter':
    'Interpolez les variables et validez les paramètres des modèles de consignes IA Jinja2 et Mustache.',
  'toolName.embedding-similarity': 'Calculateur de similarité de vecteurs de plongement',
  'toolDesc.embedding-similarity':
    'Calculez la similarité cosinus, la distance euclidienne et le produit scalaire entre des vecteurs de plongement.',
  'toolName.text-chunk-splitter': 'Découpeur de texte RAG et simulateur de fenêtres de jetons',
  'toolDesc.text-chunk-splitter':
    'Divisez les documents en blocs de jetons ou caractères qui se chevauchent pour les pipelines de recherche vectorielle RAG.',
  'toolName.jsonl-dataset-validator': "Validateur JSONL d'ajustement fin OpenAI",
  'toolDesc.jsonl-dataset-validator':
    "Validez les fichiers de données JSONL et les structures de messages pour l'ajustement fin des modèles OpenAI et Gemini.",
  'toolName.prompt-format-converter': 'Convertisseur de consignes ChatML, Anthropic et Llama 3',
  'toolDesc.prompt-format-converter':
    'Convertissez les consignes de dialogue entre les formats ChatML, Anthropic Human/Assistant et Llama 3.',
  'toolName.sampling-curve-visualizer': "Visualiseur de courbes d'échantillonnage LLM",
  'toolDesc.sampling-curve-visualizer':
    'Simulez et visualisez la distribution des probabilités des jetons selon la température, Top-P et Top-K.',
  'toolName.system-prompt-formatter': 'Générateur de consignes système IA et formateur Markdown',
  'toolDesc.system-prompt-formatter':
    'Formatez et structurez les instructions système IA avec rôles, directives, formats de sortie et exemples.',
  'toolName.prompt-diff': 'Comparateur de versions et de différences de consignes IA',
  'toolDesc.prompt-diff':
    'Comparez deux versions de consignes pour repérer les changements de lignes, ajouts de mots et écarts de jetons.',
  'toolName.css-to-tailwind': 'Convertisseur CSS vers Tailwind CSS',
  'toolDesc.css-to-tailwind':
    'Convertissez des règles CSS standard et blocs de déclarations en classes utilitaires Tailwind CSS.',
  'toolName.tailwind-to-css': 'Convertisseur Tailwind vers CSS standard',
  'toolDesc.tailwind-to-css':
    'Convertissez des classes Tailwind CSS en feuilles de style CSS standard réutilisables.',
  'toolName.css-specificity-calculator': 'Calculateur et inspecteur de spécificité CSS',
  'toolDesc.css-specificity-calculator':
    'Calculez les tuples de spécificité des sélecteurs (identifiants, classes, éléments) et comparez leur priorité dans la cascade.',
  'toolName.css-keyframes-generator': "Générateur de chronologies d'animations CSS",
  'toolDesc.css-keyframes-generator':
    'Générez des animations CSS @keyframes à plusieurs étapes et leurs règles de durée avec aperçu visuel en temps réel.',
  'toolName.tailwind-class-sorter': 'Trieur et formateur de classes Tailwind',
  'toolDesc.tailwind-class-sorter':
    "Triez et dédupliquez les classes Tailwind CSS selon l'ordre officiel de Prettier.",
  'toolName.fluid-typography': 'Calculateur de typographie fluide CSS clamp()',
  'toolDesc.fluid-typography':
    'Calculez des formules CSS clamp() pour adapter la taille des caractères aux points de rupture de la fenêtre.',
  'toolName.css-media-query-builder': 'Générateur de plages de requêtes média CSS',
  'toolDesc.css-media-query-builder':
    'Créez des requêtes CSS @media avec syntaxe de plages moderne, mode sombre et préférences de mouvement.',
  'toolName.css-grid-area-builder': 'Générateur de zones CSS Grid',
  'toolDesc.css-grid-area-builder':
    'Générez visuellement des déclarations grid-template-areas CSS et des matrices de zones adaptatives.',
  'toolName.css-cubic-bezier': 'Concepteur de courbes CSS cubic-bezier',
  'toolDesc.css-cubic-bezier':
    'Concevez et prévisualisez des fonctions temporelles cubic-bezier avec préréglages de ressort et de rebond.',
  'toolName.color-harmony-generator': "Générateur d'harmonies et de palettes de couleurs",
  'toolDesc.color-harmony-generator':
    'Générez des harmonies complémentaires, triadiques et analogues avec codes hexadécimaux et HSL.',
  'toolName.json-to-pydantic': 'JSON vers modèle Python Pydantic V2',
  'toolDesc.json-to-pydantic':
    'Convertissez des données JSON en définitions de classes Python Pydantic V2 BaseModel à typage sûr.',
  'toolName.json-to-rust-serde': 'Convertisseur JSON vers structures Rust Serde',
  'toolDesc.json-to-rust-serde':
    'Convertissez des objets JSON en structures Rust avec attributs de dérivation serde.',
  'toolName.json-to-swift': 'Convertisseur JSON vers structures Swift Codable',
  'toolDesc.json-to-swift':
    'Convertissez des réponses API JSON en structures Swift Codable et Identifiable.',
  'toolName.json-to-kotlin': 'Convertisseur JSON vers classes de données Kotlin',
  'toolDesc.json-to-kotlin':
    'Convertissez du JSON en classes de données Kotlin avec annotations @Serializable et @SerialName.',
  'toolName.json-to-csharp': 'Convertisseur JSON vers classes C#',
  'toolDesc.json-to-csharp':
    'Convertissez du JSON en classes C# fortement typées avec attributs System.Text.Json.',
  'toolName.json-to-java-pojo': 'Convertisseur JSON vers POJO Java Lombok',
  'toolDesc.json-to-java-pojo':
    'Convertissez des objets JSON en classes POJO Java avec annotations Lombok @Data et Jackson.',
  'toolName.typescript-to-json-schema': 'Convertisseur TypeScript vers JSON Schema',
  'toolDesc.typescript-to-json-schema':
    'Convertissez des interfaces TypeScript en JSON Schema Draft 7/2020-12 standard.',
  'toolName.yaml-to-typescript': 'Convertisseur YAML vers interfaces TypeScript',
  'toolDesc.yaml-to-typescript':
    'Convertissez directement des documents de configuration YAML en interfaces TypeScript typées.',
  'toolName.graphql-to-typescript': 'Convertisseur GraphQL SDL vers types TypeScript',
  'toolDesc.graphql-to-typescript':
    'Convertissez les types du langage de définition de schéma GraphQL (SDL) en interfaces TypeScript.',
  'toolName.protobuf-to-json': 'Convertisseur Protobuf (proto3) vers JSON Schema',
  'toolDesc.protobuf-to-json':
    'Convertissez des schémas de messages Protocol Buffers en définitions JSON Schema standard.',
  'toolName.sql-to-mongodb': 'Convertisseur SQL vers requêtes MongoDB',
  'toolDesc.sql-to-mongodb':
    'Convertissez des requêtes SQL SELECT et WHERE en syntaxe MongoDB db.collection.find().',
  'toolName.json-to-sql-ddl': 'Générateur DDL SQL CREATE TABLE à partir de JSON',
  'toolDesc.json-to-sql-ddl':
    'Déduisez les types de colonnes de données JSON et générez des schémas DDL SQL CREATE TABLE.',
  'toolName.sql-explainer': 'Explication visuelle de requêtes SQL',
  'toolDesc.sql-explainer':
    'Décomposez les jointures, filtres et agrégations SQL SELECT complexes en étapes anglaises simples.',
  'toolName.postgres-connection-builder': "Générateur et analyseur d'URI PostgreSQL",
  'toolDesc.postgres-connection-builder':
    'Créez et analysez des chaînes de connexion PostgreSQL et leurs paramètres.',
  'toolName.redis-command-generator': 'Générateur de commandes Redis et aide aux clés',
  'toolDesc.redis-command-generator':
    "Créez des commandes Redis CLI pour les hachages, ensembles, ensembles triés, listes et délais d'expiration TTL.",
  'toolName.csv-to-parquet-schema': 'Convertisseur CSV vers schémas Apache Parquet',
  'toolDesc.csv-to-parquet-schema':
    'Inspectez les en-têtes CSV et générez des déclarations de schémas Apache Parquet PyArrow.',
  'toolName.mongodb-objectid-parser': "Analyseur d'horodatages et de métadonnées MongoDB ObjectId",
  'toolDesc.mongodb-objectid-parser':
    'Extrayez les dates de création, identifiants de machines et de processus des ObjectId MongoDB.',
  'toolName.sql-index-advisor': "Conseiller d'index SQL composites B-Tree",
  'toolDesc.sql-index-advisor':
    'Analysez les clauses SQL WHERE et JOIN pour recommander des index composites B-Tree optimaux.',
  'toolName.postgres-to-mysql': 'Convertisseur de dialecte PostgreSQL vers MySQL',
  'toolDesc.postgres-to-mysql':
    'Convertissez le dialecte SQL PostgreSQL et ses types en syntaxe de schéma compatible MySQL.',
  'toolName.prisma-to-sql': 'Générateur DDL SQL à partir de schémas Prisma',
  'toolDesc.prisma-to-sql':
    'Convertissez les modèles de schémas Prisma ORM en instructions SQL CREATE TABLE brutes.',
  'toolName.docker-compose-to-k8s': 'Convertisseur Docker Compose vers YAML Kubernetes',
  'toolDesc.docker-compose-to-k8s':
    'Convertissez les services docker-compose.yml en manifestes Kubernetes Deployment et Service.',
  'toolName.nginx-formatter': 'Formateur et validateur de configuration Nginx',
  'toolDesc.nginx-formatter':
    'Formatez et indentez les blocs server, directives location et configurations upstream Nginx.',
  'toolName.terraform-formatter': 'Formateur et analyseur HCL Terraform',
  'toolDesc.terraform-formatter':
    'Formatez les fichiers HashiCorp Terraform (.tf) avec une indentation standard de 2 espaces.',
  'toolName.kubeconfig-validator': 'Validateur Kubernetes Kubeconfig',
  'toolDesc.kubeconfig-validator':
    'Validez les fichiers YAML Kubeconfig, contextes de clusters, adresses de serveurs et identifiants utilisateurs.',
  'toolName.helm-values-evaluator': 'Évaluateur de modèles Helm et values.yaml',
  'toolDesc.helm-values-evaluator':
    "Simulez l'interpolation des variables de modèles Helm avec des données values.yaml personnalisées.",
  'toolName.dockerfile-linter': 'Analyseur de Dockerfiles et de bonnes pratiques',
  'toolDesc.dockerfile-linter':
    'Analysez les problèmes de cache, les couches superflues et les bonnes pratiques de sécurité des conteneurs.',
  'toolName.systemd-unit-generator': "Générateur d'unités de service Linux systemd",
  'toolDesc.systemd-unit-generator':
    "Générez des fichiers d'unités systemd .service pour les démons Node.js, Python et Go.",
  'toolName.caddy-to-nginx': 'Convertisseur Caddyfile vers proxy inverse Nginx',
  'toolDesc.caddy-to-nginx':
    'Convertissez des blocs de proxy inverse Caddy en configurations de serveur Nginx pour la production.',
  'toolName.aws-iam-policy-builder': 'Générateur et validateur de politiques JSON AWS IAM',
  'toolDesc.aws-iam-policy-builder':
    'Créez et validez des instructions de politiques JSON AWS IAM avec champs Effect, Action et Resource.',
  'toolName.prometheus-alert-builder': "Générateur de règles d'alerte Prometheus et PromQL",
  'toolDesc.prometheus-alert-builder':
    "Générez des manifestes YAML de règles d'alerte Prometheus avec expressions PromQL et étiquettes.",
  'toolName.websocket-tester': 'Client WebSocket et testeur de latence',
  'toolDesc.websocket-tester':
    'Connectez-vous aux adresses WebSocket wss://, envoyez du JSON et suivez les journaux de messages.',
  'toolName.curl-to-postman': 'Convertisseur cURL vers collections Postman',
  'toolDesc.curl-to-postman':
    'Convertissez des commandes cURL en fichiers JSON Collection Postman v2.1 importables.',
  'toolName.ssl-certificate-inspector': 'Inspecteur de certificats SSL PEM et SAN',
  'toolDesc.ssl-certificate-inspector':
    "Inspectez la validité, l'émetteur, les noms alternatifs du sujet et l'expiration des certificats x509 PEM SSL/TLS.",
  'toolName.csr-generator': 'Générateur de demandes de signature de certificat (CSR)',
  'toolDesc.csr-generator':
    'Générez des commandes OpenSSL de demande de signature de certificat avec Common Name et domaines SAN.',
  'toolName.sse-stream-tester': 'Testeur de flux Server-Sent Events (SSE)',
  'toolDesc.sse-stream-tester':
    'Testez les flux Server-Sent Events (SSE) en temps réel et inspectez les blocs EventSource entrants.',
  'toolName.graphql-query-formatter': 'Formateur et minificateur de requêtes GraphQL',
  'toolDesc.graphql-query-formatter':
    'Formatez ou minifiez les requêtes, mutations, abonnements et fragments GraphQL.',
  'toolName.har-viewer': 'Visionneuse et analyseur de fichiers HAR',
  'toolDesc.har-viewer':
    "Analysez les journaux HTTP Archive (.har) pour inspecter la chronologie des requêtes, les en-têtes et les codes d'état.",
  'toolName.dns-lookup-simulator': "Simulateur d'enregistrements et de propagation DNS",
  'toolDesc.dns-lookup-simulator':
    "Simulez les recherches d'enregistrements A, AAAA, CNAME, MX, TXT et NS avec leurs durées TTL.",
  'toolName.http-wire-format': 'Convertisseur de requêtes HTTP vers format réseau brut',
  'toolDesc.http-wire-format':
    'Convertissez des requêtes HTTP structurées en texte de transmission HTTP/1.1 brut.',
  'toolName.webhook-signature-verifier': 'Vérificateur de signatures HMAC de webhooks',
  'toolDesc.webhook-signature-verifier':
    'Vérifiez les signatures HMAC SHA-256 des données de webhooks Stripe, GitHub et Shopify.',
  'toolName.uuid-v7-generator': 'Générateur UUID v7 chronologique',
  'toolDesc.uuid-v7-generator':
    'Générez des UUIDv7 ordonnés par temps Unix et extrayez leurs horodatages.',
  'toolName.nanoid-generator': "Générateur NanoID et d'alphabets personnalisés",
  'toolDesc.nanoid-generator':
    'Générez des NanoID compacts, adaptés aux URL et cryptographiquement sûrs avec des alphabets personnalisés.',
  'toolName.base58-encoder': 'Encodeur et décodeur Base58 (Bitcoin / Solana / IPFS)',
  'toolDesc.base58-encoder':
    'Encodez et décodez du texte et des octets bruts aux formats Base58 et Base58Check.',
  'toolName.ssh-key-inspector': "Inspecteur d'empreintes de clés publiques SSH",
  'toolDesc.ssh-key-inspector':
    'Analysez les clés publiques OpenSSH pour extraire algorithmes, commentaires et empreintes SHA-256.',
  'toolName.pgp-key-inspector': 'Inspecteur de blocs de clés PGP et GPG',
  'toolDesc.pgp-key-inspector':
    'Validez et inspectez les clés publiques ou privées PGP en armure ASCII et les blocs de messages chiffrés.',
  'toolName.api-key-generator': 'Générateur de clés API et de jetons avec préfixe',
  'toolDesc.api-key-generator':
    'Générez des clés API et secrets de session aléatoires cryptographiques avec des préfixes personnalisés.',
  'toolName.jwt-signature-validator': "Validateur de signature et d'expiration JWT",
  'toolDesc.jwt-signature-validator':
    "Inspectez les en-têtes et déclarations JWT et vérifiez la structure du jeton et ses dates d'expiration.",
  'toolName.aes-crypto-playground': "Banc d'essai de chiffrement et déchiffrement AES-256",
  'toolDesc.aes-crypto-playground':
    'Générez des clés cryptographiques AES de 256 bits et testez les paramètres de chiffrement AES-GCM.',
  'toolName.bip39-seed-deriver': 'Dérivation de graine à partir de phrases BIP-39',
  'toolDesc.bip39-seed-deriver':
    'Dérivez des graines binaires de 512 bits en hexadécimal à partir de phrases mnémoniques BIP-39 de 12 ou 24 mots.',
  'toolName.argon2-hash-generator': "Formateur d'empreintes de mots de passe Argon2",
  'toolDesc.argon2-hash-generator':
    "Formatez des empreintes Argon2id avec coût mémoire, nombre d'itérations et parallélisme personnalisés.",
  'toolName.android-manifest-builder': "Générateur de manifeste XML et d'autorisations Android",
  'toolDesc.android-manifest-builder':
    "Générez des fichiers AndroidManifest.xml avec autorisations, activités et filtres d'intention de lancement.",
  'toolName.ios-plist-builder': "Générateur de clés d'autorisations iOS Info.plist",
  'toolDesc.ios-plist-builder':
    "Créez des fichiers XML iOS Info.plist avec descriptions standard d'utilisation des autorisations.",
  'toolName.app-icon-resizer': "Référence des tailles d'icônes d'application",
  'toolDesc.app-icon-resizer':
    "Consultez les spécifications standard des tailles d'icônes de l'App Store iOS et du Play Store Android.",
  'toolName.universal-links-validator': 'Générateur Apple Universal Links et Android App Links',
  'toolDesc.universal-links-validator':
    'Générez des fichiers apple-app-site-association et assetlinks.json pour les liens profonds.',
  'toolName.flutter-theme-generator': 'Générateur de ColorScheme Flutter Material 3',
  'toolDesc.flutter-theme-generator':
    'Convertissez des palettes hexadécimales en code Flutter Material 3 ThemeData ColorScheme.',
  'toolName.xcode-asset-catalog': 'Générateur de Contents.json pour catalogues Xcode',
  'toolDesc.xcode-asset-catalog':
    "Générez des manifestes Contents.json de catalogues d'images 1x, 2x et 3x pour les applications iOS.",
  'toolName.android-keystore-fingerprint': "Formateur d'empreintes Android Keystore (SHA1/SHA256)",
  'toolDesc.android-keystore-fingerprint':
    'Formatez des empreintes de certificats Keystore SHA-1 et SHA-256 pour Firebase et Google OAuth.',
  'toolName.electron-config-builder': "Générateur Electron main.js et fenêtres d'application",
  'toolDesc.electron-config-builder':
    'Générez des fichiers main.js de départ pour Electron avec BrowserWindow et paramètres de sécurité.',
  'toolName.react-native-icon-finder':
    "Recherche d'icônes vectorielles React Native et génération de code",
  'toolDesc.react-native-icon-finder':
    "Recherchez et exportez des noms d'icônes et balises d'import JSX pour react-native-vector-icons.",
  'toolName.capacitor-config-builder': 'Générateur Capacitor capacitor.config.json',
  'toolDesc.capacitor-config-builder':
    'Créez des fichiers capacitor.config.json pour les applications mobiles hybrides iOS et Android.',
  'toolName.code-side-by-side-diff': 'Visualiseur de différences de code côte à côte',
  'toolDesc.code-side-by-side-diff':
    'Comparez deux extraits de code côte à côte avec suivi des différences ligne par ligne.',
  'toolName.conventional-commit-builder': 'Générateur de messages Git Conventional Commits',
  'toolDesc.conventional-commit-builder':
    'Créez des messages Conventional Commits avec feat, fix, portée et mentions de changements incompatibles.',
  'toolName.git-command-builder': 'Générateur interactif de commandes Git',
  'toolDesc.git-command-builder':
    'Générez des commandes Git de rebase interactif, cherry-pick, réinitialisation forcée et remisage.',
  'toolName.env-sanitizer': 'Suppression des secrets de .env vers .env.example',
  'toolDesc.env-sanitizer':
    'Retirez les clés API privées et identifiants de bases de données des fichiers .env pour créer des modèles .env.example.',
  'toolName.license-generator': 'Générateur de licences libres et SPDX',
  'toolDesc.license-generator':
    "Générez des textes de licences MIT, Apache 2.0 et GPL avec en-têtes de droit d'auteur.",
  'toolName.eslint-prettier-config': 'Générateur de configuration Prettier et ESLint',
  'toolDesc.eslint-prettier-config':
    'Générez des fichiers JSON .prettierrc personnalisés avec choix des guillemets et largeur des tabulations.',
  'toolName.markdown-to-slides': 'Convertisseur Markdown vers présentations HTML',
  'toolDesc.markdown-to-slides':
    'Convertissez des sections Markdown séparées par des lignes horizontales en diapositives HTML adaptatives.',
  'toolName.package-json-formatter': 'Trieur de dépendances et formateur package.json',
  'toolDesc.package-json-formatter':
    'Triez les dépendances alphabétiquement et formatez les fichiers package.json.',
  'toolName.changelog-generator': 'Générateur CHANGELOG.md (Keep a Changelog)',
  'toolDesc.changelog-generator':
    'Générez des journaux de modifications versionnés en Markdown selon les règles Keep a Changelog.',
  'toolName.editorconfig-generator': 'Générateur de fichiers .editorconfig',
  'toolDesc.editorconfig-generator':
    "Générez des fichiers .editorconfig définissant l'indentation, l'encodage et les retours à la ligne pour tous les éditeurs.",
  'toolName.ieee754-visualizer': 'Visualiseur de nombres flottants IEEE 754 sur 32 bits',
  'toolDesc.ieee754-visualizer':
    "Décomposez les nombres flottants de 32 bits en bits de signe, d'exposant et de mantisse.",
  'toolName.bitwise-calculator': 'Calculateur logique bit à bit (AND, OR, XOR, décalage)',
  'toolDesc.bitwise-calculator':
    'Effectuez des opérations AND, OR, XOR, NOT et des décalages sur 32 bits avec résultats binaires et hexadécimaux.',
  'toolName.hex-dump-viewer': "Visionneuse hexadécimale et inspecteur d'offsets binaires",
  'toolDesc.hex-dump-viewer':
    'Affichez du texte sous forme hexadécimale classique par blocs de 16 octets avec offsets et colonne ASCII.',
  'toolName.bignumber-calculator': 'Calculateur BigNumber à précision arbitraire',
  'toolDesc.bignumber-calculator':
    'Effectuez des calculs entiers exacts à précision arbitraire, des puissances et des opérations modulo.',
  'toolName.multi-radix-converter':
    'Convertisseur multibase (binaire, octal, décimal, hexadécimal)',
  'toolDesc.multi-radix-converter':
    'Convertissez simultanément des nombres en représentations binaire, octale, décimale et hexadécimale.',
  'toolName.timezone-meeting-planner':
    'Planificateur de réunions et matrice de chevauchement horaire',
  'toolDesc.timezone-meeting-planner':
    'Coordonnez les horaires de réunions entre les fuseaux UTC, EST, PST, CET, TRT et JST.',
  'toolName.bandwidth-calculator': 'Calculateur de bande passante et de durée de téléchargement',
  'toolDesc.bandwidth-calculator':
    'Calculez les durées de transfert selon la taille des fichiers et le débit Internet en Mbps ou Gbps.',
  'toolName.percentage-growth-calculator':
    'Calculateur de croissance et de variation en pourcentage',
  'toolDesc.percentage-growth-calculator':
    'Calculez des hausses, baisses et indicateurs composés en pourcentage pour vos tableaux de bord.',
  'toolName.cron-timezone-converter': 'Convertisseur de fuseau horaire cron (local ↔ UTC)',
  'toolDesc.cron-timezone-converter':
    'Décalez les heures des expressions cron entre les fuseaux locaux et les calendriers UTC des serveurs.',
  'toolName.matrix-calculator': 'Calculateur matriciel et de transposition',
  'toolDesc.matrix-calculator':
    'Multipliez des matrices, vérifiez leurs dimensions et calculez leur transposée.',
  'toolName.curl-to-python': 'Convertisseur cURL vers Python',
  'toolDesc.curl-to-python': 'Convertissez des commandes cURL en code Python requests ou httpx.',
  'toolName.curl-to-javascript': 'Convertisseur cURL vers JavaScript Fetch',
  'toolDesc.curl-to-javascript':
    'Convertissez des commandes cURL en code JavaScript Fetch API ou Axios moderne.',
  'toolName.curl-to-go': 'Convertisseur cURL vers Go',
  'toolDesc.curl-to-go': 'Convertissez des commandes cURL en code Go net/http idiomatique.',
  'toolName.curl-to-rust': 'Convertisseur cURL vers Rust',
  'toolDesc.curl-to-rust': 'Convertissez des commandes cURL en code client Rust reqwest.',
  'toolName.curl-to-php': 'Convertisseur cURL vers PHP',
  'toolDesc.curl-to-php': 'Convertissez des commandes cURL en code PHP Guzzle ou curl natif.',
  'toolName.curl-to-csharp': 'Convertisseur cURL vers C#',
  'toolDesc.curl-to-csharp': 'Convertissez des commandes cURL en code C# .NET HttpClient.',
  'toolName.curl-to-java': 'Convertisseur cURL vers Java',
  'toolDesc.curl-to-java': 'Convertissez des commandes cURL en code Java 11+ HttpClient.',
  'toolName.curl-to-ai-sdk': 'Convertisseur cURL vers SDK OpenAI et Claude',
  'toolDesc.curl-to-ai-sdk':
    'Convertissez des appels API cURL bruts en code des SDK officiels OpenAI et Anthropic.',
  'toolName.openai-structured-outputs': 'Générateur de sorties structurées strictes OpenAI',
  'toolDesc.openai-structured-outputs':
    'Générez des schémas JSON Schema stricts pour les appels de fonctions OpenAI.',
  'toolName.vercel-ai-core-message-converter': 'Convertisseur de messages Vercel AI SDK',
  'toolDesc.vercel-ai-core-message-converter':
    'Convertissez des journaux de dialogue et messages OpenAI en tableaux CoreMessage Vercel AI SDK.',
  'toolName.langgraph-state-generator': "Générateur de schémas d'état LangGraph",
  'toolDesc.langgraph-state-generator':
    'Générez des définitions State TypedDict et de workflows LangGraph.',
  'toolName.embedding-cost-calculator': 'Calculateur de coûts de plongements vectoriels',
  'toolDesc.embedding-cost-calculator':
    'Calculez les coûts, dimensions vectorielles et besoins mémoire des modèles de plongement.',
  'toolName.anthropic-tool-builder': "Générateur d'outils Anthropic Claude",
  'toolDesc.anthropic-tool-builder':
    'Créez des définitions JSON input_schema pour les outils Anthropic Claude.',
  'toolName.tailwind-v3-to-v4-migrator': 'Migration Tailwind CSS v3 vers v4',
  'toolDesc.tailwind-v3-to-v4-migrator':
    'Migrez tailwind.config.js vers les directives CSS @theme de Tailwind CSS v4.',
  'toolName.css-box-shadow-to-tailwind': 'Convertisseur CSS box-shadow vers Tailwind',
  'toolDesc.css-box-shadow-to-tailwind':
    'Convertissez des valeurs CSS box-shadow complexes en classes Tailwind arbitraires.',
  'toolName.nextjs-metadata-generator': 'Générateur de métadonnées Next.js App Router',
  'toolDesc.nextjs-metadata-generator':
    'Générez des configurations Next.js 16 generateMetadata, OpenGraph et Twitter Card.',
  'toolName.svg-to-css': "SVG vers URI de données d'arrière-plan CSS",
  'toolDesc.svg-to-css':
    'Encodez et optimisez du SVG en URI de données CSS background-image et mask-image.',
  'toolName.html-table-converter': 'Convertisseur de tableaux HTML vers Markdown et CSV',
  'toolDesc.html-table-converter':
    'Convertissez des tableaux HTML en tableaux Markdown épurés, en CSV ou en tableaux JSON.',
  'toolName.natural-language-to-cron': 'Convertisseur de langage naturel vers cron',
  'toolDesc.natural-language-to-cron':
    'Convertissez des descriptions anglaises naturelles en calendriers cron standard à 5 champs.',
  'toolName.gitignore-tester': 'Testeur de motifs .gitignore',
  'toolDesc.gitignore-tester':
    'Testez les règles glob .gitignore et .dockerignore sur des arborescences de fichiers.',
  'toolName.k8s-resource-calculator': 'Calculateur de ressources et de QoS des pods Kubernetes',
  'toolDesc.k8s-resource-calculator':
    'Calculez les demandes et limites de CPU/mémoire ainsi que les classes QoS des pods Kubernetes.',
  'toolName.terraform-hcl-to-json': 'Convertisseur Terraform HCL vers JSON',
  'toolDesc.terraform-hcl-to-json':
    'Convertissez les définitions de ressources Terraform HCL en syntaxe terraform.tf.json.',
  'toolName.systemd-timer-generator': 'Générateur de services et de minuteries systemd',
  'toolDesc.systemd-timer-generator':
    "Générez des paires d'unités systemd .service et .timer pour automatiser Linux.",
  'toolName.sql-to-prisma': 'Convertisseur DDL SQL vers schémas Prisma',
  'toolDesc.sql-to-prisma':
    'Convertissez des instructions SQL CREATE TABLE en modèles de schémas Prisma.',
  'toolName.sql-to-drizzle': 'Convertisseur DDL SQL vers schémas Drizzle ORM',
  'toolDesc.sql-to-drizzle':
    'Convertissez des instructions SQL CREATE TABLE en schémas TypeScript Drizzle ORM.',
  'toolName.postgres-explain-visualizer': 'Analyseur de plans PostgreSQL EXPLAIN',
  'toolDesc.postgres-explain-visualizer':
    'Analysez et visualisez des plans de requêtes PostgreSQL à partir de la sortie JSON EXPLAIN.',
  'toolName.mongodb-to-sql': 'Convertisseur de requêtes MongoDB vers SQL',
  'toolDesc.mongodb-to-sql': 'Convertissez des filtres MongoDB find en requêtes SQL SELECT.',
  'toolName.sql-to-django': 'Convertisseur DDL SQL vers modèles Django',
  'toolDesc.sql-to-django':
    'Convertissez des instructions SQL CREATE TABLE en modèles ORM Python Django.',
  'toolName.sql-keyword-uppercaser': 'Mise en majuscules et formatage de mots-clés SQL',
  'toolDesc.sql-keyword-uppercaser':
    'Mettez les mots-clés SQL en majuscules en préservant les noms des colonnes et des tables.',
  'toolName.subnet-calculator': 'Calculateur de masques IPv4 et de CIDR',
  'toolDesc.subnet-calculator':
    "Calculez le masque, l'adresse de diffusion et la plage d'hôtes utilisables à partir du CIDR.",
  'toolName.uuid-v5-generator': 'Générateur UUID v5 (espace de noms SHA-1)',
  'toolDesc.uuid-v5-generator':
    "Générez des UUID v5 RFC 4122 déterministes à partir d'espaces de noms.",
  'toolName.bip39-seed-phrase-generator': 'Générateur de phrases de récupération BIP-39',
  'toolDesc.bip39-seed-phrase-generator':
    'Générez des phrases de récupération BIP-39 de 12 ou 24 mots cryptographiquement sûres.',
  'toolName.eip712-hasher': 'Hachage de données typées Ethereum EIP-712',
  'toolDesc.eip712-hasher':
    "Calculez le séparateur de domaine et l'empreinte de structure pour la signature de données typées EIP-712.",
  'toolName.crypto-unit-converter': "Convertisseur d'unités de cryptomonnaies",
  'toolDesc.crypto-unit-converter': 'Convertissez entre Wei, Gwei, Ether et satoshis Bitcoin.',
  'toolName.json-to-python-dataclass': 'Convertisseur JSON vers dataclasses Python',
  'toolDesc.json-to-python-dataclass':
    'Convertissez des objets JSON en classes Python 3.10+ @dataclass.',
  'toolName.json-to-go-struct': 'Convertisseur JSON vers structures Go',
  'toolDesc.json-to-go-struct': 'Convertissez des objets JSON en structures Go avec balises json.',
  'toolName.proto-to-typescript': 'Convertisseur Protobuf vers interfaces TypeScript',
  'toolDesc.proto-to-typescript':
    'Convertissez des définitions de messages Proto3 en interfaces TypeScript.',
  'toolName.http-headers-to-json': "Convertisseur d'en-têtes HTTP vers JSON",
  'toolDesc.http-headers-to-json':
    'Convertissez le texte des en-têtes HTTP en objets JSON et inversement.',
  'toolName.jwt-builder': 'Générateur de contenu JWT et simulateur',
  'toolDesc.jwt-builder':
    'Créez des jetons JWT avec en-tête et contenu personnalisés et simulation de signature.',
  'toolName.passphrase-wordlist-generator': 'Générateur de phrases secrètes Diceware',
  'toolDesc.passphrase-wordlist-generator':
    'Générez des phrases secrètes Diceware robustes et mémorisables avec séparateurs personnalisés.',
  'toolName.nanoid-custom-alphabet': 'Générateur NanoID avec alphabet personnalisé',
  'toolDesc.nanoid-custom-alphabet':
    'Générez des NanoID résistants aux collisions avec alphabet et longueur personnalisés.',
  'toolName.mock-credit-card-generator': 'Générateur de cartes de crédit de test (Luhn valide)',
  'toolDesc.mock-credit-card-generator':
    'Générez des numéros de cartes de test conformes à Luhn pour Stripe et les environnements de test.',
  'toolName.tailwind-spacing-generator': "Générateur d'échelles d'espacement Tailwind",
  'toolDesc.tailwind-spacing-generator':
    'Générez des espacements fluides et des échelles de marges externes et internes pour Tailwind CSS.',
  'toolName.docker-compose-env-generator': 'Générateur de modèles .env Docker Compose',
  'toolDesc.docker-compose-env-generator':
    "Extrayez toutes les variables d'environnement de docker-compose.yml vers un modèle .env épuré.",
  'toolName.dns-propagation-checker': 'Vérificateur de propagation DNS',
  'toolDesc.dns-propagation-checker':
    'Vérifiez une simulation de propagation DNS mondiale à travers plusieurs points de présence.',
  'toolName.url-utm-builder': "Générateur d'URL de campagne UTM Google Analytics",
  'toolDesc.url-utm-builder':
    'Créez des URL de campagnes marketing avec utm_source, utm_medium et utm_campaign.',
  'toolName.sha3-hash-generator': "Générateur d'empreintes SHA-3 (Keccak)",
  'toolDesc.sha3-hash-generator': 'Générez des empreintes cryptographiques SHA3-256 et SHA3-512.',
  'toolName.sql-to-go-gorm': 'DDL SQL vers modèles Go GORM',
  'toolDesc.sql-to-go-gorm':
    'Convertissez des définitions SQL CREATE TABLE en structures de modèles Go GORM avec clés primaires.',
  'toolName.sql-to-python-sqlalchemy': 'DDL SQL vers modèles SQLAlchemy 2.0',
  'toolDesc.sql-to-python-sqlalchemy':
    'Convertissez des instructions SQL CREATE TABLE en classes de modèles Python SQLAlchemy 2.0 Declarative Base.',
  'toolName.postman-to-openapi': 'Convertisseur de collections Postman vers OpenAPI 3.1',
  'toolDesc.postman-to-openapi':
    'Convertissez les fichiers JSON Collection Postman v2.1 exportés en spécifications YAML/JSON OpenAPI 3.1.',
  'toolName.openapi-to-postman': "Générateur de collections Postman à partir d'OpenAPI",
  'toolDesc.openapi-to-postman':
    'Convertissez les spécifications API OpenAPI 3.0 et Swagger en collections JSON Postman v2.1 importables.',
  'toolName.protobuf-to-json-schema': 'Convertisseur Protobuf 3 vers JSON Schema',
  'toolDesc.protobuf-to-json-schema':
    'Convertissez des définitions de messages Protocol Buffers (proto3) en schémas JSON Schema Draft-07.',
  'toolName.json-schema-to-protobuf': 'Générateur Protobuf 3 à partir de JSON Schema',
  'toolDesc.json-schema-to-protobuf':
    'Convertissez des définitions JSON Schema en contrats de messages Protocol Buffers proto3 épurés.',
  'toolName.yaml-to-terraform-hcl': 'Convertisseur YAML vers Terraform HCL',
  'toolDesc.yaml-to-terraform-hcl':
    'Convertissez des tables de configuration YAML en blocs locals et variable Terraform HCL.',
  'toolName.terraform-hcl-to-yaml': 'Convertisseur Terraform HCL vers YAML',
  'toolDesc.terraform-hcl-to-yaml':
    'Convertissez des attributs et valeurs locales Terraform HCL en tables YAML structurées.',
  'toolName.csv-to-geojson': 'Convertisseur CSV vers points GeoJSON',
  'toolDesc.csv-to-geojson':
    'Convertissez des données CSV de latitude et longitude en GeoJSON FeatureCollections.',
  'toolName.geojson-to-csv': 'Convertisseur GeoJSON vers coordonnées CSV',
  'toolDesc.geojson-to-csv':
    'Convertissez les géométries de points GeoJSON et leurs propriétés en coordonnées tabulaires CSV.',
  'toolName.json-to-typescript-type-guards':
    'Générateur de gardes de type TypeScript à partir de JSON',
  'toolDesc.json-to-typescript-type-guards':
    'Générez des fonctions booléennes de garde de type TypeScript (isType) à partir de structures JSON.',
  'toolName.typescript-interface-to-zod': 'Interface TypeScript vers schéma Zod',
  'toolDesc.typescript-interface-to-zod':
    "Convertissez des interfaces et types TypeScript en schémas Zod de validation à l'exécution.",
  'toolName.zod-to-typescript-type': 'Inférence de types TypeScript à partir de schémas Zod',
  'toolDesc.zod-to-typescript-type':
    "Extrayez et déduisez les types TypeScript statiques des schémas Zod de validation à l'exécution.",
  'toolName.css-to-scss': 'Convertisseur CSS vers SCSS et SASS imbriqués',
  'toolDesc.css-to-scss':
    'Convertissez des sélecteurs CSS à plat en blocs hiérarchiques SCSS/SASS imbriqués.',
  'toolName.scss-to-css': 'Convertisseur SCSS et SASS vers CSS standard',
  'toolDesc.scss-to-css':
    'Convertissez les variables, mixins et blocs imbriqués SCSS en CSS standard compatible avec les navigateurs.',
  'toolName.html-to-jsx-tailwind': 'Convertisseur HTML vers JSX et Tailwind CSS',
  'toolDesc.html-to-jsx-tailwind':
    'Convertissez du HTML avec attributs class en React JSX avec className et balises autofermantes.',
  'toolName.jsx-to-html': 'Convertisseur React JSX vers HTML standard',
  'toolDesc.jsx-to-html':
    'Convertissez des extraits React JSX avec className et commentaires JSX en balisage HTML pur.',
  'toolName.markdown-to-bbcode': 'Convertisseur Markdown vers BBCode de forum',
  'toolDesc.markdown-to-bbcode':
    'Convertissez des titres, du gras, des images et des liens Markdown en balises BBCode standard.',
  'toolName.bbcode-to-markdown': 'Convertisseur BBCode vers Markdown GitHub',
  'toolDesc.bbcode-to-markdown':
    'Convertissez les balises BBCode de forum en mise en forme Markdown compatible GitHub.',
  'toolName.curl-to-php-guzzle': 'Convertisseur cURL vers client PHP Guzzle',
  'toolDesc.curl-to-php-guzzle':
    'Convertissez des commandes cURL avec en-têtes et corps en code client PHP Guzzle exécutable.',
  'toolName.curl-to-ruby-faraday': 'Convertisseur cURL vers client Ruby Faraday',
  'toolDesc.curl-to-ruby-faraday':
    'Convertissez des requêtes cURL en requêtes Ruby Faraday et Net::HTTP avec en-têtes.',
  'toolName.curl-to-rust-reqwest': 'cURL vers client asynchrone Rust reqwest',
  'toolDesc.curl-to-rust-reqwest':
    'Convertissez des commandes cURL en blocs de code client asynchrone Rust reqwest.',
  'toolName.curl-to-go-http': 'Convertisseur cURL vers client Go net/http',
  'toolDesc.curl-to-go-http':
    'Convertissez des commandes cURL en requêtes client de la bibliothèque standard Go net/http.',
  'toolName.svg-to-android-vector': 'SVG vers XML Android Vector Drawable',
  'toolDesc.svg-to-android-vector':
    'Convertissez des graphiques SVG au format XML Android Vector Drawable pour les applications Android natives.',
  'toolName.svg-to-swiftui-shape': 'Générateur SwiftUI Shape et Path à partir de SVG',
  'toolDesc.svg-to-swiftui-shape':
    'Convertissez les commandes de chemins SVG en structures SwiftUI Path et Shape natives pour iOS/macOS.',
  'toolName.css-grid-to-tailwind': 'CSS Grid vers classes Tailwind CSS',
  'toolDesc.css-grid-to-tailwind':
    'Convertissez les styles CSS grid-template-columns et gap en classes utilitaires de grille Tailwind CSS.',
  'toolName.dockerfile-ai-optimized-generator': 'Générateur de Dockerfiles à plusieurs étapes',
  'toolDesc.dockerfile-ai-optimized-generator':
    'Générez des Dockerfiles de production à plusieurs étapes pour Node, Python, Go et Rust avec paramètres de sécurité.',
  'toolName.kubernetes-deployment-generator': 'Générateur YAML Kubernetes Deployment',
  'toolDesc.kubernetes-deployment-generator':
    'Générez des manifestes YAML de production Kubernetes Deployment, Service et de limites de ressources.',
  'toolName.kubernetes-configmap-secret-builder':
    'Générateur de manifestes K8s ConfigMap et Secret',
  'toolDesc.kubernetes-configmap-secret-builder':
    'Générez facilement des manifestes YAML Kubernetes ConfigMap et Secret encodés en Base64.',
  'toolName.helm-chart-yaml-generator': 'Générateur de structures Helm Chart et Values',
  'toolDesc.helm-chart-yaml-generator':
    'Générez des modèles Helm Chart.yaml et values.yaml pour les applications Kubernetes natives du cloud.',
  'toolName.gitlab-ci-pipeline-builder': 'Générateur YAML de pipelines GitLab CI/CD',
  'toolDesc.gitlab-ci-pipeline-builder':
    'Générez des pipelines .gitlab-ci.yml à plusieurs étapes avec compilation, tests et cache.',
  'toolName.github-issue-pr-template-generator': "Générateur de modèles d'issues et de PR GitHub",
  'toolDesc.github-issue-pr-template-generator':
    "Générez des modèles d'issues GitHub en Markdown et des listes de vérification de pull requests.",
  'toolName.opa-rego-policy-builder': 'Générateur Rego Open Policy Agent (OPA)',
  'toolDesc.opa-rego-policy-builder':
    "Générez des politiques d'autorisation OPA Rego pour RBAC, ABAC et la sécurité API.",
  'toolName.systemd-service-hardened-builder': 'Générateur de services Linux systemd renforcés',
  'toolDesc.systemd-service-hardened-builder':
    'Générez des unités de service Linux systemd avec isolation de sécurité et NoNewPrivileges.',
  'toolName.nginx-security-conf-generator': 'Générateur de configurations Nginx renforcées',
  'toolDesc.nginx-security-conf-generator':
    'Générez des blocs de serveur Nginx renforcés avec SSL TLS 1.3, HSTS et limitation de débit.',
  'toolName.caddyfile-production-generator': 'Générateur de configurations Caddyfile de production',
  'toolDesc.caddyfile-production-generator':
    'Générez des configurations Caddyfile modernes avec HTTPS automatique, proxy inverse et compression.',
  'toolName.prometheus-recording-rules-generator':
    "Générateur de règles d'alerte et d'enregistrement Prometheus",
  'toolDesc.prometheus-recording-rules-generator':
    "Générez des règles YAML d'alerte et d'enregistrement Prometheus pour surveiller les SLO et la latence.",
  'toolName.tailwind-v4-mesh-gradient-generator':
    'Générateur de dégradés radiaux maillés Tailwind CSS',
  'toolDesc.tailwind-v4-mesh-gradient-generator':
    'Créez des dégradés radiaux maillés colorés pour les arrière-plans CSS et Tailwind CSS.',
  'toolName.css-isometric-grid-generator':
    'Générateur de grilles 3D et transformations isométriques CSS',
  'toolDesc.css-isometric-grid-generator':
    'Générez des grilles de transformations CSS isométriques en 2,5D et des matrices de coordonnées de tuiles.',
  'toolName.css-ribbon-banner-generator': "Générateur de rubans d'angle et de badges CSS",
  'toolDesc.css-ribbon-banner-generator':
    "Créez des rubans d'angle adaptatifs, badges de soldes et étiquettes promotionnelles en CSS pur.",
  'toolName.svg-wavy-divider-generator': 'Générateur de séparateurs de sections SVG ondulés',
  'toolDesc.svg-wavy-divider-generator':
    "Générez des séparateurs SVG en vagues fluides et des transitions de sections pour les pages d'accueil.",
  'toolName.opengraph-banner-canvas-generator': 'Générateur de balises OpenGraph et Twitter Card',
  'toolDesc.opengraph-banner-canvas-generator':
    "Générez des balises de cartes d'aperçu social OpenGraph et Twitter ainsi que du balisage de bannières dynamiques.",
  'toolName.prisma-seed-generator': "Générateur de scripts d'initialisation Prisma Client",
  'toolDesc.prisma-seed-generator':
    "Générez des scripts TypeScript d'initialisation Prisma (prisma/seed.ts) avec insertions par lots.",
  'toolName.faker-js-mock-schema-generator': 'Générateur de données synthétiques Faker.js',
  'toolDesc.faker-js-mock-schema-generator':
    'Générez des schémas de données fictives Faker.js pour les noms, courriels, avatars et dates.',
  'toolName.llm-few-shot-prompt-formatter': 'Générateur de consignes LLM structurées avec exemples',
  'toolDesc.llm-few-shot-prompt-formatter':
    'Créez des modèles de consignes précis avec quelques exemples sous forme de paires séparées par des délimiteurs.',
  'toolName.cot-chain-of-thought-prompt-builder':
    'Générateur de consignes de chaîne de pensée (CoT)',
  'toolDesc.cot-chain-of-thought-prompt-builder':
    'Générez des structures de raisonnement en chaîne de pensée pour les tâches de raisonnement IA complexes.',
  'toolName.sql-stored-procedure-generator':
    'Générateur de procédures stockées et de déclencheurs SQL',
  'toolDesc.sql-stored-procedure-generator':
    "Générez des modèles de procédures stockées, fonctions et déclencheurs d'audit PostgreSQL et MySQL.",
  'toolName.redis-lua-script-generator': 'Générateur de scripts Lua Redis atomiques',
  'toolDesc.redis-lua-script-generator':
    "Générez des scripts Lua Redis atomiques pour la limitation par seau de jetons, les verrous mutex et les files d'attente.",
  'toolName.crontab-randomized-generator': 'Générateur de décalages cron aléatoires',
  'toolDesc.crontab-randomized-generator':
    "Générez des commandes cron avec délais d'attente aléatoires pour éviter les exécutions simultanées massives.",
  'toolName.ansible-playbook-scaffolder': 'Générateur de structures de playbooks Ansible',
  'toolDesc.ansible-playbook-scaffolder':
    'Générez des playbooks YAML Ansible de production avec tâches, gestionnaires et gestionnaires de paquets.',
  'toolName.terraform-module-scaffolder': 'Générateur de structures de modules Terraform',
  'toolDesc.terraform-module-scaffolder':
    'Générez des architectures de modules Terraform structurées avec main.tf, variables.tf et outputs.tf.',
  'toolName.http-cache-control-tester': "Testeur d'en-têtes HTTP Cache-Control",
  'toolDesc.http-cache-control-tester':
    'Analysez les directives de cache HTTP Cache-Control, max-age, must-revalidate et immutable.',
  'toolName.dns-soa-dnssec-inspector': "Inspecteur de numéros SOA et d'enregistrements DNSSEC",
  'toolDesc.dns-soa-dnssec-inspector':
    'Inspectez les numéros de série DNS SOA, formats de dates, révisions de zones et enregistrements DNSSEC.',
  'toolName.ip-supernetting-calculator': 'Calculateur de super-réseaux IP et agrégateur CIDR',
  'toolDesc.ip-supernetting-calculator':
    'Calculez des super-réseaux agrégés et regroupez plusieurs préfixes réseau IP CIDR.',
  'toolName.opengraph-tag-inspector': 'Inspecteur de balises OpenGraph et de métadonnées sociales',
  'toolDesc.opengraph-tag-inspector':
    "Extrayez et inspectez les balises OpenGraph, Twitter Card et les métadonnées d'aperçu LinkedIn.",
  'toolName.jwt-expiry-calculator': "Calculateur d'expiration et de durée de vie JWT",
  'toolDesc.jwt-expiry-calculator':
    "Calculez les secondes restantes, l'horodatage d'expiration et la validité à partir du contenu JWT.",
  'toolName.regex-benchmark-simulator': 'Analyseur de risques ReDoS et de retour arrière regex',
  'toolDesc.regex-benchmark-simulator':
    'Détectez les risques de retour arrière exponentiel catastrophique et évaluez la complexité des expressions régulières.',
  'toolName.llm-context-window-shrinker': 'Optimiseur de fenêtre de contexte LLM',
  'toolDesc.llm-context-window-shrinker':
    'Réduisez la consommation de jetons en retirant les commentaires, chaînes de documentation et espaces superflus.',
  'toolName.embedding-token-cost-estimator': 'Estimateur de jetons et de coûts API de plongement',
  'toolDesc.embedding-token-cost-estimator':
    'Calculez les coûts de jetons des plongements vectoriels pour OpenAI text-embedding-3 et Voyage AI.',
  'toolName.webhook-payload-simulator': "Simulateur de données d'événements de webhooks",
  'toolDesc.webhook-payload-simulator':
    'Générez des événements JSON synthétiques de webhooks Stripe, GitHub, Slack et Shopify.',
  'toolName.network-port-reference': 'Répertoire de référence des ports TCP/UDP',
  'toolDesc.network-port-reference':
    'Recherchez les numéros de ports TCP et UDP standard, leurs services et les notes de sécurité.',
  'toolName.ssl-tls-handshake-simulator':
    'Simulateur de négociation cryptographique TLS 1.2 et TLS 1.3',
  'toolDesc.ssl-tls-handshake-simulator':
    'Simulez et comparez les négociations cryptographiques TLS 1.2 (2-RTT) et TLS 1.3 (1-RTT).',
  'toolName.http2-http3-frame-inspector': 'Inspecteur de trames HTTP/2 et HTTP/3 QUIC',
  'toolDesc.http2-http3-frame-inspector':
    'Inspectez les types de trames binaires, drapeaux et fonctions des données des flux HTTP/2 et HTTP/3 QUIC.',
  'toolName.dns-spf-record-flattener': 'Compteur de recherches DNS et aplatisseur SPF',
  'toolDesc.dns-spf-record-flattener':
    'Comptez les recherches DNS dans les enregistrements TXT SPF et vérifiez la conformité RFC (limite < 10 recherches).',
  'toolName.mime-type-extension-lookup': 'Recherche de Content-Type MIME par extension de fichier',
  'toolDesc.mime-type-extension-lookup':
    "Recherchez les types MIME IANA standard et les en-têtes selon l'extension de fichier.",
  'toolName.color-blindness-simulator': "Simulateur d'accessibilité au daltonisme",
  'toolDesc.color-blindness-simulator':
    "Simulez l'accessibilité des couleurs pour la protanopie, la deutéranopie et la tritanopie.",
  'toolName.contrast-ratio-apca-calculator': 'Calculateur de contraste de texte WCAG et APCA',
  'toolDesc.contrast-ratio-apca-calculator':
    "Calculez les rapports de contraste du texte et de l'arrière-plan selon les recommandations WCAG 2.1 AAA.",
  'toolName.viewport-size-tester': 'Inspecteur de fenêtres adaptatives et de points de rupture',
  'toolDesc.viewport-size-tester':
    "Inspectez les points de rupture Tailwind CSS (xs, sm, md, lg, xl, 2xl) et les tailles d'écran standard.",
  'toolName.unicode-glyph-category-inspector': 'Inspecteur de glyphes et de points de code Unicode',
  'toolDesc.unicode-glyph-category-inspector':
    'Inspectez les points de code, encodages hexadécimaux et blocs de catégories des caractères Unicode.',
  'toolName.seo-robots-noindex-simulator': "Simulateur d'indexation Robots.txt et X-Robots-Tag",
  'toolDesc.seo-robots-noindex-simulator':
    "Évaluez les règles d'indexation des moteurs de recherche, noindex, nofollow et les permissions d'exploration.",
  'toolName.cors-preflight-inspector': 'Inspecteur de requêtes préliminaires CORS OPTIONS',
  'toolDesc.cors-preflight-inspector':
    'Inspectez les en-têtes, origines et identifiants des requêtes préliminaires Cross-Origin Resource Sharing.',
  'toolName.css-selector-speed-profiler':
    'Analyseur de spécificité et de vitesse des sélecteurs CSS',
  'toolDesc.css-selector-speed-profiler':
    "Calculez les triplets de spécificité CSS [ID, classe, balise] et l'efficacité du rendu.",
  'toolName.git-conflict-marker-cleaner': 'Suppression des marqueurs de conflits Git',
  'toolDesc.git-conflict-marker-cleaner':
    'Supprimez et résolvez les marqueurs de conflits de fusion (HEAD, ===, >>>) dans le code source.',
  'toolName.semver-range-evaluator': 'Évaluateur de plages de versions sémantiques (SemVer)',
  'toolDesc.semver-range-evaluator':
    'Évaluez les plages npm semver (^, ~, >=) et déterminez la compatibilité des versions.',
  'toolName.package-json-license-checker': 'Vérificateur de licences libres package.json',
  'toolDesc.package-json-license-checker':
    'Analysez les dépendances package.json pour vérifier la compatibilité commerciale des licences libres.',
  'toolName.api-rate-limit-cost-calculator': 'Calculateur de limitation API par seau de jetons',
  'toolDesc.api-rate-limit-cost-calculator':
    'Calculez les capacités, débits de remplissage et limites de rafales des algorithmes Token Bucket et Leaky Bucket.',
  'toolName.blake3-hash-generator': "Générateur d'empreintes cryptographiques BLAKE3",
  'toolDesc.blake3-hash-generator':
    'Générez des empreintes BLAKE3 de 256 bits et des empreintes arborescentes très rapidement côté client.',
  'toolName.pbkdf2-key-derivation': 'Calculateur de dérivation de clés PBKDF2',
  'toolDesc.pbkdf2-key-derivation':
    "Dérivez des clés cryptographiques avec PBKDF2 et HMAC-SHA256, avec un nombre d'itérations configurable.",
  'toolName.hmac-sha384-sha512-calculator': 'Générateur de signatures HMAC-SHA384 et HMAC-SHA512',
  'toolDesc.hmac-sha384-sha512-calculator':
    "Calculez des codes d'authentification de messages par hachage à clé (HMAC) avec SHA-384 et SHA-512.",
  'toolName.ethereum-eip191-signature-verifier': 'Validateur Ethereum EIP-191 personal_sign',
  'toolDesc.ethereum-eip191-signature-verifier':
    'Formatez et validez les messages préfixés Ethereum EIP-191 personal_sign pour les portefeuilles Web3.',
  'toolName.bitcoin-bech32-address-encoder': "Validateur d'adresses Bitcoin Bech32 et SegWit",
  'toolDesc.bitcoin-bech32-address-encoder':
    'Validez et décodez les adresses Bitcoin SegWit natives (P2WPKH) et Taproot Bech32/Bech32m.',
  'toolName.rsa-pkcs1-pkcs8-converter': 'Inspecteur de formats de clés RSA PKCS#1 et PKCS#8',
  'toolDesc.rsa-pkcs1-pkcs8-converter':
    'Détectez et convertissez les clés RSA privées et publiques entre les formats PEM PKCS#1 et PKCS#8.',
  'toolName.x509-san-csr-builder': 'Générateur de CSR X.509 avec noms alternatifs (SAN)',
  'toolDesc.x509-san-csr-builder':
    'Générez des configurations OpenSSL de demande de signature de certificat avec plusieurs domaines SAN.',
  'toolName.ed25519-sign-verify': 'Inspecteur de signatures et de paires de clés Ed25519',
  'toolDesc.ed25519-sign-verify':
    'Nettoyez et inspectez les clés cryptographiques publiques et privées Ed25519 sur courbe elliptique de 256 bits.',
  'toolName.argon2-parameter-tuner': 'Réglage des paramètres de mémoire et de coût Argon2id',
  'toolDesc.argon2-parameter-tuner':
    "Calculez les paramètres Argon2id de mémoire, d'itérations et de parallélisme recommandés par la RFC 9106.",
  'toolName.uuid-v7-timestamp-extractor': "Extracteur d'horodatages et de dates UUIDv7",
  'toolDesc.uuid-v7-timestamp-extractor':
    'Extrayez les horodatages Unix en millisecondes, les dates UTC et les séquences de chaînes UUIDv7.',
  'toolName.ethereum-abi-storage-slot-calculator':
    "Calculateur d'emplacements de stockage de variables Solidity EVM",
  'toolDesc.ethereum-abi-storage-slot-calculator':
    "Calculez les emplacements de stockage EVM de 32 octets pour les variables d'état Solidity et contrats intelligents.",
  'toolName.base64-pem-certificate-parser':
    'Analyseur SAN et informations de certificats X.509 TLS/SSL',
  'toolDesc.base64-pem-certificate-parser':
    'Analysez les certificats X.509 PEM pour extraire noms alternatifs du sujet, émetteurs et validité.',
  'toolName.punycode-idn-converter': 'Convertisseur de domaines IDN Punycode',
  'toolDesc.punycode-idn-converter':
    'Convertissez les noms de domaine Unicode internationalisés en Punycode compatible ASCII (xn--).',
  'toolName.crockford-base32-encoder': 'Encodeur et décodeur Crockford Base32',
  'toolDesc.crockford-base32-encoder':
    'Encodez des nombres en chaînes Crockford Base32 lisibles qui excluent les lettres ambiguës.',
  'toolName.bcd-binary-coded-decimal-converter': 'Convertisseur décimal codé binaire (BCD 8421)',
  'toolDesc.bcd-binary-coded-decimal-converter':
    'Convertissez des nombres décimaux en groupes de 4 bits décimaux codés binaires (BCD 8421) et inversement.',
  'toolName.ieee754-hex-float-converter': 'Convertisseur de flottants IEEE-754 vers hexadécimal',
  'toolDesc.ieee754-hex-float-converter':
    'Convertissez des nombres flottants simple précision de 32 bits en représentations hexadécimales IEEE-754.',
  'toolName.rot47-encoder-decoder': 'Encodeur et décodeur de texte ROT47',
  'toolDesc.rot47-encoder-decoder':
    'Décalez les caractères ASCII imprimables (33-126) avec le chiffrement de César à décalage de 47 caractères.',
  'toolName.json-key-sorter': 'Trieur alphabétique de clés JSON',
  'toolDesc.json-key-sorter':
    'Triez récursivement les clés des objets JSON alphabétiquement pour des différences lisibles et déterministes.',
  'toolName.json-array-splitter-chunker': 'Découpeur de grands tableaux JSON par lots',
  'toolDesc.json-array-splitter-chunker':
    'Divisez des jeux de données et tableaux JSON volumineux en petits lots selon les limites API.',
  'toolName.text-prefix-suffix-appender': 'Ajout de préfixes et de suffixes aux lignes de texte',
  'toolDesc.text-prefix-suffix-appender':
    'Ajoutez des préfixes, suffixes, guillemets ou numéros personnalisés à chaque ligne de texte.',
  'toolName.text-duplicate-line-counter': 'Compteur de fréquence des lignes en double',
  'toolDesc.text-duplicate-line-counter':
    'Comptez les lignes en double dans des listes de texte et classez les éléments par fréquence.',
  'toolName.text-column-tabular-splitter': 'Découpeur de texte délimité en colonnes',
  'toolDesc.text-column-tabular-splitter':
    'Divisez du texte CSV/TSV délimité en colonnes structurées à largeur fixe et en lignes matricielles.',
  'toolName.html-entity': "Encodeur et décodeur d'entités HTML",
  'toolName.query-string-parser': 'Analyseur de chaînes de requête',
  'toolName.unicode-escape': "Encodeur et décodeur d'échappements Unicode",
  'toolName.md5-hash': "Générateur d'empreintes MD5",
  'toolName.sha256-hash': "Générateur d'empreintes SHA-256 et vérificateur de fichiers",
  'toolName.sha512-hash': "Générateur d'empreintes SHA512",
  'toolDesc.md5-hash':
    'Générez des empreintes MD5 à partir de texte pour des sommes de contrôle rapides.',
  'toolDesc.sha256-hash':
    "Hachez du texte UTF-8 ou un fichier local avec SHA-256, puis comparez l'empreinte du fichier à une somme de contrôle attendue fiable de 64 caractères.",
  'toolDesc.sha512-hash':
    "Générez des empreintes SHA512 à partir de texte pour vérifier l'intégrité.",
  'toolDesc.js-minifier':
    'Minifiez le JavaScript en supprimant les espaces, commentaires et éléments superflus.',
  'toolDesc.html-entity': 'Encodez les caractères spéciaux en entités HTML ou décodez ces entités.',
  'toolDesc.query-string-parser':
    'Analysez des chaînes de requête en JSON et créez des chaînes de requête à partir de JSON.',
  'toolDesc.user-agent-parser':
    "Analysez les chaînes User-Agent pour détecter le navigateur, le système et le type d'appareil.",
  'toolDesc.meta-tags':
    'Générez des balises de métadonnées pour le référencement, Open Graph et Twitter Card.',
  'toolDesc.jwt-decoder':
    'Décodez les JWT et signez ou vérifiez localement des jetons HS256, HS384 et HS512.',
  'toolDesc.url-parser':
    "Analysez une URL pour en extraire le protocole, l'hôte, le chemin, le fragment et les paramètres de requête.",
  'toolDesc.timestamp-converter':
    'Convertissez des horodatages Unix en dates lisibles et inversement.',
  'toolName.jwt-decoder': 'Décodeur, signataire et vérificateur JWT',
  'toolName.curl-to-fetch': 'Convertisseur cURL vers Fetch et générateur de requêtes',
  'toolDesc.curl-to-fetch':
    "Convertissez des commandes cURL prises en charge en code JavaScript fetch sans envoyer de requête, ou générez des extraits cURL et Fetch à partir des champs d'une requête.",
  'toolName.file-checksum-comparator':
    'Calculateur et comparateur de sommes de contrôle de fichiers',
  'toolDesc.file-checksum-comparator':
    "Calculez les sommes de contrôle MD5, CRC32, SHA-1, SHA-256, SHA-384 et SHA-512 de texte ou d'un fichier local, puis comparez-les à une empreinte attendue fiable.",
};
