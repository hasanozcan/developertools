import { frCompletion } from './completion/fr';
import { frUi } from './ui/fr';
import { enhancedToolTranslations } from './enhancedTools';

export const fr = {
  ...frUi,
  // Tool Names
  'toolName.json-formatter': 'Formateur JSON',
  'toolName.json-validator': 'Validateur JSON',
  'toolName.json-schema-validator': 'Validateur JSON Schema',
  'toolName.hmac-generator': 'Générateur et Vérificateur HMAC',
  'toolName.pkce-generator': 'Générateur et Vérificateur PKCE',
  'toolName.cidr-calculator': 'Calculateur CIDR IPv4',
  'toolName.json-csv': 'Convertisseur JSON vers CSV',
  'toolName.base64': 'Encodeur/Décodeur Base64',
  'toolName.url-encoder': 'Encodeur/Décodeur URL',
  'toolName.jwt-decoder': 'Décodeur JWT',
  'toolName.html-entity': 'Encodeur/Décodeur HTML Entity',
  'toolName.uuid-generator': 'Générateur UUID',
  'toolName.password-generator': 'Générateur de Mot de Passe',
  'toolName.lorem-ipsum': 'Générateur Lorem Ipsum',
  'toolName.qr-code': 'Générateur de Code QR',
  'toolName.slug-generator': 'Générateur de Slug',
  'toolName.md5-hash': 'Générateur de Hash MD5',
  'toolName.sha256-hash': 'Générateur de Hash SHA256',
  'toolName.regex-tester': 'Testeur de Regex',
  'toolName.text-diff': 'Outil de Comparaison de Texte',
  'toolName.markdown-preview': 'Aperçu Markdown',
  'toolName.timestamp-converter': "Convertisseur d'Horodatage",
  'toolName.color-converter': 'Convertisseur de Couleurs',
  'toolName.sql-formatter': 'Formateur SQL',
  'toolName.css-minifier': 'Minifieur CSS',
  'toolName.js-minifier': 'Minifieur JavaScript',
  'toolName.cron-parser': "Analyseur d'Expressions Cron",
  'toolName.json-to-typescript': 'JSON vers TypeScript',
  'toolName.yaml-json': 'Convertisseur YAML ↔ JSON',
  'toolName.image-to-base64': 'Image vers Base64',
  'toolName.css-gradient': 'Générateur de Dégradés CSS',
  'toolName.meta-tags': 'Générateur de Balises Meta',
  'toolName.case-converter': 'Convertisseur de Casse',
  'toolName.word-counter': 'Compteur de Mots',
  'toolName.remove-duplicates': 'Supprimer les Doublons',
  'toolName.sort-lines': 'Trier les Lignes',
  'toolName.hex-encoder': 'Encodeur/Décodeur HEX',
  'toolName.binary-encoder': 'Encodeur/Décodeur Binaire',
  'toolName.html-formatter': 'Formateur HTML',
  'toolName.html-minifier': 'Minificateur HTML',
  'toolName.xml-formatter': 'Formateur XML',
  'toolName.sha512-hash': 'Générateur de Hash SHA512',
  'toolName.roman-numeral-converter': 'Convertisseur de Chiffres Romains',
  'toolName.number-base-converter': 'Convertisseur de Base Numérique',
  'toolName.unicode-escape': 'Encodeur/Décodeur Unicode Escape',
  'toolName.json-string-escape': 'Échappement de chaîne JSON',
  'toolName.url-parser': "Analyseur d'URL",
  'toolName.query-string-parser': 'Analyseur de Query String',
  'toolName.regex-escape': 'Échappement Regex',
  'toolName.http-headers-parser': "Analyseur d'en-têtes HTTP",
  'toolName.http-status-codes': "Codes d'état HTTP",
  'toolName.user-agent-parser': 'Analyseur User-Agent',
  'toolName.json-pointer': 'Évaluateur JSON Pointer',
  'toolName.chmod-calculator': 'Calculateur chmod',
  'toolName.cache-control': 'Analyseur et générateur Cache-Control',
  'toolName.jsonpath-tester': 'Testeur JSONPath',
  'toolName.csp-builder': 'Générateur et analyseur d’en-tête CSP',
  'toolName.curl-to-fetch': 'Générateur cURL et convertisseur Fetch',
  // Tool Descriptions
  'toolDesc.json-formatter': 'Formatez, validez et nettoyez du JSON avec surlignage syntaxique.',
  'toolDesc.json-validator':
    'Repérez les erreurs de syntaxe JSON et leur position précise instantanément.',
  'toolDesc.json-schema-validator':
    "Validez des documents JSON avec des règles JSON Schema et des chemins d'erreur détaillés.",
  'toolDesc.hmac-generator':
    'Générez et vérifiez des signatures HMAC-SHA en hexadécimal ou Base64.',
  'toolDesc.pkce-generator': 'Générez et vérifiez des paires vérificateur-défi OAuth PKCE S256.',
  'toolDesc.cidr-calculator':
    'Calculez les réseaux IPv4, masques, adresses de diffusion et plages d’hôtes utilisables.',
  'toolDesc.json-pointer':
    'Résolvez les pointeurs RFC 6901 dans des documents JSON avec des erreurs de chemin précises.',
  'toolDesc.chmod-calculator':
    'Convertissez les permissions Unix entre les formats octal, symbolique et cases à cocher.',
  'toolDesc.cache-control': 'Analysez, normalisez et vérifiez les directives HTTP Cache-Control.',
  'toolDesc.jsonpath-tester':
    'Interrogez du JSON avec des chemins, jokers, tranches et descentes récursives sans exécuter de scripts.',
  'toolDesc.csp-builder':
    'Créez, normalisez et inspectez les en-têtes Content Security Policy pour détecter les failles courantes.',
  'toolDesc.curl-to-fetch':
    'Créez des requêtes cURL ou convertissez une entrée cURL compatible en JavaScript Fetch sans exécuter de commande.',
  'toolDesc.json-csv': 'Convertissez des tableaux JSON en CSV et des fichiers CSV en JSON.',
  'toolDesc.base64': 'Encodez du texte en Base64 ou décodez des chaînes Base64 en texte.',
  'toolDesc.url-encoder':
    'Encodez ou décodez en toute sécurité des chaînes URL et des paramètres de requête.',
  'toolDesc.jwt-decoder':
    'Décodez des tokens JWT et inspectez en local les en-têtes et le payload.',
  'toolDesc.html-entity': 'Encodez les caractères spéciaux en entités HTML ou décodifiez-les.',
  'toolDesc.uuid-generator':
    'Générez des identifiants UUID v4 ou v7 horodatés, formatez les lots et exportez-les localement.',
  'toolDesc.password-generator':
    'Créez des mots de passe forts et aléatoires avec des options personnalisables.',
  'toolDesc.lorem-ipsum': 'Générez du texte Lorem Ipsum par mots, phrases ou paragraphes.',
  'toolDesc.qr-code': "Créez des QR codes à partir de texte ou d'URL pour partager rapidement.",
  'toolDesc.slug-generator':
    'Transformez des titres en slugs propres et SEO avec translittération.',
  'toolDesc.md5-hash': 'Générez des hashes MD5 à partir de texte pour des checksums rapides.',
  'toolDesc.sha256-hash': "Générez des hashes SHA256 à partir de texte pour vérifier l'intégrité.",
  'toolDesc.regex-tester':
    'Testez des expressions régulières avec correspondance en direct et surlignage.',
  'toolDesc.text-diff': 'Comparez deux textes côte à côte et mettez les différences en évidence.',
  'toolDesc.markdown-preview': "Écrivez du Markdown et prévisualisez l'HTML rendu instantanément.",
  'toolDesc.timestamp-converter':
    'Convertissez des timestamps Unix en dates lisibles et inversement.',
  'toolDesc.color-converter': 'Convertissez des couleurs entre HEX, RGB et HSL.',
  'toolDesc.sql-formatter': 'Formatez des requêtes SQL avec la bonne indentation et casse.',
  'toolDesc.css-minifier': 'Minifiez le CSS en supprimant espaces, commentaires et surplus.',
  'toolDesc.js-minifier': 'Minifiez le JavaScript en supprimant espaces, commentaires et bloat.',
  'toolDesc.cron-parser': 'Analysez des expressions cron et expliquez leurs horaires.',
  'toolDesc.json-to-typescript':
    "Générez des interfaces ou types TypeScript à partir d'exemples JSON.",
  'toolDesc.yaml-json': 'Convertissez YAML en JSON et JSON en YAML.',
  'toolDesc.image-to-base64': 'Convertissez des images en URI de données Base64 pour les intégrer.',
  'toolDesc.css-gradient': 'Concevez des dégradés CSS et copiez le code généré.',
  'toolDesc.meta-tags': 'Générez des meta tags SEO, Open Graph et Twitter Card.',
  'toolDesc.case-converter':
    'Convertir le texte entre majuscules, minuscules, titre, camelCase et plus.',
  'toolDesc.word-counter':
    'Compter les mots, caractères, phrases, paragraphes et estimer le temps de lecture.',
  'toolDesc.remove-duplicates': 'Supprimer les lignes en double et vides de vos listes de texte.',
  'toolDesc.sort-lines':
    'Trier les lignes de texte par ordre alphabétique, numérique ou aléatoire.',
  'toolDesc.hex-encoder': 'Encoder du texte en hexadécimal ou décoder HEX en texte.',
  'toolDesc.binary-encoder': 'Encoder du texte en binaire ou décoder le binaire en texte.',
  'toolDesc.html-formatter': 'Formater et embellir le code HTML avec une indentation appropriée.',
  'toolDesc.html-minifier': 'Minifier le HTML en supprimant espaces, commentaires et extras.',
  'toolDesc.xml-formatter': 'Formater et embellir le code XML avec une indentation appropriée.',
  'toolDesc.sha512-hash': "Générer des hashes SHA512 depuis du texte pour vérifier l'intégrité.",
  'toolDesc.roman-numeral-converter': 'Convertir les nombres en chiffres romains et vice versa.',
  'toolDesc.number-base-converter': 'Convertir les nombres entre décimal, binaire, hex et octal.',
  'toolDesc.unicode-escape':
    'Encodez du texte en séquences Unicode échappées ou décodez du texte échappé.',
  'toolDesc.json-string-escape': 'Échappez et déséchappez le contenu des chaînes JSON.',
  'toolDesc.url-parser':
    'Analysez une URL en protocole, hôte, chemin, hash et paramètres de requête.',
  'toolDesc.query-string-parser':
    'Analysez des query strings en JSON et construisez des query strings depuis du JSON.',
  'toolDesc.regex-escape': 'Échappez ou déséchappez du texte pour une utilisation regex sûre.',
  'toolDesc.http-headers-parser':
    'Analysez des en-têtes HTTP bruts en JSON et reconstruisez des en-têtes depuis du JSON.',
  'toolDesc.http-status-codes':
    "Recherchez et consultez les codes d'état de réponse HTTP courants.",
  'toolDesc.user-agent-parser':
    "Analysez les chaînes user-agent pour détecter navigateur, OS et type d'appareil.",
  // Outils .env, Zod et Bcrypt
  'toolName.env-to-json': 'Convertisseur .env vers JSON',
  'toolDesc.env-to-json':
    'Convertissez les variables dotenv en JSON et inversement sans téléverser les valeurs de configuration.',
  'toolName.json-to-zod': 'JSON vers schéma Zod',
  'toolDesc.json-to-zod':
    'Générez des schémas Zod et des types TypeScript inférés à partir d’un JSON représentatif.',
  'toolName.bcrypt-generator': 'Générateur et vérificateur Bcrypt',
  'toolDesc.bcrypt-generator':
    'Générez des hachages bcrypt salés et vérifiez localement des mots de passe de test.',
  ...enhancedToolTranslations.fr,
  ...frCompletion,
};
