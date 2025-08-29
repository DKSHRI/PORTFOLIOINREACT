import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// InfoCard with automatic slideshow
const InfoCard = ({ title, subtitle, description, photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 2500); // change every 2.5 seconds
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="p-5 border border-black rounded-xl text-center transition duration-300 hover:bg-black hover:text-white overflow-hidden">
      {/* Photo slideshow */}
      {photos && photos.length > 0 && (
        <div className="h-32 w-full mb-3 rounded-lg overflow-hidden relative">
          <AnimatePresence>
            <motion.img
              key={photos[index]}
              src={photos[index]}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 font-medium">{subtitle}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default InfoCard;
