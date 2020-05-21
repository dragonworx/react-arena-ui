import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface PanelProps {
   title?: string;
   children?: ReactNode;
}

export function Panel(props: PanelProps) {
   const { title, children } = props;

   const classes = useStyles();

   return (
      <fieldset className={classes.panel}>
         { title ? <legend>{ title }</legend> : null }
         { children }
      </fieldset>
   )
}

const useStyles = createUseStyles((theme: Theme) => ({
   'panel': {
      borderRadius: theme.borderRadius,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderStyle: 'outset',
      borderBottom: `2px solid ${theme.borderColorDark}`,
      padding: theme.padding,
      paddingTop: theme.padding * 0.8,
      paddingBottom: theme.padding * 1.2,
      backgroundColor: theme.backgroundColorLight,
      margin: 0,

      '& legend': {
         color: theme.textColorLight,
         fontWeight: 'bold',
         fontSize: theme.fontSizeSmall,
         fontFamily: 'arena-bold',
         backgroundColor: theme.backgroundColorLight,
         borderRadius: theme.borderRadiusLarge,
         padding: [0, theme.padding],
         borderTop: `1px solid ${theme.borderColor}`
      },
   }
}));