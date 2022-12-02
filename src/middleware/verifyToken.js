const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const verifyToken = function (request, h) {
    const token = request.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        console.log('Access token: ' + accessToken?.length);
        if (!accessToken) {
            return (request.error = {
                status: 404,
                message: 'Token not found',
            });
        } else {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
                if (error?.name) {
                    const error = {
                        status: 403,
                        message: 'Token error',
                    };
                    return (request.error = error);
                }
                return (request.user = user);
            });
            const error = {
                status: 401,
                message: "You're not authenticated",
            };
            return (request.error = error);
        }
    } else {
        const error = {
            status: 401,
            message: "You're not authenticated",
        };
        return (request.error = error);
    }
};

module.exports = verifyToken;
