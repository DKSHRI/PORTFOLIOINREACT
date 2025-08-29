import React from "react";
import InfoCard from "./InfoCard"; 
import { useSkillCategories, SkillChip } from "./SkillChip"; // assuming these exist
import { motion, AnimatePresence } from "framer-motion";

// ✅ Centralized image imports
import amity from "./img/amity.jpg";
import amityy from "./img/amityy.jpg";
import comp from "./img/comp.png";
import kabaddi from "./img/kabaddi.jpg";
import offer from "./img/offer.png";
import profile from "./img/profile.png";
import sangathan from "./img/sangathan.jpg";
import sangathanc from "./img/sangathan.png";

// ✅ Group images by context
const cardPhotos = {
  education: [amity, amityy],
  leadership: [kabaddi, sangathan, sangathanc],
  location: [profile],
  experience: [offer, comp],
};

const About = () => {
  const skillCategories = useSkillCategories();

  return (
    <div className="w-full min-h-screen bg-white text-black px-6 sm:px-12 py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Intro */}
        <p className="para-about text-base sm:text-lg leading-relaxed">
          Currently pursuing my Bachelor's in Computer Science at Amity
          University, I combine technical expertise with strong leadership skills
          developed through various roles including Web Development Intern,
          Campus Ambassador, and team leadership positions.
        </p>
        <p className="para-about mt-4 text-base sm:text-lg leading-relaxed">
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
                  <SkillChip key={skill.name} skill={skill} delay={i * 0.2} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <InfoCard
            title="Education"
            subtitle="B.Tech Computer Science"
            description="Amity University, Noida (2022–2026)"
            photos={cardPhotos.education}
          />
          <InfoCard
            title="Leadership"
            subtitle="Kabaddi Team Captain"
            description="Led team in Sangathan 2022 & 2023"
            photos={cardPhotos.leadership}
          />
          <InfoCard
            title="Location"
            subtitle="Noida, India"
            description="Open to remote opportunities"
            photos={cardPhotos.location}
          />
          <InfoCard
            title="Experience"
            subtitle="Web Development Intern"
            description="Webstick Media Solutions"
            photos={cardPhotos.experience}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
