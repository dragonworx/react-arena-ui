import * as React from 'react';
import { Layout } from '~lib';

export interface ListItemProps {
   children: React.ReactNode;
   label: string;
   direction?: 'horizontal' | 'vertical';
   height?: number;
   padding?: number;
}

export function LI(props: ListItemProps) {
   const { children, label, height, direction = 'horizontal', padding } = props;

   return (
      <li>
         <label>{label}</label>
         <Layout direction={direction} padded padding={padding} align="near" height={height}>
            {children}
         </Layout>
      </li>
   )
}