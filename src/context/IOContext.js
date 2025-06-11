import React, { createContext, useState } from "react";

export const IOContext = createContext();

export const IOProvider = ({ children }) => {
  const [data, setData] = useState({
    base64: { input: "", output: "", inputFormat: "Base64", outputFormat: "UTF-8" },
    xml: { input: "", output: "", checkbox: true },
    json: { input: "", output: "" },
  });

  const updateField = (type, field, value) => {
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const updateInput = (type, input) => updateField(type, "input", input);
  const updateOutput = (type, output) => updateField(type, "output", output);
  const updateCheckbox = (type, checkbox) =>
    updateField(type, "checkbox", checkbox);
  const updateInputFormat = (type, inputFormat) =>
    updateField(type, "inputFormat", inputFormat);
  const updateOutputFormat = (type, outputFormat) =>
    updateField(type, "outputFormat", outputFormat);

  return (
    <IOContext.Provider
      value={{
        data,
        updateInput,
        updateOutput,
        updateCheckbox,
        updateInputFormat,
        updateOutputFormat,
      }}
    >
      {children}
    </IOContext.Provider>
  );
};
