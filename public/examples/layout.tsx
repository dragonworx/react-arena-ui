import * as React from 'react';
import { Layout, Label, HLayout, VLayout } from '~lib';
import { BoxSmall, BoxMedium, BoxLarge } from './box';

const padding = 30;

export function LayoutExamples() {
   return (
      <ul>
         <li>
            <label>HLayout + Padded</label>
            <HLayout padding={padding}>
               <HLayout>
                  <BoxSmall />
                  <BoxSmall />
               </HLayout>
               <HLayout padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </HLayout>
            </HLayout>
         </li>
         <li>
            <label>VLayout + Padded</label>
            <HLayout padding={padding}>
               <VLayout>
                  <BoxSmall />
                  <BoxSmall />
               </VLayout>
               <VLayout padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </VLayout>
            </HLayout>
         </li>
         <li>
            <label>HLayout + Align</label>
            <HLayout padded={true}>
               <Label text="Near" align="near">
                  <HLayout padded={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
               <Label text="Center">
                  <HLayout padded={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
               <Label text="Far" align="far">
                  <HLayout padded={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
            </HLayout>
         </li>
         <li>
            <label>HLayout Reverse + Align</label>
            <HLayout padded={true}>
               <Label text="Near" align="near" position="right">
                  <HLayout padded={true} reverse={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
               <Label text="Center" position="right">
                  <HLayout padded={true} reverse={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
               <Label text="Far" align="far" position="right">
                  <HLayout padded={true} reverse={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </HLayout>
               </Label>
            </HLayout>
         </li>
         <li>
            <label>VLayout + Align</label>
            <HLayout padded={true}>
               <Label text="Near" position="top" align="near">
                  <VLayout padded={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
               <Label text="Center" position="top">
                  <VLayout padded={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
               <Label text="Far" position="top" align="far">
                  <VLayout padded={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
            </HLayout>
         </li>
         <li>
            <label>VLayout Reverse + Align</label>
            <HLayout padded={true}>
               <Label text="Near" position="bottom" align="near">
                  <VLayout padded={true} reverse={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
               <Label text="Center" position="bottom">
                  <VLayout padded={true} reverse={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
               <Label text="Far" position="bottom" align="far">
                  <VLayout padded={true} reverse={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </VLayout>
               </Label>
            </HLayout>
         </li>
      </ul>
   )
}