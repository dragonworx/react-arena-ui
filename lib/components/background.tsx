import * as React from 'react';
import { ReactNode } from 'react';
import { Theme, createUseStyles } from '~lib';

export interface BackgroundProps {
   children?: ReactNode;
   color?: string;
   imageSrc?: string;
   imageSize?: 'cover' | 'contain';
   imageRepeat?: 'no-repeat' | 'repeat-x' | 'repeat-y';
   imagePos?: string;
   padded?: boolean;
   width?: number | string;
   height?: number | string;
}

export function Background(props: BackgroundProps) {
   const { children } = props;

   const classes = useStyles(props);

   return (
      <div className={classes.background}>{children}</div>
   )
}

const useStyles = (props: BackgroundProps) => {
   return createUseStyles((theme: Theme) => ({
      'background': {
         position: 'absolute',
         left: 0,
         top: 0,
         right: 0,
         bottom: 0,
         backgroundColor: props.color ? props.color : undefined,
         backgroundImage: props.imageSrc ? `url(${props.imageSrc})` : undefined,
         backgroundSize: props.imageSrc && props.imageSize ? props.imageSize : 'auto',
         backgroundRepeat: props.imageRepeat ? props.imageRepeat : 'repeat',
         backgroundPosition: props.imagePos ? props.imagePos : 'top left',
         margin: 0,
         padding: props.padded ? theme.padding : 0,
         borderRadius: theme.borderRadius,
         width: props.width ? props.width : undefined,
         height: props.height ? props.height : undefined,
      }
   }))();
};