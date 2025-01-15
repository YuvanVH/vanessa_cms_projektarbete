# Komponentförklaringar:

- CategoriFilter - komponenten kommer att ha ansvaret för att hantera kategorifiltret och skicka uppdaterade filtervärden till föräldern (t.ex. ProjectsClient).

- ProjectsClient - komponenten tar emot filtrerade värden från CategoryFilter och använder dem för att uppdatera den visade projektlistan.

- ProjectsList - komponenten kommer nu att enbart fokusera på att visa de filtrerade projekten.
