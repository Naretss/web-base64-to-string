const iso8583_spec = {
  2: { name: 'Primary Account Number (PAN)', type: 'LLVAR', length: 19, format: 'n' },
  3: { name: 'Processing Code', type: 'FIXED', length: 6, format: 'n' },
  4: { name: 'Transaction Amount', type: 'FIXED', length: 12, format: 'n' },
  7: { name: 'Transmission Date and Time', type: 'FIXED', length: 10, format: 'n' },
  11: { name: 'System Trace Audit Number (STAN)', type: 'FIXED', length: 6, format: 'n' },
  12: { name: 'Local Transaction Time', type: 'FIXED', length: 6, format: 'n' },
  13: { name: 'Local Transaction Date', type: 'FIXED', length: 4, format: 'n' },
  15: { name: 'Settlement Date', type: 'FIXED', length: 4, format: 'n' },
  22: { name: 'Point of Service Entry Mode', type: 'FIXED', length: 3, format: 'n' },
  37: { name: 'Retrieval Reference Number', type: 'FIXED', length: 12, format: 'an' },
  39: { name: 'Response Code', type: 'FIXED', length: 2, format: 'an' },
  41: { name: 'Card Acceptor Terminal Identification', type: 'FIXED', length: 8, format: 'ans' },
  42: { name: 'Card Acceptor Identification Code', type: 'FIXED', length: 15, format: 'ans' },
  49: { name: 'Transaction Currency Code', type: 'FIXED', length: 3, format: 'n' },
  52: { name: 'Personal Identification Number (PIN) Data', type: 'FIXED', length: 16, format: 'b' },
  53: { name: 'Security Related Control Information', type: 'FIXED', length: 16, format: 'n' },
  62: { name: 'Issuer Private Data', type: 'LLLVAR', length: 999, format: 'ans' },
  128: { name: 'Message Authentication Code (MAC)', type: 'FIXED', length: 16, format: 'b' },
};

function hexToBinary(hex) {
  return hex.split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('');
}

function hexToAscii(hex) {
  let ascii = '';
  for (let i = 0; i < hex.length; i += 2) {
    ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return ascii;
}

export function decodeISO8583(hex) {
  let offset = 0;
  const decoded = {};

  // MTI
  decoded.mti = hexToAscii(hex.substring(offset, offset + 8));
  offset += 8;

  // Bitmap
  const primaryBitmapHex = hex.substring(offset, offset + 16);
  offset += 16;
  const primaryBitmapBinary = hexToBinary(primaryBitmapHex);

  let fullBitmapBinary = primaryBitmapBinary;
  let presentFields = [];

  if (primaryBitmapBinary[0] === '1') {
    // Secondary bitmap is present
    const secondaryBitmapHex = hex.substring(offset, offset + 16);
    offset += 16;
    const secondaryBitmapBinary = hexToBinary(secondaryBitmapHex);
    fullBitmapBinary += secondaryBitmapBinary;
  }

  for (let i = 0; i < fullBitmapBinary.length; i++) {
    if (fullBitmapBinary[i] === '1') {
      presentFields.push(i + 1);
    }
  }

  decoded.fields = {};
  decoded.presentFields = presentFields;

  // Data Fields
  for (const field of presentFields) {
    if (field === 1) continue; // Skip bitmap field
    const spec = iso8583_spec[field];
    if (!spec) {
        // For fields not in our simplified spec, we can't decode them
        // We will mark them as present but not decoded
        decoded.fields[field] = { name: `Field ${field}`, value: 'Unknown spec', raw_value: '' };
        continue;
    }

    let value = '';
    let raw_value = '';
    let len = 0;

    if (spec.type === 'FIXED') {
      len = spec.length;
      const dataHex = hex.substring(offset, offset + len);
      raw_value = dataHex;
      if (spec.format === 'n') {
        value = dataHex;
      } else {
        value = hexToAscii(dataHex);
      }
      offset += len;
    } else if (spec.type === 'LLVAR') {
      const lenHex = hex.substring(offset, offset + 2);
      len = parseInt(lenHex, 10);
      offset += 2;
      const dataHex = hex.substring(offset, offset + len);
      raw_value = dataHex;
      if (spec.format === 'n') {
        value = dataHex;
      } else {
        value = hexToAscii(dataHex);
      }
      offset += len;
    } else if (spec.type === 'LLLVAR') {
        const lenHex = hex.substring(offset, offset + 3);
        len = parseInt(lenHex, 10);
        offset += 3;
        const dataHex = hex.substring(offset, offset + len);
        raw_value = dataHex;
        if (spec.format === 'n') {
          value = dataHex;
        } else {
          value = hexToAscii(dataHex);
        }
        offset += len;
    }

    decoded.fields[field] = { name: spec.name, value, raw_value };
  }

  return decoded;
}
