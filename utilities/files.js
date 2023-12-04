const path = require('path');
const fs = require('fs');
const { processDataType } = require('./images');
const uuid = require('uuid');

const uploadFile = (type, data, _id) => {
  if (type === 'cover') {
    const { file_ext, file_enc, data_str } = processDataType(data.cover);

    const cover_name = `${uuid.v4().replace("-", "")}.${file_ext}`;
    const cover_path = path.join(
      __dirname,
      "../public/images/products",
      _id,
      "cover"
    );


    if (!fs.existsSync(cover_path)) {
      fs.mkdirSync(cover_path, { recursive: true });
    }

    fs.writeFileSync(`${cover_path}/${cover_name}`, data_str, file_enc);

    return `${process.env.SERVER_HOST}${process.env.SERVER_STATIC}/images/products/${_id}/cover/${cover_name}`;
  } else if (type === 'images') {
    const images = [];

    data.images.forEach(data => {
      const { file_ext, file_enc, data_str } = processDataType(data);

      const cover_name = `${uuid.v4().replace("-", "")}.${file_ext}`;
      const cover_path = path.join(
        __dirname,
        "../public/images/products",
        _id,
        "images"
      );


      if (!fs.existsSync(cover_path)) {
        fs.mkdirSync(cover_path, { recursive: true });
      }

      fs.writeFileSync(`${cover_path}/${cover_name}`, data_str, file_enc);

      images.push(`${process.env.SERVER_HOST}${process.env.SERVER_STATIC}/images/products/${_id}/images/${cover_name}`);
    });

    return images;
  }
}

module.exports = {
  uploadFile,
}