var express = require("express");
var router = express.Router();

const {
  validateSchema,
  checkIdSchema,
  checkUpdateSchema,
} = require("../../utils/index");

const {
  getAllProduct,
  getDetailProduct,
  createProduct,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("../product/controller");
const {
  checkCreatProductSchema,
  checkPatchProductSchema,
  checkPutProductSchema,
} = require("./validation");

/* GET all user. */

router
  .route("/")
  .get(getAllProduct)
  .post(validateSchema(checkCreatProductSchema), createProduct);

// router.get("/", getAllProduct);
// router.post("/", validateSchema(checkCreatSchema), createProduct);
router
  .route("/:id")
  .get(validateSchema(checkIdSchema), getDetailProduct)
  .put(
    validateSchema(checkIdSchema),
    validateSchema(checkPutProductSchema),
    putProduct
  )
  .patch(
    validateSchema(checkIdSchema),
    validateSchema(checkPatchProductSchema),
    patchProduct
  )
  .delete(validateSchema(checkIdSchema), deleteProduct);

// router.get(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkPriceSchema),
//   getDetailProduct(validateSchema(checkCreatSchema), createProduct)
// );

// router.put(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   putProduct
// );
// router.patch(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   patchProduct
// );
// router.delete("/:id", validateSchema(checkIdSchema), deleteProduct);

module.exports = router;
