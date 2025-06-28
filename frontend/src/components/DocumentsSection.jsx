import React from "react";

function DocumentsSection({ documents, visaTitle }) {
  return (
    <div
      className={`documents--section site_content-container documents--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Required Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentsSection;
