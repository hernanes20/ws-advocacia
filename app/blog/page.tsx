import fs from 'fs';
import path from 'path';

export default function BlogGallery() {
  // Este código só funciona em ambiente server-side
  // Recomendo migrar para getServerSideProps ou API route
  let images: string[] = [];
  if (typeof window === 'undefined') {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      images = fs.readdirSync(uploadsDir).filter(file =>
        /\.(jpe?g|png|gif|webp)$/i.test(file)
      );
    } catch (e) {
      images = [];
    }
  }

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog / Galeria de Fotos</h1>
      {images.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma foto enviada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img} className="rounded shadow overflow-hidden bg-white">
              <img
                src={`/uploads/${img}`}
                alt={img}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
