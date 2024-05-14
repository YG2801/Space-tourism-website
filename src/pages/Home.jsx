import React from "react";
import bgMobile from "../assets/background-home-mobile.jpg";
import bgTablet from "../assets/background-home-tablet.jpg";
import bgDesktop from "../assets/background-home-desktop.jpg";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { windowWidth } = useOutletContext();

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full min-h-screen w-full">
        <img
          src={
            windowWidth < 768
              ? bgMobile
              : windowWidth < 1024
                ? bgTablet
                : bgDesktop
          }
          alt="home-page-background"
          className="h-full w-full select-none"
        />
      </div>
      <div className="mx-4 mt-8 text-center md:mx-auto md:w-[450px]">
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.7 }}
          className="font-barlow-condensed uppercase tracking-widest md:text-xl"
        >
          So, you want to travel to
        </motion.h3>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.9 }}
          className="mt-6 font-bellefair text-7xl uppercase text-white md:text-[150px]"
        >
          Space
        </motion.h1>
        <motion.h4
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.1 }}
          className="text mt-8 font-barlow"
        >
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </motion.h4>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: 1.3 }}
        className="mx-auto mb-16 mt-10 flex size-[150px] items-center justify-center rounded-full  bg-white sm:mt-28 md:mt-16 md:size-[245px]"
      >
        <h2 className="font-bellefair text-xl uppercase text-[#0B0D17] md:text-3xl">
          Explore
        </h2>
      </motion.div>
    </>
  );
}

export default Home;
