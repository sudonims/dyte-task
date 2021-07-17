import React from 'react';
import FileContext from './FilesContext';
import { TreeView, TreeItem } from '@material-ui/lab';
import { Container } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function FileExplorer() {
  const { files, changeCurrentFile } = React.useContext(FileContext);
  const [selected, setSelected] = React.useState('1');
  const onFileSelect = (file) => {
    changeCurrentFile(file);
  };
  return (
    <Container>
      <div className="flex flex-col">
        <p className="text-white font-black text-3xl mb-4">File Explorer</p>
        <div>
          <TreeView
            defaultExpanded={['0']}
            defaultCollapseIcon={<ChevronRightIcon />}
            defaultExpandIcon={<ExpandMoreIcon />}
            selected={selected}
            onNodeSelect={(e, node) => setSelected(node)}
          >
            <TreeItem nodeId="0" label="root">
              {files.map((file, i) => (
                <TreeItem
                  key={i}
                  onClick={() => onFileSelect(file.name)}
                  nodeId={`${i + 1}`}
                  label={file.name}
                />
              ))}
            </TreeItem>
          </TreeView>
        </div>
      </div>
    </Container>
  );
}
