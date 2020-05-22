import * as React from 'react';
import { useState, ReactNode } from 'react';
import { css, useMouseUpEvent,useKeyDownEvent, useKeyUpEvent, Keys, HLayout, createUseStyles, Theme } from '~lib';

interface BaseButtonProps {
   children?: ReactNode;
   className?: string;
   isToggle?: boolean;
}

export type ButtonProps = Omit<BaseButtonProps, 'className'>;

const isAcceptKey = (e: KeyboardEvent) => e.keyCode === Keys.SPACE || e.keyCode === Keys.ENTER;

export function Button(props: BaseButtonProps) {
   const { children, className, isToggle = false } = props;
   const [isToggled, setIsToggled] = useState(false);
   const [isHover, setIsHover] = useState(false);
   const [isTempHover, setIsTempHover] = useState(false);
   const [isDown, setIsDown] = useState(false);
   const [isFocus, setIsFocus] = useState(false);

   const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => setIsHover(true);
   const onMouseOut = (e: React.MouseEvent<HTMLDivElement>) => setIsHover(false);
   const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => setIsDown(true);
   const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => onUp();
   const onUp = () => {
      if (isToggle) {
         setIsToggled(!isToggled);
      }
   };
   const onFocus = (e: React.FocusEvent<HTMLDivElement>) => setIsFocus(true);
   const onBlur = (e: React.FocusEvent<HTMLDivElement>) => setIsFocus(false);

   useMouseUpEvent((e: MouseEvent) => {
      isDown && setIsDown(false);
   }, document.body);

   useKeyDownEvent((e: KeyboardEvent) => {
      if (isAcceptKey(e) && isFocus) {
         setIsDown(true);
         setIsTempHover(true);
      }
   }, document.body);

   useKeyUpEvent((e: KeyboardEvent) => {
      if (isAcceptKey(e) && isFocus) {
         setIsDown(false);
         setIsTempHover(false);
         onUp();
      }
   }, document.body);

   const classes = useStyles();
   const data = `button:${isHover ? 'hover-1' : 'hover-0'}:${(isHover || isTempHover) && isDown ? 'down-1' : 'down-0'}:${isToggled ? 'toggled-1' : 'toggled-0'}:${isFocus ? 'focus-1' : 'focus-0'}`;

   return (
      <div
         className={css(className, classes.button)}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onFocus={onFocus}
         onBlur={onBlur}
         tabIndex={0}
         data-arena={data}
      >
         <HLayout padded align="center">{children}</HLayout>
      </div>
   )
}

const useStyles = createUseStyles((theme: Theme) => ({
   'button': {
      borderRadius: theme.borderRadiusLarge,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderStyle: 'outset',
      borderRight: `1px solid ${theme.borderColorLight}`,
      borderBottom: `2px solid ${theme.borderColorDark}`,
      padding: [theme.paddingSmall, theme.padding],
      backgroundColor: theme.backgroundColor,
      fontFamily: 'arena-regular',
      fontSize: theme.fontSize,
      color: theme.textColorLight,
      display: 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
      '&:focus': {
         'outline': 0,
      },
      '& > *': {
         width: '100%',
         height: '100%',
      },
      '&[data-arena*="hover-1"]': {
         extend: 'over',
      },
      '&[data-arena*="down-1"]': {
         extend: 'over',
         borderColor: theme.borderColor,
         backgroundColor: theme.backgroundColorDark,
         '& > *': {
            position: 'relative',
            left: 1,
            top: 1,
         }
      },
      '&[data-arena*="toggled-1"]': {
         extend: 'toggle',
      },
      '&[data-arena*="toggle-1"][data-arena*="hover-1"]': {
         extend: 'toggle',
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.backgroundColor}`,
      },
      '&[data-arena*="toggle-1"][data-arena*="down-1"]': {
         extend: 'toggle',
         backgroundColor: theme.backgroundColorLight,
      },
      '&[data-arena*="focus-1"]': {
         borderBottomColor: theme.accentColorDark,
      },
   },
   'over': {
      backgroundColor: theme.backgroundColorLight,
      color: theme.textColorLight,
      borderColor: theme.borderColorLight,
      borderBottom: `2px solid ${theme.backgroundColorDark}`,
   },
   'toggle': {
      borderStyle: 'inset',
      backgroundColor: theme.backgroundColorDark,
      color: theme.textColor,
      borderColor: theme.borderColorDark,
      borderBottom: `2px solid ${theme.backgroundColorDark}`,
   },
}));