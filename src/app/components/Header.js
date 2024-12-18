// src/app/components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

export default function Header({ title, slogan, backgroundImage, logo }) {
  return (
    <header
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamiskt sätta bakgrundsbild
    >
      <div className={styles.overlay}> {/* För att lägga en overlay över bakgrunden om det behövs */}
        <div className={styles.container}> {/* Container för all layout */}
          {/* Logo och meny */}
          <div className={styles.mainMenuHeaderContainer}>
            <Link href="/" className={styles.logoHeader}>
              {logo ? (
                // Om logo finns, visa den. Annars visa texten "My Portfolio"
                <Image
                  src={logo} // Logo som kommer från Contentful
                  alt="Logo image"
                  width={124}  // Bildens storlek
                  height={124} // Bildens storlek
                  priority // Prioritera denna bild för snabbare laddning
                />
              ) : (
                <span className={styles.logoText}>My Portfolio</span> // Om ingen logo är tillgänglig, visa texten istället
              )}
            </Link>

            {/* Menyn */}
            <nav className={styles.mainMenu}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Titel och slogan */}
          <div className={styles.heroContent}>
            <h1>{title || 'Welcome'}</h1> {/* Dynamisk titel, om ingen titel finns använd 'Welcome' */}
            {slogan && <p className={styles.slogan}>{slogan}</p>} {/* Slogan visas om den finns */}
          </div>
        </div>
      </div>
    </header>
  );
}
