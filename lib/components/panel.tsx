import * as React from 'react';
import { ReactNode } from 'react';

export interface PanelProps {
   title?: string;
   children?: ReactNode;
}

export function Panel(props: PanelProps) {
   const { title, children } = props;

   return (
      <fieldset className="a2d a2d-panel">
         { title ? <legend>{ title }</legend> : null }
         { children }
      </fieldset>
   )
}