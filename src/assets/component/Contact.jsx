import React, { useMemo } from "react";
import { Mail, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

// 🔹 Reusable Contact Item
const ContactItem = ({ icon: Icon, label, value, href }) => {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
    >
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium hover:text-blue-500">{value}</p>
      </div>
      {isExternal && <ExternalLink className="h-4 w-4 text-gray-400" />}
    </a>
  );
};

// 🔹 Reusable Certification Item
const CertificationItem = ({ name, issuer, year }) => (
  <div className="p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-500">{issuer}</p>
    </div>
    <span className="px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-600">
      {year}
    </span>
  </div>
);

const Contact = () => {
  // ✅ Memoized static data (no need to re-create every render)
  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        value: "devanshu.shrivastavaa@gmail.com",
        href: "mailto:devanshu.shrivastavaa@gmail.com",
      },
      {
        icon: MapPin,
        label: "Location",
        value: "Noida, Uttar Pradesh, India",
        href: "#",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/dkshri",
        href: "https://linkedin.com/in/dkshri",
      },
      {
        icon: Github,
        label: "GitHub",
        value: "github.com/dkshri",
        href: "https://github.com/dkshri",
      },
    ],
    []
  );

  const certifications = useMemo(
    () => [
      { name: "React JS", issuer: "Scaler", year: "2025" },
      { name: "Networking with Cisco Packet Tracer", issuer: "Cisco", year: "2025" },
    ],
    []
  );

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info & Certifications */}
          <div className="space-y-10">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <ContactItem key={index} {...info} />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Recent Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <CertificationItem key={index} {...cert} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="p-8 rounded-lg border border-gray-200 shadow-md">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-white">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Ready to Collaborate?</h3>
                <p className="text-gray-600 mb-6">
                  Whether you have a project in mind, need a development partner, or just want to connect, 
                  I'd love to hear from you.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href="mailto:devanshu.shrivastavaa@gmail.com"
                  className="block w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                >
                  <Mail className="inline-block mr-2 h-5 w-5" />
                  Send Email
                </a>
                <a
                  href="https://linkedin.com/in/dkshri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:text-blue-500 transition"
                >
                  <Linkedin className="inline-block mr-2 h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </div>

              {/* Footer Note */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Open to work • Software Engineer & Developer roles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
