const Validator = require("validator");
const validText = require("./valid-text");
const validUsername = require("./valid-username");

module.exports = function validateRegisterInput(data) {
  
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.fullName = validText(data.fullName) ? data.fullName : "";
  //data.username = validText(data.username) ? data.username : "";

  // if (!validUsername(data.username)) {
  //   return { message: "Invalid Username", isValid: false };
  // }

  if (!Validator.isEmail(data.email)) {
    return { message: "Invalid E-mail", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  // if (Validator.isEmpty(data.username)) {
  //   return { message: "Username field is required", isValid: false };
  // }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    return {
      message: "Password must be between 8 and 20 characters",
      isValid: false
    };
  }

  return {
    message: "",
    isValid: true
  };
};