# ADR-0001 — Fondasi teknis pawonee-web

Status: Diterima | Tanggal: 2026-10-14

## Konteks

`pawonee-web` lahir dari template Next.js 15 yang menyimpang dari standar divisi (Bun + Svelte 5 + SvelteKit 2). Sumber kebenaran: Pawonee-TownHall `platform/versions/v1.0.0` (https://github.com/Coding-Skuy/Pawonee-TownHall/tree/main/platform/versions/v1.0.0), beku 2026-10-07; lintas divisi: [KONTEKS-LINTAS-DIVISI.md](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/KONTEKS-LINTAS-DIVISI.md). Tiket fondasi: PWN-WEB-001 (issue #1).

## Keputusan

1. Stack web: Bun + Svelte 5 + SvelteKit 2 + TypeScript; Next.js/React dilarang untuk kode baru.
2. Repo drift ke Next.js 15 dicatat; migrasi wajib dilakukan (tiket PWN-WEB-005) setelah kontrak dibekukan.
3. Web mem-port rumus dari `:shared:pantry-resep`; paritas selisih <0,01 pada 32 kasus sebagai gerbang rilis.
4. Enam rute `src/routes/api/v1/` dengan bentuk JSON identik kontrak mobile; JWT audiens `pawonee`; CORS hanya `https://pawonee.chefgenie.id`.
5. Stok memakai proksi baca ke Pedaree dengan cache 60 detik dan header `X-Data-Usang: true` saat Pedaree mati; web tidak pernah menghitung harga.

## Konsekuensi

- Selama migrasi berjalan, CI dan `pawonee-design` (RecipeCard referensi React) harus ikut diselaraskan.
- Kontrak API dibekukan selama migrasi; perubahan kontrak ditunda.
- Port TypeScript menambah beban uji paritas pada setiap perubahan rumus Kotlin.
