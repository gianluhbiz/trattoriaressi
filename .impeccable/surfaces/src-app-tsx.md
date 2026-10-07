---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: ["src/pages/Menu.tsx"]
---

# Surface brief: Trattoria Ressi site (Home + Menu)

Scope: Home (`/`) and Menu (`/menu`). Visitor mode: Persuade.
Audience: Pavia locals and visitors on phones deciding lunch/dinner. Action: book by WhatsApp or phone. Proof: real photos of the vault and plates, TripAdvisor 4.2 (~340), real hours, real menu with indicative prices. Constraints: no invented quotes or prices; bilingual IT/EN.

## Direction contract

THESIS: The page is the room: a red-brick barrel vault. Refuses the cream-paper trattoria template with serif and a terracotta button; the brick is the whole ground, not an accent.

OWN-WORLD: Drenched fired-brick field in several brick tones (deep vault red, darker soot-fired brick for bands), mortar lime-white for text and hairline joints, one accent: saffron gold (risotto allo zafferano) on every primary action. Bodoni Moda display (Po-valley Italian typography), Schibsted Grotesk body. Arch-topped frames as the only shape language for photos; buttons full pill; no cards.

STORY: Visitor sees the vault, knows it is a historic Pavese trattoria open today, books in two taps; scrolls through plates, the Ticinum tasting menu, the room, reviews, hours and map; opens the full seasonal Menu page.

FIRST VIEWPORT: Left 5/12: Bodoni headline (2 lines), short subtext, live open-status line, working booking composer (people, day, service time) with saffron "Prenota su WhatsApp" and secondary call. Right half: a tall arch window with the arched entrance on via Ressi (static, spring entrance). On mobile the same arch sits above the headline at about a third of the viewport. Signature interaction lives in the next section, by design: the visitor first sees the door, then on scroll an arch onto the dining room widens to full bleed ("Entrate dall'arco"), the act of walking in. Kept separate because the entrance photo is too low-res to go full bleed and the story reads door then room. Nav 68px with logo sign, links, IT/EN, Prenota.

FORM: Grounded candidate "La volta in mattoni", position 1 on the ordered list (user override of assigned 5), seed key 6285ec6f (degraded roll, no challengers). Motion grammar: springs (stiffness 120-220, damping 20-26) for entrances, layoutId tab indicator on Menu, scroll-linked vault opening.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
