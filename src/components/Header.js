import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { path: "/", label: "Base64" },
    { path: "/pretty-xml", label: "XML Formatter" },
    { path: "/pretty-json", label: "JSON Formatter" },
    { path: "/avatar-gen", label: "Avatar Generator" },
  ];

  const location = useLocation();

  return (
    <header className="bg-base-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-2xl font-bold text-text-primary">
              DevTools
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-base-300 hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;