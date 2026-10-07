---
name: Trattoria Ressi
description: A Pavese trattoria site whose page is the room itself, a red-brick barrel vault lit by one saffron action.
colors:
  brick-950: "#2b0d08"
  brick-900: "#3d140d"
  brick-800: "#5a1e13"
  brick-700: "#7a2b1b"
  brick-dusk: "#6a2517"
  brick-500: "#b04a2b"
  mortar: "#f1e7d6"
  mortar-dim: "#d9bfae"
  saffron: "#f0b429"
typography:
  display-xl:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(3.6rem, 9vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  display:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(2.75rem, 4.9vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(2.4rem, 5vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(2.2rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)"
    fontWeight: 400
    lineHeight: 1.25
  numeral:
    fontFamily: "'Bodoni Moda Variable', 'Bodoni 72', Didot, serif"
    fontSize: "3.75rem"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "'tnum', 'lnum'"
  body-lg:
    fontFamily: "'Schibsted Grotesk Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'ss01'"
  body:
    fontFamily: "'Schibsted Grotesk Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'ss01'"
  label:
    fontFamily: "'Schibsted Grotesk Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
    fontFeature: "'ss01'"
  legend:
    fontFamily: "'Schibsted Grotesk Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
rounded:
  pill: "9999px"
  arch: "999px 999px 0 0"
  panel: "28px"
  tile: "16px"
  focus: "6px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "40px"
  hairline-gap: "12px"
  stack: "20px"
  grid-gap: "40px"
  grid-gap-lg: "56px"
  section: "96px"
  band-lg: "128px"
  section-lg: "144px"
  nav-height: "68px"
  container: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.brick-900}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.mortar}"
    textColor: "{colors.brick-900}"
  button-primary-nav:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.brick-900}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-secondary:
    textColor: "{colors.mortar}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
  button-outline-link:
    textColor: "{colors.mortar}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline-link-hover:
    textColor: "{colors.saffron}"
  tab:
    textColor: "{colors.mortar}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  tab-active:
    backgroundColor: "{colors.mortar}"
    textColor: "{colors.brick-900}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  booking-panel:
    backgroundColor: "{colors.brick-900}"
    textColor: "{colors.mortar}"
    rounded: "{rounded.panel}"
    padding: "20px"
  day-tile:
    textColor: "{colors.mortar}"
    rounded: "{rounded.tile}"
    padding: "8px 10px"
    width: "64px"
  day-tile-active:
    backgroundColor: "{colors.mortar}"
    textColor: "{colors.brick-900}"
    rounded: "{rounded.tile}"
  time-chip:
    textColor: "{colors.mortar}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  time-chip-active:
    backgroundColor: "{colors.mortar}"
    textColor: "{colors.brick-900}"
    rounded: "{rounded.pill}"
  arch-frame:
    backgroundColor: "{colors.brick-800}"
    rounded: "{rounded.arch}"
  nav-bar:
    textColor: "{colors.mortar}"
    height: "68px"
  nav-bar-solid:
    backgroundColor: "{colors.brick-900}"
    textColor: "{colors.mortar}"
    height: "68px"
  mobile-bar:
    backgroundColor: "{colors.brick-900}"
    padding: "12px 16px"
---

# Design System: Trattoria Ressi

## Overview

**Creative North Star: "La volta in mattoni"**

The page is the room. Trattoria Ressi is one 40-seat room under an exposed red-brick barrel vault, and the site is built from that room's materials, not from a trattoria template: fired brick is the whole ground, never an accent; lime mortar is the text and the hairline joints; one warm saffron (the colour of risotto allo zafferano) marks the act of booking. A fixed, barely-there brick-course texture (mortar joints at 5.5% opacity) sits behind everything, so every section reads as more of the same wall.

The vault's geometry is the shape language. Every photograph stands inside an arch-topped frame, every control is a full pill, and there are no cards. Bodoni Moda, a Didone with roots in Po-valley Italian printing, carries every headline, dish name and price; Schibsted Grotesk carries everything a visitor reads to act. Depth comes from brick tones (ground, darker soot-fired bands, troughs) rather than from shadows.

Motion is physical and springy: content settles into place on spring curves, selection indicators slide between options, and the signature moment is scroll-linked: the arch onto the dining room widens until it becomes the full-bleed room ("Entrate dall'arco"). Everything degrades to static, fully visible content under reduced motion.

**Key Characteristics:**
- Drenched brick ground (`brick-700`), darker brick bands (`brick-900`) for alternating sections, footer included
- Mortar (`mortar`, `mortar-dim`) for all text and every hairline; mortar alpha ladder for joints and washes
- Saffron is the one accent: primary actions, their hover and focus, text selection
- Arch-topped frame (`999px 999px 0 0`) is the only photo shape; pills for every control
- Bodoni Moda display (weight 500, negative tracking, optical sizing auto) over Schibsted Grotesk body (`ss01`)
- Tonal depth; only two soft shadows exist, both dark-brick tinted
- Three named springs from `src/lib/motion.ts`; layout-animated indicators; one scroll-linked vault opening
- Bilingual IT/EN at every string; booking within one tap on every screen (sticky mobile bar)

**Page rhythm:** ground hero → scroll-linked vault (full-bleed photo) → ground story and kitchen → `brick-900` band (Ticinum) → ground room and reviews → `brick-900` band (hours + map) → `brick-900` footer. Bands are the darker courses of the wall.

## Colors

A single family of fired brick from soot-dark to brick-light, a lime-mortar pair for type and joints, and one saffron accent.

### Primary
- **Saffron Risotto** (`saffron`): the only accent. Fill of every primary action ("Prenota su WhatsApp", nav "Prenota", mobile-bar "Prenota", skip link), hover colour of text links and outline buttons, the focus ring (2px, 3px offset) and `::selection`. Brick-900 text on saffron reads 8.64:1.

### Neutral (the brick ground)
- **Soot-Fired Brick** (`brick-950`): the deepest course. Band colour under dark colour-scheme preference; photo scrims (`/90 → /25-30 → transparent`, bottom-up); recessed troughs inside the booking panel (`/50`).
- **Vault Shadow Brick** (`brick-900`): bands (Ticinum, Hours, footer), solid nav (`/92`), mobile sheet, mobile bar (`/95`), booking panel (`/70`), and the text colour on any mortar or saffron fill.
- **Unfired Clay** (`brick-800`): placeholder fill inside arch frames while photos and the map load.
- **Vault Brick** (`brick-700`): the page ground and the browser `theme-color`. Mortar on it reads 7.83:1, mortar-dim 5.49:1.
- **Dusk Brick** (`brick-dusk`): the ground under `prefers-color-scheme: dark`; the whole world deepens one course (band becomes `brick-950`). `color-scheme: dark` is always declared; there is no light theme.
- **Kiln-Light Brick** (`brick-500`): scrollbar thumb only (track `brick-900`).

### Neutral (the mortar)
- **Lime Mortar** (`mortar`): all primary text, headlines, active selection fills (tabs, day tile, time chip, language switch), logo plaque.
- **Weathered Mortar** (`mortar-dim`): captions, legends, course labels, secondary meta, the italic second clause of the story lede, closed-state text.

### Mortar alpha ladder (joints and washes)
| Alpha | Role |
|---|---|
| `mortar / 10` | hover wash on ghost controls (nav links, stepper, day tiles) |
| `mortar / 12` | quietest joints: footer rule, hours-table rows, mobile-menu rows, mobile-bar top |
| `mortar / 15` | section rules on Menu, Ticinum course rows, booking-panel border |
| `mortar / 20-25` | chip borders, language-switch border, menu button, story fact rules |
| `mortar / 30-35` | secondary and outline button borders, dotted price leaders (`/30`) |
| `mortar / 80-90` | body copy tiers (descriptions `/80`, ledes `/85`, list text `/90`) |

### Named Rules
**The Brick Is The Ground Rule.** Brick is never an accent on a light page. Every surface is a brick tone; contrast between sections comes from moving one course darker (`brick-700` → `brick-900` → `brick-950`), never from introducing a new hue.

**The One Saffron Rule.** Saffron belongs to booking and to the interaction states of actions (hover, focus ring) plus the text-selection highlight. It is never a fill for decoration, a heading colour or a background.

**The Mortar Joint Rule.** Every divider is a 1px mortar hairline at 12-35% alpha. No other line colour exists.

## Typography

**Display Font:** Bodoni Moda Variable (with Bodoni 72, Didot, serif), optical sizing `auto`, roman and italic
**Body Font:** Schibsted Grotesk Variable (with ui-sans-serif, system-ui, sans-serif), stylistic set `ss01` on body

**Character:** a high-contrast Italian Didone for everything that is named (the trattoria, the rooms, the dishes, the prices) against a sturdy, warm newspaper grotesk for everything that informs or acts. Bodoni sets at weight 500 with tight negative tracking at size; it never appears in all caps.

### Hierarchy
| Role | Face / weight | Size | Line height | Tracking | Where |
|---|---|---|---|---|---|
| Display XL | Bodoni 500 | `clamp(3.6rem, 9vw, 6rem)` | 0.95 | -0.03em | Menu page title |
| Display | Bodoni 500 | `clamp(2.75rem, 4.9vw, 4.6rem)` | 1.02 | -0.025em | Home hero h1, `text-wrap: balance` |
| Display (stage) | Bodoni 500 | `clamp(2.6rem, 7vw, 6rem)` | 1.02 | -0.02em | Copy that lands over the opened vault; reviews heading (italic, to `5.25rem`) |
| Headline | Bodoni 500 | `clamp(2.4rem, 5vw, 4.25rem)` | 1.04 | -0.02em | Section h2 (kitchen, room, hours, Menu booking), Ticinum to `4.75rem` |
| Headline S | Bodoni 500 | `clamp(2.2rem, 4vw, 3.5rem)` | 1 | -0.02em | Menu course headings (Antipasti, Primi...) |
| Lede | Bodoni 400 | `clamp(1.9rem, 3.6vw, 3.25rem)` | 1.16 | -0.015em | Story paragraph; second clause italic in `mortar-dim`. Wine statement at `clamp(1.6rem, 2.8vw, 2.4rem)` / 1.2 |
| Title | Bodoni 400 | `clamp(1.35rem, 2.2vw, 1.85rem)` | 1.25-1.375 | normal | Dish names, Ticinum courses (to `2rem` on Home), plate captions at `1.25rem`, mobile menu links at `1.875rem` |
| Numeral | Bodoni 500, tabular lining | `3.75rem` | 1 | normal | Ticinum price; dish prices at `clamp(1.25rem, 2vw, 1.6rem)` |
| Body L | Grotesk 400 | `1.125rem` | 1.625 | normal | Ledes under headings; measure 40-58ch |
| Body | Grotesk 400 | `1rem` (list text `1.05rem`, nav `0.95rem`) | 1.5-1.625 | normal | Descriptions (max 56ch), facts, footer |
| Label | Grotesk 600 | `0.875rem` | 1.43 | normal | Course labels in Ticinum, captions (400), time chips (500) |
| Legend | Grotesk 600 | `0.75rem` | 1.33 | normal | Booking-form fieldset legends, language switch |

All numbers that line up (hours, prices, phone, dates, guest count) use `font-variant-numeric: tabular-nums lining-nums`.

### Named Rules
**The Named-Things-In-Bodoni Rule.** If it is a name (the trattoria, a room, a dish, a course, a price), it is set in Bodoni. If it is an instruction, a label or a fact, it is Schibsted Grotesk.

**The Balanced Headline Rule.** Display and headline text uses `text-wrap: balance` or a `max-width` of 16-18ch so headlines break into two or three even lines, never one long line with a widow.

## Layout

- **Container:** `1400px` max, centred; side gutters `16px` → `24px` (≥640px) → `40px` (≥1024px). Reviews narrow to `1100px`; the Menu Ticinum block to `760px` (list `620px`).
- **Grid:** 12 columns from `md`/`lg`. Hero splits 6/6 (text left, arch right); story 8/4 with the arch dropped `96px` below the lede; Ticinum 5/6 offset; hours 5/7 with the map arch filling the tall column; Menu courses 4/8 (heading left, dishes right).
- **Vertical rhythm:** sections `96px` top and bottom, `144px` from `md`; brick bands `96px` → `128px`. Grid gaps `40px` and `56px`; arch galleries `12px` apart; masonry plates `20px`.
- **Nav:** fixed, `68px` tall; content clears it with `84px`/`104px` hero top padding and `scroll-padding-top: 88px` for anchors.
- **Mobile:** single column; the hero arch moves above the headline at `34svh`, max `26rem` wide; the room accordion becomes a horizontal snap scroller of 78%-wide arches; a fixed bottom bar holds Prenota, call and Menu, and page bottoms reserve `112px` for it.
- **Breakpoints:** Tailwind defaults (`640`, `768`, `1024`, `1280px`).

## Elevation & Depth

The system is tonal. Depth is a darker course of brick: bands sit one course below the ground, troughs inside the booking panel one more (`brick-950 / 50`), and unloaded media show unfired clay (`brick-800`). A fixed brick-course SVG (72 × 56px tile, 2px mortar joints at 5.5% opacity) lies behind all content and never scrolls with it. Glass is used only where content slides beneath a fixed layer: solid nav, sticky Menu tabs (`ground / 95`) and the mobile bar, each with a 12px backdrop blur.

### Shadow Vocabulary
- **Vault lift** (`box-shadow: 0 30px 60px -30px rgba(20,4,2,0.8)`): the booking panel only; a long, low, brick-black pool under the one working object on the page.
- **Nav settle** (`box-shadow: 0 10px 30px -12px rgba(20,4,2,0.6)`): appears with the solid nav background once the page has scrolled past 24px.

### Named Rules
**The Darker Course Rule.** To separate or recess, go one brick tone darker. Shadows are reserved for the booking panel and the scrolled nav; both are tinted brick-black (`rgba(20,4,2,…)`), never grey.

**The Scrim-Only Gradient Rule.** The only gradient is a bottom-up `brick-950` scrim (`/90` → `/25-30` → transparent) that lets mortar type sit on a full-bleed photograph.

## Shapes

- **Arch** (`999px 999px 0 0`): a semicircular top on a straight-sided, flat-bottomed frame. Every photograph uses it (hero entrance, via Ressi, plates, room accordion and scroller, the map iframe), as do the logo plaque and, on large screens, the top of the Menu page's Ticinum band. The hero arch reveals by animating a `clip-path: inset(... round 999px 999px 0 0)` from the bottom.
- **Pill** (`9999px`): every button, link-button, tab, toggle, chip and stepper control.
- **Panel** (`28px`): the booking composer, the single rounded-rectangle container in the system. Day tiles inside it use `16px`.
- **Joints:** 1px mortar hairlines (top or bottom borders, never boxes) divide lists, tables and sections; the Menu uses a dotted mortar leader between dish name and price.
- **Focus:** 2px saffron outline, 3px offset, `6px` radius.

### Named Rules
**The Arch Rule.** A photograph is never shown in a rectangle, circle or card. It stands in an arch, or (only in the vault opening, at full scroll) fills the viewport edge to edge.

**The No-Card Rule.** Content groups are separated by space and mortar hairlines, not by boxed containers. The booking panel is the one exception because it is a working instrument.

## Components

### Buttons
Tactile and round, like a stone worn smooth.
- **Shape:** full pill (`9999px`).
- **Primary (booking):** saffron fill, `brick-900` semibold text, `14px 24px`, WhatsApp glyph at 1.15em. Nav variant `10px 20px` at label size; mobile-bar variant fills the row at `12px` vertical.
- **Hover / Press:** fill turns `mortar`; framer-motion lifts `y: -2` on hover and presses to `scale: 0.97` on `springSnappy`. Nav variant uses CSS `active:scale(0.97)` with `ease-out-expo` 300ms.
- **Secondary (call):** transparent, `mortar / 30` border, `mortar` text, `14px 20px`; hover border to full `mortar` and a `mortar / 10` wash; same lift and press.
- **Outline link ("Vedi il menu", "Indicazioni stradali"):** `mortar / 35` border, `12px 24px`; hover turns border and text saffron; the menu link also slides `x: 4` on `springSnappy`.
- **Text links:** underline offset `0.22em`, thickness 1px, `mortar / 40` decoration; hover text and underline saffron.

### Selection controls (tabs, toggles, chips)
- **Sliding indicator:** a single absolutely positioned pill shared across options via framer-motion `layoutId` (`menu-tab`, `lang-pill`, `day-pill`, `svc-pill`), moving on `springSnappy`. Selected text becomes `brick-900`.
- **Menu tabs:** sticky under the nav (`top: 68px`), on `ground / 95` with blur; pills `8px 16px` at 0.95rem medium; active fill `mortar`; the bar auto-scrolls the active tab to centre.
- **Language switch:** `mortar / 25` bordered pill with 2px inset; uppercase `IT`/`EN` at 0.75rem semibold; active fill `mortar`.
- **Time chips:** `mortar / 20` border, `8px 12px`, tabular; active `mortar` fill and border; chips enter and exit with `scale 0.9 → 1` and `popLayout`.

### Booking Composer (signature)
The working instrument that turns a choice of day, service, time and guests into a pre-written WhatsApp message.
- **Panel:** `28px` radius, `mortar / 15` border, `brick-900 / 70` fill, `16px` (`20px` from 640px) padding, vault-lift shadow, max `560px` except in the compact Menu variant.
- **Day strip:** horizontally scrolling tiles, min `64px`, `16px` radius, two lines (0.7rem uppercase semibold day, tabular date). Closed days are disabled, `mortar / 35` and struck through.
- **Service toggle and guest stepper:** sit in `brick-950 / 50` pill troughs with 4px inset; stepper buttons are 36px circles with `mortar / 10` hover, count in Bodoni 600 at 1.25rem.
- **Actions:** saffron primary plus secondary call button, stacked on mobile, in a row from 640px.

### Arch Frame (signature)
- **Shape:** `999px 999px 0 0`, `overflow: hidden`, `brick-800` behind the image while it loads.
- **Proportions in use:** 3/4, 4/5, 1/1 in the plates masonry; 3/4 for story and mobile room; 4/5 → 5/4 → full column height for the map.
- **Hover:** the image inside scales (1.06 on `springSoft` for plates; 1.05 over 1.4s `ease-out-expo` for the story photo); the frame itself never moves.
- **Room accordion (desktop):** five arches in a `68vh` row (min `460px`); the hovered or focused one grows to `flex-grow: 5` on `spring` via layout animation; caption below updates live.

### Vault Opening (signature)
A `240vh` scroll track with a sticky full-viewport stage. The room photo starts inside an arch inset 12% from the top and 22% from each side; by 64% of the scroll the inset reaches zero. The corner radius stays at half the frame's width (a true semicircle) until 48%, then flattens to square by 64%. The photo de-zooms from 1.22 to 1 by 70%; the copy fades and rises (`y: 40 → 0`) between 50% and 78%. Under reduced motion it is a static `90dvh` full-bleed photo with the scrim and copy.

### Navigation
- **Bar:** fixed, `68px`, transparent over the hero; past 24px of scroll it becomes `brick-900 / 92` with 12px blur and the nav-settle shadow (500ms `ease-out-expo`).
- **Links:** pill `8px 14px`, 0.95rem, `mortar / 85`; hover `mortar / 10` wash and full mortar.
- **Logo:** a `40 × 48px` mortar arch plaque holding the sign artwork, beside "Trattoria Ressi" in Bodoni 600 at 1.45rem and "Pavia" in 0.72rem `mortar-dim`; the plaque lifts 2px on hover.
- **Mobile:** a 44px circular menu button opens a full-height `brick-900` sheet under the bar; links in Bodoni at 1.875rem with `mortar / 12` rules, staggered 0.05s on `spring`; body scroll locks while open.

### Mobile Bar
Fixed to the bottom under 640px: `brick-900 / 95` with blur and a `mortar / 12` top joint, safe-area padding; saffron "Prenota" fills the row, beside a 56px-wide outline call pill and an outline "Menu" pill (hidden on the Menu page).

### Menu Dish Row
Dish name in Bodoni title size, a dotted `mortar / 30` leader filling the gap, price in Bodoni tabular; a 56ch `mortar / 80` description below. Undated prices read "di stagione" in small grotesk `mortar-dim`.

### Motion
| Token | Parameters | Used for |
|---|---|---|
| `spring` | stiffness 140, damping 22, mass 0.9 | Entrances (hero, scroll reveals, page transitions, mobile sheet), room accordion layout |
| `springSoft` | stiffness 90, damping 20 | Image zoom inside arches on hover |
| `springSnappy` | stiffness 420, damping 32 | Sliding indicators, button lift/press, time chips, link nudge |
| hero arch reveal | spring, stiffness 60, damping 18, delay 0.1s | Bottom-up clip of the hero arch |
| hero image settle | spring, stiffness 40, damping 20 | Entrance photo de-zoom 1.06 → 1 |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | CSS transitions: nav background (500ms), logo lift and nav button (300ms), story image (1.4s) |

Scroll reveals rise `28px` by default (up to `60px` for arches), fire once at 25% visibility and stagger list items by 0.05-0.09s. Page transitions rise `24px` in and drop `12px` out (0.18s). `MotionConfig reducedMotion="user"` plus explicit `useReducedMotion` checks render everything in place, and smooth scrolling turns off.

## Do's and Don'ts

### Do:
- **Do** set every surface in a brick tone: ground `brick-700` (`brick-dusk` under dark preference), bands `brick-900` (`brick-950` under dark preference).
- **Do** use saffron for the booking action and for the hover/focus state of actions; set `brick-900` text on it.
- **Do** frame every photograph in the arch (`999px 999px 0 0`) with a `brick-800` loading fill, and keep hover motion inside the frame.
- **Do** make every button, tab, toggle and chip a full pill, and move a single-choice indicator between options with a shared `layoutId` on `springSnappy`.
- **Do** set names, dishes and prices in Bodoni Moda 500 with negative tracking; set instructions and facts in Schibsted Grotesk; use tabular lining numerals for any number in a column.
- **Do** divide with 1px mortar hairlines at 12-35% alpha and with space; recess with a darker brick course.
- **Do** keep booking one tap away: nav "Prenota", hero composer and the mobile bar on every route.
- **Do** ship a reduced-motion path for every animated element that leaves content visible and in place.

### Don't:
- **Don't** put brick on a cream or white page, or add a second accent hue; the contrast comes from brick courses.
- **Don't** show a photograph in a rectangle, rounded card or circle.
- **Don't** wrap content groups in cards; the 28px booking panel is the one container.
- **Don't** use grey or black shadows; the two shadows are brick-black and belong to the booking panel and the scrolled nav.
- **Don't** use gradients except the bottom-up `brick-950` scrim under type on a full-bleed photo.
- **Don't** set Bodoni in all caps or as body copy.
- **Don't** introduce tween easings for entrances; entrances use the named springs.
