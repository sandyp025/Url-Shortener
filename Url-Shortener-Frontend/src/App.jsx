
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
