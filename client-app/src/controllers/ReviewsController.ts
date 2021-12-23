import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const ReviewsController: Router = Router();

ReviewsController.get('/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeId } = req.params;

        let { reviewID, recipeID, userID, rating } = req.body;

        reviewID = parseInt(reviewID);
        recipeID = parseInt(recipeID);
        userID = parseInt(userID);

        let userQuery = `SELECT review FROM Reviews`;
        userQuery += ` WHERE userID LIKE '%' `

        if (!(userID === undefined) && !(isNaN(userID))) {
            userQuery += ` AND userID = ` + userID + " ";
        }
        if (!(reviewID === undefined) && !(isNaN(reviewID))) {
            userQuery += ` AND reviewID = ` + reviewID + ` `;
        }
        if (!(recipeID === undefined) && !(isNaN(recipeID))) {
            userQuery += ` AND recipeID = ` + recipeID + ` `;
        }
        if (!(rating === undefined)) {
            userQuery += ` AND rating > ` + rating + ` `;
        }

        let returnRes;
        db.query(userQuery, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(rows);
            }
        })
        console.log(returnRes);

    } catch (err) {
        console.error(err);
        next(err);
    }
});

ReviewsController.get('/user/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.params;

        const query = `SELECT Reviews.*, Recipe.name FROM Reviews INNER JOIN Recipe ON Reviews.recipeID = Recipe.recipeID WHERE userID=${userID}`;

        const reviews = JSON.parse(JSON.stringify(await db.promise().query(query)));

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// creating a review
ReviewsController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeID, userID, rating, review } = req.body; // date ends up being a datetime.now() 
        const date = new Date().toISOString().split('T')[0];

        const userInsert = `INSERT INTO Reviews (recipeID, userID, rating, date, review) VALUES( ?, ?, ?, ?, ?)`;
        const values = [recipeID, userID, rating, date, review];

        db.query(userInsert, values, function (err, rows, fields) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json("success");
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// editing a review
ReviewsController.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeID, userID, rating, review } = req.body; // date ends up being a datetime.now() 

        const date = new Date().toISOString().split('T')[0];

        const reviewUpdate = `UPDATE Reviews SET rating=${rating}, date='${date}', review='${review + " (Edited)"}' WHERE recipeID = ${recipeID} AND userID=${userID}`;

        db.query(reviewUpdate, function (err, rows, fields) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json("success");
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

ReviewsController.delete('/:recipeID/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { recipeID, userID } = req.params;

        const reviewDelete = `DELETE FROM Reviews where recipeID = ` + recipeID + ` AND userID = ` + userID;
        console.log(reviewDelete);
        db.query(reviewDelete, function (err, rows, fields) {
            if (err) {
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

export default ReviewsController;