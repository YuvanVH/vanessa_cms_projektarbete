// src/app/contact/page.js
import { fetchPageHeader, fetchContactData } from '../lib/graphql';
import Header from '../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/contact.module.css';

export default async function ContactPage() {
  const PageHeader = await fetchPageHeader('Contact');
  const ContactData = await fetchContactData();

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
          <h2 className={styles.title}>{ContactData.title || "Contact Me"}</h2>
          <p className={styles.slogan}>{slogan}</p>
        </div>

        <div className={styles.contactInfo}>
          <p><strong>Phone:</strong> {ContactData.phoneNumber || "Not provided"}</p>
          <p>
            <strong>Email:</strong>
            <a href={`mailto:${ContactData.email}`}>
              {ContactData.email || "Not provided"}
            </a>
          </p>
        </div>

        <div className={styles.linkedinSection}>
          <div>
            <p><strong>LinkedIn:</strong></p>
            {ContactData.linkedinProfile?.json
              ? documentToReactComponents(ContactData.linkedinProfile.json)
              : "Not provided"}
          </div>
        </div>

        <div className={styles.location}>
          <p><strong>Location:</strong>
            {ContactData.location
              ? `${ContactData.location.lat}, ${ContactData.location.lon}`
              : "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
