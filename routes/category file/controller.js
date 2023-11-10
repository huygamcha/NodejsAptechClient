let data = require("../../data/categories.json");
const { hasError, writeFileSync, generationID } = require("../../utils/index");

module.exports = {
  getAllCategory: (req, res, next) => {
    try {
      return res.send(200, {
        message: "Lấy thành công",
        payload: data.filter((item) => !item.isDelete),
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },

  getDetailCategory: (req, res, next) => {
    try {
      const { id } = req.params;
      const detail = data.find((item) => item.id.toString() === id);

      if (!detail) {
        return res.send(404, {
          message: "Không tìm thấy",
        });
      }

      if (!detail.isDelete) {
        return res.send(202, {
          message: "Lấy thành công",
          payload: detail,
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

  createCategory: (req, res, next) => {
    try {
      const { name, description, isDelete = false } = req.body;
      const newP = {
        id: generationID(),
        name: name,
        description: description,
        isDelete: isDelete,
      };
      data = [...data, newP];
      writeFileSync("data/categories.json", data);

      res.send(200, {
        message: "tạo mới thành công",
        payload: newP,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  putCategory: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, isDelete } = req.body;
      let hasId = false;

      const dataUpdate = {
        id: +id,
        name,
        description,
        isDelete,
      };

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
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
      console.log("««««« errror »»»»»", err);
      return hasError(res);
    }
  },

  patchCategory: (req, res, next) => {
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

  deleteCategory: (req, res, next) => {
    try {
      const { id } = req.params;
      data = data.filter((item) => item.id !== +id);

      writeFileSync("data/categories.json", data);

      return res.send(200, {
        message: "Xoá thành công",
        payload: data,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return hasError(res);
    }
  },
};
