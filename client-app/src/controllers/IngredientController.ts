import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const IngredientController: Router = Router();

IngredientController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // query for user
        let result;

        res.status(200).json(result);
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