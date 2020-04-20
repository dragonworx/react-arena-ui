import * as React from 'react';
import { useState } from 'react';
import './app.less';

export function App() {
   // S=Z*C+W/2+P
   
   /*
   c=
   −2p+2s−w
   /
   2z
   */

   const [ info, setInfo ] = useState('');
   const [ zoom, setZoom ] = useState(1);

   const screenW = 200;
   const screenH = 200;

   const panX = 0;
   const panY = 0;
   const boxW = 100;
   const boxH = 100;

   const cartToScreen = (x: number, y: number) => {
      const sx = (zoom * x) + (screenW / 2) + panX;
      const sy = (zoom * y) + (screenH / 2) + panY;
      return {x: sx, y: sy};
   }

   const screenToCart = (x: number, y: number) => {
      const cx = ((-2 * panX) + (2 * x) - screenW) / (2 * zoom);
      const cy = ((-2 * panY) + (2 * y) - screenH) / (2 * zoom);
      return { x: cx, y: cy };
   };

   const { x: left, y: top } = cartToScreen(0, 0);
   const width = boxW * zoom;
   const height = boxH * zoom;
   const style = { left, top, width, height, marginLeft: width * -0.5, marginTop: height * -0.5 };
   const p = cartToScreen(0, 0);
   console.log(p);

   const onMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = screenToCart(clientX, clientY);
      setInfo(`zoom: ${zoom} cart: ${Math.round(x)}, ${Math.round(y)}`);
   };

   const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      const { deltaY, altKey } = e;
      const delta = deltaY > 0 ? 1 : -1;
      const newZoom = zoom - delta;
      setZoom(newZoom);
   };

   return (
      <div
         className="canvas"
         onMouseMove={onMouseMove}
         onWheel={onWheel}
      >
         {info}
            <div className="box" style={style}></div>
      </div>
   )

}