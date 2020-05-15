import * as React from 'react';
import { ReactNode } from 'react';

export interface FlexProps {
   children?: ReactNode;
   padded?: boolean;
   direction?: 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse';
   wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
   justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right' | 'safe' | 'unsafe';
   align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe';
   content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'start' | 'end' | 'baseline' | 'safe' | 'unsafe';
}

const flexDirection = {
   'horizontal': 'row',
   'horizontal-reverse': 'row-reverse',
   'vertical': 'column',
   'vertical-reverse': 'column-reverse',
} as any;

export function Flex(props: FlexProps) {
   const {
      children,
      padded,
      direction,
      wrap,
      justify,
      align,
      content,
   } = props;

   const style = {
      flexDirection: direction ? flexDirection[direction] : undefined,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      alignContent: content,
   };

   return <div className={`a2d a2d-flex${padded ? ' padded' : ''} ${(direction === 'horizontal' || direction === 'horizontal-reverse' || !direction) ? 'horiz' : 'vert'}`} style={style}>{ children }</div>
}