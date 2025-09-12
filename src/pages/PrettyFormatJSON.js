import React from "react";
import PrettyFormatter from "../features/pretty-formatter/PrettyFormatter";

function PrettyFormatJSON() {
  return (
    <PrettyFormatter
      pageIndex="json"
      title="Pretty Format JSON"
      formatter="json"
    />
  );
}

export default PrettyFormatJSON;