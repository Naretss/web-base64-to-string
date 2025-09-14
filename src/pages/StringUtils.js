import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../components/ui/separator";
import { toOneLine } from "@/utils/format";

function StringUtils() {
  const [input, setInput] = useState("");
  const [oneLineOutput, setOneLineOutput] = useState("");

  const charCount = input.length;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const lineCount = input.split(/\r\n|\r|\n/).length;

  const handleClear = () => {
    setInput("");
    setOneLineOutput("");
  };

  const handleToOneLine = () => {
    setOneLineOutput(toOneLine(input));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>String Utilities</CardTitle>
        <CardDescription>A collection of useful string utilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text"
            className="h-48"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span>Characters: {charCount}</span>
              <span className="mx-2">|</span>
              <span>Words: {wordCount}</span>
              <span className="mx-2">|</span>
              <span>Lines: {lineCount}</span>
            </div>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">String to One Line</h3>
          <Textarea
            id="one-line-output"
            value={oneLineOutput}
            readOnly
            placeholder="One line output"
            className="h-24"
          />
          <Button onClick={handleToOneLine}>Convert to One Line</Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default StringUtils;
