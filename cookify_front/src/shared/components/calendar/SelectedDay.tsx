import React from "react";
import { Meal } from "../../models/Meal";
import BackArrow from "../icons/BackArrowIcon";
import MealsListItem from "../meals/MealsListItem";
import styles from "./SelectedDay.module.scss";

interface SelectedDayProps {
  day: Date;
  meals?: Meal[];
  onClose: () => void;
}

const SelectedDay: React.FC<SelectedDayProps> = (props: SelectedDayProps) => {
  return (
    <div className={styles.selectedDayContainer}>
      <BackArrow onClick={props.onClose} className={styles.arrowIcon} />
      <div className={styles.mealsListContainer}>
        {props.meals &&
          props.meals.map((meal) => (
            <MealsListItem key={meal.name} meal={meal} onClick={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default SelectedDay;
