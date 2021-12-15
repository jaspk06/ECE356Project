export default function RecipeCard(props: any) {
    const { recipeName, cookTime, ingredients, authorName, rating, description, directions } = props;
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{recipeName}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Created by: " + authorName}</p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Rating: " + rating + " stars"}</p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{"Ready in: " + cookTime + " minutes"}</p>
            </div>
            <div className="bg-gray-50 border-t border-gray-200">
                <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {description}
                        </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Directions</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {directions.map((direction: string) => (
                                    <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="ml-2 flex-1 w-0 truncate">{direction}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Ingredients</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                {ingredients.map((ingredient: string) => (
                                    <li className="bg-white pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <span className="ml-2 flex-1 w-0 truncate">{ingredient}</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Buy
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}