import React from "react";
import { Github, ExternalLink } from "lucide-react";


const Project = () => {
  const projects = [
    {
      title: "Movie Watchlist App",
      description:
        "A React-based web application that lets users browse trending movies, add them to a watchlist, and manage it efficiently. Features responsive design and real-time data from TMDb API.",
      technologies: ["React.js", "React Router", "Tailwind CSS", "TMDb API"],
       github: "https://github.com/DKSHRI/filmy.com",
      live: "https://dkshri.github.io/filmy.com/",
    },
    {
      title: "Interactive Calculator",
      description:
        "A stylish web-based calculator with minimalist design featuring colorful buttons, smooth animations, and responsive layout. Built with vanilla JavaScript and custom CSS.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
      github: "#",
      live: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "Modern portfolio website showcasing projects and skills with beautiful animations, dark theme, and responsive design. Built with React and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/DKSHRI/PORTFOLIOINREACT",
      live: "https://dkshri.github.io/PORTFOLIOINREACT/",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-black px-6 sm:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-5 border border-black rounded-xl transition duration-300 ease-in-out hover:bg-black hover:text-white"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border border-black rounded-full text-xs font-medium transition duration-300 hover:bg-white hover:text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-black rounded-lg transition duration-300 hover:bg-white hover:text-black"
                >
                  <Github className="h-4 w-4 mr-2" /> Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-black rounded-lg transition duration-300 hover:bg-white hover:text-black"
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
