import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import firebaseService from "../firebase/service";
import { motion } from "framer-motion";
import bgMobile from "../assets/background-crew-mobile.jpg";
import bgTablet from "../assets/background-crew-tablet.jpg";
import bgDesktop from "../assets/background-crew-desktop.jpg";
import { CrewComp } from "../components";
import { InfinitySpin } from "react-loader-spinner";

function Crew() {
  const [crewData, setCrewData] = useState(null);
  const [crewIndex, setCrewIndex] = useState(0);
  const [imageUrlArray, setImageUrlArray] = useState([]);

  const { windowWidth } = useOutletContext();

  useEffect(() => {
    async function fetchCrewData() {
      const crewData = await firebaseService.getDocument("space-app", "crew");
      setCrewData(crewData);
    }
    fetchCrewData();
  }, []);

  useEffect(() => {
    if (crewData) {
      const interval = setInterval(() => {
        setCrewIndex((prevIndex) => (prevIndex + 1) % crewData.crew.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [crewData, crewIndex]);

  useEffect(() => {
    async function fetchImage() {
      const urlArray = await Promise.all(
        crewData.crew.map((crew) =>
          firebaseService.getImageURL(crew.images.webp),
        ),
      );
      setImageUrlArray(urlArray);
    }
    if (crewData) fetchImage();
  }, [crewData]);

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

      {crewData && imageUrlArray.length > 0 ? (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center font-barlow-condensed uppercase tracking-widest text-white md:mx-6 md:mt-4 md:text-start md:text-xl lg:mx-20"
          >
            <span className="mr-3 font-bold opacity-25">02</span> Meet your Crew
          </motion.h2>
          <div className="lg:mb-16 lg:flex lg:items-center lg:justify-center lg:gap-20">
            <div>
              <CrewComp
                upper={windowWidth < 768}
                lower={windowWidth >= 768}
                {...crewData.crew[crewIndex]}
                imageUrl={imageUrlArray[crewIndex]}
              />
              <div className="mx-auto mt-6 w-fit md:mt-12 lg:mx-0">
                <ul className="flex justify-center gap-4 *:size-3 *:cursor-pointer *:rounded-full *:bg-zinc-400">
                  {crewData.crew.map((crew, index) => (
                    <li key={index} onClick={() => setCrewIndex(index)}>
                      {crewIndex === index && (
                        <motion.div
                          layoutId="dot"
                          className="size-3 rounded-full bg-white"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <CrewComp
                upper={windowWidth >= 768}
                lower={windowWidth < 768}
                {...crewData.crew[crewIndex]}
                imageUrl={imageUrlArray[crewIndex]}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="fixed top-0 left-0 flex min-h-screen w-full items-center justify-center">
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

export default Crew;
