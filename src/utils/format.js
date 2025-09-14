import { base64ToUtf8 } from "./decode";
import beautify from "js-beautify";

const formatXML = (xmlString, decodeOriginalMessage) => {
  // Basic XML validation
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      throw new Error("Invalid XML syntax");
    }
  } catch (e) {
    throw new Error("Invalid XML syntax: " + e.message);
  }

  const PADDING = "  ";
  const reg = /(>)(<)(\/\*)/g;
  let xml = xmlString.replace(reg, "$1\n$2$3");

  if (decodeOriginalMessage) {
    xml = xml.replace(
      /<([^>]*OrgMsg[^>]*)>([^<]+)<\/\1>/g,
      (match, tagName, base64Content) => {
        try {
          const decoded = base64ToUtf8(base64Content);
          const formattedDecoded = formatXML(decoded, decodeOriginalMessage); // recursive formatting
          return `<${tagName}>
${formattedDecoded}
</${tagName}>`;
        } catch (e) {
          console.warn("Failed to decode base64 content:", e);
          return match;
        }
      }
    );
  }

  let formatted = "";
  let pad = 0;

  xml.split("\n").forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) pad -= 1;
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    formatted += PADDING.repeat(pad) + node + "\n";
    pad += indent;
  });

  return formatted;
};

const formatJSON = (jsonString) => {
  // This will throw an error if the JSON is invalid
  return beautify.js(JSON.stringify(JSON.parse(jsonString)), { indent_size: 2 });
};

export const format = (formatter, string, checkbox) => {
  switch (formatter.toLowerCase()) {
    case "xml":
      return formatXML(string, checkbox);
    case "json":
      return formatJSON(string);
    default:
      return string;
  }
};

export const toOneLine = (inputString) => {
  return inputString.replace(/\s+/g, " ").trim();
};

