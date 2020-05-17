import * as React from 'react';
import { ReactNode } from 'react';

export interface ButtonProps {
   children?: ReactNode;
   text?: string;
}

export function Button(props: ButtonProps) {
   const { children, text } = props;

   return (
      <div className="a2d-button">{text}</div>
   )
}