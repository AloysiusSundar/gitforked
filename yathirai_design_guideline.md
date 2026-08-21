# 🎨 Design System Guideline: Yathir.ai (Zen-Hackery & Cybernetic Minimalist UI)

This design system defines the visual language, visual architecture, color theory, typography, elevation, and component specs of the **Yathir.ai Platform**. It bridges **high-density cybernetic terminal aesthetics** with **high-end glassmorphism and mathematical minimalism**.

---

## 1. Overview & Creative North Star

### **Creative North Star: "The Cybernetic Nodal Matrix"**
The interface avoids generic web app conventions (heavy drop shadows, colorful card fills, rounded pill buttons with soft gradients). Instead, it treats the viewport as a **tactile control deck and telemetry viewport**.

Key aesthetic anchors include:
* **Zen-Hackery Terminal Aesthetics:** Deep obsidian surfaces paired with high-voltage matrix green accents (`#00FF41`), monospaced telemetry headers, and strict uppercase lettering.
* **The "Ghost Border" Structure:** Dividers and cards use razor-thin, ultra-subtle borders (`rgba(59, 75, 55, 0.15)` or `border-zen-dark/15`) rather than drop shadows or solid lines.
* **Tonal Obsidian Hierarchy:** Depth is created strictly by stepping through stacked surface containers from pitch black (`#050505`) to dark charcoal (`#1C1B1B`).
* **High-Contrast Typographic Duality:** High-impact bold display titles paired with utilitarian monospaced tracking for metadata (`BUILD_VER // 1.0.4.RC2`, `ARC_OVERVIEW // V1`).

---

## 2. Color Palette & Surface Philosophy

### **Core Color Tokens**

| Token Name | Hex Code / Value | Usage & Context |
| :--- | :--- | :--- |
| `--color-zen-bg` | `#050505` | Primary application canvas background |
| `--color-zen-surface` | `#131313` | Default card & modal base surface |
| `--color-zen-surface-low` | `#0E0E0E` | Deep container surface / background section contrast |
| `--color-zen-neon` | `#00FF41` | High-priority accent, terminal cursor, active highlights, badges |
| `--color-planner-green` | `#53E16F` | Secondary accent green for telemetry metrics & optimization indicators |
| `--color-zen-light` | `#EBFFE2` | Display text, hero title fill, high-contrast headings |
| `--color-zen-dark` | `#3B4B37` | Muted monospaced text, subtle borders, inactive telemetry labels |
| `--color-legacy-blue` | `#4B8EFF` | Geospatial route vectors, pins, map connections |
| `--color-error` | `#FFB4AB` | Warnings, schedule drift errors, destructive actions |
| `--color-dark-green-text` | `#003907` | Text placed directly inside `--color-zen-neon` button fills |

---

### **Surface Tier Stack**

Avoid standard white or light grey containers. Stack obsidian levels to indicate depth:

```
┌─────────────────────────────────────────────────────────────┐
│ [Level 0] Base Canvas: #050505 (--color-zen-bg)             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Level 1] Section Canvas: #0E0E0E (--color-zen-surface-low)│ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ [Level 2] Card / Bento Surface: #131313            │  │ │
│  │  │  ┌────────────────────────────────────────────┐  │  │ │
│  │  │  │ [Level 3] Glass Overlay: rgba(14,14,14,0.7)│  │  │ │
│  │  │  │           + backdrop-filter: blur(16px)    │  │  │ │
│  │  │  └────────────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Typography & Hierarchy

### **Font Pairings**
* **Headline Font:** `Space Mono` / `Inter` (`--font-headline`), Set in **UPPERCASE**, tight letter-spacing (`tracking-tighter` / `tracking-tight`), heavy weights (`font-extrabold` / `font-bold`).
* **Body Font:** `Geist Sans` / `Inter` (`--font-body`), clean, highly legible, sans-serif neutral.
* **Terminal / Code / Metadata Font:** `Geist Mono` / `Space Mono` / `JetBrains Mono` (`--font-mono`), uppercase with wide letter-spacing (`tracking-[0.2em]` to `tracking-[0.5em]`).

### **Typographic Hierarchy**

| Type Scale | CSS Class / Styling | Size & Weight | Sample Usage |
| :--- | :--- | :--- | :--- |
| **Hero Display** | `font-headline text-8xl md:text-[160px] font-extrabold tracking-tighter` | `160px / 1.0` | `YATHIR.AI` |
| **Section Header**| `font-headline text-5xl font-bold uppercase tracking-tight` | `48px / 1.1` | `The Technical Nodal Core.` |
| **Bento Title** | `font-headline text-2xl font-bold uppercase` | `24px / 1.0` | `Topological Scheduling` |
| **Body Large** | `text-zen-dark text-xl leading-relaxed` | `20px / 1.625` | Narrative technical descriptions |
| **Body Standard** | `text-base text-zen-dark leading-relaxed` | `16px / 1.5` | Bento card paragraph body |
| **System Tag** | `font-mono text-zen-neon text-[10px] tracking-[0.5em] uppercase` | `10px / 1.0` | `BUILD_VER // 1.0.4.RC2` |
| **Micro Badge** | `font-mono text-[9px] uppercase border border-zen-dark/20 px-3 py-1` | `9px / 1.0` | `Python`, `FastAPI`, `Vector Search` |

---

## 4. Elevation, Borders & Depth

### **1. The "Ghost Border" Rule**
Never use high-contrast solid borders or 3D drop-shadows. Use razor-thin border strokes tinted with dark foliage green or low-opacity white:

```css
/* Custom Ghost Border Utility */
.ghost-border {
  border: 1px solid rgba(59, 75, 55, 0.15);
}
```

### **2. Progressive Backdrop Blur System**
To overlay telemetry panels or floating action bars over dynamic elements (such as 3D maps or globes), use a multi-tiered progressive blur mask:

```css
.glass-panel {
  background: rgba(14, 14, 14, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### **3. Terminal Neon Ambient Glows**
Hero sections and active telemetry nodes use subtle radial background glows:
```css
background: radial-gradient(circle, #00FF41 0%, transparent 70%);
opacity: 0.20;
filter: blur(40px);
```

---

## 5. Component Specifications

### **A. Primary CTA Button (Neon Matrix)**
High-voltage primary action button with instant feedback and icon translation.

* **Background:** `#00FF41` (`--color-zen-neon`)
* **Text Color:** `#003907` (Deep Forest Green)
* **Font:** `font-mono font-bold text-sm uppercase tracking-widest`
* **Padding:** `px-12 py-5`
* **Interaction:** 
  * Hover: `brightness-110`
  * Active: `scale-[0.99]`
  * Icon Transition: `group-hover:translate-x-1`

```tsx
<button className="bg-zen-neon text-[#003907] px-12 py-5 font-mono font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 group">
    INITIALIZE_PLANNER
    <Play size={14} className="fill-current group-hover:translate-x-1 transition-transform" />
</button>
```

---

### **B. Secondary CTA Button (Ghost Outline)**
Secondary action button for repository links or source view.

* **Background:** Transparent
* **Border:** `1px solid rgba(0, 255, 65, 0.3)`
* **Text Color:** `#00FF41`
* **Hover:** `bg-zen-neon/5`

```tsx
<button className="bg-transparent border border-zen-neon/30 text-zen-neon px-12 py-5 font-mono font-bold text-sm uppercase tracking-widest hover:bg-zen-neon/5 active:scale-[0.99] transition-all flex items-center justify-center gap-3 group">
    <GitBranch size={16} />
    VIEW_SOURCE
</button>
```

---

### **C. Bento Subsystem Grid Cards**
Connected 3-column architectural bento cards with zero-gap borders and hover state activation.

* **Container:** `ghost-border p-10 flex flex-col justify-between h-[450px]`
* **Hover Fill:** `rgba(0, 255, 65, 0.05)`
* **Hover Transition Duration:** `0ms` (Instant cybernetic snap effect)
* **Elements inside card:**
  1. Monospaced Tag: `[ CORE_PROC ]` in `#00FF41`
  2. Headline Title: `Topological Scheduling` in `#EBFFE2`
  3. Body Text: `#3B4B37` leading-relaxed
  4. Footer Link: `ALGO_DETAILS >` (revealed on hover)

```tsx
<div className="ghost-border p-10 hover:bg-zen-neon/5 transition-all duration-0 group flex flex-col justify-between h-[450px]">
    <div>
        <div className="mb-10 text-zen-dark group-hover:text-zen-neon transition-colors duration-0">
            <Cpu size={48} strokeWidth={1} />
        </div>
        <div className="font-mono text-[10px] text-zen-neon mb-3 font-bold">[ CORE_PROC ]</div>
        <h3 className="font-headline text-2xl font-bold text-zen-light mb-6 uppercase leading-none">Topological <br />Scheduling</h3>
        <p className="text-base text-zen-dark leading-relaxed">Treating time as a strict topological dimension...</p>
    </div>
    <div className="text-zen-neon font-mono text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-0 flex items-center gap-2">
        ALGO_DETAILS &gt;
    </div>
</div>
```

---

### **D. Animated Terminal Hero Title Mask**
The signature hero title uses a dual-layer text mask animation where a vertical neon green terminal scan line sweeps across white text, revealing green text underneath:

```tsx
<div className="relative inline-block group">
    {/* Base Layer */}
    <h1 className="font-headline text-8xl md:text-[160px] font-extrabold tracking-tighter leading-none mb-4 text-zen-light select-none whitespace-nowrap">
        YATHIR.AI
    </h1>

    {/* Mask Reveal Layer */}
    <motion.div
        className="absolute top-0 left-0 h-full bg-zen-neon overflow-hidden pointer-events-none"
        initial={{ width: "0%" }}
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
        style={{ height: 'calc(100% - 1.2rem)' }}
    >
        <h1 className="font-headline text-8xl md:text-[160px] font-extrabold tracking-tighter leading-none text-[#003907] select-none whitespace-nowrap">
            YATHIR.AI
        </h1>
        {/* Terminal Blinking Cursor Line */}
        <div className="absolute top-0 right-0 w-[4px] md:w-[8px] h-full bg-zen-neon shadow-[0_0_20px_#00FF41]"></div>
    </motion.div>
</div>
```

---

### **E. Telemetry Readout Badges & Status Pills**
* **Status Badge:** `PROJECT_STATUS // PRODUCTION_STABLE`
* **Telemetry Data Line:**
```tsx
<div className="flex justify-between items-center py-3 border-b border-zen-dark/10">
    <span className="font-mono text-[10px] text-zen-dark uppercase tracking-widest">Token_Compliance</span>
    <span className="font-mono text-xs text-zen-neon font-bold tracking-tighter">99.4%</span>
</div>
```

---

## 6. Layout & Grid Architecture

1. **Top Navigation Bar:**
   * Absolute positioned, zero background, `pointer-events-none` container with `pointer-events-auto` interactive nodes.
   * Left: Monospaced status readout (`PROJECT_STATUS // PRODUCTION_STABLE`).
   * Right: Clean icon links (GitHub / Settings / Source).

2. **Hero Viewport:**
   * Full height `min-h-screen`, center aligned flex column.
   * Background features subtle 10% opacity neon radial gradient `bg-[radial-gradient(circle,_#00FF41_0%,_transparent_70%)]`.
   * Bottom bar displays technical stack tags (`Python`, `FastAPI`, `Held-Karp`, `Vector Search`).

3. **Bento Subsystems Grid:**
   * 3-column layout on desktop (`md:grid-cols-3`), stacked single-column on mobile.
   * Cards touch with 0px gap, connected via shared `ghost-border` borders (`border-l-0` on adjacent cards).

4. **Telemetry & Visualizer Section:**
   * 2-column asymmetric layout (40% telemetry text description / 60% interactive 3D Globe & raw JSON overlay).
   * Floating frosted glass telemetry box in bottom-right corner with `backdrop-blur-md` and `border-zen-neon/30`.

---

## 7. Signature Keyframe Animations & Micro-Interactions

### **1. Terminal Blink Animation**
```css
@keyframes zen-blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}

.terminal-cursor::after {
  content: '_';
  animation: zen-blink 1s step-end infinite;
}
```

### **2. Cybernetic Scanner Line**
```css
@keyframes scan {
  from { transform: translateY(-100px); }
  to { transform: translateY(700px); }
}
```

---

## 8. Do's and Don'ts

### **Do's**
* **DO** preface section titles and component blocks with uppercase monospaced system identifiers (e.g. `[ CORE_PROC ]`, `ARC_OVERVIEW // V1`).
* **DO** use `duration-0` on bento hover transitions to create an instantaneous, terminal-like snap state.
* **DO** use high-contrast font combinations: extra-bold display headers (`Space Mono` / `Inter`) vs ultra-clean monospace metadata labels.
* **DO** keep background colors restricted to deep obsidian (`#050505`, `#0E0E0E`, `#131313`).

### **Don'ts**
* **DON'T** use soft drop shadows (e.g. `shadow-lg`, `shadow-xl`) or multi-colored gradients.
* **DON'T** use rounded pill cards or smooth pastels; stick to sharp geometries (`rounded-none` or subtle `ghost-border`).
* **DON'T** use pure white `#FFFFFF` for body copy—always use muted `#EBFFE2` or `#E5E2E1` to reduce visual fatigue.
* **DON'T** use generic body fonts for system badges or metrics—always use monospaced text.

---

## 9. Tailwind CSS Configuration Reference

Add these key design tokens to your `globals.css` or `tailwind.config.js`:

```css
@theme inline {
  --color-zen-bg: #050505;
  --color-zen-neon: #00ff41;
  --color-zen-light: #ebffe2;
  --color-zen-dark: #3b4b37;
  --color-zen-surface: #131313;
  --color-zen-surface-low: #0e0e0e;
  --color-planner-green: #53e16f;
  --color-legacy-blue: #4b8eff;

  --font-headline: 'Space Mono', monospace;
  --font-body: 'Geist Sans', sans-serif;
  --font-mono: 'Geist Mono', monospace;
}

@layer utilities {
  .glass-panel {
    background: rgba(14, 14, 14, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .ghost-border {
    border: 1px solid rgba(59, 75, 55, 0.15);
  }
}
```
