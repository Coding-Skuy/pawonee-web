> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 40-TECHSTACK — Tumpukan Teknologi (pawonee-web)

Mengacu: Pawonee-TownHall v1.0.0 (https://github.com/Coding-Skuy/Pawonee-TownHall).

## 1. Kondisi saat ini (tercatat, bukan diubah)

- Next.js 15.1.6, React 19.0.0, TypeScript 5.7.2, Node.js 22.12.0 LTS (sumber: `package.json`, `README.md`, `VERSIONS.md` infra). Kondisi saat ini: Next.js 15 — drift dari kunci standar divisi.
- Basis URL backend: `NEXT_PUBLIC_PAWONEE_API` (bawaan `http://localhost:8080`).
- Cermin model: `src/lib/pantryResep.ts` diselaraskan manual ke `:shared:pantry-resep` milik Pawonee dan `models/schema.json`.
- Kondisi Next.js 15 adalah drift yang dicatat apa adanya dari `package.json` dan `VERSIONS.md`.

## 2. Target standar emas (rencana)

- SvelteKit versi terbaru dan Bun versi terbaru (runtime dan manajer paket), TypeScript 5.x terbaru.
- Alasan: keselarasan divisi ke tumpukan SvelteKit dan Bun untuk web pendamping; waktu muat lebih ringan untuk halaman resep.
- Target lain yang selaras: backend Rust axum 0.8.4, KMP Kotlin 2.2.20 dan Compose 1.8.2 dan nav3 1.0.0, Python 3.12, Postgres 16.x, database `pawonee`, JWT audiens `pawonee`.

## 3. Langkah migrasi (rencana — BUKAN eksekusi sekarang)

1. Saat fase coding dimulai, ganti `package.json`: keluarkan `next`, `react`, `react-dom`, `eslint-config-next`; masukkan `@sveltejs/kit`, `svelte`, `vite`, adapter Bun.
2. Ganti routes: `src/app/page.tsx` menjadi rute SvelteKit `src/routes/+page.svelte` (ditambah `+layout.svelte`, `+server.ts` bila perlu API).
3. Ganti komponen: `RecipeCard` referensi React menjadi komponen Svelte; pindahkan `src/lib/pantryResep.ts` menjadi versi SvelteKit (fungsi `fetch` sama, tanpa dependensi Next).
4. Ganti konfigurasi: hapus `next.config.mjs`, tambah `svelte.config.js` dan `vite.config.ts`; perbarui `tsconfig.json` ke preset SvelteKit.
5. Validasi: `bun install`, `bun run check`, `bun run build`, uji kontrak `GET /v1/resep/rekomendasi` dan preferensi tetap lolos.
6. Perbarui `VERSIONS.md` di infra dan dokumen ini setelah migrasi selesai.

## 4. Matriks versi

| Komponen | Saat ini | Target |
|---|---|---|
| Runtime web | Node.js 22.12.0 | Bun terbaru |
| Framework web | Next.js 15.1.6 | SvelteKit terbaru |
| UI | React 19.0.0 | Svelte terbaru |
| Bahasa | TypeScript 5.7.2 | TypeScript 5.x terbaru |

## Batasan

- JANGAN migrasi Next.js sekarang; JANGAN ubah kode dalam dokumen versi ini. Bagian migrasi di atas adalah rencana yang didokumentasikan, bukan eksekusi.
- Dokumen versi ini tidak mengubah `package.json`, routes, atau komponen.
- JWT audiens tetap `pawonee`; basis data tetap `pawonee`; kontrak API tidak berubah akibat rencana migrasi.
- Eksekusi migrasi hanya dimulai pada fase coding setelah persetujuan TownHall Pawonee-TownHall v1.0.0.
- Perencanaan BRD, PRD, FSD, dan roadmap repo ini mengacu Pawonee-TownHall v1.0.0 dan tidak diduplikasi di sini.
