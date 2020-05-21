import * as React from 'react';
import { PushButton, HLayout } from '~lib';
import { BoxSmall } from './box';

export function ButtonExamples() {
   return (
      <ul>
         <li>
            <label>PushButton</label>
            <HLayout padded>
               <PushButton>Button</PushButton>
               <PushButton><span>Button</span><BoxSmall /></PushButton>
            </HLayout>
         </li>
         <li>
            <label>PushButton + Toggle</label>
            <HLayout padded>
               <PushButton isToggle>Button</PushButton>
               <PushButton isToggle><span>Button</span><BoxSmall /></PushButton>
            </HLayout>
         </li>
      </ul>
   )
}