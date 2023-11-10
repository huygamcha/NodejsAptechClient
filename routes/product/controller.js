let data = require("../../data/products.json");
const { hasError, writeFileSync } = require("../../utils/index");
const { Product, Category, Supplier } = require("../../models");

module.exports = {
  getAllProduct: async (req, res, next) => {
    try {
      // const { isDelete } = req.body;
      const result = await Product.find({ isDeleted: false })
        .populate("category")
        .populate("supplier")
        .lean();

      if (result) {
        return res.send({
          message: "Lấy thông tin thành công ",
          payload: result,
        });
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },
  getDetailProduct: async (req, res, next) => {
    const { id } = req.params;
    // const detail = data.find((item) => item.id.toString() === id);
    try {
      const findResult = await Product.findById(id);

      if (!findResult) {
        return res.send(404, {
          message: "Không tìm thấy sản phẩm nào",
        });
      }

      if (findResult.isDeleted) {
        return res.send(404, {
          message: "Sản phẩm đã bị xoá trước đó",
        });
      } else {
        return res.send(202, {
          message: "Lấy sản phẩm thành công",
          payload: findResult,
        });
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const {
        name,
        price,
        discount,
        stock,
        description,
        supplierId,
        categoryId,
      } = req.body;

      const newProduct = new Product({
        price,
        name,
        discount,
        stock,
        description,
        supplierId,
        categoryId,
      });

      // data = [...data, newP];
      // writeFileSync("data/products.json", data);

      const result = await newProduct.save();

      if (result) {
        res.send(200, {
          message: "tạo mới thành công",
          payload: result,
        });
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },
  patchProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, discount, stock, description, isDeleted } = req.body;
      console.log(isDeleted);
      const dataUpdate = {
        name,
        price,
        discount,
        stock,
        description,
        isDeleted,
      };

      const findResult = await Product.findById(id);

      if (!findResult) {
        return res.send(404, {
          message: "Không tìm thấy sản phẩm nào",
        });
      }

      if (findResult.isDeleted) {
        return res.send(404, {
          message: "Sản phẩm đã bị xoá trước đó",
        });
      }

      const updateResult = await Product.findByIdAndUpdate(
        id,
        dataUpdate,

        {
          new: true,
        }
      );

      if (updateResult) {
        return res.send(202, {
          message: "Sản phẩm đã được cập nhật",
          payload: updateResult,
        });
      }
    } catch (err) {
      console.log("««««« errror »»»»»", err);
      return hasError(res);
    }
  },
  putProduct: (req, res, next) => {
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
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      const findResult = await Product.findOne({
        _id: id,
        isDeleted: true,
      });

      if (findResult) {
        return res.send(404, {
          message: "Sản phẩm không tồn tại, hoặc đã bị xoá trước đó",
        });
      }

      const updateResult = await Product.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      // data = data.filter((item) => item.id !== +id);
      // writeFileSync("data/products.json", data);

      if (updateResult)
        return res.send(200, {
          message: "Xoá thành công",
        });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return hasError(res);
    }
  },
};
