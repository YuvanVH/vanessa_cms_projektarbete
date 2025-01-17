// src/app/about/page.js
import { fetchPageHeader, fetchAboutPage } from '../lib/graphql';
import Header from '../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/about.module.css';

export default async function AboutPage() {
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

  const AboutData = await fetchAboutPage('28vMeOSP92wmCwDcCBAF1T');

  return (
    <div>
      <Header
        title={PageHeader.title}
        slogan={slogan}
        backgroundImage={backgroundImage}
        logo={logo}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{AboutData?.title || 'About Me'}</h3>
        </div>

        {/* About Me Presentation */}
        {AboutData?.aboutMePresentation?.json && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>About Me</div>
            <div className={styles.richText}>
              {documentToReactComponents(AboutData.aboutMePresentation.json)}
            </div>
          </div>
        )}

        {/* Bild */}
        {AboutData?.image?.url && (
          <img
            className={styles.image}
            src={AboutData.image.url}
            alt="About me"
          />
        )}

        {/* Education */}
        {AboutData?.education?.json && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Education</div>
            <div className={styles.richText}>
              {documentToReactComponents(AboutData.education.json)}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {AboutData?.workExperience?.json && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Work Experience</div>
            <div className={styles.richText}>
              {documentToReactComponents(AboutData.workExperience.json)}
            </div>
          </div>
        )}

        {/* Fun Facts */}
        {AboutData?.funFacts?.json && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Fun Facts</div>
            <div className={styles.richText}>
              {documentToReactComponents(AboutData.funFacts.json)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
