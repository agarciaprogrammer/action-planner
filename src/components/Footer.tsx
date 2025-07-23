export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 text-center text-xs text-foreground/60 border-t border-accent bg-background mt-12 flex flex-col items-center gap-2">
      <div className="flex gap-4 mb-1">
        <a href="#" className="hover:text-accent2 transition" aria-label="Twitter"><span className="text-lg">🐦</span></a>
        <a href="#" className="hover:text-accent3 transition" aria-label="GitHub"><span className="text-lg">💾</span></a>
        <a href="#" className="hover:text-accent transition" aria-label="Instagram"><span className="text-lg">📸</span></a>
      </div>
      <div>
        <span className="font-mono">© {new Date().getFullYear()} AI Action Planner</span> — Made with <span className="text-accent">❤️</span>
      </div>
    </footer>
  );
} 