var express = require("express");
var router = express.Router();

const {
  validateSchema,
  checkIdSchema,
  checkUpdateSchema,
} = require("../../utils/index");

const {
  getAllCategory,
  getDetailCategory,
  createCategory,
  putCategory,
  patchCategory,
  deleteCategory,
} = require("./controller");
const {
  checkCreatCategory,
  checkPutCategory,
  checkPatchCategory,
} = require("./validation");

/* GET all user. */

router
  .route("/")
  .get(getAllCategory)
  .post(validateSchema(checkCreatCategory), createCategory);

// router.get("/", getAllCategory);
// router.post("/", validateSchema(checkCreatSchema), createCategory);
router
  .route("/:id")
  .get(validateSchema(checkIdSchema), getDetailCategory)
  .put(
    validateSchema(checkIdSchema),
    validateSchema(checkPutCategory),
    putCategory
  )
  .patch(
    validateSchema(checkIdSchema),
    validateSchema(checkPatchCategory),
    patchCategory
  )
  .delete(validateSchema(checkIdSchema), deleteCategory);

// router.get(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkPriceSchema),
//   getDetailCategory(validateSchema(checkCreatSchema), createCategory)
// );

// router.put(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   putCategory
// );
// router.patch(
//   "/:id",
//   validateSchema(checkIdSchema),
//   validateSchema(checkUpdateSchema),
//   patchCategory
// );
// router.delete("/:id", validateSchema(checkIdSchema), deleteCategory);

module.exports = router;
