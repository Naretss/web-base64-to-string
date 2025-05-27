import React from "react";
import PrettyFormat from "../components/PrettyFormat";
import { formatXML } from "../utils/format";

function base64ToUtf8(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const decodedString = new TextDecoder("utf-8").decode(bytes);
  return decodedString;
}

function formatBase64(base64) {
  const decodedString = base64ToUtf8(base64);
  return formatXML(decodedString);
}

function Base64Decode() {
  return (
    <PrettyFormat
      formatFunction={formatBase64}
      placeholder="Enter Base64"
      title="Base64 Decode"
      inputType="XML"
      inputIndex="base64"
    />
  );
}

export default Base64Decode;
