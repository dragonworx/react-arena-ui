import * as React from 'react';
import { Sprite } from './sprite';
import './app.less';

export function App() {


   return (
      <Sprite
         width={100}
         height={100}
         x={200}
         y={200}
         rotation={100}
         originX={0.5}
         originY={0}
         scaleX={1.5}
         scaleY={2}
         skewX={0}
         skewY={15}
      >
         <Sprite
            className="sprite2"
            width={50}
            height={50}
            x={20}
            y={0}
            rotation={15}
            originX={0}
            originY={0}
            scaleX={1}
            scaleY={1}
            skewX={0}
            skewY={0}
         >
            <input style={{width:30}} />
            <input type="checkbox" />
         </Sprite>
      </Sprite>
   )
}