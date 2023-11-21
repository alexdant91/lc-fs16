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
    const _products = await Product.paginate({}, { page, limit, populate: ['categories'] });

    const products = [..._products.docs].map((product) => {
      if (product.discount > 0) {
        product.final_price = product.price - (product.price * product.discount / 100);
        console.log(product.final_price);
      }
      return product;
    });
    // products.docs.forEach((product, index) => {
    //   products.docs[index].final_price = product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price;
    //   console.log(product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price)
    // }

    // for (let i = 0; i < products.docs.length; i++) {
    //   const product = products.docs[i];
    //   products.docs[i].final_price = product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price;
    // }

    return res.status(200).json(products);
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Get product by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/products/:id
 * @method GET
 */
const getProductById = async (req, res) => {
  const product_id = req.params.id;
  try {
    const product = await Product.findOne({ _id: product_id }, null, { lean: true });

    product.final_price = product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price;

    return res.status(200).json(product);
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Update product by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/products/:id
 * @method PUT
 */
const updateProductById = async (req, res) => {
  const product_id = req.params.id;
  const schema = Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    brand: Joi.string().optional(),
    price: Joi.number().optional(),
    discount: Joi.number().optional(),
    cover: Joi.string().optional(),
    images: Joi.array().items(Joi.string()).optional(),
    categories: Joi.array().items(Joi.string()).optional()
  })

  try {
    const data = await schema.validateAsync(req.body);

    await Product.updateOne({ _id: product_id }, data);

    return res.status(201).json({ message: 'Product updated' });
  } catch (error) {
    return outErrors(error, res);
  }
}

/**
 * Delete product by id
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @path /api/products/:id
 * @method DELETE
 */
const deleteProductById = async (req, res) => {
  const product_id = req.params.id;

  try {
    await Product.deleteOne({ _id: product_id });

    return res.status(201).json({ message: 'Product deleted' });
  } catch (error) {
    return outErrors(error, res);
  }
}


module.exports = {
  createNewProduct,
  paginateAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
}