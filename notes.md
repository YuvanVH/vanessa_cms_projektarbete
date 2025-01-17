# Komponentförklaringar:

- CategoriFilter - komponenten kommer att ha ansvaret för att hantera kategorifiltret och skicka uppdaterade filtervärden till föräldern (t.ex. ProjectsClient).

- ProjectsClient - komponenten tar emot filtrerade värden från CategoryFilter och använder dem för att uppdatera den visade projektlistan.

- ProjectsList - komponenten kommer nu att enbart fokusera på att visa de filtrerade projekten.

## Seo-op.
Page.js
- Titel: Bra för sökmotorer och användare.
- Beskrivning: Hjälper sökmotorer att visa en informativ snippet i sökresultat.
- Open Graph (OG): Användbart för att förbättra delning på sociala medier.
<Head>
  <title>{title}</title>
  <meta name="description" content={presentation} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={presentation} />
</Head>

- Semantisk HTML: Struktur använder semantiska element som <main> och <header>. Detta hjälper sökmotorer att förstå sidans struktur.
- Alt-texter för Bilder: har en alt-text för bilderna, vilket är viktigt för både SEO och tillgänglighet: <img src={media} alt={title} />
