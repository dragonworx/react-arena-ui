import * as React from 'react';
import { Button, Checkbox, Radio, HLayout, VLayout } from '~lib';
import { LI } from './listItem';
import { BoxSmall } from './box';

const sample = require('../img/sample.png');

export function ButtonExamples() {
   return (
      <ul>
         <LI label="Button" height={45}>
            <Button onClick={() => console.log('Button Clicked!')}>Button (onClick)</Button>
            <Button><span>Button</span><BoxSmall /></Button>
            <Button padded={false} color="#666" highlightColor="#999" bgColor="white">
               <VLayout align="center" justify="center" imageSrc={sample} imageSize="cover" width={150} height="100%">
                  <span>With Background</span>
               </VLayout>
            </Button>
         </LI>
         <LI label="Button + Toggle" height={45}>
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
         <LI label="Radio" direction="vertical">
            <HLayout padded>
               <Radio />
               <Radio checked={true} />
            </HLayout>
            <HLayout padded>
               <Radio label="Left Label" />
               <Radio label="Right Label" position="right" />
            </HLayout>
            <HLayout padded>
               <Radio label="Top Label" position="top" />
               <Radio label="Bottom Label" position="bottom" />
            </HLayout>
         </LI>
      </ul>
   )
}