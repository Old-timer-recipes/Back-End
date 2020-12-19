const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const recipesRouter = require('./recipes/recipes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/recipes', restrict, recipesRouter); // only logged-in users should have access!
server.get('/', (req, res) => {
    res.status(200).json('Up')
})
server.get('*', (req, res) => {
    res.status(404).json('Not Found')
})

module.exports = server;