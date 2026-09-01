---
name: Spring/Summer design system
description: Use this when building or styling ANY HTML page, prototype, mockup, landing page, or component that should look like Spring/Summer (springsummer.dk) — a Copenhagen strategic design and technology agency. Editorial Scandinavian minimalism: oversized condensed display type, mono trumpet labels, one signal-red accent, hairline borders, blurred glass, no shadows, no emoji. Self-contained — includes the full CSS token system, grid, and voice rules, so it works in any HTML project even without the original design-system folder attached.
---

# Spring/Summer design system

A restrained, editorial Scandinavian design language: 5 colors, 3 typefaces, a 12/6 grid with a signature right-hand widget rail, 4px radius everywhere, hairline borders, no shadows, no emoji.

## Quick start

1. Create a `styles.css` (or paste into a `<style>` tag) with the **Colors & Type** block and the **Grid & Rail** block below, in that order.
2. Link it and set body class to a theme: `theme-light` (default), `theme-dark`, `theme-beige`, `theme-yellow`, `theme-grey`.
3. Use the `.ss-*` grid/rail classes and `.ts-*` type classes documented inline in the CSS.

```html
<link rel="stylesheet" href="styles.css">
<body class="theme-light">
  <div class="ss-shell">
    <main class="ss-rail-inset">
      <span class="trumpet">Case Study 01</span>
      <h1 class="ts-h1">Online<br>Flagship Store</h1>
      <div class="ss-grid">
        <div class="ss-span-7 ss-span-m-6">…</div>
        <div class="ss-span-5 ss-span-m-6">…</div>
      </div>
    </main>
    <aside class="ss-rail is-sticky">
      <div class="ss-widget">Our Seasonal Newsletter</div>
      <div class="ss-widget is-bare to-bottom">16:42 / Copenhagen</div>
    </aside>
  </div>
</body>
```

If the original `SpringSummer Design System` folder is attached to the session, prefer copying its `colors_and_type.css`, `grid.css`, `fonts/`, and `assets/icons/` directly instead of retyping the blocks below — it also has real font files and the full icon set. The CSS below is the fallback for when that folder isn't available, so this skill works standalone in any project.

## Colors & Type CSS (paste as-is)

```css
/* ---------- Brand fonts ---------- */
/* Real files: PP Right Grotesk Compact Black, PP Neue Montreal, PP Supply Mono
   (Pangram Pangram, commercial — license separately or copy from the S/S
   design-system folder's fonts/ dir). Fallback stack below uses Google Fonts:
   Anton (display), Inter (sans), JetBrains Mono (mono) — weaker but legal.
   If using fallbacks, load them e.g.:
   <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500&family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet"> */

:root {
  /* ---------- Base color tokens (HSL triplets) ---------- */
  --color-white:  0 0% 100%;
  --color-black:  0 0% 0%;
  --color-grey:   0 0% 21%;     /* deep ink grey */
  --color-beige:  49 14% 85%;   /* warm stone — #DDDBD2 */
  --color-yellow: 359 99% 61%;  /* signal red — #FE393A (name kept for back-compat) */

  --white:  hsl(var(--color-white));
  --black:  hsl(var(--color-black));
  --grey:   hsl(var(--color-grey));
  --beige:  hsl(var(--color-beige));
  --yellow: hsl(var(--color-yellow));

  /* ---------- Type families (swap in real fonts when available) ---------- */
  --grotesk:  'Grotesk', 'Anton', 'Impact', sans-serif;
  --montreal: 'Montreal', 'Inter', 'Helvetica Neue', sans-serif;
  --supply:   'Supply', 'JetBrains Mono', ui-monospace, monospace;
  --noto:     'Noto Sans TC', sans-serif;

  --display:    var(--grotesk);
  --sans-serif: var(--montreal);
  --mono:       var(--supply);
  --chinese:    var(--noto);

  /* ---------- Type scale ---------- */
  --ts-h1-fs: clamp(86px, 10.5vw, 280px);
  --ts-h1-lh: 0.76;
  --ts-h1-ls: -0.01em;

  --ts-h2-fs: clamp(56px, 8vw, 140px);
  --ts-h2-lh: 1.0;
  --ts-h2-ls: 0.02em;

  --ts-body-xl-fs: clamp(24px, 3vw, 40px);
  --ts-body-xl-lh: 1.1;
  --ts-body-xl-ls: 0.02em;

  --ts-body-l-fs: clamp(15px, 2vw, 18px);
  --ts-body-l-lh: 1.4;
  --ts-body-l-ls: 0.02em;

  --ts-body-m-fs: 14px;
  --ts-body-m-lh: 1.5;
  --ts-body-m-ls: 0.02em;

  --ts-body-s-fs: 12px;
  --ts-body-s-lh: 1.3;
  --ts-body-s-ls: 0.023em;

  --ts-label-m-fs: 12px;
  --ts-label-m-lh: 1.3;
  --ts-label-m-ls: 0.01em;

  --ts-label-s-fs: 10px;
  --ts-label-s-lh: 1.26;
  --ts-label-s-ls: 0.01em;

  --ts-cta-fs: 12px;
  --ts-cta-lh: 1.26;
  --ts-cta-ls: 0.01em;

  /* ---------- Spacing / radii / motion ---------- */
  --unit: 10px;        /* units(n) ≈ n * 10px */
  --br: 4px;           /* the ONLY radius used anywhere */
  --header-height: 52px;
  --hairline-w: 1px;

  --ease-out:    cubic-bezier(0, 0.55, 0.45, 1);   /* easeOutCirc */
  --ease-in-out: cubic-bezier(0.85, 0, 0.15, 1);   /* easeInOutCirc */
  --theme-transition: 400ms ease-out;
}

/* ---------- Themes: swap body/section class to flip palette ---------- */
.theme-light, body {
  --fg1: hsl(var(--color-black)); --fg2: hsl(var(--color-black) / 0.6); --fg3: hsl(var(--color-black) / 0.3);
  --bg1: hsl(var(--color-white)); --bg2: hsl(var(--color-white) / 0.75);
  --hairline: hsl(var(--color-black) / 0.2);
  color: var(--fg1); background-color: var(--bg1);
}
.theme-dark {
  --fg1: hsl(var(--color-white)); --fg2: hsl(var(--color-white) / 0.6); --fg3: hsl(var(--color-white) / 0.3);
  --bg1: hsl(var(--color-black)); --bg2: hsl(var(--color-black) / 0.75);
  --hairline: hsl(var(--color-white) / 0.2);
  color: var(--fg1); background-color: var(--bg1);
}
.theme-beige {
  --fg1: hsl(var(--color-black)); --fg2: hsl(var(--color-black) / 0.6); --fg3: hsl(var(--color-black) / 0.3);
  --bg1: hsl(var(--color-beige)); --bg2: hsl(var(--color-beige) / 0.75);
  --hairline: hsl(var(--color-black) / 0.2);
  color: var(--fg1); background-color: var(--bg1);
}
.theme-yellow {
  --fg1: hsl(var(--color-black)); --fg2: hsl(var(--color-black) / 0.6); --fg3: hsl(var(--color-black) / 0.3);
  --bg1: hsl(var(--color-yellow)); --bg2: hsl(var(--color-yellow) / 0.75);
  --hairline: hsl(var(--color-black) / 0.2);
  color: var(--fg1); background-color: var(--bg1);
}
.theme-grey {
  --fg1: hsl(var(--color-white)); --fg2: hsl(var(--color-white) / 0.6); --fg3: hsl(var(--color-white) / 0.3);
  --bg1: hsl(var(--color-grey)); --bg2: hsl(var(--color-grey) / 0.75);
  --hairline: hsl(var(--color-white) / 0.2);
  color: var(--fg1); background-color: var(--bg1);
}
body { transition: color var(--theme-transition), background-color var(--theme-transition); font-family: var(--sans-serif); font-size: var(--ts-body-m-fs); line-height: var(--ts-body-m-lh); letter-spacing: var(--ts-body-m-ls); -webkit-font-smoothing: antialiased; margin: 0; }
*, *::before, *::after { box-sizing: border-box; }

/* ---------- Text-style helpers ---------- */
.ff-display{font-family:var(--display)} .ff-sans-serif{font-family:var(--sans-serif)} .ff-mono{font-family:var(--mono)}
.ts-h1{font-family:var(--display);font-size:var(--ts-h1-fs);line-height:var(--ts-h1-lh);letter-spacing:var(--ts-h1-ls);text-transform:uppercase;font-weight:900;margin:0}
.ts-h2{font-family:var(--sans-serif);font-size:var(--ts-h2-fs);line-height:var(--ts-h2-lh);letter-spacing:var(--ts-h2-ls);margin:0}
.ts-body-xl{font-size:var(--ts-body-xl-fs);line-height:var(--ts-body-xl-lh);letter-spacing:var(--ts-body-xl-ls)}
.ts-body-l{font-size:var(--ts-body-l-fs);line-height:var(--ts-body-l-lh);letter-spacing:var(--ts-body-l-ls)}
.ts-body-m{font-size:var(--ts-body-m-fs);line-height:var(--ts-body-m-lh);letter-spacing:var(--ts-body-m-ls)}
.ts-body-s{font-size:var(--ts-body-s-fs);line-height:var(--ts-body-s-lh);letter-spacing:var(--ts-body-s-ls)}
.ts-label-m{font-family:var(--mono);font-size:var(--ts-label-m-fs);line-height:var(--ts-label-m-lh);letter-spacing:var(--ts-label-m-ls);text-transform:uppercase}
.ts-label-s{font-family:var(--mono);font-size:var(--ts-label-s-fs);line-height:var(--ts-label-s-lh);letter-spacing:var(--ts-label-s-ls);text-transform:uppercase}
.ts-cta{font-family:var(--mono);font-size:var(--ts-cta-fs);line-height:var(--ts-cta-lh);letter-spacing:var(--ts-cta-ls)}
h1{font:900 var(--ts-h1-fs)/var(--ts-h1-lh) var(--display);letter-spacing:var(--ts-h1-ls);text-transform:uppercase;margin:0}
h2{font:400 var(--ts-h2-fs)/var(--ts-h2-lh) var(--sans-serif);letter-spacing:var(--ts-h2-ls);margin:0}
p,li{font:400 var(--ts-body-m-fs)/var(--ts-body-m-lh) var(--sans-serif);letter-spacing:var(--ts-body-m-ls);margin:0}
code,pre{font:300 var(--ts-label-m-fs)/var(--ts-label-m-lh) var(--mono);letter-spacing:var(--ts-label-m-ls)}
.trumpet{font:300 var(--ts-label-s-fs)/var(--ts-label-s-lh) var(--mono);letter-spacing:var(--ts-label-s-ls);text-transform:uppercase;opacity:.7}
::selection{color:var(--bg1);background:var(--fg1)}

/* ---------- CTA / button pattern (pill, mono text + round arrow chip) ---------- */
.ss-cta{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:var(--ts-cta-fs);letter-spacing:var(--ts-cta-ls);text-transform:uppercase;text-decoration:none;color:inherit;background:none;border:none;cursor:pointer}
.ss-cta .chip{width:27px;height:27px;border-radius:var(--br);border:1px solid var(--hairline);display:flex;align-items:center;justify-content:center;transition:transform .3s var(--ease-out)}
.ss-cta:hover .chip{transform:scale(1.2)}

/* ---------- Card pattern (image/video teaser, no shadow) ---------- */
.ss-card{position:relative;aspect-ratio:1/1.25;border-radius:var(--br);overflow:hidden;background-size:cover;background-position:center}
.ss-card .title{position:absolute;top:12px;left:12px;color:#fff}
.ss-card .tags{position:absolute;bottom:12px;left:12px;display:flex;gap:8px;color:#fff}
```

## Grid & Widget Rail CSS (paste after the block above)

```css
:root {
  --page-width: 1440px;
  --rail-width: 100%;      /* mobile: widgets overlay full width */
  --rail-margin: 20px;
  --grid-cols: 6;
  --grid-margin: 20px;
  --grid-gap: 20px;
  --col-w: calc((100vw - var(--grid-margin) * 2 - (var(--grid-cols) - 1) * var(--grid-gap)) / var(--grid-cols));
}
@media (min-width: 900px) {
  :root {
    --rail-width: 250px;
    --grid-cols: 12;
    --grid-margin: 54px;    /* desktop: LEFT margin only — the rail bounds the right edge */
    --col-w: calc((100vw - var(--rail-width) - var(--grid-margin) - (var(--grid-cols) - 1) * var(--grid-gap)) / var(--grid-cols));
  }
}

.ss-shell{display:grid;grid-template-columns:1fr var(--rail-width);min-height:100vh}
@media (max-width:899px){.ss-shell{grid-template-columns:1fr}}

.ss-rail-inset{padding-left:var(--grid-margin);padding-right:var(--rail-width)}
@media (max-width:899px){.ss-rail-inset{padding-right:var(--grid-margin)}}

.ss-rail{position:relative;width:var(--rail-width);padding:var(--rail-margin);display:flex;flex-direction:column;gap:var(--rail-margin)}
.ss-rail.is-sticky{position:sticky;top:var(--header-height);height:calc(100vh - var(--header-height));align-self:start}
@media (max-width:899px){
  .ss-rail{position:fixed;inset:auto 0 0 0;width:100%;flex-direction:row;align-items:flex-end;pointer-events:none;z-index:40}
  .ss-rail > *{pointer-events:auto}
}

.ss-widget{border:1px solid var(--hairline);border-radius:var(--br);padding:var(--rail-margin);background:var(--bg2);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);transition:background var(--theme-transition),border-color var(--theme-transition)}
.ss-widget.is-flush{padding:0;overflow:hidden}
.ss-widget.is-bare{border:none;background:none;backdrop-filter:none;padding:0}
.ss-widget.to-bottom{margin-top:auto}

.ss-grid{display:grid;grid-template-columns:repeat(var(--grid-cols),minmax(0,1fr));gap:var(--grid-gap)}
@media (min-width:900px){
  .ss-span-1{grid-column:span 1} .ss-span-2{grid-column:span 2} .ss-span-3{grid-column:span 3}
  .ss-span-4{grid-column:span 4} .ss-span-5{grid-column:span 5} .ss-span-6{grid-column:span 6}
  .ss-span-7{grid-column:span 7} .ss-span-8{grid-column:span 8} .ss-span-9{grid-column:span 9}
  .ss-span-10{grid-column:span 10} .ss-span-11{grid-column:span 11} .ss-span-12{grid-column:span 12}
}
@media (max-width:899px){
  .ss-span-m-1{grid-column:span 1} .ss-span-m-2{grid-column:span 2} .ss-span-m-3{grid-column:span 3}
  .ss-span-m-4{grid-column:span 4} .ss-span-m-5{grid-column:span 5} .ss-span-m-6{grid-column:span 6}
  [class*="ss-span-"]:not([class*="ss-span-m-"]){grid-column:1 / -1}
}

.ss-bleed{--bleed-start:calc(100% - var(--rail-width));width:100vw;padding-left:var(--grid-margin)}
@media (min-width:900px){
  .ss-bleed{
    -webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,1) var(--bleed-start),rgba(0,0,0,.4) calc(var(--bleed-start) + var(--rail-width) * .2),transparent 90%);
    mask-image:linear-gradient(90deg,rgba(0,0,0,1) var(--bleed-start),rgba(0,0,0,.4) calc(var(--bleed-start) + var(--rail-width) * .2),transparent 90%);
  }
}

.ss-header-grid{display:grid;grid-template-columns:auto 1fr var(--rail-width);align-items:center;height:var(--header-height);gap:var(--grid-margin)}
@media (max-width:899px){.ss-header-grid{grid-template-columns:auto auto;justify-content:space-between}}

.ss-bracket{height:24px;border:1px solid var(--hairline);border-radius:var(--br);-webkit-mask-image:linear-gradient(transparent 50%,black 50%);mask-image:linear-gradient(transparent 50%,black 50%);pointer-events:none}
.ss-bracket.is-up{-webkit-mask-image:linear-gradient(black 50%,transparent 50%);mask-image:linear-gradient(black 50%,transparent 50%)}

.ss-dev-grid::after{content:"";position:fixed;inset:0;z-index:999;pointer-events:none;margin-left:var(--grid-margin);margin-right:var(--rail-width);background-image:repeating-linear-gradient(90deg,hsl(359 99% 61% / .12) 0,hsl(359 99% 61% / .12) var(--col-w),transparent var(--col-w),transparent calc(var(--col-w) + var(--grid-gap)));background-size:calc((var(--col-w) + var(--grid-gap)) * var(--grid-cols)) 100%;background-repeat:no-repeat}
@media (max-width:899px){.ss-dev-grid::after{margin-right:var(--grid-margin)}}
```

## When to reach for this
- Any HTML prototype, landing page, pitch deck, or internal tool that should read as Scandinavian, editorial, minimal and confident
- Client-facing mockups where whitespace and restraint ARE the design
- Agency / studio sites, eCommerce, brand, or app UI in this register

## Visual rules (non-negotiable)
- **Only 5 colors** ever: white, black, deep grey (`hsl(0 0% 21%)`), warm stone `#DDDBD2`, signal red `#FE393A`. The red is a **section background**, never a CTA fill color.
- **Oversized H1**: condensed black, uppercase, tight tracking/leading, `clamp(86px, 10.5vw, 280px)`.
- **Mono trumpet labels** (`.trumpet` / `.ts-label-s`) above every section: small, uppercase, letter-spaced.
- **4px radius everywhere** — cards, buttons, chips, widgets. No bigger, no smaller.
- **Hairline borders only** (`1px solid var(--hairline)`, i.e. text color at 20% opacity). **No drop shadows, no gradients** (except the bleed mask).
- **CTAs**: mono text + a round 27×27px (40×40 mobile) arrow chip, never a filled colored button.
- **Backdrop blur** for glass surfaces (headers, widgets): 8–60px, heavy and intentional.
- **Motion**: `--ease-out` / `--ease-in-out` (circ easings) only, 400ms theme cross-fades. No bounce, no spring.
- **The widget rail is the one unusual layout move**: a 250px right-hand column reserved for cart/newsletter/clock-style widgets, which is why desktop only subtracts ONE page margin (left), not two.
- **`.ss-bleed`** is the signature detail: run a big headline past the grid and fade it under the rail with a mask, instead of hard-stopping at an edge.

## Voice, if writing copy in this style
- Confident, dry, warm, quietly funny. Never salesy. Short sentences. First person plural ("we").
- **No emoji, ever.** Labels ALL-CAPS in mono; body sentence-case.
- Casual CTAs: "Write us", "call us" — never "Get in touch" or "Submit".
- Specifics over adjectives: real numbers, not vague superlatives.
- Hide one joke in an otherwise straight list rather than announcing the joke.

## Don'ts
- No emoji, no unicode glyph icons (except `:` in a clock).
- No drop shadows, no gradients on buttons, no radius other than 4px (except a fully-rounded CTA capsule).
- Don't fill a button with the accent red — it's a background, not a CTA color.
- Don't invent extra colors, fonts, or radii "just for this project" — the restraint is the point.
- Don't let content run to a hard edge on the side where the rail sits — inset it or `.ss-bleed` it.
- Don't pad a layout with filler content — whitespace is the design.

## Icons
No icon font (no Lucide/Heroicons/Font Awesome) in the original system — it uses ~17 custom single-color SVGs (`arrow`, `plus`, `tick`, `play`, `pause`, `star`, `eye`, `globe`, `hand`, `email`, `cc`, `dots`, `volume_on/off`, `horizontal-arrow`) driven by `currentColor`, wrapped in a `.chip` (see CSS above). If the original `SpringSummer Design System` folder's `assets/icons/` isn't available, use Lucide icons at 1.5px stroke as the closest substitute and note the swap.
