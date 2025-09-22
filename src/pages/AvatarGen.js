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
import "./AvatarGen.css";

function AvatarGen() {
  const [avatarConfig, setAvatarConfig] = useState({
    name: "Lorem",
    role: "Software Engineer",
    font: "sans-serif",
    fontWeight: "normal",
    textAlign: "center",
    textCase: "none",
    nameSize: 100,
    roleSize: 30,
    textColor: "#ffffff",
    bgColor: "#000000",
    bgImage: null,
  });
  const previewRef = useRef(null);

  const handleConfigChange = (field, value) => {
    setAvatarConfig((prevConfig) => ({ ...prevConfig, [field]: value }));
  };

  const {
    name,
    role,
    font,
    fontWeight,
    textAlign,
    textCase,
    nameSize,
    roleSize,
    textColor,
    bgColor,
    bgImage,
  } = avatarConfig;

  const exportAvatar = async (format) => {
    const el = previewRef.current;
    const result = await snapdom(el, { scale: 1 });
    await result.download({ format, filename: "avatar" });
  };

  const handleBgImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleConfigChange('bgImage', e.target.result);
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
                onChange={(e) => handleConfigChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                value={role}
                onChange={(e) => handleConfigChange('role', e.target.value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="font">Font</Label>
              <Select value={font} onValueChange={(value) => handleConfigChange('font', value)}>
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
              <Select value={fontWeight} onValueChange={(value) => handleConfigChange('fontWeight', value)}>
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
              <Select value={textAlign} onValueChange={(value) => handleConfigChange('textAlign', value)}>
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
              <Select value={textCase} onValueChange={(value) => handleConfigChange('textCase', value)}>
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
                onChange={(e) => handleConfigChange('nameSize', Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-size">Role Size (px)</Label>
              <Input
                id="role-size"
                type="number"
                value={roleSize}
                onChange={(e) => handleConfigChange('roleSize', Number(e.target.value))}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => handleConfigChange('textColor', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <Input
                id="bg-color"
                type="color"
                value={bgColor}
                onChange={(e) => handleConfigChange('bgColor', e.target.value)}
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
            className="flex items-center justify-center avatar-preview"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              fontFamily: font,
              fontWeight: fontWeight,
              textAlign: textAlign,
              textTransform: textCase,
              backgroundImage: `url(${bgImage})`,
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
            <Button onClick={() => exportAvatar("png")}>Export to PNG</Button>
            <Button onClick={() => exportAvatar("jpeg")} variant="secondary">
              Export to JPG
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AvatarGen;
