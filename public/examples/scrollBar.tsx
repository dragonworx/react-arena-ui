import * as React from 'react';
import { ScrollBar } from '../../lib/components/scrollBar';
import { HLayout, VLayout } from '../../lib/components/layout';
import { LI } from './common/listItem';

export function ScrollBarExamples() {
   return (
      <ul>
         <LI label="Default">
            <HLayout>
               <ScrollBar />
            </HLayout>
         </LI>
      </ul>
   );
}