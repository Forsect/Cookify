import { AxiosPromise } from "axios";
import { Meal } from "./../../models/Meal";
import { getWithJwt, postWithJwt, deleteWithJwt } from "./../BaseApi";
import { BASE_API_URL } from "./../../constants/Constants";
import { toJS } from "mobx";

interface MealsService {
  getMealsList(jwtToken: string): AxiosPromise<Meal[]>;
  addMealToList(jwtToken: string, request: Meal): AxiosPromise;
  removeMealFromList(jwtToken: string, mealId: string): AxiosPromise;
  updateMealFromList(jwtToken: string, request: Meal): AxiosPromise;
}

export class DefaultMealsService implements MealsService {
  private getMealsListForUserUrl = "/meals/GetMealsList";
  private addMealToListUrl = "/meals/AddMealToList";
  private removeMealFromListUrl = "/meals/RemoveMealFromList";
  private updateMealFromListUrl = "/meals/UpdateMealFromList";

  getMealsList(jwtToken: string): AxiosPromise<Meal[]> {
    return getWithJwt<Meal[]>(
      BASE_API_URL + this.getMealsListForUserUrl,
      jwtToken
    );
  }
  addMealToList(jwtToken: string, request: Meal): AxiosPromise<any> {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.addMealToListUrl,
      jwtToken,
      request
    );
  }
  removeMealFromList(jwtToken: string, mealId: string): AxiosPromise<any> {
    return deleteWithJwt<AxiosPromise>(
      BASE_API_URL + this.removeMealFromListUrl,
      jwtToken,
      { MealId: mealId }
    );
  }
  updateMealFromList(jwtToken: string, request: Meal): AxiosPromise<any> {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.updateMealFromListUrl,
      jwtToken,
      toJS(request)
    );
  }
}

export default new DefaultMealsService();
