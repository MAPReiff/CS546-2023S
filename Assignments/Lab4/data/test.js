import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import { isURL, oIDChecker, idToOID } from "../helpers.js";

export const get = async (id) => {
  let oID = idToOID(id);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  band._id = band._id.toString();

  return band;
};



console.log(await rename("63f28c54a8de2fd30a3034e7", "2"));
