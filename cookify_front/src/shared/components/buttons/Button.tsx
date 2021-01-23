import React from "react";
import classNames from "classnames";
import { ButtonVariant } from "../../enums/ButtonVariant";
import styles from "./Button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  text: string;
  className?: string;
  buttonTextClass?: string;
  variant: ButtonVariant;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  let buttonActiveClass: string;

  switch (props.variant) {
    case ButtonVariant.Blue:
      buttonActiveClass = styles.buttonBlueActive;
      break;
    case ButtonVariant.Orange:
      buttonActiveClass = styles.buttonOrangeActive;
      break;
  }

  return (
    <div
      className={classNames({ [styles.buttonDisabled]: props.disabled }, buttonActiveClass, props.className)}
      onClick={() => {
        if (props.disabled) {
          return;
        }

        props.onClick();
      }}>
      <div className={classNames(styles.buttonText, props.buttonTextClass)}>{props.text}</div>
    </div>
  );
};

export default Button;
