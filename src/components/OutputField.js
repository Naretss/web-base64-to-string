import React from "react";

function OutputField({ string }) {
  return (
    <textarea
      value={string}
      readOnly
      className="w-full h-24 p-2 border border-gray-300 rounded bg-zinc-700 text-white text-sm resize-y mt-4"
    />
  );
}

export default OutputField;
