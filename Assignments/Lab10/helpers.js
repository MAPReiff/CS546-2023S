//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import * as EmailValidator from "email-validator";
import passwordValidator from "password-validator";

export const checkName = (data, type) => {
  if (typeof data == "undefined") {
    throw new Error(`please provide a ${type} string`);
  } else if (typeof data != "string") {
    throw new Error(`please provide a ${type} string`);
  }

  data = data.trim();

  if (data.replaceAll(" ", "").length == 0) {
    throw new Error(`${type} string must contain text and not only spaces`);
  }

  if (data.length < 2) {
    throw new Error(`${type} must be atleast 2 characters long`);
  } else if (data.length > 25) {
    throw new Error(`${type} must be no longer than 25 characters`);
  }

  if (/\d/.test(data)) {
    throw new Error(`${type} can not contain numbers`);
  }

  return data;
};

export const checkEmail = (emailAddress) => {
  if (typeof emailAddress == "undefined") {
    throw new Error("please provide an email string");
  } else if (typeof emailAddress != "string") {
    throw new Error("please provide an email string");
  }

  emailAddress = emailAddress.trim().toLowerCase();

  if (emailAddress.replaceAll(" ", "").length == 0) {
    throw new Error("email string must contain text and not only spaces");
  }

  if (!EmailValidator.validate(emailAddress)) {
    throw new Error("please enter a valid email address");
  }

  return emailAddress;
};

export const checkPassword = (password) => {
  if (typeof password == "undefined") {
    throw new Error("please supply a password string");
  } else if (typeof password != "string") {
    throw new Error("please supply a password string");
  }

  if (password.replaceAll(" ", "").length == 0) {
    throw new Error(
      "password string must contain a password and not only spaces"
    );
  }

  if (password.length < 8) {
    throw new Error("passwords must be atleast 8 characters long");
  }

  let passwordParams = new passwordValidator()
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .digits()
    .has()
    .symbols();

  if (!passwordParams.validate(password)) {
    throw new Error(
      "your passwords must conatin at least one uppercase character, there has to be at least one number and there has to be at least one special character"
    );
  }

  return password;
};

export const checkRole = (role) => {
  if (typeof role == "undefined") {
    throw new Error("please supply a role string");
  } else if (typeof role != "string") {
    throw new Error("please supply a role string");
  }

  role = role.trim().toLowerCase();

  if (role != "user" && role != "admin") {
    throw new Error("role string must be either user or admin");
  }

  return role;
}