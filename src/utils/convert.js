export function encodeData(data, format) {
  switch (format) {
    case "ASCII":
      return data
        .split("")
        .map((char) => char.charCodeAt(0))
        .join(" ");
    case "UTF-8":
      return new TextEncoder().encode(data).join(" ");
    case "Base64":
      return btoa(data);
    case "Hex":
      return data
        .split("")
        .map((char) => char.charCodeAt(0).toString(16))
        .join(" ");
    case "Binary":
      return data
        .split("")
        .map((char) => char.charCodeAt(0).toString(2))
        .join(" ");
    default:
      throw new Error("Unsupported format");
  }
}

export function decodeData(data, format) {
  switch (format) {
    case "ASCII":
      return data
        .split(" ")
        .map((code) => String.fromCharCode(code))
        .join("");
    case "UTF-8":
      return new TextDecoder().decode(new Uint8Array(data.split(" ")));
    case "Base64":
      return atob(data);
    case "Hex":
      return data
        .split(" ")
        .map((code) => String.fromCharCode(parseInt(code, 16)))
        .join("");
    case "Binary":
      return data
        .split(" ")
        .map((code) => String.fromCharCode(parseInt(code, 2)))
        .join("");
    default:
      throw new Error("Unsupported format");
  }
}
