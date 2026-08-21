# ⚡ GIT FORKED

> **"nonsense and sense in equal measure."**
> 
> A modern cybernetic personal viewport for film/TV reviews, anime critiques, tech projects, and late-night philosophical yaps by **Joy Aloysius** (Aloy / Vulture / Skip / Lammy).

---

## 🛠️ Stack & Design System

- **Framework:** [Astro 4.x](https://astro.build/) (Static Site Generation, zero-JS core)
- **Content Engine:** Type-safe Astro Content Collections with Zod frontmatter validation
- **Design System:** **Yathir.ai Zen-Hackery & Cybernetic Minimalist UI**
  - **Color Palette:** Deep Obsidian Surfaces (`#050505`, `#131313`, `#0E0E0E`) + High-Voltage Matrix Green Accents (`#00FF41`)
  - **Typography Duality:** `Space Mono` / `JetBrains Mono` for uppercase telemetry headers + `Inter` for UI + `Newsreader` editorial serif for longform reading
  - **Ghost Borders:** Razor-thin subtle borders (`rgba(59, 75, 55, 0.25)`) instead of heavy drop-shadows
- **Interactivity:** Instant Search (`Cmd+K`), reading progress scan line, live Spotify & StoryGraph widgets

---

## 🚀 Quickstart: Testing & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:4321/gitforked/` in your browser.

### 3. Run Production Build & Type Check
```bash
# Type-check all 25 files & content collections
npx astro check

# Build production static bundle (dist/)
npm run build

# Preview production build locally
npm run preview
```

---

## ✍️ How to Add Content

### 1. Writing a Review (Film, TV, Anime, Books, Games)
Create a `.md` or `.mdx` file inside `src/content/reviews/`:

```markdown
---
title: "Better Call Saul: The Tragic Masterpiece of Consequence"
date: 2026-08-21
category: "Film / TV"
rating: 5.0
status: "MASTERPIECE" # MASTERPIECE | MUST_WATCH | RECOMMENDED | PASS
tags: ["television", "breaking bad", "character study"]
coverImage: "/assets/covers/bcs.jpg"
description: "A deep dive into how Jimmy McGill's transformation into Saul Goodman is a tragic masterpiece."
---

Your review content goes here in standard Markdown...
```

### 2. Writing an Essay / Yap
Create a `.md` or `.mdx` file inside `src/content/posts/`:

```markdown
---
title: "The Philosophy Of Being Good"
date: 2026-08-21
category: "Reflection"
tags: ["philosophy", "morality", "life"]
description: "I like having a moral compass. It's just inconvenient how it often points directly into a storm."
---

Your essay content goes here...
```

### 3. Adding a Tech Project Showcase
Create a `.md` file inside `src/content/projects/`:

```markdown
---
title: "ProtoGPT"
description: "Generative LLM implementing Post-Layer Normalization based on 'Attention is All You Need'."
date: 2026-08-21
github: "https://github.com/AloysiusSundar/protogpt"
url: "https://protogpt.demo"
tags: ["Python", "PyTorch", "Transformers", "LLM"]
featured: true
---

Detailed project breakdown...
```

---

## 🔍 Key Interactive Features

- ⌨️ **`Cmd + K` / `Ctrl + K` Instant Search:** Opens the cybernetic search modal (`SearchModal.astro`) to query reviews, essays, tags, and projects instantaneously.
- 📊 **Telemetry Navbar:** Displays active system status (`SYS_STATUS // ONLINE`) and route badges.
- 🎵 **Spotify "On Repeat" Widget:** Interactive music telemetry card embedded directly on the homepage.
- 📚 **StoryGraph "Currently Reading" Widget:** Bookshelf tracking card with live external link.
- 📖 **Reading Progress Bar:** Top neon green scan line (`ReadingProgress.astro`) that fills dynamically as you scroll through long articles.
- 📡 **RSS 2.0 Feed:** Auto-generated at `/gitforked/rss.xml`.

---

## 📁 Repository Directory Structure

```
gitforked/
├── src/
│   ├── components/       # Header, Footer, ReviewCard, PostCard, ProjectCard, Widgets, SearchModal
│   ├── content/          # Content Collections
│   │   ├── reviews/      # Movie, TV, Anime, Book reviews
│   │   ├── posts/        # Essays & Yaps
│   │   └── projects/     # Tech project modules
│   ├── layouts/          # BaseLayout, ReviewLayout, PostLayout, ProjectLayout
│   ├── pages/            # /, /reviews, /posts, /projects, /about, /rss.xml.ts
│   └── styles/           # global.css (Zen-Hackery Design Tokens)
├── public/               # Static assets & favicon
├── astro.config.mjs      # Astro configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 📄 License
Created & maintained by **Joy Aloysius** ([@aloysiussundar](https://github.com/AloysiusSundar)).