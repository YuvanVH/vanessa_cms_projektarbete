import { fetchFooter } from "../lib/graphql";

export default async function Footer() {
  const footerData = await fetchFooter();

  if (!footerData) {
    return <footer>Loading...</footer>;
  }

  // Funktion för att extrahera text från blocken
  const extractTextFromContent = (content) => {
    return content.map((item, index) => {
      // Om det är en länk
      if (item.nodeType === "hyperlink") {
        return (
          <a
            key={index}
            href={item.data.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.content[0].value}
          </a>
        );
      }
      // Annars, om det är vanlig text
      if (item.nodeType === "text") {
        return item.value;
      }
      return null;
    });
  };

  return (
    <footer>
      <div>
        {footerData.logo && <img src={footerData.logo.url} alt="Logo" />}
      </div>
      <div>
        <p>{footerData.copyright}</p>
      </div>
      <div>
        {footerData.contactInfo &&
          footerData.contactInfo.json.content.map((block, index) => (
            <p key={index}>
              {extractTextFromContent(block.content)}
            </p>
          ))}
      </div>
    </footer>
  );
}
