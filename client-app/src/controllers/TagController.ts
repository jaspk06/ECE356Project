import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const TagController: Router = Router();

TagController.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // tag details
        let { tagID } = req.body;

        tagID = parseInt(tagID);

        console.log(req.body);

        const userQuery = `SELECT * FROM Tags WHERE tagID =` + tagID;

        db.query( userQuery, function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(rows);
            }
        })
        
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// creating a tag
TagController.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        // create the tag

        let { tagID, tag } = req.body;

        tagID = parseInt(tagID);

        const userInsert = `INSERT INTO Tags (tagID, tag) VALUES(?, ?)`;

        const values = [tagID, tag];

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

export default TagController;