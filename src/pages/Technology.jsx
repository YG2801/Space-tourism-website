import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import bgMobile from "../assets/background-technology-mobile.jpg";
import bgTablet from "../assets/background-technology-tablet.jpg";
import bgDesktop from "../assets/background-technology-desktop.jpg";
import { TechnologyComp } from "../components";
import firebaseService from "../firebase/service";
import { motion } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";

function Technology() {
  const [technologyData, setTechnologyData] = useState(null);
  const [imageUrlArray, setImageUrlArray] = useState([]);
  const [technologyIndex, setTechnologyIndex] = useState(0);

  const { windowWidth } = useOutletContext();

  useEffect(() => {
    async function fetchTechnologyData() {
      const technologyData = await firebaseService.getDocument(
        "space-app",
        "technology",
      );
      setTechnologyData(technologyData);
    }
    fetchTechnologyData();
  }, []);

  useEffect(() => {
    async function fetchImage() {
      const urlArray = await Promise.all(
        technologyData.technology.map((tech) =>
          firebaseService.getImageURL(
            windowWidth < 1024 ? tech.images.landscape : tech.images.portrait,
          ),
        ),
      );
      setImageUrlArray(urlArray);
    }
    if (technologyData) fetchImage();
  }, [technologyData]);

  useEffect(() => {
    if (technologyData) {
      const interval = setInterval(() => {
        setTechnologyIndex(
          (prevIndex) => (prevIndex + 1) % technologyData.technology.length,
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [technologyData, technologyIndex]);

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
          alt="destination-page-background"
          className="h-full w-full select-none"
        />
      </div>
      {technologyData && imageUrlArray.length > 0 ? (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center font-barlow-condensed uppercase tracking-widest text-white md:mx-6 md:mt-4 md:text-start md:text-xl lg:mx-20"
          >
            <span className="mr-3 font-bold opacity-25">03</span> Space Launch
            101
          </motion.h2>
          <div className="lg:mb-16 lg:flex lg:flex-row-reverse lg:items-center lg:justify-center lg:gap-20">
            <div className="lg:">
              <TechnologyComp
                upper
                {...technologyData.technology[technologyIndex]}
                imageUrl={imageUrlArray[technologyIndex]}
              />
            </div>
            <div className="lg:flex lg:items-start lg:justify-center lg:gap-8">
              <div className="mx-auto mt-6 w-fit md:mt-12">
                <ul className="flex justify-center gap-5 *:size-10 *:cursor-pointer *:rounded-full *:border *:border-white *:border-opacity-40 md:*:size-16 lg:flex-col">
                  {technologyData.technology.map((tech, index) => (
                    <li
                      key={index}
                      onClick={() => setTechnologyIndex(index)}
                      className={`relative flex items-center justify-center font-bellefair md:text-2xl ${technologyIndex === index ? "text-[#0B0D17]" : "text-white"}`}
                    >
                      {index + 1}
                      {technologyIndex === index && (
                        <motion.div
                          layoutId="dot"
                          className="absolute -z-10 size-10 rounded-full bg-white md:size-16"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <TechnologyComp
                lower
                {...technologyData.technology[technologyIndex]}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="fixed left-0 top-0 flex min-h-screen w-full items-center justify-center">
          <InfinitySpin
            visible={true}
            width="200"
            color="#1e4c77"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )}
    </>
  );
}

export default Technology;
