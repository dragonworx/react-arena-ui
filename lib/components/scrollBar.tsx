import * as React from 'react';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { Theme, createUseStyles, useTheme } from '../theme';

export interface ScrollBarProps {
   children?: ReactNode;
}

export function ScrollBar(props: ScrollBarProps) {
   const { children } = props;

   const classes = useStyles(props);
   const theme = useTheme() as Theme;

   return (
      <div>{children}</div>
   )
}

const useStyles = (props: ScrollBarProps) => createUseStyles((theme: Theme) => {
   const {} = props;
   return {

   };
})();