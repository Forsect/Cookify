import React, { useState } from "react";
import styles from "./MealEdit.module.scss";
import pl from "../../../localisation/pl";
import { Meal } from "../../../shared/models/Meal";
import Text from "../../../shared/Text";
import TextInput from "../../../shared/components/inputs/TextInput";
import ShoppingListItem from "../../../shared/components/shoppingList/ShoppingListItem";
import Meals from "../Meals";
import Button from "../../../shared/components/buttons/Button";
import { ButtonVariant } from "../../../shared/enums/ButtonVariant";

interface MealEditProps {
  meal: Meal;
  meals: Meal[];
  setMealsList: (meals: Meal[]) => void;
  onClose: () => void;
}

const MealEdit: React.FC<MealEditProps> = (props: MealEditProps) => {
  const [mealName, setMealName] = useState<string>(props.meal.name);
  const [mealRecipe, setMealRecipe] = useState<string>(props.meal.recipe);
  const [mealAdditionalInfo, setMealAdditionalInfo] = useState<string>(props.meal.additionalInfo);
  const [mealIngredients, setMealIngredients] = useState<string[]>(props.meal.ingredients);
  const [newIngredient, setNewIngredient] = useState<string>("");
  return (
    <div className={styles.componentContainer}>
      <div className={styles.nameContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.name} />
        <TextInput onChange={(text) => setMealName(text.currentTarget.value)} text={mealName} />
      </div>
      <div className={styles.ingredientsContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.ingredients} />
        {mealIngredients.map((ingredient, index) => (
          <ShoppingListItem
            onDelete={() => setMealIngredients(mealIngredients.filter((item, index2) => index !== index2))}
            name={ingredient}
            key={ingredient}
          />
        ))}
        +
        <input
          className={styles.addItemInput}
          onKeyDown={(key) => {
            if (key.key === "Enter") {
              setMealIngredients([...mealIngredients, newIngredient]);
              setNewIngredient("");
            }
          }}
          placeholder="Dodaj element"
          onChange={(text) => setNewIngredient(text.currentTarget.value)}
          value={newIngredient}
        />
      </div>
      <div className={styles.recipeContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.recipe} />
        <TextInput onChange={(text) => setMealRecipe(text.currentTarget.value)} text={mealRecipe} />
      </div>
      <div className={styles.additionalInfoContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.additionalInfo} />
        <TextInput
          borderClassName={styles.additionalInfoTextInput}
          onChange={(text) => setMealAdditionalInfo(text.currentTarget.value)}
          text={mealAdditionalInfo}
        />
      </div>
      <Button
        variant={ButtonVariant.Blue}
        onClick={() => {
          let newMeals = [...props.meals];
          if (newMeals[newMeals.indexOf(props.meal)]) {
            let item = newMeals[newMeals.indexOf(props.meal)];
            item.name = mealName;
            item.ingredients = mealIngredients;
            item.recipe = mealRecipe;
            item.additionalInfo = mealAdditionalInfo;
            newMeals[newMeals.indexOf(props.meal)] = item;
          } else {
            newMeals = [
              ...props.meals,
              { name: mealName, ingredients: mealIngredients, recipe: mealRecipe, additionalInfo: mealAdditionalInfo },
            ];
          }
          props.setMealsList([...newMeals]);
          props.onClose();
        }}
        text={pl.meals.mealDetails.save}
      />
      <Button variant={ButtonVariant.Orange} onClick={() => props.onClose()} text={pl.meals.mealDetails.close} />
    </div>
  );
};

export default MealEdit;
