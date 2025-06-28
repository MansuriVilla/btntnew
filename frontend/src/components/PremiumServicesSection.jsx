import React from "react";

function PremiumServicesSection({ premiumServices, visaTitle }) {
  return (
    <div
      className={`premium--section site_content-container premium--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Premium Services</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {premiumServices.map((service, index) => (
          <p key={index}>
            <b>{service.title}:</b> {service.description}{" "}
            <a href={service.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default PremiumServicesSection;
