// src/assets/component/SkillChip.jsx
import React from "react";

export const SkillChip = ({ skill, delay = 0 }) => {
  return (
    <div
      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full shadow-sm hover:shadow-md transition"
      style={{ animationDelay: `${delay}s` }}
    >
      {skill.name}
    </div>
  );
};

// Hook that returns skill categories
export const useSkillCategories = () => {
  return {
    "Frontend": [
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "JavaScript" },
    ],
    "Backend": [
      { name: "Node.js" },
      { name: "Express" },
    ],
    "Database": [
      { name: "MongoDB" },
      { name: "MySQL" },
    ],
  };
};
