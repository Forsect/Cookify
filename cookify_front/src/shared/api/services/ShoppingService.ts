import { AxiosPromise } from "axios";
import { BASE_API_URL } from "../../constants/Constants";
import { getWithJwt, postWithJwt, deleteWithJwt } from "./../BaseApi";
import { GetShoppingListResult } from "./../../models/GetShoppingListResult";

interface ShoppingService {
  getShoppingListForUser(
    jwtToken: string,
    id?: string
  ): AxiosPromise<GetShoppingListResult>;
  addProductToList(jwtToken: string, productName: string): AxiosPromise;
  removeProductFromList(jwtToken: string, productName: string): AxiosPromise;
}

export class DefaultShoppingService implements ShoppingService {
  private getShoppingListForUseUrl: string = "/shopping/GetShoppingListForUser";
  private addProductToListUrl: string = "/shopping/AddProductToList";
  private removeProductFromListUrl: string = "/shopping/RemoveProductFromList";

  getShoppingListForUser(
    jwtToken: string,
    id?: string
  ): AxiosPromise<GetShoppingListResult> {
    return getWithJwt<GetShoppingListResult>(
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
}

export default new DefaultShoppingService();
