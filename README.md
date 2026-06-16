# AeroCMS Angular Starter

Angular 19 starter website for Aero CMS using `@aero-cms/angular-sdk`. Public content API, component content schema sync, admin preview ve SEO için başlangıç noktası.

## Gereksinimler

- Node.js 20+
- Çalışan AeroCMS API (`aero-cms-api`)

## Hızlı Başlangıç

```bash
cp .env.example .env
npm install
npm start
```

| Servis | Varsayılan URL |
|--------|----------------|
| Frontend | `http://localhost:4200` |
| API (yerel) | `http://localhost:5047` |
| Admin panel | `http://localhost:5173/admin/` |

`aero-cms-setup` kullanıyorsanız `FRONTEND_STACK=angular` ile `src/environments/environment.ts` otomatik yazılır.

## Ortam / Yapılandırma

`src/environments/environment.ts`:

```typescript
export const environment = {
  cmsApiUrl: 'http://localhost:5047',
  siteUrl: 'http://localhost:4200',
  adminOrigin: 'http://localhost:5173',
};
```

Schema sync için shell'de:

```bash
CMS_API_URL=http://localhost:5047 CMS_TOKEN=your_admin_jwt npm run cms:sync
```

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/` | Ana sayfa (component content) |
| `/haberler`, `/etkinlikler`, `/dokumanlar` | İçerik listeleri |
| `/iletisim` | CMS formu |
| `/arama` | Site içi arama |
| `/:slug` | CMS sayfaları |
| `/sitemap.xml`, `/robots.txt` | Build-time SEO dosyaları (`public/`) |

## Schema Sync

```bash
CMS_TOKEN=your_admin_jwt npm run cms:sync
```

Schema tanımları: `src/lib/schemas.ts`

## Preview

URL'de `?cms-preview=true` ile admin panelden canlı önizleme çalışır. `environment.adminOrigin` allowlist olarak kullanılır.

## Çoklu Dil (i18n)

Header'daki dil seçici `aero_lang` çerezini ayarlar ve sayfayı yeniler. CMS istekleri seçilen `lang` ile yapılır.

## Build ve Docker

```bash
npm run build
```

`prebuild` script'i API'den sitemap/robots üretir (`scripts/generate-seo.mjs`).

```bash
docker build -t aero-cms-angular-starter .
docker run --rm -p 8080:80 aero-cms-angular-starter
```

Build argümanları: `CMS_API_URL`, `SITE_URL`, `ADMIN_ORIGIN`

## İlgili Repolar

- [aero-cms-api](https://github.com/aero-cms/aero-cms-api)
- [@aero-cms/angular-sdk](https://www.npmjs.com/package/@aero-cms/angular-sdk)
- [aero-cms-setup](https://github.com/aero-cms/aero-cms-setup)
