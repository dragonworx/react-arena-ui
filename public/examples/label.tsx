import * as React from 'react';
import { Label, Title } from '../../lib/components/label';
import { Layout } from '../../lib/components/layout';
import { LI } from './common/listItem';
import { BoxMedium } from './common/box';

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
         <li>
            <Title text="Title (Default - Near):" />
            <Title text="Title (Center):" align="center" />
            <Title text="Title (Right):" align="right" />
            <Title text="Title (Coloured):" color="blue" />
         </li>
      </ul>
   )
}