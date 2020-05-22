import * as React from 'react';
import { Panel } from '~lib';
import { LI } from './listItem';
import { BoxMedium } from './box';

export function PanelExamples() {
   return (
      <ul>
         <LI label="Default">
            <Panel>
               <BoxMedium />
            </Panel>
         </LI>
         <LI label="With Title &amp; Content">
            <Panel title="Panel Title">
               <BoxMedium />
            </Panel>
         </LI>
      </ul>
   )
}