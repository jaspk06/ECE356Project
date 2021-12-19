import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const RecipeController: Router = Router();

RecipeController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // query for recipes
        let result;

        var { ID, title, ingredients, time } = req.body;
        console.log(req.body);

        let query = `SELECT * FROM RECIPES`;

        var values = [ID, title, time];

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
            if(!(time === undefined)){
                query+= ` AND time < `+ time + " ";
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

        db.query( query, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(rows)
            }
        })

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
        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default RecipeController;