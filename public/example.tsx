import * as React from 'react';
import { useState, UIEvent, useEffect } from 'react';
import { ButtonExamples } from './examples/button';
import { LabelExamples } from './examples/label';
import { LayoutExamples } from './examples/layout';
import { PanelExamples } from './examples/panel';
import { ScrollBarExamples } from './examples/scrollBar';
import { Theme, createUseStyles, fontFaces } from '../lib/theme';

const sample = require('./img/sample.png');

const Routes = {
   'layout': LayoutExamples,
   'panel': PanelExamples,
   'label': LabelExamples,
   'button': ButtonExamples,
   'scrollbar': ScrollBarExamples,
} as any;

interface ExamplesProps {
   theme: string;
   onThemeChange: (themeName: string) => void;
}

let isTrackingScroll = false;

export function Examples(props: ExamplesProps) {
   const { onThemeChange, theme } = props;
   const [selectedRoute, stSelectedRoute] = useState(window.location.hash.replace('#', ''));

   const classes = useStyles();

   const content = () => {
      if (selectedRoute) {
         const El = Routes[selectedRoute];
         return <El />;
      }
      return <p>Select an example</p>;
   };

   const onRoute = (routeValue: string) => () => stSelectedRoute(routeValue);
   const link = (route: string) => <li key={`route-${route}`}><a href={`#${route}`} data-selected={route === selectedRoute} onClick={onRoute(`${route}`)}>{route}</a></li>;

   const onThemeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onThemeChange(e.target.value);
   };

   const onScroll = (e: UIEvent) => {
      if (!isTrackingScroll) {
         return;
      }
      const el = document.getElementById('content') as HTMLDivElement;
      const scrollTop = el.scrollTop;
      localStorage['arena.examples.content.scrollTop'] = scrollTop;
   };

   useEffect(() => {
      const delay = 100;
      setTimeout(() => {
         const scrollTop = localStorage['arena.examples.content.scrollTop'];
         if (scrollTop !== undefined) {
            const el = document.getElementById('content') as HTMLDivElement;
            el.scrollTop = scrollTop;
            setTimeout(() => {
               isTrackingScroll = true;
            }, delay);
         }
      }, delay);
   }, []);

   return (
      <div className={classes.app}>
         <header>
            React Arena UI Examples
               <label>
               Theme:
                  <select onChange={onThemeChanged} defaultValue={theme}>
                  <option>default</option>
                  <option>test</option>
               </select>
            </label>
         </header>
         <div className={classes.examples}>
            <ul className={classes.menu}>
               {
                  Object.keys(Routes).map(route => link(route))
               }
            </ul>
            <div id="content" onScroll={onScroll} className={classes.content}>{content()}</div>
         </div>
         <footer>&copy; 2020 Ali Chamas</footer>
      </div>
   )
}

const useStyles = createUseStyles((theme: Theme) => ({
   'panel': {
      border: `1px solid ${theme.borderColorDark}`,
      borderRadius: theme.padding / 2,
      backgroundColor: theme.backgroundColor,
   },
   '@global': {
      'body': {
         margin: 0,
         backgroundColor: theme.backgroundColorLight,
         '& *': {
            boxSizing: 'border-box',
         },
      },
      ...fontFaces(theme),
      '#main': {
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
      },
      '.box': {
         display: 'inline-block',
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
      display: 'flex',
      flexDirection: 'column',

      '& header': {
         extend: 'panel',
         padding: theme.paddingSmall,
         paddingBottom: theme.padding,
         borderRadius: theme.borderRadiusLarge,
         background: `linear-gradient(180deg, ${theme.accentColorDark} 0, ${theme.backgroundColorDark} 100%)`,
         marginBottom: theme.padding,
         textAlign: 'center',
         fontSize: theme.fontSizeLarge,
         color: theme.textColorLight,
         fontWeight: 'bold',
         fontFamily: 'arena-bold',
         textShadow: '0 3px 4px rgba(0,0,0,0.3)',
         borderBottom: `3px solid ${theme.accentColor}`,
         '& label': {
            fontSize: theme.fontSizeSmall,
            display: 'block',
            '& select': {
               marginLeft: theme.padding,
            }
         }
      },
      '& footer': {
         extend: 'panel',
         padding: theme.paddingSmall,
         textAlign: 'center',
         color: 'white',
         fontSize: theme.fontSizeSmall,
         marginBottom: theme.padding,
         fontFamily: 'arena-regular'
      }
   },
   'examples': {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      marginBottom: theme.padding,
      overflow: 'auto',
   },
   'menu': {
      extend: 'panel',
      padding: theme.paddingSmall,
      height: '100%',
      margin: 0,
      marginRight: theme.padding,

      '& li': {
         listStyle: 'none',

         '& a': {
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
            textTransform: 'capitalize',
            padding: theme.padding * 0.8,
            backgroundColor: theme.backgroundColorDark,
            marginBottom: theme.padding / 2,
            display: 'block',
            textAlign: 'center',
            borderRadius: theme.padding / 2,
            borderRight: `5px solid ${theme.textColorLight}`,
            fontSize: theme.fontSize,
            fontFamily: 'arena-bold',

            '&:hover': {
               backgroundColor: theme.backgroundColorLight,
            },

            '&[data-selected="true"]': {
               borderRight: `5px solid ${theme.accentColor}`,
               backgroundColor: theme.accentColorDark,
            }
         }
      }
   },
   'content': {
      extend: 'panel',
      flexGrow: 1,
      height: '100%',
      overflow: 'auto',
      padding: theme.padding,
      whiteSpace: 'nowrap',

      '& ul': {
         padding: 0,
         margin: 0,

         '& li': {
            listStyle: 'none',
            padding: 0,
            marginBottom: theme.padding,
         }
      }
   }
}));