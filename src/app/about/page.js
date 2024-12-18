import Header from '../components/Header';
import { fetchPageHeader } from '../lib/graphql';

export default async function About() {
  // Hämta pageHeader data direkt i den server-renderade komponenten
  const pageHeader = await fetchPageHeader('about');

  return (
    <>
      <Header
        title={pageHeader.title}
        slogan={pageHeader.slogan}
        backgroundImage={pageHeader.backgroundImage.url}
        logo={pageHeader.logo.url}
      />
      <main>
        <h2>About Us</h2>
        <p>Welcome to the about page of our site.</p>
      </main>
    </>
  );
}
