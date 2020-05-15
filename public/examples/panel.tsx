import * as React from 'react';
import { Panel } from '~lib';

export function PanelExamples() {
   return (
      <ul>
         <li>
            <label>Default</label>
            <Panel />
         </li>
         <li>
            <label>With Title &amp; Content</label>
            <Panel title="Panel Title">
               Panel contents...
            </Panel>
         </li>
      </ul>
   )
}