# deal-pages — CLAUDE.md

Autonomous deal landing pages for Soul Prosperity Group / Terrance Gee. Static HTML/CSS/JS — no build step, no framework, no server.

---

## Project map

```
deal-pages/
├── index.html                  # Soul Prosperity storefront (3 products)
├── coo-product.html            # AI COO product page
├── kingdom-store.html          # Kingdom bundle store
│
├── funnels/
│   ├── course-7/               # $7 eBook course funnel (primary, Tailwind)
│   │   ├── index.html          # Sales page
│   │   ├── checkout.html       # Stripe link checkout
│   │   ├── thank-you.html      # Post-purchase upsell ($197/yr → $47/mo)
│   │   ├── main.js             # Animations, accordion, scroll effects
│   │   ├── checkout.js         # UNUSED — orphaned card-form prototype
│   │   └── thank-you.js        # Order summary + community offer logic
│   │
│   └── course-47/              # $47 eBook course funnel (older, custom CSS)
│       ├── index.html          # Sales page
│       ├── checkout.html       # Stripe link checkout
│       ├── thank-you.html      # Post-purchase page
│       └── styles.css          # Custom CSS (no Tailwind)
│
├── downloads/
│   ├── course-pdfs/            # AI Automation Mastery lessons 1-12 + Quick Start
│   └── kingdom-bundle/         # eBook, Audiobook, Worksheets, Templates, Toolkit
│
├── meditations/index.html      # Marcus Aurelius product detail page
├── art-of-war/index.html       # Art of War product detail page
├── 36-stratagems/index.html    # 36 Stratagems product detail page
└── wealth-of-nations/          # Wealth of Nations product detail page
```

---

## Payment architecture

All live payment is handled by **Stripe Payment Links** — the checkout pages are simple HTML pages that redirect to `https://buy.stripe.com/...` URLs. There is no server, no webhook handler, and no custom card-collection form in production.

| Product | Price | Stripe Link file |
|---|---|---|
| eBook Course ($7) | $7 | `funnels/course-7/checkout.html:49` |
| eBook Course ($47) | $47 | `funnels/course-47/checkout.html:50` |
| Meditations Journal | $12 | `index.html:107` |
| 36 Stratagems | $22 | `index.html:120` |
| Wealth of Nations | $9 | `index.html:133` |

When updating prices, update both the display copy and the Stripe link (they must match).

---

## Tech stack

- **course-7 funnel**: Tailwind CSS (CDN), Google Fonts (Playfair Display + Inter), anime.js, typed.js, Splide.js, ECharts, p5.js, Splitting.js
- **course-47 funnel**: Custom CSS (`styles.css`), no dependencies
- **Soul Prosperity storefront** (`index.html`): Inline CSS only, no dependencies
- **No build step** — edit files and push; GitHub Pages deploys automatically

---

## Funnel flows

**course-7 ($7) full flow:**
1. `funnels/course-7/index.html` — sales page, CTA → `checkout.html`
2. `funnels/course-7/checkout.html` — order summary → Stripe link (Buy Now $7)
3. Stripe hosted checkout → on success, Stripe redirects to `thank-you.html`
4. `funnels/course-7/thank-you.html` — shows order summary (from `localStorage.orderDetails`) + upsell: community $197/yr or $47/mo

**course-47 ($47) full flow:**
1. `funnels/course-47/index.html` — sales page with countdown timer, CTA → `checkout.html`
2. `funnels/course-47/checkout.html` — order summary → Stripe link (Buy Now $47)
3. `funnels/course-47/thank-you.html` — confirmation

---

## Known issues

### MEDIUM — Download PDFs are publicly accessible
All files under `downloads/` are served publicly with no authentication. Anyone with the URL can download course materials without purchasing. If content protection matters, move PDFs behind a gated link or use a platform that enforces access control (e.g., Stripe fulfillment, Gumroad, etc.).

### MEDIUM — ninja.ai script needs audit (`funnels/course-47/index.html`)
`https://sites.super.myninja.ai/_assets/ninja-daytona-script.js` is an unversioned third-party script — SRI cannot be applied to it. A warning comment has been added in the HTML. Audit what this script does (analytics? affiliate tracking?) and remove it if unused.

### LOW — Tailwind CDN has no SRI
`https://cdn.tailwindcss.com` is the Tailwind "play" script — it generates CSS on the fly from your HTML, so its output is non-deterministic. SRI is not applicable. If SRI coverage is important, replace with a local Tailwind build.

### LOW — Terms / Privacy links are placeholders
Both funnels reference Terms of Service and Privacy Policy but link to `#`. These need real policy pages before taking live payments.

---

## Resolved issues

- ~~checkout.js fake payment form~~ — `funnels/course-7/checkout.js` deleted (was never wired up to live HTML)
- ~~CDN scripts without SRI~~ — SHA-384 integrity hashes added to all versioned scripts in `funnels/course-7/index.html` and `funnels/course-7/thank-you.html`

---

## Conventions

- **No server-side logic** — keep everything static; payment = Stripe link
- **Tailwind via CDN** for course-7 funnel; do not introduce a build step unless explicitly asked
- **Image assets** — testimonial images in course-7 are hotlinked from external CDNs (`kimi-web-img.moonshot.cn`); they may disappear; consider hosting locally
- **Countdown timers** reset when they reach zero (course-47 resets to 2h 47m 33s) — this is intentional
- **localStorage** is used in course-7 to pass order details from checkout to thank-you; both pages must agree on the key `orderDetails`
- **Copyright year** appears as 2025 in some pages and 2026 in `index.html` — keep consistent
