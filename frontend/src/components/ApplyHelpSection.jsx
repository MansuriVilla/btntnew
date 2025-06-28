import React from "react";

function ApplyHelpSection({ applyHelp, visaTitle }) {
  return (
    <div
      className={`apply-help site_content-container apply-help-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Apply or Get Help</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {applyHelp.map((item, index) => (
          <p key={index}>
            <b>{item.title}:</b>{" "}
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.text}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default ApplyHelpSection;
