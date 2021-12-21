import { parse } from 'csv-parse';
import fs from 'fs';
import { Recipe } from 'types/recipes';
import { Parser } from 'json2csv';
import { RecipeIngredients } from 'types/recipeIngredients';
import { Ingredient, IngredientAlias } from 'types/ingredients';
import { User } from 'types/user';
import faker, { date, fake } from 'faker';
import { Tag } from 'types/tags';


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
    name_tokens: Array<number>,
    ingredient_tokens: Array<number>,
    steps_tokens: Array<number>,
    techniques: Array<number>,
    calorie_level: number,
    ingredient_ids: Array<number>
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
    nutrition: Array<number>,
    n_steps: number,
    steps: Array<string>,
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

const json2csvParser = new Parser();

(() => {
    console.log("loading ingredients...")
    const ingredients: Array<Ingredient> = [];
    const ingredientAliases: Array<IngredientAlias> = [];
    let count = 0;
    const startTime = performance.now();
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
            const alias = ingredientAliases.find(alias => alias.aliasName === row.replaced)
            if (!alias) {
                ingredientAliases.push({ aliasId: count, aliasName: row.replaced })
                ingredients.push({ ingredientId: row.id, aliasId: count, ingredientName: row.raw_ingr });
                count++;
            } else {
                ingredients.push({ ingredientId: row.id, aliasId: alias.aliasId, ingredientName: row.raw_ingr });
            }
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            ingredients.sort((a, b) => a.ingredientId - b.ingredientId);
            const csvIngredients = json2csvParser.parse(ingredients);
            const csvAlias = json2csvParser.parse(ingredientAliases);

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
            users.push({ userId: row.u, firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), phoneNumber: faker.phone.phoneNumber(), gender: faker.name.gender(), birthday: faker.date.between(1950, new Date().getFullYear() - 12), dateJoined: faker.date.between(2000, new Date()), passwordHash: "123456" })
        })
        .on('end', async () => {
            console.log("Parsing objects...")
            const csvUsers = json2csvParser.parse(users);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSED_users.csv', csvUsers);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/PARSED_users.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()}\n\n`);
        })
})();

const recipes: Array<Recipe> = [];
const tags: Array<Tag> = [];
const recipeTags: Array<{ recipeId: number, tagId: number }> = [];
(() => {
    console.log("loading recipes...")
    let count = 0;
    const startTime = performance.now();
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
            // console.log(row.tags.split('\'').join('"'));
            const parsedTags = JSON.parse(row.tags.split('\'').join('"'));
            parsedTags.forEach((rowTag: string) => {
                const findTag = tags.find(tag => tag.tag === rowTag);
                if (!findTag) {
                    tags.push({ tagId: count, tag: rowTag });
                    recipeTags.push({ recipeId: row.id, tagId: count });
                    count++;
                } else {
                    recipeTags.push({ recipeId: row.id, tagId: findTag.tagId });
                }
            })
            recipes.push({ recipeId: row.id, name: row.name, authorID: row.contributor_id, cookTime: row.minutes, date: row.submitted, description: row.description })
        })
        .on('end', async () => {
            // ingredients.sort((a, b) => a.ingredientId - b.ingredientId);
            console.log("Parsing objects...")
            const csvRecipes = json2csvParser.parse(recipes);
            const csvRecipeTags = json2csvParser.parse(recipeTags);
            const csvTags = json2csvParser.parse(tags);

            console.log("Parsed objects. Writing to csv files...")
            fs.writeFileSync('data/PARSE_recipes.csv', csvRecipes);
            fs.writeFileSync('data/PARSE_recipe_tags.csv', csvRecipeTags);
            fs.writeFileSync('data/PARSE_tags.csv', csvTags);
            const perf = new Date(performance.now() - startTime);

            console.log("written to data/RAW_recipes.csv, data/PARSE_tags.csv, data/PARSE_recipe_tags.csv");
            console.log(`took ${perf.getMinutes()}:${perf.getSeconds()} \n\n`);
        })
})();

