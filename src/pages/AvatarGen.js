import { useState, useRef } from "react";
import { snapdom } from "@zumer/snapdom";
import Button from "../components/Button";

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
    <div className="bg-base-200 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Avatar Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Font</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="cursive">Cursive</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Font Weight</label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Text Align</label>
              <select
                value={textAlign}
                onChange={(e) => setTextAlign(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Text Case</label>
              <select
                value={textCase}
                onChange={(e) => setTextCase(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              >
                <option value="none">None</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Name Size (px)</label>
              <input
                type="number"
                value={nameSize}
                onChange={(e) => setNameSize(Number(e.target.value))}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Role Size (px)</label>
              <input
                type="number"
                value={roleSize}
                onChange={(e) => setRoleSize(Number(e.target.value))}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-1 p-2 border border-base-300 rounded w-full bg-base-100 text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary">Background Image</label>
              <input
                type="file"
                onChange={handleBgImageChange}
                className="mt-1 text-sm text-text-secondary"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div
            ref={previewRef}
            className="flex items-center justify-center border border-base-300 rounded-lg"
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
              <h1
                style={{ fontSize: `${nameSize}px`, lineHeight: `${nameSize}px` }}
              >
                {name}
              </h1>
              <p
                style={{ fontSize: `${roleSize}px`, lineHeight: `${roleSize}px` }}
              >
                {role}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <Button onClick={exportToPng} variant="primary">Export to PNG</Button>
            <Button onClick={exportToJpg} variant="secondary">Export to JPG</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarGen;