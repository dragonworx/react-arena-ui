import * as React from 'react';
import { ReactElement, useState } from 'react';
import { Theme, createUseStyles, important, useTheme } from '../theme';
import { Button } from './button';
import { Label } from './label';
import { withProps } from '../util';

export interface ToolButtonProps {
   size?: number;
   text?: string;
   name?: string;
   iconSrc?: string;
   isSelected?: boolean;
   onToggle?: (isToggled: boolean, name?: string) => void;
   // menu?: Menu;
}

export function ToolButton(props: ToolButtonProps) {
   const { size: _size, isSelected = false, text, iconSrc, onToggle, name } = props;

   const theme = useTheme() as Theme;
   const size = _size ? _size : theme.paddingLarge * 1.8;
   const arrowSize = size * 0.3;
   const classes = useStyles(props, arrowSize);

   return (
      <Button
         type="tool"
         name={name}
         className={classes.toolButton}
         width={size}
         height={size}
         radius={0}
         padding={theme.borderRadiusSmall}
         useLayout={false}
         fillContent={false}
         toggle={true}
         canUnToggle={false}
         isToggled={isSelected}
         onToggle={onToggle}
      >
         {iconSrc ? <img src={iconSrc} draggable="false" alt={text} /> : null}
         {text ? <Label text={text} /> : null}
         <div className={classes.icon}>
            <svg width={`${arrowSize}px`} height={`${arrowSize}px`} viewBox={`0 0 ${arrowSize} ${arrowSize}`} preserveAspectRatio="xMidYMid meet">
               <polygon points={`${arrowSize / 2},0 0,${arrowSize} ${arrowSize},${arrowSize}`} />
            </svg>
         </div>
      </Button>
   )
}

const useStyles = (props: ToolButtonProps, arrowSize: number) => {
   return createUseStyles((theme: Theme) => ({
      'toolButton': {
         display: important('flex'),
         alignItems: 'center',
         justifyContent: 'center',
         '& svg': {
            fill: theme.backgroundColorDark,
            stroke: theme.borderColorLight,
            strokeWidth: `1px`,
            transform: 'rotateZ(135deg) rotateX(60deg)'
         },
         '& img': {
            width: '100%',
         }
      },
      'icon': {
         width: important(arrowSize),
         height: important(arrowSize),
         position: 'absolute',
         right: 0,
         bottom: 0,
      }
   }))();
};



export interface ToolButtonGroupProps {
   children: ReactElement<ToolButtonProps>[];
   selected?: number;
   onChange?: (selectedIndex: number, selectedName?: string) => void;
}

export function ToolButtonGroup(props: ToolButtonGroupProps) {
   const { children, selected: _selected, onChange } = props;
   const [selected, setSelected] = useState(_selected);

   const onToggled = (i: number) => (isToggled: boolean, name?: string) => {
      setSelected(i);
      onChange && onChange(i, name);
   };

   return (
      <>
         {children.map((button, i) => withProps(button, {
            onToggle: onToggled(i),
            isSelected: i === selected,
         }, `tool-button-${i}`))}
      </>
   )
}

export interface SpacerProps {
   transparent?: boolean;
   width?: number | string;
   height?: number | string;
}

export function Spacer(props: SpacerProps) {
   const classes = useLineStyles(props);
   return <div className={classes.spacer}></div>;
}

const useLineStyles = (props: SpacerProps) => {
   return createUseStyles((theme: Theme) => ({
      'spacer': {
         backgroundColor: props.transparent ? 'transparent' : theme.backgroundColor,
         width: props.width || 4,
         height: props.height || 4,
         border: `1px inset ${theme.backgroundColorLight}`,
      },
   }))();
};