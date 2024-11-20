import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierLakesideDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function OutputField({ string }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl mb-2">Decoded String</h2>
      <div className="text-sm rounded-lg">
        <SyntaxHighlighter language="xml" style={atelierLakesideDark}>
          {string}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default OutputField;
