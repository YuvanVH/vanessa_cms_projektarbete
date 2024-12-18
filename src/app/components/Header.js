import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

export default function Header({ title, slogan, backgroundImage, logo }) {
  return (
    <header
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.container}>
          {/* Logo och meny */}
          <div className={styles.mainMenuHeaderContainer}>
            <Link href="/" className={styles.logoHeader}>
              {logo ? (
                <Image
                  src={logo}
                  alt="Logo image"
                  width={124}
                  height={124}
                  priority
                />
              ) : (
                <span className={styles.logoText}>My Portfolio</span>
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
            <h1>{title || 'Welcome'}</h1>
            {slogan && <p className={styles.slogan}>{slogan}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}
