import * as React from 'react';
import { useState, ReactNode } from 'react';
import { css, useMouseUpEvent,useKeyDownEvent, useKeyUpEvent, Keys } from '~lib';

interface AbstractButtonProps {
   children?: ReactNode;
   className?: string;
   isToggle?: boolean;
}

export type ButtonProps = Omit<AbstractButtonProps, 'className'>;

const isAcceptKey = (e: KeyboardEvent) => e.keyCode === Keys.SPACE || e.keyCode === Keys.ENTER;

export function AbstractButton(props: AbstractButtonProps) {
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

   const classNames = [
      className,
      isHover ? 'hover' : undefined,
      (isHover || isTempHover) && isDown ? 'down' : undefined,
      isToggled ? 'toggled' : undefined,
   ];

   return (
      <div
         className={css.apply(null, classNames)}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}
         onMouseDown={onMouseDown}
         onMouseUp={onMouseUp}
         onFocus={onFocus}
         onBlur={onBlur}
         tabIndex={0}
      >
         {children}
      </div>
   )
}