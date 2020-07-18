const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    return { message: "Username field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};