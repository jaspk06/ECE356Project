import { Link } from "react-router-dom";

export default function Example() {
    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Add a Recipe</h2>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">General Information</h3></div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="recipe-title" className="block text-sm font-medium text-gray-700">
                                                Recipe Title
                                            </label>
                                            <input
                                                type="text"
                                                name="recipe-title"
                                                id="recipe-title"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 mt-1">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Description"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-3 mt-1">
                                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                                                Ingredients
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="ingredients"
                                                    name="ingredients"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Ingredients seperated by commas"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-3 mt-1">
                                            <label htmlFor="directions" className="block text-sm font-medium text-gray-700">
                                                Directions
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="directions"
                                                    name="directions"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Directions"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                                Tags
                                            </label>
                                            <input
                                                type="text"
                                                name="tags"
                                                id="tags"
                                                placeholder="Tags seperated by commas"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="cook-time" className="block text-sm font-medium text-gray-700">
                                                Cook Time
                                            </label>
                                            <input
                                                type="number"
                                                name="cook-time"
                                                id="cook-time"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6"> <h3 className="text-lg font-medium leading-6 text-gray-900">Nutrition Information</h3></div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                                                Calories
                                            </label>
                                            <input
                                                type="number"
                                                name="calories"
                                                id="calories"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="total-fat" className="block text-sm font-medium text-gray-700">
                                                Total Fat
                                            </label>
                                            <input
                                                type="number"
                                                name="total-fat"
                                                id="total-fat"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="sugar" className="block text-sm font-medium text-gray-700">
                                                Sugar
                                            </label>
                                            <input
                                                type="number"
                                                name="sugar"
                                                id="sugar"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="sodium" className="block text-sm font-medium text-gray-700">
                                                Sodium
                                            </label>
                                            <input
                                                type="number"
                                                name="sodium"
                                                id="sodium"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
                                                Protein
                                            </label>
                                            <input
                                                type="number"
                                                name="protein"
                                                id="protein"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="saturated-fat" className="block text-sm font-medium text-gray-700">
                                                Saturated Fat
                                            </label>
                                            <input
                                                type="number"
                                                name="saturated-fat"
                                                id="saturated-fat"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center py-2 px-4 mr-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-black hover:text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}