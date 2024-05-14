import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DestinationNavbar() {
  const destinationOptionArray = [
    { name: "moon", path: "moon" },
    { name: "mars", path: "mars" },
    { name: "europa", path: "europa" },
    { name: "titan", path: "titan" },
  ];

  const [activeDestination, setActiveDestination] = useState(useParams().place);

  return (
    <>
      <div className="mt-4 flex justify-center md:mt-10 lg:justify-start">
        <ul className="flex select-none gap-4 font-barlow-condensed text-sm uppercase tracking-widest *:cursor-pointer active:*:text-white md:gap-6 md:text-base lg:hover:*:text-white">
          {destinationOptionArray.map(({ name, path }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: (index + 1) * 0.2 }}
            >
              <Link
                to={`/destination/${path}`}
                className={`relative py-1 ${activeDestination === name && "text-white"}`}
                onClick={() => {
                  setActiveDestination(name);
                }}
              >
                {name}
                {activeDestination === name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-white"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DestinationNavbar;
