import * as React from 'react';
import { Button } from '../../lib/components/button';
import { HLayout, VLayout } from '../../lib/components/layout';
import { LI } from './common/listItem';

export function ButtonExamples() {
   return (
      <ul>
         <LI label="Default">
            <HLayout>
               <Button />
            </HLayout>
         </LI>
      </ul>
   );
}