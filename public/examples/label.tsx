import * as React from 'react';
import { Label, Layout } from '~lib';
import { LI } from './listItem';
import { BoxMedium } from './box';

export function LabelExamples() {
   return (
      <ul>
         <LI label="Default">
            <Label text="Label"><BoxMedium /></Label>
         </LI>
         <LI label="Left + Align">
            <Layout>
               <Label text="Near" align="near"><BoxMedium /></Label>
               <Label text="Center" align="center"><BoxMedium /></Label>
               <Label text="Far" align="far"><BoxMedium /></Label>
            </Layout>
         </LI>
         <LI label="Right + Align">
            <Layout>
               <Label text="Near" position="right" align="near"><BoxMedium /></Label>
               <Label text="Center" position="right"><BoxMedium /></Label>
               <Label text="Far" position="right" align="far"><BoxMedium /></Label>
            </Layout>
         </LI>
         <LI label="Top + Align">
            <Layout>
               <Label text="Near" position="top" align="near"><BoxMedium /></Label>
               <Label text="Center" position="top"><BoxMedium /></Label>
               <Label text="Far" position="top" align="far"><BoxMedium /></Label>
            </Layout>
         </LI>
         <LI label="Bottom + Align">
            <Layout>
               <Label text="Near" position="bottom" align="near"><BoxMedium /></Label>
               <Label text="Center" position="bottom"><BoxMedium /></Label>
               <Label text="Far" position="bottom" align="far"><BoxMedium /></Label>
            </Layout>
         </LI>
      </ul>
   )
}