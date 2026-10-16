# Petualangan Mudik

An interactive, child-friendly journey companion for a long family car trip: a route map to tick off,
"I Spy", riddles, drawing pages, a vehicle counter, a quiz, a story page and a certificate, with a friendly
capybara mascot ("Capy"). The UI is in Bahasa Indonesia. Built with React, TypeScript, Vite and Tailwind CSS.

**Demo only. This repository contains no real personal or child data.** All names, places and dates are generic samples.

**Source-available, NOT open source.** Free for personal and non-commercial use under the PolyForm Noncommercial License 1.0.0. Commercial use needs written permission: hello@cobadulu.id.

## How to run

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # development server on http://localhost:3000
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run lint       # type check
```

No environment variables and no API keys are needed. The app makes no network requests at runtime.

## Customise the journey

All sample content lives in [`src/data/journey.ts`](src/data/journey.ts): the default player name,
the route and city list, the landmark page, riddles, car-game questions and the quiz.
The sample data is generic ("Kota Asal", "Kota Tujuan", player "Alex"); replace it with your own trip.

Deep links such as `/?page=map` open a page directly (page ids: `map`, `ispy`, `landmark`, `puzzle`, `mood`,
`costume`, `beach`, `maze`, `questions`, `counter`, `building`, `quiz`, `story`, `cert`).

## Data note

- No real child data or real itinerary is included. All names, places and dates are generic samples.
- Everything the player enters (name, date, drawings, story) stays in the browser memory of the device and is
  not stored or sent anywhere. Refreshing the page clears it.
- There is no analytics, tracking or third-party script.
- Fonts are self-hosted (no requests to font servers), so no visitor IP address is sent to a font provider.
- If you customise it with a real child's name or your real route and then host it publicly, you are responsible
  for the privacy duties that apply. Understand them before doing so.

## Third-party notices

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Font licences are in [`licenses/`](licenses/).

## Licence

- Code: [PolyForm Noncommercial License 1.0.0](LICENSE) (personal and non-commercial use only). This is not an OSI-approved open source licence.
- Documentation: [CC BY-NC 4.0](LICENSE-DOCS.txt). Credit: "Coba Dulu". The repository contains no original image artwork; the mascot is drawn with emoji and code.
- Fonts keep their own SIL Open Font License 1.1 (see `licenses/`).
- Commercial use needs written permission via hello@cobadulu.id.

## Credits and third-party notices

Bubblegum Sans and Quicksand fonts (OFL 1.1) and the npm dependencies are credited in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Bahasa Indonesia

Petualangan Mudik adalah teman perjalanan interaktif untuk anak selama perjalanan mudik: peta rute, tebak-tebakan, gambar, kuis, dan maskot kapibara. Ini hanya demo, tanpa data pribadi atau data anak yang asli; semua nama dan tempat bersifat contoh. Gratis untuk keperluan pribadi dan nonkomersial (source-available, bukan open source). Penggunaan komersial memerlukan izin tertulis lewat hello@cobadulu.id. Cara menjalankan ada di bagian "How to run".

## Contact

hello@cobadulu.id

A Coba Dulu project
