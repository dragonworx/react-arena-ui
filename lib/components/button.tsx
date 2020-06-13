import * as React from 'react';
import { useState, ReactNode, useEffect, useRef, MutableRefObject } from 'react';
import { HLayout } from '../components/layout';
import { css, Theme, createUseStyles, important } from '../theme';
import { useMouseUpEvent, useKeyDownEvent, useKeyUpEvent, Keys } from '../hooks';

interface BaseButtonProps {
   children?: ReactNode;
   name?: string;
   type?: string;
   className?: string;
   toggle?: boolean;
   canUnToggle?: boolean;
   isToggled?: boolean;
   reverse?: boolean;
   padded?: boolean;
   padding?: number;
   color?: string;
   highlightColor?: string;
   bgColor?: string;
   radius?: number;
   width?: string | number;
   height?: string | number;
   useLayout?: boolean;
   fillContent?: boolean;
   onClick?: (name?: string) => void;
   onToggle?: (isToggled: boolean, name?: string) => void;
   onRef?: (ref: MutableRefObject<HTMLDivElement>) => void;
}

export type ButtonProps = Omit<BaseButtonProps, 'className'>;

const isAcceptKey = (e: KeyboardEvent) => e.keyCode === Keys.SPACE || e.keyCode === Keys.ENTER;

export function Button(props: BaseButtonProps) {
   const { 
      children, 
      name,
      type, 
      className, 
      toggle = false, 
      isToggled: _isToggled = false, 
      canUnToggle = true, 
      reverse = false, 
      onClick, 
      onToggle, 
      onRef, 
      useLayout = true,
   } = props;
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
      onClick && onClick(name);
      if (toggle) {
         const isNowToggled = !isToggled;
         if (isNowToggled === false && canUnToggle === false) {
            return;
         }
         setIsToggled(isNowToggled);
         onToggle && onToggle(isNowToggled, name);
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
         className={css(classes.button, className)}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onFocus={onFocus}
         onBlur={onBlur}
         tabIndex={0}
         data-arena={data}
      >
         {
            useLayout
               ? <HLayout padded align="center" justify="center" reverse={reverse}>{children}</HLayout>
               : children
         }
      </div>
   )
}

const useStyles = (props: BaseButtonProps) => {
   const { padded = true, padding, height = '100%', fillContent = true } = props;
   return createUseStyles((theme: Theme) => {   
      const classes = {
         'button': {
            position: 'relative',
            borderRadius: props.radius !== undefined ? props.radius : theme.borderRadius,
            borderColor: theme.borderColor,
            borderWidth: 1,
            borderStyle: 'outset',
            borderRight: `1px solid ${theme.borderColorLight}`,
            borderBottom: `2px solid ${theme.borderColorDark}`,
            padding: padded ? (typeof padding === 'number' ? padding : [theme.paddingSmall, theme.padding]) : 0,
            backgroundColor: props.bgColor ? important(props.bgColor) : theme.buttonColor,
            fontFamily: 'arena-regular',
            fontSize: theme.fontSize,
            color: props.color ? props.color : theme.textColor,
            display: 'inline-block',
            cursor: 'pointer',
            userSelect: 'none',
            boxSizing: 'border-box',
            overflow: 'hidden',
            width: props.width,
            height: props.height ? props.height : height,
            '&:focus': {
               'outline': 0,
            },
            '&[data-arena*="hover-1"]': {
               extend: 'over',
            },
            '&[data-arena*="down-1"]': {
               extend: 'over',
               borderColor: theme.borderColor,
               backgroundColor: theme.buttonColorDark,
               '& > *': {
                  transform: 'translate(1px ,1px)'
               }
            },
            '&[data-arena*="toggled-1"]': {
               extend: 'toggle',
            },
            '&[data-arena*="toggled-1"][data-arena*="hover-1"]': {
               extend: 'toggle',
               borderColor: theme.borderColorLight,
               borderBottom: `2px solid ${theme.buttonColor}`,
            },
            '&[data-arena*="toggled-1"][data-arena*="down-1"]': {
               extend: 'toggle',
               backgroundColor: theme.buttonColorLight,
            },
            '&[data-arena*="focus-1"]': {
               borderBottomColor: important(theme.accentColor),
            },
         },
         'over': {
            backgroundColor: theme.buttonColorLight,
            color: props.highlightColor ? props.highlightColor : theme.textColorLight,
            borderColor: theme.borderColorLight,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
         },
         'toggle': {
            borderStyle: 'inset',
            backgroundColor: theme.buttonColorDark,
            color: props.highlightColor ? props.highlightColor : theme.textColorLight,
            borderColor: theme.borderColorDark,
            borderBottom: `2px solid ${theme.backgroundColorDark}`,
         },
      };
      if (fillContent) {
         (classes as any).button['& > *'] = {
            width: '100%',
            height: '100%',
         };
      }
      return classes;
   })();
};