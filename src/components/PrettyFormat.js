import InputField from "../components/InputField";
import CodeMirrorField from "./CodeMirrorField";
import { useContext } from "react";
import { IOContext } from "../context/IOContext";

function PrettyFormat({
  formatFunction,
  placeholder,
  title,
  inputType,
  inputIndex,
}) {
  const { data, updateInput, updateOutput, updateCheckbox } =
    useContext(IOContext);
  const input = data[inputIndex.toLowerCase()].input;
  const output = data[inputIndex.toLowerCase()].output;
  const checkbox = data[inputIndex.toLowerCase()].checkbox;

  const handleFormat = () => {
    try {
      const formatted = formatFunction(input, checkbox);
      updateOutput(inputIndex.toLowerCase(), formatted);
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
      {inputIndex.toLowerCase() === "xml" && (
        <div className="flex items-center space-x-2 pt-2">
          <input
            id="checkbox"
            type="checkbox"
            checked={checkbox}
            onChange={(e) =>
              updateCheckbox(inputIndex.toLowerCase(), e.target.checked)
            }
            className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="text-sm text-gray-100">
            Decode OrgMsg
          </label>
        </div>
      )}
      <button
        className="bg-blue-500 text-sm text-white py-1 px-2 rounded mt-4 hover:bg-blue-700"
        onClick={handleFormat}
      >
        Format
      </button>
      {output && (
        <div className="w-full mt-4">
          <CodeMirrorField string={output} inputType={inputType} />
        </div>
      )}
    </div>
  );
}

export default PrettyFormat;
