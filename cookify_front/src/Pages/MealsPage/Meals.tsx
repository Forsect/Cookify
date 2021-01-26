import React, { useState } from "react";
import pl from "../../localisation/pl";
import Button from "../../shared/components/buttons/Button";
import SearchInput from "../../shared/components/inputs/SearchInput";
import MealsListItem from "../../shared/components/meals/MealsListItem";
import { ButtonVariant } from "../../shared/enums/ButtonVariant";
import { Meal } from "../../shared/models/Meal";
import MealDetails from "./MealDetails/MealDetails";
import MealEdit from "./MealEdit/MealEdit";
import styles from "./Meals.module.scss";

const Meals: React.FC = () => {
  const [mealsList, setMealsList] = useState<Meal[]>([
    {
      name: "Gołąbki",
      ingredients: ["kapusta", "1kg mielone", "sos pomidorowy"],
      recipe: "Brak",
      additionalInfo: "Potrawę znalazłem na www.mojapotrawa.pl/golabki",
    },
    {
      name: "Frytki ze schabowym",
      ingredients: ["frytki", "1kg mięso z łopatki"],
      recipe: "Usmaż frytki, rozbij mięso i potem przypraw",
      additionalInfo: "Potrawę znalazłem na www.mojapotrawa.pl/frytkiZeSchabowym",
    },
    {
      name: "Kluski śląskie",
      ingredients: ["kluski", "kapusta kiszona"],
      recipe: "Brak",
      additionalInfo: "Brak",
    },
    {
      name: "Pizza hawajska",
      ingredients: ["ser", "ketchup", "ciasto", "ananas"],
      recipe: "Brak",
      additionalInfo: "150 minut w piekarniku na 260^C",
    },
    {
      name: "Grochowa",
      ingredients: ["groch", "3 łopatki z indyka", "kapusta kiszona"],
      recipe: "Brak",
      additionalInfo: "Brak",
    },
    {
      name: "Zapiekanka",
      ingredients: ["ciasto", "ser", "pieczarki"],
      recipe: "Brak",
      additionalInfo: "Brak",
    },
  ]);
  const [searchedName, setSearchedName] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<Meal>({ name: "", additionalInfo: "", recipe: "", ingredients: [] });
  const [isMealEditOpen, setIsMealEditOpen] = useState<boolean>(false);
  const [isMealDetailsOpen, setIsMealDetailsOpen] = useState<boolean>(false);

  const searchByName = (meal: Meal, text: string) => {
    return meal.name.toLowerCase().includes(text.toLowerCase());
  };

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
          variant={ButtonVariant.Blue}
          onClick={() => {
            setSelectedMeal({ name: "", additionalInfo: "", recipe: "", ingredients: [] });
            setIsMealEditOpen(true);
          }}
          text={pl.meals.newMealButton}
        />
        <div className={styles.mealsListContainer}>
          {mealsList
            .filter((x) => searchByName(x, searchedName))
            .map((meal) => (
              <MealsListItem
                onClick={() => {
                  setSelectedMeal(meal);
                  setIsMealDetailsOpen(true);
                }}
                meal={meal}
              />
            ))}
        </div>
      </>
    );
  };

  const renderMealEdit = () => {
    return (
      <MealEdit
        onClose={() => setIsMealEditOpen(false)}
        meals={mealsList}
        setMealsList={(meal) => setMealsList(meal)}
        meal={selectedMeal}
      />
    );
  };

  const renderMealDetails = () => {
    return <MealDetails meal={selectedMeal} onClose={() => setIsMealDetailsOpen(false)} onEdit={() => setIsMealEditOpen(true)} />;
  };

  const renderContent = () => {
    if (isMealDetailsOpen && isMealEditOpen) return renderMealEdit();
    if (isMealDetailsOpen) return renderMealDetails();
    if (isMealEditOpen) return renderMealEdit();
    return renderMeals();
  };

  return <div className={styles.componentContainer}>{renderContent()}</div>;
};

export default Meals;
