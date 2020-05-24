import * as React from 'react';
import { Layout, Title } from '~lib';

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
         <Title text={`${label}:`} />
         <Layout direction={direction} padding={padding} align="near" height={height}>
            {children}
         </Layout>
      </li>
   )
}