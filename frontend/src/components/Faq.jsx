import React from "react";
import FaqItem from "./FaqItem";

function Faq() {
  return (
    <div className="faq_section">
      <div className="faq_section-inner site_content-container site_flex site_flex--column section section_gap">
        <div className="faq_section-top section_top site_flex">
          <div className="faq_section-top__left section_left">
            <h2 className="section_title">FAQ’s</h2>
          </div>
          <div className="faq_section-top__right section_right">
            <p className="section_subtitle">
              Their feedback shapes our journey — join the conversation!
            </p>
          </div>
        </div>
        <div className="faq_section-bottom section-bottom">
          <FaqItem />
        </div>
      </div>
    </div>
  );
}

export default Faq;
