import React from "react";
import styles from "./MealDetails.module.scss";
import pl from "../../../localisation/pl";
import { Meal } from "../../../shared/models/Meal";
import Text from "../../../shared/Text";
import PencilIcon from "../../../shared/components/icons/PencilIcon";
import ShoppingListItem from "../../../shared/components/shoppingList/ShoppingListItem";
import Button from "../../../shared/components/buttons/Button";
import { ButtonVariant } from "../../../shared/enums/ButtonVariant";
import TrashCanIcon from "../../../shared/components/icons/TrashCanIcon";

interface MealDetailsProps {
  meal: Meal;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MealDetails: React.FC<MealDetailsProps> = (props: MealDetailsProps) => {
  return (
    <div className={styles.componentContainer}>
      <div className={styles.iconsContainer}>
        <TrashCanIcon
          onClick={props.onDelete}
          className={styles.trashCanIcon}
        />
        <PencilIcon onClick={props.onEdit} className={styles.pencilIcon} />
      </div>
      <div className={styles.nameContainer}>
        <Text className={styles.nameHeader} text={pl.meals.mealDetails.name} />
        <Text className={styles.mealNameInput} text={props.meal.name} />
      </div>
      <div className={styles.ingredientsContainer}>
        <Text
          className={styles.header}
          text={pl.meals.mealDetails.ingredients}
        />
        {props.meal.ingredients.map((ingredient) => (
          <ShoppingListItem disableOnClick name={ingredient} key={ingredient} />
        ))}
      </div>
      <div className={styles.recipeContainer}>
        <Text className={styles.header} text={pl.meals.mealDetails.recipe} />
        <Text className={styles.recipeTextArea} text={props.meal.recipe} />
      </div>
      <div className={styles.additionalInfoContainer}>
        <Text
          className={styles.header}
          text={pl.meals.mealDetails.additionalInfo}
        />
        <Text
          className={styles.additionalInfoTextArea}
          text={props.meal.additionalInfo}
        />
      </div>
      <Button
        className={styles.button}
        variant={ButtonVariant.Orange}
        onClick={() => props.onClose()}
        text={pl.meals.mealDetails.close}
      />
    </div>
  );
};

export default MealDetails;
