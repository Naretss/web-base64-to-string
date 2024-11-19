import React, { useState } from 'react';
import './App.css';
import logo from "./img/icons8-facebook-32.png"
function App() {
  const [base64, setBase64] = useState('');
  const [string, setString] = useState('');

  const handleConvert = () => {
    try {
      const decodedString = new TextDecoder('utf-8').decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
      let formattedString = decodedString;

      // Check if the decoded string is JSON
      try {
        const jsonObject = JSON.parse(decodedString);
        formattedString = JSON.stringify(jsonObject, null, 2); // Format JSON with 2 spaces indentation
      } catch (e) {
        // Not a JSON string, do nothing
      }

      setString(formattedString);
    } catch (error) {
      alert('Invalid Base64 string');
    }
  };

  return (
    <div className="App">
      <h1>Base64 Decode</h1>
      <p>Decode Base64 string or use the Base64 to File tool for large files</p>
      <div>
        <input
          type="text"
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          placeholder="Enter Base64"
        />
      </div>
      <button onClick={handleConvert}>Decode</button>
      {string && (
        <div className="output-container">
          <h2>Decoded String</h2>
          <textarea readOnly value={string} />
        </div>
      )}
      <footer className="footer">
        <p>Narets Ng</p>
        <a href="https://www.facebook.com/profile.php?id=100001005871414">
          <img src={logo} className='logo' alt="Logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
