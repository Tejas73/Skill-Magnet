const jwt = require('jsonwebtoken');
const userSecKey = 'us035kj3er';
const adminSecKey = 'ad035kj3min';

//original code
// const authenticateJwt = (secretKey, req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
                
//                 console.log("Response data", err);
//                 return res.sendStatus(403);
//             }
//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };
 
//ChatGPT code
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
