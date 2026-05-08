# Layoutspec – "sjukhusjournal"

Konsekvent layout-guide över hela sajten. Implementeras via klasser i
`src/index.css` (`container-wide`, `container-narrow`, `section-y`,
`section-y-sm`) och Tailwinds 12-kolumns-grid.

## 1. Breakpoints

| Vy            | Bredd        | Tailwind |
| ------------- | ------------ | -------- |
| Mobil         | < 768 px     | (default)|
| iPad / tablet | 768–1023 px  | `md:`    |
| Desktop       | ≥ 1024 px    | `lg:`    |

Använd ALDRIG `sm:`, `xl:`, `2xl:`.

## 2. Innehållsbredd & marginaler

| Container         | Max     | Mobil | iPad  | Desktop | Användning                            |
| ----------------- | ------- | ----- | ----- | ------- | ------------------------------------- |
| `container-wide`  | 1280 px | px-6  | px-10 | px-12   | Hero, sektioner, header, footer, grid |
| `container-narrow`| 1152 px | px-6  | px-10 | px-10   | Brödtext, formulär, journaltext       |

Yttermarginal mot skärmkant: 24 / 40 / 48 px.
Brödtext inuti `container-narrow`: max-w-[68ch].

## 3. Vertikal rytm

| Token            | Mobil      | iPad       | Desktop    |
| ---------------- | ---------- | ---------- | ---------- |
| `section-y`      | py-20 (80) | py-28 (112)| py-40 (160)|
| `section-y-sm`   | py-16 (64) | py-24 (96) | py-28 (112)|
| Hero top-padding | pt-28      | pt-32      | pt-40      |
| Rubrik → ingress | mb-5       | mb-6       | mb-8       |
| Ingress → innehåll| mb-10     | mb-14      | mb-20      |

## 4. Sidopanel (journal-vänsterkant)

```
Desktop (≥1024)            iPad (768–1023)         Mobil (<768)
┌──┬─────┬─────────────┐   ┌──┬─────────────┐     ┌─────────────┐
│  │     │             │   │  │             │     │ ─── rail ── │
│R │ Nav │  Innehåll   │   │R │  Innehåll   │     ├─────────────┤
│  │280  │             │   │44│             │     │  Innehåll   │
└──┴─────┴─────────────┘   └──┴─────────────┘     └─────────────┘
44 + 280 + flex            44 + flex              full bredd
```

Grid-template:
- Mobil: block (rail blir horisontell statusrad)
- iPad:  `md:grid-cols-[44px_1fr]`
- Desktop: `lg:grid-cols-[44px_280px_1fr]`

Gap: gap-4 / gap-5 / gap-7. Sidopanelen är alltid synlig på md+,
aldrig drawer.

## 5. 12-kolumners-grid inuti sektioner

| Layout                   | Mobil | iPad           | Desktop        |
| ------------------------ | ----- | -------------- | -------------- |
| Två-kolumners journal    | stack | 12 kol, 5/7    | 12 kol, 5/7    |
| Behandlingskort          | 1 kol | 2 kol          | 3 kol          |
| Statistik / metadata     | 2 kol | 3 kol          | 3–4 kol        |
| Footer                   | stack | 12 kol         | 12 kol         |
| Gap inom grid            | gap-7 | gap-10         | gap-16         |
| Hairline mellan celler   | `gap-px bg-border` på alla vyer            |

## 6. Header & Footer

| Element        | Mobil | iPad  | Desktop |
| -------------- | ----- | ----- | ------- |
| Header-höjd    | h-16  | h-20  | h-20    |
| Header-nav     | hamburger | hamburger | full inline |
| Footer-padding | py-16 | py-20 | py-24   |

## 7. Sidspecifika målbilder

- **Index** – hero (`container-wide`, pt-28→pt-40) → 12-kol intro (5/7) →
  process-grid (`gap-px`) → behandlingar (1/2/3 kol) → CTA centrerad.
- **Treatments** – hero `container-wide` pt-32/40 → 2-kol behandlingsraster
  med hairlines.
- **TreatmentDetail** – hero kompakt (pt-28/32) → 12-kol (innehåll 7 / bild 5)
  → 3-kol metadata-rad → relaterat 2/3-kol.
- **About** – hero → 12-kol (5 bild / 7 text) → 2-kol värderingsraster.
- **Contact** – hero → 12-kol (7 bild / 5 info), formulär max-w-[560px].
- **PatientFlow** (Index) – fullbreddssektion, 3-kolumners layout
  (rail 44 / nav 280 / innehåll flex) på desktop, kollapsar enligt §4.
