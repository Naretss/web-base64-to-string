import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function PrettyFormatJSON() {
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");

  const handleFormat = () => {
    try {
      const jsonObject = JSON.parse(json);
      setFormattedJson(JSON.stringify(jsonObject, null, 2));
    } catch (error) {
      alert("Invalid JSON string");
    }
  };

  return (
    <div className="text-left max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Pretty Format JSON</h1>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded bg-gray-800 text-white"
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder="Enter JSON"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>
      {formattedJson && (
        <div className="output-container mt-8">
          <h2 className="text-xl mb-2">Formatted JSON</h2>
          <SyntaxHighlighter language="json" style={atelierLakesideDark}>
            {formattedJson}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default PrettyFormatJSON;
