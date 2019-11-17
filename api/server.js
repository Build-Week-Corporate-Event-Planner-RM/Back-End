const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const eventRouter = require("../events/events-router");
const authRouter = require('../auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/events', authenticate ,eventRouter);

server.get('/', (req, res) => {
    res.send({ api: 'up' })
})

module.exports = server;