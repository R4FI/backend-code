const Product = require("../Models/Products");

// get product
exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .sort(queries.sortBy)
    .select(queries.field);
  return products;
};
exports.getSingleProductsService = async (id) => {
  const products = await Product.findOne({ _id: id });
  return products;
};

exports.createProductsService = async (data) => {
  const product = await Product.create(data);
  return product;
};
exports.updateProducts = async (productId, data) => {
  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateServices = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data, {
    runValidators: true,
  });
  return result;
};

// delete
exports.deleteProduct = async (id) => {
  const result = await Product.deleteMany({ _id: id });
  return result;
};

// const result = await Product.updateMany({_id:data.ids},data.data,
//     {runValidators:true}
//     );

// const prodcuts = [];
// data.ids.array.forEach(product => {
//     product.push(product.updateOne({_id: product.id},product.data));

// });
// const result = await Promise.all(prodcuts);
