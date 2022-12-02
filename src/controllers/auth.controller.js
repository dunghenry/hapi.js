const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../helpers/generateToken');
const authController = {
    register: async (request, h) => {
        const { username, email } = request.payload;
        try {
            const user = await User.findOne({ email });
            if (user) {
                return h.response({ message: 'Email has been used' }).code(400);
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.payload.password, salt);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            const { password, ...info } = savedUser._doc;
            return h.response(info).code(400);
        } catch (error) {
            return h.response({ message: error.message }).code(500);
        }
    },
    login: async (request, h) => {
        const { email } = request.payload;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return h.response({ message: 'Email is not registered' }).code(400);
            }
            const isValidPassword = await bcrypt.compare(request.payload.password, user.password);
            if (!isValidPassword) {
                return h.response({ message: 'Wrong password' }).code(400);
            }
            const { password, ...info } = user._doc;
            const accessToken = generateAccessToken(info);
            return h.response({ ...info, accessToken }).code(400);
        } catch (error) {
            return h.response({ message: error.message }).code(500);
        }
    },
};

module.exports = authController;
