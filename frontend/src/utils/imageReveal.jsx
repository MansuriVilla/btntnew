import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useImageReveal = ({
  start = "top 50%",
  duration = 0.5,
  maxDelay = 0.3,
} = {}) => {
  useEffect(() => {
    gsap.set(".image_reveal-init", {
      clipPath: "inset(0 0 100% 0)",
      webkitClipPath: "inset(0 0 100% 0)",
    });

    ScrollTrigger.batch(".image_reveal-init", {
      start,
      once: true,
      onEnter: (batch) => {
        batch.forEach((element) => {
          gsap.to(element, {
            clipPath: "inset(0 0 0% 0)",
            webkitClipPath: "inset(0 0 0% 0)",
            duration,
            ease: "cubic-bezier(0.77, 0, 0.175, 1)",
            delay: Math.random() * maxDelay,
            onStart: () => element.classList.add("reveal-active"),
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && st.trigger.classList.contains("image_reveal-init")) {
          st.kill();
        }
      });
      gsap.killTweensOf(".image_reveal-init");
    };
  }, [start, duration, maxDelay]);
};
