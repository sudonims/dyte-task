import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { createTheme, MuiThemeProvider } from '@material-ui/core';

import Main from './components/Main';

const theme = createTheme({
  palette: {
    background: {
      default: '#0a0a0a',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path="/">
          <Main id={null} />
        </Route>
        <Route
          path="/edit/:id"
          component={(props) => <Main id={props.match.params.id} />}
        />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
