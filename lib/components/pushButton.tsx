import * as React from 'react';
import { Theme, createUseStyles } from '~lib';
import { ButtonProps, BaseButton } from './button';

export function PushButton(props: ButtonProps) {
   const classes = useStyles(props);

   return (
      <BaseButton className={classes.button} {...props} />
   )
}

const useStyles = (props: ButtonProps) => {
   return createUseStyles((theme: Theme) => ({
      'button': {
         borderRadius: theme.borderRadiusLarge,
         borderColor: theme.borderColor,
         borderWidth: 1,
         borderStyle: 'outset',
         borderBottom: `2px solid ${theme.borderColorDark}`,
         padding: [theme.paddingSmall, theme.padding],
         backgroundColor: theme.backgroundColor,
         fontFamily: 'arena-regular',
         fontSize: theme.fontSize,
         color: theme.textColorLight,
         display: 'inline-block',
         cursor: 'pointer',
         userSelect: 'none',
         '&.hover': {
            backgroundColor: theme.backgroundColorLight,
            color: theme.textColorLight,
            borderColor: theme.borderColorLight,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
         },
         '&.down': {
            backgroundColor: theme.backgroundColorDark,
            color: theme.textColorLight,
            borderColor: theme.borderColorLight,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
            '& > *': {
               position: 'relative',
               left: 1,
               top: 1,
            }
         },
         '&.toggled': {
            borderStyle: 'inset',
            backgroundColor: theme.backgroundColorDark,
            color: theme.textColor,
            borderColor: theme.borderColorDark,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
         },
         '&.toggled.hover': {
            borderStyle: 'inset',
            backgroundColor: theme.backgroundColorDark,
            color: theme.textColor,
            borderColor: theme.borderColorLight,
            borderBottom: `2px solid ${theme.backgroundColor}`,
         },
         '&.toggled.down': {
            borderStyle: 'inset',
            backgroundColor: theme.backgroundColorLight,
            color: theme.textColor,
            borderColor: theme.borderColorDark,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
         },
      },
   }))();
};