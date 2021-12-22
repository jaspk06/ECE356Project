
export interface Recipe {
    recipeName: string,
    cookTime: number,
    ingredients: Array<string>,
    authorName: string,
    rating: number,
    description: string,
    directions: Array<string>,
    nutrition: Object
}
export interface RecipeMini {
    recipeID: number,
    name: string,
    cookTime: number,
    authorName: string,
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