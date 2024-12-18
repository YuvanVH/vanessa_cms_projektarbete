//src/app/page.js
import { fetchPageHeader } from './lib/graphql'; // Importera fetchPageHeader
import Header from './components/Header'; // Importera Header-komponenten

// Funktion för att extrahera text från Contentfuls rich text format
function extractSloganText(sloganJson) {
  if (sloganJson && sloganJson.content) {
    return sloganJson.content
      .map(item => item.content?.map(subItem => subItem.value).join(' '))
      .join(' ');
  }
  return ''; // Om ingen slogan finns, returnera en tom sträng
}

export default async function Home() {
  // Hämta header-data för startsidan (t.ex. från Contentful)
  const pageHeader = await fetchPageHeader('Welcome to My Portfolio'); // Här använder vi 'home' som pageSlug

  // Kontrollera att header-datan är korrekt
  const backgroundVideo = pageHeader.backgroundImage
    ? pageHeader.backgroundImage.url
    : null; // Om ingen video finns, använd null
  const logo = pageHeader.logo ? pageHeader.logo.url : '/default-logo.png'; // Använd en default logo om ingen finns

  const slogan = pageHeader.slogan
    ? pageHeader.slogan.json.content
      .map((block) =>
        block.content.map((innerBlock) => innerBlock.value).join("")
      )
      .join("\n")
    : "Default slogan";

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1, // Se till att videon är i bakgrunden
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <Header
        title={pageHeader.title} // Dynamisk titel
        slogan={slogan} // Dynamisk slogan
        backgroundImage={null} // Ingen bakgrundsbild eftersom vi använder video
        logo={logo} // Dynamisk logo
      />
      {/* Övrigt innehåll för startsidan */}
      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', marginTop: '20%' }}>
        <h2>Welcome to My Portfolio</h2>
        <p>{slogan || 'Building the future, one project at a time.'}</p>
      </div>
    </div>
  );
}
