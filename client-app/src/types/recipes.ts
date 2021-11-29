import { RecipeDirections } from "./recipeDirections";
import { RecipeIngredients } from "./recipeIngredients";
import { Review } from "./reviews";

export interface Recipe {
    recipeID: number,
    recipeName: string,
    authorName: string,
    prepareTime: number,
    cookTime: number,
    reviews: Array<Review>,
    ingredients: Array<RecipeIngredients>,
    directions: Array<RecipeDirections>
}