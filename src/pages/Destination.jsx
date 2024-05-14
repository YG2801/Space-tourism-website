import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import bgMobile from "../assets/background-destination-mobile.jpg";
import bgTablet from "../assets/background-destination-tablet.jpg";
import bgDesktop from "../assets/background-destination-desktop.jpg";
import { DestinationNavbar, DestinationComp } from "../components";
import firebaseService from "../firebase/service";
import { motion } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";

function Destination() {
  const [destinationData, setDestinationData] = useState(null);
  const [activeDestinationData, setActiveDestinationData] = useState(null);
  const [image, setImage] = useState(null);
  const { place } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!place) navigate("/destination/moon");
  }, []);

  const { windowWidth } = useOutletContext();

  useEffect(() => {
    async function fetchData() {
      const data = await firebaseService.getDocument(
        "space-app",
        "destinations",
      );
      setDestinationData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (destinationData) {
      async function fetchActive() {
        const activeData = destinationData.destinations.find(
          (destination) => destination.name.toLowerCase() === place,
        );
        const url = await firebaseService.getImageURL(activeData.images.webp);
        setImage(url);
        setActiveDestinationData(activeData);
      }
      fetchActive();
    }
  }, [destinationData, place]);

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
      {!activeDestinationData ? (
        <div className="fixed left-0 top-0 flex min-h-screen w-full items-center justify-center">
          <InfinitySpin
            visible={true}
            width="200"
            color="#1e4c77"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center font-barlow-condensed uppercase tracking-widest text-white md:mx-6 md:mt-4 md:text-start md:text-xl lg:mx-20"
          >
            <span className="mr-3 font-bold opacity-25">01</span> Pick your
            destination
          </motion.h2>
          <div className="lg:flex lg:items-center lg:justify-center lg:gap-28">
            <div>
              <DestinationComp upper image={image} />
            </div>
            <div>
              <DestinationNavbar />
              <DestinationComp
                lower
                activeDestinationData={activeDestinationData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Destination;
