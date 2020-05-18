export interface Theme {
   backgroundColorLight: string;
   backgroundColor: string;
   backgroundColorDark: string;
   padding: number;
   borderRadiusSmall: number;
   borderRadius: number;
   borderRadiusLarge: number;
   borderColorLight: string;
   borderColor: string;
   borderColorDark: string;
   textColorLight: string;
   textColor: string;
   textColorDark: string;
   fontFamily: string;
   fontSizeSmall: number;
   fontSize: number;
   fontSizeLarge: number;
}

export * from './default';
export * from './test';

export { ThemeProvider, createUseStyles, useTheme } from 'react-jss';

export const css = (...classNames: (string | undefined)[]) => classNames.filter(className => !!className).join(' ');