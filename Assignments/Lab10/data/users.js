//import mongo collections, bcrypt and implement the following emailAddress functions

import { users } from "../config/mongoCollections.js";
import { checkName, checkEmail, checkPassword, checkRole } from "../helpers.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  firstName = checkName(firstName, "first name");
  lastName = checkName(lastName, "last name");
  emailAddress = checkEmail(emailAddress);

  const userCollection = await users();
  const existingEmailUser = await userCollection.findOne({
    emailAddress: {
      $eq: emailAddress,
    },
  });

  if (existingEmailUser != null) {
    throw new Error("a user with this email already exists");
  }

  password = checkPassword(password);

  role = checkRole(role);

  let user = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: await bcrypt.hashSync(password, 15),
    role: role,
  };

  let newUser = await userCollection.insertOne(user);

  if (!newUser.acknowledged || !newUser.insertedId) {
    throw new Error("unable to add the user");
  }

  return { insertedUser: true };
};

export const checkUser = async (emailAddress, password) => {
  emailAddress = checkEmail(emailAddress);
  password = checkPassword(password);

  const userCollection = await users();
  const existingEmailUser = await userCollection.findOne({
    emailAddress: {
      $eq: emailAddress,
    },
  });

  if (existingEmailUser == null) {
    throw new Error("Either the email address or password is invalid");
  }

  if (!(await bcrypt.compareSync(password, existingEmailUser.password))) {
    throw new Error("Either the email address or password is invalid");
  }

  return {
    firstName: existingEmailUser.firstName,
    lastName: existingEmailUser.lastName,
    emailAddress: existingEmailUser.emailAddress,
    role: existingEmailUser.role,
  };
};

// console.log(
//   await createUser(
//     "Mitchell",
//     "Reiff",
//     "mreiff@stevEns.edu",
//     "HorsePull748*%",
//     "user"
//   )
// );

// console.log(await checkUser("mreiff@stevens.edu", "HorsePull748*%"));
