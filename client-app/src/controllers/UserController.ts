import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const UserController: Router = Router();

UserController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // user details
        var { userID, firstname, lastname } = req.body;

        userID = parseInt(userID);

        console.log(req.body);

        var userQuery = `SELECT * FROM Users`;
        userQuery += ` WHERE userID LIKE '%' `
        var values = [ userID, firstname, lastname];

        userID = parseInt(userID);

        if(!(userID === undefined) && !(isNaN(userID)) ){
            userQuery+= ` AND userID = `+ userID + " ";
        }
        if(!(firstname === undefined)){
            userQuery+= ` AND firstname = '`+ firstname + `' `;
        }
        if(!(lastname === undefined) ){
            userQuery+= ` AND lastname = '`+ lastname + `' `;
        }

        var returnRes;
        db.query( userQuery, function (err, rows, fields) {
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



// creating a user
UserController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        // create the user

        let result;

        var { firstName, lastName, email, phoneNumber, gender, birthday, dateJoined } = req.body;

        console.log(req.body);

        let userInsert = `INSERT INTO Users (firstName, lastName, email, phoneNumber, gender, birthday, dateJoined ) VALUES(?, ?, ?, ?, ?, ?, ?)`;

        var values = [firstName, lastName, email, phoneNumber, gender, birthday, dateJoined];

        db.query( userInsert, values, function (err, rows, fields) {
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

export default UserController;