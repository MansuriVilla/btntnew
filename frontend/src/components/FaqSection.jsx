import React from "react";

function FaqSection({ faqs, visaTitle }) {
  return (
    <div
      className={`faq--section site_content-container faq--section-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqSection;
