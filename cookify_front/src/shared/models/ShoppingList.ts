export interface ShoppingList {
  mainShoppingList: string[];
  generatedShoppingList: GeneratedShopping[];
}

export interface GeneratedShopping {
  id: string;
  name: string;
  ingredients: string[];
}
