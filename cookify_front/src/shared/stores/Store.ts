import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import ShoppingStore from "./ShoppingStore";

export interface IStore {
  userStore: UserStore;
  shoppingStore: ShoppingStore;
}

export const store: IStore = {
  userStore: new UserStore(),
  shoppingStore: new ShoppingStore(),
};

export const StoreContext = createContext(store);
export const useStore = () => {
  return useContext(StoreContext);
};
