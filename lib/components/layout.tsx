import * as React from 'react';
import { ReactNode } from 'react';

export interface FlexProps {
   children?: ReactNode;
   padding?: boolean;
   direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
   wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
   justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right' | 'safe' | 'unsafe';
   align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe' | 'unsafe';
   content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'start' | 'end' | 'baseline' | 'safe' | 'unsafe';
}

export function Flex(props: FlexProps) {
   const {
      children,
      padding,
      direction,
      wrap,
      justify,
      align,
      content,
   } = props;

   const style = {
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      alignContent: content,
   };

   return <div className={`a2d a2d-flex${padding ? ' padded' : ''} ${(direction === 'row' || !direction) ? 'horiz' : 'vert'}`} style={style}>{ children }</div>
}