import React from "react";
import TestimonialSlide from "./TestimonialSlide.jsx";

function Testimonial() {
  return (
    <>
      <section className="testimonial_area">
        <div className="section site_flex site_content-container site_flex--column section_gap">
          <div className="testimonial_top section_top site_flex">
            <div className="section_left testimonial_top-left">
              <h2 className="section_title">
                Travelers Speak, <br /> We Listen
              </h2>
            </div>
            <div className="testimonial_top-right section_right">
              <p className="section_subtitle">
                Their feedback shapes our journey — join the conversation!
              </p>
            </div>
          </div>
          <div className="testimonial_bottom section_bottom">
            <TestimonialSlide />
          </div>
        </div>
      </section>
    </>
  );
}
export default Testimonial;
