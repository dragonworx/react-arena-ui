import * as React from 'react';
import { Label, Flex } from '~lib';
import { BoxMedium } from './box';

export function LabelExamples() {
   return (
      <ul>
         <li>
            <label>Default</label>
            <Label text="Label"><BoxMedium /></Label>
         </li>
         <li>
            <label>Left</label>
            <Flex padded={true}>
               <Label text="Near" align="near"><BoxMedium /></Label>
               <Label text="Center" align="center"><BoxMedium /></Label>
               <Label text="Far" align="far"><BoxMedium /></Label>
            </Flex>
         </li>
         <li>
            <label>Right</label>
            <Flex padded={true}>
               <Label text="Near" position="right" align="near"><BoxMedium /></Label>
               <Label text="Center" position="right"><BoxMedium /></Label>
               <Label text="Far" position="right" align="far"><BoxMedium /></Label>
            </Flex>
         </li>
         <li>
            <label>Top</label>
            <Flex padded={true}>
               <Label text="Near" position="top" align="near"><BoxMedium /></Label>
               <Label text="Center" position="top"><BoxMedium /></Label>
               <Label text="Far" position="top" align="far"><BoxMedium /></Label>
            </Flex>
         </li>
         <li>
            <label>Bottom</label>
            <Flex padded={true}>
               <Label text="Near" position="bottom" align="near"><BoxMedium /></Label>
               <Label text="Center" position="bottom"><BoxMedium /></Label>
               <Label text="Far" position="bottom" align="far"><BoxMedium /></Label>
            </Flex>
         </li>
      </ul>
   )
}