import { useContext, useState } from "react";
import { IOContext } from "../../context/IOContext";
import { format } from "../../utils/format";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import OutputField from "../../components/OutputField";

function PrettyFormatter({ pageIndex, title, formatter }) {
  const { data, updateInput, updateOutput, updateCheckbox } = useContext(IOContext);
  const { input, output, checkbox } = data[pageIndex.toLowerCase()];
  const [isLoading, setIsLoading] = useState(false);

  const handleFormat = () => {
    setIsLoading(true);
    try {
      const formatted = format(formatter, input, checkbox);
      updateOutput(pageIndex.toLowerCase(), formatted);
    } catch (error) {
      alert("Invalid input string");
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
      <div className="flex flex-col gap-6">
        <div>
          <label className="text-lg font-medium text-text-primary">Input</label>
          <InputField
            value={input}
            onChange={(e) => updateInput(pageIndex.toLowerCase(), e.target.value)}
            placeholder={`Enter ${formatter.toUpperCase()} or drop a file`}
          />
          <div className="mt-4 flex items-center justify-between">
            <input type="file" onChange={handleFileChange} className="text-sm text-text-secondary" />
            <Button onClick={handleClear} variant="tertiary">
              Clear
            </Button>
          </div>
          {pageIndex.toLowerCase() === "xml" && (
            <div className="flex items-center space-x-2 pt-2">
              <input
                id="checkbox"
                type="checkbox"
                checked={checkbox}
                onChange={(e) => updateCheckbox(pageIndex.toLowerCase(), e.target.checked)}
                className="h-4 w-4 text-primary bg-base-100 border-base-300 rounded focus:ring-primary"
              />
              <label htmlFor="checkbox" className="text-sm text-text-secondary">
                Decode OrgMsg
              </label>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={handleFormat} variant="primary" disabled={isLoading}>
            {isLoading ? "Formatting..." : "Format"}
          </Button>
        </div>
        <div>
          <label className="text-lg font-medium text-text-primary">Output</label>
          <OutputField string={output} inputType={formatter} />
        </div>
      </div>
    </div>
  );
}

export default PrettyFormatter;
