# ukeysuite

You can read this file in [English][english].

`ukeysuite`, [UKEY][lukey]'den (Uludağ KEY) ders bilgilerini almak, veritabanlarını tutmak ve ders içeriklerini indirmek için kullanılabilecek her şey dahil bir takım sunar. `ukeysuite`, Chrome/Chromium'u otomatikleştirmek için [Puppeteer][lpuppeteer] kütüphanesini kullanan bir [Node.js][lnodejs] programıdır – oturum açmayı ve UKEY'de bulunan ilgili içerikleri almayı otomatikleştirir.

Kullanıcı adınız (öğrenci numaranız), şifreniz ve UKEY'de erişilen içerik dahil olmak üzere hiçbir veriniz (açıkça paylaşmadıkça, yüklemedikçe veya commitlemedikçe) cihazınızdan ayrılmaz. Daha fazla bilgi için [aşağıya](#veri-gizliliği) bakın. `ukeysuite` tamamen açık kaynaklıdır ve GNU GPL v2 lisansı altında lisanslanmıştır.

## Örnek Kullanım Durumları

### 1. Kimlik bilgileri ve UKEY'e giriş

```json
Dosya: credentials.json
{
    username: "032090001",
    password: "çokgüvenli",
}
```

```typescript
const credentials = getCredentials('credentials.json');
const instance = await loginToUkey(credentials);
```

### 2. Alınan derslerin getirilmesi

```typescript
const courses = await fetchCoursesInstance(instance);
console.log('Courses I take this semester:');
courses!.forEach((course) => { console.log(course.courseName) });
```

### 3. Kıyaslanabilir veritabanı üretimi

```typescript
createCourseDatabaseFile(courses, instance);
```

## Özellikler

| Özellik                                                  | Durumu    | Versiyonu      |
| -------------------------------------------------------- | --------- | -------------- |
| Kimlik bilgileri dosyası okuma/yazma                     | VAR       | [v1.0.0][tag1] |
| Alınan tüm dersleri alma                                 | VAR       | [v1.0.0][tag1] |
| Dersler ve ders öğeleri ile veritabanı dosyası oluşturma | VAR       | [v1.0.0][tag1] |
| Tam tipler, arayüzler ve yorumlar                        | VAR       | [v1.0.0][tag1] |
| Tüm dosyaları, seçili dersleri, seçili dosyaları indirme | YAPILACAK | ...            |

## Veri Gizliliği

Daha önce belirtildiği gibi, `ukeysuite` her türlü ortamda çalışması için tasarlanmıştır (halka dönük, açık internet IP adresine sahip sunucular dahil) ve bilinen herhangi bir güvenlik açığı veya arka kapı yoktur. Bu kütüphaneyi kullanarak, oluşturduğunuz herhangi bir veri, açıkça, kısmen veya yanlışlıkla paylaştığınız veya `ukeysuite`'in bir çıktısı olan veya herhangi bir VCS'ye yüklediğiniz veriler ve bununla ilişkilendirilebilecek herhangi bir meta veri sizin sorumluluğunuzdadır. `ukeysuite` tarafından üretilen gizli verilerinizin güvenli bir şekilde saklandığından ve herhangi bir şekilde taşındığında güvenli bir şekilde taşındığından emin olmak sizin sorumluluğunuzdadır.

## Katkıda Bulunma

Bu kütüphaneyi geliştirmek ve iyileştirmek için her türlü katkıya açığım! Hata düzeltmek, yeni bir özellik eklemek veya bir öneride bulunmak isterseniz bana ulaşmaktan çekinmeyin.

Küçük bir detay, projeye eklenen her kod ve özellik, projenin tabi olduğu lisans altında lisanslanacaktır. Eğer kafanız karıştıysa, katkı süreciyle ilgili sorularınız varsa bir issue açarak benimle iletişime geçin.

## Credits

Herhangi bir konuda işbirliği için benimle iletişime geçmekten çekinmeyin!

Ferit Yiğit BALABAN, <fybalaban@fybx.dev>

[Websitem][2] • [Bento][5] • [X][3] • [LinkedIn][4]

2023

[tag1]: https://www.npmjs.com/package/ukeysuite/v/1.0.0
[2]: https://fybx.dev
[3]: https://twitter.com/
[4]: https://www.linkedin.com/in/fybx
[5]: https://bento.me/balaban
[lukey]: https://ukey.uludag.edu.tr/
[lpuppeteer]: https://pptr.dev/
[lnodejs]: https://nodejs.org/en
[english]: README.md
