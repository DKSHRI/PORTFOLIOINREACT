import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./assets/component/Navbar";
import About from "./assets/component/About";
import Project from "./assets/component/Project";
import Leetcode from "./assets/component/Leetcode";
import Contact from "./assets/component/Contact";
import Home from "./assets/component/Home";
import Footer from "./assets/component/Footer";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> }, // alias for home
  { path: "/about", element: <About /> },
  { path: "/projects", element: <Project /> },
  { path: "/Leetcode-Live", element: <Leetcode /> },
  { path: "/contact", element: <Contact /> },
  
];

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        
        ))}
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
