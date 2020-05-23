import * as React from 'react';
import { Label, HLayout, VLayout } from '~lib';
import { LI } from './listItem';
import { BoxSmall, BoxMedium, BoxLarge } from './box';

const padding = 30;

export function LayoutExamples() {
   return (
      <ul>
         <LI label="HLayout + No Padding">
            <HLayout>
               <BoxSmall />
               <BoxSmall />
            </HLayout>
            <HLayout padded={false}>
               <BoxSmall />
               <BoxSmall />
            </HLayout>
         </LI>
         <LI label="VLayout + No Padding">
            <VLayout>
               <BoxSmall />
               <BoxSmall />
            </VLayout>
            <VLayout padded={false}>
               <BoxSmall />
               <BoxSmall />
            </VLayout>
         </LI>
         <LI label="HLayout + Align">
            <Label text="Near" align="near">
               <HLayout align="near">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
            <Label text="Center">
               <HLayout align="center">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
            <Label text="Far" align="far">
               <HLayout align="far">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
         </LI>
         <LI label="HLayout Reverse + Align">
            <Label text="Near" align="near" position="right">
               <HLayout reverse align="near">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
            <Label text="Center" position="right">
               <HLayout reverse align="center">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
            <Label text="Far" align="far" position="right">
               <HLayout reverse align="far">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </HLayout>
            </Label>
         </LI>
         <LI label="VLayout + Align">
            <Label text="Near" position="top" align="near">
               <VLayout align="near">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
            <Label text="Center" position="top">
               <VLayout align="center">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
            <Label text="Far" position="top" align="far">
               <VLayout align="far">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
         </LI>
         <LI label="VLayout Reverse + Align">
            <Label text="Near" position="bottom" align="near">
               <VLayout reverse align="near">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
            <Label text="Center" position="bottom">
               <VLayout reverse align="center">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
            <Label text="Far" position="bottom" align="far">
               <VLayout reverse align="far">
                  <BoxSmall />
                  <BoxMedium />
                  <BoxLarge />
               </VLayout>
            </Label>
         </LI>
      </ul>
   )
}