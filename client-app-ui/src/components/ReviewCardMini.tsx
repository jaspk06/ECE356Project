import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { Recipe, RecipeMini, Review } from "../types/Recipe";
import StarRating from "./StarRating";

export default function ReviewCardMini(props: Review) {
    const { rating, review, date, recipeID, recipeName, owner } = props;
    return (
        <div key={review} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
            <Link to={`/recipes/${recipeID}`}>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                    <Rating readOnly value={rating} />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(date).toISOString().split('T')[0]}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{review.length > 80 ? review.substring(0, 79) + "..." : review}</p>
                </div>
            </Link>
            {owner && <div className="flex">
                <button
                    // onClick={() => setEditMode()}
                    type="button"
                    className="ml-4 mb-5 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                    Edit
                </button>
                <button
                    // onClick={() => setEditMode()}
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