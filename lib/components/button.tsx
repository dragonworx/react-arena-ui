import * as React from 'react';
import { useState, ReactNode } from 'react';
import { Theme, createUseStyles, css, useMouseUpEvent } from '~lib';

export type ButtonMode = 'idle' | 'hover' | 'hoverDown' | 'toggled';

export interface ButtonState {
   isHover: boolean;
   isDown: boolean;
}

export interface ButtonProps {
   children?: ReactNode;
   className?: string[];
   isToggle?: boolean;
   onButtonStateChange?: (buttonState: ButtonState) => void;
}

type MEvent = React.MouseEvent<HTMLDivElement>;

export function Button(props: ButtonProps) {
   const { children, className, onButtonStateChange } = props;
   const [isHover, setIsHover] = useState(false);
   const [isDown, setIsDown] = useState(false);

   const fireOnButtonStateChange = () => {
      if (onButtonStateChange) {
         onButtonStateChange({
            isHover,
            isDown,
         });
      }
   };

   const onMouseOver = (e: MEvent) => Boolean(setIsHover(true)) || fireOnButtonStateChange();
   const onMouseOut = (e: MEvent) => Boolean(setIsHover(false)) || fireOnButtonStateChange();
   const onMouseDown = (e: MEvent) => Boolean(setIsDown(true)) || fireOnButtonStateChange();

   useMouseUpEvent((e: MouseEvent) => {
      isDown && (Boolean(setIsDown(false)) || fireOnButtonStateChange());
   }, document.body);

   const classes = useStyles(props);

   let classNames = [
      classes.button,
      isHover ? classes.hover : undefined,
      isHover && isDown ? classes.down : undefined,
   ];
   if (Array.isArray(className)) {
      classNames = [...className, ...classNames];
   }

   return (
      <div
         className={css.apply(null, classNames)}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
         onMouseDown={onMouseDown}
      >
         {children}
      </div>
   )
}

const useStyles = (props: ButtonProps) => {
   return createUseStyles((theme: Theme) => ({
      'button': {
         borderRadius: theme.borderRadiusLarge,
         borderColor: theme.borderColor,
         borderWidth: 1,
         borderStyle: 'outset',
         borderBottom: `2px solid ${theme.borderColorDark}`,
         padding: [theme.paddingSmall, theme.padding],
         backgroundColor: theme.backgroundColor,
         fontFamily: 'arena-regular',
         color: theme.textColorLight,
         display: 'inline-block',
         cursor: 'pointer',
         userSelect: 'none',
      },
      'hover': {
         backgroundColor: theme.backgroundColorLight,
         color: theme.textColorLight,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.backgroundColorDark}`,
      },
      'down': {
         backgroundColor: theme.backgroundColorDark,
         color: theme.textColorLight,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.backgroundColorDark}`,
      }
   }))();
};