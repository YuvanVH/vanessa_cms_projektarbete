import { fetchErrorPage } from './lib/graphql';
import Header from './components/Header';

export default async function ErrorPage() {
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

  const renderErrorMessage = (content) => {
    return content.map((block, index) => {
      switch (block.nodeType) {
        case 'heading-2':
          return (
            <h2 key={index}>
              {block.content.map((innerBlock, i) => innerBlock.value).join('')}
            </h2>
          );
        case 'paragraph':
          return (
            <p key={index}>
              {block.content.map((innerBlock, i) => {
                if (innerBlock.nodeType === 'text') {
                  return innerBlock.value;
                } else if (innerBlock.nodeType === 'hyperlink') {
                  return (
                    <a href={innerBlock.data.uri} key={i}>
                      {innerBlock.content.map((linkText) => linkText.value).join('')}
                    </a>
                  );
                }
                return ''; // Default case att hantera okända nodeType
              })}
            </p>
          );
        default:
          return null; // ignorerar unsupported node types
      }
    });
  };

  return (
    <div>
      <Header
        title={errorPage.title}
        slogan={slogan}
        backgroundImage={errorPage?.backgroundImage?.url || '/default-image.jpg'}
        logo={errorPage?.logo?.url || '/default-logo.png'}
      />

      <div>
        {/* Renderar error message content */}
        {renderErrorMessage(errorPage?.errorMessage?.json?.content) || 'Error message not available'}

        {/* Error Image */}
        {errorPage.errorImage?.url && (
          <img
            src={errorPage.errorImage.url}
            alt="Error Image"
            style={{ maxWidth: '100%', marginTop: '20px' }}
          />
        )}

        {/* CTA Button */}
        {errorPage.cta && (
          <a
            href={errorPage.cta}
            style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'black',
              border:
                '2px solid white',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Go Back Home
          </a>
        )}
      </div>
    </div>
  );
}
