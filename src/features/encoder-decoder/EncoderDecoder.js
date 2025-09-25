import { useState, useContext } from "react";
import { encodeData, decodeData } from "../../utils/convert";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { IOContext } from "../../context/IOContext";

const formats = ["UTF-8", "Hex", "Binary"];

function EncoderDecoder({ pageIndex, title }) {
  const {
    data,
    updateInput,
    updateOutput,
    updateInputFormat,
    updateOutputFormat,
  } = useContext(IOContext);
  const { input, output, inputFormat, outputFormat } = data[pageIndex];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const withLoadingAndErrorHandling = (fn) => async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };

  const handleEncode = withLoadingAndErrorHandling(() => {
    const result = encodeData(input, outputFormat);
    updateOutput(pageIndex, result);
  });

  const handleDecode = withLoadingAndErrorHandling(() => {
    const result = decodeData(input, inputFormat);
    updateOutput(pageIndex, result);
  });

  const handleClear = () => {
    updateInput(pageIndex, "");
    updateOutput(pageIndex, "");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Encode and decode data in various formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="input">Input</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="input-format" className="text-sm">
                  Format:
                </Label>
                <Select
                  value={inputFormat}
                  onValueChange={(value) => updateInputFormat(pageIndex, value)}
                >
                  <SelectTrigger id="input-format" className="w-[100px]">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((fmt) => (
                      <SelectItem key={fmt} value={fmt}>
                        {fmt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => updateInput(pageIndex, e.target.value)}
              placeholder="Enter text"
              className="h-48"
            />
            <div className="flex items-center justify-end">
              <Button onClick={handleClear} variant="ghost">
                Clear
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="output">Output</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="output-format" className="text-sm">
                  Format:
                </Label>
                <Select
                  value={outputFormat}
                  onValueChange={(value) => updateOutputFormat(pageIndex, value)}
                >
                  <SelectTrigger id="output-format" className="w-[100px]">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((fmt) => (
                      <SelectItem key={fmt} value={fmt}>
                        {fmt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea id="output" value={output} readOnly className="h-48" />
          </div>
        </div>
        <Separator />
        <div className="flex justify-center space-x-4">
          <Button onClick={handleDecode} disabled={isLoading}>
            {isLoading ? "Decoding..." : "Decode"}
          </Button>
          <Button onClick={handleEncode} variant="secondary" disabled={isLoading}>
            {isLoading ? "Encoding..." : "Encode"}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
    </Card>
  );
}

export default EncoderDecoder;