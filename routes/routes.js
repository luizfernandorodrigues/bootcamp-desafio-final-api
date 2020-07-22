const express = require('express');
//const transactionRouter = express.Router();
const controller = require('../controllers/transactionController');

const routes = express();

//routes.get('/', controller.findAll);
routes.get('/', controller.getTransactionsFrom);
routes.put('/:id', controller.updateTransaction);
routes.post('/', controller.postTransaction);
routes.delete('/:id', controller.deleteTransaction);

module.exports = routes;
