import React from "react";
import "pattern.css/dist/pattern.css";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import Technology from "./routes/Technology";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tech/:technology" element={<Technology />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>Page Not Found: 404</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);
