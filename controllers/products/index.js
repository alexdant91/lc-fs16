const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const { outErrors } = require("../../utilities/errors");
const { Product } = require("../../db");
const { uploadFile } = require("../../utilities/files");

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
    categories: Joi.array().items(Joi.string()).optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const _product = new Product(data);

    if (data.cover && data.cover.startsWith("data:")) {
      _product.cover = uploadFile("cover", data, _product._id.toString());
    }

    if (
      Array.isArray(data.images) &&
      !data.images.some((image) => !image.startsWith("data:"))
    ) {
      _product.images = uploadFile("images", data, _product._id.toString());
    }

    const product = (await _product.save()).toObject();

    return res.status(201).json(product);
  } catch (error) {
    return outErrors(error, res);
  }
};

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
    const products = await Product.paginate(
      {},
      { page, limit, populate: ["categories"], lean: true }
    );

    products.docs.forEach((product, index) => {
      products.docs[index].final_price =
        product.discount > 0
          ? product.price - (product.price * product.discount) / 100
          : product.price;
    });

    return res.status(200).json(products);
  } catch (error) {
    return outErrors(error, res);
  }
};

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
    const product = await Product.findOne({ _id: product_id }, null, {
      lean: true,
    });

    product.final_price =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return res.status(200).json(product);
  } catch (error) {
    return outErrors(error, res);
  }
};

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
    categories: Joi.array().items(Joi.string()).optional(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    await Product.updateOne({ _id: product_id }, data);

    return res.status(201).json({ message: "Product updated" });
  } catch (error) {
    return outErrors(error, res);
  }
};

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

    fs.rmSync(
      path.join(__dirname, "../../public/images/products", product_id),
      { recursive: true, force: true }
    );

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return outErrors(error, res);
  }
};

module.exports = {
  createNewProduct,
  paginateAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
};
