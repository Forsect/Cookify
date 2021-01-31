import React from "react";
import { ButtonVariant } from "../../enums/ButtonVariant";
import { Meal } from "../../models/Meal";
import Button from "../buttons/Button";
import styles from "./MealsListItem.module.scss";
import className from "classnames";

interface MealsListItemProps {
  meal: Meal;
  onClick: () => void;
  className?: string;
}

const MealsListItem: React.FC<MealsListItemProps> = (
  props: MealsListItemProps
) => {
  return (
    <Button
      buttonTextClass={styles.buttonText}
      className={className(props.className, styles.button)}
      variant={ButtonVariant.Blue}
      onClick={() => props.onClick()}
      text={props.meal.name}
    />
  );
};

export default MealsListItem;
