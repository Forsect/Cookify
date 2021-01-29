import classNames from "classnames";
import React, { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import EyeOffIcon from "../icons/EyeOffIcon";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  additionalClassName?: string;
  placeholder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = (
  props: PasswordInputProps
) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={classNames(styles.inputBorder, props.additionalClassName)}>
      <input
        className={styles.input}
        type={passwordVisible ? "text" : "password"}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder ? props.placeholder : undefined}
      />
      {passwordVisible ? (
        <EyeOffIcon
          className={styles.eyeIcon}
          onClick={() => setPasswordVisible(false)}
        />
      ) : (
        <EyeIcon
          className={styles.eyeIcon}
          onClick={() => setPasswordVisible(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
