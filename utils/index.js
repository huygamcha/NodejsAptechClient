const yup = require("yup");
const fs = require("fs");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  writeFileSync: (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data), function (err) {
      if (err) {
        console.log("««««« err »»»»»", err);
        throw err;
      }
      console.log("««««« Saved! »»»»»");
    });
  },

  // hàm tạo ra một ID không trùng bất cứ ID nào
  generationID: () => Math.floor(Date.now()),

  // tạo ra các khung validate cho các middleware
  validateSchema: (schema) => async (req, res, next) => {
    try {
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        {
          abortEarly: false,
        }
      );
      return next();
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.send(400, {
        type: err.name,
        errors: err.errors,
        provider: "Yup",
      });
      // return res.status(400).json({ type: err.name, errors: err.errors, provider: "YUP" });
    }
  },

  // tạo ra các thành phần check cho middleware
  checkIdSchema: yup.object({
    params: yup.object({
      id: yup.string().test("inValid", "ID sai định dạng", (value) => {
        return ObjectId.isValid(value);
      }),
    }),
  }),

  checkPriceSchema: yup.object({
    query: yup.object({
      price: yup.number().min(0),
    }),
  }),

  checkCreatSchema: yup.object({
    body: yup.object({
      name: yup.string().required(),
    }),
  }),

  checkUpdateSchema: yup.object({
    body: yup.object({
      price: yup.number(),
      name: yup.string(),
    }),
  }),

  hasError: (res, err) =>
    res.send(404, {
      message: "Thất bại",
      payload: err,
    }),

  getQueryDateTime: (from, to, type = "IN") => {
    fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0);

    const tmpToDate = new Date(to);
    tmpToDate.setHours(0, 0, 0, 0);
    toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

    let query = {};

    if (type === "IN") {
      const compareFromDate = { $gte: ["$createdDate", fromDate] };
      const compareToDate = { $lt: ["$createdDate", toDate] };

      query = {
        $expr: { $and: [compareFromDate, compareToDate] },
      };
    } else {
      const compareFromDate = { $lt: ["$createdDate", fromDate] };
      const compareToDate = { $gt: ["$createdDate", toDate] };

      query = {
        $expr: { $or: [compareFromDate, compareToDate] },
      };
    }

    return query;
  },

  fuzzySearch: (text) => {
    const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    return new RegExp(regex, "gi");
  },

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array);
    }
  },
};
