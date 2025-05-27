import React, { useState } from "react";
import InputField from "../components/InputField";
import OutputField from "../components/OutputField";
import { useContext } from "react";
import { IOContext } from "../context/IOContext";

function PrettyFormat({ formatFunction, placeholder, title, inputType, inputIndex }) {
  const { data, updateInput, updateOutput } = useContext(IOContext);
  const input = data[inputIndex.toLowerCase()].input;
  const output = data[inputIndex.toLowerCase()].output;

  const handleFormat = () => {
    try {
      const formatted = formatFunction(input);
      updateOutput(inputType.toLowerCase(), formatted);
    } catch (error) {
      alert("Invalid input string");
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full max-w-2xl">
      <h1 className="text-lg self-start font-medium mb-4">{title}</h1>

      <InputField
        value={input}
        onChange={(e) => updateInput(inputIndex.toLowerCase(), e.target.value)}
        placeholder={placeholder}
      />
      <button
        className="bg-blue-500 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>
      {output && (
        <div className="w-full mt-4">
          <OutputField string={output} inputType={inputType} />
        </div>
      )}
    </div>
  );
}

export default PrettyFormat;
