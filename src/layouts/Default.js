import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Default = ({ children }) => {
  return (
    <div className="App p-5 text-white bg-black min-h-screen">
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Default;
