import { useState, useRef } from "react";

import { snapdom } from "@zumer/snapdom";

function AvatarGen() {
  const [name, setName] = useState("Lorem");
  const [role, setRole] = useState("Software Engineer");
  const [font, setFont] = useState("sans-serif");
  const [nameSize, setNameSize] = useState(100); // px
  const [roleSize, setRoleSize] = useState(30); // px
  const [textColor, setTextColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const previewRef = useRef(null);

  const exportToPng = async () => {
    const element = previewRef.current;
    const canvas = await snapdom.toPng(element);
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas;
    link.click();
  };

  



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="flex p-4 bg-gray-800 shadow-md rounded">
        <div className="mr-8">
          {/* <h2 className="text-2xl mb-4">Customize </h2> */}

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-400">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Role Input */}
          <div className="mb-4">
            <label className="block text-gray-400">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Font Selection */}
          <div className="mb-4">
            <label className="block text-gray-400">Font:</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            >
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>

          {/* Name Size Input */}
          <div className="mb-1">
            <label className="block text-gray-400">Name Size (px):</label>
            <input
              type="number"
              value={nameSize}
              onChange={(e) => setNameSize(Number(e.target.value))}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Role Size Input */}
          <div className="mb-1">
            <label className="block text-gray-400">Role Size (px):</label>
            <input
              type="number"
              value={roleSize}
              onChange={(e) => setRoleSize(Number(e.target.value))}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Text Color */}
          <div className="mb-4">
            <label className="block text-gray-400">Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Background Color */}
          <div className="mb-4">
            <label className="block text-gray-400">Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="mt-1 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={exportToPng}
            className="mt-4 p-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            Export to PNG
          </button>
        </div>

        {/* Preview Box */}
        <div
          ref={previewRef}
          className="flex items-center justify-center border border-gray-600 rounded"
          style={{
            width: "500px",
            height: "500px",
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: font,
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
      </div>
    </div>
  );
}

export default AvatarGen;
