// src/app/contact/page.js
import { fetchPageHeader, fetchContactData } from '../lib/graphql';
import Header from '../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

      <h2>{ContactData.title || "Contact Me"}</h2>
      <p><strong>Phone:</strong> {ContactData.phoneNumber || "Not provided"}</p>
      <p><strong>Email:</strong> <a href={`mailto:${ContactData.email}`}>{ContactData.email || "Not provided"}</a></p>
      <p><strong>LinkedIn:</strong></p>
      <div>
        {ContactData.linkedinProfile?.json
          ? documentToReactComponents(ContactData.linkedinProfile.json)
          : "Not provided"}
      </div>
      <p>
        <strong>Location:</strong>{" "}
        {ContactData.location
          ? `${ContactData.location.lat}, ${ContactData.location.lon}`
          : "Not provided"}
      </p>
    </div>
  );
}
