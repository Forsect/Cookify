import React, { useState } from "react";
import NavBarIconVariant from "../../enums/NavBarIconVariant";
import Text from "../../Text";
import CalendarIcon from "../icons/CalendarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  iconVariant: NavBarIconVariant;
  title: string;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const [iconVariant, setIconVariant] = useState<NavBarIconVariant>(props.iconVariant);

  return (
    <div className={styles.navBar}>
      <div className={styles.mainContainer}>
        <UserIcon className={styles.userIcon} />
        <Text text={props.title} />
        {iconVariant === NavBarIconVariant.Calendar && (
          <CalendarIcon className={styles.calendarIcon} onClick={() => setIconVariant(NavBarIconVariant.ShoppingCart)} />
        )}
        {iconVariant === NavBarIconVariant.ShoppingCart && (
          <ShoppingCartIcon className={styles.shoppingCartIcon} onClick={() => setIconVariant(NavBarIconVariant.Calendar)} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
