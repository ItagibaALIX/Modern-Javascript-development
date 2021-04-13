import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { createStyles, Theme } from '@material-ui/core/styles';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

interface StyledProps {
  variant: MuiButtonProps['variant'];
  disabled: boolean;
  color: 'primary' | 'success' | 'warning' | 'error';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getButtonStyle = (props: StyledProps, color: PaletteColor): any => ({
  '&:hover': props.variant === 'contained' ? { backgroundColor: color.light } : null,
  background: props.variant === 'contained' && props.disabled === false
    ? color.main : 'transparent',
  border: props.variant === 'outlined' ? `1px solid ${color.main}` : 'none',
  color: props.variant !== 'contained' ? color.main : 'white',
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  default: {
    color: 'white',
    '& span': {
      textAlign: 'center',
      textTransform: 'none',
    },
  },
  primary: (props: StyledProps) => (getButtonStyle(props, theme.palette[props.color])),
  error: (props: StyledProps) => (getButtonStyle(props, theme.palette[props.color])),
  success: (props: StyledProps) => (getButtonStyle(props, theme.palette[props.color])),
  warning: (props: StyledProps) => (getButtonStyle(props, theme.palette[props.color])),
}));

export interface ButtonProps {
  className?: string;
  variant?: MuiButtonProps['variant'];
  type?: MuiButtonProps['type'];
  color?: 'primary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  href?: string;
  fullWidth?: MuiButtonProps['fullWidth'];
  size?: MuiButtonProps['size'];
  startIcon?: MuiButtonProps['startIcon'];
  endIcon?: MuiButtonProps['endIcon'];
  component?: React.ElementType;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = React.forwardRef(({
  variant, children, className, color = 'primary', disabled = false, ...props
}: ButtonProps, ref: React.Ref<HTMLButtonElement>): JSX.Element => {
  const classes = useStyles({ variant, disabled, color });

  return (
    <MuiButton
      className={clsx(classes.default, classes[color], className)}
      disabled={disabled}
      variant={variant}
      disableElevation
      ref={ref}
      {...props}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
