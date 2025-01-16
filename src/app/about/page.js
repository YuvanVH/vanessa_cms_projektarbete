// src/app/about/page.js
import { fetchPageHeader, fetchAboutPage } from '../lib/graphql';
import Header from '../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function AboutPage() {
  // Hämta sidhuvudet
  const PageHeader = await fetchPageHeader('About Me');
  const backgroundImage = PageHeader.backgroundImage
    ? PageHeader.backgroundImage.url
    : '/default-image.jpg';
  const logo = PageHeader.logo ? PageHeader.logo.url : '/default-logo.png';
  const slogan = PageHeader.slogan
    ? PageHeader.slogan.json.content
      .map((block) =>
        block.content.map((innerBlock) => innerBlock.value).join("")
      )
      .join("\n")
    : "Default slogan";

  // Hämta "About Me"-sidan
  const AboutData = await fetchAboutPage('28vMeOSP92wmCwDcCBAF1T');

  return (
    <div>
      <Header
        title={PageHeader.title}
        slogan={slogan}
        backgroundImage={backgroundImage}
        logo={logo}
      />

      {/* Rendera datan från Contentful */}
      <div>
        <h3>{AboutData?.title || 'About Me'}</h3>

        {/* About Me Presentation */}
        {AboutData?.aboutMePresentation?.json && (
          <div>
            {documentToReactComponents(AboutData.aboutMePresentation.json)}
          </div>
        )}

        {/* Bild */}
        <div>
          {AboutData?.image?.url && (
            <img style={{
              width: "50%",
              maxHeight: "300px",
              objectFit: "cover",
            }} src={AboutData.image.url} alt="About me" />
          )}
        </div>

        {/* Work Experience */}
        {AboutData?.workExperience?.json && (
          <div>
            {documentToReactComponents(AboutData.workExperience.json)}
          </div>
        )}

        {/* Education */}
        {AboutData?.education?.json && (
          <div>
            {documentToReactComponents(AboutData.education.json)}
          </div>
        )}

        {/* Fun Facts */}
        {AboutData?.funFacts?.json && (
          <div>
            {documentToReactComponents(AboutData.funFacts.json)}
          </div>
        )}
      </div>
    </div>
  );
}
