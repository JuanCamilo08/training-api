const express = require('express');
const { menuModel, validateMenu } = require('../models/menu');
const { OK, Not_Found, Created, Bad_Request } = require('./statusCode');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await menuModel.find().select('-__v');
  res.status(200).send(result);
});

router.post('/', async (req, res) => {
  const { error, value } = validateMenu(req.body);
  if (error) return res.status(Bad_Request).json(error.details[0].message);

  let result = new menuModel(value);
  result = await result.save();

  res.status(Created).send(result);
});

router.put('/:id', async (req, res) => {
  const { error, value } = validateMenu(req.body);
  if (error) return res.status(Bad_Request).json(error.details[0].message);

  let menu = await menuModel.findByIdAndUpdate(req.params.id, value, { new: true });
  if (!menu) return res.status(Not_Found).json('The menu with the given ID was not found.');

  res.status(OK).send(menu);
});

router.delete('/:id', async (req, res) => {
  let menu = await menuModel.findByIdAndDelete(req.params.id);

  if (!menu) return res.status(Not_Found).json('The menu with the given ID was not found.');

  res.status(OK).send(menu);
});

router.get('/:id', async (req, res) => {
  const menu = await menuModel
    .findById(req.params.id)
    .select('-__v')
    .populate('items');

  if (!menu) return res.status(Not_Found).json('The menu with the given ID was not found.');

  res.statuys(OK).send(menu);
});

module.exports = router;
