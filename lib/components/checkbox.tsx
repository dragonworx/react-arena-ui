import * as React from 'react';
import { Theme, createUseStyles, Label, Position } from '~lib';
import { Button } from './button';

export interface CheckboxProps {
   checked?: boolean;
   label?: string;
   position?: Position;
}

export function Checkbox(props: CheckboxProps) {
   const { label, checked = false, position } = props;
   const classes = useStyles(props);

   if (label) {
      return (
         <Label text={label} align="center" position={position}>
            <Button type="checkbox" className={classes.checkbox} toggle={true} isToggled={checked}>X</Button>
         </Label>
      )
   } else {
      return <Button type="checkbox" className={classes.checkbox} toggle={true} isToggled={checked}>X</Button>
   }
}

const useStyles = (props: CheckboxProps) => {
   return createUseStyles((theme: Theme) => ({
      'checkbox': {
         padding: theme.paddingSmall,
         width: 20,
         height: 20,
         color: theme.textColor,
         borderRadius: theme.borderRadiusSmall,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.borderColor}`,
         fontFamily: 'arena-bold',
         '&[data-arena*="toggled-1"]': {
            color: theme.textColorLight,
         },
      },
   }))();
};