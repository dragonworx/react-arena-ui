import { Theme } from './index';
import Color from 'color';
const orbitronRegular = require('../../public/fonts/Orbitron/static/Orbitron-Regular.ttf');
const orbitronMedium = require('../../public/fonts/Orbitron/static/Orbitron-Medium.ttf');
const orbitronBold = require('../../public/fonts/Orbitron/static/Orbitron-Bold.ttf');

const backgroundColor = Color('#333');
const borderRadius = 5;
const borderColor = Color.rgb(167, 167, 167);
const textColor = Color('#666');
const highlightColor = Color('#ec9e0f');
const fontSize = 14;
const padding = 5;

export const testTheme: Theme = {
   backgroundColorLight: backgroundColor.lighten(0.1).hex(),
   backgroundColor: backgroundColor.hex(),
   backgroundColorDark: backgroundColor.darken(0.2).hex(),
   padding,
   borderRadiusSmall: Math.round(borderRadius / 2),
   borderRadius: borderRadius,
   borderRadiusLarge: borderRadius * 2,
   borderColorLight: borderColor.lighten(0.5).hex(),
   borderColor: borderColor.hex(),
   borderColorDark: borderColor.darken(0.5).hex(),
   textColorLight: textColor.lighten(0.5).hex(),
   textColor: textColor.hex(),
   textColorDark: textColor.darken(0.5).hex(),
   highlightColor: highlightColor.hex(),
   accentColor: Color(highlightColor).darken(0.2).desaturate(0.8).hex(),
   fontSizeSmall: Math.round(fontSize * 0.9),
   fontSize: fontSize,
   fontSizeLarge: Math.round(fontSize * 1.75),
   fonts: [
      {
         fontFamily: 'arena-theme-light',
         src: `url('${orbitronRegular}') format('truetype')`
      },
      {
         fontFamily: 'arena-theme-regular',
         src: `url('${orbitronMedium}') format('truetype')`
      },
      {
         fontFamily: 'arena-theme-bold',
         src: `url('${orbitronBold}') format('truetype')`
      },
   ]
};