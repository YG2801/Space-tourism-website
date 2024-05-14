import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MobileMenu } from "./index";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ windowWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  let delay = 0.4;
  const activeStyle = {
    borderBottom: "3px solid #D0D6F9",
  };

  const options = [
    { name: "Home", path: "" },
    { name: "Destination", path: "destination" },
    { name: "Crew", path: "crew" },
    { name: "Technology", path: "technology" },
  ];

  return (
    <div className="flex items-center justify-between overflow-hidden p-6 md:mb-20 md:ml-6 md:p-0 lg:pt-6">
      <Link to="/" className="z-10">
        <motion.svg
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 48 48"
        >
          <g fill="none" fillRule="evenodd">
            <circle cx="24" cy="24" r="24" fill="#FFF" />
            <path
              fill="#0B0D17"
              d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
            />
          </g>
        </motion.svg>
      </Link>
      {windowWidth >= 768 ? (
        <div className=" relative bg-[#979797] bg-opacity-15 px-10 backdrop-blur-xl lg:pl-20 lg:pr-40">
          <div className="absolute -left-[95%] top-1/2 w-full -translate-y-1/2 bg-[#979797] bg-opacity-40 p-[1px]" />
          <ul className="flex select-none gap-10 font-barlow-condensed uppercase tracking-widest  text-white *:cursor-pointer">
            {options.map(({ name, path }, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.1, delay: (delay += 0.1) }}
                className="py-6"
              >
                <NavLink
                  to={path}
                  className="py-6 will-change-auto"
                  style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                  {name}
                </NavLink>
              </motion.div>
            ))}
          </ul>
        </div>
      ) : (
        <motion.svg
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="21"
          className="cursor-pointer fill-[#D0D6F9] transition-colors active:fill-white lg:hover:fill-white"
          onClick={() => setIsOpen(true)}
        >
          <g fillRule="evenodd">
            <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
          </g>
        </motion.svg>
      )}
      <AnimatePresence>
        {isOpen && <MobileMenu setIsOpen={setIsOpen} options={options} />}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
