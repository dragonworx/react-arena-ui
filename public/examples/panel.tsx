import * as React from 'react';
import { Panel, HLayout, VLayout } from '~lib';
import { LI } from './listItem';
import { BoxSmall, BoxMedium } from './box';

const sample = require('../img/koala.jpeg');
const panelColor = '#4d4d6b';

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
               <Panel title="Blue" padded={false}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true}>
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
               <Panel title="Blue" padded={false} titleColor={panelColor}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true}>
                     <span>Panel content with color title...</span>
                  </VLayout>
               </Panel>
            </HLayout>
         </LI>
         <LI label="With Background Image" direction="vertical" padding={20}>
            <HLayout width="100%" height={100}>
               <Panel title="Image" padded={false}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} imageSrc={sample}>
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
               <Panel title="Image" padded={false}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} imageSrc={sample} imageSize="contain">
                     <span>Panel content with color title...</span>
                  </VLayout>
               </Panel>
            </HLayout>
            <HLayout width="100%" height={100}>
               <Panel title="Image" padded={false}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} imageSrc={sample} imageSize="cover">
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
               <Panel title="Image + Background Color" padded={false} titleColor={panelColor}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} imageSrc={sample} imageSize="50px 50px" imageRepeat="no-repeat" imagePos="center 30px">
                     <span>Panel content with color title and image placement</span>
                  </VLayout>
               </Panel>
            </HLayout>
         </LI>
      </ul>
   )
}