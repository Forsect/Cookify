import classNames from "classnames";
import React from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <div className={classNames(styles.inputBorder, props.borderClassName)}>
      <input
        className={classNames(styles.input, props.inputClassName)}
        type="text"
        onChange={props.onChange}
        placeholder={props.placeholder ? props.placeholder : undefined}
      />
    </div>
  );
};

export default TextInput;
