import React from "react";
import { Screen } from "../../enums/Screen";
import Text from "../../Text";
import CalendarIcon from "../icons/CalendarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  setScreen: (screen: Screen) => void;
  screen: Screen;
  title: string;
  selectedDays: Date[];
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
        <UserIcon
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
