let data = require("../../data/categories.json");
const { hasError, writeFileSync } = require("../../utils/index");
// const Category = require("../../models/category");

const { Category } = require("../../models");

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      const result = await Category.find({ isDeleted: false });

      return res.send(200, {
        message: "Lấy thành công",
        payload: result,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },

  getDetailCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      // const detail = data.find((item) => item.id.toString() === id);
      const result = await Category.findById(id);

      if (!result) {
        return res.send(404, {
          message: "Không tìm thấy",
        });
      }

      if (!result.isDelete) {
        return res.send(202, {
          message: "Lấy thành công",
          payload: result,
        });
      } else {
        return res.send(202, {
          message: "Không tồn tại",
        });
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },

  createCategory: async (req, res, next) => {
    try {
      // const { name, description, isDelete = false } = req.body;
      // const newP = {
      //   id: generationID(),
      //   name: name,
      //   description: description,
      //   isDelete: isDelete,
      // };
      // data = [...data, newP];
      // writeFileSync("data/categories.json", data);
      const { name, description } = req.body;
      const newCategory = new Category({
        name,
        description,
      });

      const result = await newCategory.save();

      res.send(200, {
        message: "tạo mới thành công",
        payload: result,
      });
    } catch (error) {
      console.log("««««« error »»»»»");
      hasError(error);
    }
  },

  patchCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // const dataUpdate = {
      //   id: +id,
      //   name,
      //   description,
      //   isDelete,
      // };
      // data = data.map((item) => {
      //   if (item.id === +id) {
      //     hasId = true;
      //     return dataUpdate;
      //   }
      //   return item;
      // });
      // writeFileSync("data/categories.json", data);
      const resultId = await Category.findById(id);

      if (!resultId) {
        return res.send(404, {
          message: "Không tìm thấy",
        });
      }
      if (resultId.isDeleted) {
        return res.send(404, {
          message: "Đã bị xoá",
        });
      }

      const resultUpdate = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (resultUpdate) {
        return res.send(404, {
          message: "Cập nhật thành công",
          payload: resultUpdate,
        });
      }
    } catch (err) {
      console.log("««««« errror »»»»»", err);
      return hasError(res);
    }
  },

  putCategory: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, isDelete } = req.body;
      let hasId = false;

      let dataUpdate = {};

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
          dataUpdate = {
            ...item,
            name: name || item.name,
            description: description || item.description,
            isDelete: isDelete || item.isDelete,
          };
          return dataUpdate;
        }
        return item;
      });

      writeFileSync("data/categories.json", data);

      if (hasId) {
        return res.send(200, {
          message: "cập nhật thành công",
          payload: dataUpdate,
        });
      } else {
        return res.send(404, {
          message: "Không tìm thấy ID nào",
        });
      }
    } catch (err) {
      console.log("««««« error »»»»»", err);
      return hasError(res);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      // data = data.filter((item) => item.id !== +id);

      // writeFileSync("data/categories.json", data);

      const resultCheck = await Category.findById(id);

      if (!resultCheck) {
        return res.send(404, {
          message: "Không tìm thấy sản phẩm",
        });
      }
      if (resultCheck.isDeleted) {
        return res.send(404, {
          message: "Sản phẩm đã bị xoá trước đây",
        });
      }

      const resultDelete = await Category.findByIdAndUpdate(id, {
        isDeleted: true,
      });

      if (resultDelete) {
        return res.send(200, {
          message: "Xoá thành công",
        });
      }
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return hasError(res);
    }
  },
};
