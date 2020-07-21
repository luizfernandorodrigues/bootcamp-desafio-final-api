const db = require('../models/index');

const Transaction = db.transaction;

const findAll = async (req, res) => {
  const description = req.query.description;

  var condition = description
    ? { description: { $regex: new RegExp(description), $options: '1' } }
    : {};

  try {
    const data = await Transaction.find(condition);

    if (data.length < 1) {
      res.status(404).send({ message: 'Nenhum lançamento encontrado' });
    }

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar lançamentos' });
  }
};

const getTransactionsFrom = async (req, res) => {
  const period = req.query.period;

  try {
    const data = await Transaction.find({ yearMonth: period });

    if (data.length < 1) {
      res.status(404).send('Nenhum Registro Encontrado');
    }

    res.send(data);
  } catch (error) {
    console.log({ message: 'Erro ao buscar o periodo: ' + period });
    res.status(500).send({ message: 'Erro ao buscar o periodo: ' + period });
  }
};

module.exports = { findAll, getTransactionsFrom };
