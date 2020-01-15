const express = require('express');
const { itemModel, validateItem } = require('../models/item');
const { OK, Created, Not_Found, Bad_Request, Not_Content } = require('./statusCode');

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await itemModel
    .find()
    .select('-__v')
    .sort('title');
  res.status(OK).send(items);
});

router.post('/', async (req, res) => {
  const { error, value } = validateItem(req.body);
  if (error) return res.status(Bad_Request).json(error.details[0].message);

  let item = new itemModel(value);
  item = await item.save();

  res.status(Created).send(item);
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateItem(req.body);
  if (error) return res.status(Bad_Request).json(error.details[0].message);

  if (!req.params.id) return res.status(Bad_Request).json('The ID was not provided.');

  let item = await itemModel.findByIdAndUpdate(req.params.id, value, {
    new: true
  });
  if (!item) return res.status(Not_Found).json('The item with the given ID was not found.');

  res.status(OK).send(item);
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) return res.status(Bad_Request).json('The ID was not provided.');

  let item = await itemModel.findByIdAndDelete(req.params.id);

  if (!item) return res.status(Not_Found).json('The item with the given ID was not found.');

  res.status(Not_Content).end();
});

router.get('/:id', async (req, res) => {
  const item = await itemModel.findById(req.params.id);

  if (!item) return res.status(Not_Found).json('The item with the given ID was not found.');

  res.status(OK).send(item);
});

module.exports = router;
