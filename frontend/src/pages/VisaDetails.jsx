import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import visaData from "../data/visaData.json";
import HeaderSection from "../components/HeaderSection.jsx";
import VisaTypeSection from "../components/VisaTypeSection.jsx";
import DocumentsSection from "../components/DocumentsSection.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import FeesSection from "../components/FeesSection.jsx";
import FaqSection from "../components/FaqSection.jsx";
import ApplyHelpSection from "../components/ApplyHelpSection.jsx";
import PremiumServicesSection from "../components/PremiumServicesSection.jsx";

function VisaDetails() {
  const { slug } = useParams();
  const visa = visaData.find((item) => item.slug === slug);
  const videoRef = useRef(null);

  useEffect(() => {
    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      if (videoRef.current) {
        const scrollPosition = window.scrollY;
        const translateY = scrollPosition * 0.2;
        videoRef.current.style.transform = `matrix3D(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${translateY}, 0, 1)`;
      }
    }, 24);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visa) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          width: "100%",
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#4B5563",
        }}
      >
        <span>Visa not found</span>
      </div>
    );
  }

  return (
    <div className="site_flex site_flex--column section_gap">
      <HeaderSection visa={visa} videoRef={videoRef} visaTitle={visa.title} />
      <VisaTypeSection visaTypes={visa.visaTypes} visaTitle={visa.title} />
      <DocumentsSection documents={visa.documents} visaTitle={visa.title} />
      <ProcessSection processSteps={visa.processSteps} visaTitle={visa.title} />
      <FeesSection
        currency={visa.currency}
        price={visa.price}
        processingTime={visa.processingTime}
        additionalFees={visa.additionalFees}
        visaTitle={visa.title}
      />
      <FaqSection faqs={visa.faqs} visaTitle={visa.title} />
      <ApplyHelpSection applyHelp={visa.applyHelp} visaTitle={visa.title} />
      {visa.premiumServices && visa.premiumServices.length > 0 && (
        <PremiumServicesSection
          premiumServices={visa.premiumServices}
          visaTitle={visa.title}
        />
      )}
    </div>
  );
}

export default VisaDetails;
