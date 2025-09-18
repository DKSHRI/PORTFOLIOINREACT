import React, { useState, useEffect, memo } from "react";

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
  "Programming & Development": [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "OOP",
    "SDLC",
    "Agile Development",
    "JUnit",
    "PyTest",
    "Selenium",
    "GitHub Actions",
    "Jenkins",
  ],
  "Web & Application Technologies": [
    "HTML5",
    "CSS3",
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "REST APIs",
    "Frontend Development",
    "Backend Development",
    "UI/UX Basics",
  ],
  "Databases & Data Management": [
    "MySQL",
    "MongoDB",
    "DBMS Concepts",
    "Query Optimization",
    "Data Modeling",
    "SQL/NoSQL Integration",
  ],
  "Cloud & Deployment Platforms": [
    "AWS",
    "Azure (Basics)",
    "Vercel",
    "GitHub Pages",
    "Docker",
    "Kubernetes (Intro)",
    "Serverless Computing",
    "Cloud-Native Practices",
    "MLOps/DevOps Practices",
  ],
  "Networking & Systems": [
    "TCP/IP",
    "IPv4/IPv6",
    "OSI Model",
    "Routing",
    "NAT",
    "Linux",
    "Operating Systems",
    "Compiler Design",
    "Theory of Computation",
  ],
  "AI & Emerging Technologies": [
    "Generative AI Fundamentals",
    "Prompt Engineering",
    "LangChain",
    "RAG",
    "OpenLLM",
    "AutoGen",
    "CrewAI",
    "AutoGPT",
    "Knowledge Graphs (Intro)",
    "Vector Databases",
    "Semantic Retrieval",
    "LLM/SLM Fine-Tuning Awareness",
  ],
  "Tools & Collaboration": [
    "Git",
    "GitHub",
    "Google Workspace",
    "Version Control",
    "Peer Code Reviews",
    "Documentation",
  ],
  "Core Strengths": [
    "Problem-Solving",
    "Analytical Thinking",
    "Quick Learning",
    "Collaboration",
    "Ability to Work Across Domains",
  ],
};

// ========================
// 🎨 Color Palette for Chips
// ========================
const colorPalette = [
  "bg-blue-100 text-blue-800 border-blue-300 hover:shadow-blue-300",
  "bg-green-100 text-green-800 border-green-300 hover:shadow-green-300",
  "bg-yellow-100 text-yellow-800 border-yellow-300 hover:shadow-yellow-300",
  "bg-purple-100 text-purple-800 border-purple-300 hover:shadow-purple-300",
  "bg-red-100 text-red-800 border-red-300 hover:shadow-red-300",
  "bg-pink-100 text-pink-800 border-pink-300 hover:shadow-pink-300",
  "bg-indigo-100 text-indigo-800 border-indigo-300 hover:shadow-indigo-300",
  "bg-teal-100 text-teal-800 border-teal-300 hover:shadow-teal-300",
];

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
const SkillChip = memo(({ name, delay, colorIndex }) => {
  const colorClass = colorPalette[colorIndex % colorPalette.length];

  return (
    <span
      className={`px-4 py-2 border rounded-full text-sm sm:text-base font-medium chip-anim transition-all duration-300 hover:scale-110 hover:shadow-md ${colorClass}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {name}
    </span>
  );
});

const InfoCard = memo(({ title, subtitle, description, photos }) => {
  const current = useSlideshow(photos, 3000);
  const [popupIndex, setPopupIndex] = useState(null);

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
              onClick={() => setPopupIndex(idx)}
              className={`absolute w-32 h-24 object-cover rounded-lg border cursor-pointer transition-opacity duration-700 transform ${
                idx === current ? "opacity-100 hover:scale-110" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}

      {/* Popup Modal */}
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
});

// ========================
// 📌 About Section
// ========================
const About = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black px-6 sm:px-12 py-12">
      <style>{`
        @keyframes chip-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        .chip-anim {
          animation: chip-blink 2s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Intro */}
        <p className="text-base sm:text-lg leading-relaxed">
          Currently pursuing my Bachelor's in Computer Science at Amity
          University, I combine technical expertise with strong leadership skills
          developed through roles like Web Development Intern, Campus Ambassador,
          and team leadership.
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
                  <SkillChip
                    key={skill}
                    name={skill}
                    delay={i * 0.15}
                    colorIndex={i}
                  />
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
