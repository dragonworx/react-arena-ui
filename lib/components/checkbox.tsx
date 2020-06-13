import * as React from 'react';
import { useState, MutableRefObject } from 'react';
import { Theme, createUseStyles, useTheme } from '../theme';
import { Label } from './label';
import { Position } from '../common';
import { Button } from './button';

export interface CheckboxProps {
   checked?: boolean;
   label?: string;
   value?: any;
   position?: Position;
   enableLabelClick?: boolean;
   onClick?: (value: any) => void;
}

export function Checkbox(props: CheckboxProps) {
   const { label, checked: _checked = false, position, enableLabelClick = true, onClick, value } = props;
   const [ checked, setChecked ] = useState(_checked);
   const [ ref, setRef ] = useState<MutableRefObject<HTMLDivElement>>();
   const classes = useStyles(props);
   const theme = useTheme() as Theme;

   const onLabelClicked = () => {
      if (enableLabelClick) {
         setChecked(!checked);
         ref && ref.current.focus();
      }
      onClick && onClick(value);
   };

   const onClicked = () => {
      onClick && onClick(value);
   };

   const onRef = (ref: MutableRefObject<HTMLDivElement>) => setRef(ref);

   if (label) {
      return (
         <Label text={label} align="center" position={position} onClick={onLabelClicked}>
            <Button 
               onRef={onRef} 
               type="checkbox" 
               className={classes.checkbox} 
               toggle={true} 
               isToggled={checked} 
               width={theme.padding * 2} 
               height={theme.padding * 2.1}
               onClick={onClicked}
            >
               X
            </Button>
         </Label>
      )
   } else {
      return (
         <Button 
            type="checkbox" 
            className={classes.checkbox} 
            toggle={true} 
            isToggled={checked} 
            width={theme.padding * 2} 
            height={theme.padding * 2.1}
            onClick={onClicked}
         >
            X
         </Button>)
   }
}

const useStyles = (props: CheckboxProps) => {
   return createUseStyles((theme: Theme) => ({
      'checkbox': {
         padding: theme.paddingSmall,
         color: theme.borderColorLight,
         borderRadius: theme.borderRadiusSmall,
         borderColor: theme.borderColorLight,
         borderBottom: `2px solid ${theme.borderColor}`,
         fontFamily: 'arena-bold',
         textShadow: `1px 1px 2px rgba(0,0,0,0.3)`,
         '&[data-arena*="toggled-1"]': {
            color: theme.textColorLight,
         },
      },
   }))();
};