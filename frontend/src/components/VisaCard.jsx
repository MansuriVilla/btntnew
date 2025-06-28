import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import visaData from "../data/visaData.json";

function VisaCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="site_grid grid_item--4">
      {isLoading
        ? visaData.map((_, index) => (
            <div className="skeleton-card" key={index}>
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))
        : visaData.map((card) => (
            <div className="grid_item" key={card.id}>
              <Link to={`/visa/${card.slug}`} className="site_flex visa_card">
                <div className="visa_card--img">
                  <img src={card.image} alt={`${card.title} Image`} />
                </div>
                <div className="visa_card--content site_flex">
                  <div className="card_content-left">
                    <h3>{card.title}</h3>
                    <div className="visa_price site_flex">
                      <span className="currency-icon">{card.currency}</span>
                      <span className="price">
                        {card.price}/<span>Person</span>
                      </span>
                    </div>
                  </div>
                  <div className="card_content-right">
                    <span className="site_icon--arrow">
                      <svg
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.49442 1.98189H9.01116L0 10.993L1.23791 12.231L10.2491 3.21979V10.7365H12V0.230957H1.49442V1.98189Z"
                          fill="white"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.49442 1.98189H9.01116L0 10.993L1.23791 12.231L10.2491 3.21979V10.7365H12V0.230957H1.49442V1.98189Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
}

export default VisaCard;
