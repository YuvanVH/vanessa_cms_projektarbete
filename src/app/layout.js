// app/pages/layout.js
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Min Portfolio',
  description: 'En portfolio skapad med Next.js och Contentful.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
