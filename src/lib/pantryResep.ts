// Cermin TypeScript dari modul `:shared:pantry-resep` milik Pawonee.
// Sumber kebenaran model: pawonee-app-kmp/shared/pantry-resep + models/schema.json di pawonee-ai-models.

export interface Bahan {
  nama: string;
  jumlah?: string;
}

export interface Resep {
  id: string;
  nama: string;
  bahan: Bahan[];
  langkah: string[];
  menit: number;
  levelPedas: number;
  estimasiBiaya: number;
  grade?: number;
}

export interface Preferensi {
  penggunaId: string;
  levelPedasMaks: number;
  alergi: string[];
  anggaranMaks: number;
}

const API = process.env.NEXT_PUBLIC_PAWONEE_API ?? "http://localhost:8080";

export async function ambilRekomendasi(bahan: string[]): Promise<Resep[]> {
  const q = encodeURIComponent(bahan.join(","));
  const res = await fetch(`${API}/v1/resep/rekomendasi?bahan=${q}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Backend ${res.status}`);
  return (await res.json()) as Resep[];
}
