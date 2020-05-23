import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface PanelProps {
   children?: ReactNode;
   border?: boolean;
   radius?: number;
   title?: string;
   titleColor?: string;
   titleBg?: string;
   padded?: boolean;
}

export function Panel(props: PanelProps) {
   const { title, children } = props;

   const classes = useStyles(props);

   return (
      <fieldset className={classes.panel} data-arena="panel">
         { title ? <legend>{ title }</legend> : null }
         { children }
      </fieldset>
   )
}

const useStyles = (props: PanelProps) => {
   const { padded = true, border = true } = props;
   return createUseStyles((theme: Theme) => ({
      'panel': {
         borderRadius: typeof props.radius === 'number' ? props.radius : theme.borderRadius,
         borderColor: theme.borderColor,
         borderWidth: border ? 1 : 0,
         borderStyle: 'outset',
         borderBottom: border ? `2px solid ${theme.borderColorDark}` : 'none',
         padding: padded ? theme.padding : 0,
         paddingTop: padded ? theme.padding : 0,
         paddingBottom: padded ? theme.padding * 1.2 : 0,
         backgroundColor: theme.backgroundColorLight,
         width: '100%',
         height: `calc(100% - ${props.title ? theme.padding * 1 : 0}px)`,
         color: theme.textColor,
         position: 'relative',
         fontFamily: 'arena-regular',
         marginTop: props.title ? theme.padding * 1 : 0,
   
         '& legend': {
            fontWeight: 'bold',
            fontSize: theme.fontSizeSmall,
            fontFamily: 'arena-bold',
            color: props.titleColor ? props.titleColor : theme.textColorLight,
            backgroundColor: props.titleBg ? props.titleBg : theme.backgroundColorLight,
            borderRadius: theme.borderRadius,
            padding: [0, theme.padding],
            borderTop: `1px solid ${theme.borderColor}`,
            position: 'absolute',
            top: theme.padding * -1.5,
            left: theme.padding,
            zIndex: 1,
            height: theme.padding * 2,
            boxShadow: `0px 2px 2px 2px rgba(0,0,0,0.1)`,
            textShadow: `1px 1px 2px rgba(0,0,0,0.3)`,
         },
      }
   }))();
};