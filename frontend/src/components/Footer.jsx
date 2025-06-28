import React from "react";

function Footer() {
  return (
    <footer className="site_footer">
      <div className="site_footerInner site_content-container">
        <div className="site_footer-top site_flex">
          <div className="site_footer__topLeft">
            <div className="site_footer-top-left-logo">
              <a href="/">
                <img
                  className="company__logo"
                  alt="Company Logo"
                  src="/assets/Fav-icon.webp"
                />
              </a>
              <p>
                Your next great adventure is just a click away. Start planning
                with our expert team today.
              </p>
            </div>
          </div>
          <div className="site_footer__topRight site_flex">
            <div className="site_footer-topRight__Column">
              <div className="site_footer-topRight-links">
                <h4>Quick Links</h4>
                <ul className="site_flex">
                  <li>
                    <a className="staggered-item" href="/">
                      <span> Home </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/visa">
                      <span> Visas </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/blogs">
                      <span> Blogs </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/">
                      <span> About Us </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/">
                      <span> Contact Us </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="site_footer-topRight__Column">
              <div className="site_footer-topRight-links">
                <h4>SUPPORT</h4>
                <ul className="site_flex">
                  <li>
                    <a className="staggered-item" href="/">
                      <span> Get In Touch </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/visa">
                      <span> Visa Inquiry </span>
                    </a>
                  </li>
                  <li>
                    <a className="staggered-item" href="/blogs">
                      <span> Package Inquiry </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="site_footer-topRight__Column">
              <div className="site_footer-topRight-links">
                <h4>Follow us</h4>
                <ul className="site_flex site_row">
                  <li>
                    <a
                      className="staggered-item"
                      href="https://x.com/brooklyntourism?s=11&t=KCICIf6KBw91jeSbAVapyQ"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-x-twitter"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="staggered-item"
                      href="https://www.facebook.com/brooklyntravelandtourism/"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-facebook"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="staggered-item"
                      href="https://www.instagram.com/brooklyntravelandtourism/"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-instagram"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      className="staggered-item"
                      href="https://www.youtube.com/@brooklyntravelandtourism"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="svg-inline--fa fa-youtube"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="site_footer-bottom">
          <div className="site_flex">
            <div className="site_footer-bottomLeft">
              <p>
                ©<span> 2025 </span>Brooklyn Travel and Tourism. All rights
                reserved.
              </p>
            </div>
            <div className="site_footer-bottomRight">
              <ul className="site_flex">
                <li>
                  <a className="staggered-item" href="/">
                    <span> Privacy Policy </span>
                  </a>
                </li>
                <span className="border"></span>
                <li>
                  <a className="staggered-item" href="/">
                    <span> Terms of Use </span>
                  </a>
                </li>
                <span className="border"></span>
                <li>
                  <a className="staggered-item" href="/">
                    <span> Legal </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
