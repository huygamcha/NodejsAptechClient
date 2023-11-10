const yup = require("yup");

module.exports = {
  checkCreatCategory: yup.object({
    body: yup.object({
      name: yup.string().max(50).required(),
      isDelete: yup.boolean(),
      description: yup.string().max(500),
    }),
  }),

  checkPutCategory: yup.object({
    body: yup.object({
      name: yup.string().max(50).required(),
      isDelete: yup.boolean(),
      description: yup.string().max(500),
    }),
  }),

  checkPatchCategory: yup.object({
    body: yup.object({
      name: yup.string().max(50),
      isDelete: yup.boolean(),
      description: yup.string().max(500),
    }),
  }),
};
