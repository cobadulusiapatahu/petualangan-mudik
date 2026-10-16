# Third-party notices

This project (source-available, see README.md and LICENSE) uses third-party software and fonts under
their own licences. The licences of these components are not changed by this project's licence terms.
Full licence texts of all npm packages are included in each package under `node_modules/` after `npm install`.

## Fonts (SIL Open Font License 1.1)

Self-hosted through the npm packages `@fontsource/bubblegum-sans` and `@fontsource/quicksand`.
The licence files, including the copyright statements, are in `licenses/`:

- Bubblegum Sans: `licenses/OFL-Bubblegum-Sans.txt`
- Quicksand: `licenses/OFL-Quicksand.txt`

The fonts are used unmodified and are not sold on their own.

## caniuse-lite (CC-BY-4.0)

The browser-support data package `caniuse-lite` is a transitive build-time dependency
(used by browser-target tooling; it is not shipped in the built app).

- Data: Can I Use (caniuse.com) and its contributors. Package by Ben Briggs.
- Licence: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/
- Changes: none, the data is used as published on npm.

## Apache-2.0 components

The following transitive packages are licensed under the Apache License 2.0
(https://www.apache.org/licenses/LICENSE-2.0). They are build/tooling dependencies and are not part
of the built app. Each package's own licence file lives in its folder under `node_modules/`.

| Package | Used for |
|---------|----------|
| detect-libc | Native tooling helper (Tailwind CSS toolchain) |
| baseline-browser-mapping | Browser-target tooling |
| typescript | Type checking (`npm run lint`) |

None of these packages ships a `NOTICE` file in the versions locked by `package-lock.json`
(checked at the time of writing). If a future version adds one, its content must be copied here.
`typescript` ships `ThirdPartyNoticeText.txt`, which applies to TypeScript itself.

## Other dependencies

React, Tailwind CSS, Vite, framer-motion, lucide-react, canvas-confetti, clsx and tailwind-merge
and their dependencies are under permissive licences (MIT, ISC or similar); see each package.
