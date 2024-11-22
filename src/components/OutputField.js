import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import beautify from "js-beautify";

function OutputField({ string, inputType }) {
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

  // const isXml = () => {
  //   // Check if string starts with XML tags (basic check)
  //   return /^<\?xml/.test(string);
  // };

  // Beautify the string based on its type
  // const beautifiedString = isJson()
  //   ? beautifyJson(string)
  //   : isXml()
  //     ? beautifyXml(string)
  //     : string;

  const beautifiedString =
    inputType === "JSON"
      ? beautifyJson(string)
      : inputType === "XML"
        ? beautifyXml(string)
        : string;

  return (
    <div className="mt-8 rounded-md overflow-hidden">
      <div className="text-sm rounded-lg">
        <CodeMirror
          value={beautifiedString}
          height="auto"
          width="800px"
          extensions={[isJson() ? json() : xml()]}
          readOnly={true}
          theme="dark"
          onChange={(value) => console.log("Content changed:", value)}
        />
      </div>
    </div>
  );
}

export default OutputField;
