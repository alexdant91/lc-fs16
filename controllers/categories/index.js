const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { Category } = require("../../db");

/**
 * Create new category
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/categories
 * @method POST
 */
const createNewCategory = async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const category = (await new Category(data).save()).toObject();

    return res.status(201).json(category);
  } catch (error) {
    return outErrors(error, res);
  }
}

module.exports = {
  createNewCategory,
}