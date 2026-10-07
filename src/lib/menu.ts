import type { L } from './i18n'

export type Dish = { name: string; desc?: L; price?: number; veg?: boolean }
export type Course = { id: string; title: L; note?: L; dishes: Dish[] }

/**
 * Carta tratta dalla pagina Menu ufficiale (trattoriaressi.com/menu) e dalla pagina Chi siamo.
 * I piatti senza prezzo sono citati dalla trattoria ma non hanno un prezzo pubblicato.
 */
export const COURSES: Course[] = [
  {
    id: 'antipasti',
    title: { it: 'Antipasti', en: 'Starters' },
    dishes: [
      {
        name: 'Vitello tonnato',
        desc: { it: 'Con salsa tonnata', en: 'Veal with tuna sauce' },
        price: 16,
      },
      {
        name: 'Sfoglia ripiena di baccalà mantecato',
        desc: { it: 'Pasta sfoglia e baccalà mantecato', en: 'Puff pastry filled with whipped salt cod' },
        price: 18,
      },
      {
        name: 'Cacciatorino di Varzi',
        desc: { it: 'Il salame dell’Oltrepò Pavese', en: 'The Oltrepò Pavese salami' },
      },
      {
        name: 'Salumi e formaggi del territorio',
        desc: { it: 'Dai produttori locali', en: 'From local producers' },
      },
    ],
  },
  {
    id: 'primi',
    title: { it: 'Primi', en: 'First courses' },
    note: { it: 'Pasta fresca fatta in casa', en: 'Fresh pasta made in house' },
    dishes: [
      {
        name: 'Carnaroli Cascina Alberona',
        desc: { it: 'Allo zafferano, con midollo in gremolada', en: 'Saffron risotto with bone marrow and gremolata' },
        price: 18,
      },
      {
        name: 'Gnocchi ripieni di baccalà',
        desc: { it: 'Al ragù di polpo', en: 'Salt cod filled gnocchi, octopus ragù' },
        price: 18,
      },
      {
        name: 'Ravioli alla carbonara',
        desc: { it: 'Pasta all’uovo ripiena', en: 'Egg pasta filled with carbonara' },
        price: 16,
      },
      {
        name: 'Pappardelle al ragù di lepre selvatica',
        desc: { it: 'Pasta all’uovo, ragù di lepre', en: 'Egg pasta with wild hare ragù' },
        price: 18,
      },
    ],
  },
  {
    id: 'secondi',
    title: { it: 'Secondi', en: 'Main courses' },
    dishes: [
      {
        name: 'Faraona disossata',
        desc: {
          it: 'Farcita di salsiccia, il suo fondo, caponata di verdure',
          en: 'Boned guinea fowl stuffed with sausage, its jus, vegetable caponata',
        },
        price: 22,
      },
      {
        name: 'Pescato del giorno',
        desc: { it: 'Alle erbe, con verdure di stagione', en: 'Catch of the day with herbs and seasonal vegetables' },
        price: 26,
      },
      {
        name: 'Ossobuco in gremolada',
        desc: { it: 'Il classico lombardo', en: 'The Lombard classic, with gremolata' },
      },
      {
        name: 'Quaglia disossata e ripiena',
        desc: { it: 'Quando è stagione', en: 'Boned stuffed quail, in season' },
      },
    ],
  },
  {
    id: 'dolci',
    title: { it: 'Dolci', en: 'Desserts' },
    note: { it: 'Tutti fatti in casa', en: 'All made in house' },
    dishes: [
      {
        name: 'Torta Paradiso',
        desc: { it: 'Con crema al mascarpone', en: 'Pavia’s sponge cake with mascarpone cream' },
        price: 7,
      },
      { name: 'Zuppa inglese', desc: { it: 'Al cucchiaio', en: 'Custard and liqueur trifle' }, price: 7 },
      {
        name: 'Fragole al Sangue di Giuda',
        desc: { it: 'Con il vino dolce dell’Oltrepò', en: 'Strawberries in Oltrepò sweet red wine' },
        price: 7,
      },
      {
        name: 'Turta d’armandul',
        desc: { it: 'La torta di mandorle di Varzi', en: 'Almond cake from Varzi' },
      },
    ],
  },
]

export const TICINUM = {
  price: 50,
  courses: [
    { name: 'Cacciatorino Gran Varzi', course: { it: 'Antipasto', en: 'Starter' } },
    { name: 'Carnaroli Alberona, midollo in gremolada', course: { it: 'Primo', en: 'First' } },
    { name: 'Faraona disossata farcita di salsiccia, caponata', course: { it: 'Secondo', en: 'Main' } },
    { name: 'Torta Paradiso, crema al mascarpone', course: { it: 'Dolce', en: 'Dessert' } },
  ],
}

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
