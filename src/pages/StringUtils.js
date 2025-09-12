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

function StringUtils() {
  const [input, setInput] = useState("");

  const charCount = input.length;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
  const lineCount = input.split(/\r\n|\r|\n/).length;

  const handleClear = () => {
    setInput("");
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
      </CardContent>
    </Card>
  );
}

export default StringUtils;
