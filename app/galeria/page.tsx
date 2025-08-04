import fs from "fs";
import path from "path";

export default function GaleriaPage() {
  let images: string[] = [];
  try {
    const dir = path.join(process.cwd(), "public", "uploads");
    images = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
  } catch {}
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Galeria de Fotos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.length === 0 && <p>Nenhuma imagem enviada ainda.</p>}
        {images.map(img => (
          <div key={img} className="border rounded overflow-hidden bg-white shadow">
            <img src={`/uploads/${img}`} alt="Foto" className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
