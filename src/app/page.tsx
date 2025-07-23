import InputBox from "@/components/InputBox";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center relative">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-widest text-accent2 drop-shadow-[0_2px_8px_rgba(255,215,0,0.15)] max-w-3xl mb-2">
          Convierte cualquier meta en un plan de acción claro y motivador.
        </h1>
        <h2 className="text-lg sm:text-2xl font-mono text-accent3 max-w-xl mb-4">
          Planifica, edita y exporta tu camino al éxito.
        </h2>
        <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none select-none opacity-10" style={{backgroundImage: 'repeating-linear-gradient(135deg, #ff5c5c10 0 2px, transparent 2px 40px)'}} />
      </section>
      <InputBox />
      <div className="text-center mt-8 text-accent2 font-mono text-base animate-pulse">
        ¡No hay meta pequeña! 🚀
      </div>
    </>
  );
}
