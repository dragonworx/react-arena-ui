import * as React from 'react';
import { Button, HLayout } from '~lib';
import { BoxSmall } from './box';

export function ButtonExamples() {
   return (
      <ul>
         <li>
            <label>Button</label>
            <HLayout padded>
               <Button>Button</Button>
               <Button><span>Button</span><BoxSmall /></Button>
            </HLayout>
         </li>
         <li>
            <label>Button + Toggle</label>
            <HLayout padded>
               <Button isToggle>Button</Button>
               <Button isToggle><span>Button</span><BoxSmall /></Button>
            </HLayout>
         </li>
      </ul>
   )
}