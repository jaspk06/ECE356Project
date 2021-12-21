import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { Recipe } from "../types/Recipe";
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import Modal from "./Modal";
import { useState } from "react";

const fakeGetRecipe = (recipeId: number): Recipe => {
    return {
        recipeName: 'Chicken Soup',
        cookTime: 20,
        ingredients: ['chicken', 'celery', 'carrots', 'salt', 'pepper'],
        authorName: 'user user',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        directions: ['step 1', 'step 2', 'step 3', 'step 4']
    }
}

export default function RecipeCard() {
    const { recipeId } = useParams<{ recipeId: string }>();
    const [nutritionOpen, setNutritionOpen] = useState(false);
    const navigate = useNavigate();

    const { recipeName, cookTime, ingredients, authorName, rating, description, directions } = fakeGetRecipe(parseInt(recipeId ? recipeId : "-1"));

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                        <Link to="/users/1231">
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + authorName}</p>
                        </Link>
                        <StarRating stars={rating} />
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + cookTime + " minutes"}</p>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {description}
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
                                        {directions.map((direction: string, i) => (
                                            <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <span className="ml-2 flex-1 w-0 truncate">{`${i + 1}. ${direction}`}</span>
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
                                        {ingredients.map((ingredient: string) => (
                                            <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                <div className="w-0 flex-1 flex items-center">
                                                    <span className="ml-2 flex-1 w-0 truncate">{ingredient}</span>
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
            </div>
        </div>
    )
}