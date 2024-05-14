import React, { useState, useEffect } from "react";
import { Navbar } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="text-[#D0D6F9]">
      <Navbar windowWidth={windowWidth} />
      <Outlet context={{ windowWidth }} />
    </div>
  );
}

export default App;
