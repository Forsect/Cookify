import React from "react";
import styles from "./MealDetails.module.scss";
import pl from "../../../localisation/pl";
import Text from "../../../shared/Text";
import PencilIcon from "../../../shared/components/icons/PencilIcon";
import ShoppingListItem from "../../../shared/components/shoppingList/ShoppingListItem";
import Button from "../../../shared/components/buttons/Button";
import { ButtonVariant } from "../../../shared/enums/ButtonVariant";
import TrashCanIcon from "../../../shared/components/icons/TrashCanIcon";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../shared/stores/Store";

interface MealDetailsProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MealDetails: React.FC<MealDetailsProps> = observer(
  (props: MealDetailsProps) => {
    const { mealsStore } = useStore();

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
          <Text
            className={styles.nameHeader}
            text={pl.meals.mealDetails.name}
          />
          <Text
            className={styles.mealNameInput}
            text={mealsStore.selectedMeal.name}
          />
        </div>
        <div className={styles.ingredientsContainer}>
          <Text
            className={styles.header}
            text={pl.meals.mealDetails.ingredients}
          />
          {mealsStore.selectedMeal.ingredients.map((ingredient) => (
            <ShoppingListItem
              disableOnClick
              name={ingredient}
              key={ingredient}
            />
          ))}
        </div>
        <div className={styles.recipeContainer}>
          <Text className={styles.header} text={pl.meals.mealDetails.recipe} />
          <Text
            className={styles.recipeTextArea}
            text={mealsStore.selectedMeal.recipe}
          />
        </div>
        <div className={styles.additionalInfoContainer}>
          <Text
            className={styles.header}
            text={pl.meals.mealDetails.additionalInfo}
          />
          <Text
            className={styles.additionalInfoTextArea}
            text={mealsStore.selectedMeal.additionalInfo}
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
  }
);

export default MealDetails;
