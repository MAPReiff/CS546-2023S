// This data file should export all functions using the ES6 standard as shown in the lecture code

import { oIDChecker, idToOID, albumCreateError } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";

export const create = async (bandId, title, releaseDate, tracks, rating) => {
  let good = await albumCreateError(bandId, title, releaseDate, tracks, rating);
  bandId = good[0];
  title = good[1];
  releaseDate = good[2];
  tracks = good[3];
  rating = good[4];

  let oID = good[5];
  let bandCollection = good[6];
  let band = good[7];

  // now the problem

  /*
  { 
    _id: ObjectId,
    title: string,
    releaseDate: string (string value of a date in MM/DD/YYYY format),
    tracks: [strings],
    rating: number 1-5 (floats will be accepted as long as they are formatted like 1.5 or 4.8 for example. We will only use one decimal place)
  }
  */

  // a TA (Jan) said we should account for this, but it did not specify in the lab specs
  // https://stevenswebdevs2023.slack.com/archives/C04GT4VC2CW/p1678318847241089?thread_ts=1678317856.033719&cid=C04GT4VC2CW
  if (band.albums.length != 0) {
    for (let i = 0; i < band.albums.length; i++) {
      if (band.albums[i].title == title) {
        throw new Error(
          "unable to add that album as it already exists for this band"
        );
      }
    }
  }
  let oIDAlbum = new ObjectId();

  let album = {
    _id: oIDAlbum,
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating,
  };

  band.albums.push(album);

  let avg = 0;

  for (let i = 0; i < band.albums.length; i++) {
    avg += band.albums[i].rating;
  }

  avg = avg / band.albums.length;
  // avg = Math.round(avg * 10) / 10;
  avg = Math.floor(avg * 10) / 10;

  band.overallRating = avg;

  const updatedBand = await bandCollection.findOneAndUpdate(
    { _id: oID },
    { $set: band },
    { returnDocument: "after" }
  );

  if (updatedBand.lastErrorObject.n === 0) {
    throw new Error("unable to update band with the new album");
  }

  // const addedBand = await bandCollection.findOne({
  //   _id: new ObjectId(band._id),
  // });
  // addedBand._id = addedBand._id.toString();

  // return addedBand;

  album._id = album._id.toString();

  return album;
};

export const getAll = async (bandId) => {
  let oID = idToOID(bandId);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  if (band.albums == []) {
    return [];
  } else {
    for (let i = 0; i < band.albums.length; i++) {
      band.albums[i]._id = band.albums[i]._id.toString();
    }

    return band.albums;
  }
};

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
