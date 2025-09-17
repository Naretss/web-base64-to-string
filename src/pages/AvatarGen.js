import { useState, useRef } from "react";
import { snapdom } from "@zumer/snapdom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";

function AvatarGen() {
  const [name, setName] = useState("Lorem");
  const [role, setRole] = useState("Software Engineer");
  const [font, setFont] = useState("sans-serif");
  const [fontWeight, setFontWeight] = useState("normal");
  const [textAlign, setTextAlign] = useState("center");
  const [textCase, setTextCase] = useState("none");
  const [nameSize, setNameSize] = useState(100); // px
  const [roleSize, setRoleSize] = useState(30); // px
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [bgImage, setBgImage] = useState(null);
  const previewRef = useRef(null);

  const exportToPng = async () => {
    const el = previewRef.current;
    const result = await snapdom(el, { scale: 1 });
    await result.download({ format: "png", filename: "avatar" });
  };

  const exportToJpg = async () => {
    const el = previewRef.current;
    const result = await snapdom(el, { scale: 1 });
    await result.download({ format: "jpeg", filename: "avatar" });
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBgImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Avatar Generator</CardTitle>
            <CardDescription>Customize your avatar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="font">Font</Label>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans-serif">Sans-serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="monospace">Monospace</SelectItem>
                  <SelectItem value="cursive">Cursive</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-weight">Font Weight</Label>
              <Select value={fontWeight} onValueChange={setFontWeight}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-align">Text Align</Label>
              <Select value={textAlign} onValueChange={setTextAlign}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a text align" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-case">Text Case</Label>
              <Select value={textCase} onValueChange={setTextCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a text case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="capitalize">Capitalize</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="name-size">Name Size (px)</Label>
              <Input
                id="name-size"
                type="number"
                value={nameSize}
                onChange={(e) => setNameSize(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-size">Role Size (px)</Label>
              <Input
                id="role-size"
                type="number"
                value={roleSize}
                onChange={(e) => setRoleSize(Number(e.target.value))}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <Input
                id="bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg-image">Background Image</Label>
              <Input id="bg-image" type="file" onChange={handleBgImageChange} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardContent
            ref={previewRef}
            className="flex items-center justify-center"
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: bgColor,
              color: textColor,
              fontFamily: font,
              fontWeight: fontWeight,
              textAlign: textAlign,
              textTransform: textCase,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center">
              <h1 style={{ fontSize: `${nameSize}px`, lineHeight: 1 }}>
                {name}
              </h1>
              <p style={{ fontSize: `${roleSize}px`, lineHeight: 1 }}>
                {role}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button onClick={exportToPng}>Export to PNG</Button>
            <Button onClick={exportToJpg} variant="secondary">
              Export to JPG
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AvatarGen;
