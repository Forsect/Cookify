import React from "react";
import { ButtonVariant } from "../../enums/ButtonVariant";
import { Meal } from "../../models/Meal";
import Button from "../buttons/Button";
import styles from "./MealsListItem.module.scss";

interface MealsListItemProps {
  meal: Meal;
  onClick: () => void;
}

const MealsListItem: React.FC<MealsListItemProps> = (props: MealsListItemProps) => {
  return (
    <Button
      buttonTextClass={styles.buttonText}
      className={styles.button}
      variant={ButtonVariant.Orange}
      onClick={() => props.onClick()}
      text={props.meal.name}
    />
  );
};

export default MealsListItem;
