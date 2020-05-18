import * as React from 'react';
import { Layout, Label } from '~lib';
import { BoxSmall, BoxMedium, BoxLarge } from './box';

export function LayoutExamples() {
   return (
      <ul>
         <li>
            <label>Default (Horizontal) + Padded</label>
            <Layout padded={true}>
               <Layout>
                  <BoxSmall />
                  <BoxSmall />
               </Layout>
               <Layout padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </Layout>
            </Layout>
         </li>
         <li>
            <label>Vertical + Padded</label>
            <Layout padded={true}>
               <Layout direction="vertical">
                  <BoxSmall />
                  <BoxSmall />
               </Layout>
               <Layout direction="vertical" padded={true}>
                  <BoxSmall />
                  <BoxSmall />
               </Layout>
            </Layout>
         </li>
         <li>
            <label>Horizontal + Align</label>
            <Layout padded={true}>
               <Label text="Near" align="near">
                  <Layout padded={true} align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Center">
                  <Layout padded={true} align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Far" align="far">
                  <Layout padded={true} align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
            </Layout>
         </li>
         <li>
            <label>Horizontal-Reverse + Align</label>
            <Layout padded={true}>
               <Label text="Near" align="near" position="right">
                  <Layout padded={true} direction="horizontal-reverse" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Center" position="right">
                  <Layout padded={true} direction="horizontal-reverse" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Far" align="far" position="right">
                  <Layout padded={true} direction="horizontal-reverse" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
            </Layout>
         </li>
         <li>
            <label>Vertical + Align</label>
            <Layout padded={true}>
               <Label text="Near" position="top" align="near">
                  <Layout padded={true} direction="vertical" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Center" position="top">
                  <Layout padded={true} direction="vertical" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Far" position="top" align="far">
                  <Layout padded={true} direction="vertical" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
            </Layout>
         </li>
         <li>
            <label>Vertical-Reverse + Align</label>
            <Layout padded={true}>
               <Label text="Near" position="bottom" align="near">
                  <Layout padded={true} direction="vertical-reverse" align="near">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Center" position="bottom">
                  <Layout padded={true} direction="vertical-reverse" align="center">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
               <Label text="Far" position="bottom" align="far">
                  <Layout padded={true} direction="vertical-reverse" align="far">
                     <BoxSmall />
                     <BoxMedium />
                     <BoxLarge />
                  </Layout>
               </Label>
            </Layout>
         </li>
      </ul>
   )
}