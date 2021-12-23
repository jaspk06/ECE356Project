import { Link } from "react-router-dom";
import { Recipe, RecipeMini, Review } from "../types/Recipe";
import StarRating from "./StarRating";

export default function ReviewCardMini(props: Review) {
    const { rating, review, date, recipeID, recipeName } = props;
    return (
        <div key={review} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
            <Link to={`/recipes/${recipeID}`}>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                    <StarRating stars={rating} />
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(date).toISOString().split('T')[0]}</p>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{review.length > 80 ? review.substring(0, 79) + "..." : review}</p>
                </div>
            </Link>
        </div >
    )
}