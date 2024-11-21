import React from "react";
import { Route, Routes } from "react-router-dom";

import Base64Decode from "./Base64Decode";
import PrettyFormatXML from "./PrettyFormatXML";
import PrettyFormatJSON from "./PrettyFormatJSON";

const MainPage = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Base64Decode />} />
        <Route path="pretty-xml" element={<PrettyFormatXML />} />
        <Route path="pretty-json" element={<PrettyFormatJSON />} />
      </Route>
    </Routes>
  );
};

export default MainPage;
