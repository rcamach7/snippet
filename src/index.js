import React from "react";
import "pattern.css/dist/pattern.css";
import ReactDOM from "react-dom";
import Technology from "./routes/Technology";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/snippet" element={<Home />} />
      <Route path="/snippet/:technology" element={<Technology />} />
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
