# AeroCMS Angular Starter

Angular 19 starter website for Aero CMS using `@aero-cms/angular-sdk`.

## Quick Start

```bash
cp .env.example .env
npm install
npm start
```

| Service | Default URL |
|---------|-------------|
| Frontend | `http://localhost:4200` |
| API | `http://localhost:5047` |
| Admin | `http://localhost:5173/admin/` |

Update `src/environments/environment.ts` with your API URL.

## Pages

- `/` — Home
- `/haberler`, `/etkinlikler`, `/dokumanlar`
- `/iletisim`, `/arama`, `/:slug`

## Related

- [@aero-cms/angular-sdk](https://www.npmjs.com/package/@aero-cms/angular-sdk)
