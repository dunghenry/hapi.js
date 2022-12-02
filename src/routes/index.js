const auth = require('./auth.route');
const users = require('./user.route');
const routes = [...auth, ...users];
module.exports = routes;
