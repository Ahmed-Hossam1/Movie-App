import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-base-800 text-white/70 p-10">
        <aside>
          <div>
            <img src="./logo.png" alt="logo" className="max-w-[200px]" />
          </div>
          <p className="leading-8">
            Movie Mania
            <br />
            Your go-to source for the latest movies and reviews
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-white">Services</h6>
          <a className="link link-hover" href="/">
            Inception
          </a>
          <a className="link link-hover" href="/">
            Interstellar
          </a>
          <a className="link link-hover" href="/">
            Advertisement
          </a>
        </nav>
        <nav>
          <h6 className="footer-title text-white">website</h6>
          <a className="link link-hover" href="/">
            About us
          </a>
          <a className="link link-hover" href="/">
            Contact
          </a>
          <a className="link link-hover" href="/">
            Jobs
          </a>
          <a className="link link-hover" href="/">
            Press kit
          </a>
        </nav>
        <nav>
          <h6 className="footer-title text-white">Legal</h6>
          <a className="link link-hover" href="/">
            Terms of use
          </a>
          <a className="link link-hover" href="/">
            Privacy policy
          </a>
          <a className="link link-hover" href="/">
            Cookie policy
          </a>
        </nav>
      </footer>
      <hr className="py-2" />
      <p className="text-white/70 mx-auto w-full text-center ">
        &copy; 2024 Movie Mania. All rights reserved
      </p>
    </>
  );
};

export default Footer;
