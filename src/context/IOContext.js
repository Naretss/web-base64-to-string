import React, { createContext, useState } from "react";

export const IOContext = createContext();

export const IOProvider = ({ children }) => {
  const [data, setData] = useState({
    base64: { input: "", output: "" },
    xml: { input: "", output: "" },
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

  return (
    <IOContext.Provider value={{ data, updateInput, updateOutput }}>
      {children}
    </IOContext.Provider>
  );
};
