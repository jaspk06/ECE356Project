import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const RecipeController: Router = Router();

RecipeController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // query for recipes
        let result;

        let { recipeID, name, authorID, cookTime, ingredients, steps, date, description, tags } = req.body;
        console.log(req.body);
        
        /////////////////////////////////
        authorID = parseInt(authorID);
        recipeID = parseInt(recipeID);

        let query = "with RecipeQuery as "
        let recipeQuery = `( SELECT * FROM RECIPES`;
        recipeQuery += "WHERE recipeID LIKE '%'";

        if(!(recipeID === undefined) && !(isNaN(recipeID)) ){
            recipeQuery+= ` AND recipeID = `+ recipeID + " ";
        }
        if(!(authorID === undefined) && !(isNaN(authorID)) ){
            recipeQuery+= ` AND authorID = `+ authorID + ` `;
        }
        if(!(name === undefined) ){
            recipeQuery+= ` AND name LIKE " `+ name + ` "`;
        }
        if(!(cookTime === undefined) ){
            recipeQuery+= ` AND cookTime < `+ cookTime + ` `;
        }

        recipeQuery += "), ";


        ////////////////////////////

        let ingredientsQuery = `( SELECT * FROM ingredients`;
        ingredientsQuery += "WHERE ingredientName LIKE '%'";


        for(const ingredient in ingredients){
            ingredientsQuery+= ` AND ingredientName LIKE '%` +ingredients[ingredient]+`%' `;
        }
       
        ingredientsQuery += ")";
        /////////////////////////////////

        if(! (Object.keys(req.body).length === 0)){
            query += ` WHERE ingredients LIKE '%' `;
            var ingredientQuery = "";

        
            for(let ingredient in ingredients){
                ingredientQuery+= ` AND ingredients LIKE '%` +ingredients[ingredient]+`%' `;
            }
            query+= ingredientQuery;
            
            if(!(ID === undefined)){
                query+= ` AND ID = `+ ID + " ";
            }
            if(!(cookTime === undefined)){
                query+= ` AND cookTime < `+ cookTime + " ";
            }
            if(!(title === undefined)){
                query+= ` AND title = '`+ title + "' ";
            }

            for(let value in values){
                if(values[value] == "" ||  values[value] ===undefined || values[value]  == "NULL"){
                    values[value]  = "*";
                }
                console.log(" value: " + values[value] );
            }
        }

        
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
        // create the recipe

        let result;

        var { ID, name, authorID, cookTime, ingredients, steps, date, description, tags } = req.body;

        ID = parseInt(ID);

        console.log(req.body);

        let recipeInsert = `INSERT INTO recipes (ID, name, authorID, cookTime, date, description ) VALUES(?, ?, ?, ?, ?, ?)`;

        var values = [ID, name, authorID, cookTime, date, description];

        db.query( recipeInsert, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(rows)
            }
        })
        
        console.log(" query: " + recipeInsert);

        // insert the ingredients

        for(let ingredient in ingredients){
            let ingredientInsert = `INSERT INTO RecipeIngredients (ID, ingredientID ) VALUES(?, ?)`;

            values = [ID, ingredients[ingredient]];
            console.log(values);
            db.query( ingredientInsert, values, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows)
                }
            })
            
        }

        var stepCounter = 0 // steps

        // insert the steps

        for(let step in steps){
            let stepInsert = `INSERT INTO RecipeDirections (ID, step, des ) VALUES(?, ?, ?)`;

            values = [ID, stepCounter, steps[step]];
            stepCounter+=1;

            console.log(values);
            db.query( stepInsert, values, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows)
                }
            })
            
        }

        for(let tag in tags){
            let tagInsert = `INSERT INTO RecipeTags (ID, tag ) VALUES(?, ?)`;

            values = [ID, tags[tag]];

            console.log(values);
            db.query( tagInsert, values, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows)
                }
            })
            
        }
        
        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default RecipeController;