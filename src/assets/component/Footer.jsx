import React, { useMemo } from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

// 🔹 Reusable Social Link
const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="p-2 rounded-full hover:bg-gray-100 transition"
    aria-label={label}
  >
    <Icon className="h-5 w-5 text-gray-700" />
  </a>
);

const Footer = () => {
  // ✅ Memoized socials
  const socials = useMemo(
    () => [
      {
        href: "https://github.com/dkshri",
        icon: Github,
        label: "GitHub",
      },
      {
        href: "https://linkedin.com/in/dkshri",
        icon: Linkedin,
        label: "LinkedIn",
      },
      {
        href: "mailto:devanshu.shrivastavaa@gmail.com",
        icon: Mail,
        label: "Email",
      },
    ],
    []
  );

  return (
    <footer className="bg-white/90 backdrop-blur border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left side - Name and copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">Devanshu Shrivastava</h3>
            <p className="text-gray-500 text-sm">
              © 2024 • Built with{" "}
              <Heart className="inline h-4 w-4 text-red-500 mx-1" /> using React & Tailwind CSS
            </p>
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social, i) => (
              <SocialLink key={i} {...social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
