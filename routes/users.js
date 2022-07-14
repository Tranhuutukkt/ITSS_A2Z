const express = require('express');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {User, validate, userSchema} = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['email', 'password', 'name', 'role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res
        .header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(_.pick(user, ['_id', 'email']));
});

router.put('/me', async (req, res) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const data = await User.findOne({email: req.body.email});
    let user = {};
    if (!data) return res.status(404).send('User not found!');

    const list = ['name', 'class', 'avatarUrl', 'coverUrl', 'faculty', 'studentCode'];
    list.map((l) => {
        if (!userSchema.path(l)) userSchema.add({[l]: String});
        if (!req.body[l])
            user[l] = data[l];
        user[l] = req.body[l];
    });

    await User.findOneAndUpdate(
        {email: req.body.email},
        user,
        {new: true, upsert: true}
    );

    console.log(user);
    res.send(user);
})

module.exports = router;