import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} DevTools. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/pisichi/web-base64-to-string"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-primary"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;