import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const IngredientController: Router = Router();

IngredientController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // create the ingredient

        var result;

        var { ingredientID, ingredientName, aliasID } = req.body;

        aliasID = parseInt(aliasID);

        console.log(req.body);

        var ingredientQuery = `SELECT * FROM Ingredients`;
        ingredientQuery += ` WHERE ingredientName LIKE '%' `
        var values = [ingredientName, aliasID];

        if(!(ingredientID === undefined)){
            ingredientQuery+= ` AND ingredientID = `+ ingredientID + " ";
        }
        if(!(ingredientName === undefined)){
            ingredientQuery+= ` AND ingredientName = '`+ ingredientName + "' ";
        }
        if(!(aliasID === undefined)){
            ingredientQuery+= ` AND aliasID = `+ aliasID + " ";
        }

        var returnRes;
        db.query( ingredientQuery, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                
                result = rows;
                returnRes = {
                    'nestedarray' : result
                };
                res.status(200).json(rows);
            }
        })
        console.log(returnRes);
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// creating an ingredient
IngredientController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        // create the recipe

        let result;

        var { ingredientName, aliasID } = req.body;

        aliasID = parseInt(aliasID);

        console.log(req.body);

        let ingredientInsert = `INSERT INTO Ingredients (ingredientName, aliasID ) VALUES(?, ?)`;

        var values = [ingredientName, aliasID];

        db.query( ingredientInsert, values, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                console.log(rows)
            }
        })
        
        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default IngredientController;