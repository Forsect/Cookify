import React from "react";
import styles from "./Error.module.scss";
import className from "classnames";
import ErrorIcon from "../icons/ErrorIcon";

interface ErrorProps {
  text: string;
  textClassName?: string;
  borderClassName?: string;
}

const Error: React.FC<ErrorProps> = (props: ErrorProps) => {
  return (
    <div className={className(props.borderClassName, styles.errorContainer)}>
      <div className={className(props.textClassName, styles.errorText)}>{props.text}</div>
      <ErrorIcon className={styles.errorIcon} height="30" width="30" />
    </div>
  );
};

export default Error;
