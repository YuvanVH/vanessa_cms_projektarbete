// src/app/components/SearchBar.js
"use client";

export default function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search projects..."
      style={{
        margin: "20px",
        padding: "10px",
        fontSize: "16px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
      onInput={(event) => {
        // Uppdatera sökparametern i URL:en (utan att behöva `useState`)
        const url = new URL(window.location.href);
        url.searchParams.set("search", event.target.value);
        window.location.href = url.toString(); // Ladda om sidan med ny sökparameter
      }}
    />
  );
}
