import { oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";

export const remove = async (albumId) => {
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
      band.albums.splice(i, 1);
      break;
    }
  }

  const updatedBand = await bandCollection.findOneAndUpdate(
    { _id: band._id },
    { $set: band },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) {
    throw new Error("unable to remove the album");
  }

  if (band.albums.length > 0) {
    for (let i = 0; i < band.albums.length; i++) {
      band.albums[i]._id = band.albums[i]._id.toString();
    }
  }

  band._id = band._id.toString();

  return band;
};

console.log(await remove("640a7fe76397fe6e5be69efb"));
