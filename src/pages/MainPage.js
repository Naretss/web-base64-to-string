import React from "react";
import { Routes, Route } from "react-router-dom";
import Base64Decode from "./Base64Decode";
import PrettyFormatXML from "./PrettyFormatXML";
import PrettyFormatJSON from "./PrettyFormatJSON";

const MainPage = () => {
  return (
    <Routes>
      <Route index element={<Base64Decode />} />
      <Route path="/pretty-xml" element={<PrettyFormatXML />} />
      <Route path="/pretty-json" element={<PrettyFormatJSON />} />
    </Routes>
  );
};

export default MainPage;
