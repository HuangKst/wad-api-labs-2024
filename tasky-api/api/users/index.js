import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', async (req, res) => {
    if (req.query.action === 'register') {  //if action is 'register' then save to DB
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } catch (error) {
            // 捕获 Mongoose 抛出的错误并返回 400 状态码
            res.status(400).json({
                code: 400,
                msg: 'Bad Request. User registration failed.',
                error: error.message, // 返回错误信息，方便调试
            });
        }
    }
    else {  //Must be an authenticate then!!! Query the DB and check if there's a match
        const user = await User.findOne(req.body);
        if (!user) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' });
        }else{
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
        }
    }
});
// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});


export default router;
