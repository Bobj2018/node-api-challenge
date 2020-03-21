const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const cors = require('cors');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');


const server = express();

server.use(helmet())
server.use(morgan('dev'))

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Joshua's API</h1>");
});

module.exports = server;