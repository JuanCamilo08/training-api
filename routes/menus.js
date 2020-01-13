const express = require('express');
const router = express.Router();
const { menuModel, validateMenu } = require('../models/menu');

router.get('/', async (req, res) => {
  const result = await menuModel.find().select('-__v');
  res.send(result);
});

router.post('/', async (req, res) => {
  const { error, value } = validateMenu(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let result = new menuModel(value);
  result = await result.save();

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateMenu(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let menu = await menuModel.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!menu) return res.status(404).send('The menu with the given ID was not found.');

  res.send(menu);
});

router.delete('/:id', async (req, res) => {
  let menu = await menuModel.findByIdAndDelete(req.params.id);

  if (!menu) return res.status(404).send('The menu with the given ID was not found.');

  res.send(menu);
});

router.get('/:id', async (req, res) => {
  const menu = await menuModel
    .findById(req.params.id)
    .select('-__v')
    .populate('items');

  if (!menu) return res.status(404).send('The menu with the given ID was not found.');

  res.send(menu);
});

module.exports = router;