import React, { useState } from "react";

import InputField from "../components/InputField";
import OutputField from "../components/OutputField";
import { formatXML } from "../utils/format";

function Base64Decode() {
  const [base64, setBase64] = useState("");
  const [string, setString] = useState("");

  const handleConvert = () => {
    try {
      const decodedString = base64ToUtf8(base64);

      const formattedString = formatXML(decodedString);

      setString(formattedString);
    } catch (error) {
      alert("Invalid Base64 string");
    }
  };

  const base64ToUtf8 = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedString = new TextDecoder("utf-8").decode(bytes);
    return decodedString;
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4">
      <h1 className="text-lg self-start font-medium mb-4">Base64 Decode</h1>
      <InputField value={base64} onChange={(e) => setBase64(e.target.value)} placeholder="Enter Base64" />
      <button
        className="bg-blue-500 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        onClick={handleConvert}
      >
        Decode
      </button>
      {string && <OutputField string={string} />}
    </div>
  );
}

export default Base64Decode;
