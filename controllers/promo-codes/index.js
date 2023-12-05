const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { PromoCode } = require("../../db");
const { generateRandomString } = require("../../utilities/crypt");

/**
 * Create new promoCode
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/promo-codes
 * @method POST
 */
const createNewPromoCode = async (req, res) => {
  const schema = Joi.object().keys({
    code: Joi.string().optional(),
    value: Joi.number().required(),
    mode: Joi.string().required(),
    start_limit: Joi.number().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    if (!data.code) {
      data.code = generateRandomString();
    }

    data.code = data.code.toUpperCase();

    const promo_code = (await new PromoCode(data).save()).toObject();

    return res.status(201).json(promo_code);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * get all promo-codes
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/promo-codes
 * @method GET
 */
const getAllPromoCodes = async (_, res) => {
  try {
    const promo_codes = await PromoCode.find({}, null, { lean: true });

    return res.status(200).json(promo_codes);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Update promo-code by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/promo-codes/:id
 * @method PUT
 */
const updatePromoCodeById = async (req, res) => {
  const _id = req.params.id;
  const schema = Joi.object().keys({
    value: Joi.number().optional(),
    mode: Joi.string().optional(),
    start_limit: Joi.number().optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    await PromoCode.updateOne({ _id }, data);

    return res.status(200).json({ message: "Promo code updated" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Delete promo-code by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/promo-codes/:id
 * @method DELETE
 */
const deletePromoCodeById = async (req, res) => {
  const _id = req.params.id;

  try {
    await PromoCode.deleteOne({ _id });

    return res.status(200).json({ message: "Promo code deleted" });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewPromoCode,
  getAllPromoCodes,
  updatePromoCodeById,
  deletePromoCodeById,
};
