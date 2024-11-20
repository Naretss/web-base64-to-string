import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Base64Decode from "./pages/Base64Decode";
import PrettyFormatXML from "./pages/PrettyFormatXML";
import PrettyFormatJSON from "./pages/PrettyFormatJSON";
import logo from "./img/icons8-facebook-32.png";
// import "./App.css";

function App() {
  return (
    <Router>
      <div className="App text-center p-5 text-white bg-black min-h-screen">
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700">
                Base64 Decode
              </Link>
            </li>
            <li>
              <Link
                to="/pretty-xml"
                className="text-blue-500 hover:text-blue-700"
              >
                Pretty Format XML
              </Link>
            </li>
            <li>
              <Link
                to="/pretty-json"
                className="text-blue-500 hover:text-blue-700"
              >
                Pretty Format JSON
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Base64Decode />} />
            <Route path="/pretty-xml" element={<PrettyFormatXML />} />
            <Route path="/pretty-json" element={<PrettyFormatJSON />} />
          </Routes>
        </div>

        <footer className="footer mt-16 p-4 text-center text-white">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm text-gray-500">contributor</div>
            <a
              href="https://www.facebook.com/profile.php?id=100001005871414"
              className="flex items-center space-x-2"
            >
              <img src={logo} className="h-8 w-8" alt="Logo" />
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
