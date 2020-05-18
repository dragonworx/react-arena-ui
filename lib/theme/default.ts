import { Theme } from './index';
import Color from 'color';

const backgroundColor = Color('#777');
const borderRadius = 5;
const borderColor = Color.rgb(167, 167, 167);
const textColor = Color.rgb(167, 167, 167);
const fontSize = 14;

export const defaultTheme: Theme = {
   backgroundColorLight: backgroundColor.lighten(0.1).hex(),
   backgroundColor: backgroundColor.hex(),
   backgroundColorDark: backgroundColor.darken(0.2).hex(),
   padding: 10,
   borderRadiusSmall: Math.round(borderRadius / 2),
   borderRadius: borderRadius,
   borderRadiusLarge: borderRadius * 2,
   borderColorLight: borderColor.lighten(0.5).hex(),
   borderColor: borderColor.hex(),
   borderColorDark: borderColor.darken(0.5).hex(),
   textColorLight: textColor.lighten(0.5).hex(),
   textColor: textColor.hex(),
   textColorDark: textColor.darken(0.5).hex(),
   fontSizeSmall: Math.round(fontSize * 0.8),
   fontSize: fontSize,
   fontSizeLarge: Math.round(fontSize * 1.75),
};