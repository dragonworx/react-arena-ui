import * as React from 'react';
import { useState, useEffect, MutableRefObject } from 'react';
import { Theme, createUseStyles, useTheme } from '../theme';
import { Position, Direction } from '../common';
import { Button } from './button';
import { Label } from './label';

export interface RadioProps {
   checked?: boolean;
   label?: string;
   position?: Position;
   value?: any;
   enableLabelClick?: boolean;
   onClick?: (value: any) => void;
}

export function Radio(props: RadioProps) {
   const { label, checked: _checked = false, position, value, onClick, enableLabelClick = true } = props;
   const [ checked, setChecked ] = useState(_checked);
   const [ ref, setRef ] = useState<MutableRefObject<HTMLDivElement>>();
   const classes = useRadioStyles(props);
   const theme: Theme = useTheme() as Theme;

   const onLabelClicked = () => {
      if (enableLabelClick) {
         setChecked(true);
         ref && ref.current.focus();
      }
      onClick && onClick(value);
   
   };
   const onClicked = () => {
      onClick && onClick(value);
   }

   const onRef = (ref: MutableRefObject<HTMLDivElement>) => setRef(ref);

   useEffect(() => {
      setChecked(_checked);
      _checked && ref && ref.current.focus();
   }, [_checked]);

   if (label) {
      return (
         <Label text={label} align="center" position={position} onClick={onLabelClicked}>
            <Button 
               onRef={onRef}
               type="radio" 
               className={classes.radio} 
               toggle={true} 
               canUnToggle={false} 
               padded={false} 
               radius={theme.padding} 
               isToggled={checked} 
               width={theme.padding * 2} 
               height={theme.padding * 2.1}
               onClick={onClicked}
            >
               <span>&nbsp;</span>
            </Button>
         </Label>
      )
   } else {
      return (
         <Button 
            onRef={onRef}
            type="radio" 
            className={classes.radio} 
            toggle={true} 
            canUnToggle={false} 
            padded={false} 
            radius={theme.padding} 
            isToggled={checked} 
            width={theme.padding * 2} 
            height={theme.padding * 2.1}
            onClick={onClicked}
         >
            <span>&nbsp;</span>
         </Button>
      )
   }
}

const useRadioStyles = (props: RadioProps) => {
   return createUseStyles((theme: Theme) => ({
      'radio': {
         padding: theme.paddingSmall,
         borderRadius: theme.borderRadiusSmall,
         borderColor: theme.borderColorLight,
         fontFamily: 'arena-bold',
         '&[data-arena*="toggled-1"] span': {
            backgroundColor: [theme.textColorLight, '!important'],
         },
         '&[data-arena*="toggled-1"]': {
            color: theme.textColorLight,
         },
         '& span': {
            width: theme.padding,
            height: theme.padding,
            backgroundColor: theme.textColor,
            border: `1px solid ${theme.backgroundColorLight}`,
            borderRadius: theme.padding,
            boxShadow: `1px 1px 3px 0px rgba(0, 0, 0, 0.3)`,
         }
      },
   }))();
};

export interface RadioGroupOption<T> {
   label: string;
   value: T;
}

export interface RadioGroupProps<T> {
   options: (RadioGroupOption<T> | string)[];
   direction?: Direction;
   position?: Position;
   defaultValue?: T;
   onChange?: (value: T) => void;
}

export function RadioGroup(props: RadioGroupProps<any>) {
   const { options, direction = 'vertical', position = 'top', onChange, defaultValue = null } = props;
   const [ selectedValue, setSelectedValue ] = useState(defaultValue);

   const onLabelClick = (value: any) => () => onClick(value);

   const onClick = (value: any) => {
      setSelectedValue(value);
      onChange && onChange(value);
   };


   const radios = options.map((option, i) => {
      const text = typeof option === 'string' ? option : option.label;
      const value = typeof option === 'string' ? option : option.value;
      if (direction === 'vertical') {
         const radio = <Radio key={`radio-${i}-${value}`} value={value} onClick={onClick} checked={selectedValue === value} />;
         const label = <Label key={`label-${i}-${value}`} text={text} onClick={onLabelClick(value)} />;
         const elements = [radio, label];
         if (position === 'right') {
            elements.reverse();
         }
         return elements;
      } else if (direction === 'horizontal') {
         return (
            <Radio 
               key={`radio-${i}-${value}`} 
               label={text} 
               position={position} 
               value={value} 
               onClick={onClick} 
               checked={selectedValue === value} 
               enableLabelClick={false}
            />
         )
      }
   });

   const classes = useRadioGroupStyles(props);
   let className = direction === 'vertical' ? classes.radioGroupVertical : classes.radioGroupHorizontal;

   return (
      <div className={className} data-arena={`radio-group:${direction}:${position}`}>
         {radios}
      </div>
   )
}

const useRadioGroupStyles = (props: RadioGroupProps<any>) => {
   return createUseStyles((theme: Theme) => ({
      radioGroupVertical: {
         display: 'grid',
         gridTemplateColumns: 'repeat(2, minmax(0px, auto))',
         gridGap: theme.paddingSmall,
      },
      radioGroupHorizontal: {
         display: 'flex',
      },
   }))();
};