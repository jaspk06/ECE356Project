import { NextFunction, Request, Response, Router } from 'express';
import { db } from '../app';

const TagController: Router = Router();

TagController.get('/:tagId?', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tagId } = req.params;

        let userQuery = 'SELECT tag FROM Tags';
        if (tagId) userQuery += 'WHERE tagID =' + tagId;

        const tags = JSON.parse(JSON.stringify(await db.promise().query(userQuery)))[0].map((tag: { tag: string }) => tag.tag);
        res.status(200).json(tags);
    } catch (err) {
        console.error(err);
        next(err);
    }
});



// creating a tag
TagController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // create the tag

        let { tagID, tag } = req.body;

        tagID = parseInt(tagID);

        const userInsert = `INSERT INTO Tags (tagID, tag) VALUES(?, ?)`;

        const values = [tagID, tag];

        db.query(userInsert, values, function (err, rows, fields) {
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