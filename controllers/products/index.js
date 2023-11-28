const Joi = require("joi");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const { outErrors } = require("../../utilities/errors");
const { Product } = require("../../db");
const { processDataType } = require("../../utilities/images");

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
      const { file_ext, file_enc, data_str } = processDataType(data.cover);

      const cover_name = `${uuid.v4().replace("-", "")}.${file_ext}`;
      const cover_path = path.join(
        __dirname,
        "../../static/images/products",
        _product._id,
        "cover"
      );

      if (!fs.existsSync(cover_path)) {
        fs.mkdirSync(cover_path);
      }

      fs.writeFileSync(`${cover_path}/${cover_name}`, data_str, file_enc);

      data.cover = `${process.env.SERVER_HOST}${process.env.SERVER_STATIC}/images/products/${_product._id}/cover/${cover_name}`;
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

    return res.status(201).json({ message: "Product deleted" });
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
