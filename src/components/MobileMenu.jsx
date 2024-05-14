import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function MobileMenu({ setIsOpen, options }) {
  let delay = 0.4;
  const activeStyle = {
    borderRight: "4px solid #fff",
  };

  return (
    <motion.div
      layout
      initial={{
        width: "30%",
        height: "15%",
        borderBottomLeftRadius: "100%",
        opacity: 0,
      }}
      animate={{
        width: "70%",
        height: "100%",
        borderBottomLeftRadius: "0%",
        opacity: 1,
      }}
      exit={{ width: "30%", height: "15%", borderBottomLeftRadius: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed right-0 top-0 z-50 bg-[#979797] bg-opacity-15 backdrop-blur-xl will-change-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        className="lg: ml-auto mr-6 mt-8 cursor-pointer fill-[#D0D6F9] transition-colors active:fill-white lg:hover:fill-white"
        onClick={() => setIsOpen(false)}
      >
        <g fillRule="evenodd">
          <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
          <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
        </g>
      </svg>
      <ul className="mt-28 select-none font-barlow-condensed uppercase tracking-widest text-white *:mb-1 *:cursor-pointer *:transition-colors active:*:bg-gray-600 active:*:bg-opacity-60 lg:hover:*:bg-gray-600 lg:hover:*:bg-opacity-60">
        {options.map(({ name, path }, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.1, delay: (delay += 0.1) }}
          >
            <NavLink
              to={path}
              className="flex py-2 pl-6 will-change-auto"
              style={({ isActive }) => (isActive ? activeStyle : null)}
              onClick={() => setIsOpen(false)}
            >
              <span className=" mr-3 inline-block w-5 font-bold">
                {`0${index}`}{" "}
              </span>
              {name}
            </NavLink>
          </motion.div>
        ))}
      </ul>
    </motion.div>
  );
}

export default MobileMenu;
