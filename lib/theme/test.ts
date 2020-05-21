import { createTheme } from './util';

const orbitronRegular = require('../../public/fonts/Orbitron/static/Orbitron-Regular.ttf');
const orbitronMedium = require('../../public/fonts/Orbitron/static/Orbitron-Medium.ttf');
const orbitronBold = require('../../public/fonts/Orbitron/static/Orbitron-Bold.ttf');

export const testTheme = createTheme({
   backgroundColor: '#333',
   borderRadius: 5,
   borderColor: '#ccc',
   textColor: '#666',
   accentColor: '#ec9e0f',
   fontSize: 14,
   padding: 5,
   fonts: [
      {
         fontFamily: 'arena-light',
         src: `url('${orbitronRegular}') format('truetype')`
      },
      {
         fontFamily: 'arena-regular',
         src: `url('${orbitronMedium}') format('truetype')`
      },
      {
         fontFamily: 'arena-bold',
         src: `url('${orbitronBold}') format('truetype')`
      },
   ]
});