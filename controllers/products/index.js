const Joi = require("joi");
const { outErrors } = require("../../utilities/errors");
const { Product } = require("../../db");

/**
 * Create new product
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/products
 * @method POST
 */
const createNewProduct = async (req, res) => {
  const schema = Joi.object().keys({
      title: Joi.string().required(), 
      description: Joi.string().required(),
      brand: Joi.string().optional(),
      price: Joi.number().required(),
      discount: Joi.number().optional(),
      cover: Joi.string().optional(),
      images: Joi.array().items(Joi.string()).optional(),
      categories: Joi.array().items(Joi.string()).optional()
  })

  try {
    const data = await schema.validateAsync(req.body);
    
    const product = (await new Product(data).save()).toObject();

    return res.status(201).json(product);
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Paginate all products
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/products?page=1&limit=25
 * @method GET
 */
const paginateAllProducts = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 25;

  try {
    const products = await Product.paginate({}, {page, limit, populate: ['categories']});
    return res.status(200).json(products);
  } catch (error) {
    return outErrors(error, res);
  }
}

module.exports = {
  createNewProduct,
  paginateAllProducts,
}