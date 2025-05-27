import React from "react";
import PrettyFormat from "../components/PrettyFormat";
import { formatXML } from "../utils/format";

function PrettyFormatXML() {
  return (
    <PrettyFormat
      formatFunction={formatXML}
      placeholder="Enter XML"
      title="Pretty Format XML"
      inputType="XML"
      inputIndex="xml"
    />
  );
}

export default PrettyFormatXML;
