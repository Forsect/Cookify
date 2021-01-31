import axios from "axios";
import React, { useState } from "react";
import UserIconPopper from "../../../Pages/Home/PopperUserIcon";
import { Screen } from "../../enums/Screen";
import { DailyMeals } from "../../models/DailyMeals";
import { GeneratedShopping } from "../../models/ShoppingList";
import Text from "../../Text";
import CalendarIcon from "../icons/CalendarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  setScreen: (screen: Screen) => void;
  screen: Screen;
  title: string;
  selectedDays: DailyMeals[];
  setSelectedDays: (days: DailyMeals[]) => void;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  // const [iconVariant, setIconVariant] = useState<any>();
  // const [test, setTest] = useState<boolean>();

  // const mapScreenToIcon = (screen: Screen) => {
  //   switch (screen) {
  //     case Screen.Calendar:
  //       setIconVariant(NavBarIconVariant.Calendar);
  //       return (
  //         <CalendarIcon
  //           className={styles.calendarIcon}
  //           onClick={() => props.setScreen(Screen.ShoppingList)}
  //         />
  //       );
  //       break;
  //     case Screen.ShoppingList:
  //       setIconVariant(NavBarIconVariant.ShoppingCart);
  //       return (
  //         <ShoppingCartIcon
  //           className={styles.shoppingCartIcon}
  //           onClick={() => props.setScreen(Screen.Calendar)}
  //         />
  //       );
  //       break;
  //     case Screen.Meals:
  //       if (iconVariant === NavBarIconVariant.Calendar) {
  //         setIconVariant(NavBarIconVariant.Calendar);
  //         return (
  //           <CalendarIcon
  //             className={styles.calendarIcon}
  //             onClick={() => props.setScreen(Screen.ShoppingList)}
  //           />
  //         );
  //       } else if (iconVariant === NavBarIconVariant.ShoppingCart) {
  //         setIconVariant(NavBarIconVariant.ShoppingCart);
  //         return (
  //           <ShoppingCartIcon
  //             className={styles.shoppingCartIcon}
  //             onClick={() => props.setScreen(Screen.Calendar)}
  //           />
  //         );
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };

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
                console.dir(request);
                //HERE AXIOS ROBI BRRRRRRR
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
};

export default NavBar;
