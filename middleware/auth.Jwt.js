const jwt = require("jsonwebtoken");

verifyToken = (req,res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split("")[1];
    if(!token) {
        return res.status(403).send({message :"no token provided"});
    }
    jwt.verify(token,process.env.ACCESSTOKEN, (err, decoded) => {
        if(err) {
            return res.status(401).send({ message: "unauthorized"})
        }
        req.userId = decoded._id;
        next();
    });
};

module.exports = verifyToken;