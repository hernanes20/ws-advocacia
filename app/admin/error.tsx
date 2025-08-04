"use client"

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Ocorreu um erro!</h2>
      <p className="text-gray-700 mb-6">{error.message || "Algo deu errado ao carregar esta página."}</p>
      <button
        onClick={() => reset()}
        className="bg-red-700 text-white px-6 py-2 rounded font-semibold hover:bg-red-800 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}
