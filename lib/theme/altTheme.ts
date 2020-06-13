import { createTheme } from '.';

const orbitronRegular = require('../../public/fonts/Orbitron/static/Orbitron-Regular.ttf');
const orbitronMedium = require('../../public/fonts/Orbitron/static/Orbitron-Medium.ttf');
const orbitronBold = require('../../public/fonts/Orbitron/static/Orbitron-Bold.ttf');

export const altTheme = createTheme({
   buttonColor: '#333',
   backgroundColor: '#444',
   borderRadius: 5,
   borderColor: '#ccc',
   textColor: '#888',
   accentColor: '#ec9e0f',
   fontSize: 12,
   padding: 8,
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