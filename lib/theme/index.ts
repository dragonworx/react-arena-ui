export interface FontFace {
   fontFamily: 'arena-theme-light' | 'arena-theme-regular' | 'arena-theme-bold';
   src: string;
}

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
   highlightColor: string;
   accentColor: string;
   fontSizeSmall: number;
   fontSize: number;
   fontSizeLarge: number;
   fonts?: FontFace[]
}

export * from './default';
export * from './test';

export { ThemeProvider, createUseStyles, useTheme } from 'react-jss';

export const css = (...classNames: (string | undefined)[]) => classNames.filter(className => !!className).join(' ');

export const fontFace = (theme: Theme) => theme.fonts ? { '@font-face': theme.fonts } : undefined;