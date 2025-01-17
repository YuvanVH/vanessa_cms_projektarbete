# Komponentförklaringar:

- CategoriFilter - komponenten kommer att ha ansvaret för att hantera kategorifiltret och skicka uppdaterade filtervärden till föräldern (t.ex. ProjectsClient).

- ProjectsClient - komponenten tar emot filtrerade värden från CategoryFilter och använder dem för att uppdatera den visade projektlistan.

- ProjectsList - komponenten kommer nu att enbart fokusera på att visa de filtrerade projekten.

## Seo-op.
1. Title Tag (<title>):

<title>{title}</title>

Varför det är bra:

    Titeln är en av de viktigaste SEO-faktorerna. Den dyker upp i webbläsartabben, i sökresultaten och när användare bokmärker sidan.
    En tydlig och beskrivande titel hjälper både användare och sökmotorer att förstå innehållet på sidan. I detta fall använder vi den dynamiskt baserat på homeData (t.ex. projektnamn eller titeln på hemsidan).

2. Meta Description (<meta name="description">):

<meta name="description" content={presentation} />

Varför det är bra:

    Meta beskrivningen hjälper sökmotorer att förstå sidan och ger en sammanfattning av innehållet.
    Det är också det som visas i sökresultaten under sidtiteln, vilket gör det viktigt att ha en beskrivande och lockande text för att få fler klick.
    Här använder vi presentation som beskrivning för att ge en sammanfattning av det aktuella projektet eller sidan.

3. Open Graph Tags (og:title, og:description, og:image, og:url):

<meta property="og:title" content={title} />
<meta property="og:description" content={presentation} />
<meta property="og:image" content={media} />
<meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />

Varför det är bra:

    Open Graph (OG) är viktigt för att optimera hur din sida ser ut när den delas på sociala medier (t.ex. Facebook, LinkedIn).
    Det gör att din sida får ett mer visuellt tilltalande och informativt resultat, vilket ökar chansen för användare att interagera med länken.
    Vi definierar og:title, og:description, och og:image för att säkerställa att sidan ser bra ut när den delas.

4. Canonical Link (<link rel="canonical">):

<link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />

Varför det är bra:

    Den kanoniska länken hjälper till att förhindra problem med duplicerat innehåll. Om samma innehåll kan nås via flera URL:er (t.ex. med eller utan www), säger den kanoniska länken till sökmotorer vilken URL som ska betraktas som den officiella versionen.
    Detta säkerställer att alla länkar till din sida räknas mot den primära URL:en och inte sprids ut på flera sidor.

5. Structured Data (JSON-LD) för Schema.org:

<script type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${title}",
      "description": "${presentation}",
      "image": "${media}",
      "url": "${process.env.NEXT_PUBLIC_BASE_URL}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${process.env.NEXT_PUBLIC_BASE_URL}"
      }
    }
  `}
</script>

Varför det är bra:

    Structured Data (eller schema markup) hjälper sökmotorer att bättre förstå och indexera innehållet på din webbplats.
    Denna kod implementerar WebPage-schema från Schema.org, vilket gör det lättare för sökmotorer som Google att presentera sidan på ett mer informativt sätt i sökresultaten (t.ex. med extra information eller "rich snippets").
    Genom att definiera webbplatsens titel, beskrivning, bild och URL gör du det enklare för sökmotorer att korrekt kategorisera och visa din sida.

Sammanfattning av SEO-optimeringar:

    Title Tag: En tydlig och relevant titel för att förbättra synligheten i sökresultaten.
    Meta Description: En beskrivning som lockar användare och förklarar innehållet på sidan.
    Open Graph: Optimerar hur sidan ser ut när den delas på sociala medier.
    Canonical Link: Förhindrar problem med duplicerat innehåll och specificerar den officiella URL:en.
    Structured Data (JSON-LD): Hjälper sökmotorer att förstå och korrekt indexera innehållet på sidan, vilket kan förbättra hur den visas i sökresultaten.

Dessa fem optimeringar hjälper din webbplats att både synas bättre i sökresultaten och se mer professionell och användarvänlig ut när den delas på sociala plattformar.
