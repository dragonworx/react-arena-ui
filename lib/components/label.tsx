import * as React from 'react';
import { ReactNode } from 'react';
import { Layout } from './layout';
import { Theme, createUseStyles, Position, Align } from '~lib';

export interface LabelProps {
   children?: ReactNode;
   text: string;
   position?: Position;
   align?: Align;
}

const alignToFlexAlign = {
   'near': 'flex-start',
   'center': 'center',
   'far': 'flex-end',
} as any;

export function Label(props: LabelProps) {
   const { children, text, position = 'left', align = 'center' } = props;

   const classes = useStyles(props);

   const alignItems = alignToFlexAlign[align];

   return (
      <div className={classes.label} data-arena={`label:${position}:${align}`}>
         <Layout direction={position === 'left' || position === 'right' ? 'horizontal' : 'vertical'} reverse={position === 'right' || position === 'bottom'} align={alignItems} padded>
            <div className={classes.text} data-arena={`label-text:${align}`}>{text}</div>
            {children}
         </Layout>
      </div>
   )
}

const useStyles = (props: LabelProps) => {
   return createUseStyles((theme: Theme) => {
      let style = {
         display: 'inline-block',
         cursor: 'default',
         '&[data-arena*="label:top"] *[data-arena*="label-text"]': {
            marginTop: [0, '!important'],
         },
         '&[data-arena*="label:bottom"] *[data-arena*="label-text"]': {
            marginBottom: [0, '!important'],
         },
         '& *[data-arena*="layout:horizontal"]': {
            '& > *[data-arena*="label-text:near"]': {
               marginTop: 0,
               alignSelf: 'flex-start',
            },
            '& > *[data-arena*="label-text:far"]': {
               marginBottom: 0,
               alignSelf: 'flex-end',
            },
         },
         '& *[data-arena*="layout:vertical"]': {
            '& > *[data-arena*="label-text"]': {
               margin: theme.paddingSmall,
               alignSelf: 'flex-start',
            },
            '& > *[data-arena*="label-text:near"]': {
               marginLeft: 0,
               alignSelf: 'flex-start',
            },
            '& > *[data-arena*="label-text:far"]': {
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
            fontFamily: 'arena-regular',
            textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)',
            margin: theme.padding,
         }
      };
   })();
};