import React, { useState } from "react";
import "./App.css";
import logo from "./img/icons8-facebook-32.png";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function App() {
  const [base64, setBase64] = useState("");
  const [string, setString] = useState("");

  const formatXML = (xmlString) => {
    const PADDING = "  "; // ใช้สำหรับเว้นวรรค
    const reg = /(>)(<)(\/*)/g;
    const xml = xmlString.replace(reg, "$1\n$2$3");
    let formatted = "";
    let pad = 0;

    xml.split("\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0; // Node อยู่ในบรรทัดเดียว
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1; // Node ปิด
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1; // Node เปิด
      } else {
        indent = 0;
      }

      formatted += PADDING.repeat(pad) + node + "\n\n";
      pad += indent;
    });

    return formatted.trim();
  };

  const handleConvert = () => {
    try {
      const decodedString = base64ToUtf8(base64);
      let formattedString = decodedString;

      // Check if the decoded string is JSON
      try {
        const jsonObject = JSON.parse(decodedString);
        formattedString = JSON.stringify(jsonObject, null, 2); // Format JSON with 2 spaces indentation
      } catch (e) {
        // ถ้าไม่ใช่ JSON ให้จัด XML Format
        formattedString = formatXML(decodedString);
      }

      setString(formattedString);
    } catch (error) {
      alert("Invalid Base64 string");
    }
  };

  function base64ToUtf8(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedString = new TextDecoder("utf-8").decode(bytes);
    return decodedString;
  }
  return (
    <div className="App">
      <h1>Base64 Decode</h1>
      <p>Decode Base64 string or use the Base64 to File tool for large files</p>
      <div className="input-container">
        <h2>Base64 Input</h2>

        <textarea
          id="base64-input"
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          placeholder="Enter Base64"
        />
      </div>
      <button onClick={handleConvert}>Decode</button>
      {string && (
        <div className="output-container">
          <h2>Decoded String</h2>
          <SyntaxHighlighter language="xml" style={atelierLakesideDark}>
            {string}
          </SyntaxHighlighter>
        </div>
      )}
      <footer className="footer">
        <p>Narets Ng</p>
        <a href="https://www.facebook.com/profile.php?id=100001005871414">
          <img src={logo} className="logo" alt="Logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
