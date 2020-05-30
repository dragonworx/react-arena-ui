import * as React from 'react';
import { ReactElement } from 'react';

export function withProps<T>(element: ReactElement<T>, props: Partial<T>, key?: string) {
   if (React.isValidElement(element)) {
      return React.cloneElement(element, {
         ...props,
         key,
      });
   }
}

export function important(value: any) {
   return [value, '!important'];
}