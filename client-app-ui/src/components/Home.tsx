import RecipeCard from "./RecipeCard"

const recipes = [
    {
        recipeName: 'Chicken Soup',
        cookTime: 20,
        ingredients: ['chicken', 'celery', 'carrots', 'salt', 'pepper'],
        authorName: 'user user',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        directions: ['step 1', 'step 2', 'step 3', 'step 4']
    },
    {
        recipeName: 'Chicken Soup',
        cookTime: 20,
        ingredients: ['chicken', 'celery', 'carrots', 'salt', 'pepper'],
        authorName: 'user user',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        directions: ['step 1', 'step 2', 'step 3', 'step 4']
    },
    {
        recipeName: 'Chicken Soup',
        cookTime: 20,
        ingredients: ['chicken', 'celery', 'carrots', 'salt', 'pepper'],
        authorName: 'user user',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        directions: ['step 1', 'step 2', 'step 3', 'step 4']
    },
    {
        recipeName: 'Chicken Soup',
        cookTime: 20,
        ingredients: ['chicken', 'celery', 'carrots', 'salt', 'pepper'],
        authorName: 'user user',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        directions: ['step 1', 'step 2', 'step 3', 'step 4']
    }
]

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {recipes.map(recipe => <RecipeCard
                    recipeName={recipe.recipeName}
                    cookTime={recipe.cookTime}
                    ingredients={recipe.ingredients}
                    authorName={recipe.authorName}
                    rating={recipe.rating}
                    description={recipe.description}
                    directions={recipe.directions} />)}
            </div>

        </>
    )
}