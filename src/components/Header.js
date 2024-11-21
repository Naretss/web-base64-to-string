import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { path: "/", label: "Base64 Decode" },
    { path: "/pretty-xml", label: "Pretty Format XML" },
    { path: "/pretty-json", label: "Pretty Format JSON" },
  ];

  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  return (
    <header>
      <div className="text-3xl font-mono font-bold mb-1">String Utilities</div>
      <div className="text-xs mb-2 font-extralight">Encode / Decode / Format</div>
      <nav>
        <ul className="flex justify-center space-x-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => setActivePath(link.path)}
                className={`text-blue-500 hover:text-blue-300 transition-all duration-100 ease-in-out 
                  ${activePath === link.path ? "text-blue-200" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
