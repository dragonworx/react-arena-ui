import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface LayoutProps {
   children?: ReactNode;
   padded?: boolean;
   direction?: 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse';
   wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
   justify?: 'near' | 'center' | 'far';
   align?: 'near' | 'center' | 'far';
   content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline' | 'safe' | 'unsafe';
}

interface Lookup {
   [key: string]: string;
}

const directionPropToFlexDirection = {
   'horizontal': 'row',
   'horizontal-reverse': 'row-reverse',
   'vertical': 'column',
   'vertical-reverse': 'column-reverse',
} as Lookup;

const propToFlexValue = {
   'near': 'flex-start',
   'center': 'center',
   'far': 'flex-end',
} as Lookup;

const directionPropToMargin = {
   'horizontal': 'marginRight',
   'horizontal-reverse': 'marginLeft',
   'vertical': 'marginBottom',
   'vertical-reverse': 'marginTop',
} as Lookup;

export function Layout(props: LayoutProps) {
   const { children, direction = 'horizontal' } = props;

   const classes = useStyles(props);

   return <div className={classes.flex} data-arena-type="flex" data-arena-direction={direction.replace('-reverse', '')}>{ children }</div>
}

const useStyles = (props: LayoutProps) => {
   return createUseStyles((theme: Theme) => {
      let style = {
         display: 'flex',
         flexDirection: props.direction ? directionPropToFlexDirection[props.direction] : undefined,
         flexWrap: props.wrap,
         justifyContent: props.justify ? propToFlexValue[props.justify] : undefined,
         alignItems: props.align ? propToFlexValue[props.align] : undefined,
         alignContent: props.content,
      } as any;
      if (props.padded) {
         const marginKey = directionPropToMargin[props.direction || 'horizontal'];
         style = {
            ...style,
            '& > *': {
               [marginKey]: theme.padding,
            },
            '& > :last-child': {
               [marginKey]: 0,
            }
         }
      }
      return {
         'flex': style,
      };
   })();
};