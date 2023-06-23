const jwt = require('jsonwebtoken');
const JWT_Secret = "helloworldofc$omputer";

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error: "Please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error: "Please authenticate using valid token"});
    }
}

module.exports = fetchuser;