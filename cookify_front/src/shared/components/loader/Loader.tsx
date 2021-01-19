import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  text: string;
  containerClass: string;
}

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  return (
    <div className={props.containerClass}>
      <div className={styles.activityIndicator}></div>
      <div className={styles.loadingText}>{props.text}</div>
    </div>
  );
};

export default Loader;
