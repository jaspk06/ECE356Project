import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { Recipe, Review } from "../types/Recipe";
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils";
import { Rating } from "@mui/material";

export default function RecipeCard() {
    const { recipeID } = useParams<{ recipeID: string }>();
    console.log(recipeID)
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        axios.get(`${baseURL}recipe/${recipeID}`).then(res => {
            const recipe: Recipe = res.data;
            recipe.recipeName = res.data.name;
            console.log(recipe);
            setRecipe(recipe);
        });
    }, [])

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {recipe && <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="lg:grid lg:grid-cols-2">
                    <div className="px-4 py-5 sm:px-6">
                        <div className="mt-0 flex ml-auto">
                            <span>
                                <button
                                    onClick={() => { navigate(-1) }}
                                    type="button"
                                    className="inline-flex items-center text-sm font-medium text-gray-700 bg-white"
                                >
                                    <ChevronLeftIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                    Back
                                </button>
                            </span>
                        </div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{recipe.recipeName}</h3>
                        <Link to={`/users/${recipe.authorID}`}>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + recipe.authorName}</p>
                        </Link>
                        <Rating precision={0.1} value={recipe.reviews.reduce((a, b) => a + (b.rating || 0), 0) / recipe.reviews.length} readOnly />
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + recipe.cookTime + " minutes"}</p>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <br />
                        <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {recipe.description}
                        </p>
                    </div>
                </div>

                <Modal />
                <div className="bg-gray-50 border-t border-gray-200">
                    <dl>
                        <div className="lg:grid lg:grid-cols-2">
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Directions</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                        {recipe.directions.map((direction: string, i) => (
                                            <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <span className="ml-2 flex-1 w-0">{`${i + 1}. ${direction}`}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Ingredients</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                        {recipe.ingredients.map((ingredient: string) => (
                                            <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <span className="ml-2 flex-1 w-0">{ingredient}</span>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a href={`https://www.walmart.ca/search?q=${ingredient}&c=10019`} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Buy
                                                    </a>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
                <div className="bg-gray-50 border-t border-gray-200">
                    <dl>
                        <div className="lg:grid lg:grid-cols-1">
                            <div className="px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Reviews</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                        {recipe.reviews.map((review: Review, i) => (
                                            <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <span className="ml-2 flex-1 w-0">
                                                        <Rating precision={0.1} value={review.rating} readOnly />
                                                        <br />
                                                        <Link to={`/users/${review.userID}`}>
                                                            {review.firstName} {review.lastName}
                                                        </Link>
                                                        <br />
                                                        {new Date(review.date).toDateString()}
                                                        <br />
                                                        <br />
                                                        {review.review}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>}
        </div>
    )
}