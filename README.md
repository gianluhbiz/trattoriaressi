# Trattoria Ressi · sito

Sito della Trattoria Ressi (Via Adeodato Ressi 8, Pavia): home e pagina Menu separata.

**Stack:** Vite + React 19 + TypeScript, Tailwind CSS v4, framer-motion (transizioni spring), react-router (`/` e `/menu`), icone Phosphor, font self-hosted (Bricolage Grotesque, Geist).

```bash
npm install
npm run dev      # sviluppo
npm run build    # produzione in dist/
npm run lint
```

## Cosa c'è

- **Home:** hero a tutto schermo con la sala e un compositore di prenotazione funzionante (giorno, servizio, orario, persone → messaggio WhatsApp precompilato al 320 188 3636, o chiamata). Mercoledì e domenica sera non sono selezionabili. Stato "aperto/chiuso" in tempo reale sull'ora di Pavia.
- **Interazione firma:** allo scroll la foto della sala si apre da riquadro a tutto schermo.
- Storia, cucina (foto dei piatti), menu Ticinum, la sala, recensioni (TripAdvisor 4,2/5, ~340 recensioni), orari con il giorno corrente evidenziato, mappa.
- **/menu:** carta per portate con linguette sticky e indicatore animato, menu Ticinum, vini, note su allergeni e opzioni vegetariane/senza glutine, prenotazione.
- Italiano / inglese (scelta salvata nel browser), `prefers-reduced-motion` rispettato, dati strutturati schema.org `Restaurant`.

## Dati

Contenuti presi da trattoriaressi.com (menu, chi siamo, contatti), TripAdvisor e Google Maps. I prezzi sono quelli pubblicati sulla carta ufficiale; i piatti citati senza prezzo sono indicati "di stagione". Da verificare con la trattoria prima della pubblicazione: orari (le fonti online non concordano), prezzi correnti.

Le foto originali sono in `public/images/` (`node scripts/fetch-images.mjs` le riscarica); le versioni ottimizzate WebP usate dal sito sono in `public/img/`.

Dove modificare: orari e contatti in `src/lib/info.ts`, menu e piatti in `src/lib/menu.ts`.
