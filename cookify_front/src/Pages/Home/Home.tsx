import React, { useState } from "react";
import NavBar from "../../shared/components/navBar/NavBar";
import { Screen } from "../../shared/enums/Screen";
import Meals from "../MealsPage/Meals";
import ShoppingList from "../ShoppingList/ShoppingList";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.ShoppingList);

  return (
    <>
      <NavBar
        title={screen}
        screen={screen}
        setScreen={(screen) => setScreen(screen)}
      />
      {screen === Screen.ShoppingList && <ShoppingList />}
      {screen === Screen.Calendar && <div>Tu bedzie kalendarz</div>}
      {screen === Screen.Meals && <Meals />}
    </>
  );
};

export default Home;
