var express = require("express");
var router = express.Router();

const {
  validateSchema,
  checkIdSchema,
  checkUpdateSchema,
} = require("../../utils/index");

const {
  getAllSupplier,
  getDetailSupplier,
  createSupplier,
  putSupplier,
  patchSupplier,
  deleteSupplier,
} = require("../supplier/controller");
const {
  checkCreatSupplierSchema,
  checkPutSupplierSchema,
  checkPatchSupplierSchema,
} = require("./validation");

/* GET all user. */

router
  .route("/")
  .get(getAllSupplier)
  .post(validateSchema(checkCreatSupplierSchema), createSupplier);

// router.get("/", getAllSupplier);
// router.post("/", validateSchema(checkCreatSchema), createSupplier);
router
  .route("/:id")
  .get(validateSchema(checkIdSchema), getDetailSupplier)
  .put(
    validateSchema(checkIdSchema),
    validateSchema(checkPutSupplierSchema),
    putSupplier
  )
  .patch(
    validateSchema(checkIdSchema),
    validateSchema(checkPatchSupplierSchema),
    patchSupplier
  )
  .delete(validateSchema(checkIdSchema), deleteSupplier);

// router.get(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkPriceSchema),
//   getDetailSupplier(validateSchema(checkCreatSchema), createSupplier)
// );

// router.put(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   putSupplier
// );
// router.patch(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   patchSupplier
// );
// router.delete("/:id", validateSchema(checkIdSchema), deleteSupplier);

module.exports = router;
