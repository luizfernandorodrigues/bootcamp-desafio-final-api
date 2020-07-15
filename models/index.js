const mongoose = require('mongoose');
const TransactionModel = require('./TransactionModel');

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;
db.transaction = TransactionModel;

module.exports = db;
