import React from "react";
import className from "classnames";
import styles from "./Paper.module.scss";

interface PaperProps {
  className?: string;
}

const Paper: React.FC<PaperProps> = (props) => {
  return (
    <div className={className(props.className, styles.paper)}>
      {props.children}
    </div>
  );
};

export default Paper;
