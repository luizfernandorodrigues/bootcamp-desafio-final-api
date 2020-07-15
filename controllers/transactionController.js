const db = require('../models/index');

const Transaction = db.transaction;

const findAll = async (req, res) => {
  const description = req.query.description;

  var condition = name
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

module.exports = { findAll };
