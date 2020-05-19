import { Theme } from './index';
import Color from 'color';
const balooRegular = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Regular.ttf');
const balooMedium = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Medium.ttf');
const balooBold = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Bold.ttf');

const backgroundColor = Color('#777');
const borderRadius = 5;
const borderColor = Color.rgb(167, 167, 167);
const textColor = Color.rgb(167, 167, 167);
const highlightColor = Color('#2af5ff');
const fontSize = 14;
const padding = 10;

export const defaultTheme: Theme = {
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
         src: `url('${balooRegular}') format('truetype')`
      },
      {
         fontFamily: 'arena-theme-regular',
         src: `url('${balooMedium}') format('truetype')`
      },
      {
         fontFamily: 'arena-theme-bold',
         src: `url('${balooBold}') format('truetype')`
      },
   ]
};