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
            </Flex>
         </li>
         <li>
            <label>Vertical</label>
            <Flex direction="vertical">
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
         <li>
            <label>Default (Horizontal) + Padding</label>
            <Flex padded={true}>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
         <li>
            <label>Vertical + Padding</label>
            <Flex direction="vertical" padded={true}>
               <div className="box"></div>
               <div className="box"></div>
            </Flex>
         </li>
      </ul>
   )
}