import React from "react";
import logo from "../img/icons8-facebook-32.png";

const Footer = () => {
  return (
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
  );
};

export default Footer;
