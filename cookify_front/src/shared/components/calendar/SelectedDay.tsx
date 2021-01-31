import React, { useState } from "react";
import pl from "../../../localisation/pl";
import { ButtonVariant } from "../../enums/ButtonVariant";
import { Meal } from "../../models/Meal";
import Button from "../buttons/Button";
import BackArrow from "../icons/BackArrowIcon";
import MealsListItem from "../meals/MealsListItem";
import styles from "./SelectedDay.module.scss";
import Autosuggest, {
  InputProps,
  OnSuggestionSelected,
  RenderSuggestionParams,
  RenderSuggestionsContainerParams,
} from "react-autosuggest";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/Store";

interface SelectedDayProps {
  day: Date;
  meals?: Meal[];
  onClose: () => void;
}

const SelectedDay: React.FC<SelectedDayProps> = observer(
  (props: SelectedDayProps) => {
    const [value, setValue] = useState("");
    const { mealsStore } = useStore();
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const getSuggestionValue = (suggestion: string) => suggestion;

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
      let mealsList = mealsStore.mealsList.map((x) => x.name);
      let foundSuggestions = mealsList.filter((x) =>
        x.toLowerCase().includes(value.toLowerCase())
      );
      if (foundSuggestions) setSuggestions(foundSuggestions);
    };

    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };

    const onChange = (event: any, { newValue }: { newValue: string }) => {
      setValue(newValue);
    };

    const inputProps = {
      placeholder: "Meal",
      value,
      onChange: onChange,
    };

    const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

    return (
      <div className={styles.selectedDayContainer}>
        <BackArrow onClick={props.onClose} className={styles.arrowIcon} />
        <div className={styles.mealsListContainer}>
          {props.meals &&
            props.meals.map((meal) => (
              <MealsListItem key={meal.name} meal={meal} onClick={() => {}} />
            ))}
        </div>
        <Button
          className={styles.addNewMealButton}
          specialMark="&#x2B; "
          text={pl.calendar.addNewMeal}
          onClick={() => {}}
          variant={ButtonVariant.Orange}
        />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
);

export default SelectedDay;
