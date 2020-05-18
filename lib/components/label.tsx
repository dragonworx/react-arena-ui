import * as React from 'react';
import { ReactNode } from 'react';
import { Layout } from './layout';
import { Theme, createUseStyles } from '~lib';

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

   const classes = useStyles(props);

   const flexDirection = positionPropToFlexDirection[position];
   const alignItems = alignPropToFlexAlignItems[align];

   return (
      <div className={classes.label}>
         <Layout direction={flexDirection} align={alignItems}>
            <div className={classes.text} data-arena-type="label-text" data-arena-align={align}>{text}</div>
            {children}
         </Layout>
      </div>
   )
}

const useStyles = (props: LabelProps) => {
   return createUseStyles((theme: Theme) => {
      let style = {
         display: 'inline-block',
         '& *[data-arena-type="flex"][data-arena-direction="horizontal"]': {
            '& > *[data-arena-type="label-text"][data-arena-align="near"]': {
               marginTop: 0,
               alignSelf: 'flex-start',
            },
            '& > *[data-arena-type="label-text"][data-arena-align="far"]': {
               marginBottom: 0,
               alignSelf: 'flex-end',
            },
         },
         '& *[data-arena-type="flex"][data-arena-direction="vertical"]': {
            '& > *[data-arena-type="label-text"][data-arena-align="near"]': {
               marginLeft: 0,
               alignSelf: 'flex-start',
            },
            '& > *[data-arena-type="label-text"][data-arena-align="far"]': {
               marginRight: 0,
               alignSelf: 'flex-end',
            },
         },
      } as any;
      return {
         'label': style,
         'text': {
            color: theme.textColorLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.fontSizeSmall,
            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
            margin: theme.padding * 0.9,
         }
      };
   })();
};