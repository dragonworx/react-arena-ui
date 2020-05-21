import * as React from 'react';
import { useState } from 'react';
import Color from 'color';
import { LayoutExamples } from './layout';
import { PanelExamples } from './panel';
import { LabelExamples } from './label';
import { ButtonExamples } from './button';
import { Theme, createUseStyles, useTheme, fontFaces } from '~lib';

const sample = require('../img/sample.png');

const Routes = {
   'layout': LayoutExamples,
   'panel': PanelExamples,
   'label': LabelExamples,
   'button': ButtonExamples,
} as any;

interface ExamplesProps {
   onThemeChange: (themeName: string) => void;
}

export function Examples(props: ExamplesProps) {
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

   const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      props.onThemeChange(e.target.value);
   };

   return (
         <div className={classes.app}>
            <header>
               React Arena UI Examples
               <label>
                  Theme:
                  <select onChange={onThemeChange}>
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
               <div className={classes.content}>{content()}</div>
            </div>
            <footer>&copy; 2020 Ali Chamas</footer>
         </div>
   )
}

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
         backgroundColor: theme.accentColorDark,
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
               borderRight: `5px solid ${theme.accentColorDark}`,
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

      '& ul': {
         padding: 0,
         margin: 0,

         '& li': {
            listStyle: 'none',
            padding: 0,
            marginBottom: theme.padding * 2,

            '& label': {
               fontFamily: 'arena-light',
               color: theme.textColor,
               textShadow: '0 3px 2px rgba(0,0,0,0.3)',
               marginBottom: theme.padding,
               display: 'block',
               backgroundColor: theme.backgroundColorLight,
               padding: '3px 7px',
               borderRadius: 5,
               borderBottom: `1px solid ${theme.accentColor}`,
            },
   
            '& label:after': {
               content: '":"',
            }
         }
      }
   }
}));