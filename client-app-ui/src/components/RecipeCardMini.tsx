import { Link } from "react-router-dom";
import { Recipe, RecipeMini } from "../types/Recipe";
import StarRating from "./StarRating";

export default function RecipeCardMini(props: RecipeMini) {
    const { recipeID, name, cookTime, authorName, rating, description } = props;
    return (
        <div key={recipeID} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
            <Link to={`/recipes/${recipeID}`}>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + authorName}</p>
                    <StarRating stars={rating} />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + cookTime + " minutes"}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{description.length > 80 ? description.substring(0, 79) + "..." : description}</p>
                </div>
            </Link>
        </div >
    )
}