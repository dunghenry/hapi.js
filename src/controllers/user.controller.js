const User = require('../models/user.model');
const userController = {
    getUsers: async (request, h) => {
        // const users = await User.find({});
        // return h.response(users).code(200);
        try {
            if (request?.user?.userId) {
                const users = await User.find({});
                return h.response(users).code(200);
            }
            if (request?.error?.status) {
                return h.response(request?.error?.message).code(request?.error.status);
            }
        } catch (error) {
            return h.response({ message: error.message }).code(500);
        }
    },
};

module.exports = userController;
