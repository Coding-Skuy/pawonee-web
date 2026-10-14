> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 40-TECHSTACK — Tumpukan Teknologi (pawonee-web)

Mengacu: Pawonee-TownHall `platform/versions/v1.0.0` (https://github.com/Coding-Skuy/Pawonee-TownHall/tree/main/platform/versions/v1.0.0), beku 2026-10-07. Tidak menduplikasi BRD/PRD/FRD/FSD/SRS; hanya mengunci stack repo ini.

## 1. Matriks stack

| Komponen | Kondisi saat ini (tercatat) | Target terkunci v1.0.0 |
|---|---|---|
| Runtime | Node.js 22.12.0 LTS | Bun (versi eksak dikunci saat kickoff; rujukan 1.4.x) |
| Framework | Next.js 15.1.6 | SvelteKit 2 |
| UI | React 19.0.0 | Svelte 5 (runes) |
| Bahasa | TypeScript 5.7.2 | TypeScript 5.9.x (rujukan produk/21) |
| Validasi | belum ada | Zod |
| Uji | belum ada | `bun run test` 32 kasus paritas |

## 2. Kewajiban migrasi (drift Next.js/React)

Repo masih Next.js 15 + React 19 — menyimpang dari standar divisi. Migrasi ke **Bun + Svelte 5 + SvelteKit 2** WAJIB dilakukan; tiket pelaksana: `PWN-WEB-005` (issue #5), induk MILESTONE M-008.

Langkah: (1) bekukan kontrak; (2) ganti `package.json` (keluarkan `next`, `react`, `react-dom`, `eslint-config-next`; masukkan `@sveltejs/kit`, `svelte`, `vite`, adapter Bun); (3) pindahkan `src/app/*` ke `src/routes/*` (`+page.svelte`, `+layout.svelte`, `+server.ts`); (4) pindahkan `src/lib/pantryResep.ts` ke versi SvelteKit; (5) ganti `next.config.mjs` dengan `svelte.config.js` + `vite.config.ts`; (6) validasi `bun install`, `bun run check`, `bun run build`, uji kontrak, paritas 32 kasus; (7) perbarui `VERSIONS.md` di `pawonee-infra-devops`.

Syarat mulai: kontrak dibekukan dan fase coding disetujui TownHall (M-008). Tidak ada fitur baru di kode Next.js.

## Batasan

- Dokumen ini tidak mengubah manifes atau kode; kondisi saat ini dicatat apa adanya dari manifes/README repo.
- Versi dikunci eksak di manifes saat kickoff coding; perubahan versi dicatat di dokumen ini lewat versi dokumen berikutnya dan ADR baru.
- JWT audiens `pawonee`, DB logis `pawonee`, dan `:shared:pantry-resep` milik Pawonee tidak berubah oleh dokumen ini.
