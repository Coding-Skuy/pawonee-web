> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 60-BLAST-RADIUS — Batas Context (pawonee-web)

Mengacu: Pawonee-TownHall `platform/versions/v1.0.0` (https://github.com/Coding-Skuy/Pawonee-TownHall/tree/main/platform/versions/v1.0.0), beku 2026-10-07. Baris Pawonee townhall-roadmap §2: point of concern "12 resep inti; serapan ≥1.500 g"; batas context "G2-V/U/S; porsi 1–8 jiwa; DB `pawonee`; JWT audiens `pawonee`". Rujukan lintas divisi: KONTEKS §8/§9.

## 1. Boleh disentuh repo ini

- `src/lib/server/rekomendasi.ts` (port TS) dan `src/lib/pantryResep.ts` (cermin tipe).
- `src/routes/api/v1/` (6 rute: `resep`, `resep/[id]`, `rekomendasi`, `stok`, `profil/[idKeluarga]`, `kesehatan`).
- Halaman publik bagi/cetak `https://pawonee.chefgenie.id/resep/{id}?jiwa=4`.

## 2. Dilarang

- Menghitung harga di klien web; semua angka belanja memakai harga server berbasis harga Lumbung G2.
- Menulis ulang rumus selain port resmi dari `:shared:pantry-resep`.
- Mengubah stok Pedaree (hanya proksi baca, cache 60 detik).
- Menyentuh DB divisi lain (DB per service; Titeny hanya read-only ke DB sumber).
- Memakai komoditas non-pilot (kentang/wortel/tomat/kol) untuk klaim pasokan agregasi Lumbung; hanya cabai, bawang, kangkung (KONTEKS §4).
- Menambah resep ke-13, mengubah definisi G2, atau mengubah audiens JWT tanpa PR TownHall + ADR.

## 3. Kontrak yang diproduksi

- API pendamping `https://web.pawonee.chefgenie.id/api/v1` (bentuk JSON identik kontrak mobile).
- Halaman publik bagi resep dan cetak 1 halaman.
- Email harian 1 resep tercepat untuk stok layu.

## 4. Kontrak yang dikonsumsi

- Backend `https://api.pawonee.chefgenie.id/v1` (JWT audiens `pawonee`).
- Stok Pedaree (proksi baca, cache 60 detik, `X-Data-Usang: true` bila Pedaree mati).
- Fixture paritas dari `pawonee-ai-models`; token desain dari `pawonee-design`.

## 5. Dampak bila berubah

- Migrasi framework berdampak pada `pawonee-design` (referensi komponen) dan CI di `pawonee-infra-devops`.
- Perubahan rumus Kotlin tanpa pembaruan port memecahkan paritas dan memblokir rilis web.

## Batasan

- Dokumen ini hanya memetakan batas dan risiko; tidak mengubah kode atau konfigurasi.
- Keputusan lintas divisi dirujuk ke `KONTEKS-LINTAS-DIVISI.md` dan TownHall Pawonee v1.0.0.
