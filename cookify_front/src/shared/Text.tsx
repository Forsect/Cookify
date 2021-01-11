import React from "react";
import className from "classnames";
import styles from "./Text.module.scss";

interface TextProps {
  text: string;
  className?: string;
}

const Text: React.FC<TextProps> = (props: TextProps) => {
  return <div className={className(styles, props.className)}>{props.text}</div>;
};

export default Text;
