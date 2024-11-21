import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import beautify from "js-beautify";

function OutputField({ string }) {
  const beautifyJson = (str) => {
    try {
      return beautify.js(JSON.stringify(JSON.parse(str)), { indent_size: 2 }); // Beautify with 2-space indent
    } catch (e) {
      return str;
    }
  };

  const beautifyXml = (str) => {
    try {
      return beautify.html(str, { indent_size: 2 }); // Beautify XML with 2-space indent
    } catch (e) {
      return str;
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
    return /^<\?xml/.test(string);
  };

  const beautifiedString = isJson() ? beautifyJson(string) : isXml() ? beautifyXml(string) : string;

  return (
    <div className="mt-8 rounded-md overflow-hidden">
      <div className="text-sm rounded-lg">
        {isJson() || isXml() ? (
          <CodeMirror
            value={beautifiedString}
            height="auto"
            width="800px"
            extensions={[isJson() ? json() : xml()]} 
            readOnly={true}
            theme="dark" 
            onChange={(value) => console.log("Content changed:", value)}
          />
        ) : (
          <pre>{string}</pre>
        )}
      </div>
    </div>
  );
}

export default OutputField;
