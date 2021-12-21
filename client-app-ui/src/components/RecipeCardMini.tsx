import { Link } from "react-router-dom";
import { Recipe } from "../types/Recipe";
import StarRating from "./StarRating";

export default function RecipeCardMini(props: Recipe) {
    const { recipeName, cookTime, authorName, rating, description } = props;
    return (
        <Link to={`/recipes/${20}`}
            key={20}>
            <div onClick={() => undefined} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + authorName}</p>
                    <StarRating stars={rating} />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + cookTime + " minutes"}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{description.length > 80 ? description.substring(0, 79) + "..." : description}</p>
                </div>
            </div>
        </Link>
    )
}