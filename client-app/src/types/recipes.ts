import { RecipeDirections } from "./recipeDirections";
import { RecipeIngredients } from "./recipeIngredients";
import { Review } from "./reviews";

export interface Recipe {
    recipeId: number,
    name: string,
    authorID: number,
    cookTime: number,
    date: Date,
    description: string
}