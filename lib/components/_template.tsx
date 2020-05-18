import * as React from 'react';
import { ReactNode } from 'react';

export interface Props {
   children?: ReactNode;
}

export function Component(props: Props) {
   const { children } = props;

   return (
      <p></p>
   )
}