import React, { useState } from "react";
import NavBar from "../../shared/components/navBar/NavBar";
import { Screen } from "../../shared/enums/Screen";
import { DailyMeals } from "../../shared/models/DailyMeals";
import Calendar from "../Calendar/Calendar";
import Meals from "../MealsPage/Meals";
import ShoppingList from "../ShoppingList/ShoppingList";

const Home: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.ShoppingList);
  const [selectedDays, setSelectedDays] = useState<DailyMeals[]>([]);
  return (
    <>
      <NavBar
        title={screen}
        screen={screen}
        setScreen={(screen) => setScreen(screen)}
        selectedDays={selectedDays}
        setSelectedDays={(days) => setSelectedDays(days)}
      />
      {screen === Screen.ShoppingList && <ShoppingList />}
      {screen === Screen.Calendar && (
        <Calendar
          setSelectedDays={(days) => {
            setSelectedDays(days);
          }}
          selectedDays={selectedDays}
        />
      )}
      {screen === Screen.Meals && <Meals />}
    </>
  );
};

export default Home;
