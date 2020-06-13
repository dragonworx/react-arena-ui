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

export function coords(element: Element) {
   const div = document.createElement('div');
   div.style.display = 'none';
   element.appendChild(div);
   const corners = [];
   for (let i = 0; i < 4; i++) {
      div.style.cssText = `display:block;width:0;height:0;position:absolute;left:${i % 3 ? 100 : 0}%;top:${i < 2 ? 0 : 100}%;`;
      corners[i] = div.getBoundingClientRect();
   }
   element.removeChild(div);
   return corners;
}

// http://jsfiddle.net/dAwfF/3/
export function transformedLocalCoord(event: React.MouseEvent<Element>) {
   const element = event.currentTarget;
   const corners = coords(element);
   const a = [
      [corners[3].top - corners[0].top, corners[0].top - corners[1].top],
      [corners[0].left - corners[3].left, corners[1].left - corners[0].left]
   ];
   const d = (a[0][0] * a[1][1] - a[0][1] * a[1][0]);
   const c = [event.pageX - window.pageXOffset - corners[0].left, event.pageY - window.pageYOffset - corners[0].top];
   return {
      x: (c[0] * a[0][0] + c[1] * a[1][0]) / d,
      y: (c[0] * a[0][1] + c[1] * a[1][1]) / d
   };
}