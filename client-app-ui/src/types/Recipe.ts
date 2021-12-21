
export interface Recipe {
    recipeName: string,
    cookTime: number,
    ingredients: Array<string>,
    authorName: string,
    rating: number,
    description: string,
    directions: Array<string>
}