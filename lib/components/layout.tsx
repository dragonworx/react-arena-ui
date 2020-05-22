import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles, Align, Direction, css } from '~lib';

export interface LayoutProps {
   children?: ReactNode;
   padded?: boolean;
   padding?: number;
   innerPadding?: boolean;
   direction?: Direction;
   reverse?: boolean; 
   wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
   justify?: Align;
   align?: Align;
   content?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline' | 'safe' | 'unsafe';
   height?: string | number;
   width?: string | number;
   color?: string;
   bgColor?: string;
   radius?: number;
   imageSrc?: string;
   imageSize?: string;
   imageRepeat?: 'no-repeat' | 'repeat-x' | 'repeat-y';
   gradientStart?: string;
   gradientStop?: string;
   gradientAngle?: number;
   imagePos?: string;
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

   return <div className={css(classes.layout, classes.background)} data-arena={`layout:${direction}`}>{ children }</div>
}

type HVLayoutProps = Omit<LayoutProps, 'direction'>;

export function HLayout(props: HVLayoutProps) {
   return <Layout direction="horizontal" {...props} />;
}

export function VLayout(props: HVLayoutProps) {
   return <Layout direction="vertical" {...props} />;
}

const useStyles = (props: LayoutProps) => {
   const direction = `${props.direction || 'horizontal'}${props.reverse ? '-reverse' : ''}`;
   const { gradientStart, gradientStop, gradientAngle = 0 } = props;
   let gradient: string | undefined = undefined;
   if (gradientStart && gradientStop) {
      gradient = `linear-gradient(${gradientAngle + 180}deg, ${gradientStart} 0, ${gradientStop} 100%)`;
   }
   return createUseStyles((theme: Theme) => {
      let style = {
         display: 'flex',
         borderRadius: typeof props.radius === 'number' ? props.radius : theme.borderRadius,
         flexDirection: direction ? directionPropToFlexDirection[direction] : undefined,
         flexWrap: props.wrap,
         justifyContent: props.justify ? propToFlexValue[props.justify] : undefined,
         alignItems: props.align ? propToFlexValue[props.align] : undefined,
         alignContent: props.content,
         width: props.width,
         height: props.height,
         padding: props.innerPadding ? props.padding ? props.padding : theme.padding : 0,
      } as any;
      if (props.padded || props.padding && props.padding > 0) {
         const marginKey = directionPropToMargin[direction || 'horizontal'];
         style = {
            ...style,
            '& > *': {
               [marginKey]: props.padding ? props.padding : theme.padding,
            },
            '& > :last-child': {
               [marginKey]: [0, '!important'],
            }
         }
      }
      return {
         'layout': style,
         'background': {
            color: props.color ? props.color : undefined,
            backgroundColor: props.bgColor ? props.bgColor : undefined,
            backgroundImage: props.imageSrc ? `url(${props.imageSrc})` : undefined,
            backgroundSize: props.imageSrc && props.imageSize ? props.imageSize : 'auto',
            backgroundRepeat: props.imageRepeat ? props.imageRepeat : 'repeat',
            backgroundPosition: props.imagePos ? props.imagePos : 'top left',
            background: gradient,
         }
      };
   })();
};