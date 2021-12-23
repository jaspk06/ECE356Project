import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Review } from "../types/Recipe";
import { baseURL } from "../utils";

export default function ReviewCardMini(props: Review) {
    const { rating, review, date, recipeID, recipeName, owner, userID } = props;
    const [editMode, setEditMode] = useState(false);
    const [newReview, setNewReview] = useState<Review>({ rating, review, date, recipeID, recipeName, owner, userID })
    const [hint, setHint] = useState<string>();

    const publishReview = () => {
        axios.put(`${baseURL}reviews/`, newReview).then(res =>
            window.location.reload()
        ).catch((err) => setHint(err.message))
    }

    const deleteReview = () => {
        axios.delete(`${baseURL}reviews/${recipeID}/${userID}`).then(res =>
            window.location.reload()
        ).catch((err) => setHint(err.message))
    }

    return (
        <div key={review} className="bg-white shadow hover:shadow-lg overflow-hidden sm:rounded-lg">
            {!editMode && <>
                <Link to={`/recipes/${recipeID}`}>
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                        <Rating readOnly value={rating} />
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{new Date(date).toISOString().split('T')[0]}</p>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{review.length > 80 ? review.substring(0, 79) + "..." : review}</p>
                    </div>
                </Link>
                {owner && <div className="flex ml-4 mb-5">
                    <button
                        onClick={() => setEditMode(!editMode)}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                        Edit
                    </button>
                    <button
                        onClick={() => deleteReview()}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-gray-50"
                    >
                        <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-red-500" aria-hidden="true" />
                        Delete
                    </button>
                </div>}
            </>}
            {editMode &&
                <>
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                        <Rating value={newReview.rating} onChange={(e, value) => setNewReview({ ...newReview, rating: value ? value : rating })} />
                        <textarea
                            id="review"
                            name="review"
                            rows={2}
                            required
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Review"
                            value={newReview.review}
                            onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                        />
                        <p>{hint}</p>
                    </div>
                    <div className="flex ml-4 mb-5">
                        <button
                            onClick={() => setEditMode(!editMode)}
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => publishReview()}
                            type="button"
                            disabled={newReview.review === review && newReview.rating === rating}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>
                </>}
        </div >
    )
}