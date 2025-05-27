// import React, { useState } from "react";
import InputField from "../components/InputField";
import OutputField from "../components/OutputField";
import { encodeData, decodeData } from "../utils/convert";
import { useContext } from "react";
import { IOContext } from "../context/IOContext";

const formats = ["ASCII", "UTF-8", "Base64", "Hex", "Binary"];

function EncoderDecoder() {
  const pageIndex = "base64";
  const {
    data,
    updateInput,
    updateOutput,
    updateInputFormat,
    updateOutputFormat,
  } = useContext(IOContext);
  const input = data[pageIndex.toLowerCase()].input;
  const output = data[pageIndex.toLowerCase()].output;
  const inputFormat = data[pageIndex.toLowerCase()].inputFormat;
  const outputFormat = data[pageIndex.toLowerCase()].outputFormat;

  const handleEncode = () => {
    try {
      const result = encodeData(input, outputFormat);
      updateOutput(pageIndex.toLowerCase(), result);
    } catch (e) {
      alert("Encoding failed: " + e.message);
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeData(input, inputFormat);
      updateOutput(pageIndex.toLowerCase(), result);
    } catch (e) {
      alert("Decoding failed: " + e.message);
    }
  };

  // const handleSwap = () => {
  //   updateInput(pageIndex.toLowerCase(), input);
  //   updateOutput(pageIndex.toLowerCase(), output);
  //   const temp = inputFormat;
  //   updateInputFormat(pageIndex.toLowerCase(), outputFormat);
  //   updateOutputFormat(pageIndex.toLowerCase(), temp);
  // };

  return (
    <div className="flex flex-col items-center mx-auto p-4 w-full max-w-2xl text-white">
      <div className="flex flex-row justify-between items-center w-full mb-4">
        <h1 className="text-lg font-medium">Encoder / Decoder</h1>

        <div className="flex items-center space-x-2">
          <label className="text-sm whitespace-nowrap">Input Format:</label>
          <select
            value={inputFormat}
            onChange={(e) =>
              updateInputFormat(pageIndex.toLowerCase(), e.target.value)
            }
            className="p-1 px-2 border border-gray-300 rounded bg-zinc-700 text-white text-xs"
          >
            {formats.map((fmt) => (
              <option key={fmt}>{fmt}</option>
            ))}
          </select>
        </div>
      </div>

      <InputField
        value={input}
        onChange={(e) => updateInput(pageIndex.toLowerCase(), e.target.value)}
        placeholder="Enter text or encoded string"
      />

      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleDecode}
          className="bg-blue-600 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        >
          Decode
        </button>
        <button
          onClick={handleEncode}
          className="bg-green-600 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-green-700"
        >
          Encode
        </button>
        {/* <button
          onClick={handleSwap}
          className="bg-gray-600 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-gray-700"
        >
          Swap
        </button> */}
      </div>

      <div className="flex flex-row justify-between items-center w-full mb-1">
        <h1 className="text-lg font-medium">Output</h1>

        <div className="flex items-center space-x-2">
          <label className="text-sm whitespace-nowrap">Output Format:</label>
          <select
            value={outputFormat}
            onChange={(e) =>
              updateOutputFormat(pageIndex.toLowerCase(), e.target.value)
            }
            className="p-1 px-2 border border-gray-300 rounded bg-zinc-700 text-white text-xs"
          >
            {formats.map((fmt) => (
              <option key={fmt}>{fmt}</option>
            ))}
          </select>
        </div>
      </div>

      <OutputField string={output} />
    </div>
  );
}

export default EncoderDecoder;
