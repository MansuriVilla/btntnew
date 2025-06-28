import { useEffect, useRef } from "react";
import VisaCard from "../components/VisaCard";
import ValueCard from "../components/ValueCard";
import OurProcess from "../components/OurProcess";
import Faq from "../components/Faq";
import Testimonial from "../components/Testimonial";

function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Throttle function to limit scroll event frequency
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
        // Parallax effect: move video at 20% of scroll speed using matrix3D
        const translateY = scrollPosition * 0.2;
        // matrix3D(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1)
        // Only translateY (y-axis) is modified; others remain identity
        videoRef.current.style.transform = `matrix3D(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${translateY}, 0, 1)`;
      }
    }, 24); // ~60fps (16ms)

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <section className="site_Hero--section">
        <div className="site_content-containers">
          <div className="Hero_inner">
            <div className="Hero_bg--image site_card-image__Ovrly">
              <div className="parallax-container">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  className="parallax-video"
                  preload="auto"
                  aria-hidden="true" // Decorative video
                  onClick={(e) => e.target.play()} // Fallback for autoplay
                >
                  <source src="/assets/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="Hero_content">
              <div className="Hero_content--inner">
                <h1 className="site_title-hero">
                  Get your travel visa for any country
                </h1>
                <div className="Hero_field--content">
                  <div className="site_flex Hero_input">
                    <div className="site-input_holder">
                      <input
                        className="site_input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Search For Visa.."
                      />
                      <label className="site_input--label">Search</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-top_values-section">
        <div className="our-top_values-inner site_flex site_content-container  section section_gap">
          <div className="our-top_values-top site_flex--column section_top site_flex">
            <div className="section_inner our-top-values-top-inner">
              <div className="our-top_values-top__left section_left">
                <h2 className="section_title">Our Top Values</h2>
              </div>
              <div className="our-top_values-top__right section_right">
                <p className="section_subtitle">
                  We deliver personalized experiences to meet your needs,
                  ensuring your complete satisfaction.
                </p>
              </div>
            </div>
          </div>
          <div className="our-top_values-bottom section_bottom">
            <ValueCard />
          </div>
        </div>
      </section>
      <section className="choose_tour-section">
        <div className="choose_tour-inner site_content-container site_flex site_flex--column section section_gap">
          <div className="choose_tour-top section_top site_flex">
            <div className="choose_tour-top__left section_left">
              <h2 className="section_title">Choose Your Tour</h2>
            </div>
            <div className="choose_tour-top__right section_right">
              <p className="section_subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                efficitur, nunc et bibendum facilisis, nisi nunc aliquet nunc,
                eget aliquam nunc nisl eget nunc.
              </p>
            </div>
          </div>
          <div className="choose_tour-bottom section_bottom">
            <VisaCard />
          </div>
        </div>
      </section>
      <OurProcess />
      <Testimonial />
      <Faq />
    </>
  );
}
export default Home;
