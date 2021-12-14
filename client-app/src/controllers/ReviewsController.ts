import { NextFunction, Request, Response, Router } from 'express';
import { db } from 'app';

const ReviewsController: Router = Router();

ReviewsController.get('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeId } = req.params;

        // query for review
        let result;

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// creating a recipe - add authentication later
ReviewsController.post('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeId } = req.params;
        // create the recipe
        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default ReviewsController;