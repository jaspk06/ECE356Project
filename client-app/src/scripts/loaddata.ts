import mysql from 'mysql2';
import { parse } from 'csv-parse';
import fs from 'fs';
import * as dotenv from "dotenv";
import { Recipe } from 'types/recipes';
import { RecipeIngredients } from 'types/recipeIngredients';

dotenv.config();

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

const measurements = new Set(['tablespoon','teaspoon','cup','ounce','pound','pinch'])

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

fs.createReadStream('data/recipes.csv')
    .pipe(parse({
        delimiter: ';',
        skipEmptyLines: true,
        escape: '\\',
        skipRecordsWithError: true,
        trim: true,
        cast: true,
        columns: true
    }))
    .on('data', (row: RecipeCSV) => {
        // console.log(row.Ingredients);
        let recipeIngredients: RecipeIngredients;

        const ingredients = row.Ingredients.split("**").map(ingredient => {
            console.log(ingredient.replace("'", ''));
        });
    })
    .on('end', function () {
        console.log("end");
        // TODO: SAVE users data to another file
    })