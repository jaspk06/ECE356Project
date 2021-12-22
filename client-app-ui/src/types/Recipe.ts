
export interface Recipe {
    recipeName: string,
    cookTime: number,
    ingredients: Array<string>,
    authorID: number,
    authorName: string,
    rating: number,
    description: string,
    directions: Array<string>,
    reviews: Array<Review>,
    nutrition: Object
}
export interface RecipeMini {
    recipeID: number,
    name: string,
    cookTime: number,
    firstName: string,
    lastName: string,
    rating: number,
    description: string
}
export interface Nutrition {
    calories: number,
    totalFat: number,
    saturatedFat: number,
    sodium: number,
    sugar: number,
    protein: number
}
export interface Review {
    rating: number,
    date: Date,
    review: string,
    userID: number,
    firstName: string,
    lastName: string
}