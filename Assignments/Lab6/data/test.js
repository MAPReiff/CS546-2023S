import { oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
import validateDate from "validate-date";

const create = async (bandId, title, releaseDate, tracks, rating) => {
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
    throw new Error("releaseDate string must contain a valid date formatted as MM/DD/YYYY");
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

  let oIDAlbum = new ObjectId();

  let album = {
    _id: oIDAlbum,
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating
  }

  // band.



};

let releaseDate = "03/03/23"

// validateDate('02/27/2001', responseType="boolean", dateFormat="mm/dd/yyyy"); // returns true

console.log(validateDate("03/23/2001", "boolean", "mm/dd/yyyy"))

// if (!validateDate(releaseDate, responseType="boolean", dateFormat="mm/dd/yyyy")) {
//   throw new Error("releaseDate string must contain a valid date formatted as MM/DD/YYYY");
// }