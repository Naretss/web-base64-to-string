import React from "react";
import Layout from "./layouts/Default";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Base64Decode from "./pages/Base64Decode";
import PrettyFormatXML from "./pages/PrettyFormatXML";
import PrettyFormatJSON from "./pages/PrettyFormatJSON";

import { IOProvider } from "./context/IOContext";

import './App.css';

function App() {
  return (
    <IOProvider>
      <BrowserRouter basename="/web-base64-to-string">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Base64Decode />} />
            <Route path="pretty-xml" element={<PrettyFormatXML />} />
            <Route path="pretty-json" element={<PrettyFormatJSON />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IOProvider>
  );
}

export default App;
