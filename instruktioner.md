# Projektarbete CMS-utveckling, FEU23
Inlämning senast 16 januari 2024 (kl. 23.59)
Redovisning 17 januari 2023 (kl. 9-16)

## Övergripande uppgift
Uppgiften går ut på att skapa en egen portfoliowebbplats som hämtar sin data från ett
Headless CMS. Webbplatsen ska renderas SSR/SSG-teknik.
Andra tekniska lösningar är möjliga vid önskemål, stäm av med utbildaren vid intresse.
Innehållet i Headless-CMS-lösningen ska vara möjligt att administrera från ett eller flera administrationsgränssnitt.


### För godkänt betyg (G)

- Dela github-repo: "namn_cms_projektarbete" med ian.hellgren@iths.se
    - Kontinuerligt pushande och tydliga commit-meddelanden är en god möjlighet att visa vad ni kan.
    - Det erbjuder också en fungerande kod att återvända till ifall något börjar krångla.

- Portfoliowebplatsen ska bestå av minst dessa sidor, med innehåll hämtat ifrån headless-CMS:
        - Startsida
            - rubrik
            - presentationstext
            - bild
        - Projekt-index
            - varje projekt har:
                - titel
                - kort beskrivning
                - bild
                - länk till publicerat projekt( eller href="#")
        - Sida för enskilt projekt
            - titel
            - beskrivning
            - minst 3 bilder
            - länk till publicerat projekt
        - Om-mig-sida
            - Presentationstext
            - Information om utbildningar
                - minst 3
            - Information om arbetslivserfarenheter
                - minst 3
        - Kontakt-sida
            - bild
            - kontaktuppgifter (ex, mail, github, sociala medier)
        - 404-sida
            - Lämpligt felmeddelande och länk till startsidan

- En huvudmeny i någon form ska implementeras med länkar till webbplatsens olika sidor.

- Det ska vara möjligt för användaren att filtrera projekt efter kategori. Valfritt om dessa ska listas på egen undersida eller i den befintliga projektöversikten. Kategoriseringen ska vara dynamisk och ändras med innehållet.

- Headless-CMS-lösningen ska innehålla minst 5 olika innehållstyper (Content Types) med minst 3 fält i varje Content Type. Minst 1 Content Type ska generera en egen sida på webbplatsen för varje Content som skapas av innehållstypen. Minst 1 Content Type ska användas för att kategorisera Content/inlägg.

- Bilder på webbplatsen ska ha rimligt optimerade bildstorlekar och lämpliga filformat.

- Headless CMS-lösningen ska finnas på webben i någon form och vara åtkomlig via inloggning för uppdatering av innehåll.

- Den färdiga webbplatsen ska publiceras på publik webbserver. Webbservern där webbplatsen publiceras ska vara konfigurerad så att uppdateraringar av innehållet i Headless CMS medför automatisk uppdatering av webbplatsens innehåll.

#### Övriga krav på webbplatsen
- En genomgående grafisk design ska vara implementerad över hela webbplatsen

- Webbplatsen ska vara responsiv (även mobilanpassad) och fungera på olika enheter/skärmstorlekar samt i de vanliga webbläsarna (små avvikelser är okej men de ska fungera).

- Webbplatsen ska vara tillgänglig avseende de viktigaste delarna (Ej alla WCAG-krav). Särskilt viktigt med kontraster, klickytor, typografi, semantisk HTML. Minst 5 aktiva val/åtgärder för bättre tillgänglighet ska genomföras.

- Källkoden ska vara välstrukturerad och kommenterad där så är tillämpligt för ökad läsbarhet. Särskilt fokus på kommentarer för källkod som hanterar logik.

- En strategi för sökmotoroptimering ska implementeras. Minst 5 aktiva åtgärder för sökmotoroptimering ska genomföras.

- Fyll på med genomförda projekt och information om er själva. Minst 5 olika portfolioprojekt ska presenteras. Om ni av någon anledning inte vill ange riktig information på webbplatsen så går det bra att använda fiktiv data. (Dock ej “lorem-ipsum”).




### För väl godkänt betyg (VG)
Uppfyllda krav för godkänt betyg, samt:
1. En sökfunktionimplementeras där användaren av portfoliowebbplatsen kan söka genom delar av webbplatsens innehåll. Sökfunktionen ska vara åtkomlig från valfri lämplig plats på webbplatsen samt på 404-sidan.

2. Huvudmenyn ska renderas dynamiskt.

3. Webbplatsen ska läsa ut bilder från Headless CMS i moderna filformat såsom WebP och AVIF, oavsett vilket formatsom laddats upp på ditt headless CMS. Webbplatsen ska också kunna rendera mer kompatibla filformat såsom JPEG beroende på webbläsarens förmåga.

4. Git-historiken vittnar om säkerhet i utvecklingen.



## Muntlig redovisning - film
Förbered och spela in en redovisning på MAX 4 minuter, där du själv presenterar:
1. En översikt av din lösning, hur webbplatsen ser ut och vilka delar som finns.
2. Presentera vilka tekniker du valt för arbetet och hur du använder ett Headless CMS för innehållet.
3. Beskriv hur din SSG/SSR-teknik fungerar. Hur renderas innehållet på serversidan med din valda teknik? Hur fungerar det vid publicering?
4. Beskriv vilka åtgärder du genomfört för bättre tillgänglighet?
5. Vilka bildformat och anpassningar har du använt för att optimera bilder och grafik?
6. Vilka åtgärder har du genomfört för att sökmotoroptimera webbplatsen?
7. Om du skulle utvecklat vidare eller gjort om uppgiften, vad hade du gjort då?
8. Presentera minst två andra alternativa tekniklösningar du kunnat använda för uppgiften
9. Vad upplever du som skillnad mot att arbeta med ett traditionellt CMS (WordPress)? Vilka är för-och nackdelarna?
Filmerna tittar vi på tillsammans under lektionen fredagen den 17 januari.

Tips för att hålla filmen under 4 minuter:
    - Förbered svar på frågorna före inspelning
    - Använd gratisprogramvara så som iMovie (mac) eller Video Editor (windows) för att redigera ditt inspelade material. Split och trim är dina bästa vänner.
    - Var beredd på att svara på frågor ifrån lärare och kurskamrater.

## Inlämning

Följande delar lämnas in i en "namn.zip"-fil inlämningslådan på ITHS-distans:
- Presentationsfilmen
- Länk till publicerad webbplats
- Källkoden för ditt projekt (ej node-modules!)



## Betygssättning
Möjliga betyg på uppgiften är IG/G/VG. Lägst godkänt betyg är en förutsättning för
godkänt slutbetyg i kursen.

### Omfattade kursmål
- Kunskaper
• G2. Headless CMS
• G5. Rendering av applikationer på serversidan(tillexempel SSR och SSG)
- Färdigheter
• G7. Integrera en webblösning mot Headless CMS (till exempel med NextJS, NodeJS, direkt i klienten eller PHP)
- Kompetenser
• G15. Självständigt administreraen webbplats med headless CMS
• G16. Självständigt jämföra CMS-lösningar och föreslå CMS eller vidareutveckling
av befintligtCMS
- Väl godkänt (VG)
• VG1. Självständigt och med säkerhet skapa eller vidareutveckla en webbplats i
CMS
• VG2. Självständigt och med säkerhet paketera och publicera en webblösning med
hjälp av CMS
