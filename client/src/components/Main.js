import React from 'react';
import axios from 'axios';
import { createTheme, MuiThemeProvider, Button } from '@material-ui/core';

import FileContext from './FilesContext';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import LivePreview from './LivePreview';

const theme = createTheme({
  palette: {
    background: {
      default: '#0a0a0a',
    },
  },
});

export default function Main({ id }) {
  console.log(id);
  const [sharedLink, setSharedLink] = React.useState(null);
  const [files, setFiles] = React.useState([
    {
      name: 'index.html',
      data: '<!-- Enter HTML -->',
    },
    {
      name: 'index.css',
      data: '/* Enter CSS */',
    },
    {
      name: 'index.js',
      data: '/* Enter JavaScript */',
    },
  ]);

  const [currFile, setCurrFile] = React.useState('index.html');

  React.useEffect(() => {
    if (id) {
      axios.get('http://localhost:5000/pastebin/' + id).then((res) => {
        if (res.status === 200) {
          setFiles(res.data.files);
        } else {
          throw new Error('Server Error Occured');
        }
      });
    }
  }, []);

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

  const getShareableLink = async () => {
    const res = await axios
      .post('http://localhost:5000/pastebin', {
        paste: {
          html: files[0].data,
          css: files[1].data,
          js: files[2].data,
        },
      })
      .then((res) => res.data);

    setSharedLink(res);
  };

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
        <div
          style={{ backgroundColor: '#0a0a0a', color: 'white' }}
          className="flex flex-row h-screen p-8"
        >
          <div className="absolute right-5 top-5">
            {sharedLink && (
              <a href={`http://localhost:3000/edit/${sharedLink}`}>
                Use this shared link http://localhost:3000/edit/${sharedLink}
              </a>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={getShareableLink}
            >
              Share
            </Button>
          </div>
          <div style={{ borderRight: '2px solid white' }} className="w-1/5 m-4">
            <FileExplorer />
          </div>
          <div
            style={{ borderRight: '2px solid white' }}
            className="w-2/5 h-full m-4"
          >
            <CodeEditor />
          </div>
          <div className="w-2/5 h-full m-4">
            <LivePreview />
          </div>
        </div>
      </FileContext.Provider>
    </MuiThemeProvider>
  );
}
