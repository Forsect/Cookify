import { Meal } from "./../models/Meal";
import { action, makeObservable, observable } from "mobx";
import { refreshToken } from "./../api/AuthProvider";
import RequestHelper from "../api/RequestHelper";
import MealsService from "../api/services/MealsService";
import { DailyMeals } from "./../models/DailyMeals";
import { AddOrRemoveDailyMealRequest } from "./../models/AddOrRemoveDailyMealRequest";

class MealsStore {
  getMealsListIsLoading: boolean = false;
  selectedMeal: Meal = {
    id: "",
    name: "",
    additionalInfo: "",
    recipe: "",
    ingredients: [],
  };
  mealsList: Meal[] = [];
  dailyMealsList: DailyMeals[] = [];

  constructor() {
    makeObservable(this, {
      getMealsListIsLoading: observable,
      mealsList: observable,
      selectedMeal: observable,
      dailyMealsList: observable,
      getMealsListForUser: action,
      addMealToList: action,
      removeMealFromList: action,
    });
  }

  async getMealsListForUser() {
    try {
      this.getMealsListIsLoading = true;

      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      const result = await RequestHelper.handleAnyRequest(() =>
        MealsService.getMealsList(jwtToken)
      );

      if (!result) {
        return;
      }

      this.mealsList = result;
    } catch {
      return;
    } finally {
      this.getMealsListIsLoading = false;
    }
  }

  async addMealToList(meal: Meal) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        MealsService.addMealToList(jwtToken, meal)
      );

      await this.getMealsListForUser();
    } catch {
      return;
    }
  }

  async removeMealFromList(mealId: string) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        MealsService.removeMealFromList(jwtToken, mealId)
      );

      await this.getMealsListForUser();
    } catch {
      return;
    }
  }

  async updateMealFromList(meal: Meal) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        MealsService.updateMealFromList(jwtToken, meal)
      );

      await this.getMealsListForUser();
    } catch {
      return;
    }
  }

  async getDailyMeals() {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      const result = await RequestHelper.handleAnyRequest(() =>
        MealsService.getDailyMealsList(jwtToken)
      );

      if (!result) {
        return;
      }

      this.dailyMealsList = result.map((x) => ({
        ...x,
        date: new Date(x.date),
      }));
    } catch {
      return;
    }
  }

  async addDailyMeal(dailyMeal: AddOrRemoveDailyMealRequest) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        MealsService.addDailyMeal(jwtToken, dailyMeal)
      );

      await this.getDailyMeals();
    } catch {
      return;
    }
  }

  async removeDailyMeal(dailyMeal: AddOrRemoveDailyMealRequest) {
    try {
      const jwtToken = await refreshToken();

      if (!jwtToken) {
        return;
      }

      await RequestHelper.handleAnyRequest(() =>
        MealsService.removeDailyMeal(jwtToken, dailyMeal)
      );

      await this.getDailyMeals();
    } catch {
      return;
    }
  }
}

export default MealsStore;
