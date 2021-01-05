import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
      <ScopedCssBaseline>
        <App />
      </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);

