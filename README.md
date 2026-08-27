# Spring/Summer Merch — Shopify theme

A hand-built Online Store 2.0 theme for the Spring/Summer agency's own
Black Friday merch drop. Ported from a Claude Design mockup into real
Liquid, on the same architecture (grid, colour tokens, type scale,
`{% doc %}`-documented components) as the agency's other Shopify builds
(`ss-shop`, `ss-shop-2`) — see `design.md` for the full token reference.

## What's here

- **Real cart.** Add-to-cart, quantity, remove and checkout all run through
  Shopify's AJAX cart endpoints (`/cart/add.js`, `/cart/change.js`), with
  the drawer re-fetched via the Section Rendering API so its markup is
  never hand-rendered from JSON. See `assets/cart.js`.
- **Real variants.** The PDP (`sections/main-product.liquid` +
  `assets/product-form.js`) and the homepage quick-add pills
  (`snippets/product-card.liquid`) both work off actual Shopify variants —
  there is nothing hardcoded.
- **The Black Friday countdown** (`sections/black-friday.liquid`) is a
  section, not a one-off page: deadline, copy, and the escalating colour
  stages are all editable in the theme editor. It bursts a small confetti
  animation (colours read live off the section's own theme pair) the first
  time it scrolls into view, and its "notify me" form creates a real,
  marketing-consented customer via Shopify's native customer form — no
  backend needed.
- **Self-hosted brand fonts** (PP Right Grotesk, PP Neue Montreal, PP
  Supply Mono) under the studio's own licence, not a font picker.

## Setting it up

### 1. Install the theme

```
shopify theme dev --store=your-store.myshopify.com
```

The first run opens a browser login. Once connected this pushes the theme
as a development theme and prints a preview URL that updates live as you
edit.

To push it as an actual theme in the store's theme library (not just a
dev preview):

```
shopify theme push --store=your-store.myshopify.com
```

### 2. Add the six products

The homepage's "drop" section pulls from a **collection** (default: `all`,
Shopify's built-in "every product" collection — change it in the theme
editor once you have a dedicated collection, e.g. `black-friday-drop`).
To match the original mockup, create these six products with these exact
names, prices and options:

| # | Product | Price | Options |
|---|---|---|---|
| 1 | All Seasons Tee | 320 DKK | Size: S / M / L / XL |
| 2 | Overcast Hoodie | 780 DKK | Size: S / M / L / XL |
| 3 | Good Coffee Cap | 340 DKK | One size |
| 4 | From A to Z Tote | 220 DKK | One size |
| 5 | It Takes Two Socks | 90 DKK | Size: 36–40 / 41–45 |
| 6 | Sticker Sheet No. 1 | 40 DKK | One size |

A product with only one variant ("One size") renders a single "Add to
cart" pill; a product with a real `Size` option renders one pill per
size, and clicking a size adds it straight to the bag — no separate add
step, matching the original design.

Set each product's description in the admin; the card on the homepage
truncates it to ~14 words, the PDP shows it in full.

### 3. Set the free shipping threshold

`Theme settings → Commerce → Free shipping threshold` (defaults to 600,
your store's currency). The cart drawer's progress bar reads this
directly — set it to `0` to hide the bar entirely.

### 4. Point the Black Friday countdown at your real date

`Black Friday countdown` section → **Deadline**. It's ISO 8601 with an
explicit UTC offset so there's no ambiguity — e.g.
`2026-11-27T00:00:00+01:00` for midnight Copenhagen time. The section
defaults to that date already.

### 5. Menus

Create a `main-menu` navigation menu in **Online Store → Navigation** with
entries for the drop, the Black Friday section (`/#drop`,
`/#black-friday`), lookbook (`/#lookbook`) and studio note (`/#studio`) —
the header and footer both read from theme-editor menu settings, nothing
is hardcoded.

## Checking the theme

```
shopify theme check
```

Runs clean (0 errors) as of this build. The remaining warnings are all
`ValidScopedCSSClass` false positives — for classes like `.arrow-link`,
`.trumpet` and `.field` that are genuinely defined once in
`snippets/ui-components.liquid` and rendered globally from
`layout/theme.liquid`, which the linter's per-file scoping heuristic
can't see across files.

## What's intentionally out of scope

- **Blog/article/list-collections templates** aren't built — this is a
  single-drop merch shop, not a content site. Add them the normal way
  (`templates/blog.json` etc.) if that changes.
- **Customer account pages** use Shopify's defaults; nothing here
  overrides them.
- **Discount codes / analytics / consent** aren't wired up. Add
  `assets/analytics.js` and the relevant theme settings if you need GA4,
  a pixel, or a cookie banner.
