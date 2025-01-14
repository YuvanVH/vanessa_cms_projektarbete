//src/app/404/page.js
import { fetchErrorPage } from '../lib/graphql';
import Header from '../components/Header';

export default async function ErrorPage() {
  // Fetch data on the server
  const errorPage = await fetchErrorPage();

  if (!errorPage) {
    return (
      <div>
        <h1>404 - Page not found</h1>
        <p>We couldn't find the page you were looking for.</p>
      </div>
    );
  }

  const slogan = errorPage?.slogan
    ? errorPage.slogan.json.content.map((block) =>
      block.content.map((innerBlock) => innerBlock.value).join('')
    ).join('\n')
    : 'Page not found.';

  return (
    <div>
      <Header
        title={errorPage.title}
        slogan={slogan}
        backgroundImage={errorPage?.backgroundImage?.url || '/default-image.jpg'}
        logo={errorPage?.logo?.url || '/default-logo.png'}
      />
      <div>
        <p>{errorPage?.errorMessage?.json?.content?.[0]?.content?.[0]?.value || 'Sorry, we couldn’t find what you’re looking for.'}</p>
      </div>
    </div>
  );
}
