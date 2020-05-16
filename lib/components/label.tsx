import * as React from 'react';
import { ReactNode } from 'react';
import { Flex } from './layout';

export interface LabelProps {
   children?: ReactNode;
   text: string;
   position?: 'left' | 'top' | 'right' | 'bottom';
   align?: 'near' | 'center' | 'far';
}

const positionPropToFlexDirection = {
   'left': 'horizontal',
   'right': 'horizontal-reverse',
   'top': 'vertical',
   'bottom': 'vertical-reverse',
} as any;

const alignPropToFlexAlignItems = {
   'near': 'flex-start',
   'center': 'center',
   'far': 'flex-end',
} as any;

export function Label(props: LabelProps) {
   const { children, text, position = 'left', align = 'center' } = props;

   const flexDirection = positionPropToFlexDirection[position];
   const alignItems = alignPropToFlexAlignItems[align];

   return (
      <div className="a2d-label">
         <Flex direction={flexDirection} align={alignItems}>
            <div className={`a2d-label-text ${align}`}>{text}</div>
            {children}
         </Flex>
      </div>
   )
}