const authController = require('../controllers/auth.controller');
const auth = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: authController.register,
    },
    {
        method: 'POST',
        path: '/auth/login',
        handler: authController.login,
    },
];

module.exports = auth;
