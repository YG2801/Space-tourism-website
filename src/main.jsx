import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="destination" element={<Destination />} />
        <Route path="destination/:place" element={<Destination />} />
        <Route path="crew" element={<Crew />} />
        <Route path="technology" element={<Technology />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
