import React, { useMemo } from "react";

// Skill categories (memoized so they don't re-render unnecessarily)
const useSkillCategories = () =>
  useMemo(
    () => ({
      Languages: [
        { name: "C", cls: "bg-gray-100 text-gray-800 border-gray-300" },
        { name: "C++", cls: "bg-gray-200 text-gray-900 border-gray-400" },
        { name: "Python", cls: "bg-blue-100 text-blue-800 border-blue-300" },
        { name: "Java", cls: "bg-red-100 text-red-800 border-red-300" },
        {
          name: "JavaScript",
          cls: "bg-yellow-100 text-yellow-800 border-yellow-300",
        },
        { name: "HTML5", cls: "bg-orange-100 text-orange-800 border-orange-300" },
        { name: "CSS3", cls: "bg-sky-100 text-sky-800 border-sky-300" },
      ],
      "Frameworks & Libraries": [
        { name: "Node.js", cls: "bg-green-100 text-green-800 border-green-300" },
        { name: "React.js", cls: "bg-cyan-100 text-cyan-800 border-cyan-300" },
        { name: "Tailwind CSS", cls: "bg-teal-100 text-teal-800 border-teal-300" },
      ],
      Databases: [
        { name: "MySQL", cls: "bg-indigo-100 text-indigo-800 border-indigo-300" },
        {
          name: "MongoDB",
          cls: "bg-emerald-100 text-emerald-800 border-emerald-300",
        },
      ],
      "Networking & Systems": [
        { name: "TCP/IP", cls: "bg-gray-100 text-gray-800 border-gray-300" },
        { name: "IPv4/IPv6", cls: "bg-gray-200 text-gray-900 border-gray-400" },
        { name: "Subnetting", cls: "bg-purple-100 text-purple-800 border-purple-300" },
        { name: "OSI Model", cls: "bg-pink-100 text-pink-800 border-pink-300" },
        { name: "Routing", cls: "bg-yellow-100 text-yellow-800 border-yellow-300" },
        { name: "NAT", cls: "bg-blue-100 text-blue-800 border-blue-300" },
        { name: "Linux (Ubuntu)", cls: "bg-black text-white border-gray-600" },
      ],
      "Tools & Platforms": [
        { name: "Git", cls: "bg-amber-100 text-amber-900 border-amber-300" },
        { name: "GitHub", cls: "bg-gray-100 text-gray-800 border-gray-300" },
        { name: "Vercel", cls: "bg-zinc-100 text-zinc-800 border-zinc-300" },
        { name: "Windows", cls: "bg-blue-50 text-blue-800 border-blue-200" },
      ],
      Concepts: [
        { name: "OOP", cls: "bg-indigo-50 text-indigo-800 border-indigo-200" },
        {
          name: "Compiler Design",
          cls: "bg-red-50 text-red-800 border-red-200",
        },
        { name: "DBMS", cls: "bg-green-50 text-green-800 border-green-200" },
        { name: "OS", cls: "bg-gray-50 text-gray-800 border-gray-200" },
        { name: "TOC", cls: "bg-purple-50 text-purple-800 border-purple-200" },
        {
          name: "REST API Development",
          cls: "bg-cyan-50 text-cyan-800 border-cyan-200",
        },
        {
          name: "Backend System Design",
          cls: "bg-pink-50 text-pink-800 border-pink-200",
        },
      ],
    }),
    []
  );

// Reusable SkillChip component
const SkillChip = ({ skill, delay }) => (
  <span
    className={`px-4 py-2 border rounded-full text-sm sm:text-base font-medium chip-anim ${skill.cls}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {skill.name}
  </span>
);

// Reusable InfoCard component
const InfoCard = ({ title, subtitle, description }) => (
  <div className="p-5 border border-black rounded-xl text-center transition duration-300 hover:bg-black hover:text-white">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-1 font-medium">{subtitle}</p>
    <p className="text-sm">{description}</p>
  </div>
);

const About = () => {
  const skillCategories = useSkillCategories();

  return (
    <div className="w-full min-h-screen bg-white text-black px-6 sm:px-12 py-12">
      {/* Inline keyframes for blinking */}
      <style>{`
        @keyframes chip-blink {
          0%, 100% { opacity: 1; filter: none; }
          50% { opacity: .35; }
        }
        .chip-anim {
          animation: chip-blink 1.6s infinite;
        }
      `}</style>

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
          />
          <InfoCard
            title="Leadership"
            subtitle="Kabaddi Team Captain"
            description="Led team in Sangathan 2022 & 2023"
          />
          <InfoCard
            title="Location"
            subtitle="Noida, India"
            description="Open to remote opportunities"
          />
          <InfoCard
            title="Experience"
            subtitle="Web Development Intern"
            description="Webstick Media Solutions"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
