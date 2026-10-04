> Versi: v1.0.0 | Status: disetujui | Menggantikan: -

# 60-BLAST-RADIUS — Radius Dampak (pawonee-web)

Mengacu: Pawonee-TownHall v1.0.0 (https://github.com/Coding-Skuy/Pawonee-TownHall).

## 1. Cakupan repo

- Repo `pawonee-web`: web pendamping Pawonee. Konsumen tipe `:shared:pantry-resep` milik Pawonee lewat cermin `src/lib/pantryResep.ts` (diselaraskan manual). Menampilkan rekomendasi dan preferensi yang sama dengan aplikasi KMP.
- Kontrak: `GET /v1/resep/rekomendasi`, `GET` dan `PUT /v1/preferensi/{id}` pada pawonee-backend-service; basis URL `NEXT_PUBLIC_PAWONEE_API` (bawaan `http://localhost:8080`).

## 2. Dampak ke hulu

- `:shared:pantry-resep` (milik Pawonee): perubahan model di repo ini wajib dipantulkan ke modul tersebut dan `models/schema.json`, bila tidak KMP, web, backend, dan pipa akan gagal validasi.
- `pawonee-ai-models`: perubahan aturan grade-2 atau skema memaksa evaluasi ulang 12/12 dan migrasi data.
- Database `pawonee`: perubahan kolom atau tabel butuh migrasi baru dan uji balik.

## 3. Dampak ke hilir (Pedaree)

- Pedaree mengonsumsi resep, preferensi, dan topik `sinyal.pedaree.v1` dari Pawonee; perubahan kontrak tanpa pemberitahuan merusak rekomendasi pendamping Pedaree.
- Perubahan jadwal pipa (tiap 15 menit) berpengaruh pada kesegaran sinyal Pedaree.
- Perubahan kartu resep atau desain berpengaruh pada tampilan ringkasan Pedaree.

## 4. Dampak ke dalam divisi

- KMP lawan web lawan backend lawan pipa lawan desain lawan infra saling terikat pada skema yang sama; satu perubahan skema tanpa sinkronisasi memecahkan 6 repo sekaligus.
- JWT audiens `pawonee`: perubahan audiens memutus autentikasi semua klien dan backend.
- Migrasi web Next.js 15 ke SvelteKit dan Bun terbaru adalah rencana pada fase coding, bukan eksekusi sekarang; migrasinya berdampak pada `pawonee-design` (referensi komponen) dan CI infra, karena itu dijadwalkan dengan kontrak dibekukan.

## 5. Mitigasi

1. Bekukan kontrak selama migrasi atau perubahan skema.
2. Uji kontrak (`GET /v1/resep/rekomendasi`, preferensi, evaluasi 12/12, bangun sinyal) sebelum gabung.
3. Beri tahu Pedaree satu siklus rilis sebelum mengubah topik atau skema.
4. Sediakan migrasi balik untuk database `pawonee`.
5. Catat setiap perubahan versi di `VERSIONS.md` dan TownHall Pawonee-TownHall v1.0.0.

## Batasan

- Dokumen ini tidak mengubah kode atau konfigurasi; hanya memetakan risiko.
- Tidak ada pengujian beban atau perubahan infrastruktur dalam dokumen ini.
- Radius ditekankan pada konsistensi `:shared:pantry-resep`, bank 12 resep, `sinyal.pedaree.v1`, database `pawonee`, dan JWT audiens `pawonee`.
- Keputusan darurat lintas divisi dirujuk ke TownHall Pawonee-TownHall v1.0.0.
