import type { Language } from '@/translations';

/**
 * Locale-aware templates for auto-generated tool page copy (supplemental
 * answer sections, supplemental FAQs, and structured-data labels).
 *
 * These live here rather than in src/translations because they are
 * parameterised templates used on the server to build both visible copy and
 * JSON-LD. Keep every locale's claims identical to the English source.
 */
export interface ToolSeoCopy {
  /** Separator used when joining data-type labels ("json or yaml"). */
  or: string;
  /** Localized label for a manifest data type, or undefined to fall back. */
  dataTypeLabels: Partial<Record<string, string>>;
  exampleHeading: (name: string) => string;
  exampleParagraph: (name: string) => string;
  startBullet: (inputTypes: string) => string;
  useBullet: (name: string, description: string) => string;
  reviewBullet: (outputTypes: string) => string;
  continueBullet: string;
  installQuestion: (name: string) => string;
  installAnswer: string;
  resultQuestion: (name: string) => string;
  resultAnswer: string;
  howToName: (name: string) => string;
  howToStepName: (position: number) => string;
  relatedToolsListName: (name: string) => string;
  topicCollectionsHeading: string;
}

/** Proper-noun labels for technical data types, shared by non-English locales. */
const technicalDataTypeLabels: Record<string, string> = {
  json: 'JSON',
  'json-schema': 'JSON Schema',
  curl: 'cURL',
  har: 'HAR',
  postman: 'Postman',
  openapi: 'OpenAPI',
  k6: 'k6',
  zod: 'Zod',
  typescript: 'TypeScript',
  csharp: 'C#',
  url: 'URL',
};

function withTerminalPunctuation(text: string, terminal = '.'): string {
  const trimmed = text.trim();
  return /[.!?。！？]$/.test(trimmed) ? trimmed : `${trimmed}${terminal}`;
}

const en: ToolSeoCopy = {
  or: ' or ',
  dataTypeLabels: {},
  exampleHeading: (name) => `Example workflow with ${name}`,
  exampleParagraph: (name) =>
    `A practical way to use ${name} is to begin with a small representative sample, verify the output, and then repeat the same workflow with production-sized input. This makes formatting, conversion, or validation problems easier to isolate before the result is reused elsewhere.`,
  startBullet: (inputTypes) =>
    `Start with ${inputTypes} input that represents the real value you want to inspect, convert, or generate.`,
  useBullet: (name, description) =>
    `Use ${name} to ${description.trim().replace(/\.$/, '').toLowerCase()}.`,
  reviewBullet: (outputTypes) =>
    `Review the ${outputTypes} result before copying it into application code, configuration, documentation, or a test fixture.`,
  continueBullet:
    'Continue the workflow with one of the suggested next-step tools; compatible output can be transferred directly when the current tool publishes a result.',
  installQuestion: (name) => `Do I need to install anything to use ${name}?`,
  installAnswer:
    'No. The interactive developer tool runs in the browser, so you can use it without installing a CLI or desktop application.',
  resultQuestion: (name) => `What should I do with the result from ${name}?`,
  resultAnswer:
    'Review the generated or transformed output, then copy it into your code, configuration, request, test fixture, or a compatible next-step tool in the workflow.',
  howToName: (name) => `How to use ${name}`,
  howToStepName: (position) => `Step ${position}`,
  relatedToolsListName: (name) => `Tools related to ${name}`,
  topicCollectionsHeading: 'Topic collections',
};

const tr: ToolSeoCopy = {
  or: ' veya ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: 'metin', secret: 'gizli değer' },
  exampleHeading: (name) => `${name} ile örnek iş akışı`,
  exampleParagraph: (name) =>
    `${name} aracını kullanmanın pratik bir yolu, küçük ve temsili bir örnekle başlamak, çıktıyı doğrulamak ve ardından aynı iş akışını gerçek boyuttaki girdiyle tekrarlamaktır. Böylece biçimlendirme, dönüştürme veya doğrulama sorunları, sonuç başka bir yerde kullanılmadan önce daha kolay tespit edilir.`,
  startBullet: (inputTypes) =>
    `İncelemek, dönüştürmek veya oluşturmak istediğiniz gerçek değeri temsil eden bir girdiyle (${inputTypes}) başlayın.`,
  useBullet: (name, description) =>
    `Ardından ${name} aracını kullanın: ${withTerminalPunctuation(description)}`,
  reviewBullet: (outputTypes) =>
    `Sonucu (${outputTypes}) uygulama koduna, yapılandırmaya, belgelere veya bir test verisine kopyalamadan önce gözden geçirin.`,
  continueBullet:
    'İş akışına önerilen sonraki adım araçlarından biriyle devam edin; mevcut araç bir sonuç ürettiğinde uyumlu çıktı doğrudan aktarılabilir.',
  installQuestion: (name) => `${name} aracını kullanmak için bir şey yüklemem gerekiyor mu?`,
  installAnswer:
    'Hayır. Etkileşimli geliştirici aracı tarayıcıda çalışır; bu nedenle bir CLI veya masaüstü uygulaması yüklemeden kullanabilirsiniz.',
  resultQuestion: (name) => `${name} ile elde ettiğim sonucu ne yapmalıyım?`,
  resultAnswer:
    'Oluşturulan veya dönüştürülen çıktıyı gözden geçirin, ardından kodunuza, yapılandırmanıza, isteğinize, test verinize veya iş akışındaki uyumlu bir sonraki adım aracına kopyalayın.',
  howToName: (name) => `${name} nasıl kullanılır`,
  howToStepName: (position) => `Adım ${position}`,
  relatedToolsListName: (name) => `${name} ile ilgili araçlar`,
  topicCollectionsHeading: 'Konu koleksiyonları',
};

const de: ToolSeoCopy = {
  or: ' oder ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: 'Text', secret: 'Geheimnis' },
  exampleHeading: (name) => `Beispiel-Workflow mit ${name}`,
  exampleParagraph: (name) =>
    `Eine praktische Art, ${name} zu nutzen: Beginnen Sie mit einer kleinen, repräsentativen Stichprobe, prüfen Sie die Ausgabe und wiederholen Sie denselben Ablauf anschließend mit Eingaben in Produktionsgröße. So lassen sich Formatierungs-, Konvertierungs- oder Validierungsprobleme leichter eingrenzen, bevor das Ergebnis an anderer Stelle weiterverwendet wird.`,
  startBullet: (inputTypes) =>
    `Beginnen Sie mit Eingabedaten (${inputTypes}), die den realen Wert repräsentieren, den Sie prüfen, konvertieren oder erzeugen möchten.`,
  useBullet: (name, description) =>
    `Verwenden Sie anschließend ${name}: ${withTerminalPunctuation(description)}`,
  reviewBullet: (outputTypes) =>
    `Prüfen Sie das Ergebnis (${outputTypes}), bevor Sie es in Anwendungscode, Konfiguration, Dokumentation oder ein Test-Fixture übernehmen.`,
  continueBullet:
    'Setzen Sie den Workflow mit einem der vorgeschlagenen Folge-Tools fort; kompatible Ausgaben lassen sich direkt übertragen, sobald das aktuelle Tool ein Ergebnis bereitstellt.',
  installQuestion: (name) => `Muss ich etwas installieren, um ${name} zu verwenden?`,
  installAnswer:
    'Nein. Das interaktive Entwicklertool läuft im Browser, sodass Sie es ohne Installation einer CLI oder Desktop-Anwendung nutzen können.',
  resultQuestion: (name) => `Was mache ich mit dem Ergebnis von ${name}?`,
  resultAnswer:
    'Prüfen Sie die erzeugte oder umgewandelte Ausgabe und kopieren Sie sie dann in Ihren Code, Ihre Konfiguration, Ihre Anfrage, Ihr Test-Fixture oder in ein kompatibles Folge-Tool im Workflow.',
  howToName: (name) => `So verwenden Sie ${name}`,
  howToStepName: (position) => `Schritt ${position}`,
  relatedToolsListName: (name) => `Verwandte Tools zu ${name}`,
  topicCollectionsHeading: 'Themensammlungen',
};

const es: ToolSeoCopy = {
  or: ' o ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: 'texto', secret: 'secreto' },
  exampleHeading: (name) => `Flujo de trabajo de ejemplo con ${name}`,
  exampleParagraph: (name) =>
    `Una forma práctica de usar ${name} es empezar con una muestra pequeña y representativa, verificar el resultado y luego repetir el mismo flujo con datos de tamaño real. Así es más fácil aislar problemas de formato, conversión o validación antes de reutilizar el resultado en otro lugar.`,
  startBullet: (inputTypes) =>
    `Empieza con una entrada (${inputTypes}) que represente el valor real que quieres inspeccionar, convertir o generar.`,
  useBullet: (name, description) => `Después, usa ${name}: ${withTerminalPunctuation(description)}`,
  reviewBullet: (outputTypes) =>
    `Revisa el resultado (${outputTypes}) antes de copiarlo en el código de tu aplicación, la configuración, la documentación o un fixture de pruebas.`,
  continueBullet:
    'Continúa el flujo con una de las herramientas sugeridas para el siguiente paso; la salida compatible se puede transferir directamente cuando la herramienta actual publica un resultado.',
  installQuestion: (name) => `¿Necesito instalar algo para usar ${name}?`,
  installAnswer:
    'No. Esta herramienta interactiva para desarrolladores funciona en el navegador, así que puedes usarla sin instalar una CLI ni una aplicación de escritorio.',
  resultQuestion: (name) => `¿Qué hago con el resultado de ${name}?`,
  resultAnswer:
    'Revisa la salida generada o transformada y luego cópiala en tu código, configuración, solicitud, fixture de pruebas o en una herramienta compatible para el siguiente paso del flujo.',
  howToName: (name) => `Cómo usar ${name}`,
  howToStepName: (position) => `Paso ${position}`,
  relatedToolsListName: (name) => `Herramientas relacionadas con ${name}`,
  topicCollectionsHeading: 'Colecciones temáticas',
};

const fr: ToolSeoCopy = {
  or: ' ou ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: 'texte', secret: 'secret' },
  exampleHeading: (name) => `Exemple de flux de travail avec ${name}`,
  exampleParagraph: (name) =>
    `Une façon pratique d'utiliser ${name} consiste à commencer par un petit échantillon représentatif, à vérifier la sortie, puis à répéter le même processus avec des données de taille réelle. Il est ainsi plus facile d'isoler les problèmes de formatage, de conversion ou de validation avant de réutiliser le résultat ailleurs.`,
  startBullet: (inputTypes) =>
    `Commencez par une entrée (${inputTypes}) qui représente la valeur réelle que vous souhaitez inspecter, convertir ou générer.`,
  useBullet: (name, description) =>
    `Utilisez ensuite ${name} : ${withTerminalPunctuation(description)}`,
  reviewBullet: (outputTypes) =>
    `Vérifiez le résultat (${outputTypes}) avant de le copier dans le code de votre application, votre configuration, votre documentation ou une fixture de test.`,
  continueBullet:
    "Poursuivez le flux de travail avec l'un des outils suggérés pour l'étape suivante ; une sortie compatible peut être transférée directement lorsque l'outil actuel publie un résultat.",
  installQuestion: (name) => `Dois-je installer quelque chose pour utiliser ${name} ?`,
  installAnswer:
    "Non. L'outil de développement interactif fonctionne dans le navigateur : vous pouvez donc l'utiliser sans installer de CLI ni d'application de bureau.",
  resultQuestion: (name) => `Que faire du résultat obtenu avec ${name} ?`,
  resultAnswer:
    "Vérifiez la sortie générée ou transformée, puis copiez-la dans votre code, votre configuration, votre requête, votre fixture de test ou dans un outil compatible pour l'étape suivante.",
  howToName: (name) => `Comment utiliser ${name}`,
  howToStepName: (position) => `Étape ${position}`,
  relatedToolsListName: (name) => `Outils liés à ${name}`,
  topicCollectionsHeading: 'Collections thématiques',
};

// Russian nouns decline, so tool names are quoted after "инструмент" to keep
// every sentence grammatical regardless of the (undeclined) tool name.
const ru: ToolSeoCopy = {
  or: ' или ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: 'текст', secret: 'секрет' },
  exampleHeading: (name) => `Пример рабочего процесса: ${name}`,
  exampleParagraph: (name) =>
    `Практичный способ работы с инструментом «${name}» — начать с небольшого репрезентативного примера, проверить результат, а затем повторить тот же процесс с данными реального объёма. Так проще локализовать проблемы форматирования, преобразования или валидации до того, как результат будет использован в другом месте.`,
  startBullet: (inputTypes) =>
    `Начните с входных данных (${inputTypes}), отражающих реальное значение, которое нужно проверить, преобразовать или сгенерировать.`,
  useBullet: (name, description) =>
    `Затем используйте инструмент «${name}»: ${withTerminalPunctuation(description)}`,
  reviewBullet: (outputTypes) =>
    `Проверьте результат (${outputTypes}), прежде чем копировать его в код приложения, конфигурацию, документацию или тестовые данные.`,
  continueBullet:
    'Продолжите работу с одним из предложенных инструментов для следующего шага; совместимый результат можно передать напрямую, когда текущий инструмент его опубликует.',
  installQuestion: (name) =>
    `Нужно ли что-то устанавливать, чтобы пользоваться инструментом «${name}»?`,
  installAnswer:
    'Нет. Интерактивный инструмент для разработчиков работает в браузере, поэтому им можно пользоваться без установки CLI или настольного приложения.',
  resultQuestion: (name) => `Что делать с результатом инструмента «${name}»?`,
  resultAnswer:
    'Проверьте сгенерированный или преобразованный результат, затем скопируйте его в код, конфигурацию, запрос, тестовые данные или в совместимый инструмент для следующего шага.',
  howToName: (name) => `Как пользоваться инструментом «${name}»`,
  howToStepName: (position) => `Шаг ${position}`,
  relatedToolsListName: (name) => `Инструменты, связанные с «${name}»`,
  topicCollectionsHeading: 'Тематические подборки',
};

const zh: ToolSeoCopy = {
  or: ' 或 ',
  dataTypeLabels: { ...technicalDataTypeLabels, text: '文本', secret: '密钥' },
  exampleHeading: (name) => `${name} 使用示例流程`,
  exampleParagraph: (name) =>
    `使用 ${name} 的实用方法是：先用一个小而具有代表性的样本开始，验证输出，然后用生产规模的输入重复相同的流程。这样可以在结果被用于其他地方之前，更容易定位格式化、转换或验证方面的问题。`,
  startBullet: (inputTypes) => `从能代表您要检查、转换或生成的真实值的输入（${inputTypes}）开始。`,
  useBullet: (name, description) =>
    `然后使用 ${name}：${withTerminalPunctuation(description, '。')}`,
  reviewBullet: (outputTypes) =>
    `在将结果（${outputTypes}）复制到应用代码、配置、文档或测试数据之前，请先检查。`,
  continueBullet: '使用建议的下一步工具继续工作流程；当前工具生成结果后，兼容的输出可直接传递。',
  installQuestion: (name) => `使用 ${name} 需要安装任何东西吗？`,
  installAnswer: '不需要。这个交互式开发者工具在浏览器中运行，无需安装 CLI 或桌面应用即可使用。',
  resultQuestion: (name) => `${name} 生成的结果应该如何使用？`,
  resultAnswer:
    '检查生成或转换后的输出，然后将其复制到您的代码、配置、请求、测试数据中，或传递给工作流程中兼容的下一步工具。',
  howToName: (name) => `如何使用 ${name}`,
  howToStepName: (position) => `第 ${position} 步`,
  relatedToolsListName: (name) => `与 ${name} 相关的工具`,
  topicCollectionsHeading: '专题合集',
};

export const toolSeoCopy: Record<Language, ToolSeoCopy> = { en, tr, de, es, fr, ru, zh };

export function getToolSeoCopy(locale: Language | string | undefined): ToolSeoCopy {
  return (locale && toolSeoCopy[locale as Language]) || en;
}
