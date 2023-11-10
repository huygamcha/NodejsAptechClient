const { hasError, writeFileSync, generationID } = require("../../utils/index");
// const Supplier = require("../../models/supplier");
const { Supplier } = require("../../models");

module.exports = {
  getAllSupplier: async (req, res, next) => {
    try {
      const result = await Supplier.find({ isDeleted: false });

      return res.send(200, {
        message: "Lấy thành công",
        payload: result,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
      return res.send(400, { message: "Không thành công" });
    }
  },

  getDetailSupplier: async (req, res, next) => {
    try {
      const { id } = req.params;
      // const detail = data.find((item) => item.id.toString() === id);

      const findResult = await Supplier.findOne({
        _id: id,
        isDeleted: false,
      });

      if (findResult) {
        return res.send(202, {
          message: "Tìm thành công nhà cung cấp",
          payload: findResult,
        });
      } else {
        return res.send(202, {
          message: "Không tìm thấy nhà cung cấp",
        });
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  createSupplier: async (req, res, next) => {
    try {
      const { name, email, phoneNumber, address } = req.body;

      // const newP = {
      //   id: generationID(),
      //   email: email,
      //   name: name,
      //   phoneNumber: phoneNumber,
      //   address: address,
      //   isDelete: isDelete,
      // };

      // data = [...data, newP];
      // writeFileSync("data/suppliers.json", data);

      const newSupplier = new Supplier({
        name,
        email,
        phoneNumber,
        address,
      });

      const result = await newSupplier.save();

      res.send(200, {
        message: "tạo mới thành công",
        payload: result,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },
  patchSupplier: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, isDelete, address } = req.body;

      // const dataUpdate = {
      //   name,
      //   email,
      //   phoneNumber,
      //   isDelete,
      //   address,
      // };
      // data = data.map((item) => {
      //   if (item.id === +id) {
      //     hasId = true;
      //     return dataUpdate;
      //   }
      //   return item;
      // });

      // writeFileSync("data/suppliers.json", data);

      const findResult = await Supplier.findById(id);

      if (!findResult) {
        return res.send(404, {
          message: "Không tìm thấy nhà cung cấp",
        });
      }

      if (findResult.isDeleted) {
        return res.send(404, {
          message: "Nhà cung cấp đã bị xoá trước đó",
        });
      }

      const updateData = {
        name,
        email,
        phoneNumber,
        isDelete,
        address,
      };

      const updateResult = await Supplier.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (updateResult) {
        return res.send(202, {
          message: "Cập nhật nhà cung cấp thành công",
          payload: updateResult,
        });
      }
    } catch (err) {
      console.log("««««« errror »»»»»", err);
      return hasError(res, err);
    }
  },

  putSupplier: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, isDelete, address } = req.body;

      let hasId = false;
      let dataUpdate = {};

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
          dataUpdate = {
            ...item,
            name: name || item.name,
            email: email || item.email,
            phoneNumber: phoneNumber || item.phoneNumber,
            isDelete: isDelete || item.isDelete,
            address: address || item.address,
          };
          console.log("««««« dataUpdate »»»»»", dataUpdate);
          return dataUpdate;
        }

        return item;
      });

      writeFileSync("data/suppliers.json", data);

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
  deleteSupplier: async (req, res, next) => {
    try {
      const { id } = req.params;

      // data = data.filter((item) => item.id !== +id);
      // writeFileSync("data/suppliers.json", data);

      const findResult = await Supplier.findById(id, { isDeleted: true });

      if (findResult.isDeleted) {
        return res.send(404, {
          message: "Nhà cung cấp đã bị xoá trước đó",
        });
      }

      const updateResult = await Supplier.findByIdAndUpdate(id, {
        isDeleted: true,
      });

      if (updateResult) {
        return res.send(202, {
          message: "Xoá nhà cung cấp thành công",
        });
      }
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return hasError(res);
    }
  },
};
