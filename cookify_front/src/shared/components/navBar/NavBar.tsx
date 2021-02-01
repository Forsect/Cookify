import { observer } from "mobx-react-lite";
import React from "react";
import UserIconPopper from "../../../Pages/Home/PopperUserIcon";
import { Screen } from "../../enums/Screen";
import { DailyMeals } from "../../models/DailyMeals";
import { GeneratedShopping } from "../../models/ShoppingList";
import { useStore } from "../../stores/Store";
import Text from "../../Text";
import CalendarIcon from "../icons/CalendarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  setScreen: (screen: Screen) => void;
  screen: Screen;
  title: string;
  selectedDays: DailyMeals[];
  setSelectedDays: (days: DailyMeals[]) => void;
}

const NavBar: React.FC<NavBarProps> = observer((props: NavBarProps) => {
  const { shoppingStore } = useStore();

  return (
    <div className={styles.navBar}>
      <div className={styles.mainContainer}>
        <UserIconPopper
          className={styles.userIcon}
          onClick={() => props.setScreen(Screen.Meals)}
        />
        <Text className={styles.navBarText} text={props.title} />
        {props.screen === Screen.ShoppingList && (
          <CalendarIcon
            className={styles.calendarIcon}
            onClick={() => {
              props.setScreen(Screen.Calendar);
            }}
          />
        )}
        {props.screen === Screen.Calendar && (
          <ShoppingCartIcon
            className={
              props.selectedDays.length > 0
                ? styles.shoppingCartIconAdd
                : styles.shoppingCartIcon
            }
            onClick={() => {
              if (props.selectedDays.length > 0) {
                let request: GeneratedShopping[] = [];
                props.selectedDays.forEach((day) => {
                  day.mealsList.forEach((meal) => {
                    request.push({
                      id: meal.id,
                      name: meal.name,
                      ingredients: meal.ingredients,
                    });
                  });
                });
                //HERE AXIOS ROBI BRRRRRRR POST(request)
                props.setSelectedDays([]);
              }
              props.setScreen(Screen.ShoppingList);
            }}
          />
        )}

        {props.screen === Screen.Meals && (
          <div className={styles.cartBox} id="cart">
            <ShoppingCartIcon
              className={
                props.selectedDays.length > 0
                  ? styles.shoppingCartIconAdd
                  : styles.shoppingCartIcon
              }
              onClick={() => {
                props.setScreen(Screen.ShoppingList);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default NavBar;
