import * as React from 'react';
import { Flex, Label } from '~lib';
import { BoxSmall, BoxMedium, BoxLarge } from './box';

export function LayoutExamples() {
   return (
      <ul>
         <li>
            <label>Default (Horizontal) + Padded</label>
            <Flex padded={true}>
               <Flex>
                  <BoxSmall />
                  <BoxSmall />
               </Flex>
               <Flex padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </Flex>
            </Flex>
         </li>
         <li>
            <label>Vertical + Padded</label>
            <Flex padded={true}>
               <Flex direction="vertical">
                  <BoxSmall />
                  <BoxSmall />
               </Flex>
               <Flex direction="vertical" padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </Flex>
            </Flex>
         </li>
         <li>
            <label>Direction - Horizontal + Align</label>
            <Flex padded={true}>
               <Label text="Near" align="near">
                  <Flex padded={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Center">
                  <Flex padded={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Far" align="far">
                  <Flex padded={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
            </Flex>
         </li>
         <li>
            <label>Direction - Horizontal-Reverse + Align</label>
            <Flex padded={true}>
               <Label text="Near" align="near" position="right">
                  <Flex padded={true} direction="horizontal-reverse" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Center" position="right">
                  <Flex padded={true} direction="horizontal-reverse" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Far" align="far" position="right">
                  <Flex padded={true} direction="horizontal-reverse" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
            </Flex>
         </li>
         <li>
            <label>Direction - Vertical + Align</label>
            <Flex padded={true}>
               <Label text="Near" position="top" align="near">
                  <Flex padded={true} direction="vertical" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Center" position="top">
                  <Flex padded={true} direction="vertical" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Far" position="top" align="far">
                  <Flex padded={true} direction="vertical" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
            </Flex>
         </li>
         <li>
            <label>Direction - Vertical-Reverse + Align</label>
            <Flex padded={true}>
               <Label text="Near" position="bottom" align="near">
                  <Flex padded={true} direction="vertical-reverse" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Center" position="bottom">
                  <Flex padded={true} direction="vertical-reverse" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
               <Label text="Far" position="bottom" align="far">
                  <Flex padded={true} direction="vertical-reverse" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Flex>
               </Label>
            </Flex>
         </li>
      </ul>
   )
}