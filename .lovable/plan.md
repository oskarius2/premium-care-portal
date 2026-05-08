## Mål

Den stora kort-griden i sektionen **"Certifieringar & utbildning"** på `/om` tar mycket plats (4 stora kort). Vi gör om den till en kompakt FAQ — rubriken byter ton till "Vanliga frågor" och varje certifiering blir en egen flik (accordion-rad) som öppnas vid klick.

## Vad som ändras

**Endast denna sektion på `src/pages/About.tsx` (rad 125–178).** Inget annat på sidan rörs.

### Ny rubrik
- Eyebrow: `Vanliga frågor` (ersätter "Certifieringar & utbildning")
- H2: `Allt du undrar om` / *`min bakgrund.`* (samma typografi och rose-italic-stil som idag)
- Höger-textstycket behålls — det ramar in FAQ:n bra.

### Layout
Behåller samma sektion-wrapper (gradient-bakgrund, border, section-y) så den smälter in visuellt. Två-kolumns grid (rubrik vänster, ingress höger) ligger kvar.

Under rubrik-blocket: en `Accordion` (shadcn `@/components/ui/accordion` — redan installerad) i full bredd, max ca `max-w-4xl`, centrerad.

### En flik per certifiering
Datan i `credentials`-arrayen återanvänds 1:1 (ingen text ändras). Varje rad:

```text
[ikon]  LEG.   Legitimerad sjuksköterska              [01]   ⌄
        ────────────────────────────────────────────────────
        SOCIALSTYRELSEN
        ─── (tunn rose-linje)
        Grundutbildning och svensk legitimation – samma
        medicinska ramverk som inom övrig sjukvård.
```

- **Trigger (stängt läge):** ikon i rose-cirkel (mindre, ca 36–40 px), `eyebrow-clinic` med `c.year`, serif-titel `c.title`, nummer `0{i+1}` i rose till höger, chevron längst ut.
- **Content (öppet läge):** issuer i clinical-caps, hairline-rose, beskrivning i `text-muted-foreground font-light`.
- Rader separeras med befintlig `border-b border-border` (inte `bg-border` grid-tricket).
- Första fliken öppen som default (`defaultValue="item-0"`) så det syns direkt vad det är.

### Bevaras
- All copy (year, title, issuer, desc) ordagrant.
- Ikoner: `GraduationCap`, `BookOpen`, `Award`, `BadgeCheck`.
- Färger: enbart befintliga tokens (`text-rose`, `text-rose-deep`, `border-rose/40`, `bg-surface-elevated`, `text-muted-foreground` osv). Inga nya hex.
- Fonter: Fraunces (serif) för titel/nummer, Inter för övrigt — ingen ändring.

## Vad som INTE ändras
- Hero, Bio, Filosofi, Patientflöde, Quote — orörda.
- `credentials`-arrayens innehåll.
- Inga andra sidor, ingen header/footer, inga tokens.

## Teknisk not
Använder `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` från `@/components/ui/accordion`. `AccordionTrigger`s default-chevron behålls; vi customizar bara innehållet inuti triggern med vår layout (ikon + meta + nummer).
