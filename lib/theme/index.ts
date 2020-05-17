export interface ArenaTheme {
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
   fontSizeSmall: number;
   fontSize: number;
   fontSizeLarge: number;
}

export interface Theme {
   theme: ArenaTheme;
}

export * from './default';
export * from './theming';