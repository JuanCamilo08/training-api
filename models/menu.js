const mongoose = require('mongoose');
const Joi = require('joi');

exports.menuModel = mongoose.model(
  'Menu',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  })
);

exports.validateMenu = function(menu) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    items: Joi.array().min(1)
  };
  return Joi.validate(menu, schema);
};
