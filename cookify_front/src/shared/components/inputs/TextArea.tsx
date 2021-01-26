import React from "react";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

interface TextAreaProps {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  return <textarea className={classNames(props.className, styles.textArea)} onChange={props.onChange} value={props.text}></textarea>;
};

export default TextArea;
