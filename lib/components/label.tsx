import * as React from 'react';
import { ReactNode } from 'react';
import { Layout } from './layout';
import { Theme, createUseStyles, Position, Align } from '~lib';

export interface LabelProps {
   children?: ReactNode;
   text: string;
   position?: Position;
   align?: Align;
   onClick?: () => void;
}

const alignToFlexAlign = {
   'near': 'flex-start',
   'center': 'center',
   'far': 'flex-end',
} as any;

export function Label(props: LabelProps) {
   const { children, text, position = 'left', align = 'center', onClick } = props;

   const classes = useStyles(props);

   const alignItems = alignToFlexAlign[align];

   return (
      <div className={classes.label} data-arena={`label:${position}:${align}`}>
         <Layout direction={position === 'left' || position === 'right' ? 'horizontal' : 'vertical'} reverse={position === 'right' || position === 'bottom'} align={alignItems} padded={false}>
            <div className={classes.text} data-arena={`label-text:${align}`} onClick={onClick}>{text}</div>
            {children}
         </Layout>
      </div>
   )
}

const useStyles = (props: LabelProps) => {
   const { position = 'left' } = props;
   return createUseStyles((theme: Theme) => {
      let style = {
         display: 'inline-block',
         cursor: props.onClick ? 'pointer' : 'default',
         userSelect: 'none',
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
            margin: [
               position === 'top' || position === 'bottom' ? theme.padding : 0,
               position === 'left' || position === 'right' ? theme.padding : 0,
            ],
         }
      };
   })();
};

export const alignToTextAlign = {
   'left': 'flex-start',
   'center': 'center',
   'right': 'flex-end',
} as any;

export interface TitleProps {
   text: string;
   align?: 'left' | 'center' | 'right';
}

export function Title(props: TitleProps) {
   const { text } = props;
   const classes = useTitleStyles(props);

   return <div className={classes.title}>{text}</div>;
}

const useTitleStyles = (props: TitleProps) => {
   return createUseStyles((theme: Theme) => ({
      title: {
         fontFamily: 'arena-light',
         fontSize: theme.fontSize,
         color: theme.textColor,
         textShadow: '0 3px 2px rgba(0,0,0,0.3)',
         marginBottom: theme.padding,
         display: 'block',
         backgroundColor: theme.backgroundColorDark,
         padding: '3px 7px',
         borderRadius: 5,
         borderBottom: `1px solid ${theme.accentColor}`,
         textAlign: props.align,
      }
   }))();
};