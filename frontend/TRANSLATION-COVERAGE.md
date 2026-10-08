# Yedi dil için çeviri kapsamı

8 Ekim 2026 tarihli yerel çalışma. Dal: `localization/complete-translations-2026-10-08`.
Başlangıç commit'i: `90c68375ab90de0b78d661b2bcc271b010c8565f`.

İngilizce, Türkçe, Almanca, İspanyolca, Fransızca, Rusça ve Çince sözlükleri;
araç adları, açıklamaları, arayüz metinleri, erişilebilir etiketler, hata iletileri,
sayaçlar, sayfalardaki SSS ve açıklama bölümleri birlikte incelendi. Etkin sözlük
önceliği, sayfa başlıkları, listeler ve arama sonuçları aynı çeviriyi kullanır.
Uzun açıklama sözlükleri sunucuda kalır; istemci etkin dilin arayüzünü yükler.

## Envanter

- Ortak etkin sözlük 2.215 anahtardan **4.813 anahtara** çıktı: her dil için
  **2.598 yeni anahtar**. Türkçe ve Almancadaki önceden var olan iki ek URL
  kodlayıcı anahtarı korundu.
- Kaynakta kullanılan fakat yedi sözlükte de bulunmayan **143 anahtarın
  1.001 dil/anahtar değeri** tamamlandı. Başlangıç etkin sözlüklerinde boş değer
  yoktu; İngilizce miras değerler birçok çeviri eksiğini gizliyordu.
- 490 aracın ad ve açıklamaları denetlendi. Altı dilde İngilizceden miras kalan
  **4.568 metadata alanı** yerelleştirildi.
- SSS ve açıklama bölümlerindeki **1.422 farklı kaynak metnin** altı dilde
  tamamı çevrildi: **8.532 çeviri**. Kod örnekleri aynı kaldı.
- Son kaynak taramasında 1.080 dosyada 2.955 sabit çeviri çağrısı anahtarı
  denetlendi. Çözülemeyen anahtar, boş değer, adlandırılmış yer tutucu
  uyuşmazlığı veya bozuk `U+FFFD` karakteri bulunmadı.
- Başlangıç etkin sözlüklerindeki 12 bozuk karakter içeren alan düzeltildi.
  Sayaçlar dilin `Intl.PluralRules` kategorileri ve adlandırılmış yer tutucularla
  çalışır.

| Dil | Etkin sözlük | İstemci arayüzü |     SSS/açıklama | İncelenmiş İngilizceyle aynı değer |
| --- | -----------: | --------------: | ---------------: | ---------------------------------: |
| en  |        4.813 |           3.880 | İngilizce kaynak |                                  — |
| tr  |        4.815 |           3.882 |            1.422 |                                232 |
| de  |        4.815 |           3.882 |            1.422 |                                331 |
| es  |        4.813 |           3.880 |            1.422 |                                255 |
| fr  |        4.813 |           3.880 |            1.422 |                                276 |
| ru  |        4.813 |           3.880 |            1.422 |                                229 |
| zh  |        4.813 |           3.880 |            1.422 |                                212 |

İngilizceyle aynı kalan 1.535 değer; protokol, marka, teknik tanımlayıcı, birim,
kod veya işlevsel örnek gibi gerekçelerle tek tek incelendi. Tam anahtar, değer
ve gerekçe `src/translations/intentionalEnglish.ts` içinde kayıtlıdır. Kapsam
testi yeni bir İngilizce metnin bu listenin dışına sızmasını engeller. Araç
metadata'sında veya çevrilen uzun açıklamalarda İngilizceyle aynı metin yoktur.

## Davranış ve inceleme

Kullanıcı verileri ve saklanan çalışma alanı adları, kod/örnek girdileri,
protokol değerleri, form seçeneklerinin işlevsel değerleri ve algoritmalar
korunur. Tanınmayan yerel ayrıştırıcı
hataları özgün tanı bilgisini korur. Doğal dil cron aracının İngilizce örnekleri
mevcut ayrıştırıcının kabul ettiği girdilerdir. Kılavuzlar ve çeviri sistemi
olmayan CLI/eklenti yüzeyleri mevcut İngilizce içeriğini kullanır; kılavuz
bağlantılarında dil belirtilir.

JSON Pointer açıklamasındaki çözme sırası, mevcut doğru ayrıştırıcıyla uyumlu
olarak `~1`, ardından `~0` şeklinde düzeltildi.
[RFC 6901, bölüm 4](https://www.rfc-editor.org/rfc/rfc6901#section-4).

Dil sahiplerinden bağımsız inceleme ve kök uygulama incelemesi tamamlandı;
açık bulgu kalmadı. 461 dosyada korunan girdi/başlangıç değerleri ve JSX
özellikleri karşılaştırıldı. Var olan test vakaları ve doğrulama ifadeleri
korundu. İnceleme sırasında yakalanan test mock'u dönüşüm hatası düzeltildi;
UnicodeEscape'in dört ve PasswordGenerator'ın bir özgün test gövdesinin
başlangıçla aynı olduğu bağımsız AST karşılaştırmasıyla doğrulandı.

Uzun Almanca başlıkların 320/390 pikselde favori düğmesini ekran dışına
itmesi gerçek tarayıcı kontrolünde yakalandı. Ortak başlık metni artık
daralabilir ve uzun kelimeler satıra bölünür; favori düğmesinin ölçüsü korunur.
Üç araç da her iki genişlikte tekrar geçti. Aynı adlı Çince 404/altbilgi
bağlantıları için test 404 içeriğindeki tam ad ve hedefi denetler.

## Doğrulama

- Tam birim testi: **535 dosya, 1.603 test geçti**; başarısız veya bekleyen
  test yok. Önceki 1.583 vaka korundu; 20 çeviri/kapsam vakası eklendi.
- Son mobil CSS değişikliğinden sonra etkilenen ortak bileşen, çeviri kapsamı
  ve istemci bundle sınırı tekrar doğrulandı: **3 dosya, 40 test geçti**.
- Son üretim derlemesi: **3.962/3.962 sayfa oluşturuldu**. TypeScript ve lint
  geçti; lint'te sıfır hata ve önceden var olan 10 uyarı kaldı.
- `npm audit`: tüm önem seviyelerinde **0 açık**. Önceki guarded-braces
  kaynak/kurulum ve yapısal saldırı regresyon kapısı geçti; paket, kilit dosyası
  ve vendor düzeltmesi aynı kaldı.
- İlk tam tarayıcı çalışmasındaki dört bulgunun hedefli son kontrolü:
  **4/4 geçti**. Son üretim çıktısındaki tam tarayıcı çalışması:
  **63/63 geçti**; sıfır atlanan, başarısız veya kararsız test. Önceki 49 vaka
  korundu; yedi dil için 14 masaüstü/mobil vaka eklendi. 490 araç açılışı,
  checksum karşılaştırma regresyonları, klavye araması ve cURL dönüşümü,
  yerelleştirilmiş SSS/JSON-LD, 404 hedefleri ve 320/390 piksel düzenleri geçti.

İlk tam tarayıcı çalışması 59/63 geçti. İki eski Türkçe metin beklentisi,
Almanca başlık taşması ve Çince bağlantı eşleşmesi düzeltildi; test kaldırılmadı,
atlanmadı veya doğrulama zayıflatılmadı. Ayrıntılı yerel çıktılar
`output/verification/localization/` altındadır; bu üretilen dosyalar commit'e
dahil edilmez.

Tarayıcı projesi Chromium kullanır. Firefox ve Safari çalıştırılmamıştır.
Yedi dilde üç kritik aracın masaüstü, 320/390 piksel mobil ve klavye akışları
test edildi. Yedi dilin checksum arayüz görüntüleri ve düzeltilen uzun Almanca
başlıkların 320 piksel görüntüleri ayrıca incelendi. Son Almanca ölçümünde üç
aracın belge genişliği 320 ve 390 piksel görünüm genişliklerine eşittir.
Bu kontrol tüm araçların her dilde görsel olarak incelendiği
anlamına gelmez. Araçların tamamının çeviri kapsamı ayrıca statik ve birim
testleriyle doğrulanır.

Bu çalışma yerel commit olarak teslim edilir. Çeviriler push edilmez; PR,
birleştirme veya dağıtım yapılmaz. Paketler, önceki guarded-braces güvenlik
düzeltmesi ve analitik ayarları değiştirilmez.
