import { useState, useContext } from "react";
import { format } from "../../utils/format";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import CodeMirrorField from "../../components/CodeMirrorField";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { IOContext } from "../../context/IOContext";

function PrettyFormatter({ pageIndex, title, formatter }) {
  const { data, updateInput, updateOutput, updateCheckbox } = useContext(IOContext);
  const { input, output, checkbox } = data[pageIndex];
  const [isLoading, setIsLoading] = useState(false);
  const [isOutputVisible, setIsOutputVisible] = useState(true);
  const [error, setError] = useState(null);

  const withLoadingAndErrorHandling = (fn) => async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
      updateOutput(pageIndex, "");
    }
    setIsLoading(false);
  };

  const handleFormat = withLoadingAndErrorHandling(() => {
    const formatted = format(formatter, input, checkbox);
    updateOutput(pageIndex, formatted);
  });

  const handleClear = () => {
    updateInput(pageIndex, "");
    updateOutput(pageIndex, "");
    setError(null); // Clear error on clear
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Format {formatter.toUpperCase()} data to be more readable</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => {
              updateInput(pageIndex, e.target.value);
              setError(null); // Clear error on input change
            }}
            placeholder={`Enter ${formatter.toUpperCase()} data`}
            className="h-50"
          />
          {pageIndex.toLowerCase() === "xml" && (
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="checkbox"
                checked={checkbox}
                onCheckedChange={(checked) => updateCheckbox(pageIndex, checked)}
              />
              <Label htmlFor="checkbox" className="text-sm">
                Decode OrgMsg
              </Label>
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={handleFormat} disabled={isLoading}>
            {isLoading ? "Formatting..." : "Format"}
          </Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="output">Output</Label>
            <div>
              <Button onClick={handleCopy} variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsOutputVisible(!isOutputVisible)}
                variant="ghost"
                size="icon"
              >
                {isOutputVisible ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}
          {isOutputVisible && (
            <div className="h-96">
              <CodeMirrorField string={output} inputType={formatter} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PrettyFormatter;