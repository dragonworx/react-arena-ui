import * as React from 'react';
import { useState } from 'react';
import { LayoutExamples } from './examples/layout';
import { PanelExamples } from './examples/panel';
import { ButtonExamples } from './examples/button';
import './app.less';

const Routes = {
   'layout': LayoutExamples,
   'panel': PanelExamples,
   'button': ButtonExamples,
} as any;

export function App() {
   const [ route, setRoute ] = useState(window.location.hash.replace('#', ''));

   const content = () => {
      if (route) {
         const El = Routes[route];
         return <El />;
      }
      return <p>Select an example</p>;
   };

   const onRoute = (routeValue: string) => () => setRoute(routeValue);
   const link = (route: string) => <li><a href={`#${route}`} onClick={onRoute(`${route}`)}>{route}</a></li>;

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