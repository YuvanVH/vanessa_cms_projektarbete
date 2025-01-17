import { fetchPageHeader, fetchHomeData } from './lib/graphql';
import Header from './components/Header';
import Head from 'next/head';

// Funktion för att extrahera text från Contentfuls rich text format
function extractRichText(json) {
  if (json && json.content) {
    return json.content
      .map(block => block.content?.map(subBlock => subBlock.value).join(' '))
      .join(' ');
  }
  return '';
}

export default async function Home() {
  // Hämta header-data och home-data
  const pageHeader = await fetchPageHeader('Welcome to My Portfolio');
  const homeData = await fetchHomeData();

  // Kontrollera att data hämtades korrekt
  const title = homeData?.title || 'Default Title';
  const slug = homeData?.slug || 'default-slug';
  const media = homeData?.media ? homeData.media.url : '/default-image.jpg';
  const presentation = extractRichText(homeData?.presentation?.json) || 'Default presentation text';

  const backgroundVideo = pageHeader.backgroundImage
    ? pageHeader.backgroundImage.url
    : null;
  const logo = pageHeader.logo ? pageHeader.logo.url : '/default-logo.png';
  const slogan = pageHeader.slogan
    ? pageHeader.slogan.json.content
      .map(block => block.content.map(innerBlock => innerBlock.value).join(''))
      .join('\n')
    : 'Default slogan';

  return (
    <div>
      {/* Head-komponenten för att hantera meta-taggar */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={presentation} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={presentation} />
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
            maxHeight: '85vh',
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
      {/* Lägg till homeData-innehåll */}
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>{title}</h1>
        <p
          style={{
            fontSize: '17px',
            lineHeight: '1.6',
            margin: '20px auto',
            maxWidth: '600px',
          }}
        >
          {presentation}
        </p>
        {media && <img src={media} alt={title} style={{ margin: '50px ', maxWidth: '70%' }} />}
      </main>
    </div>
  );
}
