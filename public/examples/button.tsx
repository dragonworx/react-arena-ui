import * as React from 'react';
import { Button, Checkbox } from '~lib';
import { LI } from './listItem';
import { BoxSmall } from './box';

export function ButtonExamples() {
   return (
      <ul>
         <LI label="Button">
            <Button>Button</Button>
            <Button><span>Button</span><BoxSmall /></Button>
         </LI>
         <LI label="Button + Toggle">
            <Button isToggle>Button</Button>
            <Button isToggle><span>Button</span><BoxSmall /></Button>
         </LI>
         <LI label="Checkbox">
            <Checkbox />
            <Checkbox />
         </LI>
      </ul>
   )
}