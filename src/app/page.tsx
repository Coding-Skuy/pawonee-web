import { ambilRekomendasi } from "@/lib/pantryResep";

export default async function Beranda() {
  const resep = await ambilRekomendasi(["tempe", "bawang"]).catch(() => []);
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Pawonee — Masak dari isi dapur</h1>
      <p>Rekomendasi resep dari bank resep grade-2 milik Pawonee.</p>
      <ul>
        {resep.map((r) => (
          <li key={r.id}>
            <strong>{r.nama}</strong> — {r.menit} mnt • pedas {r.levelPedas}/5
          </li>
        ))}
        {resep.length === 0 && <li>Backend belum menyala. Nyalakan pawonee-backend-service dahulu.</li>}
      </ul>
    </main>
  );
}
