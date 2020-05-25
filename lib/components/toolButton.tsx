import * as React from 'react';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { Theme, createUseStyles, useTheme, Label, Position } from '~lib';
import { Button } from './button';

export interface ToolButtonProps {
   children?: ReactNode;
   size?: number;
}

export function ToolButton(props: ToolButtonProps) {
   const { children, size: _size } = props;

   const theme = useTheme() as Theme;
   const size = _size ? _size : theme.paddingLarge * 1.8;
   const arrowSize = size * 0.3;
   const classes = useStyles(props, arrowSize);

   return (
      <Button
         type="tool"
         className={classes.toolButton}
         padded={false}
         width={size}
         height={size}
         radius={0}
         useLayout={false}
         fillContent={false}
      >
         {children}
         <div className={classes.icon}>
            <svg width={`${arrowSize}px`} height={`${arrowSize}px`} viewBox={`0 0 ${arrowSize} ${arrowSize}`} preserveAspectRatio="xMidYMid meet">
               <polygon points={`${arrowSize / 2},0 0,${arrowSize} ${arrowSize},${arrowSize}`} />
            </svg>
         </div>
      </Button>
   )
}

const useStyles = (props: ToolButtonProps, arrowSize: number) => {
   const { } = props;
   return createUseStyles((theme: Theme) => ({
      'toolButton': {
         display: ['flex', '!important'],
         alignItems: 'center',
         justifyContent: 'center',
         '& svg': {
            fill: theme.backgroundColorDark,
            stroke: theme.borderColorLight,
            strokeWidth: `1px`,
            transform: 'rotateZ(135deg) rotateX(60deg)'
         },
         '& img': {
            width: '100%',
         }
      },
      'icon': {
         width: [arrowSize, '!important'],
         height: [arrowSize, '!important'],
         position: 'absolute',
         right: 0,
         bottom: 0,
      }
   }))();
};