import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { EditorView } from "@codemirror/view";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { keymap } from "@codemirror/view";

function CodeMirrorField({ string, inputType }) {
  const isJson = () => {
    try {
      JSON.parse(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="rounded-md w-full h-full overflow-auto">
      <div className="text-sm rounded-lg break-words whitespace-pre-wrap h-full">
        <CodeMirror
          value={string}
          height="100%"
          width="100%"
          readOnly={true}
          theme="dark"
          extensions={[
            inputType && inputType.toUpperCase() === "JSON" ? json() : xml(),
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