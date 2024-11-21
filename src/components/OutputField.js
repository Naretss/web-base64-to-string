import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import beautify from "js-beautify"; // Import js-beautify

function OutputField({ string }) {
  // Beautify JSON or XML using js-beautify
  const beautifyJson = (str) => {
    try {
      return beautify.js(JSON.stringify(JSON.parse(str)), { indent_size: 2 }); // Beautify JSON with 2-space indentation
    } catch (e) {
      return str; // Return original string if it's not valid JSON
    }
  };

  const beautifyXml = (str) => {
    try {
      return beautify.html(str, { indent_size: 2 }); // Beautify XML with 2-space indentation
    } catch (e) {
      return str; // Return original string if it's not valid XML
    }
  };

  const isJson = () => {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isXml = () => {
    // Check if string starts with XML tags (basic check)
    return /^<\?xml/.test(string);
  };

  // Beautify the string based on its type
  const beautifiedString = isJson() ? beautifyJson(string) : isXml() ? beautifyXml(string) : string;

  return (
    <div className="mt-8 rounded-md overflow-hidden">
      <div className="text-sm rounded-lg">
        {isJson() || isXml() ? (
          <CodeMirror
            value={beautifiedString} // Pass the beautified string to CodeMirror
            height="auto"
            width="800px"
            extensions={[isJson() ? json() : xml()]} // Use JSON or XML language mode
            readOnly={true} // Make it read-only
            theme="dark" // Optional theme
            onChange={(value) => console.log("Content changed:", value)} // Handle content changes (if needed)
          />
        ) : (
          <pre>{string}</pre> // If it's neither JSON nor XML, show plain text
        )}
      </div>
    </div>
  );
}

export default OutputField;
