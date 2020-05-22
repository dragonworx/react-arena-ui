import * as React from 'react';
import { Panel, HLayout, Background } from '~lib';
import { LI } from './listItem';
import { BoxSmall, BoxMedium } from './box';

const sample = require('../img/koala.jpeg');

export function PanelExamples() {
   return (
      <ul>
         <LI label="Default" height={50}>
            <Panel>
               <HLayout padded>
                  <span>Panel content...</span>
               </HLayout>
            </Panel>
            <Panel>
               <HLayout padded>
                  <BoxSmall />
                  <span>Panel content...</span>
               </HLayout>
            </Panel>
         </LI>
         <LI label="With Title &amp; Content">
            <Panel title="Panel Title">
               <HLayout padded>
                  <BoxMedium />
                  <span>Panel content...</span>
               </HLayout>
            </Panel>
         </LI>
         <LI label="With Background Color" direction="vertical">
            <HLayout width="100%" height={100}>
               <Panel title="Blue">
                  <Background color="blue" padded>
                     <span>Panel content...</span>
                  </Background>
               </Panel>
               <Panel title="Blue" titleColor="blue">
                  <Background color="blue" padded>
                     <span>Panel content and coloured title...</span>
                  </Background>
               </Panel>
            </HLayout>
         </LI>
         <LI label="With Image Background" direction="vertical" padding={20}>
            <HLayout width="100%" height={100}>
               <Panel title="Blue">
                  <Background imageSrc={sample} padded>
                     <HLayout padded>
                        <span>Panel content...</span>
                     </HLayout>
                  </Background>
               </Panel>
               <Panel title="Image">
                  <Background imageSrc={sample} imageSize="cover" padded>
                     <HLayout padded>
                        <span>Panel content...</span>
                     </HLayout>
                  </Background>
               </Panel>
            </HLayout>
            <HLayout width="100%" height={100}>
               <Panel title="Blue">
                  <Background imageSrc={sample} imageSize="contain" padded>
                     <HLayout padded>
                        <span>Panel content...</span>
                     </HLayout>
                  </Background>
               </Panel>
               <Panel title="Image">
                  <Background imageSrc={sample} imageSize="contain" imageRepeat="no-repeat" imagePos="center" padded>
                     <HLayout padded>
                        <span>Panel content...</span>
                     </HLayout>
                  </Background>
               </Panel>
            </HLayout>
         </LI>
      </ul>
   )
}