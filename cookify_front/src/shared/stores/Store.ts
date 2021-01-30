import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import ShoppingStore from "./ShoppingStore";
import MealsStore from "./MealsStore";

export interface IStore {
  userStore: UserStore;
  shoppingStore: ShoppingStore;
  mealsStore: MealsStore;
}

export const store: IStore = {
  userStore: new UserStore(),
  shoppingStore: new ShoppingStore(),
  mealsStore: new MealsStore(),
};

export const StoreContext = createContext(store);
export const useStore = () => {
  return useContext(StoreContext);
};
