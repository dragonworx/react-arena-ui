import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, Theme } from '../lib/theme';
import { defaultTheme } from '../lib/theme/defaultTheme';
import { altTheme } from '../lib/theme/altTheme';

import { Examples } from './example';

const themes = {
   'default': defaultTheme,
   'alt': altTheme,
} as {
   [key: string]: Theme;
};

const getTheme = () => {
   const queryParam = location.search;
   if (queryParam) {
      const themeName = queryParam.match(/\?theme=(.*)/);
      if (themeName) {
         return themeName[1];
      }
   }
   return 'default';
};

export function App() {
   const themeName = getTheme();
   const [theme, setTheme] = useState(themes[themeName]);

   const onThemeChange = (themeName: string) => {
      window.history.pushState(null, document.title, `http://localhost:3000/?theme=${themeName}${location.hash ? location.hash : ''}`);
      setTheme(themes[themeName]);
   };

   return (
      <ThemeProvider theme={theme}>
         <Examples theme={themeName} onThemeChange={onThemeChange} />
      </ThemeProvider>
   )
}