import { Recipe } from "./recipes";

export interface Review{
    reviewID: number,
    recipe: Recipe,
    rating: number,
    review: string
}