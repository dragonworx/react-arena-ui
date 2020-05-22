import * as React from 'react';
import { Theme, createUseStyles } from '~lib';
import { ButtonProps, Button } from './button';

export interface CheckboxProps {
   label?: string;
   checked?: boolean;
}

export function Checkbox(props: CheckboxProps) {
   const classes = useStyles(props);

   return (
      <Button className={classes.checkbox} {...props} />
   )
}

const useStyles = (props: CheckboxProps) => {
   return createUseStyles((theme: Theme) => ({
      'checkbox': {
      },
   }))();
};