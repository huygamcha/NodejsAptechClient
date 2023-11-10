let data = require("../../data/products.json");
const { hasError, writeFileSync, generationID } = require("../../utils/index");
module.exports = {
  getAllProduct: (req, res, next) => {
    try {
      // const { isDelete } = req.body;
      return res.send({
        message: "Lấy thông tin thành công",
        payload: data.filter((item) => !item.isDelete),
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },
  getDetailProduct: (req, res, next) => {
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
    } else
      return res.send(404, {
        message: "Không tồn tại",
      });
  },

  createProduct: (req, res, next) => {
    try {
      const {
        name,
        price = 0,
        discount = 0,
        stock = 0,
        isDelete = false,
        description,
      } = req.body;

      const newP = {
        id: generationID(),
        price: price,
        name: name,
        discount: discount,
        stock: stock,
        isDelete: isDelete,
        description: description,
      };

      data = [...data, newP];
      writeFileSync("data/products.json", data);

      res.send(200, {
        message: "tạo mới thành công",
        payload: newP,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },
  putProduct: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, discount, stock, isDelete, description } = req.body;
      let hasId = false;

      const dataUpdate = {
        id: +id,
        name,
        price,
        discount,
        stock,
        isDelete,
        description,
      };

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
          return dataUpdate;
        }
        return item;
      });

      writeFileSync("data/products.json", data);

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
  patchProduct: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, discount, stock, isDelete, description } = req.body;

      let hasId = false;
      let dataUpdate = {};

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
          dataUpdate = {
            ...item,
            name: name || item.name,
            price: price || price.price,
            discount: discount || discount.price,
            stock: stock || stock.price,
            isDelete: isDelete || isDelete.price,
            description: description || description.price,
          };
          return dataUpdate;
        }
        return item;
      });
      writeFileSync("data/products.json", data);

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
  deleteProduct: (req, res, next) => {
    try {
      const { id } = req.params;
      data = data.filter((item) => item.id !== +id);
      writeFileSync("data/products.json", data);
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
