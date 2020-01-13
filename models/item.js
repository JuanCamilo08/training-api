const mongoose = require('mongoose');
const Joi = require('joi');

exports.itemModel = mongoose.model(
  'Item',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 150
    },
    ingredients: [String]
  })
);

exports.validateItem = function(item) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(50)
      .required(),
    price: Joi.number().required(),
    description: Joi.string()
      .min(10)
      .max(150),
    ingredients: Joi.array().items(Joi.string().min(1))
  };
  return Joi.validate(item, schema);
};
