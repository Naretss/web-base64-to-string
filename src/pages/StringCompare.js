import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ReactDiffViewer from "react-diff-viewer-continued";
import { useTheme } from "../components/ThemeProvider";

function StringCompare() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [compareType, setCompareType] = useState("string");
  const [showDiff, setShowDiff] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const isDarkMode = React.useMemo(() => {
    return theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, [theme]);

  const compareMethod = React.useMemo(() => {
    return compareType === "string" ? "diffChars" : "diffLines";
  }, [compareType]);

  const handleCompare = () => {
    setError(null);
    setShowDiff(true);
  };

  const handleClear = () => {
    setInput1("");
    setInput2("");
    setShowDiff(false);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>String/JSON/XML Compare</CardTitle>
        <CardDescription>Compare two strings, JSON, or XML documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end">
          <Select value={compareType} onValueChange={setCompareType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparison type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input1">Input 1</Label>
            <Textarea
              id="input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter first string, JSON, or XML"
              className="h-96"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input2">Input 2</Label>
            <Textarea
              id="input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter second string, JSON, or XML"
              className="h-96"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={handleCompare}>Compare</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>
        {showDiff && (
          <div className="space-y-2">
            <Label>Differences</Label>
            {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            <ReactDiffViewer
              oldValue={input1}
              newValue={input2}
              splitView={true}
              compareMethod={compareMethod}
              useDarkTheme={isDarkMode}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StringCompare;