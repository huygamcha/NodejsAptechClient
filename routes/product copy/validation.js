const yup = require("yup");

module.exports = {
  checkCreatProductSchema: yup.object({
    body: yup.object({
      price: yup.number().min(0).required(),
      discount: yup.number().min(0).max(75).required(),
      stock: yup.number().required(),
      // // categoryID: yup.object().required(),
      // supplierID: yup.object().required(),
      name: yup.string().max(50).required(),
      description: yup.string().max(300).required(),
      // nếu có kiểu này thì sẽ báo lỗi
      isDelete: yup.boolean(),
    }),
  }),

  checkPutProductSchema: yup.object({
    body: yup.object({
      price: yup.number().min(0).required(),
      discount: yup.number().min(0).max(75).required(),
      stock: yup.number().required(),
      // // categoryID: yup.object().required(),
      // supplierID: yup.object().required(),
      name: yup.string().max(50).required(),
      description: yup.string().max(300).required(),
      // nếu có kiểu này thì sẽ báo lỗi
      isDelete: yup.boolean(),
    }),
  }),

  checkPatchProductSchema: yup.object({
    body: yup.object({
      price: yup.number().min(0),
      discount: yup.number().min(0).max(75),
      stock: yup.number(),
      // // categoryID: yup.object(),
      // supplierID: yup.object(),
      name: yup.string().max(50),
      description: yup.string().max(300),
      // nếu có kiểu này thì sẽ báo lỗi
      isDelete: yup.boolean(),
    }),
  }),
};
