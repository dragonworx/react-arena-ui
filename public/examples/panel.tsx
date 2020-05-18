import * as React from 'react';
import { Panel } from '~lib';
import { BoxMedium } from './box';

export function PanelExamples() {
   return (
      <ul>
         <li>
            <label>Default</label>
            <Panel>
               <BoxMedium />
            </Panel>
         </li>
         <li>
            <label>With Title &amp; Content</label>
            <Panel title="Panel Title">
               <BoxMedium />
            </Panel>
         </li>
      </ul>
   )
}