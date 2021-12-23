import { MinusIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../utils";
import Toast from "./Toast";
const regexNumbers = /^[0-9\b]+$/;

export default function Example() {
    const [form, setForm] = useState({ recipeName: "", cookTime: 0, description: "", ingredients: [""], directions: [""], tags: [""], steps: [], nutrition: { calories: 0, saturatedFat: 0, totalFat: 0, sugar: 0, sodium: 0, protein: 0 } })
    const [toast, setToast] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

    const userId = localStorage.getItem("userId");
    const handleArray = (ingredients: Array<string>, index: number, value: string) => {
        const temp = ingredients;
        temp[index] = value;
        return temp;
    }

    const createRecipe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToast({ ...toast, open: false });
        axios.post(`${baseURL}recipe/${userId}`, form).then(res => {
            if (res.status === 201)
                setToast({ severity: "success", open: true, message: "Successfully added recipe!" })
            else
                setToast({ severity: "error", open: true, message: res.data })
        }).catch(err => setToast({ severity: "error", open: true, message: err.message }));
    }

    return (
        <>
            <Toast open={toast.open} message={toast.message} severity={toast.severity} />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Add a Recipe</h2>
                </div>
            </header>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={createRecipe}>
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
                                                required
                                                placeholder="Recipe Title"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={form.recipeName}
                                                onChange={e => setForm({ ...form, recipeName: e.target.value })}
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
                                                    required
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Description"
                                                    value={form.description}
                                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="cook-time" className="block text-sm font-medium text-gray-700">
                                                Cook Time
                                            </label>
                                            <input
                                                type="number"
                                                name="cook-time"
                                                id="cook-time"
                                                min="0"
                                                required
                                                value={form.cookTime}
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, cookTime: parseInt(e.target.value) })
                                                }}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-1 mt-1">
                                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                                                Ingredients
                                            </label>
                                            {form.ingredients.map((ingredient, i) =>
                                                <div className="flex">
                                                    <input
                                                        key={`ingredient-${i}`}
                                                        type="text"
                                                        name={`ingredient-${i}`}
                                                        id={`ingredient-${i}`}
                                                        placeholder="Ingredient Name"
                                                        onChange={(e) => setForm({ ...form, ingredients: handleArray(form.ingredients, i, e.target.value) })}
                                                        required
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                    <button
                                                        onClick={() => setForm({ ...form, ingredients: form.ingredients.filter(a => a !== ingredient) })}
                                                        type="button"
                                                        className="p-1 rounded-full text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>

                                            )}
                                            <button
                                                onClick={() => setForm({ ...form, ingredients: form.ingredients.concat([""]) })}
                                                type="button"
                                                className="mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black hover:text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="col-span-1">
                                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                                Tags
                                            </label>
                                            {form.tags.map((tag, i) =>
                                                <div className="flex">
                                                    <input
                                                        key={`tag-${i}`}
                                                        type="text"
                                                        name={`tag-${i}`}
                                                        id={`tag-${i}`}
                                                        placeholder={`Tag Name`}
                                                        onChange={(e) => setForm({ ...form, tags: handleArray(form.tags, i, e.target.value) })}
                                                        required
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                    <button
                                                        onClick={() => setForm({ ...form, tags: form.tags.filter(d => d !== tag) })}
                                                        type="button"
                                                        className="p-1 rounded-full text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>

                                            )}
                                            <button
                                                onClick={() => setForm({ ...form, tags: form.tags.concat([""]) })}
                                                type="button"
                                                className="mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black hover:text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="col-span-3 mt-1">
                                            <label htmlFor="directions" className="block text-sm font-medium text-gray-700">
                                                Directions
                                            </label>
                                            {form.directions.map((direction, i) =>
                                                <div className="flex">
                                                    <input
                                                        key={`direction-${i}`}
                                                        type="text"
                                                        name={`direction-${i}`}
                                                        id={`direction-${i}`}
                                                        placeholder={`Step ${i + 1}`}
                                                        onChange={(e) => setForm({ ...form, directions: handleArray(form.directions, i, e.target.value) })}
                                                        required
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                    <button
                                                        onClick={() => setForm({ ...form, directions: form.directions.filter(d => d !== direction) })}
                                                        type="button"
                                                        className="p-1 rounded-full text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <MinusIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>

                                            )}
                                            <button
                                                onClick={() => setForm({ ...form, directions: form.directions.concat([""]) })}
                                                type="button"
                                                className="mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black hover:text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Add
                                            </button>
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
                                                min="0"
                                                value={form.nutrition.calories}
                                                required
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, calories: parseInt(e.target.value) } })
                                                }}
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
                                                min="0"
                                                value={form.nutrition.totalFat}
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, totalFat: parseInt(e.target.value) } })
                                                }}
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
                                                min="0"
                                                required
                                                value={form.nutrition.sugar}
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, sugar: parseInt(e.target.value) } })
                                                }}
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
                                                min="0"
                                                value={form.nutrition.sodium}
                                                required
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, sodium: parseInt(e.target.value) } })
                                                }}
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
                                                min="0"
                                                value={form.nutrition.protein}
                                                required
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, protein: parseInt(e.target.value) } })
                                                }}
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
                                                min="0"
                                                value={form.nutrition.saturatedFat}
                                                required
                                                onChange={e => {
                                                    if (e.target.value === '' || regexNumbers.test(e.target.value))
                                                        setForm({ ...form, nutrition: { ...form.nutrition, saturatedFat: parseInt(e.target.value) } })
                                                }}
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
            </div >
        </>
    )
}