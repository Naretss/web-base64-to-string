import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Base64Decode from "./pages/Base64Decode";
import PrettyFormatXML from "./pages/PrettyFormatXML";
import PrettyFormatJSON from "./pages/PrettyFormatJSON";
import logo from "./img/icons8-facebook-32.png";

function App() {
  return (
    <Router>
      <div className="App text-center p-5 text-white bg-black min-h-screen">
        <div className="text-3xl font-mono font-bold mb-1">
          String Utilities
        </div>
        <div className="text-xs mb-2 font-extralight">
          Encode / Decode / Format
        </div>
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
            <div className="text-sm text-gray-500">Contributors</div>
            <div className="flex space-x-8">
              <div className="flex flex-col items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=100001005871414"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2"
                >
                  <img src={logo} className="h-7 w-7 rounded-full" alt="Logo" />
                </a>
                <span className="text-xs">Narets Ng</span>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://github.com/pisichi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2"
                >
                  <img
                    src={`https://github.com/identicons/pisichi.png?size=10`}
                    className="h-7 w-7 rounded-full"
                    alt="Logo"
                  />
                </a>
                <span className="text-xs">Win Pisi</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
