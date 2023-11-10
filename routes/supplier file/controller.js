let data = require("../../data/Suppliers.json");
const { hasError, writeFileSync, generationID } = require("../../utils/index");
module.exports = {
  getAllSupplier: (req, res, next) => {
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
  getDetailSupplier: (req, res, next) => {
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
      } else
        return res.send(202, {
          message: "Không tồn tại",
        });
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  createSupplier: (req, res, next) => {
    try {
      const { name, email, phoneNumber, isDelete = false, address } = req.body;

      const newP = {
        id: generationID(),
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        isDelete: isDelete,
      };

      data = [...data, newP];
      writeFileSync("data/suppliers.json", data);

      res.send(200, {
        message: "tạo mới thành công",
        payload: newP,
      });
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },
  putSupplier: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber, isDelete, address } = req.body;
      let hasId = false;

      const dataUpdate = {
        id: +id,
        name,
        email,
        phoneNumber,
        isDelete,
        address,
      };

      data = data.map((item) => {
        if (item.id === +id) {
          hasId = true;
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
      console.log("««««« errror »»»»»", err);
      return hasError(res);
    }
  },
  patchSupplier: (req, res, next) => {
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
  deleteSupplier: (req, res, next) => {
    try {
      const { id } = req.params;
      data = data.filter((item) => item.id !== +id);
      writeFileSync("data/suppliers.json", data);
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
