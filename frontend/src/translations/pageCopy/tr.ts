// Turkish tool-page explanation and FAQ copy. Code identifiers and protocol tokens are preserved.
export const trPageCopy: Record<string, string> = {
  'pageText.494b4551': 'Verilerim gizli kalır mı?',
  'pageText.62172ab3': 'Evet, işlemler tamamen tarayıcınızda, istemci tarafında yürütülür.',
  'pageText.f60263be': 'JSON nedir?',
  'pageText.b285e12f':
    'JSON (JavaScript Object Notation), insanların kolayca okuyup yazabildiği ve makinelerin kolayca ayrıştırıp oluşturabildiği hafif bir veri alışverişi biçimidir.',
  'pageText.5fb110d7': 'JSON nasıl biçimlendirilir?',
  'pageText.3241bbe1':
    'Girdi alanına geçerli JSON yapıştırın, istediğiniz girinti ve anahtar sıralama seçeneklerini belirleyin, ardından JSON Biçimlendir düğmesini seçin.',
  'pageText.fd4a654d': 'Verilerim güvende mi?',
  'pageText.542fb6d3':
    'Evet! Tüm işlemler tarayıcınızda gerçekleşir. Verileriniz bilgisayarınızdan ayrılmaz.',
  'pageText.d16ff7e1': 'JSON Biçimlendirici ne yapar?',
  'pageText.647c3353':
    'JSON biçimlendirici, JSON metnini ayrıştırır ve elde edilen değeri tutarlı boşluklarla yeniden metne dönüştürür. Bu araç seçilen girintiyle okunabilir çıktı üretebilir, sonucu küçültebilir ve isteğe bağlı olarak nesne anahtarlarını özyinelemeli sıralayabilir. RFC 8259, nesne adlarında ve metinlerde çift tırnak gerektirir; yorumlar, sondaki virgüller, NaN ve Infinity JSON sözdiziminin dışındadır. Biçimlendirme, verinin amaçlanan anlamını değil, sunumunu değiştirir.',
  'pageText.c80fe1c6': 'Yaygın kullanım alanları ve doğrulama sınırı',
  'pageText.b49ba2b3':
    'Geliştirme sırasında JSON verilerini incelemek veya normalleştirmek istediğinizde biçimlendiriciyi kullanın:',
  'pageText.92e09088':
    'Sıkıştırılmış API yanıtlarını, webhook gövdelerini, yapılandırmaları veya günlük kayıtlarını daha okunabilir hâle getirin.',
  'pageText.a1f30e1f':
    'Geçerli JSON verisini bir isteğe, test örneğine veya ortam değişkenine kopyalamadan önce küçültün.',
  'pageText.57fc338e':
    'İki nesnenin elle karşılaştırılmasını daha tutarlı hâle getirmek için anahtarları sıralayın.',
  'pageText.a199e1c3':
    'Eksik virgüller, eşleşmeyen parantezler veya geçersiz tırnaklar nedeniyle oluşan ayrıştırma hatalarını ortaya çıkarın.',
  'pageText.bcfd24c3':
    'Başarılı ayrıştırmayı yalnızca sözdizimi kontrolü olarak değerlendirin. JSON Schema, API sözleşmeleri, gerekli alanlar, alana özgü türler veya iş kuralları uygulanmaz.',
  'pageText.0b90c1ae': 'Uygulamalı biçimlendirme örneği',
  'pageText.52d27152':
    '{"active":true,"user":{"id":42,"roles":["admin","editor"]}} girdisi, iç içe user değeri ve roles dizisi bir bakışta görülebilen girintili bir nesneye dönüşür. Küçültme işlemi yeniden sıkıştırılmış biçimi üretir. Girdinin sonunda fazladan virgül olsaydı tarayıcı ayrıştırıcısı belgeyi sessizce onarmak yerine reddederdi.',
  'pageText.97fb560b': 'Sınırlamalar ve gizlilik',
  'pageText.57498e3b':
    'Ayrıştırma JavaScript sayılarını kullanır; bu nedenle güvenilir biçimde gösterilebilen aralığın dışındaki tam sayılar hassasiyet kaybedebilir.',
  'pageText.ff4c61d4':
    'Yinelenen nesne adları ayrıştırma sırasında tek değere indirgenebilir; yinelenenlerin korunması önemliyse ayrıştırıp yeniden metne dönüştüren iş akışlarından kaçının.',
  'pageText.c4310853':
    'Sıralı çıktı kullanışlıdır, ancak kriptografik bir JSON kanonikleştirme biçimi değildir ve imzalanacak veriyi hazırlamak için kullanılmamalıdır.',
  'pageText.e01043b7':
    'İşlemler tarayıcıda yürütülür. Hassas JSON verileri yine de pano geçmişi, tarayıcı eklentileri, ekran paylaşımı veya ortak kullanılan cihazlar üzerinden açığa çıkabilir.',
  'pageText.7491abdf': 'Bu araç neyi kontrol eder?',
  'pageText.000db4ab':
    'RFC 8259 ile tanımlanan JSON sözdizimini kontrol eder: çift tırnaklı anahtarlar ve metinler, öğeler arasındaki virgüller, eşleşen köşeli ve süslü parantezler, geçerli sayılar ve kaçış dizileri ile tek bir üst düzey değer.',
  'pageText.d5749034': 'Yaygın JSON hataları nelerdir?',
  'pageText.5c93c394':
    'Eksik virgüller, sondaki fazladan virgüller, çift tırnak yerine tek tırnak kullanılması, tırnaksız özellik adları, yorumlar, metin içindeki kaçış uygulanmamış satır sonları ve eksik kapanış parantezleri.',
  'pageText.e46fbe66': 'Yorum veya sonda virgül içeren JSON neden kabul edilmiyor?',
  'pageText.716a4b48':
    'Standart JSON ikisine de izin vermez. VS Code gibi düzenleyiciler JSONC ayar dosyalarında bunları kabul eder; JSON5 de izin verir, ancak JSON.parse ve çoğu API reddeder. Veriyi katı bir ayrıştırıcıya göndermeden önce bunları kaldırın.',
  'pageText.14469b94': 'Hata neden yanlış konumu gösteriyor?',
  'pageText.7c657bf0':
    'Ayrıştırıcılar işlemi bıraktıkları yeri bildirir; bu yer çoğunlukla gerçek hatanın hemen sonrasıdır. Eksik virgül sonraki anahtarda işaretlenir; kapatılmamış metin veya parantez ise ancak girdinin sonunda algılanabilir.',
  'pageText.40ba76d4': 'Geçerli JSON, API sözleşmeme uyduğu anlamına gelir mi?',
  'pageText.10c910fb':
    'Hayır. Sözdizimi doğrulaması yalnızca metnin ayrıştırılabildiğini gösterir. Gerekli alanları, türleri ve izin verilen değerleri kontrol etmek için belgeyi JSON Schema Doğrulayıcı ile bir şemaya göre doğrulayın.',
  'pageText.eb70ad1f':
    'Evet. Doğrulama JSON.parse kullanılarak tarayıcınızda yapılır ve yapıştırdığınız JSON yüklenmez.',
  'pageText.c7264f74': 'JSON verisini geçerli kılan kurallar',
  'pageText.bc86098b':
    'JSON, JavaScript nesne sözdiziminden daha katıdır. Belge tek bir değerdir: nesne, dizi, metin, sayı, true, false veya null. Anahtarlar ve metinler çift tırnak kullanmalıdır; metinlerde yalnızca sınırlı kaçış dizilerine (ör. \\n, \\t, \\" ve \\uXXXX) izin verilir. Sayıların başında sıfır veya +, sonunda ise ondalık nokta olamaz; NaN ve Infinity geçerli değildir. Yorumlar ve sondaki virgüller standardın parçası değildir; bu nedenle düzenleyiciniz kabul etse bile JSONC ve JSON5 dosyaları burada başarısız olur.',
  'pageText.41041c7a': 'Yaygın JSON hataları ve düzeltmeleri',
  'pageText.5e91d5ea': 'Sondaki virgül: {"a": 1,} - son öğeden sonraki virgülü silin.',
  'pageText.c20c98a8': "Tek tırnak: {'a': 'b'} - çift tırnakla değiştirin.",
  'pageText.dcfdd19f': 'Tırnaksız anahtar: {a: 1} - her anahtarı tırnak içine alın: {"a": 1}.',
  'pageText.544083f8':
    'Eksik virgül: {"a": 1 "b": 2} - hata genellikle sonraki öğenin başlangıcı olan "b" konumunu gösterir.',
  'pageText.9cec3362':
    'Metin içindeki gerçek satır sonları veya sekmeler - bunları \\n veya \\t olarak yazın.',
  'pageText.7165deea':
    'Dile özgü sabitler: True, None, undefined ve NaN JSON değeri değildir; true, null veya metin kullanın.',
  'pageText.02f2728d': 'Hata konumunu anlama',
  'pageText.e4c68e30':
    'Hata metni tarayıcınızın JSON ayrıştırıcısından gelir; bu nedenle Chrome, Firefox ve Safari arasında ifadeler farklıdır. Mesaj bir karakter konumu içeriyorsa doğrulayıcı bunu satır ve sütuna dönüştürür. Hem o konuma hem de hemen öncesine bakın: ayrıştırıcılar geçerli belgeyi sürdüremeyen ilk karakterde durur; bu karakter çoğunlukla gerçek hatadan bir öğe sonradır.',
  'pageText.21519e4a': 'İstatistikler ve ayrıştırıcı sınırları',
  'pageText.7a975d41':
    'Geçerli JSON için araç nesneleri, dizileri, metinleri, sayıları, mantıksal değerleri, null değerlerini ve toplam anahtar sayısını hesaplar; ayrıca en fazla iç içe geçme derinliğini bildirir. Bu sayılar, beklenmedik derinlikteki verileri veya sayıların metin olarak gelmesi gibi tür değişimlerini fark etmeye yardımcı olur. JSON.parse davranışlarından ikisi önemlidir: yinelenen anahtarlar kabul edilir ve son değer geçerli olur; sayılar ise 64 bit kayan noktalı değerler olarak okunur, bu nedenle 2^53 - 1 değerinden büyük tam sayılar ayrıştırılan değerde ve biçimlendirilmiş kopyada hassasiyet kaybeder.',
  'pageText.035fa382': 'JSON Doğrulayıcıdan farkı nedir?',
  'pageText.bab0a1c3':
    'JSON Doğrulayıcı metnin geçerli JSON sözdiziminde olup olmadığını kontrol eder. JSON Schema Doğrulayıcı ayrıca ayrıştırılan değeri gerekli özellikler, türler, aralıklar ve iç içe yapılar gibi kurallara göre kontrol eder.',
  'pageText.c715893e': 'Bu araç hangi JSON Schema sürümünü destekler?',
  'pageText.b987a2d9':
    'Araç, varsayılan Draft 7 uyumlu doğrulayıcısıyla Ajv v8 kullanır. Bilinmeyen genişletme anahtar kelimeleri görünür bir uyarıyla yok sayılır; başka bir meta şema gerektiren şemalar ise taslağa özgü yapılandırma gerektirebilir.',
  'pageText.7d800344': 'JSON verim yükleniyor mu?',
  'pageText.0f050d2b':
    'Hayır. Ayrıştırma, şema derleme ve doğrulama tarayıcınızda çalışır. Pano geçmişi ve tarayıcı eklentileri verileri açığa çıkarabileceğinden ortak kullanılan cihazlarda hassas verilerden kaçının.',
  'pageText.842ff766': 'JSON Schema doğrulaması neyi kontrol eder?',
  'pageText.0cf82fa3':
    'JSON sözdizimi doğrulaması yalnızca metnin ayrıştırılabildiğini gösterir. JSON Schema doğrulaması, ayrıştırılan değere bir sözleşme uygular. Özellikleri zorunlu kılabilir, değer türlerini ve aralıklarını sınırlayabilir, beklenmeyen alanları reddedebilir ve iç içe dizi veya nesneleri doğrulayabilir. Sonuç, algılanan her kural ihlali için veri yolunu, şema yolunu, anahtar kelimeyi ve mesajı içerir.',
  'pageText.54bfa1e8': 'Doğrulayıcı nasıl kullanılır?',
  'pageText.813839e9': 'Test etmek istediğiniz JSON değerini belge düzenleyicisine yapıştırın.',
  'pageText.110b07c6': 'Şema düzenleyicisine Draft 7 uyumlu JSON Schema yapıştırın.',
  'pageText.f0234285':
    'Şemayı derlemek ve ilgili tüm hataları görmek için Doğrula düğmesini seçin.',
  'pageText.060913a1':
    'Hatalı belge değerlerini bulmak için veri yollarını; bunları reddeden kuralı bulmak için şema yollarını kullanın.',
  'pageText.2b1361d8': 'Sınırlar ve gizlilik',
  'pageText.74eb328b':
    'Geçerli sonuç, mevcut belgenin verilen şemada tanınan tüm kurallara uyduğunu gösterir; şemanın tüm iş kurallarını içerdiğini kanıtlamaz. Bilinmeyen genişletme anahtar kelimeleri görünür uyarıyla yok sayılır. Harici şemalar otomatik olarak alınmaz; desteklenmeyen taslakları veya uzak başvuruları hedefleyen şemalar uygulamaya özgü yapılandırma gerektirebilir. Belge ve şema JavaScript sayılarıyla ayrıştırılır; güvenli tam sayı aralığının dışındaki sayılar hassasiyet kaybedebilir.',
  'pageText.e7bc2558': 'Hangi biçimler desteklenir?',
  'pageText.ffabae3c':
    'Bir tarafta JSON nesne dizileri, diğer tarafta ayraçlı metinler: virgülle ayrılmış CSV, noktalı virgülle ayrılmış CSV, sekmeyle ayrılmış TSV veya dikey çizgiyle ayrılmış değerler.',
  'pageText.5e2ca3f9': 'İç içe nesneler nasıl işlenir?',
  'pageText.929320e9':
    'İç İçe Yapı İşleme seçeneği Düzleştir olarak ayarlandığında iç içe nesneler address.city gibi nokta gösterimli sütunlara dönüşür; diziler JSON metni olarak yazılır. JSON Metni seçeneği, her iç içe nesneyi veya diziyi tek bir üst düzey sütuna JSON metni olarak yazar.',
  'pageText.e74ea8dd': 'Tek bir JSON nesnesini CSV biçimine dönüştürebilir miyim?',
  'pageText.2de8fa13':
    'Önce köşeli parantez içine alın; örneğin [{"id": 1}]. Dönüştürücü boş olmayan bir dizi bekler ve her nesne bir satıra dönüşür.',
  'pageText.16c231f7':
    'CSV verisini JSON biçimine dönüştürdükten sonra neden tüm değerler metin oluyor?',
  'pageText.82993149':
    'CSV veri türleri içermez; bu nedenle başında sıfır bulunan posta kodları veya kimlikler gibi değerler hakkında yanlış tahminde bulunmamak için her hücre metin olarak döndürülür (30 yerine "30"). İhtiyaç duyduğunuz alanları kendi kodunuzda dönüştürün.',
  'pageText.df332cb3': 'Excel neden aksanlı karakterleri bozuk gösteriyor?',
  'pageText.af4d1154':
    "İndirilen dosya bayt sırası işareti olmadan UTF-8 kullanır. Bazı Excel sürümleri CSV dosyasını çift tıklayarak açtığınızda eski bir kodlama varsayar. Bunun yerine Veri > Metinden/CSV'den yoluyla içe aktarın ve UTF-8 seçin.",
  'pageText.44ee1d3e': 'Verilerim yükleniyor mu?',
  'pageText.3c70ccff':
    'Hayır. Ayrıştırma ve dönüştürme tarayıcınızda çalışır; indirilecek dosya yerel olarak oluşturulur.',
  'pageText.c0a1927b': 'Hangi JSON yapısı CSV biçimine dönüştürülebilir?',
  'pageText.110e0569':
    'CSV düz bir tablodur; bu nedenle girdi JSON nesne dizisi olmalıdır. Örneğin [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]. Her nesne bir satıra dönüşür. Başlık satırı, tüm anahtarların ilk görünme sırasına göre birleşimidir; eksik anahtarı olan nesnelerde diğer sütunlar kaymak yerine ilgili hücre boş kalır. null değerleri de boş hücre olarak yazılır. Boş olmayan bir dizi dışındaki girdiler reddedilir; [1, 2, 3] gibi basit değer dizilerinde ise sütuna dönüştürülecek anahtar bulunmaz.',
  'pageText.16c22164': 'İç içe nesne ve dizilerin işlenmesi',
  'pageText.2c00e178':
    'Düzleştir (varsayılan): {"address": {"city": "Paris"}} bir address.city sütununa dönüşür. Diziler tek hücrede JSON metni olarak yazılır; örneğin ["a","b"].',
  'pageText.98e451ad':
    'JSON Metni: Yalnızca üst düzey sütunları tutar; her iç içe nesne veya diziyi ilgili hücrede JSON metni olarak yazar.',
  'pageText.e646f74d':
    'Genişlet: Yine üst düzey sütunları tutar, ancak iç içe nesneleri JSON metnine dönüştürmez; bu nedenle bunlar [object Object] olarak görünür. İç içe veriler için Düzleştir veya JSON Metni seçeneğini kullanın.',
  'pageText.869ce735':
    'Tırnak kullanımı: Ayırıcı, çift tırnak veya satır sonu içeren alanlar çift tırnak içine alınır; RFC 4180\'de açıklandığı gibi gömülü tırnaklar çift yazılır ("").',
  'pageText.73ca705a': 'CSV verisini yeniden JSON biçimine dönüştürme',
  'pageText.cbff28ff':
    'CSV ayrıştırıcısı tırnaklı alanları, çift yazılmış tırnakları ve tırnaklı değerlerdeki satır sonlarını işler; LF ve CRLF satır sonlarını kabul eder. İlk Satır Başlık seçeneği etkinse başlık hücreleri özellik adları olur; aksi durumda anahtarlar column1, column2 şeklinde devam eder. Boş satırlar atlanır, eksik hücreler boş metne dönüşür ve başlık genişliğini aşan hücreler çıkarılır. address.city gibi noktalı başlıklar iç içe nesnelere yeniden dönüştürülmez ve tüm değerler metin olarak kalır. Sayı, mantıksal değer veya iç içe yapı gerekiyorsa sonucu sonradan işleyin.',
  'pageText.e37dc901': 'Ayırıcı seçimi',
  'pageText.1b5836ff':
    'Çoğu araç ve API için virgül kullanın. Dosya, ondalık ayırıcı olarak virgül kullanan yerel ayarlı bir hesap tablosunda açılacaksa noktalı virgül; tabloya düzgün yapıştırılacak TSV için sekme; değerler sıklıkla virgül içeriyorsa dikey çizgi kullanın. Dosyayı geri dönüştürürken aynı ayırıcı ayarını kullanın.',
  'pageText.3f419e1e': 'interface ile type arasındaki fark nedir?',
  'pageText.2896a196':
    'İkisi de nesne yapılarını tanımlar. Arayüzler extends ile genişletilebilir ve farklı bildirimler birleştirilebilir; tür takma adları ayrıca birleşimleri, kesişimleri ve eşlenen türleri ifade edebilir. Basit API modellerinde ikisi de uygundur; kod tabanınızın alışkanlığını izleyin.',
  'pageText.a76e5f0e': 'Diziler nasıl işlenir?',
  'pageText.9e602604':
    'Tek tür içeren diziler string[], number[] gibi türlere dönüşür. Karışık diziler (string | null)[] gibi birleşimler olur. Nesne dizilerinde tüm öğelerin anahtarları tek bir öğe türünde birleştirilir; boş dizi unknown[] olur.',
  'pageText.15efe178': 'Bir özellik neden null veya unknown[] türünde?',
  'pageText.e7edbada':
    'Örnek yeterli bilgi içermiyordu. null değeri yalnızca null türünde olabilir; boş dizide incelenecek öğe yoktur. Bunları gerçek türlerle değiştirin; örneğin string | null veya Order[].',
  'pageText.3f42cbef': 'Oluşturulan türler verileri çalışma zamanında doğrular mı?',
  'pageText.63a3aa5d':
    'Hayır. TypeScript türleri kod derlendiğinde silinir; bu nedenle hatalı bir API yanıtını reddedemezler. Güvenilmeyen girdiler için bunları Zod gibi çalışma zamanı doğrulayıcılarıyla veya JSON Schema doğrulamasıyla birlikte kullanın.',
  'pageText.dfbfc464': 'Oluşturulan arayüzü nasıl kullanırım?',
  'pageText.ecad980d':
    'Bir .ts dosyasına kaydedin, içe aktarın ve ayrıştırılan veriye tür ekleyin; örneğin const user = (await response.json()) as Root; Bu tür dönüştürme beklenen yapıyı belgeler ancak kontrol etmez.',
  'pageText.f2cb618b':
    'Hayır. JSON tarayıcınızda ayrıştırılır ve dönüştürülür; oluşturulan türler hiçbir yere gönderilmez.',
  'pageText.24604c50': 'JSON örneğinden türler nasıl çıkarılır?',
  'pageText.775e7460':
    'Dönüştürücü JSON verinizi ayrıştırır ve her değeri bir TypeScript türüne eşler: metinleri string, sayıları number (JSON ayrı bir tam sayı türü içermez), true ve false değerlerini boolean, null değerini null olarak tanımlar. Nesneler arayüz veya tür takma adı olur; diziler öğe türünün ardından [] eklenerek gösterilir. Örneğin {"id": 1, "tags": ["a", "b"], "owner": null}, id: number; tags: string[]; owner: null; üretir. "first-name" gibi geçerli tanımlayıcı olmayan anahtarlar çıktıda tırnak içine alınır.',
  'pageText.2a4f9a5c': 'Seçenekler ve etkileri',
  'pageText.d80a13bc':
    'Kök Tür Adı, üst düzey türün adını belirler ve PascalCase biçimine dönüştürür.',
  'pageText.58ca8924':
    'Arayüz Kullan, interface bildirimleri ile tür takma adları arasında geçiş yapar.',
  'pageText.b2718dc0': 'Özellikleri İsteğe Bağlı Yap, her özelliğe ? ekler.',
  'pageText.7bc73d90': 'Export Anahtar Kelimesi Ekle, her bildirimin başına export ekler.',
  'pageText.f1ea6f0b':
    'İç İçe Yapıları Çıkar, satır içi nesne türleri yerine her iç içe nesne ve dizi içindeki nesneler için adlandırılmış arayüz oluşturur (orders, OrdersItem[] olur).',
  'pageText.e8492b19':
    'Birleşim Türlerini Algıla, karışık dizileri (string | null)[] gibi birleşimler olarak yazar.',
  'pageText.f3ef2d66':
    'JSDoc Yorumları, her özelliğin üzerine yorum ekler. İç İçe Yapıları Çıkar etkinse yorumlar örnek değerler de içerir.',
  'pageText.91b2ba93': 'Tek örnekten tür çıkarmanın sınırları',
  'pageText.962bd555':
    "Tek bir JSON belgesi bir yanıtın nasıl göründüğünü gösterir; API'nin döndürebileceği tüm yapıları göstermez. Çıktıya güvenmeden önce şu durumları gözden geçirin:",
  'pageText.c04be53a':
    'Örnekte null olan değerler yalnızca null türünde tanımlanır. İç İçe Yapıları Çıkar etkinse isteğe bağlı olarak da işaretlenirler.',
  'pageText.65099d30':
    'Nesne dizilerinde her anahtar için ilk görülen değer türü belirler. Yalnızca bazı öğelerde bulunan anahtarlar, Özellikleri İsteğe Bağlı Yap etkin değilse isteğe bağlı işaretlenmez.',
  'pageText.1eb094ba':
    'İç İçe Yapıları Çıkar etkinse 2024-01-15 veya 2024-01-15T00:00:00Z gibi ISO tarih metinleri Date türünde tanımlanır. JSON.parse metin döndürür; kodunuz bunları dönüştürmüyorsa türü string olarak değiştirin.',
  'pageText.1effcea1':
    'Sayısal metinler string, büyük tam sayılar number olarak kalır; oluşturucu bigint veya özel kimlik türleri tahmin etmez.',
  'pageText.9f62e4a3':
    'Özellikler örnekteki sıralarını korur. Anahtarsız nesne, arayüzlerde {} veya tür takma adlarında Record<string, unknown> olur.',
  'pageText.0a050da5': 'YAML nedir?',
  'pageText.521b34a0':
    "YAML (YAML Ain't Markup Language), süslü parantezler yerine girinti kullanan, kolay okunabilir bir veri serileştirme biçimidir. Kubernetes, Docker Compose, GitHub Actions ve Ansible yapılandırma dosyalarında yaygındır.",
  'pageText.758c1349': 'YAML ve JSON hangi durumlarda kullanılmalı?',
  'pageText.ed21d83b':
    'YAML elle okumayı ve düzenlemeyi kolaylaştırır, yorumları destekler; bu nedenle yapılandırma dosyaları için uygundur. JSON daha kolay ayrıştırılır, girinti kuralları yoktur ve her yerde desteklenir; API ve veri alışverişi için uygundur.',
  'pageText.e2958c4e': 'Hangi YAML uyumluluk modu kullanılır?',
  'pageText.962cba8d':
    "Dönüştürme, js-yaml YAML 1.1 uyumluluk şemasını kullanır; çapalar, takma adlar, birleştirme anahtarları, açık etiketler ve tür bilgili skaler değerler örnekte gösterildiği gibi çalışır. YAML 1.1 bazı düz skaler değerleri YAML 1.2'den farklı yorumlayabilir.",
  'pageText.d8137672': 'yes, no veya NO neden true ya da false değerine dönüştü?',
  'pageText.a21ecd10':
    'YAML 1.1\'de tırnaksız yes, no, on ve off mantıksal değerlerdir. Değerin metin olarak kalması gerekiyorsa tırnak içine alın; örneğin country: "NO".',
  'pageText.5403e57d': 'Çok belgeli YAML dosyasını dönüştürebilir miyim?',
  'pageText.69ba905b':
    'Tek seferde dönüştüremezsiniz. Bu dönüştürücü tek belge okur; --- ayırıcılarından sonra daha fazla içerik bulursa hata bildirir. Dosyayı ayırın ve her belgeyi ayrı dönüştürün.',
  'pageText.1368c99b': 'YAML yorumları korunur mu?',
  'pageText.311c9ca4':
    'Hayır. JSON yorum sözdizimi içermez; bu nedenle JSON biçimine dönüştürürken yorumlar çıkarılır ve YAML biçimine geri dönüştürürken geri getirilemez.',
  'pageText.c261a8ae': 'YAML, JSON biçimine nasıl eşlenir?',
  'pageText.4bc6e145':
    "YAML eşlemeleri JSON nesnelerine, sıralı yapılar dizilere, skaler değerler ise metin, sayı, mantıksal değer veya null değerine dönüşür. Yorumlar çıkarılır; çapalar (&name), takma adlar (*name) ve birleştirme anahtarları (<<: *defaults) tam kopyalara genişletilir. Bu nedenle JSON, YAML'dan uzun olabilir. JSON verisini YAML biçimine dönüştürmek düz blok stili üretir: anahtarlar sıralarını korur, uzun metinler satırlara bölünmez ve tekrarlanan nesneler çapa yerine tam olarak yazılır.",
  'pageText.8680939e': "YAML 1.1'de metin olmayan değerler",
  'pageText.28441e9f':
    'YAML 1.1 şeması birçok mevcut yapılandırma ayrıştırıcısıyla uyumludur, ancak bazı tırnaksız değerlerin türlerini şaşırtıcı biçimde belirler:',
  'pageText.b9e6b5c4':
    'yes, no, on ve off, true veya false olur. Bu, country: NO değerinin false olduğu klasik Norveç sorunudur.',
  'pageText.195c972a':
    '010 gibi başında sıfır bulunan sayılar sekizlik (8), 0x1F ise onaltılık (31) olarak okunur.',
  'pageText.4683982b':
    '22:22 gibi iki noktayla ayrılan rakamlar 60 tabanlı sayı (1342) olarak okunur; bu, port eşlemelerini ve saatleri bozabilir.',
  'pageText.bc57ba5f':
    'version: 1.10, 1.1 sayısına dönüşür; 2024-01-01 gibi tarihler zaman damgası (2024-01-01T00:00:00.000Z) olur.',
  'pageText.b58f4598': 'Tırnak kullanımı ve yaygın ayrıştırma hataları',
  'pageText.f9b2a402':
    'Metin kalması gereken tüm değerleri tırnak içine alın: version: "1.10", port: "22:22", country: "NO". JSON - YAML çıktısı bu tür metinleri otomatik olarak tırnak içine alır.',
  'pageText.159243ab':
    'Girintide sekmeye izin verilmez. Hata mesajı satır ve sütunu gösterir; örneğin (2:1).',
  'pageText.cafe74b5':
    'A bad indentation of a mapping entry hatası genellikle bir anahtarın aynı düzeydeki diğer anahtarlardan farklı sayıda boşlukla girintilendiği anlamına gelir.',
  'pageText.249bfb43':
    "*, &, !, %, @ veya ters tırnakla başlayan düz değerlerin YAML'da özel anlamı vardır ve tırnak içine alınmalıdır.",
  'pageText.b07acd91':
    'JSON - YAML dönüşümü katı JSON gerektirir: sondaki virgüller, yorumlar ve tek tırnaklı metinler reddedilir.',
  'pageText.6ad0b0ed': 'Kubernetes ve CI dosyalarını kontrol etme',
  'pageText.155c7fbc':
    'Kubernetes bildirimleri, Docker Compose dosyaları ve GitHub Actions iş akışları YAML ile yazılır; kubectl get -o json çıktısı ve jq gibi araçlar ise JSON ile çalışır. Dosyayı JSON biçimine dönüştürmek, dağıtım sırasında hata oluşmadan önce ayrıştırıcının her değeri nasıl türlendirdiğini görmenin hızlı yoludur; örneğin portun sayı mı, sürümün metin mi kaldığını görebilirsiniz. YAML biçimine geri dönüştürürken gerekli yorumları elle yeniden ekleyin.',
  'pageText.ac46f1af': 'JSON Pointer ile JSONPath aynı mı?',
  'pageText.cac8f6a8':
    'Hayır. JSON Pointer tek bir değeri tanımlayan kısa RFC 6901 sözdizimidir. JSONPath filtreler, joker karakterler ve diğer seçim özellikleri içeren ayrı bir sorgu dilidir.',
  'pageText.8f9cad79': 'Anahtardaki eğik çizgi veya tilde nasıl belirtilir?',
  'pageText.de336765':
    'Her başvuru parçasında tildeyi ~0, eğik çizgiyi ~1 olarak kodlayın. Örneğin /a~1b, a/b adlı nesne üyesini seçer.',
  'pageText.3da5dc4a': 'Boş işaretçi neyi seçer?',
  'pageText.354d9f94': 'Boş JSON Pointer tüm JSON belgesini seçer.',
  'pageText.57bcfda7': 'JSON Pointer çözümleyici ne yapar?',
  'pageText.f894f2e1':
    'JSON Pointer, JSON belgesinde eğik çizgiyle ayrılmış başvuru parçalarını izleyerek tek bir değeri belirler. Nesne parçaları üye adlarıyla tam olarak eşleşir; dizi parçaları sıfırdan başlayan indeksler kullanır. Çözümleyici sessizce yanlış değer döndürmek yerine eksik üyeyi, geçersiz kaçış dizisini, geçersiz dizi indeksini veya ilkel bir değer üzerinden ilerleme girişimini bildirir.',
  'pageText.ab93ef77': 'Sözdizimi ve sınırlar',
  'pageText.ce9c3b21': 'Belge kökü için boş metin, adı boş olan nesne üyesi için / kullanın.',
  'pageText.3cde0e22':
    "Bir parça içinde ~ karakterini ~0, / karakterini ~1 olarak kodlayın. RFC 6901'in gerektirdiği gibi kod çözerken önce ~1 değerini /, ardından ~0 değerini ~ olarak çözün.",
  'pageText.dcc291b6':
    'Dizi indeksleri standart gösterimli, negatif olmayan ondalık tam sayılardır. Özel - belirteci JSON Patch sonuna ekleme işlemlerinde kullanışlıdır, ancak mevcut bir değeri tanımlamaz.',
  'pageText.c2421fef':
    'Araç yalnızca JSON Pointer sözdizimini değerlendirir; JSONPath filtrelerini, JSON Patch işlemlerini, URI parçası kod çözmesini veya şema doğrulamasını uygulamaz.',
  'pageText.532a56fb': 'JSONPath ile JSON Pointer arasındaki fark nedir?',
  'pageText.ad67c7e7':
    'JSON Pointer, eğik çizgiyle ayrılmış parçalarla tek bir değeri kesin olarak belirler. JSONPath, joker karakterler, dilimler ve özyinelemeli inişle birden fazla değer seçebilen bir sorgu dilidir.',
  'pageText.f33ae85e': 'Bu test aracı filtre ifadelerini destekler mi?',
  'pageText.922825ba':
    'Hayır. Bilinçli olarak güvenli bir RFC 9535 temel alt kümesini destekler; kod değerlendirmek yerine filtre ve betik ifadelerini reddeder. Alt öğe adları, indeksler, joker karakterler, dilimler veya özyinelemeli iniş kullanın.',
  'pageText.37dcaef8': 'JSON belgesi yükleniyor mu?',
  'pageText.b2396fff':
    'Hayır. JSON ayrıştırma ve yol değerlendirme işlemleri tarayıcınızda çalışır. Pano geçmişi, eklentiler, sayfa betikleri ve ortak kullanılan cihazlar yine de hassas girdileri açığa çıkarabilir.',
  'pageText.926480c9': 'JSONPath test aracı neyi seçer?',
  'pageText.6475775d':
    'JSONPath sorgusu $ konumundan başlar ve nesne üyelerini veya dizi öğelerini izler. $.store.book[0].title gibi tekil bir yol bir değer seçer; joker karakterler, dilimler ve özyinelemeli iniş ise sıralı bir eşleşme listesi üretebilir. Her sonuç seçilen değeri ve girdi belgesindeki konumuna dönen normalleştirilmiş yolu içerir.',
  'pageText.0522c849': 'Desteklenen sözdizimi ve güvenlik sınırı',
  'pageText.167ce42e':
    "Nesne üyeleri için .name veya ['name'], dizi indeksleri için [0] veya [-1] kullanın.",
  'pageText.325bdf69':
    'Alt öğe jokerleri için .* veya [*], dizi dilimleri için [start:end:step], özyinelemeli iniş için ..name veya ..* kullanın.',
  'pageText.0fa965f1':
    'Filtre seçicileri, gömülü JavaScript, fonksiyonlar ve kabuk benzeri ifadeler reddedilir; araç sorgu metnini hiçbir zaman kod olarak değerlendirmez.',
  'pageText.0bd77a57':
    'Test aracı sorgulamadan önce JSON sözdizimini doğrular. JSON Schema uygulamaz ve seçilen değerlerin API sözleşmesine uyduğunu kanıtlamaz.',
  'pageText.86927e79': 'JSONPath sonuçlarını yorumlama',
  'pageText.5564c402':
    'Sıfır eşleşme, geçerli sorgunun mevcut belgede değer seçmediği anlamına gelir; JSON null değeri seçmekten farklıdır. Joker karakterler ve özyinelemeli iniş birçok değer döndürebilir. Farklı konumlardaki yinelenen değerler, normalleştirilmiş yolları farklı olduğundan ayrı eşleşmeler olarak kalır.',
  'pageText.2a7811c2': 'Tek JSON örneği tüm geçerli verileri tanımlayabilir mi?',
  'pageText.8aeafe2c':
    'Hayır. Oluşturucu yalnızca örnekte bulunan değerleri ve yapıları çıkarabilir. Gerekli ve isteğe bağlı alanları, iş kısıtlarını, enum değerlerini, varsayılanları, ek doğrulamaları ve dönüşümleri gerçek API sözleşmesine göre inceleyin.',
  'pageText.9c0cad39': 'Diziler ve eksik nesne özellikleri nasıl işlenir?',
  'pageText.01ee6835':
    'Dizi öğe türleri birleştirilir. Aynı dizideki nesneler ortak bir birleşik yapı kullanır; herhangi bir örnek nesnede eksik olan özellik isteğe bağlı olur. Karışık ilkel tür dizileri Zod birleşimlerine dönüşür; boş diziler z.unknown() öğeleri kullanır.',
  'pageText.2decefae':
    'Hayır. JSON ayrıştırma ve şema oluşturma tarayıcınızda çalışır. Hassas veriler yine de pano geçmişi, tarayıcı eklentileri, ekran paylaşımı veya ortak cihazlar üzerinden açığa çıkabilir; mümkünse temizlenmiş örnekler kullanın.',
  'pageText.a2131814': 'JSON - Zod oluşturucu ne üretir?',
  'pageText.843b2234':
    'Oluşturucu tek bir JSON değerini ayrıştırır; metin, sayı, tam sayı, mantıksal değer, null, dizi ve nesneleri Zod ifadelerine eşler. Kök ad, TypeScript için geçerli şema tanımlayıcısına dönüştürülür. Çıkarılan türler etkinse çıktı z.infer takma adını da içerir; böylece çalışma zamanı doğrulayıcısı ve derleme zamanı türü aynı şemadan gelir.',
  'pageText.9fdeb27b': 'Gözden geçirilmesi gereken tür çıkarma kuralları',
  'pageText.a373d436': 'Tam sayılar z.number().int(), kesirli kısmı olan değerler z.number() olur.',
  'pageText.7640c5c6':
    'Karışık dizi örnekleri birleşimlere dönüşür. Nesne dizileri gözlenen anahtarları birleştirir ve herhangi bir örnekte eksik olan anahtarları isteğe bağlı işaretler.',
  'pageText.51004b4a':
    'İsteğe bağlı biçim çıkarımı; temsili UUID, ISO tarih-saat, e-posta ve HTTP(S) URL metinlerini Zod metin kontrolleriyle tanır.',
  'pageText.297ff683':
    'Katı nesne modu .strict() ekler; böylece bilinmeyen anahtarlar oluşturulan nesne şemalarında sessizce çıkarılmak yerine reddedilir.',
  'pageText.373ed392': 'Boş diziler öğe türünü gösteremez; bu nedenle z.array(z.unknown()) olur.',
  'pageText.3733edff': 'Örnekten çıkarım bir başlangıçtır, sözleşme değildir',
  'pageText.35b1bbc6':
    'Bir örnek; en az uzunlukları, sayısal aralıkları, izin verilen enum değerlerini, alanlar arası kuralları, varsayılanları, tür dönüşümü davranışını veya tesadüfen bulunan bir alanın her zaman gerekli olup olmadığını kanıtlayamaz. Sonucu API belgeleri ve gerçek uç durumlarla karşılaştırın; güvenilmeyen girdiyi kabul etmeden önce Zod ek doğrulamaları ve testleri ekleyin. Araç yalnızca kaynak metin üretir; şemayı çalıştırmaz veya projenize Zod kurmaz.',
  'pageText.b12736d6': 'Gizlilik ve girdi sınırları',
  'pageText.ac6e0f5e':
    'Oluşturma yereldir; aynı seçenek ve girdiyle aynı sonucu verir. Tarayıcının yanıt vermeye devam etmesi için çok derin iç içe girdiler sınırlandırılır. Temizlenmiş veri aynı yapıyı gösterebiliyorsa yerel araçlara bile üretim belirteçleri veya kişisel veriler yapıştırmaktan kaçının.',
  'pageText.c12e919d': 'Hangi JSON Patch işlemleri desteklenir?',
  'pageText.f93d0eb6':
    'Uygulayıcı add, remove, replace, move, copy ve test işlemlerini destekler. Oluşturulan yamalar deterministik add, remove ve replace işlemleri kullanır; değişen diziler, kararsız öğe bazında fark üretmek yerine tek değer olarak değiştirilir.',
  'pageText.9bcbf59a': 'Yollarda eğik çizgi ve tilde nasıl gösterilir?',
  'pageText.153cbcc5':
    'JSON Patch yolları RFC 6901 JSON Pointer kullanır. Nesne anahtarındaki eğik çizgi ~1, tilde ~0 olur; dolayısıyla a/b adlı anahtar /a~1b olarak belirtilir.',
  'pageText.9bd286e3': 'Yama uygulamak kaynak düzenleyicisini değiştirir mi?',
  'pageText.1e520c6e':
    'Hayır. İşlemler çalışmadan önce kaynak JSON kopyalanır ve sonuç ayrı gösterilir. Araç her zaman geçerli bir JSON değeri döndürdüğünden belgenin kökünü tamamen kaldırmak reddedilir.',
  'pageText.830d9198': 'JSON farkı nasıl yamaya dönüşür?',
  'pageText.27cb8257':
    'Nesne anahtarları sıralı karşılaştırılır; böylece aynı girdi aynı işlem dizisini üretir. Eksik anahtarlar remove, yeni anahtarlar add, değişen ilkel veya dizi değerleri replace işlemlerine dönüşür. İç içe nesneler özyinelemeli gezilir; üretilen her yola RFC 6901 JSON Pointer kaçış kuralları uygulanır.',
  'pageText.7a310a1e': 'Yama uygulama ve hata davranışı',
  'pageText.afbc723e':
    'Dizi indeksleri katı olarak doğrulanır; özel - belirteci yalnızca add işlemlerinde sona ekler.',
  'pageText.e8c8cf45':
    'Replace, remove, move, copy ve test kaynak yollarının mevcut olmasını gerektirir; hatalar işlem numarasını belirtir.',
  'pageText.3a420fd8':
    'Move, bir değerin kendi alt öğelerinden birine yerleştirilmesini reddeder ve dizi indeksindeki değişiklikleri işlem sırasıyla uygular.',
  'pageText.b3c285ba':
    'Test, nesne kimliği veya metne dönüştürülmüş anahtar sırası yerine yapısal JSON eşitliği kullanır.',
  'pageText.7a08072a':
    '__proto__ gibi özel nesne adları, nesne prototiplerini değiştirmeden nesnenin kendi veri özellikleri olarak oluşturulur.',
  'pageText.acc508bd': 'Tutarlılık, gizlilik ve inceleme',
  'pageText.39b818a8':
    'Oluşturma ve uygulama tamamen bu tarayıcıda çalışır. Oluşturulan fark, özellikle dizilerde en küçük olma garantisi yerine öngörülebilir olacak şekilde tasarlanmıştır. Yamayı kalıcı veri veya API üzerinde kullanmadan önce işlem sırasını, dizi değiştirme maliyetini, eşzamanlı belge sürümlerini ve uygulama yetkilendirmesini inceleyin.',
  'pageText.28d8aae9': 'Hangi programlama dilleri desteklenir?',
  'pageText.b4757b15':
    'Oluşturucu şu anda Go (JSON etiketli struct yapıları), Python (Pydantic v2 BaseModel sınıfları), Rust (Serde yapıları), C# (JsonPropertyName içeren Record türleri) ve Kotlin (veri sınıfları) destekler.',
  'pageText.294e643e': 'İç içe nesne ve diziler nasıl işlenir?',
  'pageText.850e01f2':
    'İç içe JSON nesneleri camelCase/PascalCase adlandırmayla ayrı, tür bilgili yapılara veya sınıflara çıkarılır; dizi öğe türleri otomatik olarak belirlenir.',
  'pageText.05225c44': 'JSON verim herhangi bir sunucuya yüklenir mi?',
  'pageText.16c71e23':
    'Hayır. Kod oluşturma, istemci tarafı JavaScript kullanılarak tamamen yerel olarak tarayıcınızda çalışır.',
  'pageText.6bf4c146': 'Bu araç JSON bayt boyutunu nasıl hesaplar?',
  'pageText.94825111':
    'Biçimlendirilmiş ve küçültülmüş JSON verilerinin kesin UTF-8 bayt sayısını tarayıcı TextEncoder API ile hesaplar.',
  'pageText.449785d1': 'Hangi ölçümler çıkarılır?',
  'pageText.200cd0b4':
    'Ham ve küçültülmüş bayt boyutları, yüzde azalma, toplam anahtar sayısı, iç içe nesne sayısı, dizi sayısı, en fazla derinlik ve null alan sayısı.',
  'pageText.6bafe4b9': 'Evet, tüm işlemler yerel olarak tarayıcınızda gerçekleşir.',
  'pageText.f9bc4fe7': 'Quoted-Printable kodlaması nedir?',
  'pageText.b1f6a629':
    'Quoted-Printable, ASCII dışı karakterlerin e-posta yoluyla taşınması için tasarlanmış, yazdırılabilir ASCII karakterleri kullanan bir kodlamadır (RFC 2045).',
  'pageText.5c516685': 'Verilerim güvenli mi?',
  'pageText.ee52101e':
    'Evet, tüm kodlama ve kod çözme işlemleri tamamen yerel olarak tarayıcınızda çalışır.',
  'pageText.6c6f7098': 'Base64URL Kodlayıcı ve Çözücü nedir?',
  'pageText.f020a31f':
    'Dolgu karakterleri olmadan URL uyumlu Base64 verilerini kodlayın veya çözün.',
  'pageText.16ca11a3': 'Base64url ile standart Base64 arasındaki fark nedir?',
  'pageText.3b137bc0':
    'Base64url, değerin URL adreslerinde, dosya adlarında ve JWT bölümlerinde güvenle kullanılabilmesi için + yerine -, / yerine _ kullanır; genellikle = dolgusunu çıkarır.',
  'pageText.06b202a5': 'Metin kodlamak yerine mevcut Base64 metnini dönüştürebilir miyim?',
  'pageText.59313335':
    'Evet. Alfabeyi değiştirip dolguyu kaldırmak için Base64 - Base64url modunu; +, / ve = dolgusunu geri getirmek için Base64url - Base64 modunu kullanın. Baytlar yeniden kodlanmaz.',
  'pageText.ad19a97c': 'Verilerim güvenli şekilde işleniyor mu?',
  'pageText.32092515':
    'Evet, gizlilik ve hız için tüm işlemler ve hesaplamalar tamamen yerel olarak tarayıcınızda çalışır.',
  'pageText.054c55ba': 'Base64 şifreleme midir?',
  'pageText.040d6643':
    'Hayır. Base64 anahtarsız, geri çevrilebilir bir kodlamadır ve herkes çözebilir. Parolaları, API belirteçlerini veya kişisel verileri gizlemek için asla kullanmayın; bunun için AES-GCM gibi gerçek şifreleme kullanın.',
  'pageText.c07235a3': 'JavaScript ile Base64 nasıl çözülür?',
  'pageText.190c8592':
    "Node.js ortamında Buffer.from(value, 'base64').toString('utf8') kullanın. Tarayıcıda atob(value) ikili metin döndürür; UTF-8 metin için new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))) kullanın.",
  'pageText.3d513a1d': 'Python ile bir metni Base64 biçiminde nasıl kodlarım?',
  'pageText.5817c0f8':
    "import base64 sonrasında base64.b64encode('text'.encode('utf-8')).decode('ascii') kullanın. URL uyumlu alfabe için bunun yerine base64.urlsafe_b64encode çağırın.",
  'pageText.43cf2c6b': 'Base64 neden = veya == ile biter?',
  'pageText.9dc050ab':
    'Base64 üç baytı dört karakter olarak kodlar. Girdi uzunluğu üçün katı değilse bir veya iki = karakteri çıktıyı dördün katına tamamlar. Bunlar veri taşımaz; bu çözücü dolgusu tamamen çıkarılmış girdiyi de kabul eder.',
  'pageText.1e9e71cb': 'Geçerli görünen Base64 neden burada çözülemiyor?',
  'pageText.2bfb36f5':
    "Metin standart alfabe dışındaki karakterleri içeriyor olabilir (genellikle Base64URL'den gelen - veya _) ya da çözülen baytlar UTF-8 metni değildir. Base64 biçimi doğru olsa bile görseller, PDF dosyaları ve diğer ikili veriler bu metin çözücüde başarısız olur; bunlar için Base64 - Görsel veya Base64 - PDF aracını kullanın.",
  'pageText.1f843857': 'Verilerim bir sunucuya gönderiliyor mu?',
  'pageText.5356631f':
    'Hayır. Kodlama ve kod çözme cihazınızdaki tarayıcının yerleşik btoa ve atob fonksiyonlarını kullanır; yapıştırdığınız hiçbir veri yüklenmez.',
  'pageText.9673c683': 'Base64 kodlaması nasıl çalışır?',
  'pageText.6840df16':
    'Base64 girdiyi üçer bayt (24 bit) okur ve dört adet altı bitlik gruba ayırır. Her grup 64 karakterli alfabeden bir karakter seçer: A-Z, a-z, 0-9, + ve /. Girdi uzunluğu üçün katı değilse çıktı uzunluğu dördün katı olacak şekilde bir veya iki = işaretiyle tamamlanır. Örneğin Man, TWFu; Ma, TWE=; M ise TQ== olarak kodlanır.',
  'pageText.376d85ff':
    'Bu araç kodlamadan önce metninizi UTF-8 baytlarına dönüştürür; böylece ASCII dışı karakterler doğru biçimde geri çözülebilir: é iki bayttır ve w6k= olur; 😀 emojisi ise dört bayttır ve 8J+YgA== olur.',
  'pageText.3144275a': 'Base64 çıktısı neden yaklaşık %33 daha büyük?',
  'pageText.ce1baf42':
    'Her üç girdi baytı dört çıktı karakterine dönüştüğü için kodlanan veri yaklaşık üçte bir büyür ve en fazla iki dolgu karakteri eklenir. 30 KB veri yaklaşık 40 KB Base64 olur. Bu ek boyut, herhangi bir baytı yazdırılabilir karakterlerle göstermenin bedelidir; Base64 bu nedenle JSON alanlarında, veri URI değerlerinde, e-posta eklerinde ve HTTP Basic kimlik doğrulama başlıklarında kullanılır. Sıkıştırma veya şifreleme değildir.',
  'pageText.b3162ffd': 'Base64 ve Base64URL karşılaştırması',
  'pageText.1a8a3497':
    'Standart Base64 (RFC 4648, bölüm 4), + ve / kullanır ve = ile dolgu yapar. Base64URL (bölüm 5), + yerine -, / yerine _ kullanır ve genellikle dolguyu çıkarır; böylece değerler yüzde kodlaması olmadan URL adreslerinde, dosya adlarında ve JWT bölümlerinde kullanılabilir. Bu araç standart alfabeyi kullanır. Base64URL değerini burada çözmek için önce - yerine +, _ yerine / koyun veya özel Base64URL kodlayıcısını kullanın.',
  'pageText.92565596': 'Yaygın kod çözme hataları ve düzeltmeleri',
  'pageText.a3f451e2':
    "Geçersiz karakterler: A-Z, a-z, 0-9, +, / ve = dışındaki karakterler reddedilir. Genellikle sorun Base64URL'den gelen - ve _ karakterleri veya değerle birlikte kopyalanan tırnaklardır.",
  'pageText.8245a36e':
    'Yanlış uzunluk: Uzunluğu dörde bölündüğünde bir kalanını veren değer geçerli olamaz; bu genellikle kopyalarken bir karakterin kaybolduğunu gösterir. Dolgunun tamamen eksik olması kabul edilir.',
  'pageText.f0196a80':
    'İkili içerik: Çözülen baytlar geçerli UTF-8 metni olmalıdır. Görsel, PDF veya sıkıştırılmış verinin Base64 kodlaması geçerli olsa da burada çözülemez.',
  'pageText.016597d5':
    'Satır sonları: 76 karakterde satıra bölünmüş MIME çıktısı gibi tek değer içindeki boşluk ve satır sonları yok sayılır. Ancak Toplu Modda her satır ayrı bir değer olarak işlenir.',
  'pageText.49b68226': 'URL kodlaması nedir?',
  'pageText.5cd6b8f1':
    "Yüzde kodlaması bir UTF-8 baytını % işaretinin ardından iki onaltılık rakamla gösterir. Bir karakter URI'nin belirli bir bölümünde güvenle kullanılamadığında uygulanır.",
  'pageText.a2c17b54': 'Bir bileşeni mi, tam URL adresini mi kodlamalıyım?',
  'pageText.5905cd6b':
    'Tek sorgu değeri, yol parçası veya URI parçası için bileşen modunu kullanın; bu mod &, =, / ve ? gibi ayırıcılara da kaçış uygular. Girdi zaten tam bir URL içeriyorsa ve yapısal ayırıcıların okunabilir kalması gerekiyorsa tam URL modunu kullanın.',
  'pageText.f176d778': 'Kod çözme neden bazen başarısız olur?',
  'pageText.231a3849':
    'Yüzde işaretinden sonra iki onaltılık rakam gelmeli ve oluşan bayt dizisi çözülebilmelidir. %2 gibi eksik diziler veya bozuk UTF-8 sessizce değiştirilmek yerine reddedilir.',
  'pageText.a85f9468': 'URL kodlayıcı neyi değiştirir?',
  'pageText.62d7dab2':
    'Bileşen modu tarayıcının encodeURIComponent ve decodeURIComponent davranışını kullanır. Ayrılmış URL ayırıcıları veri olarak kodlandığı için tek sorgu değeri veya yol parçası için uygundur. Tam URL modu encodeURI ve decodeURI kullanır; :, /, ?, #, & ve = gibi yapısal karakterleri korur, böylece hazırlanmış URL yapısını kaybetmez.',
  'pageText.e84e968c': 'Uygulamalı yüzde kodlama örneği',
  'pageText.d6bede20':
    '"hello world&role=admin" bileşenini kodlamak hello%20world%26role%3Dadmin üretir. Aynı metin bileşen kodlaması olmadan sorgu metnine eklenirse & ve = işaretleri değerin bir parçası yerine yeni sorgu parametreleri olarak yorumlanabilir. Toplu mod seçilen işlemi her boş olmayan girdi satırına ayrı uygular.',
  'pageText.d69c3bf2': 'Sınırlar ve gizlilik',
  'pageText.66960492':
    'Bu işlem URI yüzde kodlamasıdır; application/x-www-form-urlencoded serileştirmesi değildir. Form kodlayıcıları genellikle boşlukları + ile gösterir ve alan düzeyinde kurallar uygular.',
  'pageText.fb49cce2':
    'Kod çözme, sonucun güvenli, erişilebilir veya güvenilir bir URL olduğunu doğrulamaz. Şemaları, ana makineleri ve yönlendirme hedeflerini ayrı doğrulayın.',
  'pageText.7ebaf6d4':
    'Çift kodlama amaçlanmıyorsa kodlanmış değeri tekrar tekrar kodlamayın; % işareti %25 olabilir.',
  'pageText.5bdbc315':
    'Dönüştürme tarayıcıda çalışır. Pano geçmişi, eklentiler, ortak cihazlar ve sonucu yapıştırdığınız her hedef ayrı veri açığa çıkma yollarıdır.',
  'pageText.d1225e2e': "Kod çözmek JWT'nin gerçek olduğunu kanıtlar mı?",
  'pageText.154670ea':
    'Hayır. Herkes bir başlığı ve veri bölümünü Base64URL ile kodlayabilir. Gerçeklik ancak izin verilen algoritma doğru anahtarla doğrulandıktan ve gerekli tüm veri alanı politikaları geçtikten sonra belirlenir.',
  'pageText.06daf1d8': 'Bu sayfa hangi JWT algoritmalarıyla imzalayabilir ve doğrulayabilir?',
  'pageText.50e5fffd':
    'Metin biçimindeki gizli anahtarla HS256, HS384 ve HS512 HMAC algoritmalarını destekler. alg:none değerini bilinçli olarak reddeder; RSA, ECDSA, EdDSA, JWK, JWKS veya sertifika anahtarlarını kabul etmez.',
  'pageText.d4ee3edc': 'Belirteçler ve gizli anahtarlar yükleniyor mu?',
  'pageText.f21783fe':
    'Hayır. Kod çözme, Web Crypto HMAC imzalama ve imza doğrulama tarayıcıda çalışır. Bearer belirteçleri ve gizli anahtarlar pano geçmişi, eklentiler, ekran paylaşımı ve ortak cihazlar açısından hassastır; bu nedenle yapay veri kullanın.',
  'pageText.e5b685cb': 'Kod çözme, doğrulama ve imzalama ayrı işlemlerdir',
  'pageText.d5099b0a':
    'Kod çözme, üç bölümlü kısa belirteci ayırır; JSON başlığını ve veri alanlarını güvenmeden okur. Doğrulama korumalı başlıktan HS256, HS384 veya HS512 seçer, tam imza girdisini Web Crypto ile kontrol eder; ardından exp, nbf, iat ve isteğe bağlı düzenleyici veya hedef beklentilerini değerlendirir. İmzalama verilen JSON nesnelerini metne dönüştürür, header.alg değerini seçilen HMAC algoritmasıyla değiştirir ve test için kısa bir JWS oluşturur.',
  'pageText.1305057d': 'Doğrulama kuralları ve hata ayıklama göstergeleri',
  'pageText.7576ed65':
    'Geçerli HMAC imzası, imzalayanın aynı gizli anahtara sahip olduğunu kanıtlar; anahtarın güvenle saklandığını veya dağıtıldığını kanıtlamaz.',
  'pageText.6e0c0a9d':
    'Başlıkta alg eksikse, none seçilmişse veya desteklenmeyen asimetrik algoritma isteniyorsa belirteç reddedilir.',
  'pageText.caeba6bd':
    'Sona erme, başlangıç ve oluşturulma zamanları sonlu NumericDate saniyeleri olmalıdır; saat sapması sıfır ile 300 saniye arasında ayarlanabilir.',
  'pageText.b69c111a':
    'İsteğe bağlı düzenleyici eşleşmesi tamdır. Hedef eşleşmesi beklenen değeri aud metni veya aud dizisindeki bir öğe olarak kabul eder.',
  'pageText.45928def':
    'Rol ve kapsam gibi yetkilendirme alanları gösterilir, ancak uygulamaya özgüdür ve bu sayfa tarafından değerlendirilmez.',
  'pageText.9f727ee8': 'Güvenlik ve birlikte çalışabilirlik sınırı',
  'pageText.79b6492c':
    'Üretim doğrulayıcısı izin verilen algoritmayı bağımsız olarak yapılandırmalı, anahtarları güvenilir düzenleyici yapılandırmasından seçmeli, tüm uygulama veri alanlarını denetlemeli, gizli anahtarları değiştirmeli ve yeniden kullanım ya da iptal politikalarını uygulamalıdır. Bu sayfa JWE şifresi çözmez, JWK veya JWKS belgelerini çözümlemez, sertifika doğrulamaz ve kitaplığa özgü JSON serileştirmesini yeniden üretmez. Üretim belirteçlerini yalnızca anahtarın sahibi olan güvenilir kimlik sisteminde oluşturun.',
  'pageText.269f9532': 'HTML varlıkları nedir?',
  'pageText.1998740e':
    "HTML varlıkları, HTML'de ayrılmış karakterleri göstermek için kullanılan özel kodlardır. Örneğin &lt;, < karakterini; &amp;, & karakterini temsil eder.",
  'pageText.b89e0526': 'HTML varlıkları neden kodlanır?',
  'pageText.1529343a':
    'Ayrılmış karakterleri kodlamak, HTML metin bağlamında metnin etiket olarak yorumlanmasını önleyebilir. Tam bir XSS savunması değildir: öznitelikler, URL adresleri, CSS, JavaScript ve güvenilmeyen HTML bağlama özgü kaçış veya temizleme gerektirir.',
  'pageText.047ad07a': 'Bu araç hangi varlık biçimlerini çözebilir?',
  'pageText.8c48f80f':
    '&amp; gibi tarayıcının tanıdığı adlandırılmış başvuruları, &#169; gibi ondalık sayısal başvuruları ve &#xA9; gibi onaltılık başvuruları çözer.',
  'pageText.1f92ff4e': 'HTML varlığı dönüştürücüsüyle aynı mı?',
  'pageText.2bce97a1':
    'Evet. Bu araç HTML varlıklarını hem kodlar hem çözer; ayrı bir HTML varlığı - Unicode dönüştürücü yoktur. ASCII dışı metinler için ondalık karakter başvuruları üretmek üzere genişletilmiş seçeneği etkinleştirin; kod çözme onaltılık başvuruları da çözer.',
  'pageText.787f2f9a': 'HTML varlığı çözücü ve kodlayıcı ne yapar?',
  'pageText.a65d3d26':
    'HTML karakter başvuruları, aksi durumda etiketlerde belirsizlik yaratabilecek karakterleri temsil eder. Kodlayıcı &, küçüktür, büyüktür, çift tırnak ve kesme işareti gibi ayrılmış karakterleri değiştirir. Genişletilmiş seçeneği ASCII dışı karakterler için ondalık başvurular da üretir. Çözücü tarayıcının HTML ayrıştırıcısını kullanarak adlandırılmış, ondalık ve onaltılık başvuruları çözer.',
  'pageText.a4c17b02': 'HTML varlığı örnekleri',
  'pageText.6b1cb488': '&lt; küçüktür, &gt; ise büyüktür karakterine dönüşür.',
  'pageText.656db619': '&amp;, & işaretine; &quot;, çift tırnağa dönüşür.',
  'pageText.b1f980f4':
    '&#169; ve &#xA9;, telif hakkı simgesinin ondalık ve onaltılık başvurularıdır.',
  'pageText.4a4bcadc':
    '<p>Research & Development</p> kodunu kodlamak, aynı öğe olarak ayrıştırılmak yerine etiket karakterleri olarak gösterilebilen metin üretir.',
  'pageText.761ca2d4': 'Güvenlik ve görüntüleme sınırları',
  'pageText.b3511bac':
    'Varlık kodlaması bağlama bağlıdır. Bir HTML metin düğümü için kaçış uygulamak aynı değeri olay işleyicisinde, URL adresinde, CSS bildiriminde, JavaScript metninde veya herhangi bir HTML parçasında güvenli yapmaz. Varsayılan olarak uygulama çatısının kaçış mekanizmasını; güvenilir biçimlendirme korunacaksa güncel tutulan bir temizleyici kullanın. Güvenilmeyen varlıkların çözülmesi inceleme için metin üretmeli; sonucu innerHTML ile yerleştirmeye gerekçe olmamalıdır.',
  'pageText.29803de0': 'Onaltılık kodlama nedir?',
  'pageText.debeda5a': 'Onaltılık kodlama UTF-8 baytlarını 16 tabanında (0-9, A-F) gösterir.',
  'pageText.e26f9f25': 'Bu aracı nasıl kullanırım?',
  'pageText.0eb45c63':
    'Girdi alanına metin girin; otomatik olarak onaltılık biçime dönüşür. Onaltılık veriyi metne çözmek için de yapıştırabilirsiniz.',
  'pageText.8d56b3f0': 'İkili kodlama nedir?',
  'pageText.1fefb654':
    'İkili kodlama UTF-8 baytlarını yalnızca 0 ve 1 kullanarak iki tabanında gösterir.',
  'pageText.e0fbf5c5': 'Karakter başına kaç bit kullanılır?',
  'pageText.a3c61b13':
    'Her UTF-8 baytı sekiz bitle gösterilir. ASCII karakterleri tek bayt kullanır; aksanlı harfler ve emojiler gibi karakterler birden fazla bayt kullanabilir.',
  'pageText.6f9da256': 'İkili kodu yeniden metne dönüştürebilir miyim?',
  'pageText.6e36ed1b':
    'Evet. Çözme modu, gruplar arasında isteğe bağlı boşluklar içeren tam sekiz bitlik ikili baytları kabul eder ve geçerli UTF-8 baytlarını metne dönüştürür.',
  'pageText.a76ed5ae': 'Bu ikili kodlayıcı ve çözücü ne yapar?',
  'pageText.208a45fa':
    'Araç metni UTF-8 baytlarının ikili gösterimine, ikili baytları da metne dönüştürür. Her çıktı grubu sekiz bit içerir. Bayt grupları arasındaki boşluklar sonucu okunabilir kılar; kod çözerken kaldırılabilir veya korunabilir. Dönüştürme tarayıcı kodunda çalışır; metnin işlenmek üzere yüklenmesi gerekmez.',
  'pageText.f49b8901': 'Metinden ikili koda dönüşüm örnekleri',
  'pageText.3a3355ac':
    "A harfi UTF-8'de 65 bayt değeridir; bu nedenle 01000001 olur. é karakteri C3 ve A9 olmak üzere iki UTF-8 baytı kullanır; ikili biçimi 11000011 10101001 olur. Bu ayrım önemlidir: araç her görünür karakter için sabit sekiz bitlik değer değil, kodlanmış baytları gösterir.",
  'pageText.0288b438':
    'İkili metin kodlaması, ondalık sayıyı iki tabanına dönüştürmekten farklıdır. 10 metnini girmek 1 ve 0 karakterlerini iki UTF-8 baytı olarak kodlar. Amaç sayısal taban dönüşümüyse Sayı Tabanı Dönüştürücüyü kullanın.',
  'pageText.19833ccd': 'İkili koddan metne dönüşüm doğrulaması',
  'pageText.58060cff':
    'Çözme modu gruplar arasındaki boşlukları yok sayar; yalnızca 0 ve 1 rakamlarını ve tam sekiz bitlik baytları gerektirir. Eksik baytlar, diğer karakterler veya geçersiz UTF-8 bayt dizileri yanıltıcı kısmi sonuç yerine hata üretir.',
  'pageText.49543137':
    'İkili kodlama bir gösterimdir; şifreleme veya sıkıştırma değildir. İkili baytlara sahip herkes bunları çözebilir ve bit metni orijinal görünür metinden uzun olabilir.',
  'pageText.c90dd9ea': 'Base64 veri URI nedir?',
  'pageText.39ff7dd5':
    'Veri URI, dosya içeriğini data:image/png;base64,<encoded bytes> biçiminde doğrudan HTML veya CSS içine gömer. Tarayıcı bunu yerinde çözer; görsel için ayrı HTTP isteği gerekmez.',
  'pageText.bae37a7c': 'Base64 görsellerini ne zaman kullanmalıyım?',
  'pageText.4baed32c':
    'Küçük simgeler, çok küçük yer tutucular ve tek dosyalık örnekler için kullanın. Base64 boyutu yaklaşık %33 artırdığından ve satır içi görseller ayrı önbelleklenemediğinden büyük görselleri normal dosya olarak sunmak daha uygundur.',
  'pageText.fd65cb89': 'Base64 metni neden görsel dosyamdan daha büyük?',
  'pageText.dc1302a7':
    'Base64, her 3 baytı 4 karakterle gösterir; bu nedenle çıktı dosyadan yaklaşık üçte bir daha büyüktür. Araç, görseli doğrudan içeriğe gömmenin uygun olup olmadığını değerlendirebilmeniz için hem özgün boyutu hem Base64 boyutunu gösterir.',
  'pageText.44cee614': 'Hangi görsel biçimleri destekleniyor?',
  'pageText.690da2e0':
    'PNG, JPEG, GIF, WebP ve SVG dahil, tarayıcınızın image/* MIME türüyle tanımladığı tüm dosyalar desteklenir. AVIF veya ICO gibi diğer biçimler de tarayıcı bunlar için bir görsel türü bildirdiğinde çalışır. Görsel türü bulunmayan dosyalar reddedilir.',
  'pageText.4f220e7a': "Base64'ü yeniden görsele nasıl dönüştürebilirim?",
  'pageText.86d8a616':
    "Base64'ten Görsele aracını kullanın veya Node.js'de fs.writeFileSync('image.png', Buffer.from(base64String, 'base64')) ile baytları diske yazın.",
  'pageText.0472d6fa': 'Görselim bir sunucuya yükleniyor mu?',
  'pageText.b951075e':
    "Hayır. Dosya, tarayıcının FileReader API'siyle okunur ve cihazınızda kodlanır. Sunucuya hiçbir şey gönderilmez.",
  'pageText.8d3141eb': 'Veri URI ile ham Base64 arasındaki fark',
  'pageText.441f0d6b':
    "Veri URI, MIME türünü ve kodlanmış baytları, tarayıcıların URL beklenen her yerde kabul ettiği tek bir metinde birleştirir; örneğin data:image/png;base64,iVBORw0KGgo... Base64 seçeneği data:image/png;base64, ön ekini kaldırır ve yalnızca kodlanmış baytları döndürür. İçerik türü ayrı bir alanda tutulduğunda çoğu JSON API'si, veritabanı ve yükleme uç noktası bunu bekler. Veri URI'deki MIME türü, tarayıcınızın seçilen dosya için bildirdiği dosya türünden alınır.",
  'pageText.9c060b5e': 'Sonucu içeriğe gömme',
  'pageText.92456569':
    'HTML: <img src="data:image/png;base64,..." alt="Logo" width="32" height="32">. Her görselde olduğu gibi anlamlı alternatif metin ve açık boyutlar kullanın.',
  'pageText.56968f15':
    'CSS: background-image: url("data:image/png;base64,..."); veri URI\'yi tırnak içinde kullanır.',
  'pageText.d617fb16':
    'JSON: ham Base64 metnini bir contentType alanının yanında saklayın ve sunucuda kodunu çözün.',
  'pageText.693f282c':
    "Markdown: ![alt](data:image/png;base64,...) bazı görüntüleyicilerde çalışır; ancak birçok barındırılan platform Markdown içinde veri URI'lerini engeller. Bu nedenle içeriğin gösterileceği yerde deneyin.",
  'pageText.f8d06727': 'Base64 görseller ne zaman yararlı, ne zaman sakıncalıdır?',
  'pageText.1e364f5e':
    "Kodlama veriyi yaklaşık %33 büyütür. İçeriğe gömülen bir görsel ayrıca tek başına önbelleğe alınamaz: onu içeren HTML veya CSS dosyası değiştiğinde yeniden indirilir ve dosyanın ayrıştırılmasını yavaşlatır. Gömme; simgeler, 1x1 yer tutucular veya kendi kendine yeterli demo sayfaları gibi çok küçük varlıklarda yararlıdır. Fotoğraflar ve birkaç kilobayttan büyük içerikler için önbellek başlıklarıyla sunulan normal bir görsel dosyası genellikle daha hızlıdır. SVG için URL kodlaması kullanan veri URI çoğu zaman Base64'ten daha kısadır; SVG'den CSS Veri URI'ye aracı bunu üretir.",
  'pageText.e43aa790': 'Dosyanıza ne olur?',
  'pageText.c4f14710':
    'Dosya, saklandığı haliyle kodlanır. Yeniden boyutlandırma, yeniden sıkıştırma veya meta veri temizliği yapılmaz. Bu nedenle JPEG dosyasındaki kamera bilgileri ya da GPS koordinatları gibi EXIF verileri Base64 metnine taşınır. Bu önemliyse önce görseli sıkıştırın veya meta verilerini kaldırın. Her seferinde tek dosya dönüştürülür. Çok büyük görseller, sayfada kaydırmayı veya kopyalamayı yavaşlatabilen çok uzun metinler oluşturur.',
  'pageText.49b261c7': 'Unicode kaçış gösterimi nedir?',
  'pageText.80d28e8d':
    'Unicode kaçış gösterimi, karakterleri onaltılık kod noktalarıyla temsil eder; örneğin "A" için \\u0041 kullanılır.',
  'pageText.6d708618': 'Unicode kaçış dizilerinin kodunu çevrimiçi çözebilir miyim?',
  'pageText.a4bd1758':
    'Evet. Desteklenen \\uXXXX, \\u{XXXXX} veya \\xFF dizilerini içeren metni yapıştırıp Kodunu Çöz seçeneğini seçin. Araç, bu dizileri tarayıcınızda yerel olarak ilgili karakterlerle değiştirir.',
  'pageText.cb96dafd': 'Bu, JSON metnindeki kaçışları çözmekle aynı şey mi?',
  'pageText.e061f024':
    'Hayır. Bu araç, onaltılık Unicode kaçışlarını ve bayt biçimindeki kaçışları işler. \\n, \\t, kaçışlı tırnaklar veya ters eğik çizgiler gibi JSON kaçışlarını tam bir JSON metin parçası olarak işlemek için JSON Metni Kaçış aracını kullanın.',
  'pageText.b78ece8c': 'Bu Unicode kaçış çözücüsü ne yapar?',
  'pageText.66907eae':
    'Çözücü, tanınan onaltılık kaçış dizilerini okunabilir karakterlere dönüştürür. \\u0041 gibi dört basamaklı JavaScript biçimindeki değerleri, \\u{1F600} gibi süslü parantezli kod noktalarını ve \\x41 gibi iki basamaklı bayt biçimindeki değerleri destekler. Diğer metinler değişmeden kalır; böylece sonucu kopyalamadan önce kolayca inceleyebilirsiniz.',
  'pageText.8b33e053': 'Unicode kaçış kodlama örnekleri',
  'pageText.2a71ff3b':
    'ASCII kaçışları etkinleştirildiğinde A, \\u0041 olur. Temel çok dilli düzlemin üzerindeki karakterlerde süslü parantezli kod noktası gösterimi kullanılır; örneğin 😀, \\u{1F600} olur. ASCII kaçışları devre dışıyken sıradan ASCII metni okunabilir kalır, ASCII dışındaki karakterler ise kaçış gösterimiyle yazılır.',
  'pageText.f75a70a6':
    'Unicode kaçışları karakterlerin anlamını değil, yazılışını değiştirir. Karakterleri görüntülemek yerine kaçış gösterimini açığa çıkaran günlükleri, kaynak kodunu, API verilerini veya kopyalanmış metni incelerken yararlıdır.',
  'pageText.715d4ec7': "JavaScript ve Python'da Unicode kaçışlarını çözme",
  'pageText.25c67af7':
    "Tam bir JSON metin değeri için JavaScript'te JSON.parse(), Python'da json.loads() kullanın. İkisi de JSON'un dört basamaklı Unicode kaçışlarını ve vekil çiftlerini işler. JSON, JavaScript'in süslü parantezli kaçışlarını veya \\xXX gösterimini kabul etmez; çevrimiçi çözücü bu ayrı metin gösterimlerini de destekler.",
  'pageText.dfad767c':
    'Örnekler, ayrıştırma çalışana kadar ters eğik çizgileri olduğu gibi korur ve Aé😀 yazdırır. Dış girdinin kodunu çözmek için eval() kullanmayın. JSON belgesi, kaçış dizilerini tekrar tekrar değiştirmek yerine kaynak biçimine göre bir kez ayrıştırılmalıdır.',
  'pageText.b78d8193': 'Unicode kaçışları, JSON ve güvenlik',
  'pageText.ec7ecc8b':
    'Bu dönüştürücü tam bir programlama dili ayrıştırıcısı değildir. Desteklenen onaltılık kalıpları değiştirir; ancak JSON, JavaScript, düzenli ifade veya kabuk sözdizimindeki tüm kaçış kurallarını yorumlamaz. Belgenin tam doğrulanması gerekiyorsa ilgili biçime özgü bir ayrıştırıcı kullanın.',
  'pageText.d400aec2':
    'Kodlama, şifreleme değildir: kaçışlı bir değerin kodunu herkes çözebilir. İşleme tarayıcı kodunda gerçekleşir; yine de çalışma ortamı veriye uygun değilse sırları çevrimiçi araçlara girmekten kaçının.',
  'pageText.06d6ceab': 'JSON metninde kaçış kullanmak ne yapar?',
  'pageText.a236a523':
    'Satır sonları, sekmeler ve tırnaklar gibi özel karakterleri \\n, \\t ve \\" gibi kaçışlı biçimlere dönüştürür.',
  'pageText.b5b32ac6': 'Bu ne zaman yararlıdır?',
  'pageText.9758a1c9':
    'Metinleri JSON verilerine, yapılandırma dosyalarına veya API isteklerine güvenle yerleştirmeniz gerektiğinde yararlıdır.',
  'pageText.23c25e0a': "Bu araç ham Base64'ü ve Veri URI ön eklerini destekliyor mu?",
  'pageText.47a7ae5b':
    "Evet. Ham Base64 metinlerini (iVBORw0KGgo... veya /9j/... ile başlayan) ya da tam data:image/png;base64,... URI'lerini yapıştırabilirsiniz.",
  'pageText.3e22ce2a': 'Görsellerim herhangi bir sunucuya yükleniyor mu?',
  'pageText.ff8327d4':
    "Hayır. Kod çözme ve görsel görüntüleme, istemci tarafındaki veri URL'leri ve blob'lar kullanılarak tamamen tarayıcınızda gerçekleştirilir.",
  'pageText.b5c81ec6': 'Onaltılık girdi hangi biçimde olmalı?',
  'pageText.4df53de7':
    'Boşluk ve ön ek içeren veya içermeyen, çift uzunluklu herhangi bir onaltılık metin (ör. 48656c6c6f) olabilir.',
  'pageText.0d4f669a': 'Dönüştürme iki yönde de yapılabilir mi?',
  'pageText.448de195':
    "Evet! Onaltılıktan Base64'e ve Base64'ten onaltılığa veri kaybı olmadan dönüştürebilirsiniz.",
  'pageText.5a849fdb': 'Base32 kodlaması ne için kullanılır?',
  'pageText.300b948f':
    'Base32; büyük-küçük harfe duyarsız, görsel olarak karışabilen karakterlerden kaçınan 32 karakterli bir alfabe (A-Z, 2-7) kullanır. Yaygın olarak 2FA TOTP gizli anahtarlarında ve elle girilen doğrulama kodlarında kullanılır.',
  'pageText.11274fca': 'JSON-LD yapılandırılmış veri nedir?',
  'pageText.930ded68':
    "JSON-LD, bir sayfa hakkında açık bilgi sağlamak ve zengin arama sonuçları için sayfa içeriğini sınıflandırmak amacıyla Google'ın önerdiği standart bir biçimdir.",
  'pageText.c2c8dd70': 'Oluşturulan şemayı web siteme nasıl eklerim?',
  'pageText.beba7ce9':
    'Oluşturulan <script type="application/ld+json"> etiketini kopyalayıp HTML belgenizin <head> veya <body> bölümüne yapıştırın.',
  'pageText.86ec75d3': 'Verilerim gizli ve güvende mi?',
  'pageText.b25ac842':
    'Evet, tüm işlemler tarayıcınızda yerel olarak yürütülür; sunucuda hiçbir veri saklanmaz.',
  'pageText.687b5867': 'UUID v7 Oluşturucu (Zamana Göre Sıralı) nedir?',
  'pageText.c8e48ee7':
    'Tarayıcının güvenli rastgelelik kaynağıyla zamana göre sıralı UUID v7 tanımlayıcıları oluşturun ve metin olarak dışa aktarın. Bağlantısı verilen UUID v7 Zaman Damgası Çıkarıcı, tanımlayıcıya gömülü oluşturulma zamanını okur.',
  'pageText.611de2a2': 'UUID nedir?',
  'pageText.e747103f':
    'UUID (Universally Unique Identifier), merkezi bir dağıtım yetkilisi olmadan küresel ölçekte benzersiz olacak şekilde tasarlanmış 128 bitlik bir tanımlayıcıdır.',
  'pageText.5e3c112b': 'UUID v4 nedir?',
  'pageText.7697e800':
    'UUID sürüm 4 rastgele oluşturulur. 122 rastgele bit ile sürüm ve varyant bilgileri için 6 bit içerir.',
  'pageText.5e39d294': 'UUID v7 nedir?',
  'pageText.66a6ed70':
    'UUID sürüm 7, milisaniye cinsinden 48 bitlik bir Unix zaman damgasıyla başlar ve rastgele veri için 74 ek bit kullanır. Kodlanmış zaman damgaları artan değerler kronolojik sıralanır; ancak aynı milisaniyedeki değerler rastgeledir ve sistem saatinin geriye alınması oluşturulma sırasını tersine çevirebilir.',
  'pageText.7a44e8ee': 'UUID v4 mü, v7 mi seçmeliyim?',
  'pageText.83965de1':
    "İçerik hakkında bilgi vermeyen rastgele bir tanımlayıcı için v4'ü seçin. Zamana yakın kayıtların bir arada tutulması ve kronolojik veritabanı indekslemesi yararlıysa v7'yi seçin. Hiçbir sürüm gizli bilgi olarak değerlendirilmemelidir.",
  'pageText.9a6b439e': "Oluşturulan UUID'ler kriptografik olarak rastgele mi?",
  'pageText.4a129bc3':
    "Tarayıcının kriptografi API'si, UUID v4'ün 122 rastgele bitini ve UUID v7'nin 74 rastgele veri bitini sağlar. UUID v7 oluşturulduğu milisaniyeyi de açığa çıkarır; bu nedenle UUID'ler parola veya belirteç değil, tanımlayıcıdır.",
  'pageText.35cc78ac': 'Bu UUID v4 ve v7 oluşturucusu ne yapar?',
  'pageText.361a3991':
    "Bu oluşturucu, RFC 9562'ye uygun UUID sürüm 4 veya sürüm 7 değerlerini tamamen tarayıcıda oluşturur. Sürüm 4, kriptografik olarak rastgele 122 bit kullanır. Sürüm 7, ilk 48 bitinde geçerli Unix milisaniyesini saklar ve kalan 74 veri bitini crypto.getRandomValues() ile doldurur. Her ikisi de RFC'deki sürüm ve varyant alanlarını ayarlar ve standart 8-4-4-4-12 onaltılık düzenini kullanır.",
  'pageText.cf240c55': "JavaScript ve Python'da UUID oluşturma",
  'pageText.6ef9489b':
    "JavaScript crypto.randomUUID(), güvenli tarayıcı bağlamlarında UUID v4 oluşturur. Python uuid.uuid4() da v4 kimlikleri oluşturur; uuid.uuid7() ise Python 3.14'ten itibaren standart kütüphanede bulunur. Aşağıdaki örnekler, Python'da v7 desteğinin bulunduğunu varsaymak yerine bunu kontrol eder.",
  'pageText.42f8fbc7':
    'Farklı UUID v7 oluşturucuları, aynı milisaniyedeki kimlikleri sıralamak için farklı yöntemler kullanabilir. Bu tarayıcı aracı rastgele bir son bölüm, Python uygulaması ise sayaç kullanır. Veritabanında benzersizlik kısıtı bulundurun ve tanımlayıcıyı yetkilendirme kimlik bilgisi olarak kullanmayın.',
  'pageText.3368e346': 'v4 veya v7 seçimi',
  'pageText.5b192e0e':
    'Zaman damgası içermeyen, içerik hakkında bilgi vermeyen rastgele bir tanımlayıcı için UUID v4 kullanın. Kayıtların oluşturulma milisaniyesine göre kronolojik olarak gruplanması gerekiyorsa UUID v7 kullanın; bu, rastgele v4 değerlerine kıyasla indekslerde yakın kayıtların bir arada tutulmasını iyileştirebilir. Sıralama, kodlanmış saat değerini izler: aynı milisaniyedeki rastgele son bölümler kesin bir sıra oluşturmaz ve sistem saatinin geriye alınması oluşturulma sırasını tersine çevirebilir.',
  'pageText.19989f5d': 'Toplu biçimlendirme ve dışa aktarma',
  'pageText.d012108b':
    '1 ile 1.000 arasında değer oluşturun, onaltılık harfleri büyütün, kısa çizgileri kaldırın veya GUID kullanılan iş akışları için her değeri süslü paranteze alın. Satırlarla ayrılmış sonucu kopyalayın ya da aynı grubu UTF-8 metin dosyası olarak indirin.',
  'pageText.4c38dc5a':
    'Merkezi bir sayacı koordine etmeden veritabanı veya uygulama tanımlayıcıları oluşturun.',
  'pageText.ce17c126': 'Test veri kümelerini, sahte API yanıtlarını ve örnek kayıtları doldurun.',
  'pageText.138b9843':
    'İsteklere, işlere, günlüklere veya iletilere ilişkilendirme kimlikleri ekleyin.',
  'pageText.5d4cb8de':
    'İçe aktarmalar, prototipler ve yerel geliştirme için küçük gruplar hazırlayın.',
  'pageText.1193c111': 'Biçim örnekleri',
  'pageText.d40026dd':
    "Bir v4 sonucu 3f2504e0-4f89-41d3-9a0c-0305e82c3301 gibi görünebilir. v7 sonucunun sürüm basamağı 7'dir; örneğin 0190b0cc-4f71-7a8e-9c9a-6a74fbb21a92. Büyük harf, kısa çizgisiz gösterim ve süslü parantez seçenekleri yalnızca sunumu değiştirir; sonraki ayrıştırıcılar standart küçük harfli, kısa çizgili biçimi gerektirebilir.",
  'pageText.9dbfc526':
    'UUID benzersizliği olasılıksaldır; bu oluşturucu bir kayıt sistemini kontrol etmez ve benzersizliği garanti etmez. UUID v7, oluşturulduğu milisaniyeyi açığa çıkarır; oluşturulma sırasına göre sıralama için sistem saatinin geriye gitmediğini varsayar ve aynı milisaniyede oluşturulan rastgele değerler kesin olarak monoton değildir. UUID bir tanımlayıcıdır; kendiliğinden parola, API anahtarı veya oturum belirteci olmaz. Oluşturma tarayıcıda yerel olarak gerçekleşir; kopyaladığınız, yapıştırdığınız, indirdiğiniz, aktardığınız veya sakladığınız verileri seçtiğiniz hedef işler.',
  'pageText.7a6710aa': 'Parolam ne kadar güçlü olmalı?',
  'pageText.9be86c1e':
    'Bir parola yöneticisinin oluşturup sakladığı benzersiz bir parola tercih edin. Hedef kabul ediyorsa geniş bir karakter havuzundan seçilen en az on altı rastgele karakter veya en az altı rastgele sözcüklü bir parola ifadesi pratik bir başlangıçtır; hesaplara özgü gereksinimler farklı olabilir.',
  'pageText.0f3affb1': 'Rastgelelik nasıl üretiliyor?',
  'pageText.e7090e3e':
    'Oluşturucu, Math.random yerine ret örneklemesiyle crypto.getRandomValues kullanır. Rastgele karakter modu, istenen uzunluk izin verdiğinde seçilen her kümeden en az bir karakter içerir ve ardından sonucu güvenli biçimde karıştırır.',
  'pageText.db182e45': 'Oluşturulan parolalar yükleniyor veya saklanıyor mu?',
  'pageText.7daed653':
    'Hayır. Oluşturma ve entropi tahmini yerel olarak çalışır; uygulama oluşturulan değeri saklamaz. Yine de kopyalama, değeri işletim sisteminin pano geçmişine taşıyabilir; uzantılar sayfa içeriğini görebilir ve ortak cihazlarda ek özen gerekir.',
  'pageText.8c8e3b19': 'Güvenli parola oluşturma nasıl çalışır?',
  'pageText.567ac86d':
    'Rastgele karakter modu, tarayıcının kriptografik rastgele sayı oluşturucusuyla etkinleştirilen küçük harf, büyük harf, sayı ve simge kümelerinden seçim yapar. Ret örneklemesi, mod alma işlemindeki yanlılığı önler. Parola ifadesi modu, EFF uzun sözcük listesinden her sözcüğü bağımsız seçer ve belirlenen ayırıcıyla altı ila on iki sözcüğü destekler.',
  'pageText.296f3bc2': 'Parola veya parola ifadesi seçimi',
  'pageText.926afe7a':
    'Her hesap için benzersiz bir değer kullanın; parola tekrarı, tek bir ihlali birden çok hizmete erişime dönüştürür.',
  'pageText.f3d81905':
    'Hedefin güvenilir biçimde desteklediği en uzun değeri tercih edin. Uzunluk, genellikle a harfini @ ile değiştirmek gibi öngörülebilir değişikliklerden daha fazla katkı sağlar.',
  'pageText.01bfc425':
    'Değerin yazılması veya sesli okunması gerekiyorsa parola ifadesi modunu; bir parola yöneticisi saklayıp dolduracaksa rastgele karakter modunu kullanın.',
  'pageText.27fbadfc':
    'Desteklenen yerlerde, özellikle e-posta, finans, bulut ve yönetici hesaplarında çok faktörlü kimlik doğrulamayı etkinleştirin.',
  'pageText.1bede603': 'Entropi tahmini ve gizlilik sınırları',
  'pageText.23ca65c7':
    'Gösterilen entropi, seçilen karakter havuzundan veya sözcük listesinden bağımsız ve eşit olasılıklı seçimler yapıldığı varsayımına dayanan teorik bir tahmindir. Parolanın ne kadar sürede kırılacağına dair bir taahhüt değildir; ele geçirilmiş tarayıcıyı, cihazı, panoyu, parola yöneticisini, hedef hizmeti veya kurtarma sürecini hesaba katmaz. İhlal veritabanlarıyla karşılaştırma ayrı, gizliliği koruyan bir sorgulama tasarımı gerektireceğinden oluşturucu bu kontrolü yapmaz.',
  'pageText.293386a3': 'Lorem Ipsum nedir?',
  'pageText.e7e9a310':
    'Lorem ipsum, gerçek içerik hazır olmadan önce alanları doldurmak için grafik tasarımda, web tasarımında ve yayıncılıkta kullanılan, Latinceye benzeyen yer tutucu metindir.',
  'pageText.fc868312': 'Neden Lorem Ipsum kullanılır?',
  'pageText.fc0c8095':
    'Kısa ve uzun sözcüklerin doğal görünen bir karışımını içerir. Böylece okuyucuların dikkati metnin anlamına kaymadan bir düzenin gerçek metni nasıl gösterdiğini ortaya koyar.',
  'pageText.fc9ee235': 'Lorem ipsum ne anlama gelir?',
  'pageText.42643988':
    'Bu haliyle hiçbir anlama gelmez. Cicero\'nun De finibus bonorum et malorum eserinden alınmış, sözcükleri karıştırılmış bir parçadır; eserde "dolorem ipsum", "acının kendisi" anlamına gelir. Sözcükler kesilip değiştirilmiştir; bu nedenle "Lorem" gerçek bir Latince sözcük değildir.',
  'pageText.864e8e98': 'Oluşturulan her paragraf ne kadar uzun?',
  'pageText.da65818f':
    'Her paragraf 3 ila 7 cümle, her cümle de 5 ila 15 sözcük içerir; dolayısıyla bir paragraf yaklaşık 15 ila 105 sözcüktür. Tam bir sözcük sayısına ihtiyacınız varsa sözcük modunu kullanın.',
  'pageText.e4695071': 'HTML etiketleri içeren lorem ipsum oluşturabilir miyim?',
  'pageText.a44e126f':
    "Çıktı düz metindir ve paragraflar boş satırla ayrılır. HTML'e yapıştırırken her paragrafı kendiniz <p> etiketlerine alın.",
  'pageText.2fc5f8d2': "Lorem ipsum'un kökeni",
  'pageText.372fc06e':
    "Lorem ipsum, Cicero'nun MÖ 45 yılında yazdığı etik üzerine bir inceleme olan De finibus bonorum et malorum eserinden türemiştir. Bilinen Lorem ipsum dolor sit amet, consectetur adipiscing elit başlangıcı, Neque porro quisquam est qui dolorem ipsum quia dolor sit amet diye başlayan bir bölümden gelir. Sözcükler kesilmiş, değiştirilmiş ve yeniden sıralanmıştır; sonuç Latince gibi okunur ama anlam taşımaz. Dizgiciler ve tasarımcılar, anlamlı içerik olmadan gerçekçi bir sözcük uzunluğu ritmi sunduğu için onlarca yıldır bunun farklı sürümlerini örnek metin olarak kullanır.",
  'pageText.50efd43e': 'Bu oluşturucu metni nasıl oluşturur?',
  'pageText.78c6a4d6':
    'Sözcükler, sabit bir lorem ipsum sözcük listesinden rastgele seçilir; bu nedenle Oluştur düğmesine her tıklama farklı bir sonuç üretir.',
  'pageText.cdfdd915': 'Cümleler 5 ila 15 sözcük içerir, büyük harfle başlar ve noktayla biter.',
  'pageText.8a5faad3': 'Paragraflar 3 ila 7 cümle içerir ve boş satırla ayrılır.',
  'pageText.5b9b38b3':
    '"Lorem ipsum..." ile başla seçeneği etkinleştirildiğinde paragraf ve cümle çıktısı Lorem ipsum dolor sit amet, consectetur adipiscing elit. ile, sözcük çıktısı ise Lorem ipsum ile başlar.',
  'pageText.d069a303':
    'Sözcük modu, istenen sayıda sözcüğü noktalama işareti olmadan, boşluklarla ayrılmış olarak döndürür.',
  'pageText.cfa7bbd6':
    'Sözcük, karakter, cümle ve paragraf toplamları çıktının altında gösterilir.',
  'pageText.5fc47ebf': 'Yer tutucu metni etkili kullanma',
  'pageText.3a4e06f6':
    'Lorem ipsum; satır uzunluğunu, metin kaydırmayı ve dikey ritmi kontrol etmek için yararlıdır, ancak gerçek içeriğin ortaya çıkardığı sorunları gizler. Bir tasarımı yayımlamadan önce:',
  'pageText.039ee6ef':
    'Beklediğiniz en uzun başlık, ad veya ürün adı dahil, gerçekçi metinlerle deneyin.',
  'pageText.d1b357c8':
    'Çevrilmiş metinleri kontrol edin: Almanca veya Fince metinler genellikle İngilizceden daha uzundur; Çince veya Japonca metinler ise farklı biçimde satırlara bölünür.',
  'pageText.016f7d53':
    'Yer tutucu metnin üretim ortamına ulaşmaması için yayımlamadan önce kod tabanında lorem ve ipsum araması yapın.',
  'pageText.e449bc7c':
    'Alternatif metinlerde ve erişilebilir adlarda lorem ipsum kullanmayın; ekran okuyucular bunları sesli okur.',
  'pageText.2baf95ba':
    'Kullanıcı tabloları veya ürün kartları gibi veri ağırlıklı taslaklarda, bunun yerine bir sahte veri oluşturucusuyla gerçekçi örnek kayıtlar üretin. Lorem ipsum; adları, sayıları, tarihleri veya URL gibi bölünmeyen uzun metinleri sınamaz.',
  'pageText.7ef81d93': 'QR kodu nedir?',
  'pageText.95dfb03e':
    'QR (Quick Response) kodu, URL, kişi kartı veya Wi-Fi yapılandırması gibi metinleri saklayan iki boyutlu bir barkoddur. Telefon kameraları ve tarama uygulamaları kodunu çözüp bağlantıyı açma gibi bir işlem sunar.',
  'pageText.94540be7': 'Hangi verileri kodlayabilirim?',
  'pageText.62ffa087':
    'Her türlü metni kodlayabilirsiniz. Hazır ayarlar; URL, e-posta (mailto:), telefon (tel:), SMS (sms:), Wi-Fi (WIFI:) ve vCard kişileri için telefonların tanıyıp işleyebildiği standart biçimleri doldurur.',
  'pageText.a6c7c2f4': 'Bu QR kodlarının süresi dolar mı?',
  'pageText.6544ed40':
    'Hayır. Bunlar statik kodlardır: içerik doğrudan desenin içinde saklanır ve devre dışı bırakılabilecek bir yönlendirme hizmeti bulunmaz. URL kodu, URL çalıştığı sürece çalışır.',
  'pageText.d7525538': 'Taramaları izleyebilir veya bağlantıyı daha sonra değiştirebilir miyim?',
  'pageText.6fb75242':
    "Statik kodla bunu yapamazsınız. Yazdırdıktan sonra hedefi değiştirebilmek için kontrol ettiğiniz bir alan adındaki kısa URL'yi kodlayın ve oradaki yönlendirmeyi güncelleyin; kendi sunucu günlüklerinizle ziyaretleri sayabilirsiniz.",
  'pageText.3b2f43fc': 'PNG mi, SVG mi indirmeliyim?',
  'pageText.034404ba':
    'Baskı ve yeniden boyutlandırılacak tasarımlar için SVG kullanın; bulanıklaşmadan ölçeklenir. SVG kabul etmeyen belgeler, slaytlar ve araçlar için PNG kullanın; büyütülecekse 1024 piksel boyutunu seçin.',
  'pageText.229bdf99': 'Wi-Fi QR kodunu nasıl oluştururum?',
  'pageText.072a9bd1':
    'WiFi hazır ayarını seçin ve WIFI:T:WPA;S:MyNetwork;P:MyPassword;; metnini düzenleyin. T güvenlik türünü (WPA, WEP veya nopass), S ağ adını, P ise parolayı belirtir. Ad veya paroladaki ; , : ve \\ karakterlerini ters eğik çizgiyle kaçışlı yazın.',
  'pageText.af7b54ae': 'Süresi dolmayan statik QR kodları',
  'pageText.e1f656b0':
    "Bu oluşturucu statik QR kodları üretir: içeriğiniz doğrudan desene kodlanır ve tarama ile hedef arasında herhangi bir aracı bulunmaz. İçeriğin kendisi geçerli kaldığı sürece kod çalışır; taramalar izlenmez veya sayılmaz. Bunun karşılığında, yazdırılmış statik kod düzenlenemez. Hedefi değiştirme olanağını korumak için kodu kontrol ettiğiniz bir URL'ye yönlendirin ve yönlendirmeyi kendiniz yapın.",
  'pageText.49c87d45': 'Hazır ayarlardaki veri biçimleri',
  'pageText.9e3fedef':
    'URL: https://example.com. Tarayıcıların bunu bağlantı olarak değerlendirmesi için şemayı dahil edin.',
  'pageText.dfb00b58':
    'E-posta: mailto:hello@example.com. Konuyu önceden doldurmak için ?subject=Hello ekleyin.',
  'pageText.bd51c65e': 'Telefon: tel:+1234567890; ülke kodu içeren uluslararası biçimi kullanır.',
  'pageText.9df90887':
    'SMS: sms:+1234567890?body=Hello. İleti gövdesinin önceden doldurulması telefonlara göre farklı desteklenir.',
  'pageText.3f10e94f':
    'Wi-Fi: WIFI:T:WPA;S:MyNetwork;P:MyPassword;; parolayı yazmadan bir ağa bağlanmayı sağlar.',
  'pageText.fb848228':
    'vCard: FN, TEL ve EMAIL gibi alanlar içeren BEGIN:VCARD ... END:VCARD bloğu bir kişiyi kaydeder.',
  'pageText.0945d9b3': 'Hata düzeltme ve boyut seçimi',
  'pageText.a73ec8ff':
    "Hata düzeltme, kodun bir kısmı kirli, hasarlı veya kapalı olsa da okunabilmesi için fazladan veri ekler. Dört düzey, simgenin yaklaşık %7'sini (L), %15'ini (M, varsayılan), %25'ini (Q) veya %30'unu (H) kurtarabilir. Daha yüksek düzeyler ve daha uzun içerikler, daha fazla ve daha küçük modül içeren yoğun kodlar üretir; bunların güvenilir tarama için daha büyük basılması gerekir. L düzeyindeki mutlak üst sınır 2.953 bayttır; ancak kısa içerikler çok daha güvenilir tarandığından URL'leri kısa tutun. Ekranlar ve temiz baskılar için M, aşınabilecek etiketler için Q veya H kullanın.",
  'pageText.d601415e': 'Renkler, kontrast ve boş çevre alanı',
  'pageText.21c831a0':
    'Tarayıcılar, açık zemin üzerinde güçlü kontrastlı koyu modüller bekler. Bu nedenle soluk ön plan renklerinden ve bazı tarama uygulamalarının okuyamadığı koyu zemin üzerindeki açık renkli (ters) kodlardan kaçının. Oluşturulan görsel 1 modüllük kenar boşluğu içerir; QR belirtimi ise 4 modüllük boş çevre alanı gerektirir. Kodu yoğun veya renkli bir tasarıma yerleştirirken çevresinde ek düz boşluk bırakın. Yayımlamadan önce son basılmış veya dışa aktarılmış kodu birden fazla telefonla deneyin.',
  'pageText.b744dab3': 'URL kısa adı nedir?',
  'pageText.24831d41':
    'URL kısa adı, URL\'nin belirli bir sayfayı insan tarafından okunabilir biçimde tanımlayan bölümüdür. Örneğin /blog/my-first-post adresinde "my-first-post" kısa addır.',
  'pageText.afaa82d8': 'Kısa adlar SEO için neden önemlidir?',
  'pageText.a7281b59':
    'SEO uyumlu kısa adlar, arama motorlarının içeriğinizi anlamasına yardımcı olur ve kullanıcılara sayfanın konusunu göstererek tıklama oranlarını artırır.',
  'pageText.95ac698b': 'Hangi renk geçişi türleri destekleniyor?',
  'pageText.1f3e5ff6':
    'Bu araç hem doğrusal renk geçişlerini (özelleştirilebilir açılarla) hem radyal renk geçişlerini (daire veya elips biçimleriyle) destekler.',
  'pageText.6593c0c4': 'Renk geçişini görsel olarak dışa aktarabilir miyim?',
  'pageText.09d7598c':
    'Evet! CSS kodunu kopyalamanın yanında renk geçişini PNG görseli olarak da indirebilirsiniz.',
  'pageText.be1336e0': 'Meta etiketleri nedir?',
  'pageText.406252f6':
    'Meta etiketleri, bir web sayfası hakkında meta veri sağlayan HTML öğeleridir. Arama motorlarının içeriğinizi anlamasına yardımcı olur ve sayfanızın arama sonuçlarında nasıl görüneceğini kontrol eder.',
  'pageText.a60cca39': 'Open Graph etiketleri nedir?',
  'pageText.f806060d':
    'Open Graph etiketleri, içeriğiniz Facebook, LinkedIn ve benzeri sosyal medya platformlarında paylaşıldığında nasıl görüneceğini kontrol eder.',
  'pageText.3c5f494e': 'Birden fazla box-shadow katmanı nasıl çalışır?',
  'pageText.0f2afa64':
    'CSS box-shadow, virgülle ayrılmış gölge tanımlarını kabul eder. Listede önce tanımlanan katmanlar, sonra tanımlananların üzerinde çizilir.',
  'pageText.a5cd6aad': "CSS'te buzlu cam efekti nedir?",
  'pageText.00c0cd52':
    'Buzlu cam efekti, yarı saydam arka plan renklerini backdrop-filter: blur() ve ince, açık renkli kenarlıklarla birleştirerek buzlu cam görünümünü taklit eder.',
  'pageText.b6a562cf': 'Standart bir cron ifadesinin 5 bölümü nedir?',
  'pageText.4cdd4865':
    'Standart cron ifadeleri 5 alandan oluşur: Dakika (0-59), Saat (0-23), Ayın Günü (1-31), Ay (1-12) ve Haftanın Günü (0-6; 0, Pazar günüdür).',
  'pageText.f069ffbc': "Cron'da */15 ne anlama gelir?",
  'pageText.44fd98aa':
    'Dakika alanındaki */15 adım değeri, "her 15 dakikada bir" anlamına gelir (ör. :00, :15, :30 ve :45\'te).',
  'pageText.adadf25c': 'Hangi türlerde sahte veri oluşturabilirim?',
  'pageText.4b6a1433':
    'Kullanıcılar (ad, e-posta, telefon ve rollerle), Ürünler (SKU, fiyat ve puanlarla), Siparişler (para birimi ve durumlarla), Şirketler ve Blog Yazıları için gerçekçi örnek kayıtlar oluşturabilirsiniz.',
  'pageText.a0f6807f': 'Oluşturulan sahte veriyi indirebilir miyim?',
  'pageText.5a2779c7':
    "Evet, JSON'u doğrudan panonuza kopyalayabilir veya tek tıklamayla .json dosyası olarak indirebilirsiniz.",
  'pageText.a82a3ba7': 'Hangi boyutlar oluşturuluyor?',
  'pageText.6ab32280':
    'Araç; 16x16 (standart sekme), 32x32 (retina sekme), 48x48 (masaüstü kısayolu), 180x180 (iOS Apple Touch simgesi), 192x192 (Android uygulaması) ve 512x512 (PWA açılış ekranı) PNG simgeleri oluşturur.',
  'pageText.1a11e506': 'Yüklediğim görseller herhangi bir sunucuya gönderiliyor mu?',
  'pageText.631bc8d7':
    'Hayır. Tüm yeniden boyutlandırma ve görsel çizimi işlemleri, tarayıcının HTML5 Canvas özelliğiyle istemci tarafında gerçekleştirilir. Görselleriniz bilgisayarınızdan ayrılmaz.',
  'pageText.6016f5b9': 'Bu .gitignore oluşturucusunda hangi şablonlar var?',
  'pageText.9a2e6ae1':
    "Oluşturucu; Node.js/TypeScript, Python, Go, Rust, Java/Gradle/Maven, React/Next.js/Vite, Vue/Nuxt, macOS (.DS_Store), Windows, Linux, VSCode ve JetBrains IDE'leri için standart kurallar içerir.",
  'pageText.26b1e47a': 'Özel yoksayma kalıpları ekleyebilir miyim?',
  'pageText.b9bb3e9f':
    'Evet, düzenleyiciye özel kural satırları yazabilirsiniz; bunlar seçilen platform şablonlarıyla otomatik olarak birleştirilir.',
  'pageText.99c478a9': "CSS'in organik şekilleri SVG olmadan nasıl çalışır?",
  'pageText.330806ef':
    "CSS'in organik şekilleri, tamamen CSS ile asimetrik, kıvrımlı biçimler oluşturmak için 8 değerli border-radius özelliği sözdizimini (horizontal-radii / vertical-radii) kullanır.",
  'pageText.4f7db90d': 'Şekli ölçeklenebilir vektör grafiği (SVG) olarak indirebilir miyim?',
  'pageText.cd8236b5':
    'Evet, ham SVG vektör işaretlemesini kopyalayabilir veya şekli bağımsız bir .svg dosyası olarak indirebilirsiniz.',
  'pageText.15c7f36d': 'Bu araç sütun hizalamalarını (sol, orta, sağ) destekliyor mu?',
  'pageText.1f6c30ea':
    'Evet. Her sütunun üzerindeki hizalama düğmeleriyle metin hizalamasını ayrı ayrı değiştirebilirsiniz (:---, :---:, ---:).',
  'pageText.17171603': 'Satır ve sütunları dinamik olarak ekleyip kaldırabilir miyim?',
  'pageText.81d98d62':
    'Evet, tabloyu genişletmek için "+ Sütun Ekle" veya "+ Satır Ekle" düğmelerine, belirli satır ve sütunları kaldırmak için çöp kutusu simgelerine tıklayın.',
  'pageText.a3b7c9aa': "Harici yer tutucu URL'leri yerine neden SVG yer tutucular kullanılır?",
  'pageText.36e2f853':
    "SVG yer tutucular hiçbir HTTP ağ isteği gerektirmez, çevrimdışı ortamda hemen yüklenir ve HTML/CSS'e doğrudan gömülen hafif (~300 bayt) Veri URI'leridir.",
  'pageText.98afe7f8': 'Görselin içindeki etiket metnini özelleştirebilir miyim?',
  'pageText.7156e33f':
    'Evet. İstediğiniz özel metni (ör. "Ana Banner", "Avatar 128x128") belirtebilir veya boyutların otomatik gösterilmesi için boş bırakabilirsiniz.',
  'pageText.0ddadffc':
    'Oluşturulan ASCII başlıklarını GitHub README dosyalarında kullanabilir miyim?',
  'pageText.fa3ae5eb':
    'Evet. Tüm tarayıcılarda eş aralıklı hizalamayı korumak için çıktıyı README.md dosyanızda bir Markdown kod bloğuna (```) alın.',
  'pageText.92b39fd3': 'Hangi yazı tipi stilleri destekleniyor?',
  'pageText.d1c00c5d':
    'Standart klasik ASCII (eğik çizgiler, dikey çizgiler, alt çizgiler) ve net görüntü için modern Unicode dolu blok karakterleri (█) desteklenir.',
  'pageText.a19cad93': 'Neden UUID v4 yerine ULID veya UUID v7 seçilir?',
  'pageText.f6c311f2':
    "Rastgele UUID v4'ün aksine ULID ve UUID v7, milisaniyelik bir zaman damgası ön ekiyle başlar; bu, B-Tree indeks parçalanmasını önler ve veritabanındaki INSERT performansını belirgin biçimde hızlandırır.",
  'pageText.dbf5188e': "Oluşturulan ULID'ler çakışmaya karşı güvenli mi?",
  'pageText.e4c22fd6':
    'Evet. Her ULID, 48 bitlik zaman damgasının yanında 80 bit kriptografik rastgelelik içerir; bu da çakışma olasılığını pratikte sıfıra indirir.',
  'pageText.434b3c01': 'Renk tonu düzeyleri nasıl hesaplanır?',
  'pageText.fef3b562':
    "Oluşturucu, HSL açıklık eğrilerini standart Tailwind CSS açıklık dağılımına uyacak şekilde ayarlar (yaklaşık %96 açıklıkta 50'den yaklaşık %6 açıklıkta 950'ye).",
  'pageText.6fd82787': 'Hangi gösterim biçimleri var?',
  'pageText.64f57bec':
    'Standart İki Nokta (00:1A:2B:3C:4D:5E), Kısa Çizgi (00-1A-2B-3C-4D-5E), Cisco Nokta (001a.2b3c.4d5e) ve ayırıcısız ham onaltılık gösterim bulunur.',
  'pageText.0665d60c': 'EXIF verilerini neden kaldırmalıyım?',
  'pageText.4514458b':
    'Akıllı telefonlarla çekilen fotoğraflar çoğu zaman hassas GPS koordinatları ve cihaz tanımlayıcıları içerir; bunları herkese açık paylaşmak gizliliğinizi açığa çıkarabilir.',
  'pageText.42405f57': 'EXIF verilerini temizlemek görsel kalitesini düşürür mü?',
  'pageText.4d60a474':
    'Hayır, yalnızca meta veri etiketleri kaldırılır; görselin pikselleri olduğu gibi kalır.',
  'pageText.21ef5814': 'İndirdiğim dosyanın sağlama toplamını nasıl doğrularım?',
  'pageText.224c058f':
    'Dosyayı seçip yayıncıdan veya güvenilir, bağımsız başka bir kaynaktan aldığınız beklenen sağlama toplamının tamamını yapıştırın. Özet hesaplamasının bitmesini bekleyin, ardından eşleşme veya uyuşmazlık sonucunu inceleyin.',
  'pageText.ae63ea0f': 'Dosyam bir sunucuya yükleniyor mu?',
  'pageText.eebc3c64':
    'Seçilen dosyalar yerel olarak tarayıcı belleğine okunur; bu hesaplama için yüklenmez. SHA-1, SHA-256, SHA-384 ve SHA-512, Web Crypto kullanır; MD5 ve CRC32 ise JavaScript uygulamalarını kullanır.',
  'pageText.0096052f': 'Eşleşen sağlama toplamı dosyanın güvenli veya gerçek olduğunu gösterir mi?',
  'pageText.85e0eb7f':
    "Eşleşme, hesaplanan sağlama toplamının beklenen değerle aynı olduğunu gösterir. Dosyanın zararsız olduğunu kanıtlamaz veya yayıncısının kimliğini doğrulamaz. Beklenen sağlama toplamını güvenilir, bağımsız bir kaynaktan alın. MD5 ve SHA-1'in çakışma direnci kırılmıştır; CRC32 ise kriptografik değildir. Bütünlük kontrollerinde SHA-256'yı tercih edin.",
  'pageText.e7ddf90b': 'Tarayıcıda çok büyük dosyaların özetini hesaplayabilir miyim?',
  'pageText.5a7687ac':
    'Seçilen dosya tamamen belleğe okunur. Kullanılabilir bellek ve cihaz performansı, işlenebilecek dosya boyutunu sınırlar. Büyük indirmelerde yerel bir terminal sağlama toplamı aracını veya SHA-256 doğrulama kılavuzundaki parçalı Python örneğini kullanın.',
  'pageText.36576d77': 'abc sağlama toplamı karşılaştırmasını yeniden üretme',
  'pageText.c0f11add':
    'Boşluk veya sonunda satır sonu olmadan, tam olarak abc UTF-8 baytlarını hesaplamak için abc örneğini yükle seçeneğini seçin. Yalnızca bu üç baytı içeren yerel bir metin dosyası da seçebilirsiniz.',
  'pageText.45f16187':
    'SHA-256 sağlama toplamı ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad değeridir. Eşleşmeyi görmek için bu değerin tamamını beklenen sağlama toplamı alanına yapıştırın. Hesaplama bittikten sonra uyuşmazlık görmek için bir onaltılık basamağı değiştirin.',
  'pageText.38407fa7':
    "Aynı girdi MD5 için 900150983cd24fb0d6963f7d28e17f72, CRC32 için 352441c2 üretir. Sonuçlar SHA-1, SHA-384 ve SHA-512'yi de içerir. Satır sonu veya farklı kodlama, baytları ve sağlama toplamlarını değiştirir.",
  'pageText.a8f9e0fa': 'MD5 nedir?',
  'pageText.197bb98c':
    'MD5 (Message Digest 5), 128 bitlik (16 bayt) özet değeri üreten bir kriptografik özet fonksiyonudur.',
  'pageText.380ae33f': 'MD5 güvenli mi?',
  'pageText.200b2951':
    'MD5 artık kriptografik amaçlar için güvenli kabul edilmez; ancak sağlama toplamları ve güvenlik açısından kritik olmayan uygulamalar için hâlâ yararlıdır.',
  'pageText.eb024fef': 'MD5 özeti yeniden metne dönüştürülebilir mi?',
  'pageText.f3a4be7f':
    'Hayır. MD5, tersine çevrilebilir şifreleme değil, tek yönlü bir özettir. MD5 çözücü olarak tanımlanan hizmetler genellikle olası girdileri tahmin edip özetlerini karşılaştırır; bu araç özet üretir ve tersine arama yapmaz.',
  'pageText.de23ad8f': 'Bu MD5 özet oluşturucusu ne yapar?',
  'pageText.71308743':
    "Bu MD5 özet oluşturucusu, metni veya seçilen dosyayı RFC 1321'de tanımlanan 128 bitlik ileti özetine dönüştürüp 32 onaltılık karakter olarak gösterir. Metin UTF-8 baytlarına dönüştürülür; dosya modunda dosyanın baytları kullanılır. Küçük ve büyük harf, aynı özet için gösterim seçenekleridir. Hesaplama tarayıcı kodunda çalışır; dolayısıyla özet oluşturmak için sunucuya yükleme gerekmez.",
  'pageText.e043d2b7': 'MD5 hesaplama örneği ve dosya sağlama toplamı',
  'pageText.00f057ca':
    'Tırnak, boşluk veya sonunda satır sonu bulunmayan tam üç karakterlik abc girdisi için sonuç 900150983cd24fb0d6963f7d28e17f72 olur. RFC 1321 bu test vektörünü yayımlar. Büyük harfli gösterim, özetin bitlerini değil yalnızca sunumunu değiştirir.',
  'pageText.294638f4':
    'Dosya sağlama toplamı için bir dosya seçin ve 32 onaltılık karakterin tamamını beklenen değerle karşılaştırın. Uyuşmazlık, dosya baytlarının beklenen özeti üretmek için kullanılan baytlardan farklı olduğunu kanıtlar. Eşleşme, kazara oluşan hataları saptamaya yardımcı olabilir; ancak beklenen değerin kaynağı önemlidir ve MD5 eşleşmesi kasıtlı değiştirmeye karşı kanıt değildir.',
  'pageText.bd0d278c': "MD5'in şifresi çözülebilir mi ve ne zaman kullanılmalıdır?",
  'pageText.0962ea5c':
    'Bu, bir MD5 oluşturucusudur; MD5 şifre çözme veya tersine özet arama hizmeti değildir. Özetleme şifreleme değildir ve sabit boyutlu özet, girdinin tersine çevrilebilir bir kopyasını içermez. Özeti tersine çevirme girişimleri genellikle aday girdileri tahmin eder ve karşılaştırma için her adayın özetini hesaplar.',
  'pageText.cf9f06aa':
    "RFC 6151, dijital imzalar dahil çakışma direncinin gerektiği durumlarda MD5'in artık kabul edilemez olduğunu belirtir. Kasıtlı veri değiştirmeyi saptamak için MD5'e güvenmeyin. RFC, yalnızca hatalara karşı korunmak amacıyla MD5 sağlama toplamına izin verir; ancak uygulamalar, varsa bundan hangi güvenlik hizmetini beklediklerini belirtmelidir.",
  'pageText.953bfb55':
    "Tarayıcı tarafında hesaplama, özet oluşturmak için metin veya dosya aktarma ihtiyacını azaltır; ancak MD5'i kriptografik olarak güvenli hale getirmez. Çevrimiçi özet sayfasına parola veya başka sırlar girmekten kaçının.",
  'pageText.101f9c75': 'SHA256 nedir?',
  'pageText.16259758':
    'SHA256 (Secure Hash Algorithm 256-bit), 256 bitlik (32 bayt) özet değeri üreten bir kriptografik özet fonksiyonudur.',
  'pageText.9afb2ad2': 'SHA256 güvenli mi?',
  'pageText.0af6e6d2':
    'SHA-256 birçok bütünlük uygulaması için uygundur; ancak anahtarsız özet, kaynağının kimliğini doğrulamaz ve parola özetleme fonksiyonu değildir. Dosya doğrulamasında güvenilir bir beklenen sağlama toplamı, parolalar içinse bu amaçla tasarlanmış bir parola özetleme yöntemi kullanın.',
  'pageText.c16f7e5d': 'Dosya sağlama toplamını nasıl doğrularım?',
  'pageText.14edcc5a':
    'Dosyayı seçin ve güvenilir, bağımsız bir kaynaktan aldığınız 64 karakterlik SHA-256 değerini beklenen sağlama toplamı alanına girin. Araç, oluşturulan ve beklenen özetlerin eşleşip eşleşmediğini bildirir.',
  'pageText.7490e417': 'SHA-256 özetinin kodu çözülerek yeniden metne dönüştürülebilir mi?',
  'pageText.74338944':
    'Hayır. SHA-256 özetleme tersine çevrilebilir şifreleme değildir; bu yüzden özgün girdiyi geri almak için özetin kodu çözülemez. Bu araç SHA-256 değerleri oluşturup karşılaştırır; parola kırma veya tersine özet arama yapmaz.',
  'pageText.cd1de6c5': 'Bu SHA-256 oluşturucusu ne yapar?',
  'pageText.a17f5535':
    "Bu SHA-256 oluşturucusu, metin veya seçilen dosya için NIST FIPS 180-4'te belirtilen 256 bitlik ileti özetini hesaplar ve 64 onaltılık karakter olarak gösterir. Metin modunda tarayıcı, karakterleri UTF-8 baytlarına dönüştürür. Dosya modunda seçilen baytların özeti hesaplanır. Küçük ve büyük harf, aynı değerin gösterim seçenekleridir.",
  'pageText.d7c2f3d3':
    'SHA-256 tersine çevrilemez: özgün metni veya dosyayı elde etmek için özetin kodu çözülemez. Özet oluşturmak için metin girin veya dosya seçin; dosyayı doğrulamak için özetini güvenilir bir beklenen sağlama toplamıyla karşılaştırın.',
  'pageText.40dc4945': 'SHA-256 hesaplama örneği ve dosya doğrulama',
  'pageText.59582d9c':
    'Tırnak, boşluk veya sonunda satır sonu bulunmayan tam üç karakterlik abc girdisi için sonuç ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad olur. Satır sonu, harf büyüklüğünün değişmesi veya farklı kodlama girdi baytlarını değiştirir ve farklı bir hesaplama üretir.',
  'pageText.af255369':
    'Dosyayı kontrol etmek için SHA-256 değerini oluşturun ve güvenilir bir kaynaktan aldığınız beklenen 64 karakterlik özeti girin. Karşılaştırma eşleşme veya uyuşmazlık bildirir. Uyuşmazlık, baytların beklenen özeti üretmek için kullanılan baytlardan farklı olduğunu kanıtlar. Eşleşme karşılaştırmayı doğrular; ancak beklenen değerin kaynağı yine de önemlidir.',
  'pageText.57ea438c': "JavaScript ve Python'da SHA-256 hesaplama",
  'pageText.2f2bbf6b':
    "JavaScript'in Web Crypto digest fonksiyonu baytlar üzerinde çalışır. UTF-8 metni için TextEncoder, dosya içeriğini birebir almak için File nesnesinin arrayBuffer() yöntemini kullanın. Örnek, abc değerini her iki biçimde de hesaplar ve aynı özeti günlüğe yazar. Tarayıcıdaki digest() güvenli bağlam gerektirir ve girdiyi belleğe okur.",
  'pageText.a0a974f1':
    "Python'un hashlib kütüphanesi özeti parça parça güncelleyebilir. Dosya örneği, var olan download.zip dosyasını ikili modda bir megabaytlık parçalarla okur. Yolu kendi dosyanızla değiştirin ve özetin tamamını güvenilir beklenen değerle karşılaştırın.",
  'pageText.5379ecfa': "SHA-256'nın şifresi çözülebilir mi ve neyi kanıtlar?",
  'pageText.43df41c5':
    'Bu, bir SHA-256 oluşturucusudur; şifre çözme veya tersine özet arama hizmeti değildir. Özet, girdiyi sabit 256 bitlik sonuca sıkıştırır; özgün veriye dönüştürülebilen şifrelenmiş veya kayıpsız bir kopya değildir. Olası özgün girdiyi bulmak, adayları tahmin edip karşılaştırma için özetlerini hesaplamak anlamına gelir.',
  'pageText.139d7ac4':
    "FIPS 180-4, SHA-256'yı güvenli bir özet algoritması olarak belirtir ve özetleri, dijital imzalar ve anahtarlı ileti doğrulama gibi uygulamalarda kullanılan bileşenler olarak açıklar. Bu anahtarsız oluşturucu veri imzalamaz, gönderenin kimliğini doğrulamaz veya içeriği şifrelemez. Güvenilmeyen bir dosyanın yanında verilen özeti, kökenine dair bağımsız kanıt olarak değerlendirmeyin.",
  'pageText.a06060d1':
    'Metin ve dosya özetleme işlemleri tarayıcı kodunda çalışır; hesaplama için sunucuya yükleme gerekmez. Bu gizlilik özelliği, özetlemeyi şifreleme yapmaz. Çalışma ortamı verinize uygun değilse herhangi bir çevrimiçi araca sır girmekten kaçının.',
  'pageText.51a1b9be': 'SHA512 nedir?',
  'pageText.84a4301e':
    'SHA512 (Secure Hash Algorithm 512-bit), 512 bitlik (64 bayt) özet değeri üreten bir kriptografik özet fonksiyonudur; genellikle 128 basamaklı onaltılık sayı olarak gösterilir.',
  'pageText.790c6ec3': 'SHA512 güvenli mi?',
  'pageText.6d855b6b':
    'Evet, SHA512 şu anda kriptografik amaçlar için çok güvenli kabul edilir ve çoğu uygulama için önerilir.',
  'pageText.815e4dcd': 'HMAC nedir?',
  'pageText.ff3b2cf9':
    'HMAC, ileti bütünlüğünü ve gerçekliğini kontrol etmek için kriptografik özet fonksiyonunu paylaşılan bir sırla birleştiren, anahtarlı bir ileti doğrulama kodudur.',
  'pageText.09e2e0ba': 'HMAC şifreleme midir?',
  'pageText.abec3974':
    'Hayır. HMAC iletiyi gizlemez. Bir sır paylaşan tarafların değişiklikleri saptamasını ve iletinin kaynağını doğrulamasını sağlar.',
  'pageText.3c4deb2f': 'Hangi algoritmalar ve çıktı biçimleri destekleniyor?',
  'pageText.b389a303':
    "Araç, SHA-256, SHA-384 veya SHA-512 ile HMAC'i destekler; imzaları onaltılık ya da standart Base64 biçiminde gösterir veya doğrular.",
  'pageText.8f405a3a': 'HMAC imzaları oluşturma ve doğrulama',
  'pageText.b25fc0c3':
    'Metninizin temsil ettiği ileti baytlarını, paylaşılan sırrı, beklenen SHA-2 çeşidini ve imza kodlamasını girin. Oluştur bir imza üretir; Doğrula aynı girdilerle yeniden hesaplar ve kodu çözülmüş baytları karşılaştırır. Farklı satır sonu, karakter kodlaması, sır, algoritma veya çıktı kodlaması sonucu değiştirir.',
  'pageText.422f4458': 'Yaygın webhook ve API kullanımları',
  'pageText.f0d6dd20': 'Entegrasyonda hata ayıklarken webhook imzasını yeniden üretin.',
  'pageText.d0483022':
    "Yerel olarak hesaplanan HMAC'i, güvenilir bir gönderenden gelen imzayla karşılaştırın.",
  'pageText.44fd46de': 'Aynı HMAC baytlarını onaltılık ve Base64 gösterimleri arasında dönüştürün.',
  'pageText.2cfc6b71':
    'İletideki değişikliklerin imza doğrulamasını başarısız kıldığını kontrol edin.',
  'pageText.843858f3': 'Güvenlik sınırı',
  'pageText.ab6a34ae':
    "HMAC, güvenli biçimde iletilip saklanan güçlü bir paylaşılan sır gerektirir. Bu tarayıcı aracı test verileri için yararlıdır; üretim sırları ise kontrollü uygulama ortamlarında kalmalıdır. HMAC verinin gerçekliğini doğrular; şifrelemez ve parola saklama yöntemi değildir. İmza kontrolü, uygulamanın JavaScript kodunda imza baytlarını karşılaştırmak yerine tarayıcının Web Crypto API'sine devredilir.",
  'pageText.cb69e8df': 'PKCE nedir?',
  'pageText.abc745c5':
    'PKCE, yetkilendirme isteğini istemcinin sakladığı gizli bir kod doğrulayıcıya bağlayarak yetkilendirme kodunun ele geçirilme riskini azaltan bir OAuth uzantısıdır.',
  'pageText.bb3fb7f1': 'Bu araç hangi challenge yöntemini kullanıyor?',
  'pageText.334f8104':
    'S256 kullanır: kod doğrulayıcının SHA-256 özeti, dolgu içermeyen Base64url biçiminde kodlanır. plain yöntemi bilerek üretilmez.',
  'pageText.c069d885': 'Oluşturulan değeri üretim ortamında kullanabilir miyim?',
  'pageText.ddc8fb76':
    'Değerler tarayıcının güvenli rastgeleliğini ve geçerli PKCE karakterlerini kullanır; ancak üretim doğrulayıcılarını, belirteç alışverişini tamamlayacak OAuth istemcisinin içinde oluşturup saklamalısınız.',
  'pageText.4c2764af': 'PKCE S256 çifti nasıl oluşturulur?',
  'pageText.71336ec6':
    'PKCE istemcisi, yüksek entropili bir kod doğrulayıcı oluşturur, tam ASCII değerinin SHA-256 özetini hesaplar ve dolgu içermeyen Base64url sonucunu kod sınaması (code challenge) olarak gönderir. Yetkilendirme isteği code_challenge ve code_challenge_method=S256 içerir. Daha sonraki belirteç isteği, yetkilendirme sunucusunun aynı sınamayı türetip karşılaştırabilmesi için özgün code_verifier değerini gönderir.',
  'pageText.3d8fba00': 'Doğrulayıcı kuralları ve doğrulama',
  'pageText.2aa00a1d':
    "Oluştur, ret örneklemesiyle seçilen güvenli rastgele baytlardan RFC 7636'nın ayrılmamış karakter kümesindeki 43 ila 128 karakteri üretir.",
  'pageText.9cb7c772':
    'Türet, mevcut bir doğrulayıcıyı yalnızca değerin tamamı uzunluk ve karakter kurallarını karşılıyorsa kabul eder.',
  'pageText.ae7f5d42':
    "Doğrula, S256'yı yeniden türetir ve tam 43 karakterlik Base64url sınamasıyla karşılaştırır.",
  'pageText.587e6e12':
    'Boşluklar önemlidir. Doğrulayıcıyı birebir kopyalayın ve yalnızca ilgili yetkilendirme akışı için saklayın.',
  'pageText.1fadc2f8':
    "PKCE, eşleşen doğrulayıcı olmadan yetkilendirme kodunun kullanılmasını önler; yönlendirme URI'si doğrulamasının, OAuth state veya OIDC nonce kontrollerinin, TLS'nin, güvenli belirteç saklamanın veya yetkilendirme sunucusu doğrulamasının yerini almaz. Oluşturma ve özetleme bu tarayıcıda yerel olarak gerçekleşir; ancak pano geçmişi, uzantılar, günlükler veya ortak cihazlar kopyalanan değerleri yine de açığa çıkarabilir.",
  'pageText.cc61fb43': 'Aynı parola neden her seferinde farklı bir özet üretiyor?',
  'pageText.47fdbb41':
    'Bcrypt, her özet için yeni bir rastgele tuz üretir ve tuzu ve maliyeti kodlanmış sonuçta saklar. Böylece ayrı bir tuz sütunu gerekmeksizin farklı özetler aynı parolayı doğrulayabilir.',
  'pageText.fd8efc8a': 'Bcrypt maliyeti neyi kontrol eder?',
  'pageText.e24b8eb9':
    'Maliyet, iki tabanlı bir iş faktörüdür. Bir artırılması, özetleme işini yaklaşık iki katına çıkarır. Üretim maliyetini tarayıcıdaki süreyi kopyalayarak değil, kendi kimlik doğrulama altyapınızda performans ölçümü yaparak seçin.',
  'pageText.c5646e46': '72 UTF-8 baytından uzun parolalar neden reddediliyor?',
  'pageText.35d8cc67':
    'Bcrypt yalnızca ilk 72 baytı işler. Daha uzun girdileri reddetmek, görünüşte farklı iki parolanın sessizce aynı kısaltılmış bayt dizisi olarak değerlendirilmesini önler.',
  'pageText.a3c91e25': 'Bcrypt oluşturucusu ve doğrulayıcısı ne yapar?',
  'pageText.523e4066':
    "Oluştur, rastgele bir tuz üretir, seçilen maliyetle bcrypt uygular ve sürüm, maliyet, tuz ve sağlama toplamını içeren standart modüler özet metnini döndürür. Doğrula, bu parametreleri mevcut bir özetten okur ve verilen test parolasının eşleşip eşleşmediğini bildirmeden önce bcrypt'i yeniden çalıştırır. Bcrypt, MD5 veya SHA-256 gibi hızlı sağlama toplamı özetlerinden farklı olarak bilerek yavaştır.",
  'pageText.52fbc8aa': 'Maliyet, tuz ve 72 bayt sınırı',
  'pageText.a94e797a':
    'Arayüz, tarayıcıya uygun 8 ila 14 maliyet değerleri sunar; yüksek değerler yavaş cihazlarda belirgin biçimde uzun sürebilir.',
  'pageText.3541abdb':
    'Her oluşturulan özet yeni, kriptografik olarak rastgele bir tuz kullanır; bu nedenle tekrarlanan oluşturma işlemleri aynı metni döndürmemelidir.',
  'pageText.8bd98451':
    'Kodlanmış özetin tamamı saklanmalıdır. Tuz ve maliyet zaten içinde yer alır ve doğrulama sırasında otomatik kullanılır.',
  'pageText.107d624e':
    "Araç, JavaScript karakterleri yerine UTF-8 baytlarını sayar ve bcrypt'in 72 baytlık işleme sınırını aşan değerleri reddeder.",
  'pageText.4b0c23bf': 'Güvenli kullanım sınırı',
  'pageText.e9f75848':
    'Bu sayfayı yapay geliştirme veya kalite güvence verileriyle kullanın. Üretimde parola özetleme; hız sınırlaması, güvenli aktarım, ihlal izleme ve belgelenmiş bir yükseltme stratejisi içeren güvenilir sunucu tarafı kimlik doğrulama akışında yapılmalıdır. Başarılı karşılaştırma yalnızca bir parolanın bir kodlanmış özetle eşleştiğini kanıtlar; parola gücünü, hesap güvenliğini veya seçilen maliyetin sunucularınıza uygunluğunu değerlendirmez.',
  'pageText.10893cde': 'Yerel işleme ve uyumluluk',
  'pageText.0f1e91b6':
    'Bcrypt uygulaması yalnızca bir işlem başladıktan sonra yüklenir; özetleme veya karşılaştırma bu tarayıcıda çalışır. Doğrulayıcı, maliyet sınırı içindeki standart $2a$, $2b$ ve $2y$ biçimlerini kabul eder. Pano yöneticileri, uzantılar, ekran paylaşımı veya zaten ele geçirilmiş bir cihaz değerleri yine de açığa çıkarabilir; gerçek kullanıcı kimlik bilgilerini yapıştırmayın.',
  'pageText.dfdb1834': 'Kod çözme, bir sertifikanın güvenilir olduğunu kanıtlar mı?',
  'pageText.54a44265':
    'Hayır. Ayrıştırma, kodlanmış alanları gösterir ve sertifikanın kendi açık anahtarıyla doğrulanıp doğrulanmadığını test edebilir. Güven ayrıca kabul edilen bir köke uzanan geçerli zincir, amaç ve ad kontrolleri, politika, zaman ve çoğu durumda iptal veya şeffaflık kanıtları gerektirir.',
  'pageText.5cbb68de': 'Tam bir PEM sertifika zinciri yapıştırabilir miyim?',
  'pageText.99a5e254':
    'Evet. Araç, girdi sırasıyla en fazla on CERTIFICATE bloğunu çıkarıp kodunu çözer. Bunları yeniden sıralamaz veya her sertifikanın sonrakini imzaladığını kanıtlamaz.',
  'pageText.00fb6a40': 'Özel anahtarlar kabul ediliyor mu?',
  'pageText.339287f5':
    'Hayır. Girdi, PEM CERTIFICATE bloklarını veya Base64 kodlu DER sertifikalarını kabul eder. Özel anahtar ve sertifika isteği metinleri reddedilir; özel anahtarları tarayıcı araçlarına yapıştırmayın.',
  'pageText.eac22252': 'X.509 sertifikasından çıkarılan alanlar',
  'pageText.27c40514':
    "Çözücü, doğrudan Base64 olarak veya RFC 7468 PEM sınırları içinde taşınan ASN.1 DER verisini okur. Konunun ve düzenleyenin ayırt edici adlarını, seri numarasını, başlangıç ve bitiş tarihlerini, imza ve açık anahtar algoritmalarını, desteklenen alternatif konu adlarını, uzantı OID'lerini, bayt boyutunu ve sertifikanın birebir baytlarının SHA-256 özetini bildirir.",
  'pageText.6739d969': 'Geçerlilik ve kendi imzası yalnızca dar kapsamlı kontrollerdir',
  'pageText.020adbca':
    'Şu anda geçerli, tarayıcı saatinin notBefore ile notAfter arasında olduğu anlamına gelir; güveni veya amaçlanan kullanıma uygunluğu kanıtlamaz.',
  'pageText.d1665ea2':
    'Kendi düzenlediği, konu ve düzenleyen adlarının eşleştiği anlamına gelir. Kriptografik olarak kendi imzaladığı ise ayrıca imzanın sertifikanın açık anahtarıyla doğrulanmasını gerektirir.',
  'pageText.75c63764':
    'Sertifika yapısının kodu çözülebilse bile tarayıcının desteklemediği kriptografi nedeniyle kendi imzasının sonucu bilinmiyor kalabilir.',
  'pageText.7a7b0159':
    'SHA-256 parmak izi, karşılaştırma için birebir DER baytlarını tanımlar; ancak yalnızca bağımsız ve güvenilir bir kanaldan alındığında güven işareti olur.',
  'pageText.087c5028': 'TLS veya PKI doğrulayıcısının yapması gereken kontroller',
  'pageText.08a73601':
    'Bu sayfa işletim sistemi veya tarayıcı köklerine karşı zincir oluşturmaz, ara sertifikaları almaz, belirli bir amaç için anahtar kullanımını veya politikayı kontrol etmez, ana makine adını eşleştirmez, OCSP ya da CRL sorgulamaz, Certificate Transparency günlüklerini incelemez ve sunucuya bağlanmaz. Bu kararlar, gerçek istemcinin güven deposunu, bağlantı bağlamını ve doğrulama politikasını gerektirir.',
  'pageText.314bab46': 'BIP-39 nedir?',
  'pageText.9fba1f54':
    'BIP-39 (Bitcoin Improvement Proposal 39), deterministik kripto cüzdanları oluşturmak için anımsatıcı bir cümlenin, yani kolay hatırlanan sözcük grubunun uygulanmasını açıklar.',
  'pageText.bc10db69': 'Burada kurtarma ifadeleri oluşturmak güvenli mi?',
  'pageText.6f73837c':
    'Tüm oluşturma ve entropi hesaplaması window.crypto.getRandomValues() kullanır ve tamamen tarayıcınızda yerel olarak çalışır. Kurtarma ifadeleri hiçbir zaman ağ üzerinden aktarılmaz.',
  'pageText.6d97a1a7': 'Özel anahtarlar sunucunuza gönderiliyor mu?',
  'pageText.791c3f3c':
    'Hayır. Anahtar çiftleri, doğrudan cihazınızda window.crypto.subtle kullanılarak oluşturulur. Özel anahtarlar tarayıcınızdan ayrılmaz.',
  'pageText.4cc18af6': 'Dışa aktarılan anahtarlar hangi biçimde?',
  'pageText.26a068ea':
    'Açık anahtarlar SPKI PEM (-----BEGIN PUBLIC KEY-----), özel anahtarlar ise PKCS#8 PEM (-----BEGIN PRIVATE KEY-----) biçiminde dışa aktarılır.',
  'pageText.14b643ed': 'Üretimdeki .htpasswd için hangi algoritma önerilir?',
  'pageText.e63436c8':
    'Kaba kuvvet ve sözlük saldırılarına karşı güçlü koruma sağladığı için üretim ortamlarında Bcrypt ($2y$) özellikle önerilir.',
  'pageText.438a3aaa': 'Düz metin parolam herhangi bir sunucuya gönderiliyor mu?',
  'pageText.71f70564':
    'Hayır. Özetleme, Web Crypto API ile tamamen tarayıcınızda yerel olarak gerçekleştirilir. Parolalarınız hiçbir sunucuya ulaşmaz.',
  'pageText.c83dd430': 'Zamana Dayalı Tek Kullanımlık Parola (TOTP) nasıl çalışır?',
  'pageText.682b1360':
    'TOTP (RFC 6238), paylaşılan Base32 sırrını ve geçerli 30 saniyelik Unix zaman aralığını kullanarak HMAC-SHA1 imzası hesaplar ve 6 basamaklı bir doğrulama kodu üretir.',
  'pageText.2c69c124': 'Google Authenticator, Authy ve 1Password ile uyumlu mu?',
  'pageText.9e7b7687':
    "Evet, oluşturulan gizli anahtarlar ve otpauth:// URI'leri; Google Authenticator, Microsoft Authenticator, 1Password ve Bitwarden'ın desteklediği açık standarda uyar.",
  'pageText.84c27538': 'Bu doğrulayıcıda parola test etmek güvenli mi?',
  'pageText.004d56b7':
    'Evet. Tüm kriptografik doğrulama tamamen web tarayıcınızda yerel olarak çalışır. Düz metin parolalar veya özetler hiçbir sunucuya aktarılmaz.',
  'pageText.a32149fa': 'Hangi Bcrypt sürümleri destekleniyor?',
  'pageText.c4c394d4':
    '$2a$, $2b$ ve $2y$ ön ekleri dahil, 4 ile 31 arasındaki tüm maliyet faktörleriyle standart Modular Crypt Format Bcrypt metinleri desteklenir.',
  'pageText.78492a05': 'Hangi HMAC imzalama algoritmaları destekleniyor?',
  'pageText.3bff48a8':
    "Tarayıcının yerleşik Web Cryptography API'si üzerinden HS256 (HMAC-SHA256), HS384 (HMAC-SHA384) ve HS512 (HMAC-SHA512) desteklenir.",
  'pageText.59a40ee3': 'İmzalama sırlarım güvende tutuluyor mu?',
  'pageText.e7d3f45b':
    'Evet! Tüm kriptografik imza oluşturma işlemleri tamamen tarayıcınızda yerel olarak yürütülür. Sırlar ve veri içeriği hiçbir sunucuya gönderilmez.',
  'pageText.546b483c': 'Parola entropisi nedir?',
  'pageText.843a4831':
    'Parola entropisi, karakter kümesinin boyutuna ve parola uzunluğuna dayanan, öngörülemeyen bilginin bit cinsinden matematiksel ölçüsüdür.',
  'pageText.090cc30f': 'Parolamı buraya yazmak güvenli mi?',
  'pageText.d27c1402':
    'Evet. Analiz, saf JavaScript kullanılarak tamamen tarayıcınızda yerel olarak hesaplanır ve internet üzerinden aktarılmaz.',
  'pageText.842979bb': 'Regex nedir?',
  'pageText.bf8dc030':
    'Düzenli ifadeler (regex), metinlerdeki karakter birleşimlerini eşleştirmek için kullanılan kalıplardır. Metin arama, değiştirme ve doğrulamada kullanılırlar.',
  'pageText.aa2308ec': 'Hangi regex çeşidi destekleniyor?',
  'pageText.e2719d0a':
    'Bu test aracı, JavaScript RegExp motorunu kullanır ve tarayıcınızda bulunan ECMAScript sözdizimini ve bayraklarını destekler. Geçersiz kalıplar sözdizimi hatası olarak bildirilir.',
  'pageText.b74b7f86': 'Hangi regex bayraklarını test edebilirim?',
  'pageText.cf4c1cc1':
    'Tüm eşleşmeler, büyük-küçük harfe duyarsızlık, çok satır, dotAll, Unicode ve yapışkan eşleştirme dahil tarayıcınızın desteklediği standart JavaScript bayraklarını test edebilirsiniz.',
  'pageText.7f047dab': 'Bu JavaScript regex test aracı ne yapar?',
  'pageText.dc90d609':
    'Bu araç, kalıbı ve bayrakları tarayıcının JavaScript RegExp motoruyla derler, verilen metne uygular, her eşleşmeyi vurgular ve başlangıç indeksini ve yakalama gruplarını bildirir. Kalıp kaynağını çevreleyen eğik çizgi ayırıcıları olmadan girin. Her eşleşmeyi toplamak için g ekleyin; bu olmadan JavaScript yalnızca ilk eşleşmeyi döndürür. Tekrarlanan eşleşmelerin beklenen yerlerde olduğunu doğrulamak için eşleşme sayısını ve indeksleri kullanın.',
  'pageText.abd7f336': 'Yaygın kullanım alanları',
  'pageText.9dc106a2':
    'Tanımlayıcılar, tarihler, günlük satırları veya diğer kısıtlı metinler için doğrulama kurallarının prototipini oluşturun.',
  'pageText.1d045840':
    'E-posta benzeri metinler, kayıt numaraları veya adlandırılmış alanlar gibi tekrarlanan değerleri çıkarın.',
  'pageText.6220ec6f':
    'i ile büyük-küçük harfe duyarlı ve duyarsız davranışı, m ile satır sınırlarını karşılaştırın.',
  'pageText.f40aadec':
    'Bir kalıbı JavaScript veya TypeScript koduna taşımadan önce yakalama gruplarını inceleyin.',
  'pageText.1908e453': 'Uygulamalı örnek',
  'pageText.d2821f39':
    'Kalıp: \\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})\\b. Bayraklar: gi. Test metni: "Contact Ada at ada@example.com or SUPPORT@EXAMPLE.ORG." Sonuç, vurgulanan iki eşleşmedir. Yakalama grubu 1 her yerel bölümü, grup 2 ise her alan adını içerir. g bayrağı ilk eşleşmeden sonra devam eder; i, harf büyüklüğünü önemsiz kılar.',
  'pageText.d1106dba':
    "Bu araç, geçerli tarayıcıda bulunan ECMAScript düzenli ifade sözdizimini izler; PCRE, Python, .NET ve Java'ya özgü yapılar başarısız olabilir veya farklı davranabilir. Başarılı eşleşme, yalnızca kalıbın eşleştiğini kanıtlar; bir e-postanın, URL'nin, tarihin veya başka değerin anlamsal olarak geçerli olduğunu kanıtlamaz. Belirsiz, iç içe niceleyiciler uzun girdide maliyetli geri izlemeye yol açabilir. Kalıp değerlendirmesi ve test metni tarayıcıda kalır; yine de ortak cihazlarda hassas üretim verilerinden kaçının.",
  'pageText.17c97676': 'Regex karakterleri neden kaçışlı yazılır?',
  'pageText.c7a9a784':
    '., *, +, ?, (, ), [, ], {, }, ^, $, | ve ters eğik çizgi gibi karakterler düzenli ifadede yapısal anlam taşır. Başlarına ters eğik çizgi koymak, oluşturulan kalıp parçasının bu karakterleri birebir eşleştirmesini sağlar.',
  'pageText.b46e6b9b': 'Bu aracı ne zaman kullanmalıyım?',
  'pageText.bbf26d2d':
    'Güvenilir veya güvenilmeyen sabit metni daha büyük bir JavaScript düzenli ifadesine eklemeden önce kullanın. Kaçışlar, eklenen metnin kalıp yapısını değiştirmesini önler; ancak onu çevreleyen ifade yine de verimsiz veya yanlış olabilir.',
  'pageText.6df59a98': 'Kaçış çözme, \\n veya \\d gibi dizileri yorumlar mı?',
  'pageText.9a3e444a':
    'Hayır. Kaçış çözme, yalnızca bu aracın ürettiği metakarakter ve eğik çizgi kaçışlarını geri alır. Farklı anlam taşıyabilecek regex belirteçlerini ve metin kaçışlarını bilerek korur.',
  'pageText.f457f978': 'Regex Kaçış aracı ne üretir?',
  'pageText.6ac46463':
    'Kaçış işlemi, JavaScript düzenli ifade metakarakterlerinin önüne ters eğik çizgi koyar ve /pattern/ sabiti içinde kolay kullanım için / karakterini de kaçışlı yazar. Örneğin price (USD) + tax?, price \\(USD\\) \\+ tax\\? olur. Sonuç bir kalıp parçasıdır; bayraklar, sınır belirteçleri, yakalama grupları ve çevreleyen ifade sizin sorumluluğunuzdadır.',
  'pageText.00aef4ad': 'Dinamik kalıplarda güvenlik sınırı',
  'pageText.dcb7c0ee':
    'Yalnızca sabit metin bölümünü kaçışlı yazın. Çevresine bilerek eklediğiniz ^, $ veya yakalama grubu gibi işleçleri kaçışlı yazmayın.',
  'pageText.3f76d13b':
    'Kaçışlar, o parçadan regex sözdizimi enjeksiyonunu önler; ancak son kalıbın başka bir yerinde oluşturulan yıkıcı geri izlemeyi önlemez.',
  'pageText.c4d0eb41':
    'JavaScript RegExp sözdizimi, PCRE, Python, .NET, Java ve diğer motorlardan farklıdır; son kalıbı, çalıştırılacağı çalışma ortamında test edin.',
  'pageText.8dd960d4':
    'Kalıp bir JavaScript metnine yerleştiriliyorsa kaynak koddaki metin kaçışları, regex kaçışlarından ayrı ek bir katmandır.',
  'pageText.90550320': 'Kaçış çözme ve gizlilik sınırları',
  'pageText.ccd0ec75':
    'Kaçış çözme bilerek temkinlidir: ters eğik çizgiyi yalnızca kaçış işleminin işlediği noktalama işaretlerinden önce kaldırır. Tam bir düzenli ifadeyi ayrıştırmaz veya \\d, \\b, \\n gibi belirteçleri ya da Unicode kaçışlarını metne dönüştürmez. İşleme tarayıcıda kalır; pano ve hedef kodun işlemesi aracın kapsamı dışındadır.',
  'pageText.a0a4fe42': 'Metin farkı nasıl çalışır?',
  'pageText.e1159d8d':
    'İki girdiyi satır satır karşılaştırır, eklenen, silinen ve değişen satırları işaretler; ardından değiştirilen satırlardaki daha küçük farkları vurgular.',
  'pageText.e5a7ece5': 'Bu araçla kod karşılaştırabilir miyim?',
  'pageText.4f90c315':
    'Evet. İki düzenleyiciye kod, yapılandırma veya düz yazı yapıştırın. Bu farklar önemsizse Boşlukları yoksay veya Büyük-küçük harfi yoksay seçeneklerini kullanın.',
  'pageText.74bef405': 'İki dosyayı karşılaştırabilir miyim?',
  'pageText.c6806514':
    'Her dosyayı bir düzenleyicide açıp içeriğini kopyalayın ve Özgün ve Değiştirilmiş panellerine yapıştırın. Karşılaştırma metin üzerinde çalıştığından JSON, YAML, CSV ve kaynak kodu dahil tüm düz metin biçimleri kullanılabilir.',
  'pageText.e1647322': 'Boşlukları yoksay seçeneği boş satırları da yoksayar mı?',
  'pageText.88417b29':
    'Hayır. Boşluk ve sekme dizilerini birleştirir ve karşılaştırmadan önce her satırın uçlarındaki boşlukları temizler. Böylece girintiler ve sondaki boşluklar değişiklik sayılmaz; ancak eklenen veya kaldırılan boş satır yine değişiklik olarak görünür.',
  'pageText.80c2c0e8': "Bu, git diff'ten nasıl farklıdır?",
  'pageText.612015ce':
    "İkisi de değişmeyen satırların en uzun ortak kümesini bulur. Bu araç ayrıca benzer silinen ve eklenen satırları değişiklik olarak eşleştirir ve değişen karakterleri tam olarak vurgular; kısa düzenlemelerde bunu okumak daha kolaydır. Commit'ler ve yamalar için esas kaynak git diff olmaya devam eder.",
  'pageText.083d5e45': 'Metnim yükleniyor mu?',
  'pageText.5e441495':
    'Hayır. Karşılaştırma tarayıcınızda çalışır ve iki girdi de sunucuya gönderilmez.',
  'pageText.8ab4cd08': 'İki metni veya daha uzun belgeleri karşılaştırma',
  'pageText.19e9243c':
    'Özgün metni sola, düzenlenmiş metni sağa yapıştırın; girdilerden birini düzenlediğinizde karşılaştırma güncellenir. Bölünmüş görünüm, karşılık gelen satırları yan yana tutar ve iki paneli birlikte kaydırır. Birleşik görünüm, her silinen satırın ardından yerine gelen satırın bulunduğu tek, kesintisiz fark gösterimi sunar. Girdileri yanlış sırayla yapıştırdıysanız değiştirme düğmesi yerlerini değiştirir.',
  'pageText.06dc44b8': 'Değişiklikler nasıl saptanır?',
  'pageText.40ccc1ca':
    'Araç önce satırların en uzun ortak alt dizisini bulur; bu, her satırı değişmemiş, eklenmiş veya kaldırılmış olarak işaretler. Her değişiklik bloğunda, yeterince benzer olan kaldırılmış ve eklenmiş satırlar değiştirilmiş satırlar olarak eşleştirilir. Böylece düzenlenen satır, bir silme ve ekleme yerine tek değişiklik olarak görünür. Ardından değiştirilmiş satırlar ayrıntılı karşılaştırılır: Karakter düzeyi seçeneği karakter ayrıntısını zorlamıyorsa 80 karakterden kısa satırlar karakter karakter, daha uzun satırlar sözcük sözcük karşılaştırılır. Özet; eklenen, silinen, değiştirilen ve değişmeyen satırları sayar.',
  'pageText.3ba03012': 'Gereksiz farkları azaltan seçenekler',
  'pageText.fa1650de':
    'Boşlukları yoksay, boşluk ve sekme dizilerini birleştirir ve her satırın uçlarını temizler. Böylece yeniden girintilenen kod ve sondaki boşluklar değişiklik sayılmaz. a b ile ab değerlerini eşit kabul etmez.',
  'pageText.40e7b499':
    'Büyük-küçük harfi yoksay, satırları harf büyüklüğünden bağımsız karşılaştırır; SQL anahtar sözcükleri veya ortam değişkeni adlarında yararlıdır.',
  'pageText.6c540dae':
    'Yalnızca değişiklikleri göster, değişmeyen satırları gizler. Satırları kaydır ise uzun satırların yatay kaydırma olmadan okunabilmesini sağlar.',
  'pageText.15884c41':
    'Windows dosyalarından kopyalanan metinlerde her satırın sonunda satır başı karakteri bulunabilir. Aynı görünen satırlar değişmiş olarak bildiriliyorsa Boşlukları yoksay seçeneğini etkinleştirin.',
  'pageText.4010b374': 'Farkları inceleme ve paylaşma',
  'pageText.796a0a49':
    'Farkı kopyala, düz metin listesi üretir: değişmeyen satırlar iki boşlukla, kaldırılan satırlar -, eklenen satırlar + ile başlar.',
  'pageText.97594ef5':
    'Kopyalama geçerli görünümü izler; bu nedenle Yalnızca değişiklikleri göster seçeneği etkinse yalnızca değişen satırlar kopyalanır.',
  'pageText.314e11fa':
    'Büyük-küçük harfi yoksay veya Boşlukları yoksay nedeniyle gizlenen farklar listelenmez; sonucu paylaşmadan önce seçenekleri kontrol edin.',
  'pageText.5b3a3d4f': 'Markdown nedir?',
  'pageText.d5d009f0':
    'Markdown, düz metin düzenleyicisiyle biçimlendirilmiş metin oluşturmak için kullanılan hafif bir işaretleme dilidir. Belgelerde, readme dosyalarında ve içerik yazımında yaygın olarak kullanılır.',
  'pageText.bde3ab4d': "HTML'i dışa aktarabilir miyim?",
  'pageText.ed93a679':
    'Evet. Temizlenmiş parçayı kopyalayabilir veya temel duyarlı stiller içeren bağımsız bir HTML belgesi indirebilirsiniz. Başka bir güvenlik bağlamında yayımlamadan önce dışa aktarılan işaretlemeyi ve bağlantıları inceleyin.',
  'pageText.0098beeb': "Markdown içindeki ham HTML'i önizlemek güvenli mi?",
  'pageText.1737e56a':
    "Oluşturulan çıktı DOMPurify ile temizlenir. Betikler, formlar, iframe'ler, style öznitelikleri ve diğer yüksek riskli öğeler kaldırılır. Bağlantılı görseller varsayılan olarak engellenir; bunları etkinleştirmek, barındırıldıkları sunucularla iletişim kurabilir. Bir bağlantıyı izlemek de hedefiyle iletişim kurar.",
  'pageText.bee7691f': 'Markdown önizlemesi neleri destekler?',
  'pageText.441669ae':
    "Görüntüleyici, açık satır sonu desteğiyle GitHub Flavored Markdown kullanır. Başlıklar, vurgular, bağlantılar, görseller, sıralı ve sırasız listeler, görev listeleri, tablolar, alıntılar, satır içi kod, çitli kod blokları, üstü çizili metin ve yatay çizgiler yazarken önizlenebilir. HTML görünümü, Markdown'ı kod olarak çalıştırmak yerine oluşturulan temizlenmiş parçayı gösterir.",
  'pageText.03de3ac0': 'Temizleme ve yayımlama sınırı',
  'pageText.a8213d5f':
    'DOMPurify; betikleri, formları, çerçeveleri, gömülü nesneleri, style öğelerini, style özniteliklerini ve izin verilmeyen diğer işaretlemeleri önizleme veya dışa aktarmadan önce kaldırır.',
  'pageText.1e94d374':
    'Temizleme bağlama özgüdür. Başka bir uygulama çıktıyı değiştiriyorsa, şablonlarla birleştiriyorsa veya HTML dışındaki bir bağlama yerleştiriyorsa çıktıyı yeniden temizleyin ya da güvenli biçimde yeniden oluşturun.',
  'pageText.c384685e':
    'Sözdizimi vurgulama uygulanmaz; çitli kod bloklarının dil etiketleri yalnızca işaretleme ipuçları olarak korunur.',
  'pageText.7f8e5143':
    "Bağlantılı görsellere açıkça izin vermediğiniz sürece bunlar görünür bir yer tutucuyla değiştirilir. Göreli bağlantılar ve diğer varlıklar, dışa aktarılan HTML'in açıldığı sayfaya göre çözümlenmeye devam eder.",
  'pageText.9ab93c5c': 'Gizlilik ve harici kaynak notu',
  'pageText.da04b65a':
    "Markdown ayrıştırma ve temizleme yerel olarak çalışır; metin bu araç tarafından yüklenmez. Bağlantılı görseller varsayılan olarak engellenir. Bunları etkinleştirirseniz tarayıcı, görsellerin barındırıldığı sunucularla iletişim kurup IP adresiniz gibi bağlantı meta verilerini açığa çıkarabilir; önizleme no-referrer ve gecikmeli yükleme ipuçları uygular. Bağlantıları izlemek, pano geçmişi, indirilen dosyalar, tarayıcı uzantıları ve dışa aktarılan HTML'i yayımladığınız yer ayrı veri yollarıdır.",
  'pageText.fd136c59': 'Hangi harf biçimleri destekleniyor?',
  'pageText.972118df':
    'Bu araç camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, space case ve dot.case biçimlerini destekler.',
  'pageText.8e8d253c': 'camelCase nedir?',
  'pageText.0c0fc023':
    'camelCase sözcükleri ayırıcı olmadan birleştirir, küçük harfle başlar ve sonraki her sözcüğün ilk harfini büyütür; örneğin userProfileId. JavaScript ve Java değişkenlerinde yaygın kullanılan biçimdir.',
  'pageText.fab0fc0e': 'snake_case ile kebab-case arasındaki fark nedir?',
  'pageText.ffa6d712':
    "İkisi de küçük harflidir. snake_case sözcükleri alt çizgilerle ayırır (user_profile_id) ve Python ile SQL'de yaygındır. kebab-case kısa çizgi kullanır (user-profile-id) ve URL'ler ile CSS'te yaygındır; ancak - eksi anlamına geldiğinden çoğu dilde değişken adlarında kullanılamaz.",
  'pageText.83ad6918': "TAMAMI BÜYÜK HARFLİ metin neden camelCase'e garip biçimde dönüşüyor?",
  'pageText.20a709bd':
    "camelCase ve PascalCase mevcut büyük harfleri korur; bu yüzden HELLO_WORLD, hELLOWORLD olur. Önce snake_case veya space case'e (hello_world) dönüştürün; ardından helloWorld elde etmek için sonucu camelCase'e dönüştürün.",
  'pageText.8b5b532b': 'Ortam değişkenlerinde hangi harf biçimini kullanmalıyım?',
  'pageText.d1aa7699':
    'DATABASE_URL gibi CONSTANT_CASE kullanın. Büyük harfler, rakamlar ve alt çizgiler, Unix benzeri sistemlerde ortam değişkeni adları için taşınabilir yerleşik biçimdir.',
  'pageText.45c5778c': "URL'ler için en iyi harf biçimi hangisidir?",
  'pageText.a79aed09':
    "kebab-case. Kısa çizgilerle ayrılmış küçük harfli sözcükleri okumak kolaydır; Google da URL'lerde sözcükleri ayırmak için alt çizgi yerine kısa çizgi önerir.",
  'pageText.05244f1a': 'Adlandırma kuralları ve kullanım yerleri',
  'pageText.a6b96046':
    "camelCase (userProfileId): JavaScript ve Java değişkenleri ve fonksiyonları ile birçok API'deki JSON anahtarları.",
  'pageText.fdfeef9a':
    'PascalCase (UserProfileId): sınıf adları, TypeScript türleri, React bileşenleri ve C# üyeleri.',
  'pageText.664a685d':
    'snake_case (user_profile_id): Python ve Ruby değişkenleri ve fonksiyonları ile SQL sütun adları.',
  'pageText.88ba7528': 'CONSTANT_CASE (USER_PROFILE_ID): sabitler ve ortam değişkenleri.',
  'pageText.d95625b3':
    'kebab-case (user-profile-id): URL kısa adları, CSS sınıf adları, HTML öznitelikleri ve komut satırı bayrakları.',
  'pageText.0eab35c7':
    'dot.case (user.profile.id): yapılandırma anahtarları ve çeviri iletisi kimlikleri.',
  'pageText.6428569e':
    'space case (user profile id): etiketler veya daha sonra düzenleme için düz, küçük harfli sözcükler.',
  'pageText.a1ccbb20': 'Sözcükler nasıl saptanır?',
  'pageText.eb52946f':
    "Dönüştürücü; boşluk, kısa çizgi, alt çizgi ve noktalarda ve küçük harften sonra büyük harf gelen her yerde sözcükleri ayırır. Bu, user_profile-id, userProfileId ve User Profile Id girdilerinin aynı snake_case sonucunu ürettiği anlamına gelir: user_profile_id. Rakamlar komşu sözcüğe bağlı kalır; dolayısıyla api-v2 response, camelCase'te apiV2Response, snake_case'te api_v2_response olur.",
  'pageText.3ec8336a': 'Kontrol edilmesi gereken uç durumlar',
  'pageText.7af4b6f9':
    'Art arda büyük harfler tek sözcük sayılır: XMLHttpRequest, xml-http-request değil, xmlhttp-request olur. Kısaltmanın ayrılması gerekiyorsa ayırıcılar ekleyin (XML Http Request).',
  'pageText.ac6701e0':
    "camelCase ve PascalCase mevcut büyük harfleri korur; bu nedenle TAMAMI BÜYÜK HARFLİ girdiyi önce snake_case'e, ardından camelCase'e dönüştürün.",
  'pageText.4ac21c06':
    "- _ . ve boşluklar dışındaki noktalama işaretleri korunur: Hello World!, camelCase'te helloWorld! olur. Tanımlayıcılarda izin verilmeyen karakterleri kaldırın.",
  'pageText.0bc340ed':
    'Satır sonları boşluk sayılır; bu nedenle çok satırlı girdi tek bir tanımlayıcıda birleştirilir. Her seferinde tek ad dönüştürün.',
  'pageText.83b3cb6b':
    'Büyük harfli sözcük sınırı olarak yalnızca A-Z tanınır; dolayısıyla sözcük içindeki É gibi aksanlı büyük harf yeni bir sözcük başlatmaz.',
  'pageText.c7cb896c': 'Kodda adları dönüştürme',
  'pageText.e93e8bdd':
    "JavaScript: lodash; camelCase, kebabCase ve snakeCase sunar. Lodash önce her sözcüğü küçük harfe dönüştürdüğünden camelCase('HELLO_WORLD') çağrısı helloWorld döndürür.",
  'pageText.2245868e':
    "API'ler: veri anahtarlarını elle yeniden adlandırmak yerine serileştiricinin eşleştirmesine izin verin; örneğin Java'da Jackson PropertyNamingStrategies.SNAKE_CASE veya Pydantic'te takma ad oluşturucusu kullanın.",
  'pageText.30d85b7e':
    'Yeniden düzenleme: diğer dosyalardaki başvuruların da güncellenmesi için tanımlayıcıları bul ve değiştir yerine düzenleyicinizin yeniden adlandırma komutuyla değiştirin.',
  'pageText.a7bd2d40': 'Neler sayılır?',
  'pageText.51bef002':
    'Sözcükler, boşluklu ve boşluksuz karakterler, satırlar, cümleler ve paragraflar sayılır; ayrıca tahmini okuma süresi verilir. Yazarken tüm sayımlar güncellenir.',
  'pageText.051f4a91': 'Okuma süresi nasıl hesaplanır?',
  'pageText.87fbca18':
    'Sözcük sayısı dakikada ortalama 200 sözcük okuma hızına bölünür ve bir sonraki tam dakikaya yuvarlanır; böylece 450 sözcük 3 dakika olarak gösterilir.',
  'pageText.b3ed5e8b': 'Karakter sayısı boşlukları içerir mi?',
  'pageText.b1bd314d':
    'Karakterler değeri boşlukları, sekmeleri ve satır sonlarını içerir. Boşluksuz karakterler tüm boşluk karakterlerini dışarıda bırakır. Metninizi kısaltmadan önce formun veya biçem kılavuzunun hangisini kastettiğini kontrol edin.',
  'pageText.1dd1b66b': 'Bir emoji neden iki karakter sayılır?',
  'pageText.75918985':
    "Karakterler, JavaScript'in metin uzunluğunu ölçtüğü biçimde, UTF-16 kod birimleriyle sayılır. Çoğu emoji ve bazı nadir simgeler iki kod birimi kullandığından toplama 2 ekler. Aile veya bayrak dizileri gibi birleşik emojiler daha fazla ekleyebilir.",
  'pageText.d65fcd89': 'Cümle sayısı neden beklenenden yüksek?',
  'pageText.2fc1b39a':
    "Cümleler ., ! ve ? işaretlerinde bölünür. e.g. veya Dr. gibi kısaltmalar, 3.14 gibi ondalık sayılar ve URL'ler ek bölünmeler oluşturur; bu nedenle cümle sayısını tahmin olarak değerlendirin.",
  'pageText.1a163ec9': 'Metnim saklanıyor veya yükleniyor mu?',
  'pageText.0fef5a83':
    'Hayır. Sayım tarayıcınızda yapılır, sunucuya hiçbir şey gönderilmez ve sayfadan ayrıldığınızda metin kaydedilmez.',
  'pageText.b58e5ca1': 'Her sayım nasıl hesaplanır?',
  'pageText.27c1e98e':
    "Sözcükler: boşluk karakterleriyle ayrılan karakter dizileri. well-known veya don't gibi kısa çizgili sözcükler ve kısaltılmış birleşimler tek sözcük sayılır; tek başına duran bir sayı veya çizgi de sözcük sayılır.",
  'pageText.b7cde3d8':
    'Karakterler: boşluklar ve satır sonları dahil her karakter. Boşluksuz karakterler, sekmeler ve satır sonları dahil tüm boşluk karakterlerini dışarıda bırakır.',
  'pageText.ac4f81d6':
    'Satırlar: boş satırlar dahil, satır sonu sayısına bir eklenerek hesaplanır.',
  'pageText.dccbe9b3':
    'Cümleler: ., ! veya ? ile biten metin parçaları. Kısaltmalar ve ondalık sayılar ek bölünmeler oluşturur.',
  'pageText.ac9536dd':
    'Paragraflar: en az bir boş satırla ayrılmış metin blokları. Tek bir satır sonu yeni paragraf başlatmaz.',
  'pageText.c2e627fb':
    "Okuma süresi: sözcük sayısı 200'e bölünür, bir sonraki tam dakikaya yuvarlanır.",
  'pageText.817a0ebe': 'Sayımlar araçlar arasında neden farklıdır?',
  'pageText.ddc50b04':
    'Sözcük işlemciler ve web siteleri, sözcük veya karakter için tek bir tanım paylaşmaz. Bazıları kısa çizgili birleşimleri ayırır, sayıları yoksayar veya sözcükler arasındaki uzun çizgiyi ayırıcı kabul eder. Karakter sınırları daha da çeşitlidir: bu araç, çoğu emojinin iki sayıldığı JavaScript metin uzunluğunu sayar. Bazı veritabanı sütunları gibi bayt sayan sistemler veya Unicode kod noktalarını sayan sistemler aynı metin için farklı toplamlar bildirir. Çince ve Japonca gibi boşluksuz yazılan diller, boşlukla ayrılmış her dizi için bir sözcük olarak sayılır; bu dillerde karakter sayısını esas alın. Baştaki ve sondaki boşluklar sözcük eklemez; ancak karakter sayısına eklenir.',
  'pageText.8d394a34': 'Metni yaygın sınırlarla karşılaştırma',
  'pageText.14f2e128':
    'SMS: tek bölüm GSM-7 alfabesinde 160 karakter, ileti emoji gibi bu alfabe dışındaki karakterler içerdiğinde ise 70 karakter alır.',
  'pageText.3ea61033':
    'Arama sonuçları: arama motorları uzun metni görüntüleme genişliğine göre kestiği için başlık etiketleri genellikle yaklaşık 60 karakterin altında, meta açıklamaları 150 ila 160 karakter civarında tutulur.',
  'pageText.b63f3eaf':
    'Sosyal gönderiler: X gibi platformlar bağlantı ve emojilere farklı ağırlık verme gibi kendi sayım kurallarını uygular; son uzunluğu platformun gönderi düzenleyicisinde doğrulayın.',
  'pageText.9eea4352':
    'Denemeler ve makaleler: sözcük sınırları genellikle gövde metnini kapsar; başlıkların, kaynakların ve dipnotların dahil olup olmadığını kontrol edin.',
  'pageText.2ad739ba': 'Yinelenenleri saptama nasıl çalışır?',
  'pageText.a0e337c4':
    'Araç, her satırı karşılaştırır ve yalnızca ilkini tutar. Büyük-küçük harfe duyarlı eşleştirmeyi ve uç boşluklarını temizlemeyi açıp kapatabilirsiniz.',
  'pageText.465a3722': 'Boş satırlara ne olur?',
  'pageText.818a7fb1': 'Boş satırlar özgün konumlarında korunur.',
  'pageText.ee732984': 'Sıralama nasıl çalışır?',
  'pageText.05cacbdc':
    'Satırlar, Unicode karakter karşılaştırmasıyla alfabetik sıralanır. Artan veya azalan sıra seçebilirsiniz.',
  'pageText.f14a257f': 'Sıralama büyük-küçük harfe duyarlı mı?',
  'pageText.5bc0fcf2':
    'Varsayılan olarak sıralama büyük-küçük harfe duyarsızdır. Seçeneklerden duyarlı sıralamayı etkinleştirebilirsiniz.',
  'pageText.e0ce4b55': 'UTF-8 bayt sayısı neden karakter sayısından farklı?',
  'pageText.cea04185':
    "Standart ASCII karakterleri 1'er bayt kullanırken aksanlı harfler (ör. é, ç) 2 bayt, emojiler (ör. 🚀, 🎉) UTF-8 kodlamasında 4 bayt kullanır.",
  'pageText.58a712ea': 'Veritabanı sütun sınırı denetleyicisi nasıl çalışır?',
  'pageText.41e8b156':
    'Veritabanı satır kısıtlarını aşmadan kaç bayt kaldığını görmek için VARCHAR(64), VARCHAR(255) veya TEXT gibi sütun türlerini seçebilirsiniz.',
  'pageText.ae565f86': 'Başlık Biçimi, İngilizcedeki kısa edatları doğru işler mi?',
  'pageText.24671ad1':
    'Evet. "to", "a", "an", "the", "in", "for" ve "and" gibi sözcükler, Chicago Manual of Style kurallarına göre uygun durumlarda küçük harfli tutulur.',
  'pageText.979a2e10': 'Hangi görünmez karakterler saptanır?',
  'pageText.1c5cc230':
    'Sıfır genişlikli boşluklar (U+200B), sıfır genişlikli birleştiriciler (U+200D), birleştirmeyen karakterler (U+200C), bayt sırası işaretleri (U+FEFF), yumuşak kısa çizgiler (U+00AD) ve yön işaretleri saptanır.',
  'pageText.07f01c24': "cURL'den Axios'a Dönüştürücü ne yapar?",
  'pageText.d549d86a':
    'Terminal cURL komutlarını temiz JavaScript veya TypeScript Axios kod parçalarına dönüştürür.',
  'pageText.9968e572':
    'Evet, tüm dönüştürme işlemleri tamamen tarayıcınızda yerel olarak gerçekleşir.',
  'pageText.6d5cdf50': "Fetch'i cURL'e nasıl dönüştürürüm?",
  'pageText.daf0662a':
    'fetch() kod parçanızı yapıştırın; araç biçimlendirilmiş cURL komutunu otomatik olarak üretir.',
  'pageText.5847b1ec': 'Başlıkları ve POST gövdelerini destekliyor mu?',
  'pageText.5ad9f567':
    'Evet; başlıklar, HTTP yöntemleri ve JSON gövdeleri tamamen ayrıştırılıp korunur.',
  'pageText.8215376e': "JSON'dan XML'e dönüştürme nasıl çalışır?",
  'pageText.92a5e19e':
    'JSON anahtarlarını ve değerlerini özyinelemeli olarak geçerli XML öğelerine ve özniteliklerine dönüştürür.',
  'pageText.5ed08f30': 'Kök XML etiketini özelleştirebilir miyim?',
  'pageText.4df315df':
    'Evet, istediğiniz kök etiketini ve dizi öğesi etiket adını belirleyebilirsiniz.',
  'pageText.293797b5': "Excel veya Google Sheets'ten doğrudan yapıştırabilir miyim?",
  'pageText.168c9958':
    'Evet, tablo hücrelerini kopyalayıp doğrudan düzenleyiciye yapıştırabilirsiniz.',
  'pageText.e63c6336': 'Sayılar ve boole değerleri otomatik ayrıştırılır mı?',
  'pageText.e46b649e':
    'Evet, sayısal değerler ve true/false değerleri otomatik olarak yerel JSON türlerine ayrıştırılır.',
  'pageText.a6ffb0f2': 'İç içe JSON nesnelerini destekliyor mu?',
  'pageText.9c66d528':
    'Evet, iç içe nesneler noktalı gösterim kullanan anahtarlarla otomatik olarak düzleştirilir.',
  'pageText.8faf9499': 'CSV veya TSV olarak dışa aktarabilir miyim?',
  'pageText.ee9682fe':
    'Evet; virgül, sekme veya noktalı virgülle ayrılmış değerler arasından seçim yapın.',
  'pageText.a1264c1a': 'Özel fotoğrafları dönüştürmek güvenli mi?',
  'pageText.fba7c3f6':
    'Evet, tüm görsel işleme HTML5 Canvas ile tarayıcınızda yerel olarak çalışır. Fotoğraflarınız cihazınızdan ayrılmaz.',
  'pageText.2192ee7b': 'Hangi biçimler destekleniyor?',
  'pageText.893d1681': 'PNG, JPEG, WebP, AVIF, BMP ve ICO.',
  'pageText.7ae5d66d': "PDF'yi oluşturmadan önce görselleri yeniden sıralayabilir miyim?",
  'pageText.c48f2df7':
    'Evet, sayfa sırasını düzenlemek için her küçük görseldeki ok düğmelerini kullanın.',
  'pageText.1028470b': 'Görsellerim bir sunucuya yükleniyor mu?',
  'pageText.43031004':
    'Hayır, PDF belgesi oluşturma tamamen tarayıcınızda istemci tarafında çalışır.',
  'pageText.cafd399d': "Bu, JSON'dan Golang struct oluşturucusuyla aynı mı?",
  'pageText.60309daa':
    "Evet. Go'ya sıklıkla Golang denir; bu tek araç, iç içe nesneler ve diziler dahil herhangi bir JSON örneğinden json etiketleri içeren struct tanımları oluşturur.",
  'pageText.02bd6e0d': 'Kök modelin adını seçebilir miyim?',
  'pageText.53e10075':
    'Evet. Düzenleyicinin üzerinde kök model adını belirleyin. İç içe nesneler JSON anahtarlarına göre adlandırılır; en üst düzey nesne dizisi ise ilk öğesine göre modellenir.',
  'pageText.5a4c5407': 'Çıktı serde derive makrolarını içeriyor mu?',
  'pageText.fa083659':
    "Evet. Her struct; Serialize ve Deserialize (ayrıca Debug, Clone ve Default) türetir ve özgün JSON anahtarlarını korumak için serde rename özniteliklerini kullanır. Projenize serde ve serde_json crate'lerini ekleyin.",
  'pageText.9c425ac2': 'Oluşturucu struct mı, sınıf mı üretir?',
  'pageText.7fc8b986':
    "Struct üretir. Her JSON nesnesi, Codable ve Identifiable protokollerine uyan bir struct'a dönüşür; iç içe nesneler de iç içe struct türleri olur. Uygulamada kullanmadan önce özellik adlarını ve isteğe bağlı değerleri inceleyin.",
  'pageText.8f6dab1d': 'Çıktı hangi Kotlin serileştirme kütüphanesini hedefliyor?',
  'pageText.57ebd790':
    'kotlinx.serialization. Oluşturulan her veri sınıfına @Serializable, JSON alan adlarını korumak için her özelliğe de @SerialName eklenir.',
  'pageText.cce3877b': 'Sınıflar yerine C# record oluşturabilir miyim?',
  'pageText.d0862846':
    "Evet. [property: JsonPropertyName] öznitelikleri içeren konumsal record'lar için çıktı stilini Record olarak değiştirin veya get ve set özellikleri olan değiştirilebilir sınıflar için Class seçeneğini koruyun. İki stilde de iç içe nesneler ayrı türler oluşturur.",
  'pageText.ffb3fe14': 'Dönüştürücü Ingress veya ConfigMap kaynakları oluşturur mu?',
  'pageText.cd91ea98':
    'Hayır. Algılanan her Compose hizmeti için yer tutucu görsel etiketleri ve 80 numaralı portla başlangıç Deployment ve ClusterIP Service kaynakları oluşturur. Bildirimleri kümeye uygulamadan önce görselleri, portları, ortamı ve birimleri ayarlayın; Ingress, ConfigMap, Secret, yoklamalar ve kaynak sınırlarını kendiniz ekleyin.',
  'pageText.9eac6229': 'Unix zaman damgası nedir?',
  'pageText.1487701c':
    "Unix zaman damgası, Unix başlangıcı olarak da bilinen 1 Ocak 1970'ten (UTC) beri geçen saniye sayısıdır.",
  'pageText.0789772f': 'Saniye mi, milisaniye mi kullanmalıyım?',
  'pageText.a0e3b7cc':
    "Unix araçları ve birçok sunucu API'si genellikle saniye kullanır; JavaScript Date.now() ise milisaniye döndürür. Bu nedenle güncel bir değer saniye olarak yaklaşık 10, milisaniye olarak 13 basamaklıdır. Basamak sayısıyla tahmin etmek yerine birimi açıkça seçin.",
  'pageText.2eb9e432': 'Saat dilimleri nasıl işlenir?',
  'pageText.3d5ad092':
    'Zaman damgası çıktısı ISO 8601 UTC değeri olarak ve tarayıcı saat dilimini kullanan yerel değer olarak gösterilir. Metni zaman damgasına dönüştürürken hedeflenen anın belirsiz olmaması gerekiyorsa Z veya açık bir saat farkı ekleyin.',
  'pageText.1bc9c5b5': 'Unix zaman damgası dönüşümü nasıl çalışır?',
  'pageText.0fe51e8a':
    'Unix zaman damgası, 1970-01-01T00:00:00Z anına göre bir zamanı tanımlar. Dönüştürücü, seçilen saniye veya milisaniye biriminde tam sayı kabul eder, bunu ISO 8601 UTC metnine dönüştürür ve aynı anı tarayıcının yerel saat diliminde de biçimlendirir. Ters dönüşüm, tarih metnini ayrıştırır ve seçilen başlangıç zamanı birimini döndürür.',
  'pageText.2dc0bf0f': 'Saniye ve milisaniye için uygulamalı örnek',
  'pageText.aae8bcfb':
    '1704110400 saniye ve 1704110400000 milisaniye zaman damgaları aynı anı temsil eder: 2024-01-01T12:00:00.000Z. Yanlış birim seçimi, değeri amaçlanan tarihten çok uzağa taşır veya geçersiz kılar. Negatif zaman damgaları, Unix başlangıcından önceki desteklenen tarihleri temsil edebilir.',
  'pageText.eee856bc': 'Ayrıştırma sınırları ve hassasiyet',
  'pageText.6d9f9cca':
    "Zaman damgası girdisi, JavaScript'in güvenli aralığında işaretli bir tam sayı olmalıdır. Kesirler, üslü gösterim ve güvenli aralık dışındaki tam sayılar reddedilir.",
  'pageText.38a39d56':
    'Z veya açık sayısal saat farkı içermeyen tarih metinleri tarayıcının yerel saat diliminde yorumlanabilir; tekrarlanabilir dönüşüm için saat farkı ekleyin.',
  'pageText.8673caf8':
    'JavaScript Date, desteklediği takvim aralığını izler ve artık saniyeleri modellemez.',
  'pageText.77f27ab3':
    'Dönüştürme yerel olarak çalışır. Gösterilen yerel saat, cihazın saat dilimi yapılandırmasına ve tarayıcının erişebildiği tarihsel kurallara bağlıdır.',
  'pageText.9dce9428': 'HEX renk nedir?',
  'pageText.808cc6b3':
    'HEX renk, kırmızı, yeşil ve mavi kanallarını # işaretinden sonra her biri 00 ile FF arasında iki basamaklı üç onaltılık sayı olarak yazar. #FF5733; kırmızı 255, yeşil 87, mavi 51 anlamına gelir.',
  'pageText.e9871c7d': 'RGB ile HSL arasındaki fark nedir?',
  'pageText.33296696':
    'RGB, rengi içerdiği kırmızı, yeşil ve mavi ışık miktarlarıyla tanımlar. HSL, aynı rengi renk tonu açısı, doygunluk yüzdesi ve açıklık yüzdesiyle açıklar; bu, daha açık, koyu veya soluk çeşitler oluşturmayı kolaylaştırır.',
  'pageText.e28100f8': "HEX'i RGB'ye nasıl dönüştürürüm?",
  'pageText.fe0c27b9':
    'Altı basamağı çiftlere ayırın ve her çifti 16 tabanından dönüştürün: ilk basamağı 16 ile çarpıp ikinciyi ekleyin. #1E90FF için 1E = 30, 90 = 144, FF = 255 olur; yani rgb(30, 144, 255).',
  'pageText.84f954db': '#FFF neden kabul edilmiyor?',
  'pageText.ee7c794e':
    'HEX alanı altı basamak bekler. Her basamağı iki kez yazarak 3 basamaklı kısa gösterimi genişletin: #FFF, #FFFFFF; #0AF, #00AAFF olur.',
  'pageText.b67270be': 'Saydamlık içeren renkleri dönüştürebilir miyim?',
  'pageText.4f6be07c':
    'Bu araçla yapılamaz. Opak renkleri dönüştürür; bu nedenle 8 basamaklı HEX, rgba() ve hsla() değerleri desteklenmez. Renk bölümünü burada dönüştürüp alfa değerini kendiniz ekleyin; örneğin rgb(59 130 246 / 50%).',
  'pageText.9ce1a868': 'Tamamlayıcı renk nedir?',
  'pageText.086acf39':
    'Renk çarkındaki karşı renktir: aynı doygunluk ve açıklık korunur, renk tonu 180 derece döndürülür. Palet paneli bunu benzer, üçlü ve ayrık tamamlayıcı seçeneklerle birlikte oluşturur.',
  'pageText.e95a3278': 'HEX, RGB ve HSL ilişkisi',
  'pageText.b8e6ba16':
    'Üç biçim de aynı sRGB renklerini açıklar. RGB; kırmızı, yeşil ve mavi kanallarını 0 ile 255 arasında listeler. HEX, aynı üç kanalı iki basamaklı onaltılık çiftlerle yazar; dolayısıyla #3B82F6, rgb(59, 130, 246) olur: 3B = 59, 82 = 130, F6 = 246. HSL; rengi renk tonu (renk çarkında 0 ile 360 arasında açı), %0 ile %100 arasında doygunluk ve %0 ile %100 arasında açıklıkla tanımlar. Aynı mavi hsl(217, 91%, 60%) olur. HSL, çeşitler için kullanışlıdır: daha açık veya koyu ton elde etmek için renk tonunu ve doygunluğu koruyup yalnızca açıklığı değiştirin.',
  'pageText.9bb0180e': 'Biçimler arasında elle dönüştürme',
  'pageText.20dfb288':
    "HEX'ten RGB'ye dönüşüm için altı onaltılık basamağı üç çifte ayırıp her çifti 16 tabanından dönüştürün. #FF5733 için FF = 15 x 16 + 15 = 255, 57 = 5 x 16 + 7 = 87 ve 33 = 3 x 16 + 3 = 51 olur; sonuç rgb(255, 87, 51) değeridir. RGB'den HEX'e dönüşümde her kanalı onaltılığa dönüştürüp tek basamakların başına sıfır ekleyin; böylece rgb(0, 128, 255), #0080FF olur. HSL dönüşümü daha fazla aritmetik gerektirir; dönüştürücü burada zaman kazandırır.",
  'pageText.c627f2e0': 'Yuvarlama ve gidiş-dönüş dönüşümleri',
  'pageText.9f7b1c2c':
    "HSL değerleri tam sayılara yuvarlanır ve her RGB kanalı yalnızca 256 düzey içerir; bu nedenle yakın birkaç HSL değeri aynı RGB rengine eşlenir. HSL'den RGB'ye ve geri dönüştürmek, değeri bir birim kaydırabilir. Kesin değerler önemliyse tarayıcının çizdiği değer olduğu için HEX veya RGB değerini esas alın.",
  'pageText.d798a9e9': 'Desteklenen girdi ve çıktı',
  'pageText.b62d0366': 'HEX girdisi, başında # olsun veya olmasın altı basamak gerektirir.',
  'pageText.809bb2a0':
    'RGB ve HSL alanları tam sayıları kabul eder ve geçerli aralıklarıyla sınırlanır.',
  'pageText.9800df6a':
    'Alfa kanalları, rebeccapurple gibi adlandırılmış renkler, CMYK ve oklch() gibi yeni CSS renk uzayları dönüştürülmez.',
  'pageText.34fe3200':
    'Kopyalanan değerler #3B82F6, rgb(59, 130, 246) ve hsl(217, 91%, 60%) gibi CSS sözdizimini kullanır; böylece doğrudan stil sayfasına yapıştırılabilir.',
  'pageText.03fd111c':
    'Palet örnekleri renk tonunu döndürür: tamamlayıcı 180 derece, benzer artı veya eksi 30, üçlü 120 ve 240, ayrık tamamlayıcı 150 ve 210 derece. HEX değerini kopyalayıp yüklemek için örneğe tıklayın.',
  'pageText.ad112684': 'Aralık nedir?',
  'pageText.3ed8b237':
    'Roma rakamları 1 ile 3999 arasındaki sayıları gösterebilir. Bunun ötesinde özel gösterim gerekir.',
  'pageText.646816d5': 'Sayılar nasıl oluşturulur?',
  'pageText.2ae173d7':
    'Roma rakamları I, V, X, L, C, D, M harflerini kullanarak toplamalı (VI = 6) ve çıkarmalı (IV = 4) gösterim uygular.',
  'pageText.4c9566cb': 'Dönüştürücü IIII veya IC gibi biçimleri kabul eder mi?',
  'pageText.7dbeba2f':
    'Hayır. Çözücü standart Roma rakamı yazımını kabul eder; bu nedenle 4, IV; 99, XCIX olmalıdır. Standart dışı veya hatalı biçimler doğrulama hatası üretir.',
  'pageText.661774c4': 'Roma rakamı dönüştürücü nasıl çalışır?',
  'pageText.a2601719':
    'Sayıdan Roma rakamına modu, onluk tam sayıyı geleneksel çıkarmalı IV, IX, XL, XC, CD ve CM çiftleriyle standart Roma simgelerine eşler. Roma rakamından sayıya modu, simgeleri okur, değerlerini hesaplar ve sonuç döndürmeden önce girdinin o değerin standart yazımı olduğunu doğrular.',
  'pageText.3ab2deeb': 'Roma rakamı dönüşüm örnekleri',
  'pageText.0cd38bbc':
    "4 sayısı IV, 49 XLIX, 1994 MCMXCIV ve 2026 MMXXVI olur. Ters modda aynı Roma değerleri yeniden 4, 49, 1994 ve 2026'ya dönüşür.",
  'pageText.e190ddca':
    'Çıkarmalı gösterim, izin verilen çiftlerde küçük simgeyi büyük simgenin önüne yerleştirir. Örneğin IX, 9; CM, 900 anlamına gelir. Diğer değerler toplamayla oluşturulur; dolayısıyla VIII, 5 + 1 + 1 + 1 yani 8 anlamına gelir.',
  'pageText.f97dd159': 'Aralık ve doğrulama kuralları',
  'pageText.0edecea6':
    'Bu dönüştürücü, üst çizgi veya genişletilmiş gösterim olmadan kullanılan yaygın aralık olan 1 ile 3999 arasındaki tam sayıları destekler. Sıfır, negatif değerler, ondalıklar ve 3999 üzerindeki sayılar standart dışı bir sonuç verilmek yerine reddedilir.',
  'pageText.8e949328':
    'Roma rakamı girdisi büyük-küçük harfe duyarsızdır; ancak standart biçimde olmalıdır. Dönüştürücü, geçersiz tekrarları ve IIII veya IC gibi standart dışı kısaltmaları reddeder. Bu sıkı doğrulama, tanınan bir Roma rakamını yalnızca Roma rakamı harfleri içeren metinden ayırmaya yardımcı olur.',
  'pageText.bcefa6b3': 'Hangi sayı tabanları destekleniyor?',
  'pageText.7414cdc4':
    'Bu araç onluk (10 tabanı), onaltılık (16 tabanı), sekizlik (8 tabanı) ve ikilik (2 tabanı) sistemleri destekler.',
  'pageText.b72bd2ab': 'Ön ekleri nasıl kullanırım?',
  'pageText.0e908091':
    'Onaltılık için 0x, sekizlik için 0o, ikilik için 0b gibi ön ekler kullanabilirsiniz. Bunlar otomatik işlenir.',
  'pageText.fc1aa399': 'Number.MAX_SAFE_INTEGER değerinden büyük tam sayıları dönüştürebilir mi?',
  'pageText.1a04613d':
    'Evet. Dönüştürme BigInt kullanır ve girdinin tamamını doğrular; böylece büyük tam sayılar yuvarlanmak yerine korunur. Tarayıcının yanıt vermeye devam etmesi için girdiler 10.000 basamakla sınırlıdır; kesirler bilerek desteklenmez.',
  'pageText.6c46d667': "Protokol içermeyen URL'leri ayrıştırabilir mi?",
  'pageText.211d4985':
    'Evet. Protokol belirtilmemişse araç HTTPS varsayarak girdiyi ayrıştırmayı dener.',
  'pageText.a249117f': 'Tekrarlanan sorgu parametrelerini destekliyor mu?',
  'pageText.3fa7bebe': 'Evet. Tekrarlanan sorgu parametreleri korunur ve dizi olarak döndürülür.',
  'pageText.974f66ef': "Tam bir URL'yi ayrıştırabilir miyim?",
  'pageText.d840a415':
    'Evet. Tam bir URL yapıştırabilirsiniz; araç sorgu metni bölümünü çıkarıp ayrıştırır.',
  'pageText.de982fa1': 'Tekrarlanan anahtarları destekliyor mu?',
  'pageText.aacf5366': 'Evet. Ayrıştırma sırasında tekrarlanan anahtarlar dizi olarak korunur.',
  'pageText.5ec1335a': '.env dosyasındaki değerler her zaman metin midir?',
  'pageText.f1c07be7':
    'Ortam değişkenleri, süreç sınırında metindir. İsteğe bağlı tür çıkarımı, JSON çıktısı için kolaylık sağlar ve yalnızca açık boole değerlerini, JSON biçimindeki sayıları ve null değerini dönüştürür. Metni birebir korumak önemliyse bunu kapalı tutun.',
  'pageText.a47731b1': 'Bir anahtar birden fazla tanımlandığında ne olur?',
  'pageText.683572e4':
    'Yaygın dotenv davranışına uygun olarak son tanım geçerli olur. Yinelenen tanımın gizlenmemesi için dönüştürücü iki satır numarasını da içeren bir uyarı gösterir.',
  'pageText.837b99bd': 'Bu araç ${HOST} gibi değişkenleri genişletir mi?',
  'pageText.40d37465':
    'Hayır. Değerleri ayrıştırır; ancak bilerek değişken yerleştirme yapmaz, kabuk ifadelerini çalıştırmaz, dosya okumaz ve sunucuyla iletişim kurmaz. Genişletme davranışı dotenv yükleyicilerine göre farklıdır ve hedef çalışma ortamında test edilmelidir.',
  'pageText.2c76582a': '.env ve JSON dönüştürücü neleri destekler?',
  'pageText.4f2d45bf':
    ".env'den JSON'a modunda ayrıştırıcı; boş satırları, yorumları, isteğe bağlı export ön eklerini, yaygın ortam değişkeni adlarını, tırnaksız değerleri ve tek, çift veya ters tırnak içindeki değerleri kabul eder. Çift tırnak içindeki satır sonu, satır başı, sekme, tırnak ve ters eğik çizgi kaçışları çözülür. Tırnaklı değerler birden fazla satıra yayılabilir; tırnak dışındaki satır içi yorumlar kaldırılır.",
  'pageText.c5c8e5b3': 'Tür çıkarımı ve yinelenenleri işleme',
  'pageText.1f8452da':
    'Varsayılan olarak ayrıştırılan her ortam değeri metin olarak kalır; bu, işletim sistemlerinin süreç değişkenlerini sunma biçimini yansıtır.',
  'pageText.6b7c8875':
    'İsteğe bağlı tür çıkarımı true, false, null ve belirsiz olmayan JSON biçimindeki sayıları dönüştürür; 0012 gibi değerler baştaki sıfırları korumak için metin kalır.',
  'pageText.49af1e34':
    'Bir anahtar birden çok kez geçerse son değer üretilir ve uyarı, yinelenen tanımları belirtir.',
  'pageText.108380d1':
    'JSON çıktısı, prototip güvenli bir sözlük kullanır; böylece __proto__ gibi özel adlar sıradan veri anahtarları olarak kalır.',
  'pageText.f9bf5831': 'JSON, dotenv metni olarak nasıl yazılır?',
  'pageText.7723ffc4':
    "JSON'dan .env'ye modu, anahtarları geçerli ortam değişkeni adları olan en üst düzey nesne gerektirir. Metinler çift tırnağa alınır ve kaçışlı yazılır; sayılar ve boole değerleri sabit olarak yazılır. null, uyarıyla boş metne; diziler veya iç içe nesneler tırnaklı JSON metinlerine dönüşür. Yapılandırılmış değerleri inceleyin; bunların yeniden ayrıştırılıp ayrıştırılmayacağını ve nasıl ayrıştırılacağını alan uygulama belirler.",
  'pageText.601a8514': 'Gizlilik ve sözdizimi farklılıkları',
  'pageText.232534d5':
    'Dönüştürme tarayıcıda çalışır ve bu araç alan değerlerini yüklemez. Dotenv sözdizimi, uygulamalar arasında farklar içeren bir gelenektir: değişken yerleştirme, komut ikamesi, export işleme ve kaçış kuralları Node.js, Docker, kabuklar ve çerçeveye özgü yükleyiciler arasında değişebilir. Oluşturulan dosyayı onu kullanacak çalışma ortamıyla doğrulayın ve üretim kimlik bilgileri yerine hassas bilgileri temizlenmiş örnekleri tercih edin.',
  'pageText.5de3368a': "React'teki SVG öznitelikleri nasıl işlenir?",
  'pageText.cff1c703':
    'Kısa çizgili tüm HTML/SVG öznitelikleri (stroke-width, fill-rule, clip-path gibi), geçerli React camelCase biçimine (strokeWidth, fillRule, clipPath) dönüştürülür; class ise className olur.',
  'pageText.8b4e6d97': 'TypeScript ve forwardRef destekleniyor mu?',
  'pageText.a1b09414':
    'Evet! TypeScript arayüzlerini, forwardRef sarmalayıcılarını ve standart prop yayma işlemlerini tek tıklamayla açıp kapatabilirsiniz.',
  'pageText.354d5c2b': 'CSS clamp() nasıl çalışır?',
  'pageText.b2935b68':
    'clamp(min, preferred, max) fonksiyonu, görünüm alanı genişliğine (vw) dayanan tercih edilen değeri minimum ve maksimum sınırlar arasında tutar.',
  'pageText.b872cb54': 'Neden akışkan tipografi kullanılır?',
  'pageText.4477ab71':
    'Akışkan tipografi, sabit medya sorgusu kırılma noktaları arasında ani sıçramalar yapmadan metni ekran boyutlarına göre yumuşak biçimde ölçekler.',
  'pageText.5025653d': 'Hangi docker run bayrakları destekleniyor?',
  'pageText.1aff160c':
    'Dönüştürücü; -p/--publish, -v/--volume, -e/--env, --name, --restart, --network, -w/--workdir, -u/--user, --privileged dahil bayrakları ve konteyner komutu bağımsız değişkenlerini ayrıştırır.',
  'pageText.edeb7b4c': 'Çıktı modern Docker Compose için geçerli mi?',
  'pageText.34af0ae3': 'Evet, oluşturulan YAML modern Docker Compose belirtiminin biçimini izler.',
  'pageText.657d05ae': 'Hangi SQL çeşitleri destekleniyor?',
  'pageText.9519e5df':
    'Dönüştürücü PostgreSQL, MySQL, SQLite ve Microsoft SQL Server çeşitlerini destekler.',
  'pageText.81282e94': 'Veri türleri nasıl çıkarılır?',
  'pageText.35a0c93d':
    'Uygun sütun veri türlerini belirlemek için tüm satırlardaki sayılar, boole değerleri, ISO tarih metinleri, nesneler ve metin uzunlukları analiz edilir.',
  'pageText.7abbc1c1': 'REM hesaplamasında standart temel yazı tipi boyutu nedir?',
  'pageText.6b49dd1e':
    "Tarayıcının standart varsayılan kök yazı tipi boyutu 16px'tir (1rem = 16px). CSS'iniz html { font-size: 62.5%; } (10px temel) veya başka ölçekler belirtiyorsa araçta bu temeli özelleştirebilirsiniz.",
  'pageText.3ea4c69b': 'REM ile EM arasındaki fark nedir?',
  'pageText.f8a454cb':
    'REM (Root EM), kök <html> öğesinin font-size değerine; EM ise doğrudan üst kapsayıcının font-size değerine göredir.',
  'pageText.2d5d624d': "Bu araç TSV'yi (sekmeyle ayrılmış değerler) destekliyor mu?",
  'pageText.8dd82b44':
    'Evet. Excel veya Google Sheets gibi elektronik tablo uygulamalarından doğrudan kopyalanan virgülle veya sekmeyle ayrılmış verileri yapıştırabilirsiniz.',
  'pageText.6e30c9b1': "Markdown tablolarını yeniden CSV'ye dönüştürebilir miyim?",
  'pageText.e858f5f7':
    'Evet, Markdown tablosunu standart virgülle ayrılmış biçime yeniden ayrıştırmak için "MD ➔ CSV Eşitle" düğmesine tıklayın.',
  'pageText.ccff8026': 'Tablo başlıkları nasıl saptanır?',
  'pageText.d4655a54':
    'Dönüştürücü, <th> veya <td> öğelerinin ilk satırını sonuçtaki JSON nesnelerinin anahtarları olarak otomatik kullanır.',
  'pageText.79df7ff1': 'Nesneler yerine ham 2B dizi çıktısı alabilir miyim?',
  'pageText.9dd05233':
    'Evet, adlandırılmış anahtarlar içermeyen düz bir matris dizisi almak için çıktı biçimini "2B Dizi (Satırlar ve Sütunlar)" olarak değiştirin.',
  'pageText.939b6803': 'Bu araç birden fazla satırlı INSERT ifadelerini destekliyor mu?',
  'pageText.0495ce61':
    'Evet. Dönüştürücü, çok satırlı INSERT INTO table (col1, col2) VALUES (a, b), (c, d) ifadelerini sorunsuz işler.',
  'pageText.444bfcdc': 'Veri türleri (sayılar, boole, NULL) korunuyor mu?',
  'pageText.b9a181b3':
    'Evet. Sayılar, boole sabitleri (TRUE/FALSE) ve NULL değerleri otomatik olarak ayrıştırılıp yerel JSON veri türlerine dönüştürülür.',
  'pageText.40323ee8': 'En-boy oranı nasıl sadeleştirilir?',
  'pageText.cdbef1c9':
    "Hesaplayıcı, en basit tam sayı oranını üretmek için genişlik ile yüksekliğin en büyük ortak bölenini (EBOB) belirler (ör. 1920x1080, 16:9'a sadeleşir).",
  'pageText.bc6781c7': 'Orantılı yeniden boyutlandırma aracını nasıl kullanırım?',
  'pageText.b80cad0b':
    'Özgün genişlik ve yüksekliği girin; ardından tam orantılı hedef yüksekliği otomatik hesaplamak için yeni hedef genişliğinizi yazın.',
  'pageText.4b28a4e9': 'Hangi HTML öğeleri destekleniyor?',
  'pageText.276d9f0c':
    'Dönüştürücü; <h1>-<h6> başlıklarını, <strong>/<b> kalın, <em>/<i> italik metni, <a> bağlantılarını, <img> görsellerini, <blockquote> alıntılarını, <ul>/<ol>/<li> listelerini, <code>/ <pre> bloklarını ve <hr> yatay çizgilerini destekler.',
  'pageText.6e1afb74': 'HTML varlıklarının kodu çözülüyor mu?',
  'pageText.ba39602f':
    'Evet; &amp;, &lt;, &gt;, &quot; ve &#39; gibi yaygın varlıklar normal karakterlere dönüştürülür.',
  'pageText.3799edfe': 'Bu dönüştürücü kod sözdizimi etiketlerini korur mu?',
  'pageText.c2365433':
    'Evet. Kod blokları (```javascript ... ```) karakterleri doğru biçimde kaçışlı yazılmış <pre><code class="language-javascript"> biçimine dönüştürülür.',
  'pageText.8708ffd7': 'Oluşturulan HTML çıktısını indirebilir miyim?',
  'pageText.c459e434':
    'Evet, dönüştürülen belgenizi doğrudan .html dosyası olarak kaydetmek için indirme simgesine tıklayın.',
  'pageText.be3a3c63': 'Tarih farkı hesaplaması ne kadar hassas?',
  'pageText.d3b0d64f':
    "Hesaplamalar, yerleşik JavaScript Date API'si ve standart UTC zaman damgalarıyla milisaniye hassasiyetinde yapılır.",
  'pageText.af8c07b0': 'Zaman birimleri arasında dönüşüm yapabilir miyim (ör. saatten saniyeye)?',
  'pageText.8b865303':
    'Evet. Etkileşimli birim dönüştürme bölümü, herhangi bir miktarı milisaniye, saniye, dakika, saat ve gün arasında aynı anda dönüştürmenizi sağlar.',
  'pageText.a9fedf31': "XML öznitelikleri JSON'a nasıl dönüştürülür?",
  'pageText.1c4c4809':
    'XML\'e geri dönüştürürken veriyi eksiksiz korumak için JSON nesnesindeki özniteliklerin başına "@" eklenir (ör. @id="101").',
  'pageText.fa379db8': "Dönüştürme yönünü JSON'dan XML'e değiştirebilir miyim?",
  'pageText.994016b7':
    'Evet, herhangi bir geçerli JSON nesnesini biçimlendirilmiş XML belgesine geri dönüştürmek için "JSON ➔ XML\'e Geç" seçeneğine tıklayın.',
  'pageText.8d1c8c14': 'Bu araç metin içindeki tek tırnakları kaçışlı yazar mı?',
  'pageText.d9f1c9ca':
    "Evet. Sözdizimi hatalarını önlemek için metin içindeki tek tırnaklar (ör. O'Connor) otomatik olarak çift tek tırnakla (standart SQL'de '') kaçışlı yazılır.",
  'pageText.3f01da3d': 'Sayı listelerini tırnaksız biçimlendirebilir miyim?',
  'pageText.4b94fcb9':
    'Evet! Tam sayı ve sayısal listeler için Tırnak Stili açılır menüsünden "Tırnaksız (Sayılar / Kimlikler)" seçeneğini seçin.',
  'pageText.3d22bc27': 'Bu araç saydam arka planları destekliyor mu?',
  'pageText.41464a2f':
    'Evet! PNG ve WebP biçimleri tam alfa saydamlığını destekler. Düz beyaz veya siyah arka planlar da seçebilirsiniz.',
  'pageText.c16e4c4a': 'Çözünürlük ölçekleri (2x, 4x) nasıl çalışır?',
  'pageText.e151b8c5':
    'Vektör SVG, ölçeklenmiş HTML5 Canvas üzerine doğrudan çizilir; böylece pikselleşmeden net, piksel hassasiyetinde yüksek DPI çıktısı elde edilir.',
  'pageText.b2fcc05a': 'PDF belgelerim herhangi bir sunucuya yükleniyor mu?',
  'pageText.aea89d9c':
    "Hayır! Kod çözme ve görüntüleme işlemlerinin tamamı, Blob URL'leri ve HTML5 korumalı iframe'leri kullanılarak tarayıcınızda yerel olarak gerçekleşir.",
  'pageText.2a1e46ea': 'data:application/pdf;base64 ön ekleri destekleniyor mu?',
  'pageText.28866c6e':
    'Evet. Dönüştürücü, Base64 girdinizdeki Veri URI ön eklerini ve fazla boşlukları otomatik olarak saptayıp kaldırır.',
  'pageText.9c3e5e8b': 'Hangi HTML öznitelikleri dönüştürülür?',
  'pageText.5c0146bd':
    '`class`, `className` biçimine; `for`, `htmlFor` biçimine; satır içi stiller nesne sözdizimine (`style={{ width: "100px" }}`) dönüştürülür. `stroke-width` gibi SVG öznitelikleri de `strokeWidth` biçimine dönüştürülür.',
  'pageText.1636cff7': 'Hangi veritabanı çeşitleri destekleniyor?',
  'pageText.1763f21a':
    'PostgreSQL (çift tırnaklı tanımlayıcılarla), MySQL (ters tırnaklı tanımlayıcılarla) ve genel standart SQL desteklenir.',
  'pageText.bc4069b3': "GraphQL'de iç içe nesneler nasıl işlenir?",
  'pageText.38249950':
    'İç içe JSON nesneleri ayrı GraphQL `type` tanımlarına çıkarılır ve alan adıyla otomatik olarak başvurulur.',
  'pageText.d1268a9b': "Bu araç TSV'deki sayıları ve boole değerlerini otomatik ayrıştırır mı?",
  'pageText.657e3a11':
    'Evet. Sayısal değerler ve boole metinleri (true/false), otomatik olarak yerel JSON ilkel türlerine dönüştürülür.',
  'pageText.ab767ca9': 'NDJSON ile JSON arasındaki fark nedir?',
  'pageText.ac640a73':
    'NDJSON, çevreleyen dizi parantezleri olmadan her satırda bir geçerli JSON nesnesi içerir; bu, büyük günlük kayıtlarının akış halinde işlenmesi için idealdir.',
  'pageText.d53f6e6d': 'Punycode nedir?',
  'pageText.932ba104':
    'Punycode, RFC 3492\'de tanımlanan ve Unicode karakterlerini "xn--" ön ekli ASCII karakter dizilerine dönüştüren kodlama sözdizimidir. Böylece İngilizce dışındaki alan adları eski DNS sistemleriyle çalışabilir.',
  'pageText.749281f3': 'Gerçek Mors kodu sesleri çalar mı?',
  'pageText.80d0a9ba':
    'Evet! Araç, Web Audio API ile standart 650Hz sinüs dalgası seslerini doğru nokta/çizgi zamanlamasıyla doğrudan tarayıcınızda üretir.',
  'pageText.5e8710c7': 'Hangi Apache yönergeleri destekleniyor?',
  'pageText.883d775d':
    'RewriteRule (R=301, L bayraklarıyla), Redirect 301, DirectoryIndex ve Header set yönergeleri desteklenir.',
  'pageText.e91fd411': 'CSV dosyası ne kadar büyük olabilir?',
  'pageText.55e80dd0':
    'İşleme tarayıcı belleğinizde yerel olarak gerçekleştiği için binlerce satırı gecikme olmadan işleyebilir.',
  'pageText.948016f8': "SQL veri türleri TypeScript'e nasıl eşlenir?",
  'pageText.73d3bf81':
    'INTEGER/FLOAT/DECIMAL, number; VARCHAR/TEXT/UUID, string; BOOLEAN, boolean; TIMESTAMP/DATE ise Date | string türüne eşlenir.',
  'pageText.b445da7f': 'İç içe nesneler .env anahtarlarına nasıl düzleştirilir?',
  'pageText.6c4dff36':
    'İç içe anahtarlar büyük harflerle, alt çizgilerle birleştirilir (ör. `{ database: { host: "..." } }`, `DATABASE_HOST="..."` olur).',
  'pageText.a7ac2f25': 'Tablo hücrelerinin içindeki virgül ve tırnakları işler mi?',
  'pageText.ad06bce3':
    'Evet. Virgül veya özel karakter içeren tüm hücreler, standart RFC 4180 çift tırnaklarıyla doğru biçimde kaçışlı yazılır.',
  'pageText.c0439e2b': 'Hangi SQL çeşitleri destekleniyor?',
  'pageText.9c661bd6':
    'Standart SQL, MySQL, MariaDB, PostgreSQL, SQLite, SQL Server (T-SQL), Oracle PL/SQL, BigQuery, Snowflake ve Trino/Presto desteklenir. Türe özgü sözdiziminin tanınması için sorgunuzun hedeflediğini seçin.',
  'pageText.898566a5': "SQL'i küçültebilir miyim?",
  'pageText.bf763dfa':
    'Evet. Küçült, boşluk karakterlerini tek boşluğa indirger; virgül, parantez, = ve noktalı virgül çevresindeki boşlukları kaldırır. Yorumları kaldırmaz; bu nedenle önce -- yorumlarını silin. Aksi halde aynı satırda bir yorumdan sonraki her şey yorum haline gelir.',
  'pageText.17bb729b': 'Biçimlendirme sorgumun yaptığı işi değiştirir mi?',
  'pageText.dfdbf373':
    'Hayır. Biçimlendirme yalnızca boşlukları ve anahtar sözcüklerin harf büyüklüğünü yeniden yazar. Tanımlayıcılar, metin sabitleri ve yan tümce sırası değişmez; sorgu hiçbir zaman çalıştırılmaz.',
  'pageText.e673de04': 'Neden ayrıştırma hatası alıyorum?',
  'pageText.f3989307':
    "Seçilen SQL çeşidi sözdiziminin bir bölümünü tanımıyordur veya tırnak, köşeli parantez ya da parantezler dengeli değildir. Sorgunun yazıldığı çeşide geçin. dbt veya Jinja'daki {{ }} gibi şablon sözdizimi ayrıştırılamayabilir.",
  'pageText.34719ea5': 'Sekmelerle girinti yapabilir miyim?',
  'pageText.81ba983d':
    'Çıktı her zaman boşluk kullanır. Girinti seçenekleri 2 boşluk, 4 boşluk veya 8 boşluk genişliğindeki sekme ayarıdır.',
  'pageText.568926d9': "SQL'im sunucuya gönderiliyor mu?",
  'pageText.4517bb93':
    'Hayır. Biçimlendirme, sql-formatter JavaScript kütüphanesiyle tarayıcınızda çalışır; veritabanı bağlantısı kurulmaz.',
  'pageText.9945834b': 'Biçimlendirici neleri değiştirir?',
  'pageText.0cac9d90':
    "Biçimlendirici, SQL'inizi seçilen çeşide göre belirteçlere ayırır ve düzeni yeniden oluşturur. Her ana yan tümce (SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT) ayrı satırda başlar; sütun listeleri ve koşullar altına girintilenir. Birden fazla ifade boş satırlarla ayrılır. Örneğin select id, name from users where active = 1 order by name; SELECT, FROM, WHERE ve ORDER BY'ın ayrı satırlarda, id ve name'in SELECT altında girintilendiği bir sorguya dönüşür. Anahtar sözcükler seçeneğe göre büyük veya küçük harfle yazılır. Tanımlayıcılar, sabitler ve yan tümcelerin sırası değişmez; sorgu bir veritabanı şemasına karşı doğrulanmaz.",
  'pageText.679a0218': 'Doğru SQL çeşidini seçme',
  'pageText.0dad3f3a':
    'SQL çeşitleri tırnak kullanımında, işleçlerde ve parametrelerde farklılık gösterir; biçimlendirici yalnızca seçtiğiniz çeşidin sözdizimini tanır. Biçimlendirme başarısızsa veya çıktı yanlış görünüyorsa önce çeşidin veritabanıyla eşleştiğini kontrol edin. Çeşitlere özgü sözdizimi örnekleri:',
  'pageText.94b6656c':
    'PostgreSQL: :: tür dönüşümleri, $1 konumsal parametreleri ve dolar tırnaklı fonksiyon gövdeleri.',
  'pageText.2c576f60': 'SQL Server (T-SQL): [bracketed identifiers], TOP ve @variables.',
  'pageText.8af13c1a': 'MySQL ve MariaDB: `backtick` tanımlayıcıları.',
  'pageText.ea0458f2':
    'BigQuery: ters tırnaklı project.dataset.table adları ve STRUCT veya ARRAY türleri.',
  'pageText.3fb5a202': 'Küçültme bir metin dönüşümüdür',
  'pageText.fcad398d':
    'Küçült, her boşluk dizisini tek boşluğa indirger ve virgül, parantez, = ve noktalı virgül çevresindeki boşlukları kaldırır. Ayrıştırılmış SQL yerine düz metinde çalışır; bunun iki sonucu vardır. Öncelikle yorumları kaldırmaz: -- yorumu satır sonuna kadar sürdüğünden bütün sorguyu tek satıra koymak, yorumdan sonraki her şeyi yorum haline getirebilir. Bu yüzden küçültmeden önce -- yorumlarını kaldırın veya /* */ biçimine dönüştürün. İkinci olarak, metin sabitlerindeki tekrarlanan boşluklar da indirgenir; metinlerin içindeki boşluklar önemliyse sonucu özgün metinle karşılaştırın.',
  'pageText.1191c370': 'Yorumlar ve birden fazla ifade',
  'pageText.3cf0e67e':
    'Biçimlendirme sırasında kod satırının sonundaki -- yorumu o satırda kalır; tam satır yorumları yerlerinde korunur. Noktalı virgülle ayrılan birden fazla ifade, aralarında boş satırlarla sırayla biçimlendirilir. Böylece bir geçiş veya başlangıç verisi betiğini tek seferde yapıştırıp ifade ifade inceleyebilirsiniz.',
  'pageText.367d147f': 'CSS ne kadar küçülebilir?',
  'pageText.62ddee05':
    'Stil sayfanıza bağlıdır. Yorumları ve fazla boşlukları kaldırıp aracın gösterdiği özgün ve çıktı sayılarını karşılaştırın. Zaten sıkıştırılmış CSS çok az değişebilir.',
  'pageText.95c1ec0d': 'Küçültülmüş CSS geçerli mi?',
  'pageText.5857bc9f':
    'Küçültme CSS ayrıştırıcısı kullanır ve kuralları yeniden yapılandırmayı kapatır; yine de dağıtımdan önce çıktıyı kendi sayfalarınızda kontrol etmelisiniz.',
  'pageText.ed466d2a': "Küçültme CSS'imin davranışını değiştirir mi?",
  'pageText.d268f9c7':
    'Değiştirmemelidir. Kuralları yeniden yapılandırma kapalıdır; bu nedenle seçiciler birleştirilmez ve kurallar yeniden sıralanmaz. Böylece basamaklı öncelik yazıldığı gibi kalır. Yalnızca #ffffff yerine #fff gibi eşdeğer kısa biçimler kullanılır.',
  'pageText.0f9b8560': 'Lisans yorumları korunacak mı?',
  'pageText.3a2460c3':
    'Yalnızca Yorumları kaldır seçeneğini kapatırsanız korunur. Seçenek açıkken /*! */ lisans başlıkları dahil her yorum kaldırılır. Kapalıyken tüm yorumlar yerlerinde kalır.',
  'pageText.f6ab050a': 'CSS küçültmesini geri alabilir miyim?',
  'pageText.f9981fd3':
    'Satır sonlarını ve girintileri yeniden eklemek için Güzelleştir seçeneğini kullanın. Özgün yorumlar ve birebir biçimlendirme, kaldırıldıktan sonra geri getirilemez.',
  'pageText.e39c55b7': "CSS'im yükleniyor mu?",
  'pageText.5c9957b9':
    'Hayır. CSSO tarayıcınızda çalışır; stil sayfası cihazınızda küçültülür ve sunucuya gönderilmez.',
  'pageText.9649813f': 'Derleme düzeninizi değiştirmeden CSS küçültme',
  'pageText.de9a37b9':
    "Stil sayfasını yapıştırın, yorumların kaldırılıp kaldırılmayacağına karar verin ve Küçült seçeneğini seçin. CSSO, karakterleri düzenli ifadelerle silmek yerine CSS'i sözdizimi ağacına ayrıştırır ve sıkıştırılmış biçimde yeniden yazar. Kuralları yeniden yapılandırma kapalı olduğundan seçiciler birleştirilmez, kurallar taşınmaz. Gösterilen azalma, karakter sayılarını karşılaştırır; sıkıştırılmış ağ aktarımı boyutu değil, tasarruf edilen metnin tahminidir.",
  'pageText.67066e30': 'Neler küçülür?',
  'pageText.05d17ac2': 'Belirteçler arasındaki boşluklar, satır sonları ve girintiler kaldırılır.',
  'pageText.190686bf':
    'Her bildirim bloğunun son noktalı virgülü atılır: .a { color: red; }, .a{color:red} olur.',
  'pageText.c6a90a1b':
    'Varsa renkler daha kısa eşdeğer biçimde yazılır; örneğin #ffffff, #fff olur.',
  'pageText.5abe9013':
    'Sıfır uzunluklardan birimler kaldırılır; dolayısıyla margin: 0px 0px, margin:0 0 olur.',
  'pageText.8fb6a9bc':
    'Yorumları kaldır açıkken /*! */ lisans başlıkları dahil tüm yorumlar silinir.',
  'pageText.354dff68':
    "Bunun dışında seçiciler ve değerler yazıldığı gibi korunur. Küçültücü, stil sayfasını kullanan HTML'i göremediği için kullanılmayan kurallar saptanmaz veya kaldırılmaz.",
  'pageText.704bf1fa': 'Çıktıyı güvenle kullanma',
  'pageText.2ebe9c56':
    "Küçültülmüş CSS'i bir test derlemesine kopyalayın ve etkilenen sayfaları ilgili ekran boyutlarında kontrol edin.",
  'pageText.ab5ace02':
    'Küçültmeden önce Yorumları kaldır seçeneğini kapatarak gerekli lisans yorumlarını koruyun.',
  'pageText.889b86fa':
    "Güzelleştir'i okumayı kolaylaştırmak için kullanın; ayrıştırıcı tabanlı küçültmeden ayrı olduğu için biçimlendirmeden sonra karmaşık CSS'i inceleyin.",
  'pageText.4040b973':
    'Küçültme, sunucu sıkıştırmasının yerini almak yerine onunla birlikte çalışır: gzip veya Brotli, küçültülmüş dosyayı aktarım sırasında daha da küçültür.',
  'pageText.8111e866': 'Ne zaman derleme aracı kullanılmalı?',
  'pageText.4d2afabc':
    "Projeniz zaten paketleyici veya çerçeve kullanıyorsa CSS küçültme genellikle orada, örneğin Lightning CSS, cssnano veya esbuild ile yapılandırılır ve her derlemede çalışır. Bu araç tek seferlik stil sayfalarına, CMS veya tema dosyalarına, üçüncü taraf bileşenlere yapıştırılan CSS'e ve küçültücünün belirli bir kurala ne yaptığını hızlıca kontrol etmeye uygundur. Belge başlığındaki stil sayfaları yüklenene kadar çizimi engeller; bu nedenle küçük dosyalar yavaş bağlantılarda ilk çizime yardımcı olur. Yine de kullanılmayan kuralları kaldırmak çoğu zaman yalnızca küçültmeden daha fazla tasarruf sağlar.",
  'pageText.d083d747': 'Hangi iyileştirmeler uygulanır?',
  'pageText.e796e2d2':
    'Terser boşlukları, isteğe bağlı noktalı virgülleri ve yorumları kaldırır; sabit ifadeleri hesaplar, erişilemeyen kodu çıkarır ve koşulları sadeleştirir. İsteğe bağlı ayarlar console.* çağrılarını ve debugger ifadelerini kaldırır, true ve false değerlerini !0 ve !1 olarak kısaltır.',
  'pageText.6feece85': 'Bunu üretim için kullanmalı mıyım?',
  'pageText.f02032e4':
    'Bu araç, ayrıştırıcıya dayalı JavaScript küçültme için Terser kullanır. Üretim derlemelerinde yine de küçültmeyi Webpack, Rollup veya esbuild gibi bir paketleyiciye dahil etmelisiniz.',
  'pageText.9996cfd4': 'Küçültme kodumu bozar mı?',
  'pageText.1d35f0cc':
    "Terser yalnızca geçerli JavaScript'in davranışını koruyan dönüşümleri uygular. Sorunlar genellikle Function.prototype.toString() okumak gibi kendi kaynağını inceleyen koddan veya gerçekten iş yapan console çağrılarının kaldırılmasından kaynaklanır. Dağıtmadan önce çıktıyı test edin.",
  'pageText.a33aea1e': "JavaScript'ten console.log'u nasıl kaldırırım?",
  'pageText.851f8ba7':
    'console.* kaldır seçeneğini etkinleştirip küçültün. console.error ve console.warn dahil her console yöntem çağrısı, bağımsız değişkenleriyle birlikte kaldırılır. Derlemede, Terser seçeneklerinde compress.drop_console ayarını kullanın.',
  'pageText.e005a375': 'Değişken adlarım neden kısaltılmıyor?',
  'pageText.1c73417a':
    'Ad kısaltma kapalıdır; bu nedenle kaynak haritaları olmadan hata ayıklama için çıktı okunabilir tanımlayıcıları korur. Paketleyiciler üretimde genellikle ad kısaltmayı etkinleştirir; bu, daha fazla bayt tasarrufu sağlar.',
  'pageText.a4388952': 'TypeScript veya JSX küçültebilir miyim?',
  'pageText.8bff2c76':
    'Hayır. Terser yalnızca JavaScript ayrıştırır; bu yüzden tür açıklamaları ve JSX sözdizimi hatası oluşturur. Önce kodu tsc, esbuild, Babel veya SWC ile derleyin; ardından JavaScript çıktısını küçültün.',
  'pageText.56b9f99f': 'Küçültücü kodunuza ne yapar?',
  'pageText.55103bdf':
    'Terser kodu sözdizimi ağacına ayrıştırır, sıkıştırma geçişleri uygular ve sonucu gereksiz boşluklar olmadan yazar. Sıkıştırma, sabitleri hesaplar, erişilemeyen kodu ve kullanılmayan yerel değişkenleri kaldırır, koşulları kısaltır ve güvenli yerlerde ifadeleri birleştirir. Kod düzenli ifadelerle düzenlenmek yerine ayrıştırıldığından metinler, düzenli ifadeler ve şablon sabitleri korunur. Örneğin function add(a, b) { return a + b; } // sum, function add(a,b){return a+b} olur. Boole değerlerini kısalt açıkken const ok = true;, const ok=!0; olur.',
  'pageText.0ee8f397': 'Seçeneklerin açıklaması',
  'pageText.0a5da22e':
    'Yorumları Kaldır: /*! */ lisans başlıkları dahil her yorumu kaldırır. Örneğin lisans bildirimin kodla birlikte kalmasını gerektiriyorsa tüm yorumları korumak için kapatın.',
  'pageText.3fbd5c3f':
    'console.* Kaldır: console.log, console.warn ve console.error gibi çağrıları bağımsız değişkenleriyle birlikte kaldırır; bu çağrıların içindeki yan etkilere güvenmeyin.',
  'pageText.d5ef0e31': 'debugger Kaldır: debugger ifadelerini siler.',
  'pageText.0f7a6693':
    'Boole Değerlerini Kısalt: true ve false değerlerini !0 ve !1 olarak yeniden yazar ve boole ifadelerini sadeleştirir.',
  'pageText.281f8120': 'Bu araç neleri yapmaz?',
  'pageText.c178c0f1':
    'Değişkenleri yeniden adlandırmaz (ad kısaltma kapalıdır); dolayısıyla çıktı tipik üretim paketinden daha büyüktür, ancak hata ayıklaması daha kolaydır.',
  'pageText.c4a6b403':
    'Kaynak haritası oluşturmaz veya diğer dosyalardan içe aktarımları paketlemez.',
  'pageText.d46a72e1': 'Yalnızca JavaScript kabul eder; TypeScript ve JSX önce derlenmelidir.',
  'pageText.059e3a00':
    'Modern sözdizimini eski tarayıcılara uygun biçime dönüştürmez. İsteğe bağlı zincirleme, sınıf alanları ve benzeri özellikler yazıldığı gibi kalır; bu gerekiyorsa hedef belirleyerek Babel veya esbuild kullanın.',
  'pageText.f406cb39':
    "Güzelleştir, süslü parantez ve noktalı virgüllerden sonra satır sonu ekleyen basit bir yeniden biçimlendiricidir. Hızlı okuma içindir; yorumları ve düzenli ifadeleri yanlış işleyebilir ve Prettier'ın yerini almaz.",
  'pageText.853950f8': 'Boyut istatistiklerini okuma',
  'pageText.07b3482d':
    "Özgün ve küçültülmüş boyutlar, metnin karakter sayılarıdır; azalma yüzdesi bunları karşılaştırır. Gerçek aktarım tasarrufu genellikle daha azdır; çünkü sunucular JavaScript'i çoğunlukla, boşlukları ve tekrarlanan tanımlayıcıları zaten küçülten gzip veya Brotli sıkıştırmasıyla gönderir. Kesin sayılar gerektiğinde derlenen dosyanızın sıkıştırılmış boyutunu ölçün.",
  'pageText.c9a86f33': 'Biçimlendirici ne yapar?',
  'pageText.7b99d384':
    'Biçimlendirici; etiketleri, yorumları ve metni belirteçlere ayırır, ardından tanınan blok düzeyindeki yapının çevresine girinti ve satır sonu ekler. Okunabilirliği artıran bir yardımcıdır; HTML ayrıştırıcısı, doğrulayıcısı, temizleyicisi veya tarayıcı görüntüleme motoru değildir.',
  'pageText.8c60e5e5': 'Girinti boyutunu seçebilir miyim?',
  'pageText.f45f1451': 'Evet! Girinti için 2, 4 veya 8 boşluk seçebilirsiniz.',
  'pageText.b5dc2f5c': "Biçimlendirme geçersiz veya güvenli olmayan HTML'i düzeltir mi?",
  'pageText.6bd5634a':
    'Hayır. Eşleşmeyen etiketleri onarmaz, öznitelikleri doğrulamaz, betikleri kaldırmaz veya işaretlemenin güvenli olduğunu kanıtlamaz. Doğruluk veya güvenilmeyen içerik önemliyse HTML doğrulayıcısı ve bağlama uygun temizleyici kullanın.',
  'pageText.6853bf2a': 'HTML biçimlendirici neleri değiştirir?',
  'pageText.59f55f70':
    'Biçimlendirici, sıradan blok etiketlerini okunabilir satırlara ayırır, bilinen satır içi öğeleri çevreleyen metinle birlikte tutar, yorumları korur ve iç içe yapıyı seçilen sayıda boşlukla girintiler. Sonuç girdiye karşılaştırılabilsin diye çıktı paneli karakter ve satır sayılarını da bildirir.',
  'pageText.5bc49953': 'Biçimlendirici, ayrıştırıcı veya doğrulayıcı karşılaştırması',
  'pageText.28eb81f1':
    "Biçimlendirme boşlukları ve düzeni değiştirir; tarayıcı DOM'u oluşturmaz veya HTML ayrıştırma algoritmasını uygulamaz.",
  'pageText.a285b9fa':
    'Eşleşmeyen, eksik veya bozuk etiketler onarılmaz ve yanıltıcı girinti üretebilir.',
  'pageText.506549f7':
    "Betikler, olay işleyici öznitelikleri, güvenli olmayan URL'ler ve diğer etkin içerikler metin olarak korunur. Biçimlendirme temizleme değildir.",
  'pageText.525714f9':
    'Açılı ayraç içeren gömülü script, style, template, SVG veya öznitelik içeriği, basit belirteç ayırıcının sınırını aşabilir; ayrıştırıcıyı kullanan bir geliştirme aracıyla işlenmelidir.',
  'pageText.4a57b0bb': 'Boşluklar ve gizlilik sınırları',
  'pageText.3ede26b8':
    "Boşluklar; önceden biçimlendirilmiş metinlerde, satır içi akışlarda, şablonlarda, e-postalarda ve çerçeve yönergelerinde anlam taşıyabilir. Üretim kaynağını değiştirmeden önce hedef tarayıcı veya şablon motorundaki davranışı karşılaştırın. Biçimlendirme tarayıcıda çalışır ve düzenleyici yapıştırılan HTML'i çalıştırmaz; ancak pano geçmişi, uzantılar ve sonraki hedefler ayrı ifşa yollarıdır.",
  'pageText.bbd35cbf':
    'Küçültücü HTML yorumlarını kaldırır ve boşlukları indirger. Hangi seçeneklerin uygulanacağını seçebilirsiniz.',
  'pageText.f78988ed': 'HTML ne kadar küçültülebilir?',
  'pageText.de2adbe4':
    'Küçültme, özgün biçimlendirmeye ve yorum yoğunluğuna bağlı olarak HTML dosya boyutunu genellikle %10-30 azaltır.',
  'pageText.dc1d729a': 'Hangi XML özellikleri destekleniyor?',
  'pageText.aa014daa':
    'Belirteç ayırıcı; normal etiketleri, kendiliğinden kapanan etiketleri, yorumları, CDATA bölümlerini, işleme talimatlarını ve basit DOCTYPE bildirimlerini tanır. Şemaları, ad alanlarını, varlıkları veya harici DTD kaynaklarını çözümlemez.',
  'pageText.e249844a': "Bu araç düzgün oluşturulmuş XML'i doğrular mı?",
  'pageText.c291f4c2':
    'Hayır. Belirteç benzeri işaretlemeyi biçimlendirir; ancak standartlara uygun XML ayrıştırması yapmaz. Eşleşmeyen etiketleri, geçersiz adları, varlık hatalarını, şema ihlallerini ve ad alanı sorunlarını saptamak için XML ayrıştırıcısı veya doğrulayıcısı kullanın.',
  'pageText.40d2ec46': 'XML biçimlendirici neleri değiştirir?',
  'pageText.ac2829ba':
    "Biçimlendirici, tanınabilir XML etiketlerini ve içeriğini gezer; kapanış etiketinden önce girintiyi azaltır, açılış etiketinden sonra artırır. Kendiliğinden kapanan etiketleri, yorumları, CDATA'yı, işleme talimatlarını ve basit DOCTYPE belirteçlerini korur. Belgeyi sunucuya göndermeden iki, dört veya sekiz boşluk seçilebilir.",
  'pageText.df3aac91': 'Biçimlendirme XML doğrulaması değildir',
  'pageText.54105db0':
    "Araç; tek kök öğeyi, eşleşen etiket adlarını, geçerli öznitelikleri, ad alanı bağlarını, varlık bildirimlerini, XSD'yi, DTD'yi veya iş kurallarını doğrulamaz.",
  'pageText.ebba6da6':
    'Biçimlendirilmiş sonuç hâlâ bozuk XML olabilir; hedef sistemin kullandığı ayrıştırıcı ve şemayla doğrulayın.',
  'pageText.53dced72':
    'Karmaşık dahili DTD alt kümeleri ve bildirimlerin içinde > içeren olağandışı işaretlemeler, basit belirteç ayırıcının sınırını aşabilir.',
  'pageText.6dda43fb':
    'Harici varlıklar çözümlenmez; bu, alınmalarını önler ama varlıklara bağlı doğruluğun da kontrol edilmediği anlamına gelir.',
  'pageText.97f2bab3': 'Karma içerik, imzalar ve gizlilik',
  'pageText.14bd67e8':
    "Biçimlendirici, metin belirteçlerinin uç boşluklarını temizler ve boşluk ekler; bu nedenle boşlukların anlamsal olarak önemli olduğu karma içerikli belgeler dikkatle incelenmelidir. Her bayt değişikliği imzayı geçersiz kılabileceğinden standartlaştırılmış veya dijital imzalı XML'i biçimlendirmeyin. İşleme yereldir; pano geçmişi, uzantılar, ortak cihazlar ve çıktının yapıştırıldığı hedef ayrı risklerdir.",
  'pageText.fe32a91d': 'SVG küçültme dosya boyutunu ne kadar azaltır?',
  'pageText.5d39171c':
    'Düzenleyici meta verilerinin (Adobe Illustrator, Inkscape) ve gereksiz yorumların miktarına bağlı olarak SVG dosyaları çoğunlukla %30 ile %70 küçülür.',
  'pageText.96ecd07b': 'Küçültme görsel kaliteyi etkiler mi?',
  'pageText.a917f319':
    'Hayır. Küçültücü, temel görsel vektörleri ve eğrileri korur; piksel hassasiyetinde görüntüyü sürdürmek için gereksiz çok basamaklı ondalıkları yuvarlar.',
  'pageText.b7b3cc9a': 'İyileştirme sırasında hangi meta veriler kaldırılır?',
  'pageText.66896ba8':
    "İyileştirici; XML bildirimlerini, DOCTYPE başlıklarını, HTML/XML yorumlarını ve Adobe Illustrator, Figma, Inkscape ve Sketch'e özgü öznitelikleri kaldırır.",
  'pageText.78172982': "İndirmeden önce iyileştirilmiş SVG'yi önizleyebilir miyim?",
  'pageText.390681e1':
    'Evet, görüntüleme kalitesini doğrulayabilmeniz için düzenleyicinin altında canlı SVG önizlemesi gösterilir.',
  'pageText.0b1fe2c2': 'SQL küçültme sorgunun mantığını veya sonuçlarını değiştirir mi?',
  'pageText.e4ef1b07':
    'Hayır. Yalnızca çalıştırılmayan yorumları kaldırır ve işleçlerle parantezlerin çevresindeki boşlukları indirger.',
  'pageText.9b592f46': 'JSON neden küçültülür?',
  'pageText.ed32b385':
    'Küçültülmüş JSON, aktarım boyutunu %20 ile %50 azaltarak API yanıtlarını hızlandırır ve depolama maliyetlerini düşürür.',
  'pageText.c0fed95c': 'Görsel boyutumu ne kadar küçültebilirim?',
  'pageText.e029d2f5':
    'Görsele ve biçime (WebP gibi) bağlı olarak genellikle %50 ile %80 dosya boyutu tasarrufu sağlayabilirsiniz.',
  'pageText.9d6eb265':
    'Evet! Her şey sunucuya yükleme yapılmadan tarayıcınızda yerel olarak işlenir.',
  'pageText.9da1e25c': 'Renk paleti çıkarma nasıl çalışır?',
  'pageText.6856aaf1':
    'Görselin piksel verilerini örnekler ve hızlı renk niceleme kullanarak renkleri baskın kümelerde gruplar.',
  'pageText.a4364887': 'Belirli piksellerin renklerini inceleyebilir miyim?',
  'pageText.f7f9cfc5':
    'Evet, damlalıkla birebir piksel rengini seçmek için görsel önizlemesinin herhangi bir yerine tıklayın.',
  'pageText.a35b5925': 'Hassas PDF belgelerini birleştirmek güvenli mi?',
  'pageText.05bdd01e':
    "Evet, DevsTools PDF'leri pdf-lib kullanarak tamamen tarayıcınızda yerel olarak birleştirir. Belgeleriniz hiçbir sunucuya yüklenmez.",
  'pageText.61e14c97': "Birleştirilen PDF'lerin sırasını değiştirebilir miyim?",
  'pageText.8d1a28fb':
    'Evet, birleştirmeden önce dosyaları kolayca sıralamak için Yukarı ve Aşağı ok düğmelerini kullanın.',
  'pageText.0d93721b': 'Bölünecek sayfa aralıklarını nasıl belirtirim?',
  'pageText.a635c961':
    '"1-3, 5, 8-10" gibi sayfa aralıkları girin veya hızlı hazır ayar düğmelerini kullanın.',
  'pageText.478026f0': 'Bölme belge kalitesini etkiler mi?',
  'pageText.343ad06a':
    'Hayır; vektör metin, gömülü görseller ve yazı tipleri özgün kalitede korunur.',
  'pageText.3832da18': 'Karşılaştırmaya hangi modeller dahil?',
  'pageText.d5944039':
    'GPT-4o, GPT-4o-mini, o1, o3-mini, Claude 3.5 Sonnet/Haiku/Opus, Gemini 2.0 Flash, Gemini 1.5 Pro, DeepSeek V3/R1 ve Llama 3.3.',
  'pageText.2c0b42c9': 'İstem önbelleği indirimlerini hesaplar mı?',
  'pageText.1f24b0e5':
    'Evet, indirimli girdi token maliyetlerini görmek için istem önbelleği yüzdesi kaydırıcısını ayarlayın.',
  'pageText.b55124a7': "Deneme ortamı Tailwind CSS'i destekliyor mu?",
  'pageText.3c96d97b':
    "Evet, Tailwind CDN'yi otomatik dahil etmek için Tailwind hazır ayarını seçin.",
  'pageText.eea9bb11': 'Deneme ortamı projemi dışa aktarabilir miyim?',
  'pageText.22043773':
    'Evet, tek dosyalı bağımsız HTML belgesi indirmek için "HTML\'i Dışa Aktar" seçeneğine tıklayın.',
  'pageText.08df7b07': 'Bu araç hangi biçimi kullanır?',
  'pageText.d6dda949':
    'Bu araç sayısal, 5 alanlı Cronie biçimini kullanır: dakika (0-59), saat (0-23), ayın günü (1-31), ay (1-12) ve haftanın günü (0-7; 0 ve 7 Pazar günüdür). Ay/gün adları ve tilde ile rastgeleleştirme desteklenmez.',
  'pageText.3ef8cae4': '*/5 * * * * ne anlama gelir?',
  'pageText.8b55b7bf':
    "Her beş dakikada bir çalıştır: her gün, her saatin :00, :05, :10 değerlerinde ve bu şekilde :55'e kadar.",
  'pageText.14555971': 'Bir cron işini her gün gece yarısında nasıl çalıştırırım?',
  'pageText.555d6847':
    "0 0 * * * kullanın. İlk alan dakika, ikinci alan saattir; dolayısıyla iş, cron'u çalıştıran makinenin saat diliminde 00:00'da çalışır.",
  'pageText.ebbbedb4': 'İşim neden beklediğimden daha fazla günde çalışıyor?',
  'pageText.dd287a29':
    "Ayın günü ve haftanın günü birlikte kısıtlandığında cron, bunlardan biri eşleştiğinde işi çalıştırır. 0 9 1 * 1, her ayın 1'inde ve her Pazartesi çalışır. Yalnızca diğerini kullanmak için iki alandan birini * olarak ayarlayın.",
  'pageText.4c325954': 'Cron işleri hangi saat dilimini kullanır?',
  'pageText.1999379a':
    "Klasik crontab, çoğunlukla UTC olan sunucunun sistem saat dilimini kullanır. Kubernetes CronJobs, spec.timeZone belirleyebilir; GitHub Actions zamanlamaları UTC'de çalışır. Bu araç, çalışmaları tarayıcınızın saat diliminde önizler.",
  'pageText.05cc7746': '@daily, saniye veya L ve W destekleniyor mu?',
  'pageText.df473d06':
    'Hayır. @daily ve @reboot gibi makrolar, saniye veya yıl alanı ve ?, L, W, # gibi Quartz karakterleri reddedilir. @daily yerine 0 0 * * * yazın.',
  'pageText.1fd13551': 'Beş cron alanını okuma',
  'pageText.33035464':
    "Standart bir crontab zamanlaması, boşlukla ayrılan beş alan içerir: dakika (0-59), saat (0-23), ayın günü (1-31), ay (1-12) ve haftanın günü (0-7; hem 0 hem 7 Pazar anlamına gelir). Crontab satırında zamanlamadan sonra gelen komut, ifadenin parçası değildir; yalnızca beş alanı yapıştırın. Örneğin 30 2 * * 1 her Pazartesi 02:30'da, 0 9 * * 1-5 ise Pazartesiden Cumaya 09:00'da çalışır. Her alan dört işleç kabul eder:",
  'pageText.016be4a0': '* alanın her değeriyle eşleşir.',
  'pageText.0fb5d225': "Virgül liste oluşturur: dakika alanındaki 0,30, :00 ve :30'da çalışır.",
  'pageText.f7efe16b':
    'Kısa çizgi, uçları dahil aralık oluşturur: saat alanındaki 9-17, 09:00 ile 17:00 arasını kapsar.',
  'pageText.0745593a':
    'Eğik çizgi, * veya aralığa adım ekler: */15 her 15 dakikada bir, 8-18/2 ise 8 ile 18 arasında iki saatte bir anlamına gelir.',
  'pageText.1e8af08c': 'Ayın günü ve haftanın günü: VEYA kuralı',
  'pageText.71a25a12':
    "İki gün alanı da kısıtlandığında cron, yalnızca ikisi birden değil, herhangi biri eşleştiğinde işi çalıştırır. Dolayısıyla 0 0 13 * 5, yalnızca 13'ü Cuma olan günlerde değil, her ayın 13'ünde ve her Cuma gece yarısı çalışır. */2 gibi adımlar dahil, gün alanlarından biri * ile başlıyorsa alanlar bunun yerine VE ile birleştirilir. Bu ayrıştırıcı Cronie ve Vixie cron ile aynı kuralı izler; sonraki çalışma listesi etkisini hemen gösterir.",
  'pageText.c0ab4e56': 'Sonraki çalışma zamanları nasıl hesaplanır?',
  'pageText.79d9be29':
    "Sonraki beş çalışma, tarayıcınızda cihazınızın geçerli saat diliminde hesaplanır; her zaman, saat dilimi kısaltmasıyla gösterilir. Sunucular cron'u genellikle kendi saat dilimlerinde, çoğunlukla UTC'de çalıştırır. Bu yüzden burada 09:00 görünen iş sunucuda farklı yerel saatte çalışabilir. Yaz saati değişiklikleri, ilkbahardaki ileri alma tarihinde 02:30 gibi yerel saatleri atlayabilir veya sonbaharda tekrarlayabilir. Önizleme, gerçekleşen her yerel örneği listeler; cron hizmetinizin bu geçişleri nasıl işlediğini kontrol edin.",
  'pageText.71055715': 'Bu ayrıştırıcının reddettiği sözdizimi',
  'pageText.941d3d4e': 'JAN veya MON gibi ay ve hafta günü adları; 1-12 ve 0-7 sayıları kullanın.',
  'pageText.1155fe27': '@hourly, @daily ve @reboot gibi makrolar.',
  'pageText.aac0ad9e': 'Quartz ve Spring uzantıları: saniye veya yıl alanı, ?, L, W ve #.',
  'pageText.eb78245f': '5/10 gibi tek değere uygulanan adım; bunun yerine 5-59/10 yazın.',
  'pageText.a20b5d46':
    'Jenkins biçimindeki H veya bazı cron sürümlerinin desteklediği ~ sözdizimi gibi rastgeleleştirilmiş değerler.',
  'pageText.01e5036b': 'Yinelenen başlıkları ayrıştırabilir mi?',
  'pageText.a5eb4734':
    'Evet. Yinelenen başlık anahtarları, ayrıştırılan JSON çıktısında diziler halinde gruplandırılır.',
  'pageText.48b8738b': 'Hangi girdi biçimi bekleniyor?',
  'pageText.b75acdab': 'Her satırda "Header-Name: value" biçiminde bir başlık kullanın.',
  'pageText.3d8017de': 'HTTP durum kodları nedir?',
  'pageText.f49da83d':
    'HTTP durum kodları, bir isteğin başarılı, başarısız veya yönlendirilmiş olduğunu belirten standart sunucu yanıtlarıdır.',
  'pageText.09b5ad7b': 'Hangi durum kodu sınıfları bulunur?',
  'pageText.ed562809':
    '1xx bilgilendirme, 2xx başarı, 3xx yönlendirme, 4xx istemci hataları ve 5xx sunucu hataları.',
  'pageText.fc679ed8': 'UA ayrıştırma ne kadar doğru?',
  'pageText.8d6134ab':
    'Araç, paketlenen UAParser.js 1.0.41 kural kümesini kullanır; ancak User-Agent metinleri kendiliğinden bildirildiği, sadeleştirildiği ve taklit edilebildiği için sonuçlar sezgisel kalır.',
  'pageText.14c11e52': 'Botları saptayabilir mi?',
  'pageText.ac1e7ccc':
    'Yaygın, adlandırılmış arama ve yapay zekâ tarayıcı belirteçlerini tanır; ayrıca yedek bot/crawler/spider sezgisi uygular. Listelenmeyen veya gizlenen bir tarayıcı yine de gözden kaçabilir.',
  'pageText.28488b1d': 'Birden fazla User-Agent metnini ayrıştırabilir miyim?',
  'pageText.f540646b':
    'Evet. Toplu modu etkinleştirin ve her satıra bir User-Agent metni yapıştırın; ayrıştırılmış sonuçları JSON dizisi olarak alın.',
  'pageText.964b16b5': 'Bu çevrimiçi User-Agent ayrıştırıcısı ne döndürür?',
  'pageText.9d61821a':
    "Tarayıcı adı/sürümünü, işletim sistemini, görüntüleme motorunu, cihaz üreticisini/modelini/türünü, CPU mimarisini ve bilinen bot işaretlerini ayrıştırmak için bir User-Agent metni yapıştırın veya her satırda bir metin için toplu modu etkinleştirin. RFC 9110, User-Agent'ı, isteği başlatan yazılımın ürün tanımlayıcılarını ve isteğe bağlı yorumlarını içeren istek alanı olarak tanımlar. Bu araç, kendiliğinden bildirilen bu belirteçleri okur; cihazla iletişim kurmaz veya bunları gönderen tarayıcıyı incelemez.",
  'pageText.32c1543c': 'Saptama nasıl çalışır?',
  'pageText.080c4d60':
    'Paketlenen UAParser.js 1.0.41 kural kümesi; tarayıcı, motor, işletim sistemi, cihaz ve CPU düzenli ifade verilerini tarayıcıda uygular.',
  'pageText.c680aa0e':
    'Yapıştırılan metin gerçekten yeterli bilgi içeriyorsa sonuç, sürümleri ve cihaz üreticisiyle modelini gösterir.',
  'pageText.954982d4':
    'Ayrı bir bot katmanı; Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot ve Applebot gibi adlandırılmış belirteçleri tanır, ardından genel tarayıcı anahtar sözcüklerini yedek kontrol olarak kullanır.',
  'pageText.ddc447f4':
    "User-Agent'ımı kullan, bu tarayıcıdan navigator.userAgent değerini okur; toplu mod, her satırda yapıştırılmış bir metni ayrıştırır.",
  'pageText.ef145930': 'Doğruluk ve sınırlamalar',
  'pageText.1f7dae65':
    'Her sonucu doğrulanmış kimlik değil, ipucu olarak değerlendirin. User-Agent metinleri değiştirilebilir veya taklit edilebilir; uyumluluk belirteçleri birkaç tarayıcı adı içerebilir, sadeleştirilmiş metinler sürümleri veya cihaz ayrıntılarını atlayabilir. Bilinmeyen değerler Bilinmiyor kalır; tanınmayan, mobil olmayan bir metin ise Masaüstü olarak değerlendirilir. Bot saptama da sezgiseldir: listelenmeyen veya gizlenen tarayıcı gözden kaçabilir; tarayıcı anahtar sözcüğü içeren sıradan ürün adı işaretlenebilir. Uygulamayı kontrol ediyorsanız Client Hints ve yetenek saptama farklı veya daha yararlı işaretler sağlayabilir.',
  'pageText.22aebc3c': 'Gizlilik ve güvenli kullanım',
  'pageText.2ae8ed4d':
    "Ayrıştırma, siz yazarken tarayıcınızda gerçekleşir. Girdi ayrıştırma API'sine gönderilmez; ancak User-Agent değerleri diğer verilerle birleştiğinde parmak izi oluşturmaya katkıda bulunabilir. Bu çıktıyı kimlik doğrulama, yetkilendirme, dolandırıcılık kanıtı veya yetenek saptamanın yerine kullanmaktan kaçının.",
  'pageText.0381d4bc': 'Hangi girdi biçimleri destekleniyor?',
  'pageText.e1375844':
    'Standart noktalı onluk IPv4 adresi ile /24 gibi ön ek veya 255.255.255.0 gibi kesintisiz alt ağ maskesi girin.',
  'pageText.245b4291': '/31 ve /32 ağları nasıl işlenir?',
  'pageText.683e314e':
    '/31, iki uç noktanın da kullanılabildiği ve yayın adresinin olmadığı RFC 3021 noktadan noktaya yorumuyla gösterilir; hedef bağlantının bunu desteklediğini doğrulayın. /32 tek bir ana makine rotasını temsil eder ve onda da yayın adresi yoktur.',
  'pageText.c6d33e69': 'Bu hesaplayıcı IPv6 destekliyor mu?',
  'pageText.a3da1f3e':
    "Hayır. Bu sürüm, adres ve ana makine aralığı anlamlarının açık kalması için bilerek yalnızca IPv4'ü doğrular.",
  'pageText.790f8f4a': 'IPv4 CIDR hesaplayıcı ne döndürür?',
  'pageText.d1b4b69d':
    'CIDR, IPv4 adresini, baştaki kaç bitin ağı tanımladığını belirten ön ek uzunluğuyla birleştirir. Hesaplayıcı, girilen adresi standart ağına normalleştirir; ardından yayın sınırını, noktalı ağ maskesini, ters joker maskesini, toplam adres sayısını ve kullanılabilir ana makine aralığını gösterir.',
  'pageText.1d5581a7': 'Sıkı girdi kuralları ve uç durumlar',
  'pageText.f2babb34':
    'IPv4 girdisi 0 ile 255 arasında dört onluk sekizli içermelidir; belirsiz, başında sıfır bulunan ve kısa biçimler reddedilir.',
  'pageText.de8ed2ff':
    '/0 ile /32 arasındaki ön ek uzunlukları ve kesintisiz noktalı onluk maskeler desteklenir.',
  'pageText.238148ff':
    '/0 ile /30 arasında ağ ve yayın sınırları, kullanılabilir ana makine aralığının dışında tutulur.',
  'pageText.678c186b':
    '/31 için RFC 3021 uyarınca iki noktadan noktaya uç nokta da kullanılabilir; /32 tek ana makine rotasını temsil eder.',
  'pageText.08e319a3': 'İşletim sınırı',
  'pageText.16280f4e':
    'Sonuç adres aritmetiğini açıklar; yönlendirme erişilebilirliğini, güvenlik duvarı politikasını, DHCP tahsisini, bulut sağlayıcısı rezervasyonlarını, VLAN üyeliğini veya adresin genel ağda yönlendirilebilir olup olmadığını açıklamaz. Ana makineleri tahsis etmeden önce hedef ağ platformunun kurallarını uygulayın.',
  'pageText.43b9f352': '755 ve 644 ne anlama gelir?',
  'pageText.244efe25':
    'Her sekizlik basamak okuma (4), yazma (2) ve çalıştırmayı (1) birleştirir. 755 modu rwxr-xr-x, 644 ise rw-r--r-- değeridir.',
  'pageText.0a65a354': 'setuid, setgid ve sticky bitleri nedir?',
  'pageText.3c3c8484':
    'Baştaki sekizlik basamakla gösterilen özel mod bitleridir. Tam güvenlik etkileri; nesne türüne, işletim sistemine, dosya sistemine, bağlama seçeneklerine ve çalıştırma bağlamına bağlıdır.',
  'pageText.d9d32a1e': 'Bu araç bir dosyayı değiştirir mi?',
  'pageText.b0c7d669':
    'Hayır. Yalnızca izin gösterimini hesaplayıp kopyalar; dosya sisteminize erişemez veya onu değiştiremez.',
  'pageText.ad18866f': 'chmod hesaplayıcı nasıl çalışır?',
  'pageText.47cea64b':
    "Unix izin modları; sahip, grup ve diğerleri için okuma, yazma ve çalıştırma bitlerini gruplar. Bit değerlerinin toplamı her sekizlik basamağı üretir: okuma 4, yazma 2, çalıştırma 1'dir. Hesaplayıcı, sekizlik, rwx ve onay kutusu gösterimlerini eşitler.",
  'pageText.c281eef7':
    'Belirli tehdit modeli ve ortam gerektirmediği sürece 777 gibi geniş yazma izinlerinden kaçının.',
  'pageText.81ae01d1':
    "Mod; dosya sahipliğini, ACL'leri, yetenekleri, SELinux veya AppArmor kurallarını, bağlama bayraklarını, konteyner eşlemelerini veya devralınan politikayı göstermez.",
  'pageText.a50e1c4a':
    'Büyük S veya T, özel bitin ayarlı olduğunu, ancak karşılık gelen çalıştırma bitinin ayarlı olmadığını gösterir.',
  'pageText.ba30cf48':
    'Kopyalanmış bir chmod komutunu çalıştırmadan önce, özellikle özyinelemeli kullanımda, hedef yolu ve sahipliği inceleyin.',
  'pageText.57ae6fe2': 'no-cache ile no-store arasındaki fark nedir?',
  'pageText.856cc543':
    'no-cache, yanıtın saklanmasına izin verir ancak yeniden kullanımdan önce doğrulama gerektirir. no-store, önbelleklere yanıtı saklamamalarını söyler. Birbirlerinin yerine kullanılamazlar.',
  'pageText.a24540f5': 's-maxage neyi kontrol eder?',
  'pageText.07c63451':
    "s-maxage, paylaşılan önbellekler için güncellik süresini belirler ve orada max-age'e göre önceliklidir. Tarayıcı ve özel önbellek davranışı yine de farklı olabilir.",
  'pageText.47165661': 'Bu araç CDN davranışını garanti edebilir mi?',
  'pageText.4736a111':
    'Hayır. Sözdizimini doğrular ve yaygın çakışmaları işaretler; ancak gerçek davranış yanıtın tamamına, istek yönergelerine, önbellek uygulamasına, CDN politikasına, çerçeve varsayılanlarına ve geçersizleştirme durumuna bağlıdır.',
  'pageText.ca31e679': 'Cache-Control aracı neleri kontrol eder?',
  'pageText.7a512319':
    'Ayrıştırıcı, tırnak içindeki değerlerin virgüllerini bölmeden virgülle ayrılmış yönergeleri ayırır, yönerge adlarını normalleştirir, biçimlendirilmiş çıktıda yinelenen adları kaldırır ve public ile private veya sayısal olmayan güncellik değerleri gibi yaygın çakışmalar hakkında uyarır.',
  'pageText.be225eb9': 'İşletim sınırları',
  'pageText.cd535d5c':
    'Cache-Control anlamları isteklerle yanıtlar arasında farklıdır; hazır ayarlar yanıt odaklı örneklerdir.',
  'pageText.ae842969':
    "Geçerli başlık; her CDN kuralını, aracı önbellek başlığını, çerçeve önbelleğini, service worker'ı, tarayıcı sezgisini veya açık temizleme işlemini geçersiz kılmaz.",
  'pageText.12ea33ca':
    "immutable, içerik her değiştiğinde URL'si değişen sürümlenmiş kaynaklara en uygundur.",
  'pageText.819756b2':
    "Kimlik doğrulamayı, Vary'yi, çerezleri ve aracıların davranışını tam olarak incelemeden kişiselleştirilmiş veya hassas yanıtları genel önbellekte saklamayın.",
  'pageText.8fc53dd8': "Analiz aracı CSP'nin güvenli olduğunu kanıtlayabilir mi?",
  'pageText.6bdde330':
    'Hayır. Yaygın statik sorunları işaretler; ancak korunan uygulamadaki her uygulama akışını, tarayıcı davranışını, nonce yaşam döngüsünü, üçüncü taraf entegrasyonunu, raporlama uç noktasını veya atlatma yolunu anlayamaz.',
  'pageText.00ae173a': 'Neden Report-Only moduyla başlamalıyım?',
  'pageText.487cd4a8':
    "Content-Security-Policy-Report-Only, politikayı zorlamadan ihlalleri kaydeder. Zorlamadan önce gereken kaynakları belirlemeye yardımcı olur; ancak raporların yine dikkatle incelenmesi gerekir ve bunlar hassas URL'ler içerebilir.",
  'pageText.1828ef21': 'Yinelenen yönergelere ne olur?',
  'pageText.b8228f81':
    'Tarayıcılar ilkini kullanır ve sonraki yinelenen yönergeleri yoksayar. Analiz aracı yinelenenleri bildirir; normalleştirilmiş oluşturucu çıktısı tek bir açık yönergeyi korur.',
  'pageText.18b89636': 'CSP oluşturucu neleri kontrol eder?',
  'pageText.c8f0e194':
    "Content Security Policy, belgenin kaynakları nereden yükleyebileceğini veya çalıştırabileceğini kısıtlar. Bu araç, noktalı virgülle ayrılmış yönergeleri ayrıştırır, değerlerini normalleştirir, yinelenenleri saptar ve geniş betik kaynakları, data: betikleri, 'unsafe-eval' veya nonce ya da özet olmadan 'unsafe-inline' gibi yaygın riskleri vurgular.",
  'pageText.8bc2d491': 'Temel yönergeler ve bulgular',
  'pageText.6a15b338':
    'default-src, açıkça bildirilmemiş kaynak getirme yönergeleri için yedek sağlar.',
  'pageText.aa0c2e7c':
    "object-src 'none', uygulamanın ihtiyaç duymadığı eski eklenti içeriğini engeller.",
  'pageText.18e827de':
    "base-uri, belgenin temel URL'sindeki değişiklikleri sınırlar; frame-ancestors ise sayfayı hangi üst belgelerin gömebileceğini kontrol eder.",
  'pageText.4033496a':
    "Sözdizimi geçerli bir politika yine de üretimi bozabilir veya güvenli olmayan akışa izin verebilir. Gereken kökenleri, nonce'ları, özetleri, worker'ları, çerçeveleri, formları ve raporlamayı ayrı ayrı doğrulayın.",
  'pageText.190ec910': 'Güvenli dağıtım iş akışı',
  'pageText.ae9648e1':
    "En az ayrıcalıklı bir taslakla başlayın, Content-Security-Policy-Report-Only olarak dağıtın, gerçek uygulama yollarını deneyin ve ihlalleri inceleyin. Kazara oluşan bağımlılıkları kaldırın veya gereken en dar kaynakları ekleyin; ardından test edilen politikayı zorunlu kılın. Başlığı sürüm kontrolünde tutun ve çerçeveler, CDN'ler, analiz araçları, reklamlar veya kimlik doğrulama akışları değiştiğinde yeniden test edin.",
  'pageText.d68c4d88': 'Bu araç cURL komutunu çalıştırır mı?',
  'pageText.74f4df78':
    "Hayır. Yalnızca desteklenen girdiyi belirteçlere ayırır ve metin üretir. Hiçbir zaman kabuk başlatmaz, hedef URL'yle iletişim kurmaz veya başlıkları ve gövdeyi göndermez.",
  'pageText.48e8b2e0': 'Hangi cURL seçenekleri dönüştürülebilir?',
  'pageText.2aedeaa5':
    'Dönüştürücü; yöntem, URL, başlıklar ve veri dahil yaygın istek seçenekleriyle zararsız yönlendirme veya sıkıştırma bayraklarını işler. Desteklenmeyen veya belirsiz kabuk özellikleri tahmin edilmek yerine reddedilir.',
  'pageText.159eff58': 'cURL ve fetch her zaman eşdeğer mi?',
  'pageText.dde74409':
    'Hayır. Yönlendirmeler, çerezler, TLS, vekiller, sıkıştırma, akış, CORS, tarayıcının yasakladığı başlıklar, kimlik bilgileri ve çok parçalı yüklemeler farklı davranabilir. Oluşturulan kodu gerçek çalışma ortamında inceleyip test edin.',
  'pageText.ec80b478': 'cURL ve fetch dönüştürücü ne yapar?',
  'pageText.68449604':
    'İstek oluşturucu; yapılandırılmış yöntem, URL, sorgu, başlık ve gövde girdisini POSIX kabuk kurallarına göre tırnaklanmış cURL komutuna ve JavaScript fetch örneğine dönüştürür. Dönüştürücü, desteklenen yapıştırılmış cURL komutunu çalıştırmadan belirteçlere ayırır; ardından istek verilerini fetch sözdizimine eşler.',
  'pageText.cee22a22': 'Ayrıştırma ve güvenlik sınırları',
  'pageText.a46bfb45':
    'Kabuk ikameleri, ters tırnaklar, NUL baytları, hatalı tırnak kullanımı, CRLF başlık enjeksiyonu ve desteklenmeyen seçenekler reddedilir.',
  'pageText.a46b5014':
    'Hassas Authorization, Cookie, vekil yetkilendirme ve API anahtarı değerleri oluşturulan çıktıda maskelenebilir; arayüzde varsayılan olarak maskelenir.',
  'pageText.b759e2e1':
    'POSIX kabuk tırnaklaması, PowerShell veya Windows cmd tırnaklaması değildir. Kopyalanan metni çalıştırmadan önce hedef kabuğu inceleyin.',
  'pageText.d923e0c4':
    'Tekrarlanan istek başlıkları Fetch Headers API tarafından birleştirilebilir; oluşturulan kod parçası, elle inceleme için yinelenen adları belirtir.',
  'pageText.6518c723':
    'Araç istek göndermez, uzak sunucuyu doğrulamaz, kimlik bilgilerini saklamaz veya kopyalanan sırların uzantılardan, sayfa betiklerinden, pano geçmişinden ya da ekran paylaşımından korunduğunu kanıtlamaz.',
  'pageText.a52cbc62': 'Oluşturulan fetch neden değişiklik gerektirebilir?',
  'pageText.a0b2fa3c':
    "Tarayıcı fetch'i, curl komut satırı istemcisinin uygulamadığı CORS ve yasak başlık kurallarını uygular. Sunucu tarafındaki JavaScript'in farklı çerez, vekil ve TLS ortamı vardır. Çok parçalı form yüklemeleri, akış halindeki istek gövdeleri, istemci sertifikaları, özel DNS çözümleme veya curl'e özgü yeniden deneme davranışı, doğrudan dönüştürmenin ötesinde çalışma ortamına özgü kod gerektirir.",
  'pageText.92e93e00': 'WCAG metin için hangi kontrast oranlarını gerektirir?',
  'pageText.71cfc9b4':
    'Çoğu metin için AA en az 4.5:1, AAA 7:1 gerektirir. Büyük metinde AA için 3:1, AAA için 4.5:1 kullanılır. Büyük metin en az 18 punto normal veya 14 punto kalındır; bunlar çoğunlukla 24 CSS pikseli veya yaklaşık 18.66 CSS pikseli kalın olarak alınır.',
  'pageText.76601b6f': 'Arayüz bileşenleri sonucu neyi temsil eder?',
  'pageText.88ec1351':
    'Kullanıcı arayüzü bileşenlerini ve grafik nesneleri tanımlamak için gerekli görsel bilgilerde yaygın kullanılan 3:1 eşiğini uygular. Uygulanabilirlik; duruma, sınırlara, bitişik renklere ve görselin arayüzü anlamak veya kullanmak için gerekli olup olmadığına bağlıdır.',
  'pageText.f6c937f8': 'Geçen oran, tasarımın tamamını erişilebilir yapar mı?',
  'pageText.c55058e2':
    'Hayır. Kontrast yalnızca bir gereksinimdir. Yazı kalınlığı, boyut, aralık, üzerine gelme ve odak durumları, renk geçişleri, görseller, renk görme farklılıkları, yakınlaştırma, zorunlu renkler ve bilgiyi renge bağımlı olmadan aktarma ayrıca test edilmelidir.',
  'pageText.bd34b3a3': 'Kontrast oranı nasıl hesaplanır?',
  'pageText.93057296':
    "Her opak sRGB kanalı, kodlanmış değerinden doğrusal ışığa dönüştürülür, WCAG göreli parlaklık katsayılarıyla birleştirilir ve (lighter + 0.05) / (darker + 0.05) olarak karşılaştırılır. Oran, aynı parlaklık için 1:1'den siyah-beyaz için 21:1'e kadar değişir. Ön plan ile arka planın yerini değiştirmek sayısal oranı değiştirmez.",
  'pageText.587b353d': 'AA, AAA ve canlı önizleme',
  'pageText.a7a29b7f': 'Normal metin AA için 4.5:1, AAA için 7:1 oranında geçer.',
  'pageText.4a22824d': 'Büyük metin AA için 3:1, AAA için 4.5:1 oranında geçer.',
  'pageText.6232d70c':
    'Arayüz örneği, görünen her kenarlığın bunu karşılaması gerektiğini varsaymadan 3:1 metin dışı eşiğini bildirir.',
  'pageText.25adca33':
    'Öneri, opak siyah veya beyazdan geçerli arka plana karşı daha yüksek orana sahip olanı seçer; marka amacını korumaz.',
  'pageText.3543a31e':
    'Canlı önizleme, belirgin okunabilirlik sorunlarını fark etmeye yardımcı olur; ancak gerçek boyut ve durumlarda görüntülenen ürünü test etmenin yerini almaz.',
  'pageText.1aad56b9': 'Renk ve görüntüleme sınırları',
  'pageText.e945b142':
    'Hesaplayıcı üç veya altı basamaklı opak onaltılık sRGB renklerini kabul eder. Alfa saydamlığı, renk geçişleri, görseller, karıştırma modları, ekran kalibrasyonu, kenar yumuşatma, geniş renk gamı ve değişen içerik üzerine çizilen metin, son birleştirilmiş piksellerin değerlendirilmesini gerektirir. İşleme yereldir ve başka bir web sayfasını otomatik olarak örneklemez.',
  'pageText.23984f68': 'Hangi OpenAPI sürümleri destekleniyor?',
  'pageText.a8bb0e10':
    'Yapısal analiz aracı, OpenAPI 3.0, 3.1 ve 3.2 sürüm metinlerini kabul eder. Swagger 2.0 sessizce dönüştürülmek yerine desteklenmiyor olarak bildirilir.',
  'pageText.052ac5a9': 'Harici $ref belgeleri indiriliyor mu?',
  'pageText.a9423d78':
    'Hayır. # ile başlayan yerel parça başvuruları, yapıştırılan belgenin içinde çözümlenir. Dosya ve ağ başvuruları uyarı olarak listelenir ama hiçbir zaman alınmaz; böylece analiz yerel kalır ve gizli ağ erişimi önlenir.',
  'pageText.0aa9d75d': 'Geçerli sonuç, tam OpenAPI uyumluluğunu garanti eder mi?',
  'pageText.66286acc':
    "Hayır. Bu, resmi şemanın ve her anlamsal kuralın tamamını uygulayan değil, belirli yapısal kontrolleri yapan bir analiz aracıdır. API sözleşmesini yayımlamadan önce CI'da sürüme özgü doğrulayıcıyı ve hedef oluşturucu veya ağ geçidini kullanın.",
  'pageText.df996466': 'Yapısal doğrulayıcı neleri kontrol eder?',
  'pageText.4c230715':
    'Ayrıştırıcı JSON veya sınırlandırılmış YAML girdisi kabul eder; OpenAPI 3 sürümü, info başlığı ve sürümü ve paths nesnesi gerektirir, ardından standart HTTP işlemlerinin envanterini çıkarır. Eksik yanıtları, yinelenen işlem kimliklerini, eşleşmeyen veya isteğe bağlı yol şablonu parametrelerini, olağandışı yanıt anahtarlarını, çözümlenemeyen yerel başvuruları, desteklenmeyen kök sürümleri ve bilinmeyen Path Item alanlarını bildirir.',
  'pageText.c33b24c7': 'Uç nokta gezgini sözleşmeyi nasıl özetler?',
  'pageText.bd67021b':
    'Her satır yöntem, yol, özet, operationId, yanıt anahtarları, kullanımdan kaldırılma ve etkin güvenlik durumunu gösterir.',
  'pageText.af6d9ec9':
    'İşlem düzeyindeki güvenlik, kök güvenliğin yerine geçer; boş güvenlik dizisi açıkça herkese açık olarak gösterilir.',
  'pageText.f6c0ea2a':
    'Arama yol, özet, operationId ve etiketleri kapsar; yöntem seçici görünür işlem listesini daraltır.',
  'pageText.f6b3cb96':
    'Normalleştirilmiş JSON görünümü, YAML ayrıştırma sonuçlarını ve birleştirilmiş takma adları inceleme için görünür kılar.',
  'pageText.39b0dc9b':
    'Harici başvurular herhangi bir tarayıcı isteği olmadan sayılır ve bildirilir.',
  'pageText.477e1f43': 'Doğrulama ve güvenlik sınırları',
  'pageText.aa9a6db6':
    'Yapısal olarak geçerli belge; uyumsuz şemalar, geçersiz örnekler, bozuk geri çağırmalar, yanlış medya türleri, oluşturucuya özgü uzantılar, kullanılamayan kimlik doğrulama akışları veya uygulamayla uyuşmayan iş davranışı içerebilir. Yerel $ref çözümleme, varlığı kontrol eder ama her anlamsal bağlamda tüm başvuruları tam olarak açmaz. Tarayıcının yanıt vermeyi sürdürebilmesi için YAML derinliği, takma adlar, birleştirme genişlemesi ve toplam girdi boyutu sınırlandırılır.',
  'pageText.e8aa500a': 'SPF nedir ve neden gereklidir?',
  'pageText.3a448f2b':
    'SPF (Sender Policy Framework), alan adınız adına e-posta göndermesine izin verilen yetkili posta sunucularını listeleyen DNS TXT kaydıdır.',
  'pageText.101baaa1': 'DMARC nedir?',
  'pageText.5c6e3f51':
    'DMARC (Domain-based Message Authentication, Reporting, and Conformance), alıcı sunuculara kimlik doğrulaması başarısız olan e-postaları nasıl işleyeceklerini söylemek için SPF ve DKIM kullanır.',
  'pageText.db14ea51': 'Hangi programlama dilleri ve HTTP kütüphaneleri destekleniyor?',
  'pageText.cd3899b9':
    'Araç; JavaScript (Fetch API ve Axios), Python (Requests kütüphanesi), Go (standart net/http), PHP (curl_init) ve Rust (reqwest async) için kod oluşturur.',
  'pageText.7db0a8b2': 'Bu, cURL isteğimi çalıştırır veya internet üzerinden gönderir mi?',
  'pageText.95abcd54':
    'Hayır. Kod oluşturmak için komut tamamen tarayıcınızda yerel olarak ayrıştırılıp belirteçlere ayrılır. Hiçbir şey gönderilmez veya çalıştırılmaz.',
  'pageText.125a50e9': 'Çok aşamalı Docker derlemesi nedir?',
  'pageText.7a608e37':
    'Çok aşamalı derlemeler, derleme ve üretim çalışma zamanı için ayrı ara konteynerler kullanır; son görsel boyutlarını önemli ölçüde küçültür ve derleme zamanı bağımlılıklarını üretimden çıkarır.',
  'pageText.c322990e': 'Oluşturulan Dockerfile, root olmayan kullanıcıyla çalışır mı?',
  'pageText.585c03a7':
    'Evet, uygun durumlarda oluşturulan Dockerfile, konteyner güvenliği için önerilen uygulamalara uygun özel bir root olmayan kullanıcı yapılandırır (ör. USER node veya appuser).',
  'pageText.4adfa17f': 'Buzlu cam efektini hangi CSS özellikleri oluşturur?',
  'pageText.cb13b4db':
    'Buzlu cam efekti; backdrop-filter: blur(), yarı saydam arka plan (rgba), ince beyaz kenarlıklar (rgba) ve yükselti sağlayan box-shadow gölgeleriyle oluşturulur.',
  'pageText.78f35ba1': 'backdrop-filter tüm modern tarayıcılarda destekleniyor mu?',
  'pageText.afdcf83f':
    'Evet, backdrop-filter tüm modern tarayıcılarda (Chrome, Edge, Safari, Firefox) desteklenir. En yüksek uyumluluk için üretici ön ekleri (-webkit-backdrop-filter) dahil edilir.',
  'pageText.a0d9ac95': 'Sütunlar ve satırlar için hangi birimleri kullanabilirim?',
  'pageText.0d74534d':
    'En yüksek duyarlı düzen için esnek kesir birimleri (fr), kesin piksel boyutları (px) veya yüzdeler (%) yapılandırabilirsiniz.',
  'pageText.85a4a549': "Hem CSS'i hem HTML'i kopyalayabilir miyim?",
  'pageText.349f7349':
    "Evet, grid-template-columns içeren .parent kapsayıcı CSS'i ve buna karşılık gelen HTML yapısı aynı anda oluşturulur.",
  'pageText.db476089': 'robots.txt ne işe yarar?',
  'pageText.c4e38da5':
    'robots.txt dosyası, arama motoru tarayıcılarına (Googlebot, Bingbot) web sitenizde hangi URL ve dizinlere erişebileceklerini veya erişemeyeceklerini bildirir.',
  'pageText.8f3b1cb2': 'robots.txt dosyası nereye yerleştirilmelidir?',
  'pageText.f8c6a14d':
    'robots.txt dosyası her zaman web sitenizin alan adının köküne yerleştirilmelidir (ör. https://example.com/robots.txt).',
  'pageText.dadb2232': "Oluşturulan site haritası XML'i hangi etiketleri içerir?",
  'pageText.0acc8ea9':
    'Oluşturulan XML, sitemaps.org 0.9 şemasına uyar ve <url>, <loc>, <lastmod>, <changefreq> ve <priority> öğelerini içerir.',
  'pageText.972e9d03': "Bunu Google Search Console'a nasıl gönderirim?",
  'pageText.6bb374e1':
    "Oluşturulan sitemap.xml dosyasını indirin, web sitenizin kök dizinine (https://example.com/sitemap.xml) yükleyin ve URL'yi Google Search Console'a gönderin.",
  'pageText.912a6605': 'event.key ile event.code arasındaki fark nedir?',
  'pageText.5f3e9043':
    'event.key, basılan tuşun değerini döndürür (Shift/Caps etkisini hesaba katar; "A" veya "a" gibi). event.code ise klavye düzenindeki fiziksel tuşu temsil eder ("KeyA" gibi).',
  'pageText.d6886318': "Modern JavaScript'te keyCode neden kullanımdan kaldırıldı?",
  'pageText.47c83a7e':
    'event.keyCode, farklı işletim sistemleri ve QWERTY dışındaki düzenlerde tutarsızdı. Modern web geliştirme, event.key ve event.code üzerinde standartlaşır.',
  'pageText.44aec8dc': 'Saf CSS üçgenleri nasıl çalışır?',
  'pageText.178348f0':
    'CSS üçgenleri, genişliği ve yüksekliği 0 olan bir öğeye üç tarafı saydam, bir tarafı renkli kalın kenarlıklar uygulanarak oluşturulur.',
  'pageText.4e5692e9': 'Çapraz köşe üçgenleri oluşturabilir miyim?',
  'pageText.0633b12d':
    'Evet! 8 yönden seçim yapabilirsiniz: Üst, Alt, Sol, Sağ, Sol Üst, Sağ Üst, Sol Alt ve Sağ Alt.',
  'pageText.376bbf44': 'Bu oluşturucu hem saf CSS hem Tailwind sınıfları sağlar mı?',
  'pageText.59dce7df':
    'Evet. Standart CSS kuralları (display: flex, justify-content, align-items, gap) ve Tailwind yardımcı sınıfları gerçek zamanlı oluşturulur.',
  'pageText.99e78b69': 'Deneme ortamında test flex öğeleri ekleyip kaldırabilir miyim?',
  'pageText.b824b684':
    'Evet, satır kaydırma ve aralık davranışını görmek için + ve - düğmeleriyle kapsayıcıdaki test kartı sayısını ayarlayın.',
  'pageText.b1a93891': 'Önizlemede hangi sosyal platformlar taklit edilir?',
  'pageText.c1f4071a':
    'Twitter/X Büyük Görsel Kartı, Facebook Akış Gönderisi, LinkedIn Bağlantı Paylaşımı ve Google Arama SERP özeti görünümleri arasında geçiş yapabilirsiniz.',
  'pageText.fb1820cd': 'Open Graph görseli için önerilen çözünürlük nedir?',
  'pageText.da87fb9a':
    'Twitter Cards ve Facebook Open Graph için standart önerilen görsel boyutu 1200 × 630 pikseldir (1.91:1 en-boy oranı).',
  'pageText.5141dfd9': 'Hangi hazır animasyonlar var?',
  'pageText.1033cd43':
    'Hazır ayarlar arasında Zıplama, Nabız, Dönme, Titreme, Belirme, 3B Çevirme, Sallanma ve Yakınlaşma bulunur.',
  'pageText.96e7dd99': 'Zamanlama fonksiyonunu (easing) özelleştirebilir miyim?',
  'pageText.0aa29a50':
    'Evet. ease, linear, ease-in, ease-out ve ease-in-out arasından seçim yapabilir; süreyi ve gecikmeyi saniye cinsinden özelleştirebilirsiniz.',
  'pageText.2c0cc2c1': 'Metne birden fazla gölge katmanı ekleyebilir miyim?',
  'pageText.8175f838':
    'Evet. Gerçekçi 3B derinlik, çok renkli retro kenarlıklar veya çok aşamalı neon parıltısı oluşturmak için ihtiyaç duyduğunuz kadar üst üste text-shadow katmanı ekleyebilirsiniz.',
  'pageText.9ec3072a': 'Kullanıma hazır stil ayarları var mı?',
  'pageText.9e6ee7e1':
    'Evet! Tek tıklamalı hazır ayarlar arasında Yumuşak Gölge, Neon Parıltısı, 3B Kabartma ve Retro Çerçeve bulunur.',
  'pageText.deb09314': 'Alt ağ hesaplayıcı hangi bilgileri sağlar?',
  'pageText.6e09390f':
    "Ağ Adresi, Yayın Adresi, Alt Ağ Maskesi, Joker Maske, İlk/Son Kullanılabilir Ana Makine IP'si, Toplam ve Kullanılabilir Ana Makine Sayısı, IP Sınıfı ve 32 bitlik İkilik gösterimleri hesaplar.",
  'pageText.f6fb6409': 'Tüm CIDR ön eklerini (/0 ile /32) destekliyor mu?',
  'pageText.eb723f55':
    'Evet. Özel /31 noktadan noktaya bağlantılar (RFC 3021) ve tek /32 ana makine maskeleri dahil, /0 ile /32 arasındaki tüm alt ağ ön ekleri desteklenir.',
  'pageText.7c278231': 'Hangi CSS filtre fonksiyonları destekleniyor?',
  'pageText.3027f78d':
    'Desteklenen fonksiyonlar arasında blur(), brightness(), contrast(), grayscale(), hue-rotate(), invert(), saturate(), sepia() ve opacity() bulunur.',
  'pageText.2666dde6': 'Oluşturulan CSS üretici ön eklerini içeriyor mu?',
  'pageText.45bdde19':
    'Evet. Tarayıcılar arası en yüksek uyumluluk için hem standart `filter` hem `-webkit-filter` özellikleri üretilir.',
  'pageText.4f32f1e3': "CSS'te 8 noktalı border-radius sözdizimi nasıl çalışır?",
  'pageText.c08c1dc8':
    'Eğik çizgi (/), yatay yarıçapları dikey yarıçaplardan ayırır: `border-radius: [TL-h] [TR-h] [BR-h] [BL-h] / [TL-v] [TR-v] [BR-v] [BL-v]`. Böylece yumuşak, organik, dairesel olmayan eğriler oluşturulur.',
  'pageText.8ed31f5b': 'Yüzde (%) ve piksel (px) birimleri arasında seçim yapabilir miyim?',
  'pageText.974f8f3e':
    'Evet, kontroller panelindeki birim değiştiriciyle % ve px arasında geçiş yapın.',
  'pageText.aff2e0e9': 'Hangi kimlik doğrulama yöntemleri destekleniyor?',
  'pageText.33b1ea50':
    'Bearer belirteçleri (`-H "Authorization: Bearer ..."`) ve Temel Kimlik Doğrulama (`-u "user:pass"`) desteklenir.',
  'pageText.f1fe0990': 'Özel karakterler ve tek tırnaklar güvenle kaçışlı yazılır mı?',
  'pageText.cacf393b':
    "Evet. bash ve zsh terminallerinde kabuk sözdiziminin bozulmasını önlemek için gövde JSON'u ve başlık metinleri doğru biçimde kaçışlı yazılır.",
  'pageText.5785e598': 'Hangi yüzey şekilleri var?',
  'pageText.7e6f4277':
    'Düz, Basılı (iç gölge), İçbükey (renk geçişi eğrisi) ve Dışbükey (ters renk geçişi eğrisi) yüzeyler desteklenir.',
  'pageText.9f1d34df': 'İkili gölgeler nasıl hesaplanır?',
  'pageText.b74d0389':
    'Oluşturucu, temel renk ve yoğunluk ayarlarınıza göre birbirini tamamlayan ışık kaynağı vurgusunu ve karanlık taraftaki gölgeyi otomatik hesaplar.',
  'pageText.65e43540': 'CSS ağ renk geçişleri canvas veya SVG olmadan nasıl çalışır?',
  'pageText.19ca56b9':
    'Birden fazla katmanlı `radial-gradient()` konumu, çok hızlı GPU çizimi için arka plan/filtre bulanıklığı efektleriyle düz arka plan üzerinde birleştirilir.',
  'pageText.49cc9737': 'Birden fazla renk düğümü ekleyip konumlarını değiştirebilir miyim?',
  'pageText.f51bb3c6':
    'Evet! En fazla 6 özel renk düğümü ekleyebilir ve X/Y koordinatlarını birbirinden bağımsız olarak %0 ile %100 arasında konumlandırabilirsiniz.',
  'pageText.51b04c8d': 'Hangi şekiller önceden yapılandırılmış?',
  'pageText.f8a18c44':
    'Üçgenler, Yamuklar, Paralelkenarlar, Eşkenar Dörtgenler, Beşgenler, Altıgenler, Yıldızlar ve Konuşma Balonları bulunur.',
  'pageText.27ea598c': 'Firefox ve modern Chromium tarayıcıları destekleniyor mu?',
  'pageText.a550ba24':
    'Evet. Tam tarayıcı kapsamı için hem modern standartları (`scrollbar-color` ve `scrollbar-width`) hem `::-webkit-scrollbar` üretici kurallarını oluşturur.',
  'pageText.c0a0fbb0': 'Bu desenleri çizmek için görsel dosyaları gerekir mi?',
  'pageText.da49a542':
    'Hayır. Tüm desenler yalnızca CSS `radial-gradient` ve `linear-gradient` fonksiyonlarıyla oluşturulur.',
  'pageText.3349cc09': 'Ham <path> HTML etiketleri yapıştırabilir miyim?',
  'pageText.bc6be089':
    'Evet. Araç, ham SVG etiketlerinden `d="..."` özniteliğini otomatik çıkarır.',
  'pageText.b5c8f73b': "npm'de ^ ile ~ arasındaki fark nedir?",
  'pageText.5e52dc36':
    '`^1.2.3`, soldan ilk sıfır olmayan basamağı değiştirmeyen güncellemelere (< 2.0.0) izin verir; `~1.2.3` ise yalnızca yama düzeyindeki değişikliklere (< 1.3.0) izin verir.',
  'pageText.0e286eaf': 'IPv6 yerel ağlarında standart alt ağ ön eki nedir?',
  'pageText.aa2aad9c':
    "RFC 4291'e göre IPv6 yerel ağ bölümleri için standart alt ağ boyutu /64 ön ekidir.",
  'pageText.58ddddc2': '5 bölümlü cron ifadesini hangi alanlar oluşturur?',
  'pageText.09710cdd':
    'Dakika (0-59), Saat (0-23), Ayın Günü (1-31), Ay (1-12) ve Haftanın Günü (0-6, Pazar=0).',
  'pageText.d3c9a849': 'SPF, alan adı e-postaları için neden önemlidir?',
  'pageText.61b98659':
    'SPF (Sender Policy Framework), istenmeyen posta gönderenlerin alan adınızı taklit eden yetkisiz e-postalar göndermesini önleyerek alan adı itibarınızı ve e-posta teslim edilebilirliğini korur.',
};
