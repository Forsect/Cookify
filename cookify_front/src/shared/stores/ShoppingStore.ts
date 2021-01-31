import { makeObservable, observable, action } from "mobx";
import { ShoppingList } from "../models/ShoppingList";
import { refreshToken } from "./../api/AuthProvider";
import RequestHelper from "../api/RequestHelper";
import ShoppingService from "../api/services/ShoppingService";
import { GetGeneratedShoppingList } from "../models/GetGeneratedShoppingList";

class ShoppingStore {
  getShoppingListIsLoading: boolean = false;
  shoppingList: ShoppingList = {
    mainShoppingList: [],
    generatedShoppingList: [],
  };
  sharedShoppingLists: ShoppingList[] = [];

  constructor() {
    makeObservable(this, {
      getShoppingListIsLoading: observable,
      shoppingList: observable,
      sharedShoppingLists: observable,
      getShoppingListForUser: action,
      addProductToList: action,
      removeProductFromList: action,
    });
  }

  async getShoppingListForUser(id?: string) {
    try {
      this.getShoppingListIsLoading = true;

      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      const result = await RequestHelper.handleAnyRequest(() =>
        ShoppingService.getShoppingListForUser(jwtToken, id)
      );

      if (!result) {
        return;
      }

      this.shoppingList = result;
    } catch {
      return;
    } finally {
      this.getShoppingListIsLoading = false;
    }
  }

  async addProductToList(productName: string) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        ShoppingService.addProductToList(jwtToken, productName)
      );

      await this.getShoppingListForUser();
    } catch {
      return;
    } finally {
    }
  }

  async removeProductFromList(productName: string) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        ShoppingService.removeProductFromList(jwtToken, productName)
      );

      await this.getShoppingListForUser();
    } catch {
      return;
    } finally {
    }
  }
}

export default ShoppingStore;
