const express = require('express');
const router = express.Router();

const { itemModel, validateItem } = require('../models/item');

router.get('/', async (req, res) => {
  const items = await itemModel
    .find()
    .select('-__v')
    .sort('title');
  res.send(items);
});

router.post('/', async (req, res) => {
  const { error, value } = validateItem(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let item = new itemModel(value);
  item = await item.save();

  res.status(201).send(item);
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateItem(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let item = await itemModel.findByIdAndUpdate(req.params.id, value, {
    new: true
  });
  if (!item) return res.status(404).json('The item with the given ID was not found.');

  res.status(200).send(item);
});

router.delete('/:id', async (req, res) => {
  let item = await itemModel.findByIdAndDelete(req.params.id);

  if (!item) return res.status(404).json('The item with the given ID was not found.');

  res.status(200).send(item);
});

router.get('/:id', async (req, res) => {
  const item = await itemModel.findById(req.params.id);

  if (!item) return res.status(404).json('The item with the given ID was not found.');

  res.status(200).send(item);
});

module.exports = router;
