# Activa.AI
> Turn any goal into a step-by-step, shareable action plan in seconds.

---

## 🚀 One-Sentence Pitch
Write a sentence like *“I want to launch a SaaS in 30 days”* and instantly get a prioritized, editable, export-ready roadmap.

---

## ✨ Live Demo
https://ai-action-planner.vercel.app

---

## 📦 Features

| Feature | Status |
|---------|--------|
| **AI Plan Generation** – powered by Groq Llama3-8b | ✅ |
| Drag-and-drop step reordering | ✅ |
| Inline editing (title, hours, deadline) | ✅ |
| PDF / Markdown export | ✅ |
| Timeline & Gantt views | ✅ |
| Local storage auto-save | ✅ |
| Shareable public links | ✅ |
| Dark / light theme | ✅ |
| Clerk Auth + Supabase cloud sync (opt-in) | ✅ |
| Responsive PWA | ✅ |

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS  
- **AI:** Groq SDK (Llama3-8b-8192)  
- **Storage:** localStorage (default) → Supabase Postgres (opt-in)  
- **Auth:** Clerk (opt-in)  
- **PDF:** html2canvas + jsPDF  
- **Timeline:** react-gantt-timeline  
- **CI/CD:** GitHub → Vercel (zero-config)

---

## 📁 Quick Start (local)

```bash
git clone https://github.com/your-org/ai-action-planner.git
cd ai-action-planner
cp .env.example .env.local
# add GROQ_API_KEY, optionally CLERK & SUPABASE keys
pnpm i
pnpm dev
