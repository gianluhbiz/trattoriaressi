---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/pages/Menu.tsx"]
---

# Surface brief: Trattoria Ressi site (Home + Menu)

Scope: Home (`/`) and Menu (`/menu`). Visitor mode: Persuade.
Audience: Pavia locals and visitors on phones deciding lunch/dinner. Action: book by WhatsApp or phone. Proof: real photos of the room and plates, TripAdvisor 4.2 (~340), real hours, real menu with indicative prices. Constraints: no invented quotes or prices; bilingual IT/EN; no arches or domes (user rejected them); native scroll, no smooth-scroll library.

## Direction contract

THESIS: An evening in the trattoria: the warm room photographed in the dark, photos lead and the interface recedes. Refuses both the rustic cream-and-serif trattoria template and the earlier arch-framed brick world.

OWN-WORLD: Warm near-black grounds (coal #15110e, char bands #1f1915), cream text #efe6da, muted #a8998a, one accent saffron #f0b429 only on primary actions. Bricolage Grotesque display (semibold, tight tracking), Geist body. Rectangles with 6px radius for photos, 16px for the single booking panel, full pills for controls. No cards, no arches.

STORY: Visitor sees the lit room, knows it is a family Pavese trattoria open today, books in two taps; scrolls the story, the room opening to full screen, plates carousel, Ticinum, the room accordion, reviews, hours and map; opens the Menu page.

FIRST VIEWPORT: Full-bleed daylight room photo with left and bottom scrims and gentle parallax. Bottom left 7/12: two-line headline, subtext, live open status. Bottom right 5/12: working booking composer with saffron WhatsApp action. Mobile: photo 60svh, headline overlapping its lower third, composer below. Nav 68px transparent, solid on scroll.

FORM: User-pinned "Scuro e caldo" (replaces "La volta in mattoni"); seed key 6285ec6f (degraded roll). Motion grammar: zero-bounce duration springs (0.5s / 1.1s / 1.6s), reveals with fade, rise and blur-to-focus, scroll-linked values smoothed through useSpring. Signature: the room photo opens from an inset rectangle to full bleed on scroll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
