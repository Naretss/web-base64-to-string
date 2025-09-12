import { useContext, useState } from "react";
import { IOContext } from "../../context/IOContext";
import { encodeData, decodeData } from "../../utils/convert";
import { formats } from "../../config";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import OutputField from "../../components/OutputField";

function EncoderDecoder({ pageIndex, title }) {
  const { data, updateInput, updateOutput, updateInputFormat, updateOutputFormat } = useContext(IOContext);
  const { input, output, inputFormat, outputFormat } = data[pageIndex.toLowerCase()];
  const [isLoading, setIsLoading] = useState(false);

  const handleEncode = () => {
    setIsLoading(true);
    try {
      const result = encodeData(input, outputFormat);
      updateOutput(pageIndex.toLowerCase(), result);
    } catch (e) {
      alert("Encoding failed: " + e.message);
    }
    setIsLoading(false);
  };

  const handleDecode = () => {
    setIsLoading(true);
    try {
      const result = decodeData(input, inputFormat);
      updateOutput(pageIndex.toLowerCase(), result);
    } catch (e) {
      alert("Decoding failed: " + e.message);
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    updateInput(pageIndex.toLowerCase(), "");
    updateOutput(pageIndex.toLowerCase(), "");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateInput(pageIndex.toLowerCase(), e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">{title}</h1>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-lg font-medium text-text-primary">Input</label>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text-secondary">Format:</label>
              <select
                value={inputFormat}
                onChange={(e) => updateInputFormat(pageIndex.toLowerCase(), e.target.value)}
                className="p-1 px-2 border border-base-300 rounded bg-base-100 text-text-primary text-xs"
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
            placeholder="Enter text or drop a file"
          />
          <div className="mt-4 flex items-center justify-between">
            <input type="file" onChange={handleFileChange} className="text-sm text-text-secondary" />
            <Button onClick={handleClear} variant="tertiary">Clear</Button>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
            <Button onClick={handleDecode} variant="primary" disabled={isLoading}>
            {isLoading ? "Decoding..." : "Decode"}
            </Button>
            <Button onClick={handleEncode} variant="secondary" disabled={isLoading}>
            {isLoading ? "Encoding..." : "Encode"}
            </Button>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-lg font-medium text-text-primary">Output</label>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text-secondary">Format:</label>
              <select
                value={outputFormat}
                onChange={(e) => updateOutputFormat(pageIndex.toLowerCase(), e.target.value)}
                className="p-1 px-2 border border-base-300 rounded bg-base-100 text-text-primary text-xs"
              >
                {formats.map((fmt) => (
                  <option key={fmt}>{fmt}</option>
                ))}
              </select>
            </div>
          </div>
          <OutputField string={output} />
        </div>
      </div>
    </div>
  );
}

export default EncoderDecoder;
