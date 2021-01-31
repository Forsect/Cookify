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

interface SelectedDayProps {
  dailyMeals: DailyMeals;
  onClose: () => void;
  onDelete: (meal: DailyMeals) => void;
}

const SelectedDay: React.FC<SelectedDayProps> = observer(
  (props: SelectedDayProps) => {
    const [value, setValue] = useState("");
    const { mealsStore } = useStore();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSearchInputVisible, setIsSearchInputVisible] = useState<boolean>(
      false
    );

    return (
      <div className={styles.selectedDayContainer}>
        <BackArrow onClick={props.onClose} className={styles.arrowIcon} />
        <div className={styles.mealsListContainer}>
          {props.dailyMeals.meals &&
            props.dailyMeals.meals.map((meal) => (
              <div className={styles.singleMealContainer}>
                <MealsListItem
                  className={styles.singleMeal}
                  key={meal.name}
                  meal={meal}
                  onClick={() => {}}
                />
                <div
                  className={styles.deleteButton}
                  onClick={() => props.onDelete(props.dailyMeals)}>
                  &times;
                </div>
              </div>
            ))}
        </div>
        <Button
          className={styles.addNewMealButton}
          specialMark="&#x2B; "
          text={pl.calendar.addNewMeal}
          onClick={() => setIsSearchInputVisible(true)}
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
                      className={styles.searchedItem}
                      onClick={() => {
                        // setValue(meal.name); AXIOS
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
