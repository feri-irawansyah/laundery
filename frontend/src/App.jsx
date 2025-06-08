import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import About from "./components/About";
import Home from "./components/Home";
import Services from "./components/Services";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
