import React from "react";
import Editor from '@monaco-editor/react';
import cobalt2 from 'monaco-themes/themes/Cobalt2.json';

interface Props {
  height: string;
  language: string;
  value: string;
  onChange: (...event: any[]) => void;
}

export const CodeEditor: React.FC<Props> = ({ height, language, value, onChange }) => {
  return (
    <Editor
      height={height}
      defaultLanguage={language}
      defaultValue={value}
      onChange={onChange}
      onMount={(_, monaco) => {
        monaco.editor.defineTheme('cobalt2', cobalt2);
        monaco.editor.setTheme('cobalt2');
      }}
      options={{
        minimap: {
          enabled: false
        },
        lineNumbers: "off"
      }}
    />
  )
}
