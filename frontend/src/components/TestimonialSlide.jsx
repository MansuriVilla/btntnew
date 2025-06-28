import React from "react";
import testimonialData from "../data/testimonials.json";
import SliderComponent from "../utils/SliderComponent";

function TestimonialSlide() {
  return (
    <SliderComponent
      options={{
        loop: true,
        drag: true,
        showTracker: true,
        nav: true,
        autoplay: {
          delay: 5000,
        },
        responsive: {
          0: {
            items: 2,
          },
          769: {
            items: 5,
          },
          1000: {
            items: 1.1,
          },
        },
      }}
    >
      {testimonialData.map((testimonial, index) => (
        <div className="slide testimonial-slide" key={index}>
          <div className="testimonial-content">
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="author-info">
                <h4 className="author-name">{testimonial.authorName}</h4>
                <p className="author-role">{testimonial.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </SliderComponent>
  );
}

export default TestimonialSlide;
