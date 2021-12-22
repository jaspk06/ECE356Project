import { NextFunction, Request, Response, Router } from 'express';
import { validateEmail } from '../utils';
import { db } from '../app';

const UserController: Router = Router();

UserController.get('/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = parseInt(req.params.userID);

        const userQuery = `SELECT * FROM Users WHERE userID = ${userID}`;
        db.query(userQuery, function (err, rows, fields) {
            if (err) {
                res.json(500).json(err);
            } else {
                res.status(200).json(rows);
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// creating a user
UserController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, phoneNumber, gender } = req.body;

        const userInsert = `INSERT INTO Users (firstName, lastName, email, phoneNumber, gender, birthday, dateJoined ) VALUES(?, ?, ?, ?, ?, ?, ?)`;

        const birthday = new Date(req.body.birthday).toISOString().split('T')[0];
        const dateJoined = new Date().toISOString().split('T')[0];

        if (!validateEmail(email)) res.status(400).send('Illegal email');

        db.query(userInsert, [firstName, lastName, email, phoneNumber, gender, birthday, dateJoined], function (err, rows, fields) {
            if (err) {
                res.status(500).json(err);
            } else {
                // @ts-ignore
                res.status(201).json({ userID: rows.insertId });
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

export default UserController;