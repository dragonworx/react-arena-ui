import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useInterval } from './hooks';

export interface SpriteProps {
   className?: string;
   x?: number;
   y?: number;
   originX?: number;
   originY?: number;
   width?: number;
   height?: number;
   scaleX?: number;
   scaleY?: number;
   skewX?: number;
   skewY?: number;
   rotationX?: number;
   rotationY?: number;
   rotationZ?: number;
   children: React.ReactNode;
}

export function Sprite(props: SpriteProps) {
   const {
      x: _x = 0,
      y: _y = 0,
      originX: _originX = 0,
      originY: _originY = 0,
      width: _width = 0,
      height: _height = 0,
      scaleX: _scaleX = 1,
      scaleY: _scaleY = 1,
      skewX: _skewX = 0,
      skewY: _skewY = 0,
      rotationX: _rotationX = 0,
      rotationY: _rotationY = 0,
      rotationZ: _rotationZ = 0,
      children,
      className,
   } = props;
   const spriteRef = useRef(null);
   const [x, setX] = useState(_x);
   const [y, setY] = useState(_y);
   const [originX, setOriginX] = useState(_originX);
   const [originY, setOriginY] = useState(_originY);
   const [width, setWidth] = useState(_width);
   const [height, setHeight] = useState(_height);
   const [scaleX, setScaleX] = useState(_scaleX);
   const [scaleY, setScaleY] = useState(_scaleY);
   const [skewX, setSkewX] = useState(_skewX);
   const [skewY, setSkewY] = useState(_skewY);
   const [rotationX, setRotationX] = useState(_rotationX);
   const [rotationY, setRotationY] = useState(_rotationY);
   const [rotationZ, setRotationZ] = useState(_rotationZ);

   const origX = width * originX;
   const origY = height * originY;

   const style = {
      width,
      height,
      transformOrigin: `${origX}px ${origY}px`,
      transform: `translate(${x}px, ${y}px) rotateZ(${rotationZ}deg)  scale(${scaleX}, ${scaleY})  skew(${skewX}deg, ${skewY}deg) rotateY(${rotationY}deg) rotateX(${rotationX}deg)  `,
   };

   useInterval(() => {
      setRotationY(rotationY! + 1);
   }, 1000);

   const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      // const mp = new Point(e.clientX, e.clientY);
      // const local = transform.globalToLocal(mp);
      // const global = transform.localToGlobal(local);
      // console.log(mp, local, global);
      const { x, y } = offsetXY(e, e.target);
      console.log(width * x, height * y);
      e.stopPropagation();
   };

   function offsetXY(event: any, element: any) {
      function coords(element: any) {
         var div = document.createElement('div'),
            e = [], i;
         div.style.display = 'none';
         element.appendChild(div);
         for (i = 0; i < 4; i++) {
            div.style.cssText = 'display:block;width:0;height:0;position:absolute;left:' + (i % 3 ? 100 : 0) + '%;top:' + (i < 2 ? 0 : 100) + '%;';
            e[i] = div.getBoundingClientRect();
         }
         element.removeChild(div);
         return e;
      }
      var e = coords(element), a, d, c;
      a = [
         [e[3].top - e[0].top, e[0].top - e[1].top],
         [e[0].left - e[3].left, e[1].left - e[0].left]
      ];
      d = (a[0][0] * a[1][1] - a[0][1] * a[1][0]);
      c = [event.pageX - window.pageXOffset - e[0].left,
      event.pageY - window.pageYOffset - e[0].top];
      return {
         x: (c[0] * a[0][0] + c[1] * a[1][0]) / d,
         y: (c[0] * a[0][1] + c[1] * a[1][1]) / d
      };
   }

   return (
      <div
         ref={spriteRef}
         className={`sprite${className ? ` ${className}` : ''}`}
         style={style}
         onMouseMove={onMouseMove}
      >
         {children}
         <div className="origin" style={{ left: origX, top: origY }}></div>
      </div>
   )
}