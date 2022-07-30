module.exports = function (req, res, next){
    if (!process.env.AUTH)
        return next();

    if (req.user.role !== 'admin') return res.status(403).send('Access denied!');
    next();
}