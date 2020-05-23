import * as React from 'react';
import { Theme, createUseStyles, Label, Position, useTheme } from '~lib';
import { Button } from './button';

export interface CheckboxProps {
   checked?: boolean;
   label?: string;
   position?: Position;
}

export function Checkbox(props: CheckboxProps) {
   const { label, checked = false, position } = props;
   const classes = useStyles(props);
   const theme = useTheme() as Theme;

   if (label) {
      return (
         <Label text={label} align="center" position={position}>
            <Button type="checkbox" className={classes.checkbox} toggle={true} isToggled={checked} width={theme.padding * 2} height={theme.padding * 2.1}>X</Button>
         </Label>
      )
   } else {
      return <Button type="checkbox" className={classes.checkbox} toggle={true} isToggled={checked} width={theme.padding * 2} height={theme.padding * 2.1}>X</Button>
   }
}

const useStyles = (props: CheckboxProps) => {
   return createUseStyles((theme: Theme) => ({
      'checkbox': {
         padding: theme.paddingSmall,
         color: theme.borderColorLight,
         borderRadius: theme.borderRadiusSmall,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.borderColor}`,
         fontFamily: 'arena-bold',
         textShadow: `1px 1px 2px rgba(0,0,0,0.3)`,
         '&[data-arena*="toggled-1"]': {
            color: theme.textColorLight,
         },
      },
   }))();
};