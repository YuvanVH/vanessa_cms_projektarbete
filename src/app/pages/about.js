import { getHeaderData } from '../lib/fetchHeader';
import Header from '../components/Header';

export async function getStaticProps() {
  const headerData = await getHeaderData('About Me'); // Matcha pageName

  return {
    props: {
      headerData,
    },
    revalidate: 60, // Regenerera innehållet var 60:e sekund
  };
}

export default function About({ headerData }) {
  return (
    <>
      <Header
        title={headerData?.title}
        slogan={headerData?.slogan}
        backgroundImage={headerData?.image?.fields.file.url}
      />
      <div>
        <h1>About Me Page Content</h1>
        <p>Här är ditt innehåll...</p>
      </div>
    </>
  );
}
