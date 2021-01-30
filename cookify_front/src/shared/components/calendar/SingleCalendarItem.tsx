import React, { useState } from "react";
import Checkbox from "../checkboxes/Checkbox";
import styles from "./SingleCalendarItem.module.scss";

interface SingleCalendarItemProps {
  date: Date;
  setSelectedDays: () => void;
}

var days = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

const SingleCalendarItem: React.FC<SingleCalendarItemProps> = (
  props: SingleCalendarItemProps
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <div className={styles.singleClanedarItemContainer}>
      <div className={styles.dateContainer}>
        <div className={styles.dayOfTheMonth}>
          {("0" + props.date.getDate()).slice(-2)}
        </div>
        <div className={styles.dayOfTheWeek}>
          {days[props.date.getDay()].substr(0, 3)}
        </div>
      </div>
      <div className={styles.scheduledMeals}>Brak zaplanowanych posiłków</div>
      <Checkbox
        sizeClass={styles.checkbox}
        onCheckedChanged={() => {
          setIsChecked(!isChecked);
          props.setSelectedDays();
        }}
      />
    </div>
  );
};

export default SingleCalendarItem;
