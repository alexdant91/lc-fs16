const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { Wishlist, WishlistProduct } = require("../../db");

/**
 * get allWishlists
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists?page=1&limit=10
 * @method GET
 */
const getAllWishlists = async (req, res) => {
  const user = req.user._id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  try {
    const wishlists = await Wishlist.paginate({ user }, { page, limit });

    return res.status(200).json(wishlists);
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * get wishlistById
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists/:id
 * @method GET
 */
const getWhistlistById = async (req, res) => {
  const user = req.user._id;
  const _id = req.params.id;

  try {
    const wishlist = await Wishlist.findOne({ user, _id }, null, { lean: true });
    const wishlistProducts = await WishlistProduct.find({ user, wishlist: _id }, null, { lean: true }).populate({
      path: "product",
      select: "title brand price cover",
    });

    wishlist.products = wishlistProducts;

    return res.status(200).json(wishlist);
  } catch (error) {
    return outErrors(error, res);
  }
};


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

/**
 * Update wishlistInfo
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists/info/:id
 * @method PUT
 */
const updateWishlistInfo = async (req, res) => {
  const user = req.user._id;
  const _id = req.params.id;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    await Wishlist.updateOne({ _id, user, }, data);

    return res.status(200).json({ message: "WishlistInfo updated" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * add productToWishlist
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists/products/:id
 * @method POST
 */
const addWishlistProduct = async (req, res) => {
  const user = req.user._id;
  const wishlist_id = req.params.id;

  const schema = Joi.object().keys({
    product: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const check_product = await WishlistProduct.countDocuments({ user, wishlist: wishlist_id, product: data.product });

    if (check_product > 0) return res.status(200).json({ message: "Product already inserted" });

    await new WishlistProduct({ user, wishlist: wishlist_id, product: data.product }).save();

    return res.status(200).json({ message: "product added" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Delete wishlistProducts
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists/products/:id
 * @method DELETE
 */
const deleteWishlistProduct = async (req, res) => {
  const user = req.user._id;
  const wishlist_id = req.params.id;

  try {
    await WishlistProduct.deleteOne({ user, wishlist: wishlist_id, product: data.product });

    return res.status(200).json({ message: "product removed" });
  } catch (error) {
    return outErrors(error, res);
  }
};

/**
 * Delete wishlist
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/wishlists/:id
 * @method DELETE
 */
const deleteWishlist = async (req, res) => {
  const user = req.user._id;
  const _id = req.params.id;

  try {
    await Wishlist.deleteOne({ user, _id });
    await WishlistProduct.deleteMany({ user, wishlist: _id, });

    return res.status(200).json({ message: "product removed" });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewWishlist,
  updateWishlistInfo,
  addWishlistProduct,
  deleteWishlistProduct,
  deleteWishlist,
  getAllWishlists,
  getWhistlistById
};
