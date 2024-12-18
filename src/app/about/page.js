// src/app/about/page.js
import { fetchPageHeader } from '../lib/graphql';
import Header from '../components/Header';

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

  return (
    <div>
      <Header
        title={PageHeader.title}
        slogan={slogan}
        backgroundImage={backgroundImage}
        logo={logo}
      />
      <h2>About Me</h2>
      <p>Här är information om mig...</p>
    </div>
  );
}
