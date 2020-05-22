import * as React from 'react';
import { Button, Checkbox, HLayout, Background, Layout } from '~lib';
import { LI } from './listItem';
import { BoxSmall } from './box';

const sample = require('../img/sample.png');

export function ButtonExamples() {
   return (
      <ul>
         <LI label="Button" height={35}>
            <Button onClick={() => console.log('Button Clicked!')}>Button (onClick)</Button>
            <Button><span>Button</span><BoxSmall /></Button>
            <Button>
               <Background imageSrc={sample} imageSize="cover" width={150}>
                  <Layout align="center" justify="center">
                     <span>With Background</span>
                  </Layout>
               </Background>
            </Button>
         </LI>
         <LI label="Button + Toggle">
            <Button toggle><span>Button</span></Button>
            <Button toggle><span>Button</span><BoxSmall /></Button>
            <Button toggle isToggled={true} onToggle={(isToggled: boolean) => console.log('Button Toggled!', isToggled)}>Toggled (onToggle)</Button>
         </LI>
         <LI label="Checkbox" direction="vertical">
            <HLayout padded>
               <Checkbox />
               <Checkbox checked={true} />
            </HLayout>
            <HLayout padded>
               <Checkbox label="Left Label" />
               <Checkbox label="Right Label" position="right" />
            </HLayout>
            <HLayout padded>
               <Checkbox label="Top Label" position="top" />
               <Checkbox label="Bottom Label" position="bottom" />
            </HLayout>
         </LI>
      </ul>
   )
}