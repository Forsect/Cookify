import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";
import { Meal } from "../../models/Meal";
import Checkbox from "../checkboxes/Checkbox";
import styles from "./SingleCalendarItem.module.scss";
import className from "classnames";

interface SingleCalendarItemProps {
  className?: string;
  isSelected: boolean;
  date: Date;
  setSelectedDays: () => void;
  scheduledMeals?: Meal[];
  onClick: () => void;
  ref: any;
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

var months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const SingleCalendarItem: React.FC<SingleCalendarItemProps> = forwardRef(
  (props: SingleCalendarItemProps, ref: any) => {
    // const [isChecked, setIsChecked] = useState<boolean>(props.isSelected);
    const calendarItemRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(
      ref,
      () => ({
        getYPosition: () => calendarItemRef.current?.offsetTop,
      }),
      []
    );
    return (
      <div style={{ width: "90%" }} ref={calendarItemRef}>
        {props.date.getDate() === 1 && (
          <div className={className(props.className, styles.monthContainer)}>
            {"------------" + months[props.date.getMonth()] + "------------"}
          </div>
        )}
        <div
          className={className(
            props.className,
            styles.singleClanedarItemContainer
          )}>
          <div onClick={props.onClick} className={styles.infoContainer}>
            <div className={styles.dateContainer}>
              <div className={styles.dayOfTheMonth}>
                {("0" + props.date.getDate()).slice(-2)}
              </div>
              <div className={styles.dayOfTheWeek}>
                {days[props.date.getDay()].substr(0, 3)}
              </div>
            </div>
            <div className={styles.scheduledMeals}>
              {props.scheduledMeals
                ? `Liczba zaplanowanych posiłków: ${props.scheduledMeals.length}`
                : "Brak zaplanowanych posiłków"}
            </div>
          </div>
          <Checkbox
            key={props.date.toString()}
            sizeClass={styles.checkbox}
            checked={props.isSelected}
            onCheckedChanged={() => {
              // setIsChecked(!isChecked);
              props.setSelectedDays();
            }}
          />
        </div>
      </div>
    );
  }
);

export default SingleCalendarItem;
