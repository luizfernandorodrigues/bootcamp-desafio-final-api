const express = require('express');
//const transactionRouter = express.Router();
const controller = require('../controllers/transactionController');

const routes = express();

//routes.get('/', controller.findAll);
routes.get('/', controller.getTransactionsFrom);

module.exports = routes;
