import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface PanelProps {
   children?: ReactNode;
   title?: string;
   titleColor?: string;
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
   const { padded = true } = props;
   return createUseStyles((theme: Theme) => ({
      'panel': {
         borderRadius: theme.borderRadius,
         borderColor: theme.borderColor,
         borderWidth: 1,
         borderStyle: 'outset',
         borderBottom: `2px solid ${theme.borderColorDark}`,
         padding: padded ? theme.padding : 0,
         paddingTop: padded ? theme.padding : 0,
         paddingBottom: padded ? theme.padding * 1.2 : 0,
         backgroundColor: theme.backgroundColorLight,
         width: '100%',
         height: '100%',
         color: theme.textColor,
         position: 'relative',
         fontFamily: 'arena-regular',
         marginTop: props.title ? theme.padding * 1 : 0,
   
         '& legend': {
            color: theme.textColorLight,
            fontWeight: 'bold',
            fontSize: theme.fontSizeSmall,
            fontFamily: 'arena-bold',
            backgroundColor: props.titleColor ? props.titleColor : theme.backgroundColor,
            borderRadius: theme.borderRadius,
            padding: [0, theme.padding],
            borderTop: `1px solid ${theme.borderColor}`,
            position: 'absolute',
            top: theme.padding * -1.5,
            left: theme.padding,
            zIndex: 1,
         },
      }
   }))();
};