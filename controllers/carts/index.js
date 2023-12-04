const Joi = require('joi');
const { outErrors } = require('../../utilities/errors');
const { CartProduct, Cart } = require('../../db');

/**
 * Add product to cart
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/carts
 * @method POST
 */
const addProduct = async (req, res) => {
  const user_id = req.user._id;
  const cart_id = req.user.cart;

  const schema = Joi.object().keys({
    product: Joi.string().required(),
    qnt: Joi.number().optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.user = user_id;
    data.cart = cart_id;

    const product = await CartProduct.findOne({ product: data.product, cart: cart_id }, 'qnt', { lean: true });

    if (product !== null) {
      await CartProduct.updateOne({ product: data.product, cart: cart_id }, { qnt: product.qnt + data.qnt });
    } else {
      await new CartProduct(data).save();
    }

    const cart = await Cart.findOne({ user: user_id }, null, { lean: true });

    const cartProducts = await CartProduct.find({ cart: cart_id }, null, { lean: true });

    cart.products = cartProducts;

    return res.status(201).json(cart);

  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Get user cart
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/carts
 * @method GET
 */
const getCart = async (req, res) => {
  const user_id = req.user._id;

  try {
    const cart = await Cart.findOne({ user: user_id }, null, { lean: true }).populate('shipping').populate('promo_code');

    const cartProducts = await CartProduct.find({ cart: cart._id }, null, { lean: true }).populate('product');

    if (cartProducts.length > 0) {
      const products = cartProducts.map(item => {
        return {
          ...item,
          product: {
            ...item.product,
            final_price: item.product.price - (item.product.price * item.product.discount / 100),
          },
        }
      });

      cart.products = products;

      cart.products_price = products.reduce((acc, curr) => acc + curr.product.final_price * curr.qnt, 0);
    } else {
      cart.products = [];
      cart.products_price = 0;
    }

    return res.status(200).json(cart);
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Update cart
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/carts/:product_cart_id
 * @method PUT
 */
const updateCart = async (req, res) => {
  const user_id = req.user._id;
  const _id = req.params.product_cart_id;

  const schema = Joi.object().keys({
    qnt: Joi.number().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    await CartProduct.updateOne({_id, user: user_id}, {qnt: data.qnt});

    return res.status(200).json({message: 'cart updated'});
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * delete cart
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/carts/:product_cart_id
 * @method DELETE
 */
const deleteCart = async (req, res) => {
  const user_id = req.user._id;
  const _id = req.params.product_cart_id;

  try {
    await CartProduct.deleteOne({_id, user: user_id});

    return res.status(200).json({message: 'cart product deleted'});
  } catch (error) {
    return outErrors(error, res);
  }
}

module.exports = {
  addProduct,
  getCart,
  updateCart,
  deleteCart
}