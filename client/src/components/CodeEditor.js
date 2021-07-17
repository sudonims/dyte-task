import React from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-http';
// import 'prismjs/themes/prism-dark.css'; //Example style, you can use another
import FileContext from './FilesContext';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

export default function CodeEditor() {
  const { files, curr, addFileContent } = React.useContext(FileContext);
  const [data, setData] = React.useState('');
  const [mode, setMode] = React.useState('');
  React.useEffect(() => {
    setData(files.find((x) => x.name === curr).data);
    if (/js/.test(curr)) {
      setMode('javascript');
    } else if (/css/.test(curr)) {
      setMode('css');
    } else if (/html/.test(curr)) {
      setMode('html');
    }
  }, [files, curr]);

  const onValueChange = (code) => {
    addFileContent(code, curr);
  };

  console.log(mode);
  return (
    // <Editor
    //   value={data}
    //   onValueChange={onValueChange}
    //   highlight={(code) => highlight(code, languages.js)}
    //   padding={10}
    //   style={{
    //     fontFamily: '"Fira code", "Fira Mono", monospace',
    //     fontSize: 12,
    //     backgroundColor: '#0a0a0a',
    //     color: 'white',
    //   }}
    // />
    <AceEditor
      mode={mode}
      theme="github"
      value={data}
      onChange={onValueChange}
      showGutter
    />
  );
}
