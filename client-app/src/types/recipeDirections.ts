import { Recipe } from "./recipes";

export interface RecipeDirections {
    recipe: Recipe,
    step: number,
    description: string
}