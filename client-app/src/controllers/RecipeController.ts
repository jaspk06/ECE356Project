import { NextFunction, Request, Response, Router } from 'express';
import { Ingredient } from 'types/ingredients';
import { Step } from 'types/step';
import { Tag } from 'types/tags';
import { db } from '../app';

const RecipeController: Router = Router();

RecipeController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // query for recipes
        let { recipeID, name, authorID, cookTime, ingredients, steps, date, description, tags, rating, page } = req.body;
        
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
        page = page * 32;

        let query = "with RecipeQuery as "
        let recipeQuery = `( SELECT * FROM Recipe `;
        recipeQuery += "WHERE recipeID LIKE '%'";

        if(recipeID && !(isNaN(recipeID)) ){
            recipeQuery+= ` AND recipeID = `+ recipeID + " ";
        }
        if(authorID && !(isNaN(authorID)) ){
            recipeQuery+= ` AND authorID = `+ authorID + ` `;
        }
        if(name ){
            recipeQuery+= ` AND name LIKE "%`+ name + `%"`;
        }
        if(cookTime){
            recipeQuery+= ` AND cookTime <= `+ cookTime + ` `;
        }

        recipeQuery += ") ";

        query += recipeQuery;
        ////////////////////////////



        if(!(ingredients === undefined) ){

            ingredientFlag = true;

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
        query += "SELECT DISTINCT recipeID, RecipeQuery.name, firstName, lastName, cookTIme, date, description, rating from  RecipeQuery ";
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

        query += "INNER JOIN Users on Users.userID = RecipeQuery.authorID";
        query+= " inner join Reviews using(recipeID) where Rating >=" +Math.min(5, rating)+ " order by Rating DESC"

        query += ` LIMIT 32 OFFSET ${page}`

               
        console.log(" query: " + query);

        db.query( query,  function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {

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

        const recipeTagsQuery = `SELECT DISTINCT tag FROM RecipeTags INNER JOIN Tags ON RecipeTags.tagID = Tags.tagID WHERE recipeID=${recipeID}`;
        recipe.tags = JSON.parse(JSON.stringify(await db.promise().query(recipeTagsQuery)))[0].map((tag: Tag) => tag.tag);

        const nutritionQuery = `SELECT * FROM RecipeNutritionInformation WHERE recipeID=${recipeID}`;
        recipe.nutrition = JSON.parse(JSON.stringify(await db.promise().query(nutritionQuery)))[0][0];

        res.status(200).json(recipe);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

RecipeController.get('/user/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.params;

        const recipeQuery = `SELECT * FROM Recipe WHERE authorID=${userID}`;
        const recipes = JSON.parse(JSON.stringify(await db.promise().query(recipeQuery)))[0];

        for (const recipe of recipes) {
            const reviewsQuery = `SELECT AVG(rating) FROM Reviews INNER JOIN Users ON Reviews.userID = Users.userID WHERE recipeID=${recipe.recipeID} ORDER BY date DESC`;
            recipe.rating = JSON.parse(JSON.stringify(await db.promise().query(reviewsQuery)))[0][0]['AVG(rating)'];

            const userQuery = `SELECT firstName,lastName FROM Users WHERE userID=${recipe.authorID}`;
            const author = JSON.parse(JSON.stringify(await db.promise().query(userQuery)))[0][0];
            recipe.authorName = author.firstName + ' ' + author.lastName;

            const directionsQuery = `SELECT * FROM RecipeDirections WHERE recipeID=${recipe.recipeID} ORDER BY step ASC`;
            recipe.directions = JSON.parse(JSON.stringify(await db.promise().query(directionsQuery)))[0].map((step: Step) => step.description);

            const recipeIngredientsQuery = `SELECT DISTINCT ingredientName FROM RecipeIngredients INNER JOIN Ingredients ON RecipeIngredients.ingredientID = Ingredients.ingredientID WHERE recipeID=${recipe.recipeID}`;
            recipe.ingredients = JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientsQuery)))[0].map((ingredient: Ingredient) => ingredient.ingredientName);

            const recipeTagsQuery = `SELECT DISTINCT tag FROM RecipeTags INNER JOIN Tags ON RecipeTags.tagID = Tags.tagID WHERE recipeID=${recipe.recipeID}`;
            recipe.tags = JSON.parse(JSON.stringify(await db.promise().query(recipeTagsQuery)))[0].map((tag: Tag) => tag.tag);

            const nutritionQuery = `SELECT * FROM RecipeNutritionInformation WHERE recipeID=${recipe.recipeID}`;
            recipe.nutrition = JSON.parse(JSON.stringify(await db.promise().query(nutritionQuery)))[0][0];
        }
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// editing a recipe - add authentication later
RecipeController.put('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipeId = parseInt(req.params.recipeId);
        // create the recipe
        const { cookTime } = req.body;
        const recipeName = req.body.recipeName.replace(/'/g, "\\'");
        const description = req.body.description.replace(/'/g, "\\'");
        const ingredients = req.body.ingredients.map((ingredient: string) => ingredient.replace(/'/g, "\\'"));
        const directions = req.body.directions.map((directions: string) => directions.replace(/'/g, "\\'"));
        const tags = req.body.tags.map((tags: string) => tags.replace(/'/g, "\\'"));

        const recipeUpdate = `UPDATE Recipe SET name='${recipeName}', cookTime=${cookTime}, description='${description}' WHERE recipeID=${recipeId}`;
        JSON.parse(JSON.stringify(await db.promise().query(recipeUpdate)))[0];

        const deleteRecipeIngredients = `DELETE FROM RecipeIngredients WHERE recipeId=${recipeId}`
        await db.promise().query(deleteRecipeIngredients);
        // insert the ingredients
        for (const ingredient of ingredients) {
            const getIngredients = `SELECT ingredientID, ingredientName FROM Ingredients WHERE ingredientName='${ingredient}'`

            const rows: Array<{ ingredientID: number, ingredientName: string }> = JSON.parse(JSON.stringify(await db.promise().query(getIngredients)))[0];

            if (rows.length === 0) {
                //create ingredient
                const ingredientInsert = `INSERT INTO Ingredients (ingredientName) VALUES(?)`;
                const ingredientID = JSON.parse(JSON.stringify(await db.promise().query(ingredientInsert, [ingredient])))[0].insertId;

                const recipeIngredientInsert = `INSERT INTO RecipeIngredients (recipeID, ingredientID) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientInsert, [recipeId, ingredientID])))[0];
            } else {
                const recipeIngredientInsert = `INSERT INTO RecipeIngredients (recipeID, ingredientID) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeIngredientInsert, [recipeId, rows[0].ingredientID])));
            }
        }

        const deleteRecipeDirections = `DELETE FROM RecipeDirections WHERE recipeId=${recipeId}`
        await db.promise().query(deleteRecipeDirections);
        const stepInsert = `INSERT INTO RecipeDirections (recipeID, step, description ) VALUES(?, ?, ?)`;
        // insert the directions
        directions.forEach((step: string, i: number) => {
            db.query(stepInsert, [recipeId, i, step], function (err, rows, fields) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    console.log(rows)
                }
            })
        })

        const deleteRecipeTags = `DELETE FROM RecipeTags WHERE recipeId=${recipeId}`
        await db.promise().query(deleteRecipeTags);
        for (const tag of tags) {
            const getTags = `SELECT * FROM Tags WHERE tag='${tag}'`

            const rows: Array<{ tagID: number, tag: string }> = JSON.parse(JSON.stringify(await db.promise().query(getTags)))[0];

            if (rows.length === 0) {
                //create tag
                const tagInsert = `INSERT INTO Tags ( tag ) VALUES(?)`;
                const tagID = JSON.parse(JSON.stringify(await db.promise().query(tagInsert, [tag])))[0].insertId;

                const recipeTagInsert = `INSERT INTO RecipeTags ( recipeID, tagID ) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeTagInsert, [recipeId, tagID])));
            } else {
                const recipeTagInsert = `INSERT INTO RecipeTags ( recipeID, tagID ) VALUES(?,?)`;
                JSON.parse(JSON.stringify(await db.promise().query(recipeTagInsert, [recipeId, rows[0].tagID])));
            }
        }

        res.status(200).json("success");
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
        const { recipeName, cookTime, ingredients, directions, description, tags, nutrition } = req.body;

        const recipeInsert = `INSERT INTO Recipe (name, authorID, cookTime, date, description ) VALUES(?, ?, ?, ?, ?)`;

        const recipeID = JSON.parse(JSON.stringify(await db.promise().query(recipeInsert, [recipeName, userId, cookTime, date, description])))[0].insertId;

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
        // insert the directions
        directions.forEach((step: string, i: number) => {
            db.query(stepInsert, [recipeID, i, step], function (err, rows, fields) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    console.log(rows)
                }
            })
        })
        const nutritionInsert = `INSERT INTO RecipeNutritionInformation (recipeID, calories, totalFat, sugar, sodium, protien, saturatedFat ) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        // insert the directions
        db.query(nutritionInsert, [recipeID, nutrition.calories, nutrition.totalFat, nutrition.sugar, nutrition.sodium, nutrition.protein, nutrition.saturatedFat], function (err, rows, fields) {
            if (err) {
                res.status(500).json(err);
            } else {
                console.log(rows)
            }
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

        res.status(201).json(recipeID);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

RecipeController.delete('/:recipeID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeID } = req.params;

        const recipeDelete = `DELETE FROM Recipe where recipeID = ` + recipeID;
        console.log(recipeDelete);
        db.query(recipeDelete, function (err, rows, fields) {
            if (err) {
                console.error(err)
                res.status(500).json(err);
            } else {
                console.log(rows)
                res.status(200).json("success");
            }
        })
    } catch (err) {
        console.error(err);
    }
});

export default RecipeController;