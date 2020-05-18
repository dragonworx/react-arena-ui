import * as React from 'react';
import { useState } from 'react';
import { defaultTheme, testTheme, ThemeProvider, Theme } from '~lib';
import { Examples } from './examples';

const themes = {
   'default': defaultTheme,
   'test': testTheme,
} as {
   [key: string]: Theme;
};

export function App() {
   const [theme, setTheme] = useState(defaultTheme);

   const onThemeChange = (themeName: string) => {
      setTheme(themes[themeName]);
   };

   return (
      <ThemeProvider theme={theme}>
         <Examples onThemeChange={onThemeChange} />
      </ThemeProvider>
   )
}