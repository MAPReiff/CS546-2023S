// I pledge my honor that I have abided by the Stevens Honor System.

import { isURL, oIDChecker, idToOID } from "../helpers.js";
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";

// TODO: Export and implement the following functions in ES6 format
export const create = async (
  // id, // generated by mongo
  name, // string
  genre, // array of strings. Must have atleast 1 string
  website, // string; must start with "http://www" and end with ".com". Must have *5* characters between these (http://abcde.com or http://12345.com)
  recordCompany, // string
  groupMembers, // array of strings. Must have atleast 1 string
  yearBandWasFormed // number; throw an error if it is less than 1900 or greater than current year 2023 (wonder if I can make this dynamic rather than hardcode the end date)
) => {
  if (typeof name == "undefined") {
    throw new Error("please provide a name string");
  } else if (typeof name != "string") {
    throw new Error("please provide a name string");
  }

  name = name.trim();
  if (name.replaceAll(" ", "").length == 0) {
    throw new Error("Name string must contain text and not only spaces");
  }

  if (typeof genre == "undefined") {
    throw new Error("please provide an array of genres with strings in it");
  } else if (typeof genre != "object") {
    throw new Error("please provide an array of genres with strings in it");
  }

  if (!Array.isArray(genre)) {
    throw new Error("please provide an array of genres with strings in it");
  }

  if (genre.length == 0) {
    throw new Error("you must provide atleast 1 genre string in the array");
  } else {
    for (let i = 0; i < genre.length; i++) {
      if (typeof genre[i] != "string") {
        throw new Error(`genre at index ${i} is not a string`);
      }
      let data = genre[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(`genre at index ${i} is either empty or blank spaces`);
      } else {
        genre[i] = genre[i].trim();
      }
    }
  }

  if (typeof website == "undefined") {
    throw new Error("please provide a website string");
  } else if (typeof website != "string") {
    throw new Error("please provide a website string");
  }

  website = website.trim().replaceAll(" ", ""); // dont think i need trim if I am replacing spaces but cant hurt
  if (website.length == 0) {
    throw new Error("website must be a non empty URL");
  }

  // start with http://www., end with .com, and have 5 characters inbetween
  if (!website.toLowerCase().startsWith("http://www.") || !website.toLowerCase().endsWith(".com")) {
    throw new Error(
      `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  } else if (website.length < "http://www.".length + ".com".length + 5) {
    throw new Error(
      `website string MUST start with "http://", MUST end with ".com", and must contain atleast 5 characters inbetween them`
    );
  }

  // if (isURL(website) == false) { // TA said we do not need to worry about invalid URLs
  //   throw new Error ("the website provided is not a valid URL")
  // }

  if (typeof recordCompany == "undefined") {
    throw new Error("please provide a recordCompany string");
  } else if (typeof recordCompany != "string") {
    throw new Error("please provide a recordCompany string");
  }

  recordCompany = recordCompany.trim();
  if (recordCompany.replaceAll(" ", "").length == 0) {
    throw new Error(
      "recordCompany string must contain text and not only spaces"
    );
  }

  if (typeof groupMembers == "undefined") {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  } else if (typeof groupMembers != "object") {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  }

  if (!Array.isArray(groupMembers)) {
    throw new Error(
      "please provide an array of groupMembers with strings in it"
    );
  }

  if (groupMembers.length == 0) {
    throw new Error(
      "you must provide atleast 1 groupMembers string in the array"
    );
  } else {
    for (let i = 0; i < groupMembers.length; i++) {
      if (typeof groupMembers[i] != "string") {
        throw new Error(`groupMembers at index ${i} is not a string`);
      }
      let data = groupMembers[i].trim();
      if (data.replaceAll(" ", "").length == 0) {
        throw new Error(
          `groupMembers at index ${i} is either empty or blank spaces`
        );
      } else {
        groupMembers[i] = groupMembers[i].trim();
      }
    }
  }

  if (typeof yearBandWasFormed == "undefined") {
    throw new Error("plesse provide a valid year as a number");
  } else if (typeof yearBandWasFormed != "number") {
    throw new Error("plesse provide a valid year as a number");
  } else if (!Number.isInteger(yearBandWasFormed)) {
    // check for stuff like 2002.7 which is not a year
    throw new Error("plesse provide a valid year as a number");
  }

  if (
    yearBandWasFormed < 1900 ||
    yearBandWasFormed > new Date().getFullYear()
  ) {
    // made it dynamic to the current year
    throw new Error(
      `the provided date is no in the valid range of 1900 - ${new Date().getFullYear()}`
    );
  }

  // now the actual problem
  let newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed,
  };

  const bandCollection = await bands();
  const newData = await bandCollection.insertOne(newBand);

  if (!newData.acknowledged || !newData.insertedId) {
    throw new Error("unable to add provided band");
  }

  const newId = newData.insertedId.toString();
  const addedBand = await bandCollection.findOne({ _id: new ObjectId(newId) });

  return addedBand;
};

export const getAll = async () => {
  const bandCollection = await bands();

  let bandData = await bandCollection.find({}).toArray();

  if (bandData.length > 0) {
    for (let i = 0; i < bandData.length; i++) {
      bandData[i]._id = bandData[i]._id.toString();
    }
  }

  return bandData;
};

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

export const remove = async (id) => {
  let oID = idToOID(id);

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  const deleteBand = await bandCollection.findOneAndDelete({ _id: oID });

  // console.log(deleteBand)

  if (deleteBand.lastErrorObject.n === 0) {
    throw new Error("unable to delete band with the given ID");
  }

  return `${band.name} has been successfully deleted!`;
};

export const rename = async (id, newName) => {
  let oID = idToOID(id);

  if (typeof newName == "undefined") {
    throw new Error("please provide a name string");
  } else if (typeof newName != "string") {
    throw new Error("please provide a name string");
  }

  newName = newName.trim();
  if (newName.replaceAll(" ", "").length == 0) {
    throw new Error("Name string must contain text and not only spaces");
  }

  const bandCollection = await bands();
  const band = await bandCollection.findOne({ _id: oID });

  if (band == null) {
    throw new Error("there is no band that matches the provided ID");
  }

  if(band.name == newName) {
    throw new Error("unable to rename the band as you provided the same name");
  }

  band.name = newName;

  const updateBand = await bandCollection.findOneAndUpdate(
    { _id: oID },
    { $set: band },
    { returnDocument: "after" }
  );

  if (updateBand.lastErrorObject.n === 0) {
    throw new Error("unable to update band with the given ID");
  }

  band._id = band._id.toString();

  return band;
};

// console.log(await create(
//   "Black Sabbath",
//   ["Heavy Metal"],
//   "http://wWw.blacksabbath.COM",
//   "Warner Records",
//   ["Ozzy Osbourne", "Bill Ward", "Geezer Butler", "Tony Iommi"],
//   1968
// ));

// await create(
//   "Pink Floyd",
//   ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
//   "http://www.pinkfloyd.com",
//   "EMI",
//   [
//     "Roger Waters",
//     "David Gilmour",
//     "Nick Mason",
//     "Richard Wright",
//     "Sid Barrett",
//   ],
//   1965
// );