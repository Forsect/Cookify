import { Meal } from "./Meal";

export interface AddOrRemoveDailyMealRequest {
  date: Date;
  meal: Meal;
}
