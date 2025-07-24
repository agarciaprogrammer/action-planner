import InputBox from "@/components/InputBox";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center animate-fade-in">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <svg width="100%" height="100%" className="opacity-30" style={{position:'absolute',top:0,left:0}}>
            <defs>
              <radialGradient id="bubble1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#e0f7fa" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="30%" cy="70%" r="120" fill="url(#bubble1)" />
            <circle cx="70%" cy="30%" r="90" fill="url(#bubble1)" />
            <circle cx="50%" cy="50%" r="60" fill="url(#bubble1)" />
          </svg>
        </div>
        <h1 className="relative z-10 text-5xl sm:text-6xl font-extrabold tracking-widest text-accent2 drop-shadow-[0_2px_16px_rgba(0,188,212,0.18)] max-w-4xl mb-2 animate-water-glow">
          Convierte cualquier meta en un plan de acción claro y motivador.
        </h1>
        <h2 className="relative z-10 text-lg sm:text-2xl font-mono text-accent3 max-w-2xl mb-4 bg-card/60 rounded-xl px-6 py-3 shadow-vintage backdrop-blur-[6px] animate-fade-in animate-delay-300">
          Planifica, edita y exporta tu camino al éxito.<br className="hidden sm:inline" />
        </h2>
      </section>
      <InputBox />
      <div className="text-center mt-8 text-accent2 font-mono text-base animate-pulse animate-delay-500">
        ¡No hay meta pequeña! 🚀
      </div>
    </>
  );
}
