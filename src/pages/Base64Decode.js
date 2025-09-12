import React from "react";
import EncoderDecoder from "../features/encoder-decoder/EncoderDecoder";

function Base64Decode() {
  return (
    <EncoderDecoder
      pageIndex="base64"
      title="Base64 Encoder / Decoder"
    />
  );
}

export default Base64Decode;