import React, { useState } from "react";

import InputField from "../components/InputField";
import OutputField from "../components/OutputField";
import { formatXML } from "../utils/format";

function PrettyFormatXML() {
  const [xml, setXml] = useState("");
  const [formattedXml, setFormattedXml] = useState("");

  const handleFormat = () => {
    setFormattedXml(formatXML(xml));
  };

  return (
    <div className="text-left max-w-xl mx-auto p-4">
      <h1 className="text-lg font-medium mb-4">Pretty Format JSON</h1>
      <InputField
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        placeholder="Enter XML"
      />
      <button
        className="bg-blue-500 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>

      {formattedXml && <OutputField string={formattedXml} />}
    </div>
  );
}

export default PrettyFormatXML;
