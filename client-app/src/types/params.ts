// extend this interface for each route (override sortBy)
interface Param {
    sortOrder?: "asc" | "desc",
    sortBy?: string
    limit: number
}

export interface RecipeParams extends Param {
    sortBy?: "name" | "cookTime" | "date" | "rating",
    tags: Array<string>,
    ingredients: Array<string>
    rating: { upper: number, lower: number }
}