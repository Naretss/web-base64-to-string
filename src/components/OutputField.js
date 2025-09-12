import React from 'react';
import CodeMirrorField from './CodeMirrorField';
import Button from './Button';

const OutputField = ({ string, inputType }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(string);
  };

  return (
    <div className="w-full min-h-[16rem] h-auto">
      <CodeMirrorField string={string} editable={false} inputType={inputType} />
      <div className="mt-4 flex justify-end">
        <Button onClick={handleCopy} variant="tertiary">Copy to Clipboard</Button>
      </div>
    </div>
  );
};

export default OutputField;