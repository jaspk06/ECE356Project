import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Recipe, RecipeMini } from "../types/Recipe";
import { baseURL } from "../utils";

export default function RecipeCardMini(props: RecipeMini) {
    const { recipeID, name, cookTime, firstName, lastName, rating, description, owner } = props;

    // const [editMode, setEditMode] = useState(false);
    // const [newReview, setNewReview] = useState<Review>({ rating, review, date, recipeID, recipeName, owner, userID })
    const [hint, setHint] = useState<string>();

    const deleteRecipe = () => {
        axios.delete(`${baseURL}recipe/${recipeID}`).then(res =>
            window.location.reload()
        ).catch((err) => setHint(err.message))
    }

    return (
        <div key={recipeID} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
            <Link to={`/recipes/${recipeID}`}>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
                    {firstName && <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + firstName + " " + lastName}</p>}
                    <Rating value={rating} readOnly precision={0.1} />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + cookTime + " minutes"}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{description.length > 80 ? description.substring(0, 79) + "..." : description}</p>

                </div>
            </Link>
            {owner && <div className="flex">
                <Link to={`/edit/recipe/${recipeID}`}>
                    <button
                        // onClick={() => setEditMode()}
                        type="button"
                        className="ml-4 mb-5 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                        Edit
                    </button>
                </Link>
                <button
                    onClick={() => deleteRecipe()}
                    type="button"
                    className="ml-4 mb-5 inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-50"
                >
                    <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-red-500" aria-hidden="true" />
                    Delete
                </button>
            </div>}
        </div >
    )
}