import React from "react";

function VisaTypeSection({ visaTypes, visaTitle }) {
  return (
    <div
      className={`visa_type--section site_content-container visa_type--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Visa Type</h2>
      <div className="visa-type-container">
        {visaTypes.map((type, index) => (
          <div key={index} className="visa-type-card">
            <h3>{type.name}</h3>
            <p>{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisaTypeSection;
