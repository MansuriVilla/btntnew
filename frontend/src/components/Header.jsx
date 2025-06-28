import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navItemsRef = useRef([]);
  const hasMounted = useRef(false);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) setIsMenuOpen(false);
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollTop = 50;
    let isHeaderFixed = false;

    const handleScroll = () => {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      let viewportHeight = window.innerHeight;
      let scrollThreshold = viewportHeight * 0.5;

      if (currentScroll > lastScrollTop) {
        if (
          currentScroll > scrollThreshold &&
          !header.classList.contains("header--hidden")
        ) {
          header.classList.add("header--hidden");
        }
      } else {
        if (header.classList.contains("header--hidden")) {
          header.classList.remove("header--hidden");
        }
      }

      if (currentScroll > header.offsetHeight && !isHeaderFixed) {
        header.classList.add("header--fixed");
        isHeaderFixed = true;
      } else if (currentScroll <= header.offsetHeight && isHeaderFixed) {
        header.classList.remove("header--fixed");
        isHeaderFixed = false;
      }

      if (currentScroll < 50) header.classList.remove("header--hidden");

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const nav = menuRef.current;
    const navItems = navItemsRef.current.filter(Boolean);

    if (!hasMounted.current) {
      if (nav) {
        if (isMobile && !isMenuOpen) {
          gsap.set(nav, { y: "100%", visibility: "hidden" });
          console.log("Initial menu state: hidden (mobile)");
        } else {
          gsap.set([nav, ...navItems], {
            y: "0%",
            opacity: 1,
            visibility: "visible",
          });
          console.log("Initial menu state: visible (desktop)");
        }
      }
      hasMounted.current = true;
    } else {
      if (isMobile) {
        if (isMenuOpen) {
          console.log("Playing open animation");
          gsap.set(nav, { y: "100%", visibility: "visible" });
          gsap.to(nav, { y: "0%", duration: 0.5, ease: "power2.out" });
          gsap.fromTo(
            navItems,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        } else {
          console.log("Playing close animation");
          const tl = gsap.timeline();
          tl.to(navItems, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          }).to(nav, {
            y: "-100%",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () =>
              gsap.set(nav, { y: "100%", visibility: "hidden" }),
          });
        }
      } else {
        console.log("Resetting for desktop");
        gsap.set([nav, ...navItems], {
          y: "0%",
          opacity: 1,
          visibility: "visible",
        });
      }
    }
  }, [isMenuOpen, isMobile]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="site_header" ref={headerRef}>
      <div className="header_inner--content site_content-container">
        <div className="site_header-left">
          <div className="header_logo">
            <Link to="/">
              <img src="/assets/Fav-icon.webp" alt="Company Logo" />
            </Link>
          </div>
        </div>
        {isMobile && (
          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            ref={toggleRef}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
          </button>
        )}
        <nav
          className={`header_navigations_links site_flex site_header-content nav_right ${
            isMobile ? "mobile-overlay-styles" : ""
          } ${isMenuOpen ? "nav_active" : ""}`}
          ref={menuRef}
        >
          <div className="site_header-center">
            <ul className="site_header-links site_flex">
              {["Home", "Visa", "Hotel", "Cruise"].map((text, index) => (
                <li className="site_header-link" key={text}>
                  <Link
                    to={`/${text.toLowerCase()}`}
                    className="nav_link"
                    onClick={toggleMenu}
                    ref={(el) => (navItemsRef.current[index] = el)}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="site_header-right"
            ref={(el) => (navItemsRef.current[4] = el)}
          >
            <Link
              to="/contact"
              className="site_gradient-btn site_flex"
              onClick={toggleMenu}
            >
              CONTACT US
              <span>
                <svg
                  width="12"
                  height="13"
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
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
