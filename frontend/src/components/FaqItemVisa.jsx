import { useEffect, useState, useRef } from "react";
import FaqDataVisa from "../data/faqDataVisa.json";

function FaqItemVisa() {
  const [openId, setOpenId] = useState(1);
  const answerRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Object.keys(answerRefs.current).forEach((id) => {
      const el = answerRefs.current[id];
      if (el) {
        // Set max-height dynamically for open/closed states
        el.style.maxHeight =
          openId === Number(id) ? `${el.scrollHeight}px` : "0";
        // Ensure transition is applied
        el.style.transition = "max-height 0.3s ease, padding 0.3s ease";
      }
    });
  }, [openId]);

  // Handle resize to update scrollHeight
  useEffect(() => {
    const handleResize = () => {
      Object.keys(answerRefs.current).forEach((id) => {
        const el = answerRefs.current[id];
        if (el && openId === Number(id)) {
          el.style.maxHeight = `${el.scrollHeight}px`;
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openId]);

  const handleToggle = (id, e) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
    ) {
      // console.log("Toggled FAQ ID:", id, "Event:", e.type);
      setOpenId((prevId) => (prevId === id ? null : id));
    }
  };

  if (!FaqDataVisa || !Array.isArray(FaqDataVisa) || FaqDataVisa.length === 0) {
    return <div>No FAQ data available</div>;
  }

  return (
    <div className="faq-section">
      {FaqDataVisa.map((faqdata) => (
        <div className="faq-item" key={faqdata.id}>
          <div
            className={`faq-question ${openId === faqdata.id ? "open" : ""}`}
            onClick={(e) => handleToggle(faqdata.id, e)}
            onKeyDown={(e) => handleToggle(faqdata.id, e)}
            role="button"
            aria-expanded={openId === faqdata.id}
            aria-controls={`faq-answer-${faqdata.id}`}
            tabIndex={0}
          >
            <h3>{faqdata.question}</h3>
            <span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.616 0.0116396V12.4196H4.904V0.0116396H7.616ZM12.2 4.95564V7.45164H0.296V4.95564H12.2Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div
            className="faq-answer"
            id={`faq-answer-${faqdata.id}`}
            ref={(el) => (answerRefs.current[faqdata.id] = el)}
          >
            <p>{faqdata.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FaqItemVisa;
