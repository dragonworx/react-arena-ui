import * as React from 'react';
import { Label, HLayout, VLayout } from '~lib';
import { LI } from './listItem';
import { BoxSmall, BoxMedium, BoxLarge } from './box';

const padding = 30;

export function LayoutExamples() {
   return (
      <ul>
         <LI label="HLayout + Padded">
            <HLayout>
               <BoxSmall />
               <BoxSmall />
            </HLayout>
            <HLayout padded={true}>
               <BoxSmall />
               <BoxSmall />
            </HLayout>
         </LI>
         <LI label="VLayout + Padded">
            <VLayout>
               <BoxSmall />
               <BoxSmall />
            </VLayout>
            <VLayout padded={true}>
               <BoxSmall />
               <BoxSmall />
            </VLayout>
         </LI>
         <LI label="HLayout + Align">
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
         </LI>
         <LI label="HLayout Reverse + Align">
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
         </LI>
         <LI label="VLayout + Align">
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
         </LI>
         <LI label="VLayout Reverse + Align">
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
         </LI>
      </ul>
   )
}