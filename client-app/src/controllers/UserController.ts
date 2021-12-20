import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const UserController: Router = Router();

UserController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
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



// creating a user
UserController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        // create the recipe
        res.status(200).json("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default UserController;