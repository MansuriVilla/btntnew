import React from "react";

function HeaderSection({ visa, videoRef, visaTitle }) {
  return (
    <div
      className={`visa_details--header visa_details--header-${visaTitle
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <div className="visa_title--holder site_flex site_content-container">
        <h1 className="visa_feature--title">
          Apply for Your {visa.title} Visa Today
        </h1>
        <div className="visa_details--content">
          <p>
            <b>Price:</b>{" "}
            <span>
              {visa.currency} {visa.price}
            </span>{" "}
            / per person
          </p>
          <p>{visa.description}</p>
          <a href={visa.link} className="site_gradient-btn">
            Apply Now
          </a>
        </div>
      </div>
      <div className="visa_feature--image__holder">
        <img
          className="visa_feature--image"
          ref={videoRef}
          src={visa.image}
          alt={`${visa.title} Image`}
        />
      </div>
    </div>
  );
}

export default HeaderSection;
