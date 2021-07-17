import React from 'react';

const FileContext = React.createContext({
  files: [],
  curr: '',
  addFileContent: () => {},
  changeCurrentFile: () => {},
});

export default FileContext;
