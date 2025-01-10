"use client";

import { useEffect } from "react";
import styles from '../styles/ScrollToTopButton.module.css'; // Importera CSS-modulen för knappen

const ScrollToTopButton = () => {

  // Funktion för visa/dölja knappen baserat på scrollposition
  const handleScroll = () => {
    const button = document.getElementById('scrollToTopButton');
    if (window.scrollY > 100) {
      button.style.display = 'block';  // Visa knappen när man scrollat ner
    } else {
      button.style.display = 'none';  // Dölj knappen när man är nära toppen
    }
  };

  // Funktion för scrolla till toppen
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // scroll-händelselyssnare när komponenten laddas
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Rensa händelselyssnaren när komponenten tas bort
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      id="scrollToTopButton"
      className={styles.scrollButton}
      onClick={scrollToTop}
      style={{ display: 'none' }}  // Döljer knappen
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
