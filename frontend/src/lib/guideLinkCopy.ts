import type { Language } from '@/lib/i18nRouting';

interface GuideLinkCopy {
  heading: string;
  english: string;
  extractTimestamp: string;
  labels: Record<string, string>;
}

export const guideLinkCopy: Record<Language, GuideLinkCopy> = {
  en: {
    heading: 'Practical guides',
    english: 'English',
    extractTimestamp: 'Inspect a UUID v7 timestamp',
    labels: {
      '/guides/verify-sha256-file-checksum': 'Verify a SHA-256 file checksum',
      '/guides/decode-unicode-escapes': 'Decode Unicode escapes in text and JSON',
      '/guides/uuid-v4-vs-v7': 'Generate UUID v4 and v7 identifiers',
      '/guides/jwt-signature-verification-guide': 'Verify a JWT signature and claims',
      '/guides/bcrypt-vs-argon2-hashing': 'Compare Bcrypt vs Argon2id password hashing',
      '/guides/json-schema-validation-guide': 'Validate JSON payloads with JSON Schema',
    },
  },
  tr: {
    heading: 'Pratik rehberler',
    english: 'İngilizce',
    extractTimestamp: 'UUID v7 zaman damgasını incele',
    labels: {
      '/guides/verify-sha256-file-checksum': 'SHA-256 dosya sağlama toplamını doğrulama',
      '/guides/decode-unicode-escapes': 'Metin ve JSON içinde Unicode kaçışlarını çözme',
      '/guides/uuid-v4-vs-v7': 'UUID v4 ve v7 tanımlayıcıları oluşturma',
      '/guides/jwt-signature-verification-guide': 'JWT imzasını ve claim alanlarını doğrulama',
      '/guides/bcrypt-vs-argon2-hashing': 'Bcrypt ve Argon2id parola özetleme karşılaştırması',
      '/guides/json-schema-validation-guide': 'JSON verilerini JSON Schema ile doğrulama',
    },
  },
  de: {
    heading: 'Praktische Anleitungen',
    english: 'Englisch',
    extractTimestamp: 'UUID-v7-Zeitstempel untersuchen',
    labels: {
      '/guides/verify-sha256-file-checksum': 'SHA-256-Dateiprüfsumme überprüfen',
      '/guides/decode-unicode-escapes': 'Unicode-Escapes in Text und JSON dekodieren',
      '/guides/uuid-v4-vs-v7': 'UUID-v4- und UUID-v7-Kennungen erzeugen',
      '/guides/jwt-signature-verification-guide': 'JWT-Signatur und Claims sicher verifizieren',
      '/guides/bcrypt-vs-argon2-hashing': 'Bcrypt vs. Argon2id beim Passwort-Hashing',
      '/guides/json-schema-validation-guide': 'JSON-Payloads mit JSON Schema validieren',
    },
  },
  es: {
    heading: 'Guías prácticas',
    english: 'inglés',
    extractTimestamp: 'Inspeccionar la marca de tiempo de un UUID v7',
    labels: {
      '/guides/verify-sha256-file-checksum': 'Verificar la suma SHA-256 de un archivo',
      '/guides/decode-unicode-escapes': 'Decodificar escapes Unicode en texto y JSON',
      '/guides/uuid-v4-vs-v7': 'Generar identificadores UUID v4 y v7',
      '/guides/jwt-signature-verification-guide': 'Verificar firmas y claims JWT',
      '/guides/bcrypt-vs-argon2-hashing': 'Comparar Bcrypt frente a Argon2id en contraseñas',
      '/guides/json-schema-validation-guide': 'Validar cargas JSON con JSON Schema',
    },
  },
  fr: {
    heading: 'Guides pratiques',
    english: 'anglais',
    extractTimestamp: 'Examiner l’horodatage d’un UUID v7',
    labels: {
      '/guides/verify-sha256-file-checksum': 'Vérifier la somme SHA-256 d’un fichier',
      '/guides/decode-unicode-escapes': 'Décoder les séquences Unicode dans du texte et du JSON',
      '/guides/uuid-v4-vs-v7': 'Générer des identifiants UUID v4 et v7',
      '/guides/jwt-signature-verification-guide': 'Vérifier une signature et des claims JWT',
      '/guides/bcrypt-vs-argon2-hashing': 'Comparer Bcrypt et Argon2id pour les mots de passe',
      '/guides/json-schema-validation-guide': 'Valider des charges JSON avec JSON Schema',
    },
  },
  ru: {
    heading: 'Практические руководства',
    english: 'на английском',
    extractTimestamp: 'Проверить временную метку UUID v7',
    labels: {
      '/guides/verify-sha256-file-checksum': 'Проверка контрольной суммы SHA-256 файла',
      '/guides/decode-unicode-escapes': 'Декодирование Unicode-последовательностей в тексте и JSON',
      '/guides/uuid-v4-vs-v7': 'Генерация идентификаторов UUID v4 и v7',
      '/guides/jwt-signature-verification-guide': 'Проверка подписи JWT и claims',
      '/guides/bcrypt-vs-argon2-hashing': 'Сравнение Bcrypt и Argon2id для паролей',
      '/guides/json-schema-validation-guide': 'Валидация JSON с помощью JSON Schema',
    },
  },
  zh: {
    heading: '实用指南',
    english: '英文',
    extractTimestamp: '查看 UUID v7 时间戳',
    labels: {
      '/guides/verify-sha256-file-checksum': '验证文件的 SHA-256 校验和',
      '/guides/decode-unicode-escapes': '解码文本和 JSON 中的 Unicode 转义',
      '/guides/uuid-v4-vs-v7': '生成 UUID v4 和 v7 标识符',
      '/guides/jwt-signature-verification-guide': '安全验证 JWT 签名与声明',
      '/guides/bcrypt-vs-argon2-hashing': '对比 Bcrypt 与 Argon2id 密码哈希',
      '/guides/json-schema-validation-guide': '使用 JSON Schema 校验 JSON 数据',
    },
  },
};

export function getGuideLinkCopy(locale: Language = 'en'): GuideLinkCopy {
  return guideLinkCopy[locale];
}
