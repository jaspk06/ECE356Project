import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { Recipe, RecipeMini, Review } from "../types/Recipe"
import { baseURL } from "../utils";
import RecipeCardMini from "./RecipeCardMini";
import ReviewCardMini from "./ReviewCardMini";

export default function UserCard(props: { userID: number }) {
    const { userID } = props;
    const [reviews, setReviews] = useState<Array<Review>>();
    const [recipes, setRecipes] = useState<Array<RecipeMini>>();

    const ownerID = localStorage.getItem("userId");

    useEffect(() => {
        axios.post(`${baseURL}recipe`, { authorID: userID }).then(res =>
            setRecipes(res.data)
        )
        axios.get(`${baseURL}reviews/user/${userID}`).then(res =>
            setReviews(res.data[0].map((review: any) => ({ ...review, recipeName: review.name })))
        )
    }, [])

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Recipes</h1>
            <div className="grid grid-cols-4 gap-4">
                {recipes && recipes.length === 0 && <p>No Recipes!</p>}
                {recipes && recipes.map(recipe =>
                    <RecipeCardMini
                        recipeID={recipe.recipeID}
                        name={recipe.name}
                        cookTime={recipe.cookTime}
                        rating={recipe.rating}
                        description={recipe.description}
                        owner={userID === parseInt(ownerID ? ownerID : "")}
                    />)}
                {!recipes && <LinearProgress />}
            </div>

            <h1 className="my-4 text-3xl font-bold text-gray-900">Reviews</h1>
            <div className="grid grid-cols-4 gap-4">
                {reviews && reviews.length === 0 && <p>No Reviews!</p>}
                {reviews && reviews.map(review =>
                    <ReviewCardMini
                        recipeID={review.recipeID}
                        rating={review.rating}
                        date={review.date}
                        review={review.review}
                        userID={review.userID}
                        firstName={review.firstName}
                        lastName={review.lastName}
                        recipeName={review.recipeName}
                        owner={userID === parseInt(ownerID ? ownerID : "")}
                    />)}
                {!reviews && <LinearProgress />}
            </div>
        </div>
    )
}