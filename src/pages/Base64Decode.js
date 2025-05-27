import React from "react";
import EncoderDecoder from "../components/EncoderDecoder";
import { base64ToUtf8, formatXML } from "../utils/format";

function formatBase64(base64, placeholder) {
  const decodedString = base64ToUtf8(base64);
  return formatXML(decodedString);
}

function Base64Decode() {
  return (
    <EncoderDecoder
      formatFunction={formatBase64}
      placeholder="Enter Base64"
      title="Base64 Decode"
      inputType="XML"
      inputIndex="base64"
    />
  );
}

export default Base64Decode;
