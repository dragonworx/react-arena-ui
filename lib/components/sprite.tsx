import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useInterval } from './hooks';
import { transformedLocalCoord } from './util';

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

   const transform = `translate(${x}px, ${y}px) rotateZ(${rotationZ}deg) scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;

   const style = {
      width,
      height,
      transformOrigin: `${origX}px ${origY}px`,
      'MozTransform': transform,
      'WebkitTransform': transform,
      'msTransform': transform,
      transform,
   };

   useInterval(() => {
      setRotationY(rotationY! + 1);
   }, 100);

   const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { x, y } = transformedLocalCoord(e);
      console.log(width * x, height * y);
      e.stopPropagation();
   };

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