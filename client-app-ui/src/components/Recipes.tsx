import axios from "axios"
import { useEffect, useState } from "react"
import { RecipeMini } from "../types/Recipe"
import { baseURL } from "../utils"
import RecipeCardMini from "./RecipeCardMini"

export default function Recipes() {
    const [recipes, setRecipes] = useState<Array<RecipeMini>>()
    const [page, setPage] = useState(0);
    console.log(recipes)
    useEffect(() => {
        axios.get(`${baseURL}recipe`, { params: { page } }).then(res =>
            setRecipes(res.data.map((recipe: any) => ({ ...recipe, rating: recipe.Rating })))
        )
    }, [])
    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 gap-4">
                    {recipes && recipes.map(recipe => <RecipeCardMini
                        recipeID={recipe.recipeID}
                        name={recipe.name}
                        cookTime={recipe.cookTime}
                        firstName={recipe.firstName}
                        lastName={recipe.lastName}
                        rating={recipe.rating}
                        description={recipe.description} />)}
                </div>
            </div>
        </>
    )
}