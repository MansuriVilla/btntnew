import React, { useEffect } from "react";
import gsap from "gsap";

export function HoverTextAnimation() {
  useEffect(() => {
    function hoverText() {
      document.querySelectorAll(".staggered-item").forEach((item) => {
        // Skip if the item has already been processed
        if (item.hasAttribute("data-processed")) return;

        const mainSpan = item.querySelector("span");
        // Skip if no span is found (e.g., for social media icons)
        if (!mainSpan) return;

        const originalText = mainSpan.innerText;
        mainSpan.innerHTML = "";

        const defaultLayer = document.createElement("div");
        defaultLayer.classList.add("default-text");

        const hoverLayer = document.createElement("div");
        hoverLayer.classList.add("hover-text");

        originalText.split("").forEach((char) => {
          const defaultChar = document.createElement("span");
          defaultChar.classList.add("letter");
          defaultChar.textContent = char === " " ? "\u00A0" : char;
          defaultLayer.appendChild(defaultChar);

          const hoverChar = document.createElement("span");
          hoverChar.classList.add("letter");
          hoverChar.textContent = char === " " ? "\u00A0" : char;
          hoverLayer.appendChild(hoverChar);
        });

        mainSpan.appendChild(defaultLayer);
        mainSpan.appendChild(hoverLayer);

        const defaultLetters = defaultLayer.querySelectorAll(".letter");
        const hoverLetters = hoverLayer.querySelectorAll(".letter");

        const tl = gsap.timeline({ paused: true });

        defaultLetters.forEach((letter, i) => {
          tl.to(
            letter,
            { y: "-100%", duration: 0.5, ease: "expo.inOut" },
            i * 0.01
          );

          tl.to(
            hoverLetters[i],
            { y: "0%", duration: 0.5, ease: "expo.inOut" },
            i * 0.01
          );
        });

        item.addEventListener("mouseenter", () => tl.play());
        item.addEventListener("mouseleave", () => tl.reverse());

        // Mark the item as processed
        item.setAttribute("data-processed", "true");
      });
    }
    hoverText();
  }, []);

  return null;
}
