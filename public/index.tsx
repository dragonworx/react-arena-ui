// import { foo } from '~lib';
// foo();

console.log('App started: ' + Date.now())

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(<App />, document.getElementById('app'));