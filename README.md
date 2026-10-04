# pawonee-web

Web pendamping Pawonee — **Divisi Pawonee (AI Cooking Assistant)**, org `Coding-Skuy`. Bagian dari arsitektur **Opsi A ChefGenie**.

- TownHall: [Coding-Skuy/Pawonee-TownHall](https://github.com/Coding-Skuy/Pawonee-TownHall).
- Modul `:shared:pantry-resep` adalah **milik Pawonee** (sumber: repo `pawonee-app-kmp/shared/pantry-resep`); web ini hanya **mengonsumsi** tipenya lewat `src/lib/pantryResep.ts` yang diselaraskan manual dengan skema bank resep.
- Konsumen hilir: **Pedaree** memakai keluaran resep/preferensi Pawonee sebagai sinyal rekomendasi.

## Teknologi (versi dipin)

| Komponen | Versi |
|---|---|
| Node.js | 22.12.0 LTS |
| Next.js | 15.1.6 |
| React | 19.0.0 |
| TypeScript | 5.7.2 |

## Cara jalan

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build && npm start
```

Basis URL backend diatur lewat `NEXT_PUBLIC_PAWONEE_API` (bawaan `http://localhost:8080`).

## Kontrak API

Sama dengan aplikasi KMP: `GET /v1/resep/rekomendasi`, `GET/PUT /v1/preferensi/{id}` pada `pawonee-backend-service`. Skema mengikuti `models/schema.json` di `pawonee-ai-models`.

## Repo terkait

- [pawonee-app-kmp](https://github.com/Coding-Skuy/pawonee-app-kmp) (pemilik `:shared:pantry-resep`)
- [pawonee-backend-service](https://github.com/Coding-Skuy/pawonee-backend-service)
- [pawonee-ai-models](https://github.com/Coding-Skuy/pawonee-ai-models)
