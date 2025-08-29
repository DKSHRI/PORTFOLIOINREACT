import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import gsap from "gsap";

const Leetcode = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);

  // Refs
  const progressRefs = useRef([]);
  const progressValueRefs = useRef([]);
  const progressPathRefs = useRef([]);
  const cardRefs = useRef([]);
  const cardValueRefs = useRef([]);

  // Fetch stats
  const fetchUserDetails = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        "https://leetcode-stats-api.herokuapp.com/DEVANSH_CAN_CODE"
      );
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (solved, total) =>
    total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

  const cardData = stats
    ? [
        { label: "Total Submissions", value: stats.totalSolved },
        { label: "Easy Solved", value: stats.easySolved },
        { label: "Medium Solved", value: stats.mediumSolved },
        { label: "Hard Solved", value: stats.hardSolved },
        { label: "Reputation", value: stats.reputation },
        { label: "Ranking", value: stats.ranking },
        { label: "Contribution Points", value: stats.contributionPoints },
        { label: "Acceptance Rate", value: stats.acceptanceRate, suffix: "%" },
      ]
    : [];

  // 🔹 Observe when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchUserDetails();
          observer.disconnect(); // ✅ only run once
        }
      },
      { threshold: 0.5 } // trigger at 50% visibility
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Animate when stats are loaded
  useEffect(() => {
    if (stats) {
      // Animate progress sections
      gsap.fromTo(
        progressRefs.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power3.out" }
      );

      // Animate progress percentages + stroke
      progressValueRefs.current.forEach((el, i) => {
        if (!el) return;

        const finalVal = [
          progress(stats.easySolved, stats.totalEasy),
          progress(stats.mediumSolved, stats.totalMedium),
          progress(stats.hardSolved, stats.totalHard),
        ][i];

        const obj = { val: 0 };
        gsap.to(obj, {
          val: finalVal,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = obj.val.toFixed(1) + "%";
          },
        });

        const path = progressPathRefs.current[i];
        if (path) {
          gsap.fromTo(
            path,
            { strokeDasharray: `0, 100` },
            {
              strokeDasharray: `${finalVal}, 100`,
              duration: 1.5,
              ease: "power3.out",
            }
          );
        }
      });

      // Animate cards
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Animate card numbers
      cardValueRefs.current.forEach((el, i) => {
        if (!el) return;
        const finalVal = cardData[i]?.value ?? 0;
        const suffix = cardData[i]?.suffix || "";
        const obj = { val: 0 };

        if (typeof finalVal === "number") {
          gsap.to(obj, {
            val: finalVal,
            duration: 1.5,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = Math.floor(obj.val) + suffix;
            },
          });
        } else {
          el.textContent = finalVal + suffix;
        }
      });
    }
  }, [stats]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-white text-black flex flex-col"
    >
      {/* Navbar */}
      <header className="flex justify-center items-center p-4 bg-black shadow-md">
        <a
          href="https://leetcode.com/u/DEVANSH_CAN_CODE/"
          className="text-xl font-bold text-white"
        >
        Leetcode (DEVANSH_CAN_CODE) 🎯
        </a>
      </header>

      {/* Error */}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {/* Loader */}
      {loading && (
        <p className="text-center mt-10 text-gray-600 animate-pulse">
          Loading profile...
        </p>
      )}

      {/* Stats */}
      {stats && (
        <main className="flex-1 container mx-auto p-6">
          {/* Progress Circles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Easy", value: stats.easySolved, total: stats.totalEasy },
              {
                label: "Medium",
                value: stats.mediumSolved,
                total: stats.totalMedium,
              },
              { label: "Hard", value: stats.hardSolved, total: stats.totalHard },
            ].map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (progressRefs.current[idx] = el)}
                className="flex flex-col items-center bg-black p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105"
              >
                <div className="relative w-28 h-28">
                  <svg className="absolute inset-0" viewBox="0 0 36 36">
                    <path
                      className="text-gray-700"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      ref={(el) => (progressPathRefs.current[idx] = el)}
                      className="text-yellow-400"
                      strokeLinecap="round"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span
                    ref={(el) => (progressValueRefs.current[idx] = el)}
                    className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white"
                  >
                    0%
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold text-white">
                  {item.label}
                </p>
                <span className="text-gray-400">{item.value} solved</span>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((c, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="bg-black p-4 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 opacity-0"
              >
                <h3 className="text-gray-400 text-sm">{c.label}</h3>
                <p
                  ref={(el) => (cardValueRefs.current[i] = el)}
                  className="text-2xl font-bold text-yellow-400"
                >
                  0
                </p>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Leetcode;
