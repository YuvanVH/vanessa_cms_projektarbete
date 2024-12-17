// src/app/components/Header.js
'use client';
import { useEffect, useState } from 'react';
import { fetchMenuItems } from '../lib/fetchMenu'; // Anpassa sökvägen
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

const Header = ({ backgroundImage, logo }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems().then(setMenuItems);
  }, []);

  return (
    <header className={styles.hero} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.mainMenuHeaderContainer}>
            <Link href="/" className={styles.logoHeader}>
              {logo ? (
                <Image src={logo} alt="Logo" width={124} height={124} />
              ) : (
                <h1 className={styles.logoText}>Min Portfolio</h1>
              )}
            </Link>

            <nav className={styles.mainMenu}>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.sys.id}>
                    <Link href={item.fields.url}>{item.fields.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
