import type { L } from './i18n'

export type Diet = 'veg' | 'vegan'
export type Dish = { name: string; desc?: L; price?: number; diet?: Diet; allergens?: number[] }
export type Course = { id: string; title: L; note?: L; dishes: Dish[] }

/**
 * Carta di novembre, dal menu "Post-trattoria sostenibile".
 * I numeri in `allergens` rimandano alla tabella ALLERGENS (Reg. UE 1169/2011).
 */
export const COURSES: Course[] = [
  {
    id: 'antipasti',
    title: { it: 'Antipasti', en: 'Starters' },
    dishes: [
      {
        name: 'Selezione di Salumi del Territorio',
        desc: {
          it: 'Salame DOP di Varzi, Pancetta al pepe e Salame cotto artigianali, Porchetta cotta a legna.',
          en: 'Varzi PDO salami, artisan peppered pancetta and cooked salami, wood-roasted porchetta.',
        },
        price: 18,
      },
      {
        name: 'Selezione di Formaggi',
        desc: {
          it: 'Tre affinamenti del territorio, tre selezioni di caprini artigianali, serviti con miele biologico e confetture solidali.',
          en: 'Three local aged cheeses and three artisan goat cheeses, with organic honey and fair-trade preserves.',
        },
        price: 18,
        diet: 'veg',
        allergens: [7],
      },
      {
        name: 'Cinque Funghi in Cinque Cotture',
        desc: {
          it: 'Shitake in CBT con spezie Thai, Cardoncelli stufati con salsa di soia, Pleurotus marinati su frytop, Portobello fritto in pastella e Finferli trifolati.',
          en: 'Sous-vide shiitake with Thai spices, king oysters braised in soy sauce, griddled marinated oyster mushrooms, battered Portobello and sautéed chanterelles.',
        },
        price: 20,
        diet: 'vegan',
        allergens: [1, 6],
      },
      {
        name: 'Tradizione dell’Orto: Sei Proposte Vegetariane',
        desc: {
          it: 'Il ritmo delle stagioni raccontato attraverso la nostra terra: vegetali freschi, sfoglie artigianali, polenta, uova e sformati della casa.',
          en: 'The seasons told through our land: fresh vegetables, artisan pastry, polenta, eggs and house-made flans.',
        },
        price: 18,
        diet: 'veg',
        allergens: [1, 3, 9],
      },
      {
        name: 'Baccalà Mantecato',
        desc: {
          it: 'Baccalà mantecato in pasta sfoglia, servito su crema di peperoni rossi e cipolla caramellata.',
          en: 'Whipped salt cod in puff pastry, on red pepper cream and caramelised onion.',
        },
        price: 18,
        allergens: [1, 4],
      },
    ],
  },
  {
    id: 'primi',
    title: { it: 'Primi', en: 'First courses' },
    dishes: [
      {
        name: 'Risotto Carnaroli con Porcini e Funghi dell’Orto',
        desc: {
          it: 'Riso Carnaroli autentico mantecato all’olio EVO con funghi Porcini freschi dell’Oltrepò Pavese e selezione di funghi di stagione.',
          en: 'Carnaroli rice finished with extra virgin olive oil, fresh Oltrepò Pavese porcini and seasonal mushrooms.',
        },
        price: 18,
        diet: 'veg',
      },
      {
        name: 'Pacchero Artigianale alle Verdure dell’Orto',
        desc: {
          it: 'Paccheri artigianali trafilati al bronzo saltati con mix di verdure fresche di stagione.',
          en: 'Bronze-drawn artisan paccheri tossed with fresh seasonal vegetables.',
        },
        price: 14,
        diet: 'vegan',
        allergens: [1],
      },
      {
        name: 'Lasagna alla Valtellinese',
        desc: {
          it: 'Lasagna fatta in casa con sfoglia al grano saraceno, verza, patate, formaggio Casera e besciamella.',
          en: 'House-made buckwheat lasagna with savoy cabbage, potatoes, Casera cheese and béchamel.',
        },
        price: 16,
        diet: 'veg',
        allergens: [1, 3, 7],
      },
      {
        name: 'Ravioli di Brasato nel loro sugo',
        desc: {
          it: 'Ravioli fatti in casa ripieni di brasato di manzo da allevamento etico e sostenibile.',
          en: 'House-made ravioli filled with braised beef from ethical, sustainable farming, in their own jus.',
        },
        price: 18,
        allergens: [1, 3],
      },
      {
        name: 'Gnocchi di Patate con Scorfano e Zafferano',
        desc: {
          it: 'Gnocchi fatti in casa saltati con scorfano pescato all’amo, zafferano, panna e scarola.',
          en: 'House-made potato gnocchi with line-caught scorpionfish, saffron, cream and escarole.',
        },
        price: 20,
        allergens: [1, 4, 7],
      },
    ],
  },
  {
    id: 'secondi',
    title: { it: 'Secondi', en: 'Main courses' },
    dishes: [
      {
        name: 'Brasato di Manzo con Polenta',
        desc: {
          it: 'Brasato di manzo da allevamento etico cotto lentamente al vino rosso, servito con polenta calda artigianale.',
          en: 'Ethically farmed beef slow-braised in red wine, with warm artisan polenta.',
        },
        price: 24,
        allergens: [12],
      },
      {
        name: 'Galletto Ruspante alle Erbe Antiche',
        desc: {
          it: 'Galletto locale ruspante cotto al forno con intingolo alle erbe aromatiche tradizionali, servito con verdure fresche di stagione.',
          en: 'Local free-range spring chicken roasted with a traditional herb sauce, with fresh seasonal vegetables.',
        },
        price: 20,
        allergens: [12],
      },
      {
        name: 'Hummus di Zucca e Ceci con Senape',
        desc: {
          it: 'Hummus artigianale di ceci e zucca mantecato con senape, servito con il nostro mix di verdure fresche di stagione.',
          en: 'Chickpea and pumpkin hummus blended with mustard, with our fresh seasonal vegetables.',
        },
        price: 18,
        diet: 'vegan',
        allergens: [10],
      },
      {
        name: 'Spiedone di Formaggi e Verdure dell’Orto',
        desc: {
          it: 'Spiedini di tomino e caciocavallo alla piastra, alternati con il nostro mix di verdure fresche di stagione.',
          en: 'Griddled tomino and caciocavallo skewers with our fresh seasonal vegetables.',
        },
        price: 18,
        diet: 'veg',
        allergens: [7],
      },
      {
        name: 'Filetto di Pescato del Giorno',
        desc: {
          it: 'Filetto di pesce fresco pescato secondo disponibilità del mercato, cotto alla piastra e servito con verdure fresche di stagione.',
          en: 'Fresh fish fillet from the day’s market, griddled, with fresh seasonal vegetables.',
        },
        price: 28,
      },
    ],
  },
  {
    id: 'dolci',
    title: { it: 'Dolci', en: 'Desserts' },
    dishes: [
      {
        name: 'Torta Paradiso con Crema al Mascarpone',
        desc: {
          it: 'Torta tradizionale pavese fatta in casa, servita con crema morbida al mascarpone.',
          en: 'House-made traditional Pavia sponge cake with soft mascarpone cream.',
        },
        price: 7,
        diet: 'veg',
        allergens: [3, 7],
      },
      { name: 'Frutta di Stagione', price: 4, diet: 'vegan' },
      {
        name: 'Crostata di Castagne e Cioccolato',
        desc: {
          it: 'Crostata artigianale fatta in casa con frolla friabile, castagne e cioccolato fondente.',
          en: 'House-made shortcrust tart with chestnuts and dark chocolate.',
        },
        price: 7,
        diet: 'veg',
        allergens: [1, 3],
      },
      {
        name: 'Panna Cotta al Latte di Cocco',
        desc: {
          it: 'Panna cotta 100% vegetale al latte di cocco, servita con cioccolato fondente e marmellata ai frutti di bosco.',
          en: '100% plant-based coconut milk panna cotta with dark chocolate and berry jam.',
        },
        price: 7,
        diet: 'vegan',
        allergens: [6],
      },
      {
        name: 'Torta Sbrisolona',
        desc: {
          it: 'Dolce secco tradizionale fatto in casa con mandorle intere e burro d’affioramento.',
          en: 'House-made traditional crumbly cake with whole almonds and cream-skimmed butter.',
        },
        price: 7,
        diet: 'veg',
        allergens: [1, 3, 7, 8],
      },
    ],
  },
]

/** Il manifesto dell'orto: le verdure di questa stagione. */
export const VEGETABLES: { group: L; items: L }[] = [
  {
    group: { it: 'I Bulbi e le Basi Tradizionali', en: 'Bulbs and Traditional Bases' },
    items: { it: 'Cipolle dorate, cipolle rosse, porri, sedano, aglio.', en: 'Golden onions, red onions, leeks, celery, garlic.' },
  },
  {
    group: { it: 'Le Radici e i Tuberi del Territorio', en: 'Local Roots and Tubers' },
    items: { it: 'Patate a pasta gialla, carote.', en: 'Yellow-fleshed potatoes, carrots.' },
  },
  {
    group: { it: 'Gli Ortaggi della Tradizione Rurale', en: 'Vegetables of the Rural Tradition' },
    items: { it: 'Zucca, verze, broccoli e cavolfiori.', en: 'Pumpkin, savoy cabbage, broccoli and cauliflower.' },
  },
  {
    group: { it: 'La Selezione dei Boschi e dei Prati', en: 'From the Woods and Meadows' },
    items: {
      it: 'Funghi Porcini dell’Oltrepò Pavese, funghi Shitake, funghi Cardoncelli, funghi Pleurotus, funghi Portobello e funghi Finferli.',
      en: 'Oltrepò Pavese porcini, shiitake, king oyster, oyster, Portobello and chanterelle mushrooms.',
    },
  },
  {
    group: { it: 'Le Foglie e gli Ortaggi da Campo', en: 'Leaves and Field Vegetables' },
    items: { it: 'Scarola fresca, finocchi e piattoni.', en: 'Fresh escarole, fennel and flat beans.' },
  },
]

/** Tabella allergeni, Reg. UE 1169/2011. Senza `where` = assente dal menu attuale. */
export const ALLERGENS: { n: number; name: L; where?: L }[] = [
  {
    n: 1,
    name: { it: 'Glutine', en: 'Gluten' },
    where: { it: 'Panificati, paccheri, lasagne, ravioli e gnocchi.', en: 'Bread, paccheri, lasagna, ravioli and gnocchi.' },
  },
  { n: 2, name: { it: 'Crostacei', en: 'Crustaceans' } },
  {
    n: 3,
    name: { it: 'Uova', en: 'Eggs' },
    where: { it: 'Lasagne, ravioli, sformati, torte e crostate.', en: 'Lasagna, ravioli, flans, cakes and tarts.' },
  },
  {
    n: 4,
    name: { it: 'Pesce', en: 'Fish' },
    where: { it: 'Baccalà mantecato e gnocchi allo scorfano.', en: 'Whipped salt cod and scorpionfish gnocchi.' },
  },
  { n: 5, name: { it: 'Arachidi', en: 'Peanuts' } },
  {
    n: 6,
    name: { it: 'Soia', en: 'Soy' },
    where: { it: 'Funghi cardoncelli (salsa di soia) e panna cotta (lecitina).', en: 'King oyster mushrooms (soy sauce) and panna cotta (lecithin).' },
  },
  {
    n: 7,
    name: { it: 'Latte e latticini', en: 'Milk and dairy' },
    where: { it: 'Formaggi, lasagne, gnocchi, spiedoni e torte.', en: 'Cheeses, lasagna, gnocchi, skewers and cakes.' },
  },
  {
    n: 8,
    name: { it: 'Frutta a guscio', en: 'Tree nuts' },
    where: { it: 'Torta sbrisolona (mandorle).', en: 'Sbrisolona cake (almonds).' },
  },
  {
    n: 9,
    name: { it: 'Sedano', en: 'Celery' },
    where: { it: 'Basi orticole e Tradizione dell’Orto.', en: 'Vegetable bases and the Tradizione dell’Orto starter.' },  },
  {
    n: 10,
    name: { it: 'Senape', en: 'Mustard' },
    where: { it: 'Hummus di zucca e ceci.', en: 'Pumpkin and chickpea hummus.' },
  },
  { n: 11, name: { it: 'Sesamo', en: 'Sesame' } },
  {
    n: 12,
    name: { it: 'Anidride solforosa e solfiti', en: 'Sulphur dioxide and sulphites' },
    where: { it: 'Brasato e galletto (cotture con vino).', en: 'Braised beef and spring chicken (cooked in wine).' },
  },
  { n: 13, name: { it: 'Lupini', en: 'Lupin' } },
  { n: 14, name: { it: 'Molluschi', en: 'Molluscs' } },
]

export type Plate = { src: string; name: L; w: number; h: number }

/** Foto dei piatti dal sito ufficiale. */
export const PLATES: Plate[] = [
  {
    src: '/img/risotto-zafferano.webp',
    name: { it: 'Risotto con cernia, zafferano e arancia', en: 'Risotto with grouper, saffron and orange' },
    w: 1280,
    h: 1600,
  },
  { src: '/img/polpo.webp', name: { it: 'Polpo', en: 'Octopus' }, w: 1280, h: 1600 },
  { src: '/img/agnello.webp', name: { it: 'Costolette di agnello', en: 'Lamb cutlets' }, w: 960, h: 960 },
  { src: '/img/ravioli.webp', name: { it: 'Ravioli fatti in casa', en: 'House made ravioli' }, w: 1280, h: 1600 },
  { src: '/img/black-cod.webp', name: { it: 'Filetto di black cod', en: 'Black cod fillet' }, w: 818, h: 960 },
  {
    src: '/img/risotto-barbabietola.webp',
    name: { it: 'Risotto alla barbabietola', en: 'Beetroot risotto' },
    w: 1200,
    h: 1600,
  },
]
