// Sample journey content. Edit this file to match your own trip.
// Everything here is generic sample data; no real places, names or dates.

export const APP_TITLE = 'Petualangan Mudik';

/** Default player name shown on the welcome page and the certificate. */
export const DEFAULT_PLAYER_NAME = 'Alex';

/** Route in order. The last stop is the "back home" stop and triggers the confetti. */
export const ROUTE: string[] = [
  'Kota Asal',
  'Kota Singgah 1',
  'Kota Tujuan',
  'Kota Singgah 2',
  'Kota Asal',
];
export const ROUTE_END_LABEL = 'Kembali di Rumah';

/** Fun-fact + drawing page about a landmark on the route. */
export const LANDMARK = {
  navLabel: 'Landmark',
  title: 'Bangunan Bersejarah',
  funFact: 'Banyak bangunan tua punya cerita menarik. Tanyakan pada orang dewasa di sekitarmu!',
  drawingTitle: 'Gambar Bangunan Versimu',
};

/** Riddles: question, expected answer (lowercase). */
export const RIDDLES: { q: string; a: string }[] = [
  { q: 'Aku bangunan kuno dari batu', a: 'candi' },
  { q: 'Aku kendaraan besar di jalan tol', a: 'truk' },
  { q: 'Aku tempat kapal berlabuh', a: 'pelabuhan' },
];

/** Drawing pages. */
export const COSTUME = {
  navLabel: 'Kostum',
  title: 'Desain Kostum Karnaval',
  message: 'Setiap kota punya festival yang seru. Ayo gambar kostummu!',
};
export const BEACH = {
  title: 'Pantai Impian',
  message: 'Gambar pantai impianmu di sini!',
};
export const BUILDING = {
  navLabel: 'Bangunan',
  title: 'Gambar Gedung Unik',
  message: 'Gedung apa yang paling unik menurutmu? Ayo gambar!',
  drawingTitle: 'Gedung Unik',
};

/** Ideas for the "20 questions" car game. */
export const CAR_QUESTIONS: string[] = [
  'Apa warna mobil yang paling banyak lewat?',
  'Siapa yang bisa lihat pohon kelapa duluan?',
  'Sebutkan 3 makanan yang mau dimakan di tempat tujuan!',
  'Hewan apa yang paling lucu di jalan?',
];

/** Quiz: question, options, index of the correct option. */
export const QUIZ: { q: string; a: string[]; c: number }[] = [
  { q: 'Kota mana yang jadi tujuan perjalanan?', a: ['Kota Asal', 'Kota Tujuan', 'Kota Singgah 1'], c: 1 },
  { q: 'Kita berangkat naik apa?', a: ['Pesawat', 'Mobil', 'Kapal'], c: 1 },
  { q: 'Apa hewan sahabat kita di perjalanan?', a: ['Capy si kapibara', 'Kucing', 'Kelinci'], c: 0 },
  { q: 'Berapa kota dalam rute kita (termasuk rumah di akhir)?', a: ['3', '5', '8'], c: 1 },
  { q: 'Apa yang kita lakukan setiap sampai di kota baru?', a: ['Menandai peta', 'Tidur terus', 'Lupa'], c: 0 },
];
