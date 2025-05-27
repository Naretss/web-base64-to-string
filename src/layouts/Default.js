import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Default = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-y-hidden">
      <Header />
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Default;
