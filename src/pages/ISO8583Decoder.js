import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { decodeISO8583 } from '../utils/iso8583';

function ISO8583Decoder() {
  const [hexInput, setHexInput] = useState('');
  const [decodedMessage, setDecodedMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDecode = () => {
    setError(null);
    setDecodedMessage(null);

    try {
      const decoded = decodeISO8583(hexInput.replace(/\s/g, ''));
      setDecodedMessage(decoded);
    } catch (e) {
      setError('Error decoding message: ' + e.message);
    }
  };

  const handleClear = () => {
    setHexInput('');
    setDecodedMessage(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ISO 8583 Decoder</CardTitle>
        <CardDescription>Decode a hex ISO 8583 message into a human-readable format.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hex-input">Hex ISO 8583 Message</Label>
          <Textarea
            id="hex-input"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="Enter hex-encoded ISO 8583 message"
            className="h-32"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={handleDecode}>Decode</Button>
          <Button onClick={handleClear} variant="ghost">
            Clear
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        {decodedMessage && (
          <div className="space-y-2">
            <Label>Decoded Message</Label>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">MTI</td>
                    <td className="p-2">{decodedMessage.mti}</td>
                  </tr>
                  {Object.entries(decodedMessage.fields).map(([field, data]) => (
                    <tr key={field} className="border-b">
                      <td className="p-2 font-medium">Field {field}</td>
                      <td className="p-2">{data.name}</td>
                      <td className="p-2">{data.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ISO8583Decoder;
