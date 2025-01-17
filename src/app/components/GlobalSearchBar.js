// // src/app/components/GlobalSearchBar.js
// "use client";

// import { useState, useEffect } from "react";

// export default function Footer() {
//   const [footerData, setFooterData] = useState({
//     copyright: "Default ©",
//     searchEnabled: false,
//   });

//   useEffect(() => {
//     if (!footerData.serverFetched) {
//       fetchFooter().then((data) => {
//         setFooterData((prevData) => ({
//           ...prevData,
//           ...data,
//           serverFetched: true, // Indikerar att vi har hämtat data från servern
//         }));
//       });
//     }
//   }, [footerData]);

//   return (
//     <footer>
//       <div>{footerData.copyright}</div>
//       {footerData.searchEnabled && <SearchBar />}
//     </footer>
//   );
// }

// // Mock för fetchFooter
// async function fetchFooter() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ copyright: "© 2025 Your Company", searchEnabled: true });
//     }, 1000);
//   });
// }
