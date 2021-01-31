import classNames from "classnames";
import React, { ChangeEvent } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  sizeClass: string;
  checked?: boolean;
  onCheckedChanged: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        onChange={props.onCheckedChanged}
        className={classNames(styles.checkbox, props.sizeClass)}
        checked={props.checked}
      />
      <svg
        viewBox="0 0 21 21"
        className={classNames(styles.tickMark, props.sizeClass)}>
        <polyline points="5 10.75 8.5 14.25 16 6" />
      </svg>
    </div>
  );
};

export default Checkbox;
