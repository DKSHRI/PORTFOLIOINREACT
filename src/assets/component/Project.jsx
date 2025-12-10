// src/assets/component/Project.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Github, ExternalLink, Loader2, AlertCircle } from "lucide-react";

const TerminalWindow = ({ title, children }) => (
  <div className="bg-black text-green-400 font-mono rounded-lg shadow-lg overflow-hidden">
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-900 text-gray-400 text-xs">
      <span className="w-3 h-3 rounded-full bg-red-500"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
      <span className="w-3 h-3 rounded-full bg-green-500"></span>
      <span className="ml-2">{title}</span>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const TypewriterText = ({ text, speed = 50, trigger, onComplete, className }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!trigger) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [trigger, text, speed, onComplete]);
  return <span className={className}>{displayed}</span>;
};

const useScrollReveal = (threshold = 0.2) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, elementRef };
};

const Project = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const { isVisible, elementRef } = useScrollReveal(0.2);

  const username = "dkshri";

  useEffect(() => {
    if (isVisible && step === 0) setStep(1);
  }, [isVisible, step]);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100&page=1`
        );
        const deployedRepos = data
          .filter(
            (repo) =>
              !repo.private &&
              !repo.fork &&
              (repo.homepage || repo.has_pages) &&
              repo.homepage?.trim() !== ""
          )
          .map((repo) => ({
            ...repo,
            deployment_url:
              repo.homepage || `https://${username}.github.io/${repo.name}`,
          }))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
        setRepos(deployedRepos);
      } catch (err) {
        setError(err.message || "Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };
    if (step >= 2) fetchRepos();
  }, [username, step]);

  return (
    <section ref={elementRef} id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <TerminalWindow title="project-scanner">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-primary">{username}@portfolio:~$</span>
                <TypewriterText
                  text="find ./repositories -name '*deployed*'"
                  trigger={step === 1}
                  speed={60}
                  onComplete={() => setStep(2)}
                  className="text-foreground"
                />
              </div>
              {step === 2 && (
                <div className="ml-4">
                  <TypewriterText
                    text="> Scanning GitHub repositories..."
                    trigger={step === 2}
                    speed={40}
                    className="text-muted-foreground"
                  />
                </div>
              )}
              {step >= 3 && !loading && (
                <div className="ml-4 space-y-1">
                  <div className="text-primary">
                    {">"} Found {repos.length} deployed projects
                  </div>
                  <div className="text-muted-foreground">
                    {">"} Ready to display projects ✓
                  </div>
                </div>
              )}
            </div>
          </TerminalWindow>
        </div>
        {loading && (
          <div className="flex justify-center py-12">
            <TerminalWindow title="loading">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading repositories...
              </div>
            </TerminalWindow>
          </div>
        )}
        {error && (
          <div className="flex justify-center py-12">
            <TerminalWindow title="error">
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            </TerminalWindow>
          </div>
        )}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-12">
            <TerminalWindow title="no-results">
              <div className="text-muted-foreground">
                No deployed repositories found for {username}.
              </div>
            </TerminalWindow>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <TerminalWindow key={repo.id} title={repo.name}>
              {repo.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {repo.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <span className="px-3 py-1 border border-border rounded-full text-xs font-medium">
                    {repo.language}
                  </span>
                )}
                {repo.topics?.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 border border-border rounded-full text-xs font-medium"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-border rounded-lg transition hover:bg-primary hover:text-white  hover:border-primary"
                >
                  <Github className="h-4 w-4 mr-2" /> Code
                </a>
                <a
                  href={repo.deployment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-border rounded-lg transition hover:bg-primary hover:text-white  hover:border-primary"
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> Live
                </a>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
