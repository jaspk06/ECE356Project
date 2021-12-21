import { Recipe } from "./recipes";

export interface Review {
    recipeId: number,
    userId: number,
    rating: number,
    date: Date,
    review: string
}