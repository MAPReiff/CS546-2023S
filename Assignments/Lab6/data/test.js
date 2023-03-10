import { oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";

export const get = async (albumId) => {
  let oID = idToOID(albumId);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({
    "albums._id": {
      $eq: oID,
    },
  });

  if (band == null) {
    throw new Error("there is no album that matches the provided ID");
  }

  for (let i = 0; i < band.albums.length; i++) {
    if (band.albums[i]._id.toString() == oID.toString()) {
      band.albums[i]._id = band.albums[i]._id.toString();
      return band.albums[i];
    }
  }

  // it should not even be possible to get here but just in case
  throw new Error("there is no album that matches the provided ID");
};

console.log(await get("640a7fe76397fe6e5be69efb"));
