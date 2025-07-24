"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function BackgroundFX() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showShooting, setShowShooting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (resolvedTheme !== "dark") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      o: Math.random() * 0.5 + 0.5,
    }));
    let shooting = { x: -100, y: -100, vx: 0, vy: 0, active: false };
    let shootingTimeout: NodeJS.Timeout;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.shadowColor = "#b2ebf2";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (shooting.active) {
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#00e676";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - 80, shooting.y + 20);
        ctx.stroke();
        ctx.restore();
      }
      animationId = requestAnimationFrame(draw);
    }

    function startShootingStar() {
      shooting.x = Math.random() * width * 0.7 + width * 0.2;
      shooting.y = Math.random() * height * 0.3 + 40;
      shooting.vx = -8 - Math.random() * 4;
      shooting.vy = 2 + Math.random() * 2;
      shooting.active = true;
      setShowShooting(true);
      setTimeout(() => {
        shooting.active = false;
        setShowShooting(false);
      }, 700);
      shootingTimeout = setTimeout(startShootingStar, 4000 + Math.random() * 4000);
    }
    draw();
    shootingTimeout = setTimeout(startShootingStar, 2000 + Math.random() * 3000);
    function animate() {
      if (shooting.active) {
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
      }
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(shootingTimeout);
    };
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  if (resolvedTheme === "light") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
        <svg width="100%" height="100%" className="absolute left-0 top-0 animate-fade-in" style={{opacity:0.18}}>
          <g>
            <ellipse cx="20%" cy="18%" rx="120" ry="38" fill="#fff" opacity="0.7">
              <animate attributeName="cx" values="20%;25%;20%" dur="12s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="60%" cy="12%" rx="90" ry="28" fill="#fff" opacity="0.5">
              <animate attributeName="cx" values="60%;65%;60%" dur="16s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="80%" cy="22%" rx="70" ry="22" fill="#fff" opacity="0.4">
              <animate attributeName="cx" values="80%;85%;80%" dur="18s" repeatCount="indefinite" />
            </ellipse>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 select-none animate-fade-in"
      style={{ width: "100vw", height: "100vh", opacity: 0.22 }}
      aria-hidden="true"
    />
  );
} 