import React from 'react';
import './App.css';
import { createTheme, MuiThemeProvider } from '@material-ui/core';

import FileContext from './components/FilesContext';
import FileExplorer from './components/FileExplorer';
import CodeEditor from './components/CodeEditor';

const theme = createTheme({
  palette: {
    background: {
      default: '#0a0a0a',
    },
  },
});

function App() {
  const [files, setFiles] = React.useState([
    {
      name: 'index.html',
      data: '',
    },
    {
      name: 'index.css',
      data: '',
    },
    {
      name: 'index.js',
      data: '',
    },
  ]);

  const [currFile, setCurrFile] = React.useState('index.html');

  const addFileContent = (content, fileName) => {
    setFiles((files) => {
      return files.map((file) => {
        if (file.name === fileName) {
          file.data = content;
        }
        return file;
      });
    });
  };

  const changeCurrentFile = (file) => {
    setCurrFile(file);
  };

  console.log(currFile);

  return (
    <MuiThemeProvider theme={theme}>
      <FileContext.Provider
        value={{
          files,
          curr: currFile,
          addFileContent,
          changeCurrentFile,
        }}
      >
        <div className="flex flex-row h-screen p-8">
          <div className="w-1/5 m-4">
            <FileExplorer />
          </div>
          <div className="w-2/5 m-4">
            <CodeEditor />
          </div>
          <div className="w-2/5 m-4">Live</div>
        </div>
      </FileContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
