import React from "react";
import { InfoBarVariant } from "../../enums/InfoBarVariant";
import styles from "./InfoBar.module.scss";
import classNames from "classnames";

export interface InfoBarProps {
  text: string;
  variant: InfoBarVariant;
  className?: string;
  onClose: () => void;
}

const InfoBar: React.FC<InfoBarProps> = (props: InfoBarProps) => {
  let infoBarActiveClass: string;
  let infoBarTextActiveClass: string;

  switch (props.variant) {
    case InfoBarVariant.Red:
      infoBarActiveClass = styles.infoBarRedActive;
      infoBarTextActiveClass = styles.infoBarTextRedActive;
      break;
    case InfoBarVariant.Blue: {
      infoBarActiveClass = styles.infoBarBlueActive;
      infoBarTextActiveClass = styles.infoBarTextBlueActive;
      break;
    }
  }

  return (
    <div className={classNames(infoBarActiveClass, props.className)}>
      <div className={infoBarTextActiveClass}>
        <div>{props.text}</div>
        <div className={styles.close} onClick={props.onClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
