import { AxiosPromise } from "axios";
import { BASE_API_URL } from "../../constants/Constants";
import { getWithJwt, postWithJwt, deleteWithJwt } from "./../BaseApi";
import { GeneratedShopping, ShoppingList } from "../../models/ShoppingList";

interface ShoppingService {
  getShoppingListForUser(
    jwtToken: string,
    id?: string
  ): AxiosPromise<ShoppingList>;
  addProductToList(jwtToken: string, productName: string): AxiosPromise;
  removeProductFromList(jwtToken: string, productName: string): AxiosPromise;
  addGeneratedShoppingToList(
    jwtToken: string,
    request: GeneratedShopping[]
  ): AxiosPromise;
  removeGeneratedShoppingToList(
    jwtToken: string,
    generatedId: string
  ): AxiosPromise;
}

export class DefaultShoppingService implements ShoppingService {
  private getShoppingListForUseUrl: string = "/shopping/GetShoppingListForUser";
  private addProductToListUrl: string = "/shopping/AddProductToList";
  private removeProductFromListUrl: string = "/shopping/RemoveProductFromList";
  private addGeneratedShoppingToListUrl: string =
    "/shopping/AddGeneratedShoppingToList";
  private removeGeneratedShoppingToListUrl: string =
    "/shopping/RemoveGeneratedShoppingToList";

  getShoppingListForUser(
    jwtToken: string,
    id?: string
  ): AxiosPromise<ShoppingList> {
    return getWithJwt<ShoppingList>(
      BASE_API_URL + this.getShoppingListForUseUrl + (id ? `?id=${id}` : ""),
      jwtToken
    );
  }

  addProductToList(jwtToken: string, productName: string): AxiosPromise {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.addProductToListUrl,
      jwtToken,
      { ProductName: productName }
    );
  }

  removeProductFromList(jwtToken: string, productName: string): AxiosPromise {
    return deleteWithJwt<AxiosPromise>(
      BASE_API_URL + this.removeProductFromListUrl,
      jwtToken,
      { ProductName: productName }
    );
  }

  addGeneratedShoppingToList(
    jwtToken: string,
    request: GeneratedShopping[]
  ): AxiosPromise {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.addProductToListUrl,
      jwtToken,
      request
    );
  }

  removeGeneratedShoppingToList(
    jwtToken: string,
    generatedId: string
  ): AxiosPromise {
    throw new Error("Method not implemented.");
  }
}

export default new DefaultShoppingService();
