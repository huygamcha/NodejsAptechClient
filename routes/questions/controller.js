const { getQueryDateTime, fuzzySearch } = require("../../utils");
const {
  Product,
  Category,
  Supplier,
  Customer,
  Order,
  Employee,
} = require("../../models");

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      console.log("««««« conditionFind »»»»»", conditionFind);

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount } = req.query;
      const conditionFind = {};
      console.log(discount);

      if (discount) conditionFind.discount = { $lte: discount };

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const { discount, type } = req.query;
      const conditionFind = {};
      if (discount) {
        switch (+type) {
          case 0:
            conditionFind.discount = { $lte: discount };
            break;
          case 1:
            conditionFind.discount = { $lt: discount };
            break;

          case 2:
            conditionFind.discount = { $gte: discount };
            break;

          case 3:
            conditionFind.discount = { $gt: discount };
            break;
          case 4:
            conditionFind.discount = { $eq: discount };
            break;
          default:
            conditionFind.discount = { $lt: discount };
            break;
        }
      }

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $gte: 5 },
      };

      let results = await Product.find(conditionFind);

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const { stock } = req.query;

      const conditionFind = {
        stock: { $lte: stock },
      };

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const { stock, type } = req.query;

      const conditionFind = {};

      if (stock) {
        switch (+type) {
          case 0:
            conditionFind.stock = { $lte: stock };
            break;

          case 1:
            conditionFind.stock = { $lt: stock };
            break;
          case 2:
            conditionFind.stock = { $gte: stock };
            break;
          case 3:
            conditionFind.stock = { $gt: stock };
            break;
          case 4:
            conditionFind.stock = { $eq: stock };
            break;
          default:
            conditionFind.stock = { $lt: stock };
        }
      }

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3: async (req, res, next) => {
    try {
      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = { $expr: { $lte: [d, 1000] } };

      let results = await Product.find(conditionFind)
        // loại bỏ các trường không muốn sử dụng
        // .select("-categoryId -supplierId")
        .populate({
          path: "category",
          select: "-name -description",
        })
        .populate("supplier");
      // nếu bỏ lean đi thì trường discountedPrice sẽ xuất hiện
      // .lean();

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3a: async (req, res, next) => {
    try {
      const { discountedPrice } = req.query;

      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = {
        $expr: { $lt: [d, parseFloat(discountedPrice)] },
      };

      let results = await Product.find(conditionFind)
        // loại bỏ các trường không muốn sử dụng
        // .select("-categoryId -supplierId")
        .populate("category")
        .populate("supplier");
      // nếu bỏ lean đi thì trường discountedPrice sẽ xuất hiện
      // .lean();

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3b: async (req, res, next) => {
    try {
      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = { $expr: { $lte: [d, 800] } };

      let results = await Product.aggregate().match(conditionFind);

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3c: async (req, res, next) => {
    try {
      const { discountedPrice } = req.query;

      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = {
        $expr: { $lte: [d, parseFloat(discountedPrice)] },
      };

      let results = await Product.aggregate()
        .match(conditionFind)
        .addFields({ disPrice: d });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3d: async (req, res, next) => {
    try {
      const { discountedPrice } = req.query;

      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = {
        $expr: { $lte: [d, parseFloat(discountedPrice)] },
      };

      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match(conditionFind)
        .project({
          createdAt: 0,
          updatedAt: 0,
        });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3e: async (req, res, next) => {
    try {
      const { discountedPrice } = req.query;

      const s = { $subtract: [100, "$discount"] }; // (100 - 10) s => 90

      const m = { $multiply: ["$price", s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = {
        $expr: { $lte: [d, parseFloat(discountedPrice)] },
      };

      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match(conditionFind)
        .lookup({
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "suppliers",
        })
        // chuyển từ array sang object
        .unwind("suppliers")
        .lookup({
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "abc.categories",
        })
        // chuyển từ array sang object
        .addFields({ categories: "abc.categories" })
        .unwind("abc.categories")
        .project({
          supplierId: 0,
          createdAt: 0,
          updatedAt: 0,
          categories: {
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question4: async (req, res, next) => {
    try {
      const { address } = req.query;

      const conditionFind = {
        address: fuzzySearch(address),
      };
      // const conditionFind = { address: new RegExp(`${address}`) };
      // const conditionFind = { address: {$eq: address } };

      console.log("««««« conditionFind »»»»»", conditionFind);

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5: async (req, res, next) => {
    try {
      //  nhận giá trị năm từ query để tìm kiếm
      const { year } = req.query;

      // const currentDate = birthday ? new Date(birthday) : new Date();

      // console.log("««««« currentDate »»»»»", currentDate);

      console.log("««««« conditionFind »»»»»", { $year: "$birthday" });
      const conditionFind = {
        $expr: { $eq: [{ $year: "$birthday" }, year] },
      };

      let results = await Customer.find(conditionFind);
      let total = await Customer.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5a: async (req, res, next) => {
    try {
      //  nhận giá trị ngày tháng năm để tìm theo năm
      const { date } = req.query;

      const currentDate = date ? new Date(date) : new Date();

      console.log("««««« currentDate »»»»»", currentDate);

      console.log("««««« conditionFind »»»»»", { $year: "$birthday" });
      const conditionFind = {
        $expr: { $eq: [{ $year: "$birthday" }, { $year: currentDate }] },
      };

      let results = await Customer.find(conditionFind);
      let total = await Customer.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5b: async (req, res, next) => {
    try {
      //  nhận giá trị ngày tháng năm để tìm theo năm sử dụng aggregate
      // lấy thêm field fullName bằng các cộng
      //  ta không thế trực tiếp trường ảo như các trường thật
      const { date } = req.query;

      const currentDate = date ? new Date(date) : new Date();

      console.log("««««« currentDate »»»»»", currentDate);

      console.log("««««« conditionFind »»»»»", { $year: "$birthday" });
      const conditionFind = {
        $expr: { $eq: [{ $year: "$birthday" }, { $year: currentDate }] },
      };

      let results = await Customer.aggregate()
        .match(conditionFind)
        .addFields({ fullName: { $concat: ["$firstName", " ", "$lastName"] } });
      let total = await Customer.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question6: async (req, res, next) => {
    try {
      //  hiển thị ra ngày sinh nhật
      const { date } = req.query;

      const currentDate = date ? new Date(date) : new Date();

      console.log("««««« currentDate »»»»»", currentDate);

      console.log("««««« conditionFind »»»»»", { $year: "$birthday" });
      const conditionFind = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$birthday" }, { $month: currentDate }] },
            {
              $eq: [{ $dayOfMonth: "$birthday" }, { $dayOfMonth: currentDate }],
            },
          ],
        },
      };

      let results = await Customer.aggregate()
        .match(conditionFind)
        .addFields({ fullName: { $concat: ["$firstName", " ", "$lastName"] } });
      let total = await Customer.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7: async (req, res, next) => {
    // hiển thị danh sách WAITING sử dụng find
    try {
      const { status } = req.query;

      const conditionFind = {
        status: status.toUpperCase(),
      };

      let results = await Order.find(conditionFind)
        .populate({ path: "customer", select: "firstName lastName" }) // select để chọn lọc dữ liệu trả về
        // .populate("customer")
        .populate("employee")
        .populate({
          path: "productList.product",
          select: { name: 1, stock: 1 },
        })
        .lean();

      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7a: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Order.aggregate()
        .match({ status }) // ~ find
        .lookup({
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "Customer",
        })
        .unwind("Customer")
        .lookup({
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        })
        .unwind("employee")
        .project({
          customerId: 0,
          employeeId: 0,
          // shippedDate: 0,
          // paymentType: 0,
          // status: 0,
          // orderDetails: 0,
          // createdDate: 0,
        });
      // .lookup({
      //   from: 'products',
      //   localField: 'orderDetails.productId',
      //   foreignField: '_id',
      //   as: 'productList.product',
      // })
      // .unwind('product')
      // .populate({ path: 'customer', select: 'firstName lastName' })
      // .populate('employee')
      // .populate({
      //   path: 'productList.product',
      //   select: { name: 1 , stock: 1},
      // })
      // .select('-customerId -employeeId -orderDetails.productId')
      // .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7b: async (req, res, next) => {
    try {
      const { status } = req.query;

      let results = await Order.aggregate()
        .match({ status }) // ~ find
        .lookup({
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "Customer",
        })
        .unwind("Customer")
        .lookup({
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        })
        .unwind("employee")
        .project({
          customerId: 0,
          employeeId: 0,
          // shippedDate: 0,
          // paymentType: 0,
          // status: 0,
          // orderDetails: 0,
          // createdDate: 0,
        });
      // .lookup({
      //   from: 'products',
      //   localField: 'orderDetails.productId',
      //   foreignField: '_id',
      //   as: 'productList.product',
      // })
      // .unwind('product')
      // .populate({ path: 'customer', select: 'firstName lastName' })
      // .populate('employee')
      // .populate({
      //   path: 'productList.product',
      //   select: { name: 1 , stock: 1},
      // })
      // .select('-customerId -employeeId -orderDetails.productId')
      // .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8: async (req, res, next) => {
    try {
      //  hiển thị ra trạng thái COMPLETED trong ngày hôm nay
      //  sử dụng aggregate
      const { status, date } = req.query;

      const currentDate = date ? new Date(date) : new Date();

      console.log("««««« currentDate »»»»»", currentDate);

      const conditionFind = {
        $expr: {
          $and: [
            {
              $eq: [{ $year: "$shippedDate" }, { $year: currentDate }],
            },

            { $eq: [{ $month: "$shippedDate" }, { $month: currentDate }] },

            {
              $eq: [
                { $dayOfMonth: "$shippedDate" },
                { $dayOfMonth: currentDate },
              ],
            },

            {
              status: status.toUpperCase(),
            },
          ],
        },
      };

      let results = await Order.aggregate().match(conditionFind).lookup({
        from: "products",
        localField: "productList.productId",
        foreignField: "_id",
        as: "productList",
      });
      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8a: async (req, res, next) => {
    try {
      //  hiển thị ra trạng thái COMPLETED trong ngày hôm nay
      //  sử dụng find
      const { status, date } = req.query;

      const currentDate = date ? new Date(date) : new Date();

      console.log("««««« currentDate »»»»»", currentDate);

      const conditionFind = {
        $expr: {
          $and: [
            {
              $eq: [{ $year: "$shippedDate" }, { $year: currentDate }],
            },

            { $eq: [{ $month: "$shippedDate" }, { $month: currentDate }] },

            {
              $eq: [
                { $dayOfMonth: "$shippedDate" },
                { $dayOfMonth: currentDate },
              ],
            },

            {
              status: status.toUpperCase(),
            },
          ],
        },
      };

      let results = await Order.find(conditionFind)
        .populate({
          path: "employee",
        })
        .populate({
          path: "customer",
          select: "address phoneNumber",
        })
        .populate({
          path: "productList.product",
        });

      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8b: async (req, res, next) => {
    try {
      //  hiển thị ra trạng thái status trong khoảng xday -> yday
      //  sử dụng find
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tempToDate = new Date(toDate);
      tempToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tempToDate.setDate(tempToDate.getDate() + 1));

      const compareStatus = { $eq: ["$status", status.toUpperCase()] };

      const compareFromDate = { $gte: ["$shippedDate", fromDate] };

      const compareToDate = { $lt: ["$shippedDate", toDate] };

      const conditionFind = {
        $expr: {
          $and: [compareStatus, compareFromDate, compareToDate],
        },
      };

      let results = await Order.find(conditionFind)
        .populate({
          path: "employee",
        })
        .populate({
          path: "customer",
          select: "address phoneNumber",
        })
        .populate({
          path: "productList.product",
        });

      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question13: async (req, res, next) => {
    try {
      let { address } = req.query;

      let results = await Order.aggregate()
        .lookup({
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        })
        .unwind("customer")
        .match({
          "customer.address": fuzzySearch(address),
        })
        // .match({
        //   'customer.address': {
        //     $regex: new RegExp(`${address}`),
        //     $options: 'i',
        //   },
        // })
        .project({
          customerId: 0,
          employeeId: 0,
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question14: async (req, res, next) => {
    // hiển thị danh sách nhân viên sinh nhật hôm nay sử dụng find
    try {
      // const { birthday } = req.query;

      const date = new Date();

      const conditionFind = {
        $expr: {
          $and: [
            { $eq: [{ $month: "$birthday" }, { $month: date }] },
            {
              $eq: [{ $dayOfMonth: "$birthday" }, { $dayOfMonth: date }],
            },
          ],
        },
      };

      let results = await Employee.find(conditionFind);

      let total = await Employee.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question15: async (req, res, next) => {
    // Hiển thị tất cả các nhà cung cấp có tên là: (SONY, SAMSUNG, TOSHIBA, APPLE)
    //sử dụng find
    try {
      const conditionFind = {
        name: { $in: ["SONY", "SAMSUNG", "TOSHIBA", "APPLE"] },
      };

      let results = await Supplier.find(conditionFind);

      let total = await Supplier.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question16: async (req, res, next) => {
    // Hiển thị tất cả các đơn hàng cùng với thông tin chi tiết khách hàng (Customer)
    //sử dụng find
    try {
      let results = await Order.find().populate("customer");

      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question16a: async (req, res, next) => {
    // Hiển thị tất cả các đơn hàng cùng với thông tin chi tiết khách hàng (Customer)
    //sử dụng aggregate
    try {
      let results = await Order.aggregate()
        .lookup({
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customers",
        })
        .unwind("customers");

      let total = await Order.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question17: async (req, res, next) => {
    // Hiển thị tất cả các mặt hàng cùng với thông tin chi tiết của Category và Supplier
    //sử dụng aggregate
    try {
      let results = await Product.aggregate()
        .lookup({
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categories",
        })
        .unwind("categories")
        .lookup({
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "suppliers",
        })
        .unwind("suppliers");

      let total = await Product.countDocuments();
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question18: async (req, res, next) => {
    //Hiển thị tất cả danh mục (Categories) với số lượng hàng hóa trong mỗi danh mục
    try {
      let results = await Category.aggregate()
        .lookup({
          from: "products",
          localField: "_id", // TRUY VẤN NGƯỢC!!! vì category nằm trong product
          foreignField: "categoryId",
          as: "products",
        })
        // .unwind("products"); //   sẽ dẫn dến thiếu dự liệu
        .unwind({
          path: "$products",
          preserveNullAndEmptyArrays: true,
        })
        .group({
          // muốn nhóm lại thì phải khai báo
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          totalStock: {
            $sum: "$products.stock",
          },
          totalProduct: {
            $sum: {
              // tính số lượng products
              $cond: {
                if: {
                  $and: [{ $gt: ["$products.stock", 0] }],
                },
                then: 1,
                else: 0,
              },
            },
          },
        })
        .sort({
          // sắp xếp theo từ thấp dến cao
          totalProduct: -1,
          name: -1,
        });

      let total = await Category.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question19: async (req, res, next) => {
    //Hiển thị tất cả nhà cung cấp (Suppliers) với số lượng hàng hóa mỗi nhà cung cấp
    try {
      let results = await Supplier.aggregate()
        .lookup({
          from: "products",
          localField: "_id", // TRUY VẤN NGƯỢC!!! vì supplier nằm trong product
          foreignField: "supplierId",
          as: "products",
        })
        // .unwind("products"); //   sẽ dẫn dến thiếu dự liệu
        .unwind({
          path: "$products",
          preserveNullAndEmptyArrays: true,
        })
        .group({
          // muốn nhóm lại thì phải khai báo
          _id: "$_id",
          name: { $first: "$name" },
          phoneNumber: { $first: "$phoneNumber" },
          totalStock: {
            $sum: "$products.stock",
          },
          totalProduct: {
            $sum: {
              // tính số lượng products
              $cond: {
                if: {
                  $and: [{ $gt: ["$products.stock", 0] }],
                },
                then: 1,
                else: 0,
              },
            },
          },
        })
        .sort({
          // sắp xếp theo từ thấp dến cao
          totalProduct: -1,
          name: -1,
        });

      let total = await Category.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question20: async (req, res, next) => {
    try {
      //Hiển thị tất cả các mặt hàng được bán trong khoảng từ ngày, đến ngày
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ["WAITING"] },
        })
        .unwind("productList")
        .lookup({
          from: "products",
          localField: "productList.productId",
          foreignField: "_id",
          as: "productList.product",
        })
        .unwind("productList.product")
        .group({
          _id: "$productList.productId",
          // _id: '$productList.product._id',
          name: { $first: "$productList.product.name" },
          price: { $first: "$productList.product.price" },
          discount: { $first: "$productList.product.discount" },
          stock: { $first: "$productList.product.stock" },
          totalQuantity: { $sum: "$productList.quantity" },
          inBill: { $sum: 1 },
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  // code mau
  // question20: async (req, res, next) => {
  //   try {
  //     let { fromDate, toDate } = req.query;
  //     const conditionFind = getQueryDateTime(fromDate, toDate);

  //     let results = await Order.aggregate()
  //       .match({
  //         ...conditionFind,
  //         status: { $in: ['WAITING'] },
  //       })
  //       .unwind('productList')
  //       .group({
  //         _id: '$productList.productId',
  //         quantity: { $sum: '$productList.quantity' },
  //       })
  //       .lookup({
  //         from: 'products',
  //         localField: '_id',
  //         foreignField: '_id',
  //         as: 'product',
  //       })
  //       .unwind("product")
  //       .project({
  //         name: '$product.name',
  //         price: '$product.price',
  //         discount: '$product.discount',
  //         stock: '$product.stock',
  //         quantity: 1,
  //       });

  //     let total = await Order.countDocuments();

  //     return res.send({
  //       code: 200,
  //       total,
  //       totalResult: results.length,
  //       payload: results,
  //     });
  //   } catch (err) {
  //     console.log('««««« err »»»»»', err);
  //     return res.status(500).json({ code: 500, error: err });
  //   }
  // },

  question21: async (req, res, next) => {
    try {
      // Hiển thị tất cả các khách hàng mua hàng (với tổng số tiền) trong khoảng từ ngày, đến ngày
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ["WAITING"] },
        })
        .unwind("productList")
        .lookup({
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        })
        .unwind("customer")
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    "$productList.quantity",
                    "$productList.price",
                    {
                      $subtract: [100, "$productList.discount"],
                    },
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: "$customer._id",
          // _id: '$productList.product._id',
          name: {
            $first: {
              $concat: ["$customer.firstName", " ", "$customer.lastName"],
            },
          },
          priceTotal: { $sum: "$total" },
          inBill: { $sum: 1 },
        })
        .sort({
          priceTotal: -1,
          // name: 1,
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question23: async (req, res, next) => {
    try {
      //Hiển thị tất cả đơn hàng với tổng số tiền
      // let { fromDate, toDate } = req.query;
      // const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .unwind("productList")
        .lookup({
          from: "products",
          localField: "productList.productId",
          foreignField: "_id",
          as: "productList.product",
        })
        .unwind("productList.product")
        .addFields({
          total: {
            $divide: [
              {
                $multiply: [
                  "$productList.quantity",
                  "$productList.price",
                  {
                    $subtract: [100, "$productList.discount"],
                  },
                ],
              },
              100,
            ],
          },
        })
        .group({
          _id: "$productList.product._id",

          // bị lỗi khi cố gắng sử dụng trường này
          // name: "$productList.product.name",

          priceTotal: { $sum: "$total" },
        })
        .sort({
          priceTotal: -1,
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question24: async (req, res, next) => {
    try {
      // Hiển thị tất cả các nhân viên bán hàng với tổng số tiền bán được
      let { fromDate, toDate } = req.query;

      let results = await Order.aggregate()
        .match({
          status: { $in: ["WAITING"] },
        })
        .unwind("productList")
        .lookup({
          from: "employees",
          localField: "employeeId",
          foreignField: "_id",
          as: "employee",
        })
        .unwind("employee")
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    "$productList.quantity",
                    "$productList.price",
                    {
                      $subtract: [100, "$productList.discount"],
                    },
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: "$customer._id",
          // _id: '$productList.product._id',
          name: {
            $first: {
              $concat: ["$customer.firstName", " ", "$customer.lastName"],
            },
          },
          priceTotal: { $sum: "$total" },
          inBill: { $sum: 1 },
        })
        .sort({
          priceTotal: -1,
          // name: 1,
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log("««««« err »»»»»", err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
};
