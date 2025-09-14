import React from "react";
import Layout from "./layouts/Default";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Base64Decode from "./pages/Base64Decode";
import PrettyFormatXML from "./pages/PrettyFormatXML";
import PrettyFormatJSON from "./pages/PrettyFormatJSON";
import StringUtils from "./pages/StringUtils";
import HashGenerator from "./pages/HashGenerator";
import StringCompare from "./pages/StringCompare";
import ISO8583Decoder from "./pages/ISO8583Decoder";

import { ThemeProvider } from "./components/ThemeProvider";
import { IOProvider } from "./context/IOContext";

import AvararGen from "./pages/AvatarGen";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <IOProvider>
        <BrowserRouter basename="/web-base64-to-string">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Base64Decode />} />
              <Route path="pretty-xml" element={<PrettyFormatXML />} />
              <Route path="pretty-json" element={<PrettyFormatJSON />} />
              <Route path="avatar-gen" element={<AvararGen />} />
              <Route path="string-utils" element={<StringUtils />} />
              <Route path="hash-generator" element={<HashGenerator />} />
              <Route path="string-compare" element={<StringCompare />} />
              <Route path="iso8583-decoder" element={<ISO8583Decoder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IOProvider>
    </ThemeProvider>
  );
}

export default App;