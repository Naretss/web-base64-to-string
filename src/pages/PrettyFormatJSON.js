import React, { useState } from "react";
import InputField from "../components/InputField";
import OutputField from "../components/OutputField";

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
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4">
      <h1 className="text-lg self-start font-medium mb-4">Pretty Format JSON</h1>
      <InputField value={json} onChange={(e) => setJson(e.target.value)} placeholder="Enter JSON" />
      <button
        className="bg-blue-500 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>

      {formattedJson && <OutputField string={formattedJson} />}
    </div>
  );
}

export default PrettyFormatJSON;
