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
   rotation?: number;
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
      rotation: _rotation = 0,
      children,
      className,
   } = props;
   const debugRef = useRef(null);
   const spriteRef = useRef(null);
   const [ x, setX ] = useState(_x);
   const [ y, setY ] = useState(_y);
   const [ originX, setOriginX ] = useState(_originX);
   const [ originY, setOriginY ] = useState(_originY);
   const [ width, setWidth ] = useState(_width);
   const [ height, setHeight ] = useState(_height);
   const [ scaleX, setScaleX ] = useState(_scaleX);
   const [ scaleY, setScaleY ] = useState(_scaleY);
   const [ skewX, setSkewX ] = useState(_skewX);
   const [ skewY, setSkewY ] = useState(_skewY);
   const [ rotation, setRotation ] = useState(_rotation);

   const origX = width * originX;
   const origY = height * originY;

   const style = {
      width,
      height,
      transformOrigin: `${origX}px ${origY}px`,
      transform: `translate(${x}px, ${y}px)  rotateZ(${rotation}deg) skew(${skewX}deg, ${skewY}deg) scale(${scaleX}, ${scaleY})`,
   };

   useEffect(() => {
      const el = debugRef.current! as HTMLDivElement;
      const rect = (spriteRef.current! as HTMLDivElement).getBoundingClientRect();
      el.style.left = `${rect.left}px`;
      el.style.top = `${rect.top}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      console.log(spriteRef.current!)
   });

   // useInterval(() => {
   //    setRotation(rotation! + 1);
   // }, 10);

   const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const r = currentTarget.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      console.log(currentTarget.className, x, y);
      e.stopPropagation();
   };

   return (
      <>
         <div className="debug" ref={debugRef}></div>
         <div
            ref={spriteRef}
            className={`sprite${className ? ` ${className}` : ''}`}
            style={style}
            onMouseMove={onMouseMove}
         >
            { children }
            <div className="origin" style={{left: origX, top: origY}}></div>
         </div>
      </>
   )
}