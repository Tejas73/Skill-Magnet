const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const jwt = require('jsonwebtoken');
const userSecKey = process.env.USER_SECRET_KEY;
const adminSecKey = process.env.ADMIN_SECRET_KEY;

const authenticateJwt = (secretKey, req, res, next) => {
    console.log()
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("Received token:", token);
        console.log("Received key:", secretKey);
        console.log("Incoming URL:", req.originalUrl);
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("Error verifying token:", err);
                // Send a 403 response only if the request hasn't been responded to yet
                if (!res.headersSent) {
                    res.sendStatus(403);
                }
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        // Send a 401 response only if the request hasn't been responded to yet
        if (!res.headersSent) {
            res.sendStatus(401);
        }
    }
};

const userAuthenticateJwt = (req, res, next) => {
    authenticateJwt(userSecKey, req, res, next);
};

const adminAuthenticateJwt = (req, res, next) => {
    authenticateJwt(adminSecKey, req, res, next);
};


module.exports = {
    adminSecKey,
    userSecKey,
    userAuthenticateJwt,
    adminAuthenticateJwt
};
