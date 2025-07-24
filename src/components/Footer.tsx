export default function Footer() {
  return (
    <footer className="w-full py-8 px-8 text-center text-xs text-foreground/70 border-t border-accent/30 bg-card/70 backdrop-blur-[8px] mt-16 flex flex-col items-center gap-3 shadow-vintage animate-fade-in">
      <div className="flex gap-6 mb-2">
        <a href="#" className="hover:text-accent2 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent2 rounded-full" aria-label="Twitter"><span className="text-xl">🐦</span></a>
        <a href="#" className="hover:text-accent3 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent3 rounded-full" aria-label="GitHub"><span className="text-xl">💾</span></a>
        <a href="#" className="hover:text-accent transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent rounded-full" aria-label="Instagram"><span className="text-xl">📸</span></a>
      </div>
      <div className="font-mono">
        <span>© {new Date().getFullYear()} AI Action Planner</span> — Made with <span className="text-accent">❤️</span> & water
      </div>
    </footer>
  );
} 