const processDataType = (data) => {
  //data:image/png;base64,data...
  const [data_info, data_str] = data.split(",");

  const [_, file_type, file_ext, file_enc] = data_info.split(/\:|\/|\;/gi);

  return {
    file_type,
    file_ext,
    file_enc,
    data_str,
  };
};

module.exports = {
  processDataType,
};
