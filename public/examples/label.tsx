import * as React from 'react';
import { Label, Layout } from '~lib';
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
            <Layout padded={true}>
               <Label text="Near" align="near"><BoxMedium /></Label>
               <Label text="Center" align="center"><BoxMedium /></Label>
               <Label text="Far" align="far"><BoxMedium /></Label>
            </Layout>
         </li>
         <li>
            <label>Right</label>
            <Layout padded={true}>
               <Label text="Near" position="right" align="near"><BoxMedium /></Label>
               <Label text="Center" position="right"><BoxMedium /></Label>
               <Label text="Far" position="right" align="far"><BoxMedium /></Label>
            </Layout>
         </li>
         <li>
            <label>Top</label>
            <Layout padded={true}>
               <Label text="Near" position="top" align="near"><BoxMedium /></Label>
               <Label text="Center" position="top"><BoxMedium /></Label>
               <Label text="Far" position="top" align="far"><BoxMedium /></Label>
            </Layout>
         </li>
         <li>
            <label>Bottom</label>
            <Layout padded={true}>
               <Label text="Near" position="bottom" align="near"><BoxMedium /></Label>
               <Label text="Center" position="bottom"><BoxMedium /></Label>
               <Label text="Far" position="bottom" align="far"><BoxMedium /></Label>
            </Layout>
         </li>
      </ul>
   )
}