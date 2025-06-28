// External libraries
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Third-party
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Local components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import VisaDetails from "./pages/VisaDetails.jsx";
import VisaEditor from "./admin/VisaEditor.jsx";
import Contact from "./pages/Contact.jsx";

// Utilities
import { SplittingText } from "./utils/SplittingText.jsx";
import { HoverTextAnimation } from "./utils/HoverTextAnimation.jsx";

// Styles
import "./App.css";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
  return (
    <Router>
      <HoverTextAnimation />
      {/* <SplittingText /> */}
      <div className="site_main">
        <Header />
        <main
          id="site_main"
          className="site_flex site_flex--column section_gap"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/visa/:slug" element={<VisaDetails />} />
            <Route path="/admin/visaeditor" element={<VisaEditor />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
