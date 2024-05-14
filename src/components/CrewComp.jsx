import React from "react";
import { motion } from "framer-motion";

function CrewComp({ upper, lower, name, role, bio, imageUrl }) {
  if (upper) {
    return (
      <>
        <div className="mx-4 mt-4 h-[200px] border-b border-[#494d60] md:mt-10 md:h-[400px] lg:w-[500px]">
          <motion.img
            key={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt={name}
            className="mx-auto h-full"
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
          className="mb-16 mt-6 h-[300px] md:mx-auto md:mb-0 md:h-auto md:w-[450px] lg:h-[250px]"
        >
          <h3 className="text-center font-bellefair text-2xl uppercase text-white opacity-50 lg:text-start">
            {role}
          </h3>
          <h2 className="mt-2 text-center font-bellefair text-2xl uppercase text-white md:text-4xl  lg:text-start">
            {name}
          </h2>
          <p className="mx-4 mt-3 text-center font-barlow leading-relaxed lg:mx-0 lg:text-start">
            {bio}
          </p>
        </motion.div>
      </>
    );
  }
}

export default CrewComp;
