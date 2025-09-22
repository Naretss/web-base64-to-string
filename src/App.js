import React, { lazy, Suspense } from "react";
import Layout from "./layouts/Default";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import { IOProvider } from "./context/IOContext";

const Base64Decode = lazy(() => import("./pages/Base64Decode"));
const PrettyFormatXML = lazy(() => import("./pages/PrettyFormatXML"));
const PrettyFormatJSON = lazy(() => import("./pages/PrettyFormatJSON"));
const StringUtils = lazy(() => import("./pages/StringUtils"));
const HashGenerator = lazy(() => import("./pages/HashGenerator"));
const StringCompare = lazy(() => import("./pages/StringCompare"));
const ISO8583Decoder = lazy(() => import("./pages/ISO8583Decoder"));
const AvatarGen = lazy(() => import("./pages/AvatarGen"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <IOProvider>
        <BrowserRouter basename="/web-base64-to-string">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Base64Decode />} />
                <Route path="pretty-xml" element={<PrettyFormatXML />} />
                <Route path="pretty-json" element={<PrettyFormatJSON />} />
                <Route path="avatar-gen" element={<AvatarGen />} />
                <Route path="string-utils" element={<StringUtils />} />
                <Route path="hash-generator" element={<HashGenerator />} />
                <Route path="string-compare" element={<StringCompare />} />
                <Route path="iso8583-decoder" element={<ISO8583Decoder />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </IOProvider>
    </ThemeProvider>
  );
}

export default App;