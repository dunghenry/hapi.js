const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const routes = require('./routes');
const connectDB = require('./configs/connect.db');
dotenv.config();
const port = process.env.PORT || 3000;
const server = Hapi.server({
    port,
    host: '0.0.0.0',
    routes: {
        cors: true,
    },
});

server.route(routes);

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        const data = { msg: 'Hello' };
        return h.response(data).code(201);
        // return h.continue
    },
});

const init = async () => {
    await connectDB();
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
