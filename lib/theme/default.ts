import { createTheme } from './util';

const balooRegular = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Regular.ttf');
const balooMedium = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Medium.ttf');
const balooBold = require('../../public/fonts/Baloo_Chettan_2/BalooChettan2-Bold.ttf');

export const defaultTheme = createTheme({
   buttonColor: '#787777',
   backgroundColor: '#787878',
   borderRadius: 5,
   borderColor: '#ccc',
   textColor: '#ccc',
   accentColor: '#2af5ff',
   fontSize: 14,
   padding: 10,
   fonts: [
      {
         fontFamily: 'arena-light',
         src: `url('${balooRegular}') format('truetype')`
      },
      {
         fontFamily: 'arena-regular',
         src: `url('${balooMedium}') format('truetype')`
      },
      {
         fontFamily: 'arena-bold',
         src: `url('${balooBold}') format('truetype')`
      },
   ]
});