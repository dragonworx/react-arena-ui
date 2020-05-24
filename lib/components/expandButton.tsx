import * as React from 'react';
import { ReactNode, useState } from 'react';
import { Theme, createUseStyles, useTheme, css } from '~lib';

export interface ExpandButtonProps {
   size?: number;
   expanded?: boolean;
}

export function ExpandButton(props: ExpandButtonProps) {
   const { expanded = false } = props;
   const [ isExpanded, setIsExpanded ] = useState(expanded);

   const theme = useTheme() as Theme;
   const size = props.size ? props.size : theme.padding;
   const classes = useStyles(size);

   const onClick = () => setIsExpanded(!isExpanded);

   return (
      <div className={css(classes.expandButton, isExpanded ? classes.expanded : undefined)} onClick={onClick}>
         <svg width={size} height={size}>
            <polygon points={`${size / 2},0 0,${size} ${size},${size}`} />
            <polygon className="borderHighlight" points={`${size / 2},0 0,${size}`} />
         </svg>
      </div>
   )
}

const useStyles = (size: number) => {
   return createUseStyles((theme: Theme) => ({
      'expandButton': {
         width: size,
         height: size,
         textAlign: 'center',
         '& svg': {
            fill: theme.backgroundColorDark,
            stroke: theme.borderColor,
            strokeWidth: 1,
            transform: 'rotateZ(90deg) scaleY(0.8)',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
         },
         '& .borderHighlight': {
            stroke: theme.borderColorLight,
         }
      },
      'expanded': {
         '& svg': {
            transform: 'rotateZ(180deg) scaleY(0.8)',
         },
         '& .borderHighlight': {
            stroke: theme.borderColor,
         }
      },
   }))();
};