import * as React from 'react';
import { useState } from 'react';
import { LayoutExamples } from './examples/layout';
import { PanelExamples } from './examples/panel';
import { LabelExamples } from './examples/label';
import { ButtonExamples } from './examples/button';
import { Theme, createUseStyles, useTheme } from '~lib';

const sample = require('./img/sample.png');

const Routes = {
   'layout': LayoutExamples,
   'panel': PanelExamples,
   'label': LabelExamples,
   'button': ButtonExamples,
} as any;

export function App() {
   const [selectedRoute, stSelectedRoute] = useState(window.location.hash.replace('#', ''));
   const theme = useTheme();
   const classes = useStyles({ theme });

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
         <div className={classes.app}>
            <header>Arena2D UI Component Library - Examples</header>
            <div className={classes.examples}>
               <ul className={classes.menu}>
                  {
                     Object.keys(Routes).map(route => link(route))
                  }
               </ul>
               <div className={classes.content}>{content()}</div>
            </div>
            <footer>&copy; 2020 Ali Chamas</footer>
         </div>
   )
}

const HeaderSize = 50;

const useStyles = createUseStyles((theme: Theme) => ({
   'panel': {
      padding: theme.padding,
      border: '1px solid rgb(77, 77, 77)',
      borderRadius: theme.padding / 2,
      backgroundColor: theme.backgroundColor,
   },
   '@global': {
      'body': {
         margin: 0,
         backgroundColor: theme.backgroundColorLight,
         '& *': {
            boxSizing: 'border-box',
         }
      },
      '#main': {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
      },
      '.box': {
         backgroundImage: `url(${sample})`,
         backgroundSize: 'cover',
         border: '1px solid white',
         boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.3)',
         '&.small': {
            width: 25,
            height: 25,
         },
         '&.medium': {
            width: 50,
            height: 50,
         },
         '&.large': {
            width: 80,
            height: 80,
         },
      },
   },
   'app': {
      padding: theme.padding,
      position: 'relative',
      width: '100%',
      height: '100%',

      '& header': {
         extend: 'panel',
         backgroundColor: '#4b6c6f',
         position: 'absolute',
         top: theme.padding,
         left: theme.padding,
         width: `calc(100% - ${theme.padding}px * 2)`,
         height: HeaderSize,
         textAlign: 'center',
         fontSize: theme.fontSizeLarge,
         color: '#ccc',
         fontWeight: 'bold',
         fontFamily: theme.fontFamily,
         textShadow: '0 3px 4px rgba(0,0,0,0.3)',
      },
      '& footer': {
         extend: 'panel',
         position: 'absolute',
         bottom: theme.padding,
         left: theme.padding,
         width: `calc(100% - ${theme.padding}px * 2)`,
         textAlign: 'center',
         color: 'white',
         fontSize: theme.fontSizeSmall,
      }
   },
   'examples': {
      position: 'absolute',
      top: HeaderSize + theme.padding * 2,
      width: `calc(100% - ${theme.padding * 2}px)`,
      bottom: HeaderSize + theme.padding,
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 2,
   },
   'menu': {
      extend: 'panel',
      height: '100%',
      margin: 0,
      marginRight: theme.padding,

      '& li': {
         listStyle: 'none',

         '& a': {
            color: 'white',
            textDecoration: 'underline',
            cursor: 'pointer',
            textTransform: 'capitalize',
            padding: theme.padding * 0.8,
            backgroundColor: theme.backgroundColorDark,
            marginBottom: theme.padding / 2,
            display: 'block',
            textAlign: 'center',
            borderRadius: theme.padding / 2,
            borderRight: '5px solid white',
            fontSize: theme.fontSize,
            fontFamily: theme.fontFamily,

            '&:hover': {
               backgroundColor: theme.backgroundColorLight,
            },

            '&[data-selected="true"]': {
               borderRight: '5px solid cyan',
               backgroundColor: 'rgba(0, 231, 255, 0.22)',
            }
         }
      }
   },
   'content': {
      extend: 'panel',
      flexGrow: 1,
      height: '100%',
      overflow: 'auto',

      '& ul': {
         padding: 0,
         margin: 0,

         '& li': {
            listStyle: 'none',
            padding: 0,
            marginBottom: theme.padding * 2,

            '& label': {
               fontFamily: theme.fontFamily,
               color: '#b2d4dc',
               textShadow: '0 3px 2px rgba(0,0,0,0.3)',
               marginBottom: theme.padding,
               display: 'block',
               backgroundColor: 'rgba(135, 191, 204, 0.1)',
               padding: '3px 7px',
               borderRadius: 5,
               borderBottom: '1px solid #2af5ff',
            },
   
            '& label:after': {
               content: '":"',
            }
         }
      }
   }
}));