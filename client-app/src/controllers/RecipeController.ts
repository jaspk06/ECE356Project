import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const RecipeController: Router = Router();

RecipeController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // query for recipes
        let result;

        const { ID, name, authorID, cookTime, ingredients, steps, date, description, tags } = req.body;
        console.log(req.body);

        const query = `SELECT * FROM RECIPES`;

        // var values = [ID, title, time];

        // if(! (Object.keys(req.body).length === 0)){
        //     query += ` WHERE ingredients LIKE '%' `;
        //     var ingredientQuery = "";


        //     for(let ingredient in ingredients){
        //         ingredientQuery+= ` AND ingredients LIKE '%` +ingredients[ingredient]+`%' `;
        //     }
        //     query+= ingredientQuery;

        //     if(!(ID === undefined)){
        //         query+= ` AND ID = `+ ID + " ";
        //     }
        //     if(!(time === undefined)){
        //         query+= ` AND time < `+ time + " ";
        //     }
        //     if(!(title === undefined)){
        //         query+= ` AND title = '`+ title + "' ";
        //     }

        //     for(let value in values){
        //         if(values[value] == "" ||  values[value] ===undefined || values[value]  == "NULL"){
        //             values[value]  = "*";
        //         }
        //         console.log(" value: " + values[value] );
        //     }
        // }


        console.log(" query: " + query);

        // db.query( query, values, function (err, rows, fields) {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log(rows)
        //     }
        // })

        res.status(200).json(result);
    } catch (err) {
        console.error(err);


        next(err);
    }
});



// creating a recipe - add authentication later
RecipeController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const date = new Date().toISOString().split('T')[0]
        // create the recipe
        const { name, cookTime, ingredients, steps, description, tags } = req.body;

        console.log(req.body);

        const recipeInsert = `INSERT INTO Recipe (name, authorID, cookTime, date, description ) VALUES(?, ?, ?, ?, ?)`;

        let values = [name, userId, cookTime, date, description];

        const recipeID = JSON.parse(JSON.stringify(await db.promise().query(recipeInsert, values)))[0].insertId;

        console.log(" query: " + recipeInsert);

        // insert the ingredients

        for (const ingredient of ingredients) {
            const getIngredients = `SELECT ingredientID, ingredientName FROM Ingredients WHERE ingredientName='${ingredient}'`

            const rows: Array<{ ingredientID: number, ingredientName: string }> = JSON.parse(JSON.stringify(await db.promise().query(getIngredients)))[0];

            if (rows.length === 0) {
                //create ingredient
                const ingredientInsert = `INSERT INTO Ingredients (ingredientName) VALUES(?)`;
                const ingredientID = JSON.parse(JSON.stringify(await db.promise().query(ingredientInsert, [ingredient])))[0].insertId;

                const recipeIngredientInsert = `INSERT INTO RecipeIngredients (recipeID, ingredientID) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientInsert, [recipeID, ingredientID])))[0];
            } else {
                const recipeIngredientInsert = `INSERT INTO RecipeIngredients (recipeID, ingredientID) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientInsert, [recipeID, rows[0].ingredientID])));
            }
        }

        let stepCounter = 0 // steps

        // insert the steps

        for (const step of steps) {
            const stepInsert = `INSERT INTO RecipeDirections (recipeID, step, description ) VALUES(?, ?, ?)`;

            values = [recipeID, stepCounter, step];
            stepCounter += 1;

            console.log(values);
            db.query(stepInsert, values, function (err, rows, fields) {
                if (err) {
                    console.error(err)
                } else {
                    console.log(rows)
                }
            })

        }

        for (const tag of tags) {
            const getTags = `SELECT * FROM Tags WHERE tag='${tag}'`

            const rows: Array<{ tagID: number, tag: string }> = JSON.parse(JSON.stringify(await db.promise().query(getTags)))[0];

            if (rows.length === 0) {
                //create tag
                const tagInsert = `INSERT INTO Tags ( tag ) VALUES(?)`;
                const tagID = JSON.parse(JSON.stringify(await db.promise().query(tagInsert, [tag])))[0].insertId;

                const recipeTagInsert = `INSERT INTO RecipeTags ( recipeID, tagID ) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeTagInsert, [recipeID, tagID])));
            } else {
                const recipeTagInsert = `INSERT INTO RecipeTags ( recipeID, tagID ) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeTagInsert, [recipeID, rows[0].tagID])));
            }
        }

        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default RecipeController;