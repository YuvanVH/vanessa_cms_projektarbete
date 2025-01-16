//src/app/page.js
import { fetchPageHeader } from './lib/graphql';
import Header from './components/Header';
import Head from 'next/head';

// Funktion för att extrahera text från Contentfuls rich text format
function extractSloganText(sloganJson) {
  if (sloganJson && sloganJson.content) {
    return sloganJson.content
      .map(item => item.content?.map(subItem => subItem.value).join(' '))
      .join(' ');
  }
  return ''; // Om ingen slogan finns, returnera tom sträng
}

export default async function Home() {
  // Hämta header-data för startsidan (t.ex. från Contentful)
  const pageHeader = await fetchPageHeader('Welcome to My Portfolio');

  // Kontrollera att header-datan är korrekt
  const backgroundVideo = pageHeader.backgroundImage
    ? pageHeader.backgroundImage.url
    : null;
  const logo = pageHeader.logo ? pageHeader.logo.url : '/default-logo.png';

  const slogan = pageHeader.slogan
    ? pageHeader.slogan.json.content
      .map((block) =>
        block.content.map((innerBlock) => innerBlock.value).join("")
      )
      .join("\n")
    : "Default slogan";

  const title = pageHeader.title || "Default Title";
  const description = extractSloganText(pageHeader.slogan?.json) || "Default description";

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Head-komponenten för att hantera meta-taggar */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

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
            height: '85vh',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <Header
        title={pageHeader.title}
        slogan={slogan}
        backgroundImage={null}
        logo={logo}
      />
    </div>
  );
}
