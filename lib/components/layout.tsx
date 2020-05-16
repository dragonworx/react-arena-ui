import * as React from 'react';
import { ReactNode } from 'react';

export interface FlexProps {
   children?: ReactNode;
   padded?: boolean;
   direction?: 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse';
   wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
   justify?: 'near' | 'center' | 'far';
   align?: 'near' | 'center' | 'far';
   content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline' | 'safe' | 'unsafe';
}

const directionPropToFlexDirection = {
   'horizontal': 'row',
   'horizontal-reverse': 'row-reverse',
   'vertical': 'column',
   'vertical-reverse': 'column-reverse',
} as any;

const propToFlexValue = {
   'near': 'flex-start',
   'center': 'center',
   'far': 'flex-end',
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
      flexDirection: direction ? directionPropToFlexDirection[direction] : undefined,
      flexWrap: wrap,
      justifyContent: justify ? propToFlexValue[justify] : undefined,
      alignItems: align ? propToFlexValue[align] : undefined,
      alignContent: content,
   };

   return <div className={`a2d-flex${padded ? ' padded' : ''} ${(direction === 'horizontal' || direction === 'horizontal-reverse' || !direction) ? 'horiz' : 'vert'}`} style={style}>{ children }</div>
}