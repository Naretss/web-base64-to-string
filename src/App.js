import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layouts/Default";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router basename="/web-base64-to-string">
      <Layout>
        <MainPage />
      </Layout>
    </Router>
  );
}

export default App;
