import React, { useState, useEffect } from "react";

// ✅ Image imports
import amity from "./img/amity.jpg";
import amityy from "./img/amityy.jpg";
import comp from "./img/comp.png";
import kabaddi from "./img/kabaddi.jpg";
import offer from "./img/offer.png";
import profile from "./img/profile.png";
import sangathan from "./img/sangathan.jpg";
import sangathanc from "./img/sangathan.png";

// ========================
// 📌 Static Data
// ========================
const cardData = [
  {
    title: "Education",
    subtitle: "B.Tech Computer Science",
    description: "Amity University, Noida (2022–2026)",
    photos: [amity, amityy],
  },
  {
    title: "Leadership",
    subtitle: "Kabaddi Team Captain",
    description: "Led team in Sangathan 2022 & 2023",
    photos: [kabaddi, sangathan, sangathanc],
  },
  {
    title: "Location",
    subtitle: "Noida, India",
    description: "Open to remote opportunities",
    photos: [profile],
  },
  {
    title: "Experience",
    subtitle: "Web Development Intern",
    description: "Webstick Media Solutions",
    photos: [offer, comp],
  },
];

const skillCategories = {
  Languages: ["C", "C++", "Python", "Java", "JavaScript", "HTML5", "CSS3"],
  "Frameworks & Libraries": ["Node.js", "React.js", "Tailwind CSS"],
  Databases: ["MySQL", "MongoDB"],
  "Networking & Systems": [
    "TCP/IP",
    "IPv4/IPv6",
    "Subnetting",
    "OSI Model",
    "Routing",
    "NAT",
    "Linux (Ubuntu)",
  ],
  "Tools & Platforms": ["Git", "GitHub", "Vercel", "Windows"],
  Concepts: [
    "OOP",
    "Compiler Design",
    "DBMS",
    "OS",
    "TOC",
    "REST API Development",
    "Backend System Design",
  ],
};

// ========================
// 📌 Custom Hook: Slideshow
// ========================
const useSlideshow = (items, intervalTime = 3000) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % items.length),
      intervalTime
    );
    return () => clearInterval(interval);
  }, [items.length, intervalTime]);

  return current;
};

// ========================
// 📌 Reusable Components
// ========================
const SkillChip = ({ name, delay }) => (
  <span
    className="px-4 py-2 border rounded-full text-sm sm:text-base font-medium chip-anim bg-gray-100 text-gray-800 border-gray-300"
    style={{ animationDelay: `${delay}s` }}
  >
    {name}
  </span>
);

const InfoCard = ({ title, subtitle, description, photos }) => {
  const current = useSlideshow(photos, 3000);
  const [popupIndex, setPopupIndex] = useState(null);

  // 🔄 Popup Navigation
  const showNext = (e) => {
    e.stopPropagation();
    setPopupIndex((prev) => (prev + 1) % photos.length);
  };
  const showPrev = (e) => {
    e.stopPropagation();
    setPopupIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="p-5 border border-black rounded-xl text-center transition duration-300 hover:bg-black hover:text-white relative">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 font-medium">{subtitle}</p>
      <p className="text-sm">{description}</p>

      {/* Slideshow */}
      {photos?.length > 0 && (
        <div className="relative w-full flex justify-center mt-3 h-28">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`${title}-${idx}`}
              onClick={() => setPopupIndex(idx)} // ✅ open at clicked index
              className={`absolute w-32 h-24 object-cover rounded-lg border cursor-pointer transition-opacity duration-700 transform ${
                idx === current ? "opacity-100 hover:scale-110" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}

      {/* Popup Modal with Prev/Next */}
      {popupIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPopupIndex(null)}
        >
          <img
            src={photos[popupIndex]}
            alt="popup"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg transition-transform transform scale-100 hover:scale-105"
          />

          {photos.length > 1 && (
            <>
              <button
                onClick={showPrev}
                className="absolute left-6 text-white text-3xl bg-black bg-opacity-40 rounded-full px-3 py-1 hover:bg-opacity-70"
              >
                ‹
              </button>
              <button
                onClick={showNext}
                className="absolute right-6 text-white text-3xl bg-black bg-opacity-40 rounded-full px-3 py-1 hover:bg-opacity-70"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ========================
// 📌 About Section
// ========================
const About = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black px-6 sm:px-12 py-12">
      <style>{`
        @keyframes chip-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .35; }
        }
        .chip-anim {
          animation: chip-blink 1.6s infinite;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <p className="text-base sm:text-lg leading-relaxed">
          Currently pursuing my Bachelor's in Computer Science at Amity
          University, I combine technical expertise with strong leadership skills
          developed through various roles including Web Development Intern,
          Campus Ambassador, and team leadership positions.
        </p>
        <p className="mt-4 text-base sm:text-lg leading-relaxed">
          My experience spans from building responsive web applications with
          React and JavaScript to leading technical events and managing
          cross-functional teams. I'm passionate about leveraging technology to
          solve real-world problems and create meaningful user experiences.
        </p>

        {/* Core Tech Categories */}
        <h2 className="mt-8 text-xl sm:text-2xl font-semibold">Core Technologies</h2>
        <div className="mt-6 space-y-8">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg">{category}</h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {skills.map((skill, i) => (
                  <SkillChip key={skill} name={skill} delay={i * 0.2} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cardData.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
