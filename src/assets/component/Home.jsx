import React from "react";
import { Link } from "react-router-dom";
import dp from "../component/img/profile.png";

// ✅ Import Sections
import About from "./About";
import Project from "./Project";
import Leetcode from "./Leetcode";
import Contact from "./Contact";

// 🔹 Reusable Button Link
const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative inline-flex items-center justify-center 
      px-4 py-2 text-sm sm:text-base text-black rounded-full 
      overflow-hidden group border border-black"
  >
    <span className="absolute inset-0 w-full h-full bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
    <span className="relative z-10 group-hover:text-white">{children}</span>
  </Link>
);

const Home = () => {
  return (
    <>
      <div className="min-h-[70vh] w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-8 sm:mt-16 px-4 sm:px-8">
        
        {/* Left Section - Profile Image */}
        <div className="flex justify-center items-center w-full sm:w-1/2">
          <img
            src={dp}
            alt="Devanshu Shrivastava"
            className="w-40 sm:w-2/3 max-w-[280px] sm:max-w-sm md:max-w-md h-auto object-contain rounded-full shadow-md"
            loading="lazy" // ✅ Performance boost
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="w-full sm:w-1/2 text-center sm:text-left space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">
            DEVANSHU SHRIVASTAVA
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold">
            Computer Science Student & Web Developer
          </h2>
          <h3 className="para-about text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 px-2 sm:px-0">
            Aspiring Software Engineer passionate about creating innovative
            solutions. Skilled in React, JavaScript, and modern web
            technologies.
          </h3>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-3">
            <ButtonLink to="/projects">View my work</ButtonLink>
            <ButtonLink to="/contact">Contact Me</ButtonLink>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <About />
      <Project />
      <Leetcode />
      <Contact />
    </>
  );
};

export default Home;
