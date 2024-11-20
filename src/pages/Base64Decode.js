import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Base64Decode() {
  const [base64, setBase64] = useState("");
  const [string, setString] = useState("");

  const handleConvert = () => {
    try {
      const decodedString = base64ToUtf8(base64);

      const formattedString = formatXML(decodedString);

      setString(formattedString);
    } catch (error) {
      alert("Invalid Base64 string");
    }
  };

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

  const base64ToUtf8 = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedString = new TextDecoder("utf-8").decode(bytes);
    return decodedString;
  };

  return (
    <div className="text-left max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Base64 Decode</h1>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded bg-gray-800 text-white text-sm"
        value={base64}
        onChange={(e) => setBase64(e.target.value)}
        placeholder="Enter Base64"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
        onClick={handleConvert}
      >
        Decode
      </button>
      {string && (
        <div className="mt-8">
          <h2 className="text-xl mb-2">Decoded String</h2>
          <div className="text-sm">
            <SyntaxHighlighter language="xml" style={atelierLakesideDark}>
              {string}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}

export default Base64Decode;
