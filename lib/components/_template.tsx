import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface Props {
   children?: ReactNode;
}

export function Component(props: Props) {
   const { children } = props;

   const classes = useStyles(props);

   return (
      <div>{children}</div>
   )
}

const useStyles = (props: Props) => {
   return createUseStyles((theme: Theme) => ({

   }))();
};