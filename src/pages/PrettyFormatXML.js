import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function PrettyFormatXML() {
  const [xml, setXml] = useState("");
  const [formattedXml, setFormattedXml] = useState("");

  const formatXML = (xmlString) => {
    const PADDING = "  ";
    const reg = /(>)(<)(\/*)/g;
    const xml = xmlString.replace(reg, "$1\n$2$3");
    let formatted = "";
    let pad = 0;

    xml.split("\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      formatted += PADDING.repeat(pad) + node + "\n";
      pad += indent;
    });

    return formatted.trim();
  };

  const handleFormat = () => {
    setFormattedXml(formatXML(xml));
  };

  return (
    <div className="text-left max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Pretty Format XML</h1>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded bg-gray-800 text-white"
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        placeholder="Enter XML"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>
      {formattedXml && (
        <div className="output-container mt-8">
          <h2 className="text-xl mb-2">Formatted XML</h2>
          <SyntaxHighlighter language="xml" style={atelierLakesideDark}>
            {formattedXml}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default PrettyFormatXML;
