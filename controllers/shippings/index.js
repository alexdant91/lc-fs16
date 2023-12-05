const Joi = require("joi");
const { Shipping } = require("../../db");
const { outErrors } = require("../../utilities/errors");

/**
 * Create new shipping
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/shippings
 * @method POST
 */
const createNewShipping = async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const shipping = await new Shipping(data).save();

    return res.status(201).json(shipping);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * get all shippings
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/shippings
 * @method GET
 */
const getAllShippings = async (_, res) => {
  try {
    const shippings = await Shipping.find({}, null, { lean: true });

    return res.status(200).json(shippings);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Update shipping by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/shippings/:id
 * @method PUT
 */
const updateShippingById = async (req, res) => {
  const _id = req.params.id;
  const schema = Joi.object().keys({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    await Shipping.updateOne({ _id }, data);

    return res.status(200).json({ message: "Shipping updated" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Delete shipping by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/shippings/:id
 * @method DELETE
 */
const deleteShippingById = async (req, res) => {
  const _id = req.params.id;

  try {
    await Shipping.deleteOne({ _id });

    return res.status(200).json({ message: "Shipping deleted" });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewShipping,
  getAllShippings,
  updateShippingById,
  deleteShippingById,
};
