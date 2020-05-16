import * as React from 'react';
import { useState } from 'react';
import { LayoutExamples } from './examples/layout';
import { PanelExamples } from './examples/panel';
import { LabelExamples } from './examples/label';
import { ButtonExamples } from './examples/button';
import './app.less';

const Routes = {
   'layout': LayoutExamples,
   'panel': PanelExamples,
   'label': LabelExamples,
   'button': ButtonExamples,
} as any;

export function App() {
   const [ selectedRoute, stSelectedRoute ] = useState(window.location.hash.replace('#', ''));

   const content = () => {
      if (selectedRoute) {
         const El = Routes[selectedRoute];
         return <El />;
      }
      return <p>Select an example</p>;
   };

   const onRoute = (routeValue: string) => () => stSelectedRoute(routeValue);
   const link = (route: string) => <li key={`route-${route}`}><a href={`#${route}`} data-selected={route === selectedRoute} onClick={onRoute(`${route}`)}>{route}</a></li>;

   return (
      <div id="app">
         <header>Arena2D UI Component Library - Examples</header>
         <div id="examples">
            <ul id="menu">
               {
                  Object.keys(Routes).map(route => link(route))
               }
            </ul>
            <div id="content">{content()}</div>
         </div>
         <footer>&copy; 2020 Ali Chamas</footer>
      </div>
   )
}