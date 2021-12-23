import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const IngredientController: Router = Router();

IngredientController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = 'SELECT ingredientName FROM Ingredients';

        const ingredients = JSON.parse(JSON.stringify(await db.promise().query(query)))[0].map((ingredient: { ingredientName: string }) => ingredient.ingredientName);
        res.status(200).json(ingredients);
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

        db.query(ingredientInsert, values, function (err, rows, fields) {
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