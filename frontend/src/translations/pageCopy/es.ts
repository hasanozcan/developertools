// Spanish FAQ and explanatory page copy; loaded only on the server.
export const esPageCopy: Record<string, string> = {
  'pageText.494b4551': '¿Mis datos son privados?',
  'pageText.62172ab3': 'Sí, todo se ejecuta localmente en tu navegador.',
  'pageText.f60263be': '¿Qué es JSON?',
  'pageText.b285e12f':
    'JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos que resulta fácil de leer y escribir para las personas, y de analizar y generar para las máquinas.',
  'pageText.5fb110d7': '¿Cómo formateo JSON?',
  'pageText.3241bbe1':
    'Pega JSON válido en el campo de entrada, elige las opciones de sangría y ordenación de claves que necesites y selecciona Formatear JSON.',
  'pageText.fd4a654d': '¿Mis datos están seguros?',
  'pageText.542fb6d3':
    '¡Sí! Todo el procesamiento se realiza en tu navegador. Tus datos nunca salen de tu equipo.',
  'pageText.d16ff7e1': 'Qué hace el formateador JSON',
  'pageText.647c3353':
    'Un formateador JSON analiza texto JSON y serializa el valor resultante con espacios uniformes. Esta herramienta puede aplicar la sangría seleccionada, minificar el resultado y, opcionalmente, ordenar las claves de los objetos de forma recursiva. RFC 8259 exige comillas dobles en los nombres de objetos y las cadenas; los comentarios, las comas finales, NaN e Infinity quedan fuera de la gramática JSON. El formato cambia la presentación, no el significado previsto de los datos.',
  'pageText.c80fe1c6': 'Usos habituales y límites de validación',
  'pageText.b49ba2b3':
    'Usa el formateador cuando necesites inspeccionar o normalizar JSON durante el desarrollo:',
  'pageText.92e09088':
    'Facilitar la lectura de respuestas compactas de API, cuerpos de webhooks, configuraciones o entradas de registros.',
  'pageText.a1f30e1f':
    'Minificar JSON válido antes de copiarlo en una solicitud, datos de prueba o una variable de entorno.',
  'pageText.57fc338e':
    'Ordenar las claves para hacer más predecible una comparación manual entre dos objetos.',
  'pageText.a199e1c3':
    'Detectar errores de análisis causados por comas ausentes, corchetes desparejados o comillas no válidas.',
  'pageText.bcfd24c3':
    'Un análisis correcto solo comprueba la sintaxis. No aplica JSON Schema, contratos de API, campos obligatorios, tipos de dominio ni reglas de negocio.',
  'pageText.0b90c1ae': 'Ejemplo de formato explicado',
  'pageText.52d27152':
    'La entrada {"active":true,"user":{"id":42,"roles":["admin","editor"]}} se convierte en un objeto con sangría en el que se distinguen de un vistazo el valor user anidado y el array roles. La minificación vuelve a producir la forma compacta. Si la entrada contuviera una coma final, el analizador del navegador la rechazaría en lugar de corregir el documento silenciosamente.',
  'pageText.97fb560b': 'Limitaciones y privacidad',
  'pageText.57498e3b':
    'El análisis usa números JavaScript, por lo que los enteros que superan el rango representable de forma fiable pueden perder precisión.',
  'pageText.ff4c61d4':
    'Los nombres de objeto duplicados pueden fusionarse durante el análisis; evita analizar y volver a serializar cuando sea necesario conservar los duplicados.',
  'pageText.c4310853':
    'La salida ordenada es útil, pero no constituye un formato de canonicalización JSON criptográfico y no debe usarse para preparar datos firmados.',
  'pageText.e01043b7':
    'El procesamiento se ejecuta en el navegador. El JSON sensible aún puede quedar expuesto mediante el historial del portapapeles, extensiones del navegador, pantalla compartida o un dispositivo compartido.',
  'pageText.7491abdf': '¿Qué comprueba esta herramienta?',
  'pageText.000db4ab':
    'Comprueba la sintaxis JSON definida por RFC 8259: claves y cadenas entre comillas dobles, comas entre elementos, corchetes y llaves correspondientes, números y escapes válidos, y un único valor de nivel superior.',
  'pageText.d5749034': '¿Cuáles son los errores JSON habituales?',
  'pageText.5c93c394':
    'Comas ausentes o finales, comillas simples en lugar de dobles, nombres de propiedades sin comillas, comentarios, saltos de línea sin escapar dentro de cadenas y corchetes de cierre ausentes.',
  'pageText.e46fbe66': '¿Por qué falla el JSON con comentarios o comas finales?',
  'pageText.716a4b48':
    'El JSON estándar no permite ninguno. Editores como VS Code los aceptan en archivos de configuración JSONC, y JSON5 también los admite, pero JSON.parse y la mayoría de las API los rechazan. Elimínalos antes de enviar los datos a un analizador estricto.',
  'pageText.14469b94': '¿Por qué el error señala el lugar equivocado?',
  'pageText.7c657bf0':
    'Los analizadores indican dónde dejaron de poder continuar, que suele ser justo después del error real. Una coma ausente se señala en la siguiente clave, y una cadena o un corchete sin cerrar pueden detectarse solo al final de la entrada.',
  'pageText.40ba76d4': '¿Un JSON válido cumple mi contrato de API?',
  'pageText.10c910fb':
    'No. La validación de sintaxis solo demuestra que el texto puede analizarse. Para comprobar campos obligatorios, tipos y valores permitidos, valida el documento frente a un esquema con el validador JSON Schema.',
  'pageText.eb70ad1f':
    'Sí. La validación se ejecuta en tu navegador mediante JSON.parse y el JSON que pegas no se sube.',
  'pageText.c7264f74': 'Qué hace que un JSON sea válido',
  'pageText.bc86098b':
    'JSON es más estricto que la sintaxis de objetos JavaScript. Un documento es un único valor: un objeto, array, cadena, número, true, false o null. Las claves y cadenas deben usar comillas dobles y solo se permite un pequeño conjunto de escapes con barra inversa (como \\n, \\t, \\" y \\uXXXX) dentro de las cadenas. Los números no pueden tener ceros iniciales, un + inicial ni un punto decimal final; NaN e Infinity no son válidos. Los comentarios y las comas finales no forman parte del estándar, por lo que los archivos JSONC y JSON5 fallan aquí aunque tu editor los acepte.',
  'pageText.41041c7a': 'Errores JSON habituales y cómo corregirlos',
  'pageText.5e91d5ea': 'Coma final: {"a": 1,} - elimina la coma después del último elemento.',
  'pageText.c20c98a8': "Comillas simples: {'a': 'b'} - sustitúyelas por comillas dobles.",
  'pageText.dcfdd19f': 'Claves sin comillas: {a: 1} - entrecomilla todas las claves: {"a": 1}.',
  'pageText.544083f8':
    'Coma ausente: {"a": 1 "b": 2} - el error suele señalar "b", el inicio del siguiente elemento.',
  'pageText.9cec3362':
    'Saltos de línea o tabulaciones literales dentro de una cadena - escríbelos como \\n o \\t.',
  'pageText.7165deea':
    'Literales de lenguaje: True, None, undefined y NaN no son valores JSON; usa true, null o una cadena.',
  'pageText.02f2728d': 'Cómo interpretar la posición del error',
  'pageText.e4c68e30':
    'El texto del error proviene del analizador JSON de tu navegador, por lo que su redacción cambia entre Chrome, Firefox y Safari. Cuando el mensaje incluye una posición de carácter, el validador la convierte en línea y columna. Revisa ese punto y lo que lo precede: los analizadores fallan en el primer carácter que no puede continuar un documento válido, a menudo un token después del error real.',
  'pageText.21519e4a': 'Estadísticas y límites del analizador',
  'pageText.7a975d41':
    'Para JSON válido, la herramienta cuenta objetos, arrays, cadenas, números, booleanos, valores null y claves totales, e indica la profundidad máxima de anidación. Estas cifras ayudan a detectar cargas demasiado profundas o cambios de tipo, como números que llegan como cadenas. Hay dos comportamientos de JSON.parse que conviene conocer: se aceptan claves duplicadas y prevalece el último valor, y los números se leen como valores de coma flotante de 64 bits, por lo que los enteros mayores que 2^53 - 1 pierden precisión en el valor analizado y en la copia formateada.',
  'pageText.035fa382': '¿En qué se diferencia del validador JSON?',
  'pageText.bab0a1c3':
    'El validador JSON comprueba si el texto tiene sintaxis JSON válida. El validador JSON Schema también comprueba el valor analizado frente a reglas como propiedades obligatorias, tipos, rangos y estructuras anidadas.',
  'pageText.c715893e': '¿Qué versión de JSON Schema admite esta herramienta?',
  'pageText.b987a2d9':
    'La herramienta usa Ajv v8 con su validador predeterminado compatible con Draft 7. Las palabras clave de extensión desconocidas se ignoran con una advertencia visible; los esquemas que requieren otro metaesquema pueden necesitar una configuración específica para esa versión.',
  'pageText.7d800344': '¿Se sube mi JSON?',
  'pageText.0f050d2b':
    'No. El análisis, la compilación del esquema y la validación se ejecutan en tu navegador. Evita datos sensibles en dispositivos compartidos, ya que el historial del portapapeles y las extensiones pueden exponerlos.',
  'pageText.842ff766': 'Qué comprueba la validación JSON Schema',
  'pageText.0cf82fa3':
    'La validación de sintaxis JSON solo demuestra que el texto puede analizarse. La validación JSON Schema aplica un contrato al valor analizado. Puede exigir propiedades, limitar tipos y rangos de valores, rechazar campos inesperados y validar arrays u objetos anidados. El resultado incluye la ruta de instancia, la ruta del esquema, la palabra clave y el mensaje de cada incumplimiento detectado.',
  'pageText.54bfa1e8': 'Cómo usar el validador',
  'pageText.813839e9': 'Pega el valor JSON que quieres probar en el editor del documento.',
  'pageText.110b07c6': 'Pega un JSON Schema compatible con Draft 7 en el editor del esquema.',
  'pageText.f0234285':
    'Selecciona Validar para compilar el esquema e informar de todos los errores correspondientes.',
  'pageText.060913a1':
    'Usa las rutas de instancia para localizar valores incorrectos del documento y las rutas del esquema para localizar la regla que los rechazó.',
  'pageText.2b1361d8': 'Límites y privacidad',
  'pageText.74eb328b':
    'Un resultado válido significa que el documento actual cumple todas las reglas reconocidas del esquema proporcionado; no demuestra que el esquema exprese todas las reglas de negocio. Las palabras clave de extensión desconocidas se ignoran con una advertencia visible. Los esquemas externos no se descargan automáticamente, y aquellos que apuntan a versiones no compatibles o referencias remotas pueden requerir una configuración específica de la aplicación. El documento y el esquema se analizan con números JavaScript, por lo que los enteros fuera del rango seguro pueden perder precisión.',
  'pageText.e7bc2558': '¿Qué formatos se admiten?',
  'pageText.ffabae3c':
    'Arrays JSON de objetos por un lado y texto delimitado por el otro: CSV separado por comas o punto y coma, TSV separado por tabulaciones o valores separados por barras verticales.',
  'pageText.5e2ca3f9': '¿Cómo se tratan los objetos anidados?',
  'pageText.929320e9':
    'Con Manejo de anidados en Aplanar, los objetos anidados se convierten en columnas con notación de puntos, como address.city, y los arrays se escriben como texto JSON. Cadena JSON escribe cada objeto o array anidado como texto JSON en una sola columna de nivel superior.',
  'pageText.e74ea8dd': '¿Puedo convertir un único objeto JSON a CSV?',
  'pageText.2de8fa13':
    'Envuélvelo primero entre corchetes, por ejemplo [{"id": 1}]. El conversor espera un array no vacío en el que cada objeto se convierte en una fila.',
  'pageText.16c231f7': '¿Por qué todos los valores son cadenas después de convertir CSV a JSON?',
  'pageText.82993149':
    'CSV no tiene tipos de datos, por lo que cada celda se devuelve como una cadena ("30", no 30) para evitar suposiciones incorrectas sobre valores como códigos postales o ID con ceros iniciales. Convierte los campos que necesites en tu propio código.',
  'pageText.df332cb3': '¿Por qué Excel muestra caracteres acentuados incorrectos?',
  'pageText.af4d1154':
    'El archivo descargado es UTF-8 sin marca de orden de bytes, y algunas versiones de Excel suponen una codificación antigua al abrir un CSV con doble clic. Impórtalo mediante Datos > Desde texto/CSV y elige UTF-8.',
  'pageText.44ee1d3e': '¿Se suben mis datos?',
  'pageText.3c70ccff':
    'No. El análisis y la conversión se ejecutan en tu navegador y la descarga se genera localmente.',
  'pageText.c0a1927b': 'Qué estructura JSON se convierte a CSV',
  'pageText.110e0569':
    'CSV es una tabla plana, por lo que la entrada debe ser un array JSON de objetos, por ejemplo [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]. Cada objeto se convierte en una fila. La cabecera contiene la unión de todas las claves según su primera aparición; si a un objeto le falta una clave, obtiene una celda vacía sin desplazar las otras columnas, y los valores null también se escriben como celdas vacías. Se rechaza cualquier entrada que no sea un array no vacío, y un array de valores simples como [1, 2, 3] no tiene claves que convertir en columnas.',
  'pageText.16c22164': 'Tratamiento de objetos y arrays anidados',
  'pageText.2c00e178':
    'Aplanar (predeterminado): {"address": {"city": "Paris"}} se convierte en una columna address.city. Los arrays se escriben como texto JSON en una celda, por ejemplo ["a","b"].',
  'pageText.98e451ad':
    'Cadena JSON: conserva solo las columnas de nivel superior y escribe cada objeto o array anidado como texto JSON en su celda.',
  'pageText.e646f74d':
    'Expandir: también conserva las columnas de nivel superior, pero no serializa objetos anidados, por lo que aparecen como [object Object]. Usa Aplanar o Cadena JSON si tus datos están anidados.',
  'pageText.869ce735':
    'Comillas: los campos que contienen el delimitador, una comilla doble o un salto de línea se envuelven entre comillas dobles, y las comillas interiores se duplican (""), como describe RFC 4180.',
  'pageText.73ca705a': 'Convertir CSV de vuelta a JSON',
  'pageText.cbff28ff':
    'El analizador CSV trata campos entre comillas, comillas duplicadas y saltos de línea dentro de valores entre comillas, y acepta terminaciones de línea LF y CRLF. Si Primera fila es encabezado está activado, las celdas de cabecera se convierten en nombres de propiedades; de lo contrario, las claves son column1, column2, etc. Se omiten líneas vacías, las celdas ausentes se convierten en cadenas vacías y las celdas que superan el ancho de la cabecera se descartan. Las cabeceras con puntos como address.city no se reconstruyen como objetos anidados y todos los valores siguen siendo cadenas; procesa el resultado después si necesitas números, booleanos o anidación.',
  'pageText.e37dc901': 'Elegir un delimitador',
  'pageText.1b5836ff':
    'Usa comas para la mayoría de las herramientas y API. Usa punto y coma si el archivo se abrirá en una hoja de cálculo con configuración regional que usa la coma decimal; tabulaciones si quieres TSV que pueda pegarse fácilmente en hojas de cálculo; o barras verticales si los valores contienen comas con frecuencia. Usa el mismo delimitador al convertir el archivo de vuelta.',
  'pageText.3f419e1e': '¿Cuál es la diferencia entre interface y type?',
  'pageText.2896a196':
    'Ambos describen estructuras de objetos. Las interfaces pueden ampliarse con extends y fusionarse entre declaraciones; los alias de tipo también pueden expresar uniones, intersecciones y tipos mapeados. Para modelos sencillos de API, ambos sirven, así que sigue la convención de tu código.',
  'pageText.a76e5f0e': '¿Cómo se tratan los arrays?',
  'pageText.9e602604':
    'Los arrays de un solo tipo se convierten en string[], number[], etc. Los arrays mixtos se convierten en uniones como (string | null)[]. En arrays de objetos, las claves de todos los elementos se fusionan en un único tipo de elemento, y un array vacío se convierte en unknown[].',
  'pageText.15efe178': '¿Por qué una propiedad tiene el tipo null o unknown[]?',
  'pageText.e7edbada':
    'La muestra no contiene información suficiente. Un valor null solo puede recibir el tipo null, y un array vacío no tiene elementos que inspeccionar. Sustitúyelos por los tipos reales, por ejemplo string | null u Order[].',
  'pageText.3f42cbef': '¿Los tipos generados validan datos en ejecución?',
  'pageText.63a3aa5d':
    'No. Los tipos TypeScript se eliminan al compilar el código, por lo que no pueden rechazar una respuesta de API incorrecta. Combínalos con un validador en ejecución como Zod o con validación JSON Schema para entradas no fiables.',
  'pageText.dfbfc464': '¿Cómo uso la interfaz generada?',
  'pageText.ecad980d':
    'Guárdala en un archivo .ts, impórtala y anota los datos analizados, por ejemplo const user = (await response.json()) as Root; La conversión de tipo documenta la estructura esperada, pero no la comprueba.',
  'pageText.f2cb618b':
    'No. El JSON se analiza y convierte en tu navegador y los tipos generados no se envían a ningún lugar.',
  'pageText.24604c50': 'Cómo se infieren tipos a partir de una muestra JSON',
  'pageText.775e7460':
    'El conversor analiza tu JSON y asigna un tipo TypeScript a cada valor: cadenas a string, números a number (JSON no tiene un tipo entero separado), true y false a boolean, y null a null. Los objetos se convierten en interfaces o alias de tipo, y los arrays en el tipo de sus elementos seguido de []. Por ejemplo, {"id": 1, "tags": ["a", "b"], "owner": null} produce id: number; tags: string[]; owner: null;. Las claves que no son identificadores válidos, como "first-name", se entrecomillan en la salida.',
  'pageText.2a4f9a5c': 'Opciones y sus efectos',
  'pageText.d80a13bc':
    'Nombre del tipo raíz establece el nombre del tipo de nivel superior, convertido a PascalCase.',
  'pageText.58ca8924': 'Usar interface alterna entre declaraciones interface y alias de tipo.',
  'pageText.b2718dc0': 'Hacer propiedades opcionales añade ? a cada propiedad.',
  'pageText.7bc73d90': 'Añadir export antepone export a cada declaración.',
  'pageText.f1ea6f0b':
    'Extraer anidados crea una interfaz con nombre para cada objeto anidado y para los objetos dentro de arrays (orders se convierte en OrdersItem[]) en lugar de tipos de objetos en línea.',
  'pageText.e8492b19':
    'Detectar tipos unión escribe arrays mixtos como uniones, por ejemplo (string | null)[].',
  'pageText.f3ef2d66':
    'Comentarios JSDoc añade un comentario sobre cada propiedad; con Extraer anidados activado, los comentarios incluyen valores de ejemplo.',
  'pageText.91b2ba93': 'Límites de inferir tipos a partir de una sola muestra',
  'pageText.962bd555':
    'Un único documento JSON muestra una respuesta concreta, no todas las estructuras que una API puede devolver. Revisa estos casos antes de confiar en la salida:',
  'pageText.c04be53a':
    'Los valores null en la muestra solo reciben el tipo null. Con Extraer anidados activado, también se marcan como opcionales.',
  'pageText.65099d30':
    'En arrays de objetos, el primer valor de cada clave decide su tipo, y las claves que solo aparecen en algunos elementos no se marcan como opcionales salvo que actives Hacer propiedades opcionales.',
  'pageText.1eb094ba':
    'Con Extraer anidados activado, las cadenas de fecha ISO como 2024-01-15 o 2024-01-15T00:00:00Z reciben el tipo Date. JSON.parse devuelve cadenas, así que cambia estos tipos a string salvo que tu código las convierta.',
  'pageText.1effcea1':
    'Las cadenas numéricas siguen siendo string y los enteros grandes siguen siendo number; el generador no deduce bigint ni tipos de ID con marca.',
  'pageText.9f62e4a3':
    'Las propiedades mantienen el orden de la muestra y un objeto sin claves se convierte en {} con interfaces o Record<string, unknown> con alias de tipo.',
  'pageText.0a050da5': '¿Qué es YAML?',
  'pageText.521b34a0':
    "YAML (YAML Ain't Markup Language) es un formato de serialización de datos fácil de leer que usa sangría en lugar de llaves. Es habitual en archivos de configuración de Kubernetes, Docker Compose, GitHub Actions y Ansible.",
  'pageText.758c1349': '¿Cuándo debería usar YAML o JSON?',
  'pageText.ed21d83b':
    'YAML es más fácil de leer y editar a mano y admite comentarios, lo que resulta útil para configuraciones. JSON es más sencillo de analizar, no tiene reglas de sangría y está ampliamente admitido, lo que resulta útil para API e intercambio de datos.',
  'pageText.e2958c4e': '¿Qué modo de compatibilidad YAML se utiliza?',
  'pageText.962cba8d':
    'La conversión usa el esquema de compatibilidad YAML 1.1 de js-yaml, por lo que las anclas, alias, claves de fusión, etiquetas explícitas y escalares tipados funcionan como en la muestra. YAML 1.1 puede interpretar algunos escalares simples de forma diferente a YAML 1.2.',
  'pageText.d8137672': '¿Por qué yes, no o NO se convirtieron en true o false?',
  'pageText.a21ecd10':
    'En YAML 1.1, yes, no, on y off sin comillas son booleanos. Entrecomilla el valor, por ejemplo country: "NO", si debe seguir siendo una cadena.',
  'pageText.5403e57d': '¿Puedo convertir un archivo YAML de varios documentos?',
  'pageText.69ba905b':
    'No en una sola pasada. Este conversor lee un único documento e informa de un error si encuentra separadores --- seguidos de más contenido. Divide el archivo y convierte cada documento por separado.',
  'pageText.1368c99b': '¿Se conservan los comentarios YAML?',
  'pageText.311c9ca4':
    'No. JSON no tiene sintaxis de comentarios, por lo que se eliminan al convertir a JSON y no pueden recuperarse al volver a YAML.',
  'pageText.c261a8ae': 'Cómo se transforma YAML en JSON',
  'pageText.4bc6e145':
    'Los mapas YAML se convierten en objetos JSON, las secuencias en arrays y los escalares en cadenas, números, booleanos o null. Los comentarios se descartan, y las anclas (&name), alias (*name) y claves de fusión (<<: *defaults) se expanden en copias completas, por lo que el JSON puede ser más largo que el YAML. Convertir JSON a YAML produce YAML sencillo con estilo de bloques: las claves mantienen su orden original, las cadenas largas no se dividen en líneas y los objetos repetidos se escriben completos en lugar de como anclas.',
  'pageText.8680939e': 'Valores YAML 1.1 que no son cadenas',
  'pageText.28441e9f':
    'El esquema YAML 1.1 coincide con muchos analizadores de configuración existentes, pero asigna tipos inesperados a algunos valores sin comillas:',
  'pageText.b9e6b5c4':
    'yes, no, on y off se convierten en true o false. Es el conocido problema de Noruega, en el que country: NO se convierte en false.',
  'pageText.195c972a':
    'Los números con un cero inicial, como 010, se interpretan como octales (8), y 0x1F como hexadecimales (31).',
  'pageText.4683982b':
    'Los dígitos separados por dos puntos, como 22:22, se interpretan como números en base 60 (1342), lo que puede alterar las asignaciones de puertos y las horas.',
  'pageText.bc57ba5f':
    'version: 1.10 se convierte en el número 1.1, y las fechas como 2024-01-01 se convierten en marcas temporales (2024-01-01T00:00:00.000Z).',
  'pageText.b58f4598': 'Comillas y errores de análisis habituales',
  'pageText.f9b2a402':
    'Pon entre comillas cualquier valor que deba conservarse como texto: version: "1.10", port: "22:22", country: "NO". La salida de JSON a YAML añade automáticamente comillas a esas cadenas.',
  'pageText.159243ab':
    'No se permiten tabuladores para la sangría. El mensaje de error indica la línea y la columna, por ejemplo (2:1).',
  'pageText.cafe74b5':
    'Un error de sangría incorrecta en una entrada del mapa suele indicar que una clave tiene un número de espacios diferente al de las claves del mismo nivel.',
  'pageText.249bfb43':
    'Los valores sin comillas que empiezan por *, &, !, %, @ o una comilla invertida tienen un significado especial en YAML y deben ponerse entre comillas.',
  'pageText.b07acd91':
    'La conversión de JSON a YAML requiere JSON estricto: rechaza las comas finales, los comentarios y las cadenas entre comillas simples.',
  'pageText.6ad0b0ed': 'Comprobación de archivos de Kubernetes y CI',
  'pageText.155c7fbc':
    'Los manifiestos de Kubernetes, los archivos de Docker Compose y los flujos de trabajo de GitHub Actions se escriben en YAML, mientras que la salida de herramientas como kubectl get -o json y jq trabaja con JSON. Convertir un archivo a JSON permite ver rápidamente qué tipo asignó un analizador a cada valor; por ejemplo, si un puerto pasó a ser un número o una versión se mantuvo como cadena, antes de que provoque un fallo de despliegue. Al volver a convertirlo a YAML, añade a mano los comentarios que necesites.',
  'pageText.ac46f1af': '¿JSON Pointer es lo mismo que JSONPath?',
  'pageText.cac8f6a8':
    'No. JSON Pointer es la sintaxis compacta definida en RFC 6901 para identificar un valor. JSONPath es un lenguaje de consulta distinto, con filtros, comodines y otras funciones de selección.',
  'pageText.8f9cad79': '¿Cómo hago referencia a una barra o una tilde en una clave?',
  'pageText.de336765':
    'Codifica una tilde como ~0 y una barra como ~1 dentro de cada token de referencia. Por ejemplo, /a~1b selecciona el miembro del objeto llamado a/b.',
  'pageText.3da5dc4a': '¿Qué selecciona un puntero vacío?',
  'pageText.354d9f94': 'El JSON Pointer vacío selecciona el documento JSON completo.',
  'pageText.57bcfda7': 'Qué hace el evaluador de JSON Pointer',
  'pageText.f894f2e1':
    'JSON Pointer identifica un valor recorriendo tokens de referencia separados por barras en un documento JSON. Los tokens de objetos coinciden exactamente con los nombres de sus miembros, mientras que los tokens de matrices usan índices que empiezan en cero. El evaluador informa si falta un miembro, hay una secuencia de escape no válida, un índice de matriz no válido o un intento de atravesar un valor primitivo, en lugar de devolver silenciosamente un valor incorrecto.',
  'pageText.ab93ef77': 'Sintaxis y límites',
  'pageText.ce9c3b21':
    'Usa una cadena vacía para la raíz del documento y / para un miembro de objeto cuyo nombre esté vacío.',
  'pageText.3cde0e22':
    'Codifica ~ como ~0 y / como ~1 dentro de un token. Decodifica primero ~1 como / y después ~0 como ~, tal como exige RFC 6901.',
  'pageText.dcc291b6':
    'Los índices de matrices son enteros decimales no negativos en su forma canónica. El token especial - sirve para las operaciones de anexado de JSON Patch, pero no identifica un valor existente.',
  'pageText.c2421fef':
    'La herramienta solo evalúa la sintaxis de JSON Pointer; no implementa filtros de JSONPath, operaciones de JSON Patch, decodificación de fragmentos URI ni validación de esquemas.',
  'pageText.532a56fb': '¿En qué se diferencia JSONPath de JSON Pointer?',
  'pageText.ad67c7e7':
    'JSON Pointer identifica un valor exacto mediante tokens separados por barras. JSONPath es un lenguaje de consulta que puede seleccionar varios valores con comodines, segmentos y descenso recursivo.',
  'pageText.f33ae85e': '¿Este comprobador admite expresiones de filtro?',
  'pageText.922825ba':
    'No. Admite deliberadamente un subconjunto básico seguro de RFC 9535 y rechaza filtros o expresiones de scripts en lugar de evaluar código. Usa nombres de elementos secundarios, índices, comodines, segmentos o descenso recursivo.',
  'pageText.37dcaef8': '¿Se sube el documento JSON?',
  'pageText.b2396fff':
    'No. El análisis de JSON y la evaluación de rutas se ejecutan en tu navegador. El historial del portapapeles, las extensiones, los scripts de la página y los dispositivos compartidos pueden exponer datos sensibles.',
  'pageText.926480c9': 'Qué selecciona el comprobador de JSONPath',
  'pageText.6475775d':
    'Una consulta JSONPath empieza en $ y recorre miembros de objetos o elementos de matrices. Una ruta singular como $.store.book[0].title selecciona un valor, mientras que los comodines, los segmentos y el descenso recursivo pueden producir una lista ordenada de coincidencias. Cada resultado incluye el valor seleccionado y una ruta normalizada hasta su ubicación en el documento de entrada.',
  'pageText.0522c849': 'Sintaxis admitida y límites de seguridad',
  'pageText.167ce42e':
    "Usa .name o ['name'] para miembros de objetos y [0] o [-1] para índices de matrices.",
  'pageText.325bdf69':
    'Usa .* o [*] para comodines de elementos secundarios, [start:end:step] para segmentos de matrices y ..name o ..* para el descenso recursivo.',
  'pageText.0fa965f1':
    'Se rechazan los selectores de filtro, JavaScript incrustado, las funciones y las expresiones similares a las de una shell; la herramienta nunca evalúa el texto de una consulta como código.',
  'pageText.0bd77a57':
    'El comprobador valida la sintaxis de JSON antes de consultar. No aplica JSON Schema ni demuestra que los valores seleccionados cumplan un contrato de API.',
  'pageText.86927e79': 'Interpretación de los resultados de JSONPath',
  'pageText.5564c402':
    'Cero coincidencias significa que la consulta válida no seleccionó ningún valor en el documento actual; es distinto de seleccionar un null de JSON. Los comodines y el descenso recursivo pueden devolver muchos valores, y los valores duplicados en ubicaciones diferentes siguen siendo coincidencias independientes porque sus rutas normalizadas difieren.',
  'pageText.2a7811c2': '¿Una sola muestra JSON puede describir todas las cargas útiles válidas?',
  'pageText.8aeafe2c':
    'No. El generador solo puede inferir los valores y las estructuras presentes en la muestra. Revisa los campos obligatorios y opcionales, las restricciones de negocio, las enumeraciones, los valores predeterminados, los refinamientos y las transformaciones según el contrato real de la API.',
  'pageText.9c0cad39': '¿Cómo se tratan las matrices y las propiedades de objeto ausentes?',
  'pageText.01ee6835':
    'Los tipos de los elementos de las matrices se combinan. Los objetos de una misma matriz comparten una estructura combinada, y una propiedad que falta en cualquiera de los objetos de muestra se vuelve opcional. Las matrices con valores primitivos de varios tipos se convierten en uniones de Zod, mientras que las matrices vacías usan elementos z.unknown().',
  'pageText.2decefae':
    'No. El análisis de JSON y la generación de esquemas se ejecutan en tu navegador. Los datos sensibles pueden quedar expuestos mediante el historial del portapapeles, las extensiones, la pantalla compartida o un dispositivo compartido, así que usa ejemplos anonimizados siempre que sea posible.',
  'pageText.a2131814': 'Qué produce el generador de JSON a Zod',
  'pageText.843b2234':
    'El generador analiza un valor JSON y convierte cadenas, números, enteros, booleanos, nulos, matrices y objetos en expresiones de Zod. El nombre raíz se normaliza como un identificador de esquema válido en TypeScript. Cuando se activan los tipos inferidos, la salida también incluye un alias z.infer para que el validador en tiempo de ejecución y el tipo en tiempo de compilación procedan del mismo esquema.',
  'pageText.9fdeb27b': 'Reglas de inferencia que conviene revisar',
  'pageText.a373d436':
    'Los enteros se convierten en z.number().int(), mientras que los valores con una parte fraccionaria se convierten en z.number().',
  'pageText.7640c5c6':
    'Las muestras de matrices con varios tipos se convierten en uniones. Las matrices de objetos combinan las claves observadas y marcan como opcionales las que faltan en alguna muestra.',
  'pageText.51004b4a':
    'La inferencia opcional de formatos reconoce cadenas representativas de UUID, fecha y hora ISO, correo electrónico y URL HTTP(S) mediante comprobaciones de cadenas de Zod.',
  'pageText.297ff683':
    'El modo estricto de objetos añade .strict() para rechazar las claves desconocidas en lugar de eliminarlas silenciosamente en los esquemas de objeto generados.',
  'pageText.373ed392':
    'Las matrices vacías no permiten determinar un tipo de elemento y, por tanto, se convierten en z.array(z.unknown()).',
  'pageText.3733edff': 'La inferencia de muestras es un punto de partida, no un contrato',
  'pageText.35b1bbc6':
    'Una muestra no permite demostrar longitudes mínimas, intervalos numéricos, valores de enumeración permitidos, reglas entre campos, valores predeterminados, comportamiento de coerción ni si un campo presente por casualidad es siempre obligatorio. Compara el resultado con la documentación de la API y los casos límite reales; después añade refinamientos y pruebas de Zod antes de aceptar datos no fiables. La herramienta solo genera texto de código fuente; no ejecuta el esquema ni instala Zod en tu proyecto.',
  'pageText.b12736d6': 'Privacidad y límites de entrada',
  'pageText.ac6e0f5e':
    'La generación es local y determinista para las mismas opciones y entrada. Se limita la profundidad de anidamiento para que el navegador siga respondiendo. Evita pegar tokens de producción o datos personales, incluso en herramientas locales, cuando una carga útil anonimizada pueda describir la misma estructura.',
  'pageText.c12e919d': '¿Qué operaciones de JSON Patch se admiten?',
  'pageText.f93d0eb6':
    'El aplicador admite add, remove, replace, move, copy y test. Los parches generados usan operaciones add, remove y replace deterministas; las matrices modificadas se reemplazan como un único valor, en lugar de intentar una comparación inestable elemento por elemento.',
  'pageText.9bcbf59a': '¿Cómo se representan las barras y las tildes en las rutas?',
  'pageText.153cbcc5':
    'Las rutas de JSON Patch usan JSON Pointer de RFC 6901. Una barra dentro de una clave de objeto se convierte en ~1 y una tilde en ~0, de modo que una clave llamada a/b se referencia como /a~1b.',
  'pageText.9bd286e3': '¿Aplicar un parche modifica el editor de origen?',
  'pageText.1e520c6e':
    'No. El JSON de origen se clona antes de ejecutar las operaciones y el resultado se muestra por separado. Se rechaza eliminar la raíz completa del documento porque la herramienta siempre devuelve un valor JSON válido.',
  'pageText.830d9198': 'Cómo se convierte la comparación de JSON en un parche',
  'pageText.27cb8257':
    'Las claves de objetos se comparan en orden para que la misma entrada produzca la misma secuencia de operaciones. Las claves ausentes se convierten en operaciones remove, las nuevas en add y los valores primitivos o matrices modificados en replace. Los objetos anidados se recorren recursivamente y cada ruta emitida se escapa como un JSON Pointer de RFC 6901.',
  'pageText.7a310a1e': 'Aplicación de parches y comportamiento ante fallos',
  'pageText.afbc723e':
    'Los índices de matrices se validan estrictamente, y el token especial - solo añade elementos al final durante operaciones add.',
  'pageText.e8c8cf45':
    'Replace, remove, move, copy y test requieren que existan sus rutas de origen; los fallos indican el número de la operación.',
  'pageText.3a420fd8':
    'Move rechaza colocar un valor dentro de uno de sus propios descendientes y aplica los cambios de índices de matrices en el orden de las operaciones.',
  'pageText.b3c285ba':
    'Test usa igualdad estructural de JSON en lugar de la identidad de los objetos o el orden de las claves serializadas.',
  'pageText.7a08072a':
    'Los nombres de objeto especiales, como __proto__, se crean como propiedades de datos propias sin modificar los prototipos de los objetos.',
  'pageText.acc508bd': 'Determinismo, privacidad y revisión',
  'pageText.39b818a8':
    'La generación y la aplicación se ejecutan íntegramente en este navegador. La comparación generada prioriza un resultado predecible, sin garantizar un tamaño mínimo, especialmente en las matrices. Revisa el orden de las operaciones, el coste de reemplazar matrices, las versiones simultáneas del documento y la autorización de la aplicación antes de usar un parche con datos persistentes o una API.',
  'pageText.28d8aae9': '¿Qué lenguajes de programación se admiten?',
  'pageText.b4757b15':
    'El generador admite actualmente Go (estructuras de Golang con etiquetas JSON), Python (BaseModels de Pydantic v2), Rust (estructuras de Serde), C# (registros con JsonPropertyName) y Kotlin (clases de datos).',
  'pageText.294e643e': '¿Cómo se tratan los objetos anidados y las matrices?',
  'pageText.850e01f2':
    'Los objetos JSON anidados se extraen en estructuras o clases tipadas independientes con nombres en camelCase o PascalCase, y los tipos de elementos de las matrices se infieren automáticamente.',
  'pageText.05225c44': '¿Se suben mis datos JSON a algún servidor?',
  'pageText.16c71e23':
    'No. La generación de código se ejecuta íntegramente en tu navegador mediante JavaScript del lado del cliente.',
  'pageText.6bf4c146': '¿Cómo calcula esta herramienta el tamaño de JSON en bytes?',
  'pageText.94825111':
    'Calcula el número exacto de bytes UTF-8 de las cargas útiles JSON, tanto formateadas como minificadas, mediante la API TextEncoder del navegador.',
  'pageText.449785d1': '¿Qué métricas se extraen?',
  'pageText.200cd0b4':
    'Tamaño en bytes sin minificar, tamaño minificado, porcentaje de reducción, total de claves, número de objetos anidados, número de matrices, profundidad máxima de la jerarquía y número de campos nulos.',
  'pageText.6bafe4b9': 'Sí, todo el procesamiento se realiza localmente en tu navegador.',
  'pageText.f9bc4fe7': '¿Qué es la codificación Quoted-Printable?',
  'pageText.b1f6a629':
    'Quoted-Printable es una codificación que usa caracteres ASCII imprimibles (RFC 2045), diseñada para transportar caracteres no ASCII por correo electrónico.',
  'pageText.5c516685': '¿Están seguros mis datos?',
  'pageText.ee52101e':
    'Sí, toda la codificación y decodificación se ejecuta íntegramente en tu navegador.',
  'pageText.6c6f7098': '¿Qué es el codificador y decodificador de Base64URL?',
  'pageText.f020a31f': 'Codifica y decodifica Base64 apto para URL sin caracteres de relleno.',
  'pageText.16ca11a3': '¿En qué se diferencia Base64url de Base64 estándar?',
  'pageText.3b137bc0':
    'Base64url reemplaza + por - y / por _ para que el valor pueda usarse de forma segura en URL, nombres de archivo y segmentos de JWT, y suele omitir el relleno =.',
  'pageText.06b202a5': '¿Puedo convertir una cadena Base64 existente en lugar de codificar texto?',
  'pageText.59313335':
    'Sí. Usa el modo de Base64 a Base64url para cambiar el alfabeto y quitar el relleno, o el de Base64url a Base64 para restaurar +, / y el relleno =. No se vuelven a codificar los bytes.',
  'pageText.ad19a97c': '¿Se procesan mis datos de forma segura?',
  'pageText.32092515':
    'Sí, todo el procesamiento y los cálculos se ejecutan íntegramente en tu navegador para ofrecer privacidad y rapidez.',
  'pageText.054c55ba': '¿Base64 es cifrado?',
  'pageText.040d6643':
    'No. Base64 es una codificación reversible sin clave que cualquiera puede decodificar. Nunca la uses para ocultar contraseñas, tokens de API o datos personales; para ello, usa cifrado real como AES-GCM.',
  'pageText.c07235a3': '¿Cómo decodifico Base64 en JavaScript?',
  'pageText.190c8592':
    "En Node.js usa Buffer.from(value, 'base64').toString('utf8'). En el navegador, atob(value) devuelve una cadena binaria; para texto UTF-8, usa new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))).",
  'pageText.3d513a1d': '¿Cómo codifico una cadena en Base64 con Python?',
  'pageText.5817c0f8':
    "Usa base64.b64encode('text'.encode('utf-8')).decode('ascii') después de import base64. Para el alfabeto seguro para URL, llama a base64.urlsafe_b64encode en su lugar.",
  'pageText.43cf2c6b': '¿Por qué Base64 termina con = o ==?',
  'pageText.9dc050ab':
    'Base64 codifica 3 bytes en 4 caracteres. Cuando la longitud de la entrada no es múltiplo de 3, uno o dos caracteres = completan la salida hasta un múltiplo de 4. No contienen datos, y este decodificador también acepta entradas sin ningún carácter de relleno.',
  'pageText.1e9e71cb': '¿Por qué falla aquí una cadena Base64 que parece válida?',
  'pageText.2bfb36f5':
    'La cadena contiene caracteres ajenos al alfabeto estándar (a menudo - o _ de Base64URL), o los bytes decodificados no son texto UTF-8. Las imágenes, los PDF y otros datos binarios fallan en este decodificador de texto aunque el Base64 esté bien formado; usa Base64 a imagen o Base64 a PDF en su lugar.',
  'pageText.1f843857': '¿Se envían mis datos a un servidor?',
  'pageText.5356631f':
    'No. La codificación y decodificación usan las funciones integradas btoa y atob del navegador en tu dispositivo, y no se sube nada de lo que pegues.',
  'pageText.9673c683': 'Cómo funciona la codificación Base64',
  'pageText.6840df16':
    'Base64 lee la entrada de tres bytes (24 bits) en tres bytes y los divide en cuatro grupos de 6 bits. Cada grupo selecciona un carácter de un alfabeto de 64 caracteres: A-Z, a-z, 0-9, + y /. Cuando la longitud de la entrada no es múltiplo de tres, se añade uno o dos signos = a la salida para mantener su longitud como múltiplo de cuatro. Por ejemplo, Man se codifica como TWFu, Ma como TWE= y M como TQ==.',
  'pageText.376d85ff':
    'Esta herramienta convierte tu texto en bytes UTF-8 antes de codificarlo, por lo que los caracteres ajenos a ASCII se conservan correctamente al codificar y decodificar: é ocupa dos bytes y se codifica como w6k=, mientras que el emoji 😀 ocupa cuatro bytes y se codifica como 8J+YgA==.',
  'pageText.3144275a': 'Por qué la salida Base64 es aproximadamente un 33 % mayor',
  'pageText.ce1baf42':
    'Cada 3 bytes de entrada se convierten en 4 caracteres de salida, así que los datos codificados crecen aproximadamente un tercio, más hasta dos caracteres de relleno. Una carga útil de 30 KB se convierte en unos 40 KB de Base64. Ese incremento es el coste de representar bytes arbitrarios con caracteres imprimibles, por lo que Base64 aparece en campos JSON, URI de datos, adjuntos de correo electrónico y cabeceras de autenticación HTTP Basic. No es compresión ni cifrado.',
  'pageText.b3162ffd': 'Base64 frente a Base64URL',
  'pageText.1a8a3497':
    'Base64 estándar (RFC 4648, sección 4) usa + y / y añade relleno con =. Base64URL (sección 5) reemplaza + por - y / por _, y suele omitir el relleno, para que los valores puedan aparecer en URL, nombres de archivo y segmentos de JWT sin codificación porcentual. Esta herramienta usa el alfabeto estándar. Para decodificar aquí un valor Base64URL, reemplaza primero - por + y _ por /, o usa el codificador específico de Base64URL.',
  'pageText.92565596': 'Errores habituales de decodificación y cómo corregirlos',
  'pageText.a3f451e2':
    'Caracteres no válidos: se rechaza todo lo que no sea A-Z, a-z, 0-9, +, / o =. Las causas habituales son - y _ de Base64URL, o comillas copiadas junto con el valor.',
  'pageText.8245a36e':
    'Longitud incorrecta: un valor cuya longitud deja resto 1 al dividirse por 4 no puede ser válido, lo que suele indicar que se perdió un carácter al copiar. Se acepta la ausencia total de relleno.',
  'pageText.f0196a80':
    'Contenido binario: los bytes decodificados deben ser texto UTF-8 válido. El Base64 de imágenes, PDF o datos comprimidos fallará aquí aunque la codificación sea válida.',
  'pageText.016597d5':
    'Saltos de línea: se ignoran los espacios y saltos de línea dentro de un único valor, como la salida MIME dividida en líneas de 76 caracteres. Sin embargo, en el modo por lotes cada línea se trata como un valor independiente.',
  'pageText.49b68226': '¿Qué es la codificación URL?',
  'pageText.5cd6b8f1':
    'La codificación porcentual representa un byte UTF-8 mediante % seguido de dos dígitos hexadecimales. Se usa cuando un carácter no puede aparecer de forma segura en una parte concreta de una URI.',
  'pageText.a2c17b54': '¿Debo codificar un componente o una URL completa?',
  'pageText.5905cd6b':
    'Usa el modo de componente para un valor de consulta, un segmento de ruta o un valor de fragmento, porque también escapa separadores como &, =, / y ?. Usa el modo de URL completa cuando la entrada ya contenga una URL completa y sus separadores estructurales deban seguir siendo legibles.',
  'pageText.f176d778': '¿Por qué a veces falla la decodificación?',
  'pageText.231a3849':
    'Un signo de porcentaje debe ir seguido de dos dígitos hexadecimales y la secuencia de bytes resultante debe poder decodificarse. Se rechazan las secuencias incompletas, como %2, y el UTF-8 mal formado, en lugar de modificarlos silenciosamente.',
  'pageText.a85f9468': 'Qué cambia el codificador URL',
  'pageText.62d7dab2':
    'El modo de componente usa el comportamiento de encodeURIComponent y decodeURIComponent del navegador. Es apropiado para un valor de consulta o un segmento de ruta individual, porque los separadores URL reservados se codifican como datos. El modo de URL completa usa encodeURI y decodeURI, que conservan caracteres estructurales como :, /, ?, #, & y = para que una URL ya montada mantenga su estructura.',
  'pageText.e84e968c': 'Ejemplo práctico de codificación porcentual',
  'pageText.d6bede20':
    'Al codificar el componente "hello world&role=admin" se obtiene hello%20world%26role%3Dadmin. Si ese mismo texto se insertara en una cadena de consulta sin codificar como componente, el signo & y el signo = podrían interpretarse como nuevos parámetros de consulta en lugar de formar parte del valor. El modo por lotes aplica la operación seleccionada de forma independiente a cada línea de entrada no vacía.',
  'pageText.d69c3bf2': 'Límites y privacidad',
  'pageText.66960492':
    'Esto es codificación porcentual de URI, no serialización application/x-www-form-urlencoded; los codificadores de formularios suelen representar los espacios con + y aplicar reglas a cada campo.',
  'pageText.fb49cce2':
    'Decodificar no valida si el resultado es una URL segura, accesible o fiable. Valida por separado los esquemas, los hosts y los destinos de redirección.',
  'pageText.7ebaf6d4':
    'No codifiques repetidamente un valor ya codificado salvo que quieras una doble codificación; % puede convertirse en %25.',
  'pageText.5bdbc315':
    'La conversión se ejecuta en el navegador. El historial del portapapeles, las extensiones, los dispositivos compartidos y cualquier destino donde pegues el resultado siguen siendo vías de exposición independientes.',
  'pageText.d1225e2e': '¿Decodificar demuestra que un JWT es auténtico?',
  'pageText.154670ea':
    'No. Cualquiera puede codificar una cabecera y una carga útil con Base64URL. La autenticidad solo se establece después de verificar un algoritmo permitido con la clave correcta y superar todas las políticas requeridas para las declaraciones.',
  'pageText.06daf1d8': '¿Con qué algoritmos JWT puede firmar y verificar esta página?',
  'pageText.50e5fffd':
    'Admite los algoritmos HMAC HS256, HS384 y HS512 con un secreto de texto. Rechaza deliberadamente alg:none y no acepta claves RSA, ECDSA, EdDSA, JWK, JWKS ni de certificados.',
  'pageText.d4ee3edc': '¿Se suben los tokens y los secretos?',
  'pageText.f21783fe':
    'No. La decodificación, la firma HMAC con Web Crypto y la verificación de firmas se ejecutan en el navegador. Los tokens de portador y los secretos siguen siendo sensibles al historial del portapapeles, las extensiones, la pantalla compartida y los dispositivos compartidos, así que usa datos sintéticos.',
  'pageText.e5b685cb': 'Decodificar, verificar y firmar son operaciones independientes',
  'pageText.d5099b0a':
    'Decodificar divide un token compacto de tres partes y lee su cabecera JSON y sus declaraciones sin confiar en ellas. Verificar selecciona HS256, HS384 o HS512 de la cabecera protegida, comprueba la entrada exacta de firma con Web Crypto y después evalúa exp, nbf, iat y las expectativas opcionales de emisor o audiencia. Firmar serializa los objetos JSON proporcionados, sobrescribe header.alg con el algoritmo HMAC seleccionado y crea un JWS compacto para pruebas.',
  'pageText.1305057d': 'Reglas de verificación y señales para depuración',
  'pageText.7576ed65':
    'Una firma HMAC válida demuestra que el firmante poseía el mismo secreto; no demuestra que el secreto se almacenara o distribuyera de forma segura.',
  'pageText.6e0c0a9d':
    'Se rechaza el token si su cabecera omite alg, selecciona none o solicita un algoritmo asimétrico no admitido.',
  'pageText.caeba6bd':
    'Los valores de caducidad, inicio de validez y emisión deben ser segundos NumericDate finitos; la tolerancia al desfase de reloj puede configurarse entre cero y 300 segundos.',
  'pageText.b69c111a':
    'La coincidencia opcional del emisor es exacta. La coincidencia de audiencia acepta el valor esperado como cadena aud o como un elemento de una matriz aud.',
  'pageText.45928def':
    'Las declaraciones de autorización, como roles y ámbitos, se muestran, pero dependen de cada aplicación y esta página no las evalúa.',
  'pageText.9f727ee8': 'Límites de seguridad e interoperabilidad',
  'pageText.79b6492c':
    'Un verificador de producción debe configurar sus algoritmos permitidos de forma independiente, seleccionar claves de una configuración de emisor fiable, exigir todas las declaraciones de la aplicación, rotar secretos y gestionar la política de repetición o revocación. Esta página no descifra JWE, resuelve documentos JWK o JWKS, valida certificados ni reproduce la serialización JSON específica de cada biblioteca. Genera tokens de producción únicamente en el sistema de identidad fiable al que pertenece la clave.',
  'pageText.269f9532': '¿Qué son las entidades HTML?',
  'pageText.1998740e':
    'Las entidades HTML son códigos especiales para mostrar caracteres reservados en HTML. Por ejemplo, &lt; representa < y &amp; representa &.',
  'pageText.b89e0526': '¿Por qué codificar entidades HTML?',
  'pageText.1529343a':
    'Codificar los caracteres reservados puede evitar que el texto se interprete como marcado en un contexto de texto HTML. No es una defensa completa frente a XSS: los atributos, las URL, CSS, JavaScript y el HTML no fiable requieren escape o saneamiento específico para su contexto.',
  'pageText.047ad07a': '¿Qué formatos de entidades puede decodificar esta herramienta?',
  'pageText.8c48f80f':
    'Decodifica referencias con nombre reconocidas por el navegador, como &amp;, referencias numéricas decimales, como &#169;, y referencias hexadecimales, como &#xA9;.',
  'pageText.1f92ff4e': '¿Es lo mismo que un conversor de entidades HTML?',
  'pageText.2bce97a1':
    'Sí. Esta herramienta codifica y decodifica entidades HTML, por lo que no hay un conversor independiente de entidades HTML a Unicode. Activa la opción ampliada para emitir referencias decimales de caracteres para texto no ASCII; la decodificación también resuelve referencias hexadecimales.',
  'pageText.787f2f9a': 'Qué hace el decodificador y codificador de entidades HTML',
  'pageText.a65d3d26':
    'Las referencias de caracteres HTML representan caracteres que resultarían ambiguos en el marcado. El codificador reemplaza caracteres reservados, como &, menor que, mayor que, comillas y apóstrofo. Su opción ampliada también emite referencias decimales para caracteres no ASCII. El decodificador resuelve referencias con nombre, decimales y hexadecimales mediante el analizador HTML del navegador.',
  'pageText.a4c17b02': 'Ejemplos de entidades HTML',
  'pageText.6b1cb488':
    '&lt; se convierte en el carácter menor que, mientras que &gt; se convierte en mayor que.',
  'pageText.656db619': '&amp; se convierte en & y &quot; se convierte en comillas.',
  'pageText.b1f980f4':
    '&#169; y &#xA9; son referencias decimales y hexadecimales al símbolo de derechos de autor.',
  'pageText.4a4bcadc':
    'Codificar <p>Research & Development</p> produce texto que puede mostrarse como caracteres de marcado en lugar de analizarse como ese mismo elemento.',
  'pageText.761ca2d4': 'Límites de seguridad y representación',
  'pageText.b3511bac':
    'La codificación de entidades depende del contexto. Escapar texto para un nodo de texto HTML no hace que ese mismo valor sea seguro dentro de un manejador de eventos, una URL, una declaración CSS, una cadena JavaScript o un fragmento HTML arbitrario. Usa el escape del framework por defecto y un saneador mantenido cuando debas conservar un formato fiable. Decodificar entidades no fiables debe producir texto para su inspección, no justificar la inserción del resultado con innerHTML.',
  'pageText.29803de0': '¿Qué es la codificación hexadecimal?',
  'pageText.debeda5a':
    'La codificación hexadecimal representa bytes UTF-8 en notación de base 16 (0-9, A-F).',
  'pageText.e26f9f25': '¿Cómo uso esta herramienta?',
  'pageText.0eb45c63':
    'Introduce texto en el campo de entrada y se convertirá automáticamente a hexadecimal. También puedes pegar hexadecimal para volver a decodificarlo como texto.',
  'pageText.8d56b3f0': '¿Qué es la codificación binaria?',
  'pageText.1fefb654':
    'La codificación binaria representa bytes UTF-8 en notación de base 2, usando solo ceros y unos.',
  'pageText.e0fbf5c5': '¿Cuántos bits hay por carácter?',
  'pageText.a3c61b13':
    'Cada byte UTF-8 se representa con 8 bits. Los caracteres ASCII usan un byte, mientras que caracteres como letras acentuadas y emojis pueden usar varios bytes.',
  'pageText.6f9da256': '¿Puedo volver a convertir binario en texto?',
  'pageText.6e36ed1b':
    'Sí. El modo de decodificación acepta bytes binarios completos de 8 bits, con espacios en blanco opcionales entre grupos, y convierte bytes UTF-8 válidos de nuevo en texto.',
  'pageText.a76ed5ae': '¿Qué hace este codificador y decodificador binario?',
  'pageText.208a45fa':
    'Esta herramienta convierte texto en la representación binaria de sus bytes UTF-8 y decodifica bytes binarios de nuevo en texto. Cada grupo de salida contiene ocho bits. Los espacios entre grupos de bytes hacen legible el resultado y pueden eliminarse o conservarse al decodificar. La conversión se ejecuta en código del navegador, por lo que no es necesario subir el texto para procesarlo.',
  'pageText.f49b8901': 'Ejemplos de texto a binario',
  'pageText.3a3355ac':
    'La letra A es el byte UTF-8 65, por lo que se convierte en 01000001. El carácter é usa los dos bytes UTF-8 C3 y A9, así que su forma binaria es 11000011 10101001. Esta distinción importa: la herramienta representa bytes codificados, no un valor fijo de 8 bits por cada carácter visible.',
  'pageText.0288b438':
    'La codificación de texto binario es distinta de convertir un número decimal a base 2. Introducir el texto 10 codifica los caracteres 1 y 0 como dos bytes UTF-8. Usa el conversor de bases numéricas cuando el objetivo sea una conversión de base numérica.',
  'pageText.19833ccd': 'Validación de binario a texto',
  'pageText.58060cff':
    'El modo de decodificación ignora los espacios en blanco entre grupos, pero exige solo dígitos 0 y 1 y un número completo de bytes de 8 bits. Los bytes incompletos, otros caracteres o las secuencias de bytes que no son UTF-8 válido producen un error en lugar de un resultado parcial engañoso.',
  'pageText.49543137':
    'La codificación binaria es una representación, no cifrado ni compresión. Cualquiera que tenga los bytes binarios puede decodificarlos, y la cadena de bits puede ser más larga que el texto visible original.',
  'pageText.c90dd9ea': '¿Qué es una URI de datos Base64?',
  'pageText.39ff7dd5':
    'Una URI de datos incrusta el contenido de un archivo directamente en HTML o CSS, con la forma data:image/png;base64,<encoded bytes>. El navegador la decodifica donde se usa, así que la imagen no necesita una solicitud HTTP independiente.',
  'pageText.bae37a7c': '¿Cuándo debo usar imágenes Base64?',
  'pageText.4baed32c':
    'Úsalas para iconos pequeños, marcadores de posición diminutos y demos en un único archivo. Las imágenes grandes funcionan mejor como archivos normales, porque Base64 aumenta el tamaño aproximadamente un 33 % y las imágenes incrustadas no pueden almacenarse en caché por separado.',
  'pageText.fd65cb89': '¿Por qué la cadena Base64 es mayor que mi archivo de imagen?',
  'pageText.dc1302a7':
    'Base64 representa cada 3 bytes con 4 caracteres, así que la salida es aproximadamente un tercio mayor que el archivo. La herramienta muestra tanto el tamaño original como el tamaño Base64 para que puedas valorar si compensa incrustarla.',
  'pageText.44cee614': '¿Qué formatos de imagen se admiten?',
  'pageText.690da2e0':
    'Cualquier archivo que tu navegador identifique con un tipo MIME image/*, incluidos PNG, JPEG, GIF, WebP y SVG. Otros formatos, como AVIF o ICO, funcionan cuando el navegador informa de un tipo de imagen para ellos. Se rechazan los archivos sin un tipo de imagen.',
  'pageText.4f220e7a': '¿Cómo convierto Base64 de nuevo en una imagen?',
  'pageText.86d8a616':
    "Usa la herramienta Base64 a imagen, o en Node.js escribe los bytes en disco con fs.writeFileSync('image.png', Buffer.from(base64String, 'base64')).",
  'pageText.0472d6fa': '¿Se sube mi imagen a un servidor?',
  'pageText.b951075e':
    'No. El archivo se lee con la API FileReader del navegador y se codifica en tu dispositivo. No se envía nada a un servidor.',
  'pageText.8d3141eb': 'URI de datos frente a Base64 sin prefijo',
  'pageText.441f0d6b':
    'Una URI de datos reúne el tipo MIME y los bytes codificados en una cadena que los navegadores aceptan donde se espera una URL, por ejemplo data:image/png;base64,iVBORw0KGgo... La opción Base64 elimina el prefijo data:image/png;base64, y devuelve solo los bytes codificados, que es lo que esperan la mayoría de las API JSON, las bases de datos y los endpoints de subida cuando el tipo de contenido se almacena en un campo aparte. El tipo MIME de la URI de datos procede del tipo de archivo que tu navegador informa para el archivo seleccionado.',
  'pageText.9c060b5e': 'Incrustar el resultado',
  'pageText.92456569':
    'HTML: <img src="data:image/png;base64,..." alt="Logo" width="32" height="32">. Mantén un texto alternativo significativo y dimensiones explícitas, como con cualquier imagen.',
  'pageText.56968f15':
    'CSS: background-image: url("data:image/png;base64,..."); con la URI de datos entre comillas.',
  'pageText.d617fb16':
    'JSON: almacena la cadena Base64 sin prefijo junto a un campo contentType y decodifícala en el servidor.',
  'pageText.693f282c':
    'Markdown: ![alt](data:image/png;base64,...) funciona en algunos renderizadores, pero muchas plataformas alojadas bloquean las URI de datos en Markdown, así que prueba dónde se mostrará.',
  'pageText.f8d06727': 'Cuándo ayudan las imágenes Base64 y cuándo perjudican',
  'pageText.1e364f5e':
    'La codificación aumenta el tamaño de los datos aproximadamente un 33 %. Una imagen incrustada tampoco puede almacenarse en caché por sí sola: se descarga de nuevo cada vez que cambia el archivo HTML o CSS que la contiene y ralentiza el análisis de ese archivo. Incrustarla compensa para recursos muy pequeños, como iconos, marcadores de 1x1 o páginas de demostración autónomas. Para fotos y cualquier imagen de más de unos pocos kilobytes, suele ser más rápido servir un archivo de imagen normal con cabeceras de caché. Para SVG, una URI de datos con codificación URL suele ser más corta que Base64; la herramienta SVG a URI de datos CSS genera una.',
  'pageText.e43aa790': 'Qué ocurre con tu archivo',
  'pageText.c4f14710':
    'El archivo se codifica exactamente tal como está almacenado. No se cambia su tamaño, se recomprime ni se eliminan metadatos, así que los datos EXIF de un JPEG, como los detalles de la cámara o las coordenadas GPS, se incluyen en la cadena Base64. Comprime primero la imagen o elimina sus metadatos si eso importa. Se convierte un archivo cada vez, y las imágenes muy grandes producen cadenas muy largas que pueden ralentizar el desplazamiento por la página o la copia.',
  'pageText.49b261c7': '¿Qué es el escape Unicode?',
  'pageText.80d28e8d':
    'El escape Unicode representa caracteres mediante puntos de código hexadecimales, como \\u0041 para "A".',
  'pageText.6d708618': '¿Puedo decodificar secuencias de escape Unicode en línea?',
  'pageText.a4bd1758':
    'Sí. Pega texto que contenga secuencias admitidas \\uXXXX, \\u{XXXXX} o \\xFF, elige Decodificar y la herramienta reemplazará esas secuencias por sus caracteres localmente en tu navegador.',
  'pageText.cb96dafd': '¿Es lo mismo que eliminar los escapes de una cadena JSON?',
  'pageText.e061f024':
    'No. Esta herramienta se centra en escapes Unicode hexadecimales y escapes de estilo byte. Usa la herramienta de escape de cadenas JSON cuando también necesites tratar escapes JSON como \\n, \\t, comillas escapadas o barras invertidas como un fragmento completo de cadena JSON.',
  'pageText.b78ece8c': '¿Qué hace este decodificador de escapes Unicode?',
  'pageText.66907eae':
    'El decodificador convierte las secuencias de escape hexadecimales reconocidas en caracteres legibles. Admite valores de cuatro dígitos al estilo JavaScript, como \\u0041, puntos de código entre llaves, como \\u{1F600}, y valores de dos dígitos al estilo byte, como \\x41. El resto del texto se mantiene sin cambios, lo que facilita inspeccionar el resultado antes de copiarlo.',
  'pageText.8b33e053': 'Ejemplos de codificación de escapes Unicode',
  'pageText.2a71ff3b':
    'Con el escape de ASCII activado, A se convierte en \\u0041. Los caracteres por encima del plano multilingüe básico usan notación de punto de código entre llaves; por ejemplo, 😀 se convierte en \\u{1F600}. Cuando se desactiva el escape de ASCII, el texto ASCII normal sigue siendo legible y se escapan los caracteres no ASCII.',
  'pageText.f75a70a6':
    'El escape Unicode cambia cómo se escriben los caracteres, no su significado. Es útil para inspeccionar registros, código fuente, cargas útiles de API o texto copiado que muestra la notación de escape en lugar de los caracteres representados.',
  'pageText.715d4ec7': 'Decodificar escapes Unicode en JavaScript y Python',
  'pageText.25c67af7':
    'Para un valor completo de cadena JSON, usa JSON.parse() en JavaScript o json.loads() en Python. Ambos procesan los escapes Unicode de cuatro dígitos y los pares sustitutos de JSON. JSON no acepta escapes de JavaScript entre llaves ni la notación \\xXX; el decodificador en línea admite esas representaciones de texto independientes.',
  'pageText.dfad767c':
    'Los ejemplos conservan las barras invertidas literales hasta que se ejecuta el análisis e imprimen Aé😀. No uses eval() para decodificar entradas externas. Un documento JSON debe analizarse una vez según su formato de origen, en lugar de reemplazar repetidamente las secuencias de escape.',
  'pageText.b78d8193': 'Escapes Unicode, JSON y seguridad',
  'pageText.ec7ecc8b':
    'Este conversor no es un analizador completo de lenguajes de programación. Reemplaza los patrones hexadecimales admitidos, pero no interpreta todas las reglas de escape de JSON, JavaScript, expresiones regulares o sintaxis de shell. Usa un analizador específico del formato cuando necesites validar exactamente un documento.',
  'pageText.d400aec2':
    'La codificación no es cifrado: cualquiera puede decodificar un valor escapado. El procesamiento se realiza en código del navegador, pero aun así debes evitar introducir secretos en utilidades en línea salvo que el entorno de ejecución sea adecuado para esos datos.',
  'pageText.06d6ceab': '¿Qué hace el escape de cadenas JSON?',
  'pageText.a236a523':
    'Convierte caracteres especiales, como saltos de línea, tabuladores y comillas, en formas escapadas, como \\n, \\t y \\".',
  'pageText.b5b32ac6': '¿Cuándo resulta útil?',
  'pageText.9758a1c9':
    'Es útil cuando necesitas incrustar cadenas de forma segura en cargas útiles JSON, archivos de configuración o solicitudes de API.',
  'pageText.23c25e0a': '¿Esta herramienta admite Base64 sin prefijo y prefijos de URI de datos?',
  'pageText.47a7ae5b':
    'Sí. Puedes pegar cadenas Base64 sin prefijo (que empiecen por iVBORw0KGgo... o /9j/...) o URI completas data:image/png;base64,...',
  'pageText.3e22ce2a': '¿Se suben mis imágenes a algún servidor?',
  'pageText.ff8327d4':
    'No. La decodificación y representación de imágenes se realiza íntegramente en tu navegador usando URL de datos y blobs del lado del cliente.',
  'pageText.b5c81ec6': '¿En qué formato debe estar la entrada hexadecimal?',
  'pageText.4df53de7':
    'Cualquier cadena hexadecimal de longitud par (por ejemplo, 48656c6c6f), con o sin espacios y prefijos.',
  'pageText.0d4f669a': '¿La conversión es bidireccional?',
  'pageText.448de195':
    '¡Sí! Puedes convertir hexadecimal a Base64 y Base64 a hexadecimal sin pérdida de datos.',
  'pageText.5a849fdb': '¿Para qué se usa la codificación Base32?',
  'pageText.300b948f':
    'Base32 usa un alfabeto de 32 caracteres (A-Z, 2-7), sin distinción entre mayúsculas y minúsculas y evitando caracteres visualmente ambiguos; suele usarse en claves secretas TOTP de 2FA y códigos de verificación que se introducen a mano.',
  'pageText.11274fca': '¿Qué son los datos estructurados JSON-LD?',
  'pageText.930ded68':
    'JSON-LD es un formato estándar recomendado por Google para proporcionar información explícita sobre una página y clasificar su contenido para resultados de búsqueda enriquecidos.',
  'pageText.c2c8dd70': '¿Cómo añado el esquema generado a mi sitio web?',
  'pageText.beba7ce9':
    'Copia la etiqueta generada <script type="application/ld+json"> y pégala en la sección <head> o <body> de tu HTML.',
  'pageText.86ec75d3': '¿Son privados y seguros mis datos?',
  'pageText.b25ac842':
    'Sí, todo el procesamiento se ejecuta localmente en tu navegador, sin almacenamiento en el servidor.',
  'pageText.687b5867': '¿Qué es el generador de UUID v7 ordenados por tiempo?',
  'pageText.c8e48ee7':
    'Genera identificadores UUID v7 ordenados por tiempo con aleatoriedad segura del navegador y expórtalos como texto. El extractor de marcas temporales de UUID v7 enlazado lee la hora de creación incrustada en un identificador.',
  'pageText.611de2a2': '¿Qué es un UUID?',
  'pageText.e747103f':
    'Un UUID (identificador universalmente único) es un identificador de 128 bits diseñado para ser único en todo el mundo sin una autoridad central de emisión.',
  'pageText.5e3c112b': '¿Qué es UUID v4?',
  'pageText.7697e800':
    'La versión 4 de UUID se genera aleatoriamente. Tiene 122 bits aleatorios y 6 bits para la información de versión y variante.',
  'pageText.5e39d294': '¿Qué es UUID v7?',
  'pageText.66a6ed70':
    'La versión 7 de UUID empieza con una marca temporal Unix de 48 bits en milisegundos y usa otros 74 bits para datos aleatorios. Los valores con marcas temporales codificadas crecientes se ordenan cronológicamente, pero los del mismo milisegundo son aleatorios y un ajuste hacia atrás del reloj del sistema puede invertir el orden de generación.',
  'pageText.7a44e8ee': '¿Debo elegir UUID v4 o v7?',
  'pageText.83965de1':
    'Elige v4 si quieres un identificador aleatorio opaco. Elige v7 cuando sean útiles la localidad temporal y la indexación cronológica en una base de datos. Ninguna versión debe tratarse como un secreto.',
  'pageText.9a6b439e': '¿Los UUID generados son criptográficamente aleatorios?',
  'pageText.4a129bc3':
    'La API de criptografía del navegador proporciona los 122 bits aleatorios de UUID v4 y los 74 bits aleatorios de la carga útil de UUID v7. UUID v7 también revela su milisegundo de creación, por lo que los UUID son identificadores, no contraseñas ni tokens.',
  'pageText.35cc78ac': 'Qué hace este generador de UUID v4 y v7',
  'pageText.361a3991':
    'Este generador crea valores UUID de versión 4 o 7 según RFC 9562 íntegramente en el navegador. La versión 4 usa 122 bits criptográficamente aleatorios. La versión 7 almacena el milisegundo Unix actual en sus primeros 48 bits y rellena los otros 74 bits de carga útil con crypto.getRandomValues(). Ambas establecen los campos de versión y variante del RFC y usan el formato hexadecimal canónico 8-4-4-4-12.',
  'pageText.cf240c55': 'Generar UUID en JavaScript y Python',
  'pageText.6ef9489b':
    'JavaScript crypto.randomUUID() crea un UUID v4 en contextos seguros del navegador. Python uuid.uuid4() también crea identificadores v4; uuid.uuid7() está disponible en la biblioteca estándar desde Python 3.14. Los ejemplos siguientes comprueban la compatibilidad con v7 en Python en lugar de darla por supuesta.',
  'pageText.42f8fbc7':
    'Distintos generadores de UUID v7 pueden usar métodos diferentes para ordenar los identificadores dentro de un milisegundo. Esta herramienta del navegador usa una parte final aleatoria, mientras que la implementación de Python usa un contador. Mantén una restricción de unicidad en la base de datos y no uses un identificador como credencial de autorización.',
  'pageText.3368e346': 'Elegir v4 o v7',
  'pageText.5b192e0e':
    'Usa UUID v4 para un identificador aleatorio opaco sin marca temporal. Usa UUID v7 cuando los registros deban agruparse cronológicamente por milisegundo de creación, lo que puede mejorar la localidad del índice frente a valores v4 aleatorios. El orden sigue el valor codificado del reloj: las partes finales aleatorias del mismo milisegundo no están estrictamente ordenadas y un ajuste hacia atrás del reloj del sistema puede invertir el orden de generación.',
  'pageText.19989f5d': 'Formato y exportación por lotes',
  'pageText.d012108b':
    'Genera entre 1 y 1.000 valores, cambia las letras hexadecimales a mayúsculas, elimina los guiones o rodea cada valor con llaves para flujos de trabajo basados en GUID. Copia el resultado separado por saltos de línea o descarga el mismo lote como un archivo de texto UTF-8.',
  'pageText.4c38dc5a':
    'Crea identificadores de base de datos o de aplicación sin coordinar un contador central.',
  'pageText.ce17c126':
    'Rellena datos de prueba, respuestas simuladas de API y registros de ejemplo.',
  'pageText.138b9843':
    'Adjunta identificadores de correlación a solicitudes, trabajos, registros o mensajes.',
  'pageText.5d4cb8de': 'Prepara pequeños lotes para importaciones, prototipos y desarrollo local.',
  'pageText.1193c111': 'Ejemplos de formato',
  'pageText.d40026dd':
    'Un resultado v4 puede ser 3f2504e0-4f89-41d3-9a0c-0305e82c3301, mientras que uno v7 tiene 7 como nibble de versión, como 0190b0cc-4f71-7a8e-9c9a-6a74fbb21a92. Las opciones de mayúsculas, sin guiones y con llaves solo cambian la presentación; los analizadores posteriores pueden requerir la forma canónica en minúsculas y con guiones.',
  'pageText.9dbfc526':
    'La unicidad de los UUID es probabilística, y este generador no consulta un registro ni garantiza la unicidad. UUID v7 revela su milisegundo de creación, presupone un reloj del sistema que no retrocede para ordenar por generación, y los valores aleatorios creados en un milisegundo no son estrictamente monótonos. Un UUID es un identificador, no automáticamente una contraseña, una clave de API ni un token de sesión. La generación se realiza localmente en el navegador; todo lo que copies, pegues, descargues, transmitas o almacenes lo gestiona el destino que elijas.',
  'pageText.7a6710aa': '¿Qué seguridad debe tener mi contraseña?',
  'pageText.9be86c1e':
    'Prefiere una contraseña única generada y almacenada por un gestor de contraseñas. Dieciséis o más caracteres aleatorios de un conjunto amplio, o una frase de contraseña aleatoria de seis o más palabras, son una base práctica cuando el destino los acepta; los requisitos de cada cuenta pueden variar.',
  'pageText.0f3affb1': '¿Cómo se genera la aleatoriedad?',
  'pageText.e7090e3e':
    'El generador usa crypto.getRandomValues con muestreo por rechazo, no Math.random. El modo de caracteres aleatorios incluye al menos un carácter de cada conjunto seleccionado cuando la longitud solicitada lo permite y después mezcla el resultado de forma segura.',
  'pageText.db182e45': '¿Se suben o guardan las contraseñas generadas?',
  'pageText.7daed653':
    'No. La generación y la estimación de entropía se ejecutan localmente y la aplicación no guarda el valor generado. Copiarlo puede incluirlo en el historial del portapapeles del sistema operativo, las extensiones pueden observar el contenido de la página y los dispositivos compartidos requieren más cuidado.',
  'pageText.8c8e3b19': 'Cómo funciona la generación segura de contraseñas',
  'pageText.567ac86d':
    'El modo de caracteres aleatorios extrae caracteres de los conjuntos activados de minúsculas, mayúsculas, números y símbolos con el generador criptográfico de números aleatorios del navegador. El muestreo por rechazo evita el sesgo de módulo. El modo de frase de contraseña selecciona cada palabra de forma independiente de la lista larga de palabras de EFF y admite entre seis y doce palabras con un separador elegido.',
  'pageText.296f3bc2': 'Elegir una contraseña o frase de contraseña',
  'pageText.926afe7a':
    'Usa un valor único para cada cuenta; reutilizar contraseñas convierte una filtración en acceso a varios servicios.',
  'pageText.f3d81905':
    'Prefiere el valor más largo que el destino admita de forma fiable. La longitud suele aportar más que sustituciones predecibles, como reemplazar a por @.',
  'pageText.01bfc425':
    'Usa el modo de frase de contraseña cuando debas escribir o leer el valor en voz alta, y el modo de caracteres aleatorios cuando un gestor de contraseñas vaya a almacenarlo y rellenarlo.',
  'pageText.27fbadfc':
    'Activa la autenticación multifactor donde esté disponible, especialmente en cuentas de correo, finanzas, nube y administración.',
  'pageText.1bede603': 'Estimación de entropía y límites de privacidad',
  'pageText.23ca65c7':
    'La entropía mostrada es una estimación teórica basada en elecciones uniformes e independientes del conjunto o lista de palabras seleccionados. No es una promesa de tiempo de descifrado y no tiene en cuenta un navegador, dispositivo, portapapeles, gestor de contraseñas, servicio de destino o proceso de recuperación comprometidos. El generador no comprueba las contraseñas en bases de datos de filtraciones porque eso requeriría un diseño independiente de consulta que preservara la privacidad.',
  'pageText.293386a3': '¿Qué es Lorem Ipsum?',
  'pageText.e7e9a310':
    'Lorem ipsum es texto de relleno con apariencia latina usado en diseño gráfico, diseño web y edición para ocupar espacio antes de disponer del contenido real.',
  'pageText.fc868312': '¿Por qué usar Lorem Ipsum?',
  'pageText.fc0c8095':
    'Tiene una combinación natural de palabras cortas y largas, por lo que muestra cómo un diseño distribuye texto real sin distraer a los lectores con su significado.',
  'pageText.fc9ee235': '¿Qué significa lorem ipsum?',
  'pageText.42643988':
    'Tal como está escrito, nada. Es un fragmento alterado de De finibus bonorum et malorum de Cicerón, donde "dolorem ipsum" significa "el dolor mismo". Se recortaron y modificaron palabras, por lo que "Lorem" no es una palabra latina real.',
  'pageText.864e8e98': '¿Cuánto mide cada párrafo generado?',
  'pageText.da65818f':
    'Cada párrafo tiene entre 3 y 7 frases, y cada frase entre 5 y 15 palabras, así que un párrafo tiene aproximadamente entre 15 y 105 palabras. Usa el modo de palabras cuando necesites un número exacto de palabras.',
  'pageText.e4695071': '¿Puedo generar lorem ipsum con etiquetas HTML?',
  'pageText.a44e126f':
    'La salida es texto sin formato, con los párrafos separados por una línea en blanco. Rodea cada párrafo con etiquetas <p> al pegarlo en HTML.',
  'pageText.2fc5f8d2': 'De dónde viene lorem ipsum',
  'pageText.372fc06e':
    'Lorem ipsum deriva de De finibus bonorum et malorum, un tratado de ética escrito por Cicerón en el año 45 a. C. El conocido comienzo, Lorem ipsum dolor sit amet, consectetur adipiscing elit, procede de un pasaje que empieza Neque porro quisquam est qui dolorem ipsum quia dolor sit amet. Las palabras se recortaron, modificaron y reorganizaron, por lo que el resultado parece latín, pero no significa nada. Tipógrafos y diseñadores han usado sus variantes como texto de relleno durante décadas porque tiene un ritmo realista de longitudes de palabras sin contenido significativo.',
  'pageText.50efd43e': 'Cómo construye el texto este generador',
  'pageText.78c6a4d6':
    'Las palabras se extraen aleatoriamente de una lista fija de vocabulario de lorem ipsum, por lo que cada clic en Generar produce un resultado diferente.',
  'pageText.cdfdd915':
    'Las frases tienen entre 5 y 15 palabras, empiezan con mayúscula y terminan con un punto.',
  'pageText.8a5faad3':
    'Los párrafos tienen entre 3 y 7 frases y se separan con una línea en blanco.',
  'pageText.5b9b38b3':
    'Con Empezar por "Lorem ipsum..." activado, la salida de párrafos y frases empieza con Lorem ipsum dolor sit amet, consectetur adipiscing elit., y la de palabras empieza con Lorem ipsum.',
  'pageText.d069a303':
    'El modo de palabras devuelve exactamente el número solicitado, separado por espacios y sin puntuación.',
  'pageText.cfa7bbd6':
    'Debajo de la salida se muestran los totales de palabras, caracteres, frases y párrafos.',
  'pageText.5fc47ebf': 'Usar bien el texto de relleno',
  'pageText.3a4e06f6':
    'Lorem ipsum sirve para comprobar la longitud de las líneas, los saltos y el ritmo vertical, pero oculta problemas que el contenido real revela. Antes de publicar un diseño:',
  'pageText.039ee6ef':
    'Prueba con texto realista, incluido el titular, nombre o título de producto más largo que esperes.',
  'pageText.d1b357c8':
    'Comprueba las cadenas traducidas: los textos en alemán o finés suelen ser más largos que en inglés, y los textos en chino o japonés se dividen en líneas de forma diferente.',
  'pageText.016f7d53':
    'Busca lorem e ipsum en el código antes del lanzamiento para que el texto de relleno no llegue a producción.',
  'pageText.e449bc7c':
    'Evita lorem ipsum en el texto alternativo y los nombres accesibles; los lectores de pantalla lo leerán en voz alta.',
  'pageText.2baf95ba':
    'Para prototipos con muchos datos, como tablas de usuarios o tarjetas de productos, genera registros ficticios realistas con un generador de datos simulados. Lorem ipsum no permite probar nombres, números, fechas ni cadenas largas sin separadores, como las URL.',
  'pageText.7ef81d93': '¿Qué es un código QR?',
  'pageText.95dfb03e':
    'Un código QR (Quick Response, respuesta rápida) es un código de barras bidimensional que almacena texto, como una URL, una tarjeta de contacto o una configuración Wi-Fi. Las cámaras de los teléfonos y las aplicaciones de escaneo lo decodifican y ofrecen una acción, como abrir el enlace.',
  'pageText.94540be7': '¿Qué datos puedo codificar?',
  'pageText.62ffa087':
    'Cualquier texto. Los ajustes predefinidos rellenan formatos estándar para URL, correo electrónico (mailto:), teléfono (tel:), SMS (sms:), Wi-Fi (WIFI:) y contactos vCard, que los teléfonos reconocen y procesan.',
  'pageText.a6c7c2f4': '¿Caducan estos códigos QR?',
  'pageText.6544ed40':
    'No. Son códigos estáticos: el contenido se almacena en el propio patrón, sin un servicio de redirección que pueda desactivarse. Un código de URL funciona mientras funcione la URL.',
  'pageText.d7525538': '¿Puedo hacer seguimiento de los escaneos o cambiar el enlace más adelante?',
  'pageText.6fb75242':
    'Un código estático no lo permite. Para cambiar el destino después de imprimir, codifica una URL corta de un dominio que controles y actualiza allí la redirección; los registros de tu propio servidor podrán contar las visitas.',
  'pageText.3b2f43fc': '¿Debo descargar PNG o SVG?',
  'pageText.034404ba':
    'Usa SVG para impresión y diseños que vayan a cambiar de tamaño, porque escala sin perder nitidez. Usa PNG para documentos, diapositivas y herramientas que no acepten SVG; elige el tamaño de 1024 px si se va a ampliar.',
  'pageText.229bdf99': '¿Cómo creo un código QR Wi-Fi?',
  'pageText.072a9bd1':
    'Selecciona el ajuste WiFi y edita WIFI:T:WPA;S:MyNetwork;P:MyPassword;;: T es el tipo de seguridad (WPA, WEP o nopass), S el nombre de la red y P la contraseña. Escapa ; , : y \\ en el nombre o la contraseña con una barra invertida.',
  'pageText.af7b54ae': 'Códigos QR estáticos que no caducan',
  'pageText.e1f656b0':
    'Este generador crea códigos QR estáticos: tu contenido se codifica directamente en el patrón y no hay ningún intermediario entre el escaneo y el destino. El código sigue funcionando mientras el contenido sea válido, y los escaneos no se rastrean ni cuentan. La contrapartida es que un código estático impreso no puede editarse. Para conservar la posibilidad de cambiar el destino, haz que el código apunte a una URL que controles y redirígela tú.',
  'pageText.49c87d45': 'Formatos de carga útil de los ajustes predefinidos',
  'pageText.9e3fedef':
    'URL: https://example.com. Incluye el esquema para que los escáneres lo traten como un enlace.',
  'pageText.dfb00b58':
    'Correo electrónico: mailto:hello@example.com. Añade ?subject=Hello para rellenar previamente el asunto.',
  'pageText.bd51c65e':
    'Teléfono: tel:+1234567890, con el formato internacional y un código de país.',
  'pageText.9df90887':
    'SMS: sms:+1234567890?body=Hello. La compatibilidad con el cuerpo prerrellenado varía entre teléfonos.',
  'pageText.3f10e94f':
    'Wi-Fi: WIFI:T:WPA;S:MyNetwork;P:MyPassword;; permite conectarse a una red sin escribir la contraseña.',
  'pageText.fb848228':
    'vCard: un bloque BEGIN:VCARD ... END:VCARD con campos como FN, TEL y EMAIL guarda un contacto.',
  'pageText.0945d9b3': 'Elegir corrección de errores y tamaño',
  'pageText.a73ec8ff':
    'La corrección de errores añade redundancia para que un código siga siendo legible cuando una parte esté sucia, dañada o tapada. Los cuatro niveles restauran aproximadamente el 7 % (L), el 15 % (M, predeterminado), el 25 % (Q) o el 30 % (H) del símbolo. Los niveles superiores y el contenido más largo producen códigos más densos con más módulos y de menor tamaño, por lo que necesitan una impresión mayor para escanearse de forma fiable. El máximo absoluto es de 2.953 bytes en el nivel L, pero el contenido breve se escanea con mucha más fiabilidad, así que mantén las URL cortas. Usa M para pantallas e impresiones limpias, y Q o H para etiquetas que puedan desgastarse.',
  'pageText.d601415e': 'Colores, contraste y zona de silencio',
  'pageText.21c831a0':
    'Los escáneres esperan módulos oscuros sobre un fondo claro con mucho contraste, así que evita colores de primer plano pálidos y códigos claros sobre oscuro (invertidos), que algunas aplicaciones de escaneo no pueden leer. La imagen generada incluye un margen de 1 módulo; la especificación QR exige una zona de silencio de 4 módulos, así que deja espacio liso adicional alrededor al colocar el código en un diseño recargado o de color. Prueba el código final impreso o exportado con más de un teléfono antes de publicarlo.',
  'pageText.b744dab3': '¿Qué es un slug de URL?',
  'pageText.24831d41':
    'Un slug de URL es la parte de una URL que identifica una página concreta de forma legible. Por ejemplo, en /blog/my-first-post, "my-first-post" es el slug.',
  'pageText.afaa82d8': '¿Por qué son importantes los slugs para SEO?',
  'pageText.a7281b59':
    'Los slugs adecuados para SEO ayudan a los buscadores a entender tu contenido y mejoran la tasa de clics al mostrar a los usuarios de qué trata la página.',
  'pageText.95ac698b': '¿Qué tipos de degradados se admiten?',
  'pageText.1f3e5ff6':
    'Esta herramienta admite degradados lineales (con ángulos personalizables) y radiales (con formas circulares o elípticas).',
  'pageText.6593c0c4': '¿Puedo exportar el degradado como imagen?',
  'pageText.09d7598c':
    '¡Sí! Puedes descargar el degradado como imagen PNG, además de copiar el código CSS.',
  'pageText.be1336e0': '¿Qué son las metaetiquetas?',
  'pageText.406252f6':
    'Las metaetiquetas son elementos HTML que proporcionan metadatos sobre una página web. Ayudan a los buscadores a entender tu contenido y controlan cómo aparece la página en los resultados de búsqueda.',
  'pageText.a60cca39': '¿Qué son las etiquetas Open Graph?',
  'pageText.f806060d':
    'Las etiquetas Open Graph controlan cómo aparece tu contenido al compartirlo en redes sociales como Facebook, LinkedIn y otras.',
  'pageText.3c5f494e': '¿Cómo funcionan varias capas de box-shadow?',
  'pageText.0f2afa64':
    'CSS box-shadow acepta definiciones de sombra separadas por comas. Las capas declaradas antes en la lista se dibujan encima de las declaradas después.',
  'pageText.a5cd6aad': '¿Qué es el efecto de cristal en CSS?',
  'pageText.00c0cd52':
    'El efecto de cristal combina colores de fondo semitransparentes con backdrop-filter: blur() y bordes claros sutiles para imitar el cristal esmerilado.',
  'pageText.b6a562cf': '¿Cuáles son las 5 partes de una expresión cron estándar?',
  'pageText.4cdd4865':
    'Las expresiones cron estándar tienen 5 campos: minuto (0-59), hora (0-23), día del mes (1-31), mes (1-12) y día de la semana (0-6, donde 0 es domingo).',
  'pageText.f069ffbc': '¿Qué significa */15 en cron?',
  'pageText.44fd98aa':
    'El valor de paso */15 en la posición de minutos significa "cada 15 minutos" (por ejemplo, a los minutos :00, :15, :30 y :45).',
  'pageText.adadf25c': '¿Qué tipos de datos simulados puedo generar?',
  'pageText.4b6a1433':
    'Puedes generar registros ficticios realistas de usuarios (con nombres, correos, teléfonos y roles), productos (con SKU, precios y valoraciones), pedidos (con monedas y estados), empresas y publicaciones de blog.',
  'pageText.a0f6807f': '¿Puedo descargar los datos simulados generados?',
  'pageText.5a2779c7':
    'Sí, puedes copiar el JSON directamente al portapapeles o descargarlo como archivo .json con un solo clic.',
  'pageText.a82a3ba7': '¿Qué tamaños se generan?',
  'pageText.6ab32280':
    'La herramienta genera iconos PNG de 16x16 (pestaña estándar), 32x32 (pestaña Retina), 48x48 (acceso directo de escritorio), 180x180 (icono Apple Touch de iOS), 192x192 (aplicación Android) y 512x512 (pantalla de inicio de PWA).',
  'pageText.1a11e506': '¿Se envían las imágenes que cargo a algún servidor?',
  'pageText.631bc8d7':
    'No. El cambio de tamaño y la representación de imágenes se realizan del lado del cliente mediante HTML5 Canvas del navegador. Tus imágenes nunca salen de tu ordenador.',
  'pageText.6016f5b9': '¿Qué plantillas incluye este generador de .gitignore?',
  'pageText.9a2e6ae1':
    'El generador incluye reglas estándar para Node.js/TypeScript, Python, Go, Rust, Java/Gradle/Maven, React/Next.js/Vite, Vue/Nuxt, macOS (.DS_Store), Windows, Linux, VSCode y los IDE de JetBrains.',
  'pageText.26b1e47a': '¿Puedo añadir patrones de exclusión personalizados?',
  'pageText.b9bb3e9f':
    'Sí, puedes escribir líneas de reglas personalizadas en el editor; se combinarán automáticamente con las plantillas de plataforma seleccionadas.',
  'pageText.99c478a9': '¿Cómo funcionan las formas orgánicas CSS sin SVG?',
  'pageText.330806ef':
    'Las formas orgánicas CSS usan la sintaxis de 8 valores de la propiedad border-radius (radios horizontales / radios verticales) para crear formas curvas asimétricas únicamente con CSS.',
  'pageText.4f7db90d': '¿Puedo descargar la forma como un gráfico vectorial escalable (SVG)?',
  'pageText.cd8236b5':
    'Sí, puedes copiar el marcado vectorial SVG o descargar la forma como archivo .svg independiente.',
  'pageText.15c7f36d':
    '¿Esta herramienta admite alineación de columnas a la izquierda, al centro y a la derecha?',
  'pageText.1f6c30ea':
    'Sí. Puedes cambiar individualmente la alineación del texto de cada columna (:---, :---:, ---:) con los botones de alineación situados encima de cada columna.',
  'pageText.17171603': '¿Puedo añadir o eliminar filas y columnas dinámicamente?',
  'pageText.81d98d62':
    'Sí, pulsa los botones "+ Añadir columna" o "+ Añadir fila" para ampliar la tabla, o usa los iconos de papelera para eliminar filas y columnas concretas.',
  'pageText.a3b7c9aa':
    '¿Por qué usar marcadores de posición SVG en lugar de URL externas de imágenes de relleno?',
  'pageText.36e2f853':
    'Los marcadores SVG no requieren solicitudes HTTP de red, se cargan al instante sin conexión y son URI de datos ligeras (unos 300 bytes) incrustadas directamente en HTML/CSS.',
  'pageText.98afe7f8': '¿Puedo personalizar el texto de la etiqueta dentro de la imagen?',
  'pageText.7156e33f':
    'Sí. Puedes indicar cualquier texto personalizado (por ejemplo, "Banner principal" o "Avatar 128x128") o dejarlo vacío para mostrar automáticamente las dimensiones.',
  'pageText.0ddadffc': '¿Puedo usar los banners ASCII generados en archivos README de GitHub?',
  'pageText.fa3ae5eb':
    'Sí. Rodea la salida con un bloque de código Markdown (```) en tu README.md para asegurar la alineación monoespaciada en todos los navegadores.',
  'pageText.92b39fd3': '¿Qué estilos de fuente se admiten?',
  'pageText.d1c00c5d':
    'ASCII clásico estándar (barras, barras verticales y guiones bajos) y caracteres modernos de bloques sólidos Unicode (█) para una representación nítida.',
  'pageText.a19cad93': '¿Por qué elegir ULID o UUID v7 en lugar de UUID v4?',
  'pageText.f6c311f2':
    'A diferencia de los UUID v4 aleatorios, ULID y UUID v7 empiezan con un prefijo de marca temporal en milisegundos, lo que evita la fragmentación de índices B-Tree y acelera considerablemente el rendimiento de INSERT en bases de datos.',
  'pageText.dbf5188e': '¿Los ULID generados evitan las colisiones?',
  'pageText.e4c22fd6':
    'Sí. Cada ULID contiene 80 bits de aleatoriedad criptográfica además de la marca temporal de 48 bits, con una probabilidad de colisión prácticamente nula.',
  'pageText.434b3c01': '¿Cómo se calculan los niveles de tono?',
  'pageText.fef3b562':
    'El generador ajusta las curvas de luminosidad HSL para corresponder a la distribución estándar de luminosidad de Tailwind CSS (50 con aproximadamente un 96 % de luminosidad y 950 con aproximadamente un 6 %).',
  'pageText.6fd82787': '¿Qué estilos de notación hay disponibles?',
  'pageText.64f57bec':
    'Dos puntos estándar (00:1A:2B:3C:4D:5E), guiones (00-1A-2B-3C-4D-5E), puntos de Cisco (001a.2b3c.4d5e) y hexadecimal continuo sin separadores.',
  'pageText.0665d60c': '¿Por qué debo eliminar los datos EXIF?',
  'pageText.4514458b':
    'Las fotos tomadas con teléfonos suelen contener coordenadas GPS precisas e identificadores del dispositivo que exponen tu privacidad al compartirlas públicamente.',
  'pageText.42405f57': '¿Eliminar EXIF reduce la calidad de la imagen?',
  'pageText.4d60a474':
    'No, solo se eliminan las etiquetas de metadatos y los píxeles de la imagen permanecen intactos.',
  'pageText.21ef5814': '¿Cómo verifico la suma de comprobación de un archivo descargado?',
  'pageText.224c058f':
    'Selecciona el archivo y pega la suma de comprobación esperada completa del editor u otra fuente independiente fiable. Espera a que termine el cálculo del hash y revisa si el resultado coincide o no.',
  'pageText.ae63ea0f': '¿Se sube mi archivo a un servidor?',
  'pageText.eebc3c64':
    'Los archivos seleccionados se leen localmente en la memoria del navegador y no se suben para este cálculo. SHA-1, SHA-256, SHA-384 y SHA-512 usan Web Crypto; MD5 y CRC32 usan implementaciones JavaScript.',
  'pageText.0096052f':
    '¿Una suma de comprobación coincidente significa que el archivo es seguro o auténtico?',
  'pageText.85e0eb7f':
    'Una coincidencia significa que la suma calculada concuerda con el valor esperado. No demuestra que el archivo sea inofensivo ni autentica a su editor. Obtén la suma esperada de una fuente independiente fiable. MD5 y SHA-1 tienen vulnerabilidades de colisión, y CRC32 no es criptográfico; prefiere SHA-256 para las comprobaciones de integridad.',
  'pageText.e7ddf90b': '¿Puedo calcular hashes de archivos muy grandes en el navegador?',
  'pageText.5a7687ac':
    'El archivo seleccionado se lee íntegramente en memoria. La memoria disponible y el rendimiento del dispositivo limitan el tamaño práctico. Para descargas grandes, usa una herramienta local de terminal para sumas de comprobación o el ejemplo de Python por bloques de la guía de verificación SHA-256.',
  'pageText.36576d77': 'Reproducir una comparación de sumas de comprobación de abc',
  'pageText.c0f11add':
    'Elige Cargar ejemplo abc para calcular el hash de exactamente los tres bytes UTF-8 abc, sin espacios ni salto de línea final. También puedes seleccionar un archivo de texto local que contenga exactamente esos bytes.',
  'pageText.45f16187':
    'La suma de comprobación SHA-256 es ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. Pega ese valor completo en el campo de suma esperada para ver una coincidencia. Cambia un dígito hexadecimal para ver una discrepancia al terminar el cálculo.',
  'pageText.38407fa7':
    'La misma entrada produce MD5 900150983cd24fb0d6963f7d28e17f72 y CRC32 352441c2. Los resultados también incluyen SHA-1, SHA-384 y SHA-512. Un salto de línea u otra codificación cambia los bytes y sus sumas de comprobación.',
  'pageText.a8f9e0fa': '¿Qué es MD5?',
  'pageText.197bb98c':
    'MD5 (Message Digest 5) es una función de hash criptográfica que produce un valor hash de 128 bits (16 bytes).',
  'pageText.380ae33f': '¿Es seguro MD5?',
  'pageText.200b2951':
    'MD5 ya no se considera seguro para fines criptográficos, pero sigue siendo útil para sumas de comprobación y aplicaciones donde la seguridad no es crítica.',
  'pageText.eb024fef': '¿Puede convertirse un hash MD5 de nuevo en texto?',
  'pageText.f3a4be7f':
    'No. MD5 es un hash unidireccional, no cifrado reversible. Los servicios descritos como decodificadores MD5 suelen probar posibles entradas y comparar sus hashes; esta herramienta genera hashes y no realiza búsquedas inversas.',
  'pageText.de23ad8f': '¿Qué hace este generador de hashes MD5?',
  'pageText.71308743':
    'Este generador de hashes MD5 convierte texto o un archivo seleccionado en el resumen de mensaje de 128 bits definido por RFC 1321 y lo representa como 32 caracteres hexadecimales. El texto se convierte en bytes UTF-8; el modo de archivo calcula el hash de los bytes del archivo. Las minúsculas y mayúsculas son opciones de presentación del mismo resumen. El cálculo se ejecuta en código del navegador, por lo que no requiere subir datos al servidor.',
  'pageText.e043d2b7': 'Ejemplo práctico de MD5 y suma de comprobación de archivos',
  'pageText.00f057ca':
    'Para la entrada exacta de tres caracteres abc, sin comillas, espacios ni salto de línea final, el resultado es 900150983cd24fb0d6963f7d28e17f72. RFC 1321 publica este vector de prueba. Mostrarlo en mayúsculas solo cambia su representación, no los bits del resumen.',
  'pageText.294638f4':
    'Para una suma de comprobación de archivo, selecciona un archivo y compara los 32 caracteres hexadecimales con un valor esperado. Una discrepancia demuestra que los bytes difieren de los usados para el resumen esperado. Una coincidencia puede ayudar a detectar errores accidentales, pero importa la fuente del valor esperado, y una coincidencia MD5 no demuestra que no haya una sustitución deliberada.',
  'pageText.bd0d278c': '¿Puede descifrarse MD5 y cuándo debe usarse?',
  'pageText.0962ea5c':
    'Este es un generador MD5, no un servicio para descifrar MD5 o invertir hashes. Calcular un hash no es cifrar, y un resumen de tamaño fijo no contiene una copia reversible de la entrada. Los intentos de invertir un resumen suelen probar entradas candidatas y calcular el hash de cada una para comparar.',
  'pageText.cf9f06aa':
    'RFC 6151 establece que MD5 ya no es aceptable cuando se requiere resistencia a colisiones, incluidas las firmas digitales. No confíes en MD5 para detectar manipulaciones deliberadas. El RFC permite una suma MD5 usada únicamente para proteger frente a errores, pero las aplicaciones deben indicar qué servicio de seguridad esperan de ella, si esperan alguno.',
  'pageText.953bfb55':
    'El cálculo en el navegador reduce la necesidad de transmitir texto o archivos para calcular hashes, pero no hace que MD5 sea criptográficamente seguro. Evita introducir contraseñas u otros secretos en una página de hashes en línea.',
  'pageText.101f9c75': '¿Qué es SHA256?',
  'pageText.16259758':
    'SHA256 (algoritmo de hash seguro de 256 bits) es una función de hash criptográfica que produce un valor hash de 256 bits (32 bytes).',
  'pageText.9afb2ad2': '¿Es seguro SHA256?',
  'pageText.0af6e6d2':
    'SHA-256 sigue siendo adecuado para muchas aplicaciones de integridad, pero un resumen sin clave no autentica su origen ni es una función de hash para contraseñas. Usa una suma esperada fiable para verificar archivos y un hash diseñado específicamente para contraseñas cuando trabajes con ellas.',
  'pageText.c16f7e5d': '¿Cómo verifico la suma de comprobación de un archivo?',
  'pageText.14edcc5a':
    'Selecciona el archivo e introduce un valor SHA-256 de 64 caracteres procedente de una fuente independiente fiable en el campo de suma esperada. La herramienta indica si coinciden los resúmenes generado y esperado.',
  'pageText.7490e417': '¿Puede decodificarse un hash SHA-256 de nuevo en texto?',
  'pageText.74338944':
    'No. Calcular un hash SHA-256 no es cifrado reversible, por lo que un resumen no puede decodificarse para recuperar su entrada original. Esta herramienta genera y compara valores SHA-256; no descifra contraseñas ni realiza búsquedas inversas de hashes.',
  'pageText.cd1de6c5': '¿Qué hace este generador SHA-256?',
  'pageText.a17f5535':
    'Este generador SHA-256 calcula el resumen de mensaje de 256 bits especificado por NIST FIPS 180-4 para texto o un archivo seleccionado y lo representa como 64 caracteres hexadecimales. En el modo de texto, el navegador convierte los caracteres en bytes UTF-8. El modo de archivo calcula el resumen de los bytes seleccionados. Las minúsculas y mayúsculas son opciones de presentación del mismo valor.',
  'pageText.d7c2f3d3':
    'SHA-256 no es reversible: un hash no puede decodificarse para recuperar el texto o archivo original. Introduce texto o selecciona un archivo para generar un resumen; compara el de un archivo con una suma esperada fiable para verificarlo.',
  'pageText.40dc4945': 'Ejemplo práctico de SHA-256 y verificación de archivos',
  'pageText.59582d9c':
    'Para la entrada exacta de tres caracteres abc, sin comillas, espacios ni salto de línea final, el resultado es ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. Un salto de línea, otras mayúsculas o minúsculas o una codificación diferente cambia los bytes de entrada y produce un cálculo diferente.',
  'pageText.af255369':
    'Para comprobar un archivo, genera su valor SHA-256 e introduce el resumen esperado de 64 caracteres obtenido de una fuente fiable. La comparación indica una coincidencia o discrepancia. Una discrepancia demuestra que los bytes difieren de los usados para el resumen esperado. Una coincidencia verifica la comparación, pero la fuente del valor esperado sigue siendo importante.',
  'pageText.57ea438c': 'Calcular SHA-256 en JavaScript y Python',
  'pageText.2f2bbf6b':
    'La función digest de Web Crypto en JavaScript opera sobre bytes. Usa TextEncoder para texto UTF-8 o arrayBuffer() de un File para el contenido exacto de un archivo. El ejemplo calcula el hash de abc de ambas formas y registra el mismo resumen. digest() del navegador requiere un contexto seguro y lee la entrada en memoria.',
  'pageText.a0a974f1':
    'hashlib de Python puede actualizar un resumen de forma incremental. El ejemplo de archivo lee un download.zip existente en modo binario con bloques de un megabyte. Cambia la ruta por la de tu archivo y compara el resumen completo con el valor esperado fiable.',
  'pageText.5379ecfa': '¿Puede descifrarse SHA-256 y qué demuestra?',
  'pageText.43df41c5':
    'Este es un generador SHA-256, no un servicio de descifrado o búsqueda inversa de hashes. Un resumen comprime la entrada en un resultado fijo de 256 bits; no es una copia cifrada ni sin pérdida que pueda decodificarse hasta el original. Encontrar un original probable implica probar candidatos y calcular sus hashes para comparar.',
  'pageText.139d7ac4':
    'FIPS 180-4 especifica SHA-256 como algoritmo de hash seguro y describe los hashes como componentes usados en aplicaciones como firmas digitales y autenticación de mensajes con clave. Este generador sin clave no firma datos, autentica remitentes ni cifra contenido. No trates un resumen proporcionado junto a un archivo no fiable como prueba independiente de su origen.',
  'pageText.a06060d1':
    'Las rutas de cálculo de hashes de texto y archivos se ejecutan en código del navegador y no requieren subir datos al servidor para el cálculo. Esa propiedad de privacidad no convierte un hash en cifrado; evita introducir secretos en cualquier utilidad en línea salvo que su entorno de ejecución sea adecuado para tus datos.',
  'pageText.51a1b9be': '¿Qué es SHA512?',
  'pageText.84a4301e':
    'SHA512 (algoritmo de hash seguro de 512 bits) es una función de hash criptográfica que produce un valor hash de 512 bits (64 bytes), normalmente representado como un número hexadecimal de 128 dígitos.',
  'pageText.790c6ec3': '¿Es seguro SHA512?',
  'pageText.6d855b6b':
    'Sí, SHA512 se considera actualmente muy seguro para fines criptográficos y se recomienda para la mayoría de las aplicaciones.',
  'pageText.815e4dcd': '¿Qué es HMAC?',
  'pageText.ff3b2cf9':
    'HMAC es un código de autenticación de mensajes con clave que combina una función de hash criptográfica con un secreto compartido para comprobar la integridad y autenticidad de los mensajes.',
  'pageText.09e2e0ba': '¿HMAC es cifrado?',
  'pageText.abec3974':
    'No. HMAC no oculta el mensaje. Permite a quienes comparten un secreto detectar cambios y autenticar el origen del mensaje.',
  'pageText.3c4deb2f': '¿Qué algoritmos y formatos de salida se admiten?',
  'pageText.b389a303':
    'La herramienta admite HMAC con SHA-256, SHA-384 o SHA-512 y muestra o verifica firmas en hexadecimal o Base64 estándar.',
  'pageText.8f405a3a': 'Generar y verificar firmas HMAC',
  'pageText.b25fc0c3':
    'Introduce los bytes exactos del mensaje representados por tu texto, un secreto compartido, la variante SHA-2 esperada y la codificación de la firma. Generar produce una firma; Verificar la recalcula con las mismas entradas y compara los bytes decodificados. Un salto de línea, codificación de caracteres, secreto, algoritmo o codificación de salida diferente cambia el resultado.',
  'pageText.422f4458': 'Usos habituales en webhooks y API',
  'pageText.f0d6dd20': 'Reproduce una firma de webhook al depurar una integración.',
  'pageText.d0483022': 'Compara un HMAC calculado localmente con una firma de un remitente fiable.',
  'pageText.44fd46de':
    'Convierte los mismos bytes HMAC entre representaciones hexadecimales y Base64.',
  'pageText.2cfc6b71':
    'Confirma que los cambios en un mensaje hacen fallar la verificación de la firma.',
  'pageText.843858f3': 'Límites de seguridad',
  'pageText.ab6a34ae':
    'HMAC requiere un secreto compartido fuerte entregado y almacenado de forma segura. Esta herramienta del navegador es útil para datos de prueba, pero los secretos de producción deben permanecer en entornos de aplicación controlados. HMAC autentica datos; no los cifra ni es un sistema de almacenamiento de contraseñas. La comprobación de firmas se delega en la API Web Crypto del navegador en lugar de comparar los bytes de la firma en JavaScript de la aplicación.',
  'pageText.cb69e8df': '¿Qué es PKCE?',
  'pageText.abc745c5':
    'PKCE es una extensión de OAuth que vincula una solicitud de autorización a un verificador de código secreto que conserva el cliente, reduciendo el riesgo de interceptación del código de autorización.',
  'pageText.bb3fb7f1': '¿Qué método de desafío usa esta herramienta?',
  'pageText.334f8104':
    'Usa S256: el SHA-256 del verificador de código codificado como Base64url sin relleno. El método plain no se genera deliberadamente.',
  'pageText.c069d885': '¿Puedo usar el valor generado en producción?',
  'pageText.ddc8fb76':
    'Los valores usan aleatoriedad segura del navegador y caracteres PKCE válidos, pero debes generar y conservar los verificadores de producción dentro del cliente OAuth que completará el intercambio de tokens.',
  'pageText.4c2764af': 'Cómo se crea el par PKCE S256',
  'pageText.71336ec6':
    'Un cliente PKCE crea un verificador de código de alta entropía, calcula el hash SHA-256 de su valor ASCII exacto y envía el resultado Base64url sin relleno como desafío de código. La solicitud de autorización incluye code_challenge y code_challenge_method=S256. La solicitud posterior de token envía el code_verifier original para que el servidor de autorización derive y compare el mismo desafío.',
  'pageText.3d8fba00': 'Reglas del verificador y verificación',
  'pageText.2aa00a1d':
    'Generar crea entre 43 y 128 caracteres del conjunto de caracteres no reservados de RFC 7636 usando bytes aleatorios seguros con muestreo por rechazo.',
  'pageText.9cb7c772':
    'Derivar acepta un verificador existente solo cuando su valor completo cumple las reglas de longitud y caracteres.',
  'pageText.ae7f5d42':
    'Verificar vuelve a derivar S256 y lo compara con un desafío Base64url de exactamente 43 caracteres.',
  'pageText.587e6e12':
    'Los espacios en blanco son significativos. Copia el verificador exactamente y consérvalo solo para el flujo de autorización correspondiente.',
  'pageText.1fadc2f8':
    'PKCE protege un código de autorización para que no pueda canjearse sin el verificador correspondiente; no sustituye la validación de la URI de redirección, las comprobaciones de state de OAuth o nonce de OIDC, TLS, el almacenamiento seguro de tokens ni la validación del servidor de autorización. La generación y el cálculo de hashes ocurren localmente en este navegador, pero el historial del portapapeles, las extensiones, los registros o un dispositivo compartido pueden exponer los valores copiados.',
  'pageText.cc61fb43': '¿Por qué la misma contraseña produce un hash diferente cada vez?',
  'pageText.47fdbb41':
    'Bcrypt genera una sal aleatoria nueva para cada hash y almacena la sal y el coste dentro del resultado codificado. Por tanto, hashes diferentes pueden verificar la misma contraseña sin requerir una columna independiente para la sal.',
  'pageText.fd8efc8a': '¿Qué controla el coste de bcrypt?',
  'pageText.e24b8eb9':
    'El coste es un factor de trabajo en base dos. Aumentarlo en uno aproximadamente duplica el trabajo de cálculo del hash. Elige un coste de producción midiendo tu propia infraestructura de autenticación en lugar de copiar los tiempos del navegador.',
  'pageText.c5646e46': '¿Por qué se rechazan las contraseñas de más de 72 bytes UTF-8?',
  'pageText.35d8cc67':
    'Bcrypt solo procesa los primeros 72 bytes. Rechazar las entradas más largas evita que dos contraseñas visiblemente diferentes se traten silenciosamente como la misma secuencia de bytes truncada.',
  'pageText.a3c91e25': 'Qué hacen el generador y verificador de bcrypt',
  'pageText.523e4066':
    'Generar crea una sal aleatoria, aplica bcrypt con el coste seleccionado y devuelve la cadena modular de hash estándar que contiene versión, coste, sal y suma de comprobación. Verificar lee esos parámetros de un hash existente y vuelve a ejecutar bcrypt antes de indicar si coincide la contraseña de prueba proporcionada. Bcrypt es deliberadamente lento, a diferencia de hashes rápidos de suma de comprobación como MD5 o SHA-256.',
  'pageText.52fbc8aa': 'Coste, sal y límite de 72 bytes',
  'pageText.a94e797a':
    'La interfaz ofrece costes seguros para el navegador entre 8 y 14; los valores mayores pueden tardar bastante más en dispositivos lentos.',
  'pageText.3541abdb':
    'Cada hash generado usa una nueva sal criptográficamente aleatoria, así que generar repetidamente no debería devolver cadenas idénticas.',
  'pageText.8bd98451':
    'Debe almacenarse el hash codificado completo. Su sal y coste ya están incrustados y se usan automáticamente durante la verificación.',
  'pageText.107d624e':
    'La herramienta cuenta bytes UTF-8 en lugar de caracteres JavaScript y rechaza valores que superan el límite de procesamiento de 72 bytes de bcrypt.',
  'pageText.4b0c23bf': 'Límites de uso seguro',
  'pageText.e9f75848':
    'Usa esta página con datos sintéticos de desarrollo o control de calidad. El cálculo de hashes de contraseñas de producción debe hacerse en un flujo de autenticación fiable del servidor, con limitación de solicitudes, transporte seguro, seguimiento de filtraciones y una estrategia de actualización documentada. Una comparación correcta solo demuestra que una contraseña coincide con un hash codificado; no evalúa la fortaleza de la contraseña, la seguridad de la cuenta ni si el coste seleccionado es adecuado para tus servidores.',
  'pageText.10893cde': 'Procesamiento local y compatibilidad',
  'pageText.0f1e91b6':
    'La implementación de bcrypt solo se carga después de iniciar una operación, y el cálculo del hash o la comparación se ejecuta en este navegador. El verificador acepta las formas estándar $2a$, $2b$ y $2y$ dentro del límite de coste. Los gestores del portapapeles, las extensiones, la pantalla compartida o un dispositivo ya comprometido pueden exponer valores, así que no pegues credenciales reales de usuarios.',
  'pageText.dfdb1834': '¿Decodificar demuestra que un certificado es fiable?',
  'pageText.54a44265':
    'No. El análisis muestra los campos codificados y puede comprobar si un certificado se verifica con su propia clave pública. La confianza también requiere una cadena válida hasta una raíz aceptada, comprobaciones de finalidad y nombre, políticas, tiempo y, a menudo, pruebas de revocación o transparencia.',
  'pageText.5cbb68de': '¿Puedo pegar una cadena completa de certificados PEM?',
  'pageText.99a5e254':
    'Sí. La herramienta extrae y decodifica hasta diez bloques CERTIFICATE en el orden de entrada. No los reordena ni demuestra que cada certificado haya firmado el siguiente.',
  'pageText.00fb6a40': '¿Se aceptan claves privadas?',
  'pageText.339287f5':
    'No. La entrada acepta bloques PEM CERTIFICATE o certificados DER codificados en Base64. Se rechazan los textos de claves privadas y solicitudes de certificados; no pegues claves privadas en herramientas del navegador.',
  'pageText.eac22252': 'Campos extraídos de un certificado X.509',
  'pageText.27c40514':
    'El decodificador lee ASN.1 DER contenido directamente en Base64 o entre delimitadores PEM de RFC 7468. Informa de nombres distinguidos del sujeto y emisor, número de serie, fechas de inicio y fin de validez, algoritmos de firma y clave pública, nombres alternativos del sujeto admitidos, OID de extensiones, tamaño en bytes y un resumen SHA-256 de los bytes exactos del certificado.',
  'pageText.6739d969': 'La vigencia y la autofirma son comprobaciones limitadas',
  'pageText.020adbca':
    'Válido actualmente significa que el reloj del navegador está entre notBefore y notAfter; no establece confianza ni uso previsto.',
  'pageText.d1665ea2':
    'Autoemitido significa que los nombres de sujeto y emisor coinciden, mientras que autofirmado criptográficamente requiere además verificar la firma con la clave pública del certificado.',
  'pageText.75c63764':
    'La criptografía no admitida por el navegador puede dejar desconocido el resultado de autofirma aunque se decodifique la estructura del certificado.',
  'pageText.7a7b0159':
    'Una huella SHA-256 identifica bytes DER exactos para compararlos; solo se convierte en una señal de confianza cuando se obtiene de un canal independiente fiable.',
  'pageText.087c5028': 'Comprobaciones que siguen correspondiendo a un validador TLS o PKI',
  'pageText.08a73601':
    'Esta página no construye una cadena frente a las raíces del sistema operativo o navegador, recupera certificados intermedios, comprueba el uso de claves o políticas para una finalidad concreta, compara nombres de host, consulta OCSP o CRL, inspecciona registros de Certificate Transparency ni se conecta a un servidor. Esas decisiones requieren el almacén de confianza, el contexto de conexión y la política de validación del cliente real.',
  'pageText.314bab46': '¿Qué es BIP-39?',
  'pageText.9fba1f54':
    'BIP-39 (propuesta de mejora de Bitcoin 39) describe la implementación de una frase mnemónica, un grupo de palabras fáciles de recordar, para generar monederos de criptomonedas deterministas.',
  'pageText.bc10db69': '¿Es seguro generar frases semilla aquí?',
  'pageText.6f73837c':
    'Toda la generación y el cálculo de entropía usa window.crypto.getRandomValues() y se ejecuta íntegramente en tu navegador. Nunca se transmiten frases semilla por la red.',
  'pageText.6d97a1a7': '¿Se envían las claves privadas a vuestro servidor?',
  'pageText.791c3f3c':
    'No. Los pares de claves se generan con window.crypto.subtle directamente en tu dispositivo. Las claves privadas nunca salen de tu navegador.',
  'pageText.4cc18af6': '¿En qué formato se exportan las claves?',
  'pageText.26a068ea':
    'Las claves públicas se exportan en formato SPKI PEM (-----BEGIN PUBLIC KEY-----) y las privadas en formato PKCS#8 PEM (-----BEGIN PRIVATE KEY-----).',
  'pageText.14b643ed': '¿Qué algoritmo se recomienda para .htpasswd en producción?',
  'pageText.e63436c8':
    'Se recomienda encarecidamente bcrypt ($2y$) para entornos de producción, ya que ofrece protección sólida frente a ataques de fuerza bruta y de diccionario.',
  'pageText.438a3aaa': '¿Se envía mi contraseña en texto claro a algún servidor?',
  'pageText.71f70564':
    'No. El cálculo del hash se realiza íntegramente en tu navegador mediante la API Web Crypto. Tus contraseñas nunca llegan a un servidor.',
  'pageText.c83dd430': '¿Cómo funciona la contraseña de un solo uso basada en tiempo (TOTP)?',
  'pageText.682b1360':
    'TOTP (RFC 6238) calcula un código de verificación de 6 dígitos mediante una firma HMAC-SHA1 con un secreto Base32 compartido y el intervalo actual de 30 segundos del tiempo Unix.',
  'pageText.2c69c124': '¿Es compatible con Google Authenticator, Authy y 1Password?',
  'pageText.9e7b7687':
    'Sí, las claves secretas y URI otpauth:// generadas siguen el estándar abierto que admiten Google Authenticator, Microsoft Authenticator, 1Password y Bitwarden.',
  'pageText.84c27538': '¿Es seguro probar contraseñas en este verificador?',
  'pageText.004d56b7':
    'Sí. Toda la verificación criptográfica se ejecuta íntegramente en tu navegador web. Nunca se transmiten contraseñas en texto claro ni hashes a ningún servidor.',
  'pageText.a32149fa': '¿Qué versiones de bcrypt se admiten?',
  'pageText.c4c394d4':
    'Admite cadenas bcrypt estándar en formato Modular Crypt Format, incluidos los prefijos $2a$, $2b$ y $2y$, con cualquier factor de coste de 4 a 31.',
  'pageText.78492a05': '¿Qué algoritmos de firma HMAC se admiten?',
  'pageText.3bff48a8':
    'Admite HS256 (HMAC-SHA256), HS384 (HMAC-SHA384) y HS512 (HMAC-SHA512) mediante la API nativa Web Cryptography del navegador.',
  'pageText.59a40ee3': '¿Se mantienen seguros mis secretos de firma?',
  'pageText.e7d3f45b':
    '¡Sí! Toda la generación de firmas criptográficas se ejecuta íntegramente en tu navegador. Los secretos y los datos de la carga útil nunca se envían a ningún servidor.',
  'pageText.546b483c': '¿Qué es la entropía de una contraseña?',
  'pageText.843a4831':
    'La entropía de una contraseña es una medida matemática (en bits) de información impredecible basada en el tamaño del conjunto de caracteres y la longitud de la contraseña.',
  'pageText.090cc30f': '¿Es seguro escribir mi contraseña aquí?',
  'pageText.d27c1402':
    'Sí. El análisis se calcula íntegramente en tu navegador con JavaScript puro y nunca se transmite por Internet.',
  'pageText.842979bb': '¿Qué es una expresión regular?',
  'pageText.bf8dc030':
    'Las expresiones regulares (regex) son patrones que permiten encontrar combinaciones de caracteres en cadenas. Se usan para buscar, reemplazar y validar texto.',
  'pageText.aa2308ec': '¿Qué variante de expresiones regulares se admite?',
  'pageText.e2719d0a':
    'Este comprobador usa el motor RegExp de JavaScript y admite la sintaxis ECMAScript y los indicadores disponibles en tu navegador. Los patrones no válidos se notifican como errores de sintaxis.',
  'pageText.b74b7f86': '¿Qué indicadores de expresiones regulares puedo probar?',
  'pageText.cf4c1cc1':
    'Puedes probar los indicadores estándar de JavaScript que admita tu navegador, incluidos coincidencia global, sin distinción entre mayúsculas y minúsculas, multilínea, dotAll, Unicode y coincidencia contigua.',
  'pageText.7f047dab': 'Qué hace este comprobador de expresiones regulares JavaScript',
  'pageText.dc90d609':
    'Este comprobador compila el patrón y los indicadores con el motor RegExp de JavaScript del navegador, lo aplica al texto proporcionado, resalta cada coincidencia e informa de su índice inicial y grupos de captura. Introduce el patrón sin barras delimitadoras. Añade g para recoger todas las coincidencias; sin él, JavaScript devuelve solo la primera. Usa el número de coincidencias y los índices para confirmar que se producen donde esperas.',
  'pageText.abd7f336': 'Casos de uso habituales',
  'pageText.9dc106a2':
    'Prueba reglas de validación para identificadores, fechas, líneas de registro u otros textos con restricciones.',
  'pageText.1d045840':
    'Extrae valores repetidos, como cadenas similares a correos electrónicos, números de incidencias o campos con nombre.',
  'pageText.6220ec6f':
    'Compara el comportamiento con y sin distinción entre mayúsculas y minúsculas mediante i, o los anclajes de línea mediante m.',
  'pageText.f40aadec':
    'Inspecciona los grupos de captura antes de llevar un patrón a código JavaScript o TypeScript.',
  'pageText.1908e453': 'Ejemplo práctico',
  'pageText.d2821f39':
    'Patrón: \\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})\\b. Indicadores: gi. Texto de prueba: "Contact Ada at ada@example.com or SUPPORT@EXAMPLE.ORG." El resultado son dos coincidencias resaltadas. El grupo de captura 1 contiene cada parte local y el grupo 2 cada dominio. El indicador g continúa tras la primera coincidencia, e i hace irrelevantes las mayúsculas y minúsculas.',
  'pageText.d1106dba':
    'Esta herramienta sigue la sintaxis de expresiones regulares ECMAScript disponible en el navegador actual; las construcciones específicas de PCRE, Python, .NET y Java pueden fallar o comportarse de otro modo. Una coincidencia correcta solo demuestra que el patrón coincidió, no que un correo, URL, fecha u otro valor sea semánticamente válido. Los cuantificadores anidados ambiguos pueden causar retroceso costoso en entradas largas. El patrón y el texto de prueba permanecen en el navegador; aun así, evita datos sensibles de producción en dispositivos compartidos.',
  'pageText.17c97676': '¿Por qué escapar caracteres de expresiones regulares?',
  'pageText.c7a9a784':
    'Caracteres como ., *, +, ?, (, ), [, ], {, }, ^, $, | y la barra invertida tienen significado estructural en una expresión regular. Anteponerles una barra invertida hace que el fragmento de patrón generado coincida literalmente con esos caracteres.',
  'pageText.b46e6b9b': '¿Cuándo debo usar esta herramienta?',
  'pageText.bbf26d2d':
    'Úsala antes de insertar texto literal fiable o no fiable en una expresión regular JavaScript mayor. El escape impide que el texto insertado cambie la estructura del patrón, pero la expresión que lo rodea puede seguir siendo ineficiente o incorrecta.',
  'pageText.6df59a98': '¿Quitar escapes interpreta secuencias como \\n o \\d?',
  'pageText.9a3e444a':
    'No. Quitar escapes solo invierte los escapes de metacaracteres y barras que produce esta herramienta. Conserva deliberadamente los tokens de expresiones regulares y escapes de cadenas que podrían tener otro significado.',
  'pageText.f457f978': 'Qué produce el escape de expresiones regulares',
  'pageText.6ac46463':
    'La operación de escape antepone una barra invertida a los metacaracteres de expresiones regulares JavaScript y también escapa / para facilitar su uso dentro de un literal /pattern/. Por ejemplo, price (USD) + tax? se convierte en price \\(USD\\) \\+ tax\\?. El resultado es un fragmento de patrón; los indicadores, anclajes, grupos de captura y la expresión que lo rodea siguen siendo tu responsabilidad.',
  'pageText.00aef4ad': 'Límites de seguridad de patrones dinámicos',
  'pageText.dcb7c0ee':
    'Escapa únicamente la parte literal. No escapes los operadores que añadas intencionadamente a su alrededor, como ^, $ o un grupo de captura.',
  'pageText.3f76d13b':
    'Escapar evita la inyección de sintaxis de expresiones regulares desde ese fragmento, pero no evita el retroceso catastrófico creado en otras partes del patrón final.',
  'pageText.c4d0eb41':
    'La sintaxis de RegExp de JavaScript difiere de PCRE, Python, .NET, Java y otros motores; prueba el patrón final en el mismo entorno que lo ejecutará.',
  'pageText.8dd960d4':
    'Si el patrón se coloca dentro de una cadena JavaScript, el escape de la cadena en el código fuente es una capa adicional independiente del escape de expresiones regulares.',
  'pageText.90550320': 'Quitar escapes y límites de privacidad',
  'pageText.ccd0ec75':
    'Quitar escapes es deliberadamente conservador: solo elimina una barra invertida antes de los signos de puntuación tratados por la operación de escape. No analiza una expresión regular completa ni convierte tokens como \\d, \\b, \\n o escapes Unicode en texto. El procesamiento permanece en el navegador, mientras que la gestión del portapapeles y del código de destino queda fuera de la herramienta.',
  'pageText.a0a4fe42': '¿Cómo funciona la comparación de texto?',
  'pageText.e1159d8d':
    'Compara las dos entradas línea por línea, marca adiciones, eliminaciones y líneas modificadas y después resalta cambios más pequeños dentro de las líneas modificadas.',
  'pageText.e5a7ece5': '¿Puedo comparar código con esta herramienta?',
  'pageText.4f90c315':
    'Sí. Pega código, configuración o texto en los dos editores. Usa Ignorar espacios en blanco o Ignorar mayúsculas y minúsculas cuando esas diferencias sean irrelevantes.',
  'pageText.74bef405': '¿Puedo comparar dos archivos?',
  'pageText.c6806514':
    'Abre cada archivo en un editor, copia su contenido y pégalo en los paneles Original y Modificado. La comparación trabaja sobre texto, así que sirve cualquier formato de texto sin formato, incluidos JSON, YAML, CSV y código fuente.',
  'pageText.e1647322': '¿Ignorar espacios en blanco también ignora las líneas vacías?',
  'pageText.88417b29':
    'No. Reduce las secuencias de espacios y tabuladores y recorta los extremos de cada línea antes de comparar, por lo que la sangría y los espacios finales dejan de contar como cambios, pero una línea vacía añadida o eliminada sigue apareciendo como cambio.',
  'pageText.80c2c0e8': '¿En qué se diferencia de git diff?',
  'pageText.612015ce':
    'Ambos encuentran el conjunto común más largo de líneas sin cambios. Esta herramienta también empareja líneas eliminadas y añadidas similares como modificaciones y resalta los caracteres exactos que cambiaron, lo que facilita leer ediciones breves. Para commits y parches, git diff sigue siendo la referencia definitiva.',
  'pageText.083d5e45': '¿Se sube mi texto?',
  'pageText.5e441495':
    'No. La comparación se ejecuta en tu navegador y ninguna entrada se envía a un servidor.',
  'pageText.8ab4cd08': 'Comparar dos cadenas o documentos más largos',
  'pageText.19e9243c':
    'Pega el texto original a la izquierda y el revisado a la derecha; la comparación se actualiza cuando editas cualquiera de las entradas. La vista dividida mantiene las líneas correspondientes juntas y desplaza ambos paneles a la vez. La vista unificada presenta una comparación continua, con cada línea eliminada seguida de su reemplazo. Si pegaste las entradas al revés, el botón de intercambio las cambia de lugar.',
  'pageText.06dc44b8': 'Cómo se detectan los cambios',
  'pageText.40ccc1ca':
    'La herramienta encuentra primero la subsecuencia común más larga de líneas y marca cada línea como sin cambios, añadida o eliminada. Dentro de cada bloque de cambios, las líneas eliminadas y añadidas suficientemente similares se emparejan como modificadas, de modo que una línea editada aparece como un cambio en lugar de una eliminación y una inserción. Después, las líneas modificadas se comparan en detalle: las de menos de 80 caracteres se comparan carácter por carácter y las más largas palabra por palabra, salvo que se active A nivel de carácter para forzar ese detalle. Un resumen cuenta adiciones, eliminaciones, modificaciones y líneas sin cambios.',
  'pageText.3ba03012': 'Opciones para comparaciones con mucho ruido',
  'pageText.fa1650de':
    'Ignorar espacios en blanco reduce las secuencias de espacios y tabuladores y recorta los extremos de cada línea, por lo que el código con sangría cambiada y los espacios finales no cuentan como cambios. No considera iguales a b y ab.',
  'pageText.40e7b499':
    'Ignorar mayúsculas y minúsculas compara las líneas sin distinguirlas, lo que ayuda con palabras clave SQL o nombres de variables de entorno.',
  'pageText.6c540dae':
    'Mostrar solo cambios oculta las líneas sin cambios, y Ajustar líneas mantiene legibles las líneas largas sin desplazamiento horizontal.',
  'pageText.15884c41':
    'El texto copiado de archivos Windows puede incluir un retorno de carro al final de cada línea. Si líneas aparentemente idénticas se indican como modificadas, activa Ignorar espacios en blanco.',
  'pageText.4010b374': 'Revisar y compartir las diferencias',
  'pageText.796a0a49':
    'Copiar diferencias produce un listado de texto sin formato: las líneas sin cambios empiezan por dos espacios, las eliminadas por - y las añadidas por +.',
  'pageText.97594ef5':
    'La copia sigue la vista actual, así que activar Mostrar solo cambios copia únicamente las líneas modificadas.',
  'pageText.314e11fa':
    'Las diferencias ocultas por Ignorar mayúsculas y minúsculas o Ignorar espacios en blanco no se incluyen, así que comprueba las opciones antes de compartir el resultado.',
  'pageText.5b3a3d4f': '¿Qué es Markdown?',
  'pageText.d5d009f0':
    'Markdown es un lenguaje de marcado ligero para crear texto formateado con un editor de texto sin formato. Se usa ampliamente en documentación, archivos README y redacción de contenido.',
  'pageText.bde3ab4d': '¿Puedo exportar el HTML?',
  'pageText.ed93a679':
    'Sí. Puedes copiar el fragmento saneado o descargar un documento HTML independiente con estilos adaptables básicos. Revisa el marcado exportado y los enlaces antes de publicarlo en otro contexto de seguridad.',
  'pageText.0098beeb': '¿Es seguro previsualizar HTML sin procesar dentro de Markdown?',
  'pageText.1737e56a':
    'La salida se sanea con DOMPurify. Se eliminan scripts, formularios, iframes, atributos de estilo y otros elementos de alto riesgo. Las imágenes enlazadas se bloquean por defecto; activarlas puede contactar con sus servidores, mientras que seguir un enlace también contacta con su destino.',
  'pageText.bee7691f': 'Qué admite la vista previa de Markdown',
  'pageText.441669ae':
    'El renderizador usa GitHub Flavored Markdown con soporte para saltos de línea explícitos. Puedes previsualizar encabezados, énfasis, enlaces, imágenes, listas ordenadas y sin ordenar, listas de tareas, tablas, citas, código en línea, bloques de código delimitados, tachado y líneas horizontales mientras escribes. La vista HTML muestra el fragmento saneado generado en lugar de ejecutar Markdown como código.',
  'pageText.03de3ac0': 'Saneamiento y límites de publicación',
  'pageText.a8213d5f':
    'DOMPurify elimina scripts, formularios, marcos, objetos incrustados, elementos de estilo, atributos de estilo y otros tipos de marcado no permitido antes de la vista previa o exportación.',
  'pageText.1e94d374':
    'El saneamiento depende del contexto. Vuelve a sanear o representar la salida de forma segura si otra aplicación la modifica, la combina con plantillas o la coloca en un contexto distinto de HTML.',
  'pageText.c384685e':
    'No se aplica resaltado de sintaxis; las etiquetas de lenguaje de los bloques delimitados se conservan solo como indicaciones de marcado.',
  'pageText.7f8e5143':
    'Las imágenes enlazadas se sustituyen por un marcador visible salvo que las permitas explícitamente. Los enlaces relativos y otros recursos siguen resolviéndose según la página en la que se abra el HTML exportado.',
  'pageText.9ab93c5c': 'Nota sobre privacidad y recursos externos',
  'pageText.da04b65a':
    'El análisis y saneamiento de Markdown se ejecutan localmente y esta herramienta no sube el texto. Las imágenes enlazadas se bloquean por defecto. Si las activas, el navegador puede contactar con sus servidores y revelar metadatos de conexión, como tu dirección IP; la vista previa aplica indicaciones no-referrer y de carga diferida. Seguir enlaces, el historial del portapapeles, los archivos descargados, las extensiones y el lugar donde publiques el HTML exportado son vías de datos independientes.',
  'pageText.fd136c59': '¿Qué estilos de escritura se admiten?',
  'pageText.972118df':
    'Esta herramienta admite camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, palabras separadas por espacios (space case) y dot.case.',
  'pageText.8e8d253c': '¿Qué es camelCase?',
  'pageText.0c0fc023':
    'camelCase une palabras sin separadores, empieza con una letra minúscula y pone en mayúscula la primera letra de cada palabra siguiente, como en userProfileId. Es el estilo habitual de las variables en JavaScript y Java.',
  'pageText.fab0fc0e': '¿Qué diferencia hay entre snake_case y kebab-case?',
  'pageText.ffa6d712':
    'Ambos usan minúsculas. snake_case separa palabras con guiones bajos (user_profile_id) y es habitual en Python y SQL. kebab-case usa guiones (user-profile-id) y es habitual en URL y CSS, pero no puede usarse en nombres de variables de la mayoría de los lenguajes porque - significa resta.',
  'pageText.83ad6918':
    '¿Por qué el texto TODO EN MAYÚSCULAS se convierte de forma extraña a camelCase?',
  'pageText.20a709bd':
    'camelCase y PascalCase conservan las mayúsculas existentes, por lo que HELLO_WORLD se convierte en hELLOWORLD. Conviértelo primero a snake_case o a palabras separadas por espacios (hello_world), y después convierte ese resultado a camelCase para obtener helloWorld.',
  'pageText.8b5b532b': '¿Qué estilo debo usar para las variables de entorno?',
  'pageText.d1aa7699':
    'CONSTANT_CASE, como DATABASE_URL. Las letras mayúsculas, los dígitos y los guiones bajos son la convención portable para nombres de variables de entorno en sistemas de tipo Unix.',
  'pageText.45c5778c': '¿Qué estilo es mejor para las URL?',
  'pageText.a79aed09':
    'kebab-case. Las palabras en minúsculas separadas por guiones son fáciles de leer, y Google recomienda guiones en lugar de guiones bajos para separar palabras en URL.',
  'pageText.05244f1a': 'Convenciones de nombres y dónde se usan',
  'pageText.a6b96046':
    'camelCase (userProfileId): variables y funciones de JavaScript y Java, y claves JSON en muchas API.',
  'pageText.fdfeef9a':
    'PascalCase (UserProfileId): nombres de clases, tipos de TypeScript, componentes React y miembros de C#.',
  'pageText.664a685d':
    'snake_case (user_profile_id): variables y funciones de Python y Ruby, y nombres de columnas SQL.',
  'pageText.88ba7528': 'CONSTANT_CASE (USER_PROFILE_ID): constantes y variables de entorno.',
  'pageText.d95625b3':
    'kebab-case (user-profile-id): slugs de URL, nombres de clases CSS, atributos HTML e indicadores de línea de comandos.',
  'pageText.0eab35c7':
    'dot.case (user.profile.id): claves de configuración e identificadores de mensajes de traducción.',
  'pageText.6428569e':
    'Palabras separadas por espacios (user profile id): palabras normales en minúsculas para etiquetas o ediciones posteriores.',
  'pageText.a1ccbb20': 'Cómo se detectan las palabras',
  'pageText.eb52946f':
    'El conversor divide palabras en espacios, guiones, guiones bajos y puntos, y donde una letra minúscula va seguida de una mayúscula. Por eso user_profile-id, userProfileId y User Profile Id producen el mismo resultado snake_case: user_profile_id. Los dígitos permanecen unidos a la palabra vecina, así que api-v2 response se convierte en apiV2Response en camelCase y en api_v2_response en snake_case.',
  'pageText.3ec8336a': 'Casos límite que conviene comprobar',
  'pageText.7af4b6f9':
    'Las secuencias de mayúsculas cuentan como una palabra: XMLHttpRequest se convierte en xmlhttp-request, no en xml-http-request. Añade separadores (XML Http Request) si necesitas dividir la sigla.',
  'pageText.ac6701e0':
    'camelCase y PascalCase conservan las mayúsculas existentes, así que convierte primero una entrada TODA EN MAYÚSCULAS a snake_case y después a camelCase.',
  'pageText.4ac21c06':
    'Se conserva la puntuación distinta de - _ . y los espacios: Hello World! se convierte en helloWorld! en camelCase. Elimina los caracteres no permitidos en identificadores.',
  'pageText.0bc340ed':
    'Los saltos de línea cuentan como espacios en blanco, así que una entrada multilínea se une en un único identificador. Convierte un nombre cada vez.',
  'pageText.83b3cb6b':
    'Solo A-Z se reconocen como límites de palabras en mayúscula, así que una mayúscula acentuada como É dentro de una palabra no inicia otra palabra.',
  'pageText.c7cb896c': 'Convertir nombres en código',
  'pageText.e93e8bdd':
    "JavaScript: lodash ofrece camelCase, kebabCase y snakeCase. Lodash convierte primero cada palabra a minúsculas, así que camelCase('HELLO_WORLD') devuelve helloWorld.",
  'pageText.2245868e':
    'API: en lugar de renombrar a mano las claves de la carga útil, deja que el serializador las asigne, por ejemplo con Jackson PropertyNamingStrategies.SNAKE_CASE en Java o un generador de alias en Pydantic.',
  'pageText.30d85b7e':
    'Refactorización: renombra identificadores con el comando de renombrado de tu editor en lugar de buscar y reemplazar, para actualizar también las referencias de otros archivos.',
  'pageText.a7bd2d40': '¿Qué se cuenta?',
  'pageText.51bef002':
    'Palabras, caracteres con y sin espacios, líneas, frases y párrafos, además de un tiempo de lectura estimado. Todos los recuentos se actualizan mientras escribes.',
  'pageText.051f4a91': '¿Cómo se calcula el tiempo de lectura?',
  'pageText.87fbca18':
    'El número de palabras se divide por una velocidad media de lectura de 200 palabras por minuto y se redondea al siguiente minuto entero, así que 450 palabras se muestran como 3 minutos.',
  'pageText.b3ed5e8b': '¿El número de caracteres incluye espacios?',
  'pageText.b1bd314d':
    'La cifra de Caracteres incluye espacios, tabuladores y saltos de línea. Caracteres sin espacios excluye todos los espacios en blanco. Comprueba a cuál se refiere un formulario o una guía de estilo antes de recortar tu texto.',
  'pageText.1dd1b66b': '¿Por qué un emoji cuenta como dos caracteres?',
  'pageText.75918985':
    'Los caracteres se cuentan como JavaScript mide la longitud de cadenas, en unidades de código UTF-16. La mayoría de los emojis y algunos símbolos poco comunes usan dos unidades de código, así que suman 2 al total, y los emojis combinados, como secuencias de familias o banderas, pueden sumar más.',
  'pageText.d65fcd89': '¿Por qué el número de frases es mayor de lo esperado?',
  'pageText.2fc1b39a':
    'Las frases se dividen en ., ! y ?. Abreviaturas como e.g. o Dr., números decimales como 3.14 y URL añaden divisiones adicionales, así que considera el número de frases una estimación.',
  'pageText.1a163ec9': '¿Se almacena o sube mi texto?',
  'pageText.0fef5a83':
    'No. El recuento se realiza en tu navegador, no se envía nada a un servidor y el texto no se guarda al salir de la página.',
  'pageText.b58e5ca1': 'Cómo se calcula cada recuento',
  'pageText.27c1e98e':
    "Palabras: secuencias de caracteres separadas por espacios en blanco. Las palabras unidas por guiones y contracciones, como well-known o don't, cuentan como una palabra, y un número o guion aislado también cuenta como palabra.",
  'pageText.b7cde3d8':
    'Caracteres: cada carácter, incluidos espacios y saltos de línea. Caracteres sin espacios excluye todos los espacios en blanco, incluidos tabuladores y saltos de línea.',
  'pageText.ac4f81d6': 'Líneas: el número de saltos de línea más uno, incluidas las líneas vacías.',
  'pageText.dccbe9b3':
    'Frases: segmentos de texto que terminan en ., ! o ?. Las abreviaturas y los números decimales añaden divisiones adicionales.',
  'pageText.ac9536dd':
    'Párrafos: bloques de texto separados por al menos una línea en blanco. Un único salto de línea no inicia un párrafo nuevo.',
  'pageText.c2e627fb':
    'Tiempo de lectura: palabras divididas entre 200, redondeadas al siguiente minuto entero.',
  'pageText.817a0ebe': 'Por qué los recuentos varían entre herramientas',
  'pageText.ddc50b04':
    'Los procesadores de texto y sitios web no comparten una única definición de palabra o carácter. Algunos dividen compuestos con guion, ignoran números o tratan una raya entre palabras como separador. Los límites de caracteres varían aún más: esta herramienta cuenta la longitud de cadenas JavaScript, donde la mayoría de los emojis cuentan como dos. Los sistemas que cuentan bytes, como algunas columnas de bases de datos, o puntos de código Unicode informarán de otros totales para el mismo texto. Los idiomas escritos sin espacios, como chino y japonés, cuentan como una palabra por cada secuencia separada por espacios en blanco, así que usa el recuento de caracteres para ellos. Los espacios iniciales y finales no añaden palabras, pero sí caracteres.',
  'pageText.8d394a34': 'Comprobar texto frente a límites habituales',
  'pageText.14f2e128':
    'SMS: un segmento admite 160 caracteres del alfabeto GSM-7, o 70 cuando el mensaje contiene caracteres ajenos a él, como emojis.',
  'pageText.3ea61033':
    'Fragmentos de búsqueda: las etiquetas de título suelen mantenerse por debajo de unos 60 caracteres y las metadescripciones entre 150 y 160, porque los buscadores recortan el texto más largo según su anchura de visualización.',
  'pageText.b63f3eaf':
    'Publicaciones sociales: plataformas como X aplican sus propias reglas de recuento, por ejemplo ponderando enlaces y emojis, así que confirma la longitud final en el editor de la plataforma.',
  'pageText.9eea4352':
    'Ensayos y artículos: los límites de palabras suelen referirse al cuerpo del texto, así que comprueba si incluyen títulos, referencias y notas al pie.',
  'pageText.2ad739ba': '¿Cómo funciona la detección de duplicados?',
  'pageText.a0e337c4':
    'La herramienta compara cada línea y conserva solo su primera aparición. Puedes activar o desactivar la distinción entre mayúsculas y minúsculas y el recorte de espacios.',
  'pageText.465a3722': '¿Qué ocurre con las líneas vacías?',
  'pageText.818a7fb1': 'Las líneas vacías se conservan en sus posiciones originales.',
  'pageText.ee732984': '¿Cómo funciona la ordenación?',
  'pageText.05cacbdc':
    'Las líneas se ordenan alfabéticamente mediante comparación de caracteres Unicode. Puedes elegir orden ascendente o descendente.',
  'pageText.f14a257f': '¿La ordenación distingue mayúsculas y minúsculas?',
  'pageText.5bc0fcf2':
    'Por defecto, no las distingue. Puedes activar la ordenación con distinción entre mayúsculas y minúsculas en las opciones.',
  'pageText.e0ce4b55': '¿Por qué el número de bytes UTF-8 difiere del número de caracteres?',
  'pageText.cea04185':
    'Los caracteres ASCII estándar usan 1 byte cada uno, mientras que las letras acentuadas (por ejemplo, é y ç) ocupan 2 bytes y los emojis (por ejemplo, 🚀 y 🎉) ocupan 4 bytes en UTF-8.',
  'pageText.58a712ea': '¿Cómo funciona el comprobador de límites de columnas de base de datos?',
  'pageText.41e8b156':
    'Puedes seleccionar tipos de columna como VARCHAR(64), VARCHAR(255) o TEXT para ver cuántos bytes quedan antes de superar las restricciones de filas de la base de datos.',
  'pageText.ae565f86':
    '¿El estilo de iniciales mayúsculas trata correctamente las preposiciones breves del inglés?',
  'pageText.24671ad1':
    'Sí. Palabras como "to", "a", "an", "the", "in", "for" y "and" se mantienen en minúsculas cuando corresponde según las directrices del Chicago Manual of Style.',
  'pageText.979a2e10': '¿Qué tipos de caracteres invisibles se detectan?',
  'pageText.1c5cc230':
    'Espacios de anchura cero (U+200B), caracteres de unión de anchura cero (U+200D), caracteres de no unión (U+200C), marcas de orden de bytes (U+FEFF), guiones de separación opcional (U+00AD) y marcas de dirección.',
  'pageText.07f01c24': '¿Qué hace el conversor de cURL a Axios?',
  'pageText.d549d86a':
    'Convierte comandos cURL de terminal en fragmentos de código Axios claros en JavaScript o TypeScript.',
  'pageText.9968e572': 'Sí, toda la conversión se realiza íntegramente en tu navegador.',
  'pageText.6d5cdf50': '¿Cómo convierto Fetch a cURL?',
  'pageText.daf0662a':
    'Pega tu fragmento de código fetch() y la herramienta generará automáticamente el comando cURL formateado.',
  'pageText.5847b1ec': '¿Admite cabeceras y cuerpos POST?',
  'pageText.5ad9f567':
    'Sí, las cabeceras, los métodos HTTP y los cuerpos JSON se analizan y conservan íntegramente.',
  'pageText.8215376e': '¿Cómo funciona la conversión de JSON a XML?',
  'pageText.92a5e19e':
    'Convierte recursivamente las claves y valores JSON en elementos y atributos XML válidos.',
  'pageText.5ed08f30': '¿Puedo personalizar la etiqueta XML raíz?',
  'pageText.4df315df':
    'Sí, puedes establecer cualquier nombre para la etiqueta raíz y la etiqueta de los elementos de matrices.',
  'pageText.293797b5': '¿Puedo pegar directamente desde Excel o Google Sheets?',
  'pageText.168c9958': 'Sí, copia celdas de cualquier tabla y pégalas directamente en el editor.',
  'pageText.e63c6336': '¿Se analizan automáticamente los números y booleanos?',
  'pageText.e46b649e':
    'Sí, los valores numéricos y true/false se convierten automáticamente en tipos nativos de JSON.',
  'pageText.a6ffb0f2': '¿Admite objetos JSON anidados?',
  'pageText.9c66d528':
    'Sí, los objetos anidados se aplanan automáticamente mediante claves con notación de puntos.',
  'pageText.8faf9499': '¿Puedo exportar como CSV o TSV?',
  'pageText.ee9682fe': 'Sí, elige valores separados por comas, tabuladores o punto y coma.',
  'pageText.a1264c1a': '¿Es seguro convertir fotos privadas?',
  'pageText.fba7c3f6':
    'Sí, todo el procesamiento de imágenes se ejecuta localmente en tu navegador con HTML5 Canvas. Tus fotos nunca salen de tu dispositivo.',
  'pageText.2192ee7b': '¿Qué formatos se admiten?',
  'pageText.893d1681': 'PNG, JPEG, WebP, AVIF, BMP e ICO.',
  'pageText.7ae5d66d': '¿Puedo reordenar las imágenes antes de generar el PDF?',
  'pageText.c48f2df7':
    'Sí, usa los botones de flecha de cada miniatura para organizar el orden de las páginas.',
  'pageText.1028470b': '¿Se suben mis imágenes a un servidor?',
  'pageText.43031004':
    'No, la generación de documentos PDF se ejecuta íntegramente del lado del cliente en tu navegador.',
  'pageText.cafd399d': '¿Es lo mismo que un generador de estructuras de JSON a Golang?',
  'pageText.60309daa':
    'Sí. Go suele llamarse Golang, y esta herramienta genera definiciones de estructuras con etiquetas json a partir de cualquier muestra JSON, incluidos objetos anidados y matrices.',
  'pageText.02bd6e0d': '¿Puedo elegir el nombre del modelo raíz?',
  'pageText.53e10075':
    'Sí. Establece el nombre del modelo raíz encima del editor. Los objetos anidados reciben nombres a partir de sus claves JSON, y una matriz de objetos en el nivel superior se modela por su primer elemento.',
  'pageText.5a4c5407': '¿La salida incluye las macros derive de serde?',
  'pageText.fa083659':
    'Sí. Cada estructura deriva Serialize y Deserialize (además de Debug, Clone y Default) y usa atributos rename de serde para conservar las claves JSON originales. Añade las bibliotecas serde y serde_json a tu proyecto.',
  'pageText.9c425ac2': '¿El generador produce estructuras o clases?',
  'pageText.7fc8b986':
    'Estructuras. Cada objeto JSON se convierte en una estructura que cumple Codable e Identifiable, y los objetos anidados se convierten en tipos de estructura anidados. Revisa los nombres de propiedades y los opcionales antes de usarlos en una aplicación.',
  'pageText.8f6dab1d': '¿Para qué biblioteca de serialización Kotlin está preparada la salida?',
  'pageText.57ebd790':
    'kotlinx.serialization. Cada clase de datos generada se anota con @Serializable y cada propiedad con @SerialName para conservar los nombres de campos JSON.',
  'pageText.cce3877b': '¿Puedo generar registros C# en lugar de clases?',
  'pageText.d0862846':
    'Sí. Cambia el estilo de salida a Registro para obtener registros posicionales con atributos [property: JsonPropertyName], o mantén Clase para clases mutables con propiedades get y set. Los objetos anidados se convierten en tipos propios en ambos estilos.',
  'pageText.ffb3fe14': '¿El conversor genera recursos Ingress o ConfigMap?',
  'pageText.cd91ea98':
    'No. Para cada servicio Compose detectado genera un Deployment inicial y un Service ClusterIP con etiquetas de imagen de ejemplo y puerto 80. Ajusta imágenes, puertos, entorno y volúmenes, y añade Ingress, ConfigMaps, Secrets, sondas y límites de recursos antes de aplicar los manifiestos a un clúster.',
  'pageText.9eac6229': '¿Qué es una marca temporal Unix?',
  'pageText.1487701c':
    'Una marca temporal Unix es el número de segundos transcurridos desde el 1 de enero de 1970 (UTC), conocido también como época Unix.',
  'pageText.0789772f': '¿Debo usar segundos o milisegundos?',
  'pageText.a0e3b7cc':
    'Las herramientas Unix y muchas API de servidor suelen usar segundos, mientras que Date.now() de JavaScript devuelve milisegundos. Por tanto, un valor actual tiene unos 10 dígitos en segundos y 13 en milisegundos; selecciona explícitamente la unidad en lugar de deducirla por los dígitos.',
  'pageText.2eb9e432': '¿Cómo se tratan las zonas horarias?',
  'pageText.3d5ad092':
    'La marca temporal se muestra como valor UTC ISO 8601 y como valor local usando la zona horaria del navegador. Al convertir texto en una marca temporal, incluye Z o un desplazamiento explícito cuando el instante deseado deba ser inequívoco.',
  'pageText.1bc9c5b5': 'Cómo funciona la conversión de marcas temporales Unix',
  'pageText.0fe51e8a':
    'Una marca temporal Unix identifica un instante relativo a 1970-01-01T00:00:00Z. El conversor acepta un entero en la unidad seleccionada de segundos o milisegundos, lo transforma en una cadena UTC ISO 8601 y también formatea el mismo instante en la zona horaria local del navegador. La conversión inversa analiza una cadena de fecha y devuelve la unidad de época seleccionada.',
  'pageText.2dc0bf0f': 'Ejemplo práctico de segundos y milisegundos',
  'pageText.aae8bcfb':
    'Las marcas temporales 1704110400 segundos y 1704110400000 milisegundos representan el mismo instante: 2024-01-01T12:00:00.000Z. Elegir la unidad incorrecta sitúa el valor muy lejos de la fecha deseada o lo vuelve no válido. Las marcas negativas pueden representar fechas admitidas anteriores a la época Unix.',
  'pageText.eee856bc': 'Límites de análisis y precisión',
  'pageText.6d9f9cca':
    'La entrada de marca temporal debe ser un entero seguro de JavaScript con signo. Se rechazan fracciones, notación exponencial y enteros fuera del intervalo seguro.',
  'pageText.38a39d56':
    'Las cadenas de fecha sin Z ni desplazamiento numérico explícito pueden interpretarse en la zona horaria local del navegador; incluye un desplazamiento para que la conversión sea reproducible.',
  'pageText.8673caf8':
    'Date de JavaScript sigue su intervalo de calendario admitido y no representa segundos intercalares.',
  'pageText.77f27ab3':
    'La conversión se ejecuta localmente. La hora local mostrada depende de la configuración de zona horaria del dispositivo y de las reglas históricas disponibles en el navegador.',
  'pageText.9dce9428': '¿Qué es un color HEX?',
  'pageText.808cc6b3':
    'Un color HEX escribe los canales rojo, verde y azul como tres números hexadecimales de dos dígitos después de #, de 00 a FF cada uno. #FF5733 significa rojo 255, verde 87 y azul 51.',
  'pageText.e9871c7d': '¿Qué diferencia hay entre RGB y HSL?',
  'pageText.33296696':
    'RGB define un color por la cantidad de luz roja, verde y azul que contiene. HSL describe el mismo color mediante un ángulo de tono, un porcentaje de saturación y un porcentaje de luminosidad, lo que facilita crear variantes más claras, oscuras o apagadas.',
  'pageText.e28100f8': '¿Cómo convierto HEX a RGB?',
  'pageText.fe0c27b9':
    'Divide los seis dígitos en pares y convierte cada uno desde base 16: el primer dígito multiplicado por 16 más el segundo. #1E90FF da 1E = 30, 90 = 144 y FF = 255, por tanto rgb(30, 144, 255).',
  'pageText.84f954db': '¿Por qué no se acepta #FFF?',
  'pageText.ee7c794e':
    'El campo HEX espera seis dígitos. Expande la abreviatura de 3 dígitos duplicando cada dígito: #FFF se convierte en #FFFFFF y #0AF en #00AAFF.',
  'pageText.b67270be': '¿Puedo convertir colores con transparencia?',
  'pageText.4f6be07c':
    'Esta herramienta no lo permite. Convierte colores opacos, por lo que no admite HEX de 8 dígitos ni valores rgba() o hsla(). Convierte aquí la parte de color y añade tú el valor alfa, por ejemplo rgb(59 130 246 / 50%).',
  'pageText.9ce1a868': '¿Qué es un color complementario?',
  'pageText.086acf39':
    'El color opuesto en el círculo cromático: la misma saturación y luminosidad con el tono girado 180 grados. El panel de paleta lo genera junto a opciones análogas, triádicas y de complementarios divididos.',
  'pageText.e95a3278': 'Cómo se relacionan HEX, RGB y HSL',
  'pageText.b8e6ba16':
    'Los tres formatos describen los mismos colores sRGB. RGB enumera los canales rojo, verde y azul de 0 a 255. HEX escribe los mismos tres canales como pares hexadecimales de dos dígitos, así que #3B82F6 es rgb(59, 130, 246): 3B = 59, 82 = 130 y F6 = 246. HSL describe el color como un tono (un ángulo de 0 a 360 en el círculo cromático), una saturación de 0 a 100 % y una luminosidad de 0 a 100 %; el mismo azul es hsl(217, 91%, 60%). HSL facilita las variantes: conserva el tono y la saturación y cambia solo la luminosidad para obtener un tono más claro u oscuro.',
  'pageText.9bb0180e': 'Convertir entre formatos a mano',
  'pageText.20dfb288':
    'Para convertir HEX a RGB, divide los seis dígitos hexadecimales en tres pares y convierte cada uno desde base 16. Para #FF5733: FF = 15 x 16 + 15 = 255, 57 = 5 x 16 + 7 = 87 y 33 = 3 x 16 + 3 = 51, lo que da rgb(255, 87, 51). Para RGB a HEX, convierte cada canal a hexadecimal y completa los dígitos únicos con un cero inicial, así que rgb(0, 128, 255) se convierte en #0080FF. La conversión HSL exige más cálculo, que es donde un conversor ahorra tiempo.',
  'pageText.c627f2e0': 'Redondeo y conversiones de ida y vuelta',
  'pageText.9f7b1c2c':
    'Los valores HSL se redondean a enteros y cada canal RGB tiene solo 256 niveles, así que varios valores HSL cercanos corresponden al mismo color RGB. Por ello, convertir HSL a RGB y de vuelta puede desplazar un valor en una unidad. Cuando importen los valores exactos, trata HEX o RGB como referencia, ya que es lo que representa el navegador.',
  'pageText.d798a9e9': 'Entrada y salida admitidas',
  'pageText.b62d0366': 'La entrada HEX necesita seis dígitos, con o sin # inicial.',
  'pageText.809bb2a0':
    'Los campos RGB y HSL aceptan enteros y se limitan a sus intervalos válidos.',
  'pageText.9800df6a':
    'No se convierten canales alfa, colores con nombre como rebeccapurple, CMYK ni espacios CSS más recientes como oklch().',
  'pageText.34fe3200':
    'Los valores copiados usan sintaxis CSS, como #3B82F6, rgb(59, 130, 246) y hsl(217, 91%, 60%), por lo que pueden pegarse directamente en una hoja de estilos.',
  'pageText.03fd111c':
    'Las muestras de paleta giran el tono: los complementarios 180 grados, los análogos más o menos 30, los triádicos 120 y 240, y los complementarios divididos 150 y 210. Pulsa una muestra para copiar su valor HEX y cargarlo.',
  'pageText.ad112684': '¿Cuál es el intervalo?',
  'pageText.3ed8b237':
    'Los números romanos pueden representar números del 1 al 3999. Para valores mayores se requiere notación especial.',
  'pageText.646816d5': '¿Cómo se forman los números?',
  'pageText.2ae173d7':
    'Los números romanos usan notación aditiva (VI = 6) y sustractiva (IV = 4) con las letras I, V, X, L, C, D y M.',
  'pageText.4c9566cb': '¿El conversor acepta formas como IIII o IC?',
  'pageText.7dbeba2f':
    'No. El decodificador acepta la escritura canónica de números romanos, por lo que 4 debe ser IV y 99 debe ser XCIX. Las formas no estándar o mal formadas producen un error de validación.',
  'pageText.661774c4': '¿Cómo funciona el conversor de números romanos?',
  'pageText.a2601719':
    'El modo de número a romano convierte un entero decimal en símbolos romanos estándar usando los pares sustractivos convencionales IV, IX, XL, XC, CD y CM. El modo de romano a número lee los símbolos, calcula su valor y verifica que la entrada sea la escritura canónica de ese valor antes de devolver un resultado.',
  'pageText.3ab2deeb': 'Ejemplos de conversión de números romanos',
  'pageText.0cd38bbc':
    'El número 4 se convierte en IV, 49 en XLIX, 1994 en MCMXCIV y 2026 en MMXXVI. En el modo inverso, los mismos valores romanos vuelven a convertirse en 4, 49, 1994 y 2026.',
  'pageText.e190ddca':
    'La notación sustractiva coloca un símbolo menor antes de uno mayor en los pares permitidos. Por ejemplo, IX significa 9 y CM significa 900. Otros valores se forman por adición, por lo que VIII significa 5 + 1 + 1 + 1, u 8.',
  'pageText.f97dd159': 'Intervalo y reglas de validación',
  'pageText.0edecea6':
    'Este conversor admite enteros del 1 al 3999, el intervalo habitual que se representa sin barras superiores ni notación ampliada. Se rechazan cero, valores negativos, decimales y números mayores de 3999 en lugar de asignarles un resultado no estándar.',
  'pageText.8e949328':
    'La entrada romana no distingue mayúsculas y minúsculas, pero debe usar una forma canónica estándar. El conversor rechaza repeticiones no válidas y abreviaciones no estándar, como IIII o IC. Esta validación estricta ayuda a distinguir un número romano reconocido de una cadena que solo contiene letras de números romanos.',
  'pageText.bcefa6b3': '¿Qué bases numéricas se admiten?',
  'pageText.7414cdc4':
    'Esta herramienta admite decimal (base 10), hexadecimal (base 16), octal (base 8) y binario (base 2).',
  'pageText.b72bd2ab': '¿Cómo uso los prefijos?',
  'pageText.0e908091':
    'Puedes usar prefijos como 0x para hexadecimal, 0o para octal y 0b para binario. Se procesan automáticamente.',
  'pageText.fc1aa399': '¿Puede convertir enteros mayores que Number.MAX_SAFE_INTEGER?',
  'pageText.1a04613d':
    'Sí. La conversión usa BigInt y valida la entrada completa, así que conserva los enteros grandes en lugar de redondearlos. Las entradas se limitan a 10.000 dígitos para que el navegador siga respondiendo, y las fracciones no se admiten deliberadamente.',
  'pageText.6c46d667': '¿Puede analizar URL sin protocolo?',
  'pageText.211d4985':
    'Sí. Si no se proporciona un protocolo, la herramienta intenta analizar la entrada suponiendo HTTPS.',
  'pageText.a249117f': '¿Admite parámetros de consulta repetidos?',
  'pageText.3fa7bebe':
    'Sí. Los parámetros de consulta repetidos se conservan y devuelven como matrices.',
  'pageText.974f66ef': '¿Puedo analizar una URL completa?',
  'pageText.d840a415':
    'Sí. Puedes pegar una URL completa y la herramienta extraerá y analizará la parte de la cadena de consulta.',
  'pageText.de982fa1': '¿Admite claves repetidas?',
  'pageText.aacf5366': 'Sí. Las claves repetidas se conservan como matrices al analizar.',
  'pageText.5ec1335a': '¿Los valores de un archivo .env son siempre cadenas?',
  'pageText.f1c07be7':
    'Las variables de entorno son cadenas en el límite del proceso. La inferencia opcional facilita la salida JSON y solo convierte booleanos claros, números de estilo JSON y null; déjala desactivada cuando importe conservar las cadenas exactamente.',
  'pageText.a47731b1': '¿Qué ocurre si una clave se define más de una vez?',
  'pageText.683572e4':
    'Prevalece la última definición, siguiendo el comportamiento habitual de dotenv, y el conversor muestra una advertencia con ambos números de línea para que el duplicado no quede oculto.',
  'pageText.837b99bd': '¿Esta herramienta expande variables como ${HOST}?',
  'pageText.40d37465':
    'No. Analiza valores, pero deliberadamente no interpola variables, ejecuta expresiones de shell, lee archivos ni contacta con un servidor. El comportamiento de expansión varía entre cargadores dotenv y debe probarse en el entorno de destino.',
  'pageText.2c76582a': 'Qué admite el conversor de .env y JSON',
  'pageText.4f2d45bf':
    'En el modo de .env a JSON, el analizador acepta líneas vacías, comentarios, prefijos export opcionales, nombres habituales de variables de entorno, valores sin comillas y valores entre comillas simples, dobles o invertidas. Se decodifican los escapes de salto de línea, retorno de carro, tabulador, comillas y barra invertida entre comillas dobles. Los valores entre comillas pueden ocupar varias líneas, mientras que los comentarios en línea fuera de comillas se eliminan.',
  'pageText.c5c8e5b3': 'Inferencia de tipos y tratamiento de duplicados',
  'pageText.1f8452da':
    'Por defecto, cada valor de entorno analizado se mantiene como cadena, lo que refleja cómo los sistemas operativos exponen las variables de proceso.',
  'pageText.6b7c8875':
    'La inferencia opcional convierte true, false, null y números inequívocos de estilo JSON; valores como 0012 permanecen como cadenas para conservar los ceros iniciales.',
  'pageText.49af1e34':
    'Si una clave aparece varias veces, se emite el valor final y una advertencia identifica las definiciones duplicadas.',
  'pageText.108380d1':
    'La salida JSON usa un diccionario seguro frente a prototipos para que nombres especiales, como __proto__, sigan siendo claves de datos normales.',
  'pageText.f9bf5831': 'Cómo se escribe JSON como texto dotenv',
  'pageText.7723ffc4':
    'El modo de JSON a .env requiere un objeto de nivel superior cuyas claves sean nombres válidos de variables de entorno. Las cadenas se ponen entre comillas dobles y se escapan, los números y booleanos se escriben como literales, null se convierte en una cadena vacía con una advertencia, y las matrices u objetos anidados se convierten en cadenas JSON entre comillas. Revisa los valores estructurados porque la aplicación receptora decide si vuelve a analizarlos y cómo.',
  'pageText.601a8514': 'Privacidad y diferencias entre variantes',
  'pageText.232534d5':
    'La conversión se ejecuta en el navegador y esta herramienta no sube los valores de los campos. La sintaxis dotenv es una convención con diferencias de implementación: la interpolación, la sustitución de comandos, el tratamiento de export y las reglas de escape pueden variar entre Node.js, Docker, shells y cargadores específicos de frameworks. Valida el archivo generado con el entorno exacto que lo consumirá y prefiere ejemplos anonimizados a credenciales de producción.',
  'pageText.5de3368a': '¿Cómo trata esta herramienta los atributos SVG en React?',
  'pageText.cff1c703':
    'Todos los atributos HTML/SVG con guiones (como stroke-width, fill-rule y clip-path) se convierten a camelCase válido de React (strokeWidth, fillRule y clipPath), y class se convierte en className.',
  'pageText.8b4e6d97': '¿Admite TypeScript y forwardRef?',
  'pageText.a1b09414':
    '¡Sí! Puedes activar interfaces TypeScript, envoltorios forwardRef y expansiones de propiedades estándar con un clic.',
  'pageText.354d5c2b': '¿Cómo funciona clamp() de CSS?',
  'pageText.b2935b68':
    'La función clamp(min, preferred, max) establece un valor preferido basado en el ancho de la ventana (vw), limitado entre un mínimo y un máximo.',
  'pageText.b872cb54': '¿Por qué usar tipografía fluida?',
  'pageText.4477ab71':
    'La tipografía fluida adapta suavemente el texto a los tamaños de pantalla sin saltos bruscos entre puntos de ruptura fijos de consultas de medios.',
  'pageText.5025653d': '¿Qué opciones de docker run se admiten?',
  'pageText.1aff160c':
    'El conversor analiza opciones como -p/--publish, -v/--volume, -e/--env, --name, --restart, --network, -w/--workdir, -u/--user, --privileged y los argumentos del comando del contenedor.',
  'pageText.edeb7b4c': '¿La salida es válida para Docker Compose moderno?',
  'pageText.34af0ae3':
    'Sí, el YAML generado sigue el formato moderno de la especificación Docker Compose.',
  'pageText.657d05ae': '¿Qué dialectos SQL se admiten?',
  'pageText.9519e5df':
    'El conversor admite los dialectos PostgreSQL, MySQL, SQLite y Microsoft SQL Server.',
  'pageText.81282e94': '¿Cómo se infieren los tipos de datos?',
  'pageText.35a0c93d':
    'Se analizan números, booleanos, cadenas de fecha ISO, objetos y longitudes de texto de todas las filas para determinar tipos de datos de columna apropiados.',
  'pageText.7abbc1c1': '¿Cuál es el tamaño de fuente base estándar para calcular REM?',
  'pageText.6b49dd1e':
    'El tamaño de fuente raíz predeterminado del navegador es 16px (1rem = 16px). Puedes personalizar esta base en la herramienta si tu CSS establece html { font-size: 62.5%; } (base de 10px) u otras escalas.',
  'pageText.3ea4c69b': '¿Qué diferencia hay entre REM y EM?',
  'pageText.f8a454cb':
    'REM (Root EM) es relativo al font-size del elemento raíz <html>, mientras que EM es relativo al font-size de su contenedor padre inmediato.',
  'pageText.2d5d624d': '¿Esta herramienta admite TSV (valores separados por tabuladores)?',
  'pageText.8dd82b44':
    'Sí. Puedes pegar datos separados por comas o tabuladores copiados directamente de aplicaciones de hojas de cálculo como Excel o Google Sheets.',
  'pageText.6e30c9b1': '¿Puedo convertir tablas Markdown de nuevo en CSV?',
  'pageText.e858f5f7':
    'Sí, pulsa el botón "Sincronizar MD ➔ CSV" para analizar la tabla Markdown y devolverla al formato estándar separado por comas.',
  'pageText.ccff8026': '¿Cómo se detectan las cabeceras de las tablas?',
  'pageText.d4655a54':
    'El conversor usa automáticamente la primera fila de elementos <th> o <td> como claves de los objetos JSON resultantes.',
  'pageText.79df7ff1': '¿Puedo obtener una matriz 2D en lugar de objetos?',
  'pageText.9dd05233':
    'Sí, cambia el formato de salida a "Matriz 2D (filas y columnas)" para obtener una matriz simple sin claves con nombre.',
  'pageText.939b6803': '¿Esta herramienta admite instrucciones INSERT de varias filas?',
  'pageText.0495ce61':
    'Sí. El conversor procesa sin problemas instrucciones de varias filas como INSERT INTO table (col1, col2) VALUES (a, b), (c, d).',
  'pageText.444bfcdc': '¿Se conservan los tipos de datos (números, booleanos y NULL)?',
  'pageText.b9a181b3':
    'Sí. Los números, literales booleanos (TRUE/FALSE) y valores NULL se analizan y convierten automáticamente en tipos de datos nativos de JSON.',
  'pageText.40323ee8': '¿Cómo se simplifica la relación de aspecto?',
  'pageText.cdbef1c9':
    'La calculadora determina el máximo común divisor (MCD) del ancho y el alto para obtener la proporción más simple con enteros (por ejemplo, 1920x1080 se simplifica a 16:9).',
  'pageText.bc6781c7': '¿Cómo uso la herramienta de cambio de tamaño proporcional?',
  'pageText.b80cad0b':
    'Introduce el ancho y alto originales y después escribe el nuevo ancho deseado para calcular automáticamente el alto proporcional exacto.',
  'pageText.4b28a4e9': '¿Qué elementos HTML se admiten?',
  'pageText.276d9f0c':
    'El conversor admite encabezados <h1>-<h6>, negrita <strong>/<b>, cursiva <em>/<i>, enlaces <a>, imágenes <img>, citas <blockquote>, listas <ul>/<ol>/<li>, bloques <code>/ <pre> y líneas horizontales <hr>.',
  'pageText.6e1afb74': '¿Se decodifican las entidades HTML?',
  'pageText.ba39602f':
    'Sí, las entidades habituales como &amp;, &lt;, &gt;, &quot; y &#39; se convierten en caracteres normales.',
  'pageText.3799edfe': '¿Este conversor conserva las etiquetas de sintaxis de código?',
  'pageText.c2365433':
    'Sí. Los bloques de código (```javascript ... ```) se convierten en <pre><code class="language-javascript"> con los caracteres correctamente escapados.',
  'pageText.8708ffd7': '¿Puedo descargar la salida HTML generada?',
  'pageText.c459e434':
    'Sí, pulsa el icono de descarga para guardar tu documento convertido directamente como archivo .html.',
  'pageText.be3a3c63': '¿Qué precisión tiene el cálculo de diferencias entre fechas?',
  'pageText.d3b0d64f':
    'Los cálculos tienen precisión de milisegundos y se basan en la API Date nativa de JavaScript y marcas temporales UTC estándar.',
  'pageText.af8c07b0': '¿Puedo convertir entre unidades de tiempo (por ejemplo, horas a segundos)?',
  'pageText.8b865303':
    'Sí. La sección interactiva de conversión de unidades permite convertir cualquier cantidad entre milisegundos, segundos, minutos, horas y días simultáneamente.',
  'pageText.a9fedf31': '¿Cómo se convierten los atributos XML a JSON?',
  'pageText.1c4c4809':
    'Los atributos reciben el prefijo "@" en el objeto JSON (por ejemplo, @id="101") para conservar toda la información al volver a convertir a XML.',
  'pageText.fa379db8': '¿Puedo cambiar la dirección de conversión a JSON a XML?',
  'pageText.994016b7':
    'Sí, pulsa "Cambiar a JSON ➔ XML" para convertir cualquier objeto JSON válido de nuevo en un documento XML formateado.',
  'pageText.8d1c8c14': '¿Esta herramienta escapa las comillas simples internas?',
  'pageText.d9f1c9ca':
    "Sí. Las comillas simples internas (por ejemplo, O'Connor) se escapan automáticamente como dos comillas simples ('' en SQL estándar) para evitar errores de sintaxis.",
  'pageText.3f01da3d': '¿Puedo formatear listas de números sin comillas?',
  'pageText.4b94fcb9':
    '¡Sí! Selecciona "Sin comillas (números / identificadores)" en el desplegable de estilo de comillas para listas de enteros y números.',
  'pageText.3d22bc27': '¿Esta herramienta admite fondos transparentes?',
  'pageText.41464a2f':
    '¡Sí! PNG y WebP admiten transparencia alfa completa. También puedes elegir fondos blancos o negros sólidos.',
  'pageText.c16e4c4a': '¿Cómo funcionan las escalas de resolución (2x, 4x)?',
  'pageText.e151b8c5':
    'El SVG vectorial se dibuja directamente en un HTML5 Canvas escalado, lo que garantiza una salida de alta densidad nítida y precisa, sin pixelación.',
  'pageText.b2fcc05a': '¿Se suben mis documentos PDF a algún servidor?',
  'pageText.aea89d9c':
    '¡No! Todo el proceso de decodificación y representación ocurre íntegramente en tu navegador mediante URL de Blob e iframes HTML5 aislados.',
  'pageText.2a1e46ea': '¿Admite prefijos data:application/pdf;base64?',
  'pageText.28866c6e':
    'Sí. El conversor detecta y elimina automáticamente los prefijos de URI de datos y los espacios en blanco adicionales de tu entrada Base64.',
  'pageText.9c3e5e8b': '¿Qué atributos HTML se transforman?',
  'pageText.5c0146bd':
    'Transforma `class` en `className`, `for` en `htmlFor`, los estilos en línea en sintaxis de objeto (`style={{ width: "100px" }}`) y atributos SVG como `stroke-width` en `strokeWidth`.',
  'pageText.1636cff7': '¿Qué dialectos de bases de datos se admiten?',
  'pageText.1763f21a':
    'PostgreSQL (con identificadores entre comillas dobles), MySQL (con identificadores entre comillas invertidas) y SQL estándar genérico.',
  'pageText.bc4069b3': '¿Cómo se tratan los objetos anidados en GraphQL?',
  'pageText.38249950':
    'Los objetos JSON anidados se extraen en definiciones `type` de GraphQL independientes y se referencian automáticamente por nombre de campo.',
  'pageText.d1268a9b': '¿Esta herramienta analiza automáticamente números y booleanos en TSV?',
  'pageText.657e3a11':
    'Sí. Los valores numéricos y las cadenas booleanas (true/false) se convierten automáticamente en valores primitivos nativos de JSON.',
  'pageText.ab767ca9': '¿Qué diferencia hay entre NDJSON y JSON?',
  'pageText.ac640a73':
    'NDJSON contiene un objeto JSON válido por línea, sin corchetes de matriz alrededor, lo que lo hace ideal para transmitir registros grandes de forma continua.',
  'pageText.d53f6e6d': '¿Qué es Punycode?',
  'pageText.932ba104':
    'Punycode es una sintaxis de codificación definida en RFC 3492 que convierte caracteres Unicode en secuencias ASCII con el prefijo "xn--", permitiendo que dominios en otros idiomas funcionen con sistemas DNS antiguos.',
  'pageText.749281f3': '¿Reproduce tonos de audio reales de código Morse?',
  'pageText.80d0a9ba':
    '¡Sí! Mediante la API Web Audio, la herramienta sintetiza pitidos de onda sinusoidal estándar de 650Hz con tiempos precisos de puntos y rayas directamente en tu navegador.',
  'pageText.5e8710c7': '¿Qué directivas Apache se admiten?',
  'pageText.883d775d':
    'Admite las directivas RewriteRule (con indicadores R=301 y L), Redirect 301, DirectoryIndex y Header set.',
  'pageText.e91fd411': '¿Qué tamaño puede tener el archivo CSV?',
  'pageText.55e80dd0':
    'Como el procesamiento ocurre localmente en la memoria del navegador, puede gestionar miles de filas sin latencia.',
  'pageText.948016f8': '¿Cómo se asignan los tipos de datos SQL a TypeScript?',
  'pageText.73d3bf81':
    'INTEGER/FLOAT/DECIMAL se asignan a number, VARCHAR/TEXT/UUID a string, BOOLEAN a boolean y TIMESTAMP/DATE a Date | string.',
  'pageText.b445da7f': '¿Cómo se aplanan los objetos anidados en claves .env?',
  'pageText.6c4dff36':
    'Las claves anidadas se unen con guiones bajos en mayúsculas (por ejemplo, `{ database: { host: "..." } }` se convierte en `DATABASE_HOST="..."`).',
  'pageText.a7ac2f25': '¿Gestiona comas y comillas dentro de las celdas de tablas?',
  'pageText.ad06bce3':
    'Sí. Las celdas que contienen comas o caracteres especiales se escapan correctamente con comillas dobles estándar de RFC 4180.',
  'pageText.c0439e2b': '¿Qué dialectos de SQL se admiten?',
  'pageText.9c661bd6':
    'SQL estándar, MySQL, MariaDB, PostgreSQL, SQLite, SQL Server (T-SQL), Oracle PL/SQL, BigQuery, Snowflake y Trino/Presto. Elige el destino de tu consulta para que se reconozca la sintaxis específica de su dialecto.',
  'pageText.898566a5': '¿Puedo minificar SQL?',
  'pageText.bf763dfa':
    'Sí. Minificar reduce los espacios en blanco a espacios únicos y elimina espacios alrededor de comas, paréntesis, = y puntos y coma. No elimina comentarios, así que borra primero los comentarios --; de lo contrario, todo lo que los siga en la misma línea quedará comentado.',
  'pageText.17bb729b': '¿Formatear cambia lo que hace mi consulta?',
  'pageText.dfdbf373':
    'No. El formato solo modifica los espacios en blanco y las mayúsculas o minúsculas de las palabras clave. Los identificadores, las cadenas literales y el orden de las cláusulas no cambian, y la consulta nunca se ejecuta.',
  'pageText.e673de04': '¿Por qué obtengo un error de análisis?',
  'pageText.f3989307':
    'El dialecto seleccionado no reconoce parte de la sintaxis, o hay una comilla, corchete o paréntesis sin pareja. Cambia al dialecto para el que se escribió la consulta. La sintaxis de plantillas, como {{ }} de dbt o Jinja, puede no analizarse.',
  'pageText.34719ea5': '¿Puedo usar tabuladores para la sangría?',
  'pageText.81ba983d':
    'La salida siempre usa espacios. Las opciones de sangría son 2 espacios, 4 espacios o una anchura de tabulador de 8 espacios.',
  'pageText.568926d9': '¿Se envía mi SQL a un servidor?',
  'pageText.4517bb93':
    'No. El formato se ejecuta en tu navegador con la biblioteca JavaScript sql-formatter y no se establece ninguna conexión a una base de datos.',
  'pageText.9945834b': 'Qué cambia el formateador',
  'pageText.0cac9d90':
    'El formateador divide tu SQL en tokens para el dialecto seleccionado y reconstruye su disposición. Cada cláusula principal (SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY y LIMIT) empieza en su propia línea, las listas de columnas y condiciones se sangran debajo, y las instrucciones se separan por líneas en blanco. Por ejemplo, select id, name from users where active = 1 order by name se convierte en una consulta con SELECT, FROM, WHERE y ORDER BY en líneas separadas e id y name sangrados bajo SELECT. Las palabras clave se escriben en mayúsculas o minúsculas según la opción. Los identificadores, los literales y el orden de las cláusulas no cambian, y la consulta no se valida frente a un esquema de base de datos.',
  'pageText.679a0218': 'Elegir el dialecto correcto',
  'pageText.0dad3f3a':
    'Los dialectos difieren en comillas, operadores y parámetros, y el formateador solo reconoce la sintaxis del dialecto que seleccionas. Si el formato falla o la salida parece incorrecta, comprueba primero que el dialecto corresponda a la base de datos. Ejemplos de sintaxis específica de dialectos:',
  'pageText.94b6656c':
    'PostgreSQL: conversiones de tipo con ::, parámetros posicionales $1 y cuerpos de funciones delimitados por signos de dólar.',
  'pageText.2c576f60':
    'SQL Server (T-SQL): identificadores entre corchetes ([bracketed identifiers]), TOP y @variables.',
  'pageText.8af13c1a': 'MySQL y MariaDB: identificadores entre comillas invertidas (`backtick`).',
  'pageText.ea0458f2':
    'BigQuery: nombres project.dataset.table entre comillas invertidas y tipos STRUCT o ARRAY.',
  'pageText.3fb5a202': 'Minificar es una transformación de texto',
  'pageText.fcad398d':
    'Minificar reduce cada secuencia de espacios en blanco a un espacio y elimina espacios alrededor de comas, paréntesis, = y puntos y coma. Trabaja sobre texto sin analizar SQL, lo que tiene dos consecuencias. Primero, no elimina comentarios: como un comentario -- abarca hasta el final de su línea, poner toda la consulta en una línea puede comentar todo lo que viene después; elimina los comentarios -- o conviértelos en /* */ antes de minificar. Segundo, también reduce los espacios repetidos dentro de cadenas literales, así que compara el resultado con el original si importan los espacios dentro de cadenas.',
  'pageText.1191c370': 'Comentarios y varias instrucciones',
  'pageText.3cf0e67e':
    'Al formatear, un comentario -- al final de una línea de código se mantiene en esa línea, y los comentarios de línea completa permanecen en su lugar. Varias instrucciones separadas por punto y coma se formatean consecutivamente con líneas en blanco entre ellas, así que puedes pegar una migración completa o un script de datos iniciales y revisarlos instrucción por instrucción.',
  'pageText.367d147f': '¿Cuánto puede reducirse CSS?',
  'pageText.62ddee05':
    'Depende de tu hoja de estilos. Elimina comentarios y espacios en blanco adicionales y compara los recuentos de entrada y salida que muestra la herramienta. El CSS ya compacto puede cambiar muy poco.',
  'pageText.95c1ec0d': '¿Es válido el CSS minificado?',
  'pageText.5857bc9f':
    'La minificación usa un analizador CSS y desactiva la reestructuración de reglas, pero aun así debes comprobar la salida en tus propias páginas antes de desplegarla.',
  'pageText.ed466d2a': '¿Minificar cambia el comportamiento de mi CSS?',
  'pageText.d268f9c7':
    'No debería. La reestructuración de reglas está desactivada, así que no se combinan selectores ni se reordenan reglas, conservando la cascada tal como se escribió. Solo se usan formas equivalentes más cortas, como #fff para #ffffff.',
  'pageText.0f9b8560': '¿Se conservarán los comentarios de licencia?',
  'pageText.3a2460c3':
    'Solo si desactivas Eliminar comentarios. Con la opción activada, se eliminan todos los comentarios, incluidos los avisos de licencia /*! */. Desactivada, todos los comentarios permanecen en su lugar.',
  'pageText.f6ab050a': '¿Puedo deshacer la minificación de CSS?',
  'pageText.f9981fd3':
    'Usa Formatear para volver a añadir saltos de línea y sangría. Los comentarios originales y el formato exacto no pueden recuperarse una vez eliminados.',
  'pageText.e39c55b7': '¿Se sube mi CSS?',
  'pageText.5c9957b9':
    'No. CSSO se ejecuta en tu navegador, así que la hoja de estilos se minifica en tu dispositivo y no se envía a un servidor.',
  'pageText.9649813f': 'Minificar CSS sin cambiar la configuración de compilación',
  'pageText.de9a37b9':
    'Pega una hoja de estilos, decide si deben eliminarse los comentarios y selecciona Minificar. CSSO analiza el CSS en un árbol de sintaxis y lo vuelve a escribir de forma compacta, en lugar de borrar caracteres con expresiones regulares. La reestructuración de reglas está desactivada, así que no se combinan selectores ni se mueven reglas. La reducción mostrada compara recuentos de caracteres, por lo que estima el texto ahorrado, no el tamaño comprimido de la transferencia por red.',
  'pageText.67066e30': 'Qué se reduce',
  'pageText.05d17ac2': 'Se eliminan espacios en blanco, saltos de línea y sangría entre tokens.',
  'pageText.190686bf':
    'Se elimina el último punto y coma de cada bloque de declaraciones: .a { color: red; } se convierte en .a{color:red}.',
  'pageText.c6a90a1b':
    'Los colores se escriben en una forma equivalente más corta cuando existe; por ejemplo, #ffffff se convierte en #fff.',
  'pageText.5abe9013':
    'Se eliminan las unidades de las longitudes cero, así que margin: 0px 0px se convierte en margin:0 0.',
  'pageText.8fb6a9bc':
    'Con Eliminar comentarios activado, se borran todos los comentarios, incluidos los avisos de licencia /*! */.',
  'pageText.354dff68':
    'El resto de selectores y valores se conservan tal como están escritos. No se detectan ni eliminan reglas sin usar, porque el minificador no puede ver el HTML que usa la hoja de estilos.',
  'pageText.704bf1fa': 'Usar la salida de forma segura',
  'pageText.2ebe9c56':
    'Copia el CSS minificado en una compilación de prueba y comprueba las páginas afectadas en los tamaños de pantalla pertinentes.',
  'pageText.ab5ace02':
    'Conserva los comentarios de licencia obligatorios desactivando Eliminar comentarios antes de minificar.',
  'pageText.889b86fa':
    'Usa Formatear como ayuda de lectura; revisa el CSS complejo después de formatearlo porque es una operación independiente de la minificación basada en un analizador.',
  'pageText.4040b973':
    'La minificación complementa la compresión del servidor en lugar de sustituirla: gzip o Brotli siguen reduciendo el archivo minificado durante la transferencia.',
  'pageText.8111e866': 'Cuándo usar una herramienta de compilación',
  'pageText.4d2afabc':
    'Si tu proyecto ya usa un empaquetador o framework, la minificación CSS suele configurarse allí, por ejemplo con Lightning CSS, cssnano o esbuild, y se ejecuta en cada compilación. Esta herramienta resulta adecuada para hojas de estilos puntuales, archivos de CMS o temas, CSS pegado en un widget de terceros y comprobaciones rápidas de cómo un minificador trata una regla concreta. Las hojas de estilos de la cabecera del documento bloquean la representación hasta cargarse, por lo que archivos más pequeños ayudan al primer renderizado en conexiones lentas, aunque eliminar reglas sin usar suele ahorrar más que minificar por sí solo.',
  'pageText.d083d747': '¿Qué optimizaciones se aplican?',
  'pageText.e796e2d2':
    'Terser elimina espacios en blanco, puntos y coma opcionales y comentarios, evalúa expresiones constantes, elimina código inalcanzable y simplifica condicionales. Los ajustes opcionales eliminan llamadas console.* e instrucciones debugger y abrevian true y false como !0 y !1.',
  'pageText.6feece85': '¿Debo usar esto en producción?',
  'pageText.f02032e4':
    'Esta herramienta usa Terser para minificar JavaScript con un analizador. Las compilaciones de producción deben integrar la minificación en un empaquetador como Webpack, Rollup o esbuild.',
  'pageText.9996cfd4': '¿La minificación romperá mi código?',
  'pageText.1d35f0cc':
    'Terser solo aplica transformaciones que conservan el comportamiento de JavaScript válido. Los problemas suelen proceder de código que inspecciona su propio código fuente, como leer Function.prototype.toString(), o de eliminar llamadas a console que hacían trabajo real. Prueba la salida antes de desplegarla.',
  'pageText.a33aea1e': '¿Cómo elimino console.log de JavaScript?',
  'pageText.851f8ba7':
    'Activa Eliminar console.* y minifica. Se elimina cada llamada a un método console, incluidas console.error y console.warn, junto con sus argumentos. En una compilación, establece compress.drop_console en las opciones de Terser.',
  'pageText.e005a375': '¿Por qué no se acortan los nombres de mis variables?',
  'pageText.1c73417a':
    'El acortamiento de nombres está desactivado, así que la salida conserva identificadores legibles para depurar sin mapas de código fuente. Los empaquetadores suelen activarlo en producción, lo que ahorra más bytes.',
  'pageText.a4388952': '¿Puedo minificar TypeScript o JSX?',
  'pageText.8bff2c76':
    'No. Terser solo analiza JavaScript, por lo que las anotaciones de tipos y JSX provocan un error de sintaxis. Compila primero el código con tsc, esbuild, Babel o SWC y después minifica la salida JavaScript.',
  'pageText.56b9f99f': 'Qué hace el minificador con tu código',
  'pageText.55103bdf':
    'Terser analiza el código en un árbol de sintaxis, aplica pasadas de compresión y escribe el resultado sin espacios en blanco innecesarios. La compresión evalúa constantes, elimina código inalcanzable y variables locales sin usar, acorta condicionales y une instrucciones cuando es seguro. Al analizar el código en lugar de editarlo con expresiones regulares, conserva las cadenas, las expresiones regulares y los literales de plantilla. Por ejemplo, function add(a, b) { return a + b; } // sum se convierte en function add(a,b){return a+b}, y const ok = true; en const ok=!0; con Abreviar booleanos activado.',
  'pageText.0ee8f397': 'Explicación de las opciones',
  'pageText.0a5da22e':
    'Eliminar comentarios: elimina todos los comentarios, incluidos los avisos de licencia /*! */. Desactívalo para conservarlos, por ejemplo cuando una licencia exige mantener el aviso junto al código.',
  'pageText.3fbd5c3f':
    'Eliminar console.*: elimina llamadas como console.log, console.warn y console.error, incluidos sus argumentos, así que no dependas de efectos secundarios dentro de esas llamadas.',
  'pageText.d5ef0e31': 'Eliminar debugger: borra las instrucciones debugger.',
  'pageText.0f7a6693':
    'Abreviar booleanos: reescribe true y false como !0 y !1 y simplifica las expresiones booleanas.',
  'pageText.281f8120': 'Qué no hace esta herramienta',
  'pageText.c178c0f1':
    'No renombra variables (el acortamiento está desactivado), por lo que la salida es mayor que un paquete típico de producción, pero más fácil de depurar.',
  'pageText.c4a6b403':
    'No genera mapas de código fuente ni empaqueta importaciones de otros archivos.',
  'pageText.d46a72e1': 'Solo acepta JavaScript; TypeScript y JSX deben compilarse primero.',
  'pageText.059e3a00':
    'No transpila sintaxis moderna para navegadores antiguos. El encadenamiento opcional, los campos de clases y funciones similares se conservan tal como se escribieron, así que usa Babel o esbuild con un destino si lo necesitas.',
  'pageText.f406cb39':
    'Formatear es un reformateador sencillo que añade saltos de línea después de llaves y puntos y coma. Está pensado para lectura rápida, puede tratar mal comentarios y expresiones regulares y no sustituye a Prettier.',
  'pageText.853950f8': 'Interpretar las estadísticas de tamaño',
  'pageText.07b3482d':
    'Los tamaños original y minificado son recuentos de caracteres del texto, y el porcentaje de reducción los compara. El ahorro real de transferencia suele ser menor, porque los servidores normalmente envían JavaScript con gzip o Brotli, que ya reduce espacios e identificadores repetidos. Mide el tamaño comprimido del archivo compilado cuando necesites cifras exactas.',
  'pageText.c9a86f33': '¿Qué hace el formateador?',
  'pageText.7b99d384':
    'El formateador divide etiquetas, comentarios y texto en tokens y después añade sangría y saltos de línea alrededor de la estructura reconocida de bloques. Es una ayuda de legibilidad, no un analizador, validador o saneador HTML ni un motor de representación del navegador.',
  'pageText.8c60e5e5': '¿Puedo elegir el tamaño de sangría?',
  'pageText.f45f1451': '¡Sí! Puedes elegir entre 2, 4 u 8 espacios para la sangría.',
  'pageText.b5dc2f5c': '¿Formatear corrige HTML no válido o inseguro?',
  'pageText.6bd5634a':
    'No. No repara etiquetas sin pareja, valida atributos, elimina scripts ni demuestra que el marcado sea seguro. Usa un validador HTML y un saneador apropiado para el contexto cuando importen la corrección o el contenido no fiable.',
  'pageText.6853bf2a': 'Qué cambia el formateador HTML',
  'pageText.59f55f70':
    'El formateador separa etiquetas de bloque normales en líneas legibles, mantiene un conjunto conocido de elementos en línea con el texto circundante, conserva comentarios y sangra la estructura anidada con el número de espacios seleccionado. El panel de salida también informa del número de caracteres y líneas para comparar el resultado con la entrada.',
  'pageText.5bc49953': 'Formateador frente a analizador o validador',
  'pageText.28eb81f1':
    'Formatear cambia los espacios en blanco y la disposición; no construye un DOM del navegador ni aplica el algoritmo de análisis HTML.',
  'pageText.a285b9fa':
    'Las etiquetas sin pareja, omitidas o mal formadas no se reparan y pueden producir una sangría engañosa.',
  'pageText.506549f7':
    'Los scripts, atributos de manejadores de eventos, URL inseguras y otros contenidos activos se conservan como texto. Formatear no es sanear.',
  'pageText.525714f9':
    'El contenido incrustado de scripts, estilos, plantillas, SVG o atributos que contenga corchetes angulares puede superar los límites del tokenizador sencillo y debe tratarse con una herramienta de desarrollo que use un analizador.',
  'pageText.4a57b0bb': 'Espacios en blanco y límites de privacidad',
  'pageText.3ede26b8':
    'Los espacios pueden ser significativos en texto preformateado, flujos en línea, plantillas, correos y directivas de frameworks. Compara el comportamiento en el navegador o motor de plantillas de destino antes de reemplazar código fuente de producción. El formato se ejecuta en el navegador y el editor no ejecuta el HTML pegado, pero el historial del portapapeles, las extensiones y cualquier destino posterior siguen siendo vías de exposición independientes.',
  'pageText.bbd35cbf':
    'El minificador elimina comentarios HTML y reduce los espacios en blanco. Puedes elegir qué opciones aplicar.',
  'pageText.f78988ed': '¿Cuánto puede reducirse HTML?',
  'pageText.de2adbe4':
    'La minificación suele reducir el tamaño de los archivos HTML entre un 10 % y un 30 %, según el formato original y la cantidad de comentarios.',
  'pageText.dc1d729a': '¿Qué funciones XML se admiten?',
  'pageText.aa014daa':
    'El tokenizador reconoce etiquetas normales, etiquetas autocerradas, comentarios, secciones CDATA, instrucciones de procesamiento y declaraciones DOCTYPE sencillas. No resuelve esquemas, espacios de nombres, entidades ni recursos DTD externos.',
  'pageText.e249844a': '¿Esta herramienta valida que el XML esté bien formado?',
  'pageText.c291f4c2':
    'No. Formatea marcado similar a tokens, pero no realiza un análisis XML conforme a los estándares. Usa un analizador o validador XML para detectar etiquetas sin pareja, nombres no válidos, errores de entidades, incumplimientos del esquema y problemas de espacios de nombres.',
  'pageText.40d2ec46': 'Qué cambia el formateador XML',
  'pageText.ac2829ba':
    'El formateador recorre etiquetas y contenido XML reconocibles, reduce la sangría antes de una etiqueta de cierre, la aumenta después de una de apertura y conserva etiquetas autocerradas, comentarios, CDATA, instrucciones de procesamiento y tokens DOCTYPE sencillos. Puedes seleccionar dos, cuatro u ocho espacios sin enviar el documento a un servidor.',
  'pageText.df3aac91': 'Formatear no es validar XML',
  'pageText.54105db0':
    'La herramienta no verifica que haya un único elemento raíz, nombres de etiquetas coincidentes, atributos válidos, asociaciones de espacios de nombres, declaraciones de entidades, XSD, DTD ni reglas de negocio.',
  'pageText.ebba6da6':
    'Un resultado formateado puede seguir siendo XML mal formado; valídalo con el analizador y el esquema que use el sistema de destino.',
  'pageText.53dced72':
    'Los subconjuntos internos DTD complejos y el marcado inusual que contiene > dentro de declaraciones pueden superar los límites del tokenizador sencillo.',
  'pageText.6dda43fb':
    'No se resuelven entidades externas, lo que evita recuperarlas, pero también significa que no se comprueba la corrección dependiente de entidades.',
  'pageText.97f2bab3': 'Contenido mixto, firmas y privacidad',
  'pageText.14bd67e8':
    'El formateador recorta los tokens de texto e inserta espacios en blanco, así que los documentos de contenido mixto donde los espacios son semánticamente significativos requieren revisión cuidadosa. No formatees XML canonicalizado o firmado digitalmente porque cualquier cambio de bytes puede invalidar una firma. El procesamiento es local, mientras que el historial del portapapeles, las extensiones, los dispositivos compartidos y el destino donde se pega la salida siguen siendo riesgos independientes.',
  'pageText.fe32a91d': '¿Cuánto reduce la minificación SVG el tamaño del archivo?',
  'pageText.5d39171c':
    'Según la cantidad de metadatos del editor (Adobe Illustrator, Inkscape) y comentarios sobrantes, el tamaño de los archivos SVG suele reducirse entre un 30 % y un 70 %.',
  'pageText.96ecd07b': '¿La minificación afecta a la calidad visual?',
  'pageText.a917f319':
    'No. El minificador conserva los vectores y curvas visuales esenciales y redondea decimales con dígitos redundantes para mantener una representación precisa.',
  'pageText.b7b3cc9a': '¿Qué metadatos se eliminan durante la optimización?',
  'pageText.66896ba8':
    'El optimizador elimina declaraciones XML, cabeceras DOCTYPE, comentarios HTML/XML y atributos específicos de Adobe Illustrator, Figma, Inkscape y Sketch.',
  'pageText.78172982': '¿Puedo previsualizar el SVG optimizado antes de descargarlo?',
  'pageText.390681e1':
    'Sí, debajo del editor se muestra una vista previa visual del SVG en tiempo real para comprobar la calidad de representación.',
  'pageText.0b1fe2c2': '¿La minificación SQL altera la lógica o los resultados de la consulta?',
  'pageText.e4ef1b07':
    'No. Solo elimina comentarios no ejecutables y reduce espacios en blanco alrededor de operadores y paréntesis.',
  'pageText.9b592f46': '¿Por qué minificar JSON?',
  'pageText.ed32b385':
    'El JSON minificado reduce el tamaño de transferencia en bytes entre un 20 % y un 50 %, acelerando las respuestas de API y reduciendo los costes de almacenamiento.',
  'pageText.c0fed95c': '¿Cuánto puedo reducir el tamaño de mi imagen?',
  'pageText.e029d2f5':
    'Según la imagen y el formato (como WebP), normalmente puedes ahorrar entre un 50 % y un 80 % del tamaño del archivo.',
  'pageText.9d6eb265': '¡Sí! Todo se procesa localmente en tu navegador, sin subidas al servidor.',
  'pageText.9da1e25c': '¿Cómo funciona la extracción de paletas de colores?',
  'pageText.6856aaf1':
    'Toma muestras de los datos de píxeles de la imagen y agrupa colores en conjuntos dominantes mediante cuantización rápida del color.',
  'pageText.a4364887': '¿Puedo inspeccionar los colores de píxeles concretos?',
  'pageText.f7f9cfc5':
    'Sí, pulsa cualquier lugar de la vista previa de la imagen para seleccionar el color exacto del píxel con el cuentagotas.',
  'pageText.a35b5925': '¿Es seguro unir documentos PDF sensibles?',
  'pageText.05bdd01e':
    'Sí, DevsTools une PDF íntegramente en tu navegador mediante pdf-lib. Tus documentos nunca se suben a ningún servidor.',
  'pageText.61e14c97': '¿Puedo cambiar el orden de los PDF que se van a unir?',
  'pageText.8d1a28fb':
    'Sí, usa los botones de flecha arriba y abajo para organizar fácilmente los archivos antes de unirlos.',
  'pageText.0d93721b': '¿Cómo especifico los intervalos de páginas para dividir?',
  'pageText.a635c961':
    'Introduce intervalos de páginas como "1-3, 5, 8-10" o usa los botones de ajustes rápidos.',
  'pageText.478026f0': '¿Dividir afecta a la calidad del documento?',
  'pageText.343ad06a':
    'No, el texto vectorial, las imágenes incrustadas y las fuentes conservan su calidad original.',
  'pageText.3832da18': '¿Qué modelos se incluyen en la comparación?',
  'pageText.d5944039':
    'GPT-4o, GPT-4o-mini, o1, o3-mini, Claude 3.5 Sonnet/Haiku/Opus, Gemini 2.0 Flash, Gemini 1.5 Pro, DeepSeek V3/R1 y Llama 3.3.',
  'pageText.2c0b42c9': '¿Calcula los descuentos por caché de prompts?',
  'pageText.1f24b0e5':
    'Sí, ajusta el control de porcentaje de caché de prompts para ver los costes descontados de tokens de entrada.',
  'pageText.b55124a7': '¿El entorno de pruebas admite Tailwind CSS?',
  'pageText.3c96d97b':
    'Sí, elige el ajuste Tailwind para incluir automáticamente el CDN de Tailwind.',
  'pageText.eea9bb11': '¿Puedo exportar mi proyecto del entorno de pruebas?',
  'pageText.22043773':
    'Sí, pulsa "Exportar HTML" para descargar un documento HTML independiente en un único archivo.',
  'pageText.08df7b07': '¿Qué formato usa esta herramienta?',
  'pageText.d6dda949':
    'Esta herramienta usa el formato numérico Cronie de 5 campos: minuto (0-59), hora (0-23), día del mes (1-31), mes (1-12) y día de la semana (0-7, donde 0 y 7 son domingo). No admite nombres de meses o días ni aleatorización con tilde.',
  'pageText.3ef8cae4': '¿Qué significa */5 * * * *?',
  'pageText.8b55b7bf':
    'Ejecutar cada cinco minutos: a los minutos :00, :05, :10 y así sucesivamente hasta :55 de cada hora, todos los días.',
  'pageText.14555971': '¿Cómo ejecuto una tarea cron todos los días a medianoche?',
  'pageText.555d6847':
    'Usa 0 0 * * *. El primer campo es el minuto y el segundo la hora, así que la tarea se ejecuta a las 00:00 en la zona horaria de la máquina que ejecuta cron.',
  'pageText.ebbbedb4': '¿Por qué mi tarea se ejecuta más días de lo esperado?',
  'pageText.dd287a29':
    'Cuando tanto el día del mes como el día de la semana están restringidos, cron ejecuta la tarea si coincide cualquiera de ellos. 0 9 1 * 1 se ejecuta el día 1 de cada mes y todos los lunes. Establece uno de los campos como * para usar solo el otro.',
  'pageText.4c325954': '¿Qué zona horaria usan las tareas cron?',
  'pageText.1999379a':
    'El crontab clásico usa la zona horaria del sistema del servidor, que suele ser UTC. Los CronJobs de Kubernetes pueden establecer spec.timeZone, y los horarios de GitHub Actions se ejecutan en UTC. Esta herramienta previsualiza ejecuciones en la zona horaria de tu navegador.',
  'pageText.05cc7746': '¿Admite @daily, segundos o L y W?',
  'pageText.df473d06':
    'No. Se rechazan macros como @daily y @reboot, campos de segundos o año y caracteres de Quartz como ?, L, W y #. Escribe @daily como 0 0 * * *.',
  'pageText.1fd13551': 'Leer los cinco campos de cron',
  'pageText.33035464':
    'Un horario crontab estándar tiene cinco campos separados por espacios: minuto (0-59), hora (0-23), día del mes (1-31), mes (1-12) y día de la semana (0-7, donde tanto 0 como 7 significan domingo). El comando que sigue al horario en una línea crontab no forma parte de la expresión, así que pega solo los cinco campos. Por ejemplo, 30 2 * * 1 se ejecuta a las 02:30 todos los lunes, y 0 9 * * 1-5 a las 09:00 de lunes a viernes. Cada campo acepta cuatro operadores:',
  'pageText.016be4a0': '* coincide con todos los valores del campo.',
  'pageText.0fb5d225':
    'Una coma construye una lista: 0,30 en el campo de minutos se ejecuta a los minutos :00 y :30.',
  'pageText.f7efe16b':
    'Un guion construye un intervalo inclusivo: 9-17 en el campo de horas abarca desde las 9:00 hasta las 17:00.',
  'pageText.0745593a':
    'Una barra añade un paso a * o a un intervalo: */15 significa cada 15 minutos y 8-18/2 significa cada dos horas de 8 a 18.',
  'pageText.1e8af08c': 'Día del mes y día de la semana: la regla OR',
  'pageText.71a25a12':
    'Cuando ambos campos de día están restringidos, cron ejecuta la tarea si coincide cualquiera de ellos, no solo cuando coinciden ambos. Así, 0 0 13 * 5 se ejecuta a medianoche el día 13 de cada mes y también todos los viernes, no solo los viernes 13. Si algún campo de día empieza por *, incluido un paso como */2, los campos se combinan con AND. Este analizador sigue la misma regla que Cronie y Vixie cron, y la lista de próximas ejecuciones muestra el efecto inmediatamente.',
  'pageText.c0ab4e56': 'Cómo se calculan las próximas horas de ejecución',
  'pageText.79d9be29':
    'Las próximas cinco ejecuciones se calculan en tu navegador con la zona horaria actual del dispositivo, y cada hora se muestra con su abreviatura de zona. Los servidores suelen ejecutar cron en su propia zona, a menudo UTC, así que una tarea mostrada aquí a las 09:00 puede ejecutarse a otra hora local en el servidor. Los cambios de horario estacional pueden omitir una hora local, como las 02:30 el día del adelanto de primavera, o repetir una en otoño. La vista previa enumera cada ocurrencia local real, así que comprueba cómo gestiona tu servicio cron esas transiciones.',
  'pageText.71055715': 'Sintaxis que rechaza este analizador',
  'pageText.941d3d4e':
    'Nombres de meses y días de la semana, como JAN o MON; usa los números 1-12 y 0-7.',
  'pageText.1155fe27': 'Macros como @hourly, @daily y @reboot.',
  'pageText.aac0ad9e': 'Extensiones de Quartz y Spring: un campo de segundos o año, ?, L, W y #.',
  'pageText.eb78245f': 'Un paso sobre un valor único, como 5/10; escribe 5-59/10 en su lugar.',
  'pageText.a20b5d46':
    'Valores aleatorizados, como H al estilo Jenkins o la sintaxis ~ que admiten algunas versiones de cron.',
  'pageText.01e5036b': '¿Puede analizar cabeceras duplicadas?',
  'pageText.a5eb4734':
    'Sí. Las claves de cabecera duplicadas se agrupan en matrices en la salida JSON analizada.',
  'pageText.48b8738b': '¿Qué formato de entrada se espera?',
  'pageText.b75acdab': 'Usa una cabecera por línea con el formato "Header-Name: value".',
  'pageText.3d8017de': '¿Qué son los códigos de estado HTTP?',
  'pageText.f49da83d':
    'Los códigos de estado HTTP son respuestas estandarizadas del servidor que indican si una solicitud tuvo éxito, falló o se redirigió.',
  'pageText.09b5ad7b': '¿Qué clases de códigos de estado existen?',
  'pageText.ed562809':
    '1xx informativos, 2xx éxito, 3xx redirección, 4xx errores del cliente y 5xx errores del servidor.',
  'pageText.fc679ed8': '¿Qué precisión tiene el análisis de UA?',
  'pageText.8d6134ab':
    'La herramienta usa el conjunto de reglas incluido de UAParser.js 1.0.41, pero los resultados siguen siendo heurísticos porque las cadenas User-Agent son autodeclaradas, se reducen y pueden falsificarse.',
  'pageText.14c11e52': '¿Puede detectar bots?',
  'pageText.ac1e7ccc':
    'Identifica tokens habituales de rastreadores de búsqueda e IA con nombre y aplica como alternativa una heurística de bot/crawler/spider. Puede no detectar un rastreador no incluido o disimulado.',
  'pageText.28488b1d': '¿Puedo analizar varias cadenas User-Agent?',
  'pageText.f540646b':
    'Sí. Activa el modo por lotes y pega una cadena User-Agent por línea para recibir una matriz JSON con los resultados analizados.',
  'pageText.964b16b5': 'Qué devuelve este analizador de User-Agent en línea',
  'pageText.9d61821a':
    'Pega una cadena User-Agent, o activa el modo por lotes para usar una por línea, para analizar nombre y versión del navegador, sistema operativo, motor de representación, fabricante, modelo y tipo de dispositivo, arquitectura de CPU e indicios de bots conocidos. RFC 9110 define User-Agent como un campo de solicitud que contiene identificadores de productos y comentarios opcionales sobre el software que origina una solicitud. Esta herramienta lee esos tokens autodeclarados; no contacta con el dispositivo ni inspecciona el navegador que los envió.',
  'pageText.32c1543c': 'Cómo funciona la detección',
  'pageText.080c4d60':
    'El conjunto de reglas incluido de UAParser.js 1.0.41 aplica sus datos de expresiones regulares de navegador, motor, sistema operativo, dispositivo y CPU dentro del navegador.',
  'pageText.c680aa0e':
    'El resultado muestra versiones, fabricante y modelo del dispositivo cuando la cadena pegada contiene información suficiente.',
  'pageText.954982d4':
    'Una capa independiente de bots reconoce tokens con nombre, como Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot y Applebot, y después recurre a palabras clave genéricas de rastreadores.',
  'pageText.ddc447f4':
    'Usar mi User-Agent lee navigator.userAgent de este navegador; el modo por lotes analiza una cadena pegada por línea.',
  'pageText.ef145930': 'Precisión y limitaciones',
  'pageText.1f7dae65':
    'Trata cada resultado como un indicio, no como identidad verificada. Las cadenas User-Agent pueden modificarse o falsificarse, los tokens de compatibilidad pueden nombrar varios navegadores y las cadenas reducidas pueden omitir versiones o detalles del dispositivo. Los valores desconocidos permanecen como Desconocido, mientras que una cadena no móvil sin reconocer recurre a Escritorio. La detección de bots también es heurística: puede omitirse un rastreador no incluido o disimulado, y un nombre de producto normal que contenga una palabra clave de rastreador puede marcarse. Client Hints y la detección de capacidades pueden proporcionar indicios distintos o más útiles cuando controlas la aplicación.',
  'pageText.22aebc3c': 'Privacidad y uso seguro',
  'pageText.2ae8ed4d':
    'El análisis ocurre en tu navegador mientras escribes. La entrada no se envía a una API de análisis, pero los valores User-Agent pueden contribuir a la identificación por huella al combinarse con otros datos. Evita usar esta salida como autenticación, autorización, prueba de fraude o sustituto de la detección de capacidades.',
  'pageText.0381d4bc': '¿Qué formatos de entrada se admiten?',
  'pageText.e1375844':
    'Introduce una dirección IPv4 canónica en decimal con puntos y un prefijo como /24 o una máscara de subred contigua como 255.255.255.0.',
  'pageText.245b4291': '¿Cómo se tratan las redes /31 y /32?',
  'pageText.683e314e':
    'Una /31 se muestra con la interpretación punto a punto de RFC 3021, en la que ambos extremos son utilizables y no existe dirección de difusión; confirma que el enlace de destino lo admita. Una /32 representa una ruta de un único host y tampoco tiene dirección de difusión.',
  'pageText.c6d33e69': '¿Esta calculadora admite IPv6?',
  'pageText.a3da1f3e':
    'No. Esta versión valida deliberadamente solo IPv4 para que sus reglas de direcciones e intervalos de hosts sigan siendo explícitas.',
  'pageText.790f8f4a': 'Qué devuelve la calculadora CIDR IPv4',
  'pageText.d1b4b69d':
    'CIDR combina una dirección IPv4 con una longitud de prefijo que indica cuántos bits iniciales identifican la red. La calculadora normaliza la dirección introducida a su red canónica y muestra el límite de difusión, la máscara con puntos, la máscara comodín inversa, el número total de direcciones y el intervalo de hosts utilizables.',
  'pageText.1d5581a7': 'Entrada estricta y casos límite',
  'pageText.f2babb34':
    'La entrada IPv4 debe contener cuatro octetos decimales de 0 a 255; se rechazan las formas ambiguas con ceros iniciales y las abreviadas.',
  'pageText.de8ed2ff':
    'Se admiten longitudes de prefijo de /0 a /32 y máscaras contiguas en decimal con puntos.',
  'pageText.238148ff':
    'De /0 a /30, los límites de red y difusión se excluyen del intervalo de hosts utilizables.',
  'pageText.678c186b':
    'Para /31, ambos extremos punto a punto son utilizables según RFC 3021; /32 representa una ruta de un único host.',
  'pageText.08e319a3': 'Límites operativos',
  'pageText.16280f4e':
    'El resultado describe cálculos de direcciones, no accesibilidad por enrutamiento, políticas de cortafuegos, asignación DHCP, reservas de proveedores de nube, pertenencia a VLAN ni si una dirección puede enrutarse públicamente. Aplica las reglas de la plataforma de red de destino antes de asignar hosts.',
  'pageText.43b9f352': '¿Qué significan 755 y 644?',
  'pageText.244efe25':
    'Cada dígito octal combina lectura (4), escritura (2) y ejecución (1). El modo 755 es rwxr-xr-x, mientras que 644 es rw-r--r--.',
  'pageText.0a65a354': '¿Qué son los bits setuid, setgid y sticky?',
  'pageText.3c3c8484':
    'Son bits de modo especiales representados por un dígito octal inicial. Su efecto de seguridad exacto depende del tipo de objeto, sistema operativo, sistema de archivos, opciones de montaje y contexto de ejecución.',
  'pageText.d9d32a1e': '¿Esta herramienta cambia un archivo?',
  'pageText.b0c7d669':
    'No. Solo calcula y copia notación de permisos; no puede acceder a tu sistema de archivos ni modificarlo.',
  'pageText.ad18866f': 'Cómo funciona la calculadora chmod',
  'pageText.47cea64b':
    'Los modos de permisos Unix agrupan bits de lectura, escritura y ejecución para el propietario, el grupo y otros. Sumar los valores de bits produce cada dígito octal: lectura es 4, escritura es 2 y ejecución es 1. La calculadora mantiene sincronizadas las representaciones octal, rwx y de casillas.',
  'pageText.c281eef7':
    'Evita permisos amplios de escritura, como 777, salvo que el modelo exacto de amenazas y el entorno los requieran.',
  'pageText.81ae01d1':
    'Un modo no muestra la propiedad del archivo, ACL, capacidades, reglas de SELinux o AppArmor, opciones de montaje, asignaciones de contenedores ni políticas heredadas.',
  'pageText.a50e1c4a':
    'S o T en mayúscula significa que el bit especial está activado y el bit de ejecución correspondiente no lo está.',
  'pageText.ba30cf48':
    'Revisa la ruta de destino y la propiedad antes de ejecutar cualquier comando chmod copiado, especialmente de forma recursiva.',
  'pageText.57ae6fe2': '¿Qué diferencia hay entre no-cache y no-store?',
  'pageText.856cc543':
    'no-cache permite almacenar una respuesta, pero exige validación antes de reutilizarla. no-store indica a las cachés que no almacenen la respuesta. No son intercambiables.',
  'pageText.a24540f5': '¿Qué controla s-maxage?',
  'pageText.07c63451':
    's-maxage establece la vigencia para las cachés compartidas y tiene prioridad sobre max-age en ellas. El comportamiento del navegador y las cachés privadas puede seguir siendo diferente.',
  'pageText.47165661': '¿Esta herramienta puede garantizar el comportamiento de un CDN?',
  'pageText.4736a111':
    'No. Valida la sintaxis y señala conflictos habituales, pero el comportamiento real depende de la respuesta completa, las directivas de solicitud, la implementación de caché, la política del CDN, los valores predeterminados del framework y el estado de invalidación.',
  'pageText.ca31e679': 'Qué comprueba la herramienta Cache-Control',
  'pageText.7a512319':
    'El analizador separa directivas delimitadas por comas sin dividir las comas dentro de valores entre comillas, normaliza nombres de directivas, elimina nombres duplicados de la salida formateada y advierte de conflictos habituales, como public con private o valores de vigencia no numéricos.',
  'pageText.be225eb9': 'Limitaciones operativas',
  'pageText.cd535d5c':
    'La semántica de Cache-Control difiere entre solicitudes y respuestas; los ajustes predefinidos son ejemplos orientados a respuestas.',
  'pageText.ae842969':
    'Una cabecera válida no invalida todas las reglas de CDN, cabeceras de intermediarios, cachés de frameworks, service workers, heurísticas de navegador ni purgas explícitas.',
  'pageText.12ea33ca':
    'immutable resulta más apropiado para recursos versionados cuya URL cambia cada vez que cambia su contenido.',
  'pageText.819756b2':
    'No almacenes públicamente en caché respuestas personalizadas o sensibles sin una revisión completa de autenticación, Vary, cookies y comportamiento de intermediarios.',
  'pageText.8fc53dd8': '¿El analizador puede demostrar que una CSP es segura?',
  'pageText.6bdde330':
    'No. Señala problemas estáticos habituales, pero no puede entender todos los flujos de la aplicación, comportamientos del navegador, ciclos de vida de nonce, integraciones de terceros, endpoints de informes ni formas de eludir la política en la aplicación protegida.',
  'pageText.00ae173a': '¿Por qué debo empezar con el modo de solo informes?',
  'pageText.487cd4a8':
    'Content-Security-Policy-Report-Only registra incumplimientos sin aplicar la política. Ayuda a identificar los recursos necesarios antes de exigirla, aunque los informes también requieren revisión cuidadosa y pueden contener URL sensibles.',
  'pageText.1828ef21': '¿Qué ocurre con las directivas duplicadas?',
  'pageText.b8228f81':
    'Los navegadores usan la primera aparición e ignoran las directivas duplicadas posteriores. El analizador informa de duplicados y la salida normalizada del constructor conserva una directiva explícita.',
  'pageText.18b89636': 'Qué comprueba el constructor CSP',
  'pageText.c8f0e194':
    "La política de seguridad de contenido restringe desde dónde un documento puede cargar o ejecutar recursos. Esta herramienta analiza directivas delimitadas por punto y coma, normaliza sus valores, detecta duplicados y resalta riesgos habituales, como orígenes de scripts demasiado amplios, scripts data:, 'unsafe-eval' o 'unsafe-inline' sin un nonce o hash.",
  'pageText.8bc2d491': 'Directivas básicas y hallazgos',
  'pageText.6a15b338':
    'default-src proporciona una alternativa para las directivas de carga no declaradas explícitamente.',
  'pageText.aa0c2e7c':
    "object-src 'none' bloquea contenido de complementos antiguos cuando la aplicación no lo necesita.",
  'pageText.18e827de':
    'base-uri limita los cambios de la URL base del documento, mientras que frame-ancestors controla qué páginas superiores pueden incrustarla.',
  'pageText.4033496a':
    'Una política sintácticamente válida puede romper producción o permitir un flujo inseguro. Valida por separado los orígenes necesarios, nonce, hashes, workers, marcos, formularios e informes.',
  'pageText.190ec910': 'Flujo de despliegue seguro',
  'pageText.ae9648e1':
    'Empieza con un borrador de mínimo privilegio, despliégalo como Content-Security-Policy-Report-Only, recorre las rutas reales de la aplicación e inspecciona los incumplimientos. Elimina dependencias accidentales o añade los orígenes mínimos necesarios y después exige la política probada. Mantén la cabecera bajo control de versiones y vuelve a probarla cuando cambien frameworks, CDN, analítica, anuncios o flujos de autenticación.',
  'pageText.d68c4d88': '¿Esta herramienta ejecuta el comando cURL?',
  'pageText.74f4df78':
    'No. Solo divide la entrada admitida en tokens y genera texto. Nunca inicia una shell, contacta con la URL de destino ni envía las cabeceras y el cuerpo.',
  'pageText.48e8b2e0': '¿Qué opciones cURL pueden convertirse?',
  'pageText.2aedeaa5':
    'El conversor trata opciones habituales de solicitud, incluidos método, URL, cabeceras y datos, además de opciones inocuas de seguimiento de redirecciones o compresión. Se rechazan las funciones de shell no admitidas o ambiguas en lugar de adivinarlas.',
  'pageText.159eff58': '¿cURL y fetch son siempre equivalentes?',
  'pageText.dde74409':
    'No. Las redirecciones, cookies, TLS, proxies, compresión, transmisión continua, CORS, cabeceras prohibidas por el navegador, credenciales y subidas multipartes pueden comportarse de forma distinta. Revisa y prueba el código generado en su entorno real.',
  'pageText.ec80b478': 'Qué hace el conversor de cURL y fetch',
  'pageText.68449604':
    'El constructor de solicitudes transforma entradas estructuradas de método, URL, consulta, cabeceras y cuerpo en un comando cURL con comillas para shell POSIX y un ejemplo fetch de JavaScript. El conversor divide un comando cURL pegado admitido en tokens sin ejecutarlo y después asigna los datos de la solicitud a la sintaxis fetch.',
  'pageText.cee22a22': 'Límites de análisis y seguridad',
  'pageText.a46bfb45':
    'Se rechazan sustituciones de shell, comillas invertidas, bytes NUL, comillas mal formadas, inyección CRLF en cabeceras y opciones no admitidas.',
  'pageText.a46b5014':
    'Los valores sensibles de Authorization, Cookie, autorización de proxy y claves de API pueden ocultarse en la salida generada y se ocultan por defecto en la interfaz.',
  'pageText.b759e2e1':
    'Las reglas de comillas de una shell POSIX no son las de PowerShell ni cmd de Windows. Revisa la shell de destino antes de ejecutar texto copiado.',
  'pageText.d923e0c4':
    'La API Headers de Fetch puede combinar cabeceras de solicitud repetidas; el fragmento generado señala nombres duplicados para revisión manual.',
  'pageText.6518c723':
    'La herramienta no envía solicitudes, valida servidores remotos, almacena credenciales ni demuestra que los secretos copiados estén a salvo de extensiones, scripts de página, historial del portapapeles o pantalla compartida.',
  'pageText.a52cbc62': 'Por qué el fetch generado puede necesitar cambios',
  'pageText.a0b2fa3c':
    'fetch del navegador aplica CORS y reglas de cabeceras prohibidas que el cliente curl de línea de comandos no aplica. JavaScript del lado del servidor tiene otro entorno de cookies, proxies y TLS. Las subidas de formularios multipartes, cuerpos de solicitud transmitidos de forma continua, certificados de cliente, resolución DNS personalizada o reintentos específicos de curl requieren código propio del entorno más allá de una conversión directa.',
  'pageText.92e93e00': '¿Qué relaciones de contraste exige WCAG para el texto?',
  'pageText.71cfc9b4':
    'Para la mayoría del texto, AA exige al menos 4.5:1 y AAA 7:1. El texto grande usa 3:1 para AA y 4.5:1 para AAA. El texto grande tiene al menos 18 puntos en estilo normal o 14 puntos en negrita, normalmente aproximados a 24 píxeles CSS o unos 18.66 píxeles CSS en negrita.',
  'pageText.76601b6f': '¿Qué representa el resultado de componentes de interfaz?',
  'pageText.88ec1351':
    'Aplica el umbral 3:1 usado habitualmente para información visual necesaria para identificar componentes de interfaz y objetos gráficos. Su aplicación depende del estado, los límites, los colores adyacentes y de si el elemento visual es necesario para entender o usar la interfaz.',
  'pageText.f6c937f8': '¿Superar la relación hace accesible todo el diseño?',
  'pageText.c55058e2':
    'No. El contraste es un requisito. El grosor de fuente, tamaño, espaciado, estados de foco y al pasar el cursor, degradados, imágenes, diferencias de visión del color, zoom, colores forzados y transmitir información sin depender del color requieren pruebas independientes.',
  'pageText.bd34b3a3': 'Cómo se calcula la relación de contraste',
  'pageText.93057296':
    'Cada canal sRGB opaco se convierte de su valor codificado a luz lineal, se combina con los coeficientes de luminancia relativa de WCAG y se compara como (más claro + 0.05) / (más oscuro + 0.05). La relación va de 1:1 para luminancias idénticas a 21:1 para blanco y negro. Intercambiar primer plano y fondo no cambia la relación numérica.',
  'pageText.587b353d': 'AA, AAA y vista previa en tiempo real',
  'pageText.a7a29b7f': 'El texto normal supera AA con 4.5:1 y AAA con 7:1.',
  'pageText.4a22824d': 'El texto grande supera AA con 3:1 y AAA con 4.5:1.',
  'pageText.6232d70c':
    'La muestra de interfaz informa del umbral no textual 3:1 sin suponer que cada borde visible deba cumplirlo.',
  'pageText.25adca33':
    'La sugerencia elige el negro o blanco opaco que tenga mayor relación frente al fondo actual; no conserva la intención de marca.',
  'pageText.3543a31e':
    'La vista previa en tiempo real ayuda a detectar problemas evidentes de legibilidad, pero no sustituye las pruebas del producto representado en sus tamaños y estados reales.',
  'pageText.1aad56b9': 'Límites de color y representación',
  'pageText.e945b142':
    'La calculadora acepta colores sRGB opacos hexadecimales de tres o seis dígitos. La transparencia alfa, los degradados, las imágenes, modos de mezcla, calibración de pantalla, suavizado, colores de gama amplia y texto dibujado sobre contenido cambiante requieren evaluar los píxeles compuestos finales. El procesamiento es local y no toma muestras automáticamente de otra página web.',
  'pageText.23984f68': '¿Qué versiones de OpenAPI se admiten?',
  'pageText.a8bb0e10':
    'El analizador estructural acepta cadenas de versión de OpenAPI 3.0, 3.1 y 3.2. Swagger 2.0 se informa como no admitido en lugar de convertirse silenciosamente.',
  'pageText.052ac5a9': '¿Se descargan los documentos $ref externos?',
  'pageText.a9423d78':
    'No. Las referencias de fragmentos locales que empiezan por # se resuelven dentro del documento pegado. Las referencias de archivos y red se enumeran como advertencias, pero nunca se recuperan, lo que mantiene el análisis local y evita acceso oculto a la red.',
  'pageText.0aa9d75d': '¿Un resultado válido garantiza conformidad completa con OpenAPI?',
  'pageText.66286acc':
    'No. Es un analizador estructural específico, no el esquema oficial con todas las reglas semánticas. Usa un validador para la versión concreta y el generador o gateway de destino en CI antes de publicar un contrato de API.',
  'pageText.df996466': 'Qué comprueba el validador estructural',
  'pageText.4c230715':
    'El analizador acepta entrada JSON o YAML con límites, requiere una versión OpenAPI 3, título y versión en info y un objeto paths, y después inventaría las operaciones HTTP estándar. Informa de respuestas ausentes, identificadores de operación duplicados, parámetros de plantilla de ruta sin correspondencia u opcionales, claves de respuesta inusuales, referencias locales sin resolver, versiones raíz no admitidas y campos Path Item desconocidos.',
  'pageText.c33b24c7': 'Cómo resume el explorador de endpoints el contrato',
  'pageText.bd67021b':
    'Cada fila muestra método, ruta, resumen, operationId, claves de respuesta, obsolescencia y estado de seguridad efectivo.',
  'pageText.af6d9ec9':
    'La seguridad de cada operación prevalece sobre la seguridad raíz; una matriz de seguridad vacía se muestra como explícitamente pública.',
  'pageText.f6c0ea2a':
    'La búsqueda abarca ruta, resumen, operationId y etiquetas, mientras que el selector de método limita la lista visible de operaciones.',
  'pageText.f6b3cb96':
    'La vista JSON normalizada permite revisar los resultados del análisis YAML y los alias combinados.',
  'pageText.39b0dc9b':
    'Las referencias externas se cuentan e informan sin ninguna solicitud del navegador.',
  'pageText.477e1f43': 'Límites de validación y seguridad',
  'pageText.aa9a6db6':
    'Un documento estructuralmente válido puede contener esquemas incompatibles, ejemplos no válidos, callbacks rotos, tipos de medios incorrectos, extensiones específicas de un generador, flujos de autenticación inutilizables o un comportamiento de negocio que no corresponda a la implementación. La resolución local de $ref comprueba la existencia, pero no desreferencia completamente todos los contextos semánticos. La profundidad YAML, los alias, la expansión de combinaciones y el tamaño total de entrada tienen límites para que el navegador siga respondiendo.',
  'pageText.e8aa500a': '¿Qué es SPF y por qué se necesita?',
  'pageText.3a448f2b':
    'SPF (Sender Policy Framework) es un registro DNS TXT que enumera los servidores de correo autorizados para enviar mensajes en nombre de tu dominio.',
  'pageText.101baaa1': '¿Qué es DMARC?',
  'pageText.5c6e3f51':
    'DMARC (Domain-based Message Authentication, Reporting, and Conformance) usa SPF y DKIM para indicar a los servidores receptores cómo tratar correos que no superen la autenticación.',
  'pageText.db14ea51': '¿Qué lenguajes de programación y bibliotecas HTTP se admiten?',
  'pageText.cd3899b9':
    'La herramienta genera código para JavaScript (API Fetch y Axios), Python (biblioteca Requests), Go (net/http estándar), PHP (curl_init) y Rust (reqwest asíncrono).',
  'pageText.7db0a8b2': '¿Ejecuta o envía mi solicitud cURL por Internet?',
  'pageText.95abcd54':
    'No. El comando se analiza y divide en tokens íntegramente en tu navegador para generar código. Nunca se envía ni ejecuta nada.',
  'pageText.125a50e9': '¿Qué es una compilación Docker de varias etapas?',
  'pageText.7a608e37':
    'Las compilaciones de varias etapas usan contenedores intermedios independientes para compilar y ejecutar en producción, reduciendo drásticamente el tamaño de la imagen final y eliminando de producción las dependencias de compilación.',
  'pageText.c322990e': '¿El Dockerfile generado se ejecuta como usuario sin privilegios de root?',
  'pageText.585c03a7':
    'Sí, cuando corresponde, el Dockerfile generado configura un usuario dedicado sin privilegios de root (por ejemplo, USER node o appuser), siguiendo buenas prácticas de seguridad de contenedores.',
  'pageText.4adfa17f': '¿Qué propiedades CSS crean el efecto de cristal?',
  'pageText.cb13b4db':
    'El efecto de cristal se consigue con backdrop-filter: blur(), fondo semitransparente (rgba), bordes blancos sutiles (rgba) y sombras box-shadow que aportan elevación.',
  'pageText.78f35ba1': '¿Todos los navegadores modernos admiten backdrop-filter?',
  'pageText.afdcf83f':
    'Sí, todos los navegadores modernos admiten backdrop-filter (Chrome, Edge, Safari y Firefox). Se incluyen prefijos de proveedor (-webkit-backdrop-filter) para máxima compatibilidad.',
  'pageText.a0d9ac95': '¿Qué unidades puedo usar en columnas y filas?',
  'pageText.0d74534d':
    'Puedes configurar unidades fraccionarias flexibles (fr), dimensiones exactas en píxeles (px) o porcentajes (%) para obtener la máxima adaptación del diseño.',
  'pageText.85a4a549': '¿Puedo copiar tanto CSS como HTML?',
  'pageText.349f7349':
    'Sí, se generan simultáneamente el CSS del contenedor .parent con grid-template-columns y la estructura HTML correspondiente.',
  'pageText.db476089': '¿Cuál es la finalidad de robots.txt?',
  'pageText.c4e38da5':
    'Un archivo robots.txt indica a los rastreadores de buscadores (Googlebot, Bingbot) a qué URL y directorios pueden acceder o no en tu sitio web.',
  'pageText.8f3b1cb2': '¿Dónde debe colocarse el archivo robots.txt?',
  'pageText.f8c6a14d':
    'El archivo robots.txt siempre debe colocarse en la raíz del dominio de tu sitio web (por ejemplo, https://example.com/robots.txt).',
  'pageText.dadb2232': '¿Qué etiquetas se incluyen en el XML del mapa del sitio generado?',
  'pageText.0acc8ea9':
    'El XML generado cumple el esquema sitemaps.org 0.9 e incluye los elementos <url>, <loc>, <lastmod>, <changefreq> y <priority>.',
  'pageText.972e9d03': '¿Cómo lo envío a Google Search Console?',
  'pageText.6bb374e1':
    'Descarga el sitemap.xml generado, súbelo al directorio raíz de tu sitio web (https://example.com/sitemap.xml) y envía la URL en Google Search Console.',
  'pageText.912a6605': '¿Qué diferencia hay entre event.key y event.code?',
  'pageText.5f3e9043':
    'event.key devuelve el valor de la tecla pulsada (teniendo en cuenta Shift y Bloq Mayús, como "A" o "a"), mientras que event.code representa la tecla física del teclado (como "KeyA").',
  'pageText.d6886318': '¿Por qué keyCode está obsoleto en JavaScript moderno?',
  'pageText.47c83a7e':
    'event.keyCode no era consistente entre sistemas operativos y distribuciones distintas de QWERTY. El desarrollo web moderno usa como estándar event.key y event.code.',
  'pageText.44aec8dc': '¿Cómo funcionan los triángulos de CSS puro?',
  'pageText.178348f0':
    'Los triángulos CSS funcionan con un elemento de ancho 0 y alto 0, al que se aplican bordes gruesos con tres lados transparentes y uno de color.',
  'pageText.4e5692e9': '¿Puedo generar triángulos diagonales de esquina?',
  'pageText.0633b12d':
    '¡Sí! Puedes elegir entre 8 direcciones: arriba, abajo, izquierda, derecha, arriba a la izquierda, arriba a la derecha, abajo a la izquierda y abajo a la derecha.',
  'pageText.376bbf44': '¿Este generador proporciona CSS puro y clases Tailwind?',
  'pageText.59dce7df':
    'Sí. Tanto las reglas CSS estándar (display: flex, justify-content, align-items, gap) como las clases de utilidades Tailwind se generan en tiempo real.',
  'pageText.99e78b69':
    '¿Puedo añadir o eliminar elementos flex de prueba en el entorno de pruebas?',
  'pageText.b824b684':
    'Sí, usa los botones + y - para ajustar el número de tarjetas de prueba dentro del contenedor y ver cómo se comportan los saltos y el espaciado.',
  'pageText.b1a93891': '¿Qué plataformas sociales se simulan en la vista previa?',
  'pageText.c1f4071a':
    'Puedes alternar entre las vistas de tarjeta de imagen grande de Twitter/X, publicación del feed de Facebook, enlace compartido de LinkedIn y fragmento de resultados de Google.',
  'pageText.fb1820cd': '¿Cuál es la resolución recomendada para imágenes Open Graph?',
  'pageText.da87fb9a':
    'El tamaño estándar recomendado para Twitter Cards y Open Graph de Facebook es de 1200 × 630 píxeles (relación de aspecto 1.91:1).',
  'pageText.5141dfd9': '¿Qué ajustes de animación hay disponibles?',
  'pageText.1033cd43':
    'Los ajustes incluyen rebote, pulso, giro, sacudida, aparición gradual, volteo 3D, balanceo y acercamiento.',
  'pageText.96e7dd99': '¿Puedo personalizar la función de aceleración?',
  'pageText.0aa29a50':
    'Sí. Puedes elegir entre ease, linear, ease-in, ease-out y ease-in-out, además de personalizar la duración y el retraso en segundos.',
  'pageText.2c0cc2c1': '¿Puedo añadir varias capas de sombra al texto?',
  'pageText.8175f838':
    'Sí. Puedes añadir tantas capas text-shadow superpuestas como necesites para lograr profundidad 3D realista, bordes retro multicolores o brillo de neón en varias etapas.',
  'pageText.9ec3072a': '¿Hay estilos predefinidos listos para usar?',
  'pageText.9e6ee7e1':
    '¡Sí! Los ajustes de un clic incluyen sombra suave, brillo de neón, extrusión 3D y contorno retro.',
  'pageText.deb09314': '¿Qué información proporciona la calculadora de subredes?',
  'pageText.6e09390f':
    'Calcula dirección de red, dirección de difusión, máscara de subred, máscara comodín, IP del primer y último host utilizable, número total y utilizable de hosts, clase IP y representaciones binarias de 32 bits.',
  'pageText.f6fb6409': '¿Admite todos los prefijos CIDR (de /0 a /32)?',
  'pageText.eb723f55':
    'Sí. Se admiten todos los prefijos de subred de /0 a /32, incluidos los enlaces especiales punto a punto /31 (RFC 3021) y las máscaras /32 de un solo host.',
  'pageText.7c278231': '¿Qué funciones de filtro CSS se admiten?',
  'pageText.3027f78d':
    'Las funciones admitidas incluyen blur(), brightness(), contrast(), grayscale(), hue-rotate(), invert(), saturate(), sepia() y opacity().',
  'pageText.2666dde6': '¿Se incluyen prefijos de proveedor en el CSS generado?',
  'pageText.45bdde19':
    'Sí. Se generan tanto la propiedad estándar `filter` como `-webkit-filter` para máxima compatibilidad entre navegadores.',
  'pageText.4f32f1e3': '¿Cómo funciona la sintaxis de 8 puntos de border-radius en CSS?',
  'pageText.c08c1dc8':
    'La barra (/) separa radios horizontales y verticales: `border-radius: [TL-h] [TR-h] [BR-h] [BL-h] / [TL-v] [TR-v] [BR-v] [BL-v]`, creando curvas orgánicas suaves no circulares.',
  'pageText.8ed31f5b': '¿Puedo elegir entre unidades de porcentaje (%) y píxeles (px)?',
  'pageText.974f8f3e':
    'Sí, alterna entre % y px con el selector de unidades del panel de controles.',
  'pageText.aff2e0e9': '¿Qué métodos de autenticación se admiten?',
  'pageText.33b1ea50':
    'Admite tokens de portador (`-H "Authorization: Bearer ..."`) y autenticación básica (`-u "user:pass"`).',
  'pageText.f1fe0990':
    '¿Se escapan de forma segura los caracteres especiales y las comillas simples?',
  'pageText.cacf393b':
    'Sí. Las cadenas de cuerpo JSON y cabeceras se escapan correctamente para evitar errores de sintaxis de shell en terminales bash y zsh.',
  'pageText.5785e598': '¿Qué formas de superficie están disponibles?',
  'pageText.7e6f4277':
    'Admite superficies planas, hundidas (sombra interior), cóncavas (curva de degradado) y convexas (curva de degradado invertida).',
  'pageText.9f1d34df': '¿Cómo se calculan las sombras dobles?',
  'pageText.b74d0389':
    'El generador calcula automáticamente el resalte complementario de la fuente de luz y la sombra del lado oscuro a partir del color base y los ajustes de intensidad.',
  'pageText.65e43540': '¿Cómo funcionan los degradados de malla CSS sin canvas ni SVG?',
  'pageText.19ca56b9':
    'Se mezclan varias posiciones `radial-gradient()` superpuestas sobre un fondo sólido, con efectos de desenfoque de fondo o filtro para una representación muy rápida en GPU.',
  'pageText.49cc9737': '¿Puedo añadir o recolocar varios nodos de color?',
  'pageText.f51bb3c6':
    '¡Sí! Puedes añadir hasta 6 nodos de color personalizados y colocar sus coordenadas X/Y de forma independiente entre el 0 % y el 100 %.',
  'pageText.51b04c8d': '¿Qué formas están preconfiguradas?',
  'pageText.f8a18c44':
    'Incluye triángulos, trapecios, paralelogramos, rombos, pentágonos, hexágonos, estrellas y bocadillos de mensajes.',
  'pageText.27ea598c': '¿Es compatible con Firefox y navegadores Chromium modernos?',
  'pageText.a550ba24':
    'Sí. Genera tanto estándares modernos (`scrollbar-color` y `scrollbar-width`) como reglas de proveedor `::-webkit-scrollbar` para cubrir los navegadores.',
  'pageText.c0a0fbb0': '¿Se necesitan archivos de imagen para mostrar estos patrones?',
  'pageText.da49a542':
    'No. Todos los patrones se generan con funciones de CSS puro `radial-gradient` y `linear-gradient`.',
  'pageText.3349cc09': '¿Puedo pegar etiquetas HTML <path> sin procesar?',
  'pageText.bc6be089':
    'Sí. La herramienta extrae automáticamente el atributo `d="..."` de las etiquetas SVG sin procesar.',
  'pageText.b5c8f73b': '¿Qué diferencia hay entre ^ y ~ en npm?',
  'pageText.5e52dc36':
    '`^1.2.3` permite actualizaciones que no modifiquen el primer dígito distinto de cero de izquierda a derecha (< 2.0.0), mientras que `~1.2.3` solo permite cambios de parche (< 1.3.0).',
  'pageText.0e286eaf': '¿Cuál es el prefijo de subred estándar para redes locales IPv6?',
  'pageText.aa2aad9c':
    'Un prefijo /64 es el tamaño estándar de subred para segmentos de red local IPv6 según RFC 4291.',
  'pageText.58ddddc2': '¿Qué campos forman una expresión cron de 5 partes?',
  'pageText.09710cdd':
    'Minuto (0-59), hora (0-23), día del mes (1-31), mes (1-12) y día de la semana (0-6, domingo=0).',
  'pageText.d3c9a849': '¿Por qué es importante SPF para los correos de un dominio?',
  'pageText.61b98659':
    'SPF (Sender Policy Framework) impide que quienes envían spam manden correos no autorizados suplantando tu dominio, protegiendo su reputación y la entrega de tus mensajes.',
};
