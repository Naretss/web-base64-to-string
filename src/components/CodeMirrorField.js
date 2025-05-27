import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { EditorView } from "@codemirror/view";
import beautify from "js-beautify";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { keymap } from "@codemirror/view";

function CodeMirrorField({ string, inputType }) {
  const beautifyJson = (str) => {
    try {
      return beautify.js(JSON.stringify(JSON.parse(str)), { indent_size: 2 });
    } catch (e) {
      return str;
    }
  };

  const beautifyXml = (str) => {
    try {
      return beautify.html(str, { indent_size: 2 });
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

  const beautifiedString =
    inputType === "JSON"
      ? beautifyJson(string)
      : inputType === "XML"
        ? beautifyXml(string)
        : string;

  return (
    <div className="mt-4 rounded-md w-full overflow-x-hidden">
      <div className="text-sm rounded-lg break-words whitespace-pre-wrap">
        <CodeMirror
          value={beautifiedString}
          height="auto"
          width="100%"
          readOnly={true}
          theme="dark"
          extensions={[
            isJson() ? json() : xml(),
            EditorView.lineWrapping,
            highlightSelectionMatches(),
            keymap.of(searchKeymap),
          ]}
        />
      </div>
    </div>
  );
}

export default CodeMirrorField;
