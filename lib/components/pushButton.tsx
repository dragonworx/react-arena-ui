import * as React from 'react';
import { Theme, createUseStyles } from '~lib';
import { ButtonProps, Button } from './button';

export function PushButton(props: ButtonProps) {
   const classes = useStyles(props);

   return (
      <Button className={classes.button} {...props} />
   )
}

const useStyles = (props: ButtonProps) => {
   return createUseStyles((theme: Theme) => ({
      'button': {
      },
   }))();
};