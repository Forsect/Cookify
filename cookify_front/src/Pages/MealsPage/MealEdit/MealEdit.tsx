import React, { useState } from "react";
import styles from "./MealEdit.module.scss";
import pl from "../../../localisation/pl";
import { Meal } from "../../../shared/models/Meal";
import Text from "../../../shared/Text";
import TextInput from "../../../shared/components/inputs/TextInput";
import ShoppingListItem from "../../../shared/components/shoppingList/ShoppingListItem";
import Button from "../../../shared/components/buttons/Button";
import { ButtonVariant } from "../../../shared/enums/ButtonVariant";
import TextArea from "../../../shared/components/inputs/TextArea";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../shared/stores/Store";

interface MealEditProps {
  onClose: () => void;
}

const MealEdit: React.FC<MealEditProps> = observer((props: MealEditProps) => {
  const { mealsStore } = useStore();

  const [mealName, setMealName] = useState<string>(
    mealsStore.selectedMeal.name
  );
  const [mealRecipe, setMealRecipe] = useState<string>(
    mealsStore.selectedMeal.recipe
  );
  const [mealAdditionalInfo, setMealAdditionalInfo] = useState<string>(
    mealsStore.selectedMeal.additionalInfo
  );
  const [mealIngredients, setMealIngredients] = useState<string[]>(
    mealsStore.selectedMeal.ingredients
  );
  const [newIngredient, setNewIngredient] = useState<string>("");

  const addProduct = (product: string) => {
    if (!product) {
      // setErrorText("Podaj nazwę produktu");
      return;
    } else if (mealIngredients.includes(product)) {
      // setErrorText("Produkt jest już na liścię");
      return;
    }
    setMealIngredients([...mealIngredients, product]);
    // setErrorText("");
    setNewIngredient("");
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.nameContainer}>
        <Text className={styles.nameHeader} text={pl.meals.mealDetails.name} />
        <TextInput
          borderClassName={styles.mealNameInput}
          onChange={(text) => setMealName(text.currentTarget.value)}
          text={mealName}
        />
      </div>
      <div className={styles.ingredientsContainer}>
        <Text
          className={styles.header}
          text={pl.meals.mealDetails.ingredients}
        />
        {mealIngredients.map((ingredient, index) => (
          <ShoppingListItem
            disableOnClick
            onDelete={() =>
              setMealIngredients(
                mealIngredients.filter((item, index2) => index !== index2)
              )
            }
            name={ingredient}
            key={ingredient}
          />
        ))}
        <div className={styles.addNewIngredientInputContainer}>
          <div
            style={{ marginBottom: "3px" }}
            onClick={() => addProduct(newIngredient)}>
            &#x2B;
          </div>
          <input
            className={styles.addNewIngredientInput}
            onKeyDown={(key) => {
              if (key.key === "Enter") addProduct(newIngredient);
            }}
            placeholder="Dodaj element"
            onChange={(text) => setNewIngredient(text.currentTarget.value)}
            value={newIngredient}
          />
        </div>
      </div>
      <div className={styles.recipeContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.recipe} />
        <TextArea
          className={styles.recipeTextArea}
          onChange={(text) => setMealRecipe(text.currentTarget.value)}
          text={mealRecipe}
        />
      </div>
      <div className={styles.additionalInfoContainer}>
        <Text
          className={styles.header}
          text={pl.meals.mealDetails.additionalInfo}
        />
        <TextArea
          className={styles.additionalInfoTextArea}
          onChange={(text) => setMealAdditionalInfo(text.currentTarget.value)}
          text={mealAdditionalInfo}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.button}
          variant={ButtonVariant.Orange}
          onClick={() => props.onClose()}
          text={pl.meals.mealDetails.close}
        />
        <Button
          className={styles.button}
          variant={ButtonVariant.Blue}
          onClick={() => {
            let newMeal = {
              id: mealsStore.selectedMeal.id,
              name: mealName,
              ingredients: mealIngredients,
              recipe: mealRecipe,
              additionalInfo: mealAdditionalInfo,
            } as Meal;
            if (mealsStore.mealsList.includes(mealsStore.selectedMeal)) {
              mealsStore.updateMealFromList(newMeal);
              mealsStore.selectedMeal = newMeal;
            } else if (mealName) {
              mealsStore.addMealToList(newMeal);
            }
            props.onClose();
          }}
          text={pl.meals.mealDetails.save}
        />
      </div>
    </div>
  );
});

export default MealEdit;
