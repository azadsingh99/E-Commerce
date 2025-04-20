import Joi from 'joi';

export const productSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().uri().required(),
  rating: Joi.object({
    rate: Joi.number().min(0).max(5),
    count: Joi.number().min(0)
  })
});

export const cartItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required()
});
