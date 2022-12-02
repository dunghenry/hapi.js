const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');
const users = [
    {
        method: 'GET',
        path: '/users',
        // handler: userController.getUsers,
        config: {
            pre: [{ method: verifyToken }],
            handler: userController.getUsers,
        },
    },
];

module.exports = users;
