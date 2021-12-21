import { parse } from 'csv-parse';
import fs from 'fs';
import { Parser } from 'json2csv';
import faker from 'faker';

import { Recipe } from 'types/recipes';
import { RecipeIngredients } from 'types/recipeIngredients';
import { Ingredient, IngredientAlias } from 'types/ingredients';
import { User } from 'types/user';
import { Tag } from 'types/tags';
import { RecipeNutrition } from 'types/nutrition';
import { Step } from 'types/step';
import { Review } from 'types/reviews';


interface RecipeCSV {
    'Recipe Name': string,
    RecipeID: number,
    'Review Count': number,
    'Recipe Photo': string,
    Author: string,
    'Prepare Time': string,
    'Cook Time': string,
    'Total Time': string,
    Ingredients: string,
    Directions: string
}

interface PPRecipeCSV {
    id: number,
    i: number,
    name_tokens: string,
    ingredient_tokens: string,
    steps_tokens: string,
    techniques: string,
    calorie_level: number,
    ingredient_ids: string
}

interface PPUsersCSV {
    u: number,
    techniques: Array<number>,
    items: Array<number>,
    n_items: number,
    ratings: Array<number>,
    n_ratings: number
}

interface RAWInteractionsCSV {
    user_id: number,
    recipe_id: number,
    date: Date,
    rating: number,
    review: string
}

interface RAWRecipesCSV {
    name: string,
    id: number,
    minutes: number,
    contributor_id: number,
    submitted: Date,
    tags: string,
    nutrition: string,
    n_steps: number,
    steps: string,
    description: string
}
interface FullIngredientsCSV {
    raw_ingr: string,
    raw_words: number,
    processed: string,
    len_proc: number,
    replaced: string,
    count: number,
    id: number
}

(() => {
    console.log("loading ingredients...")
    const ingredients: Array<Ingredient> = [];
    const ingredientAliases: Array<IngredientAlias> = [];
    let count = 0;
    const startTime = performance.now();
    const parser1 = new Parser();
    const parser2 = new Parser();
    fs.createReadStream('data/FullIngredients.csv')
        .pipe(parse({
            skipEmptyLines: true,
            escape: '\\',
            skipRecordsWithError: true,
            trim: true,
            cast: true,
            columns: true
        }))
        .on('data', (row: FullIngredientsCSV) => {
            const alias = ingredientAliases.find(alias => alias.alias === row.replaced)
            if (!alias) {
                ingredientAliases.push({ aliasId: count, alias: row.replaced })
                ingredients.push({ ingredientId: row.id, aliasId: count, ingredientName: row.raw_ingr });
                count++;
            } else {
                ingredients.push({ ingredientId: row.id, aliasId: alias.aliasId, ingredientName: row.raw_ingr });
            }
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            ingredients.sort((a, b) => a.ingredientId - b.ingredientId);
            const csvIngredients = parser1.parse(ingredients);
            const csvAlias = parser2.parse(ingredientAliases);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_ingredients.csv', csvIngredients);
            fs.writeFileSync('data/PARSED_alias.csv', csvAlias);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_ingredients.csv, data/PARSED_alias.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()}\n\n`);
        })
})();

(() => {
    console.log("loading users...")
    const users: Array<User> = [];
    const startTime = performance.now();
    const parser = new Parser();
    fs.createReadStream('data/PP_users.csv')
        .pipe(parse({
            skipEmptyLines: true,
            escape: '\\',
            skipRecordsWithError: true,
            trim: true,
            cast: true,
            columns: true
        }))
        .on('data', (row: PPUsersCSV) => {
            users.push({ userId: row.u, firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), phoneNumber: faker.phone.phoneNumber(), gender: faker.name.gender(), birthday: faker.date.between(1950, new Date().getFullYear() - 12), dateJoined: faker.date.between(2000, new Date()) })
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            const csvUsers = parser.parse(users);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_users.csv', csvUsers);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_users.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()}\n\n`);
        })
})();

(() => {
    console.log("loading recipes...")
    let count = 0;
    const recipes: Array<Recipe> = [];
    const tags: Array<Tag> = [];
    const recipeTags: Array<{ recipeId: number, tagId: number }> = [];
    const recipeNutrition: Array<RecipeNutrition> = [];
    const recipeDirections: Array<Step> = [];
    const startTime = performance.now();
    const parser1 = new Parser();
    const parser2 = new Parser();
    const parser3 = new Parser();
    const parser4 = new Parser();
    const parser5 = new Parser();
    fs.createReadStream('data/RAW_recipes.csv')
        .pipe(parse({
            skipEmptyLines: true,
            escape: '\\',
            skipRecordsWithError: true,
            trim: true,
            cast: true,
            columns: true
        }))
        .on('data', (row: RAWRecipesCSV) => {
            try {
                const parsedTags: Array<string> = JSON.parse(row.tags.split('\'').join('"'));
                const parsedSteps: Array<string> = JSON.parse(row.steps.split('\'').join('"'));
                const parsedNutrition: Array<number> = JSON.parse(row.nutrition);
                parsedTags.forEach((rowTag: string) => {
                    const findTag = tags.find(tag => tag.tag === rowTag);
                    if (!findTag) {
                        tags.push({ tagId: count, tag: rowTag });
                        recipeTags.push({ recipeId: row.id, tagId: count });
                        count++;
                    } else {
                        recipeTags.push({ recipeId: row.id, tagId: findTag.tagId });
                    }
                });
                recipes.push({ recipeId: row.id, name: row.name, authorID: row.contributor_id, cookTime: row.minutes, date: row.submitted, description: row.description })
                recipeNutrition.push({ recipeId: row.id, calories: parsedNutrition[0], totalFat: parsedNutrition[1], sugar: parsedNutrition[2], sodium: parsedNutrition[3], protein: parsedNutrition[4], saturatedFat: parsedNutrition[5] })
                parsedSteps.forEach((step, i) => recipeDirections.push({ recipeId: row.id, step: i, description: step }));
            } catch (error) {
                // console.error(error);
            }
        })
        .on('end', async () => {
            // ingredients.sort((a, b) => a.ingredientId - b.ingredientId);
            console.log("Parsing objects...")
            const csvRecipes = parser1.parse(recipes);
            const csvRecipeTags = parser2.parse(recipeTags);
            const csvTags = parser3.parse(tags);
            const csvNutrition = parser4.parse(recipeNutrition);
            const csvSteps = parser5.parse(recipeDirections);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_recipes.csv', csvRecipes);
            fs.writeFileSync('data/PARSED_recipe_tags.csv', csvRecipeTags);
            fs.writeFileSync('data/PARSED_tags.csv', csvTags);
            fs.writeFileSync('data/PARSED_nutrition.csv', csvNutrition);
            fs.writeFileSync('data/PARSED_directions.csv', csvSteps);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_recipes.csv, data/PARSED_tags.csv, data/PARSED_recipe_tags.csv, data/PARSED_nutrition.csv, PARSED_directions.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()} \n\n`);
        })
})();

(() => {
    console.log("loading recipe ingredients...")
    const recipeIngredients: Array<RecipeIngredients> = [];
    const startTime = performance.now();
    const parser = new Parser();
    fs.createReadStream('data/PP_recipes.csv')
        .pipe(parse({
            skipEmptyLines: true,
            escape: '\\',
            skipRecordsWithError: true,
            trim: true,
            cast: true,
            columns: true
        }))
        .on('data', (row: PPRecipeCSV) => {
            const parsedIngredients: Array<number> = JSON.parse(row.ingredient_ids);
            parsedIngredients.forEach(ingredientId => recipeIngredients.push({ recipeId: row.id, ingredientId: ingredientId }));
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            const csvRecipeIngredients = parser.parse(recipeIngredients);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_recipe_ingredients.csv', csvRecipeIngredients);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_recipe_ingredients.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()}\n\n`);
        })
})();

(() => {
    console.log("loading reviews...")
    const reviews: Array<Review> = [];
    const startTime = performance.now();
    const parser = new Parser();
    fs.createReadStream('data/RAW_interactions.csv')
        .pipe(parse({
            skipEmptyLines: true,
            escape: '\\',
            skipRecordsWithError: true,
            trim: true,
            cast: true,
            columns: true
        }))
        .on('data', (row: RAWInteractionsCSV) => {
            reviews.push({ recipeId: row.recipe_id, userId: row.user_id, rating: row.rating, date: row.date, review: row.review });
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            const csvReviews = parser.parse(reviews);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_reviews.csv', csvReviews);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_reviews.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()}\n\n`);
        })
})();