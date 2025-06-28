import React from "react";

function FeesSection({
  currency,
  price,
  processingTime,
  additionalFees,
  visaTitle,
}) {
  return (
    <div
      className={`fees--section site_content-container fees--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Visa Fees & Processing Time</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p style={{ fontSize: "1.125rem" }}>
          <b>Fee:</b> {currency} {price} / per person
        </p>
        <p style={{ fontSize: "1.125rem" }}>
          <b>Processing Time:</b> {processingTime}
        </p>
        {additionalFees && additionalFees.length > 0 && (
          <div>
            <p style={{ fontWeight: "600" }}>Additional Fees:</p>
            <ul>
              {additionalFees.map((fee, index) => (
                <li key={index}>
                  {fee.name}: {currency} {fee.amount}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeesSection;
