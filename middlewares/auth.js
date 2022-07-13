const jwt = require('jsonwebtoken');

function auth(req, res, next){
    if (!process.env.AUTH) return next();

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided!');

    try{
        const decoded = jwt.verify(token, process.env.JWTKEY);
        req.user =  decoded;

        next();
    }
    catch (ex){
        res.status(400).send(ex.message);
    }
}

module.exports = auth;