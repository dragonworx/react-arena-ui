import Color from 'color';
export { ThemeProvider, createUseStyles, useTheme } from 'react-jss';

export interface FontFace {
   fontFamily: 'arena-light' | 'arena-regular' | 'arena-bold';
   src: string;
}

export interface Theme {
   buttonColorLight: string;
   buttonColor: string;
   buttonColorDark: string;
   backgroundColorLight: string;
   backgroundColor: string;
   backgroundColorDark: string;
   paddingSmall: number;
   padding: number;
   paddingLarge: number;
   borderRadiusSmall: number;
   borderRadius: number;
   borderRadiusLarge: number;
   borderColorLight: string;
   borderColor: string;
   borderColorDark: string;
   textColorLight: string;
   textColor: string;
   textColorDark: string;
   accentColorLight: string;
   accentColor: string;
   accentColorDark: string;
   fontSizeSmall: number;
   fontSize: number;
   fontSizeLarge: number;
   fonts?: FontFace[],
}

export type ThemeProps = Pick<Theme, 'buttonColor' | 'backgroundColor' | 'borderRadius' | 'borderColor' | 'textColor' | 'accentColor' | 'fontSize' | 'padding' | 'accentColor' | 'fonts'>;

export const css = (...classNames: (string | undefined)[]) => classNames.filter(className => !!className).join(' ');

export const fontFaces = (theme: Theme) => {
   if (theme.fonts) {
      return {
         '@font-face': theme.fonts,
      };
   }
   theme.fonts ? { '@font-face': theme.fonts } : undefined
};

export const createTheme = (props: ThemeProps): Theme => {
   return {
      buttonColorLight: Color(props.buttonColor).lighten(0.1).hex(),
      buttonColor: props.buttonColor,
      buttonColorDark: Color(props.buttonColor).darken(0.2).hex(),
      backgroundColorLight: Color(props.backgroundColor).lighten(0.1).hex(),
      backgroundColor: props.backgroundColor,
      backgroundColorDark: Color(props.backgroundColor).darken(0.2).hex(),
      paddingSmall: props.padding * 0.5,
      padding: props.padding,
      paddingLarge: props.padding * 2,
      borderRadiusSmall: Math.round(props.borderRadius / 2),
      borderRadius: props.borderRadius,
      borderRadiusLarge: props.borderRadius * 2,
      borderColorLight: Color(props.borderColor).lighten(0.1).hex(),
      borderColor: props.borderColor,
      borderColorDark: Color(props.borderColor).darken(0.55).hex(),
      textColorLight: Color(props.textColor).lighten(0.5).hex(),
      textColor: props.textColor,
      textColorDark: Color(props.textColor).darken(0.5).hex(),
      accentColorLight: Color(props.accentColor).lighten(0.2).desaturate(0.8).hex(),
      accentColor: props.accentColor,
      accentColorDark: Color(props.accentColor).darken(0.3).desaturate(0.8).hex(),
      fontSizeSmall: Math.round(props.fontSize * 0.9),
      fontSize: props.fontSize,
      fontSizeLarge: Math.round(props.fontSize * 1.75),
      fonts: props.fonts,
   } as Theme;
};