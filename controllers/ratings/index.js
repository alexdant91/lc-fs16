const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { Rating, Product } = require("../../db");
const { getNewRating } = require("../../utilities/ratings");

/**
 * Create new rating
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/ratings/:product_id
 * @method POST
 */
const createNewRating = async (req, res) => {
  const user = req.user._id;
  const product = req.params.product_id;
  const schema = Joi.object().keys({
    stars: Joi.number().min(1).max(5).required(),
    content: Joi.string().optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const rating = (
      await new Rating({ ...data, user, product }).save()
    ).toObject();

    const _product = await Product.findOne(
      { _id: product },
      "rating rating_count",
      { lean: true }
    );
    const new_product_rating = getNewRating(_product, data.stars);

    await Product.updateOne({ _id: product }, new_product_rating);

    return res.status(201).json(rating);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Paginate all product ratings
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/ratings/:product_id?page=1&limit=25
 * @method GET
 */
const paginateAllRatings = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 25;
  const product = req.params.product_id;

  try {
    const ratings = await Rating.paginate(
      { product },
      { page, limit, sort: { createdAt: -1 } }
    );

    return res.status(200).json(ratings);
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewRating,
  paginateAllRatings,
};
