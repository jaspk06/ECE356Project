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
        
        let ingredientFlag = false;
        let tagFlag = false;
        let ingredientCount = 1;
        let tagCount = 1;

        /////////////////////////////////
        authorID = parseInt(authorID);
        recipeID = parseInt(recipeID);

        let query = "with RecipeQuery as "
        let recipeQuery = `( SELECT * FROM Recipe `;
        recipeQuery += "WHERE recipeID LIKE '%'";

        if(!(recipeID === undefined) && !(isNaN(recipeID)) ){
            recipeQuery+= ` AND recipeID = `+ recipeID + " ";
        }
        if(!(authorID === undefined) && !(isNaN(authorID)) ){
            recipeQuery+= ` AND authorID = `+ authorID + ` `;
        }
        if(!(name === undefined) ){
            recipeQuery+= ` AND name LIKE "%`+ name + `%"`;
        }
        if(!(cookTime === undefined) ){
            recipeQuery+= ` AND cookTime < `+ cookTime + ` `;
        }

        recipeQuery += ") ";

        query += recipeQuery;
        ////////////////////////////



        if(!(ingredients === undefined) ){

            ingredientFlag = true;

            let firstFlag = true;
            
            let ingredientsQuery= "";

            for(const ingredient in ingredients){

                ingredientsQuery += `, Ingredient`+ ingredientCount+` as ( WITH IngredientQuery AS (SELECT * FROM Ingredients `;
                
             
    
                
                ingredientsQuery += "WHERE ";
                ingredientsQuery += ` ingredientName LIKE '%` +ingredients[ingredient]+`%'), `;
                ingredientsQuery += "RecipeWithIngredients as (select * from RecipeIngredients where ingredientID in (select ingredientID from IngredientQuery)) select distinct recipeID, name from  RecipeQuery inner join RecipeWithIngredients using(recipeID))"
                

      
                ingredientCount+=1;
            }


            query += ingredientsQuery;

        }
        /////////////////////////////////

        

        /////////////////////////////////

        if(!(tags === undefined) ){

            tagFlag = true;
            let firstFlag = true;

            let tagQuery = `, TagQuery as ( SELECT * FROM Tags `;
            tagQuery += "WHERE ";


            for(const tag in tags){
                if(firstFlag){
                    firstFlag = false;
                    tagQuery+= ` tag LIKE '%` +tags[tag]+`%' `;
                } else {
                    tagQuery+= ` and tag LIKE '%` +tags[tag]+`%' `;
                }
            }

            tagQuery += ")";

            query += tagQuery;
            const RecipeWithTag = ', RecipeWithTags as (select * from RecipeTags where tagID in (select tagID from TagQuery)) '
            query += RecipeWithTag;
        }

        /////////////////////////////
        query += "select distinct recipeID, RecipeQuery.name from  RecipeQuery ";
        if(ingredientFlag){
            for(let i = 1; i < ingredientCount;i++){
                query+= " inner join Ingredient"+(i)+" using(recipeID)";
            }
            
        }
        if(tagFlag){
            query+= "inner join RecipeWithTags using(recipeID)";
        }

               
        console.log(" query: " + query);

        db.query( query,  function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(rows)
                res.status(200).json(rows);
            }
        })

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