import * as React from 'react';
import {
   Button,
   Checkbox,
   Radio,
   HLayout,
   VLayout,
   RadioGroup,
   ExpandButton,
   ToolButton,
   ToolButtonGroup,
} from '~lib';
import { LI } from './listItem';
import { BoxSmall } from './box';

const sample = require('../img/sample.png');
const koala = require('../img/koala.jpeg');

export function ButtonExamples() {
   return (
      <ul>
         <LI label="Button" height={45}>
            <Button name="button1" onClick={name => console.log('Button Clicked!', name)}>Button (onClick)</Button>
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
            <HLayout>
               <Checkbox />
               <Checkbox checked={true} />
            </HLayout>
            <HLayout>
               <Checkbox label="Left Label" />
               <Checkbox label="Right Label" position="right" />
            </HLayout>
            <HLayout>
               <Checkbox label="Top Label" position="top" />
               <Checkbox label="Bottom Label" position="bottom" />
            </HLayout>
         </LI>
         <LI label="Radio" direction="vertical">
            <HLayout>
               <Radio />
               <Radio checked={true} />
            </HLayout>
            <HLayout>
               <Radio label="Left Label" />
               <Radio label="Right Label" position="right" />
            </HLayout>
            <HLayout>
               <Radio label="Top Label" position="top" />
               <Radio label="Bottom Label" position="bottom" />
            </HLayout>
         </LI>
         <LI label="RadioGroup Vertical" direction="vertical">
            <HLayout>
               <RadioGroup options={['Lef1', 'Left2', 'Left3']} />
               <RadioGroup options={['Right1', 'Right2', 'Right3']} position="right" defaultValue="Right2" />
            </HLayout>
         </LI>
         <LI label="RadioGroup Horizontal" direction="horizontal">
            <HLayout>
               <RadioGroup options={['Top1', 'Top2', 'Top3']} direction="horizontal" />
               <RadioGroup options={['Bottom1', 'Bottom2', {
                  label: 'Bottom3',
                  value: 'Bottom3'
               }]}
                  direction="horizontal"
                  position="bottom"
                  defaultValue="Bottom2"
                  onChange={(value: string) => console.log('RadioGroup.onChanged!', value)}
               />
            </HLayout>
         </LI>
         <LI label="Expand Button">
            <HLayout align="center">
               <ExpandButton />
               <ExpandButton expanded={true} />
               <ExpandButton size={20} />
            </HLayout>
         </LI>
         <LI label="ToolButton + ToolButtonGroup">
            <HLayout align="center">
               <ToolButton name="button1" iconSrc={sample} />
               <ToolButton name="button2" iconSrc={koala} />
               <ToolButton name="button3" isSelected={true} text="Tool" />
               <HLayout padded={false}>
                  <ToolButtonGroup selected={1}>
                     <ToolButton name="button1" iconSrc={sample} />
                     <ToolButton name="button2" iconSrc={koala} />
                     <ToolButton name="button3" text="Tool" />
                  </ToolButtonGroup>
               </HLayout>
            </HLayout>
         </LI>
      </ul>
   )
}