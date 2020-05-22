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
            <HLayout width="100%" height={100}>
               <Panel title="Panel Title">
                  <HLayout padded>
                     <BoxMedium />
                     <span>Panel content...</span>
                  </HLayout>
               </Panel>
               <Panel border={false} radius={0}>
                  <HLayout padded>
                     <BoxMedium />
                     <span>Panel content no border...</span>
                  </HLayout>
               </Panel>
            </HLayout>
         </LI>
         <LI label="With Background Color" direction="vertical">
            <HLayout width="100%" height={100}>
               <Panel title="Color" padded={false}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true}>
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
               <Panel title="Color" padded={false} titleBg={panelColor} border={false} radius={0}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} radius={0}>
                     <span>Panel content with color title no border...</span>
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
               <Panel title="Image + Background Color" padded={false} titleBg={panelColor}>
                  <VLayout bgColor={panelColor} height="100%" innerPadding={true} imageSrc={sample} imageSize="50px 50px" imageRepeat="no-repeat" imagePos="center 30px">
                     <span>Panel content with color title and image placement</span>
                  </VLayout>
               </Panel>
            </HLayout>
         </LI>
         <LI label="With Background Gradient" direction="vertical" padding={20}>
            <HLayout width="100%" height={100}>
               <Panel title="Gradient" padded={false} titleBg="#eee" titleColor="black">
                  <VLayout height="100%" innerPadding={true} gradientStart="white" gradientStop="black" color="black">
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
               <Panel title="Gradient" padded={false} titleBg="#ccc" titleColor="black">
                  <VLayout height="100%" innerPadding={true} gradientStart="white" gradientStop="black" color="black" gradientAngle={-90}>
                     <span>Panel content...</span>
                  </VLayout>
               </Panel>
            </HLayout>
         </LI>
      </ul>
   )
}