import { NextFunction, Request, Response, Router } from 'express';
import { Ingredient } from 'types/ingredients';
import { Step } from 'types/step';
import { db } from '../app';

const RecipeController: Router = Router();

RecipeController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // query for recipes
        let result;

        let { recipeID, name, authorID, cookTime, ingredients, steps, date, description, tags, rating, page } = req.body;
        console.log(req.body);
        
        let ingredientFlag = false;
        let tagFlag = false;
        let ingredientCount = 1;
        let tagCount = 1;

        /////////////////////////////////
        authorID = parseInt(authorID);
        recipeID = parseInt(recipeID);
        rating = parseInt(rating);

        if((rating === undefined) || (isNaN(rating)) ){
            rating = 0;
        }
        if ((page === undefined) || (isNaN(page))) {
            page = 0;
        }
        page = page * 25;

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
            recipeQuery+= ` AND cookTime <= `+ cookTime + ` `;
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
/////////////////////////////////


            tagFlag = true;

            let firstFlag = true;
            
            let tagQuery= "";

            for(const tag in tags){

                tagQuery += `, Tag`+ tagCount+` as ( WITH TagQuery AS (SELECT * FROM Tags `;
                
             
    
                
                tagQuery += "WHERE ";
                tagQuery += ` tag LIKE '%` +tags[tag]+`%'), `;
                tagQuery += "RecipeWithTag as (select * from RecipeTags where tagID in (select tagID from TagQuery)) select distinct recipeID, name from  TagQuery inner join RecipeWithTag using(tagID) inner join Recipe using(recipeID))"
                

      
                tagCount+=1;
            }


            query += tagQuery;

        }
        /////////////////////////////
        // ratings

        query+= ", Reviews AS (Select recipeID, avg(rating) as Rating from Reviews where recipeID in (select recipeID from RecipeQuery) GROUP BY recipeID)"
        /////////////////////////////
        query += "select distinct * from  RecipeQuery ";
        if(ingredientFlag){
            for(let i = 1; i < ingredientCount;i++){
                query+= " inner join Ingredient"+(i)+" using(recipeID)";
            }
            
        }
        if(tagFlag){
            for(let i = 1; i < tagCount;i++){
                query+= " inner join Tag"+(i)+" using(recipeID)";
            }
        }

        query+= " inner join Reviews using(recipeID) where Rating >=" +Math.min(5, rating)

        query += ` LIMIT 25 OFFSET ${page}`
               
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


RecipeController.get('/:recipeID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeID } = req.params;

        const recipeQuery = `SELECT * FROM Recipe WHERE recipeID=${recipeID}`;
        const ret = JSON.parse(JSON.stringify(await db.promise().query(recipeQuery)))[0];

        if (ret.length === 0)
            res.status(404).send("Recipe does not exist");

        const recipe = ret[0];

        const reviewsQuery = `SELECT review,date,rating,firstName,lastName, Reviews.userID FROM Reviews INNER JOIN Users ON Reviews.userID = Users.userID WHERE recipeID=${recipeID} ORDER BY date DESC`;
        recipe.reviews = JSON.parse(JSON.stringify(await db.promise().query(reviewsQuery)))[0];

        const userQuery = `SELECT firstName,lastName FROM Users WHERE userID=${recipe.authorID}`;
        const author = JSON.parse(JSON.stringify(await db.promise().query(userQuery)))[0][0];
        recipe.authorName = author.firstName + ' ' + author.lastName;

        const directionsQuery = `SELECT * FROM RecipeDirections WHERE recipeID=${recipeID} ORDER BY step ASC`;
        recipe.directions = JSON.parse(JSON.stringify(await db.promise().query(directionsQuery)))[0].map((step: Step) => step.description);

        const recipeIngredientsQuery = `SELECT DISTINCT ingredientName FROM RecipeIngredients INNER JOIN Ingredients ON RecipeIngredients.ingredientID = Ingredients.ingredientID WHERE recipeID=${recipeID}`;
        recipe.ingredients = JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientsQuery)))[0].map((ingredient: Ingredient) => ingredient.ingredientName);

        const nutritionQuery = `SELECT * FROM RecipeNutritionInformation WHERE recipeID=${recipeID}`;
        recipe.nutrition = JSON.parse(JSON.stringify(await db.promise().query(nutritionQuery)))[0][0];

        res.status(200).json(recipe);
    } catch (error) {
        console.error(error)
        next(error);
    }
});


// creating a recipe - add authentication later
RecipeController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const date = new Date().toISOString().split('T')[0]
        // create the recipe
        const { name, cookTime, ingredients, steps, description, tags } = req.body;

        const recipeInsert = `INSERT INTO Recipe (name, authorID, cookTime, date, description ) VALUES(?, ?, ?, ?, ?)`;

        const recipeID = JSON.parse(JSON.stringify(await db.promise().query(recipeInsert, [name, userId, cookTime, date, description])))[0].insertId;

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

        const stepInsert = `INSERT INTO RecipeDirections (recipeID, step, description ) VALUES(?, ?, ?)`;
        // insert the steps
        steps.forEach((step: string, i: number) => {
            db.query(stepInsert, [recipeID, i, step], function (err, rows, fields) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    console.log(rows)
                }
            })
        })

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