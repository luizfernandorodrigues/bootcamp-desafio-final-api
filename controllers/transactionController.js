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

const updateTransaction = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhuma transação encontrada para atualizar' });
    }

    res.send({ message: 'Transação atualizada com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transação id: ' + id });
  }
};

const postTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
      type: req.body.type,
    });
    console.log(transaction);
    await transaction.save(transaction);

    console.log(transaction);
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndDelete({ _id: id });

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhuma transação encontrada para exclusao' });
    }

    res.send({ message: 'Transação excluida com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar a transação id: ' + id });
  }
};

module.exports = {
  findAll,
  getTransactionsFrom,
  updateTransaction,
  postTransaction,
  deleteTransaction,
};
