import * as React from 'react';
import { Theme, createUseStyles, Label, Position, useTheme } from '~lib';
import { Button } from './button';

export interface RadioProps {
   checked?: boolean;
   label?: string;
   position?: Position;
}

export function Radio(props: RadioProps) {
   const { label, checked = false, position } = props;
   const classes = useStyles(props);
   const theme: Theme = useTheme() as Theme;

   if (label) {
      return (
         <Label text={label} align="center" position={position}>
            <Button type="checkbox" className={classes.radio} toggle={true} canUnToggle={false} padded={false} radius={theme.padding} isToggled={checked}><span>&nbsp;</span></Button>
         </Label>
      )
   } else {
      return <Button type="checkbox" className={classes.radio} toggle={true} canUnToggle={false} padded={false} radius={theme.padding} isToggled={checked}><span>&nbsp;</span></Button>
   }
}

const useStyles = (props: RadioProps) => {
   return createUseStyles((theme: Theme) => ({
      'radio': {
         padding: theme.paddingSmall,
         width: theme.padding * 2,
         height: theme.padding * 2.1,
         color: theme.textColor,
         borderRadius: theme.borderRadiusSmall,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.borderColor}`,
         fontFamily: 'arena-bold',
         '&[data-arena*="toggled-1"]': {
            color: theme.textColorLight,
         },
         '& span': {
            width: theme.padding,
            height: theme.padding,
            background: theme.borderColorLight,
            border: `1px solid ${theme.backgroundColorLight}`,
            borderRadius: theme.padding,
         }
      },
   }))();
};