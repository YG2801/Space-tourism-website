import React from "react";
import { motion } from "framer-motion";

function TechnologyComp({ upper, lower, name, description, imageUrl }) {
  if (upper) {
    return (
      <>
        <div className="relative mt-6 h-[200px] md:h-[310px] lg:h-[450px] lg:w-[400px]">
          <motion.img
            key={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt={name}
            className="mx-auto h-full w-full"
          />
        </div>
      </>
    );
  }

  if (lower) {
    return (
      <>
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 mt-6 h-[300px] md:mx-auto md:mt-12 md:w-[450px] lg:mb-0"
        >
          <h3 className="text-center font-barlow-condensed uppercase tracking-widest md:text-lg lg:text-start">
            The Terminology
          </h3>
          <h2 className="mt-2 text-center font-bellefair text-2xl uppercase text-white md:mt-5 md:text-4xl  lg:text-start lg:text-5xl">
            {name}
          </h2>
          <p className="mx-4 mt-3 text-center font-barlow leading-relaxed md:mt-6 lg:mx-0 lg:text-start">
            {description}
          </p>
        </motion.div>
      </>
    );
  }
}

export default TechnologyComp;
