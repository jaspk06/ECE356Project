import LinearProgress from "@mui/material/LinearProgress"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useEffect, useState } from "react"
import { RecipeMini } from "../types/Recipe"
import { baseURL } from "../utils"
import Filter from "./filter"
import RecipeCardMini from "./RecipeCardMini"

interface Filter {
    tags?: Array<string>,
    ingredients?: Array<string>,
    rating?: number,
    cookTime?: number
}

export default function Recipes() {
    const [recipes, setRecipes] = useState<Array<RecipeMini>>()
    const [tags, setTags] = useState<Array<string>>([])
    const [ingredients, setIngredients] = useState<Array<string>>([])
    const [page, setPage] = useState(0);
    const [filters, _setFilters] = useState<Filter>();
    const [loading, setLoading] = useState(true)

    console.log(filters)

    useEffect(() => {

        axios.post(`${baseURL}recipe`, { page, ...filters }).then(res => {
            setRecipes(res.data.map((recipe: any) => ({ ...recipe, rating: recipe.Rating })));
            setLoading(false);
        }
        )
        axios.get(`${baseURL}tag`).then(res => setTags(res.data))
        axios.get(`${baseURL}ingredient`).then(res => setIngredients(res.data))
    }, [])

    const setTagFilters = (e: Array<string>) => {
        _setFilters({ ...filters, tags: e });
    }

    const setIngredientFilters = (e: Array<string>) => {
        _setFilters({ ...filters, ingredients: e });
    }

    // useEffect(() => {
    //     axios.post(`${baseURL}recipe`, { page, ...filters }).then(res =>
    //         setRecipes(res.data.map((recipe: any) => ({ ...recipe, rating: recipe.Rating })))
    //     )
    // }, [filters?.ingredients, filters?.tags])

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Recipes</h1>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                <div className="my-4 grid grid-cols-4 gap-4">
                    <Filter name="Tags" options={tags} onChange={setTagFilters} />
                    <Filter name="Ingredients" options={ingredients} onChange={setIngredientFilters} />
                    <TextField type="number" value={filters?.rating} onChange={(e) => _setFilters({ ...filters, rating: parseInt(e.target.value) })} variant="filled" label={"Minimum Rating"} />
                    <TextField onSubmit={() => axios.post(`${baseURL}recipe`, { page, ...filters }).then(res =>
                        setRecipes(res.data.map((recipe: any) => ({ ...recipe, rating: recipe.Rating })))
                    )} type="number" value={filters?.cookTime} onChange={(e) => _setFilters({ ...filters, cookTime: parseInt(e.target.value) })} variant="filled" label={"Maximum Cook Time"} />
                    <button disabled={loading} onClick={() => {
                        setLoading(true)
                        axios.post(`${baseURL}recipe`, { page, ...filters }).then(res => {
                            setRecipes(res.data.map((recipe: any) => ({ ...recipe, rating: recipe.Rating })))
                            setLoading(false)
                        }
                        )
                    }
                    } className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Search
                    </button>
                </div>
                {loading && <LinearProgress />}
                <div className="grid grid-cols-4 gap-4">
                    {!loading && recipes && recipes.map(recipe => <RecipeCardMini
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