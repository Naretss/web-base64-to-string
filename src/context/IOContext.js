import React, { createContext, useState } from "react";

export const IOContext = createContext();

export const IOProvider = ({ children }) => {
  const [data, setData] = useState({
    base64: { input: "", output: "" },
    xml: { input: "", output: "", checkbox: true },
    json: { input: "", output: "" },
  });

  const updateInput = (type, input) => {
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], input },
    }));
  };

  const updateOutput = (type, output) => {
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], output },
    }));
  };

  const updateCheckbox = (type, checkbox) => {
    setData((prev) => ({
      ...prev,
      [type]: { ...prev[type], checkbox },
    }));
  };

  return (
    <IOContext.Provider
      value={{ data, updateInput, updateOutput, updateCheckbox }}
    >
      {children}
    </IOContext.Provider>
  );
};
