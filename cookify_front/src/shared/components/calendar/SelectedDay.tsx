import React, { useState } from "react";
import pl from "../../../localisation/pl";
import { ButtonVariant } from "../../enums/ButtonVariant";
import Button from "../buttons/Button";
import BackArrow from "../icons/BackArrowIcon";
import MealsListItem from "../meals/MealsListItem";
import styles from "./SelectedDay.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/Store";
import { DailyMeals } from "../../models/DailyMeals";
import { Meal } from "./../../models/Meal";
import { isSameDay } from "date-fns";

interface SelectedDayProps {
  // dailyMeals?: DailyMeals;
  date: Date;
  onClose: () => void;
  onDelete: ({ date, meal }: { date: Date; meal: Meal }) => void;
}

const SelectedDay: React.FC<SelectedDayProps> = observer(
  (props: SelectedDayProps) => {
    const [value, setValue] = useState("");
    const { mealsStore } = useStore();
    const [isSearchInputVisible, setIsSearchInputVisible] = useState<boolean>(
      false
    );

    return (
      <div className={styles.selectedDayContainer}>
        <BackArrow onClick={props.onClose} className={styles.arrowIcon} />
        <div className={styles.mealsListContainer}>
          {mealsStore.dailyMealsList
            .find((x) => isSameDay(x.date, props.date))
            ?.mealsList?.map((meal) => (
              <div key={meal.name} className={styles.singleMealContainer}>
                <MealsListItem
                  className={styles.singleMeal}
                  key={meal.name}
                  meal={meal}
                  onClick={() => {}}
                />
                <div
                  className={styles.deleteButton}
                  onClick={() => {
                    props.onDelete({
                      date: props.date,
                      meal: meal,
                    });
                  }}>
                  &times;
                </div>
              </div>
            ))}
        </div>
        <Button
          className={styles.addNewMealButton}
          specialMark="&#x2B; "
          text={pl.calendar.addNewMeal}
          onClick={() => {
            console.dir(props.date);
            setIsSearchInputVisible(true);
          }}
          variant={ButtonVariant.Orange}
        />

        {isSearchInputVisible && (
          <>
            <input
              className={styles.searchInput}
              value={value}
              placeholder="Posiłek"
              onChange={(value) => setValue(value.currentTarget.value)}></input>
            {mealsStore.mealsList.length > 0 && (
              <div className={styles.searchedItemContainer}>
                {mealsStore.mealsList
                  .filter((x) =>
                    x.name.toLowerCase().includes(value.toLowerCase())
                  )
                  .map((meal) => (
                    <div
                      key={meal.name}
                      className={styles.searchedItem}
                      onClick={() => {
                        mealsStore.addDailyMeal({
                          date: props.date,
                          meal: meal,
                        });
                        setValue("");
                        setIsSearchInputVisible(false);
                      }}>
                      {meal.name}
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export default SelectedDay;
