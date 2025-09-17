import { useState } from "react";
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
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { SHA1, SHA256, MD5 } from "crypto-js";

function HashGenerator() {
  const [input, setInput] = useState("");
  const [md5, setMd5] = useState("");
  const [sha1, setSha1] = useState("");
  const [sha256, setSha256] = useState("");

  const handleGenerate = () => {
    setMd5(MD5(input).toString());
    setSha1(SHA1(input).toString());
    setSha256(SHA256(input).toString());
  };

  const handleClear = () => {
    setInput("");
    setMd5("");
    setSha1("");
    setSha256("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hash Generator</CardTitle>
        <CardDescription>Generate hashes from a string</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text"
            className="h-32"
          />
          <div className="flex items-center justify-end">
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex justify-center">
          <Button onClick={handleGenerate}>Generate</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="md5">MD5</Label>
          <Input id="md5" value={md5} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sha1">SHA1</Label>
          <Input id="sha1" value={sha1} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sha256">SHA256</Label>
          <Input id="sha256" value={sha256} readOnly />
        </div>
      </CardContent>
    </Card>
  );
}

export default HashGenerator;
