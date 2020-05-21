import * as React from 'react';
import { PushButton } from '~lib';

export function ButtonExamples() {
   return (
      <ul>
         <li>
            <label>PushButton</label>
            <PushButton>Default</PushButton>
         </li>
         <li>
            <label>PushButton + Toggle</label>
            <PushButton isToggle={true}>Default</PushButton>
         </li>
      </ul>
   )
}