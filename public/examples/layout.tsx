import * as React from 'react';
import { Flex } from '~lib';

export function LayoutExamples() {
   return (
      <ul>
         <li>
            <label>Default (Horizontal)</label>
            <Flex>
               <div className="box"></div>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
         <li>
            <label>Vertical</label>
            <Flex direction="column">
               <div className="box"></div>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
         <li>
            <label>Default (Horizontal) + Padding</label>
            <Flex padding={true}>
               <div className="box"></div>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
         <li>
            <label>Vertical + Padding</label>
            <Flex direction="column" padding={true}>
               <div className="box"></div>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
      </ul>
   )
}