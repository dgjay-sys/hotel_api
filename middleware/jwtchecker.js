
const jwt = require('jsonwebtoken');


module.exports = {
// Middleware to verify JWT token
 verifyToken (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
   if (!token) {
    res.status(401).send('Authentication required.');
    return;
    }
   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
    res.status(403).send('Invalid token.');
    return;
    }
    req.user = decoded;
    next();
    });
   },
}