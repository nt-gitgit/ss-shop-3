# Design system reference

The token and component reference for this theme, ported from the agency's
own Spring/Summer design system (`springsummer.dk`) and its other Shopify
builds. Keep changes here in sync with `snippets/css-variables.liquid`,
`assets/critical.css` and `snippets/ui-components.liquid` — those three
files are the actual implementation; this document explains why they're
shaped the way they are.

## Colour

Five colours only: white, black, deep grey, warm stone (beige), and one
signal red. Defined as **bare HSL components** (no `hsl()` wrapper) so any
consumer can write `hsla(var(--text-color) / .2)` for a hairline at any
opacity.

```
--color-white: 0 0% 100%
--color-black: 0 0% 0%
--color-grey:  0 0% 21%
--color-beige: 49 14% 85%
--color-red:   359 99% 61%
```

The **theme contract**: any container can carry its own `--text-color` /
`--background-color` pair. Five presets (`.theme-light` /`.theme-dark`
/`.theme-stone` /`.theme-red` /`.theme-grey`) sit on top of that contract
as a convenience — they are not the whole system. This shop's own body
default (signal red on warm stone) is itself just a custom pair, not one
of the five.

Signal red is restricted: never a button fill, divider, or repeated
element — only a full-bleed section background (hero/section breakers) or
a small functional accent. That's why the Black Friday banner uses
`theme-red` as its base state rather than introducing a new colour.

## Type

Three faces, self-hosted under the studio's own licence:

- **Grotesk** (PP Right Grotesk Compact Black, 900) — display only. Huge,
  condensed, always uppercase, tight leading (0.76).
- **Montreal** (PP Neue Montreal Regular, 400) — body copy, the workhorse.
- **Supply** (PP Supply Mono Light, 300) — labels, trumpets, CTAs,
  countdown digits, prices.

`.ts-h1` / `.ts-h2` / `.ts-body-xl` / `.ts-body-l` / `.ts-body-s` /
`.ts-label-m` / `.ts-label-s` / `.ts-cta` are the only type-scale classes;
a heading doesn't get display styling automatically — it's a per-element
decision (`<h2 class="ts-h1">` and `<h2 class="ts-body-l">` are both
correct depending on the page).

Display headline size (`--ts-h1-fs`) and the Black Friday countdown's
digit size both use the same mechanism: a multiplier against
`--grid-vw` (one percent of the usable grid width), so they scale with
the grid rather than the raw viewport.

## Spacing & layout

- Root unit: `1rem = max(18px, 8px + 0.833vw)` — fluid, not a fixed 16px.
- `--br: .2rem` (4px) is the one corner radius, everywhere.
- Grid: 6 columns / 20px gap under 900px, 12 columns above it. Section
  padding uses three fixed rhythm steps — `--section-s` (3rem),
  `--section-m` (5rem), `--section-l` (7.5rem) — not ad hoc values.
- `.shopify-section` insets every section by one page margin
  (`--grid-margin`) on the left automatically; a section that wants to run
  full-bleed adds the `full-width` class to its root element.

## Borders, surface, motion

- **No shadows, ever.** Depth comes from hairlines and contrast.
- Hairlines: `hsla(var(--text-color) / .2)` structural, `/ .3` for
  form/detail elements (`--border-color` / `--detail-color`).
- Two eases only, both circular, no bounce/spring:
  `cubic-bezier(0, .55, .45, 1)` (out) and `cubic-bezier(.85, 0, .15, 1)`
  (in-out). Theme-pair transitions run 400ms on the out ease.
- Scroll reveal (`[data-reveal]`, `snippets/scroll-reveal.liquid`) is
  **opacity only** — no translate, no scale. Resist adding to it.

## Components

- **`.arrow-link` / `.button`** — the only CTA pattern. Text plus an icon
  chip, with a hairline underline that grows on hover. Never a filled
  pill.
- **`.trumpet`** — the small mono eyebrow label above almost every
  section, usually paired with a short horizontal tick (`.trumpet-row`).
- **`.border-icon` / `.button__icon`** — the icon chip: 40px on mobile,
  27px on desktop.
- **`.ss-bracket`** — a hairline rectangle with half masked away, the
  house idiom for marking a grid extent (used under the sticky header and
  above section footers).
- Icons are flat `.svg` files in `assets/`, inlined with
  `{{ 'icon-x.svg' | inline_asset_content }}` so `currentColor` works.
  There's no icon-snippet indirection.

## Section inventory

| Section | Purpose |
|---|---|
| `header` | Sticky nav, live Copenhagen clock, cart toggle |
| `hero` | Big display headline + four-column info row |
| `campaign-banner` | Full-bleed campaign photo, no copy |
| `black-friday` | The countdown banner — see its own doc comment |
| `featured-collection` | The product grid ("the drop") |
| `marquee` | Scrolling shipping/returns strip |
| `lookbook` | Asymmetric image grid with captions |
| `studio-note` | Label column + rich-text note + made-by/questions row |
| `footer` | Sign-off headline, link columns, newsletter, byline+clock |

Each is a normal theme section with its own `{% schema %}` — reorder,
duplicate, or remove any of them from the theme editor without touching
code.

## Caveats

This document was ported from the agency's existing design-system
reference and Shopify builds, not re-verified line-by-line against the
live `springsummer.dk` codebase. Treat exact numeric tokens here as
correct (they were copied from working CSS, not eyeballed), but don't
treat this as a from-source audit the way the original design-system
reference is.
