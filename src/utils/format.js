export const formatXML = (xmlString, decodeOriginalMessage) => {
  const PADDING = "  ";
  const reg = /(>)(<)(\/*)/g;
  let xml = xmlString.replace(reg, "$1\n$2$3");

  if (decodeOriginalMessage) {
    xml = xml.replace(
      /<([^>]*OrgMsg[^>]*)>([^<]+)<\/\1>/g,
      (match, tagName, base64Content) => {
        try {
          const decoded = base64ToUtf8(base64Content);
          const formattedDecoded = formatXML(decoded, decodeOriginalMessage); // recursive formatting
          return `<${tagName}>\n${formattedDecoded}\n</${tagName}>`;
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

export const base64ToUtf8 = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const decodedString = new TextDecoder("utf-8").decode(bytes);
  return decodedString;
};
