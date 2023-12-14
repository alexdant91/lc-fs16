const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { Wishlist } = require("../../db");

/**
 * Create new wishlist
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists
 * @method POST
 */
const createNewWishlist = async (req, res) => {
  const user = req.user._id;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.user = user;

    const wishlist = (await new Wishlist(data).save()).toObject();

    return res.status(201).json(wishlist);
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewWishlist,
};
