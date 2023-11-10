const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên nhà cung cấp không được bỏ trống"],
      maxLength: [100, "Tên nhà cung cấp không được vượt quá 100 ký tự"],
    },
    email: {
      type: String,
      maxLength: [50, "Email danh mục không được vượt quá 50 ký tự"],
      unique: [true, "Email nhà cung cấp không được trùng"],
      required: [true, "Email nhà cung cấp không được bỏ trống "],
      validate: {
        validator: function (value) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        message: `{VALUE} không phải là email hợp lệ!`,
        // message: (props) => `{props.value} is not a valid email!`,
      },
    },

    phoneNumber: {
      type: String,
      maxLength: [50, "Phone number danh mục không được vượt quá 50 ký tự"],
      unique: [true, "Phone number nhà cung cấp không được trùng"],
      validate: {
        validator: function (value) {
          const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
          return phoneNumberRegex.test(value);
        },
        message: `{VALUE} không phải là phone number hợp lệ!`,
        // message: (props) => `{props.value} is not a valid email!`,
      },
    },
    address: {
      type: String,
      maxLength: [500, "Address nhà cung cấp không được vượt quá 500 ký tự"],
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Supplier = model("suppliers", supplierSchema);
module.exports = Supplier;
