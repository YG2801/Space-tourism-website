import React from "react";
import { motion } from "framer-motion";

function DestinationComp({ upper, lower, activeDestinationData, image }) {
  if (upper) {
    return (
      <>
        <div className="mx-auto mt-6 size-[170px] md:mt-12 md:size-[300px] lg:size-[420px]">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            transition={{
              opacity: { duration: 2 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
            src={image}
            alt="moon-image"
            className="rounded-full shadow shadow-slate-700"
          />
        </div>
      </>
    );
  }
  if (lower) {
    return (
      <div className="md:mx-auto md:w-[450px] lg:mb-16">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1 }}
          className="mt-4 text-center font-bellefair text-6xl uppercase text-white md:mt-8 md:text-[80px] lg:text-start lg:text-[100px]"
        >
          {activeDestinationData?.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.2 }}
          className="mx-4 mt-2 text-center font-barlow md:mx-0 md:mt-6 lg:text-start lg:text-lg"
        >
          {activeDestinationData?.description}
        </motion.p>
        <hr className="mx-4 mt-6 border-[#383B4B] md:mt-16 lg:mx-0" />
        <div className="mb-16 mt-6 md:flex md:items-center md:justify-center md:gap-16 lg:mb-0 lg:justify-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1.4 }}
            className="text-center lg:text-start"
          >
            <h3 className="font-barlow-condensed uppercase tracking-widest">
              Avg. Distance
            </h3>
            <p className="font-bellefair text-3xl uppercase text-white md:mt-4">
              {activeDestinationData?.distance}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 1.6 }}
            className=" mt-6 text-center md:mt-0 lg:text-start"
          >
            <h3 className="font-barlow-condensed uppercase tracking-widest">
              Est. Travel Time
            </h3>
            <p className="font-bellefair text-3xl uppercase text-white md:mt-4">
              {activeDestinationData?.travel}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }
}

export default DestinationComp;
