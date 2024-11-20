import React from "react";

function InputField({ value, onChange, placeholder }) {
  return (
    <textarea
      className="w-full h-24 p-2 border border-gray-300 rounded bg-gray-800 text-white text-sm resize-none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default InputField;
