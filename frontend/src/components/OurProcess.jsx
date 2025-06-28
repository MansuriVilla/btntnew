import React, { useLayoutEffect, useRef } from "react";
import processData from "../data/processData.json";
import { useImageReveal } from "../utils/imageReveal.jsx";

function OurProcess() {
  // useImageReveal({ start: "top 50%" });
  useImageReveal();
  return (
    <section className="process_section">
      <div className="process_inner site_content-container site_flex site_flex--column section section_gap">
        <div className="process_top section_top site_flex">
          <div className="process-top__left section_left">
            <h2 className="section_title">Our application process</h2>
          </div>
          <div className="process-top__right section_right">
            <p className="section_subtitle">
              We’ve designed our process to be simple and transparent, ensuring
              a seamless experience with clear guidance.
            </p>
          </div>
        </div>
        <div className="process_bottom section_bottom site_flex">
          <div className="process_bottom-left section_bottom-left">
            <div className="process_items site_flex site_flex--column section_gap">
              {processData.map((process) => (
                <div className="process_item site_flex" key={process.id}>
                  <div className="process_item-left">
                    <span>{process.num}</span>
                  </div>
                  <div className="process_item-right site_flex site_flex--column">
                    <h3>{process.title}</h3>
                    <p>{process.details}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="process_cta">
              <a href="#" className="site_gradient-btn-stroke site_flex">
                <span>Explore More</span>
                <span>
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.49442 2.44722H9.01116L0 11.4584L1.23791 12.6963L10.2491 3.68513V11.2019H12V0.696289H1.49442V2.44722Z"
                      fill="url(#paint0_linear_1344_2293)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1344_2293"
                        x1="0"
                        y1="6.69629"
                        x2="12"
                        y2="6.69629"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00FF8F" />
                        <stop offset="1" stopColor="#00A1FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="process_bottom-right section_bottom-right">
            <img
              className="image_reveal-init"
              src="/assets/process-image.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcess;
