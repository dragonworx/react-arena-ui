import * as React from 'react';
// import { AffineView } from './affineview';
import { Transform, Point } from '~lib';
import './app.less';

export function App() {
   const transform = new Transform();
   transform.width = 100;
   transform.height = 150;
   transform.translation.set(100, 20);
   transform.rotation = 15;
   // transform.tilt.set(3, 1);
   const matrix = transform.build();

   const style = {
      width: transform.width,
      height: transform.height,
      transform: matrix.toCssMatrix(),
   };

   const mouseToLocal = (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      return new Point(e.clientX - r.left, e.clientY - r.top);
   };

   const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const mp = new Point(e.clientX, e.clientY);
      const local = transform.globalToLocal(mp);
      const global = transform.localToGlobal(local);
      console.log(mp, local, global);
   };

   return (
      <div className="test" style={style} onMouseMove={onMouseMove}></div>
   )
}

// export function App() {

//    return (
//       <AffineView
//          width={500}
//          height={500}
//       >
//             <div className="box" style={{width: 100, height: 100}}></div>
//             <div className="box" style={{left: 100, top: 100, width: 200, height: 100}}></div>
//             <div className="box" style={{left: 300, top: 400, width: 200, height: 100}}></div>
//       </AffineView>
//    )

// }