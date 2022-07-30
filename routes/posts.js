const express = require('express');
const mongoose = require("mongoose");

const {Post, validate} = require('../models/post');
const auth = require('../middlewares/auth');


const router = express.Router();

router.get('/', async (req, res) => {
    const post = await Post.find().sort({createAt: 1}).setOptions({ allowDiskUse: true }).exec();
    res.send(post);
});

router.post('/', [auth], async (req, res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = new Post({
        userId: req.body.userId,
        header: req.body.header,
        text: req.body.text,
        createAt: Date(),
        mediaUrl: req.body.mediaUrl.map(m => m),
    });

    await post.save();
    res.send(post);
});

router.put('/:id', [auth], async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const list = Object.keys(req.body);
    let post = {};
    list.map(l => {
        if (l === 'edit' || l === 'mediaUrl')
            post[l] = req.body[l].map(e => e);
        else
            post[l] = req.body[l];
    });

    await Post.findByIdAndUpdate(
        req.params.id,
        post,
        {new: true, upsert: true}
    );

    res.send(post);
});

router.delete('/:id', [auth], async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send('Not found');
    res.send(post);
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Not found');
    const [post] = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Not found');

    res.send(post);
});

module.exports = router;



