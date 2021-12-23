import { NextFunction, Request, Response, Router } from 'express';
import { validateEmail } from '../utils';
import { db } from '../app';

const UserController: Router = Router();

UserController.get('/:userID/:localID?', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = parseInt(req.params.userID);
        const localID = parseInt(req.params.localID);

        const userQuery = `SELECT * FROM Users WHERE userID = ${userID}`;
        const user = JSON.parse(JSON.stringify(await db.promise().query(userQuery)))[0];

        if (localID) {
            const query = `SELECT * FROM UserFollowing WHERE userID=${localID} AND followingUserID=${userID}`
            user[0].following = JSON.parse(JSON.stringify(await db.promise().query(query)))[0].length > 0;
        }
        res.status(200).json(user);
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

// Follow another user
UserController.post('/follow/:userID/:followingUserID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, followingUserID } = req.params;

        const userFollow = `INSERT INTO UserFollowing (userID, followingUserID ) VALUES(?, ?)`;

        db.query(userFollow, [userID, followingUserID], function (err, rows, fields) {
            if (err) {
                console.error(err)
                res.status(500).json(err);
            } else {
                res.status(200).send("success");
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// unfollow
UserController.delete('/follow/:userID/:followingUserID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID, followingUserID } = req.params;

        const userUnFollow = `DELETE FROM UserFollowing WHERE userID=${userID} AND followingUserID=${followingUserID}`;

        db.query(userUnFollow, [userID, followingUserID], function (err, rows, fields) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).send("success");
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// edit a user
UserController.put('/:userID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.params;
        const { firstName, lastName, email, phoneNumber, gender } = req.body;

        const userInsert = `UPDATE Users SET firstName='${firstName}', lastName='${lastName}', email='${email}', phoneNumber='${phoneNumber}', gender='${gender}' WHERE userID=${userID}`;

        const birthday = new Date(req.body.birthday).toISOString().split('T')[0];
        const dateJoined = new Date().toISOString().split('T')[0];

        if (!validateEmail(email)) res.status(400).send('Illegal email');

        db.query(userInsert, [firstName, lastName, email, phoneNumber, gender, birthday, dateJoined], function (err, rows, fields) {
            if (err) {
                console.error(err)
                res.status(500).json(err);
            } else {
                // @ts-ignore
                res.status(200).send("Success");
            }
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});


export default UserController;