import React from "react";
import PrettyFormat from "../components/PrettyFormat";

function formatJSON(json) {
  const jsonObject = JSON.parse(json);
  return JSON.stringify(jsonObject, null, 2);
}

function PrettyFormatJSON() {
  return (
    <PrettyFormat
      formatFunction={formatJSON}
      placeholder="Enter JSON"
      title="Pretty Format JSON"
      inputType="JSON"
      inputIndex="json"
    />
  );
}

export default PrettyFormatJSON;
