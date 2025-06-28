import React from "react";
import { useEffect } from "react";
import ValueData from "../data/valueData.json";
import gsap from "gsap";

function ValueCard() {
  useEffect(() => {
    document.querySelectorAll(".right-box").forEach(function (e) {
      gsap.to(e, {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
          trigger: e,
          start: "0% 78%",
          end: "100% 78%",
          scrub: true,
          markers: false,
        },
      });
    });
  }, []);

  return (
    <div className="site_flex site_flex--column section_gap ">
      {ValueData.map((card) => (
        <div className="flex_item right-box" key={card.id}>
          <div className="value_card site_flex site_flex--column">
            <div className="value_card--img">
              <img src={card.image} alt={`${card.title} Image`} />
            </div>
            <div className="value_card--content site_flex site_flex--column">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ValueCard;
