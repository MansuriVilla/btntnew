import React, { useEffect, useRef } from "react";
import CustomSlider from "./slider"; // Adjust path based on your structure

const SliderComponent = ({ options, children }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !sliderRef.current) {
      sliderRef.current = new CustomSlider(containerRef.current, options); // Ensure 'new' is used
    }
    return () => {
      if (sliderRef.current) {
        sliderRef.current.destroy();
        sliderRef.current = null;
      }
    };
  }, [options]);

  return (
    <div ref={containerRef} className="slider-container">
      <div className="slider-track">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            className: `slide ${child.props.className || ""}`,
          })
        )}
      </div>
      {options.nav && (
        <>
          <div className="nav-buttons">
            <button className="prev-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.98862 19.1867L3.3245 12.5226C3.25565 12.4538 3.20104 12.3722 3.16377 12.2823C3.12651 12.1924 3.10733 12.096 3.10733 11.9987C3.10733 11.9014 3.12651 11.8051 3.16377 11.7152C3.20104 11.6253 3.25565 11.5436 3.3245 11.4749L9.98862 4.81074C10.1276 4.6718 10.316 4.59375 10.5125 4.59375C10.709 4.59375 10.8974 4.6718 11.0364 4.81074C11.1753 4.94968 11.2534 5.13813 11.2534 5.33462C11.2534 5.53111 11.1753 5.71955 11.0364 5.85849L5.63565 11.2583L20.1384 11.2583C20.3348 11.2583 20.5232 11.3363 20.662 11.4752C20.8009 11.614 20.8789 11.8024 20.8789 11.9987C20.8789 12.1951 20.8009 12.3835 20.662 12.5223C20.5232 12.6612 20.3348 12.7392 20.1384 12.7392L5.63565 12.7392L11.0364 18.139C11.1753 18.2779 11.2534 18.4664 11.2534 18.6629C11.2534 18.8594 11.1753 19.0478 11.0364 19.1867C10.8974 19.3257 10.709 19.4037 10.5125 19.4037C10.316 19.4037 10.1276 19.3257 9.98862 19.1867Z"
                  fill="#29292B"
                ></path>
              </svg>
            </button>
            <button className="next-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0133 4.80545L20.6775 11.4696C20.7463 11.5383 20.8009 11.62 20.8382 11.7099C20.8754 11.7998 20.8946 11.8961 20.8946 11.9934C20.8946 12.0908 20.8754 12.1871 20.8382 12.277C20.8009 12.3669 20.7463 12.4486 20.6775 12.5173L14.0133 19.1814C13.8744 19.3204 13.686 19.3984 13.4895 19.3984C13.293 19.3984 13.1045 19.3204 12.9656 19.1814C12.8266 19.0425 12.7486 18.8541 12.7486 18.6576C12.7486 18.4611 12.8266 18.2726 12.9656 18.1337L18.3663 12.7339L3.8635 12.7339C3.66712 12.7339 3.47879 12.6559 3.33992 12.517C3.20106 12.3782 3.12305 12.1898 3.12305 11.9934C3.12305 11.7971 3.20106 11.6087 3.33992 11.4699C3.47879 11.331 3.66712 11.253 3.8635 11.253L18.3663 11.253L12.9656 5.8532C12.8266 5.71426 12.7486 5.52581 12.7486 5.32932C12.7486 5.13283 12.8266 4.94439 12.9656 4.80545C13.1045 4.66651 13.293 4.58845 13.4895 4.58845C13.686 4.58845 13.8744 4.66651 14.0133 4.80545Z"
                  fill="#29292B"
                ></path>
              </svg>
            </button>
          </div>
        </>
      )}
      {options.showTracker && (
        <div className="tracker-container">
          <div className="tracker-thumb"></div>
        </div>
      )}
    </div>
  );
};

export default SliderComponent;
