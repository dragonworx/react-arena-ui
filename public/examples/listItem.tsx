import * as React from 'react';
import { HLayout } from '~lib';

export interface ListItemProps {
   children: React.ReactNode;
   label: string;
}

export function LI(props: ListItemProps) {
   const { children, label } = props;

   return (
      <li>
         <label>{label}</label>
         <HLayout padded>
            {children}
         </HLayout>
      </li>
   )
}