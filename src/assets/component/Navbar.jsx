import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useRotatingTitles = (titles, interval = 5000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, interval);
    return () => clearInterval(id);
  }, [titles, interval]);

  return titles[index];
};

const navLinks = [
  { to: "/home", label: "Home", effect: "-translate-y-full" },
  { to: "/about", label: "About", effect: "-translate-x-full" },
  { to: "/projects", label: "Projects", effect: "translate-y-full" },
  { to: "/Leetcode-Live", label: "LeetCode", effect: "translate-x-full" },
  { to: "/contact", label: "Contact", effect: "translate-x-full translate-y-full" },
  {
    to: "https://drive.google.com/drive/folders/10uyeUNq-j4slcN7j3aVKVVXJ9oepWnB4",
    label: "Resume",
    external: true,
    blink: true,
  },
];

const Navbar = () => {
  const titles = [
    "Devanshu Shrivastava🧑‍🔬",
    "An Amitian🧑‍🎓",
    "An Ex Campus Ambassador of Cisco🧑‍💼",
    "An Ex Web Developer at Webstik Media Solutions🧑‍💻",
  ];

  const currentTitle = useRotatingTitles(titles, 5000);

  return (
    <div className="sm:px-6 py-4 flex flex-row flex-wrap md:flex-nowrap justify-between items-center top-0 left-0 w-full">
      {/* Blinking animation */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .blink {
          animation: blink 1.5s infinite;
          color: white !important;
          border-color: #22c55e !important; /* green */
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
          background-color: #000 !important;
        }
      `}</style>

      {/* Logo / Title */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="edu-cursive text-lg sm:text-xl md:text-2xl font-bold">
          {currentTitle}
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm md:text-base mt-3 md:mt-0">
        {navLinks.map(({ to, label, effect, external, blink }) =>
          external ? (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative inline-flex items-center justify-center 
                px-3 py-1 sm:px-4 sm:py-2 text-black rounded-full 
                overflow-hidden group border border-gray-400 sm:border-black 
                transition-colors duration-300 ${blink ? "blink" : ""}`}
            >
              <span
                className={`absolute inset-0 w-full h-full bg-black transform ${effect} 
                group-hover:translate-x-0 group-hover:translate-y-0 
                transition-transform duration-700 ease-out`}
              ></span>
              <span className="relative z-10 group-hover:text-white">{label}</span>
            </a>
          ) : (
            <Link
              key={to}
              to={to}
              className={`relative inline-flex items-center justify-center 
                px-3 py-1 sm:px-4 sm:py-2 text-black rounded-full 
                overflow-hidden group border border-gray-400 sm:border-black 
                transition-colors duration-300 ${blink ? "blink" : ""}`}
            >
              <span
                className={`absolute inset-0 w-full h-full bg-black transform ${effect} 
                group-hover:translate-x-0 group-hover:translate-y-0 
                transition-transform duration-700 ease-out`}
              ></span>
              <span className="relative z-10 group-hover:text-white">{label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;
