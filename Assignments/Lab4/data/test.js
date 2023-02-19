import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { isURL, oIDChecker } from "../helpers.js"; // used to validate if website is a valid url

export const get = async (id) => {
  if (typeof id == "undefined") {
    throw new Error("please provide a valid ID string");
  } else if (typeof id != "string") {
    throw new Error("please provide a valid ID string");
  }

  id = id.trim();

  if (id.length == 0) {
    throw new Error("ObjectID can not be blank or spaces");
  }

  if (oIDChecker(id) == false) {
    throw new Error("the provided id is not a valid ObjectID for mongo");
  }

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: new ObjectId(id) });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  band._id = band._id.toString();

  return band;
};

console.log(await get("63f2821c429d21ddf232e60b"));
