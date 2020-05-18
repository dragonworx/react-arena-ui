console.log('App started: ' + Date.now())

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { defaultTheme, ThemeProvider } from '~lib';
import { App } from './app';

ReactDOM.render((
   <ThemeProvider theme={defaultTheme}>
      <App />
   </ThemeProvider>
), document.getElementById('main'));