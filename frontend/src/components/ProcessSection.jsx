import React from "react";

function ProcessSection({ processSteps, visaTitle }) {
  return (
    <div
      className={`process--section site_content-container process--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Application Process</h2>
      <ol>
        {processSteps.map((step, index) => (
          <li key={index}>
            <span>{step.title}:</span> {step.description}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ProcessSection;
