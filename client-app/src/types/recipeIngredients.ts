import { Ingredient } from "./ingredients";
import { Recipe } from "./recipes";

export interface RecipeIngredients {
    recipe: Recipe,
    ingredient: Ingredient
}