export const formatXML = (xmlString) => {
  const PADDING = "  ";
  const reg = /(>)(<)(\/*)/g;
  const xml = xmlString.replace(reg, "$1\n$2$3");
  let formatted = "";
  let pad = 0;

  xml.split("\n").forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0; // Node อยู่ในบรรทัดเดียว
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) pad -= 1; // Node ปิด
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1; // Node เปิด
    } else {
      indent = 0;
    }

    formatted += PADDING.repeat(pad) + node + "\n\n";
    pad += indent;
  });

  return formatted.trim();
};
