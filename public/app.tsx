import * as React from 'react';
import { AffineView } from './affineview';
import './app.less';

export function App() {

   return (
      <AffineView
         width={500}
         height={500}
      >
            <div className="box" style={{width: 100, height: 100}}></div>
            <div className="box" style={{left: 100, top: 100, width: 200, height: 100}}></div>
            <div className="box" style={{left: 300, top: 400, width: 200, height: 100}}></div>
      </AffineView>
   )

}