import React from "react";

function InputField({ value, onChange, placeholder }) {
  return (
    <textarea
      className="w-full min-h-[16rem] h-auto p-2 border border-base-300 rounded bg-base-100 text-text-primary text-sm resize-none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default InputField;