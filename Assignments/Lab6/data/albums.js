// This data file should export all functions using the ES6 standard as shown in the lecture code

import { oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";

export const create = async (bandId, title, releaseDate, tracks, rating) => {
  let oID = idToOID(bandId);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  if (typeof title == "undefined") {
    throw new Error("please provide a title string");
  } else if (typeof title != "string") {
    throw new Error("please provide a title string");
  }

  title = title.trim();
  if (title.replaceAll(" ", "").length == 0) {
    throw new Error("title string must contain text and not only spaces");
  }

  if (typeof releaseDate == "undefined") {
    throw new Error("please provide a releaseDate string");
  } else if (typeof releaseDate != "string") {
    throw new Error("please provide a releaseDate string");
  }

  releaseDate = releaseDate.trim();
  if (releaseDate.replaceAll(" ", "").length == 0) {
    throw new Error("releaseDate string must contain text and not only spaces");
  }

  // if (!Date.parse(releaseDate)) {
  //   throw new Error("releaseDate string must contain a valid date");
  // }

  if (!validateDate(releaseDate, "boolean", "mm/dd/yyyy")) {
    // this npm package validates the date with the specified formatting!
    throw new Error(
      "releaseDate string must contain a valid date formatted as MM/DD/YYYY"
    );
  }

  if (
    Date.parse(releaseDate) < Date.parse("1900") ||
    Date.parse(releaseDate) > Date.parse(new Date().getFullYear() + 1)
  ) {
    throw new Error(
      `the provided date is not in the valid range of 1900 - ${new Date().getFullYear()}`
    );
  }

  if (typeof tracks == "undefined") {
    throw new Error("please provide an array of tracks with strings in it");
  } else if (typeof tracks != "object") {
    throw new Error("please provide an array of tracks with strings in it");
  }

  if (!Array.isArray(tracks)) {
    throw new Error("please provide an array of tracks with strings in it");
  }

  if (tracks.length < 3) {
    throw new Error("you must provide atleast 3 track string in the array");
  } else {
    for (let i = 0; i < tracks.length; i++) {
      if (typeof tracks[i] != "string") {
        throw new Error(`track at index ${i} is not a string`);
      }
      let data = tracks[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(`tracks at index ${i} is either empty or blank spaces`);
      } else {
        tracks[i] = tracks[i].trim();
      }
    }
  }

  if (typeof rating == "undefined") {
    throw new Error("plesse provide a valid rating as a number");
  } else if (typeof rating != "number") {
    throw new Error("plesse provide a valid rating as a number");
  }

  let decimalsPlaces = 0;

  if (rating.toString().includes(".")) {
    decimalsPlaces = rating.toString().split(".")[1].replace(".", "").length;
  }

  if (decimalsPlaces > 1) {
    throw new Error("provided rating contains more than one decimal place");
  }

  if (rating > 5 || rating < 1) {
    throw new Error("provided rating must be between 1 and 5");
  }

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

export const remove = async (albumId) => {};
