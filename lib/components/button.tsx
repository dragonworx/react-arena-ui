import * as React from 'react';
import { useState, ReactNode, useEffect, useRef, MutableRefObject } from 'react';
import { css, useMouseUpEvent,useKeyDownEvent, useKeyUpEvent, Keys, HLayout, createUseStyles, Theme } from '~lib';

interface BaseButtonProps {
   children?: ReactNode;
   type?: string;
   className?: string;
   toggle?: boolean;
   canUnToggle?: boolean;
   isToggled?: boolean;
   reverse?: boolean;
   padded?: boolean;
   color?: string;
   highlightColor?: string;
   bgColor?: string;
   radius?: number;
   width?: string | number;
   height?: string | number;
   onClick?: () => void;
   onToggle?: (isToggled: boolean) => void;
   onRef?: (ref: MutableRefObject<HTMLDivElement>) => void;
}

export type ButtonProps = Omit<BaseButtonProps, 'className'>;

const isAcceptKey = (e: KeyboardEvent) => e.keyCode === Keys.SPACE || e.keyCode === Keys.ENTER;

export function Button(props: BaseButtonProps) {
   const { children, type, className, toggle = false, isToggled: _isToggled = false, canUnToggle = true, reverse = false, onClick, onToggle, onRef } = props;
   const [isToggled, setIsToggled] = useState(_isToggled);
   const [isHover, setIsHover] = useState(false);
   const [isTempHover, setIsTempHover] = useState(false);
   const [isDown, setIsDown] = useState(false);
   const [isFocus, setIsFocus] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      setIsDown(false);
      setIsToggled(_isToggled);
   }, [_isToggled])

   const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => setIsHover(true);
   const onMouseOut = (e: React.MouseEvent<HTMLDivElement>) => setIsHover(false);
   const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => setIsDown(true);
   const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => onUp();
   const onUp = () => {
      onClick && onClick();
      if (toggle) {
         const isNowToggled = !isToggled;
         if (isNowToggled === false && canUnToggle === false) {
            return;
         }
         setIsToggled(isNowToggled);
         onToggle && onToggle(isNowToggled);
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

   useEffect(() => {
      onRef && ref && onRef(ref as unknown as MutableRefObject<HTMLDivElement>);
   }, [ref]);

   const classes = useStyles(props);
   const buttonType = `button${type ? '-' + type : ''}`;
   const data = `${buttonType}:${isHover ? 'hover-1' : 'hover-0'}:${(isHover || isTempHover) && isDown ? 'down-1' : 'down-0'}:${isToggled ? 'toggled-1' : 'toggled-0'}:${isFocus ? 'focus-1' : 'focus-0'}`;

   return (
      <div
         ref={ref}
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
         <HLayout padded align="center" justify="center" reverse={reverse}>{children}</HLayout>
      </div>
   )
}

const useStyles = (props: BaseButtonProps) => {
   const { padded = true, height = '100%' } = props;
   return createUseStyles((theme: Theme) => ({
      'button': {
         position: 'relative',
         borderRadius: props.radius ? props.radius : theme.borderRadius,
         borderColor: theme.borderColor,
         borderWidth: 1,
         borderStyle: 'outset',
         borderRight: `1px solid ${theme.borderColorLight}`,
         borderBottom: `2px solid ${theme.borderColorDark}`,
         padding: padded ? [theme.paddingSmall, theme.padding] : 0,
         backgroundColor: props.bgColor ? [props.bgColor, '!important'] : theme.backgroundColor,
         fontFamily: 'arena-regular',
         fontSize: theme.fontSize,
         color: props.color ? props.color : theme.textColor,
         display: 'inline-block',
         cursor: 'pointer',
         userSelect: 'none',
         boxSizing: 'border-box',
         width: props.width,
         height,
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
         '&[data-arena*="toggled-1"][data-arena*="hover-1"]': {
            extend: 'toggle',
            borderColor: theme.borderColorLight,
            borderBottom: `2px solid ${theme.backgroundColor}`,
         },
         '&[data-arena*="toggled-1"][data-arena*="down-1"]': {
            extend: 'toggle',
            backgroundColor: theme.backgroundColorLight,
         },
         '&[data-arena*="focus-1"]': {
            borderBottomColor: [theme.accentColor, '!important'],
         },
      },
      'over': {
         backgroundColor: theme.backgroundColorLight,
         color: props.highlightColor ? props.highlightColor : theme.textColorLight,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.backgroundColorDark}`,
      },
      'toggle': {
         borderStyle: 'inset',
         backgroundColor: theme.backgroundColorDark,
         color: props.highlightColor ? props.highlightColor : theme.textColorLight,
         borderColor: theme.borderColorDark,
         borderBottom: `2px solid ${theme.backgroundColorDark}`,
      },
   }))();
};