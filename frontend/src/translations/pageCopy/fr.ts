// French server-only tool page copy.
export const frPageCopy: Record<string, string> = {
  'pageText.494b4551': 'Mes données restent-elles privées ?',
  'pageText.62172ab3': "Oui, l'exécution se fait entièrement côté client, dans votre navigateur.",
  'pageText.f60263be': "Qu'est-ce que JSON ?",
  'pageText.b285e12f':
    "JSON (JavaScript Object Notation) est un format léger d'échange de données, facile à lire et à écrire pour les humains, ainsi qu'à analyser et à générer pour les machines.",
  'pageText.5fb110d7': 'Comment mettre en forme du JSON ?',
  'pageText.3241bbe1':
    "Collez du JSON valide dans le champ de saisie, choisissez les options d'indentation et de tri des clés souhaitées, puis sélectionnez Mettre en forme le JSON.",
  'pageText.fd4a654d': 'Mes données sont-elles en sécurité ?',
  'pageText.542fb6d3':
    "Oui ! Tout le traitement s'effectue dans votre navigateur. Vos données ne quittent jamais votre ordinateur.",
  'pageText.d16ff7e1': "Ce que fait l'outil de mise en forme JSON",
  'pageText.647c3353':
    "Un outil de mise en forme JSON analyse le texte JSON et sérialise la valeur obtenue avec des espaces cohérents. Cet outil peut produire une présentation lisible avec l'indentation choisie, minifier le résultat et, facultativement, trier récursivement les clés des objets. La RFC 8259 impose des guillemets doubles pour les noms de propriétés et les chaînes ; les commentaires, les virgules finales, NaN et Infinity ne font pas partie de la grammaire JSON. La mise en forme modifie la présentation, pas le sens voulu des données.",
  'pageText.c80fe1c6': 'Usages courants et limites de la validation',
  'pageText.b49ba2b3':
    'Utilisez cet outil pour examiner ou normaliser du JSON pendant le développement :',
  'pageText.92e09088':
    "Rendez plus lisibles une réponse d'API compacte, le corps d'un webhook, une configuration ou une entrée de journal.",
  'pageText.a1f30e1f':
    "Minifiez du JSON valide avant de le copier dans une requête, des données de test ou une variable d'environnement.",
  'pageText.57fc338e':
    'Triez les clés pour faciliter une comparaison manuelle prévisible entre deux objets.',
  'pageText.a199e1c3':
    "Faites apparaître les erreurs d'analyse dues à des virgules manquantes, des crochets mal appariés ou des guillemets incorrects.",
  'pageText.bcfd24c3':
    "Considérez une analyse réussie comme une simple vérification de syntaxe. Elle n'applique ni JSON Schema, ni les contrats d'API, les champs obligatoires, les types du domaine ou les règles métier.",
  'pageText.0b90c1ae': 'Exemple de mise en forme',
  'pageText.52d27152':
    'L\'entrée {"active":true,"user":{"id":42,"roles":["admin","editor"]}} devient un objet indenté dont la valeur user imbriquée et le tableau roles sont visibles d\'un coup d\'œil. La minification restitue la forme compacte. Si l\'entrée contient une virgule finale, l\'analyseur du navigateur la rejette au lieu de corriger silencieusement le document.',
  'pageText.97fb560b': 'Limites et confidentialité',
  'pageText.57498e3b':
    "L'analyse utilise les nombres JavaScript : les entiers dépassant la plage représentable de manière fiable peuvent donc perdre en précision.",
  'pageText.ff4c61d4':
    "Les noms de propriétés en double peuvent être fusionnés pendant l'analyse ; évitez les opérations d'analyse puis de sérialisation lorsque leur conservation est importante.",
  'pageText.c4310853':
    "Le résultat trié est pratique, mais ce n'est pas un format de canonicalisation JSON cryptographique et il ne doit pas servir à préparer des données à signer.",
  'pageText.e01043b7':
    "Le traitement s'effectue dans le navigateur. Du JSON sensible peut toutefois être exposé par l'historique du presse-papiers, les extensions du navigateur, le partage d'écran ou un appareil partagé.",
  'pageText.7491abdf': 'Que vérifie cet outil ?',
  'pageText.000db4ab':
    'Il vérifie la syntaxe JSON définie par la RFC 8259 : clés et chaînes entre guillemets doubles, virgules entre les éléments, crochets et accolades appariés, nombres et échappements valides, et une seule valeur à la racine.',
  'pageText.d5749034': 'Quelles sont les erreurs JSON courantes ?',
  'pageText.5c93c394':
    'Virgules manquantes ou finales, guillemets simples au lieu de doubles, noms de propriétés sans guillemets, commentaires, sauts de ligne non échappés dans les chaînes et crochets fermants manquants.',
  'pageText.e46fbe66':
    'Pourquoi du JSON contenant des commentaires ou des virgules finales est-il rejeté ?',
  'pageText.716a4b48':
    "Le JSON standard n'autorise ni les uns ni les autres. Des éditeurs comme VS Code les acceptent dans les fichiers de paramètres JSONC, tout comme JSON5, mais JSON.parse et la plupart des API les rejettent. Supprimez-les avant de transmettre les données à un analyseur strict.",
  'pageText.14469b94': "Pourquoi l'erreur indique-t-elle le mauvais endroit ?",
  'pageText.7c657bf0':
    "Les analyseurs indiquent l'endroit où ils ont abandonné, souvent juste après la véritable erreur. Une virgule manquante est signalée à la clé suivante, et une chaîne ou un crochet non fermé peut n'être détecté qu'à la fin de l'entrée.",
  'pageText.40ba76d4': 'Un JSON valide respecte-t-il forcément le contrat de mon API ?',
  'pageText.10c910fb':
    'Non. La validation de syntaxe prouve seulement que le texte peut être analysé. Pour vérifier les champs obligatoires, les types et les valeurs autorisées, validez le document par rapport à un schéma avec le validateur JSON Schema.',
  'pageText.eb70ad1f':
    "Oui. La validation s'effectue dans votre navigateur avec JSON.parse, et le JSON que vous collez n'est pas envoyé.",
  'pageText.c7264f74': 'Ce qui rend du JSON valide',
  'pageText.bc86098b':
    'JSON est plus strict que la syntaxe des objets JavaScript. Un document est une valeur unique : objet, tableau, chaîne, nombre, true, false ou null. Les clés et les chaînes doivent utiliser des guillemets doubles, et seuls quelques échappements avec une barre oblique inverse, comme \\n, \\t, \\" et \\uXXXX, sont autorisés dans les chaînes. Les nombres ne peuvent avoir ni zéro initial, ni + initial, ni point décimal final, et NaN et Infinity ne sont pas valides. Les commentaires et les virgules finales ne font pas partie du standard : les fichiers JSONC et JSON5 sont donc rejetés ici, même si votre éditeur les accepte.',
  'pageText.41041c7a': 'Erreurs JSON courantes et corrections',
  'pageText.5e91d5ea':
    'Virgule finale : {"a": 1,} — supprimez la virgule après le dernier élément.',
  'pageText.c20c98a8':
    "Guillemets simples : {'a': 'b'} — remplacez-les par des guillemets doubles.",
  'pageText.dcfdd19f':
    'Clés sans guillemets : {a: 1} — entourez chaque clé de guillemets : {"a": 1}.',
  'pageText.544083f8':
    'Virgule manquante : {"a": 1 "b": 2} — l\'erreur indique généralement "b", le début de l\'élément suivant.',
  'pageText.9cec3362':
    'Sauts de ligne ou tabulations littéraux dans une chaîne — écrivez-les sous la forme \\n ou \\t.',
  'pageText.7165deea':
    'Littéraux de langage : True, None, undefined et NaN ne sont pas des valeurs JSON ; utilisez true, null ou une chaîne.',
  'pageText.02f2728d': "Lire la position de l'erreur",
  'pageText.e4c68e30':
    "Le texte de l'erreur provient de l'analyseur JSON de votre navigateur : sa formulation diffère donc entre Chrome, Firefox et Safari. Lorsque le message indique une position de caractère, le validateur la convertit en ligne et colonne. Examinez cet endroit et ce qui le précède : un analyseur échoue au premier caractère qui ne peut pas poursuivre un document valide, souvent un élément après la véritable erreur.",
  'pageText.21519e4a': "Statistiques et limites de l'analyseur",
  'pageText.7a975d41':
    "Pour du JSON valide, l'outil compte les objets, tableaux, chaînes, nombres, booléens, valeurs null et le nombre total de clés, puis indique la profondeur d'imbrication maximale. Ces chiffres aident à repérer des contenus anormalement imbriqués ou des changements de type, comme des nombres reçus sous forme de chaînes. JSON.parse a deux comportements à connaître : il accepte les clés en double et conserve la dernière valeur, et il lit les nombres comme des flottants de 64 bits ; les entiers supérieurs à 2^53 - 1 perdent donc en précision dans la valeur analysée et dans la copie mise en forme.",
  'pageText.035fa382': 'Quelle différence avec le validateur JSON ?',
  'pageText.bab0a1c3':
    'Le validateur JSON vérifie que le texte respecte la syntaxe JSON. Le validateur JSON Schema vérifie également la valeur analysée par rapport à des règles telles que les propriétés obligatoires, les types, les plages et les structures imbriquées.',
  'pageText.c715893e': 'Quelle version de JSON Schema cet outil prend-il en charge ?',
  'pageText.b987a2d9':
    "L'outil utilise Ajv v8 avec son validateur par défaut compatible avec Draft 7. Les mots-clés d'extension inconnus sont ignorés avec un avertissement visible ; les schémas nécessitant un autre métaschéma peuvent demander une configuration propre à cette version.",
  'pageText.7d800344': 'Mon JSON est-il envoyé ?',
  'pageText.0f050d2b':
    "Non. L'analyse, la compilation du schéma et la validation s'effectuent dans votre navigateur. Évitez les données sensibles sur un appareil partagé : l'historique du presse-papiers et les extensions du navigateur peuvent encore les exposer.",
  'pageText.842ff766': 'Ce que vérifie la validation JSON Schema',
  'pageText.0cf82fa3':
    "La validation de syntaxe JSON prouve seulement que le texte peut être analysé. La validation JSON Schema applique un contrat à la valeur analysée. Elle peut imposer des propriétés, contraindre les types et les plages de valeurs, rejeter les champs inattendus et valider des tableaux ou objets imbriqués. Le résultat indique le chemin dans l'instance, le chemin dans le schéma, le mot-clé et le message de chaque règle non respectée.",
  'pageText.54bfa1e8': 'Comment utiliser le validateur',
  'pageText.813839e9': "Collez la valeur JSON à tester dans l'éditeur du document.",
  'pageText.110b07c6': "Collez un JSON Schema compatible avec Draft 7 dans l'éditeur du schéma.",
  'pageText.f0234285':
    'Sélectionnez Valider pour compiler le schéma et afficher toutes les erreurs correspondantes.',
  'pageText.060913a1':
    "Utilisez les chemins de l'instance pour trouver les valeurs incorrectes du document et les chemins du schéma pour trouver la règle qui les a rejetées.",
  'pageText.2b1361d8': 'Limites et confidentialité',
  'pageText.74eb328b':
    "Un résultat valide signifie que le document actuel respecte toutes les règles reconnues du schéma fourni ; il ne prouve pas que ce schéma exprime toutes les règles métier. Les mots-clés d'extension inconnus sont ignorés avec un avertissement visible. Les schémas externes ne sont pas récupérés automatiquement, et ceux qui ciblent des versions non prises en charge ou des références distantes peuvent nécessiter une configuration propre à l'application. Le document et le schéma sont tous deux analysés avec les nombres JavaScript : les entiers hors de la plage des entiers sûrs peuvent perdre en précision.",
  'pageText.e7bc2558': 'Quels formats sont pris en charge ?',
  'pageText.ffabae3c':
    "Des tableaux JSON d'objets d'un côté, et du texte délimité de l'autre : CSV séparé par des virgules ou des points-virgules, TSV séparé par des tabulations, ou valeurs séparées par des barres verticales.",
  'pageText.5e2ca3f9': 'Comment les objets imbriqués sont-ils traités ?',
  'pageText.929320e9':
    "Avec le traitement des éléments imbriqués réglé sur Aplatir, les objets imbriqués deviennent des colonnes en notation pointée, comme address.city, et les tableaux sont écrits sous forme de texte JSON. L'option Chaîne JSON écrit chaque objet ou tableau imbriqué sous forme de texte JSON dans une seule colonne de premier niveau.",
  'pageText.e74ea8dd': 'Puis-je convertir un seul objet JSON en CSV ?',
  'pageText.2de8fa13':
    'Entourez-le d\'abord de crochets, par exemple [{"id": 1}]. Le convertisseur attend un tableau non vide, où chaque objet devient une ligne.',
  'pageText.16c231f7':
    'Pourquoi toutes les valeurs deviennent-elles des chaînes après la conversion du CSV en JSON ?',
  'pageText.82993149':
    'CSV n\'a pas de types de données : chaque cellule est donc renvoyée sous forme de chaîne ("30", et non 30) pour éviter des suppositions erronées sur des codes postaux ou des identifiants avec des zéros initiaux. Convertissez les champs nécessaires dans votre propre code.',
  'pageText.df332cb3': 'Pourquoi Excel affiche-t-il mal les caractères accentués ?',
  'pageText.af4d1154':
    "Le fichier téléchargé est en UTF-8 sans marque d'ordre des octets, et certaines versions d'Excel supposent un ancien encodage lorsque vous ouvrez un CSV par double-clic. Importez-le via Données > À partir d'un fichier texte/CSV et choisissez UTF-8.",
  'pageText.44ee1d3e': 'Mes données sont-elles envoyées ?',
  'pageText.3c70ccff':
    "Non. L'analyse et la conversion s'effectuent dans votre navigateur, et le téléchargement est généré localement.",
  'pageText.c0a1927b': 'Quelle structure JSON peut être convertie en CSV',
  'pageText.110e0569':
    'CSV est un tableau plat : l\'entrée doit donc être un tableau JSON d\'objets, par exemple [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]. Chaque objet devient une ligne. L\'en-tête regroupe toutes les clés dans l\'ordre de leur première apparition ; un objet sans une certaine clé obtient donc une cellule vide, sans décaler les autres colonnes, et les valeurs null sont également écrites comme des cellules vides. Une entrée qui n\'est pas un tableau non vide est rejetée ; un tableau de valeurs simples comme [1, 2, 3] ne contient aucune clé à transformer en colonne.',
  'pageText.16c22164': 'Traitement des objets et tableaux imbriqués',
  'pageText.2c00e178':
    'Aplatir (par défaut) : {"address": {"city": "Paris"}} devient une colonne address.city. Les tableaux sont écrits sous forme de texte JSON dans une cellule, par exemple ["a","b"].',
  'pageText.98e451ad':
    'Chaîne JSON : conserve uniquement les colonnes de premier niveau et écrit chaque objet ou tableau imbriqué sous forme de texte JSON dans sa cellule.',
  'pageText.e646f74d':
    'Développer : conserve également les colonnes de premier niveau, mais ne sérialise pas les objets imbriqués ; ils apparaissent donc comme [object Object]. Utilisez Aplatir ou Chaîne JSON si vos données sont imbriquées.',
  'pageText.869ce735':
    'Guillemets : les champs contenant le séparateur, un guillemet double ou un saut de ligne sont entourés de guillemets doubles, et les guillemets internes sont doublés (""), conformément à la RFC 4180.',
  'pageText.73ca705a': 'Reconvertir du CSV en JSON',
  'pageText.cbff28ff':
    "L'analyseur CSV traite les champs entre guillemets, les guillemets doublés et les sauts de ligne dans les valeurs entre guillemets ; il accepte les fins de ligne LF et CRLF. Lorsque l'option Première ligne comme en-tête est activée, les cellules de l'en-tête deviennent des noms de propriétés ; sinon, les clés sont column1, column2, etc. Les lignes vides sont ignorées, les cellules manquantes deviennent des chaînes vides et les cellules au-delà de la largeur de l'en-tête sont supprimées. Les en-têtes pointés comme address.city ne sont pas reconstruits en objets imbriqués, et toutes les valeurs restent des chaînes : retraitez le résultat si vous avez besoin de nombres, de booléens ou d'imbrication.",
  'pageText.e37dc901': 'Choisir un séparateur',
  'pageText.1b5836ff':
    'Utilisez la virgule pour la plupart des outils et API. Utilisez le point-virgule si le fichier sera ouvert dans un tableur dont les paramètres régionaux utilisent la virgule comme séparateur décimal, la tabulation pour un TSV facile à coller dans un tableur, ou la barre verticale lorsque les valeurs contiennent souvent des virgules. Utilisez le même séparateur pour la conversion inverse.',
  'pageText.3f419e1e': 'Quelle différence entre interface et type ?',
  'pageText.2896a196':
    "Les deux décrivent la structure d'un objet. Les interfaces peuvent être étendues avec extends et fusionnées entre déclarations ; les alias de type peuvent aussi exprimer des unions, des intersections et des types mappés. Pour des modèles d'API simples, les deux conviennent : suivez les conventions de votre code.",
  'pageText.a76e5f0e': 'Comment les tableaux sont-ils traités ?',
  'pageText.9e602604':
    "Les tableaux contenant un seul type deviennent string[], number[], etc. Les tableaux mixtes deviennent des unions comme (string | null)[]. Pour les tableaux d'objets, les clés de tous les éléments sont fusionnées dans un seul type d'élément ; un tableau vide devient unknown[].",
  'pageText.15efe178': 'Pourquoi une propriété est-elle typée null ou unknown[] ?',
  'pageText.e7edbada':
    "L'exemple ne contient pas assez d'informations. Une valeur null ne peut être typée que null, et un tableau vide n'a aucun élément à examiner. Remplacez ces types par les types réels, par exemple string | null ou Order[].",
  'pageText.3f42cbef': "Les types générés valident-ils les données à l'exécution ?",
  'pageText.63a3aa5d':
    "Non. Les types TypeScript sont effacés lors de la compilation ; ils ne peuvent donc pas rejeter une réponse d'API incorrecte. Pour les entrées non fiables, associez-les à un validateur à l'exécution comme Zod ou à une validation JSON Schema.",
  'pageText.dfbfc464': "Comment utiliser l'interface générée ?",
  'pageText.ecad980d':
    'Enregistrez-la dans un fichier .ts, importez-la et annotez les données analysées, par exemple const user = (await response.json()) as Root; Cette assertion de type décrit la structure attendue, mais ne la vérifie pas.',
  'pageText.f2cb618b':
    'Non. Le JSON est analysé et converti dans votre navigateur, et les types générés ne sont envoyés nulle part.',
  'pageText.24604c50': "Comment les types sont déduits d'un exemple JSON",
  'pageText.775e7460':
    'Le convertisseur analyse votre JSON et associe chaque valeur à un type TypeScript : les chaînes à string, les nombres à number (JSON n\'a pas de type entier distinct), true et false à boolean, et null à null. Les objets deviennent des interfaces ou des alias de type, et les tableaux prennent le type de leurs éléments suivi de []. Par exemple, {"id": 1, "tags": ["a", "b"], "owner": null} produit id: number; tags: string[]; owner: null;. Les clés qui ne sont pas des identifiants valides, comme "first-name", sont entourées de guillemets dans le résultat.',
  'pageText.2a4f9a5c': 'Options et effets',
  'pageText.d80a13bc':
    'Nom du type racine définit le nom du type de premier niveau, converti en PascalCase.',
  'pageText.58ca8924':
    'Utiliser une interface permet de choisir entre les déclarations interface et les alias de type.',
  'pageText.b2718dc0': 'Rendre les propriétés facultatives ajoute ? à chaque propriété.',
  'pageText.7bc73d90': 'Ajouter le mot-clé export préfixe chaque déclaration avec export.',
  'pageText.f1ea6f0b':
    "Extraire les éléments imbriqués crée une interface nommée pour chaque objet imbriqué et pour les objets des tableaux (orders devient OrdersItem[]), au lieu de types d'objets en ligne.",
  'pageText.e8492b19':
    "Détecter les unions écrit les tableaux mixtes sous forme d'unions comme (string | null)[].",
  'pageText.f3ef2d66':
    "Commentaires JSDoc ajoute un commentaire au-dessus de chaque propriété ; lorsque l'extraction des éléments imbriqués est activée, ces commentaires incluent des exemples de valeurs.",
  'pageText.91b2ba93': "Limites de la déduction de types à partir d'un seul exemple",
  'pageText.962bd555':
    "Un document JSON unique montre une réponse particulière, pas toutes les structures qu'une API peut renvoyer. Vérifiez ces cas avant de vous fier au résultat :",
  'pageText.c04be53a':
    "Les valeurs null de l'exemple sont typées uniquement null. Lorsque l'extraction des éléments imbriqués est activée, elles sont aussi marquées comme facultatives.",
  'pageText.65099d30':
    "Pour les tableaux d'objets, la première valeur rencontrée pour chaque clé détermine son type ; les clés présentes dans certains éléments seulement ne sont pas marquées comme facultatives, sauf si vous activez Rendre les propriétés facultatives.",
  'pageText.1eb094ba':
    "Lorsque l'extraction des éléments imbriqués est activée, les chaînes de date ISO comme 2024-01-15 ou 2024-01-15T00:00:00Z sont typées Date. JSON.parse renvoie des chaînes : remplacez ces types par string, sauf si votre code effectue la conversion.",
  'pageText.1effcea1':
    "Les chaînes numériques restent string et les grands entiers restent number ; le générateur ne déduit ni bigint ni des types d'identifiants distinctifs.",
  'pageText.9f62e4a3':
    "Les propriétés conservent l'ordre de l'exemple, et un objet sans clés devient {} avec les interfaces ou Record<string, unknown> avec les alias de type.",
  'pageText.0a050da5': "Qu'est-ce que YAML ?",
  'pageText.521b34a0':
    "YAML (YAML Ain't Markup Language) est un format de sérialisation de données lisible par l'humain qui utilise l'indentation plutôt que des accolades. Il est courant dans les fichiers de configuration de Kubernetes, Docker Compose, GitHub Actions et Ansible.",
  'pageText.758c1349': 'Quand utiliser YAML plutôt que JSON ?',
  'pageText.ed21d83b':
    "YAML est plus facile à lire et à modifier à la main et accepte les commentaires, ce qui convient aux fichiers de configuration. JSON est plus simple à analyser, n'a pas de règles d'indentation et est pris en charge partout, ce qui convient aux API et aux échanges de données.",
  'pageText.e2958c4e': 'Quel mode de compatibilité YAML est utilisé ?',
  'pageText.962cba8d':
    "La conversion utilise le schéma de compatibilité YAML 1.1 de js-yaml : les ancres, alias, clés de fusion, balises explicites et scalaires typés fonctionnent donc comme dans l'exemple. YAML 1.1 peut interpréter certains scalaires simples différemment de YAML 1.2.",
  'pageText.d8137672': 'Pourquoi yes, no ou NO sont-ils devenus true ou false ?',
  'pageText.a21ecd10':
    'En YAML 1.1, yes, no, on et off sans guillemets sont des booléens. Mettez la valeur entre guillemets, par exemple country: "NO", lorsqu\'elle doit rester une chaîne.',
  'pageText.5403e57d': 'Puis-je convertir un fichier YAML contenant plusieurs documents ?',
  'pageText.69ba905b':
    "Pas en une seule fois. Ce convertisseur lit un document unique et signale une erreur s'il trouve des séparateurs --- suivis de contenu supplémentaire. Découpez le fichier et convertissez chaque document séparément.",
  'pageText.1368c99b': 'Les commentaires YAML sont-ils conservés ?',
  'pageText.311c9ca4':
    "Non. JSON n'a pas de syntaxe de commentaire : les commentaires sont donc supprimés lors de la conversion en JSON et ne peuvent pas être restaurés lors de la reconversion en YAML.",
  'pageText.c261a8ae': 'Correspondances entre YAML et JSON',
  'pageText.4bc6e145':
    "Les associations YAML deviennent des objets JSON, les séquences des tableaux et les scalaires des chaînes, nombres, booléens ou null. Les commentaires sont supprimés ; les ancres (&name), alias (*name) et clés de fusion (<<: *defaults) sont développés en copies complètes, ce qui peut rendre le JSON plus long que le YAML. La conversion de JSON en YAML produit du YAML simple de style bloc : les clés gardent leur ordre initial, les longues chaînes ne sont pas réparties sur plusieurs lignes et les objets répétés sont écrits intégralement plutôt que sous forme d'ancres.",
  'pageText.8680939e': 'Valeurs YAML 1.1 qui ne sont pas des chaînes',
  'pageText.28441e9f':
    'Le schéma YAML 1.1 correspond à de nombreux analyseurs de configuration existants, mais attribue à certaines valeurs sans guillemets des types surprenants :',
  'pageText.b9e6b5c4':
    "yes, no, on et off deviennent true ou false. C'est le classique problème de la Norvège : country: NO devient false.",
  'pageText.195c972a':
    'Les nombres avec un zéro initial, comme 010, sont lus en octal (8), et 0x1F en hexadécimal (31).',
  'pageText.4683982b':
    'Les chiffres séparés par des deux-points, comme 22:22, sont lus comme des nombres en base 60 (1342), ce qui peut casser les correspondances de ports et les heures.',
  'pageText.bc57ba5f':
    'version: 1.10 devient le nombre 1.1, et les dates comme 2024-01-01 deviennent des horodatages (2024-01-01T00:00:00.000Z).',
  'pageText.b58f4598': "Guillemets et erreurs d'analyse courantes",
  'pageText.f9b2a402':
    'Mettez entre guillemets toute valeur qui doit rester du texte : version: "1.10", port: "22:22", country: "NO". La conversion de JSON en YAML ajoute automatiquement des guillemets à ces chaînes.',
  'pageText.159243ab':
    "Les tabulations ne sont pas autorisées pour l'indentation. Le message d'erreur indique la ligne et la colonne, par exemple (2:1).",
  'pageText.cafe74b5':
    "Une erreur d'indentation d'une entrée d'association signifie généralement qu'une clé est indentée avec un nombre d'espaces différent de celui des clés voisines.",
  'pageText.249bfb43':
    'Les valeurs simples commençant par *, &, !, %, @ ou un accent grave ont un sens particulier en YAML et doivent être entourées de guillemets.',
  'pageText.b07acd91':
    'La conversion de JSON en YAML exige du JSON strict : les virgules finales, commentaires et chaînes entre guillemets simples sont rejetés.',
  'pageText.6ad0b0ed': 'Vérifier les fichiers Kubernetes et CI',
  'pageText.155c7fbc':
    "Les manifestes Kubernetes, les fichiers Docker Compose et les workflows GitHub Actions sont écrits en YAML, tandis que des outils comme la sortie de kubectl get -o json et jq utilisent JSON. Convertir un fichier en JSON permet de voir rapidement le type attribué à chaque valeur, par exemple si un port est devenu un nombre ou si une version est restée une chaîne, avant qu'un déploiement n'échoue pour cette raison. Lors de la reconversion en YAML, rajoutez manuellement les commentaires nécessaires.",
  'pageText.ac46f1af': 'JSON Pointer est-il identique à JSONPath ?',
  'pageText.cac8f6a8':
    "Non. JSON Pointer est la syntaxe compacte définie par la RFC 6901 pour identifier une seule valeur. JSONPath est un langage de requête distinct avec des filtres, des jokers et d'autres possibilités de sélection.",
  'pageText.8f9cad79': 'Comment référencer une barre oblique ou un tilde dans une clé ?',
  'pageText.de336765':
    "Encodez un tilde par ~0 et une barre oblique par ~1 dans chaque élément de référence. Par exemple, /a~1b sélectionne le membre d'objet nommé a/b.",
  'pageText.3da5dc4a': 'Que sélectionne un pointeur vide ?',
  'pageText.354d9f94': "Le JSON Pointer vide sélectionne l'intégralité du document JSON.",
  'pageText.57bcfda7': "Ce que fait l'évaluateur JSON Pointer",
  'pageText.f894f2e1':
    "JSON Pointer identifie une valeur en parcourant un document JSON à l'aide d'éléments de référence séparés par des barres obliques. Les éléments d'objet correspondent exactement aux noms des membres ; ceux des tableaux utilisent des indices commençant à zéro. L'évaluateur signale les membres manquants, les échappements ou indices de tableau incorrects et les tentatives de traverser une valeur primitive, au lieu de renvoyer silencieusement une mauvaise valeur.",
  'pageText.ab93ef77': 'Syntaxe et limites',
  'pageText.ce9c3b21':
    "Utilisez une chaîne vide pour la racine du document et / pour un membre d'objet dont le nom est vide.",
  'pageText.3cde0e22':
    "Encodez ~ par ~0 et / par ~1 dans un élément. Décodez d'abord ~1 en /, puis ~0 en ~, comme l'impose la RFC 6901.",
  'pageText.dcc291b6':
    "Les indices de tableau sont des entiers décimaux canoniques non négatifs. L'élément spécial - sert aux opérations d'ajout JSON Patch, mais n'identifie aucune valeur existante.",
  'pageText.c2421fef':
    "L'outil évalue uniquement la syntaxe JSON Pointer ; il n'implémente ni les filtres JSONPath, ni les opérations JSON Patch, le décodage de fragments d'URI ou la validation de schéma.",
  'pageText.532a56fb': 'Quelle différence entre JSONPath et JSON Pointer ?',
  'pageText.ad67c7e7':
    'JSON Pointer identifie une valeur précise avec des éléments séparés par des barres obliques. JSONPath est un langage de requête capable de sélectionner plusieurs valeurs avec des jokers, des tranches et une descente récursive.',
  'pageText.f33ae85e': 'Ce testeur prend-il en charge les expressions de filtre ?',
  'pageText.922825ba':
    "Non. Il prend volontairement en charge un sous-ensemble central sûr de la RFC 9535 et rejette les filtres et les expressions de script au lieu d'exécuter du code. Utilisez les noms d'enfants, les indices, les jokers, les tranches ou la descente récursive.",
  'pageText.37dcaef8': 'Le document JSON est-il envoyé ?',
  'pageText.b2396fff':
    "Non. L'analyse JSON et l'évaluation du chemin s'effectuent dans votre navigateur. L'historique du presse-papiers, les extensions, les scripts de la page et les appareils partagés peuvent toutefois exposer des données sensibles.",
  'pageText.926480c9': 'Ce que sélectionne le testeur JSONPath',
  'pageText.6475775d':
    "Une requête JSONPath commence à $ et parcourt les membres d'objets ou les éléments de tableaux. Un chemin singulier comme $.store.book[0].title sélectionne une valeur ; les jokers, tranches et descentes récursives peuvent produire une liste ordonnée de correspondances. Chaque résultat comprend la valeur sélectionnée et un chemin normalisé vers sa position dans le document d'entrée.",
  'pageText.0522c849': 'Syntaxe prise en charge et limites de sécurité',
  'pageText.167ce42e':
    "Utilisez .name ou ['name'] pour les membres d'objets, et [0] ou [-1] pour les indices de tableaux.",
  'pageText.325bdf69':
    "Utilisez .* ou [*] pour les jokers d'enfants, [start:end:step] pour les tranches de tableaux, et ..name ou ..* pour la descente récursive.",
  'pageText.0fa965f1':
    "Les sélecteurs de filtre, le JavaScript intégré, les fonctions et les expressions de type shell sont rejetés ; l'outil n'exécute jamais le texte d'une requête comme du code.",
  'pageText.0bd77a57':
    "Le testeur valide la syntaxe JSON avant la requête. Il n'applique pas JSON Schema et ne prouve pas que les valeurs sélectionnées respectent un contrat d'API.",
  'pageText.86927e79': 'Interpréter les résultats JSONPath',
  'pageText.5564c402':
    "L'absence de correspondance signifie que la requête valide n'a sélectionné aucune valeur dans le document actuel ; c'est différent de la sélection d'une valeur JSON null. Les jokers et la descente récursive peuvent renvoyer de nombreuses valeurs ; des valeurs identiques à des emplacements différents restent des correspondances distinctes, car leurs chemins normalisés diffèrent.",
  'pageText.2a7811c2': 'Un seul exemple JSON peut-il décrire tous les contenus valides ?',
  'pageText.8aeafe2c':
    "Non. Le générateur ne peut déduire que les valeurs et les structures présentes dans l'exemple. Vérifiez les champs obligatoires et facultatifs, les contraintes métier, les énumérations, les valeurs par défaut, les raffinements et les transformations par rapport au véritable contrat d'API.",
  'pageText.9c0cad39':
    "Comment les tableaux et les propriétés d'objets manquantes sont-ils traités ?",
  'pageText.01ee6835':
    "Les types d'éléments des tableaux sont fusionnés. Les objets d'un même tableau partagent une structure combinée ; une propriété absente d'un des objets de l'exemple devient facultative. Les tableaux mixtes de valeurs primitives deviennent des unions Zod, tandis que les tableaux vides utilisent des éléments z.unknown().",
  'pageText.2decefae':
    "Non. L'analyse JSON et la génération du schéma s'effectuent dans votre navigateur. L'historique du presse-papiers, les extensions, le partage d'écran ou un appareil partagé peuvent toutefois exposer des données sensibles : utilisez des exemples anonymisés lorsque c'est possible.",
  'pageText.a2131814': 'Ce que produit le générateur JSON vers Zod',
  'pageText.843b2234':
    "Le générateur analyse une valeur JSON et associe les chaînes, nombres, entiers, booléens, null, tableaux et objets à des expressions Zod. Le nom racine est normalisé en un identifiant de schéma valide en TypeScript. Lorsque les types déduits sont activés, le résultat comprend également un alias z.infer : le validateur à l'exécution et le type à la compilation proviennent ainsi du même schéma.",
  'pageText.9fdeb27b': 'Règles de déduction à vérifier',
  'pageText.a373d436':
    'Les entiers deviennent z.number().int(), tandis que les valeurs comportant une partie fractionnaire deviennent z.number().',
  'pageText.7640c5c6':
    "Les exemples de tableaux mixtes deviennent des unions. Les tableaux d'objets fusionnent les clés observées et marquent comme facultatives celles qui sont absentes d'un des objets de l'exemple.",
  'pageText.51004b4a':
    "La déduction facultative de formats reconnaît des chaînes représentatives d'UUID, de dates et heures ISO, d'adresses courriel et d'URL HTTP(S), avec les vérifications de chaînes Zod.",
  'pageText.297ff683':
    "Le mode objet strict ajoute .strict() pour rejeter les clés inconnues au lieu de les supprimer silencieusement dans les schémas d'objets générés.",
  'pageText.373ed392':
    "Les tableaux vides ne révèlent aucun type d'élément et deviennent donc z.array(z.unknown()).",
  'pageText.3733edff': "La déduction à partir d'un exemple est un point de départ, pas un contrat",
  'pageText.35b1bbc6':
    "Un exemple ne peut prouver ni les longueurs minimales, les plages numériques, les valeurs d'énumération autorisées, les règles entre champs, les valeurs par défaut, le comportement de coercition ou le caractère toujours obligatoire d'un champ présent dans cet exemple. Comparez le résultat à la documentation de l'API et aux véritables cas limites, puis ajoutez des raffinements Zod et des tests avant d'accepter des entrées non fiables. L'outil génère uniquement du texte source ; il n'exécute pas le schéma et n'installe pas Zod dans votre projet.",
  'pageText.b12736d6': "Confidentialité et limites de l'entrée",
  'pageText.ac6e0f5e':
    "La génération est locale et déterministe pour les mêmes options et la même entrée. La profondeur d'imbrication est limitée afin que le navigateur reste réactif. Évitez de coller des jetons de production ou des données personnelles, même dans des outils locaux, lorsqu'un exemple anonymisé suffit à décrire la même structure.",
  'pageText.c12e919d': 'Quelles opérations JSON Patch sont prises en charge ?',
  'pageText.f93d0eb6':
    "L'applicateur prend en charge add, remove, replace, move, copy et test. Les correctifs générés utilisent des opérations add, remove et replace déterministes ; les tableaux modifiés sont remplacés comme une valeur unique, plutôt que comparés élément par élément de façon instable.",
  'pageText.9bcbf59a':
    'Comment les barres obliques et les tildes sont-ils représentés dans les chemins ?',
  'pageText.153cbcc5':
    "Les chemins JSON Patch utilisent JSON Pointer, défini par la RFC 6901. Une barre oblique dans une clé d'objet devient ~1 et un tilde devient ~0 ; une clé nommée a/b est donc désignée par /a~1b.",
  'pageText.9bd286e3': "Appliquer un correctif modifie-t-il l'éditeur source ?",
  'pageText.1e520c6e':
    "Non. Le JSON source est cloné avant l'exécution des opérations, et le résultat s'affiche séparément. La suppression de la racine complète du document est rejetée, car l'outil renvoie toujours une valeur JSON valide.",
  'pageText.830d9198': 'Comment les différences JSON deviennent un correctif',
  'pageText.27cb8257':
    "Les clés d'objets sont comparées dans l'ordre trié pour que les mêmes entrées produisent la même séquence d'opérations. Les clés manquantes deviennent des opérations remove, les nouvelles clés des opérations add, et les valeurs primitives ou tableaux modifiés des opérations replace. Les objets imbriqués sont parcourus récursivement et chaque chemin produit est échappé sous forme de JSON Pointer conforme à la RFC 6901.",
  'pageText.7a310a1e': "Application du correctif et comportement en cas d'échec",
  'pageText.afbc723e':
    "Les indices de tableaux sont validés strictement ; l'élément spécial - ajoute un élément en fin de tableau uniquement lors d'une opération add.",
  'pageText.e8c8cf45':
    "replace, remove, move, copy et test exigent que leurs chemins sources existent ; les échecs indiquent le numéro de l'opération.",
  'pageText.3a420fd8':
    "move rejette le déplacement d'une valeur dans l'un de ses propres descendants et applique les changements d'indices de tableaux dans l'ordre des opérations.",
  'pageText.b3c285ba':
    "test utilise l'égalité structurelle JSON, et non l'identité des objets ou l'ordre des clés sérialisées.",
  'pageText.7a08072a':
    "Les noms d'objets particuliers comme __proto__ sont créés comme des propriétés de données propres à l'objet, sans modifier les prototypes.",
  'pageText.acc508bd': 'Déterminisme, confidentialité et vérification',
  'pageText.39b818a8':
    "La génération et l'application s'effectuent entièrement dans ce navigateur. Les différences générées sont volontairement prévisibles, sans garantie de minimalité, surtout pour les tableaux. Vérifiez l'ordre des opérations, le coût du remplacement des tableaux, les versions concurrentes du document et l'autorisation de l'application avant d'utiliser un correctif sur des données persistantes ou une API.",
  'pageText.28d8aae9': 'Quels langages de programmation sont pris en charge ?',
  'pageText.b4757b15':
    'Le générateur prend actuellement en charge Go (structures Golang avec balises JSON), Python (BaseModels Pydantic v2), Rust (structures Serde), C# (Records avec JsonPropertyName) et Kotlin (classes de données).',
  'pageText.294e643e': 'Comment les objets et tableaux imbriqués sont-ils traités ?',
  'pageText.850e01f2':
    'Les objets JSON imbriqués sont extraits en structures ou classes typées distinctes, avec des noms en camelCase ou PascalCase ; les types des éléments de tableaux sont déduits automatiquement.',
  'pageText.05225c44': 'Mes données JSON sont-elles envoyées à un serveur ?',
  'pageText.16c71e23':
    "Non. La génération du code s'effectue entièrement dans votre navigateur avec du JavaScript côté client.",
  'pageText.6bf4c146': 'Comment cet outil calcule-t-il la taille du JSON en octets ?',
  'pageText.94825111':
    "Il calcule le nombre exact d'octets UTF-8 des contenus JSON mis en forme et minifiés avec l'API TextEncoder du navigateur.",
  'pageText.449785d1': 'Quelles mesures sont extraites ?',
  'pageText.200cd0b4':
    "La taille brute en octets, la taille minifiée en octets, le pourcentage de réduction, le nombre total de clés, d'objets imbriqués et de tableaux, la profondeur maximale de la hiérarchie et le nombre de champs null.",
  'pageText.6bafe4b9': "Oui, tout le traitement s'effectue localement dans votre navigateur.",
  'pageText.f9bc4fe7': "Qu'est-ce que l'encodage Quoted-Printable ?",
  'pageText.b1f6a629':
    'Quoted-Printable est un encodage utilisant des caractères ASCII imprimables (RFC 2045), conçu pour transporter par courriel des caractères non ASCII.',
  'pageText.5c516685': 'Mes données sont-elles sécurisées ?',
  'pageText.ee52101e':
    "Oui, tout l'encodage et le décodage s'effectuent localement dans votre navigateur.",
  'pageText.6c6f7098': "Qu'est-ce que l'encodeur et décodeur Base64URL ?",
  'pageText.f020a31f':
    'Encodez et décodez du Base64 adapté aux URL, sans caractères de remplissage.',
  'pageText.16ca11a3': 'Quelle différence entre Base64url et le Base64 standard ?',
  'pageText.3b137bc0':
    "Base64url remplace + par - et / par _ pour permettre l'utilisation de la valeur dans les URL, noms de fichiers et segments JWT ; il omet généralement le remplissage =.",
  'pageText.06b202a5': "Puis-je convertir une chaîne Base64 existante plutôt qu'encoder du texte ?",
  'pageText.59313335':
    "Oui. Utilisez le mode Base64 vers Base64url pour changer d'alphabet et retirer le remplissage, ou Base64url vers Base64 pour rétablir +, / et le remplissage =. Les octets ne sont pas réencodés.",
  'pageText.ad19a97c': 'Mes données sont-elles traitées de façon sécurisée ?',
  'pageText.32092515':
    "Oui, tous les traitements et calculs s'effectuent localement dans votre navigateur, pour la confidentialité et la rapidité.",
  'pageText.054c55ba': 'Base64 est-il un chiffrement ?',
  'pageText.040d6643':
    "Non. Base64 est un encodage réversible sans clé, que tout le monde peut décoder. Ne l'utilisez jamais pour cacher des mots de passe, des jetons d'API ou des données personnelles ; utilisez un véritable chiffrement, comme AES-GCM.",
  'pageText.c07235a3': 'Comment décoder du Base64 en JavaScript ?',
  'pageText.190c8592':
    "Dans Node.js, utilisez Buffer.from(value, 'base64').toString('utf8'). Dans le navigateur, atob(value) renvoie une chaîne binaire ; pour du texte UTF-8, utilisez donc new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))).",
  'pageText.3d513a1d': 'Comment encoder une chaîne en Base64 en Python ?',
  'pageText.5817c0f8':
    "Utilisez base64.b64encode('text'.encode('utf-8')).decode('ascii') après import base64. Pour l'alphabet adapté aux URL, appelez plutôt base64.urlsafe_b64encode.",
  'pageText.43cf2c6b': 'Pourquoi le Base64 se termine-t-il par = ou == ?',
  'pageText.9dc050ab':
    "Base64 encode 3 octets en 4 caractères. Lorsque la longueur de l'entrée n'est pas un multiple de 3, un ou deux caractères = complètent le résultat jusqu'à un multiple de 4. Ils ne transportent aucune donnée ; ce décodeur accepte également une entrée dont le remplissage a été entièrement retiré.",
  'pageText.1e9e71cb': "Pourquoi un Base64 d'apparence valide ne se décode-t-il pas ici ?",
  'pageText.2bfb36f5':
    "La chaîne contient des caractères hors de l'alphabet standard, souvent - ou _ provenant de Base64URL, ou les octets décodés ne représentent pas du texte UTF-8. Les images, PDF et autres données binaires échouent dans ce décodeur de texte, même si le Base64 est correctement formé ; utilisez plutôt Base64 vers image ou Base64 vers PDF.",
  'pageText.1f843857': 'Mes données sont-elles envoyées à un serveur ?',
  'pageText.5356631f':
    "Non. L'encodage et le décodage utilisent les fonctions intégrées btoa et atob du navigateur sur votre appareil ; rien de ce que vous collez n'est envoyé.",
  'pageText.9673c683': "Comment fonctionne l'encodage Base64",
  'pageText.6840df16':
    "Base64 lit l'entrée par groupes de trois octets (24 bits) et les découpe en quatre groupes de 6 bits. Chaque groupe sélectionne un caractère parmi un alphabet de 64 caractères : A-Z, a-z, 0-9, + et /. Si la longueur de l'entrée n'est pas un multiple de trois, un ou deux signes = complètent le résultat pour que sa longueur reste un multiple de quatre. Par exemple, Man est encodé en TWFu, Ma en TWE= et M en TQ==.",
  'pageText.376d85ff':
    "Cet outil convertit votre texte en octets UTF-8 avant l'encodage : les caractères non ASCII sont donc correctement restitués après décodage. é occupe deux octets et s'encode en w6k=, tandis que l'emoji 😀 occupe quatre octets et s'encode en 8J+YgA==.",
  'pageText.3144275a': 'Pourquoi le Base64 est environ 33 % plus volumineux',
  'pageText.ce1baf42':
    "Chaque groupe de 3 octets devient 4 caractères : les données encodées grossissent donc d'environ un tiers, plus jusqu'à deux caractères de remplissage. Un contenu de 30 Ko devient environ 40 Ko en Base64. Ce surcoût permet de représenter des octets quelconques avec des caractères imprimables : c'est pourquoi Base64 apparaît dans les champs JSON, les URI de données, les pièces jointes de courriels et les en-têtes d'authentification HTTP Basic. Ce n'est ni une compression ni un chiffrement.",
  'pageText.b3162ffd': 'Base64 et Base64URL',
  'pageText.1a8a3497':
    "Le Base64 standard (RFC 4648, section 4) utilise + et / avec un remplissage =. Base64URL (section 5) remplace + par - et / par _, et omet généralement le remplissage pour permettre l'utilisation des valeurs dans les URL, noms de fichiers et segments JWT sans encodage en pourcentage. Cet outil utilise l'alphabet standard. Pour décoder ici une valeur Base64URL, remplacez d'abord - par + et _ par /, ou utilisez l'encodeur Base64URL dédié.",
  'pageText.92565596': 'Erreurs de décodage courantes et corrections',
  'pageText.a3f451e2':
    'Caractères incorrects : tout caractère hors de A-Z, a-z, 0-9, +, / et = est rejeté. Les causes habituelles sont - et _ de Base64URL, ou des guillemets copiés avec la valeur.',
  'pageText.8245a36e':
    "Longueur incorrecte : une valeur dont la longueur donne un reste de 1 lors de la division par 4 ne peut être valide ; un caractère a généralement été perdu pendant la copie. L'absence complète de remplissage est acceptée.",
  'pageText.f0196a80':
    "Contenu binaire : les octets décodés doivent être du texte UTF-8 valide. Le Base64 d'images, de PDF ou de données compressées échoue ici même si l'encodage est valide.",
  'pageText.016597d5':
    'Sauts de ligne : les espaces et sauts de ligne dans une valeur unique, comme une sortie MIME répartie sur des lignes de 76 caractères, sont ignorés. En mode par lots, chaque ligne est toutefois traitée comme une valeur distincte.',
  'pageText.49b68226': "Qu'est-ce que l'encodage d'URL ?",
  'pageText.5cd6b8f1':
    "L'encodage en pourcentage représente un octet UTF-8 par % suivi de deux chiffres hexadécimaux. Il sert lorsqu'un caractère ne peut pas apparaître sans risque dans une partie donnée d'une URI.",
  'pageText.a2c17b54': 'Faut-il encoder un composant ou une URL complète ?',
  'pageText.5905cd6b':
    "Utilisez le mode composant pour une valeur de requête, un segment de chemin ou une valeur de fragment, car il échappe également les séparateurs comme &, =, / et ?. Utilisez le mode URL complète si l'entrée contient déjà une URL entière dont les séparateurs structurels doivent rester lisibles.",
  'pageText.f176d778': 'Pourquoi le décodage échoue-t-il parfois ?',
  'pageText.231a3849':
    "Un signe pourcentage doit être suivi de deux chiffres hexadécimaux, et la séquence d'octets obtenue doit être décodable. Les séquences incomplètes comme %2 ou le UTF-8 mal formé sont rejetés au lieu d'être modifiés silencieusement.",
  'pageText.a85f9468': "Ce que modifie l'encodeur d'URL",
  'pageText.62d7dab2':
    "Le mode composant utilise le comportement des fonctions encodeURIComponent et decodeURIComponent du navigateur. Il convient à une valeur de requête ou un segment de chemin individuel, car les séparateurs d'URL réservés sont encodés comme des données. Le mode URL complète utilise encodeURI et decodeURI, qui préservent les caractères structurels comme :, /, ?, #, & et = pour conserver la structure d'une URL déjà assemblée.",
  'pageText.e84e968c': "Exemple d'encodage en pourcentage",
  'pageText.d6bede20':
    "L'encodage du composant \"hello world&role=admin\" produit hello%20world%26role%3Dadmin. Si ce même texte était inséré dans une chaîne de requête sans encodage de composant, l'esperluette et le signe égal pourraient être interprétés comme de nouveaux paramètres de requête plutôt que comme une partie de la valeur. Le mode par lots applique l'opération sélectionnée indépendamment à chaque ligne non vide.",
  'pageText.d69c3bf2': 'Limites et confidentialité',
  'pageText.66960492':
    "Il s'agit de l'encodage en pourcentage des URI, et non de la sérialisation application/x-www-form-urlencoded ; les encodeurs de formulaires représentent souvent les espaces par + et appliquent des règles propres aux champs.",
  'pageText.fb49cce2':
    'Le décodage ne vérifie pas que le résultat est une URL sûre, accessible ou fiable. Validez séparément les schémas, les hôtes et les destinations de redirection.',
  'pageText.7ebaf6d4':
    "N'encodez pas plusieurs fois une valeur déjà encodée, sauf si le double encodage est voulu ; % peut devenir %25.",
  'pageText.5bdbc315':
    "La conversion s'effectue dans le navigateur. L'historique du presse-papiers, les extensions, les appareils partagés et les destinations où vous collez le résultat restent des voies d'exposition distinctes.",
  'pageText.d1225e2e': "Le décodage prouve-t-il l'authenticité d'un JWT ?",
  'pageText.154670ea':
    "Non. N'importe qui peut encoder un en-tête et un contenu en Base64URL. L'authenticité n'est établie qu'après la vérification par un algorithme autorisé avec la bonne clé et la réussite de toutes les politiques requises pour les déclarations.",
  'pageText.06daf1d8':
    'Quels algorithmes JWT cette page peut-elle utiliser pour signer et vérifier ?',
  'pageText.50e5fffd':
    "Elle prend en charge les algorithmes HMAC HS256, HS384 et HS512 avec un secret textuel. Elle rejette volontairement alg:none et n'accepte pas les clés RSA, ECDSA, EdDSA, JWK, JWKS ou de certificat.",
  'pageText.d4ee3edc': 'Les jetons et secrets sont-ils envoyés ?',
  'pageText.f21783fe':
    "Non. Le décodage, la signature HMAC avec Web Crypto et la vérification de signature s'effectuent dans le navigateur. Les jetons au porteur et les secrets restent exposés à l'historique du presse-papiers, aux extensions, au partage d'écran et aux appareils partagés : utilisez des données fictives.",
  'pageText.e5b685cb': 'Décoder, vérifier et signer sont des opérations distinctes',
  'pageText.d5099b0a':
    "Décoder sépare un jeton compact en trois parties et lit son en-tête JSON et ses déclarations sans leur faire confiance. Vérifier sélectionne HS256, HS384 ou HS512 à partir de l'en-tête protégé, vérifie l'entrée exacte de signature avec Web Crypto, puis évalue exp, nbf, iat et, facultativement, l'émetteur ou l'audience attendus. Signer sérialise les objets JSON fournis, remplace header.alg par l'algorithme HMAC choisi et crée un JWS compact pour les tests.",
  'pageText.1305057d': 'Règles de vérification et indications de débogage',
  'pageText.7576ed65':
    'Une signature HMAC valide prouve que le signataire possédait le même secret ; elle ne prouve pas que ce secret a été stocké ou distribué de façon sûre.',
  'pageText.6e0c0a9d':
    'Le jeton est rejeté si son en-tête omet alg, choisit none ou demande un algorithme asymétrique non pris en charge.',
  'pageText.caeba6bd':
    "Les valeurs d'expiration, de début de validité et d'émission doivent être des secondes NumericDate finies ; la tolérance de décalage d'horloge peut aller de zéro à 300 secondes.",
  'pageText.b69c111a':
    "La comparaison facultative de l'émetteur est exacte. Pour l'audience, la valeur attendue doit être la chaîne aud ou un élément d'un tableau aud.",
  'pageText.45928def':
    "Les déclarations d'autorisation comme les rôles et les portées sont affichées, mais restent propres à l'application et ne sont pas évaluées par cette page.",
  'pageText.9f727ee8': "Limites de sécurité et d'interopérabilité",
  'pageText.79b6492c':
    "Un vérificateur de production doit configurer indépendamment son algorithme autorisé, sélectionner les clés à partir d'une configuration d'émetteur fiable, appliquer toutes les déclarations de l'application, renouveler les secrets et gérer les politiques de rejeu ou de révocation. Cette page ne déchiffre pas les JWE, ne résout pas les documents JWK ou JWKS, ne valide pas les certificats et ne reproduit pas la sérialisation JSON propre à une bibliothèque. Générez les jetons de production uniquement dans le système d'identité fiable qui détient la clé.",
  'pageText.269f9532': 'Que sont les entités HTML ?',
  'pageText.1998740e':
    'Les entités HTML sont des codes particuliers servant à afficher les caractères réservés en HTML. Par exemple, &lt; représente < et &amp; représente &.',
  'pageText.b89e0526': 'Pourquoi encoder les entités HTML ?',
  'pageText.1529343a':
    "L'encodage des caractères réservés peut empêcher l'interprétation du texte comme du balisage dans un contexte de texte HTML. Ce n'est pas une protection XSS complète : les attributs, URL, CSS, JavaScript et HTML non fiable exigent un échappement ou une désinfection adaptés au contexte.",
  'pageText.047ad07a': "Quels formats d'entités cet outil peut-il décoder ?",
  'pageText.8c48f80f':
    'Il décode les références nommées reconnues par le navigateur, comme &amp;, les références numériques décimales comme &#169; et les références hexadécimales comme &#xA9;.',
  'pageText.1f92ff4e': "Est-ce le même outil qu'un convertisseur d'entités HTML ?",
  'pageText.2bce97a1':
    "Oui. Cet outil encode et décode les entités HTML ; il n'y a donc pas de convertisseur distinct d'entités HTML vers Unicode. Activez l'option étendue pour produire des références de caractères décimales pour le texte non ASCII ; le décodage résout aussi les références hexadécimales.",
  'pageText.787f2f9a': "Ce que fait le décodeur et encodeur d'entités HTML",
  'pageText.a65d3d26':
    "Les références de caractères HTML représentent des caractères qui seraient autrement ambigus dans le balisage. L'encodeur remplace les caractères réservés comme l'esperluette, les signes inférieur et supérieur, les guillemets et l'apostrophe. Son option étendue produit aussi des références décimales pour les caractères non ASCII. Le décodeur résout les références nommées, décimales et hexadécimales avec l'analyseur HTML du navigateur.",
  'pageText.a4c17b02': "Exemples d'entités HTML",
  'pageText.6b1cb488': '&lt; devient le signe inférieur, et &gt; le signe supérieur.',
  'pageText.656db619': '&amp; devient une esperluette, et &quot; un guillemet.',
  'pageText.b1f980f4':
    '&#169; et &#xA9; sont les références décimale et hexadécimale du symbole de copyright.',
  'pageText.4a4bcadc':
    "L'encodage de <p>Research & Development</p> produit du texte qui peut être affiché comme des caractères de balisage plutôt qu'analysé comme cet élément.",
  'pageText.761ca2d4': 'Limites de sécurité et de rendu',
  'pageText.b3511bac':
    "L'encodage d'entités dépend du contexte. Échapper du texte pour un nœud de texte HTML ne rend pas la même valeur sûre dans un gestionnaire d'événement, une URL, une déclaration CSS, une chaîne JavaScript ou un fragment HTML quelconque. Utilisez par défaut l'échappement du framework et un outil de désinfection maintenu lorsque la mise en forme autorisée doit être préservée. Décoder des entités non fiables doit produire du texte à examiner, pas justifier l'injection du résultat avec innerHTML.",
  'pageText.29803de0': "Qu'est-ce que l'encodage hexadécimal ?",
  'pageText.debeda5a': "L'encodage hexadécimal représente les octets UTF-8 en base 16 (0-9, A-F).",
  'pageText.e26f9f25': 'Comment utiliser cet outil ?',
  'pageText.0eb45c63':
    "Saisissez du texte dans le champ d'entrée : il est automatiquement converti en hexadécimal. Vous pouvez également coller de l'hexadécimal pour le décoder en texte.",
  'pageText.8d56b3f0': "Qu'est-ce que l'encodage binaire ?",
  'pageText.1fefb654':
    "L'encodage binaire représente les octets UTF-8 en base 2, avec uniquement des 0 et des 1.",
  'pageText.e0fbf5c5': 'Combien de bits par caractère ?',
  'pageText.a3c61b13':
    'Chaque octet UTF-8 est représenté par 8 bits. Les caractères ASCII utilisent un octet ; les caractères comme les lettres accentuées et les emoji peuvent en utiliser plusieurs.',
  'pageText.6f9da256': 'Puis-je reconvertir du binaire en texte ?',
  'pageText.6e36ed1b':
    'Oui. Le mode décodage accepte des octets binaires complets de 8 bits, avec des espaces facultatifs entre les groupes, et reconvertit les octets UTF-8 valides en texte.',
  'pageText.a76ed5ae': 'Que fait cet encodeur et décodeur binaire ?',
  'pageText.208a45fa':
    "Cet outil convertit le texte en représentation binaire de ses octets UTF-8 et décode les octets binaires en texte. Chaque groupe de sortie contient huit bits. Les espaces entre groupes d'octets facilitent la lecture et peuvent être retirés ou conservés pendant le décodage. La conversion s'effectue dans le navigateur : le texte n'a pas besoin d'être envoyé pour le traitement.",
  'pageText.f49b8901': 'Exemples de conversion de texte en binaire',
  'pageText.3a3355ac':
    "La lettre A correspond à l'octet UTF-8 65 et devient donc 01000001. Le caractère é utilise les deux octets UTF-8 C3 et A9 ; sa forme binaire est donc 11000011 10101001. Cette distinction compte : l'outil représente des octets encodés, et non une valeur fixe de 8 bits pour chaque caractère visible.",
  'pageText.0288b438':
    "L'encodage de texte en binaire diffère de la conversion d'un nombre décimal en base 2. Saisir le texte 10 encode les caractères 1 et 0 comme deux octets UTF-8. Utilisez le convertisseur de bases numériques pour convertir la base d'un nombre.",
  'pageText.19833ccd': 'Validation de la conversion de binaire en texte',
  'pageText.58060cff':
    "Le mode décodage ignore les espaces entre groupes, mais exige uniquement les chiffres 0 et 1 et un nombre complet d'octets de 8 bits. Les octets incomplets, les autres caractères ou les séquences d'octets qui ne sont pas du UTF-8 valide produisent une erreur au lieu d'un résultat partiel trompeur.",
  'pageText.49543137':
    "L'encodage binaire est une représentation, pas un chiffrement ou une compression. Toute personne possédant les octets binaires peut les décoder, et la chaîne de bits peut être plus longue que le texte visible d'origine.",
  'pageText.c90dd9ea': "Qu'est-ce qu'une URI de données Base64 ?",
  'pageText.39ff7dd5':
    "Une URI de données intègre directement le contenu d'un fichier dans du HTML ou du CSS sous la forme data:image/png;base64,<encoded bytes>. Le navigateur la décode sur place : l'image ne nécessite donc aucune requête HTTP distincte.",
  'pageText.bae37a7c': 'Quand utiliser des images Base64 ?',
  'pageText.4baed32c':
    "Utilisez-les pour de petites icônes, de minuscules images d'attente et des démonstrations dans un fichier unique. Il vaut mieux servir les grandes images comme des fichiers ordinaires : Base64 augmente la taille d'environ 33 % et les images intégrées ne peuvent pas être mises en cache séparément.",
  'pageText.fd65cb89': 'Pourquoi la chaîne Base64 est-elle plus grande que mon fichier image ?',
  'pageText.dc1302a7':
    "Base64 représente chaque groupe de 3 octets par 4 caractères ; le résultat est donc environ un tiers plus grand que le fichier. L'outil affiche les tailles d'origine et en Base64 pour vous aider à juger l'intérêt de l'intégration.",
  'pageText.44cee614': "Quels formats d'image sont pris en charge ?",
  'pageText.690da2e0':
    "Tout fichier identifié par votre navigateur avec un type MIME image/*, notamment PNG, JPEG, GIF, WebP et SVG. D'autres formats comme AVIF ou ICO fonctionnent si le navigateur indique un type image. Les fichiers sans type image sont rejetés.",
  'pageText.4f220e7a': 'Comment reconvertir du Base64 en image ?',
  'pageText.86d8a616':
    "Utilisez l'outil Base64 vers image, ou écrivez les octets sur disque dans Node.js avec fs.writeFileSync('image.png', Buffer.from(base64String, 'base64')).",
  'pageText.0472d6fa': 'Mon image est-elle envoyée à un serveur ?',
  'pageText.b951075e':
    "Non. Le fichier est lu avec l'API FileReader du navigateur et encodé sur votre appareil. Rien n'est envoyé à un serveur.",
  'pageText.8d3141eb': 'URI de données et Base64 brut',
  'pageText.441f0d6b':
    "Une URI de données regroupe le type MIME et les octets encodés dans une chaîne que les navigateurs acceptent partout où une URL est attendue, par exemple data:image/png;base64,iVBORw0KGgo... L'option Base64 retire le préfixe data:image/png;base64, et renvoie uniquement les octets encodés : c'est ce qu'attendent la plupart des API JSON, bases de données et points de réception lorsque le type du contenu est stocké dans un champ distinct. Le type MIME de l'URI de données provient du type signalé par votre navigateur pour le fichier choisi.",
  'pageText.9c060b5e': 'Intégrer le résultat',
  'pageText.92456569':
    'HTML : <img src="data:image/png;base64,..." alt="Logo" width="32" height="32">. Conservez un texte alternatif utile et des dimensions explicites, comme pour toute image.',
  'pageText.56968f15':
    'CSS : background-image: url("data:image/png;base64,..."); avec l\'URI de données entre guillemets.',
  'pageText.d617fb16':
    "JSON : stockez la chaîne Base64 brute à côté d'un champ contentType et décodez-la sur le serveur.",
  'pageText.693f282c':
    "Markdown : ![alt](data:image/png;base64,...) fonctionne avec certains moteurs de rendu, mais de nombreuses plateformes hébergées bloquent les URI de données dans Markdown ; testez l'endroit où le contenu sera affiché.",
  'pageText.f8d06727': 'Avantages et inconvénients des images Base64',
  'pageText.1e364f5e':
    "L'encodage augmente la taille des données d'environ 33 %. Une image intégrée ne peut pas non plus être mise en cache seule : elle est retéléchargée chaque fois que le fichier HTML ou CSS qui la contient change, et ralentit l'analyse de ce fichier. L'intégration est intéressante pour de très petits éléments comme les icônes, les images d'attente de 1x1 ou les pages de démonstration autonomes. Pour les photos et les images de plus de quelques kilooctets, un fichier image ordinaire servi avec des en-têtes de cache est généralement plus rapide. Pour le SVG, une URI de données encodée comme une URL est souvent plus courte que le Base64 ; l'outil SVG vers URI de données CSS en produit une.",
  'pageText.e43aa790': "Ce qu'il advient de votre fichier",
  'pageText.c4f14710':
    "Le fichier est encodé exactement tel qu'il est stocké. Il n'y a ni redimensionnement, ni recompression, ni suppression des métadonnées : les données EXIF d'un JPEG, comme les informations de l'appareil photo ou les coordonnées GPS, se retrouvent donc dans la chaîne Base64. Compressez l'image ou retirez d'abord ses métadonnées si nécessaire. Un seul fichier est converti à la fois ; les très grandes images produisent des chaînes très longues qui peuvent ralentir le défilement ou la copie.",
  'pageText.49b261c7': "Qu'est-ce que l'échappement Unicode ?",
  'pageText.80d28e8d':
    'L\'échappement Unicode représente les caractères avec des points de code hexadécimaux, comme \\u0041 pour "A".',
  'pageText.6d708618': "Puis-je décoder des séquences d'échappement Unicode en ligne ?",
  'pageText.a4bd1758':
    "Oui. Collez du texte contenant des séquences prises en charge \\uXXXX, \\u{XXXXX} ou \\xFF, choisissez Décoder, et l'outil les remplace par leurs caractères localement dans votre navigateur.",
  'pageText.cb96dafd': "Est-ce identique au déséchappement d'une chaîne JSON ?",
  'pageText.e061f024':
    "Non. Cet outil cible les échappements hexadécimaux Unicode et de type octet. Utilisez l'outil d'échappement de chaînes JSON pour traiter aussi les échappements JSON comme \\n, \\t, les guillemets échappés ou les barres obliques inverses comme un fragment de chaîne JSON complet.",
  'pageText.b78ece8c': "Que fait ce décodeur d'échappements Unicode ?",
  'pageText.66907eae':
    "Le décodeur transforme les séquences d'échappement hexadécimales reconnues en caractères lisibles. Il prend en charge les valeurs à quatre chiffres de style JavaScript, comme \\u0041, les points de code entre accolades comme \\u{1F600} et les valeurs de type octet à deux chiffres comme \\x41. Le reste du texte est conservé, ce qui facilite l'examen du résultat avant sa copie.",
  'pageText.8b33e053': "Exemples d'encodage d'échappements Unicode",
  'pageText.2a71ff3b':
    "Lorsque l'échappement ASCII est activé, A devient \\u0041. Les caractères au-delà du plan multilingue de base utilisent la notation de point de code entre accolades ; par exemple, 😀 devient \\u{1F600}. Lorsque l'échappement ASCII est désactivé, le texte ASCII ordinaire reste lisible et les caractères non ASCII sont échappés.",
  'pageText.f75a70a6':
    "L'échappement Unicode modifie l'écriture des caractères, pas leur sens. Il sert à examiner des journaux, du code source, des contenus d'API ou du texte copié affichant la notation échappée plutôt que les caractères rendus.",
  'pageText.715d4ec7': 'Décoder les échappements Unicode en JavaScript et Python',
  'pageText.25c67af7':
    "Pour une valeur de chaîne JSON complète, utilisez JSON.parse() en JavaScript ou json.loads() en Python. Les deux traitent les échappements Unicode JSON à quatre chiffres et les paires de substituts. JSON n'accepte ni les échappements JavaScript entre accolades ni la notation \\xXX ; le décodeur en ligne prend en charge ces représentations textuelles distinctes.",
  'pageText.dfad767c':
    "Les exemples conservent les barres obliques inverses littérales jusqu'à l'analyse et affichent Aé😀. N'utilisez pas eval() pour décoder une entrée externe. Un document JSON doit être analysé une seule fois selon son format source plutôt que soumis à des remplacements répétés des séquences d'échappement.",
  'pageText.b78d8193': 'Échappements Unicode, JSON et sécurité',
  'pageText.ec7ecc8b':
    "Ce convertisseur n'est pas un analyseur complet de langage de programmation. Il remplace les motifs hexadécimaux pris en charge, mais n'interprète pas toutes les règles d'échappement de JSON, JavaScript, des expressions régulières ou du shell. Utilisez un analyseur adapté au format lorsqu'une validation exacte du document est nécessaire.",
  'pageText.d400aec2':
    "L'encodage n'est pas un chiffrement : n'importe qui peut décoder une valeur échappée. Le traitement s'effectue dans le navigateur, mais évitez tout de même de placer des secrets dans des utilitaires en ligne, sauf si l'environnement d'exécution convient aux données.",
  'pageText.06d6ceab': "Que fait l'échappement de chaînes JSON ?",
  'pageText.a236a523':
    'Il convertit les caractères spéciaux comme les sauts de ligne, tabulations et guillemets en formes échappées comme \\n, \\t et \\".',
  'pageText.b5b32ac6': 'Quand est-ce utile ?',
  'pageText.9758a1c9':
    "C'est utile pour intégrer des chaînes de façon sûre dans des contenus JSON, des fichiers de configuration ou des requêtes d'API.",
  'pageText.23c25e0a': "Cet outil accepte-t-il le Base64 brut et les préfixes d'URI de données ?",
  'pageText.47a7ae5b':
    'Oui. Vous pouvez coller des chaînes Base64 brutes commençant par iVBORw0KGgo... ou /9j/..., ou des URI complètes data:image/png;base64,...',
  'pageText.3e22ce2a': 'Mes images sont-elles envoyées à un serveur ?',
  'pageText.ff8327d4':
    "Non. Le décodage et le rendu des images s'effectuent entièrement dans votre navigateur, avec des URL de données et des blobs côté client.",
  'pageText.b5c81ec6': "Quel format doit avoir l'entrée hexadécimale ?",
  'pageText.4df53de7':
    'Toute chaîne hexadécimale de longueur paire, par exemple 48656c6c6f, avec ou sans espaces et préfixes.',
  'pageText.0d4f669a': 'La conversion est-elle bidirectionnelle ?',
  'pageText.448de195':
    "Oui ! Vous pouvez convertir de l'hexadécimal en Base64 et du Base64 en hexadécimal sans aucune perte de données.",
  'pageText.5a849fdb': "À quoi sert l'encodage Base32 ?",
  'pageText.300b948f':
    "Base32 utilise un alphabet de 32 caractères (A-Z, 2-7), insensible à la casse et évitant les caractères visuellement ambigus ; il est courant dans les clés secrètes TOTP de l'authentification à deux facteurs et les codes de vérification saisis manuellement.",
  'pageText.11274fca': 'Que sont les données structurées JSON-LD ?',
  'pageText.930ded68':
    'JSON-LD est un format standard recommandé par Google pour fournir des informations explicites sur une page et classer son contenu afin de produire des résultats de recherche enrichis.',
  'pageText.c2c8dd70': 'Comment ajouter le schéma généré à mon site ?',
  'pageText.beba7ce9':
    'Copiez la balise <script type="application/ld+json"> générée et collez-la dans la section HTML <head> ou <body>.',
  'pageText.86ec75d3': 'Mes données sont-elles privées et sécurisées ?',
  'pageText.b25ac842':
    "Oui, tout le traitement s'exécute localement dans votre navigateur, sans stockage sur un serveur.",
  'pageText.687b5867': "Qu'est-ce que le générateur d'UUID v7 ordonnés dans le temps ?",
  'pageText.c8e48ee7':
    "Générez des identifiants UUID v7 ordonnés dans le temps avec l'aléa sécurisé du navigateur, puis exportez-les comme texte. L'extracteur d'horodatage UUID v7 accessible par le lien lit l'instant de création intégré à un identifiant.",
  'pageText.611de2a2': "Qu'est-ce qu'un UUID ?",
  'pageText.e747103f':
    "Un UUID (Universally Unique Identifier) est un identifiant de 128 bits conçu pour être unique à l'échelle mondiale sans autorité centrale d'émission.",
  'pageText.5e3c112b': "Qu'est-ce qu'un UUID v4 ?",
  'pageText.7697e800':
    "Un UUID version 4 est généré aléatoirement. Il contient 122 bits aléatoires et 6 bits d'information sur la version et la variante.",
  'pageText.5e39d294': "Qu'est-ce qu'un UUID v7 ?",
  'pageText.66a6ed70':
    "Un UUID version 7 commence par un horodatage Unix de 48 bits en millisecondes et utilise 74 bits supplémentaires pour les données aléatoires. Les valeurs dont les horodatages encodés augmentent se trient chronologiquement, mais celles d'une même milliseconde sont aléatoires ; un recul de l'horloge système peut inverser l'ordre de génération.",
  'pageText.7a44e8ee': 'Faut-il choisir UUID v4 ou v7 ?',
  'pageText.83965de1':
    "Choisissez v4 pour un identifiant aléatoire opaque. Choisissez v7 si la proximité temporelle et l'indexation chronologique en base de données sont utiles. Aucune des deux versions ne doit être considérée comme un secret.",
  'pageText.9a6b439e': 'Les UUID générés utilisent-ils un aléa cryptographique ?',
  'pageText.4a129bc3':
    "L'API cryptographique du navigateur fournit les 122 bits aléatoires d'UUID v4 et les 74 bits aléatoires du contenu d'UUID v7. UUID v7 expose aussi sa milliseconde de création : les UUID sont donc des identifiants, pas des mots de passe ou des jetons.",
  'pageText.35cc78ac': "Ce que fait ce générateur d'UUID v4 et v7",
  'pageText.361a3991':
    "Ce générateur crée des UUID version 4 ou 7 conformes à la RFC 9562, entièrement dans le navigateur. La version 4 utilise 122 bits d'aléa cryptographique. La version 7 stocke la milliseconde Unix actuelle dans ses 48 premiers bits et remplit les 74 bits de contenu restants avec crypto.getRandomValues(). Les deux définissent les champs de version et de variante de la RFC et utilisent la disposition hexadécimale canonique 8-4-4-4-12.",
  'pageText.cf240c55': 'Générer des UUID en JavaScript et Python',
  'pageText.6ef9489b':
    'JavaScript crypto.randomUUID() crée un UUID v4 dans les contextes sécurisés du navigateur. Python uuid.uuid4() crée également des identifiants v4 ; uuid.uuid7() est disponible dans la bibliothèque standard à partir de Python 3.14. Les exemples ci-dessous vérifient la prise en charge de v7 par Python au lieu de supposer sa disponibilité.',
  'pageText.42f8fbc7':
    "Différents générateurs d'UUID v7 peuvent employer des méthodes différentes pour ordonner les identifiants dans une milliseconde. Cet outil utilise une partie finale aléatoire, tandis que l'implémentation Python utilise un compteur. Conservez une contrainte d'unicité en base de données et n'utilisez pas un identifiant comme justificatif d'autorisation.",
  'pageText.3368e346': 'Choisir v4 ou v7',
  'pageText.5b192e0e':
    "Utilisez UUID v4 pour un identifiant aléatoire opaque sans horodatage. Utilisez UUID v7 pour regrouper chronologiquement les enregistrements par milliseconde de création, ce qui peut améliorer la localité des index par rapport aux valeurs v4 aléatoires. L'ordre suit l'horloge encodée : les parties finales aléatoires d'une même milliseconde ne sont pas strictement ordonnées, et un recul de l'horloge système peut inverser l'ordre de génération.",
  'pageText.19989f5d': 'Mise en forme et export par lots',
  'pageText.d012108b':
    "Générez de 1 à 1 000 valeurs, mettez les lettres hexadécimales en majuscules, retirez les tirets ou entourez chaque valeur d'accolades pour les usages orientés GUID. Copiez le résultat séparé par des sauts de ligne ou téléchargez le même lot dans un fichier texte UTF-8.",
  'pageText.4c38dc5a':
    "Créez des identifiants de base de données ou d'application sans coordonner un compteur central.",
  'pageText.ce17c126':
    "Remplissez des données de test, des réponses d'API simulées et des exemples d'enregistrements.",
  'pageText.138b9843':
    'Ajoutez des identifiants de corrélation aux requêtes, tâches, journaux ou messages.',
  'pageText.5d4cb8de':
    'Préparez de petits lots pour les imports, prototypes et développements locaux.',
  'pageText.1193c111': 'Exemples de format',
  'pageText.d40026dd':
    'Un résultat v4 peut ressembler à 3f2504e0-4f89-41d3-9a0c-0305e82c3301 ; un résultat v7 a 7 comme demi-octet de version, par exemple 0190b0cc-4f71-7a8e-9c9a-6a74fbb21a92. Les options de majuscules, suppression des tirets et accolades modifient uniquement la présentation ; les analyseurs en aval peuvent exiger la forme canonique en minuscules avec tirets.',
  'pageText.9dbfc526':
    "L'unicité des UUID est probabiliste : ce générateur ne consulte aucun registre et ne garantit pas l'unicité. UUID v7 expose sa milliseconde de création, suppose une horloge système sans recul pour le tri dans l'ordre de génération, et les valeurs aléatoires créées dans une milliseconde ne sont pas strictement monotones. Un UUID est un identifiant, pas automatiquement un mot de passe, une clé d'API ou un jeton de session. La génération est locale dans le navigateur ; ce que vous copiez, collez, téléchargez, transmettez ou stockez dépend de la destination choisie.",
  'pageText.7a6710aa': 'Quelle robustesse choisir pour mon mot de passe ?',
  'pageText.9be86c1e':
    "Privilégiez un mot de passe unique généré et stocké par un gestionnaire de mots de passe. Au moins seize caractères aléatoires issus d'un ensemble large, ou une phrase de passe aléatoire d'au moins six mots, constituent une base pratique si le service les accepte ; les exigences propres à chaque compte peuvent différer.",
  'pageText.0f3affb1': "Comment l'aléa est-il généré ?",
  'pageText.e7090e3e':
    'Le générateur utilise crypto.getRandomValues avec échantillonnage par rejet, et non Math.random. Le mode caractères aléatoires inclut au moins un caractère de chaque ensemble choisi lorsque la longueur demandée le permet, puis mélange le résultat de façon sécurisée.',
  'pageText.db182e45': 'Les mots de passe générés sont-ils envoyés ou enregistrés ?',
  'pageText.7daed653':
    "Non. La génération et l'estimation de l'entropie s'effectuent localement, et l'application n'enregistre pas la valeur générée. La copie peut toutefois l'inscrire dans l'historique du presse-papiers du système, les extensions peuvent observer le contenu de la page et les appareils partagés demandent une attention particulière.",
  'pageText.8c8e3b19': 'Comment fonctionne la génération sécurisée de mots de passe',
  'pageText.567ac86d':
    "Le mode caractères aléatoires tire dans les ensembles activés de minuscules, majuscules, chiffres et symboles avec le générateur cryptographique de nombres aléatoires du navigateur. L'échantillonnage par rejet évite le biais de modulo. Le mode phrase de passe sélectionne chaque mot indépendamment dans la liste longue de l'EFF et prend en charge six à douze mots avec un séparateur choisi.",
  'pageText.296f3bc2': 'Choisir un mot de passe ou une phrase de passe',
  'pageText.926afe7a':
    "Utilisez une valeur unique pour chaque compte ; la réutilisation d'un mot de passe transforme une fuite en accès à plusieurs services.",
  'pageText.f3d81905':
    'Privilégiez la valeur la plus longue que le service accepte de façon fiable. La longueur compte généralement plus que des substitutions prévisibles comme remplacer a par @.',
  'pageText.01bfc425':
    "Utilisez le mode phrase de passe pour une valeur à saisir ou à lire à voix haute, et le mode caractères aléatoires lorsqu'un gestionnaire de mots de passe la stockera et la remplira.",
  'pageText.27fbadfc':
    "Activez l'authentification multifacteur lorsqu'elle est disponible, surtout pour les comptes de courriel, financiers, cloud et administrateur.",
  'pageText.1bede603': "Estimation de l'entropie et limites de confidentialité",
  'pageText.23ca65c7':
    "L'entropie affichée est une estimation théorique fondée sur des choix uniformes indépendants dans l'ensemble de caractères ou la liste de mots. Elle ne promet aucun délai de cassage et ne tient pas compte d'une compromission du navigateur, de l'appareil, du presse-papiers, du gestionnaire de mots de passe, du service destinataire ou de la procédure de récupération. Le générateur ne compare pas les mots de passe aux bases de données de fuites, car cela nécessiterait une conception distincte de recherche respectant la confidentialité.",
  'pageText.293386a3': "Qu'est-ce que Lorem Ipsum ?",
  'pageText.e7e9a310':
    "Lorem ipsum est un texte de remplacement d'apparence latine utilisé en graphisme, conception web et édition pour remplir l'espace avant que le vrai contenu soit disponible.",
  'pageText.fc868312': 'Pourquoi utiliser Lorem Ipsum ?',
  'pageText.fc0c8095':
    'Son mélange naturel de mots courts et longs montre comment une mise en page traite du texte réel, sans distraire les lecteurs par son contenu.',
  'pageText.fc9ee235': 'Que signifie lorem ipsum ?',
  'pageText.42643988':
    'Tel qu\'il est écrit, rien. C\'est un extrait remanié du De finibus bonorum et malorum de Cicéron, où "dolorem ipsum" signifie "la douleur elle-même". Des mots ont été coupés et modifiés, ce qui explique pourquoi "Lorem" n\'est pas un véritable mot latin.',
  'pageText.864e8e98': 'Quelle est la longueur de chaque paragraphe généré ?',
  'pageText.da65818f':
    'Chaque paragraphe contient 3 à 7 phrases de 5 à 15 mots chacune, soit environ 15 à 105 mots par paragraphe. Utilisez le mode mots pour obtenir un nombre exact de mots.',
  'pageText.e4695071': 'Puis-je générer du lorem ipsum avec des balises HTML ?',
  'pageText.a44e126f':
    'La sortie est du texte brut, avec une ligne vide entre les paragraphes. Entourez vous-même chaque paragraphe de balises <p> lorsque vous le collez dans du HTML.',
  'pageText.2fc5f8d2': 'Origine du lorem ipsum',
  'pageText.372fc06e':
    "Lorem ipsum vient du De finibus bonorum et malorum, un traité d'éthique écrit par Cicéron en 45 av. J.-C. Le début bien connu, Lorem ipsum dolor sit amet, consectetur adipiscing elit, provient d'un passage commençant par Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Des mots ont été coupés, modifiés et réordonnés : le résultat ressemble au latin, mais ne signifie rien. Les typographes et designers utilisent ses variantes comme texte de remplacement depuis des décennies, car elles offrent un rythme réaliste de longueurs de mots sans contenu significatif.",
  'pageText.50efd43e': 'Comment ce générateur construit le texte',
  'pageText.78c6a4d6':
    "Les mots sont tirés aléatoirement d'une liste fixe de vocabulaire lorem ipsum ; chaque clic sur Générer produit donc un résultat différent.",
  'pageText.cdfdd915':
    'Les phrases ont 5 à 15 mots, commencent par une majuscule et se terminent par un point.',
  'pageText.8a5faad3': 'Les paragraphes ont 3 à 7 phrases et sont séparés par une ligne vide.',
  'pageText.5b9b38b3':
    'Lorsque Commencer par "Lorem ipsum..." est activé, les sorties en paragraphes et phrases commencent par Lorem ipsum dolor sit amet, consectetur adipiscing elit., et la sortie en mots par Lorem ipsum.',
  'pageText.d069a303':
    'Le mode mots renvoie exactement le nombre de mots demandé, séparés par des espaces, sans ponctuation.',
  'pageText.cfa7bbd6':
    'Les totaux de mots, caractères, phrases et paragraphes sont affichés sous le résultat.',
  'pageText.5fc47ebf': 'Bien utiliser le texte de remplacement',
  'pageText.3a4e06f6':
    "Lorem ipsum permet de vérifier la longueur des lignes, les retours à la ligne et le rythme vertical, mais masque des problèmes que le contenu réel révèle. Avant la livraison d'une maquette :",
  'pageText.039ee6ef':
    "Testez avec du texte réaliste, notamment le titre, le nom ou l'intitulé de produit le plus long attendu.",
  'pageText.d1b357c8':
    "Vérifiez les traductions : les textes allemand ou finnois sont souvent plus longs que l'anglais, et les textes chinois ou japonais se répartissent différemment sur les lignes.",
  'pageText.016f7d53':
    "Recherchez lorem et ipsum dans le code avant la publication pour éviter que le texte de remplacement n'arrive en production.",
  'pageText.e449bc7c':
    "N'utilisez pas de lorem ipsum dans les textes alternatifs ou les noms accessibles ; les lecteurs d'écran le liront à voix haute.",
  'pageText.2baf95ba':
    "Pour des maquettes riches en données, comme des tableaux d'utilisateurs ou des fiches produits, générez plutôt de faux enregistrements réalistes avec un générateur de données simulées. Lorem ipsum ne teste ni les noms, nombres, dates ni les longues chaînes sans coupure comme les URL.",
  'pageText.7ef81d93': "Qu'est-ce qu'un QR code ?",
  'pageText.95dfb03e':
    'Un QR code (Quick Response) est un code-barres à deux dimensions contenant du texte, par exemple une URL, une fiche de contact ou une configuration Wi-Fi. Les appareils photo de téléphones et les applications de lecture le décodent et proposent une action, comme ouvrir le lien.',
  'pageText.94540be7': 'Quelles données puis-je encoder ?',
  'pageText.62ffa087':
    'Tout texte. Les préréglages remplissent les formats standard pour les URL, courriels (mailto:), téléphones (tel:), SMS (sms:), Wi-Fi (WIFI:) et contacts vCard, que les téléphones reconnaissent et utilisent.',
  'pageText.a6c7c2f4': 'Ces QR codes expirent-ils ?',
  'pageText.6544ed40':
    'Non. Ce sont des codes statiques : le contenu est stocké dans le motif lui-même, sans service de redirection qui pourrait être désactivé. Un code contenant une URL fonctionne aussi longtemps que cette URL.',
  'pageText.d7525538': 'Puis-je suivre les lectures ou modifier le lien plus tard ?',
  'pageText.6fb75242':
    'Pas avec un code statique. Pour modifier la destination après impression, encodez une URL courte sur un domaine que vous contrôlez et modifiez sa redirection ; les journaux de votre serveur pourront alors compter les visites.',
  'pageText.3b2f43fc': 'Faut-il télécharger en PNG ou SVG ?',
  'pageText.034404ba':
    "Utilisez SVG pour l'impression et les créations à redimensionner : il s'agrandit sans flou. Utilisez PNG pour les documents, diapositives et outils qui n'acceptent pas SVG ; choisissez 1024 px si l'image doit être agrandie.",
  'pageText.229bdf99': 'Comment créer un QR code Wi-Fi ?',
  'pageText.072a9bd1':
    'Sélectionnez le préréglage WiFi et modifiez WIFI:T:WPA;S:MyNetwork;P:MyPassword;; — T est le type de sécurité (WPA, WEP ou nopass), S le nom du réseau et P le mot de passe. Échappez ; , : et \\ dans le nom ou le mot de passe avec une barre oblique inverse.',
  'pageText.af7b54ae': 'QR codes statiques sans expiration',
  'pageText.e1f656b0':
    'Ce générateur crée des QR codes statiques : votre contenu est encodé directement dans le motif, sans intermédiaire entre la lecture et la destination. Le code fonctionne tant que le contenu reste valide, et les lectures ne sont ni suivies ni comptées. En contrepartie, un code statique imprimé ne peut pas être modifié. Pour pouvoir changer de destination, dirigez le code vers une URL que vous contrôlez et gérez vous-même la redirection.',
  'pageText.49c87d45': 'Formats de contenu des préréglages',
  'pageText.9e3fedef':
    "URL : https://example.com. Incluez le schéma pour que les lecteurs l'interprètent comme un lien.",
  'pageText.dfb00b58':
    "Courriel : mailto:hello@example.com. Ajoutez ?subject=Hello pour préremplir l'objet.",
  'pageText.bd51c65e':
    'Téléphone : tel:+1234567890, au format international avec indicatif du pays.',
  'pageText.9df90887':
    'SMS : sms:+1234567890?body=Hello. La prise en charge du message prérempli varie selon les téléphones.',
  'pageText.3f10e94f':
    'Wi-Fi : WIFI:T:WPA;S:MyNetwork;P:MyPassword;; permet de rejoindre un réseau sans saisir le mot de passe.',
  'pageText.fb848228':
    'vCard : un bloc BEGIN:VCARD ... END:VCARD avec des champs comme FN, TEL et EMAIL enregistre un contact.',
  'pageText.0945d9b3': "Choisir la correction d'erreurs et la taille",
  'pageText.a73ec8ff':
    "La correction d'erreurs ajoute de la redondance pour permettre la lecture d'un code partiellement sale, abîmé ou couvert. Les quatre niveaux restaurent environ 7 % (L), 15 % (M, par défaut), 25 % (Q) ou 30 % (H) du symbole. Les niveaux plus élevés et les contenus plus longs produisent des codes plus denses avec davantage de petits modules, nécessitant une impression plus grande pour une lecture fiable. Le maximum absolu est de 2 953 octets au niveau L, mais les contenus courts se lisent beaucoup plus sûrement : gardez donc des URL brèves. Utilisez M pour les écrans et impressions propres, et Q ou H pour les étiquettes susceptibles d'être abîmées.",
  'pageText.d601415e': 'Couleurs, contraste et zone de silence',
  'pageText.21c831a0':
    "Les lecteurs attendent des modules sombres sur un fond clair avec un contraste fort ; évitez les premiers plans pâles et les codes clairs sur fond sombre, dits inversés, que certaines applications ne peuvent pas lire. L'image générée comprend une marge d'un module ; la spécification QR exige une zone de silence de quatre modules : laissez donc davantage d'espace uni autour du code dans une création chargée ou colorée. Testez le code final imprimé ou exporté avec plusieurs téléphones avant de le publier.",
  'pageText.b744dab3': "Qu'est-ce qu'un slug d'URL ?",
  'pageText.24831d41':
    "Un slug d'URL est la partie d'une URL qui identifie une page sous une forme lisible par l'humain. Par exemple, dans /blog/my-first-post, \"my-first-post\" est le slug.",
  'pageText.afaa82d8': 'Pourquoi les slugs sont-ils importants pour le référencement ?',
  'pageText.a7281b59':
    'Les slugs adaptés au référencement aident les moteurs de recherche à comprendre votre contenu et améliorent le taux de clics en indiquant aux utilisateurs le sujet de la page.',
  'pageText.95ac698b': 'Quels types de dégradés sont pris en charge ?',
  'pageText.1f3e5ff6':
    'Cet outil prend en charge les dégradés linéaires avec angles personnalisables et les dégradés radiaux de forme circulaire ou elliptique.',
  'pageText.6593c0c4': 'Puis-je exporter le dégradé comme image ?',
  'pageText.09d7598c':
    'Oui ! Vous pouvez télécharger le dégradé comme image PNG, en plus de copier le code CSS.',
  'pageText.be1336e0': 'Que sont les balises de métadonnées ?',
  'pageText.406252f6':
    "Les balises de métadonnées sont des éléments HTML qui fournissent des métadonnées sur une page web. Elles aident les moteurs de recherche à comprendre votre contenu et contrôlent l'apparence de la page dans les résultats de recherche.",
  'pageText.a60cca39': 'Que sont les balises Open Graph ?',
  'pageText.f806060d':
    "Les balises Open Graph contrôlent l'apparence de votre contenu lorsqu'il est partagé sur des plateformes sociales comme Facebook, LinkedIn et d'autres.",
  'pageText.3c5f494e': 'Comment fonctionnent plusieurs couches de box-shadow ?',
  'pageText.0f2afa64':
    "CSS box-shadow accepte des définitions d'ombres séparées par des virgules. Les couches déclarées au début de la liste sont affichées au-dessus de celles déclarées ensuite.",
  'pageText.a5cd6aad': "Qu'est-ce que le glassmorphism en CSS ?",
  'pageText.00c0cd52':
    'Le glassmorphism associe des couleurs de fond semi-transparentes, backdrop-filter: blur() et de fines bordures claires pour imiter du verre dépoli.',
  'pageText.b6a562cf': "Quels sont les cinq éléments d'une expression cron standard ?",
  'pageText.4cdd4865':
    'Une expression cron standard comporte cinq champs : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-6, où 0 est dimanche).',
  'pageText.f069ffbc': 'Que signifie */15 dans cron ?',
  'pageText.44fd98aa':
    'La valeur de pas */15 dans le champ minute signifie "toutes les 15 minutes", par exemple à :00, :15, :30 et :45.',
  'pageText.adadf25c': 'Quels types de données simulées puis-je générer ?',
  'pageText.4b6a1433':
    'Vous pouvez générer des enregistrements fictifs réalistes pour des utilisateurs (noms, courriels, téléphones, rôles), produits (SKU, prix, notes), commandes (devises, statuts), entreprises et articles de blog.',
  'pageText.a0f6807f': 'Puis-je télécharger les données simulées générées ?',
  'pageText.5a2779c7':
    'Oui, vous pouvez copier le JSON directement dans le presse-papiers ou le télécharger comme fichier .json en un clic.',
  'pageText.a82a3ba7': 'Quelles tailles sont générées ?',
  'pageText.6ab32280':
    "L'outil génère des icônes PNG de 16x16 (onglet standard), 32x32 (onglet Retina), 48x48 (raccourci de bureau), 180x180 (icône Apple Touch iOS), 192x192 (application Android) et 512x512 (écran de démarrage PWA).",
  'pageText.1a11e506': 'Mes images importées sont-elles envoyées à un serveur ?',
  'pageText.631bc8d7':
    "Non. Tous les redimensionnements et rendus d'images s'effectuent côté client avec le Canvas HTML5 du navigateur. Vos images ne quittent jamais votre ordinateur.",
  'pageText.6016f5b9': 'Quels modèles sont inclus dans ce générateur .gitignore ?',
  'pageText.9a2e6ae1':
    'Le générateur comprend les règles standard pour Node.js/TypeScript, Python, Go, Rust, Java/Gradle/Maven, React/Next.js/Vite, Vue/Nuxt, macOS (.DS_Store), Windows, Linux, VSCode et les IDE JetBrains.',
  'pageText.26b1e47a': "Puis-je ajouter des motifs d'exclusion personnalisés ?",
  'pageText.b9bb3e9f':
    "Oui, vous pouvez écrire des lignes de règles personnalisées dans l'éditeur ; elles seront automatiquement combinées avec les modèles de plateformes sélectionnés.",
  'pageText.99c478a9': 'Comment les formes organiques CSS fonctionnent-elles sans SVG ?',
  'pageText.330806ef':
    'Les formes organiques CSS utilisent la syntaxe à huit valeurs de border-radius (rayons horizontaux / rayons verticaux) pour créer des formes courbes asymétriques uniquement en CSS.',
  'pageText.4f7db90d':
    'Puis-je télécharger la forme comme graphique vectoriel redimensionnable (SVG) ?',
  'pageText.cd8236b5':
    'Oui, vous pouvez copier le balisage vectoriel SVG brut ou télécharger la forme dans un fichier .svg autonome.',
  'pageText.15c7f36d':
    "Cet outil prend-il en charge l'alignement des colonnes à gauche, au centre et à droite ?",
  'pageText.1f6c30ea':
    "Oui. Vous pouvez modifier séparément l'alignement du texte de chaque colonne (:---, :---:, ---:) avec les boutons situés au-dessus de celle-ci.",
  'pageText.17171603': 'Puis-je ajouter ou retirer des lignes et colonnes dynamiquement ?',
  'pageText.81d98d62':
    'Oui, cliquez sur les boutons "+ Ajouter une colonne" ou "+ Ajouter une ligne" pour agrandir le tableau, ou utilisez les icônes de corbeille pour retirer des lignes et colonnes précises.',
  'pageText.a3b7c9aa': "Pourquoi utiliser des images d'attente SVG plutôt que des URL externes ?",
  'pageText.36e2f853':
    "Les images d'attente SVG ne nécessitent aucune requête réseau HTTP, se chargent instantanément hors ligne et sont des URI de données légères, d'environ 300 octets, intégrées directement dans le HTML/CSS.",
  'pageText.98afe7f8': "Puis-je personnaliser le texte dans l'image ?",
  'pageText.7156e33f':
    'Oui. Vous pouvez indiquer tout texte personnalisé, par exemple "Bannière principale" ou "Avatar 128x128", ou le laisser vide pour afficher automatiquement les dimensions.',
  'pageText.0ddadffc':
    'Puis-je utiliser les bannières ASCII générées dans des fichiers README GitHub ?',
  'pageText.fa3ae5eb':
    "Oui. Entourez la sortie d'un bloc de code Markdown (```) dans votre README.md pour garantir un alignement à chasse fixe dans tous les navigateurs.",
  'pageText.92b39fd3': 'Quels styles de police sont pris en charge ?',
  'pageText.d1c00c5d':
    "L'ASCII classique standard (barres obliques, barres verticales, traits de soulignement) et les blocs pleins Unicode modernes (█) pour un rendu net.",
  'pageText.a19cad93': "Pourquoi choisir ULID ou UUID v7 plutôt qu'UUID v4 ?",
  'pageText.f6c311f2':
    'Contrairement à UUID v4 aléatoire, ULID et UUID v7 commencent par un horodatage en millisecondes, ce qui évite la fragmentation des index B-Tree et accélère nettement les opérations INSERT en base de données.',
  'pageText.dbf5188e': 'Les ULID générés évitent-ils les collisions ?',
  'pageText.e4c22fd6':
    "Oui. Chaque ULID contient 80 bits d'aléa cryptographique en plus d'un horodatage de 48 bits, ce qui rend la probabilité de collision pratiquement nulle.",
  'pageText.434b3c01': 'Comment les niveaux de teinte sont-ils calculés ?',
  'pageText.fef3b562':
    "Le générateur ajuste les courbes de luminosité HSL pour suivre la répartition standard de Tailwind CSS, de 50 à environ 96 % de luminosité jusqu'à 950 à environ 6 %.",
  'pageText.6fd82787': 'Quelles notations sont disponibles ?',
  'pageText.64f57bec':
    'Deux-points standard (00:1A:2B:3C:4D:5E), tirets (00-1A-2B-3C-4D-5E), points Cisco (001a.2b3c.4d5e) et hexadécimal brut sans séparation.',
  'pageText.0665d60c': 'Pourquoi retirer les données EXIF ?',
  'pageText.4514458b':
    "Les photos prises avec des smartphones contiennent souvent des coordonnées GPS précises et des identifiants d'appareil qui exposent votre vie privée lorsqu'elles sont partagées publiquement.",
  'pageText.42405f57': "Retirer les EXIF réduit-il la qualité de l'image ?",
  'pageText.4d60a474':
    "Non, seules les métadonnées sont retirées ; les pixels de l'image restent intacts.",
  'pageText.21ef5814': "Comment vérifier la somme de contrôle d'un fichier téléchargé ?",
  'pageText.224c058f':
    "Sélectionnez le fichier et collez la somme de contrôle attendue complète obtenue auprès de l'éditeur ou d'une autre source indépendante fiable. Attendez la fin du hachage, puis examinez le résultat de concordance ou de différence.",
  'pageText.ae63ea0f': 'Mon fichier est-il envoyé à un serveur ?',
  'pageText.eebc3c64':
    'Les fichiers sélectionnés sont lus localement dans la mémoire du navigateur et ne sont pas envoyés pour ce calcul. SHA-1, SHA-256, SHA-384 et SHA-512 utilisent Web Crypto ; MD5 et CRC32 utilisent des implémentations JavaScript.',
  'pageText.0096052f':
    'Une somme de contrôle concordante signifie-t-elle que le fichier est sûr ou authentique ?',
  'pageText.85e0eb7f':
    "Une concordance signifie que la somme calculée correspond à la valeur attendue. Elle ne prouve pas que le fichier est inoffensif et n'authentifie pas son éditeur. Obtenez la somme attendue auprès d'une source indépendante fiable. MD5 et SHA-1 sont vulnérables aux collisions, et CRC32 n'est pas cryptographique ; privilégiez SHA-256 pour vérifier l'intégrité.",
  'pageText.e7ddf90b': 'Puis-je hacher de très gros fichiers dans le navigateur ?',
  'pageText.5a7687ac':
    "Le fichier sélectionné est lu intégralement en mémoire. La mémoire disponible et les performances de l'appareil limitent donc sa taille pratique. Pour les gros téléchargements, utilisez un outil local de somme de contrôle en terminal ou l'exemple Python par blocs du guide de vérification SHA-256.",
  'pageText.36576d77': 'Reproduire une comparaison de somme de contrôle de abc',
  'pageText.c0f11add':
    "Choisissez Charger l'exemple abc pour hacher exactement les trois octets UTF-8 abc, sans espaces ni saut de ligne final. Vous pouvez aussi sélectionner un fichier texte local contenant exactement ces octets.",
  'pageText.45f16187':
    'La somme SHA-256 est ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. Collez cette valeur complète dans le champ de somme attendue pour obtenir une concordance. Modifiez un chiffre hexadécimal pour obtenir une différence une fois le hachage terminé.',
  'pageText.38407fa7':
    'La même entrée produit MD5 900150983cd24fb0d6963f7d28e17f72 et CRC32 352441c2. Les résultats comprennent aussi SHA-1, SHA-384 et SHA-512. Un saut de ligne ou un autre encodage modifie les octets et leurs sommes de contrôle.',
  'pageText.a8f9e0fa': "Qu'est-ce que MD5 ?",
  'pageText.197bb98c':
    'MD5 (Message Digest 5) est une fonction de hachage cryptographique qui produit une empreinte de 128 bits (16 octets).',
  'pageText.380ae33f': 'MD5 est-il sûr ?',
  'pageText.200b2951':
    "MD5 n'est plus considéré comme sûr pour les usages cryptographiques, mais reste utile pour les sommes de contrôle et les applications sans exigences critiques de sécurité.",
  'pageText.eb024fef': 'Une empreinte MD5 peut-elle être reconvertie en texte ?',
  'pageText.f3a4be7f':
    'Non. MD5 est un hachage à sens unique, pas un chiffrement réversible. Les services présentés comme des décodeurs MD5 devinent généralement les entrées probables et comparent leurs empreintes ; cet outil génère des empreintes et ne fait pas de recherche inverse.',
  'pageText.de23ad8f': "Que fait ce générateur d'empreintes MD5 ?",
  'pageText.71308743':
    "Ce générateur d'empreintes MD5 transforme du texte ou un fichier sélectionné en l'empreinte de message de 128 bits définie par la RFC 1321, affichée comme 32 caractères hexadécimaux. Le texte est converti en octets UTF-8 ; le mode fichier hache les octets du fichier. Minuscules et majuscules sont deux présentations de la même empreinte. Le calcul s'effectue dans le navigateur, sans envoi à un serveur pour le hachage.",
  'pageText.e043d2b7': 'Exemple MD5 et somme de contrôle de fichier',
  'pageText.00f057ca':
    "Pour l'entrée exacte de trois caractères abc, sans guillemets, espaces ni saut de ligne final, le résultat est 900150983cd24fb0d6963f7d28e17f72. La RFC 1321 publie ce vecteur de test. L'affichage en majuscules modifie uniquement la représentation, pas les bits de l'empreinte.",
  'pageText.294638f4':
    "Pour une somme de contrôle de fichier, sélectionnez un fichier et comparez les 32 caractères hexadécimaux à une valeur attendue. Une différence prouve que ses octets diffèrent de ceux utilisés pour l'empreinte attendue. Une concordance peut aider à détecter les erreurs accidentelles, mais la source de la valeur attendue compte : une concordance MD5 ne prouve pas l'absence de substitution volontaire.",
  'pageText.bd0d278c': "Peut-on déchiffrer MD5, et quand l'utiliser ?",
  'pageText.0962ea5c':
    "Il s'agit d'un générateur MD5, pas d'un service de déchiffrement MD5 ou de recherche inverse d'empreintes. Le hachage n'est pas un chiffrement, et une empreinte de taille fixe ne contient pas de copie réversible de l'entrée. Pour tenter de retrouver une entrée, on propose généralement des valeurs candidates puis on calcule leurs empreintes pour les comparer.",
  'pageText.cf9f06aa':
    "La RFC 6151 indique que MD5 n'est plus acceptable lorsqu'une résistance aux collisions est nécessaire, notamment pour les signatures numériques. Ne vous fiez pas à MD5 pour détecter une altération volontaire. La RFC autorise une somme MD5 utilisée uniquement contre les erreurs, mais les applications doivent préciser le service de sécurité qu'elles en attendent, s'il y en a un.",
  'pageText.953bfb55':
    "Le calcul côté navigateur réduit la nécessité de transmettre du texte ou des fichiers pour les hacher, mais ne rend pas MD5 cryptographiquement sûr. Évitez de saisir des mots de passe ou d'autres secrets dans une page de hachage en ligne.",
  'pageText.101f9c75': "Qu'est-ce que SHA256 ?",
  'pageText.16259758':
    'SHA256 (Secure Hash Algorithm 256-bit) est une fonction de hachage cryptographique qui produit une empreinte de 256 bits (32 octets).',
  'pageText.9afb2ad2': 'SHA256 est-il sûr ?',
  'pageText.0af6e6d2':
    "SHA-256 reste adapté à de nombreux usages d'intégrité, mais une empreinte sans clé n'authentifie pas sa source et n'est pas une fonction de hachage de mots de passe. Utilisez une somme attendue fiable pour vérifier les fichiers et une fonction dédiée pour les mots de passe.",
  'pageText.c16f7e5d': 'Comment vérifier une somme de contrôle de fichier ?',
  'pageText.14edcc5a':
    "Sélectionnez le fichier et saisissez dans le champ de somme attendue une valeur SHA-256 de 64 caractères provenant d'une source indépendante fiable. L'outil indique si les empreintes générée et attendue concordent.",
  'pageText.7490e417': 'Une empreinte SHA-256 peut-elle être décodée en texte ?',
  'pageText.74338944':
    "Non. Le hachage SHA-256 n'est pas un chiffrement réversible : une empreinte ne peut donc pas être décodée pour récupérer son entrée d'origine. Cet outil génère et compare les valeurs SHA-256 ; il ne casse pas les mots de passe et ne recherche pas les empreintes à l'envers.",
  'pageText.cd1de6c5': 'Que fait ce générateur SHA-256 ?',
  'pageText.a17f5535':
    "Ce générateur SHA-256 calcule pour du texte ou un fichier sélectionné l'empreinte de message de 256 bits définie par NIST FIPS 180-4 et l'affiche sous forme de 64 caractères hexadécimaux. En mode texte, le navigateur convertit les caractères en octets UTF-8. Le mode fichier hache les octets sélectionnés. Minuscules et majuscules sont deux présentations de la même valeur.",
  'pageText.d7c2f3d3':
    "SHA-256 n'est pas réversible : une empreinte ne peut pas être décodée pour retrouver le texte ou le fichier d'origine. Saisissez du texte ou sélectionnez un fichier pour générer une empreinte ; comparez celle du fichier à une somme attendue fiable pour le vérifier.",
  'pageText.40dc4945': 'Exemple SHA-256 et vérification de fichier',
  'pageText.59582d9c':
    "Pour l'entrée exacte de trois caractères abc, sans guillemets, espaces ni saut de ligne final, le résultat est ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. Un saut de ligne, une casse différente ou un autre encodage modifie les octets d'entrée et produit un calcul différent.",
  'pageText.af255369':
    "Pour vérifier un fichier, générez sa valeur SHA-256 et saisissez l'empreinte attendue de 64 caractères obtenue auprès d'une source fiable. La comparaison indique une concordance ou une différence. Une différence prouve que les octets diffèrent de ceux utilisés pour l'empreinte attendue. Une concordance confirme la comparaison, mais la source de la valeur attendue reste importante.",
  'pageText.57ea438c': 'Calculer SHA-256 en JavaScript et Python',
  'pageText.2f2bbf6b':
    "La fonction digest de Web Crypto en JavaScript traite des octets. Utilisez TextEncoder pour le texte UTF-8 ou arrayBuffer() d'un File pour le contenu exact d'un fichier. L'exemple hache abc sous les deux formes et affiche la même empreinte dans la console. Dans le navigateur, digest() exige un contexte sécurisé et lit l'entrée en mémoire.",
  'pageText.a0a974f1':
    "Python hashlib peut mettre à jour une empreinte progressivement. L'exemple de fichier lit un download.zip existant en mode binaire, par blocs d'un mégaoctet. Remplacez le chemin par celui de votre fichier et comparez l'empreinte complète à la valeur attendue fiable.",
  'pageText.5379ecfa': 'Peut-on déchiffrer SHA-256, et que prouve-t-il ?',
  'pageText.43df41c5':
    "Il s'agit d'un générateur SHA-256, pas d'un service de déchiffrement ou de recherche inverse. Une empreinte condense l'entrée en un résultat fixe de 256 bits ; ce n'est pas une copie chiffrée ou sans perte qui peut être décodée vers l'original. Retrouver un original probable consiste à proposer des valeurs candidates puis à hacher chacune pour les comparer.",
  'pageText.139d7ac4':
    "FIPS 180-4 définit SHA-256 comme un algorithme de hachage sécurisé et décrit les empreintes comme des composants d'applications telles que les signatures numériques et l'authentification de messages avec clé. Ce générateur sans clé ne signe pas les données, n'authentifie pas un expéditeur et ne chiffre pas le contenu. Ne considérez pas une empreinte fournie avec un fichier non fiable comme une preuve indépendante de son origine.",
  'pageText.a06060d1':
    "Le hachage du texte et des fichiers s'effectue dans le navigateur et ne nécessite aucun envoi au serveur pour le calcul. Cette propriété de confidentialité ne transforme pas une empreinte en chiffrement ; évitez de saisir des secrets dans un utilitaire en ligne, sauf si son environnement d'exécution convient à vos données.",
  'pageText.51a1b9be': "Qu'est-ce que SHA512 ?",
  'pageText.84a4301e':
    'SHA512 (Secure Hash Algorithm 512-bit) est une fonction de hachage cryptographique qui produit une empreinte de 512 bits (64 octets), généralement affichée comme un nombre hexadécimal de 128 chiffres.',
  'pageText.790c6ec3': 'SHA512 est-il sûr ?',
  'pageText.6d855b6b':
    'Oui, SHA512 est actuellement considéré comme très sûr pour les usages cryptographiques et recommandé pour la plupart des applications.',
  'pageText.815e4dcd': "Qu'est-ce que HMAC ?",
  'pageText.ff3b2cf9':
    "HMAC est un code d'authentification de message avec clé qui associe une fonction de hachage cryptographique à un secret partagé pour vérifier l'intégrité et l'authenticité d'un message.",
  'pageText.09e2e0ba': 'HMAC est-il un chiffrement ?',
  'pageText.abec3974':
    "Non. HMAC ne cache pas le message. Il permet aux parties qui partagent un secret de détecter les modifications et d'authentifier sa source.",
  'pageText.3c4deb2f': 'Quels algorithmes et formats de sortie sont pris en charge ?',
  'pageText.b389a303':
    "L'outil prend en charge HMAC avec SHA-256, SHA-384 ou SHA-512, et affiche ou vérifie les signatures en hexadécimal ou en Base64 standard.",
  'pageText.8f405a3a': 'Générer et vérifier des signatures HMAC',
  'pageText.b25fc0c3':
    "Saisissez les octets exacts du message représentés par votre texte, un secret partagé, la variante SHA-2 attendue et l'encodage de la signature. Générer produit une signature ; Vérifier la recalcule avec les mêmes entrées et compare les octets décodés. Un saut de ligne, un encodage de caractères, un secret, un algorithme ou un encodage de sortie différent modifie le résultat.",
  'pageText.422f4458': 'Usages courants pour les webhooks et API',
  'pageText.f0d6dd20':
    "Reproduisez une signature de webhook pendant le débogage d'une intégration.",
  'pageText.d0483022':
    "Comparez un HMAC calculé localement à une signature provenant d'un expéditeur fiable.",
  'pageText.44fd46de':
    'Convertissez les mêmes octets HMAC entre les représentations hexadécimale et Base64.',
  'pageText.2cfc6b71':
    "Confirmez qu'une modification du message fait échouer la vérification de signature.",
  'pageText.843858f3': 'Limites de sécurité',
  'pageText.ab6a34ae':
    "HMAC exige un secret partagé robuste, transmis et stocké de façon sûre. Cet outil de navigateur est utile pour les données de test, mais les secrets de production doivent rester dans des environnements applicatifs contrôlés. HMAC authentifie les données ; il ne les chiffre pas et n'est pas une méthode de stockage de mots de passe. La vérification de signature est confiée à l'API Web Crypto du navigateur plutôt qu'à une comparaison des octets dans le JavaScript de l'application.",
  'pageText.cb69e8df': "Qu'est-ce que PKCE ?",
  'pageText.abc745c5':
    "PKCE est une extension OAuth qui lie une demande d'autorisation à un vérificateur de code secret détenu par le client, réduisant le risque d'interception du code d'autorisation.",
  'pageText.bb3fb7f1': 'Quelle méthode de challenge cet outil utilise-t-il ?',
  'pageText.334f8104':
    "Il utilise S256 : SHA-256 du vérificateur de code, encodé en Base64url sans remplissage. La méthode plain n'est volontairement pas générée.",
  'pageText.c069d885': 'Puis-je utiliser la valeur générée en production ?',
  'pageText.ddc8fb76':
    "Les valeurs utilisent l'aléa sécurisé du navigateur et des caractères PKCE valides, mais vous devez générer et conserver les vérificateurs de production dans le client OAuth qui réalisera l'échange de jetons.",
  'pageText.4c2764af': 'Comment la paire PKCE S256 est créée',
  'pageText.71336ec6':
    "Un client PKCE crée un vérificateur de code à forte entropie, hache sa valeur ASCII exacte avec SHA-256 et envoie le résultat Base64url sans remplissage comme challenge de code. La demande d'autorisation inclut code_challenge et code_challenge_method=S256. La demande de jeton ultérieure envoie le code_verifier d'origine pour que le serveur d'autorisation puisse dériver et comparer le même challenge.",
  'pageText.3d8fba00': 'Règles du vérificateur et vérification',
  'pageText.2aa00a1d':
    "Générer crée 43 à 128 caractères issus de l'ensemble de caractères non réservés de la RFC 7636, avec des octets aléatoires sécurisés et un échantillonnage par rejet.",
  'pageText.9cb7c772':
    'Dériver accepte un vérificateur existant uniquement si sa valeur complète respecte les règles de longueur et de caractères.',
  'pageText.ae7f5d42':
    'Vérifier dérive à nouveau S256 et le compare à un challenge Base64url de exactement 43 caractères.',
  'pageText.587e6e12':
    "Les espaces sont significatifs. Copiez le vérificateur exactement et conservez-le uniquement pour le flux d'autorisation correspondant.",
  'pageText.1fadc2f8':
    "PKCE empêche l'échange d'un code d'autorisation sans le vérificateur correspondant ; il ne remplace ni la validation de l'URI de redirection, les vérifications OAuth state ou OIDC nonce, TLS, le stockage sécurisé des jetons ou la validation du serveur d'autorisation. La génération et le hachage sont locaux dans ce navigateur, mais l'historique du presse-papiers, les extensions, les journaux ou un appareil partagé peuvent encore exposer les valeurs copiées.",
  'pageText.cc61fb43':
    'Pourquoi le même mot de passe produit-il une empreinte différente à chaque fois ?',
  'pageText.47fdbb41':
    'Bcrypt génère un nouveau sel aléatoire pour chaque empreinte et stocke le sel et le coût dans le résultat encodé. Des empreintes différentes peuvent donc vérifier le même mot de passe sans nécessiter une colonne distincte pour le sel.',
  'pageText.fd8efc8a': 'Que contrôle le coût bcrypt ?',
  'pageText.e24b8eb9':
    "Le coût est un facteur de travail en base deux. L'augmenter d'une unité double approximativement le travail de hachage. Choisissez le coût de production en mesurant votre propre infrastructure d'authentification plutôt qu'en copiant un temps mesuré dans le navigateur.",
  'pageText.c5646e46': 'Pourquoi les mots de passe de plus de 72 octets UTF-8 sont-ils rejetés ?',
  'pageText.35d8cc67':
    "Bcrypt ne traite que les 72 premiers octets. Rejeter les entrées plus longues empêche que deux mots de passe visiblement différents soient silencieusement considérés comme la même séquence d'octets tronquée.",
  'pageText.a3c91e25': 'Ce que font le générateur et le vérificateur bcrypt',
  'pageText.523e4066':
    'Générer crée un sel aléatoire, applique bcrypt avec le coût choisi et renvoie la chaîne modulaire standard contenant la version, le coût, le sel et la somme de contrôle. Vérifier lit ces paramètres dans une empreinte existante, effectue à nouveau bcrypt et indique si le mot de passe de test fourni correspond. Bcrypt est volontairement lent, contrairement aux hachages rapides de somme de contrôle comme MD5 ou SHA-256.',
  'pageText.52fbc8aa': 'Coût, sel et limite de 72 octets',
  'pageText.a94e797a':
    "L'interface propose des coûts adaptés au navigateur, de 8 à 14 ; les valeurs élevées peuvent demander nettement plus de temps sur des appareils lents.",
  'pageText.3541abdb':
    "Chaque empreinte générée utilise un nouveau sel issu d'un aléa cryptographique ; des générations répétées ne doivent donc pas renvoyer des chaînes identiques.",
  'pageText.8bd98451':
    "Il faut stocker l'empreinte encodée complète. Son sel et son coût sont déjà intégrés et utilisés automatiquement lors de la vérification.",
  'pageText.107d624e':
    "L'outil compte les octets UTF-8 plutôt que les caractères JavaScript et rejette les valeurs dépassant la limite de traitement de 72 octets de bcrypt.",
  'pageText.4b0c23bf': "Limites d'utilisation sûre",
  'pageText.e9f75848':
    "Utilisez cette page avec des données fictives de développement ou de contrôle qualité. Le hachage des mots de passe en production doit appartenir à un flux d'authentification fiable côté serveur avec limitation de débit, transport sécurisé, surveillance des fuites et stratégie de mise à niveau documentée. Une comparaison réussie prouve seulement qu'un mot de passe correspond à une empreinte encodée ; elle n'évalue ni sa robustesse, la sécurité du compte ou l'adéquation du coût choisi à vos serveurs.",
  'pageText.10893cde': 'Traitement local et compatibilité',
  'pageText.0f1e91b6':
    "L'implémentation bcrypt n'est chargée qu'au démarrage d'une opération ; le hachage ou la comparaison s'effectue dans ce navigateur. Le vérificateur accepte les formes standard $2a$, $2b$ et $2y$ dans la limite de coût. Les gestionnaires de presse-papiers, extensions, partages d'écran ou appareils déjà compromis peuvent encore exposer les valeurs : ne collez donc pas de véritables identifiants d'utilisateurs.",
  'pageText.dfdb1834': "Le décodage prouve-t-il qu'un certificat est fiable ?",
  'pageText.54a44265':
    "Non. L'analyse montre les champs encodés et peut tester la vérification d'un certificat avec sa propre clé publique. La confiance exige aussi une chaîne valide vers une racine acceptée, des vérifications d'usage et de nom, de politique et de temps, et souvent des preuves de révocation ou de transparence.",
  'pageText.5cbb68de': 'Puis-je coller une chaîne complète de certificats PEM ?',
  'pageText.99a5e254':
    "Oui. L'outil extrait et décode jusqu'à dix blocs CERTIFICATE dans l'ordre d'entrée. Il ne les réordonne pas et ne prouve pas que chaque certificat a signé le suivant.",
  'pageText.00fb6a40': 'Les clés privées sont-elles acceptées ?',
  'pageText.339287f5':
    "Non. L'entrée accepte les blocs PEM CERTIFICATE ou les certificats DER encodés en Base64. Les textes de clés privées et de demandes de certificat sont rejetés ; ne collez pas de clés privées dans des outils de navigateur.",
  'pageText.eac22252': "Champs extraits d'un certificat X.509",
  'pageText.27c40514':
    "Le décodeur lit l'ASN.1 DER transporté directement en Base64 ou entre les délimiteurs PEM de la RFC 7468. Il indique les noms distinctifs du sujet et de l'émetteur, le numéro de série, les dates de début et de fin de validité, les algorithmes de signature et de clé publique, les noms alternatifs du sujet pris en charge, les OID des extensions, la taille en octets et une empreinte SHA-256 des octets exacts du certificat.",
  'pageText.6739d969': 'Validité et auto-signature sont des vérifications limitées',
  'pageText.020adbca':
    "Actuellement valide signifie que l'horloge du navigateur est comprise entre notBefore et notAfter ; cela n'établit ni la confiance ni l'usage prévu.",
  'pageText.d1665ea2':
    "Auto-émis signifie que les noms du sujet et de l'émetteur concordent ; cryptographiquement auto-signé exige en plus que la signature soit vérifiée avec la clé publique du certificat.",
  'pageText.75c63764':
    "Une fonctionnalité cryptographique non prise en charge par le navigateur peut laisser l'auto-signature indéterminée même si la structure du certificat est décodée.",
  'pageText.7a7b0159':
    "Une empreinte SHA-256 identifie les octets DER exacts pour comparaison ; elle ne devient un indice de confiance que lorsqu'elle provient d'un canal indépendant fiable.",
  'pageText.087c5028': "Vérifications qui restent du ressort d'un validateur TLS ou PKI",
  'pageText.08a73601':
    "Cette page ne construit pas de chaîne vers les racines du système ou du navigateur, ne récupère pas les certificats intermédiaires, ne vérifie pas les usages de clé ou les politiques pour un usage précis, ne compare pas les noms d'hôte, n'interroge pas OCSP ou les CRL, n'examine pas les journaux Certificate Transparency et ne se connecte pas à un serveur. Ces décisions exigent le magasin de confiance, le contexte de connexion et la politique de validation du véritable client.",
  'pageText.314bab46': "Qu'est-ce que BIP-39 ?",
  'pageText.9fba1f54':
    "BIP-39 (Bitcoin Improvement Proposal 39) décrit l'utilisation d'une phrase mnémonique, un groupe de mots faciles à retenir, pour générer des portefeuilles cryptographiques déterministes.",
  'pageText.bc10db69': 'Est-il sûr de générer des phrases de récupération ici ?',
  'pageText.6f73837c':
    "La génération et le calcul d'entropie utilisent window.crypto.getRandomValues() et s'effectuent entièrement dans votre navigateur. Aucune phrase de récupération n'est transmise sur le réseau.",
  'pageText.6d97a1a7': 'Les clés privées sont-elles envoyées à votre serveur ?',
  'pageText.791c3f3c':
    'Non. Les paires de clés sont générées avec window.crypto.subtle directement sur votre appareil. Les clés privées ne quittent jamais votre navigateur.',
  'pageText.4cc18af6': 'Dans quel format les clés sont-elles exportées ?',
  'pageText.26a068ea':
    'Les clés publiques sont exportées au format SPKI PEM (-----BEGIN PUBLIC KEY-----) et les clés privées au format PKCS#8 PEM (-----BEGIN PRIVATE KEY-----).',
  'pageText.14b643ed': 'Quel algorithme est recommandé pour un .htpasswd en production ?',
  'pageText.e63436c8':
    'Bcrypt ($2y$) est fortement recommandé pour les environnements de production, car il offre une protection robuste contre les attaques par force brute et par dictionnaire.',
  'pageText.438a3aaa': 'Mon mot de passe en clair est-il envoyé à un serveur ?',
  'pageText.71f70564':
    "Non. Le hachage s'effectue entièrement dans votre navigateur avec l'API Web Crypto. Vos mots de passe ne passent jamais par un serveur.",
  'pageText.c83dd430':
    'Comment fonctionne le mot de passe à usage unique basé sur le temps (TOTP) ?',
  'pageText.682b1360':
    "TOTP (RFC 6238) calcule un code de vérification à six chiffres à partir d'une signature HMAC-SHA1 utilisant un secret Base32 partagé et l'intervalle actuel de 30 secondes du temps Unix.",
  'pageText.2c69c124': 'Est-ce compatible avec Google Authenticator, Authy et 1Password ?',
  'pageText.9e7b7687':
    'Oui, les clés secrètes et URI otpauth:// générées respectent le standard ouvert pris en charge par Google Authenticator, Microsoft Authenticator, 1Password et Bitwarden.',
  'pageText.84c27538': 'Est-il sûr de tester des mots de passe dans ce vérificateur ?',
  'pageText.004d56b7':
    "Oui. Toute la vérification cryptographique s'effectue localement dans votre navigateur. Aucun mot de passe en clair ni aucune empreinte n'est transmis à un serveur.",
  'pageText.a32149fa': 'Quelles versions de Bcrypt sont prises en charge ?',
  'pageText.c4c394d4':
    'Les chaînes Bcrypt standard au format Modular Crypt Format sont prises en charge, notamment les préfixes $2a$, $2b$ et $2y$, avec tout facteur de coût de 4 à 31.',
  'pageText.78492a05': 'Quels algorithmes de signature HMAC sont pris en charge ?',
  'pageText.3bff48a8':
    "HS256 (HMAC-SHA256), HS384 (HMAC-SHA384) et HS512 (HMAC-SHA512) sont pris en charge par l'API Web Cryptography native du navigateur.",
  'pageText.59a40ee3': 'Mes secrets de signature sont-ils protégés ?',
  'pageText.e7d3f45b':
    "Oui ! Toute la génération de signatures cryptographiques s'effectue localement dans votre navigateur. Les secrets et les données du contenu ne sont jamais envoyés à un serveur.",
  'pageText.546b483c': "Qu'est-ce que l'entropie d'un mot de passe ?",
  'pageText.843a4831':
    "L'entropie d'un mot de passe est une mesure mathématique, en bits, de l'information imprévisible, fondée sur la taille de l'ensemble de caractères et la longueur du mot de passe.",
  'pageText.090cc30f': 'Puis-je saisir mon mot de passe ici en sécurité ?',
  'pageText.d27c1402':
    "Oui. L'analyse est calculée localement dans votre navigateur en JavaScript pur et n'est jamais transmise sur Internet.",
  'pageText.842979bb': "Qu'est-ce qu'une regex ?",
  'pageText.bf8dc030':
    'Les expressions régulières, ou regex, sont des motifs utilisés pour reconnaître des combinaisons de caractères dans les chaînes. Elles servent à rechercher, remplacer et valider du texte.',
  'pageText.aa2308ec': "Quelle variante d'expressions régulières est prise en charge ?",
  'pageText.e2719d0a':
    'Ce testeur utilise le moteur JavaScript RegExp et prend en charge la syntaxe ECMAScript et les indicateurs disponibles dans votre navigateur. Les motifs incorrects sont signalés comme des erreurs de syntaxe.',
  'pageText.b74b7f86': "Quels indicateurs d'expressions régulières puis-je tester ?",
  'pageText.cf4c1cc1':
    'Vous pouvez tester les indicateurs JavaScript standard pris en charge par votre navigateur, notamment les recherches globales, insensibles à la casse, multilignes, dotAll, Unicode et contiguës.',
  'pageText.7f047dab': "Ce que fait ce testeur d'expressions régulières JavaScript",
  'pageText.dc90d609':
    'Ce testeur compile le motif et les indicateurs avec le moteur JavaScript RegExp du navigateur, les applique au texte fourni, surligne chaque correspondance et indique son indice de départ et ses groupes de capture. Saisissez le motif sans les barres obliques qui le délimitent. Ajoutez g pour recueillir toutes les correspondances ; sans lui, JavaScript ne renvoie que la première. Utilisez le nombre de correspondances et les indices pour confirmer que les répétitions apparaissent aux endroits attendus.',
  'pageText.abd7f336': 'Usages courants',
  'pageText.9dc106a2':
    "Élaborez des règles de validation pour des identifiants, dates, lignes de journal ou d'autres textes contraints.",
  'pageText.1d045840':
    'Extrayez des valeurs répétées comme des chaînes ressemblant à des courriels, des numéros de tickets ou des champs nommés.',
  'pageText.6220ec6f':
    'Comparez les comportements sensible et insensible à la casse avec i, ou les ancrages de lignes avec m.',
  'pageText.f40aadec':
    "Examinez les groupes de capture avant d'intégrer un motif dans du code JavaScript ou TypeScript.",
  'pageText.1908e453': 'Exemple détaillé',
  'pageText.d2821f39':
    'Motif : \\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})\\b. Indicateurs : gi. Texte de test : "Contact Ada at ada@example.com or SUPPORT@EXAMPLE.ORG." Le résultat comporte deux correspondances surlignées. Le groupe de capture 1 contient chaque partie locale et le groupe 2 chaque domaine. L\'indicateur g poursuit la recherche après la première correspondance, et i ignore la casse des lettres.',
  'pageText.d1106dba':
    "Cet outil suit la syntaxe d'expressions régulières ECMAScript disponible dans le navigateur actuel ; les constructions propres à PCRE, Python, .NET ou Java peuvent échouer ou se comporter différemment. Une correspondance réussie prouve seulement que le motif a correspondu, pas qu'un courriel, une URL, une date ou une autre valeur est sémantiquement valide. Des quantificateurs imbriqués ambigus peuvent entraîner un retour arrière coûteux sur de longues entrées. L'évaluation du motif et le texte de test restent dans le navigateur ; évitez néanmoins les données sensibles de production sur les appareils partagés.",
  'pageText.17c97676': "Pourquoi échapper les caractères d'expressions régulières ?",
  'pageText.c7a9a784':
    "Les caractères ., *, +, ?, (, ), [, ], {, }, ^, $, | et la barre oblique inverse ont un sens structurel dans une expression régulière. Les préfixer d'une barre oblique inverse fait correspondre littéralement ces caractères au fragment de motif généré.",
  'pageText.b46e6b9b': 'Quand utiliser cet outil ?',
  'pageText.bbf26d2d':
    "Utilisez-le avant d'insérer du texte littéral fiable ou non fiable dans une expression régulière JavaScript plus grande. L'échappement empêche ce texte de modifier la structure du motif, mais l'expression environnante peut rester inefficace ou incorrecte.",
  'pageText.6df59a98': 'Le déséchappement interprète-t-il des séquences comme \\n ou \\d ?',
  'pageText.9a3e444a':
    "Non. Il annule uniquement les échappements de métacaractères et de barres obliques produits par cet outil. Il préserve volontairement les éléments d'expressions régulières et les échappements de chaînes pouvant avoir un autre sens.",
  'pageText.f457f978': "Ce que produit l'outil d'échappement d'expressions régulières",
  'pageText.6ac46463':
    "L'opération d'échappement préfixe les métacaractères des expressions régulières JavaScript avec une barre oblique inverse et échappe aussi / pour faciliter leur utilisation dans un littéral /pattern/. Par exemple, price (USD) + tax? devient price \\(USD\\) \\+ tax\\?. Le résultat est un fragment de motif ; les indicateurs, ancrages, groupes de capture et l'expression environnante restent à votre charge.",
  'pageText.00aef4ad': 'Limites de sécurité des motifs dynamiques',
  'pageText.dcb7c0ee':
    "Échappez uniquement la partie littérale. N'échappez pas les opérateurs que vous ajoutez intentionnellement autour, comme ^, $ ou un groupe de capture.",
  'pageText.3f76d13b':
    "L'échappement empêche l'injection de syntaxe d'expression régulière à partir de ce fragment, mais pas le retour arrière catastrophique provoqué ailleurs dans le motif final.",
  'pageText.c4d0eb41':
    "La syntaxe JavaScript RegExp diffère de PCRE, Python, .NET, Java et d'autres moteurs ; testez le motif final dans l'environnement qui l'exécutera.",
  'pageText.8dd960d4':
    "Si le motif est placé dans une chaîne JavaScript, l'échappement de chaîne dans le code source est une couche supplémentaire distincte de l'échappement d'expression régulière.",
  'pageText.90550320': 'Déséchappement et limites de confidentialité',
  'pageText.ccd0ec75':
    "Le déséchappement est volontairement prudent : il retire une barre oblique inverse uniquement devant une ponctuation traitée par l'opération d'échappement. Il n'analyse pas une expression régulière complète et ne convertit pas en texte les éléments comme \\d, \\b, \\n ou les échappements Unicode. Le traitement reste dans le navigateur ; le presse-papiers et la gestion du code destinataire restent hors de l'outil.",
  'pageText.a0a4fe42': 'Comment fonctionne la comparaison de textes ?',
  'pageText.e1159d8d':
    'Elle compare les deux entrées ligne par ligne, marque les ajouts, suppressions et lignes modifiées, puis surligne les changements plus fins dans les lignes modifiées.',
  'pageText.e5a7ece5': 'Puis-je comparer du code avec cet outil ?',
  'pageText.4f90c315':
    'Oui. Collez du code, une configuration ou du texte dans les deux éditeurs. Utilisez Ignorer les espaces ou Ignorer la casse lorsque ces différences sont sans importance.',
  'pageText.74bef405': 'Puis-je comparer deux fichiers ?',
  'pageText.c6806514':
    'Ouvrez chaque fichier dans un éditeur, copiez son contenu et collez-le dans les panneaux Original et Modifié. La comparaison porte sur le texte : tout format de texte brut convient, notamment JSON, YAML, CSV et le code source.',
  'pageText.e1647322': 'Ignorer les espaces ignore-t-il aussi les lignes vides ?',
  'pageText.88417b29':
    "Non. Cette option réduit les suites d'espaces et de tabulations et retire les espaces aux extrémités de chaque ligne avant comparaison. L'indentation et les espaces finaux ne comptent donc plus comme des changements, mais une ligne vide ajoutée ou supprimée reste un changement.",
  'pageText.80c2c0e8': 'Quelle différence avec git diff ?',
  'pageText.612015ce':
    'Les deux trouvent le plus grand ensemble commun de lignes inchangées. Cet outil associe aussi les lignes supprimées et ajoutées similaires comme des modifications et surligne les caractères exacts modifiés, ce qui facilite la lecture des petites retouches. Pour les commits et correctifs, git diff reste la référence.',
  'pageText.083d5e45': 'Mon texte est-il envoyé ?',
  'pageText.5e441495':
    "Non. La comparaison s'effectue dans votre navigateur et aucune des deux entrées n'est envoyée à un serveur.",
  'pageText.8ab4cd08': 'Comparer deux chaînes ou de longs documents',
  'pageText.19e9243c':
    "Collez le texte original à gauche et sa version révisée à droite ; la comparaison se met à jour quand vous modifiez l'une ou l'autre entrée. La vue séparée garde les lignes correspondantes côte à côte et fait défiler les deux panneaux ensemble. La vue unifiée présente une comparaison continue, avec chaque ligne supprimée suivie de son remplacement. Si les entrées sont dans le mauvais ordre, le bouton d'échange les intervertit.",
  'pageText.06dc44b8': 'Comment les changements sont détectés',
  'pageText.40ccc1ca':
    "L'outil trouve d'abord la plus longue sous-séquence commune de lignes et marque chacune comme inchangée, ajoutée ou supprimée. Dans chaque bloc de changements, les lignes supprimées et ajoutées suffisamment similaires sont associées comme lignes modifiées : une ligne retouchée apparaît donc comme un seul changement, plutôt qu'une suppression et une insertion. Ces lignes sont ensuite comparées en détail : celles de moins de 80 caractères le sont caractère par caractère et les plus longues mot par mot, sauf si le niveau caractère est activé pour imposer ce détail. Un résumé compte les ajouts, suppressions, modifications et lignes inchangées.",
  'pageText.3ba03012': 'Options pour réduire le bruit de comparaison',
  'pageText.fa1650de':
    "Ignorer les espaces réduit les suites d'espaces et de tabulations et retire les espaces aux extrémités de chaque ligne : le code réindenté et les espaces finaux ne comptent donc pas comme changements. Cela ne considère pas a b et ab comme égaux.",
  'pageText.40e7b499':
    "Ignorer la casse compare les lignes sans tenir compte de la casse des lettres, ce qui aide pour les mots-clés SQL ou les noms de variables d'environnement.",
  'pageText.6c540dae':
    'Afficher uniquement les changements masque les lignes inchangées, et Retour à la ligne garde les longues lignes lisibles sans défilement horizontal.',
  'pageText.15884c41':
    'Le texte copié de fichiers Windows peut contenir un retour chariot à la fin de chaque ligne. Si des lignes visuellement identiques sont signalées comme modifiées, activez Ignorer les espaces.',
  'pageText.4010b374': 'Examiner et partager les différences',
  'pageText.796a0a49':
    'Copier les différences produit une liste en texte brut : les lignes inchangées commencent par deux espaces, les lignes supprimées par - et les lignes ajoutées par +.',
  'pageText.97594ef5':
    'La copie suit la vue actuelle ; activer Afficher uniquement les changements copie donc seulement les lignes modifiées.',
  'pageText.314e11fa':
    'Les différences masquées par Ignorer la casse ou Ignorer les espaces ne sont pas listées : vérifiez les options avant de partager le résultat.',
  'pageText.5b3a3d4f': "Qu'est-ce que Markdown ?",
  'pageText.d5d009f0':
    'Markdown est un langage de balisage léger permettant de créer du texte mis en forme avec un éditeur de texte brut. Il est largement utilisé pour la documentation, les fichiers readme et la rédaction de contenus.',
  'pageText.bde3ab4d': 'Puis-je exporter le HTML ?',
  'pageText.ed93a679':
    'Oui. Vous pouvez copier le fragment désinfecté ou télécharger un document HTML autonome avec des styles adaptatifs simples. Vérifiez le balisage et les liens exportés avant de les publier dans un autre contexte de sécurité.',
  'pageText.0098beeb': 'Peut-on prévisualiser du HTML brut dans Markdown en sécurité ?',
  'pageText.1737e56a':
    'La sortie rendue est désinfectée avec DOMPurify. Les scripts, formulaires, iframes, attributs style et autres éléments à haut risque sont retirés. Les images liées sont bloquées par défaut ; leur activation peut contacter leurs hôtes, et suivre un lien contacte toujours sa destination.',
  'pageText.bee7691f': "Ce que prend en charge l'aperçu Markdown",
  'pageText.441669ae':
    "Le moteur utilise GitHub Flavored Markdown avec prise en charge des sauts de ligne explicites. Les titres, emphases, liens, images, listes ordonnées et non ordonnées, listes de tâches, tableaux, citations, code en ligne, blocs de code délimités, texte barré et séparateurs horizontaux sont prévisualisés pendant la saisie. La vue HTML montre le fragment désinfecté généré plutôt que d'exécuter Markdown comme du code.",
  'pageText.03de3ac0': 'Désinfection et limites de publication',
  'pageText.a8213d5f':
    "DOMPurify retire les scripts, formulaires, cadres, objets intégrés, éléments style, attributs style et autres balisages non autorisés avant l'aperçu ou l'export.",
  'pageText.1e94d374':
    'La désinfection dépend du contexte. Désinfectez à nouveau ou rendez de façon sûre la sortie si une autre application la modifie, la combine à des modèles ou la place dans un contexte autre que HTML.',
  'pageText.c384685e':
    "La coloration syntaxique n'est pas appliquée ; les indications de langage des blocs de code sont conservées uniquement comme indications dans le balisage.",
  'pageText.7f8e5143':
    'Les images liées sont remplacées par une indication visible, sauf si vous les autorisez explicitement. Les liens relatifs et les autres ressources sont toujours résolus selon la page où le HTML exporté est ouvert.',
  'pageText.9ab93c5c': 'Confidentialité et ressources externes',
  'pageText.da04b65a':
    "L'analyse Markdown et la désinfection s'effectuent localement et cet outil n'envoie pas le texte. Les images liées sont bloquées par défaut. Si vous les activez, le navigateur peut contacter leurs hôtes et divulguer des métadonnées de connexion comme votre adresse IP ; l'aperçu applique les indications no-referrer et de chargement différé. Suivre un lien, l'historique du presse-papiers, les fichiers téléchargés, les extensions et l'endroit où vous publiez le HTML exporté sont des voies de données distinctes.",
  'pageText.fd136c59': 'Quels styles de casse sont pris en charge ?',
  'pageText.972118df':
    'Cet outil prend en charge camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, les mots séparés par des espaces et dot.case.',
  'pageText.8e8d253c': "Qu'est-ce que camelCase ?",
  'pageText.0c0fc023':
    "camelCase joint les mots sans séparateurs, commence par une minuscule et met en majuscule la première lettre de chaque mot suivant, comme userProfileId. C'est le style habituel des variables JavaScript et Java.",
  'pageText.fab0fc0e': 'Quelle différence entre snake_case et kebab-case ?',
  'pageText.ffa6d712':
    'Les deux sont en minuscules. snake_case sépare les mots avec des traits de soulignement (user_profile_id) et est courant en Python et SQL. kebab-case utilise des tirets (user-profile-id) et est courant dans les URL et le CSS, mais ne peut pas servir aux noms de variables dans la plupart des langages, car - signifie moins.',
  'pageText.83ad6918':
    'Pourquoi un texte entièrement en majuscules se convertit-il étrangement en camelCase ?',
  'pageText.20a709bd':
    "camelCase et PascalCase conservent les majuscules existantes : HELLO_WORLD devient donc hELLOWORLD. Convertissez d'abord en snake_case ou en mots séparés par des espaces (hello_world), puis convertissez ce résultat en camelCase pour obtenir helloWorld.",
  'pageText.8b5b532b': "Quelle casse utiliser pour les variables d'environnement ?",
  'pageText.d1aa7699':
    "CONSTANT_CASE, par exemple DATABASE_URL. Les majuscules, chiffres et traits de soulignement constituent la convention portable pour les noms de variables d'environnement des systèmes de type Unix.",
  'pageText.45c5778c': 'Quelle casse convient le mieux aux URL ?',
  'pageText.a79aed09':
    'kebab-case. Les mots en minuscules séparés par des tirets sont faciles à lire, et Google recommande les tirets plutôt que les traits de soulignement pour séparer les mots dans les URL.',
  'pageText.05244f1a': 'Conventions de nommage et usages',
  'pageText.a6b96046':
    'camelCase (userProfileId) : variables et fonctions JavaScript et Java, et clés JSON dans de nombreuses API.',
  'pageText.fdfeef9a':
    'PascalCase (UserProfileId) : noms de classes, types TypeScript, composants React et membres C#.',
  'pageText.664a685d':
    'snake_case (user_profile_id) : variables et fonctions Python et Ruby, et noms de colonnes SQL.',
  'pageText.88ba7528': "CONSTANT_CASE (USER_PROFILE_ID) : constantes et variables d'environnement.",
  'pageText.d95625b3':
    "kebab-case (user-profile-id) : slugs d'URL, noms de classes CSS, attributs HTML et indicateurs de ligne de commande.",
  'pageText.0eab35c7':
    'dot.case (user.profile.id) : clés de configuration et identifiants de messages de traduction.',
  'pageText.6428569e':
    'Mots séparés par des espaces (user profile id) : mots simples en minuscules pour les libellés ou des modifications ultérieures.',
  'pageText.a1ccbb20': 'Comment les mots sont détectés',
  'pageText.eb52946f':
    "Le convertisseur sépare les mots aux espaces, tirets, traits de soulignement et points, ainsi que lorsqu'une minuscule est suivie d'une majuscule. user_profile-id, userProfileId et User Profile Id produisent donc tous le même résultat snake_case : user_profile_id. Les chiffres restent attachés au mot voisin : api-v2 response devient apiV2Response en camelCase et api_v2_response en snake_case.",
  'pageText.3ec8336a': 'Cas limites à vérifier',
  'pageText.7af4b6f9':
    "Les suites de majuscules comptent comme un seul mot : XMLHttpRequest devient xmlhttp-request, et non xml-http-request. Ajoutez des séparateurs (XML Http Request) si l'acronyme doit être séparé.",
  'pageText.ac6701e0':
    "camelCase et PascalCase gardent les majuscules existantes : convertissez donc d'abord une entrée entièrement en majuscules en snake_case, puis en camelCase.",
  'pageText.4ac21c06':
    'La ponctuation autre que - _ . et les espaces est conservée : Hello World! devient helloWorld! en camelCase. Retirez les caractères non autorisés dans les identifiants.',
  'pageText.0bc340ed':
    'Les sauts de ligne comptent comme des espaces : une entrée multiligne est donc jointe dans un identifiant unique. Convertissez un nom à la fois.',
  'pageText.83b3cb6b':
    "Seules les lettres A-Z sont reconnues comme majuscules délimitant un mot ; une majuscule accentuée comme É à l'intérieur d'un mot n'en commence donc pas un nouveau.",
  'pageText.c7cb896c': 'Convertir des noms dans le code',
  'pageText.e93e8bdd':
    "JavaScript : lodash propose camelCase, kebabCase et snakeCase. Lodash met d'abord chaque mot en minuscules ; son camelCase('HELLO_WORLD') renvoie donc helloWorld.",
  'pageText.2245868e':
    "API : plutôt que renommer manuellement les clés du contenu, laissez le sérialiseur les associer, par exemple Jackson PropertyNamingStrategies.SNAKE_CASE en Java ou un générateur d'alias dans Pydantic.",
  'pageText.30d85b7e':
    "Refactorisation : renommez les identifiants avec la commande de renommage de votre éditeur plutôt qu'une recherche et un remplacement, afin de mettre aussi à jour les références dans les autres fichiers.",
  'pageText.a7bd2d40': "Qu'est-ce qui est compté ?",
  'pageText.51bef002':
    "Les mots, les caractères avec et sans espaces, les lignes, les phrases et les paragraphes, ainsi qu'un temps de lecture estimé. Tous les comptes se mettent à jour pendant la saisie.",
  'pageText.051f4a91': 'Comment le temps de lecture est-il calculé ?',
  'pageText.87fbca18':
    'Le nombre de mots est divisé par une vitesse moyenne de 200 mots par minute et arrondi à la minute entière supérieure : 450 mots sont donc affichés comme 3 minutes.',
  'pageText.b3ed5e8b': 'Le nombre de caractères inclut-il les espaces ?',
  'pageText.b1bd314d':
    "Le total Caractères inclut les espaces, tabulations et sauts de ligne. Caractères sans espaces exclut tous les caractères d'espacement. Vérifiez le compte attendu par un formulaire ou un guide de style avant de raccourcir votre texte.",
  'pageText.1dd1b66b': 'Pourquoi un emoji compte-t-il comme deux caractères ?',
  'pageText.75918985':
    'Les caractères sont comptés comme JavaScript mesure la longueur des chaînes, en unités de code UTF-16. La plupart des emoji et certains symboles rares utilisent deux unités et ajoutent donc 2 au total ; les emoji combinés comme les séquences de familles ou de drapeaux peuvent en ajouter davantage.',
  'pageText.d65fcd89': 'Pourquoi le nombre de phrases est-il plus élevé que prévu ?',
  'pageText.2fc1b39a':
    'Les phrases sont séparées aux ., ! et ?. Les abréviations comme e.g. ou Dr., les nombres décimaux comme 3.14 et les URL ajoutent des coupures : considérez donc le nombre de phrases comme une estimation.',
  'pageText.1a163ec9': 'Mon texte est-il stocké ou envoyé ?',
  'pageText.0fef5a83':
    "Non. Le comptage s'effectue dans votre navigateur, rien n'est envoyé à un serveur et le texte n'est pas enregistré lorsque vous quittez la page.",
  'pageText.b58e5ca1': 'Comment chaque compte est calculé',
  'pageText.27c1e98e':
    "Mots : suites de caractères séparées par des caractères d'espacement. Les mots avec tirets et les contractions comme well-known ou don't comptent comme un seul mot ; un nombre ou un tiret isolé compte aussi comme un mot.",
  'pageText.b7cde3d8':
    "Caractères : chaque caractère, y compris les espaces et sauts de ligne. Caractères sans espaces exclut tous les caractères d'espacement, y compris les tabulations et sauts de ligne.",
  'pageText.ac4f81d6': 'Lignes : nombre de sauts de ligne plus un, y compris les lignes vides.',
  'pageText.dccbe9b3':
    'Phrases : segments de texte se terminant par ., ! ou ?. Les abréviations et nombres décimaux ajoutent des coupures.',
  'pageText.ac9536dd':
    'Paragraphes : blocs de texte séparés par au moins une ligne vide. Un seul saut de ligne ne commence pas un nouveau paragraphe.',
  'pageText.c2e627fb':
    'Temps de lecture : nombre de mots divisé par 200, arrondi à la minute entière supérieure.',
  'pageText.817a0ebe': 'Pourquoi les comptes diffèrent entre outils',
  'pageText.ddc50b04':
    "Les traitements de texte et sites web n'ont pas tous la même définition d'un mot ou d'un caractère. Certains séparent les mots composés avec tirets, ignorent les nombres ou traitent un tiret cadratin entre des mots comme un séparateur. Les limites de caractères varient encore davantage : cet outil compte la longueur des chaînes JavaScript, où la plupart des emoji comptent pour deux. Les systèmes qui comptent les octets, comme certaines colonnes de base de données, ou les points de code Unicode donnent des totaux différents pour le même texte. Les langues écrites sans espaces, comme le chinois et le japonais, sont comptées comme un mot par suite séparée par des caractères d'espacement : fiez-vous plutôt au nombre de caractères. Les espaces initiaux et finaux n'ajoutent pas de mots, mais ajoutent des caractères.",
  'pageText.8d394a34': 'Vérifier le texte par rapport aux limites courantes',
  'pageText.14f2e128':
    "SMS : un segment contient 160 caractères de l'alphabet GSM-7, ou 70 si le message contient des caractères extérieurs, comme des emoji.",
  'pageText.3ea61033':
    "Extraits de recherche : les titres sont souvent limités à environ 60 caractères et les méta-descriptions à 150 à 160, car les moteurs tronquent les textes plus longs selon leur largeur d'affichage.",
  'pageText.b63f3eaf':
    "Publications sociales : les plateformes comme X appliquent leurs propres règles de comptage, notamment pour les liens et emoji ; confirmez donc la longueur finale dans l'éditeur de la plateforme.",
  'pageText.9eea4352':
    'Dissertations et articles : les limites de mots portent généralement sur le corps du texte ; vérifiez si les titres, références et notes de bas de page sont inclus.',
  'pageText.2ad739ba': 'Comment fonctionne la détection de doublons ?',
  'pageText.a0e337c4':
    "L'outil compare chaque ligne et garde seulement sa première occurrence. Vous pouvez activer ou désactiver la sensibilité à la casse et la suppression des espaces aux extrémités.",
  'pageText.465a3722': 'Que deviennent les lignes vides ?',
  'pageText.818a7fb1': "Les lignes vides sont conservées à leur position d'origine.",
  'pageText.ee732984': 'Comment fonctionne le tri ?',
  'pageText.05cacbdc':
    "Les lignes sont triées alphabétiquement avec une comparaison des caractères Unicode. Vous pouvez choisir l'ordre croissant ou décroissant.",
  'pageText.f14a257f': 'Le tri est-il sensible à la casse ?',
  'pageText.5bc0fcf2':
    'Par défaut, le tri ignore la casse. Vous pouvez activer la sensibilité à la casse dans les options.',
  'pageText.e0ce4b55': "Pourquoi le nombre d'octets UTF-8 diffère-t-il du nombre de caractères ?",
  'pageText.cea04185':
    'Les caractères ASCII standard utilisent chacun 1 octet, les lettres accentuées comme é et ç en utilisent 2, et les emoji comme 🚀 et 🎉 en utilisent 4 en UTF-8.',
  'pageText.58a712ea':
    'Comment fonctionne le vérificateur de limite de colonne de base de données ?',
  'pageText.41e8b156':
    "Vous pouvez sélectionner des types de colonnes comme VARCHAR(64), VARCHAR(255) ou TEXT pour voir combien d'octets restent avant de dépasser les contraintes de lignes de la base.",
  'pageText.ae565f86':
    'La casse de titre traite-t-elle correctement les petites prépositions anglaises ?',
  'pageText.24671ad1':
    'Oui. Les mots comme "to", "a", "an", "the", "in", "for" et "and" restent en minuscules lorsque les recommandations du Chicago Manual of Style le prévoient.',
  'pageText.979a2e10': 'Quels caractères invisibles sont détectés ?',
  'pageText.1c5cc230':
    "Les espaces sans chasse (U+200B), liants sans chasse (U+200D), anti-liants (U+200C), marques d'ordre des octets (U+FEFF), traits d'union conditionnels (U+00AD) et marques directionnelles.",
  'pageText.07f01c24': 'Que fait le convertisseur cURL vers Axios ?',
  'pageText.d549d86a':
    'Il transforme les commandes cURL du terminal en extraits de code Axios JavaScript ou TypeScript clairs.',
  'pageText.9968e572': "Oui, toute la conversion s'effectue localement dans votre navigateur.",
  'pageText.6d5cdf50': 'Comment convertir Fetch en cURL ?',
  'pageText.daf0662a':
    "Collez votre extrait de code fetch() ; l'outil produit automatiquement la commande cURL mise en forme.",
  'pageText.5847b1ec': 'Prend-il en charge les en-têtes et les corps POST ?',
  'pageText.5ad9f567':
    'Oui, les en-têtes, méthodes HTTP et corps JSON sont entièrement analysés et conservés.',
  'pageText.8215376e': 'Comment fonctionne la conversion de JSON en XML ?',
  'pageText.92a5e19e':
    'Elle convertit récursivement les clés et valeurs JSON en éléments et attributs XML valides.',
  'pageText.5ed08f30': 'Puis-je personnaliser la balise XML racine ?',
  'pageText.4df315df':
    'Oui, vous pouvez définir le nom de la balise racine et de celle des éléments de tableaux.',
  'pageText.293797b5': 'Puis-je coller directement depuis Excel ou Google Sheets ?',
  'pageText.168c9958':
    "Oui, copiez les cellules d'un tableau et collez-les directement dans l'éditeur.",
  'pageText.e63c6336': 'Les nombres et booléens sont-ils analysés automatiquement ?',
  'pageText.e46b649e':
    'Oui, les valeurs numériques et true/false sont automatiquement converties en types JSON natifs.',
  'pageText.a6ffb0f2': 'Prend-il en charge les objets JSON imbriqués ?',
  'pageText.9c66d528':
    'Oui, les objets imbriqués sont automatiquement aplatis avec des clés en notation pointée.',
  'pageText.8faf9499': 'Puis-je exporter en CSV ou TSV ?',
  'pageText.ee9682fe':
    'Oui, choisissez des valeurs séparées par des virgules, tabulations ou points-virgules.',
  'pageText.a1264c1a': 'Est-il sûr de convertir des photos privées ?',
  'pageText.fba7c3f6':
    "Oui, tout le traitement d'images s'effectue localement dans votre navigateur avec Canvas HTML5. Vos photos ne quittent jamais votre appareil.",
  'pageText.2192ee7b': 'Quels formats sont pris en charge ?',
  'pageText.893d1681': 'PNG, JPEG, WebP, AVIF, BMP et ICO.',
  'pageText.7ae5d66d': 'Puis-je réordonner les images avant de générer le PDF ?',
  'pageText.c48f2df7':
    "Oui, utilisez les boutons fléchés de chaque vignette pour organiser l'ordre des pages.",
  'pageText.1028470b': 'Mes images sont-elles envoyées à un serveur ?',
  'pageText.43031004':
    "Non, la génération du document PDF s'effectue entièrement côté client dans votre navigateur.",
  'pageText.cafd399d': "Est-ce le même outil qu'un générateur de structures JSON vers Golang ?",
  'pageText.60309daa':
    "Oui. Go est souvent appelé Golang, et cet outil génère les définitions de structures avec les balises json à partir de n'importe quel exemple JSON, y compris les objets et tableaux imbriqués.",
  'pageText.02bd6e0d': 'Puis-je choisir le nom du modèle racine ?',
  'pageText.53e10075':
    "Oui. Définissez le nom du modèle racine au-dessus de l'éditeur. Les objets imbriqués prennent le nom de leur clé JSON, et un tableau d'objets à la racine est modélisé à partir de son premier élément.",
  'pageText.5a4c5407': 'Le résultat comprend-il les macros derive de serde ?',
  'pageText.fa083659':
    "Oui. Chaque structure dérive Serialize et Deserialize, ainsi que Debug, Clone et Default, et utilise les attributs rename de serde pour conserver les clés JSON d'origine. Ajoutez les crates serde et serde_json à votre projet.",
  'pageText.9c425ac2': 'Le générateur produit-il des structures ou des classes ?',
  'pageText.7fc8b986':
    'Des structures. Chaque objet JSON devient une structure conforme à Codable et Identifiable, et les objets imbriqués deviennent des types de structures imbriqués. Vérifiez les noms de propriétés et les valeurs facultatives avant de les utiliser dans une application.',
  'pageText.8f6dab1d': 'Quelle bibliothèque de sérialisation Kotlin le résultat cible-t-il ?',
  'pageText.57ebd790':
    'kotlinx.serialization. Chaque classe de données générée est annotée avec @Serializable et chaque propriété avec @SerialName pour conserver les noms de champs JSON.',
  'pageText.cce3877b': 'Puis-je générer des records C# plutôt que des classes ?',
  'pageText.d0862846':
    'Oui. Passez le style de sortie à Record pour obtenir des records positionnels avec les attributs [property: JsonPropertyName], ou gardez Class pour des classes modifiables avec propriétés get et set. Les objets imbriqués deviennent leurs propres types dans les deux styles.',
  'pageText.ffb3fe14': 'Le convertisseur génère-t-il des ressources Ingress ou ConfigMap ?',
  'pageText.cd91ea98':
    "Non. Pour chaque service Compose détecté, il génère un Deployment initial et un Service ClusterIP avec des images provisoires et le port 80. Ajustez vous-même les images, ports, variables d'environnement et volumes, et ajoutez les Ingress, ConfigMaps, Secrets, sondes et limites de ressources avant d'appliquer les manifestes à un cluster.",
  'pageText.9eac6229': "Qu'est-ce qu'un horodatage Unix ?",
  'pageText.1487701c':
    "Un horodatage Unix est le nombre de secondes écoulées depuis le 1er janvier 1970 (UTC), aussi appelé l'époque Unix.",
  'pageText.0789772f': 'Faut-il utiliser des secondes ou des millisecondes ?',
  'pageText.a0e3b7cc':
    "Les outils Unix et de nombreuses API serveur utilisent habituellement les secondes, tandis que JavaScript Date.now() renvoie des millisecondes. Une valeur actuelle a donc environ 10 chiffres en secondes et 13 en millisecondes ; choisissez explicitement l'unité plutôt que de la deviner à partir du nombre de chiffres.",
  'pageText.2eb9e432': 'Comment les fuseaux horaires sont-ils traités ?',
  'pageText.3d5ad092':
    "L'horodatage est affiché comme valeur UTC ISO 8601 et comme valeur locale dans le fuseau du navigateur. Lorsque vous convertissez du texte en horodatage, incluez Z ou un décalage explicite pour éviter toute ambiguïté sur l'instant voulu.",
  'pageText.1bc9c5b5': "Comment fonctionne la conversion d'horodatages Unix",
  'pageText.0fe51e8a':
    "Un horodatage Unix identifie un instant par rapport à 1970-01-01T00:00:00Z. Le convertisseur accepte un entier dans l'unité choisie, secondes ou millisecondes, le transforme en chaîne UTC ISO 8601 et présente aussi le même instant dans le fuseau local du navigateur. La conversion inverse analyse une chaîne de date et renvoie l'unité d'époque choisie.",
  'pageText.2dc0bf0f': 'Exemple en secondes et millisecondes',
  'pageText.aae8bcfb':
    "Les horodatages 1704110400 secondes et 1704110400000 millisecondes représentent le même instant : 2024-01-01T12:00:00.000Z. Choisir la mauvaise unité déplace la valeur loin de la date voulue ou la rend invalide. Les horodatages négatifs peuvent représenter des dates prises en charge antérieures à l'époque Unix.",
  'pageText.eee856bc': "Limites de l'analyse et précision",
  'pageText.6d9f9cca':
    "L'entrée doit être un entier JavaScript signé sûr. Les fractions, notations exponentielles et entiers hors de cette plage sont rejetés.",
  'pageText.38a39d56':
    'Les chaînes de date sans Z ni décalage numérique explicite peuvent être interprétées dans le fuseau local du navigateur ; incluez un décalage pour une conversion reproductible.',
  'pageText.8673caf8':
    'JavaScript Date respecte sa plage calendaire prise en charge et ne modélise pas les secondes intercalaires.',
  'pageText.77f27ab3':
    "La conversion s'effectue localement. L'heure locale affichée dépend du fuseau configuré sur l'appareil et des règles historiques disponibles dans le navigateur.",
  'pageText.9dce9428': "Qu'est-ce qu'une couleur HEX ?",
  'pageText.808cc6b3':
    'Une couleur HEX écrit les composantes rouge, verte et bleue comme trois nombres hexadécimaux à deux chiffres après un #, chacun de 00 à FF. #FF5733 signifie rouge 255, vert 87, bleu 51.',
  'pageText.e9871c7d': 'Quelle différence entre RGB et HSL ?',
  'pageText.33296696':
    'RGB définit une couleur par ses quantités de lumière rouge, verte et bleue. HSL décrit la même couleur par un angle de teinte, un pourcentage de saturation et un pourcentage de luminosité, ce qui facilite la création de variantes plus claires, plus sombres ou atténuées.',
  'pageText.e28100f8': 'Comment convertir HEX en RGB ?',
  'pageText.fe0c27b9':
    'Séparez les six chiffres en paires et convertissez chacune depuis la base 16 : premier chiffre multiplié par 16, plus le second. #1E90FF donne 1E = 30, 90 = 144 et FF = 255, soit rgb(30, 144, 255).',
  'pageText.84f954db': "Pourquoi #FFF n'est-il pas accepté ?",
  'pageText.ee7c794e':
    'Le champ HEX attend six chiffres. Développez la forme abrégée à trois chiffres en doublant chaque chiffre : #FFF devient #FFFFFF et #0AF devient #00AAFF.',
  'pageText.b67270be': 'Puis-je convertir des couleurs transparentes ?',
  'pageText.4f6be07c':
    'Pas avec cet outil. Il convertit les couleurs opaques : les valeurs HEX à huit chiffres, rgba() et hsla() ne sont donc pas prises en charge. Convertissez ici la partie couleur et ajoutez vous-même la valeur alpha, par exemple rgb(59 130 246 / 50%).',
  'pageText.9ce1a868': "Qu'est-ce qu'une couleur complémentaire ?",
  'pageText.086acf39':
    "C'est la couleur opposée sur le cercle chromatique : même saturation et luminosité, avec une teinte tournée de 180 degrés. Le panneau de palette la génère avec les options analogues, triadiques et complémentaires divisées.",
  'pageText.e95a3278': 'Liens entre HEX, RGB et HSL',
  'pageText.b8e6ba16':
    'Les trois formats décrivent les mêmes couleurs sRGB. RGB indique les composantes rouge, verte et bleue de 0 à 255. HEX écrit ces trois composantes en paires hexadécimales à deux chiffres : #3B82F6 correspond donc à rgb(59, 130, 246), avec 3B = 59, 82 = 130 et F6 = 246. HSL décrit la couleur comme une teinte (angle de 0 à 360 sur le cercle chromatique), une saturation de 0 à 100 % et une luminosité de 0 à 100 % ; le même bleu est hsl(217, 91%, 60%). HSL facilite les variantes : gardez la teinte et la saturation, puis changez seulement la luminosité pour obtenir une teinte plus claire ou plus sombre.',
  'pageText.9bb0180e': 'Convertir les formats à la main',
  'pageText.20dfb288':
    "Pour HEX vers RGB, séparez les six chiffres hexadécimaux en trois paires et convertissez chacune depuis la base 16. Pour #FF5733 : FF = 15 x 16 + 15 = 255, 57 = 5 x 16 + 7 = 87 et 33 = 3 x 16 + 3 = 51, soit rgb(255, 87, 51). Pour RGB vers HEX, convertissez chaque composante en hexadécimal et ajoutez un zéro initial aux valeurs d'un chiffre : rgb(0, 128, 255) devient #0080FF. La conversion HSL demande davantage de calculs, ce qui rend un convertisseur utile.",
  'pageText.c627f2e0': 'Arrondis et conversions aller-retour',
  'pageText.9f7b1c2c':
    "Les valeurs HSL sont arrondies aux nombres entiers, et chaque composante RGB ne comporte que 256 niveaux ; plusieurs valeurs HSL proches correspondent donc à la même couleur RGB. Convertir HSL vers RGB puis revenir peut ainsi décaler une valeur d'une unité. Si l'exactitude compte, prenez la valeur HEX ou RGB comme référence, car c'est ce que le navigateur affiche.",
  'pageText.d798a9e9': 'Entrées et sorties prises en charge',
  'pageText.b62d0366': "L'entrée HEX exige six chiffres, avec ou sans # initial.",
  'pageText.809bb2a0':
    'Les champs RGB et HSL acceptent des nombres entiers et les limitent à leurs plages valides.',
  'pageText.9800df6a':
    'Les canaux alpha, les couleurs nommées comme rebeccapurple, CMYK et les espaces CSS récents comme oklch() ne sont pas convertis.',
  'pageText.34fe3200':
    'Les valeurs copiées utilisent la syntaxe CSS, comme #3B82F6, rgb(59, 130, 246) et hsl(217, 91%, 60%) ; elles peuvent donc être collées directement dans une feuille de style.',
  'pageText.03fd111c':
    'Les échantillons de palette font tourner la teinte : de 180 degrés pour la complémentaire, de plus ou moins 30 pour les analogues, de 120 et 240 pour les triadiques et de 150 et 210 pour les complémentaires divisées. Cliquez sur un échantillon pour copier sa valeur HEX et la charger.',
  'pageText.ad112684': 'Quelle est la plage ?',
  'pageText.3ed8b237':
    'Les chiffres romains peuvent représenter les nombres de 1 à 3999. Au-delà, une notation particulière est nécessaire.',
  'pageText.646816d5': 'Comment les nombres sont-ils formés ?',
  'pageText.2ae173d7':
    'Les chiffres romains utilisent une notation additive (VI = 6) et soustractive (IV = 4) avec les lettres I, V, X, L, C, D et M.',
  'pageText.4c9566cb': 'Le convertisseur accepte-t-il des formes comme IIII ou IC ?',
  'pageText.7dbeba2f':
    "Non. Le décodeur accepte l'écriture canonique des chiffres romains : 4 doit donc être IV et 99 doit être XCIX. Les formes non standard ou mal formées produisent une erreur de validation.",
  'pageText.661774c4': 'Comment fonctionne le convertisseur de chiffres romains ?',
  'pageText.a2601719':
    "Le mode nombre vers chiffres romains associe un nombre décimal entier aux symboles romains standard avec les paires soustractives usuelles IV, IX, XL, XC, CD et CM. Le mode chiffres romains vers nombre lit les symboles, calcule leur valeur et vérifie que l'entrée en est l'écriture canonique avant de renvoyer un résultat.",
  'pageText.3ab2deeb': 'Exemples de conversion de chiffres romains',
  'pageText.0cd38bbc':
    "Le nombre 4 devient IV, 49 devient XLIX, 1994 devient MCMXCIV et 2026 devient MMXXVI. Dans l'autre sens, les mêmes valeurs romaines redonnent 4, 49, 1994 et 2026.",
  'pageText.e190ddca':
    'La notation soustractive place un symbole plus petit avant un plus grand dans les paires autorisées. Par exemple, IX signifie 9 et CM signifie 900. Les autres valeurs sont formées par addition : VIII signifie donc 5 + 1 + 1 + 1, soit 8.',
  'pageText.f97dd159': 'Plage et règles de validation',
  'pageText.0edecea6':
    'Ce convertisseur prend en charge les entiers de 1 à 3999, la plage courante représentée sans traits supérieurs ni notation étendue. Zéro, les valeurs négatives, les décimales et les nombres au-delà de 3999 sont rejetés plutôt que de recevoir un résultat non standard.',
  'pageText.8e949328':
    "L'entrée romaine ignore la casse, mais doit utiliser une forme canonique standard. Le convertisseur rejette les répétitions incorrectes et les raccourcis non standard comme IIII ou IC. Cette validation stricte distingue un nombre romain reconnu d'une chaîne qui contient simplement des lettres de chiffres romains.",
  'pageText.bcefa6b3': 'Quelles bases numériques sont prises en charge ?',
  'pageText.7414cdc4':
    'Cet outil prend en charge les bases décimale (10), hexadécimale (16), octale (8) et binaire (2).',
  'pageText.b72bd2ab': 'Comment utiliser les préfixes ?',
  'pageText.0e908091':
    "Vous pouvez utiliser des préfixes comme 0x pour l'hexadécimal, 0o pour l'octal et 0b pour le binaire. Ils sont traités automatiquement.",
  'pageText.fc1aa399': 'Peut-il convertir des entiers supérieurs à Number.MAX_SAFE_INTEGER ?',
  'pageText.1a04613d':
    "Oui. La conversion utilise BigInt et valide toute l'entrée : les grands entiers sont donc conservés sans arrondi. Les entrées sont limitées à 10 000 chiffres pour préserver la réactivité du navigateur, et les fractions ne sont volontairement pas prises en charge.",
  'pageText.6c46d667': 'Peut-il analyser les URL sans protocole ?',
  'pageText.211d4985':
    "Oui. Si aucun protocole n'est fourni, l'outil tente d'analyser l'entrée en supposant HTTPS.",
  'pageText.a249117f': 'Prend-il en charge les paramètres de requête répétés ?',
  'pageText.3fa7bebe':
    'Oui. Les paramètres de requête répétés sont conservés et renvoyés comme tableaux.',
  'pageText.974f66ef': 'Puis-je analyser une URL complète ?',
  'pageText.d840a415':
    "Oui. Vous pouvez coller une URL complète ; l'outil en extrait et analyse la chaîne de requête.",
  'pageText.de982fa1': 'Prend-il en charge les clés répétées ?',
  'pageText.aacf5366': "Oui. Les clés répétées sont conservées comme tableaux lors de l'analyse.",
  'pageText.5ec1335a': "Les valeurs d'un fichier .env sont-elles toujours des chaînes ?",
  'pageText.f1c07be7':
    "Les variables d'environnement sont des chaînes à l'interface du processus. La déduction facultative facilite la sortie JSON et ne convertit que les booléens clairs, les nombres de style JSON et null ; désactivez-la si la conservation exacte des chaînes est importante.",
  'pageText.a47731b1': 'Que se passe-t-il si une clé est définie plusieurs fois ?',
  'pageText.683572e4':
    "La dernière définition l'emporte, conformément au comportement courant de dotenv ; le convertisseur affiche un avertissement avec les deux numéros de ligne pour rendre le doublon visible.",
  'pageText.837b99bd': 'Cet outil développe-t-il les variables comme ${HOST} ?',
  'pageText.40d37465':
    "Non. Il analyse les valeurs, mais n'interpole volontairement pas les variables, n'exécute pas d'expressions shell, ne lit pas de fichiers et ne contacte pas de serveur. Le comportement d'expansion des variables varie selon les chargeurs dotenv et doit être testé dans l'environnement cible.",
  'pageText.2c76582a': 'Ce que prend en charge le convertisseur .env et JSON',
  'pageText.4f2d45bf':
    "En mode .env vers JSON, l'analyseur accepte les lignes vides, commentaires, préfixes export facultatifs, noms courants de variables d'environnement, valeurs sans guillemets et valeurs entre guillemets simples, doubles ou accents graves. Les échappements de sauts de ligne, retours chariot, tabulations, guillemets et barres obliques inverses dans les guillemets doubles sont décodés. Les valeurs entre guillemets peuvent s'étendre sur plusieurs lignes ; les commentaires en ligne hors guillemets sont retirés.",
  'pageText.c5c8e5b3': 'Déduction des types et traitement des doublons',
  'pageText.1f8452da':
    "Par défaut, chaque valeur d'environnement analysée reste une chaîne, conformément à la façon dont les systèmes exposent les variables de processus.",
  'pageText.6b7c8875':
    'La déduction facultative convertit true, false, null et les nombres non ambigus de style JSON ; les valeurs comme 0012 restent des chaînes pour préserver leurs zéros initiaux.',
  'pageText.49af1e34':
    'Si une clé apparaît plusieurs fois, sa dernière valeur est produite et un avertissement identifie les définitions en double.',
  'pageText.108380d1':
    'La sortie JSON utilise un dictionnaire protégé contre les modifications de prototype : les noms particuliers comme __proto__ restent donc de simples clés de données.',
  'pageText.f9bf5831': 'Comment le JSON est écrit en texte dotenv',
  'pageText.7723ffc4':
    "Le mode JSON vers .env exige un objet racine dont les clés sont des noms valides de variables d'environnement. Les chaînes sont entourées de guillemets doubles et échappées, les nombres et booléens sont écrits comme littéraux, null devient une chaîne vide avec avertissement, et les tableaux ou objets imbriqués deviennent des chaînes JSON entre guillemets. Vérifiez les valeurs structurées : l'application destinataire décide si et comment les analyser à nouveau.",
  'pageText.601a8514': 'Confidentialité et différences de dialectes',
  'pageText.232534d5':
    "La conversion s'effectue dans le navigateur et cet outil n'envoie pas les valeurs des champs. La syntaxe dotenv est une convention avec des différences d'implémentation : l'interpolation, la substitution de commandes, le traitement d'export et les règles d'échappement peuvent varier entre Node.js, Docker, les shells et les chargeurs propres aux frameworks. Validez le fichier généré dans l'environnement exact qui le lira, et privilégiez les exemples anonymisés aux identifiants de production.",
  'pageText.5de3368a': 'Comment cet outil traite-t-il les attributs SVG dans React ?',
  'pageText.cff1c703':
    'Tous les attributs HTML/SVG avec tirets, comme stroke-width, fill-rule et clip-path, sont convertis en camelCase React valide (strokeWidth, fillRule, clipPath), et class devient className.',
  'pageText.8b4e6d97': 'Prend-il en charge TypeScript et forwardRef ?',
  'pageText.a1b09414':
    'Oui ! Vous pouvez activer ou désactiver les interfaces TypeScript, les enveloppes forwardRef et les décompositions standard de propriétés en un clic.',
  'pageText.354d5c2b': 'Comment fonctionne CSS clamp() ?',
  'pageText.b2935b68':
    'La fonction clamp(min, preferred, max) définit une valeur préférée fondée sur la largeur de la fenêtre (vw), contrainte entre des limites minimale et maximale.',
  'pageText.b872cb54': 'Pourquoi utiliser une typographie fluide ?',
  'pageText.4477ab71':
    "La typographie fluide adapte progressivement le texte aux tailles d'écran, sans sauts brusques entre des seuils fixes de requêtes média.",
  'pageText.5025653d': 'Quels indicateurs docker run sont pris en charge ?',
  'pageText.1aff160c':
    'Le convertisseur analyse notamment -p/--publish, -v/--volume, -e/--env, --name, --restart, --network, -w/--workdir, -u/--user, --privileged et les arguments de commande du conteneur.',
  'pageText.edeb7b4c': 'La sortie est-elle valide pour Docker Compose moderne ?',
  'pageText.34af0ae3':
    'Oui, le YAML généré respecte le format moderne de la spécification Docker Compose.',
  'pageText.657d05ae': 'Quels dialectes SQL sont pris en charge ?',
  'pageText.9519e5df':
    'Le convertisseur prend en charge les dialectes PostgreSQL, MySQL, SQLite et Microsoft SQL Server.',
  'pageText.81282e94': 'Comment les types de données sont-ils déduits ?',
  'pageText.35a0c93d':
    'Les nombres, booléens, chaînes de dates ISO, objets et longueurs de texte sont analysés sur toutes les lignes pour déterminer les types de colonnes appropriés.',
  'pageText.7abbc1c1': 'Quelle taille de police de base standard utiliser pour le calcul REM ?',
  'pageText.6b49dd1e':
    "La taille de police racine par défaut du navigateur est de 16px (1rem = 16px). Vous pouvez personnaliser cette base dans l'outil si votre CSS définit html { font-size: 62.5%; } (base de 10px) ou une autre échelle.",
  'pageText.3ea4c69b': 'Quelle différence entre REM et EM ?',
  'pageText.f8a454cb':
    "REM (Root EM) est relatif au font-size de l'élément racine <html>, tandis que EM est relatif au font-size de son conteneur parent immédiat.",
  'pageText.2d5d624d':
    'Cet outil prend-il en charge TSV, les valeurs séparées par des tabulations ?',
  'pageText.8dd82b44':
    'Oui. Vous pouvez coller des données séparées par des virgules ou tabulations, copiées directement de tableurs comme Excel ou Google Sheets.',
  'pageText.6e30c9b1': 'Puis-je reconvertir des tableaux Markdown en CSV ?',
  'pageText.e858f5f7':
    'Oui, cliquez sur le bouton "Synchroniser MD ➔ CSV" pour analyser le tableau Markdown en format standard séparé par des virgules.',
  'pageText.ccff8026': 'Comment les en-têtes de tableaux sont-ils détectés ?',
  'pageText.d4655a54':
    "Le convertisseur utilise automatiquement la première ligne d'éléments <th> ou <td> comme clés des objets JSON obtenus.",
  'pageText.79df7ff1': 'Puis-je produire un tableau brut à deux dimensions plutôt que des objets ?',
  'pageText.9dd05233':
    'Oui, choisissez le format de sortie "Tableau 2D (lignes et colonnes)" pour obtenir une simple matrice sans clés nommées.',
  'pageText.939b6803': 'Cet outil prend-il en charge les instructions INSERT à plusieurs lignes ?',
  'pageText.0495ce61':
    'Oui. Le convertisseur traite sans difficulté les instructions multilignes INSERT INTO table (col1, col2) VALUES (a, b), (c, d).',
  'pageText.444bfcdc': 'Les types de données, nombres, booléens et NULL, sont-ils conservés ?',
  'pageText.b9a181b3':
    'Oui. Les nombres, littéraux booléens (TRUE/FALSE) et valeurs NULL sont automatiquement analysés et convertis en types de données JSON natifs.',
  'pageText.40323ee8': 'Comment le rapport largeur/hauteur est-il simplifié ?',
  'pageText.cdbef1c9':
    'Le calculateur détermine le plus grand commun diviseur (PGCD) de la largeur et de la hauteur pour produire le rapport entier le plus simple ; par exemple, 1920x1080 se simplifie en 16:9.',
  'pageText.bc6781c7': "Comment utiliser l'outil de redimensionnement proportionnel ?",
  'pageText.b80cad0b':
    "Saisissez la largeur et la hauteur d'origine, puis la nouvelle largeur cible pour calculer automatiquement la hauteur proportionnelle exacte.",
  'pageText.4b28a4e9': 'Quels éléments HTML sont pris en charge ?',
  'pageText.276d9f0c':
    "Le convertisseur prend en charge les titres <h1>-<h6>, le gras <strong>/<b>, l'italique <em>/<i>, les liens <a>, les images <img>, les citations <blockquote>, les listes <ul>/<ol>/<li>, les blocs <code>/ <pre> et les séparateurs horizontaux <hr>.",
  'pageText.6e1afb74': 'Les entités HTML sont-elles décodées ?',
  'pageText.ba39602f':
    'Oui, les entités courantes comme &amp;, &lt;, &gt;, &quot; et &#39; sont converties en caractères ordinaires.',
  'pageText.3799edfe': 'Ce convertisseur préserve-t-il les indications de langage du code ?',
  'pageText.c2365433':
    'Oui. Les blocs de code (```javascript ... ```) sont convertis en <pre><code class="language-javascript"> avec les caractères correctement échappés.',
  'pageText.8708ffd7': 'Puis-je télécharger le HTML généré ?',
  'pageText.c459e434':
    "Oui, cliquez sur l'icône de téléchargement pour enregistrer directement votre document converti comme fichier .html.",
  'pageText.be3a3c63': 'Quelle est la précision du calcul de différence entre dates ?',
  'pageText.d3b0d64f':
    "Les calculs sont précis à la milliseconde, grâce à l'API JavaScript Date native et aux horodatages UTC standard.",
  'pageText.af8c07b0':
    'Puis-je convertir entre les unités de temps, par exemple des heures en secondes ?',
  'pageText.8b865303':
    'Oui. La section interactive de conversion permet de convertir simultanément toute quantité entre millisecondes, secondes, minutes, heures et jours.',
  'pageText.a9fedf31': 'Comment les attributs XML sont-ils convertis en JSON ?',
  'pageText.1c4c4809':
    'Les attributs sont préfixés par "@" dans l\'objet JSON, par exemple @id="101", pour permettre une reconversion fidèle en XML.',
  'pageText.fa379db8': 'Puis-je passer à la conversion de JSON vers XML ?',
  'pageText.994016b7':
    'Oui, cliquez sur "Passer à JSON ➔ XML" pour reconvertir tout objet JSON valide en document XML mis en forme.',
  'pageText.8d1c8c14': 'Cet outil échappe-t-il les guillemets simples internes ?',
  'pageText.d9f1c9ca':
    "Oui. Les guillemets simples internes, par exemple dans O'Connor, sont automatiquement doublés ('' en SQL standard) pour éviter les erreurs de syntaxe.",
  'pageText.3f01da3d': 'Puis-je mettre en forme des listes de nombres sans guillemets ?',
  'pageText.4b94fcb9':
    'Oui ! Choisissez "Sans guillemets (nombres / identifiants)" dans la liste Style de guillemets pour les listes d\'entiers et de nombres.',
  'pageText.3d22bc27': 'Cet outil prend-il en charge les arrière-plans transparents ?',
  'pageText.41464a2f':
    'Oui ! Les formats PNG et WebP prennent en charge la transparence alpha complète. Vous pouvez aussi choisir des fonds unis blancs ou noirs.',
  'pageText.c16e4c4a': 'Comment fonctionnent les échelles de résolution 2x et 4x ?',
  'pageText.e151b8c5':
    "Le SVG vectoriel est rendu directement sur un Canvas HTML5 mis à l'échelle, garantissant une sortie haute densité nette et précise, sans pixellisation.",
  'pageText.b2fcc05a': 'Mes documents PDF sont-ils envoyés à un serveur ?',
  'pageText.aea89d9c':
    "Non ! L'ensemble du décodage et du rendu s'effectue localement dans votre navigateur avec des URL Blob et des iframes HTML5 isolées.",
  'pageText.2a1e46ea': 'Prend-il en charge les préfixes data:application/pdf;base64 ?',
  'pageText.28866c6e':
    "Oui. Le convertisseur détecte et retire automatiquement les préfixes d'URI de données et les espaces superflus de votre entrée Base64.",
  'pageText.9c3e5e8b': 'Quels attributs HTML sont transformés ?',
  'pageText.5c0146bd':
    'Il transforme `class` en `className`, `for` en `htmlFor`, les styles en ligne en syntaxe d\'objet (`style={{ width: "100px" }}`), et les attributs SVG comme `stroke-width` en `strokeWidth`.',
  'pageText.1636cff7': 'Quels dialectes de bases de données sont pris en charge ?',
  'pageText.1763f21a':
    'PostgreSQL avec identifiants entre guillemets doubles, MySQL avec identifiants entre accents graves et SQL standard générique.',
  'pageText.bc4069b3': 'Comment les objets imbriqués sont-ils traités dans GraphQL ?',
  'pageText.38249950':
    'Les objets JSON imbriqués sont extraits en définitions GraphQL `type` distinctes et référencés automatiquement par leur nom de champ.',
  'pageText.d1268a9b': 'Cet outil analyse-t-il automatiquement les nombres et booléens du TSV ?',
  'pageText.657e3a11':
    'Oui. Les valeurs numériques et chaînes booléennes true/false sont automatiquement converties en valeurs primitives JSON natives.',
  'pageText.ab767ca9': 'Quelle différence entre NDJSON et JSON ?',
  'pageText.ac640a73':
    'NDJSON contient un objet JSON valide par ligne sans crochets de tableau englobants, ce qui le rend adapté au traitement en flux de grands journaux.',
  'pageText.d53f6e6d': "Qu'est-ce que Punycode ?",
  'pageText.932ba104':
    'Punycode est une syntaxe d\'encodage définie par la RFC 3492, qui transforme les caractères Unicode en séquences ASCII préfixées par "xn--", pour permettre aux domaines non anglophones de fonctionner avec les anciens systèmes DNS.',
  'pageText.749281f3': 'Cet outil joue-t-il de véritables sons de code Morse ?',
  'pageText.80d0a9ba':
    "Oui ! Avec l'API Web Audio, l'outil synthétise des sons sinusoïdaux standard à 650Hz avec un rythme précis de points et tirets, directement dans votre navigateur.",
  'pageText.5e8710c7': 'Quelles directives Apache sont prises en charge ?',
  'pageText.883d775d':
    'Les directives RewriteRule avec indicateurs R=301 et L, Redirect 301, DirectoryIndex et Header set sont prises en charge.',
  'pageText.e91fd411': 'Quelle taille peut avoir le fichier CSV ?',
  'pageText.55e80dd0':
    "Le traitement étant local dans la mémoire de votre navigateur, l'outil peut gérer des milliers de lignes sans latence.",
  'pageText.948016f8': 'Comment les types SQL sont-ils associés aux types TypeScript ?',
  'pageText.73d3bf81':
    'INTEGER/FLOAT/DECIMAL deviennent number, VARCHAR/TEXT/UUID deviennent string, BOOLEAN devient boolean et TIMESTAMP/DATE deviennent Date | string.',
  'pageText.b445da7f': 'Comment les objets imbriqués sont-ils aplatis en clés .env ?',
  'pageText.6c4dff36':
    'Les clés imbriquées sont jointes par des traits de soulignement et mises en majuscules ; par exemple, `{ database: { host: "..." } }` devient `DATABASE_HOST="..."`.',
  'pageText.a7ac2f25': 'Traite-t-il les virgules et guillemets dans les cellules de tableaux ?',
  'pageText.ad06bce3':
    'Oui. Toute cellule contenant des virgules ou des caractères spéciaux est correctement échappée avec des guillemets doubles conformément à la RFC 4180.',
  'pageText.c0439e2b': 'Quels dialectes SQL sont pris en charge ?',
  'pageText.9c661bd6':
    'SQL standard, MySQL, MariaDB, PostgreSQL, SQLite, SQL Server (T-SQL), Oracle PL/SQL, BigQuery, Snowflake et Trino/Presto. Choisissez celui ciblé par votre requête pour que sa syntaxe propre soit reconnue.',
  'pageText.898566a5': 'Puis-je minifier du SQL ?',
  'pageText.bf763dfa':
    "Oui. Minifier réduit les caractères d'espacement à des espaces uniques et retire les espaces autour des virgules, parenthèses, = et points-virgules. Il ne retire pas les commentaires : supprimez donc d'abord les commentaires --, sinon tout ce qui les suit sur la même ligne sera commenté.",
  'pageText.17bb729b': "La mise en forme modifie-t-elle l'effet de ma requête ?",
  'pageText.dfdbf373':
    "Non. Elle réécrit uniquement les espaces et la casse des mots-clés. Les identifiants, littéraux de chaînes et l'ordre des clauses restent identiques, et la requête n'est jamais exécutée.",
  'pageText.e673de04': "Pourquoi une erreur d'analyse apparaît-elle ?",
  'pageText.f3989307':
    "Le dialecte sélectionné ne reconnaît pas une partie de la syntaxe, ou un guillemet, crochet ou parenthèse n'est pas apparié. Choisissez le dialecte pour lequel la requête a été écrite. La syntaxe de modèles comme {{ }} de dbt ou Jinja peut ne pas être analysable.",
  'pageText.34719ea5': 'Puis-je indenter avec des tabulations ?',
  'pageText.81ba983d':
    "La sortie utilise toujours des espaces. Les options d'indentation sont de 2 espaces, 4 espaces ou une largeur de tabulation de 8 espaces.",
  'pageText.568926d9': 'Mon SQL est-il envoyé à un serveur ?',
  'pageText.4517bb93':
    "Non. La mise en forme s'effectue dans votre navigateur avec la bibliothèque JavaScript sql-formatter, sans connexion à une base de données.",
  'pageText.9945834b': "Ce que modifie l'outil de mise en forme",
  'pageText.0cac9d90':
    "L'outil découpe votre SQL en éléments selon le dialecte choisi et reconstruit la présentation. Chaque clause principale (SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT) commence sur sa propre ligne ; les listes de colonnes et conditions sont indentées en dessous, et plusieurs instructions sont séparées par des lignes vides. Par exemple, select id, name from users where active = 1 order by name devient une requête avec SELECT, FROM, WHERE et ORDER BY sur des lignes séparées et id et name indentés sous SELECT. Les mots-clés sont écrits en majuscules ou minuscules selon l'option. Les identifiants, littéraux et l'ordre de vos clauses ne changent pas, et la requête n'est pas validée par rapport à un schéma de base de données.",
  'pageText.679a0218': 'Choisir le bon dialecte',
  'pageText.0dad3f3a':
    "Les dialectes diffèrent pour les guillemets, opérateurs et paramètres ; l'outil ne reconnaît que la syntaxe du dialecte choisi. Si la mise en forme échoue ou paraît incorrecte, vérifiez d'abord que le dialecte correspond à la base. Exemples de syntaxes propres aux dialectes :",
  'pageText.94b6656c':
    'PostgreSQL : conversions de type ::, paramètres positionnels $1 et corps de fonctions délimités par des dollars.',
  'pageText.2c576f60': 'SQL Server (T-SQL) : [bracketed identifiers], TOP et @variables.',
  'pageText.8af13c1a': 'MySQL et MariaDB : identifiants entre `backtick`.',
  'pageText.ea0458f2':
    'BigQuery : noms project.dataset.table entre accents graves et types STRUCT ou ARRAY.',
  'pageText.3fb5a202': 'La minification est une transformation de texte',
  'pageText.fcad398d':
    "Minifier réduit chaque suite de caractères d'espacement à un espace unique et retire les espaces autour des virgules, parenthèses, = et points-virgules. Il traite du texte brut plutôt que du SQL analysé, avec deux conséquences. D'abord, il ne retire pas les commentaires : un commentaire -- s'étendant jusqu'à la fin de sa ligne, mettre toute la requête sur une ligne peut commenter tout ce qui suit ; retirez donc ces commentaires ou convertissez-les en /* */ avant la minification. Ensuite, les espaces répétés dans les littéraux de chaînes sont aussi réduits : comparez le résultat à l'original si ces espaces comptent.",
  'pageText.1191c370': 'Commentaires et instructions multiples',
  'pageText.3cf0e67e':
    'Lors de la mise en forme, un commentaire -- en fin de ligne de code reste sur cette ligne, et les commentaires occupant toute une ligne sont conservés. Plusieurs instructions séparées par des points-virgules sont mises en forme successivement avec des lignes vides entre elles : vous pouvez donc coller une migration entière ou un script de données initiales et les vérifier instruction par instruction.',
  'pageText.367d147f': 'De combien peut-on réduire le CSS ?',
  'pageText.62ddee05':
    "Cela dépend de votre feuille de style. Retirez les commentaires et espaces superflus, puis comparez les comptes d'origine et de sortie affichés par l'outil. Un CSS déjà compact peut très peu changer.",
  'pageText.95c1ec0d': 'Le CSS minifié est-il valide ?',
  'pageText.5857bc9f':
    'La minification utilise un analyseur CSS et désactive la restructuration des règles ; vérifiez tout de même le résultat dans vos propres pages avant de le déployer.',
  'pageText.ed466d2a': 'La minification modifie-t-elle le comportement de mon CSS ?',
  'pageText.d268f9c7':
    'Elle ne devrait pas. La restructuration est désactivée : les sélecteurs ne sont donc pas fusionnés et les règles ne sont pas réordonnées, ce qui conserve la cascade écrite. Seules des formes plus courtes équivalentes sont utilisées, comme #fff pour #ffffff.',
  'pageText.0f9b8560': 'Les commentaires de licence sont-ils conservés ?',
  'pageText.3a2460c3':
    "Seulement si vous désactivez Supprimer les commentaires. Si l'option est activée, tous les commentaires sont retirés, y compris les mentions de licence /*! */. Si elle est désactivée, tous les commentaires restent en place.",
  'pageText.f6ab050a': 'Puis-je déminifier du CSS ?',
  'pageText.f9981fd3':
    "Utilisez Embellir pour rétablir les sauts de ligne et l'indentation. Les commentaires d'origine et la mise en forme exacte ne peuvent pas être récupérés après leur suppression.",
  'pageText.e39c55b7': 'Mon CSS est-il envoyé ?',
  'pageText.5c9957b9':
    "Non. CSSO s'exécute dans votre navigateur : la feuille de style est donc minifiée sur votre appareil sans être envoyée à un serveur.",
  'pageText.9649813f': 'Minifier du CSS sans modifier votre configuration de compilation',
  'pageText.de9a37b9':
    "Collez une feuille de style, choisissez de retirer ou non les commentaires, puis sélectionnez Minifier. CSSO analyse le CSS en arbre syntaxique et le réécrit de façon compacte, plutôt que de supprimer des caractères avec des expressions régulières. La restructuration des règles est désactivée : les sélecteurs ne sont pas fusionnés et les règles ne sont pas déplacées. La réduction affichée compare les nombres de caractères ; c'est donc une estimation du texte économisé, pas de la taille d'un transfert réseau compressé.",
  'pageText.67066e30': 'Ce qui devient plus petit',
  'pageText.05d17ac2':
    'Les espaces, sauts de ligne et indentations entre les éléments syntaxiques sont retirés.',
  'pageText.190686bf':
    'Le dernier point-virgule de chaque bloc de déclarations est retiré : .a { color: red; } devient .a{color:red}.',
  'pageText.c6a90a1b':
    "Les couleurs sont écrites sous une forme équivalente plus courte lorsqu'elle existe ; par exemple, #ffffff devient #fff.",
  'pageText.5abe9013':
    'Les unités des longueurs nulles sont retirées : margin: 0px 0px devient donc margin:0 0.',
  'pageText.8fb6a9bc':
    'Lorsque Supprimer les commentaires est activé, tous les commentaires sont supprimés, y compris les mentions de licence /*! */.',
  'pageText.354dff68':
    "Les sélecteurs et valeurs sont autrement conservés tels qu'ils sont écrits. Les règles inutilisées ne sont ni détectées ni retirées, car l'outil ne voit pas le HTML qui utilise la feuille de style.",
  'pageText.704bf1fa': 'Utiliser le résultat de façon sûre',
  'pageText.2ebe9c56':
    "Copiez le CSS minifié dans une compilation de test et vérifiez les pages concernées aux tailles d'écran appropriées.",
  'pageText.ab5ace02':
    'Conservez les commentaires de licence obligatoires en désactivant Supprimer les commentaires avant la minification.',
  'pageText.889b86fa':
    'Utilisez Embellir pour faciliter la lecture ; vérifiez les CSS complexes après mise en forme, car cette fonction est distincte de la minification fondée sur un analyseur.',
  'pageText.4040b973':
    'La minification complète la compression serveur sans la remplacer : gzip ou Brotli réduisent encore le fichier minifié pendant le transfert.',
  'pageText.8111e866': 'Quand utiliser plutôt un outil de compilation',
  'pageText.4d2afabc':
    "Si votre projet utilise déjà un bundler ou un framework, la minification CSS y est généralement configurée, par exemple avec Lightning CSS, cssnano ou esbuild, et s'exécute à chaque compilation. Cet outil convient aux feuilles de style ponctuelles, aux fichiers de CMS ou de thèmes, au CSS collé dans un widget tiers et aux vérifications rapides de l'effet d'un minificateur sur une règle. Les feuilles de style dans l'en-tête du document bloquent le rendu jusqu'à leur chargement : les petits fichiers favorisent donc le premier affichage sur les connexions lentes, même si la suppression des règles inutilisées fait souvent économiser davantage que la seule minification.",
  'pageText.d083d747': 'Quelles optimisations sont appliquées ?',
  'pageText.e796e2d2':
    'Terser retire les espaces, points-virgules facultatifs et commentaires, évalue les expressions constantes, supprime le code inaccessible et simplifie les conditions. Des options retirent les appels console.* et instructions debugger et raccourcissent true et false en !0 et !1.',
  'pageText.6feece85': 'Faut-il utiliser cet outil pour la production ?',
  'pageText.f02032e4':
    'Cet outil utilise Terser pour une minification JavaScript fondée sur un analyseur. Les compilations de production doivent toutefois intégrer la minification dans un bundler comme Webpack, Rollup ou esbuild.',
  'pageText.9996cfd4': 'La minification peut-elle casser mon code ?',
  'pageText.1d35f0cc':
    "Terser applique seulement des transformations préservant le comportement du JavaScript valide. Les problèmes proviennent généralement de code qui examine son propre source, comme la lecture de Function.prototype.toString(), ou de la suppression d'appels console qui effectuaient un travail réel. Testez le résultat avant de le déployer.",
  'pageText.a33aea1e': 'Comment retirer console.log du JavaScript ?',
  'pageText.851f8ba7':
    'Activez Supprimer console.* puis minifiez. Tous les appels de méthodes console sont retirés, y compris console.error et console.warn, ainsi que leurs arguments. Dans une compilation, définissez compress.drop_console dans les options Terser.',
  'pageText.e005a375': 'Pourquoi mes noms de variables ne sont-ils pas raccourcis ?',
  'pageText.1c73417a':
    "Le raccourcissement des noms est désactivé : le résultat conserve donc des identifiants lisibles pour le débogage sans cartes de source. Les bundlers activent généralement ce raccourcissement en production, ce qui économise davantage d'octets.",
  'pageText.a4388952': 'Puis-je minifier du TypeScript ou du JSX ?',
  'pageText.8bff2c76':
    "Non. Terser analyse uniquement JavaScript : les annotations de types et le JSX provoquent une erreur de syntaxe. Compilez d'abord avec tsc, esbuild, Babel ou SWC, puis minifiez le JavaScript obtenu.",
  'pageText.56b9f99f': 'Ce que fait le minificateur à votre code',
  'pageText.55103bdf':
    "Terser analyse le code en arbre syntaxique, applique des passes de compression et écrit le résultat sans espaces inutiles. La compression évalue les constantes, retire le code inaccessible et les variables locales inutilisées, raccourcit les conditions et joint les instructions lorsque c'est sûr. Le code étant analysé plutôt que modifié par expressions régulières, les chaînes, expressions régulières et littéraux de modèles restent intacts. Par exemple, function add(a, b) { return a + b; } // sum devient function add(a,b){return a+b}, et const ok = true; devient const ok=!0; lorsque Raccourcir les booléens est activé.",
  'pageText.0ee8f397': 'Explication des options',
  'pageText.0a5da22e':
    'Supprimer les commentaires : retire tous les commentaires, y compris les mentions de licence /*! */. Désactivez cette option pour les conserver, par exemple si une licence exige que la mention accompagne le code.',
  'pageText.3fbd5c3f':
    'Supprimer console.* : retire les appels comme console.log, console.warn et console.error, ainsi que leurs arguments ; ne comptez donc pas sur des effets de bord dans ces appels.',
  'pageText.d5ef0e31': 'Supprimer debugger : supprime les instructions debugger.',
  'pageText.0f7a6693':
    'Raccourcir les booléens : réécrit true et false en !0 et !1 et simplifie les expressions booléennes.',
  'pageText.281f8120': 'Ce que cet outil ne fait pas',
  'pageText.c178c0f1':
    "Il ne renomme pas les variables ; le raccourcissement des noms est désactivé. Le résultat est donc plus grand qu'un bundle de production habituel, mais plus facile à déboguer.",
  'pageText.c4a6b403':
    "Il ne génère pas de cartes de source et ne regroupe pas les imports d'autres fichiers.",
  'pageText.d46a72e1':
    'Il accepte uniquement JavaScript ; TypeScript et JSX doivent être compilés au préalable.',
  'pageText.059e3a00':
    "Il ne transpile pas la syntaxe moderne pour les anciens navigateurs. Le chaînage optionnel, les champs de classes et les fonctionnalités similaires restent tels qu'ils sont écrits ; utilisez Babel ou esbuild avec une cible si nécessaire.",
  'pageText.f406cb39':
    'Embellir est un outil simple de remise en forme qui ajoute des sauts de ligne après les accolades et points-virgules. Il sert à une lecture rapide, peut mal traiter les commentaires et expressions régulières et ne remplace pas Prettier.',
  'pageText.853950f8': 'Lire les statistiques de taille',
  'pageText.07b3482d':
    "Les tailles d'origine et minifiée comptent les caractères du texte, et le pourcentage de réduction les compare. L'économie réelle de transfert est généralement moindre, car les serveurs envoient habituellement le JavaScript compressé avec gzip ou Brotli, qui réduit déjà les espaces et identifiants répétés. Mesurez la taille compressée de votre fichier compilé si vous avez besoin de chiffres exacts.",
  'pageText.c9a86f33': "Que fait l'outil de mise en forme ?",
  'pageText.7b99d384':
    "L'outil découpe les balises, commentaires et textes en éléments, puis ajoute indentation et sauts de ligne autour des structures de blocs reconnues. Il aide à la lecture ; ce n'est pas un analyseur HTML, un validateur, un outil de désinfection ou un moteur de rendu de navigateur.",
  'pageText.8c60e5e5': "Puis-je choisir la taille de l'indentation ?",
  'pageText.f45f1451': 'Oui ! Vous pouvez choisir une indentation de 2, 4 ou 8 espaces.',
  'pageText.b5dc2f5c': 'La mise en forme corrige-t-elle le HTML invalide ou dangereux ?',
  'pageText.6bd5634a':
    "Non. Elle ne répare pas les balises mal appariées, ne valide pas les attributs, ne retire pas les scripts et ne prouve pas que le balisage est sûr. Utilisez un validateur HTML et une désinfection adaptée au contexte lorsque l'exactitude ou un contenu non fiable est en jeu.",
  'pageText.6853bf2a': "Ce que modifie l'outil de mise en forme HTML",
  'pageText.59f55f70':
    "L'outil sépare les balises de blocs ordinaires sur des lignes lisibles, garde un ensemble connu d'éléments en ligne avec leur texte environnant, préserve les commentaires et indente les structures imbriquées avec le nombre d'espaces choisi. Le panneau de sortie indique aussi les nombres de caractères et de lignes pour comparer le résultat à l'entrée.",
  'pageText.5bc49953': 'Mise en forme, analyse et validation',
  'pageText.28eb81f1':
    "La mise en forme modifie les espaces et la présentation ; elle ne construit pas le DOM d'un navigateur et n'applique pas l'algorithme d'analyse HTML.",
  'pageText.a285b9fa':
    'Les balises mal appariées, omises ou mal formées ne sont pas réparées et peuvent produire une indentation trompeuse.',
  'pageText.506549f7':
    "Les scripts, attributs de gestion d'événements, URL dangereuses et autres contenus actifs sont conservés comme texte. La mise en forme n'est pas une désinfection.",
  'pageText.525714f9':
    'Le contenu des scripts, styles, modèles, SVG ou attributs intégrés contenant des chevrons peut dépasser les possibilités du simple découpage lexical et doit être traité par un outil de développement utilisant un véritable analyseur.',
  'pageText.4a57b0bb': 'Espaces et limites de confidentialité',
  'pageText.3ede26b8':
    "Les espaces peuvent avoir un sens dans le texte préformaté, les flux en ligne, les modèles, courriels et directives de frameworks. Comparez le comportement dans le navigateur ou moteur de modèles cible avant de remplacer le code de production. La mise en forme s'effectue dans le navigateur et l'éditeur n'exécute pas le HTML collé, mais l'historique du presse-papiers, les extensions et toute destination ultérieure restent des voies d'exposition distinctes.",
  'pageText.bbd35cbf':
    'Le minificateur retire les commentaires HTML et réduit les espaces. Vous pouvez choisir les options à appliquer.',
  'pageText.f78988ed': 'De combien peut-on réduire le HTML ?',
  'pageText.de2adbe4':
    "La minification réduit généralement la taille des fichiers HTML de 10 à 30 %, selon la mise en forme d'origine et la quantité de commentaires.",
  'pageText.dc1d729a': 'Quelles fonctionnalités XML sont prises en charge ?',
  'pageText.aa014daa':
    "L'analyseur lexical reconnaît les balises ordinaires, autofermantes, commentaires, sections CDATA, instructions de traitement et déclarations DOCTYPE simples. Il ne résout ni les schémas, espaces de noms, entités ou ressources DTD externes.",
  'pageText.e249844a': 'Cet outil valide-t-il que le XML est bien formé ?',
  'pageText.c291f4c2':
    "Non. Il met en forme un balisage reconnaissable, mais n'effectue pas une analyse XML conforme aux normes. Utilisez un analyseur ou validateur XML pour détecter les balises mal appariées, noms incorrects, erreurs d'entités, violations de schéma et problèmes d'espaces de noms.",
  'pageText.40d2ec46': "Ce que modifie l'outil de mise en forme XML",
  'pageText.ac2829ba':
    "L'outil parcourt les balises et contenus XML reconnaissables, réduit l'indentation avant une balise fermante, l'augmente après une balise ouvrante et conserve les balises autofermantes, commentaires, CDATA, instructions de traitement et éléments DOCTYPE simples. Vous pouvez choisir deux, quatre ou huit espaces sans envoyer le document à un serveur.",
  'pageText.df3aac91': "La mise en forme n'est pas une validation XML",
  'pageText.54105db0':
    "L'outil ne vérifie ni l'unicité de la racine, la concordance des noms de balises, la validité des attributs, les associations d'espaces de noms, les déclarations d'entités, XSD, DTD ou les règles métier.",
  'pageText.ebba6da6':
    "Un résultat mis en forme peut rester du XML mal formé ; validez-le avec l'analyseur et le schéma utilisés par le système destinataire.",
  'pageText.53dced72':
    'Les sous-ensembles DTD internes complexes et les balisages inhabituels contenant > dans les déclarations peuvent dépasser les possibilités du simple découpage lexical.',
  'pageText.6dda43fb':
    "Les entités externes ne sont pas résolues : cela évite de les récupérer, mais ne vérifie pas non plus l'exactitude dépendant de ces entités.",
  'pageText.97f2bab3': 'Contenu mixte, signatures et confidentialité',
  'pageText.14bd67e8':
    "L'outil retire les espaces aux extrémités des éléments textuels et insère des espaces ; les documents à contenu mixte où les espaces ont un sens exigent donc une vérification attentive. Ne mettez pas en forme du XML canonicalisé ou signé numériquement : tout changement d'octet peut invalider une signature. Le traitement est local, mais l'historique du presse-papiers, les extensions, appareils partagés et la destination du résultat collé restent des risques distincts.",
  'pageText.fe32a91d': 'De combien la minification SVG réduit-elle la taille du fichier ?',
  'pageText.5d39171c':
    "Selon la quantité de métadonnées d'éditeurs (Adobe Illustrator, Inkscape) et de commentaires superflus, la taille des fichiers SVG est souvent réduite de 30 à 70 %.",
  'pageText.96ecd07b': 'La minification affecte-t-elle la qualité visuelle ?',
  'pageText.a917f319':
    'Non. Le minificateur conserve les vecteurs et courbes essentiels et arrondit les décimales à plusieurs chiffres superflues pour préserver un rendu précis au pixel.',
  'pageText.b7b3cc9a': "Quelles métadonnées sont retirées pendant l'optimisation ?",
  'pageText.66896ba8':
    "L'optimiseur retire les déclarations XML, en-têtes DOCTYPE, commentaires HTML/XML et attributs propres aux éditeurs Adobe Illustrator, Figma, Inkscape et Sketch.",
  'pageText.78172982': 'Puis-je prévisualiser le SVG optimisé avant de le télécharger ?',
  'pageText.390681e1':
    "Oui, un aperçu visuel SVG rendu en direct s'affiche sous l'éditeur pour vérifier la qualité du rendu.",
  'pageText.0b1fe2c2':
    'La minification SQL modifie-t-elle la logique ou les résultats des requêtes ?',
  'pageText.e4ef1b07':
    'Non. Elle retire seulement les commentaires non exécutables et réduit les espaces autour des opérateurs et parenthèses.',
  'pageText.9b592f46': 'Pourquoi minifier du JSON ?',
  'pageText.ed32b385':
    "Le JSON minifié réduit la taille de transfert de 20 à 50 %, accélérant les réponses d'API et réduisant les coûts de stockage.",
  'pageText.c0fed95c': 'De combien puis-je réduire la taille de mon image ?',
  'pageText.e029d2f5':
    "Selon l'image et le format, par exemple WebP, vous pouvez généralement réduire la taille du fichier de 50 à 80 %.",
  'pageText.9d6eb265':
    'Oui ! Tout est traité localement dans votre navigateur, sans aucun envoi à un serveur.',
  'pageText.9da1e25c': "Comment fonctionne l'extraction de palette de couleurs ?",
  'pageText.6856aaf1':
    "Elle échantillonne les pixels de l'image et regroupe les couleurs dominantes avec une quantification rapide des couleurs.",
  'pageText.a4364887': 'Puis-je examiner la couleur de pixels précis ?',
  'pageText.f7f9cfc5':
    "Oui, cliquez n'importe où dans l'aperçu de l'image pour sélectionner une couleur exacte avec la pipette.",
  'pageText.a35b5925': 'Est-il sûr de fusionner des documents PDF sensibles ?',
  'pageText.05bdd01e':
    'Oui, DevsTools fusionne les PDF localement dans votre navigateur avec pdf-lib. Vos documents ne sont jamais envoyés à un serveur.',
  'pageText.61e14c97': "Puis-je modifier l'ordre des PDF fusionnés ?",
  'pageText.8d1a28fb':
    'Oui, utilisez les boutons fléchés Haut et Bas pour organiser facilement les fichiers avant la fusion.',
  'pageText.0d93721b': 'Comment indiquer les plages de pages à extraire ?',
  'pageText.a635c961':
    'Saisissez des plages comme "1-3, 5, 8-10" ou utilisez les boutons de préréglage rapide.',
  'pageText.478026f0': 'Le découpage affecte-t-il la qualité du document ?',
  'pageText.343ad06a':
    "Non, le texte vectoriel, les images intégrées et les polices conservent leur qualité d'origine.",
  'pageText.3832da18': 'Quels modèles sont inclus dans la comparaison ?',
  'pageText.d5944039':
    'GPT-4o, GPT-4o-mini, o1, o3-mini, Claude 3.5 Sonnet/Haiku/Opus, Gemini 2.0 Flash, Gemini 1.5 Pro, DeepSeek V3/R1 et Llama 3.3.',
  'pageText.2c0b42c9': 'Calcule-t-il les remises liées à la mise en cache des prompts ?',
  'pageText.1f24b0e5':
    "Oui, ajustez le curseur du pourcentage de mise en cache des prompts pour afficher les coûts réduits des jetons d'entrée.",
  'pageText.b55124a7': "L'environnement de test prend-il en charge Tailwind CSS ?",
  'pageText.3c96d97b':
    'Oui, choisissez le préréglage Tailwind pour inclure automatiquement le CDN Tailwind.',
  'pageText.eea9bb11': 'Puis-je exporter mon projet de test ?',
  'pageText.22043773':
    'Oui, cliquez sur "Exporter le HTML" pour télécharger un document HTML autonome dans un fichier unique.',
  'pageText.08df7b07': 'Quel format cet outil utilise-t-il ?',
  'pageText.d6dda949':
    "Cet outil utilise le format numérique Cronie à cinq champs : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-7, où 0 et 7 sont dimanche). Les noms de mois et de jours et l'aléa avec tilde ne sont pas pris en charge.",
  'pageText.3ef8cae4': 'Que signifie */5 * * * * ?',
  'pageText.8b55b7bf':
    "Exécuter toutes les cinq minutes : à :00, :05, :10, etc., jusqu'à :55 de chaque heure, chaque jour.",
  'pageText.14555971': 'Comment exécuter une tâche cron tous les jours à minuit ?',
  'pageText.555d6847':
    "Utilisez 0 0 * * *. Le premier champ est la minute et le second l'heure ; la tâche s'exécute donc à 00:00 dans le fuseau de la machine exécutant cron.",
  'pageText.ebbbedb4': "Pourquoi ma tâche s'exécute-t-elle plus de jours que prévu ?",
  'pageText.dd287a29':
    "Lorsque le jour du mois et le jour de la semaine sont tous deux limités, cron exécute la tâche si l'un ou l'autre correspond. 0 9 1 * 1 s'exécute le premier de chaque mois et chaque lundi. Mettez l'un des deux champs à * pour utiliser seulement l'autre.",
  'pageText.4c325954': 'Quel fuseau horaire les tâches cron utilisent-elles ?',
  'pageText.1999379a':
    "Le crontab classique utilise le fuseau système du serveur, souvent UTC. Les CronJobs Kubernetes peuvent définir spec.timeZone, et les planifications GitHub Actions s'exécutent en UTC. Cet outil prévisualise les exécutions dans le fuseau de votre navigateur.",
  'pageText.05cc7746': 'Prend-il en charge @daily, les secondes, L ou W ?',
  'pageText.df473d06':
    "Non. Les macros comme @daily et @reboot, les champs de secondes ou d'année et les caractères Quartz ?, L, W et # sont rejetés. Écrivez @daily sous la forme 0 0 * * *.",
  'pageText.1fd13551': 'Lire les cinq champs cron',
  'pageText.33035464':
    "Une planification crontab standard comporte cinq champs séparés par des espaces : minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-7, où 0 et 7 signifient dimanche). La commande suivant la planification dans une ligne crontab ne fait pas partie de l'expression : collez donc uniquement les cinq champs. Par exemple, 30 2 * * 1 s'exécute à 02:30 chaque lundi, et 0 9 * * 1-5 à 09:00 du lundi au vendredi. Chaque champ accepte quatre opérateurs :",
  'pageText.016be4a0': '* correspond à toutes les valeurs du champ.',
  'pageText.0fb5d225':
    "Une virgule forme une liste : 0,30 dans le champ minute s'exécute à :00 et :30.",
  'pageText.f7efe16b':
    'Un tiret forme une plage inclusive : 9-17 dans le champ heure couvre de 9 h à 17 h.',
  'pageText.0745593a':
    'Une barre oblique ajoute un pas à * ou à une plage : */15 signifie toutes les 15 minutes, et 8-18/2 une heure sur deux de 8 à 18.',
  'pageText.1e8af08c': 'Jour du mois et jour de la semaine : la règle OU',
  'pageText.71a25a12':
    "Lorsque les deux champs de jour sont limités, cron exécute la tâche dès que l'un correspond, sans exiger les deux. Ainsi, 0 0 13 * 5 s'exécute à minuit le 13 de chaque mois et tous les vendredis, pas seulement les vendredis 13. Si l'un des champs commence par *, y compris avec un pas comme */2, ils sont au contraire combinés avec ET. Cet analyseur suit la même règle que Cronie et Vixie cron ; la liste des prochaines exécutions en montre immédiatement l'effet.",
  'pageText.c0ab4e56': 'Comment les prochaines exécutions sont calculées',
  'pageText.79d9be29':
    "Les cinq prochaines exécutions sont calculées dans votre navigateur, dans le fuseau actuel de l'appareil, et chaque heure est affichée avec l'abréviation du fuseau. Les serveurs exécutent généralement cron dans leur propre fuseau, souvent UTC : une tâche affichée ici à 09:00 peut donc s'exécuter à une autre heure locale sur le serveur. Le changement d'heure peut supprimer une heure locale, comme 02:30 au passage à l'heure d'été, ou la répéter en automne. L'aperçu liste chaque occurrence locale réelle : vérifiez le traitement de ces transitions par votre service cron.",
  'pageText.71055715': 'Syntaxes rejetées par cet analyseur',
  'pageText.941d3d4e':
    'Noms de mois et de jours comme JAN ou MON ; utilisez les nombres 1-12 et 0-7.',
  'pageText.1155fe27': 'Macros comme @hourly, @daily et @reboot.',
  'pageText.aac0ad9e': "Extensions Quartz et Spring : champ de secondes ou d'année, ?, L, W et #.",
  'pageText.eb78245f': 'Pas sur une valeur unique comme 5/10 ; écrivez plutôt 5-59/10.',
  'pageText.a20b5d46':
    'Valeurs aléatoires comme H de Jenkins ou la syntaxe ~ prise en charge par certaines versions de cron.',
  'pageText.01e5036b': 'Peut-il analyser des en-têtes en double ?',
  'pageText.a5eb4734':
    "Oui. Les clés d'en-têtes en double sont regroupées en tableaux dans le JSON analysé.",
  'pageText.48b8738b': "Quel format d'entrée est attendu ?",
  'pageText.b75acdab': 'Utilisez un en-tête par ligne au format "Header-Name: value".',
  'pageText.3d8017de': "Que sont les codes d'état HTTP ?",
  'pageText.f49da83d':
    "Les codes d'état HTTP sont des réponses standardisées du serveur indiquant si une requête a réussi, échoué ou été redirigée.",
  'pageText.09b5ad7b': "Quelles classes de codes d'état existent ?",
  'pageText.ed562809':
    '1xx information, 2xx réussite, 3xx redirection, 4xx erreurs client et 5xx erreurs serveur.',
  'pageText.fc679ed8': "Quelle est la précision de l'analyse User-Agent ?",
  'pageText.8d6134ab':
    "L'outil utilise les règles embarquées de UAParser.js 1.0.41, mais les résultats restent heuristiques : les chaînes User-Agent sont autodéclarées, réduites et peuvent être falsifiées.",
  'pageText.14c11e52': 'Peut-il détecter les robots ?',
  'pageText.ac1e7ccc':
    "Il reconnaît des identifiants courants de robots de recherche et d'IA et applique une heuristique de repli bot/crawler/spider. Un robot non répertorié ou déguisé peut toutefois ne pas être détecté.",
  'pageText.28488b1d': 'Puis-je analyser plusieurs chaînes User-Agent ?',
  'pageText.f540646b':
    'Oui. Activez le mode par lots et collez une chaîne User-Agent par ligne pour recevoir un tableau JSON de résultats analysés.',
  'pageText.964b16b5': 'Ce que renvoie cet analyseur User-Agent en ligne',
  'pageText.9d61821a':
    "Collez une chaîne User-Agent, ou activez le mode par lots pour une chaîne par ligne, afin d'analyser le nom et la version du navigateur, le système d'exploitation, le moteur de rendu, le fabricant, modèle et type d'appareil, l'architecture CPU et les indices de robots connus. La RFC 9110 définit User-Agent comme un champ de requête contenant des identifiants de produits et des commentaires facultatifs sur le logiciel à l'origine de la requête. Cet outil lit ces éléments autodéclarés ; il ne contacte pas l'appareil et n'inspecte pas le navigateur qui les a envoyés.",
  'pageText.32c1543c': 'Comment fonctionne la détection',
  'pageText.080c4d60':
    'Les règles embarquées de UAParser.js 1.0.41 appliquent dans le navigateur leurs expressions régulières pour les navigateurs, moteurs, systèmes, appareils et CPU.',
  'pageText.c680aa0e':
    "Le résultat présente les versions ainsi que le fabricant et le modèle d'appareil lorsque la chaîne collée contient assez d'informations.",
  'pageText.954982d4':
    "Une couche distincte reconnaît les identifiants de robots comme Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot et Applebot, puis applique un repli générique sur des mots-clés de robots d'exploration.",
  'pageText.ddc447f4':
    'Utiliser mon User-Agent lit navigator.userAgent dans ce navigateur ; le mode par lots analyse une chaîne collée par ligne.',
  'pageText.ef145930': 'Précision et limites',
  'pageText.1f7dae65':
    "Considérez chaque résultat comme un indice, pas une identité vérifiée. Les chaînes User-Agent peuvent être modifiées ou falsifiées, les éléments de compatibilité peuvent nommer plusieurs navigateurs et les chaînes réduites peuvent omettre les versions ou détails d'appareil. Les valeurs inconnues restent inconnues, et une chaîne non mobile non reconnue utilise le repli Ordinateur. La détection des robots est aussi heuristique : un robot non répertorié ou déguisé peut être manqué, et un nom de produit ordinaire contenant un mot-clé de robot peut être signalé. Les Client Hints et la détection de fonctionnalités peuvent fournir des indices différents ou plus utiles si vous contrôlez l'application.",
  'pageText.22aebc3c': 'Confidentialité et usage sûr',
  'pageText.2ae8ed4d':
    "L'analyse s'effectue dans votre navigateur pendant la saisie. L'entrée n'est pas envoyée à une API d'analyse, mais les valeurs User-Agent peuvent contribuer à l'identification par empreinte lorsqu'elles sont combinées à d'autres données. Ne traitez pas ce résultat comme une authentification, une autorisation, une preuve contre la fraude ou un substitut à la détection de fonctionnalités.",
  'pageText.0381d4bc': "Quels formats d'entrée sont pris en charge ?",
  'pageText.e1375844':
    'Saisissez une adresse IPv4 canonique en décimal pointé et soit un préfixe comme /24, soit un masque de sous-réseau contigu comme 255.255.255.0.',
  'pageText.245b4291': 'Comment les réseaux /31 et /32 sont-ils traités ?',
  'pageText.683e314e':
    "Un /31 est présenté selon l'interprétation point à point de la RFC 3021, où les deux extrémités sont utilisables et aucune adresse de diffusion n'existe ; confirmez que la liaison cible le permet. Un /32 représente une route vers un seul hôte et n'a pas non plus d'adresse de diffusion.",
  'pageText.c6d33e69': 'Ce calculateur prend-il en charge IPv6 ?',
  'pageText.a3da1f3e':
    "Non. Cette version valide volontairement IPv4 uniquement pour garder explicites les règles des adresses et des plages d'hôtes.",
  'pageText.790f8f4a': 'Ce que renvoie le calculateur CIDR IPv4',
  'pageText.d1b4b69d':
    "CIDR combine une adresse IPv4 à une longueur de préfixe indiquant combien de bits initiaux identifient le réseau. Le calculateur normalise l'adresse saisie vers son réseau canonique, puis affiche la limite de diffusion, le masque en notation pointée, le masque générique inverse, le nombre total d'adresses et la plage d'hôtes utilisables.",
  'pageText.1d5581a7': 'Entrée stricte et cas limites',
  'pageText.f2babb34':
    'Une entrée IPv4 doit contenir quatre octets décimaux de 0 à 255 ; les formes abrégées ou à zéros initiaux ambiguës sont rejetées.',
  'pageText.de8ed2ff':
    'Les longueurs de préfixe de /0 à /32 sont prises en charge, ainsi que les masques contigus en décimal pointé.',
  'pageText.238148ff':
    "Pour /0 à /30, les limites de réseau et de diffusion sont exclues de la plage d'hôtes utilisables.",
  'pageText.678c186b':
    'Pour /31, les deux extrémités point à point sont utilisables selon la RFC 3021 ; /32 représente une route vers un seul hôte.',
  'pageText.08e319a3': 'Limites opérationnelles',
  'pageText.16280f4e':
    "Le résultat décrit le calcul des adresses, pas l'accessibilité du routage, la politique du pare-feu, l'attribution DHCP, les réservations du fournisseur cloud, l'appartenance à un VLAN ou le caractère publiquement routable d'une adresse. Appliquez les règles de la plateforme réseau cible avant d'attribuer des hôtes.",
  'pageText.43b9f352': 'Que signifient 755 et 644 ?',
  'pageText.244efe25':
    'Chaque chiffre octal combine lecture (4), écriture (2) et exécution (1). Le mode 755 est rwxr-xr-x, et 644 est rw-r--r--.',
  'pageText.0a65a354': 'Que sont les bits setuid, setgid et sticky ?',
  'pageText.3c3c8484':
    "Ce sont des bits de mode particuliers représentés par un chiffre octal initial. Leur effet exact sur la sécurité dépend du type d'objet, du système, du système de fichiers, des options de montage et du contexte d'exécution.",
  'pageText.d9d32a1e': 'Cet outil modifie-t-il un fichier ?',
  'pageText.b0c7d669':
    'Non. Il calcule et copie seulement la notation des permissions ; il ne peut ni accéder à votre système de fichiers ni le modifier.',
  'pageText.ad18866f': 'Comment fonctionne le calculateur chmod',
  'pageText.47cea64b':
    "Les modes de permissions Unix regroupent les bits de lecture, écriture et exécution pour le propriétaire, le groupe et les autres. L'addition des valeurs de bits produit chaque chiffre octal : lecture vaut 4, écriture 2 et exécution 1. Le calculateur synchronise les représentations octale, rwx et les cases à cocher.",
  'pageText.c281eef7':
    "Évitez les permissions d'écriture larges comme 777, sauf si le modèle de menace précis et l'environnement les exigent.",
  'pageText.81ae01d1':
    'Un mode ne montre ni le propriétaire, les ACL, les capacités, les règles SELinux ou AppArmor, les indicateurs de montage, les correspondances de conteneurs ou les politiques héritées.',
  'pageText.a50e1c4a':
    "Une majuscule S ou T signifie que le bit particulier est activé, mais pas le bit d'exécution correspondant.",
  'pageText.ba30cf48':
    "Vérifiez le chemin cible et son propriétaire avant d'exécuter une commande chmod copiée, surtout récursivement.",
  'pageText.57ae6fe2': 'Quelle différence entre no-cache et no-store ?',
  'pageText.856cc543':
    'no-cache permet de stocker une réponse, mais impose une validation avant sa réutilisation. no-store demande aux caches de ne pas la stocker. Ils ne sont pas interchangeables.',
  'pageText.a24540f5': 'Que contrôle s-maxage ?',
  'pageText.07c63451':
    's-maxage définit la durée de fraîcheur pour les caches partagés et y prévaut sur max-age. Le comportement des navigateurs et caches privés peut rester différent.',
  'pageText.47165661': "Cet outil peut-il garantir le comportement d'un CDN ?",
  'pageText.4736a111':
    "Non. Il valide la syntaxe et signale les conflits courants, mais le comportement réel dépend de la réponse complète, des directives de requête, de l'implémentation du cache, de la politique du CDN, des valeurs par défaut du framework et de l'état d'invalidation.",
  'pageText.ca31e679': "Ce que vérifie l'outil Cache-Control",
  'pageText.7a512319':
    "L'analyseur sépare les directives délimitées par des virgules sans couper les virgules des valeurs entre guillemets, normalise les noms des directives, retire les noms en double du résultat mis en forme et avertit des conflits courants, comme public avec private ou des valeurs de fraîcheur non numériques.",
  'pageText.be225eb9': 'Limites opérationnelles',
  'pageText.cd535d5c':
    'La sémantique Cache-Control diffère entre requêtes et réponses ; les préréglages sont des exemples orientés réponses.',
  'pageText.ae842969':
    'Un en-tête valide ne prévaut pas sur toutes les règles de CDN, les en-têtes intermédiaires, caches de frameworks, service workers, heuristiques de navigateurs ou purges explicites.',
  'pageText.12ea33ca':
    "immutable convient surtout aux ressources versionnées dont l'URL change à chaque modification du contenu.",
  'pageText.819756b2':
    "Ne mettez pas publiquement en cache des réponses personnalisées ou sensibles sans examiner complètement l'authentification, Vary, les cookies et le comportement des intermédiaires.",
  'pageText.8fc53dd8': "L'analyseur peut-il prouver qu'une CSP est sûre ?",
  'pageText.6bdde330':
    "Non. Il signale les problèmes statiques courants, mais ne peut pas comprendre tous les flux de l'application, comportements du navigateur, cycles de vie des nonces, intégrations tierces, points de réception des rapports ou contournements de l'application protégée.",
  'pageText.00ae173a': 'Pourquoi commencer en mode Report-Only ?',
  'pageText.487cd4a8':
    'Content-Security-Policy-Report-Only consigne les violations sans imposer la politique. Il aide à identifier les ressources nécessaires avant son application, même si les rapports exigent encore un examen attentif et peuvent contenir des URL sensibles.',
  'pageText.1828ef21': 'Que deviennent les directives en double ?',
  'pageText.b8228f81':
    "Les navigateurs utilisent la première occurrence et ignorent les suivantes. L'analyseur signale les doublons et la sortie normalisée du générateur conserve une directive explicite unique.",
  'pageText.18b89636': 'Ce que vérifie le générateur CSP',
  'pageText.c8f0e194':
    "Content Security Policy limite les endroits où un document peut charger ou exécuter des ressources. Cet outil analyse les directives séparées par des points-virgules, normalise leurs valeurs, détecte les doublons et souligne des risques courants comme des sources de scripts trop larges, les scripts data:, 'unsafe-eval' ou 'unsafe-inline' sans nonce ni empreinte.",
  'pageText.8bc2d491': 'Directives de base et résultats',
  'pageText.6a15b338':
    'default-src fournit un repli aux directives de récupération qui ne sont pas explicitement déclarées.',
  'pageText.aa0c2e7c':
    "object-src 'none' bloque le contenu d'anciens plugins lorsque l'application n'en a pas besoin.",
  'pageText.18e827de':
    "base-uri limite les changements d'URL de base du document, tandis que frame-ancestors contrôle les parents autorisés à intégrer la page.",
  'pageText.4033496a':
    'Une politique syntaxiquement valide peut tout de même casser la production ou permettre un flux dangereux. Validez séparément les origines requises, nonces, empreintes, workers, cadres, formulaires et rapports.',
  'pageText.190ec910': 'Procédure de déploiement sûre',
  'pageText.ae9648e1':
    "Commencez par un brouillon aux privilèges minimaux, déployez-le comme Content-Security-Policy-Report-Only, parcourez les véritables flux de l'application et examinez les violations. Retirez les dépendances accidentelles ou ajoutez les sources nécessaires les plus précises, puis appliquez la politique testée. Versionnez l'en-tête et testez-le à nouveau lorsque les frameworks, CDN, outils d'analyse, publicités ou flux d'authentification changent.",
  'pageText.d68c4d88': 'Cet outil exécute-t-il la commande cURL ?',
  'pageText.74f4df78':
    "Non. Il découpe seulement l'entrée prise en charge et génère du texte. Il ne lance jamais de shell, ne contacte pas l'URL cible et n'envoie ni les en-têtes ni le corps.",
  'pageText.48e8b2e0': 'Quelles options cURL peuvent être converties ?',
  'pageText.2aedeaa5':
    "Le convertisseur traite les options courantes de requête, notamment la méthode, l'URL, les en-têtes et les données, ainsi que les indicateurs de redirection ou compression sans danger. Les fonctionnalités shell non prises en charge ou ambiguës sont rejetées plutôt que devinées.",
  'pageText.159eff58': 'cURL et fetch sont-ils toujours équivalents ?',
  'pageText.dde74409':
    "Non. Les redirections, cookies, TLS, proxys, compression, flux, CORS, en-têtes interdits par le navigateur, identifiants et transferts multipart peuvent se comporter différemment. Vérifiez et testez le code généré dans son véritable environnement d'exécution.",
  'pageText.ec80b478': 'Ce que fait le convertisseur cURL et fetch',
  'pageText.68449604':
    "Le générateur de requêtes transforme les entrées structurées de méthode, URL, paramètres, en-têtes et corps en commande cURL avec guillemets pour shell POSIX et en exemple JavaScript fetch. Le convertisseur découpe une commande cURL collée prise en charge sans l'exécuter, puis associe ses données de requête à la syntaxe fetch.",
  'pageText.cee22a22': "Limites de l'analyse et de la sécurité",
  'pageText.a46bfb45':
    'Les substitutions shell, accents graves, octets NUL, guillemets mal formés, injections CRLF dans les en-têtes et options non prises en charge sont rejetés.',
  'pageText.a46b5014':
    "Les valeurs sensibles Authorization, Cookie, d'autorisation proxy et de clés d'API peuvent être masquées dans la sortie générée et le sont par défaut dans l'interface.",
  'pageText.b759e2e1':
    "Les règles de guillemets du shell POSIX ne sont pas celles de PowerShell ou de Windows cmd. Vérifiez le shell cible avant d'exécuter du texte copié.",
  'pageText.d923e0c4':
    "L'API Fetch Headers peut combiner les en-têtes de requête répétés ; l'extrait généré signale les noms en double pour une vérification manuelle.",
  'pageText.6518c723':
    "L'outil n'envoie aucune requête, ne valide pas un serveur distant, ne stocke pas les identifiants et ne prouve pas que les secrets copiés sont protégés des extensions, scripts de page, historique du presse-papiers ou partage d'écran.",
  'pageText.a52cbc62': 'Pourquoi le fetch généré peut nécessiter des modifications',
  'pageText.a0b2fa3c':
    "Le fetch du navigateur applique les règles CORS et d'en-têtes interdits que le client curl en ligne de commande n'applique pas. Le JavaScript côté serveur utilise un autre environnement de cookies, proxys et TLS. Les transferts multipart, corps de requêtes en flux, certificats clients, résolutions DNS personnalisées ou reprises propres à curl nécessitent du code adapté à l'environnement, au-delà d'une conversion directe.",
  'pageText.92e93e00': 'Quels rapports de contraste WCAG exige-t-il pour le texte ?',
  'pageText.71cfc9b4':
    'Pour la plupart des textes, AA exige au moins 4.5:1 et AAA 7:1. Les grands textes utilisent 3:1 pour AA et 4.5:1 pour AAA. Un grand texte fait au moins 18 points en normal ou 14 points en gras, généralement approximés à 24 pixels CSS ou environ 18.66 pixels CSS en gras.',
  'pageText.76601b6f': "Que représente le résultat pour les composants de l'interface ?",
  'pageText.88ec1351':
    "Il applique le seuil de 3:1 couramment utilisé pour les informations visuelles nécessaires à l'identification des composants d'interface et objets graphiques. Son applicabilité dépend de l'état, des limites, des couleurs voisines et de la nécessité de l'élément visuel pour comprendre ou utiliser l'interface.",
  'pageText.f6c937f8': 'Un rapport conforme rend-il toute la conception accessible ?',
  'pageText.c55058e2':
    "Non. Le contraste est une exigence parmi d'autres. L'épaisseur, la taille et l'espacement des caractères, les états de survol et de focus, les dégradés, images, différences de vision des couleurs, zoom, couleurs forcées et la transmission d'informations sans couleur exigent tous des tests distincts.",
  'pageText.bd34b3a3': 'Comment le rapport de contraste est calculé',
  'pageText.93057296':
    "Chaque composante sRGB opaque est convertie de sa valeur encodée en lumière linéaire, combinée avec les coefficients de luminance relative WCAG, puis comparée selon (plus claire + 0.05) / (plus sombre + 0.05). Le rapport va de 1:1 pour des luminances identiques à 21:1 pour le noir et blanc. Inverser le premier plan et l'arrière-plan ne change pas le rapport numérique.",
  'pageText.587b353d': 'AA, AAA et aperçu en direct',
  'pageText.a7a29b7f':
    'Pour le texte normal, AA est conforme à partir de 4.5:1 et AAA à partir de 7:1.',
  'pageText.4a22824d':
    'Pour le grand texte, AA est conforme à partir de 3:1 et AAA à partir de 4.5:1.',
  'pageText.6232d70c':
    "L'exemple d'interface indique le seuil non textuel de 3:1 sans supposer que toute bordure visible doit le respecter.",
  'pageText.25adca33':
    "La suggestion choisit le noir ou le blanc opaque offrant le meilleur rapport avec le fond actuel ; elle ne préserve pas l'intention de la marque.",
  'pageText.3543a31e':
    "L'aperçu en direct aide à repérer les problèmes évidents de lisibilité, mais ne remplace pas les tests du produit rendu à ses véritables tailles et dans ses différents états.",
  'pageText.1aad56b9': 'Limites de couleurs et de rendu',
  'pageText.e945b142':
    "Le calculateur accepte les couleurs sRGB opaques hexadécimales à trois ou six chiffres. La transparence alpha, les dégradés, images, modes de fusion, calibrage de l'écran, anticrénelage, couleurs à large gamut et textes sur contenu changeant exigent l'évaluation des pixels composités finaux. Le traitement est local et n'échantillonne pas automatiquement une autre page web.",
  'pageText.23984f68': "Quelles versions d'OpenAPI sont prises en charge ?",
  'pageText.a8bb0e10':
    "L'analyseur structurel accepte les chaînes de version OpenAPI 3.0, 3.1 et 3.2. Swagger 2.0 est signalé comme non pris en charge plutôt que converti silencieusement.",
  'pageText.052ac5a9': 'Les documents $ref externes sont-ils téléchargés ?',
  'pageText.a9423d78':
    "Non. Les références de fragments locaux commençant par # sont résolues dans le document collé. Les références de fichiers et de réseau sont listées comme avertissements, mais jamais récupérées, ce qui garde l'analyse locale et évite les accès réseau cachés.",
  'pageText.0aa9d75d': 'Un résultat valide garantit-il une conformité OpenAPI complète ?',
  'pageText.66286acc':
    "Non. C'est un analyseur structurel ciblé, pas le schéma officiel accompagné de toutes les règles sémantiques. Utilisez en CI un validateur adapté à la version et le générateur ou la passerelle cible avant de publier un contrat d'API.",
  'pageText.df996466': 'Ce que vérifie le validateur structurel',
  'pageText.4c230715':
    "L'analyseur accepte du JSON ou du YAML avec limites, exige une version OpenAPI 3, un titre et une version dans info ainsi qu'un objet paths, puis inventorie les opérations HTTP standard. Il signale les réponses manquantes, identifiants d'opérations en double, paramètres de chemins absents ou facultatifs, clés de réponses inhabituelles, références locales non résolues, versions racines non prises en charge et champs Path Item inconnus.",
  'pageText.c33b24c7': "Comment l'explorateur de points d'accès résume le contrat",
  'pageText.bd67021b':
    "Chaque ligne affiche la méthode, le chemin, le résumé, operationId, les clés de réponses, l'obsolescence et le statut de sécurité effectif.",
  'pageText.af6d9ec9':
    'La sécurité définie pour une opération prévaut sur celle de la racine ; un tableau security vide est présenté comme explicitement public.',
  'pageText.f6c0ea2a':
    "La recherche couvre le chemin, le résumé, operationId et les balises, tandis que le sélecteur de méthode réduit la liste d'opérations visible.",
  'pageText.f6b3cb96':
    "La vue JSON normalisée rend visibles les résultats de l'analyse YAML et les alias fusionnés pour vérification.",
  'pageText.39b0dc9b':
    'Les références externes sont comptées et signalées sans aucune requête du navigateur.',
  'pageText.477e1f43': 'Limites de validation et de sécurité',
  'pageText.aa9a6db6':
    "Un document structurellement valide peut encore contenir des schémas incompatibles, exemples invalides, rappels cassés, types de médias incorrects, extensions propres à un générateur, flux d'authentification inutilisables ou comportements métier différents de l'implémentation. La résolution locale des $ref vérifie leur existence, mais ne les développe pas complètement dans chaque contexte sémantique. La profondeur YAML, les alias, le développement des fusions et la taille totale de l'entrée sont limités pour préserver la réactivité du navigateur.",
  'pageText.e8aa500a': "Qu'est-ce que SPF et pourquoi est-il nécessaire ?",
  'pageText.3a448f2b':
    'SPF (Sender Policy Framework) est un enregistrement DNS TXT qui liste les serveurs de messagerie autorisés à envoyer des courriels au nom de votre domaine.',
  'pageText.101baaa1': "Qu'est-ce que DMARC ?",
  'pageText.5c6e3f51':
    "DMARC (Domain-based Message Authentication, Reporting, and Conformance) utilise SPF et DKIM pour indiquer aux serveurs destinataires comment traiter les courriels dont l'authentification échoue.",
  'pageText.db14ea51':
    'Quels langages de programmation et bibliothèques HTTP sont pris en charge ?',
  'pageText.cd3899b9':
    "L'outil génère du code pour JavaScript (API Fetch et Axios), Python (bibliothèque Requests), Go (net/http standard), PHP (curl_init) et Rust (reqwest async).",
  'pageText.7db0a8b2': 'Cet outil exécute-t-il ou envoie-t-il ma requête cURL sur Internet ?',
  'pageText.95abcd54':
    "Non. La commande est analysée et découpée en éléments localement dans votre navigateur pour générer du code. Rien n'est envoyé ni exécuté.",
  'pageText.125a50e9': "Qu'est-ce qu'une compilation Docker en plusieurs étapes ?",
  'pageText.7a608e37':
    "Les compilations en plusieurs étapes utilisent des conteneurs intermédiaires distincts pour la compilation et l'exécution en production, ce qui réduit fortement la taille des images finales et élimine les dépendances de compilation de la production.",
  'pageText.c322990e': "Le Dockerfile généré s'exécute-t-il avec un utilisateur autre que root ?",
  'pageText.585c03a7':
    "Oui, lorsque c'est applicable, le Dockerfile généré configure un utilisateur dédié autre que root, par exemple USER node ou appuser, conformément aux bonnes pratiques de sécurité des conteneurs.",
  'pageText.4adfa17f': "Quelles propriétés CSS créent l'effet glassmorphism ?",
  'pageText.cb13b4db':
    'Le glassmorphism est obtenu avec backdrop-filter: blur(), un fond semi-transparent (rgba), de fines bordures blanches (rgba) et des ombres box-shadow donnant du relief.',
  'pageText.78f35ba1': 'backdrop-filter est-il pris en charge dans tous les navigateurs modernes ?',
  'pageText.afdcf83f':
    'Oui, backdrop-filter est pris en charge par tous les navigateurs modernes (Chrome, Edge, Safari, Firefox). Les préfixes fournisseurs comme -webkit-backdrop-filter sont inclus pour maximiser la compatibilité.',
  'pageText.a0d9ac95': 'Quelles unités puis-je utiliser pour les colonnes et lignes ?',
  'pageText.0d74534d':
    'Vous pouvez configurer des unités fractionnaires flexibles (fr), des dimensions exactes en pixels (px) ou des pourcentages (%) pour adapter au mieux la mise en page.',
  'pageText.85a4a549': 'Puis-je copier à la fois le CSS et le HTML ?',
  'pageText.349f7349':
    'Oui, le CSS du conteneur .parent avec grid-template-columns et la structure HTML correspondante sont générés simultanément.',
  'pageText.db476089': 'À quoi sert robots.txt ?',
  'pageText.c4e38da5':
    'Un fichier robots.txt indique aux robots de moteurs de recherche comme Googlebot et Bingbot les URL et répertoires auxquels ils peuvent ou non accéder sur votre site.',
  'pageText.8f3b1cb2': 'Où placer le fichier robots.txt ?',
  'pageText.f8c6a14d':
    'Le fichier robots.txt doit toujours être placé à la racine du domaine de votre site, par exemple https://example.com/robots.txt.',
  'pageText.dadb2232': 'Quelles balises sont incluses dans le sitemap XML généré ?',
  'pageText.0acc8ea9':
    'Le XML généré respecte le schéma sitemaps.org 0.9 et inclut les éléments <url>, <loc>, <lastmod>, <changefreq> et <priority>.',
  'pageText.972e9d03': 'Comment le soumettre à Google Search Console ?',
  'pageText.6bb374e1':
    'Téléchargez le sitemap.xml généré, importez-le à la racine de votre site (https://example.com/sitemap.xml), puis soumettez cette URL dans Google Search Console.',
  'pageText.912a6605': 'Quelle différence entre event.key et event.code ?',
  'pageText.5f3e9043':
    'event.key renvoie la valeur de la touche pressée en tenant compte de Maj et Verr. Maj, par exemple "A" ou "a", tandis que event.code représente la touche physique du clavier, comme "KeyA".',
  'pageText.d6886318': 'Pourquoi keyCode est-il obsolète en JavaScript moderne ?',
  'pageText.47c83a7e':
    "event.keyCode était incohérent entre les systèmes d'exploitation et les dispositions autres que QWERTY. Le développement web moderne utilise event.key et event.code comme références.",
  'pageText.44aec8dc': 'Comment fonctionnent les triangles en CSS pur ?',
  'pageText.178348f0':
    'Un triangle CSS est créé avec un élément de largeur et hauteur nulles et des bordures épaisses, dont trois côtés sont transparents et un coloré.',
  'pageText.4e5692e9': 'Puis-je générer des triangles diagonaux de coin ?',
  'pageText.0633b12d':
    'Oui ! Vous pouvez choisir huit directions : haut, bas, gauche, droite, haut gauche, haut droite, bas gauche et bas droite.',
  'pageText.376bbf44': 'Ce générateur fournit-il du CSS pur et des classes Tailwind ?',
  'pageText.59dce7df':
    'Oui. Les règles CSS standard (display: flex, justify-content, align-items, gap) et les classes utilitaires Tailwind sont générées en temps réel.',
  'pageText.99e78b69':
    "Puis-je ajouter ou retirer des éléments flex de test dans l'environnement de démonstration ?",
  'pageText.b824b684':
    "Oui, utilisez les boutons + et - pour ajuster le nombre de cartes de test dans le conteneur et observer le retour à la ligne et l'espacement.",
  'pageText.b1a93891': "Quelles plateformes sociales sont simulées dans l'aperçu ?",
  'pageText.c1f4071a':
    'Vous pouvez choisir les vues de carte à grande image Twitter/X, publication du fil Facebook, partage de lien LinkedIn et extrait de résultats Google Search.',
  'pageText.fb1820cd': "Quelle résolution d'image Open Graph est recommandée ?",
  'pageText.da87fb9a':
    'La taille standard recommandée pour Twitter Cards et Facebook Open Graph est de 1200 × 630 pixels, soit un rapport de 1.91:1.',
  'pageText.5141dfd9': "Quels préréglages d'animation sont disponibles ?",
  'pageText.1033cd43':
    'Les préréglages comprennent rebond, pulsation, rotation, secousse, apparition, retournement 3D, oscillation et zoom avant.',
  'pageText.96e7dd99': "Puis-je personnaliser la fonction de rythme de l'animation ?",
  'pageText.0aa29a50':
    'Oui. Vous pouvez choisir entre ease, linear, ease-in, ease-out et ease-in-out, ainsi que personnaliser la durée et le délai en secondes.',
  'pageText.2c0cc2c1': "Puis-je ajouter plusieurs couches d'ombre au texte ?",
  'pageText.8175f838':
    'Oui. Vous pouvez empiler autant de couches text-shadow que nécessaire pour obtenir une profondeur 3D réaliste, des contours rétro multicolores ou une lueur néon à plusieurs niveaux.',
  'pageText.9ec3072a': "Y a-t-il des préréglages de styles prêts à l'emploi ?",
  'pageText.9e6ee7e1':
    'Oui ! Les préréglages en un clic comprennent ombre douce, lueur néon, extrusion 3D et contour rétro.',
  'pageText.deb09314': 'Quelles informations fournit le calculateur de sous-réseaux ?',
  'pageText.6e09390f':
    "Il calcule l'adresse réseau, l'adresse de diffusion, le masque de sous-réseau, le masque générique, les premières et dernières adresses IP d'hôtes utilisables, les nombres total et utilisable d'hôtes, la classe IP et les représentations binaires de 32 bits.",
  'pageText.f6fb6409': 'Prend-il en charge tous les préfixes CIDR de /0 à /32 ?',
  'pageText.eb723f55':
    "Oui. Tous les préfixes de sous-réseaux de /0 à /32 sont pris en charge, y compris les liaisons particulières point à point /31 (RFC 3021) et les masques /32 d'un seul hôte.",
  'pageText.7c278231': 'Quelles fonctions de filtres CSS sont prises en charge ?',
  'pageText.3027f78d':
    'Les fonctions prises en charge comprennent blur(), brightness(), contrast(), grayscale(), hue-rotate(), invert(), saturate(), sepia() et opacity().',
  'pageText.2666dde6': 'Les préfixes fournisseurs sont-ils inclus dans le CSS généré ?',
  'pageText.45bdde19':
    'Oui. Les propriétés standard `filter` et `-webkit-filter` sont toutes deux produites pour maximiser la compatibilité entre navigateurs.',
  'pageText.4f32f1e3': 'Comment fonctionne la syntaxe border-radius à huit valeurs en CSS ?',
  'pageText.c08c1dc8':
    'La barre oblique (/) sépare les rayons horizontaux des verticaux : `border-radius: [TL-h] [TR-h] [BR-h] [BL-h] / [TL-v] [TR-v] [BR-v] [BL-v]`, pour créer des courbes organiques lisses non circulaires.',
  'pageText.8ed31f5b': 'Puis-je choisir des unités en pourcentage (%) ou en pixels (px) ?',
  'pageText.974f8f3e': "Oui, passez de % à px avec le sélecteur d'unité du panneau de commandes.",
  'pageText.aff2e0e9': "Quelles méthodes d'authentification sont prises en charge ?",
  'pageText.33b1ea50':
    'Les jetons au porteur (`-H "Authorization: Bearer ..."`) et l\'authentification Basic (`-u "user:pass"`) sont pris en charge.',
  'pageText.f1fe0990':
    'Les caractères spéciaux et guillemets simples sont-ils échappés de façon sûre ?',
  'pageText.cacf393b':
    "Oui. Le JSON du corps et les chaînes d'en-têtes sont correctement échappés pour éviter de casser la syntaxe shell dans les terminaux bash et zsh.",
  'pageText.5785e598': 'Quelles formes de surface sont disponibles ?',
  'pageText.7e6f4277':
    'Les surfaces plates, enfoncées (ombre intérieure), concaves (courbe en dégradé) et convexes (courbe en dégradé inversée) sont prises en charge.',
  'pageText.9f1d34df': 'Comment les deux ombres sont-elles calculées ?',
  'pageText.b74d0389':
    "Le générateur calcule automatiquement la zone claire complémentaire tournée vers la source de lumière et l'ombre portée du côté sombre, selon votre couleur de base et vos réglages d'intensité.",
  'pageText.65e43540': 'Comment les dégradés maillés CSS fonctionnent-ils sans Canvas ni SVG ?',
  'pageText.19ca56b9':
    'Plusieurs positions `radial-gradient()` superposées sont mélangées sur un fond uni avec des effets de flou backdrop/filter pour un rendu GPU très rapide.',
  'pageText.49cc9737': 'Puis-je ajouter ou repositionner plusieurs points de couleur ?',
  'pageText.f51bb3c6':
    "Oui ! Vous pouvez ajouter jusqu'à six points de couleur personnalisés et positionner indépendamment leurs coordonnées X/Y de 0 % à 100 %.",
  'pageText.51b04c8d': 'Quelles formes sont préconfigurées ?',
  'pageText.f8a18c44':
    'Les triangles, trapèzes, parallélogrammes, losanges, pentagones, hexagones, étoiles et bulles de dialogue sont inclus.',
  'pageText.27ea598c':
    'Cet outil prend-il en charge Firefox et les navigateurs Chromium modernes ?',
  'pageText.a550ba24':
    'Oui. Il génère les propriétés standard modernes `scrollbar-color` et `scrollbar-width` ainsi que les règles fournisseurs `::-webkit-scrollbar` pour couvrir tous les navigateurs.',
  'pageText.c0a0fbb0': 'Des fichiers images sont-ils nécessaires pour afficher ces motifs ?',
  'pageText.da49a542':
    'Non. Tous les motifs sont générés avec les fonctions CSS pures `radial-gradient` et `linear-gradient`.',
  'pageText.3349cc09': 'Puis-je coller des balises HTML <path> brutes ?',
  'pageText.bc6be089':
    'Oui. L\'outil extrait automatiquement l\'attribut `d="..."` des balises SVG brutes.',
  'pageText.b5c8f73b': 'Quelle différence entre ^ et ~ dans npm ?',
  'pageText.5e52dc36':
    '`^1.2.3` autorise les mises à jour qui ne modifient pas le premier chiffre non nul en partant de la gauche (< 2.0.0), tandis que `~1.2.3` autorise seulement les changements de correctif (< 1.3.0).',
  'pageText.0e286eaf': 'Quel préfixe de sous-réseau est standard pour les réseaux locaux IPv6 ?',
  'pageText.aa2aad9c':
    'Un préfixe /64 est la taille standard des sous-réseaux des segments locaux IPv6 selon la RFC 4291.',
  'pageText.58ddddc2': 'Quels champs composent une expression cron à cinq éléments ?',
  'pageText.09710cdd':
    'Minute (0-59), heure (0-23), jour du mois (1-31), mois (1-12) et jour de la semaine (0-6, dimanche=0).',
  'pageText.d3c9a849': "Pourquoi SPF est-il important pour les courriels d'un domaine ?",
  'pageText.61b98659':
    "SPF (Sender Policy Framework) empêche les expéditeurs de courriels indésirables d'envoyer des messages non autorisés usurpant votre domaine, protégeant sa réputation et la bonne livraison de ses courriels.",
};
