const yup = require("yup");

module.exports = {
  checkPutSupplierSchema: yup.object({
    body: yup.object({
      name: yup.string().max(100).required(),
      email: yup.string().max(50).required(),
      phoneNumber: yup.string().max(50),
      isDelete: yup.boolean(),
      address: yup.string().max(500).required(),
    }),
  }),

  checkPatchSupplierSchema: yup.object({
    body: yup.object({
      name: yup.string().max(100),
      email: yup.string().max(50),
      phoneNumber: yup.string().max(50),
      isDelete: yup.boolean(),
      address: yup.string().max(500),
    }),
  }),

  checkCreatSupplierSchema: yup.object({
    body: yup.object({
      name: yup.string().max(100).required(),
      email: yup.string().max(50).required(),
      phoneNumber: yup.string().max(50),
      isDelete: yup.boolean(),
      address: yup.string().max(500).required(),
    }),
  }),
};
