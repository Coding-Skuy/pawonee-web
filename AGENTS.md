# AGENTS.md — pawonee-web

Repo `pawonee-web` adalah web pendamping Pawonee (dasbor, halaman bagi/cetak resep, API pendamping) yang mem-port rumus rekomendasi dari `:shared:pantry-resep` ke TypeScript.

## Sumber kebenaran

Seluruh requirement berada di `Pawonee-TownHall` (versi beku v1.0.0). Repo ini dilarang menduplikasi requirement; bila requirement berubah, buka PR di TownHall dulu.

| Dokumen | Isi yang mengikat repo ini |
|---|---|
| [`platform/versions/v1.0.0/BRD/10-resep-grade2.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/BRD/10-resep-grade2.md) | 12 resep inti, substitusi baku, faktor porsi 1–8 jiwa, pembulatan |
| [`platform/versions/v1.0.0/BRD/20-preferensi-keluarga.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/BRD/20-preferensi-keluarga.md) | Profil keluarga, daftar alergi/pantangan/alat, filter keras |
| [`platform/versions/v1.0.0/PRD/30-kriteria.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/PRD/30-kriteria.md) | US-001..US-006 dan non-goals v1.0.0 |
| [`platform/versions/v1.0.0/FRD/10-fungsional.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/FRD/10-fungsional.md) | FR-001..FR-303 |
| [`platform/versions/v1.0.0/FSD/10-alur.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/FSD/10-alur.md) | Urutan luring-dahulu, cache, pekerja 07.00, navigasi |
| [`platform/versions/v1.0.0/FSD/20-model-data.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/FSD/20-model-data.md) | Entitas, enum, aturan angka, tabel DB `pawonee` |
| [`platform/versions/v1.0.0/FSD/30-kontrak.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/FSD/30-kontrak.md) | Kontrak API, event, galat, autentikasi |
| [`platform/versions/v1.0.0/SRS/40-acceptance-criteria.md`](https://github.com/Coding-Skuy/Pawonee-TownHall/blob/main/platform/versions/v1.0.0/SRS/40-acceptance-criteria.md) | QA-001..QA-004 (QA gate) |
| [`KONTEKS-LINTAS-DIVISI.md`](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/KONTEKS-LINTAS-DIVISI.md) (ChefGenie-TownHall) | Event, komoditas pilot (§4), grade (§5), satuan/ID/uang (§6), metrik (§7), isu terbuka (§8) |
| [`townhall-roadmap.md`](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) | Batas context (§2) dan Definisi selesai (§6) |

Dokumen turunan repo ini: `versions/v1.0.0/docs/40-TECHSTACK.md` dan `versions/v1.0.0/docs/60-BLAST-RADIUS.md`; keputusan di `docs/decisions/`.

## Tech stack terkunci

- **Bun + Svelte 5 + SvelteKit 2 + TypeScript**; versi dikunci eksak saat kickoff coding (rujukan produk: Bun 1.4.x, TypeScript 5.9.x). Runes `$state`/`$derived`, debounce 300 ms.
- Validasi API: Zod; CORS hanya `https://pawonee.chefgenie.id`; cron Bun harian untuk email 1 resep tercepat bagi stok layu.
- Port `RekomendasiEngine` di `src/lib/server/rekomendasi.ts`; paritas dengan Kotlin selisih <0,01 pada 32 kasus.
- **Drift tercatat**: repo saat ini Next.js 15.1.6 + React 19.0.0 + Node.js 22.12.0 (README, `package.json`). Kewajiban migrasi ke Bun + Svelte 5 + SvelteKit 2 (tiket PWN-WEB-005, MILESTONE M-008) tertulis di TECHSTACK.

Larangan: Next.js dan React untuk kode produk baru (kecuali selama migrasi berjalan); menghitung harga di klien web; logika resep ganda di luar port resmi.

## Invarian domain Pawonee (terkunci v1.0.0)

- **12 resep inti** (`R-01`..`R-12`: tempe-tumis-bawang, sayur-bening-bayam, telur-balado, nasi-goreng-kampung, sop-ayam-sederhana, tumis-kangkung, semur-tahu, pecel-sayur, ayam-kecap-rumahan, sop-jagung-telur, sambal-goreng-tempe-kentang, capcay-kuah). File lama 24 resep berstatus SUPERSEDED (KONTEKS §8.4); dilarang menambah resep ke-13 pada v1.0.0 (PRD 30 Non-Goals; perluasan bank masuk v2.0.0).
- `kodeGrade` ∈ {`G2-V`, `G2-U`, `G2-S`, `NON-G2`}. G2-S dengan kedaluwarsa ≤2 hari mendapat bonus skor +5, tidak boleh diskala untuk esok, dan sisanya dialihkan ke resep sapu stok (KONTEKS §5 menyebut R-24 capcay sapu stok; pada bank 12 resep resep itu adalah `capcay-kuah`, `R-12`).
- Porsi **1–8 jiwa** (faktor 0,30 / 0,55 / 0,80 / 1,00 / 1,25 / 1,50 / 2,00 untuk 1/2/3/4/5/6/8 jiwa); di luar rentang → `JIWA_DI_LUAR_RENTANG`. Biaya per porsi keluarga 4 jiwa **Rp18.000–Rp45.000**.
- Berat gram integer, uang rupiah integer, waktu menit integer. Satuan sah: 13 kode baku Pedaree (KONTEKS §6).
- **PEMILIK** modul `:shared:pantry-resep` (`id.chefgenie.pawonee:pantry-resep:1.0.0`) adalah Pawonee; Pedaree hanya mengonsumsi.
- DB logis `pawonee`; JWT akses 15 menit + refresh 7 hari, audiens `pawonee`.
- Metrik keberhasilan per keluarga per minggu: serapan G2 ≥ **1.500 g**, rasio serapan ≥ **80%**, waste dapur ≤ **300 g**.
- QA gate: evaluasi bank resep **12/12** lolos per rilis (bukti `eval/metrics.md` di `pawonee-ai-models`); rilis diblokir bila gagal.
- Resep yang mengklaim pasokan agregasi Lumbung wajib memakai komoditas pilot (cabai, bawang, kangkung); kentang/wortel/tomat/kol hanya lewat jalur grade-2 pasar (KONTEKS §4).
- Rekomendasi: maksimal 5 item, on-device <800 ms pada HP RAM 3 GB; paritas Kotlin lawan TypeScript selisih <0,01 pada 32 kasus.

## Aturan kerja AI

1. **Baca dulu**: baca `AGENTS.md` ini dan semua ADR di `docs/decisions/` sebelum menulis kode.
2. **TDD merah-hijau**: tulis uji gagal dulu, lalu implementasi. Rilis diblokir bila QA gate gagal (SRS QA-001..QA-004; evaluasi bank 12/12).
3. **Kontrak berversi**: kontrak API/event hanya diubah lewat bump versi (`X-Kontrak-Versi`) dan dicatat di ADR baru; event baru atau perubahan skema memakai masa dual-read 30 hari (KONTEKS §9).
4. **Commit & CHANGELOG**: awalan `docs:`/`feat:`/`fix:`; setiap commit yang mengubah perilaku wajib memperbarui `CHANGELOG.md` repo.
5. **ADR immutable**: keputusan arsitektur baru = tambah ADR bernomor di `docs/decisions/` (1 keputusan per file, berurutan). ADR lama tidak diedit; ganti dengan ADR baru berstatus "Menggantikan ADR-NNNN".
6. **Isolasi data**: DB per service. Dilarang menyentuh DB divisi lain; Pedaree dibaca hanya lewat API/event-nya; Titeny hanya membaca (read-only) dari DB sumber.
7. **Tanpa duplikasi requirement**: requirement berubah = PR di `Pawonee-TownHall` dulu, baru kode mengikuti.
8. **Dokumen beku**: `versions/v1.0.0/` tidak diedit setelah disetujui; perubahan masuk `v1.1.0`/`v2.0.0`.
9. **Migrasi**: kode baru ditulis untuk Svelte 5/SvelteKit 2; migrasi Next.js 15 dimulai hanya setelah kontrak dibekukan dan fase coding disetujui TownHall (M-008). Jangan menambah fitur baru di kode Next.js.
10. **Paritas**: selisih skor >0,01 pada 32 kasus memblokir rilis web.

## Definisi selesai

Dari [townhall-roadmap §6](https://github.com/Coding-Skuy/ChefGenie-TownHall/blob/main/townhall-roadmap.md) (per milestone app):

- Dokumen versi lengkap (BRD/FRD/FSD/PRD/SRS) + `SNAPSHOT-ROADMAP.md`.
- QA gate berbasis SRS lulus (TDD merah-hijau).
- Kontrak API terbit; audit keamanan bersih (JWT audiens + DB per service).
- Bukti metrik lintas-divisi (KONTEKS §7) tercatat.
- CHANGELOG versi diperbarui; dokumen beku tidak diedit.

Khusus repo ini: paritas 32 kasus hijau (`bun run test`), 6 rute `/api/v1` lolos uji kontrak, halaman publik bagi tanpa login, migrasi ke SvelteKit/Bun tuntas (M-004, M-008).
