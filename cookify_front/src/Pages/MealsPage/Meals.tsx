import React, { useState, useEffect } from "react";
import pl from "../../localisation/pl";
import Button from "../../shared/components/buttons/Button";
import SearchInput from "../../shared/components/inputs/SearchInput";
import MealsListItem from "../../shared/components/meals/MealsListItem";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import { Meal } from "../../shared/models/Meal";
import MealDetails from "./MealDetails/MealDetails";
import MealEdit from "./MealEdit/MealEdit";
import styles from "./Meals.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../shared/stores/Store";

const Meals: React.FC = observer(() => {
  const { mealsStore } = useStore();

  const [searchedName, setSearchedName] = useState("");
  const [isMealEditOpen, setIsMealEditOpen] = useState<boolean>(false);
  const [isMealDetailsOpen, setIsMealDetailsOpen] = useState<boolean>(false);

  // const [selectedMeal, setSelectedMeal] = useState<Meal>({
  //   id: "",
  //   name: "",
  //   additionalInfo: "",
  //   recipe: "",
  //   ingredients: [],
  // });

  const searchByName = (meal: Meal, text: string) => {
    return meal.name.toLowerCase().includes(text.toLowerCase());
  };

  useEffect(() => {
    mealsStore.getMealsListForUser();
    //eslint-disable-next-line
  }, []);

  const renderMeals = () => {
    return (
      <>
        <SearchInput
          searchedName={searchedName}
          inputClassName={styles.searchInput}
          borderClassName={styles.searchInputBorder}
          placeholder={pl.meals.searchButton}
          onChange={(text) => setSearchedName(text.currentTarget.value)}
        />
        <Button
          specialMark="&#x2B; "
          className={styles.addNewMealButton}
          variant={ButtonVariant.Orange}
          onClick={() => {
            mealsStore.selectedMeal = {
              id: "",
              name: "",
              additionalInfo: "",
              recipe: "",
              ingredients: [],
            };
            setIsMealEditOpen(true);
          }}
          text={pl.meals.newMealButton}
        />
        <div className={styles.mealsListContainer}>
          {mealsStore.mealsList
            .filter((x) => searchByName(x, searchedName))
            .map((meal) => {
              console.dir(meal);
              return (
                <MealsListItem
                  onClick={() => {
                    mealsStore.selectedMeal = meal;
                    setIsMealDetailsOpen(true);
                  }}
                  meal={meal}
                  key={meal.id}
                />
              );
            })}
        </div>
      </>
    );
  };

  const renderMealEdit = () => {
    return <MealEdit onClose={() => setIsMealEditOpen(false)} />;
  };

  const renderMealDetails = () => {
    return (
      <MealDetails
        onClose={() => setIsMealDetailsOpen(false)}
        onEdit={() => setIsMealEditOpen(true)}
        onDelete={() => {
          mealsStore.removeMealFromList(mealsStore.selectedMeal.id);
          setIsMealDetailsOpen(false);
        }}
      />
    );
  };

  const renderContent = () => {
    if (isMealDetailsOpen && isMealEditOpen) return renderMealEdit();
    if (isMealDetailsOpen) return renderMealDetails();
    if (isMealEditOpen) return renderMealEdit();
    return renderMeals();
  };

  return renderContent();
});

export default Meals;
