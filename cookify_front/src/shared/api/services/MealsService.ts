import { AxiosPromise } from "axios";
import { Meal } from "./../../models/Meal";
import { getWithJwt, postWithJwt, deleteWithJwt } from "./../BaseApi";
import { BASE_API_URL } from "./../../constants/Constants";
import { toJS } from "mobx";
import { DailyMeals } from "./../../models/DailyMeals";
import { AddOrRemoveDailyMealRequest } from "./../../models/AddOrRemoveDailyMealRequest";

interface MealsService {
  getMealsList(jwtToken: string): AxiosPromise<Meal[]>;
  addMealToList(jwtToken: string, request: Meal): AxiosPromise;
  removeMealFromList(jwtToken: string, mealId: string): AxiosPromise;
  updateMealFromList(jwtToken: string, request: Meal): AxiosPromise;
  getDailyMealsList(jwtToken: string): AxiosPromise<DailyMeals[]>;
  addDailyMeal(
    jwtToken: string,
    request: AddOrRemoveDailyMealRequest
  ): AxiosPromise;
  removeDailyMeal(
    jwtToken: string,
    request: AddOrRemoveDailyMealRequest
  ): AxiosPromise;
}

export class DefaultMealsService implements MealsService {
  private getMealsListForUserUrl = "/meals/GetMealsList";
  private addMealToListUrl = "/meals/AddMealToList";
  private removeMealFromListUrl = "/meals/RemoveMealFromList";
  private updateMealFromListUrl = "/meals/UpdateMealFromList";
  private getDailyMealsListUrl = "/meals/GetDailyMealsList";
  private addDailyMealUrl = "/meals/AddDailyMeal";
  private removeDailyMealUrl = "/meals/RemoveDailyMeal";

  getMealsList(jwtToken: string): AxiosPromise<Meal[]> {
    return getWithJwt<Meal[]>(
      BASE_API_URL + this.getMealsListForUserUrl,
      jwtToken
    );
  }
  addMealToList(jwtToken: string, request: Meal): AxiosPromise {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.addMealToListUrl,
      jwtToken,
      request
    );
  }
  removeMealFromList(jwtToken: string, mealId: string): AxiosPromise {
    return deleteWithJwt<AxiosPromise>(
      BASE_API_URL + this.removeMealFromListUrl,
      jwtToken,
      { MealId: mealId }
    );
  }
  updateMealFromList(jwtToken: string, request: Meal): AxiosPromise {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.updateMealFromListUrl,
      jwtToken,
      toJS(request)
    );
  }
  getDailyMealsList(jwtToken: string): AxiosPromise<DailyMeals[]> {
    return getWithJwt<DailyMeals[]>(
      BASE_API_URL + this.getDailyMealsListUrl,
      jwtToken
    );
  }
  addDailyMeal(
    jwtToken: string,
    request: AddOrRemoveDailyMealRequest
  ): AxiosPromise {
    return postWithJwt<AxiosPromise>(
      BASE_API_URL + this.addDailyMealUrl,
      jwtToken,
      request
    );
  }
  removeDailyMeal(
    jwtToken: string,
    request: AddOrRemoveDailyMealRequest
  ): AxiosPromise {
    return deleteWithJwt<AxiosPromise>(
      BASE_API_URL + this.removeMealFromListUrl,
      jwtToken,
      request
    );
  }
}

export default new DefaultMealsService();
