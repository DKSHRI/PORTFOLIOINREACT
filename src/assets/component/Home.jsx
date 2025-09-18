import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dp from "../component/img/profile.png";
import About from "./About";
import Project from "./Project";
import Leetcode from "./Leetcode";
import Contact from "./Contact";

const ButtonLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative inline-flex items-center justify-center 
      px-4 py-2 text-sm sm:text-base text-green-400 rounded-lg 
      overflow-hidden group border border-green-400 "
  >
    <span className="absolute inset-0 w-full h-full bg-green-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
    <span className="relative z-10 group-hover:text-black">{children}</span>
  </Link>
);

// ✅ Mini Terminal Window (same style as your project-scanner)
const TerminalWindow = ({ title, children }) => (
  <div className="bg-black text-green-500  rounded-lg shadow-lg overflow-hidden">
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 text-gray-400 text-xs">
      <span className="w-3 h-3 rounded-full bg-red-500"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
      <span className="w-3 h-3 rounded-full bg-green-500"></span>
      <span className="ml-2">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const Home = () => {
  const [showFinal, setShowFinal] = useState(false);
  const [currentLine, setCurrentLine] = useState("");
  const [step, setStep] = useState(0);

  const lines = [
    `$ echo "DEVANSHU SHRIVASTAVA"`,
    `$ echo "Computer Science Student & Web Developer"`,
    `$ echo "Aspiring Software Engineer passionate about creating innovative solutions. Skilled in React, JavaScript, and modern web technologies."`
  ];

  useEffect(() => {
    let i = 0;
    let j = 0;
    const typingSpeed = 15; // ms per char
    const stepDelay = 400; // ms between lines

    function typeLine() {
      if (i < lines.length) {
        if (j < lines[i].length) {
          setCurrentLine((prev) => prev + lines[i][j]);
          j++;
          setTimeout(typeLine, typingSpeed);
        } else {
          setStep(i + 1);
          j = 0;
          setTimeout(() => {
            setCurrentLine("");
            i++;
            typeLine();
          }, stepDelay);
        }
      } else {
        setTimeout(() => setShowFinal(true), 800);
      }
    }

    typeLine();
  }, []);

  return (
    <>
      <div className="min-h-[70vh] w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-8 sm:mt-16 px-4 sm:px-8">

        {/* Left Section - Profile Image */}
        <div className="flex justify-center items-center w-full sm:w-1/2">
          <img
            src={dp}
            alt="Devanshu Shrivastava"
            className="w-40 sm:w-2/3 max-w-[280px] sm:max-w-sm md:max-w-md h-auto object-contain  "
            loading="lazy"
          />
        </div>

        {/* Right Section - Terminal Window */}
        <div className=" w-full sm:w-1/2">
          <TerminalWindow title="about-me">
            {!showFinal ? (
              <p className="whitespace-pre-wrap">
                {currentLine}
                <span className="animate-pulse">█</span>
              </p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl  text-green-400">
                  DEVANSHU SHRIVASTAVA
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl  text-green-400">
                  Computer Science Student & Web Developer
                </h2>
                <h3 className="text-sm sm:text-base md:text-lg leading-relaxed text-green-300">
                  Aspiring Software Engineer passionate about creating innovative
                  solutions. Skilled in React, JavaScript, and modern web technologies.
                </h3>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-3">
                  <ButtonLink to="/projects">View my work</ButtonLink>
                  <ButtonLink to="/contact">Contact Me</ButtonLink>
                </div>
              </div>
            )}
          </TerminalWindow>
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
