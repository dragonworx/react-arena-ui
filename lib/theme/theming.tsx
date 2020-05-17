import { createContext } from 'react';
import { createUseStyles, createTheming } from 'react-jss';

const ThemeContext = createContext({});

const theming = createTheming(ThemeContext);

const { ThemeProvider, useTheme } = theming;

export {
   ThemeProvider,
   useTheme,
   createUseStyles,
   theming,
};