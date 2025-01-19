// src/app/components/Footer.js
import { fetchFooter } from "../lib/graphql";
import styles from "../styles/footer.module.css"; // Importera CSS-modulen

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
      // Annars, om vanlig text
      if (item.nodeType === "text") {
        return item.value;
      }
      return null;
    });
  };

  return (
    <footer className={styles.footer}>
      <div>
        {footerData.logo && <img src={footerData.logo.url} alt="Logotype in footer" />}
      </div>
      <hr></hr>
      <div className={styles.contactInfo}>
        {footerData.contactInfo &&
          footerData.contactInfo.json.content.map((block, index) => (
            <p key={index}>{extractTextFromContent(block.content)}</p>
          ))}
        <div>
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
