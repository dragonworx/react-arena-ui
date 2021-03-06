import * as React from 'react';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { Theme, createUseStyles, useTheme } from '../theme';

export interface Props {
   children?: ReactNode;
}

export function Component(props: Props) {
   const { children } = props;

   const classes = useStyles(props);
   const theme = useTheme() as Theme;

   return (
      <div>{children}</div>
   )
}

const useStyles = (props: Props) => {
   const {} = props;
   return createUseStyles((theme: Theme) => {
      return {
   
      };
   })()
};