import React from "react";
import PrettyFormatter from "../features/pretty-formatter/PrettyFormatter";

function PrettyFormatXML() {
  return (
    <PrettyFormatter
      pageIndex="xml"
      title="Pretty Format XML"
      formatter="xml"
    />
  );
}

export default PrettyFormatXML;